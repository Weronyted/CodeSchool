import type { Lesson } from '@/types/lesson'

export const domManipulation: Lesson = {
  slug: 'dom-manipulation',
  category: 'JS',
  readTime: 11,
  icon: '🎭',

  title_ru: 'Работа с DOM',
  title_en: 'DOM Manipulation',

  description_ru: 'querySelector, textContent, classList, addEventListener — делаем страницу живой.',
  description_en: 'querySelector, textContent, classList, addEventListener — making the page alive.',

  sections: [
    { id: 'what-is-dom', title_ru: 'Что такое DOM',          title_en: 'What is the DOM' },
    { id: 'select',      title_ru: 'Выбор элементов',         title_en: 'Selecting elements' },
    { id: 'modify',      title_ru: 'Изменение содержимого',   title_en: 'Modifying content' },
    { id: 'style',       title_ru: 'Изменение стилей',        title_en: 'Modifying styles' },
    { id: 'events',      title_ru: 'События',                 title_en: 'Events' },
    { id: 'key-terms',   title_ru: 'Ключевые термины',        title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'DOM: JavaScript управляет страницей',
      title_en: 'DOM: JavaScript controls the page',
      body_ru: 'DOM (Document Object Model) — дерево всех HTML-элементов в памяти браузера. JavaScript обращается к этому дереву, меняет элементы, реагирует на клики. Так страницы становятся интерактивными.',
      body_en: 'The DOM (Document Object Model) is a tree of all HTML elements in browser memory. JavaScript accesses this tree, changes elements, and responds to clicks. That is how pages become interactive.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'DOM как кукольный театр',
      title_en: 'The DOM is like a puppet theatre',
      body_ru: 'Кукловод (JavaScript) управляет куклами (HTML-элементами) через нити. Он видит всех кукол, может двигать их, менять их костюмы и реагировать на аплодисменты (события) зрителей.',
      body_en: 'The puppeteer (JavaScript) controls the puppets (HTML elements) through strings. He sees all puppets, can move them, change their costumes and react to applause (events) from the audience.',
      visual: {
        kind: 'emoji',
        emojis: ['🎭', '🤖', '🕹️'],
      },
      bullets: [
        { text_ru: '🎭 HTML — куклы: элементы на сцене', text_en: '🎭 HTML — puppets: elements on stage' },
        { text_ru: '🤖 JavaScript — кукловод: управляет элементами', text_en: '🤖 JavaScript — puppeteer: controls elements' },
        { text_ru: '🕹️ События — аплодисменты: клики, ввод, движение мыши', text_en: '🕹️ Events — applause: clicks, input, mouse movement' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Выбор элементов',
      title_en: 'Selecting elements',
      body_ru: 'querySelector находит первый элемент по CSS-селектору. querySelectorAll — все совпадения. getElementById — по id. Используй querySelector — он работает с любым CSS-селектором.',
      body_en: 'querySelector finds the first element matching a CSS selector. querySelectorAll finds all matches. getElementById finds by id. Use querySelector — it works with any CSS selector.',
      bullets: [
        { text_ru: '🎯 querySelector("h1") — первый h1 на странице', text_en: '🎯 querySelector("h1") — first h1 on the page' },
        { text_ru: '🎯 querySelector(".card") — первый элемент с классом card', text_en: '🎯 querySelector(".card") — first element with class card' },
        { text_ru: '🎯 querySelector("#title") — элемент с id="title"', text_en: '🎯 querySelector("#title") — element with id="title"' },
        { text_ru: '📋 querySelectorAll("li") — список всех li', text_en: '📋 querySelectorAll("li") — list of all li elements' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Строим счётчик кликов шаг за шагом',
      title_en: 'Building a click counter step by step',
      body_ru: 'Находим кнопку, слушаем клики, меняем текст на странице.',
      body_en: 'Find the button, listen for clicks, update text on the page.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<!-- HTML -->
<button id="btn">Нажми меня!</button>
<p id="counter">Нажатий: 0</p>`,
          comment_ru: '1. HTML: кнопка с id="btn" и абзац с id="counter"',
          comment_en: '1. HTML: button with id="btn" and paragraph with id="counter"',
          preview: '<button style="padding:8px 16px;background:#4f46e5;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer">Нажми меня!</button><p style="margin-top:8px;color:#94a3b8;font-size:14px">Нажатий: 0</p>',
        },
        {
          code: `const btn = document.getElementById("btn");
const counter = document.getElementById("counter");`,
          comment_ru: '2. JS: получаем ссылки на оба элемента',
          comment_en: '2. JS: get references to both elements',
          preview: '<button style="padding:8px 16px;background:#4f46e5;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer">Нажми меня!</button><p style="margin-top:8px;color:#94a3b8;font-size:14px">Нажатий: 0</p>',
        },
        {
          code: `let count = 0;
btn.addEventListener("click", () => {
  count++;
  counter.textContent = "Нажатий: " + count;
});`,
          comment_ru: '3. Слушаем клик, увеличиваем счётчик, меняем текст',
          comment_en: '3. Listen for click, increment counter, update text',
          preview: '<button style="padding:8px 16px;background:#4f46e5;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer">Нажми меня!</button><p style="margin-top:8px;color:#22c55e;font-size:14px;font-weight:600">Нажатий: 3 ✓</p>',
        },
        {
          code: `// Добавим смену цвета через classList
btn.addEventListener("click", () => {
  count++;
  counter.textContent = "Нажатий: " + count;
  if (count >= 5) {
    btn.classList.add("success");
  }
});`,
          comment_ru: '4. Бонус: добавляем класс при 5+ нажатиях',
          comment_en: '4. Bonus: add class after 5+ clicks',
          preview: '<button style="padding:8px 16px;background:#22c55e;color:white;border:none;border-radius:8px;font-size:14px;cursor:pointer">Нажми меня!</button><p style="margin-top:8px;color:#22c55e;font-size:14px;font-weight:600">Нажатий: 5 🎉</p>',
        },
      ],
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Изменение содержимого и стилей',
      title_en: 'Changing content and styles',
      body_ru: 'textContent меняет текст (безопасно). classList добавляет/удаляет/переключает CSS-классы (лучший способ менять стили). style — прямое изменение (только для динамических значений).',
      body_en: 'textContent changes text (safe). classList adds/removes/toggles CSS classes (the best way to change styles). style — direct change (only for dynamic values).',
      bullets: [
        { text_ru: '📝 el.textContent = "Новый текст" — безопасно', text_en: '📝 el.textContent = "New text" — safe' },
        { text_ru: '➕ el.classList.add("active") — добавить класс', text_en: '➕ el.classList.add("active") — add class' },
        { text_ru: '➖ el.classList.remove("old") — убрать класс', text_en: '➖ el.classList.remove("old") — remove class' },
        { text_ru: '🔄 el.classList.toggle("dark") — переключить класс', text_en: '🔄 el.classList.toggle("dark") — toggle class' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'События addEventListener',
      title_en: 'Events with addEventListener',
      body_ru: 'addEventListener(событие, функция) добавляет обработчик. Популярные события: click, input, submit, mouseover, keydown.',
      body_en: 'addEventListener(event, function) attaches a handler. Popular events: click, input, submit, mouseover, keydown.',
      code: `const button = document.querySelector("#myBtn");

// Клик по кнопке
button.addEventListener("click", () => {
  alert("Нажали!");
});

// Ввод в поле
const input = document.querySelector("input");
input.addEventListener("input", (e) => {
  console.log("Ввели:", e.target.value);
});

// Наведение мыши
button.addEventListener("mouseover", () => {
  button.style.opacity = "0.8";
});
button.addEventListener("mouseout", () => {
  button.style.opacity = "1";
});`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'compare',
      title_ru: 'textContent vs innerHTML',
      title_en: 'textContent vs innerHTML',
      body_ru: 'Оба меняют содержимое элемента — но очень по-разному.',
      body_en: 'Both change element content — but in very different ways.',
      compareLeft: {
        label_ru: 'textContent ✅',
        label_en: 'textContent ✅',
        items_ru: [
          'el.textContent = "Текст"',
          'Только текст — теги не интерпретируются',
          'Безопасно: XSS-атака невозможна',
          'Используй по умолчанию',
        ],
        items_en: [
          'el.textContent = "Text"',
          'Text only — tags not interpreted',
          'Safe: XSS attack impossible',
          'Use by default',
        ],
        color: 'green',
      },
      compareRight: {
        label_ru: 'innerHTML ⚠️',
        label_en: 'innerHTML ⚠️',
        items_ru: [
          'el.innerHTML = "<b>Текст</b>"',
          'Интерпретирует HTML-теги',
          'Опасно с пользовательскими данными (XSS)',
          'Только для доверенного HTML',
        ],
        items_en: [
          'el.innerHTML = "<b>Text</b>"',
          'Interprets HTML tags',
          'Dangerous with user data (XSS)',
          'Only for trusted HTML',
        ],
        color: 'red',
      },
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Event Delegation — мощный паттерн. Вместо добавления обработчика к каждому элементу списка, добавь один обработчик на родителя. Используй e.target чтобы узнать, по какому именно дочернему элементу кликнули. Это экономит память и работает даже для элементов, добавленных позже.',
      body_en: 'Event Delegation is a powerful pattern. Instead of adding a handler to every list item, add one handler to the parent. Use e.target to find which child element was clicked. This saves memory and works even for elements added later.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Оживи свою страницу!',
      title_en: 'Make your page come alive!',
      body_ru: 'Добавь кнопку на страницу. При клике — меняй текст, добавляй класс, переключай тему. Всё это теперь в твоих руках.',
      body_en: 'Add a button to a page. On click — change text, add a class, toggle a theme. All of this is now in your hands.',
    },
  ],

  content: {
    intro_ru: `DOM (Document Object Model) — программный интерфейс для HTML-документа. Когда браузер
загружает страницу, он создаёт DOM-дерево из всех HTML-элементов. JavaScript может обращаться
к любому элементу, изменять его, добавлять новые и реагировать на действия пользователя.
Именно это делает веб-страницы интерактивными!`,
    intro_en: `The DOM (Document Object Model) is the programming interface for an HTML document.
When a browser loads a page it creates a DOM tree from all the HTML elements. JavaScript can
access any element, modify it, add new ones, and respond to user actions.
That is exactly what makes web pages interactive!`,

    blocks: [
      {
        sectionId: 'what-is-dom',
        heading_ru: 'Что такое DOM',
        heading_en: 'What is the DOM',
        text_ru: `DOM — дерево объектов в памяти браузера. Каждый HTML-тег — это узел дерева.
JavaScript получает доступ через объект document.

document — корень дерева. Из него ищем все элементы.
Изменения в DOM немедленно отражаются на странице.`,
        text_en: `The DOM is a tree of objects in browser memory. Each HTML tag is a tree node.
JavaScript accesses it through the document object.

document is the root of the tree. From it we search for all elements.
Changes to the DOM are immediately reflected on the page.`,
      },
      {
        sectionId: 'select',
        heading_ru: 'Выбор элементов',
        heading_en: 'Selecting elements',
        text_ru: `Четыре способа найти элемент:
• querySelector(selector) — первый по CSS-селектору (самый универсальный)
• querySelectorAll(selector) — все по CSS-селектору (возвращает NodeList)
• getElementById(id) — по атрибуту id (быстро, только один)
• getElementsByClassName(class) — по имени класса (живой HTMLCollection)

querySelector поддерживает любые CSS-селекторы: "#id", ".class", "div > p".`,
        text_en: `Four ways to find an element:
• querySelector(selector) — first by CSS selector (most versatile)
• querySelectorAll(selector) — all by CSS selector (returns NodeList)
• getElementById(id) — by id attribute (fast, single element)
• getElementsByClassName(class) — by class name (live HTMLCollection)

querySelector supports any CSS selector: "#id", ".class", "div > p".`,
        code: `// По CSS-селектору
const h1    = document.querySelector("h1");
const card  = document.querySelector(".card");
const title = document.querySelector("#title");

// Все элементы
const items = document.querySelectorAll("li");
items.forEach(item => console.log(item.textContent));

// По id (чуть быстрее)
const btn = document.getElementById("myBtn");`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'modify',
        heading_ru: 'Изменение содержимого',
        heading_en: 'Modifying content',
        text_ru: `textContent — текстовое содержимое (безопасно).
innerHTML — HTML-содержимое (опасно с пользовательскими данными — XSS).
setAttribute/getAttribute — работа с атрибутами.
classList — управление CSS-классами (предпочтительный способ менять стили).`,
        text_en: `textContent — text content (safe).
innerHTML — HTML content (dangerous with user data — XSS).
setAttribute/getAttribute — working with attributes.
classList — managing CSS classes (the preferred way to change styles).`,
        code: `const heading = document.querySelector("h1");

// Изменить текст
heading.textContent = "Новый заголовок";

// Добавить/убрать/переключить класс
heading.classList.add("highlight");
heading.classList.remove("old-class");
heading.classList.toggle("active");

// Атрибуты
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href"));`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'style',
        heading_ru: 'Изменение стилей',
        heading_en: 'Modifying styles',
        text_ru: `Два способа менять стили:
1. Через classList (предпочтительно) — добавляй/убирай классы из CSS
2. Через style — прямое изменение (только для вычисляемых значений)

classList лучше: стили остаются в CSS-файле, легче поддерживать.
style используй только когда значение вычисляется в JS (ширина, позиция).`,
        text_en: `Two ways to change styles:
1. Via classList (preferred) — add/remove classes from CSS
2. Via style — direct change (only for computed values)

classList is better: styles stay in the CSS file, easier to maintain.
Use style only when the value is computed in JS (width, position).`,
        code: `const box = document.querySelector(".box");

// Через classList (лучший способ)
box.classList.add("active");    // Добавляет класс
box.classList.remove("hidden"); // Убирает класс
box.classList.toggle("dark");   // Переключает

// Через style (для динамических значений)
box.style.width = "200px";
box.style.backgroundColor = "royalblue"; // camelCase!
box.style.transform = \`translateX(\${offset}px)\`;`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'events',
        heading_ru: 'События',
        heading_en: 'Events',
        text_ru: `addEventListener(тип, функция) — добавляет обработчик события.
Функция принимает объект события e (event object).
e.target — элемент, на котором сработало событие.
e.preventDefault() — отменяет стандартное поведение (например, отправку формы).

Популярные события:
• click — клик мыши
• input — ввод текста
• submit — отправка формы
• keydown — нажатие клавиши
• mouseover / mouseout — наведение / уход мыши`,
        text_en: `addEventListener(type, function) — attaches an event handler.
The function receives an event object e.
e.target — the element that triggered the event.
e.preventDefault() — cancels the default behaviour (e.g., form submission).

Popular events:
• click — mouse click
• input — text input
• submit — form submission
• keydown — key press
• mouseover / mouseout — mouse enter / leave`,
        code: `const btn = document.getElementById("myBtn");
const counter = document.getElementById("counter");
let count = 0;

// Счётчик кликов
btn.addEventListener("click", () => {
  count++;
  counter.textContent = "Нажатий: " + count;
});

// Отправка формы
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Не перезагружать страницу
  const value = document.querySelector("input").value;
  console.log("Отправлено:", value);
});`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: DOM',
    title_en: 'Try it yourself: DOM',
    instructions_ru: `Создай интерактивный счётчик:
— Кнопка "+": увеличивает счётчик
— Кнопка "-": уменьшает (не ниже 0)
— При счёте >= 10: число становится зелёным
— Кнопка "Сброс": возвращает 0`,
    instructions_en: `Create an interactive counter:
— "+" button: increment the counter
— "−" button: decrement (not below 0)
— At count >= 10: number turns green
— "Reset" button: returns to 0`,
    activeTabs: ['html', 'javascript'],
    starterCode: {
      html: `<div style="text-align:center; padding:40px; font-family:sans-serif">
  <h2 id="count" style="font-size:3rem; margin:16px 0">0</h2>
  <div style="display:flex; gap:12px; justify-content:center">
    <button id="minus">−</button>
    <button id="reset">Сброс</button>
    <button id="plus">+</button>
  </div>
</div>`,
      javascript: `let count = 0;
const display = document.getElementById("count");

function updateDisplay() {
  display.textContent = count;
  display.style.color = count >= 10 ? "#22c55e" : "";
}

document.getElementById("plus").addEventListener("click", () => {
  count++;
  updateDisplay();
});

document.getElementById("minus").addEventListener("click", () => {
  if (count > 0) count--;
  updateDisplay();
});

document.getElementById("reset").addEventListener("click", () => {
  count = 0;
  updateDisplay();
});`,
    },
    hints_ru: [
      'Используй document.getElementById("id") чтобы найти элемент по id.',
      'textContent меняет текст элемента, style.color меняет цвет текста через JS.',
    ],
    hints_en: [
      'Use document.getElementById("id") to find an element by its id.',
      'textContent changes element text, style.color changes text colour via JS.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'DOM', term_en: 'DOM',
      definition_ru: 'Document Object Model — дерево объектов, представляющих HTML-страницу в памяти браузера.',
      definition_en: 'Document Object Model — a tree of objects representing the HTML page in browser memory.',
      example_ru: 'document — корень DOM, дающий доступ к всей странице',
      example_en: 'document — DOM root giving access to the whole page',
    },
    {
      term_ru: 'querySelector()', term_en: 'querySelector()',
      definition_ru: 'Метод, находящий первый HTML-элемент по CSS-селектору.',
      definition_en: 'A method that finds the first HTML element matching a CSS selector.',
      example_ru: 'document.querySelector(".card") — первый элемент с классом card',
      example_en: 'document.querySelector(".card") — first element with class card',
    },
    {
      term_ru: 'textContent', term_en: 'textContent',
      definition_ru: 'Свойство элемента для получения или установки текстового содержимого. Безопасная альтернатива innerHTML.',
      definition_en: 'Element property for getting or setting text content. A safe alternative to innerHTML.',
      example_ru: 'el.textContent = "Новый текст";',
      example_en: 'el.textContent = "New text";',
    },
    {
      term_ru: 'classList', term_en: 'classList',
      definition_ru: 'Объект для управления CSS-классами элемента (add, remove, toggle, contains).',
      definition_en: 'Object for managing an element\'s CSS classes (add, remove, toggle, contains).',
      example_ru: 'el.classList.toggle("dark");',
      example_en: 'el.classList.toggle("dark");',
    },
    {
      term_ru: 'addEventListener()', term_en: 'addEventListener()',
      definition_ru: 'Метод добавления обработчика события к элементу.',
      definition_en: 'A method for attaching an event handler to an element.',
      example_ru: 'btn.addEventListener("click", () => { ... });',
      example_en: 'btn.addEventListener("click", () => { ... });',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Когда используешь innerHTML с пользовательскими данными, злоумышленник может внедрить вредоносный код — это называется XSS-атака (Cross-Site Scripting). Всегда используй textContent для пользовательского ввода!',
      text_en: 'When using innerHTML with user data, an attacker can inject malicious code — this is called an XSS attack (Cross-Site Scripting). Always use textContent for user input!',
    },
    {
      text_ru: 'Event Delegation — мощный паттерн: один обработчик на родителе вместо обработчиков на каждом дочернем элементе. Работает через e.target. Это особенно полезно для динамически добавляемых элементов.',
      text_en: 'Event Delegation is a powerful pattern: one handler on the parent instead of handlers on each child. Works via e.target. Especially useful for dynamically added elements.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой метод найдёт первый элемент с классом "card"?',
      text_en: 'Which method finds the first element with class "card"?',
      options_ru: ['document.querySelector(".card")', 'document.findByClass("card")', 'document.getClass("card")', 'document.get(".card")'],
      options_en: ['document.querySelector(".card")', 'document.findByClass("card")', 'document.getClass("card")', 'document.get(".card")'],
      correctIndex: 0,
      explanation_ru: 'querySelector принимает CSS-селектор. Класс обозначается точкой: ".card". Это самый универсальный метод выбора.',
      explanation_en: 'querySelector takes a CSS selector. A class is denoted with a dot: ".card". This is the most versatile selection method.',
    },
    {
      id: 'q2',
      text_ru: 'Как безопасно изменить текст элемента, не затрагивая HTML-теги внутри?',
      text_en: 'How do you safely change an element\'s text without affecting HTML tags inside?',
      options_ru: ['innerHTML', 'textContent', 'value', 'text'],
      options_en: ['innerHTML', 'textContent', 'value', 'text'],
      correctIndex: 1,
      explanation_ru: 'textContent меняет только текстовое содержимое. innerHTML интерпретирует теги и опасен с пользовательскими данными (XSS).',
      explanation_en: 'textContent changes only the text content. innerHTML interprets tags and is dangerous with user data (XSS).',
    },
    {
      id: 'q3',
      text_ru: 'Как добавить CSS-класс "active" к элементу el?',
      text_en: 'How do you add the CSS class "active" to element el?',
      options_ru: ['el.class = "active"', 'el.addClass("active")', 'el.classList.add("active")', 'el.style.class = "active"'],
      options_en: ['el.class = "active"', 'el.addClass("active")', 'el.classList.add("active")', 'el.style.class = "active"'],
      correctIndex: 2,
      explanation_ru: 'classList — объект для управления классами. Методы: add(), remove(), toggle(), contains().',
      explanation_en: 'classList is an object for managing classes. Methods: add(), remove(), toggle(), contains().',
    },
    {
      id: 'q4',
      text_ru: 'Какое событие срабатывает при нажатии кнопки мыши?',
      text_en: 'Which event fires when a mouse button is clicked?',
      options_ru: ['press', 'keydown', 'click', 'tap'],
      options_en: ['press', 'keydown', 'click', 'tap'],
      correctIndex: 2,
      explanation_ru: '"click" — событие клика мышью. "keydown" — нажатие клавиши клавиатуры. "tap" не стандартное событие.',
      explanation_en: '"click" is the mouse click event. "keydown" is a keyboard key press. "tap" is not a standard event.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает el.classList.toggle("dark")?',
      text_en: 'What does el.classList.toggle("dark") do?',
      options_ru: ['Всегда добавляет класс', 'Всегда удаляет класс', 'Добавляет класс если нет, удаляет если есть', 'Переименовывает класс'],
      options_en: ['Always adds the class', 'Always removes the class', 'Adds the class if absent, removes if present', 'Renames the class'],
      correctIndex: 2,
      explanation_ru: 'toggle переключает: если класс есть — убирает, если нет — добавляет. Идеально для переключателей тёмной темы.',
      explanation_en: 'toggle switches: if the class exists it removes it; if absent it adds it. Ideal for dark theme toggles.',
    },
  ],
}
