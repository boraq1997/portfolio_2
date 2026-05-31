<template>
  <section id="workflow" class="relative py-32 px-6 overflow-hidden" :dir="isRtl ? 'rtl' : 'ltr'">

    <!-- Ambient background -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-0 left-1/4 w-[500px] h-[500px] bg-red-950/10 rounded-full blur-[120px]" />
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-violet-950/10 rounded-full blur-[100px]" />
    </div>

    <div class="relative max-w-6xl mx-auto">

      <!-- Header -->
      <div class="flex flex-col gap-3 mb-24 scroll-animate">
        <div class="flex items-center gap-3">
          <div class="w-8 h-px bg-red-500" />
          <span class="text-red-500 text-xs tracking-[0.2em] uppercase font-semibold">{{ t.workflowLabel }}</span>
        </div>
        <h2 class="text-5xl md:text-6xl font-black text-white leading-none tracking-tight">
          {{ t.workflowTitle }}
        </h2>
        <p class="text-zinc-500 text-base max-w-lg leading-relaxed">{{ t.workflowDesc }}</p>
      </div>

      <!-- Timeline -->
      <div class="relative">

        <!-- Center line track -->
        <div class="absolute left-1/2 -translate-x-1/2 top-6 bottom-6 w-[2px] bg-zinc-800/60 hidden md:block" />
        <!-- Animated fill -->
        <div
          class="absolute left-1/2 -translate-x-1/2 top-6 w-[2px] hidden md:block transition-all duration-500 ease-out"
          :style="{
            height: lineHeight + '%',
            background: 'linear-gradient(to bottom, #ef4444, #b91c1c, #7f1d1d)'
          }"
        />

        <!-- Mobile line -->
        <div class="absolute left-6 top-6 bottom-6 w-[2px] bg-zinc-800/60 md:hidden" />
        <div
          class="absolute left-6 top-6 w-[2px] md:hidden transition-all duration-500 ease-out"
          :style="{
            height: lineHeight + '%',
            background: 'linear-gradient(to bottom, #ef4444, #b91c1c)'
          }"
        />

        <!-- Steps -->
        <div class="flex flex-col">
          <div
            v-for="(step, i) in steps"
            :key="i"
            :ref="el => stepRefs[i] = el as HTMLElement"
            class="relative flex items-center gap-0 mb-12 last:mb-0"
            :class="i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >

            <!-- ─── Card wrapper ─── -->
            <div
              class="flex-1 md:w-[calc(50%-3rem)] ms-16 md:ms-0 transition-all duration-700 ease-out"
              :style="{ transitionDelay: `${i * 60}ms` }"
              :class="[
                i % 2 === 0 ? 'md:me-12' : 'md:ms-12',
                visibleSteps[i]
                  ? 'opacity-100 translate-x-0 translate-y-0'
                  : i % 2 === 0
                    ? 'opacity-0 md:-translate-x-10 translate-y-6'
                    : 'opacity-0 md:translate-x-10 translate-y-6'
              ]"
            >
              <div
                class="relative group rounded-2xl overflow-hidden transition-all duration-400"
                style="background: rgba(24,24,27,0.8); border: 1px solid rgba(63,63,70,0.5);"
                @mouseenter="hovered = i"
                @mouseleave="hovered = -1"
                :style="hovered === i
                  ? { boxShadow: `0 20px 60px -12px ${step.color}22, 0 0 0 1px ${step.color}33`, borderColor: step.color + '44' }
                  : {}"
              >

                <!-- Top color bar -->
                <div
                  class="h-[3px] w-full transition-all duration-500"
                  :style="{
                    background: visibleSteps[i]
                      ? `linear-gradient(90deg, ${step.color}, ${step.color}44)`
                      : 'transparent'
                  }"
                />

                <!-- Ghost step number -->
                <div
                  class="absolute -top-4 select-none pointer-events-none font-black text-[88px] leading-none transition-all duration-500"
                  :class="i % 2 === 0 ? 'right-4' : 'left-4'"
                  :style="{
                    color: step.color,
                    opacity: hovered === i ? 0.06 : 0.03,
                  }"
                >
                  {{ String(i + 1).padStart(2, '0') }}
                </div>

                <!-- Card content -->
                <div class="relative p-6 z-10">

                  <!-- Header row -->
                  <div class="flex items-start gap-4 mb-5">

                    <!-- Icon -->
                    <div
                      class="relative flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-2xl transition-all duration-300 group-hover:scale-110"
                      :style="{
                        background: `radial-gradient(circle at 30% 30%, ${step.color}28, ${step.color}0a)`,
                        boxShadow: hovered === i ? `0 0 24px ${step.color}30` : 'none'
                      }"
                    >
                      {{ step.icon }}
                    </div>

                    <div class="flex-1 min-w-0 pt-0.5">
                      <div
                        class="text-[10px] font-bold tracking-[0.15em] uppercase mb-1.5 flex items-center gap-2"
                        :style="{ color: step.color }"
                      >
                        <span
                          class="inline-block w-4 h-px"
                          :style="{ background: step.color }"
                        />
                        {{ t.step }} {{ String(i + 1).padStart(2, '0') }}
                      </div>
                      <h3 class="text-white font-bold text-lg leading-tight">{{ step.title }}</h3>
                    </div>
                  </div>

                  <!-- Divider -->
                  <div class="h-px bg-zinc-800/80 mb-5" />

                  <!-- Description -->
                  <p class="text-zinc-400 text-sm leading-relaxed mb-5">{{ step.desc }}</p>

                  <!-- Tools -->
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="tool in step.tools"
                      :key="tool"
                      class="px-3 py-1 rounded-md text-xs font-medium transition-all duration-300"
                      :style="{
                        color: step.color,
                        background: step.color + '12',
                        border: `1px solid ${step.color}25`
                      }"
                    >
                      {{ tool }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- ─── Center node (desktop) ─── -->
            <div class="absolute left-1/2 -translate-x-1/2 z-20 hidden md:block">
              <div class="relative flex items-center justify-center">

                <!-- Outer pulse ring -->
                <div
                  class="absolute rounded-full transition-all duration-700"
                  :style="{
                    width: visibleSteps[i] ? '44px' : '0px',
                    height: visibleSteps[i] ? '44px' : '0px',
                    background: step.color + '18',
                    border: `1px solid ${step.color}30`,
                  }"
                />

                <!-- Inner dot -->
                <div
                  class="relative w-7 h-7 rounded-full flex items-center justify-center font-black text-[11px] text-white transition-all duration-500"
                  :style="{
                    background: visibleSteps[i]
                      ? `linear-gradient(135deg, ${step.color}, ${step.color}bb)`
                      : '#27272a',
                    boxShadow: visibleSteps[i] ? `0 0 16px ${step.color}60` : 'none',
                    transform: visibleSteps[i] ? 'scale(1)' : 'scale(0)',
                    border: `2px solid ${step.color}`,
                  }"
                >
                  {{ i + 1 }}
                </div>
              </div>
            </div>

            <!-- ─── Mobile node ─── -->
            <div class="absolute left-6 -translate-x-1/2 z-20 md:hidden top-5">
              <div
                class="w-6 h-6 rounded-full flex items-center justify-center font-black text-[10px] text-white border-2 transition-all duration-500"
                :style="{
                  background: visibleSteps[i] ? step.color : '#27272a',
                  borderColor: step.color,
                  boxShadow: visibleSteps[i] ? `0 0 12px ${step.color}50` : 'none',
                }"
              >
                {{ i + 1 }}
              </div>
            </div>

            <!-- Spacer (desktop opposite side) -->
            <div class="hidden md:block flex-1" />

          </div>
        </div>

        <!-- ─── End badge ─── -->
        <div
          class="relative flex justify-center mt-16 transition-all duration-700"
          :class="lineHeight > 92 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'"
        >
          <div
            class="flex items-center gap-3 px-8 py-3.5 rounded-full border"
            style="background: rgba(239,68,68,0.06); border-color: rgba(239,68,68,0.2);"
          >
            <div class="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_8px_#22c55e]" />
            <span class="text-sm font-semibold text-white">{{ t.workflowDone }}</span>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useLang } from '../../../app/composables/useLang'

