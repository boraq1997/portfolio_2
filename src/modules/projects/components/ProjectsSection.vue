<template>
  <section id="projects" class="relative py-32 px-6 overflow-hidden">

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-1/3 left-1/4 w-96 h-96 bg-red-950/10 rounded-full blur-3xl" />
    </div>

    <div class="relative max-w-6xl mx-auto" :dir="isRtl ? 'rtl' : 'ltr'">

      <!-- Header -->
      <div class="flex flex-col gap-2 mb-12 scroll-animate">
        <span class="text-red-500 text-sm tracking-widest uppercase font-medium">{{ t.myWork }}</span>
        <h2 class="text-4xl md:text-5xl font-black text-white">{{ t.projectsTitle }}</h2>
        <div class="w-12 h-1 bg-red-600 rounded-full mt-2" />
      </div>

      <!-- Filter Tags -->
      <div class="flex flex-wrap gap-2 mb-10 scroll-animate">
        <button
          @click="activeFilter = 'all'"
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          :class="activeFilter === 'all' ? 'bg-red-600 text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white'"
        >
          {{ t.all }}
        </button>
        <button
          v-for="tag in allTags"
          :key="tag"
          @click="activeFilter = tag"
          class="px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200"
          :class="activeFilter === tag ? 'bg-red-600 text-white' : 'bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-white'"
        >
          {{ tag }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(project, i) in filteredProjects"
          :key="project.id"
          @click="openModal(project)"
          class="group relative bg-zinc-900/60 border border-zinc-800 rounded-3xl overflow-hidden cursor-pointer hover:border-red-900/50 hover:scale-[1.02] transition-all duration-300 scroll-animate"
          :class="`delay-${(i % 3) * 100}`"
        >
          <!-- Image -->
          <div class="relative h-48 overflow-hidden bg-zinc-800">
            <img
              v-if="project.images[0]"
              :src="assetUrl(project.images[0])"
              :alt="project.title"
              loading="lazy"
              class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            />
            <div v-else class="w-full h-full flex items-center justify-center">
              <span class="text-zinc-600 text-4xl">🖥️</span>
            </div>
            <div class="absolute inset-0 bg-red-950/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <span class="text-white text-sm font-medium border border-white/30 px-4 py-2 rounded-full backdrop-blur-sm">
                {{ t.viewDetails }}
              </span>
            </div>
          </div>

          <!-- Content -->
          <div class="p-5 flex flex-col gap-3">
            <div>
              <h3 class="text-white font-bold text-lg leading-tight">{{ project.title }}</h3>
              <p class="text-red-500 text-xs mt-1">{{ project.tagline }}</p>
            </div>
            <p class="text-zinc-500 text-sm leading-relaxed line-clamp-2">{{ project.description }}</p>
            <div class="flex flex-wrap gap-1.5">
              <span
                v-for="tag in project.tags"
                :key="tag"
                class="px-2 py-0.5 bg-zinc-800 text-zinc-500 text-xs rounded-full"
              >
                {{ tag }}
              </span>
            </div>
            <div class="flex gap-3 mt-1 pt-3 border-t border-zinc-800">
              <a
                v-if="project.github"
                :href="project.github"
                target="_blank"
                @click.stop
                class="flex items-center gap-1.5 text-zinc-500 hover:text-white text-xs transition-colors"
              >
                <svg class="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
                </svg>
                GitHub
              </a>
              <a
                v-if="project.demo"
                :href="project.demo"
                target="_blank"
                @click.stop
                class="flex items-center gap-1.5 text-zinc-500 hover:text-red-400 text-xs transition-colors"
              >
                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Demo
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>

    <!-- Modal -->
    <Transition name="modal">
      <div
        v-if="selectedProject"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        @click.self="closeModal"
      >
        <div class="absolute inset-0 bg-black/80 backdrop-blur-sm" @click="closeModal" />

        <div
          class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-zinc-900 border border-zinc-800 rounded-3xl no-scrollbar"
          :dir="isRtl ? 'rtl' : 'ltr'"
        >

          <!-- Images -->
          <div class="relative h-72 bg-zinc-800 overflow-hidden rounded-t-3xl">
            <Transition name="slide">
              <img
                v-if="selectedProject.images[activeImage]"
                :key="activeImage"
                :src="assetUrl(selectedProject.images[activeImage])"
                :alt="selectedProject.title"
                loading="lazy"
                class="w-full h-full object-cover"
              />
              <div v-else class="w-full h-full flex items-center justify-center">
                <span class="text-zinc-600 text-6xl">🖥️</span>
              </div>
            </Transition>

            <div class="absolute inset-0 bg-gradient-to-t from-zinc-900/80 via-transparent to-transparent" />

            <div v-if="selectedProject.images.length > 1" class="absolute inset-x-0 top-1/2 -translate-y-1/2 flex justify-between px-4">
              <button @click="prevImage" class="w-9 h-9 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">›</button>
              <button @click="nextImage" class="w-9 h-9 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm">‹</button>
            </div>

            <div v-if="selectedProject.images.length > 1" class="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              <button
                v-for="(_, i) in selectedProject.images"
                :key="i"
                @click="activeImage = i as number"
                class="h-1.5 rounded-full transition-all duration-300"
                :class="activeImage === i ? 'w-6 bg-white' : 'w-1.5 bg-white/40'"
              />
            </div>

            <button @click="closeModal" class="absolute top-4 left-4 w-8 h-8 bg-black/50 hover:bg-black/80 rounded-full flex items-center justify-center text-white transition-colors backdrop-blur-sm text-sm">✕</button>

            <div class="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-zinc-400 text-xs">
              {{ selectedProject.images.length > 1 ? `${activeImage + 1} / ${selectedProject.images.length}` : '' }}
            </div>
          </div>

          <!-- Info Grid -->
          <div class="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">

            <div class="md:col-span-2 flex flex-col gap-6">
              <div>
                <h3 class="text-2xl font-black text-white leading-tight">{{ selectedProject.title }}</h3>
                <p class="text-red-500 text-sm mt-1 font-medium">{{ selectedProject.tagline }}</p>
              </div>
              <p class="text-zinc-400 leading-relaxed text-sm">{{ selectedProject.description }}</p>
              <div class="bg-zinc-800/40 border border-zinc-700/50 rounded-2xl p-5">
                <h4 class="text-white font-semibold text-sm mb-3 flex items-center gap-2">
                  <span class="w-1.5 h-1.5 rounded-full bg-red-500" />
                  {{ t.projectDetails }}
                </h4>
                <p class="text-zinc-500 text-sm leading-relaxed whitespace-pre-line">{{ selectedProject.details }}</p>
              </div>
              <div class="flex gap-3">
                <a v-if="selectedProject.github" :href="selectedProject.github" target="_blank"
                  class="flex items-center gap-2 px-5 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white rounded-xl text-sm transition-colors border border-zinc-700">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
                <a v-if="selectedProject.demo" :href="selectedProject.demo" target="_blank"
                  class="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-sm transition-colors">
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                  Demo
                </a>
              </div>
            </div>

            <div class="flex flex-col gap-6">
              <div class="flex flex-col gap-3">
                <h4 class="text-zinc-500 text-xs tracking-widest uppercase">{{ t.technologies }}</h4>
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="tag in selectedProject.tags" :key="tag"
                    class="px-2.5 py-1 bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs rounded-lg">
                    {{ tag }}
                  </span>
                </div>
              </div>

              <div v-if="selectedProject.images.length > 1" class="flex flex-col gap-3">
                <h4 class="text-zinc-500 text-xs tracking-widest uppercase">{{ t.images }}</h4>
                <div class="grid grid-cols-2 gap-2">
                  <button
                    v-for="(img, i) in selectedProject.images"
                    :key="i"
                    @click="activeImage = i as number"
                    class="relative aspect-video rounded-xl overflow-hidden border-2 transition-all duration-200"
                    :class="activeImage === i ? 'border-red-500' : 'border-transparent opacity-60 hover:opacity-100'"
                  >
                    <img
                      :src="assetUrl(img)"
                      :alt="`image ${i + 1}`"
                      loading="lazy"
                      class="w-full h-full object-cover"
                    />
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </Transition>

  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useLang } from '../../../app/composables/useLang'
import { assetUrl } from '../../../app/config/env'

const { projects, t, isRtl } = useLang()

const activeFilter = ref('all')
const selectedProject = ref<any>(null)
const activeImage = ref<number>(0)

const allTags = computed(() => {
  const tags = projects.value.flatMap(p => p.tags)
  return [...new Set(tags)]
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value
  return projects.value.filter(p => p.tags.includes(activeFilter.value))
})

function openModal(project: any) {
  selectedProject.value = project
  activeImage.value = 0
  document.body.style.overflow = 'hidden'
}

function closeModal() {
  selectedProject.value = null
  document.body.style.overflow = ''
}

function nextImage() {
  activeImage.value = (activeImage.value + 1) % selectedProject.value.images.length
}

function prevImage() {
  activeImage.value = (activeImage.value - 1 + selectedProject.value.images.length) % selectedProject.value.images.length
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.no-scrollbar::-webkit-scrollbar { display: none; }
.no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
.modal-enter-active, .modal-leave-active { transition: opacity 0.3s ease; }
.modal-enter-from, .modal-leave-to { opacity: 0; }
.slide-enter-active, .slide-leave-active { transition: opacity 0.3s ease; }
.slide-enter-from, .slide-leave-to { opacity: 0; }
</style>