import type { Lesson } from '@/types/lesson'

export const cssBasics: Lesson = {
  slug: 'css-basics',
  category: 'CSS',
  readTime: 9,
  icon: '🎨',

  title_ru: 'Основы CSS',
  title_en: 'CSS Basics',

  description_ru: 'Что такое CSS, селекторы, свойства и значения — всё с нуля.',
  description_en: 'What is CSS, selectors, properties and values — everything from scratch.',

  sections: [
    { id: 'what-is-css',  title_ru: 'Что такое CSS',          title_en: 'What is CSS' },
    { id: 'syntax',       title_ru: 'Синтаксис',              title_en: 'Syntax' },
    { id: 'selectors',    title_ru: 'Селекторы',              title_en: 'Selectors' },
    { id: 'properties',   title_ru: 'Основные свойства',      title_en: 'Core properties' },
    { id: 'how-to-add',   title_ru: 'Подключение CSS',        title_en: 'Adding CSS' },
    { id: 'key-terms',    title_ru: 'Важные слова',           title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Основы CSS: правила, селекторы, свойства',
      title_en: 'CSS basics: rules, selectors, properties',
      body_ru: 'CSS — язык стилей. Если HTML — это каркас дома, CSS — это его отделка: цвет стен, шрифты, размеры, расположение всего на странице.',
      body_en: 'CSS is the style language. If HTML is the frame of a house, CSS is the finish: wall colours, fonts, sizes, placement of everything on the page.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'CSS как дизайнер интерьера',
      title_en: 'CSS is like an interior designer',
      body_ru: 'HTML возводит стены и ставит мебель на место. CSS решает, каким цветом покрасить стены, какую ткань положить на диван, как расставить вещи. Без CSS всё выглядит как голый бетон.',
      body_en: 'HTML puts up the walls and places the furniture. CSS decides what colour to paint the walls, what fabric for the sofa, how to arrange everything. Without CSS everything looks like bare concrete.',
      visual: {
        kind: 'emoji',
        emojis: ['🏗️', '🎨', '✨'],
      },
      bullets: [
        { text_ru: '🏗️ HTML — структура: что есть на странице', text_en: '🏗️ HTML — structure: what is on the page' },
        { text_ru: '🎨 CSS — внешний вид: как это выглядит', text_en: '🎨 CSS — appearance: how it looks' },
        { text_ru: '✨ Вместе они создают красивые сайты', text_en: '✨ Together they create beautiful websites' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Анатомия CSS-правила',
      title_en: 'Anatomy of a CSS rule',
      body_ru: 'CSS-правило состоит из трёх частей: селектор (кого стилизуем), свойство (что меняем), значение (как меняем). Свойство и значение разделяются двоеточием, заканчиваются точкой с запятой.',
      body_en: 'A CSS rule has three parts: selector (who to style), property (what to change), value (how to change it). Property and value are separated by a colon, ended with a semicolon.',
      visual: {
        kind: 'svg',
        svg: `<svg viewBox="0 0 400 68" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect x="4"   y="8" width="56"  height="52" rx="8" fill="#3B5BDB"/>
  <text x="32"  y="39" text-anchor="middle" fill="white" font-size="19" font-weight="bold" font-family="monospace">p</text>
  <text x="68"  y="40" fill="rgba(255,255,255,0.45)" font-size="28" font-family="monospace">{</text>
  <rect x="84"  y="8" width="120" height="52" rx="8" fill="#7950F2"/>
  <text x="144" y="39" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="monospace">font-size</text>
  <text x="211" y="39" fill="rgba(255,255,255,0.45)" font-size="24" font-family="monospace">:</text>
  <rect x="224" y="8" width="96"  height="52" rx="8" fill="#2f9e44"/>
  <text x="272" y="39" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="monospace">16px</text>
  <text x="326" y="39" fill="rgba(255,255,255,0.45)" font-size="22" font-family="monospace">; }</text>
</svg>`,
        caption_ru: '🔵 selector — 🟣 property — 🟢 value',
        caption_en: '🔵 selector — 🟣 property — 🟢 value',
      },
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Три типа селекторов',
      title_en: 'Three types of selectors',
      body_ru: 'Тег-селектор (p, h1) — применяется ко всем элементам этого типа. Класс-селектор (.card) — к элементам с этим классом. ID-селектор (#header) — к одному уникальному элементу. Классы используются чаще всего.',
      body_en: 'Tag selector (p, h1) — applies to all elements of that type. Class selector (.card) — to elements with that class. ID selector (#header) — to one unique element. Class selectors are used most often.',
      bullets: [
        { text_ru: '🏷️ p { } — тег: стилизует все абзацы', text_en: '🏷️ p { } — tag: styles all paragraphs' },
        { text_ru: '🎯 .card { } — класс: начинается с точки', text_en: '🎯 .card { } — class: starts with a dot' },
        { text_ru: '🔑 #logo { } — ID: начинается с решётки, уникален', text_en: '🔑 #logo { } — ID: starts with #, unique per page' },
      ],
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Селекторы в действии',
      title_en: 'Selectors in action',
      body_ru: 'Один и тот же CSS-файл может содержать правила для тегов, классов и ID одновременно.',
      body_en: 'A single CSS file can contain rules for tags, classes and IDs all at once.',
      code: `/* Тег-селектор — все абзацы */
p {
  color: #333;
  font-size: 16px;
}

/* Класс-селектор */
.card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
}

/* ID-селектор */
#logo {
  width: 120px;
  height: auto;
}`,
      codeLang: 'css',
    },
    {
      id: 's6',
      type: 'compare',
      title_ru: 'Как подключить CSS?',
      title_en: 'How to add CSS?',
      body_ru: 'Лучший способ — отдельный файл. Он применяется ко всему сайту, легко редактируется и не загромождает HTML.',
      body_en: 'The best way is a separate file. It applies to the whole site, is easy to edit and does not clutter the HTML.',
      compareLeft: {
        label_ru: '✅ Внешний файл (лучший)',
        label_en: '✅ External file (best)',
        items_ru: ['style.css через <link>', 'Один файл — весь сайт', 'Лёгкая поддержка'],
        items_en: ['style.css via <link>', 'One file — whole site', 'Easy to maintain'],
        color: 'green',
      },
      compareRight: {
        label_ru: '⚠️ Инлайн style=""',
        label_en: '⚠️ Inline style=""',
        items_ru: ['Только один элемент', 'Трудно поддерживать', 'Не рекомендуется'],
        items_en: ['Only one element', 'Hard to maintain', 'Not recommended'],
        color: 'red',
      },
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Подключение внешнего файла',
      title_en: 'Linking an external file',
      body_ru: 'Тег link в разделе head подключает внешний CSS-файл. Один файл стилей может управлять видом всего сайта.',
      body_en: 'The link tag in the head section connects an external CSS file. One stylesheet can control the look of the whole site.',
      code: `<!-- В HTML: -->
<head>
  <link rel="stylesheet" href="style.css">
</head>

/* В файле style.css: */
body {
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

h1 {
  color: #3B5BDB;
  text-align: center;
}`,
      codeLang: 'html',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'CSS расшифровывается как Cascading Style Sheets — «каскадные таблицы стилей». Слово «каскадные» означает, что стили накапливаются: если к одному элементу применяются несколько правил, побеждает более специфичное. Этот принцип называется специфичность.',
      body_en: 'CSS stands for Cascading Style Sheets. "Cascading" means styles accumulate: if several rules apply to one element, the more specific one wins. This principle is called specificity.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Напиши первые CSS-правила!',
      title_en: 'Write your first CSS rules!',
      body_ru: 'Применй селекторы и свойства — стилизуй HTML-страницу с нуля.',
      body_en: 'Apply selectors and properties — style an HTML page from scratch.',
    },
  ],

  content: {
    intro_ru: `CSS (Cascading Style Sheets) — язык стилей. Без него браузер показывает страницу
чёрным текстом на белом фоне. CSS задаёт цвета, шрифты, размеры, отступы — всё, что
делает сайт красивым и удобным. Базовый CSS прост: несколько правил — и страница уже
выглядит совсем иначе.`,
    intro_en: `CSS (Cascading Style Sheets) is the style language. Without it the browser shows
the page as black text on a white background. CSS sets colours, fonts, sizes, spacing —
everything that makes a site beautiful and easy to use. Basic CSS is simple: a few rules
and the page already looks completely different.`,

    blocks: [
      {
        sectionId: 'what-is-css',
        heading_ru: 'Что такое CSS',
        heading_en: 'What is CSS',
        text_ru: `CSS описывает, как должны выглядеть HTML-элементы. Браузер сначала читает HTML
(строит структуру), затем CSS (применяет стили). Разделение ответственности —
HTML отвечает за смысл, CSS за внешний вид — делает код удобным в поддержке.`,
        text_en: `CSS describes how HTML elements should look. The browser first reads HTML (builds
the structure), then CSS (applies styles). The separation of concerns — HTML for
meaning, CSS for appearance — makes code easy to maintain.`,
      },
      {
        sectionId: 'syntax',
        heading_ru: 'Синтаксис CSS',
        heading_en: 'CSS syntax',
        text_ru: `CSS-правило состоит из двух частей:
• Селектор — указывает, к какому элементу применить стиль.
• Блок объявлений — одно или несколько объявлений в фигурных скобках.

Каждое объявление: свойство: значение; (двоеточие и точка с запятой обязательны).
Без точки с запятой браузер может неправильно прочитать следующее свойство.`,
        text_en: `A CSS rule has two parts:
• Selector — points to which element to style.
• Declaration block — one or more declarations in curly braces.

Each declaration: property: value; (colon and semicolon are required).
Without the semicolon the browser may misread the next property.`,
        code: `/* Анатомия правила */
селектор {
  свойство: значение;   /* объявление */
}

/* Реальный пример */
h1 {
  color: #3B5BDB;
  font-size: 32px;
  text-align: center;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'selectors',
        heading_ru: 'Селекторы',
        heading_en: 'Selectors',
        text_ru: `Селектор — "адрес" элемента. Основные виды:

• Тег: p — все абзацы, h2 — все заголовки второго уровня.
• Класс: .highlight — все элементы с class="highlight".
  В HTML — без точки (class="card"), в CSS — с точкой (.card).
• ID: #header — элемент с id="header". ID должен быть уникальным.
• Универсальный: * — все элементы (используй осторожно).
• Потомок: .card p — все p внутри .card.`,
        text_en: `The selector is the element's "address". Main types:

• Tag: p — all paragraphs, h2 — all second-level headings.
• Class: .highlight — all elements with class="highlight".
  In HTML — no dot (class="card"), in CSS — with a dot (.card).
• ID: #header — element with id="header". ID must be unique.
• Universal: * — all elements (use carefully).
• Descendant: .card p — all p inside .card.`,
        code: `p       { color: #333; }          /* тег */
.title  { font-size: 24px; }      /* класс */
#logo   { width: 120px; }         /* id */
*       { box-sizing: border-box; } /* всё */
nav a   { text-decoration: none; } /* потомок */`,
        codeLang: 'css',
      },
      {
        sectionId: 'properties',
        heading_ru: 'Основные свойства',
        heading_en: 'Core properties',
        text_ru: `В CSS сотни свойств, но 10 самых частых:

• color — цвет текста
• background-color — цвет фона
• font-size — размер шрифта (16px, 1rem, 1.2em)
• font-family — шрифт (Arial, Georgia, sans-serif)
• font-weight — жирность (normal, bold, 700)
• text-align — выравнивание (left, center, right)
• margin — внешний отступ
• padding — внутренний отступ
• border — рамка
• border-radius — скругление углов`,
        text_en: `CSS has hundreds of properties, but the 10 most common:

• color — text colour
• background-color — background colour
• font-size — font size (16px, 1rem, 1.2em)
• font-family — font (Arial, Georgia, sans-serif)
• font-weight — boldness (normal, bold, 700)
• text-align — alignment (left, center, right)
• margin — outer spacing
• padding — inner spacing
• border — border
• border-radius — corner rounding`,
        code: `p {
  color: #444;
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  line-height: 1.6;
}

.card {
  background-color: white;
  border: 1px solid #eee;
  border-radius: 12px;
  padding: 24px;
  margin: 16px;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'how-to-add',
        heading_ru: 'Подключение CSS',
        heading_en: 'Adding CSS',
        text_ru: `Три способа добавить CSS:

1. Внешний файл (рекомендуется):
   <link rel="stylesheet" href="style.css"> в <head>.
   Плюсы: один файл для всего сайта, кешируется браузером.

2. Тег <style> в <head>:
   Стили прямо в HTML. Подходит для маленьких проектов.

3. Атрибут style="" прямо в теге:
   <p style="color: red;">. Только для одного элемента.
   Использовать только в крайних случаях.`,
        text_en: `Three ways to add CSS:

1. External file (recommended):
   <link rel="stylesheet" href="style.css"> in <head>.
   Pros: one file for the whole site, cached by the browser.

2. <style> tag in <head>:
   Styles directly in HTML. Fine for small projects.

3. The style="" attribute directly in a tag:
   <p style="color: red;">. For one element only.
   Use only as a last resort.`,
        code: `<!-- 1. Внешний файл -->
<head>
  <link rel="stylesheet" href="style.css">
</head>

<!-- 2. Тег style -->
<head>
  <style>
    h1 { color: blue; }
  </style>
</head>

<!-- 3. Инлайн (не рекомендуется) -->
<p style="color: red; font-size: 20px;">Текст</p>`,
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: стилизуй страницу',
    title_en: 'Try it yourself: style the page',
    instructions_ru: `Напиши CSS для готовой HTML-страницы:
— h1: синий цвет, выровнен по центру
— p: серый текст, размер 16px, высота строки 1.6
— .card: белый фон, скруглённые углы 12px, внутренний отступ 24px
Нажми «Запустить»!`,
    instructions_en: `Write CSS for the ready HTML page:
— h1: blue colour, centred
— p: grey text, size 16px, line-height 1.6
— .card: white background, rounded corners 12px, padding 24px
Press "Run"!`,
    activeTabs: ['css'],
    starterCode: {
      css: `h1 {
  color: #3B5BDB;
  text-align: center;
  font-size: 32px;
}

p {
  color: #555;
  font-size: 16px;
  line-height: 1.6;
}

.card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  margin: 16px auto;
  max-width: 480px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
}`,
    },
    hints_ru: [
      'Класс-селектор начинается с точки: .card { }. В HTML — без точки: class="card".',
      'text-align: center выравнивает текст по центру блока.',
    ],
    hints_en: [
      'A class selector starts with a dot: .card { }. In HTML — no dot: class="card".',
      'text-align: center centres the text within the block.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'CSS', term_en: 'CSS',
      definition_ru: 'Cascading Style Sheets — язык стилей для оформления HTML-элементов.',
      definition_en: 'Cascading Style Sheets — a style language for HTML elements.',
      example_ru: 'h1 { color: blue; font-size: 32px; }',
      example_en: 'h1 { color: blue; font-size: 32px; }',
    },
    {
      term_ru: 'Селектор', term_en: 'Selector',
      definition_ru: 'Часть CSS-правила, указывающая, к каким элементам применить стиль.',
      definition_en: 'The part of a CSS rule that points to which elements to style.',
      example_ru: 'p, .card, #logo — примеры селекторов',
      example_en: 'p, .card, #logo — examples of selectors',
    },
    {
      term_ru: 'Свойство', term_en: 'Property',
      definition_ru: 'Параметр внешнего вида, который мы меняем: color, font-size, margin...',
      definition_en: 'The visual parameter we are changing: color, font-size, margin...',
      example_ru: 'color: red; — свойство color, значение red',
      example_en: 'color: red; — property color, value red',
    },
    {
      term_ru: 'Каскад', term_en: 'Cascade',
      definition_ru: 'Принцип CSS: если несколько правил применяются к одному элементу, побеждает более специфичное.',
      definition_en: 'A CSS principle: if several rules apply to one element, the more specific one wins.',
      example_ru: '.card p { } специфичнее, чем p { }',
      example_en: '.card p { } is more specific than p { }',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'CSS был создан норвежским учёным Хоконом Виум Ли в 1994 году. До CSS веб-страницы оформлялись прямо в HTML-атрибутах — это было очень неудобно.',
      text_en: 'CSS was created by Norwegian scientist Håkon Wium Lie in 1994. Before CSS, web pages were styled directly with HTML attributes — very inconvenient.',
    },
    {
      text_ru: '"Каскад" — важнейшее свойство CSS. Стили от разных правил накапливаются, а при конфликте побеждает более специфичное. Именно это позволяет одним стилем задавать общее, другим — переопределять для конкретных элементов.',
      text_en: '"Cascading" is CSS\'s most important feature. Styles from different rules accumulate, and when there is a conflict the more specific one wins. This is what lets one style set the general look and another override it for specific elements.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Как выбрать все элементы с классом "title"?',
      text_en: 'How do you select all elements with class "title"?',
      options_ru: ['#title', '.title', '*title', 'title'],
      options_en: ['#title', '.title', '*title', 'title'],
      correctIndex: 1,
      explanation_ru: '.title — класс-селектор. Точка в CSS означает "класс". В HTML — class="title" (без точки).',
      explanation_en: '.title is a class selector. A dot in CSS means "class". In HTML — class="title" (no dot).',
    },
    {
      id: 'q2',
      text_ru: 'Какое свойство меняет цвет текста?',
      text_en: 'Which property changes the text colour?',
      options_ru: ['background-color', 'font-color', 'color', 'text-color'],
      options_en: ['background-color', 'font-color', 'color', 'text-color'],
      correctIndex: 2,
      explanation_ru: 'color — цвет текста. background-color — цвет фона. font-color и text-color не существуют.',
      explanation_en: 'color is the text colour. background-color is the background. font-color and text-color do not exist.',
    },
    {
      id: 'q3',
      text_ru: 'Какой способ подключения CSS считается лучшим?',
      text_en: 'Which way of adding CSS is considered best?',
      options_ru: ['Инлайн style=""', 'Тег <style>', 'Внешний файл через <link>', 'Прямо в теге <body>'],
      options_en: ['Inline style=""', '<style> tag', 'External file via <link>', 'Directly in <body>'],
      correctIndex: 2,
      explanation_ru: 'Внешний файл — лучший вариант: один файл управляет стилями всего сайта, браузер его кеширует.',
      explanation_en: 'External file is best: one file controls the whole site\'s styles and the browser caches it.',
    },
    {
      id: 'q4',
      text_ru: 'Как записать CSS-комментарий?',
      text_en: 'How do you write a CSS comment?',
      options_ru: ['// Комментарий', '<!-- Комментарий -->', '/* Комментарий */', '# Комментарий'],
      options_en: ['// Comment', '<!-- Comment -->', '/* Comment */', '# Comment'],
      correctIndex: 2,
      explanation_ru: 'В CSS комментарии пишутся через /* ... */. // — это JS/C++, <!-- --> — HTML, # — не существует в CSS.',
      explanation_en: 'CSS comments use /* ... */. // is JS/C++, <!-- --> is HTML, # does not exist in CSS.',
    },
    {
      id: 'q5',
      text_ru: 'Что такое "каскад" в CSS?',
      text_en: 'What is the "cascade" in CSS?',
      options_ru: ['Анимация падения элементов', 'Принцип, по которому при конфликте побеждает более специфичное правило', 'Способ подключения файлов', 'Порядок тегов в HTML'],
      options_en: ['A falling animation', 'The principle by which the more specific rule wins in a conflict', 'A way to link files', 'The order of tags in HTML'],
      correctIndex: 1,
      explanation_ru: 'Каскад — принцип разрешения конфликтов. Более специфичный (.card p) всегда важнее общего (p).',
      explanation_en: 'The cascade is the conflict resolution principle. More specific (.card p) always overrides general (p).',
    },
  ],
}
