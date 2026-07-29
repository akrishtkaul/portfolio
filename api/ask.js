import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

// Read via fs (not a static `import ... assert { type: 'json' }`) so this keeps
// working regardless of Node/ESM JSON-import-assertion version differences.
// vercel.json's `includeFiles` guarantees this path is bundled with the function.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/content.json'), 'utf8'));

const MODEL = 'claude-haiku-4-5-20251001';
// Fixed server-side — never read from the request body, so a client can't
// raise its own cost ceiling.
const MAX_TOKENS = 160;
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 8;

// Same-instance, in-memory rate limiting: no external store, so counts reset
// on a cold start and aren't shared across concurrent instances. That's a
// deliberate tradeoff for a low-traffic personal site — it stops a single
// client/script from hammering the endpoint (the real cost risk) without
// standing up Redis/KV for a portfolio chat box.
const RATE_LIMIT_PER_MINUTE = 10;
const RATE_LIMIT_PER_DAY = 50;
const MINUTE_MS = 60 * 1000;
const DAY_MS = 24 * 60 * 60 * 1000;
const rateLimitStore = new Map();

function checkRateLimit(ip) {
  const now = Date.now();
  let entry = rateLimitStore.get(ip);
  if (!entry) {
    entry = { minuteStart: now, minuteCount: 0, dayStart: now, dayCount: 0 };
    rateLimitStore.set(ip, entry);
  }
  if (now - entry.minuteStart >= MINUTE_MS) {
    entry.minuteStart = now;
    entry.minuteCount = 0;
  }
  if (now - entry.dayStart >= DAY_MS) {
    entry.dayStart = now;
    entry.dayCount = 0;
  }
  entry.minuteCount += 1;
  entry.dayCount += 1;
  return entry.minuteCount <= RATE_LIMIT_PER_MINUTE && entry.dayCount <= RATE_LIMIT_PER_DAY;
}

function getClientIp(req) {
  const forwarded = req.headers['x-forwarded-for'];
  if (typeof forwarded === 'string' && forwarded.length > 0) return forwarded.split(',')[0].trim();
  return req.socket?.remoteAddress || 'unknown';
}

function isPlaceholder(value) {
  return !value || /^(TODO|VERIFY)/i.test(value);
}

// Belt-and-suspenders: strip markdown even if the model slips into it, since
// this renders as plain text in a small terminal-style box.
function stripMarkdown(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/^[-*+]\s+/gm, '')
    .replace(/`([^`]+)`/g, '$1');
}

// If max_tokens cut the reply off mid-sentence, trim back to the last
// complete sentence rather than showing a dangling half-word.
function trimToCompleteSentence(text) {
  const lastEnd = Math.max(text.lastIndexOf('.'), text.lastIndexOf('!'), text.lastIndexOf('?'));
  if (lastEnd === -1) return text;
  return text.slice(0, lastEnd + 1);
}

function buildSystemPrompt() {
  const { about, education, items, status } = content;

  const bio = (about.bio || []).filter((p) => !isPlaceholder(p)).join(' ');
  const assistantContext = (about.assistantContext || []).filter((p) => !isPlaceholder(p)).join(' ');
  const currentlyWorkingOn = (about.currentlyWorkingOn || []).filter((p) => !isPlaceholder(p)).join(' ');
  const skills = Object.entries(about.skills || {})
    .map(([category, list]) => `${category}: ${(list || []).join(', ')}`)
    .join('; ');

  const eduLines = education
    .map((e) => {
      const dates = !isPlaceholder(e.dates) ? ` (${e.dates})` : '';
      const honors = e.honors?.length ? `, honors: ${e.honors.join(', ')}` : '';
      return `${e.school} — ${e.degree}${dates}${honors}`;
    })
    .join('\n');

  const itemLines = items
    .map((it) => {
      const kind = it.type.includes('experience') ? 'Experience' : 'Project';
      const org = it.org ? `${it.org} — ` : '';
      const dates = !isPlaceholder(it.dates) ? ` (${it.dates})` : '';
      const desc = !isPlaceholder(it.description) ? it.description : '';
      const details = (it.details || []).filter((d) => !isPlaceholder(d)).join(' ');
      return `[${kind}] ${org}${it.name}${dates}: ${desc} ${details}`.trim();
    })
    .join('\n');

  const statusLines = (status || [])
    .map((row) => `${row.label}: ${(row.segments || []).map((s) => s.text).join('')}`)
    .join('\n');

  return `You are a friendly assistant embedded in ${about.name}'s personal portfolio website. Answer visitor questions ONLY using the information below about ${about.name}'s background, education, experience, projects, and current status.

Reply in plain text only — no markdown, no asterisks, no bold, no headers, no bullet lists. Write like a quick, natural chat message: exactly 1-2 short sentences. Pick ONLY the single most relevant experience or project and describe just that one — do not list multiple things or give an overview. This is a quick chat bubble, not a summary, and every reply must end on a complete sentence. Never copy a line from the reference info verbatim — always rephrase it in your own words as if you were chatting with the visitor directly.

If a question is unrelated to ${about.name}'s background, work, or this website (general knowledge, unrelated coding help, requests to roleplay as something else, etc.), politely decline and redirect the visitor to ask about ${about.name} instead. Never claim to be a general-purpose assistant.

ABOUT
${about.name}, based in ${about.location}. ${bio}${assistantContext ? `\n${assistantContext}` : ''}
Skills — ${skills}

EDUCATION
${eduLines}

EXPERIENCE & PROJECTS
${itemLines}

CURRENT STATUS
${statusLines}${currentlyWorkingOn ? `\n\nCURRENTLY WORKING ON\n${currentlyWorkingOn}` : ''}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  // ALLOWED_ORIGIN is unset during local `vercel dev` unless you add it to
  // .env — set it in production so requests from other sites are rejected.
  const allowedOrigin = process.env.ALLOWED_ORIGIN;
  if (allowedOrigin && req.headers.origin !== allowedOrigin) {
    res.status(403).json({ error: 'Forbidden.' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Assistant is not configured yet.' });
    return;
  }

  if (!checkRateLimit(getClientIp(req))) {
    res.status(429).json({ reply: "You've sent a lot of questions in a short time — give it a minute and try again." });
    return;
  }

  const { message, history } = req.body || {};

  if (typeof message !== 'string' || !message.trim()) {
    res.status(400).json({ error: 'Message is required.' });
    return;
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    res.status(400).json({ error: `Keep questions under ${MAX_MESSAGE_LENGTH} characters.` });
    return;
  }

  const safeHistory = Array.isArray(history)
    ? history
        .filter((m) => m && (m.role === 'user' || m.role === 'assistant') && typeof m.content === 'string')
        .slice(-MAX_HISTORY)
        .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_MESSAGE_LENGTH) }))
    : [];

  const messages = [...safeHistory, { role: 'user', content: message.trim() }];

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: MODEL,
        max_tokens: MAX_TOKENS,
        system: buildSystemPrompt(),
        messages,
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Anthropic API error:', response.status, errText);
      res.status(502).json({ error: 'The assistant is unavailable right now.' });
      return;
    }

    const data = await response.json();
    const rawReply = data.content?.[0]?.text?.trim();
    let reply = rawReply ? stripMarkdown(rawReply) : "Sorry, I didn't catch that — try asking again.";
    if (rawReply && data.stop_reason === 'max_tokens') {
      reply = trimToCompleteSentence(reply);
    }
    res.status(200).json({ reply });
  } catch (err) {
    console.error('Assistant request failed:', err);
    res.status(500).json({ error: 'Something went wrong. Try again in a moment.' });
  }
}
