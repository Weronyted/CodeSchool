import type { Lesson } from '@/types/lesson'

export const cssStyling: Lesson = {
  slug: 'css-styling',
  category: 'CSS',
  readTime: 8,
  icon: '🖌️',

  title_ru: 'Стили CSS: цвета, шрифты, фон',
  title_en: 'CSS Styling: colours, fonts, backgrounds',

  description_ru: 'Раскрашиваем страницу: работаем с цветами, шрифтами, фоном и рамками.',
  description_en: 'Painting the page: working with colours, fonts, backgrounds and borders.',

  sections: [
    { id: 'colors',      title_ru: 'Цвета',            title_en: 'Colours' },
    { id: 'fonts',       title_ru: 'Шрифты и текст',   title_en: 'Fonts and text' },
    { id: 'backgrounds', title_ru: 'Фон',               title_en: 'Backgrounds' },
    { id: 'borders',     title_ru: 'Рамки и скругления', title_en: 'Borders and rounding' },
    { id: 'key-terms',   title_ru: 'Важные слова',      title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'CSS-стили: раскрашиваем страницу',
      title_en: 'CSS styles: painting the page',
      body_ru: 'Сегодня мы берём в руки виртуальные кисти. Цвета, шрифты, фоны, рамки — вот чем CSS делает страницы живыми и красивыми.',
      body_en: 'Today we pick up the virtual brushes. Colours, fonts, backgrounds, borders — these are what CSS uses to make pages lively and beautiful.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'CSS как художник с палитрой',
      title_en: 'CSS is like a painter with a palette',
      body_ru: 'Представь художника. У него есть палитра с красками (цвета), разные кисти (размеры шрифтов), холст (фон) и рамка для картины (border). CSS даёт тебе те же инструменты, только для веб-страниц.',
      body_en: 'Imagine a painter. They have a palette of colours (colours), different brushes (font sizes), a canvas (background) and a picture frame (border). CSS gives you the same tools, but for web pages.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Цвета в CSS: три способа',
      title_en: 'Colours in CSS: three ways',
      body_ru: '1. Имя: red, blue, tomato, royalblue — просто напиши название. 2. Шестнадцатеричный код: #ff0000 — точный цвет (# и 6 символов). 3. Функция rgb: rgb(255, 0, 0) — три числа от 0 до 255 для красного, зелёного, синего. Все три варианта дают одинаковый результат.',
      body_en: '1. Name: red, blue, tomato, royalblue — just type the name. 2. Hex code: #ff0000 — an exact colour (# and 6 characters). 3. RGB function: rgb(255, 0, 0) — three numbers 0–255 for red, green, blue. All three give the same result.',
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Цвета — примеры',
      title_en: 'Colours — examples',
      body_ru: 'Вот три способа написать один и тот же красный цвет, и несколько разных цветов для текста и фона.',
      body_en: 'Here are three ways to write the same red, and several different colours for text and backgrounds.',
      code: `/* Три способа задать красный */
h1 { color: red; }
h1 { color: #ff0000; }
h1 { color: rgb(255, 0, 0); }

/* Текст и фон */
.warning {
  color: white;
  background-color: tomato;
}

.success {
  color: #1a7f4b;
  background-color: #d4f8e8;
}`,
      codeLang: 'css',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Шрифты: family, size, weight',
      title_en: 'Fonts: family, size, weight',
      body_ru: 'font-family — название шрифта (Arial, Georgia, "Times New Roman"). Всегда добавляй запасной: Arial, sans-serif. font-size — размер в пикселях (16px) или em (1.5em = 1.5× от родителя). font-weight — жирность: normal (400) или bold (700). Чем больше число, тем жирнее.',
      body_en: 'font-family — the font name (Arial, Georgia, "Times New Roman"). Always add a fallback: Arial, sans-serif. font-size — size in pixels (16px) or em (1.5em = 1.5× the parent). font-weight — boldness: normal (400) or bold (700). The bigger the number, the bolder.',
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Типографика в действии',
      title_en: 'Typography in action',
      body_ru: 'Вот как выглядит полный блок настроек текста. Это самые используемые свойства для оформления любого текста на странице.',
      body_en: 'Here is what a complete text settings block looks like. These are the most commonly used properties for styling any text on the page.',
      code: `h1 {
  font-family: 'Georgia', serif;
  font-size: 40px;
  font-weight: 700;
  color: #1a1a2e;
  text-align: center;
  letter-spacing: -1px;  /* межбуквенный интервал */
}

p {
  font-family: 'Arial', sans-serif;
  font-size: 16px;
  font-weight: 400;
  line-height: 1.6;  /* межстрочный интервал */
  color: #555;
}`,
      codeLang: 'css',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Фон, рамки и скругления',
      title_en: 'Background, borders and rounding',
      body_ru: 'background-color задаёт цвет фона. border задаёт рамку: толщина, стиль, цвет (1px solid #ccc). border-radius скругляет углы — 8px делает чуть скруглёнными, 50% превращает квадрат в круг. Эти три свойства вместе создают красивые карточки и кнопки.',
      body_en: 'background-color sets the background colour. border sets the border: width, style, colour (1px solid #ccc). border-radius rounds corners — 8px makes them slightly rounded, 50% turns a square into a circle. These three properties together create beautiful cards and buttons.',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'В CSS есть цвет с необычным названием — «rebeccapurple». Его добавили в стандарт в 2014 году в память о дочери разработчика Эрика Мейера. Это единственный именованный цвет, названный в честь реального человека.',
      body_en: 'CSS has a colour with an unusual name — "rebeccapurple". It was added to the standard in 2014 in memory of developer Eric Meyer\'s daughter. It is the only named colour named after a real person.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Создай красивую карточку!',
      title_en: 'Create a beautiful card!',
      body_ru: 'Примени всё, что узнал: цвета, шрифты, фон и рамки — и создай красивую карточку профиля.',
      body_en: 'Apply everything you learned: colours, fonts, background and borders — and create a beautiful profile card.',
    },
  ],

  content: {
    intro_ru: `В прошлом уроке ты узнал, что такое CSS-правила. Теперь разберём самые
нужные свойства: те, которые ты будешь использовать в каждом проекте. Цвета,
шрифты, фон и рамки — этот набор превращает пустую HTML-страницу в живой
дизайн. Всё гораздо проще, чем кажется.`,
    intro_en: `In the last lesson you learned what CSS rules are. Now we'll look at the
most essential properties — those you'll use in every project. Colours, fonts,
backgrounds and borders — this set transforms a blank HTML page into a living design.
It's much simpler than it looks.`,

    blocks: [
      {
        sectionId: 'colors',
        heading_ru: 'Цвета',
        heading_en: 'Colours',
        text_ru: `CSS поддерживает три формата цветов — и все три правильные:

1. Именованные цвета: red, blue, green, tomato, royalblue, coral, gold...
   В CSS их более 140. Удобны для быстрых экспериментов.

2. Hex-коды: #ffffff (белый), #000000 (чёрный), #3b5bdb (синий).
   Шесть символов: первые два — красный канал, вторые — зелёный, третьи — синий.

3. Функция rgb(): rgb(255, 255, 255) — белый. Каждое число от 0 до 255.
   Вариант rgba() добавляет прозрачность: rgba(0, 0, 0, 0.5) — полупрозрачный чёрный.

Свойства: color — цвет текста, background-color — цвет фона.`,
        text_en: `CSS supports three colour formats — and all three are correct:

1. Named colours: red, blue, green, tomato, royalblue, coral, gold...
   CSS has more than 140 of them. Handy for quick experiments.

2. Hex codes: #ffffff (white), #000000 (black), #3b5bdb (blue).
   Six characters: first two — red channel, next two — green, last two — blue.

3. The rgb() function: rgb(255, 255, 255) — white. Each number is 0–255.
   rgba() adds transparency: rgba(0, 0, 0, 0.5) — semi-transparent black.

Properties: color — text colour, background-color — background colour.`,
        code: `/* Именованные цвета */
h1 { color: tomato; }

/* Hex-коды */
p { color: #333333; }

/* RGB с прозрачностью */
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
}

/* Оба свойства вместе */
.badge {
  color: white;
  background-color: #3b5bdb;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'fonts',
        heading_ru: 'Шрифты и текст',
        heading_en: 'Fonts and text',
        text_ru: `Типографика — одна из самых важных частей дизайна. Читаемый текст —
это уже половина успеха.

• font-family: указывает шрифт. Всегда пиши запасной через запятую:
  font-family: 'Roboto', Arial, sans-serif.
  Если Roboto не загрузится — браузер возьмёт Arial, а если и его нет — системный sans-serif.

• font-size: размер шрифта. Для основного текста принято 16px.
  Заголовки — 24–48px. Мелкий текст — 12–14px.

• font-weight: жирность. normal = 400, bold = 700. Можно задавать числами: 300, 500, 900.

• line-height: межстрочный интервал. Значение 1.5–1.7 делает текст удобно читаемым.

• text-align: left, center, right, justify — выравнивание текста.`,
        text_en: `Typography is one of the most important parts of design. Readable text is
already half the battle.

• font-family: specifies the font. Always write a fallback separated by a comma:
  font-family: 'Roboto', Arial, sans-serif.
  If Roboto does not load — the browser takes Arial, and if that is missing — the system sans-serif.

• font-size: font size. The standard for body text is 16px.
  Headings — 24–48px. Small text — 12–14px.

• font-weight: boldness. normal = 400, bold = 700. Can be set with numbers: 300, 500, 900.

• line-height: line spacing. A value of 1.5–1.7 makes text comfortable to read.

• text-align: left, center, right, justify — text alignment.`,
        code: `body {
  font-family: 'Inter', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: #2d2d2d;
}

h1 {
  font-size: 40px;
  font-weight: 700;
  text-align: center;
  letter-spacing: -0.5px;
}

.caption {
  font-size: 13px;
  font-weight: 400;
  color: #888;
  text-align: right;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'backgrounds',
        heading_ru: 'Фон',
        heading_en: 'Backgrounds',
        text_ru: `Фон — это то, на чём лежит всё остальное. Самые нужные свойства:

• background-color: цвет фона. Работает как color, но для фона.
• background-image: фоновое изображение. Записывается как url("путь/к/картинке.jpg").
• background-size: cover — картинка занимает весь блок; contain — помещается целиком.
• background-position: center, top left, 50% 50% — откуда начинать картинку.
• background-repeat: no-repeat — не повторять картинку (по умолчанию повторяется).

Чаще всего используют background-color. Фоновые картинки — для баннеров и hero-секций.`,
        text_en: `The background is what everything else sits on. The most useful properties:

• background-color: background colour. Works like color, but for the background.
• background-image: a background image. Written as url("path/to/image.jpg").
• background-size: cover — image fills the whole block; contain — fits inside completely.
• background-position: center, top left, 50% 50% — where the image starts.
• background-repeat: no-repeat — do not tile the image (by default it repeats).

background-color is used most often. Background images are for banners and hero sections.`,
        code: `/* Цветной фон */
.card {
  background-color: #f8f9fa;
}

/* Градиентный фон */
.hero {
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

/* Фото-фон */
.banner {
  background-image: url("banner.jpg");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'borders',
        heading_ru: 'Рамки и скругления',
        heading_en: 'Borders and rounding',
        text_ru: `Рамки добавляют чёткие границы элементам. Скругления — делают дизайн
мягче и современнее.

• border: три значения сразу — толщина стиль цвет.
  border: 2px solid #ddd — серая сплошная рамка 2px.
  Стили: solid (сплошная), dashed (штриховая), dotted (точечная), none (убрать).

• border-radius: скругляет углы.
  4px — чуть-чуть. 12px — заметное скругление. 50% — круг или эллипс.

• box-shadow: тень вокруг блока. Формат: смещение-x смещение-y размытие цвет.
  box-shadow: 0 4px 16px rgba(0,0,0,0.1) — мягкая тень вниз.`,
        text_en: `Borders add sharp edges to elements. Rounding makes design softer and more modern.

• border: three values at once — width style colour.
  border: 2px solid #ddd — a grey solid border 2px wide.
  Styles: solid, dashed, dotted, none (remove).

• border-radius: rounds corners.
  4px — slight. 12px — noticeable rounding. 50% — circle or ellipse.

• box-shadow: shadow around a block. Format: x-offset y-offset blur colour.
  box-shadow: 0 4px 16px rgba(0,0,0,0.1) — a soft downward shadow.`,
        code: `/* Обычная рамка */
.input {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px 12px;
}

/* Карточка с тенью */
.card {
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  padding: 24px;
}

/* Круглая аватарка */
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #3b5bdb;
}`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: карточка профиля',
    title_en: 'Try it yourself: profile card',
    instructions_ru: `Создай красивую карточку профиля. HTML уже написан — твоя задача написать CSS:
— Дай .card белый фон, скруглённые углы 20px и тень
— Сделай имя (.name) тёмным и крупным (28px)
— Сделай должность (.role) серой и меньше (14px)
— Добавь аватару (.avatar) круглую форму (border-radius: 50%)
Нажми «Запустить» и полюбуйся результатом!`,
    instructions_en: `Create a beautiful profile card. HTML is already written — your task is to write the CSS:
— Give .card a white background, rounded corners of 20px and a shadow
— Make the name (.name) dark and large (28px)
— Make the role (.role) grey and smaller (14px)
— Give the avatar (.avatar) a circular shape (border-radius: 50%)
Press "Run" and admire the result!`,
    activeTabs: ['css'],
    starterCode: {
      css: `/* Стилизуй карточку */

body {
  background-color: #f0f2f5;
  font-family: Arial, sans-serif;
  display: flex;
  justify-content: center;
  padding-top: 40px;
}

.card {
  background-color: white;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  padding: 32px;
  text-align: center;
  width: 280px;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  background-color: #c5cae9;
  margin: 0 auto 16px;
}

.name {
  font-size: 22px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 4px;
}

.role {
  font-size: 14px;
  color: #888;
}`,
    },
    hints_ru: [
      'border-radius: 50% превращает квадрат в круг — ширина и высота должны совпадать.',
      'box-shadow принимает 4 значения: смещение-x смещение-y размытие цвет.',
    ],
    hints_en: [
      'border-radius: 50% turns a square into a circle — width and height must match.',
      'box-shadow takes 4 values: x-offset y-offset blur colour.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'color', term_en: 'color',
      definition_ru: 'CSS-свойство, задающее цвет текста элемента.',
      definition_en: 'A CSS property that sets the text colour of an element.',
      example_ru: 'h1 { color: royalblue; }',
      example_en: 'h1 { color: royalblue; }',
    },
    {
      term_ru: 'font-family', term_en: 'font-family',
      definition_ru: 'CSS-свойство, задающее шрифт. Принято указывать несколько шрифтов через запятую как запасные.',
      definition_en: 'A CSS property that sets the font. It is good practice to list several fonts as fallbacks.',
      example_ru: "font-family: 'Roboto', Arial, sans-serif;",
      example_en: "font-family: 'Roboto', Arial, sans-serif;",
    },
    {
      term_ru: 'background-color', term_en: 'background-color',
      definition_ru: 'CSS-свойство, задающее цвет фона элемента.',
      definition_en: 'A CSS property that sets the background colour of an element.',
      example_ru: '.card { background-color: white; }',
      example_en: '.card { background-color: white; }',
    },
    {
      term_ru: 'border-radius', term_en: 'border-radius',
      definition_ru: 'CSS-свойство, скругляющее углы элемента. 50% делает элемент круглым.',
      definition_en: 'A CSS property that rounds the corners of an element. 50% makes it circular.',
      example_ru: '.avatar { border-radius: 50%; }',
      example_en: '.avatar { border-radius: 50%; }',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В CSS зарезервировано более 140 именованных цветов — от «алисеголубого» (aliceblue) до «ятобы» (rebeccapurple). Один из них назван в честь реального человека — дочери веб-разработчика.',
      text_en: 'CSS has over 140 reserved named colours — from "aliceblue" to "rebeccapurple". One of them is named after a real person — a web developer\'s daughter.',
    },
    {
      text_ru: 'Google Fonts предоставляет более 1 500 бесплатных шрифтов, которые ты можешь использовать на любом сайте. Достаточно вставить одну строку в <head>.',
      text_en: 'Google Fonts provides over 1,500 free fonts you can use on any website. You just need to add one line to <head>.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какое CSS-свойство задаёт цвет фона?',
      text_en: 'Which CSS property sets the background colour?',
      options_ru: ['color', 'text-color', 'background-color', 'fill'],
      options_en: ['color', 'text-color', 'background-color', 'fill'],
      correctIndex: 2,
      explanation_ru: 'background-color задаёт цвет фона. color — только цвет текста.',
      explanation_en: 'background-color sets the background. color sets only the text colour.',
    },
    {
      id: 'q2',
      text_ru: 'Как записать белый цвет в hex-формате?',
      text_en: 'How do you write white in hex format?',
      options_ru: ['#000000', '#ffffff', 'rgb(0,0,0)', 'white-hex'],
      options_en: ['#000000', '#ffffff', 'rgb(0,0,0)', 'white-hex'],
      correctIndex: 1,
      explanation_ru: '#ffffff — белый (все каналы на максимуме). #000000 — чёрный.',
      explanation_en: '#ffffff is white (all channels at maximum). #000000 is black.',
    },
    {
      id: 'q3',
      text_ru: 'Какое свойство делает углы блока скруглёнными?',
      text_en: 'Which property makes the corners of a block rounded?',
      options_ru: ['corner-radius', 'border-round', 'border-radius', 'radius'],
      options_en: ['corner-radius', 'border-round', 'border-radius', 'radius'],
      correctIndex: 2,
      explanation_ru: 'border-radius — стандартное CSS-свойство для скругления углов.',
      explanation_en: 'border-radius is the standard CSS property for rounding corners.',
    },
    {
      id: 'q4',
      text_ru: 'Какое значение font-weight соответствует жирному тексту?',
      text_en: 'Which font-weight value corresponds to bold text?',
      options_ru: ['100', '400', '700', '1000'],
      options_en: ['100', '400', '700', '1000'],
      correctIndex: 2,
      explanation_ru: '700 (или ключевое слово bold) — жирный. 400 (normal) — обычный. 100 — очень тонкий.',
      explanation_en: '700 (or keyword bold) is bold. 400 (normal) is regular. 100 is very thin.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает border-radius: 50% с квадратным элементом?',
      text_en: 'What does border-radius: 50% do to a square element?',
      options_ru: ['Делает его невидимым', 'Добавляет рамку', 'Превращает в круг', 'Убирает фон'],
      options_en: ['Makes it invisible', 'Adds a border', 'Turns it into a circle', 'Removes the background'],
      correctIndex: 2,
      explanation_ru: 'border-radius: 50% скругляет все углы до половины размера — квадрат становится кругом.',
      explanation_en: 'border-radius: 50% rounds all corners to half the size — a square becomes a circle.',
    },
  ],
}
