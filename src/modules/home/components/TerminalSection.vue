<template>
  <section id="terminal" class="relative py-24 px-6 overflow-hidden" :dir="isRtl ? 'rtl' : 'ltr'">

    <div class="relative max-w-4xl mx-auto">

      <!-- Header — bilingual -->
      <div class="flex flex-col gap-3 mb-10 scroll-animate">
        <div class="flex items-center gap-3">
          <div class="w-8 h-px bg-red-500" />
          <span class="text-red-500 text-xs tracking-[0.2em] uppercase font-semibold">
            {{ isRtl ? 'تفاعلي' : 'Interactive' }}
          </span>
        </div>
        <h2 class="text-4xl md:text-5xl font-black text-white leading-none">
          {{ isRtl ? 'جرّب الطرفية' : 'Try the Terminal' }}
        </h2>
        <p class="text-zinc-500 text-sm">
          {{ isRtl ? 'اكتب ' : 'Type ' }}
          <span class="text-red-400 font-mono">help</span>
          {{ isRtl ? ' لعرض الأوامر المتاحة' : ' to see available commands' }}
        </p>
      </div>

      <!-- Terminal window — always LTR -->
      <div
        dir="ltr"
        class="rounded-2xl overflow-hidden border border-zinc-800/80 shadow-[0_32px_80px_-12px_rgba(0,0,0,0.9)] scroll-animate terminal-glow"
        style="background: #0c0c0e"
      >

        <!-- Title bar -->
        <div
          class="flex items-center gap-3 px-4 py-3 border-b border-zinc-800/60"
          style="background: linear-gradient(180deg, #1a1a1e 0%, #141416 100%)"
        >
          <!-- Traffic lights -->
          <div class="flex items-center gap-1.5 flex-shrink-0">
            <button
              class="w-3 h-3 rounded-full flex items-center justify-center group relative"
              style="background: #ff5f57"
              @click="clearTerminal"
              title="Clear terminal"
            >
              <span class="opacity-0 group-hover:opacity-100 text-[7px] font-black text-red-900 leading-none absolute">✕</span>
            </button>
            <div class="w-3 h-3 rounded-full" style="background: #febc2e" />
            <div class="w-3 h-3 rounded-full" style="background: #28c840" />
          </div>

          <!-- Breadcrumb path -->
          <div class="flex-1 flex items-center justify-center gap-1 text-xs font-mono">
            <span class="text-zinc-600">~</span>
            <span class="text-zinc-700">/</span>
            <span class="text-zinc-500">portfolio</span>
            <span class="text-zinc-700">/</span>
            <span class="text-red-500/80">terminal</span>
          </div>

          <!-- Right status -->
          <div class="flex items-center gap-3 flex-shrink-0">
            <div class="hidden sm:flex items-center gap-1.5 text-xs font-mono text-zinc-700">
              <span>zsh</span>
              <span class="text-zinc-800">·</span>
              <span>utf-8</span>
            </div>
            <div class="flex items-center gap-1.5">
              <div class="w-1.5 h-1.5 rounded-full" style="background:#28c840; box-shadow: 0 0 6px #28c84088" />
              <span class="text-zinc-600 text-xs font-mono">online</span>
            </div>
          </div>
        </div>

        <!-- Body -->
        <div
          ref="terminalBody"
          class="p-5 font-mono text-[13px] overflow-y-auto relative"
          style="height: 460px; scrollbar-width: thin; scrollbar-color: #2a2a2e transparent"
          @click="focusInput"
        >

          <!-- Scanline overlay -->
          <div class="absolute inset-0 pointer-events-none scanlines opacity-[0.02]" />

          <!-- Boot sequence -->
          <div class="mb-5 select-none">
            <div class="text-red-500/90 text-[11px] leading-[1.35] font-mono overflow-hidden">
              <pre>{{ asciiArt }}</pre>
            </div>
            <div class="mt-3 border-t border-zinc-800/60 pt-3 space-y-1">
              <div class="flex items-center gap-2 text-xs text-zinc-500">
                <span class="text-green-500">✓</span>
                <span>Loaded <span class="text-zinc-300">buraq-portfolio</span> v2.6.1 — Last login: {{ loginTime }}</span>
              </div>
              <div class="flex items-center gap-2 text-xs text-zinc-600">
                <span class="text-yellow-500/80">ℹ</span>
                <span>Type <span class="text-yellow-400/90">help</span> for commands &nbsp;·&nbsp; <span class="text-zinc-500">↑↓</span> history &nbsp;·&nbsp; <span class="text-zinc-500">Tab</span> autocomplete</span>
              </div>
            </div>
          </div>

          <!-- History -->
          <div>
            <div v-for="(entry, i) in history" :key="i" class="mb-1">

              <!-- Prompt line -->
              <div class="flex items-center gap-0 mt-3 leading-none">
                <span class="text-cyan-600 text-xs select-none">buraq</span>
                <span class="text-zinc-700 text-xs select-none">@</span>
                <span class="text-purple-500/80 text-xs select-none">portfolio</span>
                <span class="text-zinc-700 text-xs select-none">:~$&nbsp;</span>
                <span class="text-white text-xs">{{ entry.cmd }}</span>
              </div>

              <!-- Output -->
              <div class="mt-1.5 ps-1">

                <!-- Error -->
                <div v-if="entry.type === 'error'" class="flex items-start gap-2 text-xs">
                  <span class="text-red-500 flex-shrink-0">✗</span>
                  <span class="text-red-400/80">{{ entry.output }}</span>
                </div>

                <!-- Text -->
                <div v-else-if="entry.type === 'text'" class="text-zinc-400 text-xs leading-relaxed whitespace-pre-wrap border-l-2 border-zinc-800 pl-3">{{ entry.output }}</div>

                <!-- Table -->
                <div v-else-if="entry.type === 'table'" class="space-y-1 py-1">
                  <div v-for="row in entry.rows" :key="row.key" class="flex items-start gap-2 text-xs">
                    <span class="text-yellow-500/90 w-[90px] flex-shrink-0 font-medium">{{ row.key }}</span>
                    <span class="text-zinc-700 select-none flex-shrink-0">│</span>
                    <span :class="row.color || 'text-zinc-300'">{{ row.value }}</span>
                  </div>
                </div>

                <!-- Help -->
                <div v-else-if="entry.type === 'help'" class="py-1 space-y-px">
                  <div class="text-zinc-600 text-xs mb-2">Available commands:</div>
                  <div
                    v-for="cmd in entry.commands"
                    :key="cmd.name"
                    class="flex items-start gap-3 text-xs group cursor-pointer rounded px-1 py-0.5 hover:bg-zinc-800/60 transition-colors"
                    @click="runCommand(cmd.name)"
                  >
                    <span class="text-red-400 w-20 flex-shrink-0 font-semibold group-hover:text-red-300 transition-colors">{{ cmd.name }}</span>
                    <span class="text-zinc-700 select-none">—</span>
                    <span class="text-zinc-500 group-hover:text-zinc-300 transition-colors">{{ cmd.desc }}</span>
                    <span class="ms-auto text-zinc-700 group-hover:text-zinc-500 transition-colors text-[10px] hidden sm:inline">↵ run</span>
                  </div>
                </div>

                <!-- Skills -->
                <div v-else-if="entry.type === 'skills'" class="flex flex-wrap gap-1.5 py-1">
                  <span
                    v-for="skill in entry.skills"
                    :key="skill.name"
                    class="px-2.5 py-0.5 rounded-md text-[11px] font-medium border transition-all duration-200 hover:scale-105 cursor-default"
                    :style="{ color: skill.color, borderColor: skill.color+'33', background: skill.color+'0f' }"
                  >{{ skill.name }}</span>
                </div>

                <!-- Social -->
                <div v-else-if="entry.type === 'social'" class="space-y-1 py-1">
                  <a
                    v-for="s in entry.links"
                    :key="s.name"
                    :href="s.url"
                    target="_blank"
                    class="flex items-center gap-2 text-xs group rounded px-1 py-0.5 hover:bg-zinc-800/60 transition-colors"
                  >
                    <span class="text-cyan-500/80 w-16 flex-shrink-0 font-medium group-hover:text-cyan-400">{{ s.name }}</span>
                    <span class="text-zinc-700">→</span>
                    <span class="text-zinc-500 group-hover:text-cyan-400/70 group-hover:underline underline-offset-2 transition-colors">{{ s.url }}</span>
                  </a>
                </div>

                <!-- Stats -->
                <div v-else-if="entry.type === 'stats'" class="flex gap-8 py-2 ps-1">
                  <div v-for="s in entry.stats" :key="s.label">
                    <div class="text-[28px] font-black text-red-500 leading-none">{{ s.value }}</div>
                    <div class="text-zinc-600 text-xs mt-1">{{ s.label }}</div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          <!-- Active prompt -->
          <div class="flex items-center gap-0 mt-3 leading-none">
            <span class="text-cyan-600 text-xs select-none">buraq</span>
            <span class="text-zinc-700 text-xs select-none">@</span>
            <span class="text-purple-500/80 text-xs select-none">portfolio</span>
            <span class="text-zinc-700 text-xs select-none">:~$&nbsp;</span>
            <div class="relative flex items-center flex-1">
              <span class="text-white text-xs">{{ currentInput }}</span>
              <span
                class="inline-block w-[7px] h-[13px] ms-px"
                style="background:#4ade80"
                :style="{ opacity: cursorVisible ? 1 : 0 }"
              />
              <!-- Autocomplete hint -->
              <span v-if="autocompleteHint" class="text-zinc-700 text-xs">{{ autocompleteHint }}</span>
            </div>
          </div>

          <!-- Hidden input -->
          <input
            ref="inputRef"
            v-model="currentInput"
            class="fixed opacity-0 pointer-events-none w-0 h-0 left-0 top-0"
            @keydown="handleKey"
            @input="updateAutocomplete"
            autocomplete="off"
            spellcheck="false"
          />
        </div>

        <!-- Status bar -->
        <div
          class="flex items-center justify-between px-4 py-2 border-t border-zinc-800/50"
          style="background: #111114"
        >
          <div class="flex items-center gap-3 text-[11px] font-mono text-zinc-700">
            <span class="text-green-600/70">●</span>
            <span>bash 5.2 · UTF-8 · Iraq/Baghdad</span>
          </div>
          <div class="flex items-center gap-1">
            <button
              v-for="cmd in quickCmds"
              :key="cmd"
              @click="runCommand(cmd)"
              class="text-zinc-600 hover:text-white text-[11px] font-mono px-2 py-0.5 rounded transition-all duration-150 hover:bg-zinc-800 border border-transparent hover:border-zinc-700"
            >{{ cmd }}</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, nextTick, onMounted, onUnmounted } from 'vue'
