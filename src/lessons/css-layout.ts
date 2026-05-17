import type { Lesson } from '@/types/lesson'

export const cssLayout: Lesson = {
  slug: 'css-layout',
  category: 'CSS',
  readTime: 9,
  icon: '📐',

  title_ru: 'Раскладка CSS: блочная модель и Flexbox',
  title_en: 'CSS Layout: box model and Flexbox',

  description_ru: 'Учимся расставлять элементы: блочная модель, margin, padding и мощный Flexbox.',
  description_en: 'Learning to place elements: box model, margin, padding and the powerful Flexbox.',

  sections: [
    { id: 'box-model', title_ru: 'Блочная модель',      title_en: 'Box model' },
    { id: 'spacing',   title_ru: 'Отступы: margin и padding', title_en: 'Spacing: margin and padding' },
    { id: 'display',   title_ru: 'Свойство display',    title_en: 'The display property' },
    { id: 'flexbox',   title_ru: 'Flexbox',             title_en: 'Flexbox' },
    { id: 'key-terms', title_ru: 'Важные слова',        title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'CSS-раскладка: расставляем элементы',
      title_en: 'CSS layout: placing elements',
      body_ru: 'Как поставить два блока рядом? Как выровнять текст по центру? Как сделать красивые отступы? Сегодня разбираемся с тем, как CSS управляет расположением элементов.',
      body_en: 'How do you place two blocks side by side? How do you centre text? How do you make nice spacing? Today we figure out how CSS controls the placement of elements.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Блочная модель — как матрёшка',
      title_en: 'The box model — like a Russian doll',
      body_ru: 'Каждый HTML-элемент — это коробка. Внутри — содержимое (content). Вокруг содержимого — мягкая набивка (padding). Затем — стенка коробки (border). Снаружи — расстояние до соседей (margin). Как матрёшка: одно внутри другого.',
      body_en: 'Every HTML element is a box. Inside is the content. Around the content is soft padding. Then the box wall (border). Outside is the distance to neighbours (margin). Like a Russian doll: one inside another.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Блочная модель: четыре слоя',
      title_en: 'The box model: four layers',
      body_ru: 'Content — сам текст или картинка. Padding — внутренний отступ (пространство между содержимым и рамкой). Border — рамка. Margin — внешний отступ (пространство между элементами). Свойство box-sizing: border-box делает так, чтобы padding и border не увеличивали размер блока — очень удобно.',
      body_en: 'Content — the text or image itself. Padding — inner spacing (space between content and border). Border — the frame. Margin — outer spacing (space between elements). The property box-sizing: border-box makes padding and border not grow the block size — very convenient.',
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Блочная модель — код',
      title_en: 'Box model — code',
      body_ru: 'Вот как выглядит полный набор отступов и рамки. Числа можно задавать для всех сторон сразу или по отдельности.',
      body_en: 'Here is what a full set of spacing and borders looks like. Numbers can be set for all sides at once or individually.',
      code: `/* Все четыре стороны сразу */
.card {
  margin: 16px;          /* внешний отступ */
  padding: 24px;         /* внутренний отступ */
  border: 1px solid #eee;
  border-radius: 12px;
}

/* По отдельности: верх право низ лево */
.hero {
  margin: 0 auto;        /* центровка по горизонтали */
  padding: 48px 32px;
}

/* Одна сторона */
.title {
  margin-bottom: 16px;
  padding-left: 8px;
}`,
      codeLang: 'css',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'display: block, inline, flex',
      title_en: 'display: block, inline, flex',
      body_ru: 'Свойство display определяет, как элемент ведёт себя в потоке. block — занимает всю ширину, следующий элемент — с новой строки (div, p, h1). inline — занимает только ширину содержимого, соседи рядом (span, a, strong). flex — включает Flexbox — элементы выстраиваются гибко. Это самый мощный режим для раскладок.',
      body_en: 'The display property determines how an element behaves in the flow. block — takes the full width, next element starts on a new line (div, p, h1). inline — takes only the content width, neighbours sit beside it (span, a, strong). flex — enables Flexbox — elements arrange themselves flexibly. This is the most powerful mode for layouts.',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Flexbox — мощный инструмент',
      title_en: 'Flexbox — a powerful tool',
      body_ru: 'Flexbox решает главную боль вёрстки — расположить элементы рядом и выровнять их. Добавь display: flex на родительский контейнер, и его дети выстроятся в ряд. justify-content управляет выравниванием по горизонтали, align-items — по вертикали. gap задаёт расстояние между элементами.',
      body_en: 'Flexbox solves the main pain of layout — placing elements side by side and aligning them. Add display: flex to the parent container and its children line up in a row. justify-content controls horizontal alignment, align-items controls vertical. gap sets the distance between elements.',
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Flexbox — примеры',
      title_en: 'Flexbox — examples',
      body_ru: 'Вот самые частые паттерны Flexbox, которые встречаются на каждом сайте.',
      body_en: 'Here are the most common Flexbox patterns found on every website.',
      code: `/* Навигация: элементы рядом */
nav {
  display: flex;
  justify-content: space-between; /* по краям */
  align-items: center;            /* по вертикали */
  gap: 16px;
}

/* Карточки в ряд */
.cards {
  display: flex;
  gap: 24px;
  flex-wrap: wrap; /* перенос на новую строку */
}

/* Центрирование чего угодно */
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}`,
      codeLang: 'css',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'До появления Flexbox разработчики выравнивали элементы с помощью float и margin в ручную — это было очень сложно. Фраза "center a div" (выровнять блок по центру) была известной шуткой о том, насколько это было болезненно в старом CSS.',
      body_en: 'Before Flexbox, developers aligned elements using float and manual margins — it was very tricky. The phrase "center a div" was a famous joke about how painful it was in old CSS.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Построй карточки в ряд!',
      title_en: 'Build cards in a row!',
      body_ru: 'Используй Flexbox, чтобы расположить три карточки горизонтально с отступами между ними.',
      body_en: 'Use Flexbox to place three cards horizontally with spacing between them.',
    },
  ],

  content: {
    intro_ru: `Знать CSS-свойства — это хорошо, но как расположить элементы там, где
нужно? Как поставить блоки рядом? Как прижать что-то к краю или центру? Это задача
раскладки (layout). Самые важные инструменты: блочная модель и Flexbox. После этого
урока ты сможешь строить сложные страницы из простых блоков.`,
    intro_en: `Knowing CSS properties is good, but how do you place elements where you
want them? How do you put blocks side by side? How do you push something to an edge or
the centre? That is the job of layout. The most important tools: the box model and
Flexbox. After this lesson you will be able to build complex pages from simple blocks.`,

    blocks: [
      {
        sectionId: 'box-model',
        heading_ru: 'Блочная модель',
        heading_en: 'Box model',
        text_ru: `Каждый HTML-элемент в браузере — это прямоугольная коробка. Внутри
коробки четыре концентрических слоя:

1. Content (содержимое) — то, что ты написал: текст, картинка.
2. Padding (внутренний отступ) — пространство между содержимым и рамкой.
   Увеличивает видимый размер блока, фон распространяется на padding.
3. Border (рамка) — ободок коробки. Толщина задаётся в пикселях.
4. Margin (внешний отступ) — невидимое пространство снаружи рамки, отделяющее
   этот элемент от соседних.

Лайфхак: пиши * { box-sizing: border-box; } в начале любого проекта.
Тогда padding и border войдут в объявленный размер элемента, а не добавятся к нему.`,
        text_en: `Every HTML element in the browser is a rectangular box. Inside the box
are four concentric layers:

1. Content — what you wrote: text, image.
2. Padding (inner spacing) — the space between the content and the border.
   It increases the visible size of the block; the background extends into the padding.
3. Border — the rim of the box. Thickness is set in pixels.
4. Margin (outer spacing) — invisible space outside the border, separating
   this element from its neighbours.

Tip: write * { box-sizing: border-box; } at the top of any project.
Then padding and border fit inside the declared element size instead of being added to it.`,
        code: `/* Рекомендуемый сброс */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* Пример блочной модели */
.box {
  width: 300px;          /* ширина содержимого */
  padding: 20px;         /* внутренний отступ */
  border: 2px solid #333;
  margin: 16px auto;     /* внешний отступ + центровка */
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'spacing',
        heading_ru: 'Отступы: margin и padding',
        heading_en: 'Spacing: margin and padding',
        text_ru: `Margin и padding — самые используемые свойства в CSS. Их можно задавать
несколькими способами:

• Одно значение: margin: 16px — одинаково со всех сторон.
• Два значения: margin: 16px 32px — 16px сверху/снизу, 32px слева/справа.
• Четыре значения: margin: 8px 16px 24px 32px — верх, право, низ, лево
  (по часовой стрелке).
• По сторонам: margin-top, margin-right, margin-bottom, margin-left.

Трюк с margin: 0 auto — это способ отцентрировать блок по горизонтали.
Браузер автоматически делает левый и правый margin равными.`,
        text_en: `Margin and padding are the most used properties in CSS. They can be set
in several ways:

• One value: margin: 16px — the same on all sides.
• Two values: margin: 16px 32px — 16px top/bottom, 32px left/right.
• Four values: margin: 8px 16px 24px 32px — top, right, bottom, left
  (clockwise).
• Per side: margin-top, margin-right, margin-bottom, margin-left.

The trick margin: 0 auto is how you centre a block horizontally.
The browser automatically makes left and right margins equal.`,
        code: `/* Разные способы задать отступы */
.container {
  margin: 0 auto;        /* центровка */
  max-width: 1200px;
  padding: 0 24px;       /* горизонтальные поля */
}

.section {
  padding: 64px 0;       /* вертикальные отступы */
  margin-bottom: 32px;
}

.button {
  padding: 12px 24px;    /* кнопка: вертикаль, горизонталь */
  margin-top: 16px;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'display',
        heading_ru: 'Свойство display',
        heading_en: 'The display property',
        text_ru: `display определяет, как элемент участвует в потоке документа.

• block: элемент занимает всю доступную ширину. Следующий элемент начинается
  с новой строки. Так ведут себя div, p, h1–h6.

• inline: элемент занимает только ширину содержимого. Соседние элементы стоят
  рядом в той же строке. Так ведут себя span, a, strong, em.

• inline-block: как inline, но можно задавать width, height, padding —
  удобно для кнопок.

• flex: самый важный режим. Дочерние элементы контейнера выстраиваются гибко.

• none: элемент полностью скрыт и не занимает места на странице.`,
        text_en: `display determines how an element participates in the document flow.

• block: the element takes the full available width. The next element starts
  on a new line. This is how div, p, h1–h6 behave.

• inline: the element takes only the content width. Neighbouring elements sit
  next to it on the same line. This is how span, a, strong, em behave.

• inline-block: like inline but you can set width, height, padding —
  handy for buttons.

• flex: the most important mode. Child elements of the container arrange themselves flexibly.

• none: the element is fully hidden and takes no space on the page.`,
        code: `/* Блочный элемент */
div { display: block; }

/* Строчный элемент */
span { display: inline; }

/* Кнопка — inline-block */
.btn {
  display: inline-block;
  padding: 10px 20px;
}

/* Скрыть элемент */
.hidden { display: none; }`,
        codeLang: 'css',
      },
      {
        sectionId: 'flexbox',
        heading_ru: 'Flexbox',
        heading_en: 'Flexbox',
        text_ru: `Flexbox — самый удобный способ создавать раскладки в CSS. Добавь
display: flex к родительскому элементу — и его дочерние элементы выстроятся в ряд.

Главные свойства контейнера:
• flex-direction: row (по умолчанию) или column — направление главной оси.
• justify-content: выравнивание вдоль главной оси.
  flex-start (по умолчанию), flex-end, center, space-between, space-around.
• align-items: выравнивание поперёк главной оси.
  stretch (по умолчанию), flex-start, flex-end, center.
• gap: расстояние между элементами (заменяет margin между ними).
• flex-wrap: wrap — разрешить перенос элементов на новую строку.

Главное свойство дочернего элемента:
• flex: 1 — элемент растягивается и занимает равную долю доступного пространства.`,
        text_en: `Flexbox is the most convenient way to create layouts in CSS. Add
display: flex to a parent element — and its children line up in a row.

Main container properties:
• flex-direction: row (default) or column — direction of the main axis.
• justify-content: alignment along the main axis.
  flex-start (default), flex-end, center, space-between, space-around.
• align-items: alignment across the main axis.
  stretch (default), flex-start, flex-end, center.
• gap: space between elements (replaces margins between them).
• flex-wrap: wrap — allow elements to wrap to a new line.

Main child property:
• flex: 1 — the element stretches and takes an equal share of the available space.`,
        code: `/* Навигация */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  gap: 16px;
}

/* Три равные колонки */
.columns {
  display: flex;
  gap: 24px;
}

.columns > * {
  flex: 1; /* каждая колонка — равная доля */
}

/* Центрирование */
.hero {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: галерея карточек',
    title_en: 'Try it yourself: card gallery',
    instructions_ru: `Расположи три карточки в ряд с помощью Flexbox:
— Добавь display: flex к контейнеру .gallery
— Добавь gap: 20px между карточками
— Сделай карточки равной ширины: flex: 1 для .card
— Отцентрируй текст внутри карточки
Нажми «Запустить» и посмотри на результат!`,
    instructions_en: `Place three cards in a row using Flexbox:
— Add display: flex to the .gallery container
— Add gap: 20px between the cards
— Make the cards equal width: flex: 1 for .card
— Centre the text inside the card
Press "Run" and see the result!`,
    activeTabs: ['css'],
    starterCode: {
      css: `body {
  font-family: Arial, sans-serif;
  background-color: #f0f2f5;
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
  background-color: white;
  border-radius: 16px;
  padding: 28px 20px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0,0,0,0.08);
}

.card-icon {
  font-size: 40px;
  margin-bottom: 12px;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  color: #1a1a2e;
  margin-bottom: 8px;
}

.card-text {
  font-size: 14px;
  color: #666;
  line-height: 1.5;
}`,
    },
    hints_ru: [
      'display: flex применяется к родителю (.gallery), а не к самим карточкам.',
      'flex: 1 на карточке говорит «занять столько места, сколько есть, поровну с соседями».',
    ],
    hints_en: [
      'display: flex is applied to the parent (.gallery), not to the cards themselves.',
      'flex: 1 on a card says "take as much space as available, equally with neighbours".',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Блочная модель', term_en: 'Box model',
      definition_ru: 'Концепция в CSS: каждый элемент — прямоугольная коробка с четырьмя слоями (content, padding, border, margin).',
      definition_en: 'A CSS concept: every element is a rectangular box with four layers (content, padding, border, margin).',
      example_ru: '.card { padding: 20px; margin: 16px; border: 1px solid #ccc; }',
      example_en: '.card { padding: 20px; margin: 16px; border: 1px solid #ccc; }',
    },
    {
      term_ru: 'margin', term_en: 'margin',
      definition_ru: 'Внешний отступ — пространство снаружи рамки элемента, отделяющее его от соседних элементов.',
      definition_en: 'Outer spacing — space outside the element\'s border, separating it from neighbouring elements.',
      example_ru: 'margin: 0 auto — центрирует блок по горизонтали.',
      example_en: 'margin: 0 auto — centres a block horizontally.',
    },
    {
      term_ru: 'padding', term_en: 'padding',
      definition_ru: 'Внутренний отступ — пространство между содержимым элемента и его рамкой.',
      definition_en: 'Inner spacing — space between the element\'s content and its border.',
      example_ru: 'padding: 16px 24px — 16px сверху/снизу, 24px слева/справа.',
      example_en: 'padding: 16px 24px — 16px top/bottom, 24px left/right.',
    },
    {
      term_ru: 'Flexbox', term_en: 'Flexbox',
      definition_ru: 'Режим раскладки CSS (display: flex), который позволяет гибко выстраивать дочерние элементы в ряд или колонку.',
      definition_en: 'A CSS layout mode (display: flex) that flexibly arranges child elements in a row or column.',
      example_ru: '.row { display: flex; gap: 16px; align-items: center; }',
      example_en: '.row { display: flex; gap: 16px; align-items: center; }',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'До появления Flexbox разработчики использовали хаки с float и отрицательными margin, чтобы поставить блоки рядом. «Отцентровать div по вертикали» была известным мемом среди веб-разработчиков.',
      text_en: 'Before Flexbox, developers used float hacks and negative margins to place blocks side by side. "Vertically centre a div" was a famous meme among web developers.',
    },
    {
      text_ru: 'После Flexbox появился CSS Grid — ещё более мощный инструмент для двумерных раскладок. Вместе они решают практически любую задачу расположения элементов.',
      text_en: 'After Flexbox came CSS Grid — an even more powerful tool for two-dimensional layouts. Together they solve practically any element-placement problem.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какое CSS-свойство задаёт внутренний отступ элемента?',
      text_en: 'Which CSS property sets the inner spacing of an element?',
      options_ru: ['margin', 'border', 'padding', 'spacing'],
      options_en: ['margin', 'border', 'padding', 'spacing'],
      correctIndex: 2,
      explanation_ru: 'padding — внутренний отступ (между содержимым и рамкой). margin — внешний отступ.',
      explanation_en: 'padding is the inner spacing (between content and border). margin is the outer spacing.',
    },
    {
      id: 'q2',
      text_ru: 'Что делает margin: 0 auto?',
      text_en: 'What does margin: 0 auto do?',
      options_ru: ['Убирает все отступы', 'Центрирует блок по горизонтали', 'Скрывает элемент', 'Убирает рамку'],
      options_en: ['Removes all spacing', 'Centres the block horizontally', 'Hides the element', 'Removes the border'],
      correctIndex: 1,
      explanation_ru: 'margin: 0 auto — ноль сверху/снизу, автоматические (равные) отступы слева и справа. Это центрует блок.',
      explanation_en: 'margin: 0 auto — zero top/bottom, automatic (equal) left and right margins. This centres the block.',
    },
    {
      id: 'q3',
      text_ru: 'Как включить Flexbox для контейнера?',
      text_en: 'How do you enable Flexbox for a container?',
      options_ru: ['flex: 1', 'display: inline', 'display: flex', 'layout: flex'],
      options_en: ['flex: 1', 'display: inline', 'display: flex', 'layout: flex'],
      correctIndex: 2,
      explanation_ru: 'display: flex — это ключевое свойство. Оно применяется к родителю, и его дети выстраиваются гибко.',
      explanation_en: 'display: flex is the key property. It is applied to the parent, and its children arrange flexibly.',
    },
    {
      id: 'q4',
      text_ru: 'Какое свойство Flexbox выравнивает элементы по горизонтали?',
      text_en: 'Which Flexbox property aligns elements horizontally?',
      options_ru: ['align-items', 'justify-content', 'flex-wrap', 'gap'],
      options_en: ['align-items', 'justify-content', 'flex-wrap', 'gap'],
      correctIndex: 1,
      explanation_ru: 'justify-content управляет главной осью (по умолчанию — горизонталь). align-items — поперечной осью (вертикаль).',
      explanation_en: 'justify-content controls the main axis (horizontal by default). align-items controls the cross axis (vertical).',
    },
    {
      id: 'q5',
      text_ru: 'Что делает свойство flex: 1 у дочернего элемента?',
      text_en: 'What does the property flex: 1 do on a child element?',
      options_ru: ['Скрывает элемент', 'Добавляет рамку', 'Делает элемент первым', 'Растягивает элемент, заполняя доступное пространство'],
      options_en: ['Hides the element', 'Adds a border', 'Makes the element first', 'Stretches the element to fill available space'],
      correctIndex: 3,
      explanation_ru: 'flex: 1 говорит браузеру: «растяни меня так, чтобы занять равную долю свободного пространства».',
      explanation_en: 'flex: 1 tells the browser: "stretch me to take an equal share of the free space".',
    },
  ],
}
