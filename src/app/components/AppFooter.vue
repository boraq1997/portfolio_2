<template>
  <footer class="relative border-t border-zinc-800/50 overflow-hidden">

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-red-950/10 rounded-full blur-3xl" />
    </div>

    <div class="relative max-w-6xl mx-auto px-6 py-16" :dir="isRtl ? 'rtl' : 'ltr'">

      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12 scroll-animate">

        <!-- Brand -->
        <div class="flex flex-col gap-4">
          <h3 class="text-white font-black text-2xl">{{ personal.name }}</h3>
          <p class="text-zinc-500 text-sm leading-relaxed">{{ personal.subtitle }}</p>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            <span class="text-zinc-500 text-xs">{{ t.availableForWork }}</span>
          </div>
        </div>

        <!-- Quick Links -->
        <div class="flex flex-col gap-4">
          <h4 class="text-zinc-400 text-xs tracking-widest uppercase font-medium">{{ t.quickLinks }}</h4>
          <div class="flex flex-col gap-2">
            <button
              v-for="link in links"
              :key="link.id"
              @click="scrollTo(link.id)"
              class="text-zinc-500 hover:text-white text-sm transition-colors duration-200 w-fit"
              :class="isRtl ? 'text-right' : 'text-left'"
            >
              {{ link.label }}
            </button>
          </div>
        </div>

        <!-- Contact -->
        <div class="flex flex-col gap-4">
          <h4 class="text-zinc-400 text-xs tracking-widest uppercase font-medium">{{ t.contactTitle }}</h4>
          <div class="flex flex-col gap-3">
            <a :href="`mailto:${personal.email}`" class="text-zinc-500 hover:text-white text-sm transition-colors duration-200">
              {{ personal.email }}
            </a>
            <a :href="`tel:${personal.phone}`" class="text-zinc-500 hover:text-white text-sm transition-colors duration-200">
              {{ personal.phone }}
            </a>
            <span class="text-zinc-600 text-sm">{{ personal.location }}</span>
          </div>

          <!-- Social -->
          <div class="flex flex-wrap gap-2 mt-2">
            <a
              v-for="(url, platform) in personal.social"
              :key="platform"
              :href="url"
              target="_blank"
              class="w-9 h-9 bg-zinc-900 border border-zinc-800 rounded-xl flex items-center justify-center text-zinc-500 hover:text-white hover:border-zinc-600 transition-all duration-200"
            >
              <svg v-if="platform === 'github'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
              <svg v-else-if="platform === 'telegram'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
              <svg v-else-if="platform === 'facebook'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              <svg v-else-if="platform === 'instagram'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              <svg v-else-if="platform === 'gmail'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
            </a>
          </div>
        </div>

      </div>

      <!-- Divider -->
      <div class="border-t border-zinc-800/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p class="text-zinc-600 text-xs">
          © {{ year }} {{ personal.name }}. {{ t.rights }}
        </p>
        <p class="text-zinc-700 text-xs">{{ t.madeWith }}</p>
      </div>

    </div>
  </footer>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useLang } from '../composables/useLang'

const { personal, t, isRtl } = useLang()

const year = new Date().getFullYear()

const links = computed(() => [
  { label: t.value.home, id: 'home' },
  { label: t.value.about, id: 'about' },
  { label: t.value.skills, id: 'skills' },
  { label: t.value.projects, id: 'projects' },
  { label: t.value.contact, id: 'contact' },
])

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>