// prebuild: public/cv.pdf is the source of truth (the CV author writes it directly).
// Only if it is missing, seed it from /workspace/portfolio/cv.pdf (or $CV_SRC). Never overwrite.
import { existsSync, copyFileSync, statSync } from 'node:fs';
const src = process.env.CV_SRC || '/workspace/portfolio/cv.pdf';
const dest = new URL('../public/cv.pdf', import.meta.url);
if (existsSync(dest)) { const s = statSync(dest); console.log(`[cv] using existing public/cv.pdf (${s.size} bytes, mtime ${s.mtime.toISOString()})`); }
else if (existsSync(src)) { copyFileSync(src, dest); console.log(`[cv] public/cv.pdf missing; seeded from ${src}`); }
else console.warn(`[cv] WARNING: public/cv.pdf missing and ${src} not found — /cv.pdf will 404.`);
