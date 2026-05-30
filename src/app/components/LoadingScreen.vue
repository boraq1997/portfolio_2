<template>
  <Transition name="loading">
    <div
      v-if="visible"
      class="fixed inset-0 z-[100] bg-zinc-950 flex flex-col items-center justify-center gap-8"
    >
      <!-- Logo -->
      <div class="flex flex-col items-center gap-4">
        <div class="relative">
          <!-- Outer ring -->
          <div class="w-20 h-20 rounded-full border-2 border-zinc-800 flex items-center justify-center">
            <!-- Inner spinning ring -->
            <div class="absolute inset-0 rounded-full border-2 border-transparent border-t-red-500 animate-spin" />
            <!-- Name initials -->
            <span class="text-white font-black text-2xl">{{ initials }}</span>
          </div>
        </div>

        <div class="flex flex-col items-center gap-1">
          <h1 class="text-white font-black text-xl">{{ personal.name }}</h1>
          <p class="text-zinc-500 text-sm">{{ personal.title }}</p>
        </div>
      </div>

      <!-- Progress bar -->
      <div class="w-48 h-0.5 bg-zinc-800 rounded-full overflow-hidden">
        <div
          class="h-full bg-red-600 rounded-full transition-all duration-300 ease-out"
          :style="{ width: progress + '%' }"
        />
      </div>

      <p class="text-zinc-600 text-xs tracking-widest">{{ progress }}%</p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { personal } from '../../data/ar/personal'

const visible = ref(true)
const progress = ref(0)

const initials = computed(() => {
  return personal.name
    .split(' ')
    .map((w: string) => w[0])
    .slice(0, 2)
    .join('')
})

onMounted(() => {
  // Simulate loading progress
  const interval = setInterval(() => {
    if (progress.value < 90) {
      progress.value += Math.floor(Math.random() * 15) + 5
      if (progress.value > 90) progress.value = 90
    }
  }, 200)

  // Complete and hide
  window.addEventListener('load', () => {
    clearInterval(interval)
    progress.value = 100
    setTimeout(() => {
      visible.value = false
    }, 500)
  })

  // Fallback: hide after 3s max
  setTimeout(() => {
    clearInterval(interval)
    progress.value = 100
    setTimeout(() => {
      visible.value = false
    }, 500)
  }, 3000)
})
</script>

<style scoped>
.loading-leave-active {
  transition: all 0.6s ease;
}
.loading-leave-to {
  opacity: 0;
  transform: scale(1.05);
}
</style>