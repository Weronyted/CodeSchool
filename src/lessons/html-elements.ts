import type { Lesson } from '@/types/lesson'

export const htmlElements: Lesson = {
  slug: 'html-elements',
  category: 'HTML',
  readTime: 10,
  icon: '🔤',

  title_ru: 'Элементы HTML',
  title_en: 'HTML Elements',

  description_ru: 'Заголовки, абзацы, списки, ссылки и изображения — основа любой страницы.',
  description_en: 'Headings, paragraphs, lists, links and images — the building blocks of any page.',

  sections: [
    { id: 'headings', title_ru: 'Заголовки',        title_en: 'Headings' },
    { id: 'text',     title_ru: 'Текст',             title_en: 'Text' },
    { id: 'lists',    title_ru: 'Списки',            title_en: 'Lists' },
    { id: 'links',    title_ru: 'Ссылки',            title_en: 'Links' },
    { id: 'images',   title_ru: 'Изображения',       title_en: 'Images' },
    { id: 'key-terms', title_ru: 'Важные слова',     title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'HTML-элементы: кирпичики страницы',
      title_en: 'HTML elements: the page building blocks',
      body_ru: 'Большинство сайтов строятся из пяти типов элементов. Освоив их, ты уже сможешь создавать настоящие страницы.',
      body_en: 'Most websites are built from five types of elements. Master them and you can already build real pages.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Теги как конструктор Lego',
      title_en: 'Tags are like Lego bricks',
      body_ru: 'Каждый HTML-тег — это отдельная деталь. Заголовки — крупные детали-основания. Абзацы — плоские блоки текста. Ссылки и картинки — специальные детали. Собери их вместе — получишь страницу.',
      body_en: 'Every HTML tag is a separate piece. Headings are the big base pieces. Paragraphs are flat text blocks. Links and images are special pieces. Put them together — you have a page.',
      visual: {
        kind: 'emoji',
        emojis: ['🧱', '📝', '🔗', '🖼️'],
      },
      bullets: [
        { text_ru: '🧱 Заголовки h1–h6 — структура и иерархия', text_en: '🧱 Headings h1–h6 — structure and hierarchy' },
        { text_ru: '📝 Абзацы и текст — основной контент', text_en: '📝 Paragraphs and text — the main content' },
        { text_ru: '🔗 Ссылки и списки — навигация и перечисления', text_en: '🔗 Links and lists — navigation and enumerations' },
        { text_ru: '🖼️ Картинки — визуальный контент', text_en: '🖼️ Images — visual content' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Заголовки h1–h6',
      title_en: 'Headings h1–h6',
      body_ru: 'HTML имеет шесть уровней заголовков. h1 — главный заголовок страницы, самый крупный. h2 — заголовок раздела. h3–h6 — подзаголовки всё меньшего уровня. h1 на странице должен быть один.',
      body_en: 'HTML has six heading levels. h1 is the main page heading, the largest. h2 is a section heading. h3–h6 are sub-headings of decreasing importance. There should be only one h1 per page.',
      visual: {
        kind: 'svg',
        svg: `<svg viewBox="0 0 320 110" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect x="4"   y="8"  width="160" height="16" rx="4" fill="#3B5BDB"/>
  <text x="12"  y="20" fill="white" font-size="11" font-family="monospace">h1 — главный</text>
  <rect x="4"   y="30" width="130" height="14" rx="4" fill="#4A6FE3"/>
  <text x="12"  y="41" fill="white" font-size="10" font-family="monospace">h2 — раздел</text>
  <rect x="4"   y="50" width="104" height="12" rx="4" fill="#6088E8"/>
  <text x="12"  y="60" fill="white" font-size="9"  font-family="monospace">h3 — подраздел</text>
  <rect x="4"   y="68" width="80"  height="10" rx="4" fill="#7EA1EE"/>
  <text x="12"  y="77" fill="white" font-size="8"  font-family="monospace">h4</text>
  <rect x="4"   y="84" width="60"  height="8"  rx="4" fill="#9DBAF4"/>
  <text x="12"  y="92" fill="white" font-size="7"  font-family="monospace">h5</text>
  <rect x="4"   y="98" width="44"  height="6"  rx="4" fill="#BDD3F9"/>
  <text x="12"  y="104" fill="#3B5BDB" font-size="6" font-family="monospace">h6</text>
</svg>`,
        caption_ru: 'h1 — самый важный, h6 — наименее важный',
        caption_en: 'h1 — most important, h6 — least important',
      },
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Заголовки и абзацы',
      title_en: 'Headings and paragraphs',
      body_ru: 'Заголовки задают структуру. Тег p создаёт абзац — браузер добавляет отступы автоматически. strong делает текст жирным, em — курсивным.',
      body_en: 'Headings give structure. The p tag creates a paragraph — the browser adds spacing automatically. strong makes text bold, em makes it italic.',
      code: `<h1>Мой блог</h1>
<h2>Первая запись</h2>

<p>Это первый <strong>абзац</strong>.</p>
<p>Текст с <em>акцентом</em> и <strong>важностью</strong>.</p>`,
      codeLang: 'html',
    },
    {
      id: 's5',
      type: 'compare',
      title_ru: 'Списки: ul и ol',
      title_en: 'Lists: ul and ol',
      body_ru: 'HTML поддерживает два вида списков. Оба используют тег li для каждого пункта.',
      body_en: 'HTML supports two types of lists. Both use the li tag for each item.',
      compareLeft: {
        label_ru: '• ul — неупорядоченный',
        label_en: '• ul — unordered',
        items_ru: ['Пункты с точками', 'Порядок не важен', 'Список ингредиентов'],
        items_en: ['Items with bullets', 'Order does not matter', 'List of ingredients'],
        color: 'blue',
      },
      compareRight: {
        label_ru: '1. ol — упорядоченный',
        label_en: '1. ol — ordered',
        items_ru: ['Пункты с номерами', 'Порядок важен', 'Инструкция по шагам'],
        items_en: ['Items with numbers', 'Order matters', 'Step-by-step instructions'],
        color: 'amber',
      },
    },
    {
      id: 's6',
      type: 'code-anim',
      title_ru: 'Собираем ссылку шаг за шагом',
      title_en: 'Building a link step by step',
      body_ru: 'Тег a создаёт ссылку. Атрибут href указывает, куда ведёт ссылка.',
      body_en: 'The a tag creates a link. The href attribute tells the browser where the link goes.',
      animMode: 'preview',
      animSteps: [
        {
          code: '<a>',
          comment_ru: '1. Открывающий тег — это будет ссылка',
          comment_en: '1. Opening tag — this will be a link',
        },
        {
          code: '<a href="https://google.com">',
          comment_ru: '2. Атрибут href — адрес назначения',
          comment_en: '2. href attribute — the destination address',
        },
        {
          code: '<a href="https://google.com">Google</a>',
          comment_ru: '3. Текст ссылки и закрывающий тег',
          comment_en: '3. Link text and closing tag',
          preview: '<a href="#" style="color:#3B5BDB;font-size:1.2em;font-family:sans-serif;text-decoration:underline">Google</a>',
        },
      ],
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Изображения: тег img',
      title_en: 'Images: the img tag',
      body_ru: 'Тег img — одиночный, закрывать не нужно. Атрибут src — путь к файлу (обязательный). Атрибут alt — описание для незрячих пользователей и если картинка не загрузилась (тоже обязательный). width и height — размеры.',
      body_en: 'The img tag is self-closing — no closing tag needed. src is the file path (required). alt is a description for visually impaired users and when the image fails to load (also required). width and height set the dimensions.',
      bullets: [
        { text_ru: '🖼️ src="photo.jpg" — путь к картинке (обязателен)', text_en: '🖼️ src="photo.jpg" — path to image (required)' },
        { text_ru: '♿ alt="Описание" — текст для доступности (обязателен)', text_en: '♿ alt="Description" — accessibility text (required)' },
        { text_ru: '📐 width="200" height="150" — размеры в пикселях', text_en: '📐 width="200" height="150" — dimensions in pixels' },
      ],
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Атрибут alt в теге img важен не только для незрячих — Google тоже читает его при индексации страниц. Хорошо заполненный alt улучшает SEO. Тег a расшифровывается как "anchor" (якорь) — именно с него начался весь веб.',
      body_en: 'The alt attribute in img is important not just for visually impaired users — Google also reads it when indexing pages. A well-written alt improves SEO. The a tag stands for "anchor" — it is the very thing that started the whole web.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Собери HTML-страницу!',
      title_en: 'Build an HTML page!',
      body_ru: 'Используй заголовки, абзацы, список и ссылку — создай свою первую полноценную HTML-страницу.',
      body_en: 'Use headings, paragraphs, a list and a link — build your first complete HTML page.',
    },
  ],

  content: {
    intro_ru: `HTML — это язык тегов. Каждый тег — это инструкция браузеру: "покажи заголовок",
"покажи абзац", "покажи картинку". Большинство реальных страниц строятся из пяти типов
элементов: заголовков, текста, списков, ссылок и изображений. Освоив их, ты уже можешь
создавать полноценные страницы.`,
    intro_en: `HTML is a language of tags. Each tag is an instruction to the browser: "show a heading",
"show a paragraph", "show an image". Most real pages are built from five types of elements:
headings, text, lists, links and images. Master them and you can already build complete pages.`,

    blocks: [
      {
        sectionId: 'headings',
        heading_ru: 'Заголовки h1–h6',
        heading_en: 'Headings h1–h6',
        text_ru: `HTML предоставляет шесть уровней заголовков — от h1 до h6. Они задают
иерархию страницы, как оглавление книги.

• h1 — главный заголовок, используется один раз на странице.
• h2 — заголовки разделов.
• h3 — подразделы внутри h2.
• h4–h6 — редко используются, но доступны.

Важно: используй заголовки по смыслу, а не по размеру. Если нужен крупный
красивый текст — измени размер через CSS, а не бери h1 вместо h3.`,
        text_en: `HTML provides six heading levels — h1 through h6. They define the page
hierarchy, like a book's table of contents.

• h1 — the main heading, used once per page.
• h2 — section headings.
• h3 — subsections inside h2.
• h4–h6 — rarely used but available.

Important: use headings by meaning, not by size. If you want large decorative text —
change the size with CSS, don't use h1 instead of h3.`,
        code: `<h1>Мой сайт</h1>
<h2>О себе</h2>
<h3>Мои хобби</h3>
<h2>Мои проекты</h2>`,
        codeLang: 'html',
      },
      {
        sectionId: 'text',
        heading_ru: 'Текст и абзацы',
        heading_en: 'Text and paragraphs',
        text_ru: `Для текста используются несколько тегов:

• p — абзац. Браузер автоматически добавляет отступы сверху и снизу.
• strong — важный текст (жирный). Семантически означает "важно".
• em — акцентированный текст (курсив). Означает "с ударением".
• br — перенос строки (одиночный тег, без закрывающего).
• span — контейнер для части текста. Сам по себе ничего не делает,
  но удобен для стилизации через CSS.`,
        text_en: `Several tags are used for text:

• p — paragraph. The browser automatically adds space above and below.
• strong — important text (bold). Semantically means "important".
• em — emphasised text (italic). Means "with emphasis".
• br — line break (self-closing tag, no closing tag needed).
• span — a container for part of the text. Does nothing by itself,
  but useful for CSS styling.`,
        code: `<p>Это <strong>важный</strong> абзац.</p>
<p>Читай <em>внимательно</em>, это интересно!</p>
<p>Строка 1<br>Строка 2 (перенос без нового абзаца)</p>
<p>Нажми <span class="key">Enter</span> для продолжения.</p>`,
        codeLang: 'html',
      },
      {
        sectionId: 'lists',
        heading_ru: 'Списки',
        heading_en: 'Lists',
        text_ru: `HTML поддерживает два вида списков. Оба используют тег li для каждого пункта.

ul (unordered list) — неупорядоченный список с точками. Используй когда
порядок не важен: список ингредиентов, список функций.

ol (ordered list) — упорядоченный список с номерами. Используй когда
порядок важен: инструкция, топ-10, шаги алгоритма.

Списки можно вкладывать друг в друга для создания подпунктов.`,
        text_en: `HTML supports two types of lists. Both use the li tag for each item.

ul (unordered list) — a bulleted list. Use when order does not matter:
list of ingredients, list of features.

ol (ordered list) — a numbered list. Use when order matters:
instructions, top-10, algorithm steps.

Lists can be nested inside each other for sub-items.`,
        code: `<!-- Неупорядоченный список -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Упорядоченный список -->
<ol>
  <li>Открой редактор</li>
  <li>Напиши код</li>
  <li>Сохрани файл</li>
</ol>`,
        codeLang: 'html',
      },
      {
        sectionId: 'links',
        heading_ru: 'Ссылки',
        heading_en: 'Links',
        text_ru: `Тег a (anchor — якорь) создаёт гиперссылку. Атрибут href задаёт адрес:

• Внешняя ссылка: href="https://google.com" — полный URL с https://.
• Внутренняя ссылка: href="about.html" — относительный путь к файлу.
• Якорная ссылка: href="#section2" — переход к элементу с id="section2".

Атрибут target="_blank" открывает ссылку в новой вкладке. При этом
рекомендуется добавлять rel="noopener" из соображений безопасности.`,
        text_en: `The a (anchor) tag creates a hyperlink. The href attribute sets the address:

• External link: href="https://google.com" — full URL with https://.
• Internal link: href="about.html" — relative path to a file.
• Anchor link: href="#section2" — jumps to an element with id="section2".

The target="_blank" attribute opens the link in a new tab. It is
recommended to also add rel="noopener" for security.`,
        code: `<!-- Внешняя ссылка -->
<a href="https://google.com">Google</a>

<!-- Новая вкладка -->
<a href="https://github.com" target="_blank" rel="noopener">GitHub</a>

<!-- Якорная ссылка -->
<a href="#about">О себе ↓</a>

<!-- Элемент-цель якоря -->
<section id="about">...</section>`,
        codeLang: 'html',
      },
      {
        sectionId: 'images',
        heading_ru: 'Изображения',
        heading_en: 'Images',
        text_ru: `Тег img вставляет изображение. Это самозакрывающийся тег — закрывать не нужно.

Обязательные атрибуты:
• src — путь к изображению. Может быть относительным (photo.jpg) или
  абсолютным (https://example.com/img.jpg).
• alt — текстовое описание. Показывается если картинка не загрузилась,
  читается экранными дикторами для незрячих пользователей, улучшает SEO.

Необязательные атрибуты:
• width, height — размеры в пикселях. Помогают браузеру зарезервировать
  место до загрузки картинки.`,
        text_en: `The img tag inserts an image. It is self-closing — no closing tag needed.

Required attributes:
• src — the image path. Can be relative (photo.jpg) or absolute
  (https://example.com/img.jpg).
• alt — a text description. Shown if the image fails to load, read by
  screen readers for visually impaired users, improves SEO.

Optional attributes:
• width, height — dimensions in pixels. Help the browser reserve space
  before the image loads.`,
        code: `<!-- Локальная картинка -->
<img src="cat.jpg" alt="Рыжий кот на диване">

<!-- Картинка с размерами -->
<img
  src="logo.png"
  alt="Логотип компании"
  width="200"
  height="80"
>

<!-- Картинка из интернета -->
<img
  src="https://example.com/banner.jpg"
  alt="Рекламный баннер"
>`,
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: страница о себе',
    title_en: 'Try it yourself: about me page',
    instructions_ru: `Создай HTML-страницу о себе:
— h1 с твоим именем
— p с кратким описанием
— h2 "Мои навыки" и ul-список из 3 пунктов
— Ссылку на любимый сайт через тег a с href`,
    instructions_en: `Create an HTML page about yourself:
— h1 with your name
— p with a short description
— h2 "My skills" and a ul list with 3 items
— A link to a favourite website using the a tag with href`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Обо мне</title>
</head>
<body>

  <h1>Привет, меня зовут ...</h1>

  <p>Я учусь программировать и мне это нравится!</p>

  <h2>Мои навыки</h2>
  <ul>
    <li>HTML</li>
    <li>CSS</li>
    <li>JavaScript</li>
  </ul>

  <a href="https://google.com">Мой любимый сайт</a>

</body>
</html>`,
    },
    hints_ru: [
      'ul содержит пункты li. ol — то же самое, но пункты нумеруются автоматически.',
      'Атрибут href у тега a — это адрес, куда ведёт ссылка. Не забудь https://.',
    ],
    hints_en: [
      'ul contains li items. ol is the same but items are numbered automatically.',
      'The href attribute on the a tag is the address the link goes to. Do not forget https://.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'h1–h6', term_en: 'h1–h6',
      definition_ru: 'Теги заголовков. h1 — главный и самый крупный, h6 — наименее важный.',
      definition_en: 'Heading tags. h1 is the main and largest, h6 the least important.',
      example_ru: '<h1>Главный заголовок</h1>',
      example_en: '<h1>Main heading</h1>',
    },
    {
      term_ru: 'p', term_en: 'p',
      definition_ru: 'Тег абзаца. Создаёт блок текста с отступами сверху и снизу.',
      definition_en: 'Paragraph tag. Creates a text block with spacing above and below.',
      example_ru: '<p>Текст абзаца.</p>',
      example_en: '<p>Paragraph text.</p>',
    },
    {
      term_ru: 'ul / ol / li', term_en: 'ul / ol / li',
      definition_ru: 'Теги списков. ul — с точками, ol — нумерованный, li — пункт списка.',
      definition_en: 'List tags. ul — bulleted, ol — numbered, li — a list item.',
      example_ru: '<ul><li>Пункт</li></ul>',
      example_en: '<ul><li>Item</li></ul>',
    },
    {
      term_ru: 'a href', term_en: 'a href',
      definition_ru: 'Тег ссылки. Атрибут href задаёт адрес назначения.',
      definition_en: 'Link tag. The href attribute sets the destination address.',
      example_ru: '<a href="https://google.com">Google</a>',
      example_en: '<a href="https://google.com">Google</a>',
    },
    {
      term_ru: 'img src alt', term_en: 'img src alt',
      definition_ru: 'Тег изображения. src — путь к файлу, alt — описание для доступности.',
      definition_en: 'Image tag. src is the file path, alt is the accessibility description.',
      example_ru: '<img src="photo.jpg" alt="Фото">',
      example_en: '<img src="photo.jpg" alt="Photo">',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Атрибут alt в теге img читает Google при индексации — хорошо заполненный alt улучшает видимость в поиске.',
      text_en: 'Google reads the alt attribute in img tags when indexing — a well-written alt improves search visibility.',
    },
    {
      text_ru: 'Тег a расшифровывается как "anchor" (якорь). Именно гиперссылки сделали интернет тем, чем он является — связанной сетью страниц.',
      text_en: 'The a tag stands for "anchor". Hyperlinks are what made the internet what it is — a connected web of pages.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой тег создаёт нумерованный список?',
      text_en: 'Which tag creates a numbered list?',
      options_ru: ['<ul>', '<ol>', '<li>', '<list>'],
      options_en: ['<ul>', '<ol>', '<li>', '<list>'],
      correctIndex: 1,
      explanation_ru: 'ol (ordered list) — нумерованный список. ul (unordered list) — с точками.',
      explanation_en: 'ol (ordered list) is numbered. ul (unordered list) uses bullets.',
    },
    {
      id: 'q2',
      text_ru: 'Как открыть ссылку в новой вкладке?',
      text_en: 'How do you open a link in a new tab?',
      options_ru: ['<a href="..." new>', '<a href="..." target="_blank">', '<a href="..." open>', '<a href="..." tab="new">'],
      options_en: ['<a href="..." new>', '<a href="..." target="_blank">', '<a href="..." open>', '<a href="..." tab="new">'],
      correctIndex: 1,
      explanation_ru: 'Атрибут target="_blank" открывает ссылку в новой вкладке браузера.',
      explanation_en: 'The target="_blank" attribute opens the link in a new browser tab.',
    },
    {
      id: 'q3',
      text_ru: 'Какой атрибут тега img описывает картинку для незрячих?',
      text_en: 'Which img attribute describes the image for visually impaired users?',
      options_ru: ['src', 'title', 'alt', 'desc'],
      options_en: ['src', 'title', 'alt', 'desc'],
      correctIndex: 2,
      explanation_ru: 'alt — альтернативный текст. Читается экранными дикторами и показывается если картинка не загрузилась.',
      explanation_en: 'alt — alternative text. Read by screen readers and shown when the image fails to load.',
    },
    {
      id: 'q4',
      text_ru: 'Сколько раз рекомендуется использовать h1 на странице?',
      text_en: 'How many times should h1 be used on a page?',
      options_ru: ['Без ограничений', 'Не более трёх', 'Один раз', 'Минимум два'],
      options_en: ['No limit', 'No more than three', 'Once', 'At least two'],
      correctIndex: 2,
      explanation_ru: 'h1 должен быть один — это главный заголовок страницы, как название книги.',
      explanation_en: 'h1 should appear once — it is the main page heading, like the title of a book.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает тег strong?',
      text_en: 'What does the strong tag do?',
      options_ru: ['Увеличивает шрифт', 'Выделяет текст жирным и семантически означает важность', 'Добавляет цвет', 'Создаёт рамку'],
      options_en: ['Increases font size', 'Makes text bold and semantically means importance', 'Adds colour', 'Creates a border'],
      correctIndex: 1,
      explanation_ru: 'strong — семантический тег "важно". Браузер отображает жирным, но смысл — в семантике.',
      explanation_en: 'strong is a semantic "important" tag. The browser shows it bold, but the meaning is in the semantics.',
    },
  ],
}
