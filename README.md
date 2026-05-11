# Antonio Rawad Nassar — Portfolio

Personal portfolio / CV website. Built with **Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**.

## Edit your content

Everything you see on the page comes from one file:

```
src/lib/profile.ts
```

Open it, change your name / role / experience / projects / skills / links, save — the page updates automatically. Placeholders are marked with `// TODO`.

To drop in a downloadable CV: put the PDF in `public/` (e.g. `public/antonio-rawad-nassar-cv.pdf`) and set `resumeUrl` in `profile.ts`.

## Change the look

- `src/app/globals.css` — colors, fonts, background, scroll behavior (CSS variables at the top).
- `src/app/page.tsx` — page layout and section markup.

## Run it locally

```bash
npm install      # first time only
npm run dev      # http://localhost:3000
```

Other commands:

```bash
npm run build    # production build
npm run start    # serve the production build
npm run lint     # eslint
```

## Deploy

Easiest: import the repo on [Vercel](https://vercel.com/new) — it auto-detects Next.js, no config needed. (Netlify / Cloudflare Pages also work.)

## Project structure

```
src/
  app/
    layout.tsx     # fonts + <head> metadata
    page.tsx       # the whole portfolio page (sections as components)
    globals.css    # theme tokens + global styles
  lib/
    profile.ts     # ← your content lives here
public/            # static assets (images, CV pdf, og image…)
```
