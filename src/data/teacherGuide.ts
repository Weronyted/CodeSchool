export interface TeacherClass {
  slugs: string[]
  tips_ru: string[]
  tips_en: string[]
}

// Each entry = one 2-hour class session. Pairs of lessons per session,
// solo entry for complex standalone topics (semantics, final projects).
export const TEACHER_CLASSES: TeacherClass[] = [
  {
    slugs: ['intro-to-programming', 'git-github'],
    tips_ru: [
      'Начни с вопроса «Что такое алгоритм?» — пусть дети дадут примеры из жизни',
      'Покажи Git визуально: нарисуй граф коммитов на доске перед демо в терминале',
    ],
    tips_en: [
      'Start with "What is an algorithm?" — let students give everyday examples',
      'Show Git visually: draw a commit graph on the board before the terminal demo',
    ],
  },
  {
    slugs: ['intro-to-html', 'html-tags-elements'],
    tips_ru: [
      'Открой DevTools на любом популярном сайте — эффект «вау» гарантирован',
      'Аналогия: тег = слово в разметке, атрибут = уточнение к этому слову',
    ],
    tips_en: [
      'Open DevTools on any popular site — the "wow" effect is guaranteed',
      'Analogy: tag = word in markup, attribute = clarifier for the word',
    ],
  },
  {
    slugs: ['html-text-headings', 'html-lists'],
    tips_ru: [
      'Попроси студентов сверстать содержание реальной страницы: заголовки + абзацы',
      'Вложенные списки — частая ошибка: покажи правильную структуру тегов на примере',
    ],
    tips_en: [
      'Ask students to mark up a real page\'s content: headings + paragraphs',
      'Nested lists are a common mistake — show the correct tag structure with an example',
    ],
  },
  {
    slugs: ['html-links', 'html-images-media'],
    tips_ru: [
      'target="_blank" + rel="noopener noreferrer" — объясни зачем это нужно для безопасности',
      'alt текст: важен для доступности и SEO — попроси написать описательный alt',
    ],
    tips_en: [
      'target="_blank" + rel="noopener noreferrer" — explain the security reason',
      'alt text: important for accessibility and SEO — ask students to write descriptive alts',
    ],
  },
  {
    slugs: ['html-tables', 'html-forms'],
    tips_ru: [
      'Таблицы только для данных, не для вёрстки — объясни почему это важно',
      'Форма без action/method: покажи что происходит при submit и как это отлаживать',
    ],
    tips_en: [
      'Tables are for data, not layout — explain why this matters',
      'Form without action/method: show what happens on submit and how to debug it',
    ],
  },
  {
    slugs: ['html-semantics'],
    tips_ru: [
      'Покажи «div-суп» рядом с семантической версией — пусть сами скажут что лучше',
      'Связь с SEO: семантика помогает Google понять страницу — это реальная мотивация',
      'Задание: взять свой HTML-проект и заменить все незначимые div на семантику',
    ],
    tips_en: [
      'Show "div soup" next to the semantic version — let them say which is better',
      'SEO connection: semantics help Google understand the page — real motivation',
      'Assignment: take their HTML project and replace meaningless divs with semantic tags',
    ],
  },
  {
    slugs: ['intro-to-css', 'css-selectors'],
    tips_ru: [
      'CSS = одежда для HTML: используй эту метафору на протяжении всего CSS-модуля',
      'Специфичность — нарисуй на доске столбцы: тег (0,0,1) / класс (0,1,0) / ID (1,0,0)',
    ],
    tips_en: [
      'CSS = clothes for HTML: use this metaphor throughout the entire CSS module',
      'Specificity — draw columns on the board: tag (0,0,1) / class (0,1,0) / ID (1,0,0)',
    ],
  },
  {
    slugs: ['css-color-background', 'css-text-fonts'],
    tips_ru: [
      'Покажи color picker в DevTools: конвертируй HEX → RGB → HSL прямо на уроке',
      'Google Fonts: добавьте красивый шрифт вместе — студенты это запоминают',
    ],
    tips_en: [
      'Show the DevTools color picker: convert HEX → RGB → HSL live in class',
      'Google Fonts: add a nice font together in class — students always remember this',
    ],
  },
  {
    slugs: ['css-box-model', 'css-sizing-units'],
    tips_ru: [
      'box-sizing: border-box — покажи разницу на примере; без этого padding ломает расчёты',
      'em vs rem: сделай вложенные элементы и покажи как em «накапливается»',
    ],
    tips_en: [
      'box-sizing: border-box — show the difference live; without it padding breaks sizing',
      'em vs rem: create nested elements and show how em "accumulates"',
    ],
  },
  {
    slugs: ['css-flexbox-basics', 'css-flexbox-practice'],
    tips_ru: [
      'flexboxfroggy.com — отличный способ закрепить flexbox в игровой форме',
      'Нарисуй main axis и cross axis на доске: многие понимают только увидев схему',
    ],
    tips_en: [
      'flexboxfroggy.com — a great way to reinforce flexbox as a game',
      'Draw the main axis and cross axis on the board: many only understand when they see it',
    ],
  },
  {
    slugs: ['css-positioning', 'css-grid'],
    tips_ru: [
      'sticky: покажи навигацию, которая прилипает при скролле — сразу понятен смысл',
      'cssgridgarden.com — игра для закрепления CSS Grid, отлично подходит для практики',
    ],
    tips_en: [
      'sticky: show navigation that sticks on scroll — the purpose is immediately clear',
      'cssgridgarden.com — a game to reinforce CSS Grid, great for practice',
    ],
  },
  {
    slugs: ['css-responsive', 'css-pseudo-animations'],
    tips_ru: [
      'Mobile-first: покажи через DevTools как выглядит сайт на телефоне',
      'Анимация кнопки при hover — самое любимое задание у новичков, очень заразительно',
    ],
    tips_en: [
      'Mobile-first: use DevTools to show how the site looks on a phone',
      'Button hover animation — beginners\' favourite task, very contagious enthusiasm',
    ],
  },
  {
    slugs: ['intro-to-js', 'js-variables'],
    tips_ru: [
      'Первое что показываешь: открой консоль и напиши 2 + 2 — JavaScript это работает',
      'let vs const: правило — по умолчанию const, let только когда значение меняется',
    ],
    tips_en: [
      'First thing to show: open the console and type 2 + 2 — JavaScript just works',
      'let vs const: default to const, use let only when the value needs to change',
    ],
  },
  {
    slugs: ['js-operators', 'js-strings'],
    tips_ru: [
      '=== vs ==: всегда используй ===, покажи что "5" == 5 возвращает true — это шокирует',
      'Шаблонные строки: студентам нравится их читаемость по сравнению с конкатенацией',
    ],
    tips_en: [
      '=== vs ==: always use ===, show that "5" == 5 returns true — this shocks students',
      'Template literals: students love their readability compared to concatenation',
    ],
  },
  {
    slugs: ['js-conditions', 'js-loops'],
    tips_ru: [
      'Тернарный оператор: показывай как сокращение для простых if/else, не как замену',
      'Бесконечный while: покажи что происходит (в отдельной вкладке!) и как остановить',
    ],
    tips_en: [
      'Ternary operator: show as shorthand for simple if/else, not a replacement for complex logic',
      'Infinite while: show what happens (in a separate tab!) and how to stop it',
    ],
  },
  {
    slugs: ['js-functions', 'js-arrow-functions'],
    tips_ru: [
      'DRY принцип: покажи код с повторением → с функцией → разница очевидна',
      'Arrow this: важно для React — покажи как теряется this в обычной функции-колбэке',
    ],
    tips_en: [
      'DRY principle: show repeated code → with a function → the difference is obvious',
      'Arrow this: important for React — show how this is lost in a regular callback',
    ],
  },
  {
    slugs: ['js-arrays', 'js-array-methods'],
    tips_ru: [
      'Нумерация с 0: аналогия с этажами в лифте (0-й этаж = первый)',
      'map/filter/reduce: используй реальные данные — список студентов, список оценок',
    ],
    tips_en: [
      'Zero-indexing: analogy with elevator floors (floor 0 = ground floor)',
      'map/filter/reduce: use real data — a list of students, a list of grades',
    ],
  },
  {
    slugs: ['js-objects', 'js-scope'],
    tips_ru: [
      'Объекты = анкета: ключи это вопросы, значения это ответы',
      'Замыкание — сложная тема, не спеши: дай 2–3 примера перед практикой',
    ],
    tips_en: [
      'Objects = a form: keys are questions, values are answers',
      'Closure is a hard topic, don\'t rush: give 2–3 examples before practice',
    ],
  },
  {
    slugs: ['js-dom', 'js-events'],
    tips_ru: [
      'DOM: открой Elements в DevTools, разверни дерево — очень наглядно',
      'Делегирование событий: покажи на списке, где элементы добавляются динамически',
    ],
    tips_en: [
      'DOM: open Elements in DevTools, expand the tree — very visual',
      'Event delegation: show on a list where elements are added dynamically',
    ],
  },
  {
    slugs: ['js-errors-debugging', 'js-localstorage'],
    tips_ru: [
      'Breakpoints в DevTools — это навык, который сэкономит студентам часы работы',
      'localStorage: открой Application → Storage в DevTools, покажи как данные сохраняются',
    ],
    tips_en: [
      'Breakpoints in DevTools — a skill that will save students hours of work',
      'localStorage: open Application → Storage in DevTools, show how data is saved',
    ],
  },
  {
    slugs: ['js-async-basics', 'js-modules'],
    tips_ru: [
      'Путь эволюции: callback → Promise → async/await — покажи все три на одном примере',
      'Модули: создайте прямо на уроке проект из 3 файлов (utils.js, data.js, main.js)',
    ],
    tips_en: [
      'Evolution path: callback → Promise → async/await — show all three on one example',
      'Modules: create a 3-file project together in class (utils.js, data.js, main.js)',
    ],
  },
  {
    slugs: ['js-final-project'],
    tips_ru: [
      'Урок-лаборатория: студенты работают самостоятельно, ты ходишь и помогаешь',
      'Разбей на этапы на доске: HTML-скелет → CSS-стиль → JS-логика',
      'Финал: каждый показывает проект классу 1–2 мин — это мотивирует очень сильно',
    ],
    tips_en: [
      'Lab lesson: students work independently, you walk around and help',
      'Break into stages on the board: HTML skeleton → CSS style → JS logic',
      'Finale: each student shows their project for 1–2 min — very motivating',
    ],
  },
  {
    slugs: ['react-intro', 'react-props'],
    tips_ru: [
      'Зачем React: покажи как это делается на чистом JS → потом на React → разница ощутима',
      'Props = параметры функции: компонент это функция, props это её аргументы',
    ],
    tips_en: [
      'Why React: show the vanilla JS approach → then React → the difference is tangible',
      'Props = function parameters: a component is a function, props are its arguments',
    ],
  },
  {
    slugs: ['react-state', 'react-useeffect'],
    tips_ru: [
      'State: сначала покажи что обычная переменная не обновляет UI — это создаёт потребность',
      'useEffect dependency array: самая частая ошибка новичков, объясни детально',
    ],
    tips_en: [
      'State: first show that a regular variable doesn\'t update the UI — this creates the need',
      'useEffect dependency array: the most common beginner mistake, explain in detail',
    ],
  },
  {
    slugs: ['react-lists', 'react-forms'],
    tips_ru: [
      'key в списках: объясни что React использует key для reconciliation — без key баги',
      'Контролируемые поля: покажи разницу — без useState vs с useState',
    ],
    tips_en: [
      'key in lists: explain that React uses key for reconciliation — bugs without it',
      'Controlled inputs: show the difference — without useState vs with useState',
    ],
  },
  {
    slugs: ['react-project'],
    tips_ru: [
      'До кода: нарисуй компонентное дерево на доске вместе со студентами',
      'Lift state up: момент когда студенты сами видят зачем нужно поднимать состояние',
      'Финал: попроси добавить свою фичу (фильтр, цвета, drag-and-drop) — творческая свобода',
    ],
    tips_en: [
      'Before code: draw the component tree on the board together with students',
      'Lift state up: the moment students see for themselves why state lifting is needed',
      'Final: ask them to add their own feature (filter, colors, drag-and-drop) — creative freedom',
    ],
  },
]
