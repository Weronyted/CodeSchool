import type { Lesson } from '../types/lesson'

const lesson: Lesson = {
  slug: 'js-dom',
  category: 'JS',
  readTime: 13,
  icon: '🖱️',
  title_ru: 'Работа с DOM',
  title_en: 'Working with the DOM',
  description_ru: 'Находи элементы, меняй содержимое и реагируй на действия пользователя через события.',
  description_en: 'Find elements, change their content, and react to user actions through events.',

  sections: [
    { id: 'what-is-dom', title_ru: 'Что такое DOM', title_en: 'What is the DOM' },
    { id: 'selecting', title_ru: 'Поиск элементов', title_en: 'Selecting Elements' },
    { id: 'changing', title_ru: 'Изменение элементов', title_en: 'Changing Elements' },
    { id: 'events', title_ru: 'События', title_en: 'Events' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'DOM — мост между JS и HTML',
      title_en: 'DOM — the Bridge Between JS and HTML',
      body_ru: 'DOM (Document Object Model) — это представление HTML-страницы в виде объектов, которыми может управлять JavaScript. Через DOM JS читает и изменяет содержимое страницы в реальном времени.',
      body_en: 'The DOM (Document Object Model) is a representation of the HTML page as objects that JavaScript can control. Through the DOM, JS reads and changes page content in real time.',
      visual: { kind: 'emoji', emojis: ['🌳', '🔗', '⚡'] },
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Аналогия: Дерево с ветками',
      title_en: 'Analogy: A Tree with Branches',
      body_ru: 'DOM — это дерево. Корень — `document`. От него отходят ветки (`html`, `head`, `body`). На ветках — листья (теги: `h1`, `p`, `button`). JavaScript может найти любой лист и изменить его.',
      body_en: 'The DOM is a tree. The root is `document`. Branches grow from it (`html`, `head`, `body`). On the branches are leaves (tags: `h1`, `p`, `button`). JavaScript can find any leaf and change it.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'querySelector — найти элемент',
      title_en: 'querySelector — Find an Element',
      body_ru: '`document.querySelector()` принимает CSS-селектор и возвращает первый подходящий элемент. Синтаксис такой же, как в CSS: теги, `.классы`, `#id`.',
      body_en: '`document.querySelector()` takes a CSS selector and returns the first matching element. The syntax is the same as CSS: tags, `.classes`, `#ids`.',
      code: `// Find by tag
const heading = document.querySelector("h1");

// Find by class
const card = document.querySelector(".card");

// Find by id
const btn = document.querySelector("#submit-btn");

// Find all matching (returns NodeList)
const allParagraphs = document.querySelectorAll("p");
console.log(allParagraphs.length); // number of <p> tags`,
      codeLang: 'javascript',
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Изменение содержимого',
      title_en: 'Changing Content',
      body_ru: '`textContent` — меняет текст элемента (безопасно). `innerHTML` — меняет HTML внутри элемента (можно вставлять теги). `style` — меняет CSS-стили напрямую.',
      body_en: '`textContent` — changes the element\'s text (safe). `innerHTML` — changes the HTML inside an element (you can insert tags). `style` — changes CSS styles directly.',
      code: `const title = document.querySelector("h1");

// Change text
title.textContent = "New Heading!";

// Change HTML content (can insert tags)
title.innerHTML = "Hello <em>World</em>!";

// Change style
title.style.color = "blue";
title.style.fontSize = "32px";`,
      codeLang: 'javascript',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'classList — управление классами',
      title_en: 'classList — Managing Classes',
      body_ru: '`classList` позволяет добавлять, удалять и переключать CSS-классы без перезаписи всего атрибута `class`.',
      body_en: '`classList` lets you add, remove, and toggle CSS classes without overwriting the entire `class` attribute.',
      code: `const box = document.querySelector(".box");

box.classList.add("active");    // add class
box.classList.remove("hidden"); // remove class
box.classList.toggle("dark");   // on → off → on

// Check if class exists
if (box.classList.contains("active")) {
  console.log("Box is active!");
}`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'addEventListener — слушаем события',
      title_en: 'addEventListener — Listening to Events',
      body_ru: 'Событие — это то, что происходит в браузере: клик, нажатие клавиши, отправка формы. `addEventListener` «подписывает» функцию на событие: когда событие происходит — функция вызывается.',
      body_en: 'An event is something that happens in the browser: click, keypress, form submit. `addEventListener` "subscribes" a function to an event: when the event fires, the function is called.',
      code: `const button = document.querySelector("button");

button.addEventListener("click", function() {
  console.log("Button was clicked!");
});

// Arrow function — shorter syntax
button.addEventListener("click", () => {
  button.textContent = "Clicked!";
  button.style.backgroundColor = "green";
});`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Объект события (event)',
      title_en: 'The Event Object',
      body_ru: 'Браузер передаёт в обработчик объект `event` с информацией о событии: какой элемент вызвал событие (`event.target`), какая клавиша нажата (`event.key`) и т.д.',
      body_en: 'The browser passes an `event` object to the handler with information about the event: which element triggered it (`event.target`), which key was pressed (`event.key`), etc.',
      code: `const input = document.querySelector("input");

// React to keyboard input
input.addEventListener("input", (event) => {
  console.log("Current value:", event.target.value);
});

// React to any click on the page
document.addEventListener("click", (event) => {
  console.log("Clicked element:", event.target.tagName);
});`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'textContent vs innerHTML',
      title_en: 'textContent vs innerHTML',
      body_ru: 'Используй **`textContent`** когда вставляешь простой текст — это безопаснее. `innerHTML` позволяет вставлять HTML-теги, но если туда попадёт пользовательский ввод — это уязвимость (XSS). Никогда не пиши `element.innerHTML = userInput`.',
      body_en: 'Use **`textContent`** when inserting plain text — it\'s safer. `innerHTML` lets you insert HTML tags, but if user input gets in there — that\'s a vulnerability (XSS). Never write `element.innerHTML = userInput`.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Пора практиковаться!',
      title_en: 'Time to Practice!',
      body_ru: 'Напиши интерактивную страницу: находи элементы, изменяй их и реагируй на клики.',
      body_en: 'Write an interactive page: find elements, change them, and react to clicks.',
    },
  ],

  content: {
    intro_ru: 'DOM — это API, которое позволяет JavaScript читать и изменять HTML-страницу. Через DOM мы находим элементы, меняем их содержимое и реагируем на действия пользователя.',
    intro_en: 'The DOM is the API that lets JavaScript read and modify an HTML page. Through the DOM we find elements, change their content, and react to user actions.',
    blocks: [
      {
        sectionId: 'what-is-dom',
        heading_ru: 'Что такое DOM и как он устроен',
        heading_en: 'What is the DOM and How It Works',
        text_ru: 'Когда браузер загружает HTML-файл, он разбирает его и строит дерево объектов — DOM (Document Object Model). Каждый HTML-тег становится **узлом** (node) этого дерева.\n\nJavaScript имеет доступ к этому дереву через глобальный объект `document`. Через него можно найти любой элемент, прочитать его содержимое, изменить стиль или структуру, а также подписаться на события.\n\nВсё, что ты видишь на странице — каждый текст, кнопка, картинка — существует в DOM как объект со своими свойствами и методами.',
        text_en: 'When a browser loads an HTML file, it parses it and builds a tree of objects — the DOM (Document Object Model). Each HTML tag becomes a **node** in this tree.\n\nJavaScript has access to this tree through the global `document` object. Through it you can find any element, read its content, change its style or structure, and subscribe to events.\n\nEverything you see on the page — every text, button, image — exists in the DOM as an object with its own properties and methods.',
        code: `// The global document object is always available
console.log(document.title);      // page title from <title>
console.log(document.URL);        // current page URL
console.log(document.body);       // the <body> element

// The DOM tree reflects the HTML structure
// <html>
//   <head>...</head>
//   <body>
//     <h1 id="main">Hello</h1>
//     <p class="intro">Text</p>
//   </body>
// </html>`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'selecting',
        heading_ru: 'Поиск элементов',
        heading_en: 'Selecting Elements',
        text_ru: 'Два главных метода для поиска элементов:\n\n**`querySelector(selector)`** — возвращает **первый** элемент, совпадающий с CSS-селектором, или `null` если ничего не найдено.\n\n**`querySelectorAll(selector)`** — возвращает **все** совпадающие элементы в виде `NodeList`. Это похоже на массив, но для перебора лучше использовать `forEach`.\n\nВсегда проверяй, что элемент найден (не `null`), прежде чем работать с ним — иначе получишь ошибку.',
        text_en: 'Two main methods for finding elements:\n\n**`querySelector(selector)`** — returns the **first** element matching a CSS selector, or `null` if nothing is found.\n\n**`querySelectorAll(selector)`** — returns **all** matching elements as a `NodeList`. It\'s similar to an array; use `forEach` to iterate.\n\nAlways check that the element was found (not `null`) before working with it — otherwise you\'ll get an error.',
        code: `// querySelector — single element
const hero = document.querySelector("#hero");
const firstCard = document.querySelector(".card");
const nav = document.querySelector("nav");

// Check before use!
if (hero !== null) {
  console.log(hero.textContent);
}

// querySelectorAll — all matching elements
const cards = document.querySelectorAll(".card");
console.log(cards.length); // how many cards

// Iterate with forEach
cards.forEach((card, index) => {
  console.log(\`Card \${index + 1}: \${card.textContent}\`);
});

// Nested selector — find inside element
const navLinks = document.querySelectorAll("nav a");`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'changing',
        heading_ru: 'Изменение элементов',
        heading_en: 'Changing Elements',
        text_ru: 'После того как ты нашёл элемент, ты можешь изменить его через свойства:\n\n**`textContent`** — текстовое содержимое. Безопасен: HTML-теги внутри строки будут показаны как текст, не выполнены.\n\n**`innerHTML`** — HTML-содержимое. Позволяет вставить теги, но опасен с пользовательским вводом.\n\n**`style`** — объект CSS-стилей. Свойства пишутся в camelCase: `backgroundColor`, `fontSize`, `marginTop`.\n\n**`setAttribute(name, value)`** — устанавливает HTML-атрибут: `href`, `src`, `alt` и т.д.',
        text_en: 'Once you\'ve found an element, you can modify it through properties:\n\n**`textContent`** — text content. Safe: HTML tags inside the string are shown as text, not executed.\n\n**`innerHTML`** — HTML content. Lets you insert tags, but dangerous with user input.\n\n**`style`** — CSS styles object. Properties are in camelCase: `backgroundColor`, `fontSize`, `marginTop`.\n\n**`setAttribute(name, value)`** — sets an HTML attribute: `href`, `src`, `alt`, etc.',
        code: `const heading = document.querySelector("h1");
const link = document.querySelector("a");
const img = document.querySelector("img");

// Change text content
heading.textContent = "Updated Title";

// Change HTML (careful with user input!)
heading.innerHTML = "Hello <strong>World</strong>";

// Change CSS styles (camelCase!)
heading.style.color = "crimson";
heading.style.backgroundColor = "#fff3cd";
heading.style.padding = "10px 20px";
heading.style.borderRadius = "8px";

// Change attributes
link.setAttribute("href", "https://example.com");
link.setAttribute("target", "_blank");
img.setAttribute("src", "new-photo.jpg");
img.setAttribute("alt", "New description");`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'events',
        heading_ru: 'События и обработчики',
        heading_en: 'Events and Event Handlers',
        text_ru: '`addEventListener(type, handler)` подписывает функцию на событие. Браузер вызывает её каждый раз, когда событие происходит.\n\nОсновные типы событий:\n- **`click`** — клик мышью\n- **`input`** — ввод в текстовое поле\n- **`submit`** — отправка формы\n- **`keydown`** / **`keyup`** — нажатие / отпускание клавиши\n- **`mouseover`** / **`mouseout`** — наведение / уход курсора\n- **`DOMContentLoaded`** — страница загружена и DOM готов\n\nОбъект `event` передаётся обработчику автоматически и содержит подробности о событии: `event.target` — элемент, на котором произошло событие.',
        text_en: '`addEventListener(type, handler)` subscribes a function to an event. The browser calls it every time the event fires.\n\nMain event types:\n- **`click`** — mouse click\n- **`input`** — typing in a text field\n- **`submit`** — form submission\n- **`keydown`** / **`keyup`** — key press / release\n- **`mouseover`** / **`mouseout`** — cursor enters / leaves\n- **`DOMContentLoaded`** — page loaded and DOM is ready\n\nThe `event` object is passed to the handler automatically and contains event details: `event.target` — the element the event occurred on.',
        code: `// Button click
const btn = document.querySelector("#my-btn");
btn.addEventListener("click", () => {
  btn.textContent = "Clicked!";
  btn.style.backgroundColor = "#51cf66";
});

// Text input — live counter
const input = document.querySelector("#name-input");
const counter = document.querySelector("#char-count");
input.addEventListener("input", (e) => {
  counter.textContent = e.target.value.length + " characters";
});

// Hover effect
const card = document.querySelector(".card");
card.addEventListener("mouseover", () => {
  card.style.boxShadow = "0 8px 24px rgba(0,0,0,0.2)";
});
card.addEventListener("mouseout", () => {
  card.style.boxShadow = "";
});

// Wait for DOM before running
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM is ready!");
});`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Счётчик кликов',
    title_en: 'Click Counter',
    instructions_ru: 'Создай интерактивный счётчик. На странице есть кнопка и элемент для отображения числа. При каждом клике увеличивай счётчик на 1 и обновляй текст. Добавь кнопку «Сброс», которая обнуляет счётчик. Когда счётчик достигнет 10 — поменяй цвет числа на красный.',
    instructions_en: 'Create an interactive counter. The page has a button and an element to display the count. On each click, increase the counter by 1 and update the text. Add a Reset button that zeroes the counter. When the counter reaches 10 — change the number\'s color to red.',
    activeTabs: ['html', 'javascript'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>
    body { font-family: sans-serif; text-align: center; padding: 40px; }
    #count { font-size: 64px; font-weight: bold; margin: 20px; }
    button { font-size: 18px; padding: 10px 24px; margin: 8px;
             border: none; border-radius: 8px; cursor: pointer; }
    #increment { background: #339af0; color: white; }
    #reset { background: #e9ecef; color: #333; }
  </style>
</head>
<body>
  <h1>Click Counter</h1>
  <div id="count">0</div>
  <button id="increment">Click me!</button>
  <button id="reset">Reset</button>
  <script src="script.js"></script>
</body>
</html>`,
      javascript: `// 1. Find the elements
const countDisplay = document.querySelector("#count");
const incrementBtn = document.querySelector("#increment");
const resetBtn = document.querySelector("#reset");

// 2. Create a counter variable
let count = 0;

// 3. Add click handler to incrementBtn
//    - increase count by 1
//    - update countDisplay.textContent
//    - if count >= 10, set color to red

// 4. Add click handler to resetBtn
//    - set count back to 0
//    - update countDisplay
//    - reset the color
`,
    },
    hints_ru: [
      'Используй addEventListener("click", ...) для каждой кнопки',
      'Внутри обработчика: count++ увеличит count на 1',
      'countDisplay.textContent = count обновит отображение (число автоматически станет строкой)',
      'if (count >= 10) { countDisplay.style.color = "red"; } — смена цвета',
      'В обработчике сброса: count = 0; countDisplay.textContent = 0; countDisplay.style.color = "";',
    ],
    hints_en: [
      'Use addEventListener("click", ...) for each button',
      'Inside the handler: count++ will increase count by 1',
      'countDisplay.textContent = count will update the display (number auto-converts to string)',
      'if (count >= 10) { countDisplay.style.color = "red"; } — color change',
      'In the reset handler: count = 0; countDisplay.textContent = 0; countDisplay.style.color = "";',
    ],
  },

  keyTerms: [
    {
      term_ru: 'DOM',
      term_en: 'DOM',
      definition_ru: 'Document Object Model — представление HTML-страницы в виде дерева объектов, доступных JavaScript.',
      definition_en: 'Document Object Model — the HTML page represented as a tree of objects accessible by JavaScript.',
      example_ru: 'document.querySelector("h1") находит первый тег h1 в DOM',
      example_en: 'document.querySelector("h1") finds the first h1 tag in the DOM',
    },
    {
      term_ru: 'querySelector',
      term_en: 'querySelector',
      definition_ru: 'Метод, который ищет первый элемент, совпадающий с CSS-селектором.',
      definition_en: 'A method that finds the first element matching a CSS selector.',
      example_ru: 'document.querySelector(".card") — находит элемент с классом card',
      example_en: 'document.querySelector(".card") — finds the element with class card',
    },
    {
      term_ru: 'addEventListener',
      term_en: 'addEventListener',
      definition_ru: 'Метод, подписывающий функцию-обработчик на событие элемента.',
      definition_en: 'A method that subscribes a handler function to an element\'s event.',
      example_ru: 'btn.addEventListener("click", handler) — вызывает handler при каждом клике',
      example_en: 'btn.addEventListener("click", handler) — calls handler on every click',
    },
    {
      term_ru: 'Событие (Event)',
      term_en: 'Event',
      definition_ru: 'Сигнал браузера о действии пользователя или браузера: click, input, keydown и др.',
      definition_en: 'A browser signal about a user or browser action: click, input, keydown, etc.',
      example_ru: '"click" — событие клика, "input" — событие ввода текста',
      example_en: '"click" — click event, "input" — text input event',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'DOM придумали в 1998 году — тогда Netscape и Microsoft делали разные версии и веб-разработчики сходили с ума, поддерживая оба браузера. W3C создал стандарт DOM, чтобы положить этому конец.',
      text_en: 'The DOM was invented in 1998 — Netscape and Microsoft had different implementations and web developers were going crazy maintaining both browsers. W3C created the DOM standard to end that.',
    },
    {
      text_ru: 'Метод `getElementById` существует с самого начала DOM и работает быстрее `querySelector("#id")`, потому что браузер хранит индекс всех id. Но `querySelector` удобнее — он принимает любой CSS-селектор.',
      text_en: '`getElementById` has existed since the very beginning of the DOM and runs faster than `querySelector("#id")`, because the browser keeps an index of all ids. But `querySelector` is more convenient — it accepts any CSS selector.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что возвращает document.querySelector(".box"), если элемент с классом box не найден?',
      text_en: 'What does document.querySelector(".box") return if no element with class box is found?',
      options_ru: ['undefined', 'null', 'false', 'Пустой массив / Empty array'],
      options_en: ['undefined', 'null', 'false', 'Empty array'],
      correctIndex: 1,
      explanation_ru: '`querySelector` возвращает `null` если ни один элемент не совпадает с селектором. Всегда проверяй результат перед использованием.',
      explanation_en: '`querySelector` returns `null` if no element matches the selector. Always check the result before using it.',
    },
    {
      id: 'q2',
      text_ru: 'Какое свойство используется для безопасного изменения текста элемента?',
      text_en: 'Which property is used to safely change an element\'s text?',
      options_ru: ['innerHTML', 'textContent', 'innerText', 'value'],
      options_en: ['innerHTML', 'textContent', 'innerText', 'value'],
      correctIndex: 1,
      explanation_ru: '`textContent` безопаснее `innerHTML`: HTML-теги в строке отображаются как обычный текст и не выполняются браузером.',
      explanation_en: '`textContent` is safer than `innerHTML`: HTML tags in the string are displayed as plain text and not executed by the browser.',
    },
    {
      id: 'q3',
      text_ru: 'Как добавить CSS-класс "active" к элементу el?',
      text_en: 'How do you add the CSS class "active" to an element el?',
      options_ru: [
        'el.class = "active"',
        'el.classList.add("active")',
        'el.addClassName("active")',
        'el.style.class = "active"',
      ],
      options_en: [
        'el.class = "active"',
        'el.classList.add("active")',
        'el.addClassName("active")',
        'el.style.class = "active"',
      ],
      correctIndex: 1,
      explanation_ru: '`el.classList.add("active")` добавляет класс к элементу. `classList` — это объект с методами add, remove, toggle и contains.',
      explanation_en: '`el.classList.add("active")` adds the class to an element. `classList` is an object with methods add, remove, toggle, and contains.',
    },
    {
      id: 'q4',
      text_ru: 'Какое событие нужно слушать для реакции на ввод в текстовое поле в реальном времени?',
      text_en: 'Which event should you listen to for real-time reaction to text field input?',
      options_ru: ['"change"', '"keypress"', '"input"', '"type"'],
      options_en: ['"change"', '"keypress"', '"input"', '"type"'],
      correctIndex: 2,
      explanation_ru: 'Событие `"input"` срабатывает при каждом изменении значения поля — это идеально для обновления в реальном времени. `"change"` срабатывает только после потери фокуса.',
      explanation_en: 'The `"input"` event fires on every value change in the field — perfect for real-time updates. `"change"` only fires after the field loses focus.',
    },
    {
      id: 'q5',
      text_ru: 'Что содержит event.target в обработчике события клика?',
      text_en: 'What does event.target contain in a click event handler?',
      options_ru: [
        'Тип события / Event type',
        'Элемент, на котором произошёл клик',
        'Координаты клика / Click coordinates',
        'Имя функции-обработчика',
      ],
      options_en: [
        'The event type',
        'The element that was clicked',
        'The click coordinates',
        'The handler function name',
      ],
      correctIndex: 1,
      explanation_ru: '`event.target` — это DOM-элемент, который был кликнут (или на котором произошло любое другое событие). Очень полезно при делегировании событий.',
      explanation_en: '`event.target` is the DOM element that was clicked (or where any other event occurred). Very useful for event delegation.',
    },
  ],
}

export default lesson
