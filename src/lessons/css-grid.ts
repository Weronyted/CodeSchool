import type { Lesson } from '@/types/lesson'

export const cssGrid: Lesson = {
  slug: 'css-grid',
  category: 'CSS',
  readTime: 10,
  icon: '🔲',

  title_ru: 'CSS Grid: двумерные раскладки',
  title_en: 'CSS Grid: two-dimensional layouts',

  description_ru: 'display:grid, grid-template-columns, fr, gap, span, grid-area — строй сложные раскладки за минуты.',
  description_en: 'display:grid, grid-template-columns, fr, gap, span, grid-area — build complex layouts in minutes.',

  sections: [
    { id: 'what-is-grid',    title_ru: 'Что такое Grid',              title_en: 'What is Grid' },
    { id: 'columns-rows',    title_ru: 'Колонки и строки',            title_en: 'Columns and rows' },
    { id: 'fr-unit',         title_ru: 'Единица fr',                  title_en: 'The fr unit' },
    { id: 'span-area',       title_ru: 'Span и grid-area',            title_en: 'Span and grid-area' },
    { id: 'autofill',        title_ru: 'auto-fill и auto-fit',        title_en: 'auto-fill and auto-fit' },
    { id: 'key-terms',       title_ru: 'Ключевые термины',            title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'CSS Grid — мощь двумерных раскладок',
      title_en: 'CSS Grid — the power of two-dimensional layouts',
      body_ru: 'Flexbox отлично справляется с одной осью. Но когда нужна сетка — строки и колонки одновременно — CSS Grid незаменим. Это самая мощная система раскладки в CSS.',
      body_en: 'Flexbox works great for one axis. But when you need a grid — rows and columns at the same time — CSS Grid is indispensable. It is the most powerful layout system in CSS.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Grid как таблица Excel',
      title_en: 'Grid like an Excel spreadsheet',
      body_ru: 'CSS Grid — это как таблица. Есть строки и колонки. Ячейка может занимать несколько колонок или строк (как объединение ячеек в Excel). Ты задаёшь структуру — браузер расставляет элементы.',
      body_en: 'CSS Grid is like a spreadsheet. There are rows and columns. A cell can span multiple columns or rows (like merging cells in Excel). You define the structure — the browser places elements.',
      visual: {
        kind: 'emoji',
        emojis: ['🔲', '📊', '📐'],
      },
      bullets: [
        { text_ru: '🔲 Grid — двумерная раскладка (строки + колонки)', text_en: '🔲 Grid — two-dimensional layout (rows + columns)' },
        { text_ru: '📊 Элемент может занимать несколько ячеек (span)', text_en: '📊 An element can span multiple cells (span)' },
        { text_ru: '📐 Браузер сам расставляет элементы по сетке', text_en: '📐 Browser places elements automatically in the grid' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'grid-template-columns и grid-template-rows',
      title_en: 'grid-template-columns and grid-template-rows',
      body_ru: 'grid-template-columns задаёт количество и ширину колонок. Каждое значение — одна колонка. grid-template-rows — то же для строк.',
      body_en: 'grid-template-columns sets the number and width of columns. Each value is one column. grid-template-rows — the same for rows.',
      bullets: [
        { text_ru: 'grid-template-columns: 200px 1fr 200px — три колонки', text_en: 'grid-template-columns: 200px 1fr 200px — three columns' },
        { text_ru: 'repeat(3, 1fr) = 1fr 1fr 1fr — сокращение', text_en: 'repeat(3, 1fr) = 1fr 1fr 1fr — shorthand' },
        { text_ru: 'fr — дробная единица, делит свободное место', text_en: 'fr — fractional unit, divides free space' },
        { text_ru: 'gap — отступы между ячейками сетки', text_en: 'gap — spacing between grid cells' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Строим трёхколоночную сетку',
      title_en: 'Building a three-column grid layout',
      body_ru: 'Смотри как шаг за шагом создаётся страница с header, sidebar, content и footer.',
      body_en: 'Watch a page with header, sidebar, content and footer being built step by step.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<div class="grid">
  <header>Header</header>
  <aside>Sidebar</aside>
  <main>Content</main>
  <footer>Footer</footer>
</div>
<style>
.grid { display: grid; }
</style>`,
          comment_ru: '1. display:grid — блоки пока в колонку (по умолчанию 1 колонка)',
          comment_en: '1. display:grid — blocks are stacked (1 column by default)',
          preview: 'Header\nSidebar\nContent\nFooter',
        },
        {
          code: `<style>
.grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 16px;
}
</style>`,
          comment_ru: '2. Две колонки: 200px sidebar + 1fr контент',
          comment_en: '2. Two columns: 200px sidebar + 1fr content',
          preview: 'Header  Header\nSidebar | Content\nFooter  Footer',
        },
        {
          code: `<style>
.grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 60px;
  gap: 16px;
  min-height: 100vh;
}
</style>`,
          comment_ru: '3. Добавляем строки: header 60px, content auto, footer 60px',
          comment_en: '3. Add rows: header 60px, content auto, footer 60px',
          preview: '[====Header====]\n[Sidebar|Content]\n[====Footer====]',
        },
        {
          code: `<style>
.grid {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-rows: 60px 1fr 60px;
  gap: 16px;
  min-height: 100vh;
}
header, footer {
  grid-column: 1 / -1; /* занять все колонки */
}
</style>`,
          comment_ru: '4. header и footer на всю ширину — grid-column: 1/-1',
          comment_en: '4. header and footer span full width — grid-column: 1/-1',
          preview: '[========Header========]\n[Sidebar  |   Content  ]\n[========Footer========]',
        },
      ],
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'fr — дробная единица',
      title_en: 'fr — fractional unit',
      body_ru: 'fr (fraction) делит оставшееся свободное место. 1fr 2fr — первая колонка 1/3, вторая 2/3. repeat(3, 1fr) — три равные колонки. Очень удобно для адаптивных сеток.',
      body_en: 'fr (fraction) divides remaining free space. 1fr 2fr — first column 1/3, second 2/3. repeat(3, 1fr) — three equal columns. Very convenient for responsive grids.',
      bullets: [
        { text_ru: 'repeat(3, 1fr) — три равные колонки', text_en: 'repeat(3, 1fr) — three equal columns' },
        { text_ru: '1fr 2fr — первая 1/3, вторая 2/3 оставшегося места', text_en: '1fr 2fr — first 1/3, second 2/3 of remaining space' },
        { text_ru: '200px 1fr — фиксированная + гибкая колонка', text_en: '200px 1fr — fixed + flexible column' },
        { text_ru: 'fr считается после вычета фиксированных размеров и gap', text_en: 'fr is calculated after subtracting fixed sizes and gap' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'grid-column span и grid-area',
      title_en: 'grid-column span and grid-area',
      body_ru: 'Элемент может занимать несколько ячеек с помощью span или именованных областей.',
      body_en: 'An element can span multiple cells using span or named areas.',
      code: `/* span — занять несколько ячеек */
.hero {
  grid-column: 1 / 3;      /* с 1 по 3 линию */
  /* или: */
  grid-column: span 2;     /* занять 2 колонки */
}

/* grid-template-areas — именованные зоны */
.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  gap: 16px;
}

header  { grid-area: header; }
.sidebar { grid-area: sidebar; }
main     { grid-area: content; }
footer   { grid-area: footer; }`,
      codeLang: 'css',
    },
    {
      id: 's7',
      type: 'compare',
      title_ru: 'Flexbox (1D) vs Grid (2D)',
      title_en: 'Flexbox (1D) vs Grid (2D)',
      body_ru: 'Выбор между Flexbox и Grid зависит от задачи. Они прекрасно дополняют друг друга.',
      body_en: 'The choice between Flexbox and Grid depends on the task. They complement each other perfectly.',
      compareLeft: {
        label_ru: 'Flexbox — одна ось',
        label_en: 'Flexbox — one axis',
        items_ru: [
          'Работает в одном направлении',
          'Идеален для навигации, кнопок',
          'Элементы выравниваются по оси',
          'Контент управляет размером',
          'Проще для маленьких компонентов',
        ],
        items_en: [
          'Works in one direction',
          'Ideal for navigation, buttons',
          'Elements align along an axis',
          'Content drives the size',
          'Simpler for small components',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'Grid — две оси',
        label_en: 'Grid — two axes',
        items_ru: [
          'Работает по строкам И колонкам',
          'Идеален для страниц, дашбордов',
          'Ячейки занимают несколько строк/столбцов',
          'Структура управляет размером',
          'Мощнее для сложных раскладок',
        ],
        items_en: [
          'Works in rows AND columns',
          'Ideal for pages, dashboards',
          'Cells can span rows/columns',
          'Structure drives the size',
          'More powerful for complex layouts',
        ],
        color: 'green',
      },
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'auto-fill и auto-fit — магические значения для адаптивных сеток без медиа-запросов: grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)). Это создаёт столько колонок по 200px, сколько помещается, и автоматически переносит на новую строку!',
      body_en: 'auto-fill and auto-fit are magic values for responsive grids without media queries: grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)). This creates as many 200px columns as fit and automatically wraps to a new row!',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Строй сетки!',
      title_en: 'Build grids!',
      body_ru: 'Создай раскладку страницы: header на всю ширину, sidebar + content, footer на всю ширину. Используй grid-template-areas для именованных зон.',
      body_en: 'Build a page layout: full-width header, sidebar + content, full-width footer. Use grid-template-areas for named zones.',
    },
  ],

  content: {
    intro_ru: `CSS Grid — система двумерной раскладки. В отличие от Flexbox, который работает
по одной оси, Grid управляет строками и колонками одновременно. Это делает его
незаменимым для создания страниц, дашбордов и любых сложных интерфейсов.
display: grid — и ты командуешь всей структурой страницы.`,
    intro_en: `CSS Grid is a two-dimensional layout system. Unlike Flexbox which works along
one axis, Grid manages rows and columns at the same time. This makes it indispensable
for building pages, dashboards, and any complex interfaces.
display: grid — and you command the entire page structure.`,

    blocks: [
      {
        sectionId: 'what-is-grid',
        heading_ru: 'Что такое Grid',
        heading_en: 'What is Grid',
        text_ru: `Grid создаёт сетку из строк и колонок.
display: grid — активировать Grid на контейнере.
Все прямые дети — grid-элементы.
Браузер автоматически расставляет их по ячейкам сетки.`,
        text_en: `Grid creates a grid of rows and columns.
display: grid — activate Grid on the container.
All direct children are grid items.
The browser places them automatically into grid cells.`,
        code: `.container {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr; /* 3 колонки */
  gap: 16px;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'columns-rows',
        heading_ru: 'Колонки и строки',
        heading_en: 'Columns and rows',
        text_ru: `grid-template-columns — задаёт колонки.
grid-template-rows — задаёт строки (необязательно, браузер создаёт автоматически).
repeat(N, размер) — сокращение для N одинаковых колонок.
minmax(min, max) — колонка с минимальным и максимальным размером.`,
        text_en: `grid-template-columns — defines columns.
grid-template-rows — defines rows (optional, browser creates automatically).
repeat(N, size) — shorthand for N identical columns.
minmax(min, max) — column with minimum and maximum size.`,
        code: `/* 3 равные колонки */
.grid { grid-template-columns: repeat(3, 1fr); }

/* Sidebar + content */
.layout {
  grid-template-columns: 240px 1fr;
  grid-template-rows: 64px auto 64px;
}

/* Адаптивная сетка */
.responsive {
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'fr-unit',
        heading_ru: 'Единица fr',
        heading_en: 'The fr unit',
        text_ru: `fr (fraction) — дробная единица, делит оставшееся пространство.
1fr 1fr 1fr = три равные доли.
2fr 1fr = первая занимает 2/3, вторая 1/3.
200px 1fr = фиксированная боковая + гибкая основная.
fr вычисляется после gap и фиксированных размеров.`,
        text_en: `fr (fraction) — fractional unit, divides remaining space.
1fr 1fr 1fr = three equal shares.
2fr 1fr = first takes 2/3, second 1/3.
200px 1fr = fixed sidebar + flexible main area.
fr is calculated after gap and fixed sizes are subtracted.`,
        code: `/* Три равные колонки */
.grid { grid-template-columns: 1fr 1fr 1fr; }
/* то же самое */
.grid { grid-template-columns: repeat(3, 1fr); }

/* Sidebar 200px + main всё остальное */
.page { grid-template-columns: 200px 1fr; }

/* 2/3 + 1/3 */
.split { grid-template-columns: 2fr 1fr; }`,
        codeLang: 'css',
      },
      {
        sectionId: 'span-area',
        heading_ru: 'Span и grid-area',
        heading_en: 'Span and grid-area',
        text_ru: `grid-column: span N — занять N колонок.
grid-row: span N — занять N строк.
grid-column: 1 / -1 — от первой линии до последней (вся ширина).

grid-template-areas — именованная схема сетки.
grid-area — назначить элемент в именованную зону.`,
        text_en: `grid-column: span N — span N columns.
grid-row: span N — span N rows.
grid-column: 1 / -1 — from first line to last (full width).

grid-template-areas — named grid layout.
grid-area — assign element to a named zone.`,
        code: `.featured {
  grid-column: span 2;  /* занять 2 колонки */
  grid-row: span 2;     /* занять 2 строки */
}

.full-width {
  grid-column: 1 / -1;  /* вся ширина */
}

/* Именованные области */
.page {
  grid-template-areas:
    "header header"
    "nav    main"
    "footer footer";
}
header { grid-area: header; }`,
        codeLang: 'css',
      },
      {
        sectionId: 'autofill',
        heading_ru: 'auto-fill и auto-fit',
        heading_en: 'auto-fill and auto-fit',
        text_ru: `auto-fill создаёт максимально возможное количество колонок заданного размера.
auto-fit делает то же, но растягивает колонки если их меньше, чем нужно.
minmax(200px, 1fr) — минимум 200px, максимум 1fr.
Вместе они создают адаптивную сетку без медиа-запросов.`,
        text_en: `auto-fill creates as many columns of the given size as possible.
auto-fit does the same but stretches columns if there are fewer than needed.
minmax(200px, 1fr) — minimum 200px, maximum 1fr.
Together they create a responsive grid without media queries.`,
        code: `/* Адаптивная сетка без @media */
.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 20px;
}

/* auto-fill: сохраняет пустые колонки */
/* auto-fit:  схлопывает пустые колонки */`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: страница с Grid',
    title_en: 'Try it yourself: page with Grid',
    instructions_ru: `Создай раскладку страницы:
— Header на всю ширину
— Sidebar (200px) + основной контент
— Footer на всю ширину
— gap: 16px
Используй grid-template-areas для наглядности.
Бонус: добавь адаптивную сетку карточек внутри контента`,
    instructions_en: `Build a page layout:
— Full-width header
— Sidebar (200px) + main content
— Full-width footer
— gap: 16px
Use grid-template-areas for clarity.
Bonus: add a responsive card grid inside the content`,
    activeTabs: ['html', 'css'],
    starterCode: {
      html: `<div class="page">
  <header class="header">
    <h1>Мой сайт</h1>
  </header>

  <nav class="sidebar">
    <h3>Меню</h3>
    <ul>
      <li>Главная</li>
      <li>Статьи</li>
      <li>О нас</li>
    </ul>
  </nav>

  <main class="content">
    <h2>Добро пожаловать!</h2>
    <div class="card-grid">
      <div class="card">Статья 1</div>
      <div class="card">Статья 2</div>
      <div class="card">Статья 3</div>
      <div class="card">Статья 4</div>
      <div class="card">Статья 5</div>
      <div class="card">Статья 6</div>
    </div>
  </main>

  <footer class="footer">
    <p>© 2026 Мой сайт</p>
  </footer>
</div>`,
      css: `body { margin: 0; font-family: sans-serif; background: #f8fafc; }

.page {
  display: grid;
  grid-template-columns: 200px 1fr;
  grid-template-areas:
    "header  header"
    "sidebar content"
    "footer  footer";
  gap: 16px;
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
}

.header {
  grid-area: header;
  background: #1e293b;
  color: white;
  padding: 16px 24px;
  border-radius: 8px;
}

.header h1 { margin: 0; font-size: 1.25rem; }

.sidebar {
  grid-area: sidebar;
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.sidebar h3 { margin: 0 0 12px; color: #0f172a; }
.sidebar ul { list-style: none; padding: 0; margin: 0; }
.sidebar li { padding: 8px 0; color: #475569; cursor: pointer; }
.sidebar li:hover { color: #3b82f6; }

.content {
  grid-area: content;
  background: white;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e2e8f0;
}

.content h2 { margin: 0 0 16px; color: #0f172a; }

.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
}

.card {
  background: #f1f5f9;
  padding: 16px;
  border-radius: 8px;
  text-align: center;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.footer {
  grid-area: footer;
  background: #1e293b;
  color: #94a3b8;
  padding: 16px 24px;
  border-radius: 8px;
  text-align: center;
}

.footer p { margin: 0; }`,
    },
    hints_ru: [
      'grid-template-areas использует строки с именами в кавычках. Одно и то же имя в нескольких ячейках — элемент занимает их все.',
      'repeat(auto-fill, minmax(160px, 1fr)) — создаёт столько колонок по 160px, сколько влезает, без медиа-запросов.',
    ],
    hints_en: [
      'grid-template-areas uses quoted strings with names. The same name in multiple cells — the element spans all of them.',
      'repeat(auto-fill, minmax(160px, 1fr)) — creates as many 160px columns as fit, without media queries.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'display: grid', term_en: 'display: grid',
      definition_ru: 'Активирует CSS Grid на контейнере. Прямые дети становятся grid-элементами.',
      definition_en: 'Activates CSS Grid on the container. Direct children become grid items.',
      example_ru: '.page { display: grid; }',
      example_en: '.page { display: grid; }',
    },
    {
      term_ru: 'grid-template-columns', term_en: 'grid-template-columns',
      definition_ru: 'Задаёт количество и ширину колонок сетки.',
      definition_en: 'Defines the number and width of grid columns.',
      example_ru: 'grid-template-columns: repeat(3, 1fr);',
      example_en: 'grid-template-columns: repeat(3, 1fr);',
    },
    {
      term_ru: 'fr (fraction)', term_en: 'fr (fraction)',
      definition_ru: 'Дробная единица — доля свободного пространства после вычета фиксированных размеров.',
      definition_en: 'Fractional unit — share of free space after subtracting fixed sizes.',
      example_ru: '1fr 2fr — первая 1/3, вторая 2/3',
      example_en: '1fr 2fr — first 1/3, second 2/3',
    },
    {
      term_ru: 'grid-column: span', term_en: 'grid-column: span',
      definition_ru: 'Позволяет элементу занять несколько колонок или строк.',
      definition_en: 'Allows an element to span multiple columns or rows.',
      example_ru: 'grid-column: span 2; /* занять 2 колонки */',
      example_en: 'grid-column: span 2; /* span 2 columns */',
    },
    {
      term_ru: 'grid-template-areas', term_en: 'grid-template-areas',
      definition_ru: 'Именованная схема сетки. Задаёт зоны через строки с именами.',
      definition_en: 'Named grid layout. Defines zones through quoted rows of names.',
      example_ru: '"header header" "sidebar content"',
      example_en: '"header header" "sidebar content"',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'CSS Grid поддерживается всеми современными браузерами с 2017 года. До него разработчики создавали сложные раскладки через CSS-фреймворки (Bootstrap) с их системой из 12 колонок. Grid делает всё это нативно, без лишних классов.',
      text_en: 'CSS Grid has been supported in all modern browsers since 2017. Before it developers built complex layouts using CSS frameworks (Bootstrap) with their 12-column grid systems. Grid does all of that natively, without extra classes.',
    },
    {
      text_ru: 'grid-column: 1 / -1 — трюк "отрицательная линия". -1 всегда означает последнюю линию сетки, независимо от количества колонок. Это позволяет растянуть элемент на всю ширину, не зная заранее количество колонок.',
      text_en: 'grid-column: 1 / -1 is the "negative line" trick. -1 always means the last grid line, regardless of how many columns there are. This lets you stretch an element to full width without knowing the column count in advance.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что задаёт grid-template-columns: repeat(3, 1fr)?',
      text_en: 'What does grid-template-columns: repeat(3, 1fr) create?',
      options_ru: [
        '3 строки одинаковой высоты',
        '3 равные колонки',
        '3-пиксельный отступ между колонками',
        'Колонку шириной 3fr',
      ],
      options_en: [
        '3 rows of equal height',
        '3 equal columns',
        '3-pixel gap between columns',
        'A column with width 3fr',
      ],
      correctIndex: 1,
      explanation_ru: 'repeat(3, 1fr) — сокращение для 1fr 1fr 1fr. Три колонки, каждая занимает равную долю свободного пространства.',
      explanation_en: 'repeat(3, 1fr) is shorthand for 1fr 1fr 1fr. Three columns, each taking an equal share of free space.',
    },
    {
      id: 'q2',
      text_ru: 'Что означает единица fr?',
      text_en: 'What does the fr unit mean?',
      options_ru: [
        'Фиксированные пиксели',
        'Дробная часть свободного пространства',
        'Font-relative размер',
        'Процент от родителя',
      ],
      options_en: [
        'Fixed pixels',
        'Fractional share of free space',
        'Font-relative size',
        'Percentage of the parent',
      ],
      correctIndex: 1,
      explanation_ru: 'fr — fraction (дробь). 1fr занимает одну долю свободного пространства после вычета фиксированных размеров и gap.',
      explanation_en: 'fr stands for fraction. 1fr takes one share of the free space remaining after fixed sizes and gap are subtracted.',
    },
    {
      id: 'q3',
      text_ru: 'Как растянуть элемент на всю ширину сетки из любого количества колонок?',
      text_en: 'How to stretch an element across all columns regardless of column count?',
      options_ru: ['width: 100%', 'grid-column: 1 / -1', 'grid-column: span all', 'flex: 1'],
      options_en: ['width: 100%', 'grid-column: 1 / -1', 'grid-column: span all', 'flex: 1'],
      correctIndex: 1,
      explanation_ru: 'grid-column: 1 / -1 — от первой до последней линии сетки. -1 всегда означает последнюю линию.',
      explanation_en: 'grid-column: 1 / -1 — from the first to the last grid line. -1 always means the last line.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает grid-template-areas?',
      text_en: 'What does grid-template-areas do?',
      options_ru: [
        'Задаёт размеры ячеек',
        'Создаёт именованные зоны для наглядной схемы раскладки',
        'Анимирует grid-элементы',
        'Добавляет отступы между ячейками',
      ],
      options_en: [
        'Sets cell sizes',
        'Creates named zones for a visual layout map',
        'Animates grid items',
        'Adds spacing between cells',
      ],
      correctIndex: 1,
      explanation_ru: 'grid-template-areas создаёт именованную схему. Потом grid-area: name назначает элемент в нужную зону.',
      explanation_en: 'grid-template-areas creates a named map. Then grid-area: name assigns an element to the corresponding zone.',
    },
    {
      id: 'q5',
      text_ru: 'Когда использовать Grid вместо Flexbox?',
      text_en: 'When should you use Grid instead of Flexbox?',
      options_ru: [
        'Всегда — Grid лучше',
        'Для навигационных панелей и кнопок',
        'Для двумерных раскладок (строки и колонки одновременно)',
        'Только для мобильных устройств',
      ],
      options_en: [
        'Always — Grid is better',
        'For navigation bars and buttons',
        'For two-dimensional layouts (rows and columns at the same time)',
        'Only for mobile devices',
      ],
      correctIndex: 2,
      explanation_ru: 'Grid для двумерных раскладок (страницы, дашборды). Flexbox для одной оси (строка кнопок, навигация). Они дополняют друг друга.',
      explanation_en: 'Grid for two-dimensional layouts (pages, dashboards). Flexbox for one axis (button row, navigation). They complement each other.',
    },
  ],
}
