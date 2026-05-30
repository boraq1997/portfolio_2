export const projects = [
  // {
  //   id: 1,
  //   title: 'اسم المشروع',
  //   tagline: 'نص ترويجي مختصر وجذاب للمشروع',
  //   description: 'وصف بسيط للمشروع في جملة أو جملتين.',
  //   details: `شرح مفصل للمشروع، ما المشكلة التي يحلها، 
  //   ما التقنيات المستخدمة، وما التحديات التي واجهتها 
  //   وكيف تم حلها.`,
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
    title: 'نظام ادارة مشتريات',
    tagline: 'منصة متكاملة لإدارة دورة حياة المشتريات المؤسسية، من لحظة رفع الطلب حتى استلام المواد وإدخالها المخزن. بُنيت لتحل مشكلة الفوضى الورقية في مؤسسات تدير عشرات الطلبات عبر أقسام ولجان متعددة.',
    description: 'نظام إدارة مشتريات مؤسسي متكامل يُتتبع طلبات الشراء عبر سلسلة موافقات دقيقة تشمل لجان المشتريات والمخازن والإدارة — من المسودة حتى الاستلام والإدخال المخزني.مبني على Laravel 13 + Vue 3 بصلاحيات دور محكمة وواجهة عربية RTL إنتاجية الجاهزة.',
    details: ` هو نظام إدارة مشتريات مؤسسي يُعالج مشكلة حقيقية: المؤسسات التي تدير طلبات الشراء ورقياً أو عبر جداول بيانات تفقد التتبع، تتأخر الموافقات، وتختلط المسؤوليات بين الأقسام.
      يُتيح النظام لكل موظف رفع طلب شراء يمر بسلسلة موافقات مضبوطة: لجنة المشتريات → لجنة المخازن → الإدارة → المالية → الشراء الفعلي → الإدخال المخزني → استلام المواد. كل مرحلة محكومة بصلاحيات دقيقة (Spatie RBAC) وكل إجراء مسجّل في سجل نشاط قابل للمراجعة.
      التقنيات: Backend بـ Laravel 13 + Sanctum + Services Layer، Frontend بـ Vue 3 + TypeScript + PrimeVue + Pinia، تصميم RTL عربي كامل.
      أبرز التحديات:

      تصميم آلة حالة (state machine) مرنة لمراحل الطلب مع ضمان سلامة الانتقال بين الحالات
      إدارة الصلاحيات على مستوى الموارد والأدوار بدون تكرار في الكود
      بناء واجهة RTL إنتاجية بدون مكتبات تحكم اتجاه، بالاعتماد على PrimeFlex و CSS variables مخصصة
      حل مشاكل eager loading تتسبب في null relationships في الـ API responses عند تعدد مستويات التعشيش`,
    tags: ['Laravel', 'Vue', 'TypeScrypt', 'PrimeVue', 'Procurement', 'ERP', 'RBAC', 'RTL', 'REST API', 'Spatie', 'Pinia', 'Full-Stack', 'PrimeFlex', 'MySql'],
    images: [
      '/images/projects/Purchase_project/7.png',
      '/images/projects/Purchase_project/1.png',
      '/images/projects/Purchase_project/2.png',
      '/images/projects/Purchase_project/3.png',
      '/images/projects/Purchase_project/4.png',
      '/images/projects/Purchase_project/5.png',
      '/images/projects/Purchase_project/6.png',
    ]
  },
  {
    id: 3,
    title: 'نظام ادارة مطاعم',
    tagline: 'نظام إدارة مطاعم متكامل يربط الزبون بالمطبخ لحظةً بلحظة — من مسح QR الطاولة واختيار الطلب، إلى وصول الفاتورة للطابعة الصحيحة تلقائياً.',
    description: 'قبل هذا النظام، كان طاقم الخدمة يعتمد على الورقة والقلم أو أجهزة منفصلة لا تتحدث مع بعضها — أوامر تضيع، طلبات تتأخر، وكابتن الصالة يركض بين الطاولات والمطبخ.',
    details: `RestoFlow نظام إدارة مطاعم real-time مبني بـ Vue 3 + TypeScript على الـ Frontend وASP.NET Core على الـ Backend. الزبون يمسح QR الطاولة ويرى المينيو كاملاً مع الأسعار والوصف ويرسل طلبه مباشرة — بدون تطبيق، بدون تسجيل. الطلب يصل فورياً لكابتن الصالة الذي يراجعه ويؤكده باسمه، ثم يتوزع تلقائياً على الطابعات المختصة (بيتزا، شاورما، مشاوي...) حسب تصنيف كل صنف. لوحة الكابتن تعرض حالة كل طاولة بالوقت الفعلي مع تتبع مدة الانتظار، وإدارة الحجوزات، وصلاحيات متعددة المستويات. التحدي الرئيسي كان تصميم تدفق الطلب عبر أكثر من طرف (زبون → كابتن → مطبخ → طابعة) مع ضمان أن كل تعديل يمر من نقطة تحكم واحدة دون فوضى في الحالة — حُلّ بمتاجر Pinia منظمة لكل domain وAxios interceptors مركزية لإدارة الـ auth.`,
    tags: ['Vue', 'Vite', 'TypeScript', 'PrimeVue', 'PrimeFlex', 'Pinia', 'ASP.NET Core', 'REST API', 'QR Ordering', 'Real-time', 'Management', 'POS', 'Multi-role', 'JWT Auth'],
    images: [
      '/images/projects/restaurant/1.png',
      '/images/projects/restaurant/2.png',
      '/images/projects/restaurant/3.png',
      '/images/projects/restaurant/4.png',
      '/images/projects/restaurant/5.png',
      '/images/projects/restaurant/6.png',
    ]
  },
  {
    id: 4,
    title: 'نظام ادارة معاهد',
    tagline: 'منصة إدارة تعليمية متكاملة تربط المعاهد والأساتذة والطلاب في بيئة واحدة — لإدارة الدورات والمحاضرات والحضور والدرجات بكفاءة عالية.',
    description: 'نظام إدارة تعليمية شامل مبني لحل فوضى إدارة المعاهد الخاصة والمراكز التعليمية. يعاني كثير من هذه المؤسسات من تشتت البيانات بين أوراق وجداول منفصلة، وغياب التواصل المباشر بين الإدارة والأساتذة والطلاب.',
    details: `نظام إدارة تعليمية شامل مبني لحل فوضى إدارة المعاهد الخاصة والمراكز التعليمية. يعاني كثير من هذه المؤسسات من تشتت البيانات بين أوراق وجداول منفصلة، وغياب التواصل المباشر بين الإدارة والأساتذة والطلاب.
              المنصة تُوحّد هذه العمليات في واجهة واحدة: إدارة المعاهد والمراحل والمواد، تعيين الأساتذة والمساعدين لكل دورة، تتبع الحضور والغياب، رصد الدرجات، وإدارة المسابقات وتقييم تسليمات الطلاب — مع لوحة تحكم مالية لمتابعة الحسابات.
              Stack: Laravel (REST API) · Vue 3 + TypeScript (Frontend) · Sanctum للمصادقة · Role-based access (Admin / Teacher / Sub-Teacher / Student) · Push Notifications عبر OneSignal · Activity Logs للتدقيق.
              أبرز التحديات: بناء نظام صلاحيات متعدد الأدوار بشكل مرن دون تعقيد الـ middleware، ومزامنة بيانات الحضور والدرجات في الوقت الفعلي بين واجهة المعلم ولوحة الإدارة — تم حلها عبر reactive watchers وإعادة جلب ذكية للبيانات عند كل تغيير.`,
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
      '/images/projects/almuthaber/9.png'
    ]
  }
]