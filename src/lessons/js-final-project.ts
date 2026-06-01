import type { Lesson } from '@/types/lesson'

export const jsFinalProject: Lesson = {
  slug: 'js-final-project',
  category: 'JS',
  icon: '🌐',
  readTime: 15,
  title_ru: 'Финальный проект: личная визитная карточка',
  title_en: 'Final Project: Personal Business Card',
  description_ru: 'Соберите всё воедино: HTML-структура, CSS flexbox и тёмная тема, JS-интерактивность с переключателем темы и localStorage.',
  description_en: 'Bring it all together: HTML structure, CSS flexbox and dark theme, JS interactivity with theme toggle and localStorage.',
  sections: [
    { id: 'html-structure', title_ru: 'HTML структура', title_en: 'HTML structure' },
    { id: 'css-styling', title_ru: 'CSS: flexbox и темы', title_en: 'CSS: flexbox and themes' },
    { id: 'js-interactivity', title_ru: 'JS: интерактивность', title_en: 'JS: interactivity' },
    { id: 'theme-toggle', title_ru: 'Переключатель темы', title_en: 'Theme toggle' },
    { id: 'smooth-scroll', title_ru: 'Плавный скролл', title_en: 'Smooth scroll' },
    { id: 'finishing-touches', title_ru: 'Финальные штрихи', title_en: 'Finishing touches' },
  ],
  slides: [
    {
      id: 'title-slide',
      type: 'title',
      title_ru: 'Финальный проект: визитная карточка',
      title_en: 'Final Project: Business Card',
      body_ru: 'Применяем все знания: HTML, CSS, JavaScript. Создаём полноценный интерактивный сайт-визитку.',
      body_en: 'Apply all knowledge: HTML, CSS, JavaScript. Build a complete interactive business card website.',
      visual: { kind: 'emoji', emojis: ['🌐', '🎨', '⚡'], caption_ru: 'Структура, стиль, интерактивность', caption_en: 'Structure, style, interactivity' },
    },
    {
      id: 'concept-html-structure',
      type: 'concept',
      title_ru: 'Семантическая HTML-структура',
      title_en: 'Semantic HTML structure',
      body_ru: 'Используем семантические теги для лучшей доступности и SEO. Каждая секция имеет чёткую роль.',
      body_en: 'We use semantic tags for better accessibility and SEO. Each section has a clear role.',
      code: `<!-- Semantic structure -->\n<header class="header">\n  <nav class="nav">...</nav>\n</header>\n\n<main>\n  <section id="hero" class="hero">...</section>\n  <section id="skills" class="skills">...</section>\n  <section id="projects" class="projects">...</section>\n  <section id="contact" class="contact">...</section>\n</main>\n\n<footer class="footer">...</footer>`,
      codeLang: 'html',
    },
    {
      id: 'concept-css-themes',
      type: 'concept',
      title_ru: 'CSS-переменные для тем оформления',
      title_en: 'CSS variables for themes',
      body_ru: 'CSS-переменные (custom properties) позволяют легко переключать тему, изменяя значения в одном месте.',
      body_en: 'CSS variables (custom properties) let you easily switch themes by changing values in one place.',
      code: `/* Light theme (default) */\n:root {\n  --bg: #f9fafb;\n  --surface: #ffffff;\n  --text: #111827;\n  --accent: #6366f1;\n  --border: #e5e7eb;\n}\n\n/* Dark theme */\n[data-theme="dark"] {\n  --bg: #0f0f17;\n  --surface: #1e1e2e;\n  --text: #cdd6f4;\n  --accent: #89b4fa;\n  --border: #313244;\n}\n\nbody {\n  background: var(--bg);\n  color: var(--text);\n  transition: background 0.3s, color 0.3s;\n}`,
      codeLang: 'css',
    },
    {
      id: 'compare-static-interactive',
      type: 'compare',
      title_ru: 'До JS (статично) vs После JS (интерактивно)',
      title_en: 'Before JS (static) vs After JS (interactive)',
      body_ru: 'JavaScript трансформирует статичный HTML в живое приложение.',
      body_en: 'JavaScript transforms static HTML into a living application.',
      compareLeft: {
        label_ru: 'Без JavaScript',
        label_en: 'Without JavaScript',
        items_ru: ['Только одна тема', 'Нет анимаций', 'Нет памяти (тема сбрасывается)', 'Форма не работает'],
        items_en: ['Only one theme', 'No animations', 'No memory (theme resets)', 'Form does not work'],
        color: 'amber',
      },
      compareRight: {
        label_ru: 'С JavaScript',
        label_en: 'With JavaScript',
        items_ru: ['Переключение светлой/тёмной темы', 'Плавный скролл к секциям', 'Тема запоминается (localStorage)', 'Интерактивные элементы'],
        items_en: ['Light/dark theme toggle', 'Smooth scroll to sections', 'Theme remembered (localStorage)', 'Interactive elements'],
        color: 'green',
      },
    },
    {
      id: 'anim-js-interactivity',
      type: 'code-anim',
      title_ru: 'Построение JS-интерактивности',
      title_en: 'Building JS interactivity',
      body_ru: 'Шаг за шагом добавляем переключатель темы и сохранение в localStorage.',
      body_en: 'Step by step: add theme toggle and localStorage persistence.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<button id="themeToggle" aria-label="Toggle theme">\n  🌙\n</button>`,
          comment_ru: 'Добавляем кнопку переключения темы в header',
          comment_en: 'Add the theme toggle button to header',
          preview: '<div style="background:#f9fafb;padding:20px;border-radius:8px"><button style="background:#e5e7eb;border:none;padding:8px 12px;border-radius:50%;cursor:pointer;font-size:1.2rem">🌙</button><span style="margin-left:10px;color:#111">Light theme (default)</span></div>',
        },
        {
          code: `const toggleBtn = document.querySelector('#themeToggle');\nconst saved = localStorage.getItem('theme') || 'light';\ndocument.documentElement.setAttribute('data-theme', saved);\ntoggleBtn.textContent = saved === 'dark' ? '☀️' : '🌙';`,
          comment_ru: 'При загрузке восстанавливаем сохранённую тему',
          comment_en: 'On load, restore the saved theme',
          preview: '<div style="background:#0f0f17;padding:20px;border-radius:8px"><button style="background:#313244;border:none;padding:8px 12px;border-radius:50%;cursor:pointer;font-size:1.2rem">☀️</button><span style="margin-left:10px;color:#cdd6f4">Dark theme restored!</span></div>',
        },
        {
          code: `toggleBtn.addEventListener('click', () => {\n  const current = document.documentElement.getAttribute('data-theme');\n  const next = current === 'dark' ? 'light' : 'dark';\n  document.documentElement.setAttribute('data-theme', next);\n  localStorage.setItem('theme', next);\n  toggleBtn.textContent = next === 'dark' ? '☀️' : '🌙';\n});`,
          comment_ru: 'Переключаем тему по клику и сохраняем',
          comment_en: 'Toggle theme on click and save it',
          preview: '<div style="background:#f9fafb;padding:20px;border-radius:8px;transition:background 0.3s"><button style="background:#e5e7eb;border:none;padding:8px 12px;border-radius:50%;cursor:pointer;font-size:1.2rem">🌙</button><span style="color:#6366f1;margin-left:10px">✅ Theme saved to localStorage</span></div>',
        },
      ],
    },
    {
      id: 'concept-smooth-scroll',
      type: 'concept',
      title_ru: 'Плавный скролл',
      title_en: 'Smooth scroll',
      body_ru: 'Используем делегирование событий для обработки всех ссылок навигации и плавного прокручивания к секциям.',
      body_en: 'We use event delegation to handle all navigation links and smoothly scroll to sections.',
      code: `// Smooth scroll for all nav links\ndocument.querySelector('nav').addEventListener('click', (e) => {\n  const link = e.target.closest('a[href^="#"]');\n  if (!link) return;\n\n  e.preventDefault();\n  const targetId = link.getAttribute('href');\n  const target = document.querySelector(targetId);\n  if (target) {\n    target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n  }\n});`,
      codeLang: 'javascript',
    },
    {
      id: 'tip-finishing',
      type: 'tip',
      title_ru: 'Финальные штрихи',
      title_en: 'Finishing touches',
      body_ru: 'Добавьте эти детали для профессионального вида: meta viewport, Open Graph теги, плавные переходы на всех интерактивных элементах, aria-label для кнопок без текста.',
      body_en: 'Add these details for a professional look: meta viewport, Open Graph tags, smooth transitions on all interactive elements, aria-label for icon-only buttons.',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Ваш финальный проект',
      title_en: 'Your final project',
      body_ru: 'Персонализируйте стартовый код: добавьте своё имя, навыки, проекты. Это станет вашей настоящей визитной карточкой!',
      body_en: 'Personalise the starter code: add your name, skills, projects. This will be your real business card!',
    },
  ],
  content: {
    intro_ru: 'Финальный проект объединяет всё, что вы изучили: семантическая разметка HTML, современный CSS с переменными и flexbox, а также JavaScript с событиями, localStorage и асинхронным кодом.',
    intro_en: 'The final project brings together everything you have learned: semantic HTML markup, modern CSS with variables and flexbox, and JavaScript with events, localStorage and async code.',
    blocks: [
      {
        sectionId: 'html-structure',
        heading_ru: 'Семантическая разметка и доступность',
        heading_en: 'Semantic markup and accessibility',
        text_ru: 'Правильная HTML-структура — это не просто красивый код: она напрямую влияет на доступность, SEO и удобство сопровождения. Семантические теги (header, nav, main, section, footer) передают смысл как браузеру, так и вспомогательным технологиям, например экранным читалкам. Поисковые системы также лучше индексируют страницы с выраженной семантикой.\n\nПри построении визитной карточки следуйте структурному принципу: один элемент header с навигацией, один элемент main с секциями по контенту, один footer. Каждой секции дайте уникальный id — это нужно как для якорных ссылок внутри страницы, так и для IntersectionObserver, который отслеживает активные разделы при скролле.',
        text_en: 'Correct HTML structure is not just beautiful code: it directly affects accessibility, SEO and maintainability. Semantic tags (header, nav, main, section, footer) communicate meaning to both the browser and assistive technologies such as screen readers. Search engines also index pages with clear semantics more effectively.\n\nWhen building a business card, follow the structural principle: one header element with navigation, one main element with content sections, one footer. Give each section a unique id — this is needed both for in-page anchor links and for the IntersectionObserver that tracks active sections while scrolling.',
        code: `<!DOCTYPE html>
<html lang="en" data-theme="light">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Alex Johnson — Frontend Developer</title>
</head>
<body>

  <header class="header">
    <nav class="nav" aria-label="Main navigation">
      <a href="#about">About</a>
      <a href="#skills">Skills</a>
      <a href="#projects">Projects</a>
    </nav>
    <!-- aria-label is required for icon-only buttons -->
    <button id="themeToggle" aria-label="Toggle dark/light theme">🌙</button>
  </header>

  <main>
    <section id="about" aria-labelledby="about-heading">
      <h1 id="about-heading">Alex Johnson</h1>
    </section>
    <section id="skills" aria-labelledby="skills-heading">
      <h2 id="skills-heading">Skills</h2>
    </section>
  </main>

  <footer class="footer">
    <p>© 2025 Alex Johnson</p>
  </footer>

</body>
</html>`,
        codeLang: 'html',
      },
      {
        sectionId: 'theme-toggle',
        heading_ru: 'Реализация переключателя темы с localStorage',
        heading_en: 'Implementing the theme toggle with localStorage',
        text_ru: 'Переключатель темы — это классический пример совместной работы трёх технологий: CSS-переменных для стилей, атрибута data-theme на корневом элементе для переключения между наборами переменных и localStorage для сохранения выбора между визитами.\n\nКлючевой момент — применять сохранённую тему как можно раньше при загрузке страницы, чтобы избежать «вспышки» неправильной темы (FOUC — Flash Of Unstyled Content). Лучше всего сделать это в теге script в head, до отрисовки тела страницы. В нашем проекте тема применяется в начале основного JS-файла, что достаточно для учебного проекта.',
        text_en: 'The theme toggle is a classic example of three technologies working together: CSS variables for styles, the data-theme attribute on the root element to switch between variable sets, and localStorage to persist the user\'s choice between visits.\n\nThe key point is to apply the saved theme as early as possible on page load to avoid a flash of the wrong theme (FOUC — Flash Of Unstyled Content). Ideally this is done in a script tag in the head before the page body is rendered. In our project the theme is applied at the start of the main JS file, which is sufficient for a learning project.',
        code: `// === THEME TOGGLE ===
const themeToggle = document.querySelector('#themeToggle');
const html = document.documentElement; // <html> element

// 1. Restore saved theme immediately on load
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

// 2. Toggle on button click
themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';

  // Update the DOM — CSS variables switch automatically
  html.setAttribute('data-theme', next);

  // Persist the choice
  localStorage.setItem('theme', next);

  // Update button icon
  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';
});`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'smooth-scroll',
        heading_ru: 'Плавный скролл через делегирование событий',
        heading_en: 'Smooth scroll via event delegation',
        text_ru: 'Наивный подход — повесить слушатель click на каждую ссылку навигации по отдельности. Лучший подход — делегирование событий: один слушатель на родительском элементе перехватывает клики по всем дочерним ссылкам. Это эффективнее по памяти и автоматически охватывает ссылки, добавленные динамически.\n\nМетод element.closest(selector) незаменим здесь: клик может попасть на дочерний элемент ссылки (например, иконку внутри тега a), а closest поднимается по дереву DOM до ближайшего предка, соответствующего селектору. Атрибут href^="#" в качестве CSS-селектора фильтрует только якорные ссылки, оставляя внешние ссылки работать обычным образом.',
        text_en: 'The naive approach is to attach a click listener to each navigation link individually. A better approach is event delegation: one listener on the parent element intercepts clicks on all child links. This is more memory-efficient and automatically covers links added dynamically.\n\nThe element.closest(selector) method is indispensable here: a click may land on a child element of the link (for example an icon inside an anchor tag), and closest walks up the DOM tree to the nearest ancestor matching the selector. Using href^="#" as a CSS selector filters only anchor links, leaving external links to work normally.',
        code: `// Single listener on the nav — covers ALL links inside it
document.querySelector('.nav').addEventListener('click', (e) => {
  // Walk up from click target to find the nearest <a href="#...">
  const link = e.target.closest('a[href^="#"]');
  if (!link) return; // click was not on (or inside) a link

  e.preventDefault(); // stop the default jump/hash change

  const targetId = link.getAttribute('href'); // e.g. '#skills'
  const target = document.querySelector(targetId);

  if (target) {
    target.scrollIntoView({
      behavior: 'smooth', // animated scroll
      block: 'start',     // align top of section to top of viewport
    });
  }
});

// Also handle hero CTA buttons (they are outside .nav)
document.querySelector('.hero-links').addEventListener('click', (e) => {
  const link = e.target.closest('a[href^="#"]');
  if (!link) return;
  e.preventDefault();
  document.querySelector(link.getAttribute('href'))
    ?.scrollIntoView({ behavior: 'smooth', block: 'start' });
});`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'finishing-touches',
        heading_ru: 'Финальные штрихи: форма, анимации и активная навигация',
        heading_en: 'Finishing touches: form, animations and active nav',
        text_ru: 'Профессиональный сайт-визитка отличается от учебного проекта вниманием к деталям. Три ключевых улучшения: обработка формы контактов с обратной связью пользователю, анимация карточек при появлении в зоне видимости через IntersectionObserver, и подсветка активного пункта меню при скролле.\n\nIntersectionObserver — современная альтернатива прослушиванию события scroll. Он вызывает коллбэк только когда элемент пересекает границу видимости, не нагружая главный поток постоянными вычислениями. Параметр threshold: 0.5 означает, что коллбэк срабатывает, когда 50% элемента видны в окне просмотра.',
        text_en: 'A professional business card site differs from a student project by attention to detail. Three key improvements: contact form handling with user feedback, card animations when entering the viewport via IntersectionObserver, and active menu item highlighting while scrolling.\n\nIntersectionObserver is a modern alternative to listening to the scroll event. It calls the callback only when an element crosses the visibility boundary, not burdening the main thread with constant calculations. The threshold: 0.5 parameter means the callback fires when 50% of the element is visible in the viewport.',
        code: `// 1. Contact form — show success message, reset fields
const form = document.querySelector('#contactForm');
const formMsg = document.querySelector('#formMsg');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  formMsg.textContent = '✅ Message sent! I will get back to you soon.';
  form.reset();
  setTimeout(() => { formMsg.textContent = ''; }, 4000);
});

// 2. Scroll-in animation with IntersectionObserver
const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animate-in');
      cardObserver.unobserve(entry.target); // animate once only
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.card').forEach(card => {
  cardObserver.observe(card);
});

// 3. Highlight active nav link on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === '#' + entry.target.id;
        link.style.color = isActive ? 'var(--accent)' : '';
      });
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => navObserver.observe(s));`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'css-styling',
        heading_ru: 'Flexbox для макета',
        heading_en: 'Flexbox for layout',
        text_ru: 'Flexbox — основной инструмент для создания гибких, адаптивных макетов без хаков с float.',
        text_en: 'Flexbox is the primary tool for creating flexible, responsive layouts without float hacks.',
        code: `.skills-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 12px;\n  justify-content: center;\n}\n\n.skill-tag {\n  background: var(--accent);\n  color: white;\n  padding: 6px 14px;\n  border-radius: 20px;\n  font-size: 0.9rem;\n}\n\n.hero {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 80px 20px;\n  gap: 16px;\n}`,
        codeLang: 'css',
      },
      {
        sectionId: 'js-interactivity',
        heading_ru: 'Анимация при скролле',
        heading_en: 'Scroll animations',
        text_ru: 'IntersectionObserver — современный API для запуска анимаций при появлении элементов в зоне видимости.',
        text_en: 'IntersectionObserver is the modern API for triggering animations when elements enter the viewport.',
        code: `const observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      entry.target.classList.add('animate-in');\n    }\n  });\n}, { threshold: 0.1 });\n\ndocument.querySelectorAll('.card').forEach(card => {\n  observer.observe(card);\n});`,
        codeLang: 'javascript',
      },
    ],
  },
  editorTask: {
    title_ru: 'Личная визитная карточка',
    title_en: 'Personal business card',
    instructions_ru: 'Перед вами готовый стартовый код. Персонализируйте его: 1) Замените имя, должность и биографию. 2) Добавьте свои навыки. 3) Нажмите кнопку луны — тема переключается и запоминается!',
    instructions_en: 'You have a complete starter code. Personalise it: 1) Replace name, title and bio. 2) Add your skills. 3) Click the moon button — the theme toggles and is remembered!',
    activeTabs: ['html', 'css', 'javascript'],
    starterCode: {
      html: `<!DOCTYPE html>\n<html lang="en" data-theme="light">\n<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Alex Johnson — Developer</title>\n  <link rel="stylesheet" href="style.css">\n</head>\n<body>\n\n  <!-- HEADER -->\n  <header class="header">\n    <div class="header-inner">\n      <span class="logo">AJ</span>\n      <nav class="nav">\n        <a href="#about">About</a>\n        <a href="#skills">Skills</a>\n        <a href="#projects">Projects</a>\n        <a href="#contact">Contact</a>\n      </nav>\n      <button id="themeToggle" class="theme-btn" aria-label="Toggle theme">🌙</button>\n    </div>\n  </header>\n\n  <!-- HERO -->\n  <main>\n    <section id="about" class="hero">\n      <div class="avatar">👨‍💻</div>\n      <h1 class="hero-name">Alex Johnson</h1>\n      <p class="hero-title">Frontend Developer</p>\n      <p class="hero-bio">\n        Passionate about building beautiful, fast and accessible web experiences.\n        3 years of experience with HTML, CSS and JavaScript.\n      </p>\n      <div class="hero-links">\n        <a href="#contact" class="btn btn-primary">Hire me</a>\n        <a href="#projects" class="btn btn-secondary">See my work</a>\n      </div>\n    </section>\n\n    <!-- SKILLS -->\n    <section id="skills" class="section">\n      <h2 class="section-title">Skills</h2>\n      <div class="skills-grid">\n        <span class="skill-tag">HTML5</span>\n        <span class="skill-tag">CSS3</span>\n        <span class="skill-tag">JavaScript</span>\n        <span class="skill-tag">TypeScript</span>\n        <span class="skill-tag">React</span>\n        <span class="skill-tag">Node.js</span>\n        <span class="skill-tag">Git</span>\n        <span class="skill-tag">Figma</span>\n      </div>\n    </section>\n\n    <!-- PROJECTS -->\n    <section id="projects" class="section">\n      <h2 class="section-title">Projects</h2>\n      <div class="projects-grid">\n        <div class="card">\n          <div class="card-icon">🛒</div>\n          <h3 class="card-title">Shop App</h3>\n          <p class="card-desc">E-commerce app with cart and checkout. Built with React and Node.js.</p>\n          <a href="#" class="card-link">View →</a>\n        </div>\n        <div class="card">\n          <div class="card-icon">📝</div>\n          <h3 class="card-title">Notes App</h3>\n          <p class="card-desc">Markdown notes with localStorage sync. Pure HTML, CSS, JS.</p>\n          <a href="#" class="card-link">View →</a>\n        </div>\n        <div class="card">\n          <div class="card-icon">🌤️</div>\n          <h3 class="card-title">Weather Widget</h3>\n          <p class="card-desc">Real-time weather using OpenWeather API and geolocation.</p>\n          <a href="#" class="card-link">View →</a>\n        </div>\n      </div>\n    </section>\n\n    <!-- CONTACT -->\n    <section id="contact" class="section">\n      <h2 class="section-title">Contact</h2>\n      <form class="contact-form" id="contactForm">\n        <input type="text" placeholder="Your name" required class="form-input">\n        <input type="email" placeholder="Your email" required class="form-input">\n        <textarea placeholder="Your message" rows="4" required class="form-input"></textarea>\n        <button type="submit" class="btn btn-primary">Send Message</button>\n      </form>\n      <p id="formMsg" class="form-message"></p>\n    </section>\n  </main>\n\n  <!-- FOOTER -->\n  <footer class="footer">\n    <p>© 2025 Alex Johnson · Built with HTML, CSS & JS</p>\n    <div class="social">\n      <a href="#">GitHub</a>\n      <a href="#">LinkedIn</a>\n      <a href="#">Twitter</a>\n    </div>\n  </footer>\n\n  <script src="script.js"></script>\n</body>\n</html>`,
      css: `/* ===== CSS VARIABLES / THEMES ===== */\n:root {\n  --bg: #f9fafb;\n  --surface: #ffffff;\n  --text: #111827;\n  --text-muted: #6b7280;\n  --accent: #6366f1;\n  --accent-hover: #4f46e5;\n  --border: #e5e7eb;\n  --shadow: 0 4px 24px rgba(0,0,0,0.06);\n  --radius: 12px;\n}\n\n[data-theme="dark"] {\n  --bg: #0f0f17;\n  --surface: #1e1e2e;\n  --text: #cdd6f4;\n  --text-muted: #a6adc8;\n  --accent: #89b4fa;\n  --accent-hover: #74c7ec;\n  --border: #313244;\n  --shadow: 0 4px 24px rgba(0,0,0,0.4);\n}\n\n/* ===== RESET & BASE ===== */\n*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }\n\nbody {\n  font-family: 'Inter', system-ui, sans-serif;\n  background: var(--bg);\n  color: var(--text);\n  line-height: 1.6;\n  transition: background 0.3s ease, color 0.3s ease;\n}\n\na { color: var(--accent); text-decoration: none; }\na:hover { color: var(--accent-hover); }\n\n/* ===== HEADER ===== */\n.header {\n  position: sticky;\n  top: 0;\n  z-index: 100;\n  background: var(--surface);\n  border-bottom: 1px solid var(--border);\n  backdrop-filter: blur(8px);\n}\n\n.header-inner {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 16px 24px;\n  display: flex;\n  align-items: center;\n  gap: 24px;\n}\n\n.logo {\n  font-weight: 800;\n  font-size: 1.2rem;\n  color: var(--accent);\n  letter-spacing: -0.5px;\n}\n\n.nav {\n  display: flex;\n  gap: 24px;\n  margin-left: auto;\n}\n\n.nav a {\n  color: var(--text-muted);\n  font-size: 0.95rem;\n  font-weight: 500;\n  transition: color 0.2s;\n}\n\n.nav a:hover { color: var(--accent); }\n\n.theme-btn {\n  background: var(--border);\n  border: none;\n  width: 38px;\n  height: 38px;\n  border-radius: 50%;\n  cursor: pointer;\n  font-size: 1.1rem;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  transition: background 0.2s, transform 0.2s;\n}\n\n.theme-btn:hover { transform: rotate(20deg); }\n\n/* ===== HERO ===== */\n.hero {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  text-align: center;\n  padding: 100px 24px 80px;\n  gap: 16px;\n  max-width: 700px;\n  margin: 0 auto;\n}\n\n.avatar {\n  font-size: 5rem;\n  line-height: 1;\n  margin-bottom: 8px;\n}\n\n.hero-name {\n  font-size: 2.8rem;\n  font-weight: 800;\n  letter-spacing: -1px;\n}\n\n.hero-title {\n  font-size: 1.1rem;\n  color: var(--accent);\n  font-weight: 600;\n}\n\n.hero-bio {\n  color: var(--text-muted);\n  max-width: 480px;\n  font-size: 1rem;\n}\n\n.hero-links {\n  display: flex;\n  gap: 12px;\n  margin-top: 8px;\n}\n\n/* ===== BUTTONS ===== */\n.btn {\n  padding: 10px 22px;\n  border-radius: 8px;\n  font-weight: 600;\n  font-size: 0.95rem;\n  cursor: pointer;\n  border: 2px solid transparent;\n  transition: all 0.2s;\n}\n\n.btn-primary {\n  background: var(--accent);\n  color: #fff;\n}\n\n.btn-primary:hover { background: var(--accent-hover); color: #fff; }\n\n.btn-secondary {\n  background: transparent;\n  border-color: var(--border);\n  color: var(--text);\n}\n\n.btn-secondary:hover { border-color: var(--accent); color: var(--accent); }\n\n/* ===== SECTIONS ===== */\n.section {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 80px 24px;\n}\n\n.section-title {\n  font-size: 2rem;\n  font-weight: 800;\n  text-align: center;\n  margin-bottom: 40px;\n  letter-spacing: -0.5px;\n}\n\n/* ===== SKILLS ===== */\n.skills-grid {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n  justify-content: center;\n}\n\n.skill-tag {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  color: var(--text);\n  padding: 8px 18px;\n  border-radius: 24px;\n  font-size: 0.9rem;\n  font-weight: 500;\n  transition: border-color 0.2s, color 0.2s;\n}\n\n.skill-tag:hover { border-color: var(--accent); color: var(--accent); }\n\n/* ===== PROJECTS ===== */\n.projects-grid {\n  display: flex;\n  gap: 24px;\n  flex-wrap: wrap;\n  justify-content: center;\n}\n\n.card {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 28px;\n  flex: 1;\n  min-width: 260px;\n  max-width: 340px;\n  box-shadow: var(--shadow);\n  transition: transform 0.2s, box-shadow 0.2s;\n  display: flex;\n  flex-direction: column;\n  gap: 10px;\n}\n\n.card:hover { transform: translateY(-4px); box-shadow: 0 8px 32px rgba(0,0,0,0.12); }\n\n.card-icon { font-size: 2.2rem; }\n.card-title { font-size: 1.1rem; font-weight: 700; }\n.card-desc { color: var(--text-muted); font-size: 0.9rem; flex: 1; }\n.card-link { color: var(--accent); font-weight: 600; font-size: 0.9rem; }\n\n/* ===== CONTACT FORM ===== */\n.contact-form {\n  display: flex;\n  flex-direction: column;\n  gap: 14px;\n  max-width: 500px;\n  margin: 0 auto;\n}\n\n.form-input {\n  background: var(--surface);\n  border: 1px solid var(--border);\n  border-radius: 8px;\n  padding: 12px 16px;\n  color: var(--text);\n  font-size: 1rem;\n  font-family: inherit;\n  transition: border-color 0.2s;\n  outline: none;\n}\n\n.form-input:focus { border-color: var(--accent); }\n\n.form-message {\n  text-align: center;\n  margin-top: 12px;\n  font-weight: 600;\n  color: var(--accent);\n  min-height: 24px;\n}\n\n/* ===== FOOTER ===== */\n.footer {\n  border-top: 1px solid var(--border);\n  padding: 32px 24px;\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  gap: 16px;\n  max-width: 1100px;\n  margin: 0 auto;\n  color: var(--text-muted);\n  font-size: 0.9rem;\n}\n\n.social { display: flex; gap: 20px; }\n\n/* ===== RESPONSIVE ===== */\n@media (max-width: 768px) {\n  .nav { display: none; }\n  .hero-name { font-size: 2rem; }\n  .footer { flex-direction: column; text-align: center; }\n}`,
      javascript: `// ===== THEME TOGGLE =====\nconst themeToggle = document.querySelector('#themeToggle');\nconst html = document.documentElement;\n\n// Restore saved theme on load\nconst savedTheme = localStorage.getItem('theme') || 'light';\nhtml.setAttribute('data-theme', savedTheme);\nthemeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';\n\n// Toggle on click\nthemeToggle.addEventListener('click', () => {\n  const current = html.getAttribute('data-theme');\n  const next = current === 'dark' ? 'light' : 'dark';\n  html.setAttribute('data-theme', next);\n  localStorage.setItem('theme', next);\n  themeToggle.textContent = next === 'dark' ? '☀️' : '🌙';\n});\n\n// ===== SMOOTH SCROLL =====\ndocument.querySelector('.nav').addEventListener('click', (e) => {\n  const link = e.target.closest('a[href^="#"]');\n  if (!link) return;\n  e.preventDefault();\n  const target = document.querySelector(link.getAttribute('href'));\n  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n});\n\ndocument.querySelector('.hero-links').addEventListener('click', (e) => {\n  const link = e.target.closest('a[href^="#"]');\n  if (!link) return;\n  e.preventDefault();\n  const target = document.querySelector(link.getAttribute('href'));\n  if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });\n});\n\n// ===== CONTACT FORM =====\nconst form = document.querySelector('#contactForm');\nconst formMsg = document.querySelector('#formMsg');\n\nform.addEventListener('submit', (e) => {\n  e.preventDefault();\n  formMsg.textContent = '✅ Message sent! I will get back to you soon.';\n  form.reset();\n  setTimeout(() => { formMsg.textContent = ''; }, 4000);\n});\n\n// ===== CARD HOVER ANIMATION VIA JS =====\ndocument.querySelectorAll('.card').forEach(card => {\n  card.addEventListener('mouseenter', () => {\n    card.style.borderColor = 'var(--accent)';\n  });\n  card.addEventListener('mouseleave', () => {\n    card.style.borderColor = '';\n  });\n});\n\n// ===== ACTIVE NAV LINK ON SCROLL =====\nconst sections = document.querySelectorAll('section[id]');\nconst navLinks = document.querySelectorAll('.nav a');\n\nconst observer = new IntersectionObserver((entries) => {\n  entries.forEach(entry => {\n    if (entry.isIntersecting) {\n      navLinks.forEach(link => {\n        link.style.color = link.getAttribute('href') === '#' + entry.target.id\n          ? 'var(--accent)'\n          : '';\n      });\n    }\n  });\n}, { threshold: 0.5 });\n\nsections.forEach(s => observer.observe(s));\n\nconsole.log('🌐 Business card loaded! Try the theme toggle ☝️');`,
    },
    hints_ru: [
      'Чтобы изменить тему, отредактируйте CSS-переменные в :root и [data-theme="dark"]',
      'Добавьте новые навыки, скопировав <span class="skill-tag">...</span>',
      'Персонализируйте avatar-emoji: замените 👨‍💻 на любой другой',
      'Форма контакта уже работает — просто наблюдайте за сообщением об успехе',
    ],
    hints_en: [
      'To change the theme colours, edit the CSS variables in :root and [data-theme="dark"]',
      'Add new skills by copying <span class="skill-tag">...</span>',
      'Personalise the avatar emoji: replace 👨‍💻 with any other',
      'The contact form already works — just watch the success message appear',
    ],
  },
  keyTerms: [
    { term_ru: 'CSS-переменные', term_en: 'CSS variables', definition_ru: 'Кастомные свойства CSS, позволяющие переиспользовать значения (--accent, --bg)', definition_en: 'Custom CSS properties allowing value reuse (--accent, --bg)', example_ru: ':root { --accent: #6366f1; } .btn { color: var(--accent); }', example_en: ':root { --accent: #6366f1; } .btn { color: var(--accent); }' },
    { term_ru: 'Семантические теги', term_en: 'Semantic tags', definition_ru: 'HTML-теги с понятным значением: header, main, section, footer', definition_en: 'HTML tags with clear meaning: header, main, section, footer', example_ru: '<section id="skills">, <article>, <nav>', example_en: '<section id="skills">, <article>, <nav>' },
    { term_ru: 'data-атрибуты', term_en: 'data attributes', definition_ru: 'Пользовательские атрибуты HTML для хранения данных', definition_en: 'Custom HTML attributes for storing data', example_ru: '<html data-theme="dark"> — JS: el.getAttribute("data-theme")', example_en: '<html data-theme="dark"> — JS: el.getAttribute("data-theme")' },
    { term_ru: 'IntersectionObserver', term_en: 'IntersectionObserver', definition_ru: 'API для отслеживания пересечения элементов с областью просмотра', definition_en: 'API for tracking element intersection with the viewport', example_ru: 'new IntersectionObserver(callback, { threshold: 0.5 })', example_en: 'new IntersectionObserver(callback, { threshold: 0.5 })' },
    { term_ru: 'scrollIntoView', term_en: 'scrollIntoView', definition_ru: 'Метод DOM для плавного скролла к элементу', definition_en: 'DOM method for smooth scrolling to an element', example_ru: 'element.scrollIntoView({ behavior: "smooth" })', example_en: 'element.scrollIntoView({ behavior: "smooth" })' },
  ],
  didYouKnow: [
    { text_ru: 'Атрибут data-theme на <html> — лучшее место для темы: CSS-переменные наследуются по всему документу автоматически, без JavaScript на каждом элементе.', text_en: 'The data-theme attribute on <html> is the best place for themes: CSS variables cascade down the entire document automatically, without JavaScript on each element.' },
    { text_ru: 'position: sticky в CSS позволяет шапке оставаться вверху при скролле — без единой строки JavaScript!', text_en: 'position: sticky in CSS keeps the header at the top while scrolling — without a single line of JavaScript!' },
  ],
  quiz: [
    { id: 'q1', text_ru: 'Где лучше всего хранить CSS-переменные для тем оформления?', text_en: 'Where is the best place to store CSS variables for themes?', options_ru: ['В каждом элементе отдельно', 'В :root (на html-элементе)', 'В JavaScript', 'В localStorage'], options_en: ['In each element separately', 'In :root (on the html element)', 'In JavaScript', 'In localStorage'], correctIndex: 1, explanation_ru: ':root соответствует <html>. Переменные, объявленные там, доступны всем дочерним элементам через каскад.', explanation_en: ':root matches <html>. Variables declared there are available to all child elements via cascade.' },
    { id: 'q2', text_ru: 'Какой JavaScript API используется для плавного скролла к секции?', text_en: 'Which JavaScript API is used for smooth scrolling to a section?', options_ru: ['window.scroll()', 'element.goto()', 'element.scrollIntoView({ behavior: "smooth" })', 'document.navigate()'], options_en: ['window.scroll()', 'element.goto()', 'element.scrollIntoView({ behavior: "smooth" })', 'document.navigate()'], correctIndex: 2, explanation_ru: 'scrollIntoView с параметром behavior: "smooth" обеспечивает плавный скролл к элементу.', explanation_en: 'scrollIntoView with behavior: "smooth" provides smooth scrolling to the element.' },
    { id: 'q3', text_ru: 'Как JavaScript меняет тему на сайте-визитке?', text_en: 'How does JavaScript change the theme on the business card site?', options_ru: ['Перезагружает страницу', 'Изменяет атрибут data-theme на <html>', 'Изменяет каждый элемент напрямую', 'Загружает новый CSS-файл'], options_en: ['Reloads the page', 'Changes the data-theme attribute on <html>', 'Changes each element directly', 'Loads a new CSS file'], correctIndex: 1, explanation_ru: 'JS меняет data-theme на <html>, CSS-переменные в [data-theme="dark"] применяются автоматически.', explanation_en: 'JS changes data-theme on <html>, CSS variables in [data-theme="dark"] apply automatically.' },
    { id: 'q4', text_ru: 'Зачем использовать e.preventDefault() в обработчике формы?', text_en: 'Why use e.preventDefault() in a form handler?', options_ru: ['Чтобы отключить форму', 'Чтобы предотвратить перезагрузку страницы при отправке', 'Чтобы очистить поля', 'Чтобы стилизовать форму'], options_en: ['To disable the form', 'To prevent page reload on submission', 'To clear the fields', 'To style the form'], correctIndex: 1, explanation_ru: 'По умолчанию submit перезагружает страницу. preventDefault позволяет обработать форму через JavaScript.', explanation_en: 'By default submit reloads the page. preventDefault lets you handle the form through JavaScript.' },
    { id: 'q5', text_ru: 'Какой инструмент используется для подсветки активного пункта навигации при скролле?', text_en: 'Which tool is used to highlight the active nav item while scrolling?', options_ru: ['setInterval', 'addEventListener("scroll")', 'IntersectionObserver', 'MutationObserver'], options_en: ['setInterval', 'addEventListener("scroll")', 'IntersectionObserver', 'MutationObserver'], correctIndex: 2, explanation_ru: 'IntersectionObserver эффективно отслеживает когда секции попадают в поле зрения без нагрузки от scroll-событий.', explanation_en: 'IntersectionObserver efficiently tracks when sections enter the viewport without the overhead of scroll events.' },
  ],
}
