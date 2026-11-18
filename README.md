# Emmanuel Osanebi — portfolio (Astro + Tailwind)

Static site for https://emms204.github.io (GitHub Pages user site, base `/`). Self-hosted fonts, no trackers, no third-party scripts. Small inline scripts progressively enhance the homepage demos (Proof Bench, Privacy Lens, Story Engine), the intent chooser and the contact form; every page works with JavaScript off. Pages without a demo or form ship no JS.

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
npm run check     # astro check (types + templates)
npm test          # after a build: routes, confidentiality grep, cv.pdf md5, no ?state= preview in prod
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

## THE WORKS slice (branch `the-works-slice`, IMPL-20261118-02, preview only)

- Homepage `/`: hero, "What brings you here?" intent chooser, Proof Bench (synthetic 4-step reconciliation), three minds, selected work, About (`#about #experience #skills`), contact (`#contact`). Old anchors `#home #portfolio-overview #projects #work` kept.
- New routes: `/solutions/`, `/products/`, `/journal/`, `/contact/`. Old routes kept as aliases that render the new page with a "Moved" note and a canonical link: `/commission/`→`/solutions/`, `/shelf/`→`/products/`, `/press/`→`/journal/`, `/sign/`→`/contact/` (so `/sign/?path=…#brief` and `/commission/#offer-*` keep working).
- `?path=` mapping (`PATH_TO_INTENT` in `src/content/profile.ts`):
  | old value | new intent |
  |---|---|
  | client | build (Solve a problem) |
  | customer | products (Explore products) |
  | employer | hire (Hire / evaluate engineering) |
  | collaborator | collaborate (Explore an idea / collaborate) |
  | partner | collaborate |
  New values `build|products|hire|collaborate` work too. JS off: chooser links are `/?path=<key>#for-<key>` and CSS `:target` shows the panel; a bare `/?path=<old>` without JS shows the default (build) panel.
- Inquiry form (`/contact/`): plain `POST` to `FORMSPREE_ENDPOINT` (works with JS off; Formspree shows its own thank-you page). With JS: `fetch` + JSON, inline success / failure / per-field errors, mailto fallback always visible. `/contact/?intent=<key>` preselects the intent. Screenshot preview: `/contact/?state=success` or `/contact/?state=failure` (shows the panel, sends nothing).
- Preview: `npm run build && npx astro preview --host 127.0.0.1 --port 4322` → http://127.0.0.1:4322/

## THE WORKS v2 (branch `works-v2`, IMPL-20261118-03, preview only)

- Homepage first screen: offer line + "See what I can build for you" (→ `/solutions/`) and "Start an inquiry".
- "Three pieces on the bench" (`#bench`): Proof Bench (`#proof-bench`, approval shows a clearly labelled SIMULATED audit-log entry, DOM only), Privacy Lens (`#privacy-lens`, rule-based masking illustration on synthetic text; rules in `src/lib/privacyLens.ts`, no network calls), Story Engine (`#story-engine`, fictional ScriptGen-style bible check, two branches).
- Solutions: each offer has a typical example deliverable and typical prerequisites (sources in `works.solutions.offers[].basis`).
- Contact form is intent-aware: one fieldset per intent (`build`, `products`, `hire`, `collaborate`). JS on: only the chosen group is shown/enabled/required. JS off: all groups visible under labelled fieldsets.
- `?state=success|failure` form preview exists only in `astro dev` (`import.meta.env.DEV`); production builds do not contain it (checked by `npm test`).
