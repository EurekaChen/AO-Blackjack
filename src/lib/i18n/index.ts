// place files you want to import through the `$lib` alias in this folder.

import i18n from 'sveltekit-i18n';
import translations from './translations';
import { browser } from '$app/environment';

let lang: string = 'en';
if (browser) {
	const language = window.navigator.language;
	if (language.includes('zh')) {
		lang = 'zh';
	} else {
		lang = 'en';
	}
}

const config = {
	initLocale: lang,
	translations
};

export const { t, l, locales, locale } = new i18n(config);
