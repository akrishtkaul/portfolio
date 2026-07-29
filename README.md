# Akrisht's Desk

My personal portfolio — reimagined as a pixel-art desktop, sitting on a desk, looking out over the New York City skyline.

**[akrishtkaul.com](https://akrishtkaul.com)**

## The idea

Portfolio sites tend to look the same: a hero section, a scroll, some cards. I wanted mine to feel like something you'd actually want to poke around in — a little 16-bit desktop booting up in your browser, icons you click, windows you open and close, a laptop screen glowing on a desk at sunset (or sunrise, depending on when you show up). The retro aesthetic is a nod to growing up on old consoles and terminal interfaces; the "desk" framing is just an honest one — this is where the work actually happens.

It's also an experiment in letting a visitor *ask* instead of just read. There's a small AI assistant living in the corner of the screen, grounded only in the content of this site, so you can ask "what's he working on right now?" instead of hunting for it.

## What's here

- **A booting desktop, not a landing page.** A short boot sequence, then a laptop on a desk with four icons — about, education, experience, projects — each opening a window with real content, no lorem ipsum.
- **Two scenes.** Sunset and morning versions of the desk, picked automatically based on your local time on first visit, with a one-click toggle if you want the other one. The morning scene has a tiny pixel plane drifting across the sky, because why not.
- **A live assistant.** A terminal-style chat window backed by the real Claude API (Haiku), scoped to only answer questions about this site's content — background, projects, experience, education, current status.
- **A recruiter-friendly view.** Click the logo (or, on mobile, a small link) and the pixel desk gives way to a cleaner, more traditional page: photo, bio, expandable experience cards, flip-card projects. Same information, different pace.
- **One source of truth.** Every word of content — bio, projects, experience, education — lives in `src/data/content.json`. Nothing is hardcoded in a component. Update the JSON, the whole site updates.

## Stack

- **Vite + React 19**, no router — it's a single scene, not a set of pages.
- **Tailwind v4**, via the Vite plugin.
- **Vercel serverless functions** (`api/ask.js`) so the Anthropic API key never touches the browser. Rate-limited per IP and locked to the deployed origin.
- Content, assistant prompt, and every visible section all read from the same `content.json`.

## Running it locally

```bash
npm install
npm run dev
```

The assistant needs a real backend to answer, so plain `vite dev` will show a graceful "unavailable" error for it — that's expected. To exercise the full thing, including `/api/ask`:

```bash
npm install -g vercel
vercel link
vercel dev
```

Copy `.env.example` to `.env` and fill in `ANTHROPIC_API_KEY` (get one at [console.anthropic.com](https://console.anthropic.com)). `ALLOWED_ORIGIN` can stay unset locally — it only matters in production, where it's set in Vercel's project settings alongside the API key.

## Structure

```
src/data/content.json     — every piece of content on the site
src/components/Scene.jsx  — the desk, the scaling/scene logic, entry point
src/components/DeskTop.jsx, PanelBody.jsx — icons, windows, content views
src/components/Assistant.jsx, AssistantContext.jsx — the chat feature
src/components/ProfessionalView.jsx — the recruiter-friendly alternate view
api/ask.js                — the serverless function behind the assistant
```
