import type { Lesson } from '@/types/lesson'

export const cssFlexboxPractice: Lesson = {
  slug: 'css-flexbox-practice',
  category: 'CSS',
  readTime: 10,
  icon: '🧩',

  title_ru: 'Flexbox: продвинутые техники',
  title_en: 'Flexbox: advanced techniques',

  description_ru: 'flex-wrap, flex-grow/shrink/basis, order, align-self — строй сложные раскладки уверенно.',
  description_en: 'flex-wrap, flex-grow/shrink/basis, order, align-self — build complex layouts with confidence.',

  sections: [
    { id: 'flex-wrap',    title_ru: 'flex-wrap — перенос',            title_en: 'flex-wrap — wrapping' },
    { id: 'flex-grow',    title_ru: 'flex-grow и flex-shrink',        title_en: 'flex-grow and flex-shrink' },
    { id: 'flex-basis',   title_ru: 'flex-basis и shorthand',         title_en: 'flex-basis and shorthand' },
    { id: 'order',        title_ru: 'order и align-self',             title_en: 'order and align-self' },
    { id: 'patterns',     title_ru: 'Реальные паттерны',              title_en: 'Real-world patterns' },
    { id: 'key-terms',    title_ru: 'Ключевые термины',               title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Продвинутый Flexbox: контроль над каждым элементом',
      title_en: 'Advanced Flexbox: control over every item',
      body_ru: 'Базовый Flexbox — это display:flex и justify-content. Продвинутый — это flex-grow, flex-shrink, flex-basis, order, align-self. Они позволяют управлять каждым дочерним элементом отдельно.',
      body_en: 'Basic Flexbox is display:flex and justify-content. Advanced Flexbox is flex-grow, flex-shrink, flex-basis, order, align-self. They let you control each child element individually.',
    },
    {
      id: 's2',
      type: 'concept',
      title_ru: 'flex-wrap: позволь элементам переноситься',
      title_en: 'flex-wrap: let elements wrap',
      body_ru: 'По умолчанию flex-элементы не переносятся — сжимаются в одну строку. flex-wrap: wrap разрешает перенос на новую строку, когда не хватает места.',
      body_en: 'By default flex items do not wrap — they squeeze into one line. flex-wrap: wrap allows elements to move to a new line when there is not enough space.',
      bullets: [
        { text_ru: 'nowrap (по умолчанию) — все в одну строку, сжимаются', text_en: 'nowrap (default) — all in one line, they shrink' },
        { text_ru: 'wrap — перенос на следующую строку при нехватке места', text_en: 'wrap — move to next line when space runs out' },
        { text_ru: 'wrap-reverse — перенос в обратном направлении', text_en: 'wrap-reverse — wrap in reverse direction' },
        { text_ru: 'flex-flow: row wrap — сокращение для direction + wrap', text_en: 'flex-flow: row wrap — shorthand for direction + wrap' },
      ],
    },
    {
      id: 's3',
      type: 'code-anim',
      title_ru: 'Адаптивная сетка карточек с flex-wrap',
      title_en: 'Responsive card grid with flex-wrap',
      body_ru: 'Смотри как flex-wrap превращает ряд карточек в адаптивную сетку.',
      body_en: 'Watch how flex-wrap turns a row of cards into a responsive grid.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<div class="cards">
  <div class="card">Карточка 1</div>
  <div class="card">Карточка 2</div>
  <div class="card">Карточка 3</div>
  <div class="card">Карточка 4</div>
</div>
<style>
.cards { display: flex; gap: 16px; }
.card  { background: #3b82f6; color: white;
         padding: 16px; border-radius: 8px; }
</style>`,
          comment_ru: '1. Без wrap — все карточки в одну строку, сжимаются',
          comment_en: '1. No wrap — all cards in one line, they shrink',
          preview: '[К1][К2][К3][К4]  ← все в ряд',
        },
        {
          code: `<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  width: 200px;
  background: #3b82f6;
  color: white;
  padding: 16px;
  border-radius: 8px;
}
</style>`,
          comment_ru: '2. flex-wrap:wrap + фиксированная ширина — карточки переносятся',
          comment_en: '2. flex-wrap:wrap + fixed width — cards wrap to next row',
          preview: '[К1][К2][К3]\n[К4]',
        },
        {
          code: `<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 1 1 200px; /* grow shrink basis */
  min-width: 150px;
  background: #3b82f6;
  color: white;
  padding: 16px;
  border-radius: 8px;
}
</style>`,
          comment_ru: '3. flex: 1 1 200px — карточки растут и переносятся — адаптивная сетка!',
          comment_en: '3. flex: 1 1 200px — cards grow and wrap — responsive grid!',
          preview: '[Карточка 1][Карточка 2][Карточка 3]\n[Карточка 4]',
        },
        {
          code: `<style>
.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 1 1 200px;
  min-width: 150px;
  background: #3b82f6;
  color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.card:hover {
  transform: translateY(-2px);
}
</style>`,
          comment_ru: '4. Добавляем тени и hover — готовая красивая сетка!',
          comment_en: '4. Add shadows and hover — a polished responsive grid!',
          preview: '[Карточка 1][Карточка 2][Карточка 3]\n[Карточка 4]  ✨',
        },
      ],
    },
    {
      id: 's4',
      type: 'compare',
      title_ru: 'flex-grow: 0 vs flex-grow: 1',
      title_en: 'flex-grow: 0 vs flex-grow: 1',
      body_ru: 'flex-grow определяет, как элемент занимает свободное пространство контейнера.',
      body_en: 'flex-grow determines how an element takes up free space in the container.',
      compareLeft: {
        label_ru: 'flex-grow: 0 (по умолчанию)',
        label_en: 'flex-grow: 0 (default)',
        items_ru: [
          'Элемент не растёт',
          'Занимает только свой контент',
          '[Кнопка][Кнопка]   ←пусто→',
          'Используй для кнопок, иконок',
          'Размер = размер содержимого',
        ],
        items_en: [
          'Element does not grow',
          'Takes only its content width',
          '[Button][Button]   ←empty→',
          'Use for buttons, icons',
          'Size = content size',
        ],
        color: 'amber',
      },
      compareRight: {
        label_ru: 'flex-grow: 1',
        label_en: 'flex-grow: 1',
        items_ru: [
          'Элемент растёт, занимает свободное место',
          '[Кнопка][←  растянутый блок  →]',
          'Несколько с grow:1 делят место поровну',
          'grow:2 получит вдвое больше, чем grow:1',
          'Идеален для основного контента',
        ],
        items_en: [
          'Element grows, fills free space',
          '[Button][←  stretched block  →]',
          'Multiple grow:1 share space equally',
          'grow:2 gets twice as much as grow:1',
          'Perfect for main content area',
        ],
        color: 'green',
      },
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'flex shorthand: grow shrink basis',
      title_en: 'flex shorthand: grow shrink basis',
      body_ru: 'Свойство flex — это сокращение для flex-grow, flex-shrink и flex-basis. flex: 1 — самая распространённая запись.',
      body_en: 'The flex property is shorthand for flex-grow, flex-shrink, and flex-basis. flex: 1 is the most common shorthand.',
      bullets: [
        { text_ru: 'flex: 1 = flex: 1 1 0% — расти, сжимайся, начни с нуля', text_en: 'flex: 1 = flex: 1 1 0% — grow, shrink, start from zero' },
        { text_ru: 'flex: 0 1 auto = по умолчанию — не расти, можно сжиматься', text_en: 'flex: 0 1 auto = default — no grow, can shrink' },
        { text_ru: 'flex: none = 0 0 auto — фиксированный, не растёт и не сжимается', text_en: 'flex: none = 0 0 auto — fixed, no grow and no shrink' },
        { text_ru: 'flex-basis: 200px — базовая ширина (до grow/shrink)', text_en: 'flex-basis: 200px — base width (before grow/shrink)' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'order и align-self',
      title_en: 'order and align-self',
      body_ru: 'order меняет визуальный порядок элементов. align-self переопределяет align-items для отдельного элемента.',
      body_en: 'order changes the visual order of elements. align-self overrides align-items for a single element.',
      code: `/* order: по умолчанию все элементы имеют order: 0 */
.sidebar { order: -1; }  /* сдвинуть в начало */
.footer  { order: 99; }  /* сдвинуть в конец */

/* align-self переопределяет align-items для одного элемента */
.container {
  display: flex;
  align-items: center;  /* все по центру */
}
.special-item {
  align-self: flex-end; /* этот — к низу */
}

/* Боковое меню с flex */
.layout {
  display: flex;
  gap: 24px;
}
.main-content { flex: 1; }         /* займёт всё место */
.sidebar      { flex: 0 0 240px; } /* фиксированная ширина */`,
      codeLang: 'css',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Реальные паттерны Flexbox',
      title_en: 'Real-world Flexbox patterns',
      body_ru: 'Flexbox идеален для трёх задач: горизонтальная навигация, центрирование по обеим осям, раскладка sidebar + content.',
      body_en: 'Flexbox is ideal for three tasks: horizontal navigation, centering on both axes, sidebar + content layout.',
      bullets: [
        { text_ru: '🧭 Navbar: justify-content:space-between + align-items:center', text_en: '🧭 Navbar: justify-content:space-between + align-items:center' },
        { text_ru: '🎯 Центрирование: justify-content:center + align-items:center + min-height', text_en: '🎯 Centering: justify-content:center + align-items:center + min-height' },
        { text_ru: '📋 Sidebar: .main{flex:1} + .sidebar{flex:0 0 240px}', text_en: '📋 Sidebar: .main{flex:1} + .sidebar{flex:0 0 240px}' },
        { text_ru: '🃏 Card grid: flex-wrap:wrap + flex:1 1 200px на карточках', text_en: '🃏 Card grid: flex-wrap:wrap + flex:1 1 200px on cards' },
      ],
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'flex: 1 — волшебная строка, которую используют в 80% случаев. Она означает "займи всё доступное место". Если два элемента имеют flex:1 — они поровну делят пространство. flex:2 на одном и flex:1 на другом — первый займёт 2/3, второй 1/3.',
      body_en: 'flex: 1 is the magic line used in 80% of cases. It means "take all available space". If two elements have flex:1 — they share space equally. flex:2 on one and flex:1 on another — the first takes 2/3, the second 1/3.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Собери реальный интерфейс!',
      title_en: 'Build a real interface!',
      body_ru: 'Создай раскладку страницы с sidebar и основным контентом. Sidebar фиксированный (240px), контент занимает остальное место. Используй flex:1 и flex:0 0 240px.',
      body_en: 'Build a page layout with a sidebar and main content. Sidebar is fixed (240px), content takes the rest. Use flex:1 and flex:0 0 240px.',
    },
  ],

  content: {
    intro_ru: `После освоения базового Flexbox приходит время продвинутых техник.
flex-grow, flex-shrink, flex-basis — три свойства, которые управляют тем, как
элемент растёт и сжимается. flex-wrap позволяет создавать адаптивные сетки.
order и align-self дают точечный контроль над отдельными элементами.`,
    intro_en: `After learning basic Flexbox it is time for advanced techniques.
flex-grow, flex-shrink, flex-basis — three properties that control how an element
grows and shrinks. flex-wrap enables responsive grids. order and align-self give
fine-grained control over individual elements.`,

    blocks: [
      {
        sectionId: 'flex-wrap',
        heading_ru: 'flex-wrap',
        heading_en: 'flex-wrap',
        text_ru: `По умолчанию flex-элементы не переносятся (nowrap) — они сжимаются в одну строку.
flex-wrap: wrap позволяет элементам переноситься, когда не хватает места.
Очень полезно для создания адаптивных сеток карточек.`,
        text_en: `By default flex items do not wrap (nowrap) — they shrink into one line.
flex-wrap: wrap lets elements move to a new line when there is not enough space.
Very useful for creating responsive card grids.`,
        code: `.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.card {
  flex: 1 1 250px; /* минимум 250px, но растёт */
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'flex-grow',
        heading_ru: 'flex-grow и flex-shrink',
        heading_en: 'flex-grow and flex-shrink',
        text_ru: `flex-grow: как много свободного места занять (0 = не расти).
flex-shrink: можно ли сжиматься (1 = да, 0 = нет).

flex-grow: 1 — взять всё доступное место.
Два элемента с flex-grow:1 делят пространство поровну.
flex-grow:2 возьмёт вдвое больше, чем flex-grow:1.`,
        text_en: `flex-grow: how much free space to take (0 = do not grow).
flex-shrink: can it shrink (1 = yes, 0 = no).

flex-grow: 1 — take all available space.
Two elements with flex-grow:1 share space equally.
flex-grow:2 takes twice as much as flex-grow:1.`,
        code: `.sidebar { flex: 0 0 240px; } /* не растёт, не сжимается */
.content  { flex: 1; }         /* занимает всё остальное */

/* Равные колонки */
.col { flex: 1; }              /* каждая занимает 1/N */`,
        codeLang: 'css',
      },
      {
        sectionId: 'flex-basis',
        heading_ru: 'flex-basis и shorthand',
        heading_en: 'flex-basis and shorthand',
        text_ru: `flex-basis задаёт начальный размер элемента до расчёта grow/shrink.
flex-basis: 200px — начать с 200px, потом расти/сжиматься.
flex-basis: auto — использовать ширину содержимого.

Сокращение: flex: [grow] [shrink] [basis]
flex: 1         = 1 1 0%
flex: 1 1 200px = расти/сжиматься начиная с 200px`,
        text_en: `flex-basis sets the initial size before grow/shrink calculations.
flex-basis: 200px — start at 200px, then grow/shrink.
flex-basis: auto — use the content width.

Shorthand: flex: [grow] [shrink] [basis]
flex: 1         = 1 1 0%
flex: 1 1 200px = grow/shrink starting at 200px`,
        code: `/* Карточки с минимальной шириной */
.card {
  flex: 1 1 200px;
  min-width: 150px;
  max-width: 400px;
}

/* Фиксированный sidebar */
.sidebar {
  flex: none;      /* = 0 0 auto */
  width: 240px;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'order',
        heading_ru: 'order и align-self',
        heading_en: 'order and align-self',
        text_ru: `order меняет визуальный порядок элементов (не меняет DOM).
Все элементы имеют order: 0 по умолчанию.
Меньшее число = ближе к началу.

align-self переопределяет align-items для конкретного элемента.
Принимает те же значения: auto, flex-start, center, flex-end, stretch.`,
        text_en: `order changes the visual order of elements (does not change the DOM).
All elements have order: 0 by default.
Lower number = closer to the start.

align-self overrides align-items for a specific element.
Takes the same values: auto, flex-start, center, flex-end, stretch.`,
        code: `/* Переставить на мобильном */
@media (max-width: 768px) {
  .sidebar { order: 2; }   /* после контента */
  .content { order: 1; }   /* первым */
}

/* align-self для одного элемента */
.container { display: flex; align-items: center; }
.badge     { align-self: flex-start; } /* в начало */`,
        codeLang: 'css',
      },
      {
        sectionId: 'patterns',
        heading_ru: 'Реальные паттерны',
        heading_en: 'Real-world patterns',
        text_ru: `Три самых частых паттерна Flexbox:

1. Holy Grail (header + sidebar + content + footer)
2. Card grid (адаптивная сетка карточек)
3. Sticky footer (футер всегда внизу)`,
        text_en: `Three most common Flexbox patterns:

1. Holy Grail (header + sidebar + content + footer)
2. Card grid (responsive card grid)
3. Sticky footer (footer always at the bottom)`,
        code: `/* 1. Sidebar layout */
.page { display: flex; gap: 24px; }
.sidebar { flex: 0 0 240px; }
.content { flex: 1; }

/* 2. Card grid */
.grid { display: flex; flex-wrap: wrap; gap: 16px; }
.card { flex: 1 1 250px; }

/* 3. Sticky footer */
body {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
main   { flex: 1; }
footer { flex-shrink: 0; }`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: адаптивная сетка карточек',
    title_en: 'Try it yourself: responsive card grid',
    instructions_ru: `Создай адаптивную сетку карточек:
— Карточки переносятся при нехватке места (flex-wrap)
— Каждая карточка минимум 220px (flex-basis)
— Карточки растягиваются равномерно (flex-grow: 1)
— gap: 20px между карточками
Бонус: добавь sidebar (240px) + основной контент рядом`,
    instructions_en: `Create a responsive card grid:
— Cards wrap when there is not enough space (flex-wrap)
— Each card minimum 220px (flex-basis)
— Cards stretch evenly (flex-grow: 1)
— gap: 20px between cards
Bonus: add a sidebar (240px) + main content beside it`,
    activeTabs: ['html', 'css'],
    starterCode: {
      html: `<div class="page-layout">
  <aside class="sidebar">
    <h3>Категории</h3>
    <ul>
      <li>Все товары</li>
      <li>Электроника</li>
      <li>Одежда</li>
    </ul>
  </aside>

  <main class="content">
    <div class="card-grid">
      <div class="card">
        <h4>Товар 1</h4>
        <p>Описание товара</p>
        <span class="price">1 200 ₽</span>
      </div>
      <div class="card">
        <h4>Товар 2</h4>
        <p>Описание товара</p>
        <span class="price">2 400 ₽</span>
      </div>
      <div class="card">
        <h4>Товар 3</h4>
        <p>Описание товара</p>
        <span class="price">980 ₽</span>
      </div>
      <div class="card">
        <h4>Товар 4</h4>
        <p>Описание товара</p>
        <span class="price">3 100 ₽</span>
      </div>
    </div>
  </main>
</div>`,
      css: `.page-layout {
  display: flex;
  gap: 24px;
  padding: 24px;
  font-family: sans-serif;
}

.sidebar {
  flex: 0 0 200px;
  background: #f1f5f9;
  padding: 16px;
  border-radius: 8px;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.sidebar li {
  padding: 8px 0;
  cursor: pointer;
  color: #475569;
}

.content {
  flex: 1;
}

.card-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
}

.card {
  flex: 1 1 220px;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.08);
}

.card h4 {
  margin: 0 0 8px;
  color: #0f172a;
}

.card p {
  color: #64748b;
  font-size: 0.875rem;
  margin: 0 0 12px;
}

.price {
  font-weight: bold;
  color: #3b82f6;
  font-size: 1.125rem;
}`,
    },
    hints_ru: [
      'flex: 1 1 220px значит: grow=1 (расти), shrink=1 (сжиматься), basis=220px (начальная ширина). Карточки переносятся когда суммарная ширина не влезает.',
      'Для sidebar используй flex: 0 0 200px — фиксированная ширина 200px, не растёт и не сжимается.',
    ],
    hints_en: [
      'flex: 1 1 220px means: grow=1 (grow), shrink=1 (shrink), basis=220px (initial width). Cards wrap when total width does not fit.',
      'For the sidebar use flex: 0 0 200px — fixed 200px width, no growing and no shrinking.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'flex-wrap', term_en: 'flex-wrap',
      definition_ru: 'Разрешает (wrap) или запрещает (nowrap) перенос flex-элементов на новую строку.',
      definition_en: 'Allows (wrap) or prevents (nowrap) flex items from wrapping to a new line.',
      example_ru: 'flex-wrap: wrap;',
      example_en: 'flex-wrap: wrap;',
    },
    {
      term_ru: 'flex-grow', term_en: 'flex-grow',
      definition_ru: 'Коэффициент роста. 0 — не растёт. 1 — занимает свободное пространство.',
      definition_en: 'Growth factor. 0 — no growth. 1 — takes available free space.',
      example_ru: '.content { flex-grow: 1; }',
      example_en: '.content { flex-grow: 1; }',
    },
    {
      term_ru: 'flex-basis', term_en: 'flex-basis',
      definition_ru: 'Начальный размер элемента до расчёта grow и shrink.',
      definition_en: 'Initial size of the element before grow and shrink calculations.',
      example_ru: 'flex-basis: 200px;',
      example_en: 'flex-basis: 200px;',
    },
    {
      term_ru: 'order', term_en: 'order',
      definition_ru: 'Визуальный порядок элемента. По умолчанию 0. Меньше = ближе к началу.',
      definition_en: 'Visual order of the element. Default 0. Lower = closer to the start.',
      example_ru: '.sidebar { order: -1; }',
      example_en: '.sidebar { order: -1; }',
    },
    {
      term_ru: 'align-self', term_en: 'align-self',
      definition_ru: 'Переопределяет align-items для отдельного flex-элемента.',
      definition_en: 'Overrides align-items for a specific flex item.',
      example_ru: '.badge { align-self: flex-start; }',
      example_en: '.badge { align-self: flex-start; }',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'flex: 1 — это сокращение flex: 1 1 0%. Число 1 в трёх позициях значит: "расти с коэффициентом 1, сжимайся с коэффициентом 1, начальный размер 0". Именно из нуля элемент начинает расти — поэтому все элементы с flex:1 получают одинаковую долю пространства.',
      text_en: 'flex: 1 is shorthand for flex: 1 1 0%. The 1 in all three positions means: "grow with factor 1, shrink with factor 1, initial size 0". Because it starts from zero all elements with flex:1 get equal shares of space.',
    },
    {
      text_ru: 'order не меняет порядок в HTML и не влияет на доступность (screen readers читают в DOM-порядке). Поэтому для смены порядка, критичного для смысла, лучше менять DOM через JavaScript, а не CSS order.',
      text_en: 'order does not change the HTML order and does not affect accessibility (screen readers read DOM order). So for reordering that is important for meaning, changing the DOM via JavaScript is better than CSS order.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что делает flex-wrap: wrap?',
      text_en: 'What does flex-wrap: wrap do?',
      options_ru: [
        'Прячет переполняющие элементы',
        'Разрешает элементам переноситься на следующую строку',
        'Делает элементы одинаковой ширины',
        'Переворачивает порядок элементов',
      ],
      options_en: [
        'Hides overflowing elements',
        'Allows elements to wrap to the next line',
        'Makes elements the same width',
        'Reverses the element order',
      ],
      correctIndex: 1,
      explanation_ru: 'flex-wrap: wrap разрешает элементам переноситься на следующую строку когда в текущей не хватает места.',
      explanation_en: 'flex-wrap: wrap allows elements to move to the next line when the current line does not have enough space.',
    },
    {
      id: 'q2',
      text_ru: 'Что значит flex: 1 для элемента?',
      text_en: 'What does flex: 1 mean for an element?',
      options_ru: [
        'Ширина элемента станет 1px',
        'Элемент займёт всё доступное свободное пространство',
        'Элемент станет первым в ряду',
        'Элемент не будет сжиматься',
      ],
      options_en: [
        'Element width becomes 1px',
        'Element takes all available free space',
        'Element becomes first in the row',
        'Element will not shrink',
      ],
      correctIndex: 1,
      explanation_ru: 'flex: 1 = flex-grow:1 flex-shrink:1 flex-basis:0%. Элемент расширяется, чтобы заполнить доступное пространство.',
      explanation_en: 'flex: 1 = flex-grow:1 flex-shrink:1 flex-basis:0%. The element expands to fill available space.',
    },
    {
      id: 'q3',
      text_ru: 'Два элемента: flex-grow:2 и flex-grow:1. Как они делят пространство?',
      text_en: 'Two elements: flex-grow:2 and flex-grow:1. How do they share space?',
      options_ru: ['50/50', '2/3 и 1/3', '75/25', 'Зависит от содержимого'],
      options_en: ['50/50', '2/3 and 1/3', '75/25', 'Depends on content'],
      correctIndex: 1,
      explanation_ru: 'flex-grow работает пропорционально. grow:2 + grow:1 = 3 части. Первый берёт 2/3, второй 1/3.',
      explanation_en: 'flex-grow works proportionally. grow:2 + grow:1 = 3 parts. First takes 2/3, second 1/3.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает свойство order на flex-элементе?',
      text_en: 'What does the order property do on a flex item?',
      options_ru: [
        'Задаёт z-index элемента',
        'Меняет визуальный порядок без изменения HTML',
        'Упорядочивает элементы по алфавиту',
        'Задаёт анимацию',
      ],
      options_en: [
        'Sets the z-index of the element',
        'Changes the visual order without changing HTML',
        'Sorts elements alphabetically',
        'Sets an animation',
      ],
      correctIndex: 1,
      explanation_ru: 'order меняет визуальный порядок элемента. DOM остаётся неизменным. По умолчанию все имеют order: 0.',
      explanation_en: 'order changes the visual order of the element. The DOM stays unchanged. All elements have order: 0 by default.',
    },
    {
      id: 'q5',
      text_ru: 'Как создать фиксированный sidebar 240px рядом с растягивающимся контентом?',
      text_en: 'How to create a fixed 240px sidebar next to stretching content?',
      options_ru: [
        '.sidebar{width:240px} .content{width:calc(100%-240px)}',
        '.sidebar{flex:0 0 240px} .content{flex:1}',
        '.sidebar{flex-grow:0} .content{flex-grow:240}',
        '.sidebar{display:fixed} .content{flex:auto}',
      ],
      options_en: [
        '.sidebar{width:240px} .content{width:calc(100%-240px)}',
        '.sidebar{flex:0 0 240px} .content{flex:1}',
        '.sidebar{flex-grow:0} .content{flex-grow:240}',
        '.sidebar{display:fixed} .content{flex:auto}',
      ],
      correctIndex: 1,
      explanation_ru: 'flex: 0 0 240px — не расти, не сжимайся, начальный размер 240px. flex: 1 на контенте — займи всё остальное.',
      explanation_en: 'flex: 0 0 240px — no grow, no shrink, initial size 240px. flex: 1 on content — take all the rest.',
    },
  ],
}
