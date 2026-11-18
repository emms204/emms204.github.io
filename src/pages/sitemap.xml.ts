import { atelier, profile } from '../content/profile';
export const prerender = true;
export function GET() {
  // Canonical routes only; /commission/, /shelf/, /press/ and /sign/ are aliases with canonical links to the new pages.
  const routes = ['/', '/solutions/', '/work/', ...atelier.caseFiles.map((c) => `/work/${c.slug}/`), '/products/', '/journal/', '/contact/', '/margins/', '/archive/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${profile.meta.siteUrl}${r}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
