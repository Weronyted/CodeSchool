import type { Lesson } from '@/types/lesson'

export const htmlSemantics: Lesson = {
  slug: 'html-semantics',
  category: 'HTML',
  readTime: 11,
  icon: '🏛️',
  title_ru: 'Семантический HTML',
  title_en: 'Semantic HTML',
  description_ru: 'Узнайте, зачем нужны семантические теги: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>. Как семантика влияет на SEO и доступность.',
  description_en: 'Learn why semantic tags matter: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>. How semantics affect SEO and accessibility.',
  sections: [
    { id: 'intro', title_ru: 'Что такое семантика', title_en: 'What Is Semantics' },
    { id: 'structure', title_ru: 'Структурные теги страницы', title_en: 'Page Structure Tags' },
    { id: 'content-tags', title_ru: 'Теги контентных блоков', title_en: 'Content Block Tags' },
    { id: 'inline-semantic', title_ru: 'Строчные семантические теги', title_en: 'Inline Semantic Tags' },
    { id: 'why-matters', title_ru: 'SEO и доступность', title_en: 'SEO and Accessibility' },
  ],
  slides: [
    {
      id: 'slide-title',
      type: 'title',
      title_ru: 'Семантический HTML',
      title_en: 'Semantic HTML',
      body_ru: 'Семантика — это смысл. Правильные теги рассказывают браузеру, поисковику и скринридеру, что означает каждый блок страницы.',
      body_en: 'Semantics means meaning. The right tags tell the browser, search engine, and screen reader what each block of the page means.',
    },
    {
      id: 'slide-analogy',
      type: 'analogy',
      title_ru: 'HTML как архитектурный план',
      title_en: 'HTML as an Architectural Blueprint',
      body_ru: 'Представьте дом: у него есть вход (header), коридор (nav), главная комната (main), кабинет (article), кладовка (aside) и выход (footer). Если везде написать "комната", план теряет смысл.',
      body_en: 'Imagine a house: it has an entrance (header), hallway (nav), living room (main), study (article), storage room (aside), and exit (footer). If everything is labeled "room", the blueprint loses meaning.',
      visual: {
        kind: 'emoji',
        emojis: ['🏛️', '🗺️', '♿'],
        caption_ru: 'Структура → смысл → доступность',
        caption_en: 'Structure → meaning → accessibility',
      },
      bullets: [
        { text_ru: '<header> — шапка: логотип, название, поиск', text_en: '<header> — top section: logo, title, search' },
        { text_ru: '<nav> — навигация: меню, ссылки', text_en: '<nav> — navigation: menus, links' },
        { text_ru: '<main> — главный контент страницы (один на страницу)', text_en: '<main> — primary page content (one per page)' },
        { text_ru: '<footer> — подвал: копирайт, контакты', text_en: '<footer> — bottom section: copyright, contacts' },
      ],
    },
    {
      id: 'slide-concept-structure',
      type: 'concept',
      title_ru: 'Структура типичной страницы',
      title_en: 'Typical Page Structure',
      body_ru: 'Семантические теги заменяют безликие <div> с классами вроде div.header и div.footer. Они несут встроенный смысл, понятный любому инструменту.',
      body_en: 'Semantic tags replace faceless <div> elements with classes like div.header and div.footer. They carry built-in meaning that any tool can understand.',
      code: `<body>
  <header>
    <a href="/" aria-label="На главную">
      <img src="logo.svg" alt="Логотип компании">
    </a>
    <nav>
      <ul>
        <li><a href="/about">О нас</a></li>
        <li><a href="/blog">Блог</a></li>
        <li><a href="/contact">Контакты</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article> ... </article>
    <aside> ... </aside>
  </main>

  <footer>
    <p>&copy; 2024 Компания. Все права защищены.</p>
  </footer>
</body>`,
      codeLang: 'html',
    },
    {
      id: 'slide-anim',
      type: 'code-anim',
      title_ru: 'Превращаем div-soup в семантику',
      title_en: 'Converting Div-Soup to Semantic HTML',
      body_ru: 'Посмотрите, как «суп из дивов» превращается в чистую семантическую структуру.',
      body_en: 'Watch how "div soup" is transformed into clean semantic structure.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<div class="header">
  <div class="logo">Сайт</div>
  <div class="menu">
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
  </div>
</div>
<div class="content">
  <div class="article">
    <div class="title">Заголовок статьи</div>
    <div class="text">Текст статьи...</div>
  </div>
</div>
<div class="footer">© 2024</div>`,
          comment_ru: 'Исходный div-soup — теги без смысла',
          comment_en: 'Original div soup — tags without meaning',
          preview: '<div style="font-family:sans-serif;font-size:13px;border:2px dashed #f87171;padding:8px;border-radius:4px"><div style="background:#fecaca;padding:4px 8px;margin-bottom:4px;border-radius:2px">div.header: Сайт | Главная | О нас</div><div style="background:#fef08a;padding:4px 8px;margin-bottom:4px;border-radius:2px">div.content > div.article: Заголовок | Текст...</div><div style="background:#fecaca;padding:4px 8px;border-radius:2px">div.footer: © 2024</div><p style="color:#ef4444;font-size:11px;margin:6px 0 0">Поисковик не знает, что есть что</p></div>',
        },
        {
          code: `<header>
  <span>Сайт</span>
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
  </nav>
</header>
<main>
  <div class="article">
    <div class="title">Заголовок статьи</div>
    <div class="text">Текст статьи...</div>
  </div>
</main>
<footer>© 2024</footer>`,
          comment_ru: 'Заменяем внешние div на header, main, footer',
          comment_en: 'Replace outer divs with header, main, footer',
          preview: '<div style="font-family:sans-serif;font-size:13px;border:2px solid #86efac;padding:8px;border-radius:4px"><header style="background:#dcfce7;padding:4px 8px;margin-bottom:4px;border-radius:2px"><strong>header</strong>: Сайт | <strong>nav</strong>: Главная | О нас</header><main style="background:#dbeafe;padding:4px 8px;margin-bottom:4px;border-radius:2px"><strong>main</strong> > div.article: Заголовок | Текст...</main><footer style="background:#dcfce7;padding:4px 8px;border-radius:2px"><strong>footer</strong>: © 2024</footer><p style="color:#16a34a;font-size:11px;margin:6px 0 0">Структура страницы понятна!</p></div>',
        },
        {
          code: `<header>
  <span>Сайт</span>
  <nav>
    <a href="/">Главная</a>
    <a href="/about">О нас</a>
  </nav>
</header>
<main>
  <article>
    <h1>Заголовок статьи</h1>
    <p>Текст статьи...</p>
    <time datetime="2024-03-15">15 марта 2024</time>
  </article>
</main>
<footer>© 2024</footer>`,
          comment_ru: 'Заменяем внутренние div на article, h1, p, time',
          comment_en: 'Replace inner divs with article, h1, p, time',
          preview: '<div style="font-family:sans-serif;font-size:13px;border:2px solid #6ee7b7;padding:8px;border-radius:4px"><header style="background:#d1fae5;padding:4px 8px;margin-bottom:4px;border-radius:2px"><strong>header</strong> + <strong>nav</strong></header><main style="background:#dbeafe;padding:4px 8px;margin-bottom:4px;border-radius:2px"><strong>main</strong> > <strong>article</strong>: <strong>h1</strong> + <strong>p</strong> + <strong>time</strong></main><footer style="background:#d1fae5;padding:4px 8px;border-radius:2px"><strong>footer</strong></footer><p style="color:#059669;font-size:11px;margin:6px 0 0">Полностью семантическая структура!</p></div>',
        },
      ],
    },
    {
      id: 'slide-concept-content',
      type: 'concept',
      title_ru: 'article, section и aside',
      title_en: 'article, section, and aside',
      body_ru: '<article> — самостоятельный контент, который можно вырвать из контекста (пост блога, новость). <section> — тематический раздел внутри страницы или статьи. <aside> — дополнительный контент, косвенно связанный с основным (сайдбар, реклама, биография автора).',
      body_en: '<article> — self-contained content that makes sense on its own (blog post, news item). <section> — a thematic section within a page or article. <aside> — supplementary content loosely related to the main content (sidebar, ad, author bio).',
      code: `<main>
  <article>
    <header>
      <h1>Введение в CSS Grid</h1>
      <time datetime="2024-06-01">1 июня 2024</time>
    </header>

    <section>
      <h2>Что такое Grid</h2>
      <p>CSS Grid — двумерная система...</p>
    </section>

    <section>
      <h2>Базовый синтаксис</h2>
      <p>Чтобы включить Grid...</p>
    </section>
  </article>

  <aside>
    <h2>Похожие статьи</h2>
    <ul>
      <li><a href="#">Flexbox за 10 минут</a></li>
      <li><a href="#">CSS-переменные</a></li>
    </ul>
  </aside>
</main>`,
      codeLang: 'html',
    },
    {
      id: 'slide-code-inline',
      type: 'code',
      title_ru: 'Строчные семантические теги',
      title_en: 'Inline Semantic Tags',
      body_ru: 'HTML предоставляет строчные теги с конкретным смыслом. Используйте их вместо <span> с классом.',
      body_en: 'HTML provides inline tags with specific meaning. Use them instead of <span> with a class.',
      code: `<!-- Время и дата — машиночитаемые -->
<time datetime="2024-12-31">31 декабря 2024</time>

<!-- Адрес контактной информации -->
<address>
  <a href="mailto:info@example.com">info@example.com</a>
  <br>
  <a href="tel:+79990000000">+7 999 000-00-00</a>
</address>

<!-- Аббревиатура с расшифровкой -->
<abbr title="HyperText Markup Language">HTML</abbr>

<!-- Выделение важного (семантическое) -->
<strong>Важно:</strong> сохраните файл перед закрытием.

<!-- Акцент (курсив с семантикой) -->
<em>никогда</em> не используйте таблицы для вёрстки

<!-- Цитата с источником -->
<blockquote cite="https://developer.mozilla.org">
  Семантика HTML имеет ключевое значение для доступности.
</blockquote>`,
      codeLang: 'html',
    },
    {
      id: 'slide-compare',
      type: 'compare',
      title_ru: 'Div-soup vs семантическая структура',
      title_en: 'Div-Soup vs Semantic Structure',
      body_ru: 'Оба варианта могут выглядеть одинаково в браузере, но сильно отличаются для инструментов, читающих код.',
      body_en: 'Both approaches may look identical in the browser, but differ greatly for tools that read the code.',
      compareLeft: {
        label_ru: 'Div-soup (плохо)',
        label_en: 'Div-soup (bad)',
        items_ru: [
          '<div class="header"> везде',
          'Поисковик не понимает иерархию',
          'Скринридер читает всё подряд',
          'Новый разработчик теряется в коде',
        ],
        items_en: [
          '<div class="header"> everywhere',
          'Search engine can\'t understand hierarchy',
          'Screen reader reads everything in sequence',
          'New developer gets lost in the code',
        ],
        color: 'red',
      },
      compareRight: {
        label_ru: 'Семантика (хорошо)',
        label_en: 'Semantics (good)',
        items_ru: [
          'Теги сами описывают свою роль',
          'Поисковик понимает структуру и ранжирует лучше',
          'Скринридер предлагает навигацию по landmark-ам',
          'Код читается как документ',
        ],
        items_en: [
          'Tags describe their own role',
          'Search engine understands structure and ranks better',
          'Screen reader offers navigation by landmarks',
          'Code reads like a document',
        ],
        color: 'green',
      },
    },
    {
      id: 'slide-tip',
      type: 'tip',
      title_ru: 'Совет: один <main> на страницу',
      title_en: 'Tip: One <main> Per Page',
      body_ru: 'Элемент <main> должен быть единственным на странице. Он указывает на основное содержимое — не на навигацию, не на шапку и не на рекламные баннеры. Скринридеры позволяют пользователям мгновенно перепрыгнуть к <main>, минуя повторяющиеся блоки.',
      body_en: 'The <main> element should appear only once per page. It points to the primary content — not navigation, not the header, and not ad banners. Screen readers let users instantly jump to <main>, skipping repetitive blocks.',
    },
    {
      id: 'slide-practice',
      type: 'practice-cta',
      title_ru: 'Пора практиковаться!',
      title_en: 'Time to Practice!',
      body_ru: 'Возьмите страницу из одних <div> и перепишите её с использованием семантических тегов: header, nav, main, article, aside, footer.',
      body_en: 'Take a page made entirely of <div> tags and rewrite it using semantic tags: header, nav, main, article, aside, footer.',
    },
  ],
  content: {
    intro_ru: 'Семантический HTML — это использование тегов в соответствии с их назначением. Вместо <div> везде — правильный тег для каждого смыслового блока. Это влияет на поисковую оптимизацию, доступность для людей с ограниченными возможностями и читаемость кода.',
    intro_en: 'Semantic HTML means using tags according to their purpose. Instead of <div> everywhere — the right tag for each meaningful block. This affects search engine optimization, accessibility for people with disabilities, and code readability.',
    blocks: [
      {
        sectionId: 'intro',
        heading_ru: 'Что такое семантика',
        heading_en: 'What Is Semantics',
        text_ru: 'Семантика в HTML означает использование тегов в соответствии с их смысловым назначением. До HTML5 разработчики использовали теги <div> и <span> для всего подряд: шапок, меню, статей, подвалов. Браузер не мог понять, что означает каждый блок, — он видел просто набор прямоугольников.\n\nHTML5 ввёл десятки тегов с встроенным смыслом: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>. Каждый тег «говорит» браузеру, поисковику и скринридеру, какую роль играет этот блок на странице. Это называется семантической разметкой.\n\nСемантический HTML решает три задачи одновременно. Первая — доступность: скринридеры предлагают пользователям навигацию по landmark-регионам. Вторая — SEO: поисковые роботы лучше понимают структуру и важность контента. Третья — читаемость кода: другой разработчик (или вы сами через полгода) сразу поймёт структуру страницы.',
        text_en: 'Semantics in HTML means using tags according to their intended meaning. Before HTML5, developers used <div> and <span> tags for everything: headers, menus, articles, footers. The browser could not understand what each block meant — it saw only a collection of rectangles.\n\nHTML5 introduced dozens of tags with built-in meaning: <header>, <nav>, <main>, <article>, <section>, <aside>, <footer>. Each tag "tells" the browser, search engine, and screen reader what role that block plays on the page. This is called semantic markup.\n\nSemantic HTML solves three problems at once. First — accessibility: screen readers offer users navigation by landmark regions. Second — SEO: search engine crawlers better understand content structure and importance. Third — code readability: another developer (or you yourself six months later) immediately grasps the page structure.',
        code: `<!-- До HTML5: div-soup без смысла -->
<div class="header">
  <div class="nav">...</div>
</div>
<div class="main-content">
  <div class="article">...</div>
</div>
<div class="footer">...</div>

<!-- HTML5: семантическая разметка -->
<header>
  <nav>...</nav>
</header>
<main>
  <article>...</article>
</main>
<footer>...</footer>`,
        codeLang: 'html',
      },
      {
        sectionId: 'structure',
        heading_ru: 'Структурные теги: header, nav, main, footer',
        heading_en: 'Structural Tags: header, nav, main, footer',
        text_ru: '<header> — вводный контент раздела или страницы: логотип, заголовок, поиск. Может встречаться несколько раз (у статьи тоже может быть header). <nav> — навигационные ссылки. <main> — единственный блок основного содержимого страницы. <footer> — завершающий контент: авторство, ссылки, копирайт.',
        text_en: '<header> — introductory content for a section or page: logo, title, search. Can appear multiple times (an article can have its own header). <nav> — navigational links. <main> — the single block of primary page content. <footer> — closing content: authorship, links, copyright.',
        code: `<body>
  <header>
    <img src="logo.svg" alt="Логотип">
    <nav aria-label="Основная навигация">
      <ul>
        <li><a href="/">Главная</a></li>
        <li><a href="/blog">Блог</a></li>
      </ul>
    </nav>
  </header>

  <main id="main-content">
    <!-- Основной контент -->
  </main>

  <footer>
    <address>
      Контакт: <a href="mailto:hi@example.com">hi@example.com</a>
    </address>
    <p><small>&copy; 2024 Все права защищены</small></p>
  </footer>
</body>`,
        codeLang: 'html',
      },
      {
        sectionId: 'content-tags',
        heading_ru: 'article, section, aside',
        heading_en: 'article, section, aside',
        text_ru: 'Вопрос "article или section" решается просто: если блок имеет смысл вне контекста страницы (его можно синдицировать в RSS, поделиться ссылкой) — это article. Если блок является частью большего целого — section. aside содержит контент, дополняющий основной, но не обязательный для его понимания.',
        text_en: 'The "article or section" question is simple: if a block makes sense outside the page context (it can be syndicated in RSS, shared via link) — it\'s an article. If the block is part of a larger whole — section. aside contains content that complements the main content but is not essential to understanding it.',
        code: `<main>
  <article itemscope itemtype="https://schema.org/BlogPosting">
    <h1 itemprop="headline">Заголовок поста</h1>
    <time itemprop="datePublished" datetime="2024-03-15">
      15 марта 2024
    </time>

    <section aria-labelledby="intro-heading">
      <h2 id="intro-heading">Введение</h2>
      <p>Первый раздел статьи...</p>
    </section>

    <section aria-labelledby="body-heading">
      <h2 id="body-heading">Основная часть</h2>
      <p>Второй раздел статьи...</p>
    </section>
  </article>

  <aside aria-label="Похожие материалы">
    <h2>Читайте также</h2>
    <nav>
      <ul>
        <li><a href="#">Статья 1</a></li>
        <li><a href="#">Статья 2</a></li>
      </ul>
    </nav>
  </aside>
</main>`,
        codeLang: 'html',
      },
      {
        sectionId: 'inline-semantic',
        heading_ru: 'Строчные теги с семантикой',
        heading_en: 'Inline Tags with Semantics',
        text_ru: '<time datetime="..."> позволяет машинам понять дату, даже если пользователю показан другой формат. <address> предназначен для контактной информации автора или организации. <abbr title="..."> расшифровывает аббревиатуру. <strong> означает высокую важность (не просто жирный шрифт). <em> означает акцент (не просто курсив).',
        text_en: '<time datetime="..."> lets machines understand the date even when a different format is shown to the user. <address> is for contact information of an author or organization. <abbr title="..."> expands an abbreviation. <strong> means high importance (not just bold). <em> means emphasis (not just italic).',
        code: `<p>
  Статья опубликована
  <time datetime="2024-06-15T10:30:00+03:00">
    15 июня 2024 в 10:30
  </time>
  автором <strong>Иваном Петровым</strong>.
</p>

<p>
  <abbr title="Application Programming Interface">API</abbr>
  — это интерфейс для программного взаимодействия.
</p>

<p>
  <em>Никогда</em> не храните пароли в открытом виде.
</p>`,
        codeLang: 'html',
      },
      {
        sectionId: 'why-matters',
        heading_ru: 'Почему семантика важна: SEO и a11y',
        heading_en: 'Why Semantics Matter: SEO and a11y',
        text_ru: 'Поисковые роботы используют семантические теги для понимания иерархии и важности контента. Заголовки h1–h6 сигнализируют о структуре. Скринридеры (программы для слепых пользователей) воспроизводят страницу на основе семантики: они предлагают навигацию по landmark-регионам (header, nav, main, aside, footer), по заголовкам, по ссылкам.',
        text_en: 'Search engine crawlers use semantic tags to understand content hierarchy and importance. Headings h1–h6 signal structure. Screen readers (software for blind users) render the page based on semantics: they offer navigation by landmark regions (header, nav, main, aside, footer), by headings, and by links.',
        code: `<!-- Пропуск к основному контенту — критично для a11y -->
<a href="#main-content" class="skip-link">
  Перейти к основному контенту
</a>

<header>...</header>
<nav aria-label="Главное меню">...</nav>

<main id="main-content" tabindex="-1">
  <h1>Заголовок страницы</h1>
  <!-- Контент -->
</main>`,
        codeLang: 'html',
      },
    ],
  },
  editorTask: {
    title_ru: 'Разметьте страницу блога семантически',
    title_en: 'Mark Up a Blog Page Semantically',
    instructions_ru: 'Перепишите данный код, заменив все <div> на подходящие семантические теги. Добавьте <header> с <nav>, <main> с <article>, <aside> и <footer>. Используйте <time> для даты публикации.',
    instructions_en: 'Rewrite the given code, replacing all <div> tags with appropriate semantic tags. Add <header> with <nav>, <main> with <article>, <aside>, and <footer>. Use <time> for the publication date.',
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Мой блог</title>
</head>
<body>

  <!-- Замените div на семантические теги -->

  <div class="header">
    <div class="logo">МойБлог</div>
    <div class="navigation">
      <a href="/">Главная</a>
      <a href="/about">Обо мне</a>
      <a href="/contact">Контакты</a>
    </div>
  </div>

  <div class="main">
    <div class="post">
      <div class="post-title">Моя первая статья</div>
      <div class="post-date">20 мая 2026</div>
      <div class="post-text">
        Это моя первая статья в блоге. Здесь я буду
        делиться мыслями о веб-разработке.
      </div>
    </div>

    <div class="sidebar">
      <div class="sidebar-title">Популярные посты</div>
      <a href="#">Введение в HTML</a>
      <a href="#">Основы CSS</a>
    </div>
  </div>

  <div class="footer">
    <div class="copyright">© 2026 МойБлог</div>
  </div>

</body>
</html>`,
    },
    hints_ru: [
      'div.header → <header>, div.navigation → <nav> с <ul> и <li>',
      'div.main → <main>, div.post → <article> с <h1> для заголовка',
      'div.post-date → <time datetime="2026-05-20">20 мая 2026</time>',
      'div.sidebar → <aside>, div.footer → <footer>',
    ],
    hints_en: [
      'div.header → <header>, div.navigation → <nav> with <ul> and <li>',
      'div.main → <main>, div.post → <article> with <h1> for the title',
      'div.post-date → <time datetime="2026-05-20">20 May 2026</time>',
      'div.sidebar → <aside>, div.footer → <footer>',
    ],
  },
  keyTerms: [
    {
      term_ru: 'Семантика HTML',
      term_en: 'HTML Semantics',
      definition_ru: 'Использование HTML-тегов в соответствии с их смысловым назначением, а не только для визуального оформления.',
      definition_en: 'Using HTML tags according to their intended meaning, not just for visual styling.',
    },
    {
      term_ru: 'Landmark-регионы',
      term_en: 'Landmark Regions',
      definition_ru: 'Семантические элементы (header, nav, main, aside, footer), по которым скринридеры позволяют быстро перемещаться по странице.',
      definition_en: 'Semantic elements (header, nav, main, aside, footer) that screen readers use to offer quick page navigation.',
    },
    {
      term_ru: '<article>',
      term_en: '<article>',
      definition_ru: 'Самостоятельный блок контента, понятный вне контекста страницы: пост блога, новость, комментарий, виджет.',
      definition_en: 'Self-contained content meaningful outside the page context: a blog post, news article, comment, or widget.',
      example_ru: '<article><h1>Заголовок</h1><p>Текст</p></article>',
      example_en: '<article><h1>Title</h1><p>Content</p></article>',
    },
    {
      term_ru: '<aside>',
      term_en: '<aside>',
      definition_ru: 'Дополнительный контент, косвенно связанный с основным: сайдбар, вставная цитата, биография автора.',
      definition_en: 'Supplementary content loosely related to the main: a sidebar, pull quote, or author bio.',
    },
    {
      term_ru: '<time>',
      term_en: '<time>',
      definition_ru: 'Строчный тег для дат и времени. Атрибут datetime содержит машиночитаемый формат ISO 8601, а содержимое — текст для пользователя.',
      definition_en: 'An inline tag for dates and times. The datetime attribute holds machine-readable ISO 8601 format, and the content holds the user-facing text.',
      example_ru: '<time datetime="2024-12-31">31 декабря</time>',
      example_en: '<time datetime="2024-12-31">December 31</time>',
    },
  ],
  didYouKnow: [
    {
      text_ru: 'По данным WebAIM, более 96% главных страниц популярных сайтов содержат ошибки доступности. Большинство из них можно устранить правильным использованием семантических тегов.',
      text_en: 'According to WebAIM, over 96% of home pages of popular websites contain accessibility errors. Most of them can be fixed by correctly using semantic tags.',
    },
    {
      text_ru: 'Google использует семантическую структуру страницы для понимания её контента. Правильно размеченная страница с заголовками h1–h3, nav и article имеет преимущество в поисковой выдаче перед страницей из одних div.',
      text_en: 'Google uses a page\'s semantic structure to understand its content. A properly marked-up page with h1–h3 headings, nav, and article has a search ranking advantage over a page made entirely of divs.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      text_ru: 'Сколько элементов <main> должно быть на одной HTML-странице?',
      text_en: 'How many <main> elements should there be on a single HTML page?',
      options_ru: ['Сколько угодно', 'Не более двух', 'Ровно один', 'Ни одного'],
      options_en: ['As many as needed', 'No more than two', 'Exactly one', 'None'],
      correctIndex: 2,
      explanation_ru: '<main> должен быть единственным на странице. Он обозначает основной контент — то, ради чего пользователь пришёл на страницу.',
      explanation_en: '<main> must appear only once per page. It marks the primary content — what the user came to the page for.',
    },
    {
      id: 'q2',
      text_ru: 'Какой тег лучше всего подходит для публикации блога, которую можно читать отдельно от сайта?',
      text_en: 'Which tag best suits a blog post that can be read independently from the site?',
      options_ru: ['<section>', '<div>', '<article>', '<aside>'],
      options_en: ['<section>', '<div>', '<article>', '<aside>'],
      correctIndex: 2,
      explanation_ru: '<article> — для самостоятельного контента, понятного вне контекста. Пост блога — классический пример.',
      explanation_en: '<article> — for self-contained content meaningful outside context. A blog post is the classic example.',
    },
    {
      id: 'q3',
      text_ru: 'Как правильно разметить машиночитаемую дату?',
      text_en: 'How should a machine-readable date be marked up?',
      options_ru: [
        '<span class="date">2024-06-15</span>',
        '<time datetime="2024-06-15">15 июня 2024</time>',
        '<date>2024-06-15</date>',
        '<p datetime="2024-06-15">15 июня</p>',
      ],
      options_en: [
        '<span class="date">2024-06-15</span>',
        '<time datetime="2024-06-15">June 15, 2024</time>',
        '<date>2024-06-15</date>',
        '<p datetime="2024-06-15">June 15</p>',
      ],
      correctIndex: 1,
      explanation_ru: '<time datetime="ISO-формат"> содержит машиночитаемую дату в атрибуте и читаемый текст для пользователя внутри тега.',
      explanation_en: '<time datetime="ISO-format"> holds the machine-readable date in the attribute and user-facing text inside the tag.',
    },
    {
      id: 'q4',
      text_ru: 'Какую пользу даёт семантический HTML для доступности?',
      text_en: 'What accessibility benefit does semantic HTML provide?',
      options_ru: [
        'Делает текст крупнее для слабовидящих',
        'Скринридеры предлагают навигацию по landmark-регионам',
        'Автоматически добавляет подписи к изображениям',
        'Переводит страницу на язык пользователя',
      ],
      options_en: [
        'Makes text larger for the visually impaired',
        'Screen readers offer navigation by landmark regions',
        'Automatically adds captions to images',
        'Translates the page to the user\'s language',
      ],
      correctIndex: 1,
      explanation_ru: 'Скринридеры позволяют пользователям перемещаться по landmark-регионам (header, nav, main, aside, footer), пропуская повторяющийся контент.',
      explanation_en: 'Screen readers let users navigate by landmark regions (header, nav, main, aside, footer), skipping repetitive content.',
    },
    {
      id: 'q5',
      text_ru: 'В чём разница между <section> и <article>?',
      text_en: 'What is the difference between <section> and <article>?',
      options_ru: [
        '<section> для текста, <article> для изображений',
        '<article> — самостоятельный контент; <section> — тематический раздел целого',
        '<section> — один на страницу, <article> — несколько',
        'Разницы нет, оба заменяют <div>',
      ],
      options_en: [
        '<section> is for text, <article> is for images',
        '<article> — standalone content; <section> — thematic part of a whole',
        '<section> — one per page, <article> — multiple',
        'No difference, both replace <div>',
      ],
      correctIndex: 1,
      explanation_ru: '<article> имеет смысл сам по себе и может существовать независимо. <section> — часть более крупного блока контента, не самостоятельна.',
      explanation_en: '<article> makes sense on its own and can exist independently. <section> is part of a larger content block and is not standalone.',
    },
  ],
}
