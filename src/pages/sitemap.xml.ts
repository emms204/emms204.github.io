import { atelier, profile } from '../content/profile';
export const prerender = true;
export function GET() {
  const routes = ['/', '/work/', ...atelier.caseFiles.map((c) => `/work/${c.slug}/`), '/shelf/', '/commission/', '/press/', '/margins/', '/sign/', '/archive/'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((r) => `  <url><loc>${profile.meta.siteUrl}${r}</loc></url>`).join('\n')}\n</urlset>\n`;
  return new Response(body, { headers: { 'Content-Type': 'application/xml' } });
}
