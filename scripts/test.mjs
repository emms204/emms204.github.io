// Small post-build test: routes exist in dist, confidentiality grep, cv.pdf md5,
// and production builds ignore the dev-only ?state= form preview.
// Usage: npm run build && npm test
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';
const atelier = { caseFiles: ['reconciliation', 'merchant-onboarding', 'voteriq-pipeline', 'fraud-compliance-reinsurance', 'grunsco-automate', 'devgenie', 'scriptgen', 'enza-chat'].map((slug) => ({ slug })) };

const DIST = process.env.DIST || 'dist';
const CV_MD5 = '54995be92e7ef1c98f45591cbd303f68';
const ROUTES = [
  '/', '/solutions/', '/products/', '/journal/', '/contact/', '/work/', '/margins/', '/archive/', '/index/',
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
ok('living system: controls hidden without JS; Proof Bench is its step-through <details>', /data-ls-controls hidden/.test(living) && /<details class="living-step fold">[\s\S]*<article id="proof-bench"/.test(living));
ok('living system: no client/internal names', !DEMO_BANNED.test(living));
const piecesSec = sec('bench');
ok('pieces: two folds (Privacy Lens, Story Engine), no second Proof Bench', (piecesSec.match(/<details class="fold"/g) || []).length === 2 && !/proof-bench/.test(piecesSec) && !/pieces-grid/.test(home));
const journey = sec('journey');
const eras = journey.match(/<li id="era-[a-z]+"/g) || [];
ok('journey: five eras, chronological, with details', eras.length === 5 && eras[0].includes('perception') && eras[4].includes('accountability') && (journey.match(/<details>/g) || []).length === 5);
const CV_PERIODS = ['Jul 2021 – Dec 2022', 'Jul 2022 – Dec 2023', 'Jan 2024 – Dec 2025', 'Mar 2026 – Jul 2026', 'Aug 2026 – Present'];
ok('journey: periods match the CV record', CV_PERIODS.every((p) => journey.includes(p)));
ok('journey: every image credited and labelled reference', (journey.match(/Reference image: <a href="https:\/\/commons\.wikimedia\.org/g) || []).length === 5 && /not from my projects/.test(journey));
ok('journey: images are AVIF/WebP with fixed dimensions', /type="image\/avif"/.test(journey) && /type="image\/webp"/.test(journey) && (journey.match(/<img[^>]*width="320"[^>]*height="200"|<img[^>]*height="200"[^>]*width="320"/g) || []).length === 5);
ok('journey: filters hidden without JS', /data-jy-filters hidden/.test(journey));
ok('about: no duplicate role timeline (the journey is the single career narrative)', !/<ol class="record">/.test(home) && /class="skills-compact"/.test(sec('about')) && /href="\/cv\.pdf"/.test(sec('about')));
const credits = existsSync('IMAGE-CREDITS.md') ? readFileSync('IMAGE-CREDITS.md', 'utf8') : '';
ok('IMAGE-CREDITS.md lists all five images', ['perception', 'language', 'application', 'orchestration', 'accountability'].every((k) => credits.includes(`${k}.jpg`)));
ok('hero: old third line removed', !/Stories worth telling/.test(sec('home')));
const inline = [...home.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/ld\+json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[1]).join('\n');
const gz = gzipSync(inline).length;
ok('homepage JS <= 4 KB gzipped (inline, no external bundles; nav included)', gz <= 4096 && !/<script[^>]*\bsrc=/.test(home), `${gz} B gz`);

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
ok('letters: linked from the Index and Journal', /<nav aria-labelledby="ix-h"[\s\S]*?href="\/letters\/"/.test(readFileSync(file('/index/'), 'utf8')) && readFileSync(file('/journal/'), 'utf8').includes('href="/letters/"'));
ok('letters: one homepage excerpt card', (home.match(/class="letters-card"/g) || []).length === 1 && /<section id="letters"/.test(home));
const about = sec('about');
ok('about: pull quote, "Liverpool supporter." and chess link; no club imagery', /<blockquote><p>Man is the only animal that refuses to be what he is\.<\/p><\/blockquote>/.test(about) && /<p class="mt-4">Liverpool supporter\.<\/p>/.test(about) && /href="\/chess\/"/.test(about) && !/crest|jersey|anfield|You'll Never Walk Alone/i.test(text.map((p) => readFileSync(p, 'utf8')).join('')));
ok('chess: not on the homepage beyond the About link and the Index preview', !/data-chess|data-cb|class="cb/.test(home.replace(/<dialog[\s\S]*?<\/dialog>/, '')));
const chess = readFileSync(file('/chess/'), 'utf8');
const cdata = JSON.parse(readFileSync('src/data/chess-MGXNlk6v.json', 'utf8'));
ok('chess: PGN facts (White, 60+0 bullet, 2142 v 2249, London System, 18 moves, 1-0)', cdata.white === 'RealEmms' && cdata.timeControl === '60+0' && cdata.whiteElo === 2142 && cdata.blackElo === 2249 && cdata.opening === 'London System' && cdata.plies.length === 35 && cdata.result === '1-0' && cdata.plies[32].san === 'Nxf5' && cdata.plies[34].san === 'Bxc7');
ok('chess: framed as bullet, links the Lichess game', /Bullet chess/.test(chess) && chess.includes('href="https://lichess.org/game/MGXNlk6v"'));
ok('chess: works without JS (static SVG board, full move list, 3 notes, controls hidden)', /<svg class="cb cb-lg"[^>]*role="img"/.test(chess) && (chess.match(/class="mv( mv-key)?" data-ply=/g) || []).length === 35 && (chess.match(/<li id="m\d+">/g) || []).length === 3 && /data-chess-ctl hidden/.test(chess));
const cjs = [...chess.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*application\/(ld\+)?json)[^>]*>([\s\S]*?)<\/script>/g)].map((m) => m[2]).filter((t) => /data-chess/.test(t)).join('\n'); // the chess script only (site nav scripts are measured separately)
ok('chess: small separate script (<= 2 KB gz), keyboard arrows', gzipSync(cjs).length <= 2048 && /ArrowLeft/.test(cjs) && !/<script[^>]*\bsrc=/.test(chess), `${gzipSync(cjs).length} B gz`);

// works-v6 round 2: full texts of the two remaining letters, approved edits (t52u, 19 Nov 2026).
const doas = readFileSync(file('/letters/do-as-i-say-not-as-i-do/'), 'utf8'), worth = readFileSync(file('/letters/worth-the-wait/'), 'utf8');
ok('letters: three published, Do as I say leads the index and the homepage card', letterDirs.length === 3 && lettersIdx.indexOf('/letters/do-as-i-say-not-as-i-do/') < lettersIdx.indexOf('/letters/worth-the-wait/') && lettersIdx.indexOf('/letters/worth-the-wait/') < lettersIdx.indexOf('/letters/sorrow-sorrow-prayers/') && /<h2 id="letters-h"[^>]*><a href="\/letters\/do-as-i-say-not-as-i-do\/">/.test(home));
ok('letters: approved edits applied (no tipsy, no swear, softened line, typos fixed)', !/tipsy|ass off|shuffling|regrest|withing|elsem|oncemore|Well imagined|what will do/i.test(doas + worth) && /working myself to the bone/.test(doas) && /moving on from people too easily/.test(doas) && /Imagine if he absconded/.test(worth) && /what we will do/.test(worth));
ok('letters: Re:Zero trimmed and credited; Habakkuk and salary comparisons kept', /Re:Zero − Starting Life in Another World/.test(worth) && !/if your fingers still move/.test(worth) && /Habakkuk 2:1/.test(worth) && /Habakkuk 2:3/.test(worth) && /₦150k and a ₦1\.5m job/.test(doas));
ok('letters: voice and sign-offs kept', /Mannnn, breathe/.test(worth) && /Na so your papa do you\?/.test(worth) && /Yours, in waiting/.test(worth) && /Yours in contradiction,/.test(doas) && /Have a great new week, my friend\./.test(doas) && /Have a great week, my friend\./.test(worth));

// works-v6 round 3: Liverpool red accent, shelf, 404 copy, letter fixes (Emmanuel, t53u, 19 Nov 2026).
const shelfHtml = (lettersIdx.match(/<section id="shelf"[\s\S]*?<\/section>/) || [''])[0];
ok('shelf: on /letters/, five question rows as native <details>, not on the homepage', (shelfHtml.match(/<details class="shelf-row"/g) || []).length === 5 && !/id="shelf"/.test(home));
ok('shelf: text only, no <img>, <picture>, <svg> or background images', shelfHtml.length > 0 && !/<img|<picture|<svg|url\(/i.test(shelfHtml));
ok('shelf: links to its three letters, adds no script', ['worth-the-wait', 'do-as-i-say-not-as-i-do', 'sorrow-sorrow-prayers'].every((l) => shelfHtml.includes(`href="/letters/${l}/"`)) && !/<script/.test(shelfHtml));
ok('shelf: lines marked DRAFT in source', (readFileSync('src/content/shelf.ts', 'utf8').match(/line: 'DRAFT: /g) || []).length === 5);
ok('accent: Liverpool red tokens, old brick red gone', /--seal: ?#C8102E/i.test(home) && /--seal: ?#FF5A6E/i.test(home) && !/#B8361D|#A02D17|#FF6B4E|#FF8065/i.test(home));
ok('accent: no crest, Liver bird, LFC text or lyrics', !text.some((p) => /Liver ?bird|\bLFC\b|walk on,? walk on|at the end of a storm/i.test(readFileSync(p, 'utf8'))));
const nf = readFileSync(file('/404.html'), 'utf8');
ok('404: title phrase only', /You’ll never walk alone\./.test(nf) && /Here’s the way back\./.test(nf));
ok('letters: signature dish, secondary-school fix', /signature dish/.test(worth) && !/signatory/.test(worth) && /secondary school also couldn’t be longer than 6 years/.test(worth) && !/longer than secondary school/.test(worth));

// works-v7: restructure (Emmanuel, t54u: "Yes, build the fixes into the preview", 19 Nov 2026).
const allText = text.map((p) => readFileSync(p, 'utf8')).join('\n');
ok('copy: no "(CV; confirmed)" or "?path=" hint in public text', !/\(CV; confirmed\)|confirmed by Emmanuel|Share a choice with|\?path=…/.test(allText));
ok('copy: ?path= intents still wired (links + script)', ['build', 'products', 'hire', 'collaborate'].every((k) => home.includes(`href="/?path=${k}#for-${k}"`)) && /get\(['"]path['"]\)/.test(inline));
ok('proof bench: exactly one on the homepage, inside the Living System', (home.match(/id="proof-bench"/g) || []).length === 1 && !/ACME|GLOBEX/.test(home.replace(/<article id="proof-bench"[\s\S]*?<\/article>/, '')));
const lists = [...home.matchAll(/<ol class="evidence">[\s\S]*?<\/ol>|<p class="era-links">[\s\S]*?<\/p>|<ol class="work-index">[\s\S]*?<\/ol>|<ol class="pieces-index">[\s\S]*?<\/ol>/g)].map((m) => m[0]).join('\n');
const proj = [...lists.matchAll(/href="(\/work\/[a-z-]+\/|\/products\/#[a-z-]+)"/g)].map((m) => m[1].replace(/^\/work\/|\/$|^\/products\/#/g, '').replace(/^anotiai-pii-masker$/, 'pii-masker'));
const dupes = proj.filter((x, i) => proj.indexOf(x) !== i);
ok('homepage lists: no project listed twice', proj.length >= 8 && dupes.length === 0, dupes.join(' ') || `${proj.length} projects`);
ok('no project lost: every case file has a page and is on the work index', atelier.caseFiles.every((c) => existsSync(file(`/work/${c.slug}/`)) && readFileSync(file('/work/'), 'utf8').includes(`/work/${c.slug}/`)));
ok('living system: rejection branch hidden in Pass (CSS), Pass is the default', /\.living \.ls-edge\.ls-reject\{display:none\}/.test(home) && /<section id="living"[^>]*data-case="a"/.test(home));
ok('living system: vertical mobile diagram with a loop-back branch', /class="living-svg living-svg-v"/.test(living) && /ls-edge ls-reject" d="M240 324 H300 V84 H248"/.test(living));
ok('first screen: front door (no question line), small "The Works" label, DOM order name -> diagram -> offer/CTAs', !/class="hero-title"/.test(home) && !/class="q-line"/.test(home) && /<main id="main" tabindex="-1">\s*(<!--[\s\S]*?-->\s*)?<div class="first-screen hero-v7 wrap">\s*<section id="home" class="hero-main"[^>]*>\s*<p class="hero-brand">The Works<\/p>/.test(home) && /<\/section>\s*<section id="living"[\s\S]*?<\/section>\s*(<script[\s\S]*?<\/script>\s*)*<div class="hero-side">/.test(home) && !/tabindex="[1-9]/.test(home));
ok('hero: one primary CTA plus CV (no duplicate "Start an inquiry")', /<p class="hero-ctas"><a class="btn-seal" href="\/solutions\/">See what I can build for you<\/a><a class="btn-line" href="\/cv\.pdf">CV \(PDF\)<\/a><\/p>/.test(home) && !/Start an inquiry/.test(home));
ok('journey: one navigation device (no zigzag map), caption names Commons and the institutions', !/class="journey-map"/.test(journey) && /taken from Wikimedia Commons/.test(journey) && /Library of Congress/.test(journey) && (journey.match(/via Wikimedia Commons/g) || []).length === 5);

// works-v8: question-based navigation (Emmanuel, t55u/t56u, 19 Nov 2026).
const htmlPages = walk(DIST).filter((p) => p.endsWith('.html')).map((p) => '/' + p.slice(DIST.length + 1).replace(/index\.html$/, ''));
const read = (r) => readFileSync(file(r), 'utf8');
const KEYS = ['build', 'built', 'think', 'about', 'contact'];
const utility = new Set(['/404.html', '/index/', '/']); // '/' is the front door: no question line, still ends with Next question
const qOf = (r) => (read(r).match(/<body data-q="([a-z]+)"/) || [])[1];
const noQ = htmlPages.filter((r) => !utility.has(r) && !KEYS.includes(qOf(r)));
ok(`nav: every page belongs to exactly one question (${htmlPages.length - utility.size} pages)`, noQ.length === 0, noQ.join(' '));
const ix = read('/index/');
const ixNav = (ix.match(/<nav aria-labelledby="ix-h"[\s\S]*?<\/nav>/) || [''])[0];
const ixCards = [...ixNav.matchAll(/<details class="ix-q[^"]*" id="ix-([a-z]+)"[\s\S]*?<\/details>/g)].flatMap((m) => [...m[0].matchAll(/<a class="ix-card" href="([^"]+)"/g)].map((a) => [a[1], m[1]]));
const smap = [...read('/sitemap.xml').matchAll(/<loc>https:\/\/emms204\.github\.io([^<]+)<\/loc>/g)].map((m) => m[1]).filter((r) => r !== '/index/');
const ixQ = (r) => (r === '/' ? 'about' : qOf(r)); // the front door is filed under "Who are you?" in the Index
const ixWrong = smap.filter((r) => { const hits = ixCards.filter(([h]) => h === r); return hits.length !== 1 || hits[0][1] !== ixQ(r); });
ok(`nav: /index/ links every page once, under its own question (${smap.length})`, ixWrong.length === 0 && ixCards.some(([h]) => h === '/cv.pdf'), ixWrong.join(' '));
ok('nav: five questions in order on /index/', [...ixNav.matchAll(/id="ix-([a-z]+)"/g)].map((m) => m[1]).join() === KEYS.join());
const tb = (read('/work/reconciliation/').match(/<header class="tb">[\s\S]*?<\/header>/) || [''])[0];
ok('top bar: no question indicator on the front door', /<header class="tb">/.test(home) && !/class="tb-q"/.test(home));
const bb = (home.match(/<nav aria-label="Quick" class="bb">[\s\S]*?<\/nav>/) || [''])[0];
const order = (html, labels) => { const at = labels.map((t) => html.indexOf(t)); return at.every((x, i) => x >= 0 && (i === 0 || x > at[i - 1])); };
ok('top bar: name, current question, then Work, Services, Contact, Index, CV, theme toggle, Start a project (in order)', /class="tb-name">Emmanuel Osanebi</.test(tb) && /class="tb-q"/.test(tb) && order(tb, ['>Work<', '>Services<', '>Contact<', '>Index<', '>CV<', 'data-theme-toggle', '>Start a project<']) && /href="\/cv\.pdf"/.test(tb) && /<a class="tb-l tb-wide" href="\/work\/" aria-current="page">Work</.test(tb));
ok('bottom bar (mobile): Work, Services, Index, Contact; no Start a project', order(bb, ['href="/work/"', '>Work<', '>Services<', '>Index<', '>Contact<']) && !bb.includes('Start a project') && !bb.includes('btn-seal'));
ok('top bar: sticky, bottom bar respects safe-area insets, body padded', /\.tb\{[^}]*position:sticky;top:0/.test(home) && /env\(safe-area-inset-bottom\)/.test(home) && /viewport-fit=cover/.test(home));
const dlg = (home.match(/<dialog id="ix-dialog"[\s\S]*?<\/dialog>/) || [''])[0];
ok('index dialog: labelled, nav landmark, visible close, openers wired', /<dialog id="ix-dialog" class="ix-dialog" aria-labelledby="ixd-h">/.test(dlg) && /<h2 id="ixd-h"/.test(dlg) && /<nav aria-labelledby="ixd-h" class="ix wrap" data-ix-body><\/nav>/.test(dlg) && /fetch\('\/index\/'\)/.test(inline) && /location\.href=a\.href/.test(inline) && /<button type="button"[^>]*data-ix-close[^>]*>Close<\/button>/.test(dlg) && (home.match(/href="\/index\/" data-ix-open aria-haspopup="dialog" aria-controls="ix-dialog" aria-expanded="false"/g) || []).length === 2 && /showModal\(\)/.test(inline) && /addEventListener\('close'/.test(inline) && /\.focus\(\)/.test(inline));
ok('index dialog: no search box and no "/" shortcut', !/type="search"/.test(dlg) && !/key===?['"]\/['"]/.test(inline));
ok('index: no-JS fallback is a real page (Index links to /index/, which has no dialog)', /href="\/index\/"/.test(tb) && !/<dialog/.test(ix) && /<h1 id="ix-h"/.test(ix) && /href="\/index\/" aria-current="page"/.test(ix));
ok('index: current question highlighted (body data-q drives .is-current in the dialog)', /<body data-q="built"/.test(read('/work/reconciliation/')) && /<body data-front=""|<body[^>]* data-front/.test(home) && !/<body data-q=/.test(home) && /classList\.add\('is-current'\)/.test(inline) && /\.ix-q\.is-current \.ix-qt\{color:var\(--seal-ink\)\}/.test(home));
const noNext = htmlPages.filter((r) => r !== '/404.html' && r !== '/index/' && !/<section class="wrap next-q" aria-labelledby="next-q-h">[\s\S]*?Start a project/.test(read(r)));
ok('every content page: question line at the top and a Next question block', noNext.length === 0 && htmlPages.filter((r) => !utility.has(r)).every((r) => /<main id="main" tabindex="-1">\s*<div class="wrap q-wrap"><p class="q-line">/.test(read(r))), noNext.join(' '));
ok('margins: folded into Letters (alias with canonical to /letters/, not in sitemap); Retakes removed', /rel="canonical" href="https:\/\/emms204\.github\.io\/letters\/"/.test(read('/margins/')) && /href="\/letters\/"/.test(read('/margins/')) && !/retakes/i.test(read('/letters/')) && !/retakes/i.test(ix) && !smap.includes('/margins/'));
ok('chess board: neutral squares, red only for the move highlight and line', /\.cb-l\{fill:#ecebe5\}/i.test(read('/chess/')) && /\.cb-hl\{fill:#c8102e;opacity:\.24\}/i.test(read('/chess/')));
{ const og = readFileSync(file('/og.png')); ok('og.png: 1200x630, small', og.readUInt32BE(16) === 1200 && og.readUInt32BE(20) === 630 && og.length < 40000, `${og.length} B`); }
const ids = new Map();
const idsOf = (r) => { if (!ids.has(r)) ids.set(r, new Set([...read(r).matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]))); return ids.get(r); };
const broken = [];
for (const r of htmlPages) {
  const h = read(r).replace(/<script[\s\S]*?<\/script>/g, '');
  for (const [, href] of h.matchAll(/\shref="([^"]+)"/g)) {
    if (/^(https?:|mailto:|tel:|data:)/.test(href)) continue;
    const u = new URL(href.replace(/&amp;/g, '&'), 'https://x' + r);
    const target = u.pathname;
    const f = target.endsWith('/') ? file(target) : join(DIST, target);
    if (!existsSync(f)) { broken.push(`${r} -> ${href}`); continue; }
    if (u.hash && f.endsWith('.html') && !idsOf(target).has(decodeURIComponent(u.hash.slice(1)))) broken.push(`${r} -> ${href} (no #id)`);
  }
}
ok('no broken internal links or anchors (all pages)', broken.length === 0, [...new Set(broken)].slice(0, 8).join(' | '));

// works-v9: theme (Emmanuel, t57u/t58u): dot grid on engineering pages, plain paper on thinking pages, dark Index overlay.
const surf = (r) => (read(r).match(/<body [^>]*data-surface="([a-z]+)"/) || [])[1];
const gridPages = htmlPages.filter((r) => ['build', 'built', 'about', 'contact'].includes(qOf(r)));
const plainPages = htmlPages.filter((r) => qOf(r) === 'think');
ok(`theme: surface follows the question (grid ${gridPages.length}, plain ${plainPages.length})`, gridPages.every((r) => surf(r) === 'grid') && plainPages.every((r) => surf(r) === 'plain') && ['/', '/solutions/', '/products/', '/work/', '/work/reconciliation/', '/archive/', '/contact/'].every((r) => surf(r) === 'grid') && ['/letters/', '/letters/worth-the-wait/', '/chess/', '/journal/'].every((r) => surf(r) === 'plain'));
const dotRule = (home.match(/body\[data-surface=grid\]\{[^}]*\}/) || [''])[0];
ok('theme: dot grid is pure CSS (radial-gradient, no url(), no animation)', /radial-gradient\(circle, ?var\(--dot\) 1px/.test(dotRule) && !/url\(|animation/.test(dotRule) && /--dot:#0000000f/i.test(home) && /--dot:#ffffff12/i.test(home));
ok('theme: palette tokens (light paper #FAFAF7, ink #121212, red #C8102E; dark paper #0E1014, red #FF5A6E / #FF7A8A)', /--paper:#fafaf7/i.test(home) && /--ink:#121212/i.test(home) && /--seal:#c8102e/i.test(home) && /--paper:#0e1014/i.test(home) && /--seal:#ff5a6e/i.test(home) && /--seal-ink:#ff7a8a/i.test(home));
ok('theme: Index overlay uses a dark surface in both themes', /\.ix-dialog\{[^}]*--paper:#0b0d11[^}]*color-scheme:dark/i.test(home));
ok('theme: no paper grain, Rejected warm tint kept', !/feTurbulence/.test(home) && /html:has\(#living\.run\[data-case=b\]\) \.ga-hot\{opacity/.test(home));

const md5 = createHash('md5').update(readFileSync('public/cv.pdf')).digest('hex');
const md5d = createHash('md5').update(readFileSync(join(DIST, 'cv.pdf'))).digest('hex');
ok('cv.pdf md5 (public + dist)', md5 === CV_MD5 && md5d === CV_MD5, md5);

// ---- works-v10: 24px grid, shape grammar, border order ----
const css = [...home.matchAll(/<style>([\s\S]*?)<\/style>/g)].map((m) => m[1]).join('');
// last declaration wins: collect every rule whose selector list contains `sel` exactly
const decl = (sel, prop) => { let v; for (const m of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) { if (m[1].split(',').map((x) => x.trim()).includes(sel)) { const d = m[2].match(new RegExp('(?:^|;)' + prop + ':([^;]+)')); if (d) v = d[1].trim(); } } return v; };
ok('grid: dot pitch is 24px (token --grid:24px drives background-size)', /--grid:24px/.test(css) && decl('body[data-surface=grid]', 'background-size') === 'var(--grid) var(--grid)' && !/background-size:22px/.test(css));
ok('grid: spacing tokens 12/24/48/96/144', /--s-xs:12px/.test(css) && /--s-1:24px/.test(css) && /--s-2:48px/.test(css) && /--s-3:96px/.test(css) && /--s-4:144px/.test(css));
const radii = [...new Set([...css.matchAll(/border-radius:([^;}]+)/g)].map((m) => m[1].trim()))];
ok('shapes: no generic shared radius (only built 0 / choice pill / dot circle tokens)', radii.every((r) => ['0', 'var(--r-built)', 'var(--r-choice)', 'var(--r-dot)'].includes(r)) && !/--radius/.test(css) && /--r-built:0/.test(css) && /--r-choice:999px/.test(css), radii.join(' '));
const pills = ['.bench-case-btn', '.chooser label', '.inq-radio', '.intent-options a', '.chess-moves .mv'];
ok('shapes: choice controls are pills (Pass/Rejected, filters, chooser, intents, form intents, move list)', pills.every((p) => decl(p, 'border-radius') === 'var(--r-choice)'), pills.map((p) => p + '=' + decl(p, 'border-radius')).join(' '));
ok('shapes: built things are sharp (cards, buttons, chips, case header)', ['.card', '.btn-seal', '.chip', '.next-q-card', '.ix-card'].every((p) => decl(p, 'border-radius') === 'var(--r-built)') && /border:2px solid var\(--ink\)/.test(decl('.case-head', 'border') ? 'border:' + decl('.case-head', 'border') : ''));
ok('shapes: draft / proposal elements are dashed (Interpret node, proposal panel, illustration flags, alternative chess move)',
  /stroke-dasharray/.test(css.match(/\.living-svg \.ls-interpret \.ls-shape\{[^}]*\}/)?.[0] ?? '') && /dashed/.test(decl('.propose', 'border') ?? '') && /dashed/.test(decl('.bench-flag', 'border') ?? '') && /dashed/.test(decl('.placeholder', 'border') ?? '') && !!decl('.cb-mk-alt', 'stroke-dasharray'));
ok('shapes: Decide is a circle in both diagrams; Input/Interpret/Verify are sharp rectangles (no rx)', (living.match(/<g class="ls-node ls-decide">[\s\S]*?<circle class="ls-shape"/g) || []).length === 2 && !/<rect class="ls-shape"[^>]*rx=/.test(living) && (living.match(/<rect class="ls-shape"/g) || []).length === 6);
ok('shapes: the stamp is a circle', decl('.stamp', 'border-radius') === 'var(--r-dot)');
ok('border order: Living System frame is the 2px main object; node strokes 1px', decl('.living-fig', 'border') === '2px solid var(--ink)' && decl('.living-svg .ls-shape', 'stroke-width') === '1px');
ok('thinking text: no boxes on shelf spines, letter quotes or the About quote', /^(none|0 0)$/.test(decl('.shelf-spine', 'background') ?? '') && decl('.letter-body blockquote', 'border-left') === '0' && decl('.about-quote', 'border-left') === '0');
const recon = read('/work/reconciliation/'), vote = read('/work/voteriq-pipeline/');
const sealedCases = atelier.caseFiles.filter((c) => ['reconciliation', 'grunsco-automate'].includes(c.slug)); // sealLabel 'Approved by a person' / 'Approved in Slack' in profile.ts
ok('grid break: the red seal overlaps the case header only where a person approved; others get a neutral "Case file" mark',
  /class="case-head has-seal"[\s\S]*?class="case-mark case-seal"/.test(recon) && /class="case-head has-tag"[\s\S]*?class="case-mark case-tag" aria-hidden="true">Case file</.test(vote)
  && atelier.caseFiles.every((c) => /class="case-mark case-seal"/.test(read(`/work/${c.slug}/`)) === sealedCases.includes(c)), sealedCases.map((c) => c.slug).join(' '));
ok('grid break: step numbers hang off Proof Bench panels (data-n, hidden from AT)', (home.match(/class="bench-step" data-step="\d" data-n="0\d"/g) || []).length === 8 && /content:attr\(data-n\)\s*\/\s*""/.test(css));
const chessP = read('/chess/');
ok('chess: solid circle for the move played (no-JS board), dashed circle for 7.Bd6 alternative on d6', /id="cb-main"[\s\S]*?<g data-cb-mk><circle cx="5.5" cy="3.5" r=".44" class="cb-mk"/.test(chessP) && /<circle cx="3.5" cy="2.5" r=".44" class="cb-mk cb-mk-alt"><\/circle><circle cx="4.5" cy="3.5" r=".44" class="cb-mk"/.test(chessP) && /"alts":\{"12":\["d6"\]\}/.test(chessP));
ok('no ellipses / thought balloons / Index map', !/<ellipse/.test(text.map((p) => readFileSync(p, 'utf8')).join('')) && !/ix-map|data-ix-map/.test(read('/index/')));

// ---- works-v11: light/dark toggle ----
const pages = text.filter((p) => p.endsWith('.html'));
const noToggle = pages.filter((p) => !/<button type="button" class="tb-theme" data-theme-toggle aria-label="Switch theme">/.test(readFileSync(p, 'utf8')));
ok('theme toggle: a labelled sun/moon button in the top bar on every page', noToggle.length === 0 && pages.length > 20, noToggle.join(' ') || `${pages.length} pages`);
const headScript = home.indexOf('localStorage.theme'), firstStyle = home.indexOf('<style');
ok('theme toggle: no flash (stored theme applied by an inline <head> script before the stylesheet)', headScript > 0 && headScript < firstStyle && headScript < home.indexOf('</head>') && /h\.dataset\.theme=t/.test(home.slice(0, firstStyle)));
ok('theme toggle: dark tokens via device setting (unless forced light) and via forced dark; forced light pins color-scheme',
  /@media \(prefers-color-scheme:dark\)\{:root:not\(\[data-theme=light\]\)\{--paper:#0e1014/i.test(css) && /:root\[data-theme=dark\]\{--paper:#0e1014/i.test(css) && /:root\[data-theme=light\]\{color-scheme:light\}/.test(css)
  && !/@media \(prefers-color-scheme:dark\)\{(:root|\.cb-l|\[data-bg\])\{/.test(css));
ok('theme toggle: hidden/inert without JS (visibility until the head script marks JS on)', decl('.tb-theme', 'visibility') === 'hidden' && /\[data-js\] \.tb-theme\{visibility:visible\}/.test(css));

// ---- works-v13: review 2 ----
ok('intents: a click pushes the link URL with its fragment (?path=<key>#for-<key>); no hash stripping; Back restores', /history\.pushState\(null,'',u\)/.test(home) && /new URL\(a\.href,location\)/.test(home) && !/u\.hash=''/.test(home) && /addEventListener\('popstate'/.test(home)
  && ['build', 'products', 'hire', 'collaborate'].every((k) => home.includes(`href="/?path=${k}#for-${k}"`) && home.includes(`id="for-${k}"`)));
const contactP = read('/contact/'), cdirect = (contactP.match(/<p class="contact-direct">[\s\S]*?<\/p>/) || [''])[0];
ok('contact: Start a project, email and WhatsApp right under the intro, before the form (same addresses as the homepage)', /class="lede"[\s\S]*?<p class="contact-direct">/.test(contactP) && contactP.indexOf('contact-direct">') < contactP.indexOf('<form id="brief"')
  && cdirect.includes('href="#brief">Start a project<') && cdirect.includes('href="mailto:emmanuelosanebi1@gmail.com"') && cdirect.includes('href="https://wa.me/2349030612170"') && home.includes('href="mailto:emmanuelosanebi1@gmail.com"') && home.includes('href="https://wa.me/2349030612170"'));
ok('services: a Start a project CTA in the page intro', /<p class="sol-cta"><a class="btn-seal" href="\/contact\/#inquiry">Start a project<\/a><\/p>/.test(read('/solutions/')));
ok('story engine: its own invitation ("Can a story break its own rules?"), a Letters link beside it, anchor kept; Privacy Lens stays open', /<h2 id="pieces-h" class="display-2">A product and a story to try<\/h2>/.test(home) && !/Two more pieces to try/.test(home)
  && /<details class="fold"><summary class="fold-sum">[\s\S]*?Can a story break its own rules\?<\/span>[\s\S]*?<article id="story-engine"[\s\S]*?<\/details><p class="fold-aside"><a class="btn-line" href="\/letters\/">Read what I write: Letters<\/a><\/p>/.test(home)
  && /<details class="fold" open><summary class="fold-sum">[\s\S]*?Privacy Lens<\/span>/.test(home) && home.includes('href="#story-engine"'));

console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
