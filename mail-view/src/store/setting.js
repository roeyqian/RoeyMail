import { defineStore } from 'pinia'

const savedLang = localStorage.getItem('lang') || 'zh'

export const useSettingStore = defineStore('setting', {
    state: () => ({
        domainList: [],
        settings: {
            r2Domain: '',
            loginOpacity: 1.00,
        },
        lang: savedLang,
    }),
    actions: {

    }
})
