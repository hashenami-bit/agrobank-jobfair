export const translations = {
  uz: {
    languageToggle: { aria: 'Tilni tanlash' },

    slides: [
      { label: 'Loyihalar', heading: 'Agrobank loyihalari haqida' },
      { label: 'Kareyera', heading: 'Ochiq vakansiyalar' },
      { label: 'Biz haqimizda', heading: 'Biz nimalar taklif etamiz' },
    ],

    common: {
      batafsil: 'Batafsil',
      faqHeading: "Tez-tez so'raladigan savollar",
      faqKicker: 'Support',
    },

    navbar: { resetAria: 'Bosh sahifaga qaytish' },

    recruiterModal: {
      closeAria: 'Yopish',
      sectionKicker: 'Yollanmoqda',
      sectionHeading: 'Ochiq vakansiyalar',
    },

    offerings: {
      kicker: 'Imkoniyatlar',
      heading: 'Biz nimalar taklif etamiz',
      branchHeading: 'Imtiyozlar paketi',
      faqLabel: 'Imtiyozlar',
      items: [
        {
          badge: 'Salomatlik',
          title: "Sog'liqni saqlash",
          description: "Yillik tibbiy ko'rik va bank ichidagi tibbiy markaz orqali to'liq salomatlik qo'llab-quvvatlovi.",
          features: ["Yiliga 1 marta bepul tibbiy ko'rik", "Bank ichidagi tibbiy markaz (istalgan vaqtda, bepul)", 'Sport zali (gym)', 'Mental health support'],
        },
        {
          badge: "Ta'lim",
          title: "Ta'lim va rivojlanish",
          description: "Ko'nikma rivojlantirish va eng so'nggi texnologiyalar bilan ishlash imkoniyati.",
          features: ['Online kurslar', 'Xalqaro sertifikatlar', 'GPU klasterlari (AI/ML)', 'Mentorlik dasturi'],
        },
        {
          badge: 'Karyera',
          title: "Karyera o'sishi",
          description: "Aniq karyera yo'lakchasi va lavozimda o'sish imkoniyatlari.",
          features: ['Performance review', 'Promotion path', 'Cross-team rotation', 'Top Talent dasturi'],
        },
        {
          badge: 'Bonuslar',
          title: 'Bonuslar va imtiyozlar',
          description: 'Yillik bonuslar va xodimlar uchun maxsus imtiyozlar paketi.',
          features: ['Yillik bonus + 13-maosh', 'Bepul avtoturargoh', 'Zamonaviy ofis', "Eng so'nggi texnologiyalar"],
        },
      ],
      faqs: [
        {
          question: "Bank qanday tibbiy yordam taqdim etadi?",
          answer: "Bank xodimlari uchun yiliga 1 marta bepul tibbiy ko'rik tashkil etiladi. Bundan tashqari, bank ichida tibbiy markaz faoliyat yuritadi — unga ish vaqtida istalgan paytda bepul murojaat qilishingiz mumkin.",
        },
        {
          question: "Ta'lim uchun moliyaviy yordam bormi?",
          answer: "Ha. Online kurslar (Coursera, Udemy, Pluralsight), xalqaro sertifikatlar (AWS, Google Cloud, PMP) va konferensiyalar uchun yillik o'qish budjeti ajratiladi. Til kurslari ham qo'llab-quvvatlanadi.",
        },
        {
          question: "Karyera o'sishi qanday tartibda kuzatiladi?",
          answer: "Har 6 oyda performance review o'tkaziladi. Aniq KPI lar va ko'nikmalar matritsasi asosida lavozim ko'tarilishi va maosh oshirilishi belgilanadi. Eng faol xodimlar uchun yillik 'Top Talent' dasturi mavjud.",
        },
        {
          question: 'Yillik bonus tizimi qanday ishlaydi?',
          answer: "Yillik bonus xodimning shaxsiy natijalari (50%), jamoa natijalari (30%) va kompaniya umumiy natijalari (20%) asosida hisoblanadi. Eng yaxshi natijalar uchun 13-maosh va sayohat bonuslari ham beriladi.",
        },
      ],
    },

    vacancies: {
      kicker: 'Karyera',
      heading: 'Ochiq vakansiyalar',
      branchHeading: 'IT rekruyterlar',
      faqLabel: 'Karyera',
      bizCard: {
        badge: 'Biz haqimizda',
        title: 'Biz haqimizda',
        description: "Agrobank haqida to'liq ma'lumot va ish beruvchi profili HeadHunter platformasida.",
        cta: 'HH profil',
      },
      roles: {
        seniorRecruiter: 'Senior IT Recruiter',
        recruiter: 'IT Recruiter',
      },
      faqs: [
        {
          question: 'Suhbatdan ish boshlashgacha qancha vaqt ketadi?',
          answer: "O'rtacha 25 ish kuni. Jarayon HR suhbati bilan boshlanadi, keyin texnik intervyu, test topshiriq va yakuniy suhbat bo'lib, taklif xati 3-5 kun ichida yuboriladi.",
        },
        {
          question: 'Suhbat jarayoni qanday bosqichlardan iborat?',
          answer: '1) HR bilan dastlabki tanishuv suhbati (30 daqiqa) → 2) Jamoa lideri bilan texnik suhbat (60-90 daqiqa) → 3) IT direktori bilan yakuniy suhbat → 4) Taklif xati va shartnomani rasmiylashtirish.',
        },
        {
          question: 'Test topshiriqlar bormi va qancha vaqt oladi?',
          answer: "Ha, ammo amaliy test topshiriq faqat ayrim IT lavozimlar uchun talab qilinadi. Bunday hollarda pozitsiyaga qarab 4-16 soat o'rtasida vaqt oladi.",
        },
        {
          question: 'Onboarding qancha davom etadi?',
          answer: "Yangi xodimlar uchun 2 hafta davom etadigan onboarding dasturi mavjud. Bu davrda kompaniya bilan tanishuv, texnik stack va loyiha asoslari bo'yicha o'qitish va mentor bilan ishlash o'tkaziladi.",
        },
      ],
    },

    projects: {
      kicker: 'Loyihalar',
      heading: 'Agrobank loyihalari',
      branchHeading: 'Mavjud loyihalar',
      videoLabel: 'Video',
      moreText: ' va boshqa loyihalar ishlab chiqilmoqda',
      faqLabel: 'Loyihalar',
      items: [
        {
          badge: 'AI · IoT',
          title: 'Chorvachilik AI',
          description: "Chorva mollarining sog'lig'i, faolligi va xulq-atvorini real vaqtda kuzatish.",
          features: ['Smart kameralar', 'Biosensorlar', 'Computer Vision', 'Real-time alertlar'],
        },
        {
          badge: 'Geo · AI',
          title: 'AgronomAI × Uzcosmos',
          description: "Sun'iy yo'ldosh va dronlar yordamida yerlarni va ekinlarni avtomatik tahlil.",
          features: ["Sun'iy yo'ldosh", 'Dron monitoring', 'Crop analysis', 'Field mapping'],
        },
        {
          badge: 'AI · Voice',
          title: 'Voice AI agentlar',
          description: 'TTS va STT texnologiyalariga asoslangan ovozli AI mijoz xizmati 24/7.',
          features: ['TTS engine', 'STT engine', 'NLU pipeline', "O'zbekcha qo'llab-quvvatlash"],
        },
        {
          badge: 'Fintech · ML',
          title: 'Credit Scoring',
          description: "Mashinaviy o'rganish modellari yordamida qarzdorlik xavfini avtomatik baholash.",
          features: ['ML modellari', 'Risk analytics', 'Real-time qaror', 'Behavioural scoring'],
        },
      ],
      faqs: [
        {
          question: 'Agrobank loyihalarida qanday ishtirok etish mumkin?',
          answer: "Hamkor sifatida murojaat qilish uchun rasmiy savol-javob kanali orqali yozing yoki bizning IT bo'limimizga to'g'ridan-to'g'ri murojaat qiling. Texnik talablar va shartnoma jarayoni bo'yicha mas'ul mutaxassis siz bilan bog'lanadi.",
        },
        {
          question: 'Loyiha qancha vaqt davom etadi?',
          answer: "Loyihaning hajmi va murakkabligiga qarab o'rtacha 3 oydan 12 oygacha. Pilot bosqichlar odatda 6-8 hafta, to'liq integratsiya esa 6-9 oy davom etadi.",
        },
        {
          question: 'Hamkorlik shartlari qanday?',
          answer: "Standart B2B shartnoma asosida ishlaymiz. Yetkazib berish bosqichlari, intellektual mulk huquqlari va to'lov shartlari har bir loyiha uchun individual ravishda kelishiladi.",
        },
        {
          question: 'Loyihalar uchun moliyaviy yordam yoki grant bormi?',
          answer: "Ha, strategik ahamiyatga ega bo'lgan tasdiqlangan loyihalar uchun maxsus moliyalashtirish dasturlari mavjud. Bank innovatsion fintech yechimlariga 50,000 USD dan boshlab grantlar ajratadi.",
        },
      ],
    },
  },

  ru: {
    languageToggle: { aria: 'Выбор языка' },

    slides: [
      { label: 'Проекты', heading: 'О проектах Agrobank' },
      { label: 'Карьера', heading: 'Открытые вакансии' },
      { label: 'О нас', heading: 'Что мы предлагаем' },
    ],

    common: {
      batafsil: 'Подробнее',
      faqHeading: 'Часто задаваемые вопросы',
      faqKicker: 'Поддержка',
    },

    navbar: { resetAria: 'На главную' },

    recruiterModal: {
      closeAria: 'Закрыть',
      sectionKicker: 'Идёт набор',
      sectionHeading: 'Открытые вакансии',
    },

    offerings: {
      kicker: 'Возможности',
      heading: 'Что мы предлагаем',
      branchHeading: 'Пакет льгот',
      faqLabel: 'Льготы',
      items: [
        {
          badge: 'Здоровье',
          title: 'Здоровье',
          description: 'Ежегодный медосмотр и поддержка здоровья через медцентр внутри банка.',
          features: ['Бесплатный медосмотр раз в год', 'Медцентр в банке (в любое время, бесплатно)', 'Спортзал (gym)', 'Mental health support'],
        },
        {
          badge: 'Образование',
          title: 'Образование и развитие',
          description: 'Развитие навыков и работа с самыми современными технологиями.',
          features: ['Онлайн-курсы', 'Международные сертификаты', 'GPU-кластеры (AI/ML)', 'Программа менторства'],
        },
        {
          badge: 'Карьера',
          title: 'Карьерный рост',
          description: 'Чёткая карьерная траектория и возможности роста в должности.',
          features: ['Performance review', 'Promotion path', 'Cross-team rotation', 'Программа Top Talent'],
        },
        {
          badge: 'Бонусы',
          title: 'Бонусы и льготы',
          description: 'Ежегодные бонусы и специальный пакет льгот для сотрудников.',
          features: ['Годовой бонус + 13-я зарплата', 'Бесплатная парковка', 'Современный офис', 'Современные технологии'],
        },
      ],
      faqs: [
        {
          question: 'Какую медицинскую помощь предоставляет банк?',
          answer: 'Для сотрудников банка раз в год организуется бесплатный медосмотр. Кроме того, внутри банка работает медцентр — обратиться в него можно бесплатно в любое время в течение рабочего дня.',
        },
        {
          question: 'Есть ли финансовая поддержка обучения?',
          answer: 'Да. Выделяется годовой бюджет на онлайн-курсы (Coursera, Udemy, Pluralsight), международные сертификаты (AWS, Google Cloud, PMP) и конференции. Также поддерживаются языковые курсы.',
        },
        {
          question: 'Как отслеживается карьерный рост?',
          answer: "Каждые 6 месяцев проводится performance review. Повышение в должности и зарплате определяется на основе чётких KPI и матрицы навыков. Для самых активных сотрудников доступна ежегодная программа 'Top Talent'.",
        },
        {
          question: 'Как работает система годовых бонусов?',
          answer: 'Годовой бонус рассчитывается на основе личных результатов сотрудника (50%), результатов команды (30%) и общих результатов компании (20%). За лучшие результаты также выплачивается 13-я зарплата и тревел-бонусы.',
        },
      ],
    },

    vacancies: {
      kicker: 'Карьера',
      heading: 'Открытые вакансии',
      branchHeading: 'IT-рекрутеры',
      faqLabel: 'Карьера',
      bizCard: {
        badge: 'О нас',
        title: 'О нас',
        description: 'Полная информация об Agrobank и профиль работодателя на платформе HeadHunter.',
        cta: 'HH профиль',
      },
      roles: {
        seniorRecruiter: 'Старший IT-рекрутер',
        recruiter: 'IT-рекрутер',
      },
      faqs: [
        {
          question: 'Сколько времени занимает процесс от собеседования до выхода на работу?',
          answer: 'В среднем 25 рабочих дней. Процесс начинается с HR-интервью, затем техническое собеседование, тестовое задание и финальное интервью, оффер отправляется в течение 3-5 дней.',
        },
        {
          question: 'Из каких этапов состоит процесс собеседования?',
          answer: '1) Первичное знакомство с HR (30 минут) → 2) Техническое интервью с тимлидом (60-90 минут) → 3) Финальное интервью с IT-директором → 4) Оффер и оформление контракта.',
        },
        {
          question: 'Есть ли тестовые задания и сколько они занимают?',
          answer: 'Да, но практическое тестовое задание требуется только для отдельных IT-позиций. В таких случаях в зависимости от позиции занимает от 4 до 16 часов.',
        },
        {
          question: 'Сколько длится онбординг?',
          answer: 'Для новых сотрудников предусмотрена двухнедельная программа онбординга. В этот период проводится знакомство с компанией, обучение техническому стеку и основам проекта, а также работа с ментором.',
        },
      ],
    },

    projects: {
      kicker: 'Проекты',
      heading: 'Проекты Agrobank',
      branchHeading: 'Текущие проекты',
      videoLabel: 'Видео',
      moreText: ' и другие проекты находятся в разработке',
      faqLabel: 'Проекты',
      items: [
        {
          badge: 'AI · IoT',
          title: 'AI животноводства',
          description: 'Мониторинг здоровья, активности и поведения скота в реальном времени.',
          features: ['Умные камеры', 'Биосенсоры', 'Computer Vision', 'Real-time оповещения'],
        },
        {
          badge: 'Geo · AI',
          title: 'AgronomAI × Uzcosmos',
          description: 'Автоматический анализ земель и посевов с помощью спутников и дронов.',
          features: ['Спутники', 'Дрон-мониторинг', 'Crop analysis', 'Field mapping'],
        },
        {
          badge: 'AI · Voice',
          title: 'Voice AI-агенты',
          description: 'Голосовое AI-обслуживание клиентов 24/7 на базе TTS и STT-технологий.',
          features: ['TTS engine', 'STT engine', 'NLU pipeline', 'Поддержка узбекского'],
        },
        {
          badge: 'Fintech · ML',
          title: 'Credit Scoring',
          description: 'Автоматическая оценка кредитного риска с помощью моделей машинного обучения.',
          features: ['ML-модели', 'Risk analytics', 'Real-time решения', 'Behavioural scoring'],
        },
      ],
      faqs: [
        {
          question: 'Как можно участвовать в проектах Agrobank?',
          answer: 'Для участия в качестве партнёра напишите через официальный канал обратной связи или обратитесь напрямую в наш IT-отдел. С вами свяжется специалист, отвечающий за технические требования и контрактный процесс.',
        },
        {
          question: 'Сколько длится проект?',
          answer: 'В зависимости от объёма и сложности — в среднем от 3 до 12 месяцев. Пилотные этапы обычно занимают 6-8 недель, полная интеграция — 6-9 месяцев.',
        },
        {
          question: 'Какие условия сотрудничества?',
          answer: 'Работаем по стандартному B2B-контракту. Этапы поставки, права на интеллектуальную собственность и условия оплаты согласовываются индивидуально для каждого проекта.',
        },
        {
          question: 'Есть ли финансирование или гранты для проектов?',
          answer: 'Да, для одобренных проектов стратегического значения предусмотрены специальные программы финансирования. Банк выделяет гранты на инновационные fintech-решения от 50 000 USD.',
        },
      ],
    },
  },
};

export const SUPPORTED_LANGS = ['uz', 'ru'];
export const DEFAULT_LANG = 'uz';
