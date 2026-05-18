import type { Lesson } from '@/types/lesson'

export const jsFunctions: Lesson = {
  slug: 'js-functions',
  category: 'JS',
  readTime: 9,
  icon: '🔧',
  title_ru: 'Функции в JavaScript',
  title_en: 'Functions in JavaScript',
  description_ru: 'Объявление функций, параметры, возвращаемое значение и стрелочные функции — главный инструмент организации кода.',
  description_en: 'Function declaration, parameters, return values, and arrow functions — the main tool for organizing code.',

  sections: [
    { id: 'declaration', title_ru: 'Объявление функций', title_en: 'Function Declaration' },
    { id: 'parameters', title_ru: 'Параметры и аргументы', title_en: 'Parameters and Arguments' },
    { id: 'return', title_ru: 'Возвращаемое значение', title_en: 'Return Value' },
    { id: 'scope', title_ru: 'Область видимости', title_en: 'Scope' },
    { id: 'arrow', title_ru: 'Стрелочные функции', title_en: 'Arrow Functions' },
  ],

  slides: [
    {
      id: 'title',
      type: 'title',
      title_ru: 'Функции в JavaScript',
      title_en: 'Functions in JavaScript',
      body_ru: 'Функции — это многоразовые блоки кода, которые выполняют определённую задачу. Они помогают организовать код, избежать повторений и сделать программу легче для чтения.',
      body_en: 'Functions are reusable blocks of code that perform a specific task. They help organize code, avoid repetition, and make programs easier to read.',
      visual: { kind: 'emoji', emojis: ['🔧', '⚙️', '🔁'], caption_ru: 'Повторное использование кода', caption_en: 'Code Reuse' },
    },
    {
      id: 'declaration',
      type: 'concept',
      title_ru: 'Объявление функции',
      title_en: 'Function Declaration',
      body_ru: 'Функция объявляется с помощью ключевого слова function, после которого следует имя, список параметров в скобках и тело в фигурных скобках.',
      body_en: 'A function is declared with the function keyword, followed by a name, a parameter list in parentheses, and a body in curly braces.',
      code: `function greet(name) {
  console.log("Привет, " + name + "!");
}

// Вызов функции
greet("Алиса");  // Привет, Алиса!
greet("Иван");   // Привет, Иван!`,
      codeLang: 'javascript',
    },
    {
      id: 'parameters',
      type: 'code',
      title_ru: 'Параметры и значения по умолчанию',
      title_en: 'Parameters and Default Values',
      body_ru: 'Параметры — это переменные в определении функции. Аргументы — конкретные значения при вызове. Параметры могут иметь значения по умолчанию.',
      body_en: 'Parameters are variables in a function definition. Arguments are the actual values at call time. Parameters can have default values.',
      code: `function createGreeting(name, language = "ru") {
  if (language === "ru") {
    return \`Привет, \${name}!\`;
  }
  return \`Hello, \${name}!\`;
}

console.log(createGreeting("Мария"));         // Привет, Мария!
console.log(createGreeting("Maria", "en"));   // Hello, Maria!`,
      codeLang: 'javascript',
    },
    {
      id: 'return',
      type: 'concept',
      title_ru: 'Оператор return',
      title_en: 'The return Statement',
      body_ru: 'return завершает выполнение функции и возвращает значение вызывающему коду. Функция без return возвращает undefined.',
      body_en: 'return ends function execution and sends a value back to the calling code. A function without return returns undefined.',
      bullets: [
        { text_ru: 'return немедленно прекращает выполнение функции', text_en: 'return immediately stops function execution' },
        { text_ru: 'Возвращённое значение можно сохранить в переменную', text_en: 'The returned value can be saved to a variable' },
        { text_ru: 'Можно вернуть любой тип: число, строку, объект, массив', text_en: 'Any type can be returned: number, string, object, array' },
        { text_ru: 'Функция без return возвращает undefined', text_en: 'A function without return returns undefined' },
      ],
    },
    {
      id: 'anim-functions',
      type: 'code-anim',
      title_ru: 'Строим функцию шаг за шагом',
      title_en: 'Building a Function Step by Step',
      body_ru: 'Посмотрите, как постепенно улучшать функцию: от простой до многофункциональной.',
      body_en: 'Watch how to progressively improve a function from simple to feature-rich.',
      animMode: 'console',
      animSteps: [
        {
          code: 'function add(a, b) {\n  return a + b;\n}',
          comment_ru: 'Базовая функция сложения',
          comment_en: 'Basic addition function',
          output: '',
        },
        {
          code: 'function add(a, b) {\n  return a + b;\n}\nconsole.log(add(3, 4));',
          comment_ru: 'Вызываем и выводим результат',
          comment_en: 'Call and log the result',
          output: '7',
        },
        {
          code: 'function add(a, b) {\n  return a + b;\n}\nconst result = add(10, 25);\nconsole.log(`Сумма: ${result}`);',
          comment_ru: 'Сохраняем результат в переменную',
          comment_en: 'Save the result to a variable',
          output: 'Сумма: 35',
        },
        {
          code: 'function calculate(a, b, op = "+") {\n  if (op === "+") return a + b;\n  if (op === "-") return a - b;\n  if (op === "*") return a * b;\n  if (op === "/") return a / b;\n}\nconsole.log(calculate(8, 2, "*"));\nconsole.log(calculate(8, 2));',
          comment_ru: 'Расширяем до мини-калькулятора с параметром по умолчанию',
          comment_en: 'Expand to a mini-calculator with a default parameter',
          output: '16\n10',
        },
      ],
    },
    {
      id: 'scope',
      type: 'tip',
      title_ru: 'Область видимости функции',
      title_en: 'Function Scope',
      body_ru: 'Переменные, объявленные внутри функции, недоступны снаружи. Это называется локальной областью видимости и защищает код от конфликтов имён.',
      body_en: 'Variables declared inside a function are not accessible outside. This is called local scope and protects code from name conflicts.',
      code: `const globalMessage = "Я глобальная";

function example() {
  const localMessage = "Я локальная";
  console.log(globalMessage);  // ОК — доступна
  console.log(localMessage);   // ОК — локальная
}

example();
console.log(globalMessage);   // ОК
// console.log(localMessage); // ReferenceError!`,
      codeLang: 'javascript',
    },
    {
      id: 'arrow-intro',
      type: 'code',
      title_ru: 'Стрелочные функции',
      title_en: 'Arrow Functions',
      body_ru: 'Стрелочные функции — краткий синтаксис для записи функций. Однострочные могут возвращать значение без ключевого слова return.',
      body_en: 'Arrow functions are a concise syntax for writing functions. One-liners can return a value without the return keyword.',
      code: `// Обычная функция
function square(x) {
  return x * x;
}

// Стрелочная функция
const square = (x) => x * x;

// Несколько параметров
const add = (a, b) => a + b;

// Без параметров
const greet = () => "Привет!";

console.log(square(5));  // 25
console.log(add(3, 7));  // 10
console.log(greet());    // Привет!`,
      codeLang: 'javascript',
    },
    {
      id: 'compare-hoisting',
      type: 'compare',
      title_ru: 'Объявление vs выражение функции',
      title_en: 'Function Declaration vs Expression',
      body_ru: 'Объявление функции поднимается (hoisting), функциональное выражение — нет.',
      body_en: 'Function declarations are hoisted; function expressions are not.',
      compareLeft: {
        label_ru: 'Объявление (declaration)',
        label_en: 'Declaration',
        items_ru: [
          'function greet() { ... }',
          'Можно вызвать до объявления',
          'Поднимается (hoisting)',
          'Удобно для именованных утилит',
        ],
        items_en: [
          'function greet() { ... }',
          'Can be called before declaration',
          'Hoisted to top of scope',
          'Great for named utility functions',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'Выражение (expression)',
        label_en: 'Expression',
        items_ru: [
          'const greet = () => { ... }',
          'Нельзя вызвать до объявления',
          'Не поднимается',
          'Явный порядок определений',
        ],
        items_en: [
          'const greet = () => { ... }',
          'Cannot be called before declaration',
          'Not hoisted',
          'Explicit definition order',
        ],
        color: 'green',
      },
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Попробуйте сами!',
      title_en: 'Try It Yourself!',
      body_ru: 'Напишите функцию, которая принимает имя и возраст и возвращает строку-приветствие. Затем преобразуйте её в стрелочную функцию.',
      body_en: 'Write a function that takes a name and age and returns a greeting string. Then convert it to an arrow function.',
    },
  ],

  content: {
    intro_ru: 'Функции — это сердце JavaScript. Они позволяют упаковать логику в переиспользуемые блоки, давать им имена и вызывать там, где нужно. Без функций любая программа превратилась бы в огромный неструктурированный список команд.',
    intro_en: 'Functions are the heart of JavaScript. They let you package logic into reusable blocks, name them, and call them wherever needed. Without functions, any program would be one huge unstructured list of commands.',
    blocks: [
      {
        sectionId: 'declaration',
        heading_ru: 'Анатомия функции',
        heading_en: 'Anatomy of a Function',
        text_ru: 'Функция состоит из имени (необязательно для анонимных), списка параметров и тела. Имя должно описывать действие — обычно глагол: calculate, formatDate, getUserName.',
        text_en: 'A function consists of a name (optional for anonymous ones), a parameter list, and a body. The name should describe the action — usually a verb: calculate, formatDate, getUserName.',
        code: `//   имя     параметры
function multiply(a, b) {
  // тело функции
  const result = a * b;
  return result; // возвращаемое значение
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'parameters',
        heading_ru: 'Rest-параметры и деструктуризация',
        heading_en: 'Rest Parameters and Destructuring',
        text_ru: 'Оператор ...rest позволяет принять произвольное количество аргументов как массив. Деструктуризация объектов в параметрах делает вызовы самодокументирующимися.',
        text_en: 'The ...rest operator allows accepting any number of arguments as an array. Object destructuring in parameters makes calls self-documenting.',
        code: `function sum(...numbers) {
  return numbers.reduce((acc, n) => acc + n, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

function createUser({ name, role = "user" }) {
  return { name, role, createdAt: Date.now() };
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'return',
        heading_ru: 'Ранний выход и guard-clauses',
        heading_en: 'Early Return and Guard Clauses',
        text_ru: 'Несколько return в функции — нормально. Ранний return для проверок входных данных (guard clause) уменьшает вложенность и делает код читаемее.',
        text_en: 'Multiple return statements in a function are normal. An early return for input validation (guard clause) reduces nesting and makes code more readable.',
        code: `function divide(a, b) {
  if (b === 0) return null; // guard clause
  return a / b;
}

console.log(divide(10, 2));  // 5
console.log(divide(10, 0));  // null`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'scope',
        heading_ru: 'Область видимости',
        heading_en: 'Scope',
        text_ru: 'Область видимости (scope) определяет, откуда в коде можно обратиться к переменной. Переменные, объявленные внутри функции, существуют только внутри неё — это локальная область видимости. Внешний код не имеет доступа к локальным переменным, что защищает от случайных конфликтов имён между разными функциями.\n\nФункции в JavaScript имеют доступ к переменным внешней области видимости — это называется замыканием. Если функция не находит переменную у себя, она ищет её в объемлющей области, затем в ещё более внешней, вплоть до глобальной. Такое «движение вверх по цепочке» называется scope chain.',
        text_en: 'Scope defines where in the code a variable can be accessed. Variables declared inside a function exist only within it — this is local scope. Code outside cannot access local variables, which protects against accidental name collisions between different functions.\n\nFunctions in JavaScript have access to variables from their outer scope — this is called a closure. If a function does not find a variable locally, it looks in the enclosing scope, then further outward, all the way to the global scope. This upward search is called the scope chain.',
        code: `const appName = "MyApp"; // глобальная

function showWelcome(user) {
  const message = \`Добро пожаловать в \${appName}, \${user}!\`;
  console.log(message); // ОК — message и appName доступны
}

showWelcome("Алиса");
// console.log(message); // ReferenceError: message не определена

function outer() {
  const x = 10;
  function inner() {
    const y = 20;
    console.log(x + y); // 30 — inner видит x из outer
  }
  inner();
}
outer();`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'arrow',
        heading_ru: 'Когда использовать стрелочные функции',
        heading_en: 'When to Use Arrow Functions',
        text_ru: 'Стрелочные функции идеальны для коллбэков и функций высшего порядка (map, filter, sort). У них нет собственного this, что делает их предсказуемыми в обработчиках событий и асинхронном коде.',
        text_en: 'Arrow functions are ideal for callbacks and higher-order functions (map, filter, sort). They have no own this, making them predictable in event handlers and async code.',
        code: `const numbers = [3, 1, 4, 1, 5, 9, 2, 6];

const doubled = numbers.map(n => n * 2);
const evens = numbers.filter(n => n % 2 === 0);
const sorted = [...numbers].sort((a, b) => a - b);

console.log(doubled); // [6,2,8,2,10,18,4,12]
console.log(evens);   // [4,2,6]
console.log(sorted);  // [1,1,2,3,4,5,6,9]`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Функция-приветствие',
    title_en: 'Greeting Function',
    instructions_ru: 'Напишите функцию greet(name, age), которая возвращает строку-приветствие. Добавьте параметр language со значением по умолчанию "ru". Затем напишите стрелочную версию этой функции. Вызовите обе с разными аргументами.',
    instructions_en: 'Write a function greet(name, age) that returns a greeting string. Add a language parameter with default value "ru". Then write an arrow version of the function. Call both with different arguments.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// Обычная функция / Regular function
function greet(name, age, language = "ru") {
  if (language === "en") {
    return \`Hello, \${name}! You are \${age} years old.\`;
  }
  return \`Привет, \${name}! Тебе \${age} лет.\`;
}

// Стрелочная функция / Arrow function
const greetArrow = (name, age, language = "ru") =>
  language === "en"
    ? \`Hello, \${name}! You are \${age} years old.\`
    : \`Привет, \${name}! Тебе \${age} лет.\`;

// Вызовы / Calls
console.log(greet("Алиса", 25));
console.log(greet("Alice", 25, "en"));
console.log(greetArrow("Иван", 30));
`,
    },
    hints_ru: [
      'Параметр по умолчанию записывается как param = "значение" в списке параметров.',
      'return немедленно завершает функцию и возвращает результат.',
      'Стрелочная функция с одним выражением не нуждается в return и {}.',
      'Тернарный оператор condition ? a : b — краткая замена if/else.',
      'Вызов функции без третьего аргумента использует значение по умолчанию.',
    ],
    hints_en: [
      'A default parameter is written as param = "value" in the parameter list.',
      'return immediately ends the function and sends back the result.',
      'An arrow function with a single expression needs no return or {}.',
      'The ternary operator condition ? a : b is a short substitute for if/else.',
      'Calling the function without the third argument uses the default value.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Функция',
      term_en: 'Function',
      definition_ru: 'Именованный блок кода, который можно вызывать повторно с разными аргументами.',
      definition_en: 'A named block of code that can be called repeatedly with different arguments.',
      example_ru: 'function add(a, b) { return a + b; }',
      example_en: 'function add(a, b) { return a + b; }',
    },
    {
      term_ru: 'Параметр',
      term_en: 'Parameter',
      definition_ru: 'Переменная в определении функции, принимающая значение при вызове.',
      definition_en: 'A variable in a function definition that receives a value at call time.',
      example_ru: 'function greet(name) { ... } // name — параметр',
      example_en: 'function greet(name) { ... } // name is a parameter',
    },
    {
      term_ru: 'return',
      term_en: 'return',
      definition_ru: 'Оператор, завершающий функцию и возвращающий значение вызывающему коду.',
      definition_en: 'Statement that ends a function and sends a value back to the calling code.',
      example_ru: 'return a + b;',
      example_en: 'return a + b;',
    },
    {
      term_ru: 'Подъём (hoisting)',
      term_en: 'Hoisting',
      definition_ru: 'Механизм JS, при котором объявления функций перемещаются в начало своей области видимости перед выполнением.',
      definition_en: 'The JS mechanism where function declarations are moved to the top of their scope before execution.',
      example_ru: 'greet(); // работает до объявления\nfunction greet() {}',
      example_en: 'greet(); // works before declaration\nfunction greet() {}',
    },
    {
      term_ru: 'Стрелочная функция',
      term_en: 'Arrow Function',
      definition_ru: 'Краткий синтаксис функции: const fn = (x) => x * 2. Не имеет собственного this.',
      definition_en: 'Concise function syntax: const fn = (x) => x * 2. Has no own this.',
      example_ru: 'const double = x => x * 2;',
      example_en: 'const double = x => x * 2;',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В JavaScript функции — это объекты первого класса (first-class citizens). Это означает, что их можно передавать как аргументы, возвращать из других функций и хранить в переменных — точно так же, как числа или строки.',
      text_en: 'In JavaScript, functions are first-class citizens. This means they can be passed as arguments, returned from other functions, and stored in variables — just like numbers or strings.',
    },
    {
      text_ru: 'Функция, которая вызывает сама себя, называется рекурсивной. Классический пример — вычисление факториала: factorial(5) = 5 * factorial(4) = ... = 120.',
      text_en: 'A function that calls itself is called recursive. The classic example is factorial: factorial(5) = 5 * factorial(4) = ... = 120.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что возвращает функция, в которой нет оператора return?',
      text_en: 'What does a function without a return statement return?',
      options_ru: ['0', 'null', 'undefined', 'false'],
      options_en: ['0', 'null', 'undefined', 'false'],
      correctIndex: 2,
      explanation_ru: 'Функция без return автоматически возвращает undefined.',
      explanation_en: 'A function without return automatically returns undefined.',
    },
    {
      id: 'q2',
      text_ru: 'Как объявить параметр со значением по умолчанию?',
      text_en: 'How do you declare a parameter with a default value?',
      options_ru: [
        'function f(x default 0) {}',
        'function f(x = 0) {}',
        'function f(x || 0) {}',
        'function f(x: 0) {}',
      ],
      options_en: [
        'function f(x default 0) {}',
        'function f(x = 0) {}',
        'function f(x || 0) {}',
        'function f(x: 0) {}',
      ],
      correctIndex: 1,
      explanation_ru: 'Синтаксис параметра по умолчанию: имя = значение в списке параметров функции.',
      explanation_en: 'Default parameter syntax: name = value in the function parameter list.',
    },
    {
      id: 'q3',
      text_ru: 'Можно ли вызвать объявление функции (function declaration) до её объявления в коде?',
      text_en: 'Can a function declaration be called before it appears in the code?',
      options_ru: ['Нет, это вызовет ошибку', 'Да, из-за hoisting', 'Только в строгом режиме', 'Только если функция не имеет параметров'],
      options_en: ['No, it causes an error', 'Yes, due to hoisting', 'Only in strict mode', 'Only if the function has no parameters'],
      correctIndex: 1,
      explanation_ru: 'Объявления функций поднимаются (hoisting) — JavaScript переносит их в начало области видимости до выполнения кода.',
      explanation_en: 'Function declarations are hoisted — JavaScript moves them to the top of the scope before code runs.',
    },
    {
      id: 'q4',
      text_ru: 'Какой из вариантов является корректной стрелочной функцией с неявным return?',
      text_en: 'Which option is a valid arrow function with an implicit return?',
      options_ru: [
        'const f = (x) => { x * 2 }',
        'const f = (x) => return x * 2',
        'const f = (x) => x * 2',
        'const f = x => { return }',
      ],
      options_en: [
        'const f = (x) => { x * 2 }',
        'const f = (x) => return x * 2',
        'const f = (x) => x * 2',
        'const f = x => { return }',
      ],
      correctIndex: 2,
      explanation_ru: 'Без фигурных скобок выражение справа от => автоматически становится возвращаемым значением.',
      explanation_en: 'Without curly braces, the expression to the right of => is automatically the return value.',
    },
    {
      id: 'q5',
      text_ru: 'Переменная, объявленная внутри функции через const, доступна снаружи?',
      text_en: 'Is a variable declared inside a function with const accessible outside?',
      options_ru: ['Да, всегда', 'Да, если объявлена в начале', 'Нет, она локальная', 'Зависит от имени переменной'],
      options_en: ['Yes, always', 'Yes, if declared at the top', 'No, it is local', 'Depends on the variable name'],
      correctIndex: 2,
      explanation_ru: 'Переменные внутри функции имеют локальную область видимости и недоступны снаружи функции.',
      explanation_en: 'Variables inside a function have local scope and are not accessible outside the function.',
    },
  ],
}
