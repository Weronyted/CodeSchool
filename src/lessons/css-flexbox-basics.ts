import type { Lesson } from '@/types/lesson'

export const cssFlexboxBasics: Lesson = {
  slug: 'css-flexbox-basics',
  category: 'CSS',
  readTime: 9,
  icon: '↔️',

  title_ru: 'Flexbox: основы',
  title_en: 'Flexbox: the basics',

  description_ru: 'display:flex, flex-direction, justify-content, align-items, gap — управляй раскладкой одной строкой.',
  description_en: 'display:flex, flex-direction, justify-content, align-items, gap — control layout with one line.',

  sections: [
    { id: 'what-is-flex',       title_ru: 'Что такое Flexbox',        title_en: 'What is Flexbox' },
    { id: 'flex-direction',     title_ru: 'flex-direction',            title_en: 'flex-direction' },
    { id: 'justify-content',    title_ru: 'justify-content',           title_en: 'justify-content' },
    { id: 'align-items',        title_ru: 'align-items',               title_en: 'align-items' },
    { id: 'gap',                title_ru: 'gap — отступы между детьми', title_en: 'gap — spacing between children' },
    { id: 'key-terms',          title_ru: 'Ключевые термины',          title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Flexbox — умная раскладка без float',
      title_en: 'Flexbox — smart layout without float',
      body_ru: 'До Flexbox разработчики выравнивали блоки через float и position — это было неудобно. Flexbox решает это одной строкой: display: flex. Элементы выстраиваются в ряд, растягиваются, выравниваются — автоматически.',
      body_en: 'Before Flexbox developers aligned blocks with float and position — painful. Flexbox solves this in one line: display: flex. Elements line up, stretch, align — automatically.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Flex-контейнер как полка в магазине',
      title_en: 'Flex container like a store shelf',
      body_ru: 'Представь полку в магазине. Контейнер — это полка. Товары — это flex-дети. Ты решаешь: расставить по левому краю, по центру или равномерно. Направление — горизонтально или вертикально.',
      body_en: 'Imagine a store shelf. The container is the shelf. Products are the flex children. You decide: line up on the left, center, or spread evenly. Direction — horizontal or vertical.',
      visual: {
        kind: 'emoji',
        emojis: ['📦', '↔️', '📐'],
      },
      bullets: [
        { text_ru: '📦 Контейнер: display: flex — активирует флексбокс', text_en: '📦 Container: display: flex — activates flexbox' },
        { text_ru: '↔️ Главная ось: направление выкладки (строка/колонка)', text_en: '↔️ Main axis: the layout direction (row/column)' },
        { text_ru: '📐 Дочерние элементы автоматически выстраиваются', text_en: '📐 Child elements align automatically' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'display: flex и flex-direction',
      title_en: 'display: flex and flex-direction',
      body_ru: 'display: flex превращает элемент в контейнер. Все прямые дети становятся flex-элементами. flex-direction задаёт главную ось: row (по горизонтали, по умолчанию) или column (по вертикали).',
      body_en: 'display: flex turns an element into a container. All direct children become flex items. flex-direction sets the main axis: row (horizontal, default) or column (vertical).',
      bullets: [
        { text_ru: 'row — дети в ряд слева направо (по умолчанию)', text_en: 'row — children in a row left to right (default)' },
        { text_ru: 'row-reverse — дети в ряд справа налево', text_en: 'row-reverse — children right to left' },
        { text_ru: 'column — дети в колонку сверху вниз', text_en: 'column — children in a column top to bottom' },
        { text_ru: 'column-reverse — дети в колонку снизу вверх', text_en: 'column-reverse — children bottom to top' },
      ],
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'justify-content — выравнивание по главной оси',
      title_en: 'justify-content — alignment along the main axis',
      body_ru: 'justify-content управляет тем, как дети располагаются по главной оси. По умолчанию — flex-start (прижаты к началу).',
      body_en: 'justify-content controls how children are placed along the main axis. Default is flex-start (packed at the start).',
      bullets: [
        { text_ru: 'flex-start — прижать к началу (по умолчанию)', text_en: 'flex-start — pack to the start (default)' },
        { text_ru: 'center — по центру', text_en: 'center — centered' },
        { text_ru: 'flex-end — прижать к концу', text_en: 'flex-end — pack to the end' },
        { text_ru: 'space-between — максимальный промежуток между элементами', text_en: 'space-between — maximum gap between items' },
        { text_ru: 'space-around — равные отступы вокруг каждого', text_en: 'space-around — equal margins around each item' },
      ],
    },
    {
      id: 's5',
      type: 'code-anim',
      title_ru: 'Строим navbar с Flexbox',
      title_en: 'Building a navbar with Flexbox',
      body_ru: 'Посмотри как шаг за шагом собирается навигационная панель с justify-content: space-between.',
      body_en: 'Watch how a navigation bar is built step by step with justify-content: space-between.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<nav class="navbar">
  <div class="logo">MyApp</div>
</nav>

<style>
.navbar {
  background: #1e293b;
  padding: 12px 24px;
  color: white;
}
</style>`,
          comment_ru: '1. Обычный блок — логотип просто слева',
          comment_en: '1. Plain block — logo just sits on the left',
          preview: 'MyApp',
        },
        {
          code: `<nav class="navbar">
  <div class="logo">MyApp</div>
  <ul class="links">
    <li>Главная</li>
    <li>О нас</li>
    <li>Контакты</li>
  </ul>
</nav>

<style>
.navbar {
  display: flex;
  background: #1e293b;
  padding: 12px 24px;
  color: white;
}
</style>`,
          comment_ru: '2. display:flex — дети выстраиваются в ряд',
          comment_en: '2. display:flex — children line up in a row',
          preview: 'MyApp  Главная О нас Контакты',
        },
        {
          code: `<nav class="navbar">
  <div class="logo">MyApp</div>
  <ul class="links">
    <li>Главная</li>
    <li>О нас</li>
    <li>Контакты</li>
  </ul>
</nav>

<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 12px 24px;
  color: white;
}
</style>`,
          comment_ru: '3. space-between: лого слева, ссылки справа — идеальный navbar!',
          comment_en: '3. space-between: logo left, links right — perfect navbar!',
          preview: 'MyApp                    Главная  О нас  Контакты',
        },
        {
          code: `<style>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #1e293b;
  padding: 12px 24px;
  color: white;
  gap: 16px;
}
.links {
  display: flex;
  list-style: none;
  gap: 24px;
  margin: 0;
  padding: 0;
}
</style>`,
          comment_ru: '4. gap на ссылках — равномерные отступы без margin',
          comment_en: '4. gap on links — even spacing without margin hacks',
          preview: 'MyApp  ·  Главная  ·  О нас  ·  Контакты',
        },
      ],
    },
    {
      id: 's6',
      type: 'compare',
      title_ru: 'justify-content vs align-items',
      title_en: 'justify-content vs align-items',
      body_ru: 'Две оси — две разные оси. justify-content — по главной оси. align-items — по поперечной.',
      body_en: 'Two axes — two different properties. justify-content is for the main axis. align-items is for the cross axis.',
      compareLeft: {
        label_ru: 'justify-content (главная ось)',
        label_en: 'justify-content (main axis)',
        items_ru: [
          'Управляет горизонтальным распределением (в row)',
          'flex-start | center | flex-end',
          'space-between | space-around',
          'При flex-direction:column — вертикаль',
          'Ось совпадает с flex-direction',
        ],
        items_en: [
          'Controls horizontal distribution (in row)',
          'flex-start | center | flex-end',
          'space-between | space-around',
          'With flex-direction:column — vertical',
          'Axis matches flex-direction',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'align-items (поперечная ось)',
        label_en: 'align-items (cross axis)',
        items_ru: [
          'Управляет вертикальным выравниванием (в row)',
          'stretch | center | flex-start | flex-end',
          'stretch — дети растягиваются по высоте',
          'При flex-direction:column — горизонталь',
          'Перпендикулярно главной оси',
        ],
        items_en: [
          'Controls vertical alignment (in row)',
          'stretch | center | flex-start | flex-end',
          'stretch — children fill the height',
          'With flex-direction:column — horizontal',
          'Perpendicular to the main axis',
        ],
        color: 'green',
      },
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'align-items и gap',
      title_en: 'align-items and gap',
      body_ru: 'align-items выравнивает детей по поперечной оси. gap добавляет отступы между ними без margin.',
      body_en: 'align-items aligns children on the cross axis. gap adds spacing between them without margin hacks.',
      code: `.card-row {
  display: flex;
  flex-direction: row;
  justify-content: center;   /* горизонтально по центру */
  align-items: flex-start;   /* прижать к верху */
  gap: 16px;                 /* отступ между картами */
}

/* Центрирование по обеим осям */
.hero {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;         /* занять весь экран */
}

/* Вертикальная раскладка */
.sidebar {
  display: flex;
  flex-direction: column;
  gap: 8px;
}`,
      codeLang: 'css',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Flexbox появился в 2009 году, но долго менял спецификацию. Сейчас он поддерживается во всех браузерах. Самый частый трюк: display:flex + justify-content:center + align-items:center — идеальное центрирование без float и position!',
      body_en: 'Flexbox appeared in 2009 but the specification changed a lot before stabilising. Today it is supported in all browsers. The most common trick: display:flex + justify-content:center + align-items:center — perfect centering without float or position hacks!',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Создай свою раскладку!',
      title_en: 'Build your own layout!',
      body_ru: 'Создай навигационную панель: лого слева, меню справа. Используй display:flex и justify-content:space-between. Добавь gap между пунктами меню.',
      body_en: 'Create a navbar: logo on the left, menu on the right. Use display:flex and justify-content:space-between. Add gap between menu items.',
    },
  ],

  content: {
    intro_ru: `Flexbox (Flexible Box Layout) — система раскладки CSS, которая делает выравнивание
элементов простым и предсказуемым. Вместо хаков с float и position — одна строка
display: flex. Контейнер управляет всеми прямыми детьми: расставляет, растягивает,
выравнивает. Это незаменимый инструмент для любой веб-раскладки.`,
    intro_en: `Flexbox (Flexible Box Layout) is a CSS layout system that makes aligning elements
simple and predictable. Instead of float and position hacks — one line: display: flex.
The container manages all direct children: arranges, stretches, aligns them. It is an
indispensable tool for any web layout.`,

    blocks: [
      {
        sectionId: 'what-is-flex',
        heading_ru: 'Что такое Flexbox',
        heading_en: 'What is Flexbox',
        text_ru: `Flexbox работает с контейнером и его прямыми детьми.
display: flex на родителе — и все прямые дети становятся flex-элементами.
Есть две оси:
• Главная ось (main axis) — направление flex-direction
• Поперечная ось (cross axis) — перпендикулярно главной`,
        text_en: `Flexbox works with a container and its direct children.
display: flex on the parent — and all direct children become flex items.
There are two axes:
• Main axis — the direction of flex-direction
• Cross axis — perpendicular to the main axis`,
        code: `.container {
  display: flex; /* Включить flexbox */
}

/* Все прямые дети автоматически выстраиваются в ряд */`,
        codeLang: 'css',
      },
      {
        sectionId: 'flex-direction',
        heading_ru: 'flex-direction',
        heading_en: 'flex-direction',
        text_ru: `flex-direction задаёт направление главной оси:
• row (по умолчанию) — горизонтально, слева направо
• row-reverse — горизонтально, справа налево
• column — вертикально, сверху вниз
• column-reverse — вертикально, снизу вверх`,
        text_en: `flex-direction sets the main axis direction:
• row (default) — horizontal, left to right
• row-reverse — horizontal, right to left
• column — vertical, top to bottom
• column-reverse — vertical, bottom to top`,
        code: `.horizontal { flex-direction: row; }     /* ← по умолчанию */
.vertical   { flex-direction: column; }  /* ↓ вертикально */

/* Мобильная карточка — вертикальная раскладка */
.card {
  display: flex;
  flex-direction: column;
  gap: 8px;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'justify-content',
        heading_ru: 'justify-content',
        heading_en: 'justify-content',
        text_ru: `justify-content выравнивает детей вдоль главной оси:
• flex-start — прижать к началу
• center — по центру
• flex-end — прижать к концу
• space-between — максимальный промежуток между элементами (без отступов по краям)
• space-around — равные отступы вокруг каждого (у краёв — половина)`,
        text_en: `justify-content aligns children along the main axis:
• flex-start — pack to the start
• center — centered
• flex-end — pack to the end
• space-between — maximum gap between items (no edge margins)
• space-around — equal margins around each item (half at the edges)`,
        code: `.navbar {
  display: flex;
  justify-content: space-between; /* лого ← → меню */
}

.centered-buttons {
  display: flex;
  justify-content: center;        /* кнопки по центру */
  gap: 12px;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'align-items',
        heading_ru: 'align-items',
        heading_en: 'align-items',
        text_ru: `align-items выравнивает детей по поперечной оси (перпендикулярно flex-direction):
• stretch (по умолчанию) — растянуть по высоте контейнера
• center — по центру по высоте
• flex-start — прижать к верху
• flex-end — прижать к низу`,
        text_en: `align-items aligns children on the cross axis (perpendicular to flex-direction):
• stretch (default) — fill the container height
• center — centered vertically
• flex-start — align to the top
• flex-end — align to the bottom`,
        code: `/* Идеальное центрирование */
.full-screen-center {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Карточки одной высоты */
.card-row {
  display: flex;
  align-items: stretch; /* по умолчанию */
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'gap',
        heading_ru: 'gap — отступы без margin',
        heading_en: 'gap — spacing without margin',
        text_ru: `gap задаёт отступы между flex-детьми.
gap: 16px — одинаковый отступ по обеим осям.
row-gap и column-gap — раздельно.
Не добавляет отступы по краям контейнера — только между детьми.`,
        text_en: `gap sets spacing between flex children.
gap: 16px — same spacing on both axes.
row-gap and column-gap — set separately.
Does not add space at the container edges — only between children.`,
        code: `.nav-links {
  display: flex;
  gap: 24px;            /* между ссылками */
}

.grid-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;            /* между карточками */
}

/* Разные отступы по осям */
.layout {
  display: flex;
  row-gap: 16px;
  column-gap: 32px;
}`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: navbar с Flexbox',
    title_en: 'Try it yourself: navbar with Flexbox',
    instructions_ru: `Построй навигационную панель:
— Логотип слева, ссылки справа (space-between)
— Ссылки выровнены по центру по вертикали (align-items:center)
— Между ссылками gap: 20px
— Фон тёмный, текст белый
Бонус: добавь кнопку "Войти" в конец ссылок`,
    instructions_en: `Build a navigation bar:
— Logo on the left, links on the right (space-between)
— Links centered vertically (align-items:center)
— gap: 20px between links
— Dark background, white text
Bonus: add a "Login" button at the end of the links`,
    activeTabs: ['html', 'css'],
    starterCode: {
      html: `<nav class="navbar">
  <div class="logo">MyBrand</div>
  <ul class="nav-links">
    <li><a href="#">Главная</a></li>
    <li><a href="#">Продукты</a></li>
    <li><a href="#">О нас</a></li>
    <li><a href="#" class="btn-login">Войти</a></li>
  </ul>
</nav>`,
      css: `.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #0f172a;
  padding: 16px 32px;
}

.logo {
  color: #60a5fa;
  font-size: 1.5rem;
  font-weight: bold;
}

.nav-links {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 20px;
}

.nav-links a {
  color: #e2e8f0;
  text-decoration: none;
  font-size: 0.95rem;
}

.btn-login {
  background: #3b82f6;
  padding: 8px 16px;
  border-radius: 6px;
  color: white !important;
}`,
    },
    hints_ru: [
      'justify-content:space-between ставит первый элемент в начало, последний в конец — всё между ними равномерно.',
      'align-items:center выравнивает всех детей по вертикальной середине контейнера.',
    ],
    hints_en: [
      'justify-content:space-between puts the first item at the start, the last at the end — everything in between spreads evenly.',
      'align-items:center aligns all children to the vertical midpoint of the container.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'display: flex', term_en: 'display: flex',
      definition_ru: 'Активирует Flexbox на контейнере. Все прямые дети становятся flex-элементами.',
      definition_en: 'Activates Flexbox on the container. All direct children become flex items.',
      example_ru: '.navbar { display: flex; }',
      example_en: '.navbar { display: flex; }',
    },
    {
      term_ru: 'flex-direction', term_en: 'flex-direction',
      definition_ru: 'Направление главной оси: row (горизонталь) или column (вертикаль).',
      definition_en: 'Main axis direction: row (horizontal) or column (vertical).',
      example_ru: 'flex-direction: column;',
      example_en: 'flex-direction: column;',
    },
    {
      term_ru: 'justify-content', term_en: 'justify-content',
      definition_ru: 'Выравнивание детей вдоль главной оси (space-between, center и т.д.).',
      definition_en: 'Alignment of children along the main axis (space-between, center, etc.).',
      example_ru: 'justify-content: space-between;',
      example_en: 'justify-content: space-between;',
    },
    {
      term_ru: 'align-items', term_en: 'align-items',
      definition_ru: 'Выравнивание детей по поперечной оси (center, stretch и т.д.).',
      definition_en: 'Alignment of children on the cross axis (center, stretch, etc.).',
      example_ru: 'align-items: center;',
      example_en: 'align-items: center;',
    },
    {
      term_ru: 'gap', term_en: 'gap',
      definition_ru: 'Расстояние между flex-детьми. Не добавляет отступы по краям.',
      definition_en: 'Space between flex children. Does not add space at the edges.',
      example_ru: 'gap: 16px;',
      example_en: 'gap: 16px;',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'До Flexbox центрирование по вертикали было одной из самых трудных задач CSS. Разработчики использовали трюки с display:table-cell или position:absolute. Сейчас это две строки: display:flex + align-items:center.',
      text_en: 'Before Flexbox, vertical centering was one of the hardest CSS tasks. Developers used tricks with display:table-cell or position:absolute. Now it is two lines: display:flex + align-items:center.',
    },
    {
      text_ru: 'gap в Flexbox появился позже, чем сам Flexbox (только в 2020). До этого использовали margin на детях. Сегодня gap поддерживается во всех современных браузерах и намного удобнее margin.',
      text_en: 'gap in Flexbox was added later than Flexbox itself (only in 2020). Before that, margin on children was used. Today gap is supported in all modern browsers and is much more convenient than margin.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какое свойство активирует Flexbox на контейнере?',
      text_en: 'Which property activates Flexbox on a container?',
      options_ru: ['display: block', 'display: flex', 'position: flex', 'flex: 1'],
      options_en: ['display: block', 'display: flex', 'position: flex', 'flex: 1'],
      correctIndex: 1,
      explanation_ru: 'display: flex превращает элемент в flex-контейнер. Все прямые дети становятся flex-элементами.',
      explanation_en: 'display: flex turns an element into a flex container. All direct children become flex items.',
    },
    {
      id: 'q2',
      text_ru: 'Какое значение justify-content ставит первый элемент слева, последний справа?',
      text_en: 'Which justify-content value puts the first item left and the last item right?',
      options_ru: ['center', 'flex-start', 'space-between', 'space-around'],
      options_en: ['center', 'flex-start', 'space-between', 'space-around'],
      correctIndex: 2,
      explanation_ru: 'space-between ставит первый элемент в начало, последний в конец, а остальные равномерно между ними.',
      explanation_en: 'space-between puts the first item at the start, the last at the end, and distributes the rest evenly.',
    },
    {
      id: 'q3',
      text_ru: 'Какое свойство выравнивает детей по вертикали внутри строки (при row)?',
      text_en: 'Which property aligns children vertically inside a row (with flex-direction:row)?',
      options_ru: ['justify-content', 'flex-direction', 'align-items', 'gap'],
      options_en: ['justify-content', 'flex-direction', 'align-items', 'gap'],
      correctIndex: 2,
      explanation_ru: 'align-items управляет поперечной осью — для row это вертикаль.',
      explanation_en: 'align-items controls the cross axis — for row that is vertical.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает flex-direction: column?',
      text_en: 'What does flex-direction: column do?',
      options_ru: [
        'Располагает детей в ряд горизонтально',
        'Располагает детей в колонку вертикально',
        'Скрывает переполнение',
        'Задаёт размер колонки',
      ],
      options_en: [
        'Arranges children in a horizontal row',
        'Arranges children in a vertical column',
        'Hides overflow',
        'Sets column width',
      ],
      correctIndex: 1,
      explanation_ru: 'flex-direction: column меняет главную ось на вертикальную — дети выстраиваются сверху вниз.',
      explanation_en: 'flex-direction: column changes the main axis to vertical — children stack from top to bottom.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает gap: 16px в flex-контейнере?',
      text_en: 'What does gap: 16px do in a flex container?',
      options_ru: [
        'Добавляет внешний отступ контейнеру',
        'Добавляет внутренний отступ контейнеру',
        'Добавляет отступ между flex-детьми',
        'Задаёт ширину детей',
      ],
      options_en: [
        'Adds outer margin to the container',
        'Adds inner padding to the container',
        'Adds spacing between flex children',
        'Sets the width of children',
      ],
      correctIndex: 2,
      explanation_ru: 'gap добавляет отступы между flex-элементами. Не добавляет отступы по краям контейнера.',
      explanation_en: 'gap adds spacing between flex items. It does not add space at the container edges.',
    },
  ],
}
