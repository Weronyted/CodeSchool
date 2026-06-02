import type { Lesson } from '@/types/lesson'

export const introToHtml: Lesson = {
  slug: 'intro-to-html',
  category: 'HTML',
  readTime: 7,
  icon: '🏗️',

  title_ru: 'Что такое HTML',
  title_en: 'What is HTML',

  description_ru: 'Знакомимся с языком, на котором написаны все сайты в мире.',
  description_en: 'Meet the language every website in the world is built with.',

  sections: [
    { id: 'what-is-html',       title_ru: 'Что такое HTML',              title_en: 'What is HTML' },
    { id: 'how-page-works',     title_ru: 'Как браузер строит страницу', title_en: 'How the browser builds a page' },
    { id: 'first-tag',          title_ru: 'Твой первый тег',             title_en: 'Your first tag' },
    { id: 'document-structure', title_ru: 'Структура документа',         title_en: 'Document structure' },
    { id: 'key-terms',          title_ru: 'Важные слова',                title_en: 'Key terms' },
  ],

  slides: [
    // ── s1: title ─────────────────────────────────────────────────────────────
    {
      id: 's1',
      type: 'title',
      title_ru: 'Что такое HTML?',
      title_en: 'What is HTML?',
      body_ru: 'Сегодня ты узнаешь, на каком языке «разговаривают» все сайты в интернете — и напишешь свой первый HTML-код.',
      body_en: 'Today you will learn the language that every website on the internet speaks — and write your first HTML code.',
      visual: { kind: 'emoji', emojis: ['🌐', '🏗️', '💻'] },
    },

    // ── s2: analogy — сайт как человек (эмодзи + пункты) ────────────────────
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Сайт — как человек',
      title_en: 'A website is like a person',
      body_ru: 'У человека есть скелет, одежда и мозг. У сайта — то же самое, только в цифре.',
      body_en: 'A person has a skeleton, clothes and a brain. A website has exactly the same — just digital.',
      visual: {
        kind: 'emoji',
        emojis: ['🦴', '👗', '🧠'],
        caption_ru: 'HTML — CSS — JavaScript',
        caption_en: 'HTML — CSS — JavaScript',
      },
      bullets: [
        { text_ru: '🦴 HTML — скелет: что находится на странице и в каком порядке', text_en: '🦴 HTML — skeleton: what is on the page and in what order' },
        { text_ru: '👗 CSS — одежда: цвета, шрифты, отступы и красота', text_en: '👗 CSS — clothing: colours, fonts, spacing and beauty' },
        { text_ru: '🧠 JavaScript — мозг: что страница умеет делать', text_en: '🧠 JavaScript — brain: what the page can actually do' },
      ],
    },

    // ── s3: concept — расшифровка ─────────────────────────────────────────────
    {
      id: 's3',
      type: 'concept',
      title_ru: 'HTML расшифровывается',
      title_en: 'HTML stands for',
      body_ru: 'HyperText Markup Language — «язык разметки гипертекста». Слово «разметка» здесь главное: мы не пишем программу, мы РАЗМЕЧАЕМ текст — говорим браузеру: «это заголовок», «это абзац», «это картинка».',
      body_en: 'HyperText Markup Language. The key word is "markup": we are not writing a program, we are MARKING UP text — telling the browser: "this is a heading", "this is a paragraph", "this is an image".',
    },

    // ── s4: concept — браузер как читатель (SVG-схема pipeline) ─────────────
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Браузер — это читатель',
      title_en: 'The browser is a reader',
      body_ru: 'Ты пишешь HTML — обычный текст со специальными пометками. Браузер читает его и превращает в страницу, которую ты видишь. HTML — инструкция, страница — результат.',
      body_en: 'You write HTML — plain text with special marks. The browser reads it and turns it into the page you see. HTML is the instruction, the page is the result.',
      visual: {
        kind: 'svg',
        svg: `<svg viewBox="0 0 500 110" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect x="0" y="20" width="130" height="70" rx="14" fill="#3B5BDB"/>
  <text x="65" y="51" text-anchor="middle" fill="white" font-size="16" font-weight="bold" font-family="monospace">HTML</text>
  <text x="65" y="71" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="12" font-family="system-ui,sans-serif">файл</text>
  <line x1="132" y1="55" x2="175" y2="55" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <polygon points="173,49 186,55 173,61" fill="rgba(255,255,255,0.4)"/>
  <rect x="187" y="20" width="140" height="70" rx="14" fill="#7950F2"/>
  <text x="257" y="51" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="system-ui,sans-serif">Браузер</text>
  <text x="257" y="71" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="12" font-family="system-ui,sans-serif">читает</text>
  <line x1="329" y1="55" x2="372" y2="55" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
  <polygon points="370,49 383,55 370,61" fill="rgba(255,255,255,0.4)"/>
  <rect x="384" y="20" width="116" height="70" rx="14" fill="#2f9e44"/>
  <text x="442" y="51" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="system-ui,sans-serif">Страница</text>
  <text x="442" y="71" text-anchor="middle" fill="rgba(255,255,255,0.7)" font-size="12" font-family="system-ui,sans-serif">готова ✓</text>
</svg>`,
        caption_ru: 'HTML-файл → Браузер читает → Страница готова',
        caption_en: 'HTML file → Browser reads → Page is ready',
      },
    },

    // ── s4b: code-anim — анимация: тег рождается ──────────────────────────────
    {
      id: 's4b',
      type: 'code-anim',
      title_ru: 'Смотри, как рождается тег',
      title_en: 'Watch a tag come to life',
      body_ru: 'Каждый HTML-элемент строится в три шага: открывающий тег, содержимое, закрывающий тег.',
      body_en: 'Every HTML element is built in three steps: opening tag, content, closing tag.',
      animMode: 'preview',
      animSteps: [
        {
          code: '<h1>',
          comment_ru: 'Открывающий тег — он начинает элемент',
          comment_en: 'Opening tag — it starts the element',
        },
        {
          code: '<h1>Привет, мир!',
          comment_ru: 'Добавляем текст — содержимое между тегами',
          comment_en: 'We add text — the content between the tags',
        },
        {
          code: '<h1>Привет, мир!</h1>',
          comment_ru: 'Закрывающий тег — элемент готов, браузер его показывает!',
          comment_en: 'Closing tag — element complete, the browser shows it!',
          preview: '<h1 style="color:#3B5BDB;font-family:system-ui,sans-serif;margin:0">Привет, мир!</h1>',
        },
      ],
    },

    // ── s5: code — статичный пример тега ──────────────────────────────────────
    {
      id: 's5',
      type: 'code',
      title_ru: 'Как выглядит тег',
      title_en: 'What a tag looks like',
      body_ru: 'Пометки в HTML называются тегами. У тега почти всегда есть открытие и закрытие — как скобки. Между ними — содержимое.',
      body_en: 'The marks in HTML are called tags. A tag almost always has an opening and a closing — like brackets. The content goes between them.',
      code: '<h1>Привет, мир!</h1>',
      codeLang: 'html',
    },

    // ── s6: concept — разбираем тег по частям ────────────────────────────────
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Разбираем тег по частям',
      title_en: 'A tag piece by piece',
      body_ru: '<h1> — открывающий тег. </h1> — закрывающий тег (с косой чертой). «Привет, мир!» — содержимое. h1 значит «заголовок первого уровня» — самый крупный заголовок на странице.',
      body_en: '<h1> is the opening tag. </h1> is the closing tag (with a slash). "Hello, world!" is the content. h1 means "heading level 1" — the biggest heading on the page.',
    },

    // ── s6b: compare — с тегами и без ────────────────────────────────────────
    {
      id: 's6b',
      type: 'compare',
      title_ru: 'Зачем вообще нужны теги?',
      title_en: 'Why do we even need tags?',
      body_ru: 'Без тегов браузер не знает, что важно, а что нет — весь текст выглядит одинаково.',
      body_en: 'Without tags the browser does not know what matters — all text looks the same.',
      compareLeft: {
        label_ru: 'С тегами HTML',
        label_en: 'With HTML tags',
        items_ru: [
          '<h1> делает заголовок крупным',
          '<p> создаёт отдельный абзац',
          'Браузер понимает структуру',
          'Поисковики видят важные слова',
        ],
        items_en: [
          '<h1> makes a heading large',
          '<p> creates a separate paragraph',
          'Browser understands the structure',
          'Search engines spot key words',
        ],
        color: 'green',
      },
      compareRight: {
        label_ru: 'Без тегов',
        label_en: 'Without tags',
        items_ru: [
          'Весь текст одного размера',
          'Нет заголовков и абзацев',
          'Браузер теряется',
          'Поисковики ничего не выделят',
        ],
        items_en: [
          'All text is the same size',
          'No headings or paragraphs',
          'Browser gets confused',
          'Search engines find nothing',
        ],
        color: 'red',
      },
    },

    // ── s7: tip — Тим Бернерс-Ли ────────────────────────────────────────────
    {
      id: 's7',
      type: 'tip',
      title_ru: 'Кто придумал HTML?',
      title_en: 'Who invented HTML?',
      body_ru: 'HTML придумал британский учёный Тим Бернерс-Ли в 1989–1991 годах. Работая в ЦЕРН, он хотел создать способ, которым учёные могли бы легко делиться документами через интернет. Он мог запатентовать изобретение и стать миллиардером — но отдал его миру бесплатно.',
      body_en: 'HTML was invented by British scientist Tim Berners-Lee in 1989–1991. Working at CERN, he wanted to create a way for scientists to easily share documents over the internet. He could have patented the invention and become a billionaire — but gave it to the world for free.',
      visual: {
        kind: 'emoji',
        emojis: ['👨‍💻', '🌐', '🎁'],
        caption_ru: 'Тим Бернерс-Ли подарил HTML всему миру бесплатно',
        caption_en: 'Tim Berners-Lee gave HTML to the whole world for free',
      },
    },

    // ── s7b: concept — версии HTML ────────────────────────────────────────────
    {
      id: 's7b',
      type: 'concept',
      title_ru: 'HTML развивается',
      title_en: 'HTML keeps evolving',
      body_ru: 'За 30+ лет HTML вырос от простого текстового формата до мощного языка разметки. Сегодня мы используем HTML5 — самую современную версию.',
      body_en: 'Over 30+ years HTML grew from a simple text format into a powerful markup language. Today we use HTML5 — the most modern version.',
      bullets: [
        { text_ru: '1991 — HTML 1.0: только текст и ссылки', text_en: '1991 — HTML 1.0: only text and links' },
        { text_ru: '1995 — HTML 2.0: добавились формы', text_en: '1995 — HTML 2.0: forms added' },
        { text_ru: '1997 — HTML 4.0: таблицы, картинки, скрипты', text_en: '1997 — HTML 4.0: tables, images, scripts' },
        { text_ru: '2014 — HTML5: видео, аудио, canvas, семантика', text_en: '2014 — HTML5: video, audio, canvas, semantics' },
        { text_ru: '2024 — HTML Living Standard: обновляется постоянно', text_en: '2024 — HTML Living Standard: updated continuously' },
      ],
    },

    // ── s8: concept — каркас страницы (SVG-дерево документа) ─────────────────
    {
      id: 's8',
      type: 'concept',
      title_ru: 'Каждая страница имеет каркас',
      title_en: 'Every page has a frame',
      body_ru: 'У любой HTML-страницы есть обязательный каркас из четырёх частей.',
      body_en: 'Every HTML page has a required frame made of four parts.',
      visual: {
        kind: 'svg',
        svg: `<svg viewBox="0 0 400 218" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect x="125" y="0" width="150" height="34" rx="8" fill="#475569"/>
  <text x="200" y="22" text-anchor="middle" fill="white" font-size="12" font-family="monospace">&lt;!DOCTYPE html&gt;</text>
  <line x1="200" y1="34" x2="200" y2="52" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <rect x="148" y="52" width="104" height="34" rx="8" fill="#3B5BDB"/>
  <text x="200" y="74" text-anchor="middle" fill="white" font-size="14" font-weight="bold" font-family="monospace">&lt;html&gt;</text>
  <line x1="200" y1="86" x2="200" y2="104" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <line x1="88" y1="104" x2="312" y2="104" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <line x1="88" y1="104" x2="88" y2="120" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <line x1="312" y1="104" x2="312" y2="120" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <rect x="28" y="120" width="120" height="34" rx="8" fill="#1971c2"/>
  <text x="88" y="142" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="monospace">&lt;head&gt;</text>
  <rect x="252" y="120" width="120" height="34" rx="8" fill="#2f9e44"/>
  <text x="312" y="142" text-anchor="middle" fill="white" font-size="13" font-weight="bold" font-family="monospace">&lt;body&gt;</text>
  <line x1="88" y1="154" x2="88" y2="174" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <rect x="38" y="174" width="100" height="30" rx="7" fill="#1971c2" opacity="0.65"/>
  <text x="88" y="194" text-anchor="middle" fill="white" font-size="11" font-family="monospace">&lt;title&gt;</text>
  <line x1="312" y1="154" x2="312" y2="168" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <line x1="264" y1="168" x2="360" y2="168" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <line x1="264" y1="168" x2="264" y2="174" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <line x1="360" y1="168" x2="360" y2="174" stroke="rgba(255,255,255,0.3)" stroke-width="1.5"/>
  <rect x="230" y="174" width="68" height="30" rx="7" fill="#2f9e44" opacity="0.65"/>
  <text x="264" y="194" text-anchor="middle" fill="white" font-size="11" font-family="monospace">&lt;h1&gt;</text>
  <rect x="336" y="174" width="48" height="30" rx="7" fill="#2f9e44" opacity="0.65"/>
  <text x="360" y="194" text-anchor="middle" fill="white" font-size="11" font-family="monospace">&lt;p&gt;</text>
</svg>`,
        caption_ru: 'DOCTYPE → html → head / body → содержимое',
        caption_en: 'DOCTYPE → html → head / body → content',
      },
    },

    // ── s9: practice-cta ──────────────────────────────────────────────────────
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Теперь — твоя очередь!',
      title_en: 'Now it is your turn!',
      body_ru: 'Хватит теории — пора писать код. В редакторе ниже ты создашь свой первый заголовок и увидишь результат вживую.',
      body_en: 'Enough theory — time to write code. In the editor below you will create your first heading and see the result live.',
    },
  ],

  content: {
    intro_ru: `HTML — это язык, на котором написаны абсолютно все страницы в интернете.
Когда ты открываешь любимый сайт, твой браузер на самом деле читает HTML-файл и
показывает тебе то, что в нём написано. Хорошая новость: HTML — это НЕ сложное
программирование. Это скорее как разметка текста цветными маркерами — ты просто
показываешь браузеру, где заголовок, где абзац, а где картинка.`,
    intro_en: `HTML is the language that every single page on the internet is written in.
When you open your favourite website, your browser actually reads an HTML file and
shows you what is inside it. Good news: HTML is NOT difficult programming. It is more
like marking up text with coloured highlighters — you simply show the browser where a
heading is, where a paragraph is, and where an image is.`,

    blocks: [
      {
        sectionId: 'what-is-html',
        heading_ru: 'Что такое HTML',
        heading_en: 'What is HTML',
        text_ru: `HTML расшифровывается как HyperText Markup Language — «язык разметки гипертекста». Это основа всего интернета: каждая веб-страница, которую ты когда-либо видел, написана на HTML. Браузер получает HTML-файл и превращает его в красивую страницу с заголовками, картинками и ссылками.

Слово «разметка» — ключевое. В отличие от языков программирования, HTML не выполняет вычисления и не принимает решений. Он просто описывает структуру и содержимое страницы: «это заголовок», «это абзац», «это изображение». Браузер читает эти инструкции и отображает всё как положено.

«Гипертекст» означает текст со ссылками. Именно ссылки соединяют страницы в единую сеть — Всемирную паутину (World Wide Web). Тим Бернерс-Ли изобрёл HTML в 1991 году именно для того, чтобы учёные могли легко ссылаться на документы друг друга. Сегодня HTML используется везде — от простых личных страничек до сложнейших веб-приложений.`,
        text_en: `HTML stands for HyperText Markup Language. It is the foundation of the entire web: every web page you have ever seen is written in HTML. The browser receives an HTML file and turns it into a beautiful page with headings, images and links.

The word "markup" is the key one. Unlike programming languages, HTML does not perform calculations or make decisions. It simply describes the structure and content of a page: "this is a heading", "this is a paragraph", "this is an image". The browser reads these instructions and displays everything as intended.

"Hypertext" means text with links. Links are what connect pages into a single network — the World Wide Web. Tim Berners-Lee invented HTML in 1991 precisely so that scientists could easily link to each other's documents. Today HTML is used everywhere — from simple personal pages to the most complex web applications.`,
        code: `<!-- HTML описывает смысл содержимого -->
<h1>Добро пожаловать!</h1>
<p>Это абзац текста на HTML-странице.</p>
<a href="https://example.com">Это ссылка</a>
<img src="photo.jpg" alt="Это изображение">`,
        codeLang: 'html',
      },
      {
        sectionId: 'how-page-works',
        heading_ru: 'Как браузер строит страницу',
        heading_en: 'How the browser builds a page',
        text_ru: `Представь, что HTML — это записка строителю. Ты пишешь: «здесь поставь
большой заголовок, под ним абзац текста, а справа картинку». Браузер — это строитель.
Он читает твою записку сверху вниз и строит страницу именно в том порядке, в котором
ты написал. Если ты поменяешь порядок строк в HTML — поменяется и порядок на странице.`,
        text_en: `Imagine HTML is a note to a builder. You write: "put a big heading here,
a paragraph of text under it, and an image on the right". The browser is the builder.
It reads your note top to bottom and builds the page in exactly the order you wrote it.
If you change the order of lines in HTML, the order on the page changes too.`,
      },
      {
        sectionId: 'first-tag',
        heading_ru: 'Твой первый тег',
        heading_en: 'Your first tag',
        text_ru: `Тег — это команда для браузера, завёрнутая в угловые скобки < >.
Большинство тегов работают парами: открывающий <p> и закрывающий </p>. Закрывающий
отличается косой чертой. Всё, что между ними — содержимое тега. Например,
<p>Я учу HTML</p> говорит браузеру: «текст "Я учу HTML" — это абзац».`,
        text_en: `A tag is a command for the browser, wrapped in angle brackets < >.
Most tags work in pairs: an opening <p> and a closing </p>. The closing one has a
slash. Everything between them is the tag's content. For example,
<p>I am learning HTML</p> tells the browser: "the text 'I am learning HTML' is a paragraph".`,
      },
      {
        sectionId: 'document-structure',
        heading_ru: 'Структура документа',
        heading_en: 'Document structure',
        text_ru: `У каждой HTML-страницы есть обязательный «скелет». Строка <!DOCTYPE html>
говорит браузеру: «это современный HTML». Тег <html> оборачивает всю страницу.
Внутри него два раздела: <head> — невидимая часть с настройками и названием вкладки
(<title>), и <body> — видимая часть, где находится всё, что увидит пользователь:
заголовки, текст, картинки.`,
        text_en: `Every HTML page has a required "skeleton". The line <!DOCTYPE html>
tells the browser: "this is modern HTML". The <html> tag wraps the whole page.
Inside it are two sections: <head> — the invisible part with settings and the tab
name (<title>), and <body> — the visible part holding everything the user will see:
headings, text, images.`,
        code: `<!DOCTYPE html>
<html>
  <head>
    <title>Мой первый сайт</title>
  </head>
  <body>
    <h1>Привет!</h1>
    <p>Это моя первая страница.</p>
  </body>
</html>`,
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: твой первый заголовок',
    title_en: 'Try it yourself: your first heading',
    instructions_ru: `Создай заголовок с помощью тега <h1> и абзац с помощью тега <p>.
Напиши в заголовке своё имя, а в абзаце — свою любимую игру. Нажми «Запустить» и
посмотри на результат справа!`,
    instructions_en: `Create a heading with the <h1> tag and a paragraph with the <p>
tag. Write your name in the heading and your favourite game in the paragraph. Press
"Run" and look at the result on the right!`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!-- Напиши свой код здесь -->
<h1>Твоё имя</h1>
<p>Твоя любимая игра</p>`,
    },
    hints_ru: [
      'Не забудь закрыть тег: <h1>текст</h1>',
      'Заголовок и абзац — это два разных тега на двух строках.',
    ],
    hints_en: [
      'Do not forget to close the tag: <h1>text</h1>',
      'The heading and the paragraph are two separate tags on two lines.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'HTML', term_en: 'HTML',
      definition_ru: 'Язык разметки, на котором создаются все веб-страницы.',
      definition_en: 'The markup language used to create every web page.',
      example_ru: 'Файл index.html — это HTML-документ.',
      example_en: 'The file index.html is an HTML document.',
    },
    {
      term_ru: 'Тег', term_en: 'Tag',
      definition_ru: 'Команда в угловых скобках, которая размечает содержимое страницы.',
      definition_en: 'A command in angle brackets that marks up the page content.',
      example_ru: '<p> — тег абзаца, <h1> — тег заголовка.',
      example_en: '<p> is the paragraph tag, <h1> is the heading tag.',
    },
    {
      term_ru: 'Элемент', term_en: 'Element',
      definition_ru: 'Открывающий тег, содержимое и закрывающий тег вместе.',
      definition_en: 'An opening tag, its content and a closing tag together.',
      example_ru: '<h1>Привет</h1> — это один элемент.',
      example_en: '<h1>Hello</h1> is one element.',
    },
    {
      term_ru: 'Браузер', term_en: 'Browser',
      definition_ru: 'Программа, которая читает HTML и показывает готовую страницу.',
      definition_en: 'A program that reads HTML and shows the finished page.',
      example_ru: 'Chrome, Firefox, Safari — это браузеры.',
      example_en: 'Chrome, Firefox, Safari are browsers.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'HTML придумал учёный Тим Бернерс-Ли в 1991 году — и подарил его всему миру бесплатно.',
      text_en: 'HTML was invented by scientist Tim Berners-Lee in 1991 — and he gave it to the whole world for free.',
    },
    {
      text_ru: 'В HTML более 100 разных тегов, но для создания хорошего сайта обычно хватает 20–30 из них.',
      text_en: 'HTML has over 100 different tags, but you usually only need 20–30 of them to build a good website.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что означает буква "M" в слове HTML?',
      text_en: 'What does the letter "M" in HTML stand for?',
      options_ru: ['Markup (разметка)', 'Music (музыка)', 'Mouse (мышь)', 'Memory (память)'],
      options_en: ['Markup', 'Music', 'Mouse', 'Memory'],
      correctIndex: 0,
      explanation_ru: 'HTML — HyperText Markup Language, язык разметки.',
      explanation_en: 'HTML stands for HyperText Markup Language.',
    },
    {
      id: 'q2',
      text_ru: 'Какой тег создаёт самый крупный заголовок?',
      text_en: 'Which tag creates the biggest heading?',
      options_ru: ['<p>', '<h1>', '<title>', '<big>'],
      options_en: ['<p>', '<h1>', '<title>', '<big>'],
      correctIndex: 1,
      explanation_ru: '<h1> — заголовок первого, самого высокого уровня.',
      explanation_en: '<h1> is the heading of the first, highest level.',
    },
    {
      id: 'q3',
      text_ru: 'Чем закрывающий тег отличается от открывающего?',
      text_en: 'How is a closing tag different from an opening one?',
      options_ru: ['Он написан заглавными буквами', 'У него есть косая черта /', 'Он в круглых скобках', 'Ничем не отличается'],
      options_en: ['It is in capital letters', 'It has a slash /', 'It is in round brackets', 'There is no difference'],
      correctIndex: 1,
      explanation_ru: 'Закрывающий тег всегда содержит косую черту: </p>.',
      explanation_en: 'A closing tag always contains a slash: </p>.',
    },
    {
      id: 'q4',
      text_ru: 'В каком разделе страницы находится то, что видит пользователь?',
      text_en: 'In which section of the page is the content the user sees?',
      options_ru: ['<head>', '<title>', '<body>', '<top>'],
      options_en: ['<head>', '<title>', '<body>', '<top>'],
      correctIndex: 2,
      explanation_ru: 'Всё видимое содержимое находится внутри <body>.',
      explanation_en: 'All visible content lives inside <body>.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает браузер с HTML-файлом?',
      text_en: 'What does the browser do with an HTML file?',
      options_ru: ['Читает его и строит страницу', 'Удаляет его', 'Отправляет его другу', 'Превращает его в музыку'],
      options_en: ['Reads it and builds the page', 'Deletes it', 'Sends it to a friend', 'Turns it into music'],
      correctIndex: 0,
      explanation_ru: 'Браузер читает HTML сверху вниз и строит из него страницу.',
      explanation_en: 'The browser reads HTML top to bottom and builds the page from it.',
    },
  ],
}
