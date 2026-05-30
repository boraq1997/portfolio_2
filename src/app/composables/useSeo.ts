import { useHead } from '@vueuse/head'
import { useLang } from './useLang'

export function useSeo() {
  const { personal, isRtl, currentLang } = useLang()

  useHead({
    title: () => `${personal.value.name} | ${personal.value.title}`,
    meta: [
      { name: 'description', content: () => personal.value.bio },
      { name: 'keywords', content: () => personal.value.tags.join(', ') },
      { name: 'author', content: () => personal.value.name },
      { name: 'robots', content: 'index, follow' },
      { name: 'language', content: () => currentLang.value === 'ar' ? 'Arabic' : 'English' },
      { property: 'og:type', content: 'website' },
      { property: 'og:title', content: () => `${personal.value.name} | ${personal.value.title}` },
      { property: 'og:description', content: () => personal.value.bio },
      { property: 'og:image', content: () => personal.value.avatar },
      { property: 'og:locale', content: () => currentLang.value === 'ar' ? 'ar_IQ' : 'en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: () => `${personal.value.name} | ${personal.value.title}` },
      { name: 'twitter:description', content: () => personal.value.bio },
    ],
    htmlAttrs: {
      lang: () => currentLang.value,
      dir: () => isRtl.value ? 'rtl' : 'ltr',
    },
  })
}