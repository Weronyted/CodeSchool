import type { Lesson } from '@/types/lesson'

export const jsScope: Lesson = {
  slug: 'js-scope',
  category: 'JS',
  icon: '🔭',
  readTime: 11,
  title_ru: 'Область видимости и замыкания',
  title_en: 'Scope and Closures',
  description_ru: 'Разберитесь с глобальной, функциональной и блочной областями видимости, поднятием переменных и замыканиями.',
  description_en: 'Understand global, function, and block scope, variable hoisting, and closures.',
  sections: [
    { id: 'global', title_ru: 'Глобальная область видимости', title_en: 'Global scope' },
    { id: 'function-scope', title_ru: 'Функциональная область', title_en: 'Function scope' },
    { id: 'block-scope', title_ru: 'Блочная область (let/const)', title_en: 'Block scope (let/const)' },
    { id: 'hoisting', title_ru: 'Поднятие (hoisting)', title_en: 'Hoisting' },
    { id: 'closure', title_ru: 'Замыкание', title_en: 'Closure' },
    { id: 'why-closures', title_ru: 'Зачем нужны замыкания', title_en: 'Why closures matter' },
  ],
  slides: [
    {
      id: 'title-slide',
      type: 'title',
      title_ru: 'Область видимости и замыкания',
      title_en: 'Scope and Closures',
      body_ru: 'Область видимости определяет, где переменная существует и доступна. Замыкания — это «память» функций.',
      body_en: 'Scope determines where a variable exists and is accessible. Closures are the "memory" of functions.',
      visual: { kind: 'emoji', emojis: ['🔭', '📦', '🧠'], caption_ru: 'Видимость, контейнер, память', caption_en: 'Visibility, container, memory' },
    },
    {
      id: 'concept-global',
      type: 'concept',
      title_ru: 'Глобальная область видимости',
      title_en: 'Global scope',
      body_ru: 'Переменные, объявленные вне функций и блоков, доступны везде. Злоупотребление глобальными переменными ведёт к конфликтам имён.',
      body_en: 'Variables declared outside functions and blocks are available everywhere. Overusing globals leads to name conflicts.',
      code: `const appName = 'MyApp'; // global\n\nfunction greet() {\n  console.log(appName); // accessible inside function\n}\n\ngreet(); // 'MyApp'\nconsole.log(appName); // 'MyApp' — also accessible outside`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-function-scope',
      type: 'concept',
      title_ru: 'Функциональная область видимости',
      title_en: 'Function scope',
      body_ru: 'Переменные внутри функции недоступны снаружи. Каждый вызов функции создаёт свою собственную область видимости.',
      body_en: 'Variables inside a function are not accessible outside. Each function call creates its own scope.',
      code: `function calculateTax(amount) {\n  const rate = 0.2; // local to function\n  const tax = amount * rate;\n  return tax;\n}\n\nconsole.log(calculateTax(100)); // 20\n// console.log(rate); // ReferenceError: rate is not defined`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-block-scope',
      type: 'concept',
      title_ru: 'Блочная область видимости',
      title_en: 'Block scope',
      body_ru: 'let и const ограничены блоком {}. var — нет: он "вытекает" из блоков, но не из функций. Это частая причина ошибок.',
      body_en: 'let and const are scoped to the block {}. var is not: it "leaks" out of blocks but not functions. This is a common source of bugs.',
      code: `if (true) {\n  let blockLet = 'inside block';\n  var blockVar = 'leaks out!';\n  const blockConst = 'also inside';\n}\n\nconsole.log(blockVar);   // 'leaks out!' (var leaks)\n// console.log(blockLet);   // ReferenceError\n// console.log(blockConst); // ReferenceError\n\nfor (let i = 0; i < 3; i++) {\n  // i is only alive here\n}\n// console.log(i); // ReferenceError`,
      codeLang: 'javascript',
    },
    {
      id: 'compare-var-let',
      type: 'compare',
      title_ru: 'var vs let / const',
      title_en: 'var vs let / const',
      body_ru: 'Всегда предпочитайте let и const. var оставлен для совместимости с Legacy-кодом.',
      body_en: 'Always prefer let and const. var is kept for legacy code compatibility.',
      compareLeft: {
        label_ru: 'var — старый способ',
        label_en: 'var — the old way',
        items_ru: ['Функциональная область видимости', 'Поднимается (hoisted) со значением undefined', 'Можно объявить повторно', 'Утекает из блоков if/for'],
        items_en: ['Function scoped', 'Hoisted with value undefined', 'Can be re-declared', 'Leaks out of if/for blocks'],
        color: 'amber',
      },
      compareRight: {
        label_ru: 'let / const — современный способ',
        label_en: 'let / const — the modern way',
        items_ru: ['Блочная область видимости', 'Поднимается, но не инициализируется (TDZ)', 'Нельзя объявить повторно', 'Остаётся внутри блока {}'],
        items_en: ['Block scoped', 'Hoisted but not initialized (TDZ)', 'Cannot be re-declared', 'Stays inside the block {}'],
        color: 'green',
      },
    },
    {
      id: 'concept-hoisting',
      type: 'concept',
      title_ru: 'Поднятие (hoisting)',
      title_en: 'Hoisting',
      body_ru: 'JavaScript "поднимает" объявления переменных и функций наверх своей области. var поднимается с undefined, let/const — без значения (Temporal Dead Zone).',
      body_en: 'JavaScript "hoists" variable and function declarations to the top of their scope. var is hoisted with undefined, let/const — without a value (Temporal Dead Zone).',
      code: `// var hoisting\nconsole.log(x); // undefined (not an error!)\nvar x = 5;\n\n// let — Temporal Dead Zone\n// console.log(y); // ReferenceError: Cannot access 'y' before initialization\nlet y = 10;\n\n// Function declarations are fully hoisted\nsayHi(); // Works! 'Hi'\nfunction sayHi() { console.log('Hi'); }\n\n// Function expressions are NOT hoisted\n// greet(); // TypeError: greet is not a function\nconst greet = () => 'Hello';`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-closure',
      type: 'concept',
      title_ru: 'Замыкание',
      title_en: 'Closure',
      body_ru: 'Замыкание — это функция, которая "помнит" переменные из своей внешней области видимости даже после того, как та функция завершила работу.',
      body_en: 'A closure is a function that "remembers" variables from its outer scope even after that outer function has finished executing.',
      code: `function makeGreeter(greeting) {\n  // greeting is captured in closure\n  return function(name) {\n    return \`\${greeting}, \${name}!\`;\n  };\n}\n\nconst sayHello = makeGreeter('Hello');\nconst sayHola  = makeGreeter('Hola');\n\nconsole.log(sayHello('Alice')); // 'Hello, Alice!'\nconsole.log(sayHola('Carlos')); // 'Hola, Carlos!'\n// Each closure has its own 'greeting'`,
      codeLang: 'javascript',
    },
    {
      id: 'anim-closure',
      type: 'code-anim',
      title_ru: 'Счётчик на замыканиях',
      title_en: 'Closure counter',
      body_ru: 'makeCounter возвращает функцию, которая хранит своё собственное состояние count.',
      body_en: 'makeCounter returns a function that holds its own private count state.',
      animMode: 'console',
      animSteps: [
        {
          code: `function makeCounter() {\n  let count = 0; // private variable\n  return function() {\n    count += 1;\n    return count;\n  };\n}`,
          comment_ru: 'Определяем фабричную функцию makeCounter',
          comment_en: 'Define the makeCounter factory function',
          output: '',
        },
        {
          code: `function makeCounter() {\n  let count = 0;\n  return function() { count += 1; return count; };\n}\n\nconst counter = makeCounter();`,
          comment_ru: 'Создаём первый счётчик — count = 0 "заперт" внутри',
          comment_en: 'Create first counter — count = 0 is "locked" inside',
          output: '',
        },
        {
          code: `function makeCounter() {\n  let count = 0;\n  return function() { count += 1; return count; };\n}\nconst counter = makeCounter();\nconsole.log(counter()); // 1\nconsole.log(counter()); // 2\nconsole.log(counter()); // 3`,
          comment_ru: 'Вызываем — каждый раз count растёт',
          comment_en: 'Call it — count increments each time',
          output: '1\n2\n3',
        },
        {
          code: `function makeCounter() {\n  let count = 0;\n  return function() { count += 1; return count; };\n}\nconst counter = makeCounter();\nconst counter2 = makeCounter(); // independent!\nconsole.log(counter());  // 4\nconsole.log(counter2()); // 1 — own count!`,
          comment_ru: 'Второй счётчик независим — своё замыкание',
          comment_en: 'Second counter is independent — its own closure',
          output: '4\n1',
        },
      ],
    },
    {
      id: 'analogy-scope',
      type: 'analogy',
      title_ru: 'Аналогия: матрёшки',
      title_en: 'Analogy: Russian dolls',
      body_ru: 'Представьте области видимости как матрёшки. Внутренняя кукла видит всё снаружи (внешние области). Но внешняя кукла не видит, что спрятано внутри.',
      body_en: 'Think of scopes as Russian nesting dolls. The inner doll can see everything outside (outer scopes). But the outer doll cannot see what is hidden inside.',
      visual: { kind: 'emoji', emojis: ['🪆', '🪆', '🪆'], caption_ru: 'Вложенные области видимости', caption_en: 'Nested scopes' },
    },
    {
      id: 'tip-closures-use',
      type: 'tip',
      title_ru: 'Практические применения замыканий',
      title_en: 'Practical uses of closures',
      body_ru: 'Замыкания используются повсеместно: в обработчиках событий (помнят, какую кнопку нажали), в React (useState хранит состояние), в модульном паттерне (скрывают приватные данные).',
      body_en: 'Closures are used everywhere: event handlers (remember which button was clicked), React (useState stores state), module pattern (hides private data).',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Практика',
      title_en: 'Practice',
      body_ru: 'Создайте свой счётчик с замыканием и поэкспериментируйте с областями видимости.',
      body_en: 'Build your own closure counter and experiment with different scopes.',
    },
  ],
  content: {
    intro_ru: 'Понимание области видимости — ключ к написанию надёжного кода. Замыкания делают возможным инкапсуляцию состояния, и они используются буквально в каждом современном JavaScript-фреймворке.',
    intro_en: 'Understanding scope is the key to writing reliable code. Closures enable state encapsulation, and they are used in literally every modern JavaScript framework.',
    blocks: [
      {
        sectionId: 'global',
        heading_ru: 'Глобальная область видимости и почему её следует избегать',
        heading_en: 'Global scope and why to avoid it',
        text_ru: 'Переменные, объявленные вне любой функции или блока, попадают в глобальную область видимости. В браузере они автоматически становятся свойствами объекта window. Это удобно для небольших скриптов, но в крупных приложениях глобальные переменные быстро становятся источником конфликтов имён и непредсказуемых ошибок.\n\nНаилучшая практика — держать глобальную область видимости чистой. Объявляйте переменные как можно ближе к месту использования, используйте модули или IIFE (немедленно вызываемые функции), чтобы изолировать код. В современных проектах с ES-модулями переменные по умолчанию локальны для модуля.',
        text_en: 'Variables declared outside any function or block enter the global scope. In the browser they automatically become properties of the window object. This is convenient for small scripts, but in large applications global variables quickly become a source of name conflicts and unpredictable bugs.\n\nBest practice is to keep the global scope clean. Declare variables as close to their usage as possible, and use modules or IIFEs (immediately invoked function expressions) to isolate code. In modern projects with ES modules, variables are local to the module by default.',
        code: `// Global variable — accessible everywhere
const APP_VERSION = '1.0.0';

function showVersion() {
  console.log(APP_VERSION); // accessible
}
showVersion(); // '1.0.0'

// var without declaration goes to global (avoid!)
function badPractice() {
  undeclaredVar = 'oops'; // becomes window.undeclaredVar
}

// Better: use const/let and limit scope
function goodPractice() {
  const localValue = 'stays here';
  console.log(localValue);
}
// console.log(localValue); // ReferenceError`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'function-scope',
        heading_ru: 'Функциональная область видимости и приватные переменные',
        heading_en: 'Function scope and private variables',
        text_ru: 'Каждая функция создаёт свою собственную область видимости. Переменные, объявленные внутри функции, невидимы снаружи — это делает их «приватными». Каждый вызов функции получает свою отдельную копию локальных переменных, что позволяет функциям работать независимо друг от друга.\n\nЭто фундаментальный принцип инкапсуляции в JavaScript. Функции могут читать переменные из внешних областей видимости (лексическое окружение), но внешний код никогда не сможет случайно изменить локальную переменную функции.',
        text_en: 'Every function creates its own scope. Variables declared inside a function are invisible outside — this makes them "private". Each function call gets its own separate copy of local variables, allowing functions to work independently from one another.\n\nThis is a fundamental principle of encapsulation in JavaScript. Functions can read variables from outer scopes (lexical environment), but external code can never accidentally modify a function\'s local variable.',
        code: `function calculateTotal(items) {
  const TAX_RATE = 0.2; // private to this function
  let subtotal = 0;

  for (const item of items) {
    subtotal += item.price;
  }

  const tax = subtotal * TAX_RATE;
  return subtotal + tax;
}

console.log(calculateTotal([{ price: 100 }, { price: 50 }])); // 180
// console.log(TAX_RATE); // ReferenceError — private!
// console.log(subtotal); // ReferenceError — private!

// Each call gets its OWN variables
function counter() {
  let count = 0;
  count += 1;
  return count;
}
console.log(counter()); // 1
console.log(counter()); // 1 (fresh count each call)`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'block-scope',
        heading_ru: 'Блочная область видимости: let, const и циклы',
        heading_en: 'Block scope: let, const and loops',
        text_ru: 'Ключевые слова let и const, введённые в ES6, создают блочную область видимости: переменная существует только внутри ближайшего блока {}. Это относится к блокам if, for, while, switch и любым другим фигурным скобкам.\n\nПрежний способ — var — ограничен только функцией, поэтому var «вытекает» из блоков if и for. Это классический источник ошибок. Использование let в цикле for особенно полезно: каждая итерация получает свою отдельную переменную-счётчик, что критически важно при работе с замыканиями внутри цикла.',
        text_en: 'The let and const keywords introduced in ES6 create block scope: the variable exists only inside the nearest {} block. This applies to if, for, while, switch blocks and any other curly braces.\n\nThe old way — var — is only bounded by a function, so var "leaks" out of if and for blocks. This is a classic source of bugs. Using let in a for loop is especially useful: each iteration gets its own separate counter variable, which is critical when working with closures inside a loop.',
        code: `// let and const are block-scoped
if (true) {
  let blockOnly = 'inside block';
  const alsoBlock = 42;
  var leaksOut = 'I escape!';
}
console.log(leaksOut);    // 'I escape!' — var leaks
// console.log(blockOnly); // ReferenceError
// console.log(alsoBlock); // ReferenceError

// for loop: let gives each iteration its own variable
for (let i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
// Prints: 0, 1, 2  (correct with let)

// Same loop with var:
for (var j = 0; j < 3; j++) {
  setTimeout(() => console.log(j), 100);
}
// Prints: 3, 3, 3  (bug — var is shared!)`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'hoisting',
        heading_ru: 'Поднятие: что происходит до выполнения кода',
        heading_en: 'Hoisting: what happens before code runs',
        text_ru: 'Перед выполнением кода JavaScript «сканирует» файл и поднимает (hoist) объявления переменных и функций в начало их области видимости. Объявления var поднимаются со значением undefined, поэтому обращение до объявления не вызывает ошибку, но возвращает undefined.\n\nОбъявления функций (function declaration) поднимаются полностью вместе с телом, поэтому их можно вызывать до объявления. Но функциональные выражения (const fn = function() {}) и стрелочные функции (const fn = () => {}) не поднимаются — они ведут себя как обычные переменные. let и const поднимаются, но не инициализируются: попытка обратиться к ним до объявления вызывает ReferenceError — это называется Temporal Dead Zone (TDZ).',
        text_en: 'Before executing code, JavaScript "scans" the file and hoists variable and function declarations to the top of their scope. var declarations are hoisted with value undefined, so accessing them before the declaration does not cause an error but returns undefined.\n\nFunction declarations are fully hoisted together with their body, so they can be called before the declaration. But function expressions (const fn = function() {}) and arrow functions (const fn = () => {}) are not hoisted — they behave like regular variables. let and const are hoisted but not initialized: trying to access them before the declaration throws a ReferenceError — this is called the Temporal Dead Zone (TDZ).',
        code: `// var: hoisted with undefined
console.log(score); // undefined (no error!)
var score = 100;
console.log(score); // 100

// Function declaration: fully hoisted
greet(); // 'Hello!' — works before declaration
function greet() { console.log('Hello!'); }

// Function expression: NOT hoisted
// sayBye(); // TypeError: sayBye is not a function
const sayBye = function() { console.log('Bye!'); };

// let/const: TDZ — ReferenceError before declaration
// console.log(level); // ReferenceError: Cannot access 'level' before initialization
let level = 5;

// Arrow function: same as const — NOT hoisted
// double(3); // TypeError
const double = (n) => n * 2;`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'closure',
        heading_ru: 'Модульный паттерн с замыканием',
        heading_en: 'Module pattern with closure',
        text_ru: 'До ES-модулей разработчики использовали замыкания для создания приватных данных и публичного API.',
        text_en: 'Before ES modules, developers used closures to create private data and a public API.',
        code: `const bank = (function() {\n  let balance = 0; // private\n\n  return {\n    deposit(amount) { balance += amount; },\n    withdraw(amount) {\n      if (amount > balance) throw new Error('Insufficient funds');\n      balance -= amount;\n    },\n    getBalance() { return balance; },\n  };\n})();\n\nbank.deposit(100);\nbank.withdraw(30);\nconsole.log(bank.getBalance()); // 70\n// console.log(balance); // ReferenceError — private!`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'why-closures',
        heading_ru: 'Замыкания в обработчиках событий',
        heading_en: 'Closures in event handlers',
        text_ru: 'Классический пример — кнопки в цикле. Без замыкания все кнопки выведут одно и то же значение.',
        text_en: 'A classic example — buttons in a loop. Without a closure, all buttons will log the same value.',
        code: `// Bug with var:\nfor (var i = 0; i < 3; i++) {\n  document.querySelectorAll('button')[i].onclick = () => console.log(i);\n}\n// All print 3! (var is not block-scoped)\n\n// Fix with let:\nfor (let i = 0; i < 3; i++) {\n  document.querySelectorAll('button')[i].onclick = () => console.log(i);\n}\n// Prints 0, 1, 2 correctly (each iteration has its own i)`,
        codeLang: 'javascript',
      },
    ],
  },
  editorTask: {
    title_ru: 'Счётчик с замыканием',
    title_en: 'Closure counter',
    instructions_ru: 'Реализуйте функцию makeCounter, возвращающую объект с методами increment, decrement и reset. Каждый вызов makeCounter должен создавать независимый счётчик.',
    instructions_en: 'Implement a makeCounter function that returns an object with increment, decrement, and reset methods. Each call to makeCounter should create an independent counter.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `function makeCounter(startValue = 0) {\n  let count = startValue;\n\n  return {\n    increment() {\n      // your code: increase count by 1, return new count\n    },\n    decrement() {\n      // your code: decrease count by 1, return new count\n    },\n    reset() {\n      // your code: reset count to startValue, return 0\n    },\n    getCount() {\n      return count;\n    },\n  };\n}\n\n// Test it:\nconst c1 = makeCounter(10);\nconst c2 = makeCounter();\n\nconsole.log(c1.increment()); // 11\nconsole.log(c1.increment()); // 12\nconsole.log(c2.increment()); // 1 (independent)\nconsole.log(c1.reset());     // 10 (back to start)\nconsole.log(c1.getCount()); // 10`,
    },
    hints_ru: [
      'increment: count += 1; return count;',
      'decrement: count -= 1; return count;',
      'reset: count = startValue; return count;',
      'Переменная count недоступна снаружи — это и есть замыкание!',
    ],
    hints_en: [
      'increment: count += 1; return count;',
      'decrement: count -= 1; return count;',
      'reset: count = startValue; return count;',
      'The count variable is inaccessible outside — that is the closure!',
    ],
  },
  keyTerms: [
    { term_ru: 'Область видимости', term_en: 'Scope', definition_ru: 'Контекст, в котором доступна переменная', definition_en: 'The context in which a variable is accessible', example_ru: 'Глобальная, функциональная, блочная области', example_en: 'Global, function, block scope' },
    { term_ru: 'Замыкание', term_en: 'Closure', definition_ru: 'Функция, запоминающая внешние переменные после завершения внешней функции', definition_en: 'A function that remembers outer variables after the outer function finishes', example_ru: 'makeCounter возвращает функцию, помнящую count', example_en: 'makeCounter returns a function that remembers count' },
    { term_ru: 'Поднятие (hoisting)', term_en: 'Hoisting', definition_ru: 'Механизм перемещения объявлений в начало области видимости', definition_en: 'The mechanism of moving declarations to the top of their scope', example_ru: 'var объявления поднимаются со значением undefined', example_en: 'var declarations are hoisted with value undefined' },
    { term_ru: 'Временная мёртвая зона', term_en: 'Temporal Dead Zone (TDZ)', definition_ru: 'Период до инициализации let/const, когда обращение вызывает ReferenceError', definition_en: 'The period before let/const initialization when access throws ReferenceError', example_ru: 'console.log(x) до let x = 1 → ReferenceError', example_en: 'console.log(x) before let x = 1 → ReferenceError' },
    { term_ru: 'Лексическое окружение', term_en: 'Lexical environment', definition_ru: 'Структура, хранящая переменные и ссылку на внешнее окружение', definition_en: 'A structure storing variables and a reference to the outer environment', example_ru: 'Каждая функция хранит ссылку на своё лексическое окружение', example_en: 'Every function holds a reference to its lexical environment' },
  ],
  didYouKnow: [
    { text_ru: 'Замыкания — основа React-хуков. useState и useEffect используют замыкания, чтобы "помнить" состояние между рендерами.', text_en: 'Closures are the foundation of React hooks. useState and useEffect use closures to "remember" state between renders.' },
    { text_ru: 'Слово "замыкание" (closure) означает, что функция "замыкает" (closes over) переменные из внешней области видимости.', text_en: 'The word "closure" means the function "closes over" variables from the outer scope.' },
  ],
  quiz: [
    { id: 'q1', text_ru: 'Какое ключевое слово создаёт блочную область видимости?', text_en: 'Which keyword creates block scope?', options_ru: ['var', 'function', 'let', 'global'], options_en: ['var', 'function', 'let', 'global'], correctIndex: 2, explanation_ru: 'let и const создают блочную область видимости. var — только функциональную.', explanation_en: 'let and const create block scope. var only creates function scope.' },
    { id: 'q2', text_ru: 'Что такое замыкание?', text_en: 'What is a closure?', options_ru: ['Синтаксическая ошибка', 'Функция, помнящая переменные своего внешнего контекста', 'Способ закрыть браузер', 'Тип цикла'], options_en: ['A syntax error', 'A function that remembers outer variables', 'A way to close the browser', 'A type of loop'], correctIndex: 1, explanation_ru: 'Замыкание — это функция + её лексическое окружение: она "помнит" переменные из внешней области.', explanation_en: 'A closure is a function + its lexical environment: it "remembers" outer variables.' },
    { id: 'q3', text_ru: 'Что выведет console.log(x) ПЕРЕД var x = 5?', text_en: 'What does console.log(x) print BEFORE var x = 5?', options_ru: ['5', 'ReferenceError', 'undefined', 'null'], options_en: ['5', 'ReferenceError', 'undefined', 'null'], correctIndex: 2, explanation_ru: 'var поднимается (hoisted) со значением undefined, поэтому не вызывает ошибку, но значение ещё не присвоено.', explanation_en: 'var is hoisted with value undefined, so no error, but the value is not yet assigned.' },
    { id: 'q4', text_ru: 'В чём преимущество замыканий-счётчиков перед глобальными переменными?', text_en: 'What advantage do closure counters have over global variables?', options_ru: ['Они быстрее', 'Данные приватны и не конфликтуют с остальным кодом', 'Они занимают меньше памяти', 'Разницы нет'], options_en: ['They are faster', 'Data is private and does not conflict with other code', 'They use less memory', 'No difference'], correctIndex: 1, explanation_ru: 'Замыкания инкапсулируют состояние, делая его приватным и безопасным от случайного изменения.', explanation_en: 'Closures encapsulate state, making it private and safe from accidental modification.' },
    { id: 'q5', text_ru: 'Что такое Temporal Dead Zone?', text_en: 'What is the Temporal Dead Zone?', options_ru: ['Зона без интернета', 'Период до инициализации let/const, когда к ним нельзя обратиться', 'Устаревший код', 'Глобальная переменная'], options_en: ['A zone without internet', 'The period before let/const initialization when they cannot be accessed', 'Deprecated code', 'A global variable'], correctIndex: 1, explanation_ru: 'TDZ — это промежуток от начала блока до объявления let/const. Любое обращение вызывает ReferenceError.', explanation_en: 'TDZ is the gap from block start to the let/const declaration. Any access throws ReferenceError.' },
  ],
}
