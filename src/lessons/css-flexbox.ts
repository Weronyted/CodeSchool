import type { Lesson } from '@/types/lesson'

export const cssFlexbox: Lesson = {
  slug: 'css-flexbox',
  category: 'CSS',
  readTime: 10,
  icon: '↔️',

  title_ru: 'Flexbox',
  title_en: 'Flexbox',

  description_ru: 'Выравнивание и расположение элементов — мощный инструмент современной вёрстки.',
  description_en: 'Aligning and placing elements — the powerful tool of modern layout.',

  sections: [
    { id: 'what-is-flex', title_ru: 'Что такое Flexbox',    title_en: 'What is Flexbox' },
    { id: 'container',    title_ru: 'Flex-контейнер',       title_en: 'Flex container' },
    { id: 'alignment',    title_ru: 'Выравнивание',         title_en: 'Alignment' },
    { id: 'items',        title_ru: 'Flex-элементы',        title_en: 'Flex items' },
    { id: 'key-terms',    title_ru: 'Важные слова',         title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Flexbox: расставляем элементы как профи',
      title_en: 'Flexbox: placing elements like a pro',
      body_ru: 'До Flexbox выравнивание было настоящим кошмаром. Сейчас одна строка display: flex решает задачи, которые раньше требовали десятки строк хаков.',
      body_en: 'Before Flexbox, alignment was a real nightmare. Now a single line display: flex solves problems that once required dozens of hack lines.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Flexbox как умный органайзер',
      title_en: 'Flexbox is like a smart organiser',
      body_ru: 'Представь органайзер на столе. Ты кладёшь в него вещи (flex-элементы), и он сам решает, как их разложить: в ряд, с промежутками, по центру. Родительский контейнер управляет — дочерние элементы подчиняются.',
      body_en: 'Imagine a desk organiser. You put things in it (flex items) and it decides how to arrange them: in a row, with spacing, centred. The parent container controls — the child elements obey.',
      visual: {
        kind: 'svg',
        svg: `<svg viewBox="0 0 340 82" xmlns="http://www.w3.org/2000/svg" style="max-width:100%;height:auto">
  <rect x="4"  y="4"  width="332" height="74" rx="10" fill="none" stroke="#3B5BDB" stroke-width="2" stroke-dasharray="5,3"/>
  <text x="14" y="20" fill="#74c0fc" font-size="11" font-family="monospace">display: flex</text>
  <rect x="16" y="26" width="88" height="44" rx="8" fill="#3B5BDB"/>
  <text x="60"  y="52" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">item 1</text>
  <rect x="120" y="26" width="88" height="44" rx="8" fill="#7950F2"/>
  <text x="164" y="52" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">item 2</text>
  <rect x="224" y="26" width="88" height="44" rx="8" fill="#2f9e44"/>
  <text x="268" y="52" text-anchor="middle" fill="white" font-size="13" font-family="sans-serif">item 3</text>
</svg>`,
        caption_ru: 'Дочерние элементы выстраиваются в ряд',
        caption_en: 'Child elements line up in a row',
      },
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Включаем Flexbox',
      title_en: 'Enabling Flexbox',
      body_ru: 'display: flex применяется к родителю. Все прямые дети становятся flex-элементами и выстраиваются в ряд. flex-direction меняет направление: row (по умолчанию) или column. gap задаёт расстояние между элементами.',
      body_en: 'display: flex is applied to the parent. All direct children become flex items and line up in a row. flex-direction changes direction: row (default) or column. gap sets the spacing between items.',
      bullets: [
        { text_ru: '⚡ display: flex — на родителя, не на дочерние!', text_en: '⚡ display: flex — on the parent, not the children!' },
        { text_ru: '→ flex-direction: row — в ряд (по умолчанию)', text_en: '→ flex-direction: row — in a row (default)' },
        { text_ru: '↓ flex-direction: column — в колонку', text_en: '↓ flex-direction: column — in a column' },
        { text_ru: '↔️ gap: 16px — расстояние между элементами', text_en: '↔️ gap: 16px — space between items' },
      ],
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'justify-content и align-items',
      title_en: 'justify-content and align-items',
      body_ru: 'justify-content выравнивает по главной оси (горизонталь при row). align-items — по поперечной (вертикаль при row). Запомни: justify — горизонталь, align — вертикаль.',
      body_en: 'justify-content aligns along the main axis (horizontal for row). align-items — along the cross axis (vertical for row). Remember: justify — horizontal, align — vertical.',
      bullets: [
        { text_ru: '◀▶ justify-content: flex-start | center | flex-end', text_en: '◀▶ justify-content: flex-start | center | flex-end' },
        { text_ru: '⇔ justify-content: space-between | space-around', text_en: '⇔ justify-content: space-between | space-around' },
        { text_ru: '▲▼ align-items: flex-start | center | flex-end', text_en: '▲▼ align-items: flex-start | center | flex-end' },
        { text_ru: '↕️ align-items: stretch — растянуть (по умолчанию)', text_en: '↕️ align-items: stretch — stretch (default)' },
      ],
    },
    {
      id: 's5',
      type: 'code-anim',
      title_ru: 'Строим Flexbox-навигацию',
      title_en: 'Building a Flexbox navigation',
      body_ru: 'Классический паттерн: лого слева, ссылки справа. Всё через Flexbox.',
      body_en: 'Classic pattern: logo on the left, links on the right. All through Flexbox.',
      animMode: 'preview',
      animSteps: [
        {
          code: '.nav {\n\n}',
          comment_ru: '1. Пустой контейнер — элементы стоят вертикально',
          comment_en: '1. Empty container — items stack vertically',
        },
        {
          code: '.nav {\n  display: flex;\n}',
          comment_ru: '2. display: flex — лого и ссылки в ряд',
          comment_en: '2. display: flex — logo and links in a row',
        },
        {
          code: '.nav {\n  display: flex;\n  justify-content: space-between;\n}',
          comment_ru: '3. space-between — лого слева, ссылки справа',
          comment_en: '3. space-between — logo left, links right',
        },
        {
          code: '.nav {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 16px 32px;\n}',
          comment_ru: '4. align-items: center — всё по вертикали по центру',
          comment_en: '4. align-items: center — everything centred vertically',
          preview: '<nav style="display:flex;justify-content:space-between;align-items:center;padding:12px 24px;background:#1e1e2e;border-radius:8px"><span style="color:white;font-weight:bold;font-family:sans-serif">🚀 Logo</span><div style="display:flex;gap:16px"><a style="color:#74c0fc;font-family:sans-serif;text-decoration:none">Home</a><a style="color:#74c0fc;font-family:sans-serif;text-decoration:none">About</a><a style="color:#74c0fc;font-family:sans-serif;text-decoration:none">Contact</a></div></nav>',
        },
      ],
    },
    {
      id: 's6',
      type: 'compare',
      title_ru: 'Ключевые значения justify-content',
      title_en: 'Key justify-content values',
      body_ru: 'Самые используемые значения для управления горизонтальным распределением.',
      body_en: 'The most used values for controlling horizontal distribution.',
      compareLeft: {
        label_ru: '⬅ flex-start / ➡ flex-end',
        label_en: '⬅ flex-start / ➡ flex-end',
        items_ru: ['flex-start: всё к началу', 'flex-end: всё к концу', 'center: по центру'],
        items_en: ['flex-start: all to start', 'flex-end: all to end', 'center: centred'],
        color: 'blue',
      },
      compareRight: {
        label_ru: '↔️ space-between / space-around',
        label_en: '↔️ space-between / space-around',
        items_ru: ['space-between: по краям', 'space-around: равные промежутки', 'space-evenly: равные включая края'],
        items_en: ['space-between: at edges', 'space-around: equal gaps', 'space-evenly: equal including edges'],
        color: 'green',
      },
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Flexbox-паттерны',
      title_en: 'Flexbox patterns',
      body_ru: 'Три классических паттерна, которые встречаются на каждом сайте.',
      body_en: 'Three classic patterns found on every website.',
      code: `/* 1. Карточки в ряд с переносом */
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
}
.card { flex: 1; min-width: 240px; }

/* 2. Идеальное центрирование */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* 3. Навигация */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;
}`,
      codeLang: 'css',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'До Flexbox выровнять элемент по центру вертикально было почти невозможно без хаков. Фраза "How to vertically center a div" была самым популярным вопросом на Stack Overflow годами. Сейчас — display: flex; align-items: center; justify-content: center — и всё.',
      body_en: 'Before Flexbox, vertically centring an element was nearly impossible without hacks. "How to vertically center a div" was one of the most popular questions on Stack Overflow for years. Now — display: flex; align-items: center; justify-content: center — done.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Разложи карточки с Flexbox!',
      title_en: 'Lay out cards with Flexbox!',
      body_ru: 'Создай галерею карточек в ряд с правильными отступами и выравниванием.',
      body_en: 'Build a card gallery in a row with proper spacing and alignment.',
    },
  ],

  content: {
    intro_ru: `Flexbox (Flexible Box Layout) — мощный инструмент CSS для расположения
элементов в одном направлении: в ряд или в колонку. До Flexbox вёрстка строилась на
float и position — громоздких и непредсказуемых инструментах. Flexbox сделал
расположение элементов интуитивным и предсказуемым.`,
    intro_en: `Flexbox (Flexible Box Layout) is a powerful CSS tool for placing elements
in one direction: in a row or a column. Before Flexbox, layout was built on float and
position — bulky and unpredictable tools. Flexbox made element placement intuitive
and predictable.`,

    blocks: [
      {
        sectionId: 'what-is-flex',
        heading_ru: 'Что такое Flexbox',
        heading_en: 'What is Flexbox',
        text_ru: `Flexbox вводит два понятия:
• Flex-контейнер — элемент с display: flex.
  Он управляет расположением своих прямых потомков.
• Flex-элементы — прямые дочерние элементы контейнера.
  Они автоматически выстраиваются в ряд.

Важно: display: flex применяется к родителю, а не к детям.
Именно родитель "включает" Flexbox для своих прямых потомков.`,
        text_en: `Flexbox introduces two concepts:
• Flex container — an element with display: flex.
  It controls the placement of its direct children.
• Flex items — the direct children of the container.
  They automatically arrange in a row.

Important: display: flex is applied to the parent, not the children.
It is the parent that "enables" Flexbox for its direct descendants.`,
        code: `.container {
  display: flex; /* Включаем Flexbox */
  /* Теперь все прямые дети — flex-элементы */
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'container',
        heading_ru: 'Flex-контейнер',
        heading_en: 'Flex container',
        text_ru: `Основные свойства контейнера:

• flex-direction: row | row-reverse | column | column-reverse
  Направление главной оси. row (по умолчанию) — горизонталь.

• flex-wrap: nowrap | wrap | wrap-reverse
  Перенос на следующую строку при нехватке места.
  nowrap (по умолчанию) — элементы сжимаются.
  wrap — перенос на следующую строку.

• gap: 16px — расстояние между элементами.
  Заменяет margin между элементами (удобнее).

• flex-flow: row wrap — сокращение для flex-direction + flex-wrap.`,
        text_en: `Main container properties:

• flex-direction: row | row-reverse | column | column-reverse
  Direction of the main axis. row (default) — horizontal.

• flex-wrap: nowrap | wrap | wrap-reverse
  Wrapping to the next line when there is not enough space.
  nowrap (default) — items shrink.
  wrap — items wrap to the next line.

• gap: 16px — space between items.
  Replaces margins between items (more convenient).

• flex-flow: row wrap — shorthand for flex-direction + flex-wrap.`,
        code: `.gallery {
  display: flex;
  flex-direction: row;    /* горизонталь */
  flex-wrap: wrap;        /* перенос */
  gap: 20px;              /* между карточками */
}

/* Или короче */
.gallery {
  display: flex;
  flex-flow: row wrap;
  gap: 20px;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'alignment',
        heading_ru: 'Выравнивание',
        heading_en: 'Alignment',
        text_ru: `Два главных свойства выравнивания:

justify-content — по главной оси (горизонталь при row):
• flex-start — к началу (по умолчанию)
• flex-end — к концу
• center — по центру
• space-between — первый и последний у краёв, остальные равномерно
• space-around — равные промежутки (включая края — вдвое меньше)
• space-evenly — все промежутки одинаковые

align-items — по поперечной оси (вертикаль при row):
• stretch — растянуть на всю высоту (по умолчанию)
• flex-start — к верху
• center — по центру
• flex-end — к низу`,
        text_en: `Two main alignment properties:

justify-content — along the main axis (horizontal for row):
• flex-start — to the start (default)
• flex-end — to the end
• center — centred
• space-between — first and last at edges, rest evenly
• space-around — equal gaps (edges are half)
• space-evenly — all gaps equal

align-items — along the cross axis (vertical for row):
• stretch — fill full height (default)
• flex-start — to the top
• center — centred
• flex-end — to the bottom`,
        code: `/* Идеальное центрирование */
.centered {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

/* Навигация */
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'items',
        heading_ru: 'Flex-элементы',
        heading_en: 'Flex items',
        text_ru: `Свойства для отдельных flex-элементов:

• flex: 1 — сокращение. Элемент растягивается, занимая равную долю.
  Все элементы с flex: 1 будут одинаковой ширины.

• flex-grow: насколько элемент растёт относительно соседей.
• flex-shrink: насколько сжимается при нехватке места.
• flex-basis: начальный размер (auto | 200px | 30%).

• align-self: выравнивание одного конкретного элемента
  (переопределяет align-items контейнера).

• order: изменяет порядок отображения без изменения HTML.`,
        text_en: `Properties for individual flex items:

• flex: 1 — shorthand. The item expands, taking an equal share.
  All items with flex: 1 will have equal width.

• flex-grow: how much the item grows relative to neighbours.
• flex-shrink: how much it shrinks when space is tight.
• flex-basis: initial size (auto | 200px | 30%).

• align-self: aligns one specific item
  (overrides the container's align-items).

• order: changes the display order without changing the HTML.`,
        code: `/* Три равные колонки */
.columns {
  display: flex;
  gap: 24px;
}
.column { flex: 1; }

/* Или разные размеры */
.sidebar { flex: 0 0 280px; }  /* фиксированная */
.main    { flex: 1; }           /* занимает остаток */

/* Особое выравнивание одного элемента */
.badge {
  align-self: flex-end; /* к низу контейнера */
}`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: карточки с Flexbox',
    title_en: 'Try it yourself: cards with Flexbox',
    instructions_ru: `Расположи карточки с Flexbox:
— .gallery: display: flex, gap: 20px, flex-wrap: wrap
— .card: flex: 1, min-width: 200px
— Отцентруй содержимое карточки по горизонтали
Нажми «Запустить»!`,
    instructions_en: `Arrange cards with Flexbox:
— .gallery: display: flex, gap: 20px, flex-wrap: wrap
— .card: flex: 1, min-width: 200px
— Centre the card content horizontally
Press "Run"!`,
    activeTabs: ['css'],
    starterCode: {
      css: `body {
  font-family: Arial, sans-serif;
  background: #f0f2f5;
  padding: 32px;
}

.gallery {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.card {
  flex: 1;
  min-width: 200px;
  background: white;
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.card-icon { font-size: 40px; margin-bottom: 12px; }

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
}`,
    },
    hints_ru: [
      'display: flex применяется к .gallery (родитель), а не к .card.',
      'flex-wrap: wrap позволяет карточкам переноситься на новую строку при нехватке места.',
    ],
    hints_en: [
      'display: flex is applied to .gallery (parent), not to .card.',
      'flex-wrap: wrap lets cards wrap to a new line when there is not enough space.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Flexbox', term_en: 'Flexbox',
      definition_ru: 'Режим раскладки CSS (display: flex) для гибкого расположения элементов в ряд или колонку.',
      definition_en: 'A CSS layout mode (display: flex) for flexibly placing elements in a row or column.',
      example_ru: '.nav { display: flex; justify-content: space-between; }',
      example_en: '.nav { display: flex; justify-content: space-between; }',
    },
    {
      term_ru: 'justify-content', term_en: 'justify-content',
      definition_ru: 'Выравнивает flex-элементы по главной оси (горизонталь при row).',
      definition_en: 'Aligns flex items along the main axis (horizontal for row).',
      example_ru: 'justify-content: center | space-between | flex-end',
      example_en: 'justify-content: center | space-between | flex-end',
    },
    {
      term_ru: 'align-items', term_en: 'align-items',
      definition_ru: 'Выравнивает flex-элементы по поперечной оси (вертикаль при row).',
      definition_en: 'Aligns flex items along the cross axis (vertical for row).',
      example_ru: 'align-items: center | flex-start | stretch',
      example_en: 'align-items: center | flex-start | stretch',
    },
    {
      term_ru: 'flex: 1', term_en: 'flex: 1',
      definition_ru: 'Элемент занимает равную долю свободного пространства контейнера.',
      definition_en: 'The item takes an equal share of the container\'s free space.',
      example_ru: '.column { flex: 1; } — равные колонки',
      example_en: '.column { flex: 1; } — equal columns',
    },
    {
      term_ru: 'gap', term_en: 'gap',
      definition_ru: 'Расстояние между flex-элементами. Заменяет margin между ними.',
      definition_en: 'Space between flex items. Replaces margins between them.',
      example_ru: '.cards { display: flex; gap: 24px; }',
      example_en: '.cards { display: flex; gap: 24px; }',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Flexbox решил "проблему вертикального центрирования", над которой веб-разработчики мучились с 1996 года. Теперь это две строки: display: flex; align-items: center;',
      text_en: 'Flexbox solved the "vertical centring problem" that web developers had struggled with since 1996. Now it is two lines: display: flex; align-items: center;',
    },
    {
      text_ru: 'Игра Flexbox Froggy (flexboxfroggy.com) учит Flexbox через задачки с лягушками — очень рекомендуется для закрепления! После Flexbox стоит освоить CSS Grid — для двумерных сеток.',
      text_en: 'The game Flexbox Froggy (flexboxfroggy.com) teaches Flexbox through frog puzzles — highly recommended for practice! After Flexbox it is worth learning CSS Grid — for two-dimensional grids.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Как включить Flexbox для элемента?',
      text_en: 'How do you enable Flexbox for an element?',
      options_ru: ['flex: 1', 'display: flex', 'layout: flex', 'flexbox: on'],
      options_en: ['flex: 1', 'display: flex', 'layout: flex', 'flexbox: on'],
      correctIndex: 1,
      explanation_ru: 'display: flex — это ключевое свойство. Применяется к родителю, все прямые дети становятся flex-элементами.',
      explanation_en: 'display: flex is the key property. Applied to the parent, all direct children become flex items.',
    },
    {
      id: 'q2',
      text_ru: 'Какое свойство выравнивает элементы по вертикали (при flex-direction: row)?',
      text_en: 'Which property aligns items vertically (with flex-direction: row)?',
      options_ru: ['justify-content', 'vertical-align', 'align-items', 'flex-align'],
      options_en: ['justify-content', 'vertical-align', 'align-items', 'flex-align'],
      correctIndex: 2,
      explanation_ru: 'align-items выравнивает по поперечной оси — вертикаль при row. justify-content — по главной оси (горизонталь).',
      explanation_en: 'align-items aligns along the cross axis — vertical for row. justify-content aligns along the main axis (horizontal).',
    },
    {
      id: 'q3',
      text_ru: 'Что делает justify-content: space-between?',
      text_en: 'What does justify-content: space-between do?',
      options_ru: ['Сжимает к центру', 'Первый и последний у краёв, остальные равномерно', 'Равные промежутки со всех сторон', 'Переносит элементы'],
      options_en: ['Squeezes to centre', 'First and last at edges, rest evenly spaced', 'Equal gaps on all sides', 'Wraps items'],
      correctIndex: 1,
      explanation_ru: 'space-between: первый элемент у левого края, последний у правого, между остальными — равные промежутки.',
      explanation_en: 'space-between: first item at the left edge, last at the right, equal gaps between the rest.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает flex: 1 у дочернего элемента?',
      text_en: 'What does flex: 1 do on a child element?',
      options_ru: ['Скрывает элемент', 'Добавляет рамку', 'Растягивает для равной доли свободного пространства', 'Делает элемент первым'],
      options_en: ['Hides the element', 'Adds a border', 'Stretches to take an equal share of free space', 'Makes the element first'],
      correctIndex: 2,
      explanation_ru: 'flex: 1 — сокращение flex-grow: 1. Элемент занимает равную долю доступного пространства.',
      explanation_en: 'flex: 1 is shorthand for flex-grow: 1. The item takes an equal share of the available space.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает flex-wrap: wrap?',
      text_en: 'What does flex-wrap: wrap do?',
      options_ru: ['Скрывает лишние элементы', 'Разрешает перенос на следующую строку', 'Группирует элементы', 'Добавляет анимацию'],
      options_en: ['Hides extra items', 'Allows wrapping to the next line', 'Groups items', 'Adds animation'],
      correctIndex: 1,
      explanation_ru: 'flex-wrap: wrap разрешает элементам переноситься на следующую строку, когда нет места. По умолчанию — nowrap (сжимаются).',
      explanation_en: 'flex-wrap: wrap allows items to wrap to the next line when there is no room. By default — nowrap (items shrink).',
    },
  ],
}