import { useLang } from '../../../app/composables/useLang'

const { isRtl } = useLang()

const terminalBody    = ref<HTMLElement>()
const inputRef        = ref<HTMLInputElement>()
const currentInput    = ref('')
const history         = ref<any[]>([])
const cmdHistory      = ref<string[]>([])
const historyIdx      = ref(-1)
const cursorVisible   = ref(true)
const autocompleteHint = ref('')

const quickCmds = ['help', 'whoami', 'skills', 'social', 'clear']

const loginTime = new Date().toLocaleString('en-US', {
  weekday: 'short', month: 'short', day: 'numeric',
  hour: '2-digit', minute: '2-digit',
})

const asciiArt =
`  ██████╗ ██╗   ██╗██████╗  █████╗  ██████╗
  ██╔══██╗██║   ██║██╔══██╗██╔══██╗██╔═══██╗
  ██████╔╝██║   ██║██████╔╝███████║██║   ██║
  ██╔══██╗██║   ██║██╔══██╗██╔══██║██║▄▄ ██║
  ██████╔╝╚██████╔╝██║  ██║██║  ██║╚██████╔╝
  ╚═════╝  ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚═╝ ╚══▀▀═╝`

const skillColors: Record<string, string> = {
  'Vue.js':'#42b883','Laravel':'#f55247','TypeScript':'#3178c6',
  'MySQL':'#00758f','Linux':'#fcc624','Docker':'#2496ed',
  'Angular':'#dd0031','PHP':'#777bb4','Tailwind':'#38bdf8',
  'PostgreSQL':'#336791','Python':'#3776ab','Bash':'#4eaa25',
}

