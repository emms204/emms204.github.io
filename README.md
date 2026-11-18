# Emmanuel Osanebi — portfolio (Astro + Tailwind)

Static site for https://emms204.github.io (GitHub Pages user site, base `/`). Zero client JS, system fonts, no trackers.

## Content
All copy lives in **`src/content/profile.ts`**. Components never hard-code text.
Source of truth for facts: `/workspace/portfolio/profile.md` (each section's provenance is in `profile.sources`).
Withheld until Emmanuel confirms: profile.md §6 unverified metrics and §7 CV conflicts.
CV: `public/cv.pdf` is written directly by the CV author. `scripts/copy-cv.mjs` (prebuild) never overwrites it; it only seeds it from `/workspace/portfolio/cv.pdf` if missing.

## Commands
```bash
npm ci
npm run dev       # http://localhost:4321
npm run build     # → dist/
npm run preview
```

## Deploy (after Emmanuel approves the preview)
Option A (recommended): commit this folder as the root of `emms204/emms204.github.io`, set Settings → Pages → Source = GitHub Actions; `.github/workflows/deploy.yml` builds and deploys on push to `main`.
Option B: push the contents of `dist/` (including `.nojekyll`) to the branch Pages serves from.

## Phase 3 — "Sketch · Ink · Sign" (local branch `redesign-concept-a`, not published)
- Copy: `src/content/profile.ts` (`profile` = facts, `atelier` = phase-3 copy, `sources` = provenance).
- Switches: `src/config.ts` — `FORMSPREE_ENDPOINT` (empty = mailto fallback), `SHOW_PLACEHOLDERS` (set false before publishing), `ART_PIECES`/`ART_MIN` (Sketchbook hidden until ≥3), `SHOW_QUOTES` (off; no testimonials exist).
- Fonts: subset woff2 in `public/fonts` (Fraunces 500 + 400 italic, Hanken Grotesk variable, JetBrains Mono 400; SIL OFL). Only Fraunces 500 is preloaded.
- Preview: `npm run build && (cd dist && python3 -m http.server 4321 --bind 127.0.0.1)` → http://127.0.0.1:4321
- Revert: `git checkout main` (phase-2 baseline) or restore `/workspace/portfolio/backups/phase2-20261118-171318/`.
