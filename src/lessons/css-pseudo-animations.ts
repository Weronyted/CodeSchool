import type { Lesson } from '@/types/lesson'

export const cssPseudoAnimations: Lesson = {
  slug: 'css-pseudo-animations',
  category: 'CSS',
  readTime: 11,
  icon: '✨',

  title_ru: 'Псевдоклассы, переходы и анимации',
  title_en: 'Pseudo-classes, transitions and animations',

  description_ru: ':hover, :focus, ::before/::after, transition, @keyframes — оживляй интерфейс с CSS.',
  description_en: ':hover, :focus, ::before/::after, transition, @keyframes — bring your interface to life with CSS.',

  sections: [
    { id: 'pseudo-classes',  title_ru: 'Псевдоклассы',               title_en: 'Pseudo-classes' },
    { id: 'pseudo-elements', title_ru: 'Псевдоэлементы',             title_en: 'Pseudo-elements' },
    { id: 'transition',      title_ru: 'transition — плавные переходы', title_en: 'transition — smooth transitions' },
    { id: 'keyframes',       title_ru: '@keyframes и animation',     title_en: '@keyframes and animation' },
    { id: 'patterns',        title_ru: 'Практические паттерны',      title_en: 'Practical patterns' },
    { id: 'key-terms',       title_ru: 'Ключевые термины',           title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Псевдоклассы и анимации: интерфейс оживает',
      title_en: 'Pseudo-classes and animations: the interface comes alive',
      body_ru: 'Статичный сайт — это прошлый век. :hover меняет стиль при наведении. transition делает переходы плавными. @keyframes создаёт сложные анимации. Всё это — чистый CSS, без JavaScript.',
      body_en: 'A static site is old news. :hover changes style on hover. transition makes changes smooth. @keyframes creates complex animations. All pure CSS — no JavaScript needed.',
    },
    {
      id: 's2',
      type: 'concept',
      title_ru: 'Псевдоклассы: стили для состояний',
      title_en: 'Pseudo-classes: styles for states',
      body_ru: 'Псевдоклассы описывают состояние элемента. Начинаются с одного двоеточия. Браузер применяет их автоматически при нужном состоянии.',
      body_en: 'Pseudo-classes describe the state of an element. They start with a single colon. The browser applies them automatically when the state matches.',
      bullets: [
        { text_ru: ':hover — курсор наведён на элемент', text_en: ':hover — cursor is over the element' },
        { text_ru: ':focus — элемент в фокусе (keyboard/click)', text_en: ':focus — element is focused (keyboard/click)' },
        { text_ru: ':active — элемент нажат', text_en: ':active — element is being pressed' },
        { text_ru: ':nth-child(n) — n-й дочерний элемент', text_en: ':nth-child(n) — the nth child element' },
        { text_ru: ':first-child / :last-child — первый/последний', text_en: ':first-child / :last-child — first/last child' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Псевдоэлементы ::before и ::after',
      title_en: 'Pseudo-elements ::before and ::after',
      body_ru: '::before и ::after создают виртуальные дочерние элементы внутри элемента. Требуют content (можно пустой). Отлично подходят для декоративных элементов без лишнего HTML.',
      body_en: '::before and ::after create virtual child elements inside an element. They require content (can be empty). Perfect for decorative elements without extra HTML.',
      bullets: [
        { text_ru: 'Двойное :: отличает их от псевдоклассов (:)', text_en: 'Double :: distinguishes them from pseudo-classes (:)' },
        { text_ru: 'content: "" — обязательное свойство (можно пустое)', text_en: 'content: "" — required property (can be empty)' },
        { text_ru: '::before — перед содержимым элемента', text_en: '::before — before the element content' },
        { text_ru: '::after — после содержимого элемента', text_en: '::after — after the element content' },
        { text_ru: 'Можно стилизовать как обычный элемент', text_en: 'Can be styled like a regular element' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Строим hover-анимацию кнопки',
      title_en: 'Building a button hover animation',
      body_ru: 'Смотри как transition делает изменение цвета кнопки плавным.',
      body_en: 'Watch how transition makes a button color change smooth.',
      animMode: 'preview',
      animSteps: [
        {
          code: `.btn {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}`,
          comment_ru: '1. Обычная кнопка — изменение стиля мгновенное',
          comment_en: '1. Plain button — style change is instant',
          preview: '[  Нажми меня  ]',
        },
        {
          code: `.btn {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

.btn:hover {
  background: #1d4ed8; /* темнее при наведении */
}`,
          comment_ru: '2. :hover — цвет меняется при наведении (резко)',
          comment_en: '2. :hover — color changes on hover (abruptly)',
          preview: '[  Нажми меня  ]  ← при наведении темнеет',
        },
        {
          code: `.btn {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.3s ease; /* плавно */
}

.btn:hover {
  background: #1d4ed8;
}`,
          comment_ru: '3. transition: background 0.3s ease — плавный переход за 0.3с',
          comment_en: '3. transition: background 0.3s ease — smooth 0.3s transition',
          preview: '[  Нажми меня  ]  ← плавно темнеет',
        },
        {
          code: `.btn {
  background: #3b82f6;
  color: white;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  transform: translateY(0);
  box-shadow: 0 4px 12px rgba(59,130,246,0.3);
}

.btn:hover {
  background: #1d4ed8;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59,130,246,0.4);
}

.btn:active {
  transform: translateY(1px);
  box-shadow: none;
}`,
          comment_ru: '4. Полный эффект: подъём при hover, нажатие при active',
          comment_en: '4. Full effect: lift on hover, press on active',
          preview: '[  Нажми меня  ] ↑ ← при hover поднимается',
        },
      ],
    },
    {
      id: 's5',
      type: 'compare',
      title_ru: 'transition vs @keyframes/animation',
      title_en: 'transition vs @keyframes/animation',
      body_ru: 'Два инструмента для движения в CSS. Выбирай нужный по ситуации.',
      body_en: 'Two tools for motion in CSS. Choose the right one for the situation.',
      compareLeft: {
        label_ru: 'transition — простые переходы',
        label_en: 'transition — simple transitions',
        items_ru: [
          'Переход между двумя состояниями',
          'Запускается по триггеру (:hover, :focus)',
          'transition: свойство длительность timing',
          'Для кнопок, карточек, меню',
          'Просто писать, легко читать',
        ],
        items_en: [
          'Transition between two states',
          'Triggered by event (:hover, :focus)',
          'transition: property duration timing',
          'For buttons, cards, menus',
          'Simple to write, easy to read',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: '@keyframes — сложные анимации',
        label_en: '@keyframes — complex animations',
        items_ru: [
          'Несколько состояний (0%, 50%, 100%)',
          'Запускается автоматически',
          'animation: name duration timing iteration',
          'Для спиннеров, пульсации, сложных эффектов',
          'Больше контроля, сложнее настройка',
        ],
        items_en: [
          'Multiple states (0%, 50%, 100%)',
          'Runs automatically',
          'animation: name duration timing iteration',
          'For spinners, pulses, complex effects',
          'More control, more complex to set up',
        ],
        color: 'green',
      },
    },
    {
      id: 's6',
      type: 'code',
      title_ru: '@keyframes и animation',
      title_en: '@keyframes and animation',
      body_ru: '@keyframes задаёт шаги анимации. animation применяет её к элементу.',
      body_en: '@keyframes defines animation steps. animation applies it to an element.',
      code: `/* Спиннер загрузки */
@keyframes spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

/* Пульсация уведомления */
@keyframes pulse {
  0%   { transform: scale(1);    opacity: 1; }
  50%  { transform: scale(1.1);  opacity: 0.8; }
  100% { transform: scale(1);    opacity: 1; }
}

.badge {
  animation: pulse 2s ease-in-out infinite;
}`,
      codeLang: 'css',
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'nth-child и ::before в практике',
      title_en: 'nth-child and ::before in practice',
      body_ru: 'nth-child и псевдоэлементы дают точечный контроль без лишних классов.',
      body_en: 'nth-child and pseudo-elements give precise control without extra classes.',
      code: `/* Чередование цветов строк таблицы */
tr:nth-child(even) { background: #f8fafc; }
tr:nth-child(odd)  { background: white; }

/* Первый элемент особый */
li:first-child { font-weight: bold; }
li:last-child  { border-bottom: none; }

/* Декоративная линия через ::before */
.section-title {
  position: relative;
  padding-left: 16px;
}

.section-title::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: #3b82f6;
  border-radius: 2px;
}`,
      codeLang: 'css',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'transform и opacity — самые производительные CSS-свойства для анимации. Браузер анимирует их через GPU, не вызывая reflow (пересчёт геометрии). Избегай анимировать width, height, margin, padding — они заставляют браузер пересчитывать всю страницу.',
      body_en: 'transform and opacity are the most performant CSS properties to animate. The browser animates them on the GPU without triggering reflow (geometry recalculation). Avoid animating width, height, margin, padding — they force the browser to recalculate the entire page.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Оживи свой интерфейс!',
      title_en: 'Bring your interface to life!',
      body_ru: 'Создай кнопку с hover-эффектом (плавное изменение цвета и подъём через transform). Добавь спиннер загрузки через @keyframes. Используй ::before для декоративного элемента.',
      body_en: 'Create a button with a hover effect (smooth color change and lift via transform). Add a loading spinner with @keyframes. Use ::before for a decorative element.',
    },
  ],

  content: {
    intro_ru: `Псевдоклассы и анимации превращают статичный HTML в живой интерфейс.
:hover, :focus, :active — реагируют на действия пользователя.
::before и ::after — добавляют декоративные элементы без лишнего HTML.
transition и @keyframes — управляют плавностью любых изменений.
Всё это работает без единой строки JavaScript.`,
    intro_en: `Pseudo-classes and animations turn static HTML into a living interface.
:hover, :focus, :active — react to user actions.
::before and ::after — add decorative elements without extra HTML.
transition and @keyframes — control the smoothness of any change.
All of this works without a single line of JavaScript.`,

    blocks: [
      {
        sectionId: 'pseudo-classes',
        heading_ru: 'Псевдоклассы',
        heading_en: 'Pseudo-classes',
        text_ru: `Псевдоклассы применяют стили в зависимости от состояния элемента.
Синтаксис: селектор:псевдокласс { стили }

:hover — при наведении мыши
:focus — элемент в фокусе (ввод текста, Tab-навигация)
:active — при нажатии
:nth-child(n) — каждый n-й дочерний элемент
:first-child, :last-child — первый/последний из братских`,
        text_en: `Pseudo-classes apply styles based on the element's state.
Syntax: selector:pseudo-class { styles }

:hover — on mouse over
:focus — element is focused (text input, Tab navigation)
:active — while being pressed
:nth-child(n) — every nth child element
:first-child, :last-child — first/last among siblings`,
        code: `a:hover { color: #3b82f6; text-decoration: underline; }
input:focus { outline: 2px solid #3b82f6; border-color: #3b82f6; }
button:active { transform: scale(0.98); }

/* Каждая вторая строка */
li:nth-child(even) { background: #f1f5f9; }
/* Каждая третья строка */
li:nth-child(3n) { font-weight: bold; }

li:first-child { border-top: none; }
li:last-child  { border-bottom: none; }`,
        codeLang: 'css',
      },
      {
        sectionId: 'pseudo-elements',
        heading_ru: 'Псевдоэлементы ::before и ::after',
        heading_en: 'Pseudo-elements ::before and ::after',
        text_ru: `::before вставляет виртуальный элемент перед содержимым.
::after вставляет виртуальный элемент после содержимого.
Оба требуют свойство content (даже если пустое: content: "").
Ведут себя как inline-элементы по умолчанию.
Используй display:block или position:absolute для гибкости.`,
        text_en: `::before inserts a virtual element before the content.
::after inserts a virtual element after the content.
Both require the content property (even if empty: content: "").
They behave as inline elements by default.
Use display:block or position:absolute for flexibility.`,
        code: `/* Иконка перед ссылкой */
a.external::after {
  content: " ↗";
  font-size: 0.8em;
  color: #94a3b8;
}

/* Декоративная подчёркивающая линия */
.link-underline {
  position: relative;
}
.link-underline::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}
.link-underline:hover::after {
  width: 100%; /* линия выезжает при hover */
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'transition',
        heading_ru: 'transition — плавные переходы',
        heading_en: 'transition — smooth transitions',
        text_ru: `transition задаёт плавный переход между значениями свойства.
Синтаксис: transition: свойство длительность timing-function задержка;

Timing functions:
• ease (по умолчанию) — медленно, быстро, медленно
• linear — равномерно
• ease-in — медленный старт
• ease-out — медленный финиш
• cubic-bezier(x1,y1,x2,y2) — кастомная кривая`,
        text_en: `transition sets a smooth transition between property values.
Syntax: transition: property duration timing-function delay;

Timing functions:
• ease (default) — slow, fast, slow
• linear — constant speed
• ease-in — slow start
• ease-out — slow end
• cubic-bezier(x1,y1,x2,y2) — custom curve`,
        code: `.card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 24px rgba(0,0,0,0.15);
}

/* Несколько свойств — через запятую */
.btn {
  transition:
    background 0.2s ease,
    transform  0.15s ease,
    box-shadow 0.2s ease;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'keyframes',
        heading_ru: '@keyframes и animation',
        heading_en: '@keyframes and animation',
        text_ru: `@keyframes описывает шаги анимации в процентах (или from/to).
animation связывает элемент с анимацией.

Свойства animation:
• animation-name — имя @keyframes
• animation-duration — длительность
• animation-iteration-count — повторения (infinite)
• animation-timing-function — кривая
• animation-delay — задержка старта
• animation-direction — направление (alternate)`,
        text_en: `@keyframes describes animation steps in percentages (or from/to).
animation links an element to the animation.

animation properties:
• animation-name — @keyframes name
• animation-duration — duration
• animation-iteration-count — repetitions (infinite)
• animation-timing-function — curve
• animation-delay — start delay
• animation-direction — direction (alternate)`,
        code: `/* Появление снизу */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.card {
  animation: fadeInUp 0.5s ease forwards;
}

/* Задержка для каждой карточки */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.1s; }
.card:nth-child(3) { animation-delay: 0.2s; }`,
        codeLang: 'css',
      },
      {
        sectionId: 'patterns',
        heading_ru: 'Практические паттерны',
        heading_en: 'Practical patterns',
        text_ru: `Самые полезные анимационные паттерны:
1. Hover-карточка: подъём + тень
2. Кнопка: цвет + масштаб
3. Спиннер: вращение через @keyframes
4. Skeleton loading: пульсирующая загрузка
5. Анимированное подчёркивание ссылки`,
        text_en: `The most useful animation patterns:
1. Hover card: lift + shadow
2. Button: color + scale
3. Spinner: rotation via @keyframes
4. Skeleton loading: pulsing placeholder
5. Animated link underline`,
        code: `/* Skeleton loading */
@keyframes skeleton {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(
    90deg,
    #e2e8f0 25%,
    #f1f5f9 50%,
    #e2e8f0 75%
  );
  background-size: 200% 100%;
  animation: skeleton 1.5s ease infinite;
  border-radius: 4px;
}`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: анимированные карточки',
    title_en: 'Try it yourself: animated cards',
    instructions_ru: `Создай набор карточек с эффектами:
— :hover — подъём карточки (transform:translateY)
— transition — плавный переход 0.3s
— ::before — декоративная полоска сверху карточки
— @keyframes fadeIn — карточки появляются при загрузке
Бонус: добавь спиннер загрузки`,
    instructions_en: `Create a set of cards with effects:
— :hover — lift the card (transform:translateY)
— transition — smooth 0.3s transition
— ::before — decorative top strip on the card
— @keyframes fadeIn — cards appear on load
Bonus: add a loading spinner`,
    activeTabs: ['html', 'css'],
    starterCode: {
      html: `<div class="page">
  <h1>Наши услуги</h1>

  <div class="spinner" title="Загрузка..."></div>

  <div class="cards">
    <div class="card card--blue">
      <h3>Дизайн</h3>
      <p>Создаём красивые и удобные интерфейсы для вашего продукта.</p>
      <a href="#" class="link-underline">Подробнее</a>
    </div>
    <div class="card card--green">
      <h3>Разработка</h3>
      <p>Пишем чистый и поддерживаемый код на современных технологиях.</p>
      <a href="#" class="link-underline">Подробнее</a>
    </div>
    <div class="card card--purple">
      <h3>Маркетинг</h3>
      <p>Привлекаем целевую аудиторию через эффективные каналы.</p>
      <a href="#" class="link-underline">Подробнее</a>
    </div>
  </div>
</div>`,
      css: `* { box-sizing: border-box; margin: 0; padding: 0; }
body { font-family: sans-serif; background: #f8fafc; color: #0f172a; padding: 32px; }

h1 { text-align: center; margin-bottom: 32px; font-size: 2rem; }

/* Карточки */
.cards {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: center;
}

/* Анимация появления */
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.card {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 28px 24px 24px;
  width: 280px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
  overflow: hidden;
  cursor: pointer;

  /* Плавный переход */
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  /* Анимация появления */
  animation: fadeInUp 0.5s ease both;
}

/* Задержка для каждой карточки */
.card:nth-child(1) { animation-delay: 0s; }
.card:nth-child(2) { animation-delay: 0.15s; }
.card:nth-child(3) { animation-delay: 0.3s; }

/* Декоративная полоска ::before */
.card::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 4px;
  border-radius: 12px 12px 0 0;
}

.card--blue::before   { background: #3b82f6; }
.card--green::before  { background: #22c55e; }
.card--purple::before { background: #a855f7; }

/* Hover эффект */
.card:hover {
  transform: translateY(-6px);
  box-shadow: 0 16px 32px rgba(0,0,0,0.12);
}

.card h3 { margin-bottom: 12px; font-size: 1.2rem; }
.card p  { color: #64748b; line-height: 1.6; margin-bottom: 16px; }

/* Анимированное подчёркивание */
.link-underline {
  position: relative;
  color: #3b82f6;
  text-decoration: none;
  font-weight: 500;
}

.link-underline::after {
  content: "";
  position: absolute;
  left: 0; bottom: -2px;
  width: 0;
  height: 2px;
  background: #3b82f6;
  transition: width 0.3s ease;
}

.link-underline:hover::after { width: 100%; }

/* Спиннер */
@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  width: 36px; height: 36px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  margin: 0 auto 32px;
}`,
    },
    hints_ru: [
      'transition нужно писать на базовом элементе (не на :hover). Иначе обратный переход будет мгновенным.',
      '::before и ::after работают только если задано content: "" — даже для пустого декоративного элемента.',
    ],
    hints_en: [
      'transition must be written on the base element (not on :hover). Otherwise the reverse transition will be instant.',
      '::before and ::after only work if content: "" is set — even for an empty decorative element.',
    ],
  },

  keyTerms: [
    {
      term_ru: ':hover', term_en: ':hover',
      definition_ru: 'Псевдокласс. Применяет стили когда курсор наведён на элемент.',
      definition_en: 'Pseudo-class. Applies styles when the cursor is over the element.',
      example_ru: 'a:hover { color: blue; }',
      example_en: 'a:hover { color: blue; }',
    },
    {
      term_ru: '::before / ::after', term_en: '::before / ::after',
      definition_ru: 'Псевдоэлементы. Создают виртуальный элемент до/после содержимого. Требуют content.',
      definition_en: 'Pseudo-elements. Create a virtual element before/after content. Require content.',
      example_ru: '.icon::before { content: "★"; }',
      example_en: '.icon::before { content: "★"; }',
    },
    {
      term_ru: 'transition', term_en: 'transition',
      definition_ru: 'Делает изменение CSS-свойства плавным за заданное время.',
      definition_en: 'Makes a CSS property change smooth over a given duration.',
      example_ru: 'transition: background 0.3s ease;',
      example_en: 'transition: background 0.3s ease;',
    },
    {
      term_ru: '@keyframes', term_en: '@keyframes',
      definition_ru: 'Описывает шаги CSS-анимации. Используется вместе с animation.',
      definition_en: 'Describes the steps of a CSS animation. Used together with animation.',
      example_ru: '@keyframes spin { to { transform: rotate(360deg); } }',
      example_en: '@keyframes spin { to { transform: rotate(360deg); } }',
    },
    {
      term_ru: ':nth-child(n)', term_en: ':nth-child(n)',
      definition_ru: 'Псевдокласс для выбора n-го дочернего элемента. Поддерживает формулы: 2n, 2n+1.',
      definition_en: 'Pseudo-class for selecting the nth child. Supports formulas: 2n, 2n+1.',
      example_ru: 'li:nth-child(odd) { background: #f1f5f9; }',
      example_en: 'li:nth-child(odd) { background: #f1f5f9; }',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Для производительных анимаций используй только transform и opacity. Браузер обрабатывает их на GPU в отдельном слое, не пересчитывая остальную страницу. Анимация width/height/margin/top/left вызывает layout reflow — это до 10 раз медленнее!',
      text_en: 'For performant animations use only transform and opacity. The browser processes them on the GPU in a separate layer without recalculating the rest of the page. Animating width/height/margin/top/left triggers a layout reflow — up to 10 times slower!',
    },
    {
      text_ru: 'prefers-reduced-motion — медиа-запрос для пользователей, которые хотят меньше анимаций (вестибулярные расстройства, эпилепсия). @media (prefers-reduced-motion: reduce) { * { animation: none; } } — хорошая практика доступности.',
      text_en: 'prefers-reduced-motion is a media query for users who want less animation (vestibular disorders, epilepsy). @media (prefers-reduced-motion: reduce) { * { animation: none; } } — good accessibility practice.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой псевдокласс применяет стили при наведении курсора?',
      text_en: 'Which pseudo-class applies styles when the cursor hovers over an element?',
      options_ru: [':focus', ':active', ':hover', ':nth-child'],
      options_en: [':focus', ':active', ':hover', ':nth-child'],
      correctIndex: 2,
      explanation_ru: ':hover применяет стили когда указатель мыши находится над элементом.',
      explanation_en: ':hover applies styles when the mouse pointer is over the element.',
    },
    {
      id: 'q2',
      text_ru: 'Что обязательно нужно задать для ::before и ::after?',
      text_en: 'What must you always set for ::before and ::after?',
      options_ru: ['display: block', 'position: absolute', 'content', 'width и height'],
      options_en: ['display: block', 'position: absolute', 'content', 'width and height'],
      correctIndex: 2,
      explanation_ru: 'Без свойства content псевдоэлемент не отображается. Значение может быть пустой строкой: content: ""',
      explanation_en: 'Without the content property a pseudo-element is not rendered. The value can be an empty string: content: ""',
    },
    {
      id: 'q3',
      text_ru: 'Где нужно писать transition — на базовом элементе или на :hover?',
      text_en: 'Where should you write transition — on the base element or on :hover?',
      options_ru: [
        'На :hover — там происходит переход',
        'На базовом элементе — иначе обратный переход будет мгновенным',
        'На обоих — для надёжности',
        'Не важно где',
      ],
      options_en: [
        'On :hover — that is where the change happens',
        'On the base element — otherwise the reverse transition is instant',
        'On both — for reliability',
        'It does not matter',
      ],
      correctIndex: 1,
      explanation_ru: 'transition пишется на базовом элементе. Тогда он работает и при наведении, и при уходе курсора.',
      explanation_en: 'transition goes on the base element. That way it works both when hovering and when the cursor leaves.',
    },
    {
      id: 'q4',
      text_ru: 'Какие CSS-свойства лучше всего анимировать для производительности?',
      text_en: 'Which CSS properties are best to animate for performance?',
      options_ru: [
        'width и height',
        'margin и padding',
        'transform и opacity',
        'font-size и color',
      ],
      options_en: [
        'width and height',
        'margin and padding',
        'transform and opacity',
        'font-size and color',
      ],
      correctIndex: 2,
      explanation_ru: 'transform и opacity браузер анимирует на GPU без reflow. Остальные свойства вызывают пересчёт геометрии страницы.',
      explanation_en: 'transform and opacity are animated on the GPU without reflow. Other properties trigger page geometry recalculation.',
    },
    {
      id: 'q5',
      text_ru: 'Что такое @keyframes?',
      text_en: 'What is @keyframes?',
      options_ru: [
        'Псевдокласс для анимации',
        'Правило, описывающее шаги анимации для использования с animation',
        'Сокращение для transition',
        'Способ импортировать анимации',
      ],
      options_en: [
        'Pseudo-class for animation',
        'Rule describing animation steps for use with animation',
        'Shorthand for transition',
        'A way to import animations',
      ],
      correctIndex: 1,
      explanation_ru: '@keyframes задаёт шаги анимации (0%...100% или from/to). Применяется к элементу через свойство animation.',
      explanation_en: '@keyframes defines animation steps (0%...100% or from/to). Applied to an element via the animation property.',
    },
  ],
}
