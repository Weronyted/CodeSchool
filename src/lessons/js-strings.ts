import type { Lesson } from '@/types/lesson'

export const jsStrings: Lesson = {
  slug: 'js-strings',
  category: 'JS',
  readTime: 9,
  icon: '📝',
  title_ru: 'Строки в JavaScript',
  title_en: 'Strings in JavaScript',
  description_ru: 'Создание строк, шаблонные литералы и десятки встроенных методов для работы с текстом.',
  description_en: 'Creating strings, template literals, and dozens of built-in methods for working with text.',

  sections: [
    { id: 'creation', title_ru: 'Создание строк', title_en: 'Creating Strings' },
    { id: 'template-literals', title_ru: 'Шаблонные литералы', title_en: 'Template Literals' },
    { id: 'methods-case', title_ru: 'Методы регистра и пробелов', title_en: 'Case and Whitespace Methods' },
    { id: 'methods-search', title_ru: 'Методы поиска', title_en: 'Search Methods' },
    { id: 'methods-transform', title_ru: 'Методы преобразования', title_en: 'Transformation Methods' },
  ],

  slides: [
    {
      id: 'title',
      type: 'title',
      title_ru: 'Строки в JavaScript',
      title_en: 'Strings in JavaScript',
      body_ru: 'Строки — один из самых используемых типов данных. JavaScript предоставляет богатый набор методов для работы с текстом.',
      body_en: 'Strings are one of the most-used data types. JavaScript provides a rich set of methods for working with text.',
      visual: { kind: 'emoji', emojis: ['📝', '🔤', '✂️'], caption_ru: 'Текст и методы', caption_en: 'Text and Methods' },
    },
    {
      id: 'creation',
      type: 'concept',
      title_ru: 'Три способа создать строку',
      title_en: 'Three Ways to Create a String',
      body_ru: 'Строку можно написать в одинарных, двойных или обратных кавычках. Каждый способ имеет свои преимущества.',
      body_en: 'A string can be written in single, double, or backtick quotes. Each has its advantages.',
      bullets: [
        { text_ru: 'Одинарные кавычки: \'Привет, мир\'', text_en: "Single quotes: 'Hello, world'" },
        { text_ru: 'Двойные кавычки: "JavaScript — это весело"', text_en: 'Double quotes: "JavaScript is fun"' },
        { text_ru: 'Обратные кавычки: `Шаблонный литерал`', text_en: 'Backticks: `Template literal`' },
        { text_ru: 'В обратных кавычках можно вставлять переменные через ${}', text_en: 'Backticks allow inserting variables with ${}' },
      ],
    },
    {
      id: 'compare-concat',
      type: 'compare',
      title_ru: 'Конкатенация vs шаблонный литерал',
      title_en: 'Concatenation vs Template Literal',
      body_ru: 'Современный JavaScript предпочитает шаблонные литералы — они читаемее и мощнее.',
      body_en: 'Modern JavaScript prefers template literals — they are more readable and more powerful.',
      compareLeft: {
        label_ru: 'Конкатенация (старый способ)',
        label_en: 'Concatenation (old way)',
        items_ru: [
          '"Привет, " + name + "!"',
          'Легко допустить ошибку с пробелами',
          'Трудно читать при многих переменных',
          '"Сумма: " + (a + b) + " руб."',
        ],
        items_en: [
          '"Hello, " + name + "!"',
          'Easy to miss spaces',
          'Hard to read with many variables',
          '"Total: " + (a + b) + " USD"',
        ],
        color: 'amber',
      },
      compareRight: {
        label_ru: 'Шаблонный литерал (современный)',
        label_en: 'Template Literal (modern)',
        items_ru: [
          '`Привет, ${name}!`',
          'Пробелы очевидны в тексте',
          'Любое выражение внутри ${}',
          '`Сумма: ${a + b} руб.`',
        ],
        items_en: [
          '`Hello, ${name}!`',
          'Spaces are obvious in text',
          'Any expression inside ${}',
          '`Total: ${a + b} USD`',
        ],
        color: 'green',
      },
    },
    {
      id: 'length-case',
      type: 'code',
      title_ru: 'length, toUpperCase, toLowerCase, trim',
      title_en: 'length, toUpperCase, toLowerCase, trim',
      body_ru: 'Базовые свойство и методы для работы с регистром и пробельными символами.',
      body_en: 'Basic property and methods for handling case and whitespace.',
      code: `const raw = "  Привет, Мир!  ";

console.log(raw.length);           // 17
console.log(raw.trim());           // "Привет, Мир!"
console.log(raw.trim().length);    // 13
console.log(raw.toUpperCase());    // "  ПРИВЕТ, МИР!  "
console.log(raw.toLowerCase());    // "  привет, мир!  "
console.log(raw.trimStart());      // "Привет, Мир!  "
console.log(raw.trimEnd());        // "  Привет, Мир!"`,
      codeLang: 'javascript',
    },
    {
      id: 'anim-name-processing',
      type: 'code-anim',
      title_ru: 'Обработка имени пользователя',
      title_en: 'Processing a User Name',
      body_ru: 'Посмотрите, как шаг за шагом очистить и отформатировать имя, введённое пользователем.',
      body_en: 'Watch how to clean and format a name entered by the user step by step.',
      animMode: 'console',
      animSteps: [
        {
          code: 'const raw = "  аЛИСА  ";',
          comment_ru: 'Сырой ввод пользователя с пробелами и случайным регистром',
          comment_en: 'Raw user input with whitespace and random casing',
          output: '',
        },
        {
          code: 'const raw = "  аЛИСА  ";\nconst trimmed = raw.trim();\nconsole.log(trimmed);',
          comment_ru: 'Убираем пробелы по краям',
          comment_en: 'Remove surrounding whitespace',
          output: '"аЛИСА"',
        },
        {
          code: 'const raw = "  аЛИСА  ";\nconst lower = raw.trim().toLowerCase();\nconsole.log(lower);',
          comment_ru: 'Переводим всё в нижний регистр',
          comment_en: 'Convert everything to lowercase',
          output: '"алиса"',
        },
        {
          code: 'const raw = "  аЛИСА  ";\nconst lower = raw.trim().toLowerCase();\nconst proper = lower[0].toUpperCase() + lower.slice(1);\nconsole.log(proper);',
          comment_ru: 'Делаем первую букву заглавной',
          comment_en: 'Capitalize the first letter',
          output: '"Алиса"',
        },
        {
          code: 'const name = "Алиса";\nconsole.log(`Добро пожаловать, ${name}! Длина имени: ${name.length}`);',
          comment_ru: 'Используем в шаблонной строке',
          comment_en: 'Use inside a template literal',
          output: 'Добро пожаловать, Алиса! Длина имени: 5',
        },
      ],
    },
    {
      id: 'search-methods',
      type: 'code',
      title_ru: 'Методы поиска',
      title_en: 'Search Methods',
      body_ru: 'JavaScript предоставляет несколько методов для поиска подстроки внутри строки.',
      body_en: 'JavaScript provides several methods for searching for a substring within a string.',
      code: `const sentence = "Быстрая коричневая лиса";

console.log(sentence.includes("лиса"));      // true
console.log(sentence.includes("волк"));      // false
console.log(sentence.startsWith("Быстрая")); // true
console.log(sentence.endsWith("лиса"));      // true
console.log(sentence.indexOf("коричневая")); // 9
console.log(sentence.indexOf("волк"));       // -1`,
      codeLang: 'javascript',
    },
    {
      id: 'transform-methods',
      type: 'code',
      title_ru: 'Методы преобразования',
      title_en: 'Transformation Methods',
      body_ru: 'slice, split и replace позволяют нарезать, разделять и заменять части строки.',
      body_en: 'slice, split, and replace let you cut, split, and substitute parts of a string.',
      code: `const text = "яблоко,банан,вишня";

// slice(начало, конец) — не включает конец
console.log("яблоко".slice(0, 3));  // "ябл"
console.log("яблоко".slice(-3));    // "око"

// split — разбивает строку в массив
const fruits = text.split(",");
console.log(fruits); // ["яблоко", "банан", "вишня"]

// replace / replaceAll
console.log(text.replace("банан", "манго"));
// "яблоко,манго,вишня"`,
      codeLang: 'javascript',
    },
    {
      id: 'tip-immutable',
      type: 'tip',
      title_ru: 'Строки неизменяемы',
      title_en: 'Strings Are Immutable',
      body_ru: 'Методы строк не изменяют исходную строку — они возвращают новую. Всегда сохраняйте результат в переменную.',
      body_en: 'String methods do not modify the original string — they return a new one. Always save the result to a variable.',
      code: `let name = "алиса";
name.toUpperCase(); // результат потерян!
console.log(name);  // "алиса" (не изменилась)

// Правильно:
name = name.toUpperCase();
console.log(name);  // "АЛИСА"`,
      codeLang: 'javascript',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Попробуйте сами!',
      title_en: 'Try It Yourself!',
      body_ru: 'Обработайте строку с именем пользователя: уберите пробелы, сделайте первую букву заглавной, проверьте длину и выведите результат через шаблонный литерал.',
      body_en: 'Process a user name string: remove whitespace, capitalize the first letter, check the length, and output the result via a template literal.',
    },
  ],

  content: {
    intro_ru: 'Строки в JavaScript — это последовательности символов Unicode. Они неизменяемы (иммутабельны), имеют богатый API из десятков методов и могут быть объявлены тремя способами. Умение работать со строками необходимо в любом веб-приложении.',
    intro_en: 'Strings in JavaScript are sequences of Unicode characters. They are immutable, have a rich API of dozens of methods, and can be declared in three ways. Knowing how to work with strings is essential in any web application.',
    blocks: [
      {
        sectionId: 'creation',
        heading_ru: 'Выбор кавычек',
        heading_en: 'Choosing Quotes',
        text_ru: 'Одинарные и двойные кавычки функционально одинаковы. Выберите один стиль и придерживайтесь его. Обратные кавычки (шаблонные литералы) предпочтительны, когда нужно встроить переменные или писать многострочный текст.',
        text_en: 'Single and double quotes are functionally identical. Pick one style and stick to it. Backticks (template literals) are preferred when embedding variables or writing multiline text.',
        code: `const a = 'Одинарные кавычки';
const b = "Двойные кавычки";
const c = \`Обратные кавычки — шаблон\`;

// Кавычка внутри строки:
const d = "It's a great day";   // двойные снаружи
const e = 'Say "hello"';        // одинарные снаружи`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'template-literals',
        heading_ru: 'Мощь шаблонных литералов',
        heading_en: 'The Power of Template Literals',
        text_ru: 'Внутри ${} допустимо любое выражение: вызов функции, тернарный оператор, арифметика. Шаблонные литералы поддерживают настоящие переносы строк без \\n.',
        text_en: 'Inside ${} any expression is allowed: function call, ternary operator, arithmetic. Template literals support real line breaks without \\n.',
        code: `const items = ["хлеб", "молоко", "яйца"];
const total = 450;
const discount = total > 400 ? 50 : 0;

console.log(\`
  Корзина: \${items.join(", ")}
  Итого: \${total} ₽
  Скидка: \${discount} ₽
  К оплате: \${total - discount} ₽
\`);`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'methods-case',
        heading_ru: 'Методы регистра и пробелов',
        heading_en: 'Case and Whitespace Methods',
        text_ru: 'JavaScript предоставляет несколько методов для управления регистром букв и удаления лишних пробелов. toUpperCase и toLowerCase меняют регистр всей строки, а trim, trimStart и trimEnd удаляют пробельные символы с одного или обоих концов. Эти методы незаменимы при обработке пользовательского ввода.\n\nВажно помнить, что все методы строк возвращают новую строку, не изменяя исходную. Чтобы применить несколько операций подряд, их можно объединять в цепочку: str.trim().toLowerCase(). Это делает код компактным и читаемым.',
        text_en: 'JavaScript provides several methods for controlling letter casing and stripping extra whitespace. toUpperCase and toLowerCase change the case of the entire string, while trim, trimStart, and trimEnd remove whitespace characters from one or both ends. These methods are indispensable when processing user input.\n\nIt is important to remember that all string methods return a new string without modifying the original. To apply several operations in a row, they can be chained: str.trim().toLowerCase(). This keeps the code compact and readable.',
        code: `const input = "  пРиВеТ, МиР!  ";

console.log(input.trim());           // "пРиВеТ, МиР!"
console.log(input.trimStart());      // "пРиВеТ, МиР!  "
console.log(input.trimEnd());        // "  пРиВеТ, МиР!"
console.log(input.toUpperCase());    // "  ПРИВЕТ, МИР!  "
console.log(input.toLowerCase());    // "  привет, мир!  "

// Цепочка для нормализации ввода
const normalized = input.trim().toLowerCase();
console.log(normalized); // "привет, мир!"`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'methods-search',
        heading_ru: 'Поиск без indexOf',
        heading_en: 'Searching Without indexOf',
        text_ru: 'includes, startsWith и endsWith возвращают boolean и читаются как человеческий язык. Используйте их вместо indexOf, когда не нужна позиция.',
        text_en: 'includes, startsWith, and endsWith return booleans and read like natural language. Use them instead of indexOf when you do not need the position.',
        code: `const email = "user@example.com";

if (email.includes("@")) {
  console.log("Похоже на e-mail");
}
if (email.endsWith(".com")) {
  console.log("Домен .com");
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'methods-transform',
        heading_ru: 'Цепочка методов',
        heading_en: 'Method Chaining',
        text_ru: 'Поскольку каждый метод возвращает новую строку, можно вызывать методы цепочкой. Это позволяет писать компактный и читаемый код обработки текста.',
        text_en: 'Since every method returns a new string, you can chain methods together. This enables compact and readable text-processing code.',
        code: `const userInput = "  привет@ПРИМЕР.com  ";
const cleanEmail = userInput
  .trim()
  .toLowerCase()
  .replace("пример", "example");

console.log(cleanEmail); // "привет@example.com"`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Обработка строки с именем',
    title_en: 'Processing a Name String',
    instructions_ru: 'Возьмите строку с именем пользователя (со случайным регистром и лишними пробелами). Используйте trim, toLowerCase и slice чтобы получить правильно отформатированное имя. Проверьте, начинается ли имя с определённой буквы, и выведите результат в шаблонном литерале.',
    instructions_en: 'Take a user name string (with random casing and extra whitespace). Use trim, toLowerCase, and slice to get a properly formatted name. Check if the name starts with a certain letter and output the result in a template literal.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// Исходный ввод / Raw input
const rawName = "  мАРИЯ  ";

// 1. Уберите пробелы / Remove whitespace
const trimmed = rawName.trim();

// 2. Приведите к нижнему регистру / Lowercase
const lowered = trimmed.toLowerCase();

// 3. Сделайте первую букву заглавной / Capitalize first letter
const properName = lowered[0].toUpperCase() + lowered.slice(1);

// 4. Выведите результаты / Log results
console.log("Результат:", properName);
console.log("Длина:", properName.length);
console.log("Начинается с М:", properName.startsWith("М"));
console.log(\`Добро пожаловать, \${properName}!\`);
`,
    },
    hints_ru: [
      'trim() убирает пробелы только по краям строки.',
      'toLowerCase() не изменяет исходную строку — нужно сохранить результат.',
      'slice(1) возвращает строку начиная со второго символа (индекс 1).',
      'Индексация строк начинается с 0: str[0] — первый символ.',
      'Можно цеплять методы: str.trim().toLowerCase().',
    ],
    hints_en: [
      'trim() removes whitespace only from the edges of the string.',
      'toLowerCase() does not change the original string — save the result.',
      'slice(1) returns the string starting from the second character (index 1).',
      'String indexing starts at 0: str[0] is the first character.',
      'You can chain methods: str.trim().toLowerCase().',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Шаблонный литерал',
      term_en: 'Template Literal',
      definition_ru: 'Строка в обратных кавычках с поддержкой встроенных выражений через ${}.',
      definition_en: 'A string in backticks supporting embedded expressions via ${}.',
      example_ru: '`Итого: ${price} ₽`',
      example_en: '`Total: ${price} USD`',
    },
    {
      term_ru: 'Иммутабельность',
      term_en: 'Immutability',
      definition_ru: 'Свойство строк: методы не изменяют исходную строку, а возвращают новую.',
      definition_en: 'The property of strings: methods do not modify the original string but return a new one.',
      example_ru: 'str.toUpperCase() → новая строка',
      example_en: 'str.toUpperCase() → new string',
    },
    {
      term_ru: 'slice',
      term_en: 'slice',
      definition_ru: 'Метод строки, возвращающий подстроку от индекса start до end (не включая end).',
      definition_en: 'String method returning a substring from index start to end (end not included).',
      example_ru: '"яблоко".slice(0, 3) // "ябл"',
      example_en: '"apple".slice(0, 3) // "app"',
    },
    {
      term_ru: 'split',
      term_en: 'split',
      definition_ru: 'Метод, разделяющий строку на массив подстрок по указанному разделителю.',
      definition_en: 'Method that splits a string into an array of substrings by a specified separator.',
      example_ru: '"a,b,c".split(",") // ["a","b","c"]',
      example_en: '"a,b,c".split(",") // ["a","b","c"]',
    },
    {
      term_ru: 'includes',
      term_en: 'includes',
      definition_ru: 'Метод, возвращающий true, если строка содержит указанную подстроку.',
      definition_en: 'Method returning true if the string contains the specified substring.',
      example_ru: '"hello".includes("ell") // true',
      example_en: '"hello".includes("ell") // true',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В JavaScript строки индексируются как массивы: можно обращаться к символу через str[0]. Однако изменить символ таким способом нельзя — строки иммутабельны.',
      text_en: 'In JavaScript strings are indexed like arrays: you can access a character via str[0]. However, you cannot change a character this way — strings are immutable.',
    },
    {
      text_ru: 'Метод padStart позволяет добить строку до нужной длины символами слева. Например, "5".padStart(3, "0") даёт "005" — удобно для форматирования времени и чисел.',
      text_en: 'The padStart method lets you pad a string to a desired length with characters on the left. For example, "5".padStart(3, "0") gives "005" — handy for formatting time and numbers.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой метод убирает пробельные символы с обоих концов строки?',
      text_en: 'Which method removes whitespace from both ends of a string?',
      options_ru: ['strip()', 'clean()', 'trim()', 'removeSpaces()'],
      options_en: ['strip()', 'clean()', 'trim()', 'removeSpaces()'],
      correctIndex: 2,
      explanation_ru: 'trim() — стандартный метод строки, удаляющий ведущие и замыкающие пробельные символы.',
      explanation_en: 'trim() is the standard string method that removes leading and trailing whitespace.',
    },
    {
      id: 'q2',
      text_ru: 'Что вернёт "hello".slice(1, 3)?',
      text_en: 'What does "hello".slice(1, 3) return?',
      options_ru: ['"hel"', '"ell"', '"el"', '"llo"'],
      options_en: ['"hel"', '"ell"', '"el"', '"llo"'],
      correctIndex: 2,
      explanation_ru: 'slice(1, 3) берёт символы с индекса 1 включительно до 3 не включая: "el".',
      explanation_en: 'slice(1, 3) takes characters from index 1 up to but not including 3: "el".',
    },
    {
      id: 'q3',
      text_ru: 'Изменяют ли методы строк (например, toUpperCase) исходную строку?',
      text_en: 'Do string methods (like toUpperCase) modify the original string?',
      options_ru: ['Да, всегда', 'Только методы с "set" в названии', 'Нет, они возвращают новую строку', 'Зависит от браузера'],
      options_en: ['Yes, always', 'Only methods with "set" in the name', 'No, they return a new string', 'Depends on the browser'],
      correctIndex: 2,
      explanation_ru: 'Строки в JavaScript иммутабельны. Все методы возвращают новую строку, не меняя исходную.',
      explanation_en: 'Strings in JavaScript are immutable. All methods return a new string without changing the original.',
    },
    {
      id: 'q4',
      text_ru: 'Что вернёт "яблоко,банан".split(",")?',
      text_en: 'What does "apple,banana".split(",") return?',
      options_ru: ['"яблоко банан"', '["яблоко", "банан"]', '{"0":"яблоко","1":"банан"}', 'Ошибку'],
      options_en: ['"apple banana"', '["apple", "banana"]', '{"0":"apple","1":"banana"}', 'An error'],
      correctIndex: 1,
      explanation_ru: 'split разделяет строку по разделителю и возвращает массив подстрок.',
      explanation_en: 'split splits a string by a separator and returns an array of substrings.',
    },
    {
      id: 'q5',
      text_ru: 'Какое из выражений проверит, содержит ли строка email символ "@"?',
      text_en: 'Which expression checks if the string email contains the "@" character?',
      options_ru: ['email.has("@")', 'email.contains("@")', 'email.includes("@")', 'email.find("@")'],
      options_en: ['email.has("@")', 'email.contains("@")', 'email.includes("@")', 'email.find("@")'],
      correctIndex: 2,
      explanation_ru: 'includes(substring) возвращает true, если строка содержит указанную подстроку.',
      explanation_en: 'includes(substring) returns true if the string contains the given substring.',
    },
  ],
}
