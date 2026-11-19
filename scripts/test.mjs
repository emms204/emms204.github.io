// Small post-build test: routes exist in dist, confidentiality grep, cv.pdf md5,
// and production builds ignore the dev-only ?state= form preview.
// Usage: npm run build && npm test
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = process.env.DIST || 'dist';
const CV_MD5 = '54995be92e7ef1c98f45591cbd303f68';
const ROUTES = [
  '/', '/solutions/', '/products/', '/journal/', '/contact/', '/work/', '/margins/', '/archive/',
  '/commission/', '/shelf/', '/press/', '/sign/',
  '/work/reconciliation/', '/work/merchant-onboarding/', '/work/voteriq-pipeline/', '/work/fraud-compliance-reinsurance/',
  '/work/grunsco-automate/', '/work/devgenie/', '/work/scriptgen/', '/work/enza-chat/',
  '/letters/', '/letters/do-as-i-say-not-as-i-do/', '/letters/worth-the-wait/', '/letters/sorrow-sorrow-prayers/', '/chess/',
  '/404.html', '/sitemap.xml', '/cv.pdf', '/og.png',
];
// Names that must never appear in the demos (homepage pieces + contact form).
const DEMO_BANNED = /ReconPilot|MasteryHive|ContinentalRe|Continental Re|Opay/i;
// Names that must never appear anywhere in the built site (ReconPilot: Emmanuel, Nov 19 2026).
const SITE_BANNED = /ContinentalRe|Continental Re|\bOpay\b|Recon ?Pilot/i;

let failed = 0;
const ok = (name, cond, detail = '') => { console.log(`${cond ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`); if (!cond) failed++; };
const file = (r) => join(DIST, r.endsWith('/') ? r + 'index.html' : r);

if (!existsSync(DIST)) { console.error('dist/ missing: run npm run build first'); process.exit(1); }

const missing = ROUTES.filter((r) => !existsSync(file(r)));
ok(`routes (${ROUTES.length})`, missing.length === 0, missing.join(' '));

const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const text = walk(DIST).filter((p) => /\.(html|js|css|xml|txt|json)$/.test(p));
const siteHits = text.filter((p) => SITE_BANNED.test(readFileSync(p, 'utf8')));
ok('confidentiality: site-wide banned names', siteHits.length === 0, siteHits.join(' '));

const home = readFileSync(file('/'), 'utf8');
const demos = ['proof-bench', 'privacy-lens', 'story-engine'].map((id) => {
  const m = home.match(new RegExp(`<article id="${id}"[\\s\\S]*?</article>`)); return [id, m ? m[0] : ''];
});
demos.forEach(([id, html]) => ok(`demo present: #${id}`, html.length > 0));
const demoHits = demos.filter(([, html]) => DEMO_BANNED.test(html)).map(([id]) => id);
ok('confidentiality: no internal/client names in demos', demoHits.length === 0, demoHits.join(' '));
ok('demos are labelled synthetic / illustration', demos.every(([, html]) => /Illustration/.test(html)) && /SYNTHETIC/.test(demos[1][1]));

