import type { Lesson } from '@/types/lesson'

export const javascriptFunctions: Lesson = {
  slug: 'javascript-functions',
  category: 'JS',
  readTime: 9,
  icon: '🔧',

  title_ru: 'Функции JavaScript',
  title_en: 'JavaScript Functions',

  description_ru: 'Функции — многоразовые блоки кода. Параметры, return и стрелочные функции.',
  description_en: 'Functions are reusable code blocks. Parameters, return and arrow functions.',

  sections: [
    { id: 'what-is-function', title_ru: 'Что такое функция',      title_en: 'What is a function' },
    { id: 'declare',          title_ru: 'Объявление функции',      title_en: 'Declaring a function' },
    { id: 'params',           title_ru: 'Параметры и аргументы',   title_en: 'Parameters and arguments' },
    { id: 'return',           title_ru: 'Возврат значения',        title_en: 'Returning a value' },
    { id: 'arrow',            title_ru: 'Стрелочные функции',      title_en: 'Arrow functions' },
    { id: 'key-terms',        title_ru: 'Ключевые термины',        title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Функции: код, который работает много раз',
      title_en: 'Functions: code that runs many times',
      body_ru: 'Функция — именованный блок кода, который выполняет задачу. Написал один раз — вызывай сколько угодно. Функции — строительные блоки любой программы.',
      body_en: 'A function is a named block of code that performs a task. Write once — call as many times as you like. Functions are the building blocks of every program.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Функция как рецепт',
      title_en: 'A function is like a recipe',
      body_ru: 'Рецепт блинов написан один раз, но готовишь по нему много раз. Меняешь ингредиенты — получаешь другой результат. Так же и функция: один код, разные данные на входе.',
      body_en: 'A pancake recipe is written once but cooked many times. Change the ingredients — get a different result. Same with functions: one piece of code, different inputs each call.',
      visual: {
        kind: 'emoji',
        emojis: ['🍳', '🔧', '⚙️'],
      },
      bullets: [
        { text_ru: '🍳 Рецепт = объявление функции — написано один раз', text_en: '🍳 Recipe = function declaration — written once' },
        { text_ru: '🔧 Ингредиенты = параметры — меняются при каждом вызове', text_en: '🔧 Ingredients = parameters — change with each call' },
        { text_ru: '⚙️ Блюдо = return — результат, который возвращается', text_en: '⚙️ Dish = return — the result that comes back' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Объявление и вызов функции',
      title_en: 'Declaring and calling a function',
      body_ru: 'Функция создаётся ключевым словом function. Код внутри фигурных скобок выполняется только при вызове. Вызов — это имя функции со скобками.',
      body_en: 'A function is created with the function keyword. Code inside curly braces only runs when called. A call is the function name followed by parentheses.',
      bullets: [
        { text_ru: '📝 function greet() { ... } — объявление', text_en: '📝 function greet() { ... } — declaration' },
        { text_ru: '▶️ greet() — вызов функции', text_en: '▶️ greet() — calling the function' },
        { text_ru: '🔄 Можно вызвать сколько угодно раз', text_en: '🔄 Can be called as many times as needed' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Строим функцию шаг за шагом',
      title_en: 'Building a function step by step',
      body_ru: 'Посмотри, как функция принимает данные и возвращает результат.',
      body_en: 'Watch how a function takes data and returns a result.',
      animMode: 'console',
      animSteps: [
        {
          code: 'function greet(name) {\n  return "Привет, " + name + "!";\n}',
          comment_ru: '1. Объявляем функцию с параметром name',
          comment_en: '1. Declare a function with parameter name',
        },
        {
          code: 'function greet(name) {\n  return "Привет, " + name + "!";\n}\n\ngreet("Аня");',
          comment_ru: '2. Вызываем функцию — передаём аргумент "Аня"',
          comment_en: '2. Call the function — pass argument "Anya"',
          output: 'Привет, Аня!',
        },
        {
          code: 'function greet(name) {\n  return "Привет, " + name + "!";\n}\n\nconsole.log(greet("Аня"));\nconsole.log(greet("Боб"));',
          comment_ru: '3. Вызываем дважды с разными именами',
          comment_en: '3. Call twice with different names',
          output: 'Привет, Аня!\nПривет, Боб!',
        },
        {
          code: 'function add(a, b) {\n  return a + b;\n}\n\nconsole.log(add(3, 5));\nconsole.log(add(10, 20));',
          comment_ru: '4. Функция с двумя параметрами — возвращает сумму',
          comment_en: '4. Function with two parameters — returns their sum',
          output: '8\n30',
        },
      ],
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Параметры и return',
      title_en: 'Parameters and return',
      body_ru: 'Параметры — местозаполнители в объявлении. Аргументы — конкретные значения при вызове. return возвращает результат и прекращает выполнение функции.',
      body_en: 'Parameters are placeholders in the declaration. Arguments are the actual values at the call site. return sends back a result and stops the function.',
      bullets: [
        { text_ru: '📥 Параметр: function add(a, b) — a и b это параметры', text_en: '📥 Parameter: function add(a, b) — a and b are parameters' },
        { text_ru: '📤 Аргумент: add(3, 5) — 3 и 5 это аргументы', text_en: '📤 Argument: add(3, 5) — 3 and 5 are arguments' },
        { text_ru: '↩️ return a + b — возвращает результат', text_en: '↩️ return a + b — returns the result' },
        { text_ru: '⚠️ Без return функция вернёт undefined', text_en: '⚠️ Without return a function returns undefined' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Стрелочные функции',
      title_en: 'Arrow functions',
      body_ru: 'Стрелочные функции (ES6) — более короткий синтаксис. Если тело содержит только return, можно убрать фигурные скобки и слово return.',
      body_en: 'Arrow functions (ES6) are shorter syntax. If the body is just a return, curly braces and the word return can be omitted.',
      code: `// Обычная функция
function square(x) {
  return x * x;
}

// Стрелочная функция
const square = (x) => {
  return x * x;
};

// Краткая запись (один return)
const square = (x) => x * x;

// Один параметр — скобки можно убрать
const double = x => x * 2;

// Без параметров — скобки обязательны
const greet = () => "Привет!";

console.log(square(5));  // 25
console.log(double(4));  // 8`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'compare',
      title_ru: 'function vs стрелочная функция',
      title_en: 'function vs arrow function',
      body_ru: 'Оба способа объявить функцию — используй тот, что читается проще.',
      body_en: 'Both ways declare a function — use whichever reads more clearly.',
      compareLeft: {
        label_ru: 'function declaration',
        label_en: 'function declaration',
        items_ru: [
          'function add(a, b) { return a + b; }',
          'Можно вызвать ДО объявления (hoisting)',
          'Лучше для именованных функций',
          'Привычный синтаксис',
        ],
        items_en: [
          'function add(a, b) { return a + b; }',
          'Can be called BEFORE declaration (hoisting)',
          'Better for named functions',
          'Familiar syntax',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'arrow function',
        label_en: 'arrow function',
        items_ru: [
          'const add = (a, b) => a + b;',
          'Нельзя вызвать до объявления',
          'Короче для коллбэков и map/filter',
          'Современный стиль (ES6+)',
        ],
        items_en: [
          'const add = (a, b) => a + b;',
          'Cannot be called before declaration',
          'Shorter for callbacks and map/filter',
          'Modern style (ES6+)',
        ],
        color: 'amber',
      },
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'В JavaScript функции — это объекты! Их можно хранить в переменных, передавать как аргументы другим функциям и возвращать из функций. Функция, передаваемая как аргумент, называется callback (коллбэк). Именно так работают addEventListener и setTimeout.',
      body_en: 'In JavaScript, functions are objects! They can be stored in variables, passed as arguments to other functions, and returned from functions. A function passed as an argument is called a callback. That\'s exactly how addEventListener and setTimeout work.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Напиши свою функцию!',
      title_en: 'Write your own function!',
      body_ru: 'Создай функцию, которая принимает имя и возраст, и выводит приветствие. Попробуй обычный и стрелочный синтаксис.',
      body_en: 'Create a function that takes a name and age and prints a greeting. Try both regular and arrow syntax.',
    },
  ],

  content: {
    intro_ru: `Функция — это именованный блок кода, который выполняет определённую задачу. Вместо
того чтобы писать один и тот же код снова и снова, создаёшь функцию один раз и вызываешь её
когда угодно. Функции — это строительные блоки любой программы на JavaScript.`,
    intro_en: `A function is a named block of code that performs a specific task. Instead of writing
the same code again and again, you create a function once and call it whenever needed.
Functions are the building blocks of any JavaScript program.`,

    blocks: [
      {
        sectionId: 'what-is-function',
        heading_ru: 'Что такое функция',
        heading_en: 'What is a function',
        text_ru: `Функция решает три проблемы:
• Повторное использование — пишешь код один раз, вызываешь много раз
• Организация — разбиваешь программу на маленькие именованные кусочки
• Абстракция — скрываешь детали реализации за понятным именем

Функцию нужно сначала объявить, а потом вызвать.`,
        text_en: `A function solves three problems:
• Reuse — write code once, call it many times
• Organisation — break a program into small named pieces
• Abstraction — hide implementation details behind a clear name

A function must be declared first, then called.`,
        code: `// Объявление
function sayHello() {
  console.log("Привет!");
  console.log("Как дела?");
}

// Вызов (можно много раз)
sayHello(); // Привет! Как дела?
sayHello(); // Привет! Как дела?`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'declare',
        heading_ru: 'Объявление функции',
        heading_en: 'Declaring a function',
        text_ru: `Синтаксис объявления функции:
  function имя(параметры) {
    // тело функции
  }

Части:
• function — ключевое слово
• имя — называй глаголами: greet, calculate, showMenu
• () — список параметров (может быть пустым)
• {} — тело функции — код, который выполняется при вызове`,
        text_en: `Function declaration syntax:
  function name(parameters) {
    // function body
  }

Parts:
• function — keyword
• name — use verbs: greet, calculate, showMenu
• () — parameter list (can be empty)
• {} — function body — code that runs when called`,
        code: `// Функция без параметров
function showWelcome() {
  console.log("Добро пожаловать!");
}
showWelcome(); // Добро пожаловать!

// Функция с параметрами
function greet(name) {
  console.log("Привет, " + name + "!");
}
greet("Аня"); // Привет, Аня!`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'params',
        heading_ru: 'Параметры и аргументы',
        heading_en: 'Parameters and arguments',
        text_ru: `Параметр — переменная-местозаполнитель в объявлении функции.
Аргумент — конкретное значение, передаваемое при вызове.

Можно передавать несколько параметров через запятую.
Если аргумент не передан, параметр равен undefined.
Параметр по умолчанию задаётся через =.`,
        text_en: `A parameter is a placeholder variable in the function declaration.
An argument is the actual value passed when calling.

Multiple parameters are separated by commas.
If an argument is not passed, the parameter is undefined.
A default parameter is set with =.`,
        code: `// Несколько параметров
function add(a, b) {
  console.log(a + b);
}
add(3, 5);  // 8
add(10, 20); // 30

// Параметр по умолчанию
function greet(name = "Гость") {
  console.log("Привет, " + name + "!");
}
greet("Аня");  // Привет, Аня!
greet();        // Привет, Гость!`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'return',
        heading_ru: 'Возврат значения',
        heading_en: 'Returning a value',
        text_ru: `return — ключевое слово, которое:
1. Возвращает значение из функции
2. Немедленно завершает выполнение функции

Функция без return возвращает undefined.
Используй return когда нужно получить результат вычислений.`,
        text_en: `return is a keyword that:
1. Returns a value from the function
2. Immediately stops the function

A function without return returns undefined.
Use return when you need the result of a computation.`,
        code: `function multiply(a, b) {
  return a * b;  // Возвращает результат
}

let result = multiply(4, 5);
console.log(result); // 20

// return прекращает работу функции
function checkAge(age) {
  if (age < 18) {
    return "Несовершеннолетний"; // ← здесь останавливаемся
  }
  return "Совершеннолетний";
}
console.log(checkAge(15)); // Несовершеннолетний
console.log(checkAge(20)); // Совершеннолетний`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'arrow',
        heading_ru: 'Стрелочные функции',
        heading_en: 'Arrow functions',
        text_ru: `Стрелочная функция — синтаксический сахар ES6. Пишется через =>
Если тело функции — один return, можно убрать {} и слово return.
Не имеет своего this — важно для методов объектов.`,
        text_en: `An arrow function is ES6 syntactic sugar. Written with =>
If the body is a single return, {} and the word return can be omitted.
Has no own this — important for object methods.`,
        code: `// Полная запись
const square = (x) => {
  return x * x;
};

// Сокращённая
const square = (x) => x * x;

// Один параметр — скобки необязательны
const double = x => x * 2;

// Нет параметров — скобки обязательны
const hello = () => "Привет!";

// Использование в map
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2); // [2, 4, 6]`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: функции',
    title_en: 'Try it yourself: functions',
    instructions_ru: `Напиши функции:
— getFullName(firstName, lastName) — возвращает полное имя
— isAdult(age) — возвращает true если age >= 18
— getGrade(score) — возвращает "A" (90+), "B" (80+), "C" (70+), "F" (ниже)`,
    instructions_en: `Write functions:
— getFullName(firstName, lastName) — returns the full name
— isAdult(age) — returns true if age >= 18
— getGrade(score) — returns "A" (90+), "B" (80+), "C" (70+), "F" (below)`,
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// Функция 1: полное имя
function getFullName(firstName, lastName) {
  return firstName + " " + lastName;
}
console.log(getFullName("Аня", "Иванова")); // Аня Иванова

// Функция 2: проверка возраста (стрелочная)
const isAdult = (age) => age >= 18;
console.log(isAdult(20)); // true
console.log(isAdult(15)); // false

// Функция 3: оценка
function getGrade(score) {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  return "F";
}
console.log(getGrade(95)); // A
console.log(getGrade(73)); // C`,
    },
    hints_ru: [
      'Используй return для возврата значения. Если функция ничего не возвращает — она вернёт undefined.',
      'Стрелочная функция с одним выражением: const fn = (x) => x * 2; — фигурные скобки и return не нужны.',
    ],
    hints_en: [
      'Use return to send back a value. If a function returns nothing, it returns undefined.',
      'Arrow function with one expression: const fn = (x) => x * 2; — no curly braces or return needed.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Функция', term_en: 'Function',
      definition_ru: 'Именованный блок кода, который выполняет задачу и может быть вызван многократно.',
      definition_en: 'A named block of code that performs a task and can be called multiple times.',
      example_ru: 'function greet(name) { return "Привет, " + name; }',
      example_en: 'function greet(name) { return "Hello, " + name; }',
    },
    {
      term_ru: 'Параметр', term_en: 'Parameter',
      definition_ru: 'Переменная-местозаполнитель в объявлении функции. Получает значение при вызове.',
      definition_en: 'A placeholder variable in the function declaration. Receives a value when called.',
      example_ru: 'function add(a, b) — a и b это параметры',
      example_en: 'function add(a, b) — a and b are parameters',
    },
    {
      term_ru: 'Аргумент', term_en: 'Argument',
      definition_ru: 'Конкретное значение, передаваемое в функцию при её вызове.',
      definition_en: 'The actual value passed to the function when it is called.',
      example_ru: 'add(3, 5) — 3 и 5 это аргументы',
      example_en: 'add(3, 5) — 3 and 5 are arguments',
    },
    {
      term_ru: 'return', term_en: 'return',
      definition_ru: 'Ключевое слово для возврата значения из функции. Прекращает её выполнение.',
      definition_en: 'Keyword for returning a value from a function. Stops its execution.',
      example_ru: 'return a + b; // возвращает сумму',
      example_en: 'return a + b; // returns the sum',
    },
    {
      term_ru: 'Стрелочная функция', term_en: 'Arrow function',
      definition_ru: 'Сокращённый синтаксис функции ES6: const fn = (x) => x * 2;',
      definition_en: 'Shortened ES6 function syntax: const fn = (x) => x * 2;',
      example_ru: 'const square = x => x * x;',
      example_en: 'const square = x => x * x;',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В JavaScript функции — это объекты! Их можно хранить в переменных, передавать как аргументы и возвращать из других функций. Функция, передаваемая как аргумент, называется callback.',
      text_en: 'In JavaScript, functions are objects! They can be stored in variables, passed as arguments, and returned from other functions. A function passed as an argument is called a callback.',
    },
    {
      text_ru: 'Обычная функция (function declaration) поднимается наверх файла (hoisting) и её можно вызвать до объявления. Стрелочная функция (const fn = () => {}) — нет. Это частая причина ошибок!',
      text_en: 'A regular function declaration is hoisted to the top of the file and can be called before it appears in the code. An arrow function (const fn = () => {}) is not. This is a common source of bugs!',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что такое параметр функции?',
      text_en: 'What is a function parameter?',
      options_ru: ['Результат функции', 'Переменная-местозаполнитель в объявлении', 'Тип функции', 'Имя функции'],
      options_en: ['The result of a function', 'A placeholder variable in the declaration', 'The type of a function', 'The function name'],
      correctIndex: 1,
      explanation_ru: 'Параметр — местозаполнитель: function add(a, b) — a и b это параметры. Конкретные значения при вызове называются аргументами.',
      explanation_en: 'A parameter is a placeholder: in function add(a, b) — a and b are parameters. The actual values at the call site are called arguments.',
    },
    {
      id: 'q2',
      text_ru: 'Что вернёт функция без оператора return?',
      text_en: 'What does a function without a return statement return?',
      options_ru: ['0', 'null', 'undefined', 'Ошибку'],
      options_en: ['0', 'null', 'undefined', 'An error'],
      correctIndex: 2,
      explanation_ru: 'Функция без return возвращает undefined — специальное значение JS, означающее "нет значения".',
      explanation_en: 'A function without return returns undefined — the special JS value meaning "no value".',
    },
    {
      id: 'q3',
      text_ru: 'Что произойдёт после выполнения return в функции?',
      text_en: 'What happens after return executes in a function?',
      options_ru: ['Функция начнётся заново', 'Функция прекращает выполнение', 'Появится ошибка', 'Код продолжится'],
      options_en: ['The function restarts', 'The function stops executing', 'An error appears', 'Code continues'],
      correctIndex: 1,
      explanation_ru: 'return немедленно прекращает выполнение функции и возвращает значение. Код после return не выполняется.',
      explanation_en: 'return immediately stops the function and returns the value. Code after return does not execute.',
    },
    {
      id: 'q4',
      text_ru: 'Как записать const double = (x) => { return x * 2; } в краткой форме?',
      text_en: 'How do you write const double = (x) => { return x * 2; } in short form?',
      options_ru: ['const double = x => x * 2', 'const double = x: x * 2', 'double(x) = x * 2', 'function double(x) => x * 2'],
      options_en: ['const double = x => x * 2', 'const double = x: x * 2', 'double(x) = x * 2', 'function double(x) => x * 2'],
      correctIndex: 0,
      explanation_ru: 'Когда тело стрелочной функции — один return, можно убрать {}, return, и скобки вокруг одного параметра: const double = x => x * 2',
      explanation_en: 'When the arrow function body is a single return, you can drop {}, return, and parentheses around a single parameter: const double = x => x * 2',
    },
    {
      id: 'q5',
      text_ru: 'Сколько раз можно вызвать одну функцию?',
      text_en: 'How many times can you call a single function?',
      options_ru: ['Только 1 раз', 'Только 2 раза', 'Максимум 100 раз', 'Сколько угодно раз'],
      options_en: ['Only 1 time', 'Only 2 times', 'Maximum 100 times', 'As many times as needed'],
      correctIndex: 3,
      explanation_ru: 'В этом и смысл функций — написал один раз, вызывай сколько угодно с разными аргументами.',
      explanation_en: 'That is the whole point of functions — write once, call as many times as needed with different arguments.',
    },
  ],
}
