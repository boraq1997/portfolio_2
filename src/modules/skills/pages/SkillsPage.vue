<template>
  <section class="min-h-screen px-6 pt-24 pb-12" dir="rtl">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-12">المهارات</h1>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div
          v-for="category in skills"
          :key="category.category"
          class="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 flex flex-col gap-4"
        >
          <h3 class="text-white font-semibold text-lg">{{ category.category }}</h3>

          <div
            v-for="skill in category.items"
            :key="skill.name"
            class="flex flex-col gap-2"
          >
            <div class="flex justify-between text-sm">
              <span class="text-zinc-300">{{ skill.name }}</span>
              <span class="text-zinc-500">{{ skill.level }}%</span>
            </div>
            <div class="w-full bg-zinc-800 rounded-full h-1.5">
              <div
                class="bg-white h-1.5 rounded-full transition-all duration-700"
                :style="{ width: skill.level + '%' }"
              />
            </div>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { skills } from '../../../data/ar/skills'
</script>