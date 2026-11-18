// Small post-build test: routes exist in dist, confidentiality grep, cv.pdf md5,
// and production builds ignore the dev-only ?state= form preview.
// Usage: npm run build && npm test
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';

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
// Names that must never appear anywhere in the built site.
const SITE_BANNED = /ContinentalRe|Continental Re|\bOpay\b/i;

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

const md5 = createHash('md5').update(readFileSync('public/cv.pdf')).digest('hex');
const md5d = createHash('md5').update(readFileSync(join(DIST, 'cv.pdf'))).digest('hex');
ok('cv.pdf md5 (public + dist)', md5 === CV_MD5 && md5d === CV_MD5, md5);

console.log(failed ? `\n${failed} check(s) failed` : '\nall checks passed');
process.exit(failed ? 1 : 0);