const contact = readFileSync(file('/contact/'), 'utf8');
ok('form: Formspree endpoint, honeypot, _subject', contact.includes('https://formspree.io/f/xjywrjrz') && contact.includes('name="_gotcha"') && contact.includes('name="_subject"'));
ok('form: one fieldset per intent', ['build', 'products', 'hire', 'collaborate'].every((k) => contact.includes(`data-group="${k}"`)));
ok("prod build: no ?state= preview code", !text.some((p) => readFileSync(p, 'utf8').includes("get('state')")));
ok('no network calls in Privacy Lens', !/fetch\(|XMLHttpRequest/.test(demos[1][1]));


// works-v4: Living System, progressive-discovery pieces, engineering journey, JS budget.
const sec = (id) => (home.match(new RegExp(`<section id="${id}"[\\s\\S]*?</section>`)) || [''])[0];
const living = sec('living');
ok('living system: present and labelled conceptual + synthetic', /Conceptual illustration/.test(living) && /Synthetic data/.test(living));
const steps = [...living.matchAll(/<p class="ls-step-h"><span class="fig">\d+<\/span> (\w+)<\/p>/g)].map((m) => m[1]);
ok('living system: four steps in order (static list)', steps.join() === 'Input,Interpret,Verify,Decide', steps.join());
ok('living system: both outcomes in no-JS HTML', /ls-out is-ok/.test(living) && /ls-out is-bad/.test(living) && /\$720\.00/.test(living));
ok('living system: controls hidden without JS, links to #proof-bench', /data-ls-controls hidden/.test(living) && /href="#proof-bench"/.test(living));
ok('living system: no client/internal names', !DEMO_BANNED.test(living));
ok('pieces: progressive discovery, Proof Bench open by default', (home.match(/<details class="fold"/g) || []).length === 3 && /<details class="fold" open/.test(home) && !/pieces-grid/.test(home));
const journey = sec('journey');
const eras = journey.match(/<li id="era-[a-z]+"/g) || [];
ok('journey: five eras, chronological, with details', eras.length === 5 && eras[0].includes('perception') && eras[4].includes('accountability') && (journey.match(/<details>/g) || []).length === 5);
const CV_PERIODS = ['Jul 2021 – Dec 2022', 'Jul 2022 – Dec 2023', 'Jan 2024 – Dec 2025', 'Mar 2026 – Jul 2026', 'Aug 2026 – Present'];
ok('journey: periods match the CV record', CV_PERIODS.every((p) => journey.includes(p)));
ok('journey: every image credited and labelled reference', (journey.match(/Reference image: <a href="https:\/\/commons\.wikimedia\.org/g) || []).length === 5 && /not from my projects/.test(journey));
ok('journey: images are AVIF/WebP with fixed dimensions', /type="image\/avif"/.test(journey) && /type="image\/webp"/.test(journey) && (journey.match(/<img[^>]*width="320"[^>]*height="200"|<img[^>]*height="200"[^>]*width="320"/g) || []).length === 5);
ok('journey: filters hidden without JS', /data-jy-filters hidden/.test(journey));
ok('record list kept', /<ol class="record">/.test(home));
const credits = existsSync('IMAGE-CREDITS.md') ? readFileSync('IMAGE-CREDITS.md', 'utf8') : '';
ok('IMAGE-CREDITS.md lists all five images', ['perception', 'language', 'application', 'orchestration', 'accountability'].every((k) => credits.includes(`${k}.jpg`)));
ok('hero: old third line removed', !/Stories worth telling/.test(sec('home')));
const inline = [...home.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
const gz = gzipSync(inline).length;
ok('homepage JS <= 4 KB gzipped (inline, no external bundles)', gz <= 4096 && !/<script[^>]*\bsrc=/.test(home), `${gz} B gz`);

// works-v5: backdrop options. Production builds never ship the ?bg= review switch.
const pick = (home.match(/<html[^>]*data-bg="([abc])"/) || [])[1] || '';
ok('backdrop: no ?bg= preview switch in production build', !text.some((p) => readFileSync(p, 'utf8').includes("get('bg')")));
ok('backdrop: markup matches the build pick', pick ? (home.includes(`class="bg-${pick}"`) && ['a', 'b', 'c'].filter((k) => k !== pick).every((k) => !home.includes(`class="bg-${k}"`))) : !home.includes('class="bgfx"'), pick || 'none');
ok('backdrop: production default is option A (Emmanuel, 19 Nov 2026)', process.env.DIST ? true : pick === 'a', pick || 'none');
ok('backdrop A: no scroll-driven intensity, caption or meter (Emmanuel, 19 Nov 2026)', !/ga-cap|ga-meter|vanishing|exploding/i.test(home) && !/addEventListener\(['"]scroll['"]/.test(inline) && !/ga-field/.test(inline));
ok('backdrop A: Rejected reaction is CSS-only and present', /#living\.run\[data-case="?b"?\]\) \.ga-hot/.test(home));
ok('backdrop: decorative only (aria-hidden), no canvas/WebGL', (!pick || /<div class="bgfx" aria-hidden="true"/.test(home)) && !/getContext\(|three(\.module)?\.js|WebGL/i.test(home));

// works-v6: Letters, About additions, one annotated chess game (Emmanuel, t50u–t52u, 19 Nov 2026).
const letterDirs = existsSync(join(DIST, 'letters')) ? readdirSync(join(DIST, 'letters')).filter((d) => statSync(join(DIST, 'letters', d)).isDirectory()) : [];
const lettersIdx = readFileSync(file('/letters/'), 'utf8');
const sitemap = readFileSync(file('/sitemap.xml'), 'utf8');
ok('letters: index lists every built letter, with hook and reading time', letterDirs.length > 0 && letterDirs.every((d) => lettersIdx.includes(`href="/letters/${d}/"`)) && /min read/.test(lettersIdx) && /class="letter-hook"/.test(lettersIdx), letterDirs.join(' '));
ok('letters: drafts never reach the build', !text.some((p) => /TEXT MISSING|DRAFT: only/.test(readFileSync(p, 'utf8'))));
ok('letters: sitemap has /letters/, every letter and /chess/', ['/letters/', ...letterDirs.map((d) => `/letters/${d}/`), '/chess/'].every((r) => sitemap.includes(`<loc>https://emms204.github.io${r}</loc>`)));
const sorrow = readFileSync(file('/letters/sorrow-sorrow-prayers/'), 'utf8');
ok('letters: Sorrow, sorrow, prayers has its title, canonical, Article JSON-LD and the line kept as written', /<h1 id="h"[^>]*>Sorrow, sorrow, prayers<\/h1>/.test(sorrow) && /rel="canonical" href="https:\/\/emms204\.github\.io\/letters\/sorrow-sorrow-prayers\/"/.test(sorrow) && /"@type":"Article"/.test(sorrow) && /Man is the only animal that refuses to be what he is\./.test(sorrow) && /Dylan Thomas/.test(sorrow));
ok('letters: no email headers or addresses in any letter', letterDirs.every((d) => { const h = readFileSync(file(`/letters/${d}/`), 'utf8').match(/<div class="letter-body">[\s\S]*?<\/div>/)[0]; return !/@|favour|\bto me\b|\(\d+ hours ago\)/i.test(h); }));
ok('letters: linked from nav and Journal', /<nav aria-label="Main"[\s\S]*?href="\/letters\/"/.test(home) && readFileSync(file('/journal/'), 'utf8').includes('href="/letters/"'));
ok('letters: one homepage excerpt card', (home.match(/class="letters-card"/g) || []).length === 1 && /<section id="letters"/.test(home));
const about = sec('about');
ok('about: pull quote, "Liverpool supporter." and chess link; no club imagery', /<blockquote><p>Man is the only animal that refuses to be what he is\.<\/p><\/blockquote>/.test(about) && /<p class="mt-4">Liverpool supporter\.<\/p>/.test(about) && /href="\/chess\/"/.test(about) && !/crest|jersey|anfield|You'll Never Walk Alone/i.test(text.map((p) => readFileSync(p, 'utf8')).join('')));
ok('chess: not on the homepage beyond the About link', !/data-chess|class="cb/.test(home));
const chess = readFileSync(file('/chess/'), 'utf8');
const cdata = JSON.parse(readFileSync('src/data/chess-MGXNlk6v.json', 'utf8'));
ok('chess: PGN facts (White, 60+0 bullet, 2142 v 2249, London System, 18 moves, 1-0)', cdata.white === 'RealEmms' && cdata.timeControl === '60+0' && cdata.whiteElo === 2142 && cdata.blackElo === 2249 && cdata.opening === 'London System' && cdata.plies.length === 35 && cdata.result === '1-0' && cdata.plies[32].san === 'Nxf5' && cdata.plies[34].san === 'Bxc7');
ok('chess: framed as bullet, links the Lichess game', /Bullet chess/.test(chess) && chess.includes('href="https://lichess.org/game/MGXNlk6v"'));
ok('chess: works without JS (static SVG board, full move list, 3 notes, controls hidden)', /<svg class="cb cb-lg"[^>]*role="img"/.test(chess) && (chess.match(/class="mv( mv-key)?" data-ply=/g) || []).length === 35 && (chess.match(/<li id="m\d+">/g) || []).length === 3 && /data-chess-ctl hidden/.test(chess));
const cjs = [...chess.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/(ld\+)?json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[2]).join('\n');
ok('chess: small separate script (<= 2 KB gz), keyboard arrows', gzipSync(cjs).length <= 2048 && /ArrowLeft/.test(cjs) && !/<script[^>]*\bsrc=/.test(chess), `${gzipSync(cjs).length} B gz`);

// works-v6 round 2: full texts of the two remaining letters, approved edits (t52u, 19 Nov 2026).
const doas = readFileSync(file('/letters/do-as-i-say-not-as-i-do/'), 'utf8'), worth = readFileSync(file('/letters/worth-the-wait/'), 'utf8');
ok('letters: three published, Do as I say leads the index and the homepage card', letterDirs.length === 3 && lettersIdx.indexOf('/letters/do-as-i-say-not-as-i-do/') < lettersIdx.indexOf('/letters/worth-the-wait/') && lettersIdx.indexOf('/letters/worth-the-wait/') < lettersIdx.indexOf('/letters/sorrow-sorrow-prayers/') && /<h2 id="letters-h"[^>]*><a href="\/letters\/do-as-i-say-not-as-i-do\/">/.test(home));
ok('letters: approved edits applied (no tipsy, no swear, softened line, typos fixed)', !/tipsy|ass off|shuffling|regrest|withing|elsem|oncemore|Well imagined|what will do/i.test(doas + worth) && /working myself to the bone/.test(doas) && /moving on from people too easily/.test(doas) && /Imagine if he absconded/.test(worth) && /what we will do/.test(worth));
ok('letters: Re:Zero trimmed and credited; Habakkuk and salary comparisons kept', /Re:Zero − Starting Life in Another World/.test(worth) && !/if your fingers still move/.test(worth) && /Habakkuk 2:1/.test(worth) && /Habakkuk 2:3/.test(worth) && /₦150k and a ₦1\.5m job/.test(doas));
ok('letters: voice and sign-offs kept', /Mannnn, breathe/.test(worth) && /Na so your papa do you\?/.test(worth) && /Yours, in waiting/.test(worth) && /Yours in contradiction,/.test(doas) && /Have a great new week, my friend\./.test(doas) && /Have a great week, my friend\./.test(worth));

const md5 = createHash('md5').update(readFileSync('public/cv.pdf')).digest('hex');
const md5d = createHash('md5').update(readFileSync(join(DIST, 'cv.pdf'))).digest('hex');
ok('cv.pdf md5 (public + dist)', md5 === CV_MD5 && md5d === CV_MD5, md5);

console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
