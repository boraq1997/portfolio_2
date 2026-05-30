export const projects = [
  // {
  //   id: 1,
  //   title: 'Project Name',
  //   tagline: 'Short and catchy promotional text for the project',
  //   description: 'A simple description of the project in one or two sentences.',
  //   details: `A detailed explanation of the project, what problem it solves,
  //   what technologies were used, and what challenges were faced
  //   and how they were resolved.`,
  //   images: [
  //     '/images/projects/project-1/1.jpg',
  //     '/images/projects/project-1/2.jpg',
  //     '/images/projects/project-1/3.jpg',
  //   ],
  //   tags: ['Vue', 'Laravel', 'MySQL'],
  //   github: 'https://github.com/username/project',
  //   demo: 'https://project-demo.com',
  // },
  {
    id: 2,
    title: 'Procurement Management System',
    tagline: 'An integrated platform for managing the full procurement lifecycle — from purchase request submission to warehouse receipt. Built to eliminate paper chaos in organizations managing dozens of requests across multiple departments and committees.',
    description: 'A comprehensive enterprise procurement system that tracks purchase requests through a precise approval chain including procurement committees, warehouses, and management — from draft to receipt and warehouse entry. Built on Laravel 13 + Vue 3 with strict role-based permissions and a production-ready Arabic RTL interface.',
    details: `An enterprise procurement management system addressing a real problem: organizations managing purchase requests on paper or via spreadsheets lose tracking, approvals get delayed, and responsibilities blur between departments.
      The system allows each employee to submit a purchase request that flows through a controlled approval chain: Procurement Committee → Warehouse Committee → Management → Finance → Actual Purchase → Warehouse Entry → Material Receipt. Each stage is governed by precise permissions (Spatie RBAC) and every action is logged in an auditable activity log.
      Tech Stack: Backend with Laravel 13 + Sanctum + Services Layer, Frontend with Vue 3 + TypeScript + PrimeVue + Pinia, full Arabic RTL design.
      Key Challenges:
      - Designing a flexible state machine for request stages while ensuring safe state transitions
      - Managing permissions at resource and role level without code duplication
      - Building a production-ready RTL interface without directional control libraries, relying on PrimeFlex and custom CSS variables
      - Resolving eager loading issues causing null relationships in API responses with deeply nested data`,
    tags: ['Laravel', 'Vue', 'TypeScript', 'PrimeVue', 'Procurement', 'ERP', 'RBAC', 'RTL', 'REST API', 'Spatie', 'Pinia', 'Full-Stack', 'PrimeFlex', 'MySQL'],
    images: [
      '/images/projects/Purchase_project/7.png',
      '/images/projects/Purchase_project/1.png',
      '/images/projects/Purchase_project/2.png',
      '/images/projects/Purchase_project/3.png',
      '/images/projects/Purchase_project/4.png',
      '/images/projects/Purchase_project/5.png',
      '/images/projects/Purchase_project/6.png',
    ],
  },
  {
    id: 3,
    title: 'Restaurant Management System',
    tagline: 'A complete restaurant management system connecting customers to the kitchen in real-time — from scanning the table QR code and placing an order, to automatically routing the bill to the correct printer.',
    description: 'Before this system, service staff relied on paper and pen or separate devices that couldn\'t communicate — orders got lost, requests were delayed, and the floor captain was constantly running between tables and the kitchen.',
    details: `RestoFlow is a real-time restaurant management system built with Vue 3 + TypeScript on the Frontend and ASP.NET Core on the Backend. The customer scans the table QR code and sees the full menu with prices and descriptions, then sends their order directly — no app, no registration. The order instantly reaches the floor captain who reviews and confirms it, then automatically routes to the appropriate printers (pizza, shawarma, grills...) based on each item's category. The captain's dashboard shows the real-time status of every table with wait time tracking, reservation management, and multi-level permissions. The key challenge was designing the order flow across multiple parties (customer → captain → kitchen → printer) while ensuring every change passes through a single control point without state chaos — solved with organized Pinia stores per domain and centralized Axios interceptors for auth management.`,
    tags: ['Vue', 'Vite', 'TypeScript', 'PrimeVue', 'PrimeFlex', 'Pinia', 'ASP.NET Core', 'REST API', 'QR Ordering', 'Real-time', 'Management', 'POS', 'Multi-role', 'JWT Auth'],
    images: [
      '/images/projects/restaurant/1.png',
      '/images/projects/restaurant/2.png',
      '/images/projects/restaurant/3.png',
      '/images/projects/restaurant/4.png',
      '/images/projects/restaurant/5.png',
      '/images/projects/restaurant/6.png',
    ],
  },
  {
    id: 4,
    title: 'Institute Management System',
    tagline: 'A comprehensive educational management platform connecting institutes, teachers, and students in one environment — to efficiently manage courses, lectures, attendance, and grades.',
    description: 'A comprehensive educational management system built to solve the chaos of managing private institutes and educational centers. Many of these institutions suffer from scattered data across separate papers and spreadsheets, and lack of direct communication between administration, teachers, and students.',
    details: `A comprehensive educational management system built to solve the chaos of managing private institutes and educational centers. Many of these institutions suffer from scattered data across separate papers and spreadsheets, and lack of direct communication between administration, teachers, and students.
              The platform unifies these operations in a single interface: managing institutes, levels, and subjects, assigning teachers and assistants to each course, tracking attendance and absences, recording grades, managing competitions and evaluating student submissions — with a financial dashboard for account monitoring.
              Stack: Laravel (REST API) · Vue 3 + TypeScript (Frontend) · Sanctum for authentication · Role-based access (Admin / Teacher / Sub-Teacher / Student) · Push Notifications via OneSignal · Activity Logs for auditing.
              Key Challenges: Building a flexible multi-role permissions system without complicating middleware, and synchronizing attendance and grade data in real-time between the teacher interface and admin dashboard — solved via reactive watchers and smart data re-fetching on every change.`,
    tags: ['Laravel', 'Vue', 'TypeScript', 'Education', 'Management', 'Multi-role', 'REST API', 'EduTech', 'SPA', 'Full Stack', 'Tailwind'],
    images: [
      '/images/projects/almuthaber/1.png',
      '/images/projects/almuthaber/2.png',
      '/images/projects/almuthaber/3.png',
      '/images/projects/almuthaber/4.png',
      '/images/projects/almuthaber/5.png',
      '/images/projects/almuthaber/6.png',
      '/images/projects/almuthaber/7.png',
      '/images/projects/almuthaber/8.png',
      '/images/projects/almuthaber/9.png',
    ],
  },
]