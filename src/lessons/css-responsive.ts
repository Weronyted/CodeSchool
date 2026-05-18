import type { Lesson } from '@/types/lesson'

export const cssResponsive: Lesson = {
  slug: 'css-responsive',
  category: 'CSS',
  readTime: 10,
  icon: '📱',

  title_ru: 'Адаптивный дизайн',
  title_en: 'Responsive design',

  description_ru: 'Viewport, медиа-запросы, брейкпоинты, mobile-first — сайт выглядит отлично на любом экране.',
  description_en: 'Viewport, media queries, breakpoints, mobile-first — your site looks great on any screen.',

  sections: [
    { id: 'viewport',      title_ru: 'Viewport meta тег',          title_en: 'Viewport meta tag' },
    { id: 'media-queries', title_ru: 'Медиа-запросы @media',       title_en: 'Media queries @media' },
    { id: 'breakpoints',   title_ru: 'Брейкпоинты',                title_en: 'Breakpoints' },
    { id: 'mobile-first',  title_ru: 'Mobile-first подход',        title_en: 'Mobile-first approach' },
    { id: 'fluid',         title_ru: 'Fluid typography и картинки', title_en: 'Fluid typography and images' },
    { id: 'key-terms',     title_ru: 'Ключевые термины',           title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Адаптивный дизайн: один сайт — все устройства',
      title_en: 'Responsive design: one site — all devices',
      body_ru: 'Сегодня более 60% трафика — с мобильных устройств. Адаптивный (responsive) дизайн означает, что сайт выглядит хорошо на телефоне, планшете и десктопе. Это стандарт современной веб-разработки.',
      body_en: 'Today more than 60% of traffic is from mobile devices. Responsive design means the site looks good on phones, tablets, and desktops. This is the standard in modern web development.',
    },
    {
      id: 's2',
      type: 'concept',
      title_ru: 'Viewport meta тег — первый шаг',
      title_en: 'Viewport meta tag — the first step',
      body_ru: 'Без viewport тега мобильный браузер показывает десктопную версию уменьшенной. Тег говорит браузеру: "ширина страницы = ширина экрана устройства".',
      body_en: 'Without the viewport tag a mobile browser shows the desktop version shrunken. The tag tells the browser: "page width = device screen width".',
      bullets: [
        { text_ru: '<meta name="viewport" content="width=device-width, initial-scale=1">', text_en: '<meta name="viewport" content="width=device-width, initial-scale=1">' },
        { text_ru: 'width=device-width — ширина = ширина экрана', text_en: 'width=device-width — width equals screen width' },
        { text_ru: 'initial-scale=1 — без начального масштабирования', text_en: 'initial-scale=1 — no initial zoom' },
        { text_ru: 'Без этого тега @media запросы не работают правильно!', text_en: 'Without this tag @media queries do not work correctly!' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: '@media — запросы к устройству',
      title_en: '@media — device queries',
      body_ru: '@media позволяет применять CSS только при определённых условиях: ширина экрана, тип устройства, ориентация. Это ключевой инструмент адаптивного дизайна.',
      body_en: '@media lets you apply CSS only under certain conditions: screen width, device type, orientation. This is the key tool of responsive design.',
      bullets: [
        { text_ru: '@media (max-width: 768px) — мобильные устройства', text_en: '@media (max-width: 768px) — mobile devices' },
        { text_ru: '@media (min-width: 768px) — планшеты и больше', text_en: '@media (min-width: 768px) — tablets and larger' },
        { text_ru: '@media (orientation: landscape) — горизонтальная ориентация', text_en: '@media (orientation: landscape) — landscape orientation' },
        { text_ru: 'Можно комбинировать: min-width AND max-width', text_en: 'Can combine: min-width AND max-width' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Добавляем медиа-запросы к раскладке',
      title_en: 'Adding media query breakpoints to a layout',
      body_ru: 'Смотри как одна раскладка адаптируется под разные размеры экрана.',
      body_en: 'Watch how one layout adapts to different screen sizes.',
      animMode: 'preview',
      animSteps: [
        {
          code: `.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}`,
          comment_ru: '1. Десктопная раскладка: sidebar + контент',
          comment_en: '1. Desktop layout: sidebar + content',
          preview: '[Sidebar  |  Content area  ]',
        },
        {
          code: `.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr; /* одна колонка */
  }
}`,
          comment_ru: '2. На планшете (≤768px) — одна колонка',
          comment_en: '2. On tablet (≤768px) — one column',
          preview: '[  Content area  ]\n[    Sidebar     ]',
        },
        {
          code: `.layout {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}

@media (max-width: 768px) {
  .layout { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .layout { gap: 8px; padding: 8px; }
  .card { padding: 12px; font-size: 0.875rem; }
}`,
          comment_ru: '3. На телефоне (≤480px) — уменьшаем отступы и шрифт',
          comment_en: '3. On phone (≤480px) — reduce spacing and font size',
          preview: '[ Content area ]\n[   Sidebar    ]',
        },
        {
          code: `/* Mobile-first: начинаем с мобильного */
.layout {
  display: grid;
  grid-template-columns: 1fr; /* mobile */
  gap: 8px;
}

@media (min-width: 768px) {
  .layout {
    grid-template-columns: 200px 1fr; /* tablet+ */
    gap: 16px;
  }
}

@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 240px 1fr 240px; /* desktop */
    gap: 24px;
  }
}`,
          comment_ru: '4. Mobile-first: базовый стиль для мобильных, min-width для больших',
          comment_en: '4. Mobile-first: base for mobile, min-width for larger screens',
          preview: 'Mobile → Tablet → Desktop',
        },
      ],
    },
    {
      id: 's5',
      type: 'compare',
      title_ru: 'Desktop-first vs Mobile-first',
      title_en: 'Desktop-first vs Mobile-first',
      body_ru: 'Два подхода к написанию медиа-запросов. Индустрия рекомендует mobile-first.',
      body_en: 'Two approaches to writing media queries. The industry recommends mobile-first.',
      compareLeft: {
        label_ru: 'Desktop-first (max-width)',
        label_en: 'Desktop-first (max-width)',
        items_ru: [
          'Пишем стили для большого экрана',
          '@media (max-width: 768px) — переопределяем',
          'Переопределений много — код раздувается',
          'Исторически популярен',
          'Сложнее поддерживать на мобильном',
        ],
        items_en: [
          'Write styles for large screens first',
          '@media (max-width: 768px) — override',
          'Many overrides — code bloat',
          'Historically popular',
          'Harder to maintain on mobile',
        ],
        color: 'amber',
      },
      compareRight: {
        label_ru: 'Mobile-first (min-width)',
        label_en: 'Mobile-first (min-width)',
        items_ru: [
          'Пишем стили для мобильного',
          '@media (min-width: 768px) — добавляем',
          'Прогрессивное улучшение',
          'Меньше переопределений',
          'Google рекомендует для SEO',
        ],
        items_en: [
          'Write styles for mobile first',
          '@media (min-width: 768px) — enhance',
          'Progressive enhancement',
          'Fewer overrides',
          'Google recommends for SEO',
        ],
        color: 'green',
      },
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Брейкпоинты — стандартные точки разрыва',
      title_en: 'Breakpoints — standard screen size thresholds',
      body_ru: 'Брейкпоинты — это ширина экрана, при которой изменяется раскладка. Стандартные значения из популярных фреймворков.',
      body_en: 'Breakpoints are screen widths at which the layout changes. Standard values from popular frameworks.',
      code: `/* Стандартные брейкпоинты */
/* Mobile:  < 640px (по умолчанию, mobile-first) */
/* SM:      640px  — большой телефон            */
/* MD:      768px  — планшет                    */
/* LG:      1024px — небольшой десктоп          */
/* XL:      1280px — десктоп                    */

/* Пример использования (mobile-first) */
.container {
  padding: 16px;           /* mobile */
}

@media (min-width: 768px) {
  .container {
    padding: 24px;         /* tablet */
    max-width: 768px;
    margin: 0 auto;
  }
}

@media (min-width: 1024px) {
  .container {
    padding: 32px;         /* desktop */
    max-width: 1200px;
  }
}`,
      codeLang: 'css',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Fluid typography и адаптивные изображения',
      title_en: 'Fluid typography and responsive images',
      body_ru: 'Текст и изображения тоже должны адаптироваться. max-width: 100% для изображений. clamp() для гибкого размера шрифта.',
      body_en: 'Text and images should also adapt. max-width: 100% for images. clamp() for flexible font size.',
      bullets: [
        { text_ru: 'img { max-width: 100%; height: auto; } — картинка не вылезет за контейнер', text_en: 'img { max-width: 100%; height: auto; } — image stays inside container' },
        { text_ru: 'font-size: clamp(1rem, 2.5vw, 2rem) — шрифт между 1rem и 2rem', text_en: 'font-size: clamp(1rem, 2.5vw, 2rem) — font between 1rem and 2rem' },
        { text_ru: 'vw / vh — единицы относительно окна браузера', text_en: 'vw / vh — units relative to the browser window' },
        { text_ru: '% ширина — элемент занимает процент от родителя', text_en: '% width — element takes percentage of parent' },
      ],
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Google учитывает мобильную версию сайта в первую очередь при индексировании (Mobile-First Indexing с 2019). Если мобильная версия плохая — сайт упадёт в поиске. DevTools браузера позволяет эмулировать любое устройство (F12 → иконка телефона).',
      body_en: 'Google prioritises the mobile version of a site when indexing (Mobile-First Indexing since 2019). If the mobile version is poor — the site drops in search. Browser DevTools let you emulate any device (F12 → phone icon).',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Сделай свой сайт адаптивным!',
      title_en: 'Make your site responsive!',
      body_ru: 'Возьми любую раскладку и добавь медиа-запросы: на мобильных — одна колонка, на планшете — две, на десктопе — три. Используй mobile-first подход с min-width.',
      body_en: 'Take any layout and add media queries: mobile — one column, tablet — two, desktop — three. Use the mobile-first approach with min-width.',
    },
  ],

  content: {
    intro_ru: `Адаптивный дизайн (Responsive Web Design) — подход, при котором один и тот же
сайт корректно отображается на экранах любого размера. Ключевые инструменты:
viewport meta тег, медиа-запросы @media и mobile-first подход. Сегодня это не
опция, а обязательное требование к любому сайту.`,
    intro_en: `Responsive Web Design is an approach where the same site displays correctly on
screens of any size. Key tools: the viewport meta tag, @media queries, and the
mobile-first approach. Today this is not optional — it is a requirement for any site.`,

    blocks: [
      {
        sectionId: 'viewport',
        heading_ru: 'Viewport meta тег',
        heading_en: 'Viewport meta tag',
        text_ru: `Viewport — видимая область браузера.
Без meta viewport мобильный браузер симулирует экран ~980px и масштабирует страницу.
С тегом — ширина страницы = ширина устройства.

Всегда добавляй в <head> каждой HTML-страницы.`,
        text_en: `Viewport is the visible area of the browser.
Without the viewport meta tag a mobile browser simulates ~980px and scales the page.
With the tag — page width = device width.

Always add it to <head> of every HTML page.`,
        code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Адаптивный сайт</title>
</head>`,
        codeLang: 'html',
      },
      {
        sectionId: 'media-queries',
        heading_ru: 'Медиа-запросы @media',
        heading_en: 'Media queries @media',
        text_ru: `@media применяет CSS-правила только когда условие истинно.
Синтаксис: @media (условие) { стили }
Условия: min-width, max-width, orientation, print и др.
Можно объединять через and: @media (min-width: 768px) and (max-width: 1024px)`,
        text_en: `@media applies CSS rules only when the condition is true.
Syntax: @media (condition) { styles }
Conditions: min-width, max-width, orientation, print, etc.
Can combine with and: @media (min-width: 768px) and (max-width: 1024px)`,
        code: `/* Только на мобильных */
@media (max-width: 640px) {
  .menu { display: none; }
}

/* Планшет и больше */
@media (min-width: 768px) {
  .container { max-width: 768px; }
}

/* Только печать */
@media print {
  nav, footer { display: none; }
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'breakpoints',
        heading_ru: 'Брейкпоинты',
        heading_en: 'Breakpoints',
        text_ru: `Брейкпоинт — ширина экрана, при которой меняется раскладка.
Нет "правильных" брейкпоинтов — они зависят от контента.
Популярные значения: 640px, 768px, 1024px, 1280px.
Tailwind, Bootstrap и другие фреймворки используют похожие значения.`,
        text_en: `A breakpoint is the screen width at which the layout changes.
There are no "correct" breakpoints — they depend on the content.
Popular values: 640px, 768px, 1024px, 1280px.
Tailwind, Bootstrap and other frameworks use similar values.`,
        code: `/* Карточки: 1 → 2 → 3 колонки */
.cards {
  display: grid;
  grid-template-columns: 1fr;         /* mobile */
  gap: 16px;
}

@media (min-width: 640px) {
  .cards { grid-template-columns: repeat(2, 1fr); } /* tablet */
}

@media (min-width: 1024px) {
  .cards { grid-template-columns: repeat(3, 1fr); } /* desktop */
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'mobile-first',
        heading_ru: 'Mobile-first подход',
        heading_en: 'Mobile-first approach',
        text_ru: `Mobile-first: пишем базовые стили для мобильного, а медиа-запросами добавляем для больших экранов.
Преимущества:
• Меньше переопределений — чище код
• Быстрее загрузка на мобильных (меньше CSS)
• Google ценит мобильную версию
• Прогрессивное улучшение: сначала суть, потом украшения`,
        text_en: `Mobile-first: write base styles for mobile, use media queries to add for larger screens.
Advantages:
• Fewer overrides — cleaner code
• Faster loading on mobile (less CSS)
• Google values the mobile version
• Progressive enhancement: core first, then enhancements`,
        code: `/* Mobile-first: min-width */
.nav {
  flex-direction: column; /* mobile: вертикально */
  gap: 8px;
}

@media (min-width: 768px) {
  .nav {
    flex-direction: row;  /* tablet+: горизонтально */
    gap: 24px;
  }
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'fluid',
        heading_ru: 'Fluid typography и картинки',
        heading_en: 'Fluid typography and images',
        text_ru: `Fluid typography — шрифт плавно масштабируется вместе с экраном.
clamp(min, preferred, max) — значение между min и max.
vw (viewport width) — процент от ширины окна.
Адаптивные изображения: max-width:100% + height:auto.`,
        text_en: `Fluid typography — font scales smoothly with the screen.
clamp(min, preferred, max) — value clamped between min and max.
vw (viewport width) — percentage of window width.
Responsive images: max-width:100% + height:auto.`,
        code: `/* Адаптивный шрифт */
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
  /* минимум 1.5rem, максимум 3rem */
}

/* Адаптивные изображения */
img {
  max-width: 100%;
  height: auto;
  display: block;
}

/* Fluid padding */
.section {
  padding: clamp(16px, 4vw, 64px);
}`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: адаптивная страница',
    title_en: 'Try it yourself: responsive page',
    instructions_ru: `Сделай страницу адаптивной:
— Mobile (< 640px): карточки в один столбец
— Tablet (≥ 640px): карточки в два столбца
— Desktop (≥ 1024px): карточки в три столбца
Используй mobile-first (min-width).
Бонус: скрой боковое меню на мобильных`,
    instructions_en: `Make the page responsive:
— Mobile (< 640px): cards in one column
— Tablet (≥ 640px): cards in two columns
— Desktop (≥ 1024px): cards in three columns
Use mobile-first (min-width).
Bonus: hide the side menu on mobile`,
    activeTabs: ['html', 'css'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Адаптивный сайт</title>
</head>
<body>
  <header class="header">
    <div class="logo">MySite</div>
    <nav class="nav">
      <a href="#">Главная</a>
      <a href="#">Статьи</a>
      <a href="#">Контакты</a>
    </nav>
  </header>

  <div class="layout">
    <aside class="sidebar">
      <h3>Категории</h3>
      <ul>
        <li>Дизайн</li>
        <li>Разработка</li>
        <li>Маркетинг</li>
      </ul>
    </aside>

    <main class="content">
      <h2>Последние статьи</h2>
      <div class="card-grid">
        <div class="card"><h4>Статья 1</h4><p>Краткое описание</p></div>
        <div class="card"><h4>Статья 2</h4><p>Краткое описание</p></div>
        <div class="card"><h4>Статья 3</h4><p>Краткое описание</p></div>
        <div class="card"><h4>Статья 4</h4><p>Краткое описание</p></div>
        <div class="card"><h4>Статья 5</h4><p>Краткое описание</p></div>
        <div class="card"><h4>Статья 6</h4><p>Краткое описание</p></div>
      </div>
    </main>
  </div>
</body>
</html>`,
      css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f8fafc; color: #0f172a; }

/* Header — mobile first */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  color: white;
  padding: 12px 16px;
  flex-wrap: wrap;
  gap: 12px;
}

.logo { font-size: 1.25rem; font-weight: bold; color: #60a5fa; }

.nav { display: flex; gap: 16px; }
.nav a { color: #cbd5e1; text-decoration: none; font-size: 0.9rem; }

/* Layout */
.layout {
  display: grid;
  grid-template-columns: 1fr; /* mobile: одна колонка */
  gap: 16px;
  padding: 16px;
  max-width: 1200px;
  margin: 0 auto;
}

/* Sidebar — скрыт на мобильном */
.sidebar {
  display: none;
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.sidebar h3 { margin-bottom: 12px; }
.sidebar ul { list-style: none; }
.sidebar li { padding: 6px 0; color: #475569; }

.content h2 { margin-bottom: 16px; }

/* Card grid — mobile: 1 колонка */
.card-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 12px;
}

.card {
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.card h4 { margin-bottom: 8px; color: #0f172a; }
.card p  { color: #64748b; font-size: 0.875rem; }

/* Tablet: >= 640px */
@media (min-width: 640px) {
  .layout { padding: 24px; }
  .card-grid { grid-template-columns: repeat(2, 1fr); }
}

/* Desktop: >= 1024px */
@media (min-width: 1024px) {
  .layout {
    grid-template-columns: 200px 1fr; /* показать sidebar */
  }
  .sidebar { display: block; }
  .card-grid { grid-template-columns: repeat(3, 1fr); }
}`,
    },
    hints_ru: [
      'Mobile-first: начни без медиа-запросов (для мобильного). Потом добавляй @media (min-width: ...) для планшета и десктопа.',
      'На мобильном sidebar можно скрыть: display:none в базовых стилях, и display:block внутри @media (min-width: 1024px).',
    ],
    hints_en: [
      'Mobile-first: start without media queries (for mobile). Then add @media (min-width: ...) for tablet and desktop.',
      'On mobile hide the sidebar: display:none in base styles, and display:block inside @media (min-width: 1024px).',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Viewport', term_en: 'Viewport',
      definition_ru: 'Видимая область браузера. Meta viewport тег настраивает её под ширину устройства.',
      definition_en: 'The visible browser area. The viewport meta tag configures it to match device width.',
      example_ru: '<meta name="viewport" content="width=device-width, initial-scale=1">',
      example_en: '<meta name="viewport" content="width=device-width, initial-scale=1">',
    },
    {
      term_ru: '@media', term_en: '@media',
      definition_ru: 'CSS-правило для применения стилей при определённых условиях (ширина экрана, ориентация и т.д.).',
      definition_en: 'CSS rule for applying styles under certain conditions (screen width, orientation, etc.).',
      example_ru: '@media (min-width: 768px) { ... }',
      example_en: '@media (min-width: 768px) { ... }',
    },
    {
      term_ru: 'Брейкпоинт', term_en: 'Breakpoint',
      definition_ru: 'Ширина экрана, при которой раскладка меняется. Типичные: 640px, 768px, 1024px.',
      definition_en: 'Screen width at which the layout changes. Typical values: 640px, 768px, 1024px.',
      example_ru: '@media (min-width: 1024px) — десктоп',
      example_en: '@media (min-width: 1024px) — desktop',
    },
    {
      term_ru: 'Mobile-first', term_en: 'Mobile-first',
      definition_ru: 'Подход, при котором базовые стили — для мобильных, а медиа-запросы добавляют стили для больших экранов.',
      definition_en: 'Approach where base styles are for mobile and media queries add styles for larger screens.',
      example_ru: 'Базовый CSS + @media (min-width: ...)',
      example_en: 'Base CSS + @media (min-width: ...)',
    },
    {
      term_ru: 'clamp()', term_en: 'clamp()',
      definition_ru: 'CSS-функция: значение между минимумом и максимумом с плавным масштабированием.',
      definition_en: 'CSS function: value between minimum and maximum with smooth scaling.',
      example_ru: 'font-size: clamp(1rem, 2.5vw, 2rem)',
      example_en: 'font-size: clamp(1rem, 2.5vw, 2rem)',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Термин "Responsive Web Design" ввёл Итан Маркотт в 2010 году. Тогда iPhone появился всего три года назад. Сегодня мобильный трафик превышает десктопный — а значит mobile-first это уже не "лучшая практика", а просто правильный подход.',
      text_en: 'The term "Responsive Web Design" was coined by Ethan Marcotte in 2010. The iPhone had only been around for three years then. Today mobile traffic exceeds desktop — so mobile-first is no longer a "best practice" but simply the right approach.',
    },
    {
      text_ru: 'clamp() позволяет создать "fluid typography" без медиа-запросов. font-size: clamp(1rem, 2.5vw, 2rem) — шрифт автоматически растёт с экраном, но никогда не будет меньше 1rem и больше 2rem. Никаких @media!',
      text_en: 'clamp() lets you create fluid typography without media queries. font-size: clamp(1rem, 2.5vw, 2rem) — font automatically grows with the screen but never falls below 1rem or above 2rem. No @media needed!',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Зачем нужен тег <meta name="viewport">?',
      text_en: 'What is the <meta name="viewport"> tag for?',
      options_ru: [
        'Задаёт цвет фона страницы',
        'Настраивает ширину страницы под ширину экрана устройства',
        'Ускоряет загрузку страницы',
        'Добавляет анимации',
      ],
      options_en: [
        'Sets the page background color',
        'Configures page width to match device screen width',
        'Speeds up page loading',
        'Adds animations',
      ],
      correctIndex: 1,
      explanation_ru: 'Без viewport meta тега мобильный браузер показывает страницу масштабированной как на десктопе (около 980px). С тегом — ширина страницы равна ширине устройства.',
      explanation_en: 'Without the viewport meta tag a mobile browser shows the page scaled as on desktop (around 980px). With the tag — page width equals device width.',
    },
    {
      id: 'q2',
      text_ru: 'Что такое mobile-first подход?',
      text_en: 'What is the mobile-first approach?',
      options_ru: [
        'Сделать отдельный мобильный сайт',
        'Сначала написать стили для мобильного, потом расширять для больших экранов',
        'Использовать только max-width в медиа-запросах',
        'Отключить сайт на десктопах',
      ],
      options_en: [
        'Create a separate mobile site',
        'Write styles for mobile first, then expand for larger screens',
        'Use only max-width in media queries',
        'Disable the site on desktops',
      ],
      correctIndex: 1,
      explanation_ru: 'Mobile-first: базовые стили для мобильных, @media (min-width) добавляет стили для планшетов и десктопов. Меньше переопределений, чище код.',
      explanation_en: 'Mobile-first: base styles for mobile, @media (min-width) adds styles for tablets and desktops. Fewer overrides, cleaner code.',
    },
    {
      id: 'q3',
      text_ru: 'Какой медиа-запрос применит стили для экранов шире 768px?',
      text_en: 'Which media query applies styles for screens wider than 768px?',
      options_ru: [
        '@media (max-width: 768px)',
        '@media (min-width: 768px)',
        '@media (width: 768px)',
        '@media screen and (768px)',
      ],
      options_en: [
        '@media (max-width: 768px)',
        '@media (min-width: 768px)',
        '@media (width: 768px)',
        '@media screen and (768px)',
      ],
      correctIndex: 1,
      explanation_ru: '@media (min-width: 768px) — стили применятся когда ширина экрана 768px и больше.',
      explanation_en: '@media (min-width: 768px) — styles apply when the screen width is 768px or wider.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает img { max-width: 100%; height: auto; }?',
      text_en: 'What does img { max-width: 100%; height: auto; } do?',
      options_ru: [
        'Растягивает картинку на весь экран',
        'Скрывает картинку',
        'Не даёт картинке вылезти за контейнер, сохраняя пропорции',
        'Задаёт картинке высоту 100vh',
      ],
      options_en: [
        'Stretches the image to full screen',
        'Hides the image',
        'Prevents the image from exceeding its container while preserving proportions',
        'Sets image height to 100vh',
      ],
      correctIndex: 2,
      explanation_ru: 'max-width: 100% — картинка не будет шире контейнера. height: auto — высота масштабируется пропорционально. Базовое правило для адаптивных изображений.',
      explanation_en: 'max-width: 100% — image will not be wider than its container. height: auto — height scales proportionally. The basic rule for responsive images.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает clamp(1rem, 2.5vw, 2rem) для font-size?',
      text_en: 'What does clamp(1rem, 2.5vw, 2rem) do for font-size?',
      options_ru: [
        'Устанавливает шрифт 2.5rem',
        'Шрифт масштабируется с экраном, но не меньше 1rem и не больше 2rem',
        'Случайный шрифт между 1rem и 2rem',
        'Отключает масштабирование шрифта',
      ],
      options_en: [
        'Sets font to 2.5rem',
        'Font scales with screen, but no smaller than 1rem and no larger than 2rem',
        'Random font between 1rem and 2rem',
        'Disables font scaling',
      ],
      correctIndex: 1,
      explanation_ru: 'clamp(min, preferred, max): preferred = 2.5vw (зависит от ширины экрана), но зажато между min=1rem и max=2rem. Плавное масштабирование без медиа-запросов.',
      explanation_en: 'clamp(min, preferred, max): preferred = 2.5vw (depends on screen width), but clamped between min=1rem and max=2rem. Smooth scaling without media queries.',
    },
  ],
}
