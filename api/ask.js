import { fileURLToPath } from 'node:url';
import path from 'node:path';
import fs from 'node:fs';

// Read via fs (not a static `import ... assert { type: 'json' }`) so this keeps
// working regardless of Node/ESM JSON-import-assertion version differences.
// vercel.json's `includeFiles` guarantees this path is bundled with the function.
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const content = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/content.json'), 'utf8'));

const MODEL = 'claude-haiku-4-5-20251001';
const MAX_TOKENS = 160;
const MAX_MESSAGE_LENGTH = 500;
const MAX_HISTORY = 8;

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

Reply in plain text only — no markdown, no asterisks, no bold, no headers, no bullet lists. Write like a quick, natural chat message: exactly 1-2 short sentences. Pick ONLY the single most relevant experience or project and describe just that one — do not list multiple things or give an overview. This is a quick chat bubble, not a summary, and every reply must end on a complete sentence.

If a question is unrelated to ${about.name}'s background, work, or this website (general knowledge, unrelated coding help, requests to roleplay as something else, etc.), politely decline and redirect the visitor to ask about ${about.name} instead. Never claim to be a general-purpose assistant.

ABOUT
${about.name}, based in ${about.location}. ${bio}
Skills — ${skills}

EDUCATION
${eduLines}

EXPERIENCE & PROJECTS
${itemLines}

CURRENT STATUS
${statusLines}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(500).json({ error: 'Assistant is not configured yet.' });
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
