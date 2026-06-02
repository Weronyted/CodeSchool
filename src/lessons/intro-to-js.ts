import type { Lesson } from '../types/lesson'

const lesson: Lesson = {
  slug: 'intro-to-js',
  category: 'JS',
  readTime: 12,
  icon: '⚡',
  title_ru: 'Введение в JavaScript',
  title_en: 'Introduction to JavaScript',
  description_ru: 'Переменные, типы данных и первые шаги в программировании на JS.',
  description_en: 'Variables, data types, and your first steps in JavaScript programming.',

  sections: [
    { id: 'what-is-js', title_ru: 'Что такое JavaScript', title_en: 'What is JavaScript' },
    { id: 'variables', title_ru: 'Переменные', title_en: 'Variables' },
    { id: 'data-types', title_ru: 'Типы данных', title_en: 'Data Types' },
    { id: 'operators', title_ru: 'Операторы', title_en: 'Operators' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'JavaScript — мозг сайта',
      title_en: 'JavaScript — the Brain of a Website',
      body_ru: 'HTML — скелет, CSS — внешность, а JavaScript — это разум. Он делает страницы живыми: кнопки реагируют на клики, данные проверяются, анимации работают.',
      body_en: 'HTML is the skeleton, CSS is the appearance, and JavaScript is the mind. It makes pages alive: buttons respond to clicks, data gets validated, animations run.',
      visual: { kind: 'emoji', emojis: ['⚡', '🧠', '🖥️'] },
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Аналогия: Светофор',
      title_en: 'Analogy: Traffic Light',
      body_ru: 'Представь светофор. HTML — это столб и лампочки. CSS — цвета (красный, жёлтый, зелёный). А JavaScript — это программа, которая решает, когда какой свет включить.',
      body_en: 'Imagine a traffic light. HTML is the pole and bulbs. CSS is the colors (red, yellow, green). JavaScript is the program that decides when each light turns on.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'console.log — твой первый инструмент',
      title_en: 'console.log — Your First Tool',
      body_ru: '`console.log()` выводит сообщение в консоль браузера. Это как карандаш для черновиков — проверяем код и смотрим результат.',
      body_en: '`console.log()` prints a message to the browser console. It\'s like a pencil for drafts — we test code and see the result.',
      code: `console.log("Hello, World!");
console.log(42);
console.log(true);`,
      codeLang: 'javascript',
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Переменные: let и const',
      title_en: 'Variables: let and const',
      body_ru: 'Переменная — это именованная ячейка памяти. `let` — значение можно менять. `const` — значение фиксировано навсегда.',
      body_en: 'A variable is a named memory cell. `let` — the value can change. `const` — the value is fixed forever.',
      code: `let age = 14;       // can change later
age = 15;

const name = "Mia"; // cannot reassign
console.log(name, age);`,
      codeLang: 'javascript',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Три главных типа данных',
      title_en: 'Three Main Data Types',
      body_ru: 'В JavaScript есть три базовых типа: **string** (текст в кавычках), **number** (числа), **boolean** (true или false).',
      body_en: 'JavaScript has three basic types: **string** (text in quotes), **number** (numbers), **boolean** (true or false).',
      code: `let greeting = "Hello!";  // string
let score = 100;           // number
let isWinner = true;       // boolean

console.log(typeof greeting); // "string"
console.log(typeof score);    // "number"`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Арифметические операторы',
      title_en: 'Arithmetic Operators',
      body_ru: 'JavaScript умеет считать: `+` сложение, `-` вычитание, `*` умножение, `/` деление, `%` остаток от деления.',
      body_en: 'JavaScript can calculate: `+` addition, `-` subtraction, `*` multiplication, `/` division, `%` remainder.',
      code: `let a = 10;
let b = 3;

console.log(a + b);  // 13
console.log(a - b);  // 7
console.log(a * b);  // 30
console.log(a / b);  // 3.333...
console.log(a % b);  // 1  (remainder)`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Строковые операции',
      title_en: 'String Operations',
      body_ru: 'Строки можно склеивать оператором `+`. Шаблонные строки (template literals) со знаком ` позволяют вставлять переменные прямо в текст через `${}`.',
      body_en: 'Strings can be joined with `+`. Template literals (backtick strings) let you embed variables directly in text using `${}`.',
      code: `let firstName = "Alex";
let lastName = "Smith";

// concatenation
let full = firstName + " " + lastName;

// template literal
let greeting = \`Hello, \${firstName}!\`;
console.log(greeting); // "Hello, Alex!"`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'let vs const — как выбрать?',
      title_en: 'let vs const — how to choose?',
      body_ru: 'Правило большинства разработчиков: **всегда используй `const`** по умолчанию. Переключайся на `let` только если точно знаешь, что значение будет меняться.',
      body_en: 'Most developers\' rule: **always use `const`** by default. Switch to `let` only when you know the value will change.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Пора практиковаться!',
      title_en: 'Time to Practice!',
      body_ru: 'Создай переменные, поработай с типами данных и выведи результаты в консоль.',
      body_en: 'Create variables, work with data types, and print results to the console.',
    },
  ],

  content: {
    intro_ru: 'JavaScript — язык программирования, который оживляет веб-страницы. В этом уроке мы разберём переменные, типы данных и базовые операции.',
    intro_en: 'JavaScript is the programming language that brings web pages to life. In this lesson we cover variables, data types, and basic operations.',
    blocks: [
      {
        sectionId: 'what-is-js',
        heading_ru: 'Что такое JavaScript и зачем он нужен',
        heading_en: 'What is JavaScript and Why It Matters',
        text_ru: 'JavaScript (сокращённо JS) — единственный язык программирования, который браузер понимает напрямую. HTML строит структуру страницы, CSS задаёт внешний вид, а JS добавляет поведение: реакцию на клики, проверку форм, динамическое обновление содержимого без перезагрузки страницы.\n\nJS работает прямо в браузере: открой DevTools (F12), перейди на вкладку Console и введи любой код — результат увидишь немедленно.',
        text_en: 'JavaScript (JS for short) is the only programming language browsers understand natively. HTML builds structure, CSS sets appearance, and JS adds behavior: reacting to clicks, validating forms, updating content dynamically without page reloads.\n\nJS runs right in the browser: open DevTools (F12), go to the Console tab, and type any code — you\'ll see the result immediately.',
        code: `// This runs in the browser console
console.log("JavaScript is working!");

// Math
console.log(2 + 2);  // 4

// Text
console.log("Hello " + "World");  // "Hello World"`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'variables',
        heading_ru: 'Переменные: let и const',
        heading_en: 'Variables: let and const',
        text_ru: 'Переменная — это контейнер с именем для хранения данных. Думай о ней как о коробке с наклейкой: наклейка — имя переменной, содержимое — значение.\n\n**`let`** используют для значений, которые могут меняться: счёт в игре, текущий уровень, возраст пользователя.\n\n**`const`** (от constant — постоянный) используют для значений, которые никогда не меняются: имя пользователя после входа, цвет темы, максимальное количество попыток.\n\nПравило именования: используй **camelCase** — начинай со строчной буквы, каждое следующее слово с заглавной: `userName`, `totalScore`, `isGameOver`.',
        text_en: 'A variable is a named container for storing data. Think of it as a labeled box: the label is the variable name, the contents are the value.\n\n**`let`** is used for values that can change: game score, current level, user age.\n\n**`const`** (from constant) is used for values that never change: username after login, theme color, maximum attempts.\n\nNaming rule: use **camelCase** — start with a lowercase letter, capitalize each following word: `userName`, `totalScore`, `isGameOver`.',
        code: `// let — can change
let score = 0;
console.log(score); // 0

score = 10;
console.log(score); // 10

// const — fixed
const maxLives = 3;
console.log(maxLives); // 3

// maxLives = 5; // ❌ Error: Assignment to constant variable`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'data-types',
        heading_ru: 'Типы данных',
        heading_en: 'Data Types',
        text_ru: 'Каждое значение в JavaScript имеет тип. Три самых важных:\n\n**String (строка)** — любой текст в одинарных, двойных или обратных кавычках. Шаблонные строки (в обратных кавычках) позволяют вставлять выражения через `${}`.\n\n**Number (число)** — целые и дробные числа. JavaScript не различает их — оба просто `number`.\n\n**Boolean (булево значение)** — только два варианта: `true` (да/истина) или `false` (нет/ложь). Используется для условий и флагов.',
        text_en: 'Every value in JavaScript has a type. The three most important:\n\n**String** — any text in single, double, or backtick quotes. Template literals (backtick strings) let you embed expressions via `${}`.\n\n**Number** — integers and decimals. JavaScript doesn\'t distinguish them — both are just `number`.\n\n**Boolean** — only two options: `true` (yes/truth) or `false` (no/false). Used for conditions and flags.',
        code: `// String
let city = "Tokyo";
let country = 'Japan';
let greeting = \`Welcome to \${city}, \${country}!\`;
console.log(greeting); // "Welcome to Tokyo, Japan!"

// Number
let temperature = 36.6;
let year = 2024;

// Boolean
let isRaining = false;
let hasUmbrella = true;

// Check the type
console.log(typeof city);        // "string"
console.log(typeof temperature); // "number"
console.log(typeof isRaining);   // "boolean"`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'operators',
        heading_ru: 'Операторы и выражения',
        heading_en: 'Operators and Expressions',
        text_ru: 'Операторы позволяют работать с данными. Арифметические операторы: `+`, `-`, `*`, `/`, `%` (остаток от деления).\n\nОператор `+` для строк выполняет **конкатенацию** — склейку. Будь внимателен: `"5" + 3` даст `"53"`, а не `8`, потому что JS преобразует число в строку.\n\nОператоры сравнения возвращают boolean: `===` (строгое равенство), `!==` (не равно), `>`, `<`, `>=`, `<=`.\n\nВсегда используй `===` вместо `==` — строгое сравнение проверяет и значение, и тип данных.',
        text_en: 'Operators let you work with data. Arithmetic operators: `+`, `-`, `*`, `/`, `%` (remainder).\n\nThe `+` operator on strings performs **concatenation** — joining. Be careful: `"5" + 3` gives `"53"`, not `8`, because JS converts the number to a string.\n\nComparison operators return boolean: `===` (strict equality), `!==` (not equal), `>`, `<`, `>=`, `<=`.\n\nAlways use `===` instead of `==` — strict comparison checks both value and data type.',
        code: `// Arithmetic
let x = 10;
let y = 4;
console.log(x + y);  // 14
console.log(x % y);  // 2 (remainder of 10 / 4)

// String concatenation
let a = "Score: ";
let b = 100;
console.log(a + b);  // "Score: 100"

// Comparison — always returns boolean
console.log(10 === 10);   // true
console.log(10 === "10"); // false (different types!)
console.log(10 > 5);      // true
console.log(3 !== 4);     // true`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Личная карточка',
    title_en: 'Personal Card',
    instructions_ru: 'Создай переменные для имени, возраста, любимого предмета и флага «любишь ли ты программирование». Затем собери приветственное сообщение через шаблонную строку и выведи его через console.log. В конце выведи тип каждой переменной.',
    instructions_en: 'Create variables for name, age, favorite subject, and a flag for whether you enjoy programming. Then build a greeting message using a template literal and log it. Finally, log the type of each variable.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// 1. Create your variables
const name = "Your Name";
let age = 14;
// add: favoriteSubject (string), likesCode (boolean)

// 2. Build a greeting with a template literal
let greeting = \`Hi! I'm \${name}...\`;
console.log(greeting);

// 3. Log the type of each variable
console.log(typeof name);
`,
    },
    hints_ru: [
      'Добавь переменную favoriteSubject со своим любимым предметом в кавычках',
      'Добавь переменную likesCode = true или false',
      'В шаблонной строке используй ${favoriteSubject} и ${likesCode} чтобы вставить значения',
      'typeof возвращает тип: "string", "number" или "boolean"',
    ],
    hints_en: [
      'Add a favoriteSubject variable with your favorite subject in quotes',
      'Add a likesCode variable set to true or false',
      'In the template literal use ${favoriteSubject} and ${likesCode} to embed values',
      'typeof returns the type: "string", "number", or "boolean"',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Переменная',
      term_en: 'Variable',
      definition_ru: 'Именованный контейнер для хранения данных в памяти программы.',
      definition_en: 'A named container for storing data in a program\'s memory.',
      example_ru: 'let score = 0; — переменная score хранит число 0',
      example_en: 'let score = 0; — the variable score holds the number 0',
    },
    {
      term_ru: 'Тип данных',
      term_en: 'Data Type',
      definition_ru: 'Категория значения: string (текст), number (число) или boolean (истина/ложь).',
      definition_en: 'The category of a value: string (text), number, or boolean (true/false).',
      example_ru: 'typeof "hello" возвращает "string"',
      example_en: 'typeof "hello" returns "string"',
    },
    {
      term_ru: 'Константа',
      term_en: 'Constant',
      definition_ru: 'Переменная, объявленная через const — её значение нельзя переназначить.',
      definition_en: 'A variable declared with const — its value cannot be reassigned.',
      example_ru: 'const PI = 3.14; — значение PI всегда будет 3.14',
      example_en: 'const PI = 3.14; — PI will always be 3.14',
    },
    {
      term_ru: 'Конкатенация',
      term_en: 'Concatenation',
      definition_ru: 'Соединение двух или более строк в одну с помощью оператора +.',
      definition_en: 'Joining two or more strings into one using the + operator.',
      example_ru: '"Hello" + " " + "World" → "Hello World"',
      example_en: '"Hello" + " " + "World" → "Hello World"',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'JavaScript создали всего за 10 дней в 1995 году. Его автор — Брендан Айк — написал первую версию за одну рабочую неделю!',
      text_en: 'JavaScript was created in just 10 days in 1995. Its creator, Brendan Eich, wrote the first version in a single work week!',
    },
    {
      text_ru: 'Несмотря на похожее название, Java и JavaScript — совершенно разные языки. Их сходство в названии — маркетинговый ход 1990-х годов.',
      text_en: 'Despite the similar name, Java and JavaScript are completely different languages. Their name similarity was a marketing move from the 1990s.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой оператор объявляет переменную, значение которой нельзя изменить?',
      text_en: 'Which keyword declares a variable whose value cannot be changed?',
      options_ru: ['var', 'let', 'const', 'fix'],
      options_en: ['var', 'let', 'const', 'fix'],
      correctIndex: 2,
      explanation_ru: '`const` объявляет константу — значение фиксируется при объявлении и не может быть переназначено.',
      explanation_en: '`const` declares a constant — the value is fixed at declaration and cannot be reassigned.',
    },
    {
      id: 'q2',
      text_ru: 'Что выведет: console.log(typeof 42)?',
      text_en: 'What does console.log(typeof 42) print?',
      options_ru: ['"integer"', '"number"', '"digit"', '"42"'],
      options_en: ['"integer"', '"number"', '"digit"', '"42"'],
      correctIndex: 1,
      explanation_ru: 'В JavaScript все числа (целые и дробные) имеют тип `"number"`. Отдельного типа для целых чисел нет.',
      explanation_en: 'In JavaScript all numbers (integers and decimals) have the type `"number"`. There\'s no separate integer type.',
    },
    {
      id: 'q3',
      text_ru: 'Что выведет: console.log("5" + 3)?',
      text_en: 'What does console.log("5" + 3) print?',
      options_ru: ['8', '"53"', 'Ошибка / Error', '"8"'],
      options_en: ['8', '"53"', 'Error', '"8"'],
      correctIndex: 1,
      explanation_ru: 'Когда один из операндов строка, `+` выполняет конкатенацию. Число 3 преобразуется в строку "3", и строки склеиваются: "53".',
      explanation_en: 'When one operand is a string, `+` performs concatenation. The number 3 is converted to "3" and the strings join: "53".',
    },
    {
      id: 'q4',
      text_ru: 'Какой тип данных у значения true?',
      text_en: 'What data type is the value true?',
      options_ru: ['string', 'number', 'boolean', 'logical'],
      options_en: ['string', 'number', 'boolean', 'logical'],
      correctIndex: 2,
      explanation_ru: '`true` и `false` — это значения типа **boolean**. Они используются для условий и логических проверок.',
      explanation_en: '`true` and `false` are values of type **boolean**. They are used for conditions and logical checks.',
    },
    {
      id: 'q5',
      text_ru: 'Как правильно вставить переменную name в шаблонную строку?',
      text_en: 'How do you correctly embed a variable name in a template literal?',
      options_ru: ['`Hello, (name)!`', '`Hello, #{name}!`', '`Hello, ${name}!`', '"Hello, ${name}!"'],
      options_en: ['`Hello, (name)!`', '`Hello, #{name}!`', '`Hello, ${name}!`', '"Hello, ${name}!"'],
      correctIndex: 2,
      explanation_ru: 'Шаблонные строки используют обратные кавычки (`) и синтаксис `${}` для вставки выражений. Важно: кавычки должны быть именно обратными, а не обычными.',
      explanation_en: 'Template literals use backticks (`) and `${}` syntax to embed expressions. Important: the quotes must be backticks, not regular quotes.',
    },
  ],
}

export default lesson
