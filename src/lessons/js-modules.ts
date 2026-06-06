import type { Lesson } from '@/types/lesson'

export const jsModules: Lesson = {
  slug: 'js-modules',
  category: 'JS',
  readTime: 9,
  icon: '📦',

  title_ru: 'Модули ES6',
  title_en: 'ES6 Modules',

  description_ru: 'import и export — разбиваем код на файлы и подключаем зависимости.',
  description_en: 'import and export — splitting code into files and connecting dependencies.',

  sections: [
    { id: 'why-modules',   title_ru: 'Зачем нужны модули',     title_en: 'Why modules exist' },
    { id: 'export',        title_ru: 'export — экспорт',        title_en: 'export' },
    { id: 'import',        title_ru: 'import — импорт',         title_en: 'import' },
    { id: 'default',       title_ru: 'export default',          title_en: 'export default' },
    { id: 'named',         title_ru: 'Именованный экспорт',     title_en: 'Named exports' },
    { id: 'key-terms',     title_ru: 'Важные слова',            title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Модули ES6: import и export',
      title_en: 'ES6 Modules: import and export',
      body_ru: 'Большие программы нельзя писать в одном файле. Модули позволяют разбить код на части и подключать только то, что нужно. Это основа современного JavaScript и React.',
      body_en: 'Large programs cannot be written in one file. Modules let you split code into pieces and import only what you need. This is the foundation of modern JavaScript and React.',
      visual: { kind: 'emoji', emojis: ['📦', '🔗', '⚛️'] },
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Модуль — как инструмент из набора',
      title_en: 'A module is like a tool from a toolkit',
      body_ru: 'Представь ящик с инструментами. Не нужно нести весь ящик, чтобы закрутить один шуруп — берёшь только отвёртку. Модули работают так же: импортируешь только нужное.',
      body_en: 'Imagine a toolbox. You do not carry the whole box to drive one screw — you just grab the screwdriver. Modules work the same way: you import only what you need.',
      visual: { kind: 'emoji', emojis: ['🧰', '→', '🔧'] },
      bullets: [
        { text_ru: 'Каждый файл .js — отдельный модуль', text_en: 'Every .js file is a separate module' },
        { text_ru: 'export — делаем что-то доступным снаружи', text_en: 'export — makes something available outside' },
        { text_ru: 'import — подключаем из другого файла', text_en: 'import — brings in from another file' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Проблема без модулей',
      title_en: 'The problem without modules',
      body_ru: 'Без модулей весь код — в одном файле. Через 500 строк найти нужную функцию становится почти невозможно. Модули решают это: каждый файл отвечает за свою задачу.',
      body_en: 'Without modules all code is in one file. After 500 lines finding the right function becomes nearly impossible. Modules solve this: each file is responsible for one task.',
      bullets: [
        { text_ru: '❌ Один огромный файл — всё перемешано', text_en: '❌ One huge file — everything mixed together' },
        { text_ru: '✅ math.js — математика', text_en: '✅ math.js — maths utilities' },
        { text_ru: '✅ api.js — запросы к серверу', text_en: '✅ api.js — server requests' },
        { text_ru: '✅ utils.js — вспомогательные функции', text_en: '✅ utils.js — helper functions' },
      ],
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Named export — именованный экспорт',
      title_en: 'Named export',
      body_ru: 'Ставим export перед функцией, переменной или классом. Из одного файла можно экспортировать сколько угодно именованных значений.',
      body_en: 'Put export before a function, variable or class. You can export as many named values as you want from one file.',
      code: `// math.js
export function add(a, b) {
  return a + b
}

export function multiply(a, b) {
  return a * b
}

export const PI = 3.14159`,
      codeLang: 'javascript',
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'import — подключаем по имени',
      title_en: 'import — bring in by name',
      body_ru: 'При именованном импорте имя должно точно совпадать с тем, что экспортировано. Можно импортировать несколько значений сразу.',
      body_en: 'With named imports the name must exactly match what was exported. You can import several values at once.',
      code: `// main.js
import { add, multiply, PI } from './math.js'

console.log(add(2, 3))       // 5
console.log(multiply(4, 5))  // 20
console.log(PI)              // 3.14159

// Импорт с псевдонимом
import { add as sum } from './math.js'
console.log(sum(1, 2))       // 3`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'export default — экспорт по умолчанию',
      title_en: 'export default',
      body_ru: 'Каждый файл может иметь один default-экспорт. Обычно это главная «вещь» файла: класс, функция или компонент. При импорте имя можно выбрать любое.',
      body_en: 'Each file can have one default export. Usually it is the main "thing" of the file: a class, function or component. When importing you can choose any name.',
      code: `// Button.js
export default function Button({ text }) {
  return <button>{text}</button>
}

// App.js — имя при импорте выбираем сами
import Button from './Button.js'
import MyBtn from './Button.js'  // тоже работает`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'compare',
      title_ru: 'Named vs Default export',
      title_en: 'Named vs Default export',
      body_ru: 'Оба типа часто используются вместе. Понимание разницы важно для работы с React.',
      body_en: 'Both types are often used together. Understanding the difference is important for working with React.',
      compareLeft: {
        label_ru: 'Named export',
        label_en: 'Named export',
        items_ru: [
          'export function foo() {}',
          'Имя фиксировано',
          'Несколько на файл',
          'import { foo } from ...',
        ],
        items_en: [
          'export function foo() {}',
          'Name is fixed',
          'Many per file',
          'import { foo } from ...',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'Default export',
        label_en: 'Default export',
        items_ru: [
          'export default function() {}',
          'Имя при импорте — любое',
          'Только один на файл',
          'import Foo from ...',
        ],
        items_en: [
          'export default function() {}',
          'Import name — your choice',
          'Only one per file',
          'import Foo from ...',
        ],
        color: 'green',
      },
    },
    {
      id: 's8',
      type: 'code',
      title_ru: 'Импорт из библиотек',
      title_en: 'Importing from libraries',
      body_ru: 'Тот же синтаксис используется для подключения внешних библиотек — npm-пакетов. Именно так React подключается в каждом файле.',
      body_en: 'The same syntax is used to import external libraries — npm packages. This is exactly how React is imported in every file.',
      code: `// Импорт из React (библиотека из npm)
import React, { useState, useEffect } from 'react'

// Импорт CSS
import './App.css'

// Импорт JSON
import data from './data.json'

// Импорт всего модуля как объекта
import * as MathUtils from './math.js'
console.log(MathUtils.add(1, 2))  // 3`,
      codeLang: 'javascript',
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Модули в браузере и в сборщиках',
      title_en: 'Modules in the browser and bundlers',
      body_ru: 'Браузеры поддерживают ES-модули через <script type="module">. Но в реальных проектах используют сборщики (Vite, Webpack) — они объединяют все модули в один файл для оптимальной загрузки.',
      body_en: 'Browsers support ES modules via <script type="module">. But real projects use bundlers (Vite, Webpack) — they combine all modules into one file for optimal loading.',
      visual: { kind: 'emoji', emojis: ['🌐', '⚙️', '🚀'] },
      bullets: [
        { text_ru: 'Vite — быстрый сборщик, используется в этом курсе', text_en: 'Vite — fast bundler used in this course' },
        { text_ru: 'Webpack — самый популярный сборщик в индустрии', text_en: 'Webpack — the most popular bundler in the industry' },
        { text_ru: 'Create React App использует Webpack под капотом', text_en: 'Create React App uses Webpack under the hood' },
      ],
    },
    {
      id: 's10',
      type: 'practice-cta',
      title_ru: 'Готов к React!',
      title_en: 'Ready for React!',
      body_ru: 'Теперь ты знаешь import и export — без этого React невозможен. В следующем уроке ты напишешь свой первый React-компонент.',
      body_en: 'Now you know import and export — React is impossible without them. In the next lesson you will write your first React component.',
      visual: { kind: 'emoji', emojis: ['✅', '⚛️', '🚀'] },
    },
  ],

  content: {
    intro_ru: `Модульная система ES6 — это способ организовать JavaScript-код по файлам.
Каждый файл является отдельным модулем со своей областью видимости. Это позволяет
избежать конфликтов имён, разбить большой проект на управляемые части и переиспользовать
код. Именно на модулях построен React: каждый компонент — отдельный файл с export.`,
    intro_en: `The ES6 module system is a way to organise JavaScript code across files.
Each file is a separate module with its own scope. This avoids name conflicts, splits a
large project into manageable pieces and enables code reuse. React is built on modules:
every component is a separate file with an export.`,

    blocks: [
      {
        sectionId: 'why-modules',
        heading_ru: 'Зачем нужны модули',
        heading_en: 'Why modules exist',
        text_ru: `До ES6 весь JavaScript-код писался в одном файле или подключался через <script>-теги по порядку.
При росте проекта это превращалось в хаос: тысячи строк в одном месте, конфликты глобальных переменных, невозможность
переиспользовать код между проектами. Модули решили все эти проблемы: каждый файл имеет свою область видимости,
экспортирует только то, что нужно, и импортирует только то, что использует.`,
        text_en: `Before ES6 all JavaScript was written in one file or loaded via ordered <script> tags.
As projects grew this became chaos: thousands of lines in one place, global variable conflicts, no way to
reuse code between projects. Modules solved all these problems: each file has its own scope, exports only
what is needed, and imports only what it uses.`,
      },
      {
        sectionId: 'export',
        heading_ru: 'export — делаем доступным снаружи',
        heading_en: 'export — making things available outside',
        text_ru: `Ключевое слово export делает функцию, переменную или класс доступными для импорта из других файлов.
Без export всё остаётся приватным внутри файла. Существует два вида экспорта:
именованный (named) — можно несколько на файл, и default — только один.`,
        text_en: `The export keyword makes a function, variable or class available for import from other files.
Without export everything stays private inside the file. There are two kinds of export:
named — you can have many per file, and default — only one.`,
        code: `// Именованные экспорты
export const name = 'React'
export function greet(name) { return \`Привет, \${name}!\` }
export class User { constructor(name) { this.name = name } }

// Default экспорт
export default function App() { return <h1>Hello</h1> }`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'import',
        heading_ru: 'import — подключаем нужное',
        heading_en: 'import — bring in what you need',
        text_ru: `import должен быть в самом начале файла. Путь к файлу пишется относительно текущего:
./ означает текущую папку. Для библиотек из npm — просто имя пакета без пути.`,
        text_en: `import must be at the very top of the file. The path to the file is relative to the current one:
./ means the current folder. For npm libraries — just the package name without a path.`,
        code: `// Именованный импорт
import { useState, useEffect } from 'react'

// Default импорт
import App from './App.js'

// Оба сразу
import React, { useState } from 'react'

// Переименование
import { add as sum } from './math.js'

// Весь модуль
import * as Utils from './utils.js'`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'default',
        heading_ru: 'export default',
        heading_en: 'export default',
        text_ru: `export default используется для главного значения файла — обычно компонента в React.
При импорте имя выбирается произвольно, что позволяет называть компонент по-разному в разных местах.`,
        text_en: `export default is used for the main value of a file — usually a React component.
When importing the name is chosen freely, letting you name the component differently in different places.`,
        code: `// UserCard.js
export default function UserCard({ name, avatar }) {
  return (
    <div>
      <img src={avatar} alt={name} />
      <h2>{name}</h2>
    </div>
  )
}

// Dashboard.js
import UserCard from './UserCard.js'    // имя совпадает
import Card from './UserCard.js'        // тоже работает`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'named',
        heading_ru: 'Именованный экспорт',
        heading_en: 'Named exports',
        text_ru: `Именованный экспорт удобен для утилитарных функций, констант и хелперов.
При импорте имя должно точно совпадать с экспортом (иначе — ошибка). Фигурные скобки { } обязательны.`,
        text_en: `Named exports work well for utility functions, constants and helpers.
The import name must exactly match the export (otherwise — error). Curly braces { } are required.`,
        code: `// validators.js
export function isEmail(str) { return str.includes('@') }
export function isPhone(str) { return /^\d{10,}$/.test(str) }
export const MAX_LENGTH = 100

// form.js
import { isEmail, isPhone, MAX_LENGTH } from './validators.js'

if (isEmail(input.value)) { /* ... */ }`,
        codeLang: 'javascript',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Модуль',
      term_en: 'Module',
      definition_ru: 'Отдельный JavaScript-файл с собственной областью видимости, экспортирующий часть своего кода.',
      definition_en: 'A separate JavaScript file with its own scope that exports part of its code.',
      example_ru: 'Файл math.js — это модуль с функциями сложения и умножения.',
      example_en: 'The file math.js is a module with addition and multiplication functions.',
    },
    {
      term_ru: 'export',
      term_en: 'export',
      definition_ru: 'Ключевое слово, делающее функцию, переменную или класс доступными для импорта из других файлов.',
      definition_en: 'Keyword that makes a function, variable or class available for import from other files.',
      example_ru: 'export function add(a, b) { return a + b }',
      example_en: 'export function add(a, b) { return a + b }',
    },
    {
      term_ru: 'import',
      term_en: 'import',
      definition_ru: 'Ключевое слово для подключения экспортированных значений из другого модуля.',
      definition_en: 'Keyword for bringing in exported values from another module.',
      example_ru: 'import { add } from \'./math.js\'',
      example_en: 'import { add } from \'./math.js\'',
    },
    {
      term_ru: 'export default',
      term_en: 'export default',
      definition_ru: 'Экспорт главного значения файла. Один файл — один default-экспорт. При импорте имя выбирается произвольно.',
      definition_en: 'Export of the main value of a file. One file — one default export. The import name is chosen freely.',
      example_ru: 'export default function App() {}',
      example_en: 'export default function App() {}',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'До ES6 (2015) в JavaScript не было стандартной модульной системы. Использовали CommonJS (require/module.exports) — это стандарт Node.js.',
      text_en: 'Before ES6 (2015) JavaScript had no standard module system. CommonJS (require/module.exports) was used — the Node.js standard.',
    },
    {
      text_ru: 'В React каждый компонент — отдельный файл с export default. Именно поэтому модули нужно освоить до React.',
      text_en: 'In React every component is a separate file with export default. That is exactly why you need to master modules before React.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Сколько export default может быть в одном файле?',
      text_en: 'How many export defaults can one file have?',
      options_ru: ['Только один', 'Неограниченно', 'Два', 'Зависит от размера файла'],
      options_en: ['Only one', 'Unlimited', 'Two', 'Depends on file size'],
      correctIndex: 0,
      explanation_ru: 'Каждый файл может иметь только один export default — это главное значение файла.',
      explanation_en: 'Each file can have only one export default — it is the main value of the file.',
    },
    {
      id: 'q2',
      text_ru: 'Как правильно импортировать именованный экспорт?',
      text_en: 'How do you correctly import a named export?',
      options_ru: [
        'import { add } from \'./math.js\'',
        'import add from \'./math.js\'',
        'require(\'./math.js\').add',
        'include { add } from \'./math.js\'',
      ],
      options_en: [
        'import { add } from \'./math.js\'',
        'import add from \'./math.js\'',
        'require(\'./math.js\').add',
        'include { add } from \'./math.js\'',
      ],
      correctIndex: 0,
      explanation_ru: 'Именованный импорт использует фигурные скобки { }. Без них — это импорт default-экспорта.',
      explanation_en: 'Named imports use curly braces { }. Without them it is a default import.',
    },
    {
      id: 'q3',
      text_ru: 'Что нужно написать, чтобы сделать функцию доступной из другого файла?',
      text_en: 'What do you write to make a function available from another file?',
      options_ru: ['export', 'public', 'global', 'share'],
      options_en: ['export', 'public', 'global', 'share'],
      correctIndex: 0,
      explanation_ru: 'Ключевое слово export делает значение доступным для импорта из других модулей.',
      explanation_en: 'The export keyword makes a value available for import from other modules.',
    },
    {
      id: 'q4',
      text_ru: 'Как импортировать default-экспорт?',
      text_en: 'How do you import a default export?',
      options_ru: [
        'import App from \'./App.js\'',
        'import { App } from \'./App.js\'',
        'import default App from \'./App.js\'',
        'import * from \'./App.js\'',
      ],
      options_en: [
        'import App from \'./App.js\'',
        'import { App } from \'./App.js\'',
        'import default App from \'./App.js\'',
        'import * from \'./App.js\'',
      ],
      correctIndex: 0,
      explanation_ru: 'Default-экспорт импортируется без фигурных скобок. Имя выбирается произвольно.',
      explanation_en: 'A default export is imported without curly braces. The name is chosen freely.',
    },
  ],
}