const COMMANDS: Record<string, () => any> = {
  help: () => ({
    type: 'help',
    commands: [
      { name: 'help',     desc: 'List all available commands' },
      { name: 'whoami',   desc: 'Quick developer summary' },
      { name: 'name',     desc: 'Full name (EN + AR)' },
      { name: 'age',      desc: 'Birth year & current age' },
      { name: 'title',    desc: 'Job title & focus' },
      { name: 'bio',      desc: 'Short biography' },
      { name: 'location', desc: 'Current city & timezone' },
      { name: 'email',    desc: 'Contact email address' },
      { name: 'phone',    desc: 'Phone & WhatsApp number' },
      { name: 'skills',   desc: 'Tech stack & tools' },
      { name: 'stats',    desc: 'Years · Projects · Clients' },
      { name: 'social',   desc: 'Social media links' },
      { name: 'projects', desc: 'Projects overview' },
      { name: 'avail',    desc: 'Availability for hire' },
      { name: 'clear',    desc: 'Clear terminal output' },
    ],
  }),

  whoami: () => ({
    type: 'text',
    output:
`Buraq Nizar Jasim — Full Stack Web Developer 🇮🇶
────────────────────────────────────────────────
8+ years · Laravel · Vue 3 · TypeScript · MySQL
Based in Karbala, Iraq · Available for new projects
✉  boraqnz@gmail.com`,
  }),

  name: () => ({
    type: 'table',
    rows: [
      { key: 'Full name', value: 'Buraq Nizar Jasim',  color: 'text-white' },
      { key: 'Arabic',    value: 'براق نزار جاسم',    color: 'text-zinc-300' },
      { key: 'Handle',    value: '@boraq1997',          color: 'text-cyan-400' },
    ],
  }),

  age: () => {
    const now = new Date()
    let age = now.getFullYear() - 1997
    if (now.getMonth() < 0 || (now.getMonth() === 0 && now.getDate() < 1)) age--
    return {
      type: 'table',
      rows: [
        { key: 'Born',    value: '1997 · Karbala, Iraq', color: 'text-yellow-400' },
        { key: 'Age',     value: `${age} years old`,      color: 'text-green-400' },
        { key: 'Zodiac',  value: 'Capricorn ♑',           color: 'text-zinc-400' },
      ],
    }
  },

  title: () => ({
    type: 'table',
    rows: [
      { key: 'Role',     value: 'Full Stack Web Developer', color: 'text-red-400' },
      { key: 'Primary',  value: 'Laravel + Vue 3',          color: 'text-cyan-400' },
      { key: 'Also',     value: 'TypeScript · Angular · MySQL', color: 'text-zinc-300' },
      { key: 'Exp',      value: '8+ Years of production code',  color: 'text-green-400' },
    ],
  }),

  bio: () => ({
    type: 'text',
    output:
`A passionate Full Stack Web Developer from Iraq.
Extensive experience building professional, scalable web
applications — combining clean architecture with elegant UI.
Focus: performance, RTL support, and production-ready code.`,
  }),

  location: () => ({
    type: 'table',
    rows: [
      { key: 'Country',  value: 'Iraq 🇮🇶',                    color: 'text-zinc-300' },
      { key: 'City',     value: 'Karbala',                      color: 'text-yellow-400' },
      { key: 'Timezone', value: 'UTC+3  (Arabia Standard Time)', color: 'text-zinc-500' },
    ],
  }),

  email: () => ({
    type: 'table',
    rows: [
      { key: 'Email',  value: 'boraqnz@gmail.com', color: 'text-cyan-400' },
      { key: 'Status', value: 'Replies within 24h', color: 'text-green-500' },
    ],
  }),

  phone: () => ({
    type: 'table',
    rows: [
      { key: 'Phone',     value: '+964 771 145 9546', color: 'text-green-400' },
      { key: 'WhatsApp',  value: 'Available ✓',       color: 'text-green-500' },
      { key: 'Telegram',  value: '@boraq1997',         color: 'text-cyan-400' },
    ],
  }),

  skills: () => ({
    type: 'skills',
    skills: [
      'Vue.js','Laravel','TypeScript','PHP','MySQL','PostgreSQL',
      'Angular','Docker','Linux','Tailwind','Python','Bash',
    ].map(n => ({ name: n, color: skillColors[n] || '#ef4444' })),
  }),

  stats: () => ({
    type: 'stats',
    stats: [
      { value: '8+',  label: 'Years Exp'  },
      { value: '20+', label: 'Projects'   },
      { value: '15+', label: 'Clients'    },
    ],
  }),

  social: () => ({
    type: 'social',
    links: [
      { name: 'github',    url: 'https://github.com/boraq1997' },
      { name: 'telegram',  url: 'https://t.me/boraq1997' },
      { name: 'facebook',  url: 'https://facebook.com/boraqboraq1' },
      { name: 'instagram', url: 'https://instagram.com/mt._kf' },
      { name: 'gmail',     url: 'mailto:boraqnz@gmail.com' },
    ],
  }),

  projects: () => ({
    type: 'table',
    rows: [
      { key: 'Completed', value: '20+ projects',                      color: 'text-green-400' },
      { key: 'Featured',  value: 'Procurement System',                  color: 'text-yellow-400' },
      { key: 'Also',      value: 'Restaurant System, Portfolio & more', color: 'text-zinc-300' },
      { key: 'Stack',     value: 'Laravel · Vue 3 · TypeScript',        color: 'text-cyan-400' },
      { key: 'View',      value: 'Scroll ↑ to browse projects',         color: 'text-zinc-500' },
    ],
  }),

  avail: () => ({
    type: 'table',
    rows: [
      { key: 'Status',   value: '● Available for hire',     color: 'text-green-400' },
      { key: 'Type',     value: 'Freelance / Full-time',    color: 'text-zinc-300' },
      { key: 'Start',    value: 'Immediately',              color: 'text-yellow-400' },
      { key: 'Contact',  value: 'boraqnz@gmail.com',        color: 'text-cyan-400' },
    ],
  }),

  clear: () => {
    history.value = []
    return { type: '_clear' }
  },
}

