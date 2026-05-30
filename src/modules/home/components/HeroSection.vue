<template>
  <section id="home" class="relative min-h-screen flex items-center px-6 pt-24 pb-32 overflow-hidden">

    <!-- Animated Background -->
    <div class="absolute inset-0 pointer-events-none">
      <div class="glow-1" />
      <div class="glow-2" />
      <div class="glow-3" />
      <div class="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
    </div>

    <div
      class="relative max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center"
      :dir="isRtl ? 'rtl' : 'ltr'"
    >

      <!-- Text -->
      <div class="flex flex-col gap-7 scroll-animate-right">

        <div class="flex items-center gap-2 w-fit px-4 py-2 bg-zinc-900/80 border border-zinc-800 rounded-full">
          <span class="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          <span class="text-zinc-400 text-xs tracking-widest">{{ t.availableForWork }}</span>
        </div>

        <div class="flex flex-col gap-3">
          <p class="text-zinc-600 text-sm tracking-[0.3em] uppercase font-medium">{{ t.hello }}</p>
          <h1 class="text-6xl md:text-8xl font-black leading-none tracking-tight">
            <span class="bg-gradient-to-br from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
              {{ personal.name }}
            </span>
          </h1>
        </div>

        <div class="flex flex-col gap-2">
          <h2 class="text-xl md:text-2xl text-zinc-400 font-light">{{ personal.title }}</h2>
          <p class="text-zinc-600 text-base leading-relaxed max-w-md">{{ personal.subtitle }}</p>
        </div>

        <div class="flex flex-wrap gap-2">
          <span
            v-for="tag in personal.tags"
            :key="tag"
            class="px-3 py-1.5 bg-zinc-900/60 border border-zinc-800/80 text-zinc-500 text-xs rounded-full hover:text-zinc-300 hover:border-zinc-600 transition-colors duration-200"
          >
            {{ tag }}
          </span>
        </div>

        <div class="flex items-center gap-3 mt-1">
          <button
            @click="scrollTo('projects')"
            class="group px-7 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-full transition-all duration-200 flex items-center gap-2 text-sm shadow-lg shadow-red-900/30"
          >
            {{ t.myProjects }}
            <span class="transition-transform duration-200" :class="isRtl ? 'group-hover:-translate-x-1' : 'group-hover:translate-x-1'">
              {{ isRtl ? '←' : '→' }}
            </span>
          </button>
          <button
            @click="scrollTo('contact')"
            class="px-7 py-3 border border-zinc-700 text-zinc-300 rounded-full hover:border-red-800 hover:text-white transition-all duration-200 text-sm"
          >
            {{ t.contactMe }}
          </button>
        </div>

        <div class="flex items-center gap-10 mt-2 pt-6 border-t border-zinc-800/50">
          <div v-for="stat in personal.stats" :key="stat.label" class="flex flex-col gap-1">
            <span class="text-4xl font-black text-red-500 tracking-tight">{{ stat.value }}</span>
            <span class="text-zinc-600 text-xs">{{ stat.label }}</span>
          </div>
        </div>

      </div>

      <!-- Avatar -->
      <div class="flex justify-center items-center scroll-animate-left">
        <div class="relative">
          <div class="absolute inset-[-12px] rounded-full border border-zinc-800/50 border-dashed animate-spin-slow" />
          <div class="absolute inset-0 rounded-full bg-red-950/40 blur-3xl scale-125 animate-pulse-slow" />

          <img
            :src="assetUrl(personal.avatar)"
            :alt="personal.name"
            loading="eager"
            class="relative w-72 h-72 md:w-[400px] md:h-[400px] object-cover rounded-full border border-zinc-800/80 grayscale hover:grayscale-0 transition-all duration-700"
          />

          <div class="absolute -top-4 flex items-center gap-2 bg-zinc-900/95 border border-zinc-800 rounded-2xl px-4 py-3 backdrop-blur-sm animate-float-1"
            :class="isRtl ? '-left-8' : '-right-8'"
          >
            <span class="text-xl">💻</span>
            <div class="flex flex-col">
              <span class="text-white text-xs font-semibold">Full Stack</span>
              <span class="text-zinc-500 text-xs">Developer</span>
            </div>
          </div>

          <div class="absolute top-1/2 flex items-center gap-2 bg-zinc-900/95 border border-zinc-800 rounded-2xl px-4 py-3 backdrop-blur-sm animate-float-2"
            :class="isRtl ? '-right-10' : '-left-10'"
          >
            <span class="text-xl">🚀</span>
            <div class="flex flex-col">
              <span class="text-white text-xs font-semibold">+20</span>
              <span class="text-zinc-500 text-xs">{{ isRtl ? 'مشروع' : 'Projects' }}</span>
            </div>
          </div>

          <div class="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-zinc-900 border border-zinc-800 rounded-full px-4 py-2 whitespace-nowrap">
            <span class="text-sm">📍</span>
            <span class="text-zinc-400 text-xs">{{ personal.location }}</span>
          </div>

        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import { useLang } from '../../../app/composables/useLang'
import { assetUrl } from '../../../app/config/env'

const { personal, t, isRtl } = useLang()

const scrollTo = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
}
</script>

<style scoped>
.glow-1 {
  position: absolute; top: -10%; right: -10%;
  width: 80vw; height: 80vh;
  background: radial-gradient(circle, rgba(220, 38, 38, 0.08) 0%, transparent 65%);
  border-radius: 50%; filter: blur(40px);
  animation: float1 12s ease-in-out infinite;
}
.glow-2 {
  position: absolute; bottom: -20%; left: -10%;
  width: 70vw; height: 70vh;
  background: radial-gradient(circle, rgba(185, 28, 28, 0.06) 0%, transparent 65%);
  border-radius: 50%; filter: blur(50px);
  animation: float2 15s ease-in-out infinite;
}
.glow-3 {
  position: absolute; top: 30%; left: 30%;
  width: 50vw; height: 50vh;
  background: radial-gradient(circle, rgba(239, 68, 68, 0.05) 0%, transparent 65%);
  border-radius: 50%; filter: blur(60px);
  animation: float3 10s ease-in-out infinite;
}
@keyframes float1 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
  33% { transform: translate(-40px, -60px) scale(1.05); opacity: 0.8; }
  66% { transform: translate(30px, 40px) scale(0.97); opacity: 0.9; }
}
@keyframes float2 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
  50% { transform: translate(60px, -40px) scale(1.08); opacity: 0.8; }
}
@keyframes float3 {
  0%, 100% { transform: translate(0, 0) scale(1); opacity: 1; }
  50% { transform: translate(-30px, 30px) scale(1.1); opacity: 0.7; }
}
.animate-spin-slow { animation: spin 20s linear infinite; }
.animate-pulse-slow { animation: pulse-slow 4s ease-in-out infinite; }
@keyframes pulse-slow {
  0%, 100% { opacity: 0.5; transform: scale(1.25); }
  50% { opacity: 0.9; transform: scale(1.4); }
}
.animate-float-1 { animation: floating 4s ease-in-out infinite; }
.animate-float-2 { animation: floating 4s ease-in-out infinite 2s; }
@keyframes floating {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}
</style>