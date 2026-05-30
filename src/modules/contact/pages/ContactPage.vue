<template>
  <section class="min-h-screen px-6 pt-24 pb-12" dir="rtl">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-4xl font-bold text-white mb-4">تواصل معي</h1>
      <p class="text-zinc-500 mb-12">هل لديك مشروع؟ أو تريد التحدث؟ راسلني.</p>

      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">

        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm">الاسم</label>
          <input
            v-model="form.name"
            type="text"
            placeholder="اسمك الكامل"
            class="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm">البريد الإلكتروني</label>
          <input
            v-model="form.email"
            type="email"
            placeholder="your@email.com"
            class="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600"
          />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-zinc-400 text-sm">الرسالة</label>
          <textarea
            v-model="form.message"
            rows="5"
            placeholder="اكتب رسالتك هنا..."
            class="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-zinc-600 resize-none"
          />
        </div>

        <button
          type="submit"
          class="px-6 py-3 bg-white text-zinc-950 font-semibold rounded-full hover:bg-zinc-200 transition-colors duration-200 w-fit"
        >
          إرسال الرسالة
        </button>

      </form>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const handleSubmit = () => {
  console.log(form)
  // هنا لاحقاً نضيف EmailJS أو API
}
</script>