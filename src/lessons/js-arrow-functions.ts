import type { Lesson } from '@/types/lesson'

export const jsArrowFunctions: Lesson = {
  slug: 'js-arrow-functions',
  category: 'JS',
  readTime: 8,
  icon: '➡️',
  title_ru: 'Стрелочные функции',
  title_en: 'Arrow Functions',
  description_ru: 'Краткий синтаксис стрелочных функций, неявный return, отличия от обычных функций и применение с map, filter, sort.',
  description_en: 'Concise arrow function syntax, implicit return, differences from regular functions, and usage with map, filter, sort.',

  sections: [
    { id: 'syntax', title_ru: 'Синтаксис стрелочных функций', title_en: 'Arrow Function Syntax' },
    { id: 'implicit-return', title_ru: 'Неявный return', title_en: 'Implicit Return' },
    { id: 'no-param', title_ru: 'Без параметров и один параметр', title_en: 'No Params and One Param' },
    { id: 'this-binding', title_ru: 'this в стрелочных функциях', title_en: 'this in Arrow Functions' },
    { id: 'higher-order', title_ru: 'Функции высшего порядка', title_en: 'Higher-Order Functions' },
  ],

  slides: [
    {
      id: 'title',
      type: 'title',
      title_ru: 'Стрелочные функции',
      title_en: 'Arrow Functions',
      body_ru: 'Стрелочные функции появились в ES6 и стали любимым синтаксисом современного JavaScript. Они короче, читаемее и имеют особое поведение this.',
      body_en: 'Arrow functions arrived in ES6 and became the favorite syntax of modern JavaScript. They are shorter, more readable, and have special this behavior.',
      visual: { kind: 'emoji', emojis: ['➡️', '⚡', '✨'], caption_ru: 'Современный JavaScript', caption_en: 'Modern JavaScript' },
    },
    {
      id: 'basic-syntax',
      type: 'concept',
      title_ru: 'Базовый синтаксис',
      title_en: 'Basic Syntax',
      body_ru: 'Стрелочная функция пишется без ключевого слова function. Параметры в скобках, затем =>, затем тело.',
      body_en: 'An arrow function is written without the function keyword. Parameters in parentheses, then =>, then the body.',
      bullets: [
        { text_ru: 'const fn = (params) => { body }', text_en: 'const fn = (params) => { body }' },
        { text_ru: 'Один параметр — скобки необязательны: x => x * 2', text_en: 'One param — parentheses optional: x => x * 2' },
        { text_ru: 'Нет параметров — пустые скобки обязательны: () => 42', text_en: 'No params — empty parentheses required: () => 42' },
        { text_ru: 'Одно выражение — неявный return без {}', text_en: 'Single expression — implicit return without {}' },
      ],
    },
    {
      id: 'anim-conversion',
      type: 'code-anim',
      title_ru: 'Превращаем функцию в стрелочную',
      title_en: 'Converting a Function to Arrow',
      body_ru: 'Пошаговое преобразование обычной функции в стрелочную с сокращением синтаксиса.',
      body_en: 'Step-by-step transformation of a regular function into an arrow function, shortening the syntax.',
      animMode: 'console',
      animSteps: [
        {
          code: 'function double(x) {\n  return x * 2;\n}\nconsole.log(double(5));',
          comment_ru: 'Обычная функция с объявлением',
          comment_en: 'Regular function declaration',
          output: '10',
        },
        {
          code: 'const double = function(x) {\n  return x * 2;\n};\nconsole.log(double(5));',
          comment_ru: 'Превращаем в функциональное выражение',
          comment_en: 'Convert to a function expression',
          output: '10',
        },
        {
          code: 'const double = (x) => {\n  return x * 2;\n};\nconsole.log(double(5));',
          comment_ru: 'Заменяем function на стрелку =>',
          comment_en: 'Replace function keyword with arrow =>',
          output: '10',
        },
        {
          code: 'const double = (x) => x * 2;\nconsole.log(double(5));',
          comment_ru: 'Убираем {} и return — неявный возврат',
          comment_en: 'Remove {} and return — implicit return',
          output: '10',
        },
        {
          code: 'const double = x => x * 2;\nconsole.log(double(5));',
          comment_ru: 'Убираем скобки вокруг одного параметра',
          comment_en: 'Remove parentheses around single parameter',
          output: '10',
        },
      ],
    },
    {
      id: 'implicit-return',
      type: 'code',
      title_ru: 'Неявный return',
      title_en: 'Implicit Return',
      body_ru: 'Если тело стрелочной функции — одно выражение (без {}), оно автоматически возвращается. Для объектов нужны дополнительные скобки.',
      body_en: 'If an arrow function body is a single expression (no {}), it is automatically returned. Objects need extra parentheses.',
      code: `// Неявный return — числа и строки
const square = x => x * x;
const greet = name => \`Привет, \${name}!\`;

// Неявный return — объект (нужны скобки!)
const makeUser = (name, age) => ({ name, age });

console.log(square(4));             // 16
console.log(greet("Алиса"));        // Привет, Алиса!
console.log(makeUser("Боб", 28));   // { name: "Боб", age: 28 }`,
      codeLang: 'javascript',
    },
    {
      id: 'multiline',
      type: 'code',
      title_ru: 'Многострочное тело',
      title_en: 'Multi-Line Body',
      body_ru: 'Для нескольких инструкций используются фигурные скобки и явный return — как в обычной функции.',
      body_en: 'For multiple statements, use curly braces and an explicit return — just like a regular function.',
      code: `const categorize = score => {
  if (score >= 90) return "Отлично";
  if (score >= 70) return "Хорошо";
  if (score >= 50) return "Удовлетворительно";
  return "Неудовлетворительно";
};

console.log(categorize(95));  // Отлично
console.log(categorize(73));  // Хорошо
console.log(categorize(40));  // Неудовлетворительно`,
      codeLang: 'javascript',
    },
    {
      id: 'compare-declaration-arrow',
      type: 'compare',
      title_ru: 'Объявление функции vs стрелочная',
      title_en: 'Function Declaration vs Arrow',
      body_ru: 'Выбор между ними зависит от контекста: нужен ли hoisting и собственный this.',
      body_en: 'The choice depends on context: whether you need hoisting and an own this.',
      compareLeft: {
        label_ru: 'function declaration',
        label_en: 'function declaration',
        items_ru: [
          'Поднимается (hoisting)',
          'Имеет собственный this',
          'Подходит для методов объектов',
          'Можно использовать как конструктор',
        ],
        items_en: [
          'Hoisted to top of scope',
          'Has its own this',
          'Good for object methods',
          'Can be used as a constructor',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'arrow function',
        label_en: 'arrow function',
        items_ru: [
          'Не поднимается',
          'Нет собственного this (берёт из окружения)',
          'Идеальна для коллбэков',
          'Нельзя использовать как конструктор',
        ],
        items_en: [
          'Not hoisted',
          'No own this (inherits from enclosing scope)',
          'Ideal for callbacks',
          'Cannot be used as a constructor',
        ],
        color: 'green',
      },
    },
    {
      id: 'this-binding',
      type: 'tip',
      title_ru: 'this в стрелочных функциях',
      title_en: 'this in Arrow Functions',
      body_ru: 'Стрелочная функция не создаёт своего this. Она берёт this из лексического окружения — из того места, где была определена. Это удобно в обработчиках событий и асинхронном коде.',
      body_en: 'An arrow function does not create its own this. It inherits this from the enclosing lexical scope — where it was defined. This is convenient in event handlers and async code.',
      code: `const timer = {
  seconds: 0,
  start() {
    // Стрелочная: this = объект timer
    setInterval(() => {
      this.seconds++;
      console.log(this.seconds);
    }, 1000);
  }
};
// Обычная внутри setInterval потеряла бы this`,
      codeLang: 'javascript',
    },
    {
      id: 'higher-order',
      type: 'code',
      title_ru: 'map, filter, sort со стрелками',
      title_en: 'map, filter, sort with Arrows',
      body_ru: 'Стрелочные функции делают код с функциями высшего порядка компактным и выразительным.',
      body_en: 'Arrow functions make code with higher-order functions compact and expressive.',
      code: `const products = [
  { name: "Чай", price: 200 },
  { name: "Кофе", price: 450 },
  { name: "Сок", price: 150 },
];

const names = products.map(p => p.name);
// ["Чай", "Кофе", "Сок"]

const affordable = products.filter(p => p.price < 400);
// [{ name: "Чай", ... }, { name: "Сок", ... }]

const sorted = [...products].sort((a, b) => a.price - b.price);
// Сок → Чай → Кофе (по возрастанию цены)

console.log(names);
console.log(affordable.map(p => p.name));`,
      codeLang: 'javascript',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Попробуйте сами!',
      title_en: 'Try It Yourself!',
      body_ru: 'Напишите несколько функций в виде стрелочных: с неявным return, с несколькими параметрами, и используйте их вместе с map и filter.',
      body_en: 'Write several functions as arrows: with implicit return, with multiple parameters, and use them with map and filter.',
    },
  ],

  content: {
    intro_ru: 'Стрелочные функции — один из самых популярных синтаксических улучшений ES6. Они сделали функциональное программирование в JavaScript значительно удобнее. Понимание их особенностей, особенно поведения this, поможет избежать многих распространённых ошибок.',
    intro_en: 'Arrow functions are one of the most popular syntactic improvements of ES6. They made functional programming in JavaScript much more convenient. Understanding their peculiarities, especially this behavior, will help you avoid many common mistakes.',
    blocks: [
      {
        sectionId: 'syntax',
        heading_ru: 'Полный синтаксис',
        heading_en: 'Full Syntax',
        text_ru: 'Существует несколько форм записи стрелочных функций в зависимости от количества параметров и сложности тела. Все они эквивалентны по функциональности.',
        text_en: 'There are several forms of arrow function syntax depending on the number of parameters and body complexity. All are functionally equivalent.',
        code: `// Нет параметров
const hello = () => "Привет!";

// Один параметр (скобки можно опустить)
const double = x => x * 2;

// Несколько параметров (скобки обязательны)
const add = (a, b) => a + b;

// Многострочное тело
const clamp = (value, min, max) => {
  if (value < min) return min;
  if (value > max) return max;
  return value;
};`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'implicit-return',
        heading_ru: 'Подводные камни неявного return',
        heading_en: 'Implicit Return Pitfalls',
        text_ru: 'Объект в фигурных скобках без дополнительных скобок парсится как тело функции, а не как объект. Это частая ошибка.',
        text_en: 'An object in curly braces without extra parentheses is parsed as a function body, not an object. This is a common mistake.',
        code: `// Неправильно — {} воспринимается как тело функции
const bad = (x) => { value: x };
console.log(bad(5)); // undefined

// Правильно — оборачиваем объект в ()
const good = (x) => ({ value: x });
console.log(good(5)); // { value: 5 }`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'no-param',
        heading_ru: 'Без параметров и один параметр',
        heading_en: 'No Params and One Param',
        text_ru: 'Правила расстановки скобок вокруг параметров в стрелочных функциях просты: если параметров нет, скобки обязательны — () => expr. Если параметр ровно один, скобки можно опустить — x => expr, хотя многие команды предпочитают всегда их писать для единообразия.\n\nПри наличии двух и более параметров скобки обязательны: (a, b) => expr. То же правило действует при использовании значений по умолчанию или деструктуризации в параметрах. Выбор стиля — без скобок или с ними вокруг одиночного параметра — обычно задаётся правилами линтера в команде.',
        text_en: 'The rules for parentheses around arrow function parameters are straightforward: when there are no parameters, parentheses are required — () => expr. When there is exactly one parameter, parentheses can be omitted — x => expr, although many teams prefer always including them for consistency.\n\nWith two or more parameters parentheses are required: (a, b) => expr. The same applies when using default values or destructuring in the parameters. Whether to include parentheses around a single parameter is usually dictated by the team\'s linter configuration.',
        code: `// Без параметров — скобки обязательны
const getRandom = () => Math.random();
const greet = () => "Привет!";

// Один параметр — скобки необязательны
const double = x => x * 2;
const shout = str => str.toUpperCase() + "!";

// Один параметр со скобками (стиль команды)
const triple = (x) => x * 3;

console.log(getRandom());     // 0.47... (случайное число)
console.log(greet());         // "Привет!"
console.log(double(5));       // 10
console.log(shout("тихо"));   // "ТИХО!"
console.log(triple(4));       // 12`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'this-binding',
        heading_ru: 'Лексический this',
        heading_en: 'Lexical this',
        text_ru: 'В обычной функции this зависит от того, как она вызвана. В стрелочной функции this фиксируется в момент создания и не меняется. Это устраняет класс ошибок "потерянного this".',
        text_en: 'In a regular function, this depends on how it is called. In an arrow function, this is fixed at creation time and never changes. This eliminates the class of "lost this" bugs.',
        code: `class Counter {
  count = 0;

  // Стрелочный метод — this всегда экземпляр
  increment = () => {
    this.count++;
    return this.count;
  };
}

const c = new Counter();
const inc = c.increment;
console.log(inc()); // 1 — this не потерян!`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'higher-order',
        heading_ru: 'Цепочки методов массивов',
        heading_en: 'Array Method Chains',
        text_ru: 'Стрелочные функции позволяют строить выразительные цепочки map-filter-reduce, которые читаются почти как естественный язык.',
        text_en: 'Arrow functions enable expressive map-filter-reduce chains that read almost like natural language.',
        code: `const orders = [
  { item: "Книга", qty: 2, price: 500 },
  { item: "Ручка", qty: 10, price: 50 },
  { item: "Тетрадь", qty: 5, price: 150 },
];

const total = orders
  .map(o => o.qty * o.price)
  .reduce((sum, amount) => sum + amount, 0);

console.log(total); // 2250`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Стрелочные функции с массивами',
    title_en: 'Arrow Functions with Arrays',
    instructions_ru: 'Используя стрелочные функции, напишите: 1) функцию, возводящую число в квадрат, 2) функцию, проверяющую чётность числа, 3) применить обе к массиву чисел через map и filter.',
    instructions_en: 'Using arrow functions, write: 1) a function that squares a number, 2) a function that checks if a number is even, 3) apply both to an array of numbers using map and filter.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// 1. Функция возведения в квадрат / Square function
const square = x => x * x;

// 2. Проверка чётности / Even check
const isEven = x => x % 2 === 0;

// 3. Применяем к массиву / Apply to array
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const squared = numbers.map(square);
const evens = numbers.filter(isEven);
const evenSquared = numbers.filter(isEven).map(square);

console.log("Исходный:", numbers);
console.log("В квадрате:", squared);
console.log("Чётные:", evens);
console.log("Квадраты чётных:", evenSquared);
`,
    },
    hints_ru: [
      'Стрелочная функция с одним параметром и одним выражением: x => выражение.',
      'map возвращает новый массив того же размера, применяя функцию к каждому элементу.',
      'filter возвращает новый массив только с элементами, для которых функция вернула true.',
      '% 2 === 0 проверяет, делится ли число на 2 без остатка.',
      'Можно передавать функцию по имени в map/filter вместо анонимной.',
    ],
    hints_en: [
      'Arrow function with one param and one expression: x => expression.',
      'map returns a new array of the same size, applying the function to each element.',
      'filter returns a new array only with elements for which the function returned true.',
      '% 2 === 0 checks whether a number divides by 2 with no remainder.',
      'You can pass a function by name to map/filter instead of using an anonymous one.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Стрелочная функция',
      term_en: 'Arrow Function',
      definition_ru: 'Краткий синтаксис функции-выражения, введённый в ES6: const fn = (x) => x * 2.',
      definition_en: 'A concise function expression syntax introduced in ES6: const fn = (x) => x * 2.',
      example_ru: 'const add = (a, b) => a + b;',
      example_en: 'const add = (a, b) => a + b;',
    },
    {
      term_ru: 'Неявный return',
      term_en: 'Implicit Return',
      definition_ru: 'Автоматический возврат значения в стрелочной функции без фигурных скобок и ключевого слова return.',
      definition_en: 'Automatic return of a value in an arrow function without curly braces or the return keyword.',
      example_ru: 'const double = x => x * 2; // x * 2 — неявный return',
      example_en: 'const double = x => x * 2; // x * 2 is implicitly returned',
    },
    {
      term_ru: 'Лексический this',
      term_en: 'Lexical this',
      definition_ru: 'this стрелочной функции наследуется из окружающей области видимости и не изменяется при вызове.',
      definition_en: 'Arrow function this is inherited from the surrounding scope and does not change at call time.',
      example_ru: '() => this // this из внешней области',
      example_en: '() => this // this from outer scope',
    },
    {
      term_ru: 'Функция высшего порядка',
      term_en: 'Higher-Order Function',
      definition_ru: 'Функция, принимающая другую функцию как аргумент или возвращающая функцию.',
      definition_en: 'A function that takes another function as an argument or returns a function.',
      example_ru: '[1,2,3].map(x => x * 2)',
      example_en: '[1,2,3].map(x => x * 2)',
    },
    {
      term_ru: 'Коллбэк',
      term_en: 'Callback',
      definition_ru: 'Функция, передаваемая как аргумент другой функции и вызываемая ею внутри.',
      definition_en: 'A function passed as an argument to another function and called by it internally.',
      example_ru: 'arr.filter(isEven) // isEven — коллбэк',
      example_en: 'arr.filter(isEven) // isEven is a callback',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Название «стрелочная функция» происходит от оператора => (fat arrow — «толстая стрелка»). В других языках похожий синтаксис называется лямбда-выражением.',
      text_en: 'The name "arrow function" comes from the => operator (the "fat arrow"). In other languages, similar syntax is called a lambda expression.',
    },
    {
      text_ru: 'Стрелочные функции нельзя использовать как конструкторы — вызов new с ними вызовет TypeError. Также у них нет объекта arguments — вместо него используйте rest-параметры (...args).',
      text_en: 'Arrow functions cannot be used as constructors — calling new on them throws a TypeError. They also have no arguments object — use rest parameters (...args) instead.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой из вариантов — корректная стрелочная функция без параметров?',
      text_en: 'Which option is a valid arrow function with no parameters?',
      options_ru: ['=> 42', '() => 42', '( ) { return 42 }', 'function => 42'],
      options_en: ['=> 42', '() => 42', '( ) { return 42 }', 'function => 42'],
      correctIndex: 1,
      explanation_ru: 'При отсутствии параметров обязательны пустые скобки: () => значение.',
      explanation_en: 'With no parameters, empty parentheses are required: () => value.',
    },
    {
      id: 'q2',
      text_ru: 'Как правильно написать стрелочную функцию с неявным return объекта?',
      text_en: 'How do you correctly write an arrow function with an implicit object return?',
      options_ru: [
        'x => { value: x }',
        'x => [value: x]',
        'x => ({ value: x })',
        'x -> { value: x }',
      ],
      options_en: [
        'x => { value: x }',
        'x => [value: x]',
        'x => ({ value: x })',
        'x -> { value: x }',
      ],
      correctIndex: 2,
      explanation_ru: 'Объектный литерал нужно обернуть в скобки: () => ({ key: value }), иначе {} воспринимается как тело функции.',
      explanation_en: 'An object literal must be wrapped in parentheses: () => ({ key: value }), otherwise {} is parsed as the function body.',
    },
    {
      id: 'q3',
      text_ru: 'Откуда стрелочная функция берёт значение this?',
      text_en: 'Where does an arrow function get its this value from?',
      options_ru: [
        'Из глобального объекта window',
        'Из места вызова функции',
        'Из места определения функции (лексический this)',
        'this всегда undefined в стрелочных функциях',
      ],
      options_en: [
        'From the global window object',
        'From the function call site',
        'From where the function was defined (lexical this)',
        'this is always undefined in arrow functions',
      ],
      correctIndex: 2,
      explanation_ru: 'Стрелочные функции не имеют собственного this. Они наследуют this из лексической области, где были определены.',
      explanation_en: 'Arrow functions have no own this. They inherit this from the lexical scope where they were defined.',
    },
    {
      id: 'q4',
      text_ru: 'Что вернёт [1, 2, 3].map(x => x * x)?',
      text_en: 'What does [1, 2, 3].map(x => x * x) return?',
      options_ru: ['[1, 4, 9]', '[2, 4, 6]', '[1, 2, 3]', '6'],
      options_en: ['[1, 4, 9]', '[2, 4, 6]', '[1, 2, 3]', '6'],
      correctIndex: 0,
      explanation_ru: 'map применяет функцию к каждому элементу: 1*1=1, 2*2=4, 3*3=9 → [1, 4, 9].',
      explanation_en: 'map applies the function to each element: 1*1=1, 2*2=4, 3*3=9 → [1, 4, 9].',
    },
    {
      id: 'q5',
      text_ru: 'Можно ли использовать стрелочную функцию как конструктор (new ArrowFn())?',
      text_en: 'Can an arrow function be used as a constructor (new ArrowFn())?',
      options_ru: ['Да, это работает нормально', 'Да, но только без параметров', 'Нет, это вызовет TypeError', 'Только в строгом режиме'],
      options_en: ['Yes, it works fine', 'Yes, but only without parameters', 'No, it throws a TypeError', 'Only in strict mode'],
      correctIndex: 2,
      explanation_ru: 'Стрелочные функции нельзя использовать как конструкторы. new с ними вызывает TypeError.',
      explanation_en: 'Arrow functions cannot be used as constructors. Calling new on them throws a TypeError.',
    },
  ],
}
