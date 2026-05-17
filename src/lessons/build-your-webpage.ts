import type { Lesson } from '@/types/lesson'

export const buildYourWebpage: Lesson = {
  slug: 'build-your-webpage',
  category: 'JS',
  readTime: 12,
  icon: '🌐',

  title_ru: 'Создай свою страницу',
  title_en: 'Build Your Web Page',

  description_ru: 'Финальный проект: HTML + CSS + JavaScript вместе создают личную визитную карточку.',
  description_en: 'Final project: HTML + CSS + JavaScript together build a personal business card page.',

  sections: [
    { id: 'project-overview', title_ru: 'Обзор проекта',    title_en: 'Project overview' },
    { id: 'html-structure',   title_ru: 'HTML-структура',   title_en: 'HTML structure' },
    { id: 'css-styling',      title_ru: 'CSS-стили',        title_en: 'CSS styles' },
    { id: 'js-interactivity', title_ru: 'Интерактивность',  title_en: 'JS interactivity' },
    { id: 'final-code',       title_ru: 'Финальный код',    title_en: 'Final code' },
    { id: 'key-terms',        title_ru: 'Ключевые термины', title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Финальный проект: твоя личная страница',
      title_en: 'Final project: your personal page',
      body_ru: 'Ты прошёл весь путь — от первого тега до JavaScript. Пришло время объединить всё в один проект: личную визитную карточку с навигацией, секциями, стилями и переключателем темы.',
      body_en: 'You have covered the whole journey — from the first tag to JavaScript. Time to combine it all into one project: a personal business card with navigation, sections, styles, and a theme toggle.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Три слоя веб-страницы',
      title_en: 'Three layers of a web page',
      body_ru: 'Дом строится из трёх вещей: каркас, отделка и электрика. Веб-страница — то же самое: HTML — кости, CSS — кожа, JS — нервная система.',
      body_en: 'A house is built from three things: frame, finish, and wiring. A web page is the same: HTML — bones, CSS — skin, JS — nervous system.',
      visual: {
        kind: 'emoji',
        emojis: ['🏗️', '🎨', '⚡'],
      },
      bullets: [
        { text_ru: '🏗️ HTML — структура: что есть на странице', text_en: '🏗️ HTML — structure: what is on the page' },
        { text_ru: '🎨 CSS — оформление: как это выглядит', text_en: '🎨 CSS — design: how it looks' },
        { text_ru: '⚡ JavaScript — поведение: что страница делает', text_en: '⚡ JavaScript — behaviour: what the page does' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Что мы построим',
      title_en: 'What we will build',
      body_ru: 'Личная визитная карточка — настоящий веб-сайт. Три файла, три технологии, один красивый результат.',
      body_en: 'A personal business card — a real website. Three files, three technologies, one beautiful result.',
      bullets: [
        { text_ru: '📄 index.html — структура страницы', text_en: '📄 index.html — page structure' },
        { text_ru: '🎨 style.css — все стили и темы', text_en: '🎨 style.css — all styles and themes' },
        { text_ru: '⚡ script.js — переключатель тёмной темы', text_en: '⚡ script.js — dark theme toggle' },
        { text_ru: '🌐 Навигация, hero-секция, список навыков', text_en: '🌐 Navigation, hero section, skills list' },
      ],
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'HTML-каркас страницы',
      title_en: 'HTML page structure',
      body_ru: 'Начинаем с семантической разметки. nav, section, div — каждый элемент на своём месте.',
      body_en: 'Start with semantic markup. nav, section, div — every element in its right place.',
      code: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Моя визитная карточка</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <nav class="navbar">
    <span class="logo">👨‍💻 МоёИмя</span>
    <div class="nav-links">
      <a href="#about">Обо мне</a>
      <a href="#skills">Навыки</a>
    </div>
  </nav>

  <section id="about" class="hero">
    <div class="avatar">🧑</div>
    <h1>Привет, я <span class="highlight">Твоё Имя</span>!</h1>
    <p>Изучаю веб-разработку. Люблю создавать красивые сайты.</p>
    <button id="themeBtn">🌙 Тёмная тема</button>
  </section>

  <section id="skills" class="skills-section">
    <h2>Мои навыки</h2>
    <div class="skills">
      <div class="skill-card">🏗️ HTML</div>
      <div class="skill-card">🎨 CSS</div>
      <div class="skill-card">⚡ JavaScript</div>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>`,
      codeLang: 'html',
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'CSS: стили и тёмная тема',
      title_en: 'CSS: styles and dark theme',
      body_ru: 'Flexbox для навигации, transition для плавной смены темы, CSS-переменные для цветов.',
      body_en: 'Flexbox for navigation, transition for smooth theme change, CSS variables for colours.',
      code: `/* Сброс и базовые стили */
* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #1e293b;
  transition: background 0.3s, color 0.3s;
}

/* Тёмная тема — добавляется JS */
body.dark {
  background: #0f172a;
  color: #f1f5f9;
}

/* Навигация */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
}

/* Hero-секция */
.hero {
  text-align: center;
  padding: 80px 16px;
}
.avatar { font-size: 80px; margin-bottom: 16px; }
h1 { font-size: 2.5rem; margin-bottom: 12px; }
.highlight { color: #3B5BDB; }

/* Навыки */
.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}
.skill-card {
  padding: 12px 24px;
  border-radius: 12px;
  background: #ede9fe;
  color: #5b21b6;
  font-weight: 600;
}`,
      codeLang: 'css',
    },
    {
      id: 's6',
      type: 'code-anim',
      title_ru: 'JavaScript: переключатель темы',
      title_en: 'JavaScript: theme toggle',
      body_ru: 'Три шага: найти кнопку → слушать клик → переключать класс.',
      body_en: 'Three steps: find the button → listen for click → toggle class.',
      animMode: 'preview',
      animSteps: [
        {
          code: 'const themeBtn = document.getElementById("themeBtn");\nconst body = document.body;',
          comment_ru: '1. Находим кнопку и body',
          comment_en: '1. Find the button and body',
          preview: '<div style="background:#f8fafc;padding:16px;border-radius:8px;transition:all 0.3s"><p style="color:#1e293b;font-family:sans-serif;margin-bottom:8px">Светлая тема</p><button style="padding:8px 16px;background:#3b5bdb;color:white;border:none;border-radius:8px;font-size:13px;cursor:pointer">🌙 Тёмная тема</button></div>',
        },
        {
          code: 'let isDark = false;\n\nthemeBtn.addEventListener("click", () => {\n  isDark = !isDark;\n});',
          comment_ru: '2. При клике переключаем флаг isDark',
          comment_en: '2. On click toggle the isDark flag',
          preview: '<div style="background:#f8fafc;padding:16px;border-radius:8px"><p style="color:#1e293b;font-family:sans-serif;margin-bottom:8px">Нажми кнопку →</p><button style="padding:8px 16px;background:#3b5bdb;color:white;border:none;border-radius:8px;font-size:13px;cursor:pointer">🌙 Тёмная тема</button></div>',
        },
        {
          code: 'themeBtn.addEventListener("click", () => {\n  isDark = !isDark;\n  if (isDark) {\n    body.classList.add("dark");\n    themeBtn.textContent = "☀️ Светлая тема";\n  } else {\n    body.classList.remove("dark");\n    themeBtn.textContent = "🌙 Тёмная тема";\n  }\n});',
          comment_ru: '3. Добавляем/убираем класс dark и меняем текст кнопки',
          comment_en: '3. Add/remove dark class and change button text',
          preview: '<div style="background:#0f172a;padding:16px;border-radius:8px;transition:all 0.3s"><p style="color:#f1f5f9;font-family:sans-serif;margin-bottom:8px">Тёмная тема ✓</p><button style="padding:8px 16px;background:#3b5bdb;color:white;border:none;border-radius:8px;font-size:13px;cursor:pointer">☀️ Светлая тема</button></div>',
        },
        {
          code: '// Упрощённая версия через toggle\nthemeBtn.addEventListener("click", () => {\n  body.classList.toggle("dark");\n  const dark = body.classList.contains("dark");\n  themeBtn.textContent = dark ? "☀️ Светлая тема" : "🌙 Тёмная тема";\n});',
          comment_ru: '4. Ещё короче: classList.toggle делает всё сам',
          comment_en: '4. Even shorter: classList.toggle does it all',
          preview: '<div style="background:#0f172a;padding:16px;border-radius:8px"><p style="color:#f1f5f9;font-family:sans-serif;margin-bottom:8px">Тёмная тема — toggle ✓</p><button style="padding:8px 16px;background:#3b5bdb;color:white;border:none;border-radius:8px;font-size:13px;cursor:pointer">☀️ Светлая тема</button></div>',
        },
      ],
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Разделение ответственности',
      title_en: 'Separation of concerns',
      body_ru: 'Главный принцип веб-разработки: каждая технология делает своё дело. Это облегчает поддержку, командную работу и масштабирование.',
      body_en: 'The main principle of web development: each technology does its own job. This makes maintenance, teamwork, and scaling easier.',
      bullets: [
        { text_ru: '🏗️ HTML — только структура, никакого оформления', text_en: '🏗️ HTML — structure only, no styling' },
        { text_ru: '🎨 CSS — только внешний вид, никакой логики', text_en: '🎨 CSS — appearance only, no logic' },
        { text_ru: '⚡ JS — только поведение, стили через classList', text_en: '⚡ JS — behaviour only, styles via classList' },
        { text_ru: '🌐 <script> в конце <body> — страница грузится быстрее', text_en: '🌐 <script> at end of <body> — page loads faster' },
      ],
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'Куда опубликовать свой сайт?',
      title_en: 'Where to publish your site?',
      body_ru: 'GitHub Pages позволяет опубликовать HTML/CSS/JS сайт бесплатно за несколько минут. Создай репозиторий на github.com, загрузи файлы, включи Pages в настройках — и твой сайт будет доступен по адресу username.github.io. Первый сайт в истории (1991) до сих пор работает на info.cern.ch!',
      body_en: 'GitHub Pages lets you publish an HTML/CSS/JS site for free in a few minutes. Create a repository at github.com, upload your files, enable Pages in settings — and your site will be live at username.github.io. The first website ever (1991) still runs at info.cern.ch!',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Создай свою визитку!',
      title_en: 'Build your business card!',
      body_ru: 'Замени имя, добавь свои навыки, смени цвета. Сделай эту страницу по-настоящему своей — это твой первый реальный веб-сайт!',
      body_en: 'Replace the name, add your skills, change the colours. Make this page truly yours — this is your first real website!',
    },
  ],

  content: {
    intro_ru: `Поздравляем! Ты прошёл путь от первого тега до JavaScript. Пришло время объединить
всё, что ты узнал, в один полноценный проект. Ты создашь личную визитную карточку:
страницу с твоим именем, информацией о себе, списком навыков и переключателем темы.
Это твой первый реальный веб-проект!`,
    intro_en: `Congratulations! You have journeyed from the first tag to JavaScript. It is time to
combine everything you have learned into one complete project. You will create a personal
business card: a page with your name, information about yourself, a skills list, and a
theme toggle. This is your first real web project!`,

    blocks: [
      {
        sectionId: 'project-overview',
        heading_ru: 'Обзор проекта',
        heading_en: 'Project overview',
        text_ru: `Что создадим:
• Навигация — шапка с именем и ссылками (position: sticky)
• Hero-секция — приветствие, аватар, кнопка
• Секция навыков — карточки с технологиями
• Переключатель темы — тёмная/светлая через JS + CSS

Три файла: index.html, style.css, script.js`,
        text_en: `What we will build:
• Navigation — header with name and links (position: sticky)
• Hero section — greeting, avatar, button
• Skills section — cards with technologies
• Theme toggle — dark/light via JS + CSS

Three files: index.html, style.css, script.js`,
      },
      {
        sectionId: 'html-structure',
        heading_ru: 'HTML-структура',
        heading_en: 'HTML structure',
        text_ru: `Используем семантические теги:
• nav — навигация
• section — логические блоки страницы
• h1, h2 — заголовки
• button — интерактивный элемент

Атрибуты id и class связывают HTML с CSS и JS.
<script src="script.js"> в конце body — страница грузится быстрее.`,
        text_en: `We use semantic tags:
• nav — navigation
• section — logical blocks of the page
• h1, h2 — headings
• button — interactive element

id and class attributes connect HTML with CSS and JS.
<script src="script.js"> at the end of body — page loads faster.`,
        code: `<nav class="navbar">
  <span class="logo">👨‍💻 МоёИмя</span>
  <div class="nav-links">
    <a href="#about">Обо мне</a>
    <a href="#skills">Навыки</a>
  </div>
</nav>

<section id="about" class="hero">
  <div class="avatar">🧑</div>
  <h1>Привет, я <span class="highlight">Твоё Имя</span>!</h1>
  <button id="themeBtn">🌙 Тёмная тема</button>
</section>`,
        codeLang: 'html',
      },
      {
        sectionId: 'css-styling',
        heading_ru: 'CSS-стили',
        heading_en: 'CSS styles',
        text_ru: `Ключевые концепции:
• display: flex — для навигации и карточек
• position: sticky — навбар прилипает к верху
• transition — плавная смена темы
• body.dark — CSS-класс для тёмной темы

Вся тёмная тема — один класс .dark на body, и CSS делает всё остальное.`,
        text_en: `Key concepts:
• display: flex — for navigation and cards
• position: sticky — navbar sticks to top
• transition — smooth theme change
• body.dark — CSS class for dark theme

The entire dark theme is one .dark class on body, and CSS does the rest.`,
        code: `body {
  font-family: 'Inter', sans-serif;
  background: #f8fafc;
  color: #1e293b;
  transition: background 0.3s, color 0.3s;
}

body.dark {
  background: #0f172a;
  color: #f1f5f9;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  position: sticky;
  top: 0;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'js-interactivity',
        heading_ru: 'JavaScript-интерактивность',
        heading_en: 'JS interactivity',
        text_ru: `Переключатель темы — отличный пример DOM-манипуляции:
1. Найти кнопку через querySelector
2. Слушать клик через addEventListener
3. Переключать класс через classList.toggle
4. Обновить текст кнопки через textContent

Один класс .dark меняет всю страницу — это сила CSS + JS.`,
        text_en: `The theme toggle is a great example of DOM manipulation:
1. Find the button with querySelector
2. Listen for click with addEventListener
3. Toggle the class with classList.toggle
4. Update button text with textContent

One .dark class changes the whole page — the power of CSS + JS.`,
        code: `const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");

  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark
    ? "☀️ Светлая тема"
    : "🌙 Тёмная тема";
});`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'final-code',
        heading_ru: 'Финальный код',
        heading_en: 'Final code',
        text_ru: `Полный JavaScript для визитки включает:
• Переключатель темы
• Можно добавить: счётчик времени на сайте
• Можно добавить: анимация при прокрутке (IntersectionObserver)
• Можно добавить: форма обратной связи

Это только начало — дальше React, Vue, Node.js!`,
        text_en: `The complete JavaScript for the card includes:
• Theme toggle
• You can add: time-on-site counter
• You can add: scroll animations (IntersectionObserver)
• You can add: contact form

This is just the beginning — next come React, Vue, Node.js!`,
        code: `// script.js — полный код
const themeBtn = document.getElementById("themeBtn");

// Переключатель темы
themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark ? "☀️ Светлая тема" : "🌙 Тёмная тема";
});

// Плавная прокрутка к секциям
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    target?.scrollIntoView({ behavior: "smooth" });
  });
});`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Создай свою визитную карточку',
    title_en: 'Build your business card',
    instructions_ru: `Твоя личная страница:
1. Замени "МоёИмя" и "Твоё Имя" на своё имя
2. Добавь описание о себе в <p> в hero-секции
3. Добавь 2-3 карточки навыков в .skills
4. Проверь что переключатель темы работает`,
    instructions_en: `Your personal page:
1. Replace "MyName" and "Your Name" with your own name
2. Add a description about yourself in the <p> in the hero section
3. Add 2-3 skill cards to .skills
4. Verify the theme toggle works`,
    activeTabs: ['html', 'css', 'javascript'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Моя визитная карточка</title>
</head>
<body>
  <nav class="navbar">
    <span class="logo">👨‍💻 МоёИмя</span>
    <div class="nav-links">
      <a href="#about">Обо мне</a>
      <a href="#skills">Навыки</a>
    </div>
  </nav>

  <section id="about" class="hero">
    <div class="avatar">🧑</div>
    <h1>Привет, я <span class="highlight">Твоё Имя</span>!</h1>
    <p>Изучаю веб-разработку. Люблю создавать красивые сайты.</p>
    <button id="themeBtn">🌙 Тёмная тема</button>
  </section>

  <section id="skills" class="skills-section">
    <h2>Мои навыки</h2>
    <div class="skills">
      <div class="skill-card">🏗️ HTML</div>
      <div class="skill-card">🎨 CSS</div>
      <div class="skill-card">⚡ JavaScript</div>
    </div>
  </section>
</body>
</html>`,
      css: `* { box-sizing: border-box; margin: 0; padding: 0; }

body {
  font-family: sans-serif;
  background: #f8fafc;
  color: #1e293b;
  transition: background 0.3s, color 0.3s;
}

body.dark {
  background: #0f172a;
  color: #f1f5f9;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
}

body.dark .navbar {
  background: #1e293b;
  border-color: #334155;
}

.nav-links a {
  margin-left: 16px;
  color: inherit;
  text-decoration: none;
}

.hero {
  text-align: center;
  padding: 80px 16px;
}
.avatar { font-size: 80px; margin-bottom: 16px; }
h1 { font-size: 2rem; margin-bottom: 12px; }
.highlight { color: #3b5bdb; }

.skills-section { padding: 40px 16px; text-align: center; }

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
  margin-top: 24px;
}

.skill-card {
  padding: 12px 24px;
  border-radius: 12px;
  background: #ede9fe;
  color: #5b21b6;
  font-weight: 600;
}

#themeBtn {
  margin-top: 24px;
  padding: 12px 24px;
  background: #3b5bdb;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
}`,
      javascript: `const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  themeBtn.textContent = isDark
    ? "☀️ Светлая тема"
    : "🌙 Тёмная тема";
});`,
    },
    hints_ru: [
      'Замени текст прямо в HTML — найди "МоёИмя" и "Твоё Имя" и введи своё.',
      'Чтобы добавить навык, скопируй <div class="skill-card">🏗️ HTML</div> и замени текст.',
    ],
    hints_en: [
      'Replace the text directly in HTML — find "MyName" and "Your Name" and type your own.',
      'To add a skill, copy <div class="skill-card">🏗️ HTML</div> and change the text.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Разделение ответственности', term_en: 'Separation of concerns',
      definition_ru: 'Принцип: HTML — структура, CSS — стиль, JS — поведение. Каждый язык делает своё дело.',
      definition_en: 'Principle: HTML — structure, CSS — style, JS — behaviour. Each language does its own job.',
      example_ru: 'Стили держи в CSS, а не в атрибуте style=""',
      example_en: 'Keep styles in CSS, not in the style="" attribute',
    },
    {
      term_ru: 'position: sticky', term_en: 'position: sticky',
      definition_ru: 'CSS-свойство: элемент остаётся в потоке, но "прилипает" к верху при прокрутке.',
      definition_en: 'CSS property: the element stays in the flow but "sticks" to the top when scrolling.',
      example_ru: '.navbar { position: sticky; top: 0; }',
      example_en: '.navbar { position: sticky; top: 0; }',
    },
    {
      term_ru: 'CSS transition', term_en: 'CSS transition',
      definition_ru: 'Плавная анимация изменения CSS-свойства.',
      definition_en: 'Smooth animation of a CSS property change.',
      example_ru: 'transition: background 0.3s, color 0.3s;',
      example_en: 'transition: background 0.3s, color 0.3s;',
    },
    {
      term_ru: 'classList.toggle()', term_en: 'classList.toggle()',
      definition_ru: 'Переключает CSS-класс на элементе: добавляет если нет, убирает если есть.',
      definition_en: 'Toggles a CSS class on an element: adds if absent, removes if present.',
      example_ru: 'body.classList.toggle("dark");',
      example_en: 'body.classList.toggle("dark");',
    },
    {
      term_ru: 'Viewport', term_en: 'Viewport',
      definition_ru: 'Видимая область браузера. meta viewport настраивает масштаб на мобильных.',
      definition_en: 'The visible browser area. The meta viewport tag configures scaling on mobile.',
      example_ru: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
      example_en: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Первый сайт в истории был создан Тимом Бернерсом-Ли в 1991 году на ЦЕРНе. Он до сих пор доступен по адресу info.cern.ch. Теперь сайтов больше 1,7 миллиарда — и ты только что научился создавать такие же!',
      text_en: 'The first website ever was created by Tim Berners-Lee in 1991 at CERN. It is still accessible at info.cern.ch. There are now over 1.7 billion websites — and you just learned to build them!',
    },
    {
      text_ru: 'GitHub Pages позволяет опубликовать твой HTML/CSS/JS сайт бесплатно за несколько минут. Создай аккаунт на github.com, загрузи файлы в репозиторий, включи GitHub Pages — и получи адрес вида username.github.io.',
      text_en: 'GitHub Pages lets you publish your HTML/CSS/JS site for free in a few minutes. Create an account at github.com, upload files to a repository, enable GitHub Pages — and get an address like username.github.io.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой принцип описывает роль HTML, CSS и JS?',
      text_en: 'Which principle describes the role of HTML, CSS, and JS?',
      options_ru: ['HTML делает всё', 'Все три делают одно и то же', 'HTML — структура, CSS — стиль, JS — поведение', 'CSS управляет логикой'],
      options_en: ['HTML does everything', 'All three do the same thing', 'HTML — structure, CSS — style, JS — behaviour', 'CSS controls logic'],
      correctIndex: 2,
      explanation_ru: 'Разделение ответственности: HTML — что есть, CSS — как выглядит, JS — что делает. Это облегчает поддержку кода.',
      explanation_en: 'Separation of concerns: HTML — what exists, CSS — how it looks, JS — what it does. This makes code easier to maintain.',
    },
    {
      id: 'q2',
      text_ru: 'Как переключить CSS-класс "dark" на body?',
      text_en: 'How do you toggle the CSS class "dark" on body?',
      options_ru: ['body.style.dark = true', 'body.classList.toggle("dark")', 'body.class = "dark"', 'toggleDark(body)'],
      options_en: ['body.style.dark = true', 'body.classList.toggle("dark")', 'body.class = "dark"', 'toggleDark(body)'],
      correctIndex: 1,
      explanation_ru: 'classList.toggle("dark") добавляет класс если его нет, или удаляет если есть. Один вызов — для переключателя.',
      explanation_en: 'classList.toggle("dark") adds the class if absent, removes it if present. One call — for a toggle.',
    },
    {
      id: 'q3',
      text_ru: 'Зачем meta viewport нужен в head?',
      text_en: 'Why is meta viewport needed in head?',
      options_ru: ['Для кодировки символов', 'Для правильного отображения на мобильных устройствах', 'Для SEO', 'Для подключения CSS'],
      options_en: ['For character encoding', 'For correct display on mobile devices', 'For SEO', 'To link CSS'],
      correctIndex: 1,
      explanation_ru: 'meta viewport с content="width=device-width, initial-scale=1.0" не даёт мобильным браузерам масштабировать страницу неправильно.',
      explanation_en: 'meta viewport with content="width=device-width, initial-scale=1.0" prevents mobile browsers from scaling the page incorrectly.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает position: sticky у навигации?',
      text_en: 'What does position: sticky do on a navigation bar?',
      options_ru: ['Фиксирует в левом углу', 'Навбар прилипает к верху при прокрутке', 'Скрывает навбар', 'Делает навбар прозрачным'],
      options_en: ['Fixes it to the top-left', 'Navbar sticks to top when scrolling', 'Hides the navbar', 'Makes navbar transparent'],
      correctIndex: 1,
      explanation_ru: 'sticky — элемент остаётся в потоке документа, но при прокрутке "прилипает" к заданной позиции (top: 0).',
      explanation_en: 'sticky — the element stays in the document flow but "sticks" to its specified position (top: 0) when scrolling.',
    },
    {
      id: 'q5',
      text_ru: 'Где лучше подключить <script> в HTML?',
      text_en: 'Where is the best place to put <script> in HTML?',
      options_ru: ['В <head>', 'В начале <body>', 'В конце <body> перед </body>', 'Не важно'],
      options_en: ['In <head>', 'At the start of <body>', 'At the end of <body> before </body>', 'It does not matter'],
      correctIndex: 2,
      explanation_ru: 'script в конце body позволяет HTML загрузиться и отрендериться раньше, чем JS начнёт выполняться. Это ускоряет отображение страницы.',
      explanation_en: 'script at the end of body lets the HTML load and render before JS starts executing. This speeds up the page display.',
    },
  ],
}
