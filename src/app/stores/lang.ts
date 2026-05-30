import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useLangStore = defineStore('lang', () => {
  const currentLang = ref<'ar' | 'en'>('ar')

  const isRtl = computed(() => currentLang.value === 'ar')

  function setLang(lang: 'ar' | 'en') {
    currentLang.value = lang
    document.documentElement.lang = lang
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr'
  }

  return { currentLang, isRtl, setLang }
})