# CLAUDE.md

Project context lives in @CONTEXT.md — read it first (what this repo is, the stack, the file map,
how to change copy vs. styles, the trilingual/RTL rules, and the "no ESG" rule).

Next.js framework agent rules: @AGENTS.md

When in doubt: edit `src/lib/content.ts` for copy, `src/app/{tokens,design}.css` for styling,
`src/app/page.tsx` for structure. Keep `npx tsc --noEmit` and `npm run build` clean. Don't touch
`design-handoff/`.
