<template>
  <div class="min-h-screen text-white">   <!-- أُزيل bg-zinc-950 من هنا -->
    <LoadingScreen />
    <AppNavbar />
    <main class="relative z-[1]">
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <WorkflowTimeline />
      <TerminalSection />
      <ContactSection />
    </main>
    <AppFooter class="relative z-[1]" />
    <ScrollToTop />
  </div>
</template>

<script setup lang="ts">
import { useScrollAnimation } from './app/composables/useScrollAnimation'
import AppNavbar        from './app/components/AppNavbar.vue'
import AppFooter        from './app/components/AppFooter.vue'
import ScrollToTop      from './app/components/ScrollToTop.vue'
import LoadingScreen    from './app/components/LoadingScreen.vue'
import HeroSection      from './modules/home/components/HeroSection.vue'
import AboutSection     from './modules/about/components/AboutSection.vue'
import SkillsSection    from './modules/skills/components/SkillsSection.vue'
import ProjectsSection  from './modules/projects/components/ProjectsSection.vue'
import WorkflowTimeline from './modules/projects/components/WorkflowTimeline.vue'
import TerminalSection  from './modules/home/components/TerminalSection.vue'
import ContactSection   from './modules/contact/components/ContactSection.vue'
import { useSeo }       from './app/composables/useSeo'

useSeo()
useScrollAnimation()
</script>