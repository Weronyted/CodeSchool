import type { Lesson } from '@/types/lesson'

export const htmlLinks: Lesson = {
  slug: 'html-links',
  category: 'HTML',
  readTime: 9,
  icon: '🔗',
  title_ru: 'Ссылки HTML',
  title_en: 'HTML Links',
  description_ru: 'Освойте тег <a>: абсолютные и относительные URL, открытие в новой вкладке, якорные ссылки, mailto и стилизация ссылок.',
  description_en: 'Master the <a> tag: absolute and relative URLs, opening in a new tab, anchor links, mailto, and styling links with CSS.',

  sections: [
    { id: 'basic-link', title_ru: 'Базовая ссылка', title_en: 'Basic Link' },
    { id: 'href-types', title_ru: 'Типы URL', title_en: 'URL Types' },
    { id: 'target', title_ru: 'Атрибут target', title_en: 'The target Attribute' },
    { id: 'anchor', title_ru: 'Якорные ссылки', title_en: 'Anchor Links' },
    { id: 'mailto', title_ru: 'Mailto-ссылки', title_en: 'Mailto Links' },
    { id: 'key-terms', title_ru: 'Ключевые термины', title_en: 'Key Terms' },
  ],

  slides: [
    {
      id: 'slide-1',
      type: 'title',
      title_ru: 'Ссылки HTML',
      title_en: 'HTML Links',
      body_ru: 'Ссылки — основа интернета. Именно они соединяют страницы и сайты в одну гигантскую сеть. Тег <a> открывает весь этот мир.',
      body_en: 'Links are the backbone of the internet. They connect pages and sites into one giant network. The <a> tag opens up this entire world.',
    },
    {
      id: 'slide-2',
      type: 'analogy',
      title_ru: 'Ссылки — как дорожные указатели',
      title_en: 'Links are like road signs',
      body_ru: 'Представьте дорожный указатель: на нём написано «Москва — 100 км». Ссылка — это тот же указатель: текст говорит, куда ведёт, а атрибут href — точный адрес назначения.',
      body_en: 'Imagine a road sign: it reads "Moscow — 100 km". A link is the same sign: the text says where it leads, and the href attribute is the exact destination address.',
      visual: {
        kind: 'emoji',
        emojis: ['🛣️', '🚗', '📍'],
        caption_ru: 'href — адрес назначения, текст — подсказка пользователю',
        caption_en: 'href is the destination, the text is the hint for the user',
      },
      bullets: [
        { text_ru: '<a> — тег ссылки (anchor — якорь)', text_en: '<a> — the link tag (anchor)' },
        { text_ru: 'href — атрибут с адресом назначения', text_en: 'href — the attribute with the destination address' },
        { text_ru: 'Текст между тегами — то, что видит пользователь', text_en: 'The text between tags is what the user sees' },
      ],
    },
    {
      id: 'slide-3',
      type: 'concept',
      title_ru: 'Базовая ссылка',
      title_en: 'Basic Link',
      body_ru: 'Самая простая ссылка — тег <a> с атрибутом href. Текст между тегами становится кликабельным.',
      body_en: 'The simplest link is an <a> tag with an href attribute. The text between the tags becomes clickable.',
      code: '<!-- Простая ссылка / Simple link -->\n<a href="https://www.google.com">Перейти в Google</a>\n\n<!-- Ссылка с картинкой / Link with image -->\n<a href="/home">\n  <img src="logo.png" alt="На главную">\n</a>\n\n<!-- Ссылка без href — неактивная / Link without href -->\n<a>Просто текст</a>',
      codeLang: 'html',
    },
    {
      id: 'slide-4',
      type: 'compare',
      title_ru: 'Абсолютный vs относительный URL',
      title_en: 'Absolute URL vs Relative URL',
      body_ru: 'Адрес в href может быть абсолютным (полный путь) или относительным (путь относительно текущего файла).',
      body_en: 'The href address can be absolute (full path) or relative (path relative to the current file).',
      compareLeft: {
        label_ru: 'Абсолютный URL',
        label_en: 'Absolute URL',
        items_ru: [
          'Полный адрес с протоколом',
          'https://example.com/about',
          'Для внешних сайтов',
          'Работает из любого места',
          'Длиннее, но однозначный',
        ],
        items_en: [
          'Full address with protocol',
          'https://example.com/about',
          'For external websites',
          'Works from anywhere',
          'Longer but unambiguous',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'Относительный URL',
        label_en: 'Relative URL',
        items_ru: [
          'Путь от текущего файла',
          '/about или ../images/cat.jpg',
          'Для страниц своего сайта',
          'Зависит от расположения файла',
          'Короче и удобнее внутри сайта',
        ],
        items_en: [
          'Path from the current file',
          '/about or ../images/cat.jpg',
          'For pages on your own site',
          'Depends on the file location',
          'Shorter and handy within a site',
        ],
        color: 'green',
      },
    },
    {
      id: 'slide-5',
      type: 'concept',
      title_ru: 'Атрибут target',
      title_en: 'The target Attribute',
      body_ru: 'Атрибут target управляет тем, где откроется ссылка: в текущей вкладке или в новой.',
      body_en: 'The target attribute controls where the link opens: in the current tab or a new one.',
      code: '<!-- Открыть в текущей вкладке (по умолчанию) -->\n<a href="/about">О нас</a>\n\n<!-- Открыть в новой вкладке -->\n<a href="https://github.com" target="_blank"\n   rel="noopener noreferrer">GitHub</a>\n\n<!-- rel="noopener noreferrer" важен для безопасности! -->',
      codeLang: 'html',
    },
    {
      id: 'slide-6',
      type: 'code-anim',
      title_ru: 'Строим разные виды ссылок',
      title_en: 'Building Different Types of Links',
      body_ru: 'Посмотрите, как шаг за шагом создаются ссылки разных типов в одном разделе страницы.',
      body_en: 'Watch how different types of links are built step by step in one page section.',
      animMode: 'preview',
      animSteps: [
        {
          code: '<a href="https://mozilla.org">Внешняя ссылка</a>',
          comment_ru: 'Абсолютная ссылка на внешний сайт',
          comment_en: 'Absolute link to an external website',
          preview: '<a href="https://mozilla.org">Внешняя ссылка</a>',
        },
        {
          code: '<a href="https://mozilla.org">Внешняя ссылка</a>\n<a href="/contacts" >Страница контактов</a>',
          comment_ru: 'Относительная ссылка на страницу своего сайта',
          comment_en: 'Relative link to a page on the same site',
          preview: '<a href="https://mozilla.org">Внешняя ссылка</a> <a href="/contacts">Страница контактов</a>',
        },
        {
          code: '<a href="https://mozilla.org">Внешняя ссылка</a>\n<a href="/contacts">Страница контактов</a>\n<a href="#section-2">Прокрутить к разделу</a>',
          comment_ru: 'Якорная ссылка для прокрутки к разделу на той же странице',
          comment_en: 'Anchor link to scroll to a section on the same page',
          preview: 'Три ссылки: внешняя, относительная и якорная',
        },
        {
          code: '<a href="https://mozilla.org">Внешняя ссылка</a>\n<a href="/contacts">Страница контактов</a>\n<a href="#section-2">Прокрутить к разделу</a>\n<a href="mailto:hello@example.com">Написать нам</a>',
          comment_ru: 'Mailto-ссылка открывает почтовый клиент пользователя',
          comment_en: 'Mailto link opens the user\'s email client',
          preview: 'Четыре типа ссылок — внешняя, относительная, якорная, mailto',
        },
      ],
    },
    {
      id: 'slide-7',
      type: 'concept',
      title_ru: 'Якорные ссылки',
      title_en: 'Anchor Links',
      body_ru: 'Якорная ссылка прокручивает страницу к элементу с нужным id. href начинается с символа #.',
      body_en: 'An anchor link scrolls the page to an element with the matching id. The href starts with the # character.',
      code: '<!-- Ссылка-якорь / Anchor link -->\n<a href="#contacts">Перейти к контактам</a>\n\n<!-- ... много контента ... -->\n\n<!-- Целевой элемент / Target element -->\n<section id="contacts">\n  <h2>Контакты</h2>\n  <p>Свяжитесь с нами!</p>\n</section>',
      codeLang: 'html',
    },
    {
      id: 'slide-8',
      type: 'tip',
      title_ru: 'Mailto и tel: ссылки',
      title_en: 'Mailto and tel: Links',
      body_ru: 'Специальные схемы ссылок открывают почтовый клиент или приложение для звонков прямо с сайта.',
      body_en: 'Special link schemes open the email client or calling app directly from the website.',
      code: '<!-- Открывает почтовый клиент -->\n<a href="mailto:info@company.com">Написать нам</a>\n\n<!-- С темой и телом письма -->\n<a href="mailto:info@company.com?subject=Вопрос&body=Здравствуйте">Задать вопрос</a>\n\n<!-- Открывает приложение для звонков -->\n<a href="tel:+74951234567">+7 (495) 123-45-67</a>',
      codeLang: 'html',
      bullets: [
        { text_ru: 'mailto: открывает почтовую программу', text_en: 'mailto: opens the mail application' },
        { text_ru: 'tel: инициирует звонок на мобильных устройствах', text_en: 'tel: initiates a call on mobile devices' },
        { text_ru: 'Параметры subject и body предзаполняют письмо', text_en: 'The subject and body params pre-fill the email' },
      ],
    },
    {
      id: 'slide-9',
      type: 'practice-cta',
      title_ru: 'Создайте страницу со ссылками!',
      title_en: 'Build a Page with Links!',
      body_ru: 'Напишите HTML и CSS для страницы с навигацией, внешними ссылками, якорями и mailto-ссылкой со стилями.',
      body_en: 'Write HTML and CSS for a page with navigation, external links, anchors, and a styled mailto link.',
    },
  ],

  content: {
    intro_ru: 'Тег <a> (anchor, якорь) — один из важнейших в HTML. Без ссылок интернет превратился бы в набор изолированных страниц. Ссылки бывают разных типов: внешние, внутренние, якорные и специальные (mailto, tel). Важно понимать, как правильно использовать каждый тип.',
    intro_en: 'The <a> (anchor) tag is one of the most important in HTML. Without links, the internet would be a collection of isolated pages. Links come in different types: external, internal, anchor, and special (mailto, tel). It is important to understand how to use each type correctly.',
    blocks: [
      {
        sectionId: 'basic-link',
        heading_ru: 'Базовая ссылка',
        heading_en: 'Basic Link',
        text_ru: 'Ссылка создаётся тегом <a> с обязательным атрибутом href (hypertext reference). Текст между открывающим и закрывающим тегами становится кликабельной областью. Внутри <a> может быть не только текст, но и изображения или другие элементы (кроме интерактивных тегов, таких как кнопки).',
        text_en: 'A link is created with the <a> tag and its mandatory href (hypertext reference) attribute. The text between the opening and closing tags becomes the clickable area. Inside <a> there can be not just text but also images or other elements (except interactive tags like buttons).',
        code: '<a href="https://www.wikipedia.org">Открыть Википедию</a>\n\n<a href="/gallery">\n  <img src="thumb.jpg" alt="Галерея">\n</a>',
        codeLang: 'html',
      },
      {
        sectionId: 'href-types',
        heading_ru: 'Типы URL в href',
        heading_en: 'URL Types in href',
        text_ru: 'href принимает разные типы URL. Абсолютный URL начинается с протокола (https://) и содержит полный адрес — используйте его для внешних сайтов. Относительный URL — путь от текущего файла без протокола и домена — используйте для страниц своего сайта. Путь от корня сайта начинается с /.',
        text_en: 'href accepts different URL types. An absolute URL starts with a protocol (https://) and contains the full address — use it for external sites. A relative URL is a path from the current file without a protocol or domain — use it for your own site\'s pages. A root-relative path starts with /.',
        code: '<!-- Абсолютный (внешний) -->\n<a href="https://example.com/page">Внешний сайт</a>\n\n<!-- Относительный (от корня сайта) -->\n<a href="/about">О нас</a>\n\n<!-- Относительный (от текущего файла) -->\n<a href="../images/photo.jpg">Фото</a>',
        codeLang: 'html',
      },
      {
        sectionId: 'target',
        heading_ru: 'Атрибут target и безопасность',
        heading_en: 'The target Attribute and Security',
        text_ru: 'target="_blank" открывает ссылку в новой вкладке. Важно: вместе с ним всегда добавляйте rel="noopener noreferrer". Без этого атрибута открытая страница получает доступ к объекту window.opener и может перенаправить вашу вкладку на мошеннический сайт (атака tab-napping).',
        text_en: 'target="_blank" opens the link in a new tab. Important: always add rel="noopener noreferrer" alongside it. Without this attribute, the opened page gains access to the window.opener object and can redirect your tab to a malicious site (tab-napping attack).',
        code: '<!-- Правильно — с rel для безопасности -->\n<a href="https://github.com"\n   target="_blank"\n   rel="noopener noreferrer">GitHub ↗</a>\n\n<!-- Неправильно — уязвимость безопасности -->\n<a href="https://github.com" target="_blank">GitHub</a>',
        codeLang: 'html',
      },
      {
        sectionId: 'mailto',
        heading_ru: 'Mailto-ссылки',
        heading_en: 'Mailto Links',
        text_ru: 'Mailto-ссылки используют специальную схему mailto: в атрибуте href вместо обычного URL. При клике браузер открывает почтовый клиент пользователя с предзаполненным адресом получателя. Это удобный способ добавить кнопку «Написать нам» без необходимости создавать форму и серверный обработчик.\n\nСхема mailto: поддерживает дополнительные параметры в строке запроса: subject задаёт тему письма, body — текст письма, cc — адрес копии, bcc — скрытой копии. Несколько параметров разделяются символом &. Значения должны быть закодированы по правилам URL (пробелы заменяются на %20).\n\nАналогично работает схема tel: — при клике на такую ссылку на мобильном устройстве открывается приложение для звонков. Номер телефона записывается в международном формате: tel:+74951234567.',
        text_en: 'Mailto links use the special mailto: scheme in the href attribute instead of a regular URL. On click, the browser opens the user\'s email client with the recipient address pre-filled. This is a convenient way to add a "Contact Us" button without needing a form and server-side handler.\n\nThe mailto: scheme supports additional query parameters: subject sets the email subject, body sets the message body, cc sets the copy address, and bcc sets the blind copy address. Multiple parameters are separated by &. Values must be URL-encoded (spaces replaced with %20).\n\nThe tel: scheme works similarly — clicking such a link on a mobile device opens the phone app. The number is written in international format: tel:+14155552671.',
        code: `<!-- Простая mailto-ссылка -->
<a href="mailto:info@example.com">Написать нам</a>

<!-- С темой и телом письма -->
<a href="mailto:support@example.com?subject=Вопрос%20по%20заказу&body=Здравствуйте%2C%0Aу%20меня%20вопрос...">
  Задать вопрос в поддержку
</a>

<!-- С копией -->
<a href="mailto:info@example.com?cc=manager@example.com">
  Написать с копией менеджеру
</a>

<!-- Телефонная ссылка -->
<a href="tel:+74951234567">+7 (495) 123-45-67</a>`,
        codeLang: 'html',
      },
      {
        sectionId: 'anchor',
        heading_ru: 'Якорные ссылки и навигация по странице',
        heading_en: 'Anchor Links and In-page Navigation',
        text_ru: 'Якорная ссылка (href="#id") прокручивает страницу к элементу с нужным id. Это незаменимо для длинных страниц: оглавления, FAQ с переходами, навигация по разделам. Чтобы перейти к разделу, нужно дать ему атрибут id и использовать этот же id в href ссылки.',
        text_en: 'An anchor link (href="#id") scrolls the page to the element with the matching id. This is invaluable for long pages: table of contents, clickable FAQs, section navigation. To jump to a section, give it an id attribute and use the same id in the link\'s href.',
        code: '<!-- Оглавление / Table of contents -->\n<nav>\n  <a href="#intro">Введение</a>\n  <a href="#main">Основная часть</a>\n  <a href="#conclusion">Заключение</a>\n</nav>\n\n<section id="intro"><h2>Введение</h2></section>\n<section id="main"><h2>Основная часть</h2></section>\n<section id="conclusion"><h2>Заключение</h2></section>',
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Создайте страницу контактов',
    title_en: 'Create a Contacts Page',
    instructions_ru: 'Создайте HTML-страницу контактов с навигацией (якорные ссылки), внешними ссылками (соцсети, target="_blank"), mailto-ссылкой и tel-ссылкой. Добавьте CSS-стили для ссылок: цвет, подчёркивание при наведении.',
    instructions_en: 'Create an HTML contacts page with navigation (anchor links), external links (social media, target="_blank"), a mailto link, and a tel link. Add CSS styles for links: color, underline on hover.',
    activeTabs: ['html', 'css'],
    starterCode: {
      html: '<!-- Страница контактов / Contacts page -->\n<nav>\n  <!-- Якорные ссылки на разделы / Anchor links to sections -->\n</nav>\n\n<section id="social">\n  <h2>Мы в соцсетях / Social Media</h2>\n  <!-- Внешние ссылки с target="_blank" / External links with target="_blank" -->\n</section>\n\n<section id="email">\n  <h2>Email</h2>\n  <!-- mailto-ссылка / mailto link -->\n</section>\n\n<section id="phone">\n  <h2>Телефон / Phone</h2>\n  <!-- tel-ссылка / tel link -->\n</section>',
      css: '/* Стили для ссылок / Link styles */\na {\n  /* Задайте цвет ссылки / Set link color */\n}\n\na:hover {\n  /* Стиль при наведении / Hover style */\n}\n\nnav a {\n  /* Стили навигационных ссылок / Nav link styles */\n}',
    },
    hints_ru: [
      'Якорная ссылка: <a href="#social">Соцсети</a>',
      'Внешняя ссылка: <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>',
      'Mailto: <a href="mailto:hello@example.com">Написать нам</a>',
      'В CSS используйте color: #0066cc и a:hover { text-decoration: underline; }',
    ],
    hints_en: [
      'Anchor link: <a href="#social">Social Media</a>',
      'External link: <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">Twitter</a>',
      'Mailto: <a href="mailto:hello@example.com">Email Us</a>',
      'In CSS use color: #0066cc and a:hover { text-decoration: underline; }',
    ],
  },

  keyTerms: [
    {
      term_ru: 'href',
      term_en: 'href',
      definition_ru: 'Hypertext Reference — атрибут тега <a>, содержащий адрес назначения ссылки.',
      definition_en: 'Hypertext Reference — the <a> tag attribute containing the link destination address.',
      example_ru: '<a href="https://example.com">Текст</a>',
      example_en: '<a href="https://example.com">Text</a>',
    },
    {
      term_ru: 'Абсолютный URL',
      term_en: 'Absolute URL',
      definition_ru: 'Полный адрес ресурса, включающий протокол, домен и путь. Используется для внешних ссылок.',
      definition_en: 'The full address of a resource, including protocol, domain, and path. Used for external links.',
      example_ru: 'https://www.example.com/page',
      example_en: 'https://www.example.com/page',
    },
    {
      term_ru: 'Относительный URL',
      term_en: 'Relative URL',
      definition_ru: 'Адрес ресурса относительно текущего файла или корня сайта. Используется для внутренних ссылок.',
      definition_en: 'Address of a resource relative to the current file or site root. Used for internal links.',
      example_ru: '/about, ../images/photo.jpg',
      example_en: '/about, ../images/photo.jpg',
    },
    {
      term_ru: 'target="_blank"',
      term_en: 'target="_blank"',
      definition_ru: 'Атрибут, заставляющий ссылку открываться в новой вкладке браузера.',
      definition_en: 'An attribute that makes the link open in a new browser tab.',
      example_ru: '<a href="..." target="_blank" rel="noopener noreferrer">',
      example_en: '<a href="..." target="_blank" rel="noopener noreferrer">',
    },
    {
      term_ru: 'Якорная ссылка',
      term_en: 'Anchor Link',
      definition_ru: 'Ссылка с href="#id", прокручивающая страницу к элементу с соответствующим атрибутом id.',
      definition_en: 'A link with href="#id" that scrolls the page to the element with the matching id attribute.',
      example_ru: '<a href="#contacts">К контактам</a>',
      example_en: '<a href="#contacts">To Contacts</a>',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Первая ссылка в истории интернета появилась в 1991 году на странице проекта WorldWideWeb Тима Бернерса-Ли. Именно она положила начало эпохе гипертекста.',
      text_en: 'The first link in internet history appeared in 1991 on Tim Berners-Lee\'s WorldWideWeb project page. It marked the beginning of the hypertext era.',
    },
    {
      text_ru: 'Атрибут rel="noopener noreferrer" у ссылок с target="_blank" — это не просто хорошая практика, а требование безопасности. Без него открытая страница может управлять вкладкой, с которой была открыта.',
      text_en: 'The rel="noopener noreferrer" attribute on target="_blank" links is not just good practice — it is a security requirement. Without it, the opened page can control the tab it was opened from.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой атрибут тега <a> задаёт адрес назначения ссылки?',
      text_en: 'Which <a> tag attribute sets the link destination?',
      options_ru: ['src', 'url', 'href', 'link'],
      options_en: ['src', 'url', 'href', 'link'],
      correctIndex: 2,
      explanation_ru: 'href (hypertext reference) — обязательный атрибут тега <a>, содержащий адрес, куда ведёт ссылка.',
      explanation_en: 'href (hypertext reference) is the mandatory <a> attribute that holds the address the link points to.',
    },
    {
      id: 'q2',
      text_ru: 'Что такое относительный URL?',
      text_en: 'What is a relative URL?',
      options_ru: ['URL с протоколом https://', 'URL относительно текущего файла или корня сайта', 'URL, который ведёт на почту', 'URL с символом #'],
      options_en: ['A URL with the https:// protocol', 'A URL relative to the current file or site root', 'A URL that opens an email client', 'A URL with a # character'],
      correctIndex: 1,
      explanation_ru: 'Относительный URL не содержит протокол и домен, а задаёт путь от текущего файла или корня сайта.',
      explanation_en: 'A relative URL contains no protocol or domain — it specifies a path from the current file or the site root.',
    },
    {
      id: 'q3',
      text_ru: 'Какой атрибут rel нужно добавить при использовании target="_blank"?',
      text_en: 'Which rel attribute should be added when using target="_blank"?',
      options_ru: ['rel="external"', 'rel="new-tab"', 'rel="noopener noreferrer"', 'rel="blank"'],
      options_en: ['rel="external"', 'rel="new-tab"', 'rel="noopener noreferrer"', 'rel="blank"'],
      correctIndex: 2,
      explanation_ru: 'rel="noopener noreferrer" защищает от атаки tab-napping, при которой открытая страница может управлять исходной вкладкой.',
      explanation_en: 'rel="noopener noreferrer" protects against the tab-napping attack, where the opened page could control the original tab.',
    },
    {
      id: 'q4',
      text_ru: 'Как создать ссылку, открывающую почтовый клиент?',
      text_en: 'How do you create a link that opens an email client?',
      options_ru: ['<a href="email:user@mail.com">', '<a href="mail:user@mail.com">', '<a href="mailto:user@mail.com">', '<a href="send:user@mail.com">'],
      options_en: ['<a href="email:user@mail.com">', '<a href="mail:user@mail.com">', '<a href="mailto:user@mail.com">', '<a href="send:user@mail.com">'],
      correctIndex: 2,
      explanation_ru: 'Схема mailto: в атрибуте href открывает почтовый клиент. Формат: mailto:адрес@почта.com.',
      explanation_en: 'The mailto: scheme in the href attribute opens the email client. Format: mailto:address@email.com.',
    },
    {
      id: 'q5',
      text_ru: 'Как сделать ссылку, которая прокручивает страницу к разделу с id="about"?',
      text_en: 'How do you make a link that scrolls the page to a section with id="about"?',
      options_ru: ['<a href="about">', '<a href="*about">', '<a href="@about">', '<a href="#about">'],
      options_en: ['<a href="about">', '<a href="*about">', '<a href="@about">', '<a href="#about">'],
      correctIndex: 3,
      explanation_ru: 'Якорная ссылка начинается с символа # за которым следует id целевого элемента: href="#about".',
      explanation_en: 'An anchor link starts with a # followed by the target element\'s id: href="#about".',
    },
  ],
}