const { t, isRtl } = useLang()

const stepRefs = ref<(HTMLElement | null)[]>([])
const visibleSteps = ref<boolean[]>([])
const lineHeight = ref(0)
const hovered = ref(-1)

const steps = computed(() => [
  { icon: '🤝', color: '#f59e0b', title: t.value.wf1Title, desc: t.value.wf1Desc, tools: t.value.wf1Tools },
  { icon: '🎨', color: '#8b5cf6', title: t.value.wf2Title, desc: t.value.wf2Desc, tools: t.value.wf2Tools },
  { icon: '🗄️', color: '#06b6d4', title: t.value.wf3Title, desc: t.value.wf3Desc, tools: t.value.wf3Tools },
  { icon: '⚙️', color: '#ef4444', title: t.value.wf4Title, desc: t.value.wf4Desc, tools: t.value.wf4Tools },
  { icon: '🖥️', color: '#10b981', title: t.value.wf5Title, desc: t.value.wf5Desc, tools: t.value.wf5Tools },
  { icon: '🧪', color: '#f97316', title: t.value.wf6Title, desc: t.value.wf6Desc, tools: t.value.wf6Tools },
  { icon: '🚀', color: '#22c55e', title: t.value.wf7Title, desc: t.value.wf7Desc, tools: t.value.wf7Tools },
])

function updateTimeline() {
  const section = document.getElementById('workflow')
  if (!section) return

  const rect = section.getBoundingClientRect()
  const progress = Math.max(0, Math.min(100, (-rect.top / (rect.height - window.innerHeight)) * 115))
  lineHeight.value = progress

  stepRefs.value.forEach((el, i) => {
    if (el && el.getBoundingClientRect().top < window.innerHeight * 0.8) {
      visibleSteps.value[i] = true
    }
  })
}

onMounted(() => {
  visibleSteps.value = new Array(7).fill(false)
  window.addEventListener('scroll', updateTimeline, { passive: true })
  updateTimeline()
})

onUnmounted(() => window.removeEventListener('scroll', updateTimeline))
</script>

<style scoped>
.transition-all.duration-400 { transition-duration: 400ms; }
</style>