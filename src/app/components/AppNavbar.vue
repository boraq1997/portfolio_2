<template>
  <nav class="fixed top-6 left-0 right-0 z-50 flex justify-center px-6">
    <div
      class="flex items-center gap-2 bg-zinc-900/90 backdrop-blur-md border border-zinc-800 rounded-full px-4 py-2"
      :dir="isRtl ? 'rtl' : 'ltr'"
    >

      <!-- Online Status -->
      <div class="flex items-center gap-2 px-3 py-1 border-zinc-700 ml-1"
        :class="isRtl ? 'border-l' : 'border-r'"
      >
        <span class="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span class="text-zinc-400 text-xs font-medium tracking-widest">ONLINE</span>
      </div>

      <!-- Desktop Links -->
      <div class="hidden md:flex items-center gap-1">
        <button
          v-for="link in links"
          :key="link.id"
          @click="scrollTo(link.id)"
          class="px-4 py-1.5 rounded-full text-sm transition-all duration-200"
          :class="activeSection === link.id
            ? 'bg-zinc-700 text-white font-semibold'
            : 'text-zinc-400 hover:text-white'"
        >
          {{ link.label }}
        </button>
      </div>

      <!-- Language Selector -->
      <div
        class="hidden md:flex items-center gap-2 px-3 py-1 border-zinc-700"
        :class="isRtl ? 'border-r mr-1' : 'border-l ml-1'"
      >
        <button
          v-for="lang in languages"
          :key="lang.code"
          @click="switchLang(lang.code)"
          class="flex items-center gap-1.5 px-2 py-1 rounded-full text-xs transition-all duration-200"
          :class="currentLang === lang.code ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-white'"
        >
          <span>{{ lang.flag }}</span>
          <span class="font-medium">{{ lang.label }}</span>
        </button>
      </div>

      <!-- Visitor -->
      <div class="hidden md:flex items-center gap-2 px-3 py-1">
        <span class="text-lg">🇮🇶</span>
        <div class="flex flex-col leading-none">
          <span class="text-zinc-500 text-xs">{{ t.visitor }}</span>
          <span class="text-white text-xs font-semibold">{{ isRtl ? 'العراق' : 'Iraq' }}</span>
        </div>
      </div>

      <!-- Mobile Hamburger -->
      <button
        @click="mobileOpen = !mobileOpen"
        class="md:hidden flex flex-col gap-1.5 px-3 py-2 text-zinc-400 hover:text-white transition-colors"
      >
        <span class="block w-5 h-0.5 bg-current transition-all duration-300" :class="mobileOpen ? 'rotate-45 translate-y-2' : ''" />
        <span class="block w-5 h-0.5 bg-current transition-all duration-300" :class="mobileOpen ? 'opacity-0' : ''" />
        <span class="block w-5 h-0.5 bg-current transition-all duration-300" :class="mobileOpen ? '-rotate-45 -translate-y-2' : ''" />
      </button>

    </div>

    <!-- Mobile Menu -->
    <Transition name="mobile-menu">
      <div
        v-if="mobileOpen"
        class="absolute top-16 left-4 right-4 bg-zinc-900/95 backdrop-blur-md border border-zinc-800 rounded-2xl p-4 flex flex-col gap-2"
        :dir="isRtl ? 'rtl' : 'ltr'"
      >
        <button
          v-for="link in links"
          :key="link.id"
          @click="scrollTo(link.id); mobileOpen = false"
          class="w-full px-4 py-3 rounded-xl text-sm transition-all duration-200"
          :class="[
            isRtl ? 'text-right' : 'text-left',
            activeSection === link.id
              ? 'bg-zinc-800 text-white font-semibold'
              : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
          ]"
        >
          {{ link.label }}
        </button>

        <div class="border-t border-zinc-800 my-1" />

        <div class="flex gap-2 px-2">
          <button
            v-for="lang in languages"
            :key="lang.code"
            @click="switchLang(lang.code)"
            class="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all duration-200"
            :class="currentLang === lang.code ? 'bg-zinc-700 text-white' : 'text-zinc-500 hover:text-white'"
          >
            <span>{{ lang.flag }}</span>
            <span>{{ lang.label }}</span>
          </button>
        </div>
      </div>
    </Transition>

  </nav>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLangStore } from '../stores/lang'
import { useLang } from '../composables/useLang'

const langStore = useLangStore()
const { t, isRtl, currentLang } = useLang()

const activeSection = ref('home')
const mobileOpen = ref(false)

const languages = [
  { code: 'ar' as const, label: 'AR', flag: '🇸🇦' },
  { code: 'en' as const, label: 'EN', flag: '🇬🇧' },
]

const links = computed(() => [
  { label: t.value.home, id: 'home' },
  { label: t.value.about, id: 'about' },
  { label: t.value.skills, id: 'skills' },
  { label: t.value.projects, id: 'projects' },
  { label: t.value.contact, id: 'contact' },
])

function switchLang(lang: 'ar' | 'en') {
  langStore.setLang(lang)
}

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}

const handleScroll = () => {
  for (const link of links.value) {
    const el = document.getElementById(link.id)
    if (!el) continue
    const rect = el.getBoundingClientRect()
    if (rect.top <= 100 && rect.bottom >= 100) {
      activeSection.value = link.id
      break
    }
  }
}

const handleClickOutside = (e: MouseEvent) => {
  if (!(e.target as HTMLElement).closest('nav')) mobileOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  window.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.25s ease;
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px) scale(0.98);
}
</style>