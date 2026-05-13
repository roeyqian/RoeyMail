import i18next from 'i18next';
import zh from './zh.js'
import en from './en.js'
import app from '../hono/hono';

const resources = {
	en: { translation: en },
	zh: { translation: zh },
};

const initPromise = i18next.init({ lng: 'zh', fallbackLng: 'zh', resources });

let currentLang = 'zh';

app.use('*', async (c, next) => {
	await initPromise;
	const lang = c.req.header('accept-language')?.split('-')[0] || 'zh';
	if (lang !== currentLang) {
		currentLang = lang;
	}
	await next();
});

export const t = (key, values) => i18next.t(key, { ...values, lng: currentLang });

export default i18next;
