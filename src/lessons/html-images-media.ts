import type { Lesson } from '@/types/lesson'

export const htmlImagesMedia: Lesson = {
  slug: 'html-images-media',
  category: 'HTML',
  readTime: 10,
  icon: '🖼️',
  title_ru: 'Изображения и медиа в HTML',
  title_en: 'Images & Media in HTML',
  description_ru: 'Научитесь встраивать изображения, видео и аудио на веб-страницы. Познакомьтесь с форматами изображений и тегами <figure>, <video>, <audio>.',
  description_en: 'Learn how to embed images, video, and audio into web pages. Explore image formats and the <figure>, <video>, <audio> tags.',
  sections: [
    { id: 'intro', title_ru: 'Введение в медиа', title_en: 'Introduction to Media' },
    { id: 'img-tag', title_ru: 'Тег <img> и его атрибуты', title_en: 'The <img> Tag and Its Attributes' },
    { id: 'formats', title_ru: 'Форматы изображений', title_en: 'Image Formats' },
    { id: 'figure', title_ru: 'Figure и Figcaption', title_en: 'Figure and Figcaption' },
    { id: 'video-audio', title_ru: 'Видео и аудио', title_en: 'Video and Audio' },
  ],
  slides: [
    {
      id: 'slide-title',
      type: 'title',
      title_ru: 'Изображения и медиа в HTML',
      title_en: 'Images & Media in HTML',
      body_ru: 'Веб без картинок — это просто текст. Давайте оживим страницы с помощью изображений, видео и аудио!',
      body_en: 'The web without images is just text. Let\'s bring pages to life with images, video, and audio!',
    },
    {
      id: 'slide-analogy',
      type: 'analogy',
      title_ru: 'Как рамка для картины',
      title_en: 'Like a Picture Frame',
      body_ru: 'Тег <img> — это рамка. Вы говорите браузеру: «Вот рамка, а внутри — картина из этого адреса». Атрибут alt — это табличка с описанием на случай, если картины нет.',
      body_en: 'The <img> tag is like a picture frame. You tell the browser: "Here\'s a frame, and the painting inside comes from this address." The alt attribute is the label describing it when the picture can\'t load.',
      visual: {
        kind: 'emoji',
        emojis: ['🖼️', '🏷️', '🌐'],
        caption_ru: 'Рамка → адрес → описание',
        caption_en: 'Frame → address → description',
      },
      bullets: [
        { text_ru: 'src — адрес изображения (URL или путь)', text_en: 'src — the image address (URL or path)' },
        { text_ru: 'alt — текст-замена для скринридеров и ошибок загрузки', text_en: 'alt — fallback text for screen readers and load errors' },
        { text_ru: 'width/height — размеры, чтобы страница не прыгала', text_en: 'width/height — dimensions to prevent layout shifts' },
      ],
    },
    {
      id: 'slide-concept-img',
      type: 'concept',
      title_ru: 'Тег <img>: обязательные атрибуты',
      title_en: 'The <img> Tag: Required Attributes',
      body_ru: 'Тег <img> — самозакрывающийся. Атрибуты src и alt обязательны: src указывает на файл изображения, alt описывает его содержимое для доступности.',
      body_en: 'The <img> tag is self-closing. The src and alt attributes are required: src points to the image file, alt describes its content for accessibility.',
      code: `<img
  src="photo.jpg"
  alt="Закат над горами"
  width="800"
  height="450"
>`,
      codeLang: 'html',
    },
    {
      id: 'slide-anim',
      type: 'code-anim',
      title_ru: 'Строим <figure> шаг за шагом',
      title_en: 'Building a <figure> Step by Step',
      body_ru: 'Посмотрите, как простое изображение превращается в семантически правильный блок с подписью.',
      body_en: 'Watch how a simple image grows into a semantically correct block with a caption.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<img src="cat.jpg" alt="Рыжий кот">`,
          comment_ru: 'Начнём с простого тега img',
          comment_en: 'Start with a basic img tag',
          preview: '<div style="font-family:sans-serif"><img style="width:120px;height:80px;background:#f90;display:block" alt="Рыжий кот"> <em style="color:#999;font-size:12px">[cat.jpg]</em></div>',
        },
        {
          code: `<figure>
  <img src="cat.jpg" alt="Рыжий кот">
</figure>`,
          comment_ru: 'Оборачиваем в <figure> для семантики',
          comment_en: 'Wrap in <figure> for semantics',
          preview: '<figure style="margin:0;font-family:sans-serif;border:1px dashed #ccc;padding:8px;display:inline-block"><img style="width:120px;height:80px;background:#f90;display:block" alt="Рыжий кот"></figure>',
        },
        {
          code: `<figure>
  <img src="cat.jpg" alt="Рыжий кот">
  <figcaption>Мой кот Рыжик, 2024</figcaption>
</figure>`,
          comment_ru: 'Добавляем <figcaption> с подписью',
          comment_en: 'Add <figcaption> with a caption',
          preview: '<figure style="margin:0;font-family:sans-serif;border:1px dashed #ccc;padding:8px;display:inline-block"><img style="width:120px;height:80px;background:#f90;display:block" alt="Рыжий кот"><figcaption style="font-size:13px;color:#555;margin-top:4px">Мой кот Рыжик, 2024</figcaption></figure>',
        },
      ],
    },
    {
      id: 'slide-concept-formats',
      type: 'concept',
      title_ru: 'Форматы изображений',
      title_en: 'Image Formats',
      body_ru: 'Выбор формата влияет на качество и скорость загрузки страницы. Каждый формат имеет свои сильные стороны.',
      body_en: 'Choosing the right format affects quality and page load speed. Each format has its strengths.',
      bullets: [
        { text_ru: 'JPG — фото, без прозрачности, хорошее сжатие', text_en: 'JPG — photos, no transparency, good compression' },
        { text_ru: 'PNG — графика с прозрачностью, чёткие края', text_en: 'PNG — graphics with transparency, sharp edges' },
        { text_ru: 'WebP — современный формат, меньше JPG и PNG на 25–35%', text_en: 'WebP — modern format, 25–35% smaller than JPG/PNG' },
        { text_ru: 'SVG — векторная графика, масштабируется без потерь', text_en: 'SVG — vector graphics, scales without quality loss' },
      ],
    },
    {
      id: 'slide-code-figure',
      type: 'code',
      title_ru: 'Видео и аудио',
      title_en: 'Video and Audio',
      body_ru: 'HTML5 предоставляет встроенные теги для воспроизведения медиафайлов прямо в браузере без плагинов.',
      body_en: 'HTML5 provides built-in tags for playing media files directly in the browser without plugins.',
      code: `<!-- Видео с элементами управления -->
<video controls width="640" height="360">
  <source src="film.mp4" type="video/mp4">
  <source src="film.webm" type="video/webm">
  Ваш браузер не поддерживает видео.
</video>

<!-- Аудио с элементами управления -->
<audio controls>
  <source src="song.mp3" type="audio/mpeg">
  <source src="song.ogg" type="audio/ogg">
  Ваш браузер не поддерживает аудио.
</audio>`,
      codeLang: 'html',
    },
    {
      id: 'slide-compare',
      type: 'compare',
      title_ru: 'Декоративное vs информативное изображение',
      title_en: 'Decorative vs Informative Image',
      body_ru: 'Атрибут alt пишется по-разному в зависимости от роли изображения на странице.',
      body_en: 'The alt attribute is written differently depending on the image\'s role on the page.',
      compareLeft: {
        label_ru: 'Декоративное (alt="")',
        label_en: 'Decorative (alt="")',
        items_ru: [
          'Изображение — лишь украшение',
          'Скринридер пропустит его',
          'alt="" — пустая строка, не отсутствие атрибута',
          'Пример: фоновый узор, декоративная линия',
        ],
        items_en: [
          'Image is purely decorative',
          'Screen reader will skip it',
          'alt="" — empty string, not missing attribute',
          'Example: background pattern, decorative divider',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'Информативное (alt="описание")',
        label_en: 'Informative (alt="description")',
        items_ru: [
          'Изображение несёт смысл',
          'Скринридер прочитает alt вслух',
          'Описывайте содержимое, а не внешний вид',
          'Пример: alt="График продаж за 2024 год"',
        ],
        items_en: [
          'Image conveys meaning',
          'Screen reader will read alt aloud',
          'Describe the content, not the appearance',
          'Example: alt="Sales chart for 2024"',
        ],
        color: 'green',
      },
    },
    {
      id: 'slide-tip',
      type: 'tip',
      title_ru: 'Совет: всегда задавайте размеры',
      title_en: 'Tip: Always Set Dimensions',
      body_ru: 'Указывайте width и height для изображений. Это предотвращает «прыжки» макета (Cumulative Layout Shift) и улучшает показатель Core Web Vitals — важный фактор SEO-ранжирования.',
      body_en: 'Always specify width and height for images. This prevents layout shifts (Cumulative Layout Shift) and improves Core Web Vitals scores — an important SEO ranking factor.',
    },
    {
      id: 'slide-practice',
      type: 'practice-cta',
      title_ru: 'Пора практиковаться!',
      title_en: 'Time to Practice!',
      body_ru: 'Создайте галерею из трёх изображений с подписями, используя <figure> и <figcaption>.',
      body_en: 'Create a gallery of three images with captions using <figure> and <figcaption>.',
    },
  ],
  content: {
    intro_ru: 'Изображения составляют более 60% веса среднестатистической веб-страницы. Умение правильно встраивать и оптимизировать медиафайлы — ключевой навык веб-разработчика.',
    intro_en: 'Images make up over 60% of the average web page\'s weight. Knowing how to correctly embed and optimize media files is a key web developer skill.',
    blocks: [
      {
        sectionId: 'img-tag',
        heading_ru: 'Атрибуты тега <img>',
        heading_en: 'Attributes of the <img> Tag',
        text_ru: 'Тег <img> поддерживает множество атрибутов. Обязательные: src (путь к файлу) и alt (альтернативный текст). Рекомендуемые: width и height для предотвращения сдвигов макета. Атрибут loading="lazy" откладывает загрузку изображения до момента, когда оно появится во вьюпорте.',
        text_en: 'The <img> tag supports many attributes. Required: src (file path) and alt (alternative text). Recommended: width and height to prevent layout shifts. The loading="lazy" attribute defers image loading until it enters the viewport.',
        code: `<img
  src="images/hero.webp"
  alt="Команда разработчиков за работой"
  width="1200"
  height="630"
  loading="lazy"
>`,
        codeLang: 'html',
      },
      {
        sectionId: 'formats',
        heading_ru: 'Когда использовать какой формат',
        heading_en: 'When to Use Which Format',
        text_ru: 'JPG идеален для фотографий — алгоритм сжатия отлично работает с плавными переходами цветов. PNG выбирайте для логотипов и изображений с прозрачностью. WebP — современная замена обоих форматов с лучшим сжатием. SVG незаменим для иконок и логотипов, так как масштабируется без потери качества.',
        text_en: 'JPG is ideal for photographs — its compression works great with smooth color gradients. Choose PNG for logos and images requiring transparency. WebP is a modern replacement for both with better compression. SVG is essential for icons and logos as it scales without quality loss.',
        code: `<!-- Используем <picture> для современных форматов с фоллбэком -->
<picture>
  <source srcset="image.avif" type="image/avif">
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Описание" width="800" height="450">
</picture>`,
        codeLang: 'html',
      },
      {
        sectionId: 'figure',
        heading_ru: 'Семантика: <figure> и <figcaption>',
        heading_en: 'Semantics: <figure> and <figcaption>',
        text_ru: 'Элемент <figure> группирует самостоятельный контент — изображение, диаграмму, код или цитату. <figcaption> даёт этому контенту подпись. Использование этих тегов улучшает доступность и помогает поисковикам понять структуру страницы.',
        text_en: 'The <figure> element groups self-contained content — an image, diagram, code, or quote. <figcaption> provides a caption for that content. Using these tags improves accessibility and helps search engines understand page structure.',
        code: `<figure>
  <img
    src="chart.png"
    alt="Рост пользователей с 2020 по 2024 год"
    width="600"
    height="400"
  >
  <figcaption>
    Рис. 1 — Динамика роста пользователей платформы
  </figcaption>
</figure>`,
        codeLang: 'html',
      },
      {
        sectionId: 'video-audio',
        heading_ru: 'Встраивание видео и аудио',
        heading_en: 'Embedding Video and Audio',
        text_ru: 'Атрибут controls отображает панель управления. autoplay запускает воспроизведение автоматически (требует muted для видео в большинстве браузеров). loop повторяет воспроизведение. poster задаёт обложку для видео до начала воспроизведения. Всегда предоставляйте несколько форматов через <source> для совместимости.',
        text_en: 'The controls attribute shows the playback panel. autoplay starts playback automatically (requires muted for video in most browsers). loop repeats playback. poster sets a thumbnail for video before it plays. Always provide multiple formats via <source> for compatibility.',
        code: `<video
  controls
  poster="thumbnail.jpg"
  width="640"
  height="360"
  muted
  loop
>
  <source src="intro.mp4" type="video/mp4">
  <source src="intro.webm" type="video/webm">
  <p>Ваш браузер не поддерживает тег video.</p>
</video>`,
        codeLang: 'html',
      },
    ],
  },
  editorTask: {
    title_ru: 'Создайте медиа-карточку',
    title_en: 'Create a Media Card',
    instructions_ru: 'Создайте HTML-страницу с карточкой питомца: добавьте изображение в теге <figure> с подписью в <figcaption>. Используйте правильный alt-текст.',
    instructions_en: 'Create an HTML page with a pet card: add an image inside a <figure> tag with a caption in <figcaption>. Use correct alt text.',
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Карточка питомца</title>
</head>
<body>

  <!-- Создайте figure с img и figcaption -->

</body>
</html>`,
    },
    hints_ru: [
      'Тег <figure> оборачивает изображение и подпись вместе',
      'Атрибут alt должен описывать содержимое: что изображено и почему это важно',
      'Для src можно использовать ссылку на любое изображение из интернета',
      '<figcaption> идёт внутри <figure>, обычно после <img>',
    ],
    hints_en: [
      'The <figure> tag wraps the image and caption together',
      'The alt attribute should describe the content: what is shown and why it matters',
      'For src you can use a link to any image from the internet',
      '<figcaption> goes inside <figure>, usually after <img>',
    ],
  },
  keyTerms: [
    {
      term_ru: 'Атрибут src',
      term_en: 'src attribute',
      definition_ru: 'Указывает путь или URL к медиафайлу. Обязателен для <img>, <video>, <audio>.',
      definition_en: 'Specifies the path or URL to a media file. Required for <img>, <video>, <audio>.',
      example_ru: '<img src="photo.jpg">',
      example_en: '<img src="photo.jpg">',
    },
    {
      term_ru: 'Атрибут alt',
      term_en: 'alt attribute',
      definition_ru: 'Альтернативный текст изображения. Читается скринридерами и отображается при ошибке загрузки.',
      definition_en: 'Alternative text for an image. Read by screen readers and shown when the image fails to load.',
      example_ru: '<img alt="Логотип компании">',
      example_en: '<img alt="Company logo">',
    },
    {
      term_ru: 'Figure',
      term_en: 'Figure',
      definition_ru: 'Семантический элемент для самостоятельного контента (изображение, диаграмма, код), который можно вынести из основного потока.',
      definition_en: 'A semantic element for self-contained content (image, diagram, code) that can be moved out of the main flow.',
    },
    {
      term_ru: 'WebP',
      term_en: 'WebP',
      definition_ru: 'Современный формат изображений от Google. Обеспечивает меньший размер файла при том же качестве, что JPG и PNG.',
      definition_en: 'A modern image format by Google. Provides smaller file sizes at the same quality as JPG and PNG.',
    },
    {
      term_ru: 'Lazy loading',
      term_en: 'Lazy loading',
      definition_ru: 'Откладывание загрузки изображения до момента, когда оно появится во вьюпорте. Ускоряет начальную загрузку страницы.',
      definition_en: 'Deferring image loading until it enters the viewport. Speeds up initial page load.',
      example_ru: '<img loading="lazy" ...>',
      example_en: '<img loading="lazy" ...>',
    },
  ],
  didYouKnow: [
    {
      text_ru: 'Формат WebP в среднем на 30% легче JPG при том же визуальном качестве. Его поддерживают все современные браузеры начиная с 2020 года.',
      text_en: 'WebP is on average 30% lighter than JPG at the same visual quality. All modern browsers have supported it since 2020.',
    },
    {
      text_ru: 'Атрибут alt впервые появился в HTML 2.0 в 1995 году — задолго до появления скринридеров. Его создали для случаев, когда изображения не загружаются из-за медленного соединения.',
      text_en: 'The alt attribute first appeared in HTML 2.0 in 1995 — long before screen readers existed. It was created for cases when images don\'t load due to slow connections.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой атрибут тега <img> обязателен для доступности?',
      text_en: 'Which <img> attribute is required for accessibility?',
      options_ru: ['src', 'alt', 'width', 'title'],
      options_en: ['src', 'alt', 'width', 'title'],
      correctIndex: 1,
      explanation_ru: 'Атрибут alt читается скринридерами и отображается при ошибке загрузки. Он обязателен с точки зрения доступности и HTML-стандарта.',
      explanation_en: 'The alt attribute is read by screen readers and shown when the image fails to load. It is required for accessibility and per the HTML standard.',
    },
    {
      id: 'q2',
      text_ru: 'Какое значение alt нужно задать декоративному изображению?',
      text_en: 'What alt value should a decorative image have?',
      options_ru: ['alt="декорация"', 'alt="изображение"', 'alt=""', 'Атрибут не нужен'],
      options_en: ['alt="decoration"', 'alt="image"', 'alt=""', 'No attribute needed'],
      correctIndex: 2,
      explanation_ru: 'Для декоративных изображений используется alt="" (пустая строка). Это сообщает скринридеру пропустить элемент. Полное отсутствие атрибута — ошибка.',
      explanation_en: 'Decorative images use alt="" (empty string). This tells the screen reader to skip the element. Omitting the attribute entirely is an error.',
    },
    {
      id: 'q3',
      text_ru: 'Какой формат изображения лучше всего подходит для логотипа с прозрачным фоном?',
      text_en: 'Which image format is best for a logo with a transparent background?',
      options_ru: ['JPG', 'PNG или SVG', 'BMP', 'TIFF'],
      options_en: ['JPG', 'PNG or SVG', 'BMP', 'TIFF'],
      correctIndex: 1,
      explanation_ru: 'JPG не поддерживает прозрачность. PNG поддерживает прозрачность для растровых изображений, а SVG — для векторных.',
      explanation_en: 'JPG does not support transparency. PNG supports transparency for raster images, and SVG for vector graphics.',
    },
    {
      id: 'q4',
      text_ru: 'Какой тег используется для добавления подписи к изображению?',
      text_en: 'Which tag is used to add a caption to an image?',
      options_ru: ['<caption>', '<figcaption>', '<label>', '<p>'],
      options_en: ['<caption>', '<figcaption>', '<label>', '<p>'],
      correctIndex: 1,
      explanation_ru: '<figcaption> используется внутри <figure> для семантической подписи. <caption> — для таблиц, не для изображений.',
      explanation_en: '<figcaption> is used inside <figure> for a semantic caption. <caption> is for tables, not images.',
    },
    {
      id: 'q5',
      text_ru: 'Какой атрибут <img> откладывает загрузку до появления в зоне видимости?',
      text_en: 'Which <img> attribute defers loading until the image is in the viewport?',
      options_ru: ['defer', 'async', 'loading="lazy"', 'preload="none"'],
      options_en: ['defer', 'async', 'loading="lazy"', 'preload="none"'],
      correctIndex: 2,
      explanation_ru: 'Атрибут loading="lazy" включает нативную ленивую загрузку изображений, встроенную в браузер.',
      explanation_en: 'The loading="lazy" attribute enables native browser-level lazy loading of images.',
    },
  ],
}
