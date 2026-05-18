import type { Lesson } from '@/types/lesson'

export const htmlTagsElements: Lesson = {
  slug: 'html-tags-elements',
  category: 'HTML',
  readTime: 8,
  icon: '🔤',
  title_ru: 'Теги и элементы HTML',
  title_en: 'HTML Tags & Elements',
  description_ru: 'Узнайте, что такое HTML-теги и элементы, как они устроены, что такое атрибуты и пустые элементы.',
  description_en: 'Learn what HTML tags and elements are, how they are structured, what attributes are, and what void elements are.',

  sections: [
    { id: 'what-is-tag', title_ru: 'Что такое тег?', title_en: 'What is a Tag?' },
    { id: 'anatomy', title_ru: 'Анатомия элемента', title_en: 'Anatomy of an Element' },
    { id: 'attributes', title_ru: 'Атрибуты', title_en: 'Attributes' },
    { id: 'void-elements', title_ru: 'Пустые элементы', title_en: 'Void Elements' },
    { id: 'nesting', title_ru: 'Вложенность', title_en: 'Nesting' },
    { id: 'key-terms', title_ru: 'Ключевые термины', title_en: 'Key Terms' },
  ],

  slides: [
    {
      id: 'slide-1',
      type: 'title',
      title_ru: 'Теги и элементы HTML',
      title_en: 'HTML Tags & Elements',
      body_ru: 'HTML строится из тегов — специальных меток, которые говорят браузеру, что показывать и как это оформить.',
      body_en: 'HTML is built from tags — special markers that tell the browser what to show and how to structure it.',
    },
    {
      id: 'slide-2',
      type: 'analogy',
      title_ru: 'Теги — как ярлыки на коробках',
      title_en: 'Tags are like labels on boxes',
      body_ru: 'Представьте, что вы переезжаете. Каждая коробка подписана: «Кухня», «Книги», «Одежда». Браузер так же читает теги и понимает, что внутри.',
      body_en: 'Imagine you are moving house. Every box is labelled: "Kitchen", "Books", "Clothes". The browser reads tags the same way and understands what is inside.',
      visual: {
        kind: 'emoji',
        emojis: ['📦', '🏷️', '🌐'],
        caption_ru: 'Тег — это ярлык для браузера',
        caption_en: 'A tag is a label for the browser',
      },
      bullets: [
        { text_ru: 'Открывающий тег начинает элемент: <p>', text_en: 'Opening tag starts the element: <p>' },
        { text_ru: 'Закрывающий тег завершает его: </p>', text_en: 'Closing tag ends it: </p>' },
        { text_ru: 'Содержимое находится между тегами', text_en: 'Content lives between the tags' },
      ],
    },
    {
      id: 'slide-3',
      type: 'concept',
      title_ru: 'Анатомия HTML-элемента',
      title_en: 'Anatomy of an HTML Element',
      body_ru: 'Каждый элемент состоит из открывающего тега, содержимого и закрывающего тега. Вместе они образуют элемент.',
      body_en: 'Every element consists of an opening tag, content, and a closing tag. Together they form an element.',
      code: '<p>Привет, мир!</p>\n<!-- открывающий тег: <p> -->\n<!-- содержимое: Привет, мир! -->\n<!-- закрывающий тег: </p> -->',
      codeLang: 'html',
    },
    {
      id: 'slide-4',
      type: 'code-anim',
      title_ru: 'Строим элемент шаг за шагом',
      title_en: 'Building an Element Step by Step',
      body_ru: 'Посмотрите, как собирается HTML-элемент: от открывающего тега к атрибутам и содержимому.',
      body_en: 'Watch how an HTML element is assembled: from the opening tag through attributes to content.',
      animMode: 'preview',
      animSteps: [
        {
          code: '<a',
          comment_ru: 'Начинаем с имени тега внутри угловых скобок',
          comment_en: 'Start with the tag name inside angle brackets',
          preview: '<a',
        },
        {
          code: '<a href="https://example.com"',
          comment_ru: 'Добавляем атрибут href — адрес ссылки',
          comment_en: 'Add the href attribute — the link destination',
          preview: '<a href="https://example.com"',
        },
        {
          code: '<a href="https://example.com" target="_blank"',
          comment_ru: 'Добавляем target="_blank" — открыть в новой вкладке',
          comment_en: 'Add target="_blank" to open in a new tab',
          preview: '<a href="https://example.com" target="_blank"',
        },
        {
          code: '<a href="https://example.com" target="_blank">Перейти на сайт</a>',
          comment_ru: 'Закрываем тег и добавляем текст — элемент готов!',
          comment_en: 'Close the tag and add text — the element is complete!',
          preview: '<a href="https://example.com" target="_blank">Перейти на сайт</a>',
        },
      ],
    },
    {
      id: 'slide-5',
      type: 'concept',
      title_ru: 'Атрибуты — настройки элемента',
      title_en: 'Attributes — Element Settings',
      body_ru: 'Атрибуты добавляются в открывающий тег и уточняют поведение или внешний вид элемента.',
      body_en: 'Attributes are added inside the opening tag and configure the element\'s behaviour or appearance.',
      code: '<!-- id — уникальный идентификатор -->\n<div id="header">...</div>\n\n<!-- class — группа стилей -->\n<p class="intro">...</p>\n\n<!-- href — адрес ссылки -->\n<a href="/about">О нас</a>\n\n<!-- src — источник изображения -->\n<img src="photo.jpg" alt="Фото">',
      codeLang: 'html',
    },
    {
      id: 'slide-6',
      type: 'compare',
      title_ru: 'Обычные vs пустые элементы',
      title_en: 'Regular vs Void Elements',
      body_ru: 'Большинство элементов имеют открывающий и закрывающий теги. Пустые элементы закрывают себя сами.',
      body_en: 'Most elements have an opening and a closing tag. Void elements are self-closing.',
      compareLeft: {
        label_ru: 'Обычные элементы',
        label_en: 'Regular Elements',
        items_ru: ['Открывающий тег: <p>', 'Содержимое внутри', 'Закрывающий тег: </p>', 'Могут содержать дочерние элементы'],
        items_en: ['Opening tag: <p>', 'Content inside', 'Closing tag: </p>', 'Can contain child elements'],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'Пустые элементы',
        label_en: 'Void Elements',
        items_ru: ['Только один тег: <br>', 'Нет содержимого', 'Нет закрывающего тега', 'Примеры: br, img, input'],
        items_en: ['Only one tag: <br>', 'No content', 'No closing tag', 'Examples: br, img, input'],
        color: 'amber',
      },
    },
    {
      id: 'slide-7',
      type: 'concept',
      title_ru: 'Пустые элементы (Void Elements)',
      title_en: 'Void Elements',
      body_ru: 'Некоторые HTML-элементы не могут иметь содержимого и не требуют закрывающего тега.',
      body_en: 'Some HTML elements cannot have content and do not need a closing tag.',
      code: '<!-- Перенос строки -->\n<br>\n\n<!-- Изображение -->\n<img src="cat.jpg" alt="Кот">\n\n<!-- Поле ввода -->\n<input type="text" placeholder="Введите текст">\n\n<!-- Горизонтальная линия -->\n<hr>',
      codeLang: 'html',
    },
    {
      id: 'slide-8',
      type: 'tip',
      title_ru: 'Правила вложенности',
      title_en: 'Nesting Rules',
      body_ru: 'Элементы можно вкладывать друг в друга, но порядок закрытия должен быть обратным порядку открытия — как матрёшка.',
      body_en: 'Elements can be nested inside each other, but they must be closed in reverse order of opening — like Russian dolls.',
      code: '<!-- Правильно -->\n<p><strong>Жирный текст</strong> в абзаце</p>\n\n<!-- Неправильно -->\n<p><strong>Жирный текст</p></strong>',
      codeLang: 'html',
      bullets: [
        { text_ru: 'Закрывайте внутренние теги раньше внешних', text_en: 'Close inner tags before outer tags' },
        { text_ru: 'Используйте отступы для читаемости', text_en: 'Use indentation for readability' },
        { text_ru: 'Браузер прощает ошибки, но лучше писать правильно', text_en: 'Browsers forgive errors, but correct code is better' },
      ],
    },
    {
      id: 'slide-9',
      type: 'practice-cta',
      title_ru: 'Пора практиковаться!',
      title_en: 'Time to Practice!',
      body_ru: 'Создайте HTML-структуру с тегами, атрибутами и пустыми элементами — закрепите знания на практике.',
      body_en: 'Build an HTML structure using tags, attributes, and void elements — put your knowledge into practice.',
    },
  ],

  content: {
    intro_ru: 'HTML (HyperText Markup Language) — язык разметки веб-страниц. Его основа — теги: специальные команды в угловых скобках, которые браузер интерпретирует и превращает в визуальные элементы страницы.',
    intro_en: 'HTML (HyperText Markup Language) is the markup language of the web. Its foundation is tags: special commands inside angle brackets that the browser interprets and turns into visual page elements.',
    blocks: [
      {
        sectionId: 'what-is-tag',
        heading_ru: 'Что такое тег?',
        heading_en: 'What is a Tag?',
        text_ru: 'Тег — это ключевое слово, заключённое в угловые скобки < >. Теги бывают открывающими (<p>) и закрывающими (</p>). Открывающий тег начинает элемент, закрывающий — заканчивает. Всё, что находится между ними, является содержимым элемента.',
        text_en: 'A tag is a keyword enclosed in angle brackets < >. Tags come in two forms: opening (<p>) and closing (</p>). The opening tag starts the element, the closing tag ends it. Everything between them is the element\'s content.',
        code: '<h1>Добро пожаловать!</h1>\n<p>Это мой первый абзац.</p>',
        codeLang: 'html',
      },
      {
        sectionId: 'anatomy',
        heading_ru: 'Анатомия элемента',
        heading_en: 'Anatomy of an Element',
        text_ru: 'HTML-элемент — это полная конструкция: открывающий тег + содержимое + закрывающий тег. Не путайте тег и элемент: тег — это только метка (<p>), а элемент — вся конструкция целиком (<p>текст</p>).',
        text_en: 'An HTML element is the complete construct: opening tag + content + closing tag. Do not confuse a tag with an element: a tag is just the marker (<p>), while an element is the entire construct (<p>text</p>).',
        code: '<!--  элемент целиком  -->\n<p class="intro">Привет, мир!</p>\n<!--  ↑ открыв.  ↑ содержимое  ↑ закрыв. -->',
        codeLang: 'html',
      },
      {
        sectionId: 'attributes',
        heading_ru: 'Атрибуты',
        heading_en: 'Attributes',
        text_ru: 'Атрибуты — это дополнительные настройки элемента, которые записываются внутри открывающего тега в формате имя="значение". Самые важные атрибуты: id (уникальный идентификатор), class (CSS-класс), href (адрес ссылки), src (источник медиа), alt (альтернативный текст).',
        text_en: 'Attributes are additional settings for an element, written inside the opening tag as name="value". The most important attributes are: id (unique identifier), class (CSS class), href (link address), src (media source), alt (alternative text).',
        code: '<img src="logo.png" alt="Логотип сайта" id="main-logo" class="logo">',
        codeLang: 'html',
      },
      {
        sectionId: 'nesting',
        heading_ru: 'Вложенность',
        heading_en: 'Nesting',
        text_ru: 'Вложенность — это размещение одних HTML-элементов внутри других. Большинство тегов могут содержать дочерние элементы, образуя дерево структуры документа. Например, список <ul> содержит элементы <li>, а каждый <li> может содержать ссылку <a> и другие теги.\n\nГлавное правило вложенности: внутренние теги должны закрываться раньше внешних. Порядок закрытия должен быть обратным порядку открытия — как матрёшка. Если вы открыли <p>, затем <strong>, то сначала нужно закрыть </strong>, а потом </p>. Нарушение этого правила приводит к непредсказуемому поведению в браузерах.\n\nНе все элементы можно вкладывать произвольно. Например, блочные элементы (<div>, <p>, <ul>) нельзя размещать внутри строчных (<a>, <span>). Тег <p> не может содержать другие блочные элементы. Для наглядности используйте отступы при вложенности — они помогают визуально проследить структуру кода.',
        text_en: 'Nesting is the placement of HTML elements inside other elements. Most tags can contain child elements, forming a document structure tree. For example, a <ul> list contains <li> items, and each <li> can contain an <a> link and other tags.\n\nThe main nesting rule: inner tags must be closed before outer tags. The closing order must be the reverse of the opening order — like Russian dolls. If you open <p> and then <strong>, you must close </strong> first and then </p>. Violating this rule leads to unpredictable browser behaviour.\n\nNot all elements can be nested arbitrarily. For example, block elements (<div>, <p>, <ul>) cannot be placed inside inline elements (<a>, <span>). The <p> tag cannot contain other block elements. Use indentation for nesting — it helps you visually trace the code structure.',
        code: `<!-- Правильная вложенность -->
<ul>
  <li>
    <a href="/page1">
      <strong>Первая ссылка</strong>
    </a>
  </li>
  <li>Обычный пункт</li>
</ul>

<!-- Неправильная вложенность — теги перекрещиваются -->
<p><strong>Важный текст</p></strong>

<!-- Правильно — внутренний тег закрыт первым -->
<p><strong>Важный текст</strong></p>`,
        codeLang: 'html',
      },
      {
        sectionId: 'void-elements',
        heading_ru: 'Пустые элементы',
        heading_en: 'Void Elements',
        text_ru: 'Пустые (void) элементы — это теги, которые не могут иметь содержимого и поэтому не имеют закрывающего тега. К ним относятся: <br> (перенос строки), <img> (изображение), <input> (поле ввода), <hr> (горизонтальная линия), <meta> и <link> в заголовке документа.',
        text_en: 'Void elements are tags that cannot have content and therefore have no closing tag. They include: <br> (line break), <img> (image), <input> (input field), <hr> (horizontal rule), and <meta> and <link> in the document head.',
        code: '<p>Первая строка<br>Вторая строка</p>\n<img src="photo.jpg" alt="Фотография">\n<input type="email" placeholder="your@email.com">',
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Создайте карточку пользователя',
    title_en: 'Create a User Card',
    instructions_ru: 'Напишите HTML-разметку карточки пользователя. Используйте теги h2, p, img, a с атрибутами id, class, href, src и alt. Добавьте тег br для разделения строк в адресе.',
    instructions_en: 'Write the HTML markup for a user card. Use the h2, p, img, a tags with id, class, href, src, and alt attributes. Add a br tag to separate lines in the address.',
    activeTabs: ['html'],
    starterCode: {
      html: '<!-- Создайте карточку пользователя / Create a user card -->\n<div class="user-card">\n\n  <!-- Добавьте изображение пользователя / Add a user image -->\n\n  <!-- Добавьте имя пользователя (h2) / Add the user name (h2) -->\n\n  <!-- Добавьте описание (p) / Add a description (p) -->\n\n  <!-- Добавьте ссылку на профиль (a) / Add a profile link (a) -->\n\n</div>',
    },
    hints_ru: [
      'Используйте <img src="avatar.jpg" alt="Аватар"> для изображения',
      'Для имени подойдёт тег <h2 class="name">Иван Иванов</h2>',
      'Ссылку оформите так: <a href="/profile/ivan">Смотреть профиль</a>',
      'Не забудьте атрибут alt у изображения — это важно для доступности',
    ],
    hints_en: [
      'Use <img src="avatar.jpg" alt="Avatar"> for the image',
      'For the name, use <h2 class="name">John Smith</h2>',
      'Write the link as: <a href="/profile/john">View Profile</a>',
      'Don\'t forget the alt attribute on the image — it matters for accessibility',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Тег',
      term_en: 'Tag',
      definition_ru: 'Ключевое слово в угловых скобках, обозначающее начало или конец HTML-элемента.',
      definition_en: 'A keyword inside angle brackets that marks the start or end of an HTML element.',
      example_ru: '<p>, </p>, <img>',
      example_en: '<p>, </p>, <img>',
    },
    {
      term_ru: 'Элемент',
      term_en: 'Element',
      definition_ru: 'Полная конструкция из открывающего тега, содержимого и закрывающего тега.',
      definition_en: 'The complete construct of an opening tag, content, and closing tag.',
      example_ru: '<p>Текст</p>',
      example_en: '<p>Text</p>',
    },
    {
      term_ru: 'Атрибут',
      term_en: 'Attribute',
      definition_ru: 'Дополнительный параметр элемента, записываемый внутри открывающего тега в формате имя="значение".',
      definition_en: 'An additional parameter of an element, written inside the opening tag as name="value".',
      example_ru: 'class="intro", id="header"',
      example_en: 'class="intro", id="header"',
    },
    {
      term_ru: 'Пустой элемент',
      term_en: 'Void Element',
      definition_ru: 'Элемент, который не может иметь содержимого и не имеет закрывающего тега.',
      definition_en: 'An element that cannot have content and has no closing tag.',
      example_ru: '<br>, <img>, <input>',
      example_en: '<br>, <img>, <input>',
    },
    {
      term_ru: 'Вложенность',
      term_en: 'Nesting',
      definition_ru: 'Размещение одних HTML-элементов внутри других с соблюдением правильного порядка закрытия тегов.',
      definition_en: 'Placing HTML elements inside other elements while maintaining the correct closing order.',
      example_ru: '<p><strong>жирный</strong> текст</p>',
      example_en: '<p><strong>bold</strong> text</p>',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'HTML был изобретён Тимом Бернерсом-Ли в 1991 году. Первая версия содержала всего 18 тегов — сейчас их более 100!',
      text_en: 'HTML was invented by Tim Berners-Lee in 1991. The first version had only 18 tags — today there are more than 100!',
    },
    {
      text_ru: 'Браузер прощает многие ошибки в HTML и пытается отобразить страницу, даже если теги не закрыты. Но профессионалы всегда пишут правильный код.',
      text_en: 'Browsers forgive many HTML errors and try to render the page even if tags are not closed. But professionals always write correct code.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что такое HTML-элемент?',
      text_en: 'What is an HTML element?',
      options_ru: ['Только открывающий тег', 'Открывающий тег + содержимое + закрывающий тег', 'Только содержимое страницы', 'Атрибут внутри тега'],
      options_en: ['Only an opening tag', 'Opening tag + content + closing tag', 'Only the page content', 'An attribute inside a tag'],
      correctIndex: 1,
      explanation_ru: 'Элемент — это полная конструкция: открывающий тег, содержимое между ними и закрывающий тег.',
      explanation_en: 'An element is the complete construct: the opening tag, the content between them, and the closing tag.',
    },
    {
      id: 'q2',
      text_ru: 'Какой из этих тегов является пустым (void) элементом?',
      text_en: 'Which of these tags is a void element?',
      options_ru: ['<p>', '<div>', '<img>', '<span>'],
      options_en: ['<p>', '<div>', '<img>', '<span>'],
      correctIndex: 2,
      explanation_ru: '<img> — пустой элемент, он не имеет содержимого и закрывающего тега.',
      explanation_en: '<img> is a void element — it has no content and no closing tag.',
    },
    {
      id: 'q3',
      text_ru: 'Как правильно записать атрибут?',
      text_en: 'What is the correct way to write an attribute?',
      options_ru: ['class:"intro"', 'class="intro"', '"class"=intro', 'class=intro'],
      options_en: ['class:"intro"', 'class="intro"', '"class"=intro', 'class=intro'],
      correctIndex: 1,
      explanation_ru: 'Атрибут записывается как имя="значение" — имя атрибута, знак равно и значение в кавычках.',
      explanation_en: 'An attribute is written as name="value" — the attribute name, an equals sign, and the value in quotes.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает атрибут alt у тега <img>?',
      text_en: 'What does the alt attribute on <img> do?',
      options_ru: ['Задаёт размер изображения', 'Задаёт альтернативный текст для доступности', 'Устанавливает ссылку на изображение', 'Определяет тип файла'],
      options_en: ['Sets the image size', 'Provides alternative text for accessibility', 'Sets a link on the image', 'Defines the file type'],
      correctIndex: 1,
      explanation_ru: 'Атрибут alt содержит текстовое описание изображения, которое используется скринридерами и отображается, если картинка не загрузилась.',
      explanation_en: 'The alt attribute contains a text description of the image, used by screen readers and displayed if the image fails to load.',
    },
    {
      id: 'q5',
      text_ru: 'Какое из следующих вложений написано правильно?',
      text_en: 'Which of the following nesting examples is correct?',
      options_ru: ['<p><strong>текст</p></strong>', '<p><strong>текст</strong></p>', '<strong><p>текст</strong></p>', '<p>текст<strong></p></strong>'],
      options_en: ['<p><strong>text</p></strong>', '<p><strong>text</strong></p>', '<strong><p>text</strong></p>', '<p>text<strong></p></strong>'],
      correctIndex: 1,
      explanation_ru: 'Внутренний тег <strong> должен закрываться раньше внешнего тега <p>.',
      explanation_en: 'The inner <strong> tag must be closed before the outer <p> tag.',
    },
  ],
}
