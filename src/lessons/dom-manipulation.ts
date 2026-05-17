import type { MultipleChoiceRow } from '@/types/lesson'

export const domManipulation = {
  slug: 'dom-manipulation',
  title: 'Работа с DOM',
  readTime: 11,
  sections: [
    { id: 'what-is-dom', title: 'Что такое DOM?' },
    { id: 'select', title: 'Выбор элементов' },
    { id: 'modify', title: 'Изменение содержимого' },
    { id: 'style', title: 'Изменение стилей' },
    { id: 'events', title: 'События' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `DOM (Document Object Model) — это программный интерфейс для HTML-документа. Когда браузер
загружает страницу, он создаёт DOM-дерево из всех HTML-элементов. JavaScript может обращаться
к любому элементу этого дерева, изменять его, добавлять новые элементы и реагировать на действия
пользователя. Именно это делает веб-страницы интерактивными!`,

    select: {
      description: 'Способы найти HTML-элемент через JavaScript:',
      items: [
        { name: 'getElementById()', description: 'Находит элемент по атрибуту id (один элемент)', example: 'const btn = document.getElementById("myBtn");' },
        { name: 'querySelector()', description: 'Находит первый элемент по CSS-селектору', example: 'const h1 = document.querySelector("h1");\nconst item = document.querySelector(".card");' },
        { name: 'querySelectorAll()', description: 'Находит все элементы по CSS-селектору (список)', example: 'const items = document.querySelectorAll("li");' },
        { name: 'getElementsByClassName()', description: 'Находит элементы по имени класса', example: 'const cards = document.getElementsByClassName("card");' },
      ],
    },

    modify: {
      description: 'Изменение содержимого найденного элемента:',
      code: `const heading = document.querySelector("h1");

// Изменить текст
heading.textContent = "Новый заголовок";

// Изменить HTML (осторожно: риск XSS!)
heading.innerHTML = "<em>Курсивный</em> заголовок";

// Добавить/удалить CSS-класс
heading.classList.add("highlight");
heading.classList.remove("old-class");
heading.classList.toggle("active"); // Переключить

// Изменить атрибут
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
link.getAttribute("href"); // Получить значение`,
    },

    style: {
      description: 'Изменение стилей через JavaScript:',
      code: `const box = document.querySelector(".box");

// Инлайн-стиль (не лучший способ)
box.style.backgroundColor = "blue";
box.style.fontSize = "20px";

// Лучше — добавлять/убирать классы:
box.classList.add("active");   // Добавляет стиль из CSS
box.classList.remove("active");
box.classList.toggle("dark");  // Переключает`,
    },

    events: {
      description: 'События — это действия пользователя или браузера. addEventListener добавляет обработчик:',
      code: `const button = document.getElementById("myBtn");

// Клик по кнопке
button.addEventListener("click", function() {
  console.log("Кнопка нажата!");
});

// Стрелочная функция (короче)
button.addEventListener("click", () => {
  alert("Привет!");
});

// Другие события:
// "mouseover" — наведение мыши
// "keydown"   — нажатие клавиши
// "input"     — ввод в поле
// "submit"    — отправка формы`,
    },

    workedExamples: [
      {
        title: 'Пример: Счётчик кликов',
        scenario: 'Создай кнопку, которая считает нажатия.',
        solution: `// HTML: <button id="btn">Нажми меня!</button>
//        <p id="counter">Нажатий: 0</p>

let count = 0;
const btn = document.getElementById("btn");
const counter = document.getElementById("counter");

btn.addEventListener("click", () => {
  count++;
  counter.textContent = "Нажатий: " + count;
});`,
      },
    ],
  },

  keyTerms: [
    { term: 'DOM', definition: 'Document Object Model — дерево объектов, представляющих HTML-страницу в памяти браузера.' },
    { term: 'querySelector()', definition: 'Метод, находящий первый HTML-элемент по CSS-селектору.' },
    { term: 'textContent', definition: 'Свойство элемента для получения или установки текстового содержимого.' },
    { term: 'innerHTML', definition: 'Свойство для установки HTML-содержимого элемента. Использовать осторожно из-за XSS.' },
    { term: 'addEventListener()', definition: 'Метод добавления обработчика события к элементу.' },
    { term: 'classList', definition: 'Объект для управления CSS-классами элемента (add, remove, toggle).' },
  ],

  didYouKnow: [
    'Когда используешь innerHTML с пользовательскими данными, всегда очищай их — иначе злоумышленник может внедрить вредоносный код (XSS-атака).',
    'document.createElement() позволяет создавать новые HTML-элементы из JavaScript.',
    'Event Delegation — мощный паттерн: вместо добавления обработчика к каждому элементу, добавь один обработчик на родителя.',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание работы с DOM.',
    rows: [
      {
        id: 'q1',
        question: 'Какой метод найдёт элемент с id="title"?',
        options: ['document.querySelector("#title")', 'document.findById("title")', 'document.getClass("title")', 'document.get("title")'],
        correctIndex: 0,
      },
      {
        id: 'q2',
        question: 'Как изменить текст элемента, не затрагивая HTML-теги внутри?',
        options: ['innerHTML', 'textContent', 'value', 'text'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Как добавить класс "active" к элементу?',
        options: ['el.class = "active"', 'el.addClass("active")', 'el.classList.add("active")', 'el.style.class = "active"'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        question: 'Какое событие срабатывает при нажатии кнопки мыши?',
        options: ['press', 'keydown', 'click', 'tap'],
        correctIndex: 2,
      },
      {
        id: 'q5',
        question: 'Что делает classList.toggle("dark")?',
        options: ['Всегда добавляет класс', 'Всегда удаляет класс', 'Добавляет класс, если его нет, и удаляет, если есть', 'Переименовывает класс'],
        correctIndex: 2,
      },
    ] as MultipleChoiceRow[],
  },
}
