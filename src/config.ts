/**
 * Site configuration. The ONLY place to change switches and endpoints.
 *
 * FORMSPREE_ENDPOINT: paste the form endpoint from formspree.io here
 * (e.g. 'https://formspree.io/f/abcdwxyz'). While it is empty, every form
 * falls back to a mailto: link to CONTACT_EMAIL, with and without JavaScript.
 */
/** Formspree endpoint: Emmanuel via Grok Bot, Nov 18 9:00 PM (the-works-slice only). */
export const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xjywrjrz';

export const CONTACT_EMAIL = 'emmanuelosanebi1@gmail.com';
/** WhatsApp link supplied by Emmanuel via Grok Bot, 18 Nov 2026. The number itself is never printed on the page. */
export const WHATSAPP_URL = 'https://wa.me/2349030612170';

/**
 * Preview switch. true = show clearly marked "Awaiting Emmanuel" boxes where
 * content is missing (offer scope/pricing, quotes, retake stories, etc.).
 * Set to false before publishing to hide every unfilled slot instead.
 */
export const SHOW_PLACEHOLDERS = false;

/** Art / Sketchbook stays hidden (no route, no menu item) until at least ART_MIN pieces exist. */
export const ART_MIN = 3;
export const ART_PIECES: { title: string; src: string; alt: string; year?: string }[] = [];
export const SHOW_ART = ART_PIECES.length >= ART_MIN;

/** Quotes / testimonials: none exist (Emmanuel via Grok Bot, 18 Nov 5:17 PM). The component stays unrendered until this is true AND real, permitted quotes are added to profile.ts. */
export const SHOW_QUOTES = false;
