import type { Lesson } from '@/types/lesson'

export const htmlTags: Lesson = {
  slug: 'html-tags',
  category: 'HTML',
  readTime: 8,
  icon: '🔤',

  title_ru: 'Основные теги HTML',
  title_en: 'Essential HTML Tags',

  description_ru: 'Заголовки, абзацы, ссылки, картинки и списки — теги, которые строят любой сайт.',
  description_en: 'Headings, paragraphs, links, images and lists — the tags that build every website.',

  sections: [
    { id: 'headings',  title_ru: 'Заголовки h1–h6',          title_en: 'Headings h1–h6' },
    { id: 'text-tags', title_ru: 'Текст: p, strong, em',     title_en: 'Text: p, strong, em' },
    { id: 'links',     title_ru: 'Ссылки — тег <a>',         title_en: 'Links — the <a> tag' },
    { id: 'images',    title_ru: 'Изображения — тег <img>',  title_en: 'Images — the <img> tag' },
    { id: 'lists',     title_ru: 'Списки: ul и ol',          title_en: 'Lists: ul and ol' },
    { id: 'key-terms', title_ru: 'Важные слова',              title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'HTML-теги: строительные кирпичики',
      title_en: 'HTML tags: building bricks',
      body_ru: 'В HTML больше 100 тегов, но для настоящего сайта хватит всего десятка. Сегодня изучим самые важные.',
      body_en: 'HTML has over 100 tags, but a real website needs only about ten. Today we learn the most important ones.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Теги — как слова языка',
      title_en: 'Tags are like words in a language',
      body_ru: 'Представь, что браузер — иностранец, который не понимает русского. Теги — это слова его языка. Ты пишешь <h1> — он понимает «большой заголовок». Пишешь <p> — понимает «абзац». Чем больше слов знаешь, тем богаче можешь описать страницу.',
      body_en: 'Imagine the browser is a foreigner who does not understand English. Tags are words of its language. You write <h1> — it understands "big heading". You write <p> — it understands "paragraph". The more words you know, the richer your page.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Заголовки: от h1 до h6',
      title_en: 'Headings: from h1 to h6',
      body_ru: 'HTML умеет делать 6 уровней заголовков. h1 — самый большой и важный, как название книги. h2 — как глава. h3 — как параграф. h4–h6 — ещё мельче. На каждой странице должен быть ровно один h1.',
      body_en: 'HTML has 6 heading levels. h1 is the biggest and most important — like a book title. h2 is like a chapter. h3 is like a paragraph. h4–h6 go smaller still. Every page should have exactly one h1.',
      visual: {
        kind: 'svg',
        svg: `<svg viewBox="0 0 480 148" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect x="5"   y="10"  width="65" height="130" rx="6" fill="#3B5BDB"/>
  <text x="37"  y="82"  text-anchor="middle" fill="white" font-size="22" font-weight="bold" font-family="monospace">h1</text>
  <rect x="76"  y="26"  width="65" height="114" rx="6" fill="#4263EB"/>
  <text x="108" y="89"  text-anchor="middle" fill="white" font-size="19" font-weight="bold" font-family="monospace">h2</text>
  <rect x="147" y="42"  width="65" height="98"  rx="6" fill="#4F76F6"/>
  <text x="179" y="96"  text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="monospace">h3</text>
  <rect x="218" y="58"  width="65" height="82"  rx="6" fill="#6B8FF5"/>
  <text x="250" y="103" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="monospace">h4</text>
  <rect x="289" y="74"  width="65" height="66"  rx="6" fill="#8FABF7"/>
  <text x="321" y="112" text-anchor="middle" fill="white" font-size="11" font-weight="bold" font-family="monospace">h5</text>
  <rect x="360" y="88"  width="65" height="52"  rx="6" fill="#A8C0F9"/>
  <text x="392" y="118" text-anchor="middle" fill="white" font-size="9"  font-weight="bold" font-family="monospace">h6</text>
</svg>`,
        caption_ru: 'h1 — самый большой заголовок, h6 — самый маленький',
        caption_en: 'h1 is the largest heading, h6 is the smallest',
      },
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Заголовки в действии',
      title_en: 'Headings in action',
      body_ru: 'Вот как выглядят три первых уровня. Браузер сам делает их разного размера — ты только выбираешь уровень.',
      body_en: 'Here are the first three levels. The browser automatically makes them different sizes — you just pick the level.',
      code: `<h1>Мой любимый город</h1>
<h2>История</h2>
<h3>Основание города</h3>`,
      codeLang: 'html',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Текст: абзацы, жирный, курсив',
      title_en: 'Text: paragraphs, bold, italic',
      body_ru: 'Тег <p> создаёт абзац — кусок текста с отступами сверху и снизу. <strong> делает текст жирным (важное слово!). <em> делает его курсивом (акцент). Оба работают внутри абзаца.',
      body_en: 'The <p> tag creates a paragraph — a block of text with space above and below. <strong> makes text bold (important word!). <em> makes it italic (emphasis). Both work inside a paragraph.',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Ссылки — тег <a>',
      title_en: 'Links — the <a> tag',
      body_ru: 'Тег <a> создаёт ссылку. Атрибут href говорит, куда вести. Без href браузер не знает, куда кликать. Атрибут target="_blank" открывает ссылку в новой вкладке — удобно, чтобы пользователь не уходил с твоей страницы.',
      body_en: 'The <a> tag creates a link. The href attribute says where to go. Without href the browser does not know where to click. The attribute target="_blank" opens the link in a new tab — handy so the user does not leave your page.',
    },
    {
      id: 's6b',
      type: 'code-anim',
      title_ru: 'Собираем ссылку шаг за шагом',
      title_en: 'Building a link step by step',
      body_ru: 'Посмотри, как из отдельных частей получается рабочая ссылка.',
      body_en: 'Watch how individual pieces combine into a working link.',
      animMode: 'preview',
      animSteps: [
        {
          code: '<a>',
          comment_ru: 'Открываем тег ссылки',
          comment_en: 'Open the link tag',
        },
        {
          code: '<a href="https://example.com">',
          comment_ru: 'Добавляем href — адрес назначения',
          comment_en: 'Add href — the destination address',
        },
        {
          code: '<a href="https://example.com">Читать статью',
          comment_ru: 'Пишем текст — это увидит пользователь',
          comment_en: 'Write the text — this is what the user sees',
        },
        {
          code: '<a href="https://example.com">Читать статью</a>',
          comment_ru: 'Закрываем тег — ссылка готова!',
          comment_en: 'Close the tag — the link is ready!',
          preview: '<a href="#" style="color:#3B5BDB;font-size:18px;font-family:sans-serif;text-decoration:underline;">Читать статью</a>',
        },
      ],
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Изображения — тег <img>',
      title_en: 'Images — the <img> tag',
      body_ru: 'Тег <img> вставляет картинку. Это одиночный тег — закрывать не нужно. Атрибут src — путь к картинке. Атрибут alt — текст для тех, кто не видит картинку (или если она не загрузилась). Alt очень важен!',
      body_en: 'The <img> tag inserts an image. It is a self-closing tag — no closing tag needed. The src attribute is the path to the image. The alt attribute is text for those who cannot see the image. alt is very important!',
      bullets: [
        { text_ru: 'src — путь к файлу или URL картинки (обязательно)', text_en: 'src — path to the file or image URL (required)' },
        { text_ru: 'alt — текст для незрячих и если картинка не загрузилась (обязательно)', text_en: 'alt — text for screen readers and failed image loads (required)' },
        { text_ru: 'width / height — размер в пикселях (необязательно)', text_en: 'width / height — size in pixels (optional)' },
      ],
    },
    {
      id: 's8',
      type: 'concept',
      title_ru: 'Списки: маркированные и нумерованные',
      title_en: 'Lists: bulleted and numbered',
      body_ru: '<ul> создаёт список с кружочками (неупорядоченный). <ol> создаёт нумерованный список. Каждый пункт — тег <li>. Запомни: ul и ol — это контейнеры, а li — один элемент списка.',
      body_en: '<ul> creates a list with bullet points (unordered). <ol> creates a numbered list. Each item is an <li> tag. Remember: ul and ol are containers, and li is one list item.',
    },
    {
      id: 's8b',
      type: 'compare',
      title_ru: 'ul против ol: когда что выбрать',
      title_en: 'ul vs ol: when to use which',
      body_ru: 'Оба тега создают списки. Разница — в смысле: важен ли порядок пунктов?',
      body_en: 'Both tags create lists. The difference is meaning: does the order of items matter?',
      compareLeft: {
        label_ru: 'ul — маркированный',
        label_en: 'ul — unordered',
        items_ru: [
          'Порядок пунктов не важен',
          'Ингредиенты в рецепте',
          'Список функций сайта',
          'Хобби, навыки, качества',
        ],
        items_en: [
          'Order of items does not matter',
          'Recipe ingredients',
          'Website feature list',
          'Hobbies, skills, qualities',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'ol — нумерованный',
        label_en: 'ol — ordered',
        items_ru: [
          'Порядок пунктов важен',
          'Шаги инструкции',
          'Топ-10 лучших фильмов',
          'Этапы выполнения задания',
        ],
        items_en: [
          'Order of items matters',
          'Steps in an instruction',
          'Top-10 best films',
          'Steps of a task',
        ],
        color: 'amber',
      },
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Попробуй сам!',
      title_en: 'Try it yourself!',
      body_ru: 'Создай страницу о своём городе: заголовок, абзац с описанием, ссылку и список из трёх интересных фактов.',
      body_en: 'Create a page about your city: a heading, a paragraph with a description, a link, and a list of three interesting facts.',
    },
  ],

  content: {
    intro_ru: `Если в прошлом уроке ты познакомился с самим понятием тега, то сегодня мы
разберём конкретные теги, которые встречаются на каждом сайте. Заголовки, абзацы,
ссылки, картинки, списки — вот из чего сделан почти любой сайт в интернете.
Освоив эти теги, ты уже сможешь написать настоящую веб-страницу.`,
    intro_en: `If in the last lesson you got familiar with the very concept of a tag, today we
will look at specific tags that appear on every website. Headings, paragraphs,
links, images, lists — these are the building blocks of almost every website on
the internet. Master these tags and you will be able to write a real web page.`,

    blocks: [
      {
        sectionId: 'headings',
        heading_ru: 'Заголовки h1–h6',
        heading_en: 'Headings h1–h6',
        text_ru: `HTML предоставляет шесть уровней заголовков — от h1 (самый важный) до h6
(наименее важный). Браузер сам делает их разного размера: h1 огромный, h6 чуть
крупнее обычного текста. Правило: на каждой странице должен быть ровно один h1 —
это «название» всей страницы. Для разделов используй h2, для подразделов — h3.`,
        text_en: `HTML provides six heading levels — from h1 (most important) to h6
(least important). The browser automatically makes them different sizes: h1 is huge,
h6 is just slightly bigger than normal text. Rule: every page should have exactly
one h1 — it is the "title" of the whole page. Use h2 for sections, h3 for subsections.`,
        code: `<h1>Моя любимая книга</h1>
<h2>О чём эта книга</h2>
<h3>Главный герой</h3>
<p>Здесь идёт обычный текст абзаца.</p>`,
        codeLang: 'html',
      },
      {
        sectionId: 'text-tags',
        heading_ru: 'Текст: p, strong, em',
        heading_en: 'Text: p, strong, em',
        text_ru: `Тег <p> — это абзац. Браузер автоматически ставит отступы сверху и снизу,
чтобы абзацы не сливались. Внутри абзаца можно использовать <strong> для важных
слов (они станут жирными) и <em> для акцентирования (курсив). Эти теги называются
«строчными» — они работают внутри текста, не начиная новой строки.`,
        text_en: `The <p> tag is a paragraph. The browser automatically adds spacing above
and below so paragraphs do not run together. Inside a paragraph you can use <strong>
for important words (they become bold) and <em> for emphasis (italic). These are
called "inline" tags — they work inside text without starting a new line.`,
        code: `<p>Сегодня я учу <strong>HTML</strong> — это очень <em>интересно</em>!</p>
<p>Второй абзац идёт здесь.</p>`,
        codeLang: 'html',
      },
      {
        sectionId: 'links',
        heading_ru: 'Ссылки — тег <a>',
        heading_en: 'Links — the <a> tag',
        text_ru: `Ссылки — это то, что делает интернет «интернетом». Тег <a> создаёт
кликабельный текст. Атрибут href (HyperText Reference) — адрес назначения. Без него
тег <a> есть, но кликать некуда. Добавь target="_blank" и ссылка откроется в новой
вкладке. Текст между тегами — это то, что увидит пользователь.`,
        text_en: `Links are what make the internet the "internet". The <a> tag creates
clickable text. The href attribute (HyperText Reference) is the destination address.
Without it the <a> tag exists but has nowhere to go. Add target="_blank" and the link
will open in a new tab. The text between the tags is what the user will see.`,
        code: `<!-- Обычная ссылка -->
<a href="https://example.com">Перейти на сайт</a>

<!-- Открыть в новой вкладке -->
<a href="https://example.com" target="_blank">Открыть в новой вкладке</a>`,
        codeLang: 'html',
      },
      {
        sectionId: 'images',
        heading_ru: 'Изображения — тег <img>',
        heading_en: 'Images — the <img> tag',
        text_ru: `Тег <img> — один из немногих «одиночных» тегов: у него нет закрывающего
брата-близнеца. Атрибут src указывает путь к файлу картинки (или URL). Атрибут alt
содержит текстовое описание — оно появится, если картинка не загрузится, и его
зачитывают вслух программы для незрячих пользователей. Всегда пиши alt!`,
        text_en: `The <img> tag is one of the few "self-closing" tags: it has no closing
twin. The src attribute gives the path to the image file (or a URL). The alt
attribute contains a text description — it appears if the image fails to load, and
screen readers read it aloud for users who cannot see. Always write alt!`,
        code: `<!-- Картинка из интернета -->
<img src="https://placekitten.com/300/200" alt="Милый котик">

<!-- Картинка из папки проекта -->
<img src="images/photo.jpg" alt="Моя фотография" width="400">`,
        codeLang: 'html',
      },
      {
        sectionId: 'lists',
        heading_ru: 'Списки: ul и ol',
        heading_en: 'Lists: ul and ol',
        text_ru: `HTML поддерживает два вида списков. <ul> (unordered list) — неупорядоченный
список с точками или кружочками. <ol> (ordered list) — нумерованный список:
браузер сам ставит цифры 1, 2, 3... Внутри обоих используется тег <li> (list item)
для каждого пункта. Список можно вложить в другой список, чтобы создать подуровни.`,
        text_en: `HTML supports two kinds of lists. <ul> (unordered list) is a bullet-point
list. <ol> (ordered list) is a numbered list: the browser automatically adds 1, 2,
3... Both use the <li> tag (list item) for each entry. You can nest a list inside
another list to create sub-levels.`,
        code: `<!-- Неупорядоченный список -->
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
</ul>

<!-- Нумерованный список -->
<ol>
  <li>Открой редактор</li>
  <li>Напиши код</li>
  <li>Посмотри результат</li>
</ol>`,
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: страница о городе',
    title_en: 'Try it yourself: a page about a city',
    instructions_ru: `Создай страницу о любом городе. Она должна содержать:
— заголовок h1 с названием города
— абзац p с коротким описанием
— ссылку a на Википедию о городе
— список ul из трёх интересных фактов о городе
Нажми «Запустить» и посмотри на результат!`,
    instructions_en: `Create a page about any city. It should include:
— an h1 heading with the city name
— a p paragraph with a short description
— an a link to the city's Wikipedia page
— a ul list of three interesting facts about the city
Press "Run" and see the result!`,
    activeTabs: ['html'],
    starterCode: {
      html: `<h1>Название города</h1>

<p>Короткое описание города.</p>

<a href="https://ru.wikipedia.org/wiki/..." target="_blank">Читать в Википедии</a>

<ul>
  <li>Факт 1</li>
  <li>Факт 2</li>
  <li>Факт 3</li>
</ul>`,
    },
    hints_ru: [
      'Атрибут href у тега <a> — это адрес ссылки. Не забудь https://',
      'Каждый пункт списка — отдельный тег <li> внутри <ul>.',
    ],
    hints_en: [
      'The href attribute of <a> is the link address. Do not forget https://',
      'Each list item is a separate <li> tag inside <ul>.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'h1–h6', term_en: 'h1–h6',
      definition_ru: 'Теги заголовков шести уровней. h1 — самый важный, h6 — наименее важный.',
      definition_en: 'Heading tags of six levels. h1 is the most important, h6 the least.',
      example_ru: '<h1>Главный заголовок</h1>',
      example_en: '<h1>Main heading</h1>',
    },
    {
      term_ru: '<p>', term_en: '<p>',
      definition_ru: 'Тег абзаца. Создаёт отдельный блок текста с отступами сверху и снизу.',
      definition_en: 'Paragraph tag. Creates a block of text with spacing above and below.',
      example_ru: '<p>Это абзац текста.</p>',
      example_en: '<p>This is a paragraph.</p>',
    },
    {
      term_ru: '<a href="...">',
      term_en: '<a href="...">',
      definition_ru: 'Тег ссылки. Атрибут href задаёт адрес назначения.',
      definition_en: 'Link tag. The href attribute sets the destination address.',
      example_ru: '<a href="https://google.com">Открыть Google</a>',
      example_en: '<a href="https://google.com">Open Google</a>',
    },
    {
      term_ru: '<img src="..." alt="...">',
      term_en: '<img src="..." alt="...">',
      definition_ru: 'Тег изображения. src — путь к файлу, alt — текстовое описание картинки.',
      definition_en: 'Image tag. src is the file path, alt is the text description of the image.',
      example_ru: '<img src="cat.jpg" alt="Рыжий кот">',
      example_en: '<img src="cat.jpg" alt="Orange cat">',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Тег <a> придумал Тим Бернерс-Ли — именно он сделал интернет кликабельным. До ссылок все страницы были просто текстом.',
      text_en: 'The <a> tag was invented by Tim Berners-Lee — he is the one who made the internet clickable. Before links, all pages were just plain text.',
    },
    {
      text_ru: 'Атрибут alt в теге <img> зачитывается вслух программами-читалками для незрячих пользователей. Хороший alt делает сайт доступным для всех.',
      text_en: 'The alt attribute in <img> is read aloud by screen readers for visually impaired users. A good alt makes a website accessible to everyone.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой тег создаёт самый большой заголовок?',
      text_en: 'Which tag creates the biggest heading?',
      options_ru: ['<h6>', '<h1>', '<big>', '<title>'],
      options_en: ['<h6>', '<h1>', '<big>', '<title>'],
      correctIndex: 1,
      explanation_ru: '<h1> — заголовок первого уровня, самый крупный. h6 — самый мелкий.',
      explanation_en: '<h1> is the level-one heading, the biggest. h6 is the smallest.',
    },
    {
      id: 'q2',
      text_ru: 'Что делает тег <p>?',
      text_en: 'What does the <p> tag do?',
      options_ru: ['Создаёт картинку', 'Создаёт ссылку', 'Создаёт абзац текста', 'Делает текст жирным'],
      options_en: ['Creates an image', 'Creates a link', 'Creates a paragraph of text', 'Makes text bold'],
      correctIndex: 2,
      explanation_ru: '<p> — paragraph (абзац). Браузер добавляет отступы сверху и снизу.',
      explanation_en: '<p> stands for paragraph. The browser adds spacing above and below.',
    },
    {
      id: 'q3',
      text_ru: 'Какой атрибут тега <a> задаёт адрес ссылки?',
      text_en: 'Which attribute of <a> sets the link address?',
      options_ru: ['src', 'alt', 'href', 'link'],
      options_en: ['src', 'alt', 'href', 'link'],
      correctIndex: 2,
      explanation_ru: 'href (HyperText Reference) — обязательный атрибут ссылки с адресом назначения.',
      explanation_en: 'href (HyperText Reference) — the required link attribute with the destination.',
    },
    {
      id: 'q4',
      text_ru: 'Чем тег <img> особенный?',
      text_en: 'What is special about the <img> tag?',
      options_ru: ['Он всегда красный', 'У него нет закрывающего тега', 'Он работает только в <body>', 'Ему не нужен атрибут src'],
      options_en: ['It is always red', 'It has no closing tag', 'It only works inside <body>', 'It does not need a src attribute'],
      correctIndex: 1,
      explanation_ru: '<img> — самозакрывающийся (одиночный) тег. Нет </img>!',
      explanation_en: '<img> is self-closing (a void tag). There is no </img>!',
    },
    {
      id: 'q5',
      text_ru: 'Какой тег содержит каждый пункт списка?',
      text_en: 'Which tag contains each list item?',
      options_ru: ['<ul>', '<ol>', '<list>', '<li>'],
      options_en: ['<ul>', '<ol>', '<list>', '<li>'],
      correctIndex: 3,
      explanation_ru: '<li> (list item) — тег отдельного пункта. Он идёт внутри <ul> или <ol>.',
      explanation_en: '<li> (list item) is the tag for a single entry. It goes inside <ul> or <ol>.',
    },
  ],
}
