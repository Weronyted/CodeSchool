import type { Lesson } from '@/types/lesson'

export const cssBoxModel: Lesson = {
  slug: 'css-box-model',
  category: 'CSS',
  readTime: 8,
  icon: '📦',

  title_ru: 'Блочная модель CSS',
  title_en: 'CSS Box Model',

  description_ru: 'Margin, padding, border — как устроено пространство вокруг каждого элемента.',
  description_en: 'Margin, padding, border — how space is structured around every element.',

  sections: [
    { id: 'box-model',      title_ru: 'Что такое блочная модель', title_en: 'What is the box model' },
    { id: 'margin-padding', title_ru: 'Margin и Padding',         title_en: 'Margin and Padding' },
    { id: 'border',         title_ru: 'Border',                   title_en: 'Border' },
    { id: 'box-sizing',     title_ru: 'box-sizing',               title_en: 'box-sizing' },
    { id: 'key-terms',      title_ru: 'Важные слова',             title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Блочная модель CSS: каждый элемент — коробка',
      title_en: 'CSS box model: every element is a box',
      body_ru: 'Понимание блочной модели — ключ к правильной вёрстке. Она объясняет, как браузер вычисляет размер и положение каждого элемента.',
      body_en: 'Understanding the box model is the key to proper layout. It explains how the browser calculates the size and position of every element.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Элемент как посылка',
      title_en: 'An element is like a parcel',
      body_ru: 'Представь посылку. Внутри — товар (content). Пенопласт вокруг товара — padding. Картонная коробка — border. Расстояние до других посылок на полке — margin. Четыре слоя, каждый со своей ролью.',
      body_en: 'Imagine a parcel. Inside is the item (content). The foam around the item is padding. The cardboard box is the border. The gap between parcels on a shelf is margin. Four layers, each with its own role.',
      visual: {
        kind: 'emoji',
        emojis: ['📦', '🛡️', '🫧', '↔️'],
      },
      bullets: [
        { text_ru: '📦 content — сам элемент (текст, картинка)', text_en: '📦 content — the element itself (text, image)' },
        { text_ru: '🫧 padding — внутренний отступ (от контента до рамки)', text_en: '🫧 padding — inner spacing (from content to border)' },
        { text_ru: '🛡️ border — рамка вокруг элемента', text_en: '🛡️ border — the frame around the element' },
        { text_ru: '↔️ margin — внешний отступ (расстояние до соседей)', text_en: '↔️ margin — outer spacing (gap to neighbours)' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Четыре слоя блочной модели',
      title_en: 'Four layers of the box model',
      body_ru: 'Снаружи внутрь: margin (пространство до соседей) → border (рамка) → padding (подушка до контента) → content (сам текст/картинка). Каждый слой независим и может быть настроен отдельно.',
      body_en: 'From outside to inside: margin (space to neighbours) → border (frame) → padding (cushion to content) → content (the text/image itself). Each layer is independent and can be configured separately.',
      visual: {
        kind: 'svg',
        svg: `<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect x="4"  y="4"  width="312" height="172" rx="12" fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="2" stroke-dasharray="6,4"/>
  <text x="20" y="24" fill="rgba(255,255,255,0.5)" font-size="13" font-family="sans-serif">margin</text>
  <rect x="36" y="34" width="248" height="112" rx="10" fill="none" stroke="#3B5BDB" stroke-width="3"/>
  <text x="52" y="54" fill="#74c0fc" font-size="13" font-family="sans-serif">border</text>
  <rect x="56" y="60" width="208" height="72" rx="8" fill="#7950F2" fill-opacity="0.15"/>
  <text x="72" y="80" fill="#b197fc" font-size="13" font-family="sans-serif">padding</text>
  <rect x="88" y="86" width="144" height="36" rx="6" fill="#2f9e44" fill-opacity="0.7"/>
  <text x="160" y="109" text-anchor="middle" fill="white" font-size="14" font-family="sans-serif" font-weight="bold">content</text>
</svg>`,
        caption_ru: 'margin → border → padding → content',
        caption_en: 'margin → border → padding → content',
      },
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Margin и Padding: синтаксис',
      title_en: 'Margin and Padding: syntax',
      body_ru: 'Оба свойства принимают от 1 до 4 значений. Порядок: верх, право, низ, лево — по часовой стрелке.',
      body_en: 'Both properties accept 1 to 4 values. The order is: top, right, bottom, left — clockwise.',
      code: `/* 1 значение — все стороны */
.box { margin: 16px; }

/* 2 значения — верх/низ, лево/право */
.box { padding: 16px 32px; }

/* 4 значения — верх право низ лево */
.box { margin: 8px 16px 24px 32px; }

/* Одна сторона */
.title { margin-bottom: 16px; }
.btn   { padding-left: 24px; }

/* Центрирование блока */
.container { margin: 0 auto; max-width: 960px; }`,
      codeLang: 'css',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Border: рамка',
      title_en: 'Border: the frame',
      body_ru: 'Свойство border задаётся тремя параметрами: толщина стиль цвет. Стили: solid (сплошная), dashed (штрихи), dotted (точки), none (убрать). border-radius скругляет углы — 50% превращает квадрат в круг.',
      body_en: 'The border property is set with three values: width style colour. Styles: solid, dashed, dotted, none (remove). border-radius rounds corners — 50% turns a square into a circle.',
      bullets: [
        { text_ru: '📏 border: 2px solid #ccc — толщина, стиль, цвет', text_en: '📏 border: 2px solid #ccc — width, style, colour' },
        { text_ru: '〰️ dashed — штриховая, dotted — точечная', text_en: '〰️ dashed — dashed line, dotted — dotted' },
        { text_ru: '🔵 border-radius: 8px — скруглённые углы', text_en: '🔵 border-radius: 8px — rounded corners' },
        { text_ru: '⭕ border-radius: 50% — круг из квадрата', text_en: '⭕ border-radius: 50% — circle from a square' },
      ],
    },
    {
      id: 's6',
      type: 'compare',
      title_ru: 'box-sizing: зачем нужен?',
      title_en: 'box-sizing: why do we need it?',
      body_ru: 'По умолчанию width задаёт только ширину контента. С border-box padding и border входят в объявленный размер.',
      body_en: 'By default width only sets the content width. With border-box, padding and border are included in the declared size.',
      compareLeft: {
        label_ru: '😵 content-box (по умолч.)',
        label_en: '😵 content-box (default)',
        items_ru: ['width: 200px', '+ padding: 20px', '+ border: 2px', '= реально 244px!'],
        items_en: ['width: 200px', '+ padding: 20px', '+ border: 2px', '= actually 244px!'],
        color: 'red',
      },
      compareRight: {
        label_ru: '✅ border-box',
        label_en: '✅ border-box',
        items_ru: ['width: 200px', 'padding входит внутрь', 'border входит внутрь', '= ровно 200px'],
        items_en: ['width: 200px', 'padding fits inside', 'border fits inside', '= exactly 200px'],
        color: 'green',
      },
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'box-sizing: border-box — лайфхак',
      title_en: 'box-sizing: border-box — the trick',
      body_ru: 'Добавь эти три строки в начало любого CSS-файла. Они делают размеры предсказуемыми и избавляют от неожиданных переполнений.',
      body_en: 'Add these three lines at the top of any CSS file. They make sizes predictable and eliminate unexpected overflows.',
      code: `/* Рекомендуемый сброс для любого проекта */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Теперь width — это реальная ширина */
.card {
  width: 300px;
  padding: 24px;   /* входит в 300px */
  border: 2px solid #eee; /* тоже входит */
}`,
      codeLang: 'css',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Трюк margin: 0 auto центрирует блочный элемент по горизонтали — один из самых популярных приёмов CSS за все 30 лет его существования. border-radius: 50% превращает любой квадратный блок в идеальный круг — так делают аватары.',
      body_en: 'The trick margin: 0 auto centres a block element horizontally — one of the most popular CSS tricks over its 30-year history. border-radius: 50% turns any square block into a perfect circle — that is how avatars are made.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Поиграй с отступами!',
      title_en: 'Play with spacing!',
      body_ru: 'Настрой margin, padding и border — посмотри как меняется блочная модель в реальном времени.',
      body_en: 'Adjust margin, padding and border — watch the box model change in real time.',
    },
  ],

  content: {
    intro_ru: `Каждый HTML-элемент в браузере — прямоугольная коробка. Внутри четыре
концентрических слоя: content, padding, border, margin. Это и есть блочная модель.
Без её понимания вёрстка превращается в угадывание. С ней — всё становится
предсказуемым и управляемым.`,
    intro_en: `Every HTML element in the browser is a rectangular box. Inside are four
concentric layers: content, padding, border, margin. That is the box model.
Without understanding it, layout becomes guesswork. With it — everything becomes
predictable and controllable.`,

    blocks: [
      {
        sectionId: 'box-model',
        heading_ru: 'Что такое блочная модель',
        heading_en: 'What is the box model',
        text_ru: `Четыре слоя снаружи внутрь:

1. Margin — внешний отступ. Прозрачное пространство снаружи рамки.
   Отделяет элемент от соседей. Фон сюда не распространяется.

2. Border — рамка. Видимая граница элемента. Может быть
   сплошной, штриховой, точечной.

3. Padding — внутренний отступ. Пространство между рамкой и
   контентом. Фон элемента распространяется на padding.

4. Content — само содержимое: текст, картинка, дочерние элементы.
   Размер задаётся через width и height.`,
        text_en: `Four layers from outside to inside:

1. Margin — outer spacing. Transparent space outside the border.
   Separates the element from neighbours. Background does not extend here.

2. Border — the frame. The visible boundary of the element. Can be
   solid, dashed, dotted.

3. Padding — inner spacing. Space between the border and content.
   The element's background extends into the padding.

4. Content — the actual content: text, image, child elements.
   Size is set via width and height.`,
        code: `.box {
  /* Content */
  width: 300px;
  height: 150px;

  /* Padding */
  padding: 24px;

  /* Border */
  border: 2px solid #3B5BDB;

  /* Margin */
  margin: 32px auto;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'margin-padding',
        heading_ru: 'Margin и Padding',
        heading_en: 'Margin and Padding',
        text_ru: `Оба свойства принимают от 1 до 4 значений по часовой стрелке:

• margin: 16px — все четыре стороны по 16px.
• margin: 16px 32px — 16px сверху/снизу, 32px слева/справа.
• margin: 8px 16px 24px — верх 8px, бока 16px, низ 24px.
• margin: 8px 16px 24px 32px — верх, право, низ, лево.

Одна сторона: margin-top, margin-right, margin-bottom, margin-left.
Трюк: margin: 0 auto центрирует блочный элемент по горизонтали
(работает при заданной ширине и display: block).`,
        text_en: `Both properties take 1 to 4 values clockwise:

• margin: 16px — all four sides 16px.
• margin: 16px 32px — 16px top/bottom, 32px left/right.
• margin: 8px 16px 24px — top 8px, sides 16px, bottom 24px.
• margin: 8px 16px 24px 32px — top, right, bottom, left.

One side: margin-top, margin-right, margin-bottom, margin-left.
Trick: margin: 0 auto centres a block element horizontally
(works with a set width and display: block).`,
        code: `.container {
  max-width: 960px;
  margin: 0 auto;        /* центрирование */
  padding: 0 24px;       /* боковые поля */
}

.section {
  padding: 64px 0;       /* вертикальные отступы */
  margin-bottom: 48px;
}

.btn {
  padding: 12px 24px;    /* кнопка */
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'border',
        heading_ru: 'Border',
        heading_en: 'Border',
        text_ru: `Свойство border: толщина стиль цвет.

Стили: solid (сплошная), dashed (штриховая), dotted (точечная),
double (двойная), none (убрать рамку).

border-radius: скругляет углы.
• 4px — чуть-чуть
• 8–16px — заметное скругление
• 50% — превращает квадрат в круг
• 999px — максимальное скругление (pill-форма)

box-shadow добавляет тень: x y blur color.`,
        text_en: `The border property: width style colour.

Styles: solid, dashed, dotted, double, none (remove the border).

border-radius: rounds corners.
• 4px — slight
• 8–16px — noticeable rounding
• 50% — turns a square into a circle
• 999px — maximum rounding (pill shape)

box-shadow adds a shadow: x y blur colour.`,
        code: `/* Обычная рамка */
.input {
  border: 1px solid #ccc;
  border-radius: 6px;
}

/* Карточка */
.card {
  border: none;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(0,0,0,0.08);
}

/* Аватар */
.avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 3px solid #3B5BDB;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'box-sizing',
        heading_ru: 'box-sizing',
        heading_en: 'box-sizing',
        text_ru: `По умолчанию (content-box) width и height задают размер только контента.
padding и border добавляются поверх — реальная ширина оказывается больше.

border-box исправляет это: padding и border включаются в объявленный
размер. Элемент с width: 300px и padding: 20px будет занимать ровно 300px.

Рекомендуется добавлять * { box-sizing: border-box; } в начало
каждого CSS-проекта — это стандартная практика.`,
        text_en: `By default (content-box), width and height set only the content size.
padding and border are added on top — the real width ends up larger.

border-box fixes this: padding and border are included in the declared
size. An element with width: 300px and padding: 20px will occupy exactly 300px.

It is recommended to add * { box-sizing: border-box; } at the top of
every CSS project — this is standard practice.`,
        code: `/* Стандартный сброс — добавляй всегда */
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Теперь это честные размеры */
.sidebar {
  width: 280px;
  padding: 24px;   /* входит в 280px */
}`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: блочная модель',
    title_en: 'Try it yourself: box model',
    instructions_ru: `Настрой блочную модель для карточки:
— Добавь padding: 24px внутри карточки
— Добавь border: 2px solid #3B5BDB
— Добавь border-radius: 16px
— Добавь box-shadow для тени
— Отцентруй через margin: 0 auto`,
    instructions_en: `Set up the box model for the card:
— Add padding: 24px inside the card
— Add border: 2px solid #3B5BDB
— Add border-radius: 16px
— Add box-shadow for a shadow
— Centre it with margin: 0 auto`,
    activeTabs: ['css'],
    starterCode: {
      css: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  background-color: #f0f2f5;
  padding: 40px;
  font-family: Arial, sans-serif;
}

.card {
  background-color: white;
  max-width: 360px;
  padding: 32px;
  border: 2px solid #3B5BDB;
  border-radius: 16px;
  margin: 0 auto;
  box-shadow: 0 8px 32px rgba(59,91,219,0.15);
}

.card h2 {
  color: #3B5BDB;
  margin-bottom: 12px;
}

.card p {
  color: #666;
  line-height: 1.6;
}`,
    },
    hints_ru: [
      'margin: 0 auto работает только если задана ширина (width или max-width).',
      'box-shadow: 0 8px 24px rgba(0,0,0,0.1) — горизонт 0, вертикаль 8px, размытие 24px, полупрозрачный чёрный.',
    ],
    hints_en: [
      'margin: 0 auto only works when width (or max-width) is set.',
      'box-shadow: 0 8px 24px rgba(0,0,0,0.1) — horizontal 0, vertical 8px, blur 24px, semi-transparent black.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Блочная модель', term_en: 'Box model',
      definition_ru: 'Модель, в которой каждый HTML-элемент — прямоугольник с 4 слоями: content, padding, border, margin.',
      definition_en: 'The model in which every HTML element is a rectangle with 4 layers: content, padding, border, margin.',
      example_ru: '.box { padding: 20px; border: 1px solid; margin: 16px; }',
      example_en: '.box { padding: 20px; border: 1px solid; margin: 16px; }',
    },
    {
      term_ru: 'margin', term_en: 'margin',
      definition_ru: 'Внешний отступ. Прозрачное пространство снаружи рамки, отделяющее элемент от соседей.',
      definition_en: 'Outer spacing. Transparent space outside the border, separating the element from neighbours.',
      example_ru: 'margin: 0 auto — центрирование по горизонтали',
      example_en: 'margin: 0 auto — horizontal centring',
    },
    {
      term_ru: 'padding', term_en: 'padding',
      definition_ru: 'Внутренний отступ. Пространство между рамкой и контентом. Фон элемента распространяется на padding.',
      definition_en: 'Inner spacing. Space between the border and content. The background extends into padding.',
      example_ru: 'padding: 16px 24px — 16px сверху/снизу, 24px по бокам',
      example_en: 'padding: 16px 24px — 16px top/bottom, 24px sides',
    },
    {
      term_ru: 'border-radius', term_en: 'border-radius',
      definition_ru: 'Скругление углов. 50% превращает квадратный элемент в круг.',
      definition_en: 'Corner rounding. 50% turns a square element into a circle.',
      example_ru: '.avatar { border-radius: 50%; }',
      example_en: '.avatar { border-radius: 50%; }',
    },
    {
      term_ru: 'box-sizing: border-box', term_en: 'box-sizing: border-box',
      definition_ru: 'Делает width честным: padding и border входят в объявленный размер, а не добавляются к нему.',
      definition_en: 'Makes width honest: padding and border fit inside the declared size rather than being added to it.',
      example_ru: '* { box-sizing: border-box; }',
      example_en: '* { box-sizing: border-box; }',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'margin: 0 auto — один из старейших приёмов CSS. Он работает с 1998 года и до сих пор остаётся самым простым способом отцентровать блок по горизонтали.',
      text_en: 'margin: 0 auto is one of the oldest CSS tricks. It has worked since 1998 and remains the simplest way to centre a block horizontally.',
    },
    {
      text_ru: 'Браузерные DevTools (F12) позволяют видеть блочную модель любого элемента в реальном времени — там даже нарисована диаграмма с margin/padding/border/content. Очень полезно при отладке!',
      text_en: 'Browser DevTools (F12) let you see the box model of any element in real time — there is even a diagram showing margin/padding/border/content. Very useful when debugging!',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что такое padding?',
      text_en: 'What is padding?',
      options_ru: ['Внешний отступ между элементами', 'Рамка вокруг элемента', 'Внутренний отступ между рамкой и содержимым', 'Цвет фона'],
      options_en: ['Outer spacing between elements', 'Frame around element', 'Inner spacing between border and content', 'Background colour'],
      correctIndex: 2,
      explanation_ru: 'padding — внутренний отступ. margin — внешний. Фон элемента распространяется на padding, но не на margin.',
      explanation_en: 'padding is inner spacing. margin is outer. The background extends into padding but not into margin.',
    },
    {
      id: 'q2',
      text_ru: 'Что означает запись margin: 10px 20px?',
      text_en: 'What does margin: 10px 20px mean?',
      options_ru: ['Все стороны 10px', 'Верх/низ 10px, лево/право 20px', 'Только верх 10px', 'Лево 10px, право 20px'],
      options_en: ['All sides 10px', 'Top/bottom 10px, left/right 20px', 'Top only 10px', 'Left 10px, right 20px'],
      correctIndex: 1,
      explanation_ru: '2 значения: первое — верх/низ, второе — лево/право. 4 значения: верх право низ лево (по часовой).',
      explanation_en: '2 values: first is top/bottom, second is left/right. 4 values: top right bottom left (clockwise).',
    },
    {
      id: 'q3',
      text_ru: 'Что делает border-radius: 50%?',
      text_en: 'What does border-radius: 50% do?',
      options_ru: ['Убирает рамку', 'Делает элемент круглым', 'Устанавливает радиус 50px', 'Скрывает overflow'],
      options_en: ['Removes the border', 'Makes the element circular', 'Sets radius to 50px', 'Hides overflow'],
      correctIndex: 1,
      explanation_ru: '50% скругляет все углы до половины размера элемента. У квадрата это даёт идеальный круг.',
      explanation_en: '50% rounds all corners to half the element\'s size. For a square this gives a perfect circle.',
    },
    {
      id: 'q4',
      text_ru: 'Зачем используют * { box-sizing: border-box }?',
      text_en: 'Why use * { box-sizing: border-box }?',
      options_ru: ['Чтобы скрыть рамки', 'Чтобы padding и border входили в width', 'Для тёмной темы', 'Для анимации'],
      options_en: ['To hide borders', 'So padding and border fit inside width', 'For dark mode', 'For animation'],
      correctIndex: 1,
      explanation_ru: 'border-box делает width "честным" — заданная ширина остаётся реальной шириной элемента.',
      explanation_en: 'border-box makes width "honest" — the declared width is the actual width of the element.',
    },
    {
      id: 'q5',
      text_ru: 'Как отцентровать блочный элемент по горизонтали?',
      text_en: 'How do you centre a block element horizontally?',
      options_ru: ['text-align: center', 'position: center', 'margin: 0 auto', 'align: center'],
      options_en: ['text-align: center', 'position: center', 'margin: 0 auto', 'align: center'],
      correctIndex: 2,
      explanation_ru: 'margin: 0 auto — браузер делает левый и правый margin равными, центрируя блок. Нужна заданная ширина.',
      explanation_en: 'margin: 0 auto — the browser makes left and right margins equal, centring the block. A set width is required.',
    },
  ],
}
