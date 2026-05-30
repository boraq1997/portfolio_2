<template>
  <section id="about" class="relative pt-16 pb-32 px-6 overflow-hidden">

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute top-1/2 left-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-3xl" />
    </div>

    <div class="relative max-w-6xl mx-auto" :dir="isRtl ? 'rtl' : 'ltr'">

      <!-- Header -->
      <div class="flex flex-col gap-2 mb-16 scroll-animate">
        <span class="text-red-500 text-sm tracking-widest uppercase font-medium">{{ t.whoAmI }}</span>
        <h2 class="text-4xl md:text-5xl font-black text-white">{{ t.aboutMe }}</h2>
        <div class="w-12 h-1 bg-red-600 rounded-full mt-2" />
      </div>

      <!-- Bento Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">

        <!-- Avatar -->
        <div class="md:col-span-1 bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden flex items-center justify-center p-8 group hover:border-red-900/50 transition-all duration-500 scroll-animate-right">
          <div class="relative">
            <div class="absolute inset-0 rounded-2xl bg-red-950/30 blur-xl scale-110 group-hover:bg-red-900/40 transition-all duration-500" />
            <img
              :src="personal.avatar"
              :alt="personal.name"
              loading="lazy"
              class="relative w-48 h-48 object-cover rounded-2xl border border-zinc-800 grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
            />
            <div class="absolute -bottom-2 -left-2 flex items-center gap-1.5 bg-zinc-900 border border-zinc-800 rounded-full px-3 py-1.5">
              <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span class="text-zinc-400 text-xs">{{ t.available }}</span>
            </div>
          </div>
        </div>

        <!-- Bio -->
        <div class="md:col-span-2 bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 flex flex-col gap-6 hover:border-zinc-700 transition-all duration-300 scroll-animate-left">
          <div>
            <h3 class="text-2xl font-bold text-white mb-1">{{ personal.name }}</h3>
            <p class="text-red-500 text-sm font-medium">{{ personal.title }}</p>
          </div>
          <p class="text-zinc-400 leading-relaxed text-base">{{ personal.bio }}</p>
          <div class="grid grid-cols-2 gap-3 text-sm">
            <div
              v-for="info in personalInfo"
              :key="info.label"
              class="flex items-center gap-3 bg-zinc-800/50 rounded-2xl px-4 py-3 hover:bg-zinc-800 transition-colors duration-200 group cursor-default"
            >
              <div class="w-8 h-8 rounded-xl bg-zinc-700/50 flex items-center justify-center group-hover:bg-red-900/30 transition-colors duration-200">
                <component :is="info.icon" class="w-4 h-4 text-zinc-400 group-hover:text-red-400 transition-colors duration-200" />
              </div>
              <span class="text-zinc-400 group-hover:text-zinc-300 transition-colors duration-200 text-xs">{{ info.value }}</span>
            </div>
          </div>
        </div>

        <!-- Stats -->
        <div
          v-for="(stat, i) in personal.stats"
          :key="stat.label"
          class="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 flex flex-col gap-2 hover:border-red-900/50 hover:bg-zinc-900/80 transition-all duration-300 group cursor-default scroll-animate"
          :class="`delay-${(i + 1) * 100}`"
        >
          <span class="text-5xl font-black text-red-500 group-hover:text-red-400 transition-colors duration-200">{{ stat.value }}</span>
          <span class="text-zinc-500 text-sm group-hover:text-zinc-400 transition-colors duration-200">{{ stat.label }}</span>
        </div>

        <!-- Social -->
        <div class="bg-zinc-900/60 border border-zinc-800 rounded-3xl p-8 flex flex-col gap-4 hover:border-zinc-700 transition-all duration-300 scroll-animate">
          <span class="text-zinc-400 text-sm font-medium">{{ t.contactVia }}</span>
          <div class="flex flex-col gap-3">
            <a
              v-for="(url, platform) in personal.social"
              :key="platform"
              :href="url"
              target="_blank"
              class="flex items-center justify-between px-4 py-3 bg-zinc-800/50 rounded-2xl text-zinc-400 hover:text-white hover:bg-red-900/20 border border-transparent hover:border-red-900/30 transition-all duration-200 text-sm group"
            >
              <div class="flex items-center gap-2">
                <div class="w-6 h-6 rounded-lg bg-zinc-700/50 flex items-center justify-center group-hover:bg-red-900/30 transition-colors duration-200">
                  <svg v-if="platform === 'github'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  <svg v-else-if="platform === 'linkedin'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <svg v-else-if="platform === 'telegram'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                  <svg v-else-if="platform === 'facebook'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  <svg v-else-if="platform === 'instagram'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                  <svg v-else-if="platform === 'gmail'" class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
                </div>
                <span class="capitalize">{{ platform }}</span>
              </div>
              <span class="transition-transform duration-200" :class="isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'">
                {{ isRtl ? '←' : '→' }}
              </span>
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, h } from 'vue'
import { useLang } from '../../../app/composables/useLang'

const { personal, t, isRtl } = useLang()

const MailIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
])
const LocationIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z' }),
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M15 11a3 3 0 11-6 0 3 3 0 016 0z' })
])
const PhoneIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z' })
])
const BriefcaseIcon = () => h('svg', { fill: 'none', viewBox: '0 0 24 24', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', d: 'M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z' })
])

const personalInfo = computed(() => [
  { label: 'email', icon: MailIcon, value: personal.value.email },
  { label: 'location', icon: LocationIcon, value: personal.value.location },
  { label: 'phone', icon: PhoneIcon, value: personal.value.phone },
  { label: 'status', icon: BriefcaseIcon, value: t.value.availableForWork2 },
])
</script>