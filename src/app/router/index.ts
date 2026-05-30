import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('../../modules/home/pages/HomePage.vue'),
    },
    {
      path: '/about',
      component: () => import('../../modules/about/pages/AboutPage.vue'),
    },
    {
      path: '/skills',
      component: () => import('../../modules/skills/pages/SkillsPage.vue'),
    },
    {
      path: '/projects',
      component: () => import('../../modules/projects/pages/ProjectsPage.vue'),
    },
    {
      path: '/contact',
      component: () => import('../../modules/contact/pages/ContactPage.vue'),
    },
  ],
  scrollBehavior() {
    return { top: 0, behavior: 'smooth' }
  },
})

export default router