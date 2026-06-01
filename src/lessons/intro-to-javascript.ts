import type { Lesson } from '@/types/lesson'

export const introToJavascript: Lesson = {
  slug: 'intro-to-javascript',
  category: 'JS',
  readTime: 10,
  icon: '⚡',

  title_ru: 'Введение в JavaScript',
  title_en: 'Introduction to JavaScript',

  description_ru: 'Переменные, типы данных, console.log — первые шаги в программировании.',
  description_en: 'Variables, data types, console.log — first steps in programming.',

  sections: [
    { id: 'what-is-js',   title_ru: 'Что такое JavaScript', title_en: 'What is JavaScript' },
    { id: 'variables',    title_ru: 'Переменные',           title_en: 'Variables' },
    { id: 'data-types',   title_ru: 'Типы данных',          title_en: 'Data types' },
    { id: 'console',      title_ru: 'console.log',          title_en: 'console.log' },
    { id: 'operators',    title_ru: 'Операторы',            title_en: 'Operators' },
    { id: 'key-terms',    title_ru: 'Важные слова',         title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'JavaScript: мозг веб-страницы',
      title_en: 'JavaScript: the brain of a web page',
      body_ru: 'HTML — скелет, CSS — одежда, JavaScript — мозг. Он делает кнопки работающими, анимации живыми, данные динамическими. JS работает прямо в браузере — никакой установки не нужно.',
      body_en: 'HTML is the skeleton, CSS is the clothes, JavaScript is the brain. It makes buttons work, animations live, data dynamic. JS runs right in the browser — no installation needed.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Три языка — три роли',
      title_en: 'Three languages — three roles',
      body_ru: 'HTML определяет что есть на странице. CSS — как это выглядит. JavaScript — что страница умеет делать. Вместе они образуют полноценный язык веба.',
      body_en: 'HTML defines what is on the page. CSS — how it looks. JavaScript — what the page can do. Together they form the complete language of the web.',
      visual: {
        kind: 'emoji',
        emojis: ['🏗️', '🎨', '⚡'],
      },
      bullets: [
        { text_ru: '🏗️ HTML — структура: заголовки, абзацы, кнопки', text_en: '🏗️ HTML — structure: headings, paragraphs, buttons' },
        { text_ru: '🎨 CSS — внешний вид: цвета, шрифты, размеры', text_en: '🎨 CSS — appearance: colours, fonts, sizes' },
        { text_ru: '⚡ JavaScript — поведение: клики, анимации, данные', text_en: '⚡ JavaScript — behaviour: clicks, animations, data' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Переменные: let и const',
      title_en: 'Variables: let and const',
      body_ru: 'Переменная — именованная ячейка памяти. let объявляет переменную, которую можно изменить. const — константу, которую нельзя переприсвоить. Оба лучше, чем устаревший var.',
      body_en: 'A variable is a named memory cell. let declares a variable that can be changed. const declares a constant that cannot be reassigned. Both are better than the outdated var.',
      bullets: [
        { text_ru: '🔄 let score = 0 — можно изменить: score = 10', text_en: '🔄 let score = 0 — can be changed: score = 10' },
        { text_ru: '🔒 const PI = 3.14 — нельзя переприсвоить', text_en: '🔒 const PI = 3.14 — cannot be reassigned' },
        { text_ru: '❌ var — устаревший, не использовать', text_en: '❌ var — outdated, do not use' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Объявляем переменную шаг за шагом',
      title_en: 'Declaring a variable step by step',
      body_ru: 'Посмотри, как JavaScript хранит и использует данные.',
      body_en: 'Watch how JavaScript stores and uses data.',
      animMode: 'console',
      animSteps: [
        {
          code: 'let name = "Аня";',
          comment_ru: '1. Объявляем переменную name со значением "Аня"',
          comment_en: '1. Declare variable name with value "Anya"',
        },
        {
          code: 'let name = "Аня";\nlet age = 14;',
          comment_ru: '2. Добавляем число age = 14',
          comment_en: '2. Add the number age = 14',
        },
        {
          code: 'let name = "Аня";\nlet age = 14;\nconsole.log(name, age);',
          comment_ru: '3. console.log выводит оба значения',
          comment_en: '3. console.log prints both values',
          output: 'Аня 14',
        },
        {
          code: 'let name = "Аня";\nlet age = 14;\nconsole.log(`Меня зовут ${name}, мне ${age} лет`);',
          comment_ru: '4. Шаблонная строка — подставляем переменные через ${}',
          comment_en: '4. Template literal — insert variables with ${}',
          output: 'Меня зовут Аня, мне 14 лет',
        },
      ],
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Основные типы данных',
      title_en: 'Main data types',
      body_ru: 'В JavaScript у каждого значения есть тип. Самые важные: строки (текст), числа, булевы (true/false), null и undefined. Тип определяет, что можно делать с переменной.',
      body_en: 'In JavaScript every value has a type. The most important: strings (text), numbers, booleans (true/false), null and undefined. The type determines what you can do with the variable.',
      bullets: [
        { text_ru: '📝 String: "Привет" — текст в кавычках', text_en: '📝 String: "Hello" — text in quotes' },
        { text_ru: '🔢 Number: 42, 3.14 — целые и дробные', text_en: '🔢 Number: 42, 3.14 — integers and decimals' },
        { text_ru: '✅ Boolean: true или false — да или нет', text_en: '✅ Boolean: true or false — yes or no' },
        { text_ru: '❓ null — намеренное отсутствие значения', text_en: '❓ null — intentional absence of value' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Типы данных в коде',
      title_en: 'Data types in code',
      body_ru: 'Оператор typeof позволяет узнать тип значения. === сравнивает и значение, и тип — используй его вместо ==.',
      body_en: 'The typeof operator lets you check the type of a value. === compares both value and type — use it instead of ==.',
      code: `let name    = "Аня";      // string
let age     = 14;          // number
let isAdmin = false;       // boolean
let nothing = null;        // null

// Узнаём тип
console.log(typeof name);    // "string"
console.log(typeof age);     // "number"
console.log(typeof isAdmin); // "boolean"

// Строгое равенство
console.log(5 === 5);   // true
console.log(5 === "5"); // false (разные типы!)`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Арифметика и строки',
      title_en: 'Arithmetic and strings',
      body_ru: 'С числами работают операторы + - * / %. Со строками + это конкатенация (склеивание). += и ++ удобные сокращения.',
      body_en: 'Numbers use operators + - * / %. For strings + means concatenation (joining). += and ++ are handy shortcuts.',
      bullets: [
        { text_ru: '➕ 5 + 3 = 8, "Привет" + " мир" = "Привет мир"', text_en: '➕ 5 + 3 = 8, "Hello" + " world" = "Hello world"' },
        { text_ru: '➗ 10 % 3 = 1 — остаток от деления', text_en: '➗ 10 % 3 = 1 — remainder from division' },
        { text_ru: '🔼 count++ — увеличить на 1', text_en: '🔼 count++ — increment by 1' },
        { text_ru: '📝 score += 10 — score = score + 10', text_en: '📝 score += 10 — score = score + 10' },
      ],
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'JavaScript был создан всего за 10 дней в 1995 году программистом Бренданом Эйком. Несмотря на это, он стал самым популярным языком программирования в мире! JavaScript и Java — совершенно разные языки. Схожесть в названии — просто маркетинговый трюк.',
      body_en: 'JavaScript was created in just 10 days in 1995 by programmer Brendan Eich. Despite this, it became the most popular programming language in the world! JavaScript and Java are completely different languages. The name similarity was just a marketing trick.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Напиши первый JS-код!',
      title_en: 'Write your first JS code!',
      body_ru: 'Объяви переменные, используй console.log — посмотри как JavaScript работает в реальном времени.',
      body_en: 'Declare variables, use console.log — watch JavaScript work in real time.',
    },
  ],

  content: {
    intro_ru: `JavaScript — язык программирования браузера. HTML создаёт структуру, CSS добавляет
стиль, а JS делает страницу живой: кнопки реагируют на нажатия, данные загружаются без
перезагрузки, анимации плавно работают. JS работает прямо в браузере — не нужно ничего
устанавливать. Открой консоль (F12) и попробуй прямо сейчас!`,
    intro_en: `JavaScript is the browser's programming language. HTML creates structure, CSS adds
style, and JS makes the page alive: buttons respond to clicks, data loads without reloading,
animations run smoothly. JS runs right in the browser — no installation needed.
Open the console (F12) and try it right now!`,

    blocks: [
      {
        sectionId: 'what-is-js',
        heading_ru: 'Что такое JavaScript',
        heading_en: 'What is JavaScript',
        text_ru: `JavaScript (JS) — язык программирования для веба. Он выполняется прямо в браузере,
без сервера. Это единственный язык, который понимают все браузеры.

JS используется для:
• Реакции на действия пользователя (клики, ввод текста)
• Изменения HTML и CSS "на лету"
• Загрузки данных с сервера (AJAX)
• Создания игр и сложных интерфейсов
• Серверной разработки (Node.js)`,
        text_en: `JavaScript (JS) is a programming language for the web. It runs directly in the
browser, without a server. It is the only language all browsers understand.

JS is used for:
• Responding to user actions (clicks, text input)
• Changing HTML and CSS "on the fly"
• Loading data from a server (AJAX)
• Building games and complex interfaces
• Server-side development (Node.js)`,
      },
      {
        sectionId: 'variables',
        heading_ru: 'Переменные',
        heading_en: 'Variables',
        text_ru: `Переменная — это именованный контейнер для данных.

let — переменная, значение которой можно изменить:
  let count = 0;
  count = 1;  // OK

const — константа, переприсвоить нельзя:
  const PI = 3.14;
  PI = 3;  // Ошибка!

Правила именования:
• Начинается с буквы, $ или _
• Нет пробелов (используй camelCase: userName)
• Чувствительно к регистру: name ≠ Name
• Нельзя использовать зарезервированные слова (let, if, return...)`,
        text_en: `A variable is a named container for data.

let — a variable whose value can be changed:
  let count = 0;
  count = 1;  // OK

const — a constant, cannot be reassigned:
  const PI = 3.14;
  PI = 3;  // Error!

Naming rules:
• Starts with a letter, $ or _
• No spaces (use camelCase: userName)
• Case-sensitive: name ≠ Name
• Reserved words forbidden (let, if, return...)`,
        code: `let score = 0;
score = 10;      // OK — let можно менять
score += 5;      // score = 15

const MAX = 100; // Нельзя менять
// MAX = 200;    // ❌ TypeError!

// Хорошие имена переменных
let userName = "Аня";
let isLoggedIn = false;
let totalPrice = 0;`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'data-types',
        heading_ru: 'Типы данных',
        heading_en: 'Data types',
        text_ru: `В JS 7 основных типов:

• String (строка): текст. "Привет", 'мир', \`шаблон\`
• Number (число): 42, 3.14, -7. Нет отдельного типа для целых.
• Boolean: true или false.
• null: намеренное "ничего". let user = null;
• undefined: переменная объявлена, но значение не задано.
• Array (массив): список: [1, 2, 3]
• Object (объект): структура: { name: "Аня", age: 14 }

typeof проверяет тип. typeof [] возвращает "object" — особенность JS!`,
        text_en: `JS has 7 basic types:

• String: text. "Hello", 'world', \`template\`
• Number: 42, 3.14, -7. No separate type for integers.
• Boolean: true or false.
• null: intentional "nothing". let user = null;
• undefined: variable declared but not assigned.
• Array: a list: [1, 2, 3]
• Object: a structure: { name: "Anya", age: 14 }

typeof checks the type. typeof [] returns "object" — a JS quirk!`,
        code: `typeof "hello"    // "string"
typeof 42         // "number"
typeof true       // "boolean"
typeof null       // "object" (баг JS!)
typeof undefined  // "undefined"
typeof []         // "object"
typeof {}         // "object"

// Шаблонные строки (ES6)
let name = "Аня";
let msg = \`Привет, \${name}!\`; // "Привет, Аня!"`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'console',
        heading_ru: 'console.log',
        heading_en: 'console.log',
        text_ru: `console.log() — основной инструмент отладки в JS. Выводит значения в консоль
браузера. Можно передавать несколько аргументов через запятую.

Открыть консоль: F12 → вкладка Console.

Другие методы консоли:
• console.warn() — жёлтое предупреждение
• console.error() — красная ошибка
• console.table() — данные в виде таблицы`,
        text_en: `console.log() is the main debugging tool in JS. It prints values to the browser
console. You can pass multiple arguments separated by commas.

Open the console: F12 → Console tab.

Other console methods:
• console.warn() — yellow warning
• console.error() — red error
• console.table() — data as a table`,
        code: `console.log("Привет, мир!");         // строка
console.log(42);                     // число
console.log(true);                   // булев

let name = "Аня";
let age = 14;
console.log(name, age);              // Аня 14
console.log(\`Мне \${age} лет\`);       // Мне 14 лет

console.warn("Осторожно!");
console.error("Ошибка!");
console.table([1, 2, 3]);`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'operators',
        heading_ru: 'Операторы',
        heading_en: 'Operators',
        text_ru: `Арифметические: + - * / % (остаток). С числами — математика. + со строками — склейка.

Присваивающие: = (присвоить), += (добавить), -= -= *=, /=, ++ (увеличить на 1), -- (уменьшить).

Сравнения (возвращают true/false):
• === строгое равенство (значение и тип)
• !== строгое неравенство
• > >= < <= — больше/меньше

Всегда используй === вместо ==. == делает "нестрогое" сравнение:
0 == false — true (плохо!), 0 === false — false (правильно).`,
        text_en: `Arithmetic: + - * / % (remainder). With numbers — maths. + with strings — concatenation.

Assignment: = (assign), += (add), -= -= *=, /=, ++ (increment by 1), -- (decrement).

Comparisons (return true/false):
• === strict equality (value and type)
• !== strict inequality
• > >= < <= — greater/less

Always use === instead of ==. == does "loose" comparison:
0 == false — true (bad!), 0 === false — false (correct).`,
        code: `// Арифметика
console.log(10 + 3);  // 13
console.log(10 % 3);  // 1 (остаток)
console.log("AB" + "C"); // "ABC"

// Сокращения
let x = 5;
x += 3;   // x = 8
x++;      // x = 9

// Сравнение
console.log(5 === 5);   // true
console.log(5 === "5"); // false!
console.log(10 > 5);    // true`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: переменные и вывод',
    title_en: 'Try it yourself: variables and output',
    instructions_ru: `Напиши код на JavaScript:
— Объяви переменную name (своё имя)
— Объяви переменную age (твой возраст)
— Выведи через console.log шаблонную строку "Меня зовут ..., мне ... лет"
— Объяви const MAX_SCORE = 100 и выведи его`,
    instructions_en: `Write JavaScript code:
— Declare variable name (your name)
— Declare variable age (your age)
— Use console.log to print the template literal "My name is ..., I am ... years old"
— Declare const MAX_SCORE = 100 and print it`,
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// Твои переменные
let name = "Аня";
let age = 14;

// Выведи в консоль
console.log(\`Меня зовут \${name}, мне \${age} лет\`);

// Константа
const MAX_SCORE = 100;
console.log("Максимальный балл:", MAX_SCORE);

// Арифметика
let score = 0;
score += 50;
console.log("Текущий балл:", score);`,
    },
    hints_ru: [
      'Шаблонная строка пишется в обратных кавычках (`), переменные вставляются через ${переменная}.',
      'console.log можно передать несколько аргументов: console.log("Балл:", score).',
    ],
    hints_en: [
      'Template literals use backticks (`), variables are inserted with ${variable}.',
      'You can pass multiple arguments to console.log: console.log("Score:", score).',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Переменная', term_en: 'Variable',
      definition_ru: 'Именованная ячейка памяти для хранения данных. Объявляется через let или const.',
      definition_en: 'A named memory cell for storing data. Declared with let or const.',
      example_ru: 'let score = 0; const MAX = 100;',
      example_en: 'let score = 0; const MAX = 100;',
    },
    {
      term_ru: 'let', term_en: 'let',
      definition_ru: 'Ключевое слово для объявления изменяемой переменной.',
      definition_en: 'Keyword for declaring a mutable variable.',
      example_ru: 'let count = 0; count = 1; // OK',
      example_en: 'let count = 0; count = 1; // OK',
    },
    {
      term_ru: 'const', term_en: 'const',
      definition_ru: 'Ключевое слово для константы — значение нельзя переприсвоить.',
      definition_en: 'Keyword for a constant — the value cannot be reassigned.',
      example_ru: 'const PI = 3.14; // нельзя изменить',
      example_en: 'const PI = 3.14; // cannot change',
    },
    {
      term_ru: 'console.log()', term_en: 'console.log()',
      definition_ru: 'Функция для вывода значений в консоль браузера. Незаменима при отладке.',
      definition_en: 'A function to print values to the browser console. Indispensable for debugging.',
      example_ru: 'console.log("Привет!", 42, true);',
      example_en: 'console.log("Hello!", 42, true);',
    },
    {
      term_ru: '=== (строгое равенство)', term_en: '=== (strict equality)',
      definition_ru: 'Сравнивает значение И тип. Всегда предпочтительнее нестрогого ==.',
      definition_en: 'Compares value AND type. Always preferable to loose ==.',
      example_ru: '5 === 5 → true; 5 === "5" → false',
      example_en: '5 === 5 → true; 5 === "5" → false',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'JavaScript был создан за 10 дней в 1995 году. Несмотря на это, он стал самым популярным языком мира. Консоль браузера открывается клавишей F12 — это твой лучший друг при изучении JS!',
      text_en: 'JavaScript was created in 10 days in 1995. Despite this it became the world\'s most popular language. The browser console opens with F12 — your best friend when learning JS!',
    },
    {
      text_ru: 'JavaScript и Java — совершенно разные языки, несмотря на схожие названия. Когда JS создавался, Java была очень популярна, и маркетинговая команда Netscape решила воспользоваться этим именем.',
      text_en: 'JavaScript and Java are completely different languages despite the similar names. When JS was being created, Java was very popular, and the Netscape marketing team decided to leverage that name.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Чем let отличается от const?',
      text_en: 'How does let differ from const?',
      options_ru: ['let быстрее', 'const можно изменить, let — нет', 'let можно изменить, const — нельзя переприсвоить', 'Они одинаковы'],
      options_en: ['let is faster', 'const can be changed, let cannot', 'let can be changed, const cannot be reassigned', 'They are the same'],
      correctIndex: 2,
      explanation_ru: 'let — изменяемая переменная. const — константа, переприсвоить нельзя (но объект/массив можно изменять внутри).',
      explanation_en: 'let is a mutable variable. const is a constant — it cannot be reassigned (but objects/arrays can be mutated internally).',
    },
    {
      id: 'q2',
      text_ru: 'Какой тип данных у значения true?',
      text_en: 'What data type is the value true?',
      options_ru: ['String', 'Number', 'Boolean', 'Null'],
      options_en: ['String', 'Number', 'Boolean', 'Null'],
      correctIndex: 2,
      explanation_ru: 'Boolean — тип с двумя значениями: true и false. Используется в условиях.',
      explanation_en: 'Boolean is the type with two values: true and false. Used in conditions.',
    },
    {
      id: 'q3',
      text_ru: 'Что выведет console.log(5 + "3")?',
      text_en: 'What does console.log(5 + "3") print?',
      options_ru: ['8', '"53"', '53', 'Ошибку'],
      options_en: ['8', '"53"', '53', 'An error'],
      correctIndex: 2,
      explanation_ru: 'Число + строка = конкатенация строк. 5 преобразуется в "5", результат "53". Это особенность JS.',
      explanation_en: 'Number + string = string concatenation. 5 is converted to "5", result is "53". This is a JS quirk.',
    },
    {
      id: 'q4',
      text_ru: 'Почему 5 === "5" возвращает false?',
      text_en: 'Why does 5 === "5" return false?',
      options_ru: ['Это ошибка в JS', '=== проверяет и тип, и значение', 'Строки нельзя сравнивать', 'Только для чисел'],
      options_en: ['It is a JS bug', '=== checks both type and value', 'Strings cannot be compared', 'Only for numbers'],
      correctIndex: 1,
      explanation_ru: '=== — строгое равенство. 5 (number) и "5" (string) — разные типы, поэтому false. == дало бы true (плохо).',
      explanation_en: '=== is strict equality. 5 (number) and "5" (string) are different types, so false. == would give true (bad).',
    },
    {
      id: 'q5',
      text_ru: 'Как объявить переменную score со значением 0?',
      text_en: 'How do you declare a variable score with value 0?',
      options_ru: ['variable score = 0;', 'let score = 0;', 'score := 0;', 'set score 0;'],
      options_en: ['variable score = 0;', 'let score = 0;', 'score := 0;', 'set score 0;'],
      correctIndex: 1,
      explanation_ru: 'let score = 0; — правильный синтаксис. let — ключевое слово, score — имя, = — присваивание, 0 — значение.',
      explanation_en: 'let score = 0; is the correct syntax. let — keyword, score — name, = — assignment, 0 — value.',
    },
  ],
}
