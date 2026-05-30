<template>
  <div class="min-h-screen bg-zinc-950 text-white">
    <LoadingScreen />
    <AppNavbar />
    <main>
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </main>
    <AppFooter />
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimation } from './app/composables/useScrollAnimation'
import AppNavbar from './app/components/AppNavbar.vue'
import AppFooter from './app/components/AppFooter.vue'
import ScrollToTop from './app/components/ScrollToTop.vue'
import LoadingScreen from './app/components/LoadingScreen.vue'
import HeroSection from './modules/home/components/HeroSection.vue'
import AboutSection from './modules/about/components/AboutSection.vue'
import SkillsSection from './modules/skills/components/SkillsSection.vue'
import ProjectsSection from './modules/projects/components/ProjectsSection.vue'
import ContactSection from './modules/contact/components/ContactSection.vue'
import { useSeo } from './app/composables/useSeo'

useSeo()
useScrollAnimation()
</script>