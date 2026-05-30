import { computed } from 'vue'
import { useLangStore } from '../stores/lang'

import { personal as personalAr } from '../../data/ar/personal'
import { personal as personalEn } from '../../data/en/personal'

import { skills as skillsAr } from '../../data/ar/skills'
import { skills as skillsEn } from '../../data/en/skills'

import { projects as projectsAr } from '../../data/ar/projects'
import { projects as projectsEn } from '../../data/en/projects'

export function useLang() {
  const langStore = useLangStore()

  const personal = computed(() =>
    langStore.currentLang === 'ar' ? personalAr : personalEn
  )

  const skills = computed(() =>
    langStore.currentLang === 'ar' ? skillsAr : skillsEn
  )

  const projects = computed(() =>
    langStore.currentLang === 'ar' ? projectsAr : projectsEn
  )

  const isRtl = computed(() => langStore.isRtl)
  const currentLang = computed(() => langStore.currentLang)

  const t = computed(() => ({
    // Navbar
    home: langStore.currentLang === 'ar' ? 'الرئيسية' : 'Home',
    about: langStore.currentLang === 'ar' ? 'عني' : 'About',
    skills: langStore.currentLang === 'ar' ? 'المهارات' : 'Skills',
    projects: langStore.currentLang === 'ar' ? 'المشاريع' : 'Projects',
    contact: langStore.currentLang === 'ar' ? 'تواصل' : 'Contact',
    visitor: langStore.currentLang === 'ar' ? 'زائر' : 'Visitor',

    // Hero
    hello: langStore.currentLang === 'ar' ? 'مرحباً، أنا' : "Hello, I'm",
    availableForWork: langStore.currentLang === 'ar' ? 'متاح للعمل حالياً' : 'Available for work',
    myProjects: langStore.currentLang === 'ar' ? 'مشاريعي' : 'My Projects',
    contactMe: langStore.currentLang === 'ar' ? 'تواصل معي' : 'Contact Me',

    // About
    whoAmI: langStore.currentLang === 'ar' ? 'من أنا' : 'Who I Am',
    aboutMe: langStore.currentLang === 'ar' ? 'عني' : 'About Me',
    available: langStore.currentLang === 'ar' ? 'متاح' : 'Available',
    availableForWork2: langStore.currentLang === 'ar' ? 'متاح للعمل' : 'Available for work',
    contactVia: langStore.currentLang === 'ar' ? 'تواصل معي عبر' : 'Connect via',
    email: langStore.currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email',
    location: langStore.currentLang === 'ar' ? 'الموقع' : 'Location',
    phone: langStore.currentLang === 'ar' ? 'الهاتف' : 'Phone',
    skills2: langStore.currentLang === 'ar' ? 'مهارة' : 'skills',

    // Skills
    whatIKnow: langStore.currentLang === 'ar' ? 'ما أتقنه' : 'What I Know',
    skillsTitle: langStore.currentLang === 'ar' ? 'المهارات' : 'Skills',
    dragToExplore: langStore.currentLang === 'ar' ? 'اسحب للاستكشاف' : 'Drag to explore',

    // Projects
    myWork: langStore.currentLang === 'ar' ? 'أعمالي' : 'My Work',
    projectsTitle: langStore.currentLang === 'ar' ? 'المشاريع' : 'Projects',
    all: langStore.currentLang === 'ar' ? 'الكل' : 'All',
    viewDetails: langStore.currentLang === 'ar' ? 'عرض التفاصيل' : 'View Details',
    projectDetails: langStore.currentLang === 'ar' ? 'تفاصيل المشروع' : 'Project Details',
    technologies: langStore.currentLang === 'ar' ? 'التقنيات' : 'Technologies',
    images: langStore.currentLang === 'ar' ? 'الصور' : 'Images',

    // Contact
    contactTitle: langStore.currentLang === 'ar' ? 'تواصل معي' : 'Contact Me',
    contactSubtitle: langStore.currentLang === 'ar' ? 'هل لديك مشروع في ذهنك؟ أو تريد فقط التحدث؟' : 'Have a project in mind? Or just want to talk?',
    contactDesc: langStore.currentLang === 'ar'
      ? 'أنا دائماً متاح للتحدث عن فرص جديدة ومشاريع مثيرة.'
      : "I'm always available to discuss new opportunities and exciting projects.",
    name: langStore.currentLang === 'ar' ? 'الاسم' : 'Name',
    namePlaceholder: langStore.currentLang === 'ar' ? 'اسمك الكامل' : 'Your full name',
    emailLabel: langStore.currentLang === 'ar' ? 'البريد الإلكتروني' : 'Email',
    subject: langStore.currentLang === 'ar' ? 'الموضوع' : 'Subject',
    subjectPlaceholder: langStore.currentLang === 'ar' ? 'موضوع رسالتك' : 'Message subject',
    message: langStore.currentLang === 'ar' ? 'الرسالة' : 'Message',
    messagePlaceholder: langStore.currentLang === 'ar' ? 'اكتب رسالتك هنا...' : 'Write your message here...',
    send: langStore.currentLang === 'ar' ? 'إرسال الرسالة ←' : 'Send Message →',
    sending: langStore.currentLang === 'ar' ? 'جاري الإرسال...' : 'Sending...',
    sent: langStore.currentLang === 'ar' ? 'تم الإرسال!' : 'Sent!',
    sentDesc: langStore.currentLang === 'ar' ? 'سأتواصل معك في أقرب وقت ممكن.' : "I'll get back to you as soon as possible.",
    sendAnother: langStore.currentLang === 'ar' ? 'إرسال رسالة أخرى' : 'Send another message',

    // Footer
    quickLinks: langStore.currentLang === 'ar' ? 'روابط سريعة' : 'Quick Links',
    rights: langStore.currentLang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
    madeWith: langStore.currentLang === 'ar' ? 'صُنع بـ ❤️ باستخدام Vue.js & Tailwind CSS' : 'Made with ❤️ using Vue.js & Tailwind CSS',
    connectVia: langStore.currentLang === 'ar' ? 'تواصل عبر' : 'Connect via',
  }))

  return { personal, skills, projects, isRtl, currentLang, t }
}