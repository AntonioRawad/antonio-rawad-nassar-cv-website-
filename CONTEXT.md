# CONTEXT — Antonio Rawad Nassar · Portfolio

Orientation doc for anyone (human or agent) landing in this repo. Read this first.

## What this is

Antonio Rawad Nassar's personal portfolio / CV website. A **trilingual single-page site**
(EN · AR · HE, with full RTL) positioning him as a **"C-Level Strategy & AI Transformation
Advisor"**. Dark "Azure Blueprint" visual system — night-sky-black canvas, cyan (`#00FFFF`)
primary accent, copper (`#B87333`) warmth, glass surfaces, restrained cinematic motion.

It was implemented from a **Claude Design handoff bundle** (HTML/CSS/JS prototype). The original
prototype is kept verbatim under `design-handoff/` for reference only — **it is never built or
served; don't edit it.**

Standalone repo: `github.com/AntonioRawad/antonio-rawad-nassar-cv-website-` (branch `main`). It is
**not** part of any monorepo — stay inside this folder.

## Stack

- Next.js 16 (App Router, Turbopack) + TypeScript
- **No Tailwind** — the site uses its own CSS (`src/app/tokens.css` + `src/app/design.css`)
- `embla-carousel-react` — the project drag carousel
- `framer-motion` — carousel card animation (scale / opacity / blur depth)
- Local fonts (Cairo, JetBrains Mono) from `public/fonts/`; Outfit + Hebrew/Arabic Google Fonts via `<link>` in `layout.tsx`
- `page.tsx` is `"use client"` (it owns language state, scroll-reveal, carousel, etc.)

## File map

```
src/
  app/
    layout.tsx     # <html>, <head> Google-Fonts links, metadata
    page.tsx       # "use client" — the whole page; sections are local components:
                   #   HeroIdentityPanel · ClarityEngine · AdvisoryOS · Projects + ProjectMotionRail
                   #   · Audiences (orbit) · Timeline · Ecosystem · Leadership · FinalCta · Footer
    tokens.css     # design tokens (colors, type scale, spacing, motion) + @font-face
    design.css     # all component styles + RTL overrides + keyframes
  lib/
    content.ts     # ← ALL copy (EN/AR/HE) + social links + phone. Single source of truth for text.
public/
  fonts/           # Cairo*.ttf, JetBrainsMono-VariableFont_wght.ttf
  assets/          # antonio-portrait.png
  cv/              # Antonio-Rawad-Nassar.pdf  (not currently linked from the UI)
design-handoff/    # original Claude Design prototype + source biography docx — REFERENCE ONLY, not built
```

## How to change things

- **Copy / text** → edit `src/lib/content.ts` (per-section, per-locale). Nothing else needed.
- **Colors / type / spacing / motion tokens** → `src/app/tokens.css`.
- **Component styles / layout / animations** → `src/app/design.css`.
- **Markup / structure** → `src/app/page.tsx` (each section is a function component).
- **Google fonts** → the `<link>` tags in `src/app/layout.tsx`.

## Hard rules

- **No ESG.** ESG / "Sustainable Finance" / "green-investment" / "carbon-credit" / "sustainability
  narrative" content was deliberately removed everywhere and replaced with **"Startup Operations &
  Strategic Development"** (market entry & penetration, operating models, risk management,
  investor-readiness, execution roadmaps). Do not reintroduce any of it. (The `AgriSolarCom ·
  TriSolar · DualHarvest` renewable/agrivoltaic project — Acting MD · CFO-level — is legitimate and
  stays; only the ESG-advisory lane was removed.)
- Keep the trilingual + RTL discipline: when you touch text or layout, update `en`/`ar`/`he` and use
  logical CSS properties (`inset-inline-*`, `margin-inline-*`, `:dir()`/`html[dir="rtl"]`).
- Respect `prefers-reduced-motion` — every animation already has a fallback in `design.css`; keep that.
- `design-handoff/` is reference material — don't build, serve, or modify it.

## Commands

```bash
npm install        # first time
npm run dev        # http://localhost:3000  (auto-bumps to 3001 if 3000 is busy; or: npm run dev -- -p 3001)
npx tsc --noEmit   # typecheck — must be clean
npm run build      # production build — must be clean
npm run lint
```

## Deploy

Import the repo on [Vercel](https://vercel.com/new) — auto-detects Next.js, zero config. (Netlify /
Cloudflare Pages also work.)
