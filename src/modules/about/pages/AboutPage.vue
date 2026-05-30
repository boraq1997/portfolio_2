<template>
  <section class="min-h-screen px-6 pt-24 pb-12" dir="rtl">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-12">عني</h1>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

        <!-- Avatar -->
        <div class="flex justify-center">
          <img
            :src="personal.avatar"
            :alt="personal.name"
            class="w-64 h-64 object-cover rounded-2xl border border-zinc-800"
          />
        </div>

        <!-- Info -->
        <div class="flex flex-col gap-6">
          <h2 class="text-3xl font-bold text-white">{{ personal.name }}</h2>
          <p class="text-zinc-400 text-lg">{{ personal.title }}</p>
          <p class="text-zinc-500 leading-relaxed">{{ personal.bio }}</p>

          <div class="flex flex-col gap-3 text-sm text-zinc-400">
            <span>📧 {{ personal.email }}</span>
            <span>📍 {{ personal.location }}</span>
            <span>📞 {{ personal.phone }}</span>
          </div>

          <div class="flex gap-4 mt-2">
            <a
              v-for="(url, platform) in personal.social"
              :key="platform"
              :href="url"
              target="_blank"
              class="px-4 py-2 border border-zinc-700 text-zinc-400 rounded-full hover:text-white hover:border-zinc-400 transition-colors text-sm"
            >
              {{ platform }}
            </a>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { personal } from '../../../data/ar/personal'
</script>