const allCmdNames = Object.keys(COMMANDS)

function updateAutocomplete() {
  const val = currentInput.value.toLowerCase()
  if (!val) { autocompleteHint.value = ''; return }
  const match = allCmdNames.find(c => c.startsWith(val) && c !== val)
  autocompleteHint.value = match ? match.slice(val.length) : ''
}

function runCommand(raw: string) {
  const cmd = raw.trim().toLowerCase()
  if (!cmd) return
  if (cmd !== 'clear') cmdHistory.value.unshift(raw.trim())
  historyIdx.value = -1
  autocompleteHint.value = ''

  const fn = COMMANDS[cmd]
  const result = fn
    ? fn()
    : { type: 'error', output: `command not found: ${cmd}   — try 'help'` }

  if (result.type !== '_clear') {
    history.value.push({ cmd: raw.trim(), ...result })
  }
  currentInput.value = ''
  scrollBottom()
}

function handleKey(e: KeyboardEvent) {
  if (e.key === 'Enter') { runCommand(currentInput.value); return }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    if (historyIdx.value < cmdHistory.value.length - 1) {
      historyIdx.value++
      currentInput.value = cmdHistory.value[historyIdx.value]
      updateAutocomplete()
    }
    return
  }
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    if (historyIdx.value > 0) {
      historyIdx.value--
      currentInput.value = cmdHistory.value[historyIdx.value]
    } else {
      historyIdx.value = -1
      currentInput.value = ''
    }
    updateAutocomplete()
    return
  }
  if (e.key === 'Tab') {
    e.preventDefault()
    const val = currentInput.value.toLowerCase()
    const match = allCmdNames.find(c => c.startsWith(val) && c !== val)
    if (match) { currentInput.value = match; autocompleteHint.value = '' }
    return
  }
  if (e.key === 'l' && e.ctrlKey) { e.preventDefault(); clearTerminal() }
  if (e.key === 'c' && e.ctrlKey) { currentInput.value = ''; autocompleteHint.value = '' }
}

function clearTerminal() { history.value = []; currentInput.value = ''; autocompleteHint.value = '' }
function focusInput() { inputRef.value?.focus() }

async function scrollBottom() {
  await nextTick()
  if (terminalBody.value) terminalBody.value.scrollTop = terminalBody.value.scrollHeight
}

let cursorInterval: ReturnType<typeof setInterval>
onMounted(() => {
  cursorInterval = setInterval(() => { cursorVisible.value = !cursorVisible.value }, 520)
  // setTimeout(focusInput, 600)
})
onUnmounted(() => clearInterval(cursorInterval))
</script>

<style scoped>
.terminal-glow {
  box-shadow: 0 32px 80px -12px rgba(0,0,0,0.9), 0 0 0 1px rgba(255,255,255,0.04);
}
.scanlines {
  background: repeating-linear-gradient(
    0deg,
    transparent,
    transparent 2px,
    rgba(255,255,255,1) 2px,
    rgba(255,255,255,1) 3px
  );
}
::-webkit-scrollbar { width: 3px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: #2a2a2e; border-radius: 4px; }
</style>