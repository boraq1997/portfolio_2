<template>
  <section id="contact" class="relative py-32 px-6 overflow-hidden">

    <div class="absolute inset-0 pointer-events-none">
      <div class="absolute bottom-0 right-1/3 w-96 h-96 bg-red-950/10 rounded-full blur-3xl" />
    </div>

    <div class="relative max-w-6xl mx-auto" :dir="isRtl ? 'rtl' : 'ltr'">

      <!-- Header -->
      <div class="flex flex-col gap-2 mb-16 scroll-animate">
        <span class="text-red-500 text-sm tracking-widest uppercase font-medium">{{ t.contactTitle }}</span>
        <h2 class="text-4xl md:text-5xl font-black text-white">{{ t.contactTitle }}</h2>
        <div class="w-12 h-1 bg-red-600 rounded-full mt-2" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">

        <!-- ── Left: Info (unchanged) ── -->
        <div class="flex flex-col gap-8 scroll-animate-right">

          <p class="text-zinc-400 text-lg leading-relaxed">
            {{ t.contactSubtitle }}
            {{ t.contactDesc }}
          </p>

          <!-- Contact Cards -->
          <div class="flex flex-col gap-4">
            <a
              :href="`mailto:${personal.email}`"
              class="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl px-5 py-4 hover:border-red-900/50 hover:bg-zinc-900 transition-all duration-300 group"
            >
              <div class="w-10 h-10 rounded-xl bg-red-950/30 border border-red-900/30 flex items-center justify-center group-hover:bg-red-900/30 transition-colors">
                <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="text-zinc-500 text-xs">{{ t.emailLabel }}</span>
                <span class="text-white text-sm font-medium">{{ personal.email }}</span>
              </div>
              <span class="mr-auto text-zinc-700 group-hover:text-zinc-400 transition-colors text-lg">
                {{ isRtl ? '←' : '→' }}
              </span>
            </a>

            <a
              :href="`tel:${personal.phone}`"
              class="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl px-5 py-4 hover:border-red-900/50 hover:bg-zinc-900 transition-all duration-300 group"
            >
              <div class="w-10 h-10 rounded-xl bg-red-950/30 border border-red-900/30 flex items-center justify-center group-hover:bg-red-900/30 transition-colors">
                <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6.338c0-1.01.49-1.958 1.316-2.55l1.18-.847a1.5 1.5 0 011.89.195l1.834 1.834a1.5 1.5 0 01.11 2.001L7.2 8.547a13.493 13.493 0 006.257 6.252l1.578-1.38a1.5 1.5 0 012.001.11l1.834 1.835a1.5 1.5 0 01.195 1.889l-.847 1.18a3.001 3.001 0 01-2.55 1.317C8.563 19.5 4.5 15.437 4.5 10.5a8.25 8.25 0 01-2.25-4.162z" />
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="text-zinc-500 text-xs">{{ t.phone }}</span>
                <span class="text-white text-sm font-medium">{{ personal.phone }}</span>
              </div>
              <span class="mr-auto text-zinc-700 group-hover:text-zinc-400 transition-colors text-lg">
                {{ isRtl ? '←' : '→' }}
              </span>
            </a>

            <div class="flex items-center gap-4 bg-zinc-900/60 border border-zinc-800 rounded-2xl px-5 py-4">
              <div class="w-10 h-10 rounded-xl bg-red-950/30 border border-red-900/30 flex items-center justify-center">
                <svg class="w-5 h-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                </svg>
              </div>
              <div class="flex flex-col">
                <span class="text-zinc-500 text-xs">{{ t.location }}</span>
                <span class="text-white text-sm font-medium">{{ personal.location }}</span>
              </div>
            </div>
          </div>

          <!-- Social links -->
          <div class="flex flex-col gap-3">
            <span class="text-zinc-500 text-xs font-medium uppercase tracking-widest">{{ t.contactVia }}</span>
            <div class="flex flex-wrap gap-3">
              <a
                v-for="(url, platform) in personal.social"
                :key="platform"
                :href="url"
                target="_blank"
                class="flex items-center gap-2 bg-zinc-900/60 border border-zinc-800 rounded-xl px-4 py-2.5 text-zinc-400 hover:text-white hover:border-zinc-700 transition-all duration-200 text-sm group"
              >
                <svg v-if="platform === 'github'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/></svg>
                <svg v-else-if="platform === 'telegram'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/></svg>
                <svg v-else-if="platform === 'facebook'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                <svg v-else-if="platform === 'instagram'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
                <svg v-else-if="platform === 'gmail'" class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/></svg>
                <span class="capitalize">{{ platform }}</span>
              </a>
            </div>
          </div>

        </div>

        <!-- ── Right: IDE-style Form ── -->
        <div class="scroll-animate-left" dir="ltr">
          <div
            class="rounded-xl overflow-hidden border border-zinc-800/70"
            style="background:#0e0e10; box-shadow:0 24px 60px -8px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.03)"
          >

            <!-- Tab bar -->
            <div class="flex items-center border-b border-zinc-800/60 px-3" style="background:#141416">
              <div class="flex items-center gap-2 px-3 py-2.5 border-b-2 border-red-500">
                <svg class="w-3 h-3 text-blue-400" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3 3h18v18H3z" opacity=".15"/>
                  <path d="M13.5 3H3v18h18V3H13.5zM12 8.5l-4 4 4 4-1.5 1.5L5 12l5.5-5.5L12 8.5zm5.5 4L12 18l-1.5-1.5 4-4-4-4L12 7l5.5 5.5z"/>
                </svg>
                <span class="text-zinc-300 text-xs font-mono">sendMessage.ts</span>
                <span class="text-zinc-600 text-xs">×</span>
              </div>
              <span class="ms-auto text-zinc-700 text-[11px] font-mono pe-3">TypeScript</span>
            </div>

            <!-- Success -->
            <div v-if="submitted" class="flex flex-col items-center justify-center gap-4 text-center py-16 px-8">
              <div class="w-14 h-14 rounded-full flex items-center justify-center border text-xl" style="background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.2)">✓</div>
              <div>
                <div class="text-white font-bold mb-1">{{ t.sent }}</div>
                <div class="text-zinc-500 text-sm">{{ t.sentDesc }}</div>
              </div>
              <button @click="submitted = false" class="text-red-500 text-xs hover:text-red-400 font-mono transition-colors mt-1">
                // {{ t.sendAnother }}
              </button>
            </div>

            <template v-else>

              <!-- mail.compose header -->
              <div class="flex items-center justify-between px-5 py-3 border-b border-zinc-800/40" style="background:#111113">
                <div class="flex items-center gap-2">
                  <svg class="w-3.5 h-3.5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="1.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                  <span class="text-zinc-300 text-xs font-mono">mail.compose</span>
                </div>
                <div class="flex items-center gap-1.5">
                  <div class="w-1.5 h-1.5 rounded-full bg-green-500" style="box-shadow:0 0 5px #22c55e80" />
                  <span class="text-zinc-600 text-[11px] font-mono">secure channel</span>
                </div>
              </div>

              <!-- To line -->
              <div class="flex items-center justify-between px-5 py-2 border-b border-zinc-800/30" style="background:#0f0f11">
                <div class="flex items-center gap-2 font-mono text-xs">
                  <span class="text-zinc-600">to:</span>
                  <span class="text-red-400">boraqnz@gmail.com</span>
                </div>
                <div class="flex items-center gap-2 font-mono text-xs">
                  <span class="text-zinc-700">response:</span>
                  <span class="text-green-400">within 24h</span>
                </div>
              </div>

              <!-- Fields -->
              <div class="p-5 space-y-4">

                <div class="grid grid-cols-2 gap-4">
                  <div class="flex flex-col gap-1.5">
                    <label class="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">{{ t.name }}</label>
                    <input v-model="form.name" type="text" :placeholder="t.namePlaceholder" class="contact-input" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">{{ t.emailLabel }}</label>
                    <input v-model="form.email" type="email" placeholder="your@email.com" class="contact-input" />
                  </div>
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">{{ t.subject }}</label>
                  <input v-model="form.subject" type="text" :placeholder="t.subjectPlaceholder" class="contact-input" />
                </div>

                <div class="flex flex-col gap-1.5">
                  <label class="text-zinc-600 text-[10px] font-mono tracking-widest uppercase">{{ t.message }}</label>
                  <textarea v-model="form.message" rows="5" :placeholder="t.messagePlaceholder" class="contact-input resize-none" />
                </div>

                <div class="text-zinc-700 text-[11px] font-mono">
                  <span class="text-zinc-800">// </span>Protected by spam filters and rate limits
                </div>
              </div>

              <!-- Send button -->
              <div class="px-5 pb-5">
                <button
                  @click="handleSubmit"
                  :disabled="loading"
                  class="send-btn group flex items-center gap-3 px-6 py-3 rounded-lg font-mono text-sm font-bold uppercase tracking-widest transition-all duration-200 disabled:opacity-50"
                >
                  <svg class="w-4 h-4 transition-transform duration-200 group-hover:translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5.14v14l11-7-11-7z"/>
                  </svg>
                  <span>{{ loading ? t.sending : t.send.replace(' ←','').replace(' →','') }}</span>
                </button>
              </div>

            </template>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import emailjs from '@emailjs/browser'
