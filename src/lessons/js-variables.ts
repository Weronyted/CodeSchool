import type { Lesson } from '@/types/lesson'

export const jsVariables: Lesson = {
  slug: 'js-variables',
  category: 'JS',
  readTime: 8,
  icon: '📦',
  title_ru: 'Переменные в JavaScript',
  title_en: 'Variables in JavaScript',
  description_ru: 'Изучите let, const и var, правила именования, основные типы данных и оператор typeof.',
  description_en: 'Learn let, const, and var, naming rules, basic data types, and the typeof operator.',

  sections: [
    { id: 'declaring', title_ru: 'Объявление переменных', title_en: 'Declaring Variables' },
    { id: 'naming', title_ru: 'Правила именования', title_en: 'Naming Rules' },
    { id: 'types', title_ru: 'Типы данных', title_en: 'Data Types' },
    { id: 'typeof', title_ru: 'Оператор typeof', title_en: 'The typeof Operator' },
    { id: 'template-literals', title_ru: 'Шаблонные строки', title_en: 'Template Literals' },
  ],

  slides: [
    {
      id: 'title',
      type: 'title',
      title_ru: 'Переменные в JavaScript',
      title_en: 'Variables in JavaScript',
      body_ru: 'Переменные — это именованные ячейки памяти, в которых хранятся данные. Без них невозможна ни одна программа.',
      body_en: 'Variables are named memory slots that store data. No program works without them.',
      visual: { kind: 'emoji', emojis: ['📦', '🗂️', '💾'], caption_ru: 'Хранение данных', caption_en: 'Storing Data' },
    },
    {
      id: 'let-const-var',
      type: 'concept',
      title_ru: 'let, const и var',
      title_en: 'let, const, and var',
      body_ru: 'В современном JavaScript есть три ключевых слова для объявления переменных. Рекомендуется использовать const по умолчанию, let — когда значение изменится, и избегать var.',
      body_en: 'Modern JavaScript has three keywords for declaring variables. Prefer const by default, use let when the value will change, and avoid var.',
      bullets: [
        { text_ru: 'const — значение нельзя переприсвоить', text_en: 'const — value cannot be reassigned' },
        { text_ru: 'let — значение можно изменить позже', text_en: 'let — value can be changed later' },
        { text_ru: 'var — устаревший способ, имеет проблемы со scope', text_en: 'var — legacy way, has scoping issues' },
      ],
    },
    {
      id: 'naming-rules',
      type: 'concept',
      title_ru: 'Правила именования переменных',
      title_en: 'Variable Naming Rules',
      body_ru: 'Имена переменных должны быть понятными и следовать определённым правилам JavaScript.',
      body_en: 'Variable names should be descriptive and follow specific JavaScript rules.',
      bullets: [
        { text_ru: 'Используйте camelCase: userName, totalPrice', text_en: 'Use camelCase: userName, totalPrice' },
        { text_ru: 'Начинайте с буквы, _ или $', text_en: 'Start with a letter, _, or $' },
        { text_ru: 'Нельзя использовать зарезервированные слова (if, for, class)', text_en: 'Cannot use reserved words (if, for, class)' },
        { text_ru: 'Имена чувствительны к регистру: age ≠ Age', text_en: 'Names are case-sensitive: age ≠ Age' },
      ],
    },
    {
      id: 'data-types',
      type: 'concept',
      title_ru: 'Основные типы данных',
      title_en: 'Basic Data Types',
      body_ru: 'JavaScript имеет несколько примитивных типов данных. Тип переменной определяется автоматически.',
      body_en: 'JavaScript has several primitive data types. The type of a variable is determined automatically.',
      bullets: [
        { text_ru: 'string — текст: "Привет", \'мир\'', text_en: "string — text: \"Hello\", 'world'" },
        { text_ru: 'number — числа: 42, 3.14, -7', text_en: 'number — numbers: 42, 3.14, -7' },
        { text_ru: 'boolean — логическое: true или false', text_en: 'boolean — logical: true or false' },
        { text_ru: 'null — намеренное отсутствие значения', text_en: 'null — intentional absence of a value' },
        { text_ru: 'undefined — значение не было присвоено', text_en: 'undefined — value was never assigned' },
      ],
    },
    {
      id: 'anim-variables',
      type: 'code-anim',
      title_ru: 'Переменные в действии',
      title_en: 'Variables in Action',
      body_ru: 'Посмотрите, как объявляются и изменяются переменные шаг за шагом.',
      body_en: 'Watch how variables are declared and changed step by step.',
      animMode: 'console',
      animSteps: [
        {
          code: 'let userName;',
          comment_ru: 'Объявляем переменную — пока она undefined',
          comment_en: 'Declare a variable — it is undefined for now',
          output: 'undefined',
        },
        {
          code: 'let userName;\nuserName = "Алиса";',
          comment_ru: 'Присваиваем строковое значение',
          comment_en: 'Assign a string value',
          output: '"Алиса"',
        },
        {
          code: 'let userName = "Алиса";\nuserName = "Боб";',
          comment_ru: 'let позволяет изменить значение',
          comment_en: 'let allows changing the value',
          output: '"Боб"',
        },
        {
          code: 'let userName = "Боб";\nconst age = 25;\nconsole.log(`Привет, ${userName}! Тебе ${age} лет.`);',
          comment_ru: 'Используем шаблонную строку для вывода',
          comment_en: 'Use a template literal for output',
          output: 'Привет, Боб! Тебе 25 лет.',
        },
      ],
    },
    {
      id: 'compare-let-const',
      type: 'compare',
      title_ru: 'let против const',
      title_en: 'let vs const',
      body_ru: 'Выбирайте между let и const в зависимости от того, изменится ли значение.',
      body_en: 'Choose between let and const depending on whether the value will change.',
      compareLeft: {
        label_ru: 'let — изменяемая',
        label_en: 'let — mutable',
        items_ru: ['Значение можно переприсвоить', 'Используй для счётчиков и флагов', 'let count = 0; count++;', 'Подходит для циклов'],
        items_en: ['Value can be reassigned', 'Use for counters and flags', 'let count = 0; count++;', 'Works well in loops'],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'const — неизменяемая',
        label_en: 'const — immutable',
        items_ru: ['Нельзя переприсвоить', 'Используй по умолчанию', 'const PI = 3.14;', 'Объекты/массивы можно изменять внутри'],
        items_en: ['Cannot be reassigned', 'Use by default', 'const PI = 3.14;', 'Objects/arrays can still be mutated'],
        color: 'green',
      },
    },
    {
      id: 'typeof',
      type: 'code',
      title_ru: 'Оператор typeof',
      title_en: 'The typeof Operator',
      body_ru: 'typeof возвращает строку с именем типа значения. Полезно для отладки и проверок.',
      body_en: 'typeof returns a string with the type name of a value. Useful for debugging and checks.',
      code: `const name = "Мария";
const age = 30;
const active = true;
const nothing = null;
let mystery;

console.log(typeof name);    // "string"
console.log(typeof age);     // "number"
console.log(typeof active);  // "boolean"
console.log(typeof nothing); // "object"  ← известный баг JS
console.log(typeof mystery); // "undefined"`,
      codeLang: 'javascript',
    },
    {
      id: 'template-literals',
      type: 'code',
      title_ru: 'Шаблонные строки',
      title_en: 'Template Literals',
      body_ru: 'Шаблонные строки используют обратные кавычки и позволяют встраивать выражения через ${}.',
      body_en: 'Template literals use backticks and let you embed expressions with ${}.',
      code: `const product = "ноутбук";
const price = 45000;
const discount = 0.1;

const finalPrice = price * (1 - discount);

console.log(\`Товар: \${product}\`);
console.log(\`Цена со скидкой: \${finalPrice} ₽\`);
console.log(\`Скидка: \${discount * 100}%\`);
// Товар: ноутбук
// Цена со скидкой: 40500 ₽
// Скидка: 10%`,
      codeLang: 'javascript',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Попробуйте сами!',
      title_en: 'Try It Yourself!',
      body_ru: 'Объявите переменные, присвойте значения разных типов и выведите их с помощью шаблонных строк.',
      body_en: 'Declare variables, assign values of different types, and print them using template literals.',
    },
  ],

  content: {
    intro_ru: 'Переменные — фундамент любой программы. В JavaScript три способа объявления: const, let и var. Понимание разницы между ними и знание основных типов данных позволит вам писать чистый и предсказуемый код.',
    intro_en: 'Variables are the foundation of any program. JavaScript has three declaration keywords: const, let, and var. Understanding their differences and knowing the basic data types will help you write clean, predictable code.',
    blocks: [
      {
        sectionId: 'declaring',
        heading_ru: 'Как объявлять переменные',
        heading_en: 'How to Declare Variables',
        text_ru: 'Используйте const для значений, которые не меняются, и let для тех, что меняются. Ключевое слово var устарело и создаёт проблемы из-за функционального scope и поднятия (hoisting).',
        text_en: 'Use const for values that do not change and let for values that will. The var keyword is outdated and causes problems due to function scoping and hoisting.',
        code: `const PI = 3.14159;       // никогда не изменится
let score = 0;            // будет увеличиваться
let playerName = "Анна"; // можно переименовать`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'naming',
        heading_ru: 'Соглашения об именовании',
        heading_en: 'Naming Conventions',
        text_ru: 'В JavaScript принято использовать camelCase для переменных и функций, UPPER_SNAKE_CASE для констант, PascalCase для классов. Давайте имена, которые отвечают на вопрос «что хранит переменная».',
        text_en: 'JavaScript uses camelCase for variables and functions, UPPER_SNAKE_CASE for constants, and PascalCase for classes. Give names that answer "what does this variable hold?".',
        code: `// Хорошие имена
const maxRetries = 3;
let currentUserEmail = "user@example.com";
const TAX_RATE = 0.2;

// Плохие имена
let x = 3;
let data2 = "user@example.com";`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'types',
        heading_ru: 'Примитивные типы данных',
        heading_en: 'Primitive Data Types',
        text_ru: 'JavaScript динамически типизирован: тип переменной определяется значением, а не объявлением. Одна переменная может последовательно хранить строку, число и boolean, хотя это считается плохой практикой.',
        text_en: 'JavaScript is dynamically typed: a variable\'s type is determined by its value, not its declaration. One variable can hold a string, then a number, then a boolean — though this is considered bad practice.',
        code: `let value = "текст";      // string
value = 42;               // number
value = true;             // boolean
value = null;             // null
value = undefined;        // undefined`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'typeof',
        heading_ru: 'Оператор typeof',
        heading_en: 'The typeof Operator',
        text_ru: 'Оператор typeof позволяет узнать тип значения прямо во время выполнения программы. Он возвращает строку: "string", "number", "boolean", "undefined", "object" или "function". Это особенно полезно при отладке и при написании универсальных функций, которые должны работать с данными разных типов.\n\nОдна из известных особенностей JavaScript — typeof null возвращает "object", хотя null не является объектом. Это историческая ошибка языка, сохранённая ради обратной совместимости. Чтобы проверить, является ли значение именно null, всегда используйте строгое сравнение: value === null.',
        text_en: 'The typeof operator lets you determine the type of a value at runtime. It returns a string such as "string", "number", "boolean", "undefined", "object", or "function". This is especially useful for debugging and writing generic functions that must handle values of different types.\n\nOne well-known quirk of JavaScript is that typeof null returns "object", even though null is not an object. This is a historical bug in the language kept for backward compatibility. To check whether a value is specifically null, always use strict equality: value === null.',
        code: `const username = "Алиса";
const score = 42;
const active = true;
let draft;
const nothing = null;

console.log(typeof username); // "string"
console.log(typeof score);    // "number"
console.log(typeof active);   // "boolean"
console.log(typeof draft);    // "undefined"
console.log(typeof nothing);  // "object" ← баг JS
console.log(typeof nothing === null); // false — не так!
console.log(nothing === null);        // true  — правильно`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'template-literals',
        heading_ru: 'Шаблонные строки в деталях',
        heading_en: 'Template Literals in Detail',
        text_ru: 'Внутри ${} можно писать любое выражение JavaScript: вызывать функции, выполнять арифметику, использовать тернарный оператор. Шаблонные строки также поддерживают многострочный текст без \\n.',
        text_en: 'Inside ${} you can write any JavaScript expression: call functions, do arithmetic, use ternary operators. Template literals also support multiline text without \\n.',
        code: `const hour = new Date().getHours();
const greeting = \`Добрый \${hour < 12 ? 'утро' : hour < 18 ? 'день' : 'вечер'}!\`;

const multiLine = \`Строка 1
Строка 2
Строка 3\`;`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Знакомство с переменными',
    title_en: 'Getting to Know Variables',
    instructions_ru: 'Объявите три переменные: name (ваше имя), age (ваш возраст), isStudent (учитесь ли вы). Затем выведите в консоль шаблонную строку, которая их использует. Проверьте тип каждой переменной через typeof.',
    instructions_en: 'Declare three variables: name (your name), age (your age), isStudent (whether you study). Then log a template literal that uses them. Check the type of each variable with typeof.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// 1. Объявите переменные / Declare variables
const name = ""; // ваше имя / your name
const age = 0;   // ваш возраст / your age
const isStudent = true; // учитесь? / are you studying?

// 2. Выведите шаблонную строку / Log a template literal
console.log(\`Меня зовут \${name}, мне \${age} лет.\`);

// 3. Проверьте типы / Check types
console.log(typeof name);
console.log(typeof age);
console.log(typeof isStudent);
`,
    },
    hints_ru: [
      'const нельзя переприсвоить — используйте правильные значения сразу.',
      'Строки пишутся в кавычках: "Иван" или \'Иван\'.',
      'Возраст — это number, не строка.',
      'typeof возвращает строку с именем типа.',
      'Шаблонная строка начинается и заканчивается обратной кавычкой `.',
    ],
    hints_en: [
      'const cannot be reassigned — provide the right values immediately.',
      'Strings go inside quotes: "Ivan" or \'Ivan\'.',
      'Age is a number, not a string.',
      'typeof returns a string with the type name.',
      'A template literal starts and ends with a backtick `.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Переменная',
      term_en: 'Variable',
      definition_ru: 'Именованная ячейка памяти, хранящая значение.',
      definition_en: 'A named memory slot that holds a value.',
      example_ru: 'let score = 100;',
      example_en: 'let score = 100;',
    },
    {
      term_ru: 'const',
      term_en: 'const',
      definition_ru: 'Ключевое слово для объявления переменной, которую нельзя переприсвоить.',
      definition_en: 'Keyword for declaring a variable that cannot be reassigned.',
      example_ru: 'const MAX = 255;',
      example_en: 'const MAX = 255;',
    },
    {
      term_ru: 'camelCase',
      term_en: 'camelCase',
      definition_ru: 'Стиль написания составных слов: первое слово строчное, каждое следующее начинается с заглавной.',
      definition_en: 'Writing style for compound names: first word lowercase, each subsequent word capitalized.',
      example_ru: 'firstName, totalAmount',
      example_en: 'firstName, totalAmount',
    },
    {
      term_ru: 'typeof',
      term_en: 'typeof',
      definition_ru: 'Унарный оператор, возвращающий строку с именем типа значения.',
      definition_en: 'Unary operator that returns a string with the type name of a value.',
      example_ru: 'typeof 42 // "number"',
      example_en: 'typeof 42 // "number"',
    },
    {
      term_ru: 'Шаблонная строка',
      term_en: 'Template Literal',
      definition_ru: 'Строка в обратных кавычках, позволяющая встраивать выражения через ${}.',
      definition_en: 'A string in backticks that allows embedding expressions via ${}.',
      example_ru: '`Привет, ${name}!`',
      example_en: '`Hello, ${name}!`',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В ранних версиях JavaScript (до 2015 года) существовало только ключевое слово var. let и const появились в стандарте ES6 и решили множество проблем со scope и непредсказуемостью кода.',
      text_en: 'In early versions of JavaScript (before 2015) only the var keyword existed. let and const were introduced in ES6 and solved many scoping and predictability issues.',
    },
    {
      text_ru: 'typeof null возвращает "object" — это известная ошибка в JavaScript, которая намеренно сохраняется для обратной совместимости с кодом, написанным десятки лет назад.',
      text_en: 'typeof null returns "object" — this is a well-known bug in JavaScript that is intentionally kept for backward compatibility with code written decades ago.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какое ключевое слово следует использовать для переменной, значение которой никогда не изменится?',
      text_en: 'Which keyword should you use for a variable whose value will never change?',
      options_ru: ['var', 'let', 'const', 'static'],
      options_en: ['var', 'let', 'const', 'static'],
      correctIndex: 2,
      explanation_ru: 'const объявляет неизменяемую привязку. Это предпочтительный выбор для значений, которые не нужно переприсваивать.',
      explanation_en: 'const declares an immutable binding. It is the preferred choice for values that never need reassignment.',
    },
    {
      id: 'q2',
      text_ru: 'Какой стиль именования принят для переменных в JavaScript?',
      text_en: 'Which naming style is conventional for variables in JavaScript?',
      options_ru: ['snake_case', 'PascalCase', 'camelCase', 'UPPER_CASE'],
      options_en: ['snake_case', 'PascalCase', 'camelCase', 'UPPER_CASE'],
      correctIndex: 2,
      explanation_ru: 'camelCase (например, userName, totalPrice) — принятый стандарт для переменных и функций в JavaScript.',
      explanation_en: 'camelCase (e.g., userName, totalPrice) is the accepted standard for variables and functions in JavaScript.',
    },
    {
      id: 'q3',
      text_ru: 'Что вернёт typeof null?',
      text_en: 'What does typeof null return?',
      options_ru: ['"null"', '"undefined"', '"object"', '"boolean"'],
      options_en: ['"null"', '"undefined"', '"object"', '"boolean"'],
      correctIndex: 2,
      explanation_ru: 'typeof null возвращает "object" — это исторический баг JavaScript, сохранённый для обратной совместимости.',
      explanation_en: 'typeof null returns "object" — this is a historical JavaScript bug kept for backward compatibility.',
    },
    {
      id: 'q4',
      text_ru: 'Какой синтаксис используется для встраивания выражения в шаблонную строку?',
      text_en: 'What syntax is used to embed an expression inside a template literal?',
      options_ru: ['#{expr}', '{{expr}}', '${expr}', '$(expr)'],
      options_en: ['#{expr}', '{{expr}}', '${expr}', '$(expr)'],
      correctIndex: 2,
      explanation_ru: '${} — специальный синтаксис внутри обратных кавычек для встраивания любого JavaScript-выражения.',
      explanation_en: '${} is the special syntax inside backticks for embedding any JavaScript expression.',
    },
    {
      id: 'q5',
      text_ru: 'Что произойдёт, если попытаться переприсвоить переменную, объявленную через const?',
      text_en: 'What happens if you try to reassign a variable declared with const?',
      options_ru: ['Значение тихо не изменится', 'Программа выдаст TypeError', 'const превратится в let', 'Переменная станет undefined'],
      options_en: ['The value silently stays the same', 'The program throws a TypeError', 'const becomes let', 'The variable becomes undefined'],
      correctIndex: 1,
      explanation_ru: 'Попытка переприсвоить const вызывает TypeError: Assignment to constant variable.',
      explanation_en: 'Attempting to reassign a const throws TypeError: Assignment to constant variable.',
    },
  ],
}
