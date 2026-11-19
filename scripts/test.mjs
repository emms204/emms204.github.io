// Small post-build test: routes exist in dist, confidentiality grep, cv.pdf md5,
// and production builds ignore the dev-only ?state= form preview.
// Usage: npm run build && npm test
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
import { gzipSync } from 'node:zlib';

const DIST = 'dist';
const CV_MD5 = '54995be92e7ef1c98f45591cbd303f68';
const ROUTES = [
  '/', '/solutions/', '/products/', '/journal/', '/contact/', '/work/', '/margins/', '/archive/',
  '/commission/', '/shelf/', '/press/', '/sign/',
  '/work/reconciliation/', '/work/merchant-onboarding/', '/work/voteriq-pipeline/', '/work/fraud-compliance-reinsurance/',
  '/work/grunsco-automate/', '/work/devgenie/', '/work/scriptgen/', '/work/enza-chat/',
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

const md5 = createHash('md5').update(readFileSync('public/cv.pdf')).digest('hex');
const md5d = createHash('md5').update(readFileSync(join(DIST, 'cv.pdf'))).digest('hex');
ok('cv.pdf md5 (public + dist)', md5 === CV_MD5 && md5d === CV_MD5, md5);

console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
