import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { MotionPlugin } from '@vueuse/motion'
import { createHead } from '@vueuse/head'
import router from './app/router'
import App from './App.vue'
import './style.css'

const app = createApp(App)
const head = createHead()

app.use(createPinia())
app.use(router)
app.use(MotionPlugin)
app.use(head)

app.mount('#app')