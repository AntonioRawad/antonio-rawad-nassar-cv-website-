# Antonio Rawad Nassar — Portfolio

C-Level Strategy & AI Transformation Advisor. Trilingual (EN / AR / HE) single-page
portfolio with RTL support, built on **Next.js 16** (App Router) + **TypeScript**.

Implemented from a Claude Design handoff bundle — see [`design-handoff/`](./design-handoff/)
for the original HTML/CSS/JS prototype the design was authored in.

## Edit the content

All copy lives in one file:

```
src/lib/content.ts
```

It holds the EN / AR / HE strings for every section (hero, positioning, advisory,
projects, audiences, timeline, ecosystem, leadership, contact, footer). Edit the
strings, save — the page updates. Social links and the phone number are in the
`social` block at the bottom of that file.

## Change the look

- `src/app/tokens.css` — design system tokens: colours, type scale, spacing, motion. Local fonts (Cairo, JetBrains Mono) are declared here and shipped from `public/fonts/`.
- `src/app/design.css` — all component styles (nav, hero, clarity engine, advisory grid, projects, timeline, ecosystem, CTA, footer, RTL overrides, animations).
- `src/app/page.tsx` — the page itself (sections as React components).
- Google Fonts (Outfit, Heebo, Frank Ruhl Libre, IBM Plex Sans Arabic, …) are loaded via `<link>` tags in `src/app/layout.tsx`.

## Run it locally

```bash
npm install      # first time only
npm run dev      # http://localhost:3000
```

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Deploy

Import the repo on [Vercel](https://vercel.com/new) — it auto-detects Next.js, no config needed.

## Structure

```
src/
  app/
    layout.tsx       # <html>, <head> (Google Fonts), metadata
    page.tsx         # "use client" — the full portfolio (sections as components)
    tokens.css       # design tokens + @font-face (local fonts)
    design.css       # component styles + RTL + animations
  lib/
    content.ts       # ← all EN/AR/HE copy + social links
public/
  fonts/             # Cairo + JetBrains Mono (.ttf)
  assets/            # antonio-portrait.png
  cv/                # Antonio-Rawad-Nassar.pdf
design-handoff/      # original Claude Design prototype (reference only — not built)
```
