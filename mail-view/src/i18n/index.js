import { createI18n } from 'vue-i18n';
import en from './en.js'
import zh from './zh.js'

const savedLang = localStorage.getItem('lang') || 'zh'

const i18n = createI18n({
    legacy: false,
    locale: savedLang,
    fallbackLocale: 'zh',
    messages: {
        zh,
        en
    },
});

export default i18n;