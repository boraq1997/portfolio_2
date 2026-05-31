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

    workflowLabel:  langStore.currentLang === 'ar' ? 'منهجية العمل'                                  : 'My Process',
    workflowTitle:  langStore.currentLang === 'ar' ? 'كيف أبني المشاريع'                              : 'How I Build Projects',
    workflowDesc:   langStore.currentLang === 'ar' ? 'من أول لقاء مع الزبون حتى لحظة التسليم النهائي' : 'From the first client meeting to final delivery',
    workflowDone:   langStore.currentLang === 'ar' ? 'تسليم المشروع بنجاح!'                           : 'Project delivered successfully!',
    step:           langStore.currentLang === 'ar' ? 'خطوة'                                           : 'Step',
 
    // Step 1
    wf1Title: langStore.currentLang === 'ar' ? 'استقبال المتطلبات'       : 'Requirements Gathering',
    wf1Desc:  langStore.currentLang === 'ar'
      ? 'لقاء مع الزبون لفهم الفكرة، تحديد المشكلة، النطاق الكامل للمشروع، والجدول الزمني المتوقع. وثّق كل شيء.'
      : 'Meeting with the client to understand the idea, define the problem, full project scope, and expected timeline. Document everything.',
    wf1Tools: langStore.currentLang === 'ar'
      ? ['اجتماع أولي', 'وثيقة المتطلبات', 'تحديد النطاق', 'جدول زمني']
      : ['Initial Meeting', 'Requirements Doc', 'Scope Definition', 'Timeline'],
 
    // Step 2
    wf2Title: langStore.currentLang === 'ar' ? 'التخطيط والتصميم'       : 'Planning & Design',
    wf2Desc:  langStore.currentLang === 'ar'
      ? 'رسم Wireframes للواجهات، تحديد التقنيات المناسبة، تصميم هيكل المشروع، وتقسيم المهام إلى مراحل.'
      : 'Drawing wireframes, choosing the right tech stack, designing project architecture, and breaking tasks into milestones.',
    wf2Tools: langStore.currentLang === 'ar'
      ? ['Wireframes', 'UI/UX Design', 'اختيار التقنيات', 'تقسيم المهام']
      : ['Wireframes', 'UI/UX Design', 'Tech Stack', 'Task Breakdown'],
 
    // Step 3
    wf3Title: langStore.currentLang === 'ar' ? 'تصميم قاعدة البيانات'   : 'Database Design',
    wf3Desc:  langStore.currentLang === 'ar'
      ? 'رسم ERD وتحديد العلاقات بين الجداول، تصميم schema محكم يدعم التوسع المستقبلي وسلامة البيانات.'
      : 'Drawing ERD and defining table relationships, designing a solid schema that supports future scaling and data integrity.',
    wf3Tools: langStore.currentLang === 'ar'
      ? ['ERD', 'MySQL / PostgreSQL', 'Schema Design', 'العلاقات']
      : ['ERD', 'MySQL / PostgreSQL', 'Schema Design', 'Relations'],
 
    // Step 4
    wf4Title: langStore.currentLang === 'ar' ? 'تطوير الباكند'           : 'Backend Development',
    wf4Desc:  langStore.currentLang === 'ar'
      ? 'بناء RESTful APIs، طبقة الـ Services، نظام الصلاحيات RBAC، والمنطق الأساسي للمشروع بشكل نظيف وقابل للاختبار.'
      : 'Building RESTful APIs, Services layer, RBAC permissions, and the core business logic — clean and testable.',
    wf4Tools: langStore.currentLang === 'ar'
      ? ['Laravel', 'Sanctum', 'Spatie RBAC', 'REST API', 'Services Layer']
      : ['Laravel', 'Sanctum', 'Spatie RBAC', 'REST API', 'Services Layer'],
 
    // Step 5
    wf5Title: langStore.currentLang === 'ar' ? 'تطوير الواجهة'           : 'Frontend Development',
    wf5Desc:  langStore.currentLang === 'ar'
      ? 'بناء واجهة المستخدم التفاعلية، التكامل مع الـ API، إدارة الحالة، ودعم RTL للغة العربية.'
      : 'Building the interactive UI, integrating with the API, state management, and RTL support for Arabic.',
    wf5Tools: langStore.currentLang === 'ar'
      ? ['Vue 3', 'TypeScript', 'Pinia', 'PrimeVue', 'RTL']
      : ['Vue 3', 'TypeScript', 'Pinia', 'PrimeVue', 'RTL'],
 
    // Step 6
    wf6Title: langStore.currentLang === 'ar' ? 'الاختبار والمراجعة'      : 'Testing & Review',
    wf6Desc:  langStore.currentLang === 'ar'
      ? 'اختبار شامل للـ APIs والواجهة، مراجعة الزبون على بيئة تجريبية، إصلاح الأخطاء، وضمان الجودة.'
      : 'Full API and UI testing, client review on a staging environment, bug fixing, and QA sign-off.',
    wf6Tools: langStore.currentLang === 'ar'
      ? ['Postman', 'Bug Fixing', 'Staging', 'مراجعة الزبون']
      : ['Postman', 'Bug Fixing', 'Staging', 'Client Review'],
 
    // Step 7
    wf7Title: langStore.currentLang === 'ar' ? 'النشر والتسليم'          : 'Deployment & Delivery',
    wf7Desc:  langStore.currentLang === 'ar'
      ? 'نشر المشروع على السيرفر، توثيق الكود، تسليم الصلاحيات للزبون، وتدريبه على الاستخدام.'
      : 'Deploying to production server, code documentation, handover to client, and usage training.',
    wf7Tools: langStore.currentLang === 'ar'
      ? ['Linux Server', 'توثيق', 'تدريب الزبون', 'تسليم نهائي']
      : ['Linux Server', 'Documentation', 'Client Training', 'Final Handover'],

    // Footer
    quickLinks: langStore.currentLang === 'ar' ? 'روابط سريعة' : 'Quick Links',
    rights: langStore.currentLang === 'ar' ? 'جميع الحقوق محفوظة.' : 'All rights reserved.',
    madeWith: langStore.currentLang === 'ar' ? 'صُنع بـ ❤️ باستخدام Vue.js & Tailwind CSS' : 'Made with ❤️ using Vue.js & Tailwind CSS',
    connectVia: langStore.currentLang === 'ar' ? 'تواصل عبر' : 'Connect via',
  }))

  return { personal, skills, projects, isRtl, currentLang, t }
}