import type { Lesson } from '@/types/lesson'

export const htmlStructure: Lesson = {
  slug: 'html-structure',
  category: 'HTML',
  readTime: 9,
  icon: '🏛️',

  title_ru: 'Структура HTML-документа',
  title_en: 'HTML Document Structure',

  description_ru: 'Каркас любой веб-страницы: DOCTYPE, html, head, body и семантические теги.',
  description_en: 'The skeleton of every web page: DOCTYPE, html, head, body and semantic tags.',

  sections: [
    { id: 'skeleton',     title_ru: 'Каркас страницы',       title_en: 'Page skeleton' },
    { id: 'head-section', title_ru: 'Тег head',              title_en: 'The head tag' },
    { id: 'body-section', title_ru: 'Тег body',              title_en: 'The body tag' },
    { id: 'semantic',     title_ru: 'Семантические теги',    title_en: 'Semantic tags' },
    { id: 'key-terms',    title_ru: 'Важные слова',           title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Анатомия HTML-страницы',
      title_en: 'Anatomy of an HTML page',
      body_ru: 'Каждая страница в интернете выглядит по-разному, но внутри у всех одна и та же структура. Сегодня разберём её до последней строчки.',
      body_en: 'Every page on the internet looks different, but inside they all share the same structure. Today we will take it apart line by line.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Страница — как дом',
      title_en: 'A page is like a house',
      body_ru: 'Представь, что веб-страница — это дом. DOCTYPE — это разрешение на строительство. Тег <html> — стены вокруг всего. <head> — чердак: снаружи не видно, но там важные вещи. <body> — жилые комнаты: здесь всё, что видит гость.',
      body_en: 'Imagine a web page is a house. DOCTYPE is the building permit. The <html> tag is the walls around everything. <head> is the attic: invisible from outside but full of important things. <body> is the living rooms: everything the guest can see.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'DOCTYPE — приветствие браузеру',
      title_en: 'DOCTYPE — a greeting to the browser',
      body_ru: '<!DOCTYPE html> — это первая строка любого HTML-файла. Она говорит браузеру: «Привет! Это современный HTML5, читай правильно». Без неё браузер включает «режим совместимости» со старыми сайтами и страница может выглядеть странно.',
      body_en: '<!DOCTYPE html> is the very first line of any HTML file. It tells the browser: "Hello! This is modern HTML5, read it correctly." Without it the browser switches to a "quirks mode" for old sites and the page may look odd.',
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Полный каркас страницы',
      title_en: 'The complete page skeleton',
      body_ru: 'Вот минимальная структура, которую нужно знать наизусть. Каждая страница начинается именно так.',
      body_en: 'Here is the minimal structure to learn by heart. Every page starts exactly like this.',
      code: `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Моя страница</title>
  </head>
  <body>
    <h1>Привет!</h1>
    <p>Содержимое страницы.</p>
  </body>
</html>`,
      codeLang: 'html',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'head — секретная начинка',
      title_en: 'head — the hidden filling',
      body_ru: 'В теге <head> хранится то, что браузер использует, но пользователь не видит напрямую. Самое важное: <title> — текст на вкладке браузера. <meta charset="UTF-8"> — кодировка (чтобы русские буквы не превращались в иероглифы). Также здесь подключают CSS и другие ресурсы.',
      body_en: 'The <head> tag stores things the browser uses but the user does not see directly. Most important: <title> — the text on the browser tab. <meta charset="UTF-8"> — the character encoding (so letters do not turn into question marks). CSS and other resources are also linked here.',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'body — всё что видишь ты',
      title_en: 'body — everything you see',
      body_ru: 'Всё, что находится внутри <body>, браузер показывает на экране: заголовки, тексты, картинки, кнопки, формы. Если написать что-то вне тега <body> — браузер попробует справиться сам, но результат непредсказуем. Всегда клади контент в <body>.',
      body_en: 'Everything inside <body> is displayed by the browser on screen: headings, text, images, buttons, forms. Writing something outside <body> — the browser will try to cope on its own, but the result is unpredictable. Always put content inside <body>.',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Семантика: называй вещи своими именами',
      title_en: 'Semantics: call things by their proper names',
      body_ru: 'HTML5 добавил «умные» теги, которые описывают роль части страницы. <header> — шапка. <nav> — навигация. <main> — основной контент. <footer> — подвал. <section> — раздел. <article> — отдельная статья. Это помогает поисковикам, читалкам для незрячих и самому себе — потом легче понять свой код.',
      body_en: 'HTML5 added "smart" tags that describe the role of a page section. <header> — the top banner. <nav> — navigation. <main> — the main content. <footer> — the bottom strip. <section> — a section. <article> — a standalone article. This helps search engines, screen readers, and yourself — your code is easier to understand later.',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Браузеры очень снисходительны: даже без DOCTYPE и правильного каркаса страница обычно открывается. Но без правильной структуры поисковики хуже находят сайт, а пользователям с ограниченными возможностями тяжело его читать.',
      body_en: 'Browsers are very forgiving: even without a DOCTYPE and a proper skeleton the page usually opens. But without the right structure, search engines find the site less easily, and users with disabilities struggle to read it.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Построй правильную страницу!',
      title_en: 'Build a proper page!',
      body_ru: 'Время практики: создай полноценный HTML-документ с правильным каркасом, title, семантическими тегами и настоящим содержимым.',
      body_en: 'Practice time: create a complete HTML document with the correct skeleton, a title, semantic tags and real content.',
    },
  ],

  content: {
    intro_ru: `Ты уже знаешь отдельные HTML-теги. Теперь пора собрать их в настоящий
документ. У каждой веб-страницы — своя структура, как у письма: шапка, тело, подпись.
Браузер умеет читать HTML и без этой структуры, но тогда страница работает «вслепую».
Правильный каркас — это профессиональная привычка, которая экономит часы отладки.`,
    intro_en: `You already know individual HTML tags. Now it is time to assemble them into
a real document. Every web page has a structure, like a letter: a header, a body, a
footer. The browser can read HTML without this structure, but then the page works
"blindly". A proper skeleton is a professional habit that saves hours of debugging.`,

    blocks: [
      {
        sectionId: 'skeleton',
        heading_ru: 'Каркас страницы',
        heading_en: 'Page skeleton',
        text_ru: `Минимальный HTML-документ состоит из пяти частей:
1. <!DOCTYPE html> — объявление версии HTML (всегда первая строка).
2. <html> — корневой тег, оборачивает всё остальное. Атрибут lang="ru" помогает браузеру и поисковикам понять язык страницы.
3. <head> — невидимая секция с метаданными.
4. <body> — видимая часть страницы.
5. Закрывающие теги </body> и </html> в конце.

Запомни этот порядок — он не меняется никогда.`,
        text_en: `A minimal HTML document has five parts:
1. <!DOCTYPE html> — the HTML version declaration (always the first line).
2. <html> — the root tag, wrapping everything else. The lang="en" attribute helps browsers and search engines understand the page language.
3. <head> — the invisible section with metadata.
4. <body> — the visible part of the page.
5. Closing tags </body> and </html> at the end.

Memorise this order — it never changes.`,
        code: `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Моя страница</title>
  </head>
  <body>
    <h1>Привет, мир!</h1>
    <p>Это правильно оформленная HTML-страница.</p>
  </body>
</html>`,
        codeLang: 'html',
      },
      {
        sectionId: 'head-section',
        heading_ru: 'Тег head',
        heading_en: 'The head tag',
        text_ru: `Внутри <head> находятся «инструкции» для браузера, которые не отображаются
на странице. Самые важные:

• <title>Название</title> — текст на вкладке браузера. Это первое, что видят в поисковых результатах.
• <meta charset="UTF-8"> — кодировка символов. Без неё русские буквы превратятся в кракозябры.
• <meta name="viewport" content="width=device-width, initial-scale=1.0"> — правильное отображение на телефонах.
• <link rel="stylesheet" href="style.css"> — подключение CSS-файла со стилями.`,
        text_en: `Inside <head> there are "instructions" for the browser that are not shown on the page. The most important:

• <title>Name</title> — text on the browser tab. This is the first thing shown in search results.
• <meta charset="UTF-8"> — character encoding. Without it letters turn into garbage characters.
• <meta name="viewport" content="width=device-width, initial-scale=1.0"> — correct display on phones.
• <link rel="stylesheet" href="style.css"> — linking a CSS file for styles.`,
        code: `<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Мой первый сайт</title>
  <link rel="stylesheet" href="style.css">
</head>`,
        codeLang: 'html',
      },
      {
        sectionId: 'semantic',
        heading_ru: 'Семантические теги',
        heading_en: 'Semantic tags',
        text_ru: `До HTML5 разработчики делали разметку из бесконечных <div>. Браузер не
мог понять, что значит каждый блок. HTML5 добавил «смысловые» теги:

• <header> — шапка сайта (логотип, навигация).
• <nav> — блок навигации (меню).
• <main> — основной контент страницы (один на странице).
• <section> — тематический раздел.
• <article> — самостоятельная статья или пост.
• <aside> — боковая колонка (дополнительная информация).
• <footer> — подвал (контакты, копирайт).

Используй их — это хорошая практика.`,
        text_en: `Before HTML5 developers built layouts from endless <div> tags. The browser
could not understand what each block meant. HTML5 added "meaningful" tags:

• <header> — the site header (logo, navigation).
• <nav> — the navigation block (menu).
• <main> — the main content of the page (only one per page).
• <section> — a thematic section.
• <article> — a standalone article or post.
• <aside> — a sidebar (supplementary information).
• <footer> — the bottom strip (contacts, copyright).

Use them — it is good practice.`,
        code: `<body>
  <header>
    <h1>Мой сайт</h1>
    <nav>
      <a href="/">Главная</a>
      <a href="/about">О нас</a>
    </nav>
  </header>

  <main>
    <section>
      <h2>Последние новости</h2>
      <article>
        <h3>Заголовок статьи</h3>
        <p>Текст статьи...</p>
      </article>
    </section>
  </main>

  <footer>
    <p>© 2025 Мой сайт</p>
  </footer>
</body>`,
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: построй настоящую страницу',
    title_en: 'Try it yourself: build a real page',
    instructions_ru: `Создай полноценный HTML-документ о себе. Он должен содержать:
— Правильный каркас: DOCTYPE, html, head (с title и meta charset), body
— Внутри body: header с твоим именем, main с section, footer с годом
— Хотя бы один абзац и один список внутри section
Нажми «Запустить» и проверь, что всё выглядит правильно!`,
    instructions_en: `Create a complete HTML document about yourself. It should include:
— The correct skeleton: DOCTYPE, html, head (with title and meta charset), body
— Inside body: a header with your name, a main with a section, a footer with the year
— At least one paragraph and one list inside the section
Press "Run" and check that everything looks correct!`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ru">
  <head>
    <meta charset="UTF-8">
    <title>Страница о себе</title>
  </head>
  <body>

    <header>
      <h1>Моё имя</h1>
    </header>

    <main>
      <section>
        <h2>О себе</h2>
        <p>Здесь напиши пару слов о себе.</p>
        <ul>
          <li>Моё хобби 1</li>
          <li>Моё хобби 2</li>
        </ul>
      </section>
    </main>

    <footer>
      <p>© 2025</p>
    </footer>

  </body>
</html>`,
    },
    hints_ru: [
      'Не забудь закрыть все теги: </header>, </main>, </footer>.',
      'Порядок важен: <head> идёт перед <body>, никогда после.',
    ],
    hints_en: [
      'Do not forget to close all tags: </header>, </main>, </footer>.',
      'Order matters: <head> comes before <body>, never after.',
    ],
  },

  keyTerms: [
    {
      term_ru: '<!DOCTYPE html>',
      term_en: '<!DOCTYPE html>',
      definition_ru: 'Первая строка HTML-файла. Сообщает браузеру, что документ написан на HTML5.',
      definition_en: 'The first line of an HTML file. Tells the browser the document is written in HTML5.',
      example_ru: 'Всегда первая строка файла, без исключений.',
      example_en: 'Always the very first line of the file, no exceptions.',
    },
    {
      term_ru: '<head>',
      term_en: '<head>',
      definition_ru: 'Невидимая секция HTML-документа с метаданными: кодировкой, title, CSS.',
      definition_en: 'The invisible section of an HTML document with metadata: encoding, title, CSS.',
      example_ru: '<head> содержит <title> и <meta charset="UTF-8">.',
      example_en: '<head> contains <title> and <meta charset="UTF-8">.',
    },
    {
      term_ru: '<body>',
      term_en: '<body>',
      definition_ru: 'Видимая часть HTML-документа. Всё что написано внутри — браузер показывает пользователю.',
      definition_en: 'The visible part of an HTML document. Everything inside is shown to the user by the browser.',
      example_ru: 'Заголовки, текст и картинки — всё в <body>.',
      example_en: 'Headings, text and images — all inside <body>.',
    },
    {
      term_ru: 'Семантический тег',
      term_en: 'Semantic tag',
      definition_ru: 'Тег, название которого описывает роль содержимого: <header>, <main>, <footer>, <nav>.',
      definition_en: 'A tag whose name describes the role of its content: <header>, <main>, <footer>, <nav>.',
      example_ru: '<footer> — подвал сайта, <nav> — навигация.',
      example_en: '<footer> — the site footer, <nav> — the navigation.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Браузеры очень снисходительны: даже если забыть DOCTYPE или закрывающий тег, страница обычно всё равно откроется. Но так делать не стоит — это «добрая воля» браузера, а не правило.',
      text_en: 'Browsers are very forgiving: even if you forget the DOCTYPE or a closing tag, the page usually opens anyway. But you should not rely on this — it is the browser\'s goodwill, not a rule.',
    },
    {
      text_ru: 'Стандарт HTML5 был официально опубликован в 2014 году. Именно тогда в стандарт вошли семантические теги — <header>, <main>, <footer> и другие.',
      text_en: 'The HTML5 standard was officially published in 2014. That is when semantic tags — <header>, <main>, <footer> and others — entered the standard.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что говорит браузеру строка <!DOCTYPE html>?',
      text_en: 'What does <!DOCTYPE html> tell the browser?',
      options_ru: ['Что документ написан на Python', 'Что это современный HTML5', 'Что страница только для телефонов', 'Что нужно загрузить CSS'],
      options_en: ['That the document is written in Python', 'That this is modern HTML5', 'That the page is for phones only', 'That CSS should be loaded'],
      correctIndex: 1,
      explanation_ru: 'DOCTYPE говорит браузеру, что это HTML5, и включает правильный режим отображения.',
      explanation_en: 'DOCTYPE tells the browser this is HTML5 and enables the correct rendering mode.',
    },
    {
      id: 'q2',
      text_ru: 'Где написан текст, который появляется на вкладке браузера?',
      text_en: 'Where is the text written that appears on the browser tab?',
      options_ru: ['<body>', '<h1>', '<title>', '<meta>'],
      options_en: ['<body>', '<h1>', '<title>', '<meta>'],
      correctIndex: 2,
      explanation_ru: 'Тег <title> внутри <head> задаёт название вкладки в браузере.',
      explanation_en: 'The <title> tag inside <head> sets the browser tab name.',
    },
    {
      id: 'q3',
      text_ru: 'В каком разделе находится содержимое, которое видит пользователь?',
      text_en: 'In which section is the content the user sees?',
      options_ru: ['<head>', '<html>', '<title>', '<body>'],
      options_en: ['<head>', '<html>', '<title>', '<body>'],
      correctIndex: 3,
      explanation_ru: 'Всё видимое содержимое — заголовки, текст, картинки — находится внутри <body>.',
      explanation_en: 'All visible content — headings, text, images — lives inside <body>.',
    },
    {
      id: 'q4',
      text_ru: 'Для чего используется тег <main>?',
      text_en: 'What is the <main> tag used for?',
      options_ru: ['Для главного заголовка', 'Для основного содержимого страницы', 'Для шапки сайта', 'Для подвала сайта'],
      options_en: ['For the main heading', 'For the main content of the page', 'For the site header', 'For the site footer'],
      correctIndex: 1,
      explanation_ru: '<main> обозначает основное (уникальное) содержимое страницы. На странице может быть только один <main>.',
      explanation_en: '<main> marks the primary (unique) content of the page. There can be only one <main> per page.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает тег "семантическим"?',
      text_en: 'What makes a tag "semantic"?',
      options_ru: ['Он меняет цвет текста', 'Его название описывает роль содержимого', 'Он работает только в HTML5', 'Он содержит JavaScript'],
      options_en: ['It changes text colour', 'Its name describes the role of the content', 'It only works in HTML5', 'It contains JavaScript'],
      correctIndex: 1,
      explanation_ru: 'Семантический тег — это тег, имя которого несёт смысл: <footer> явно говорит «это подвал», а <div> — нет.',
      explanation_en: 'A semantic tag is one whose name carries meaning: <footer> clearly says "this is a footer", while <div> does not.',
    },
  ],
}
