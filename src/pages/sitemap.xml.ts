import { atelier, profile } from '../content/profile';
import { getLetters } from '../lib/letters';
export const prerender = true;
export async function GET() {
  const letters = (await getLetters()).map((l) => `/letters/${l.id}/`);
  // Canonical routes only; /commission/, /shelf/, /press/, /sign/ and /margins/ are aliases with canonical links to the new pages.
  const routes = ['/', '/solutions/', '/work/', ...atelier.caseFiles.map((c) => `/work/${c.slug}/`), '/products/', '/journal/', '/letters/', ...letters, '/chess/', '/contact/', '/archive/', '/index/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${profile.meta.siteUrl}${r}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
