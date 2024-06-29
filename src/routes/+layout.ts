
import { loadTranslations } from '$lib/translations';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url }) => {
  const { pathname } = url;

  const initLocale = 'en'; // get from cookie, user session, ...

  await loadTranslations(initLocale, pathname); // keep this just before the `return`

  return {};
}

// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;
export const trailingSlash = "always";