import { emailjsConfig } from '../../../app/config/emailjs'
import { useLang } from '../../../app/composables/useLang'

const { personal, t, isRtl } = useLang()

const submitted = ref(false)
const loading   = ref(false)
const form      = reactive({ name: '', email: '', subject: '', message: '' })

async function handleSubmit() {
  if (!form.name || !form.email || !form.message) return
  loading.value = true
  try {
    await emailjs.send(
      emailjsConfig.serviceId,
      emailjsConfig.templateId,
      { from_name: form.name, from_email: form.email, subject: form.subject, message: form.message, time: new Date().toLocaleString('ar-IQ') },
      emailjsConfig.publicKey
    )
    submitted.value = true
    Object.assign(form, { name: '', email: '', subject: '', message: '' })
  } catch {
    alert(isRtl.value ? 'حدث خطأ أثناء الإرسال، حاول مرة أخرى.' : 'An error occurred, please try again.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.contact-input {
  width: 100%;
  background: #0a0a0c;
  border: 1px solid rgba(63,63,70,0.5);
  border-radius: 8px;
  padding: 10px 14px;
  color: #e4e4e7;
  font-size: 13px;
  font-family: ui-monospace, 'JetBrains Mono', monospace;
  outline: none;
  transition: border-color 0.15s;
}
.contact-input::placeholder { color: #3f3f46; }
.contact-input:focus { border-color: rgba(239,68,68,0.35); }

.send-btn {
  background: rgba(239,68,68,0.1);
  border: 1px solid rgba(239,68,68,0.3);
  color: #ef4444;
}
.send-btn:hover:not(:disabled) {
  background: rgba(239,68,68,0.18);
  border-color: rgba(239,68,68,0.55);
  box-shadow: 0 0 20px rgba(239,68,68,0.12);
}
</style>