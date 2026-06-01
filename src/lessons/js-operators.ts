import type { Lesson } from '@/types/lesson'

export const jsOperators: Lesson = {
  slug: 'js-operators',
  category: 'JS',
  readTime: 7,
  icon: '➕',
  title_ru: 'Операторы JavaScript',
  title_en: 'JavaScript Operators',
  description_ru: 'Арифметические, операторы присваивания, сравнения и логические операторы — всё для работы с данными.',
  description_en: 'Arithmetic, assignment, comparison, and logical operators — everything for working with data.',

  sections: [
    { id: 'arithmetic', title_ru: 'Арифметические операторы', title_en: 'Arithmetic Operators' },
    { id: 'assignment', title_ru: 'Операторы присваивания', title_en: 'Assignment Operators' },
    { id: 'comparison', title_ru: 'Операторы сравнения', title_en: 'Comparison Operators' },
    { id: 'logical', title_ru: 'Логические операторы', title_en: 'Logical Operators' },
    { id: 'strings', title_ru: 'Строки и операторы', title_en: 'Strings and Operators' },
  ],

  slides: [
    {
      id: 'title',
      type: 'title',
      title_ru: 'Операторы JavaScript',
      title_en: 'JavaScript Operators',
      body_ru: 'Операторы — это символы, которые выполняют операции над значениями. Они позволяют складывать числа, сравнивать данные и строить логику программы.',
      body_en: 'Operators are symbols that perform operations on values. They let you add numbers, compare data, and build program logic.',
      visual: { kind: 'emoji', emojis: ['➕', '➖', '✖️', '🟰'], caption_ru: 'Операции над данными', caption_en: 'Operations on Data' },
    },
    {
      id: 'arithmetic',
      type: 'concept',
      title_ru: 'Арифметические операторы',
      title_en: 'Arithmetic Operators',
      body_ru: 'JavaScript поддерживает стандартные математические операции, а также оператор остатка от деления.',
      body_en: 'JavaScript supports standard math operations plus the remainder operator.',
      bullets: [
        { text_ru: '+ сложение: 5 + 3 = 8', text_en: '+ addition: 5 + 3 = 8' },
        { text_ru: '- вычитание: 10 - 4 = 6', text_en: '- subtraction: 10 - 4 = 6' },
        { text_ru: '* умножение: 3 * 7 = 21', text_en: '* multiplication: 3 * 7 = 21' },
        { text_ru: '/ деление: 15 / 4 = 3.75', text_en: '/ division: 15 / 4 = 3.75' },
        { text_ru: '% остаток: 17 % 5 = 2', text_en: '% remainder: 17 % 5 = 2' },
        { text_ru: '** возведение в степень: 2 ** 8 = 256', text_en: '** exponentiation: 2 ** 8 = 256' },
      ],
    },
    {
      id: 'assignment',
      type: 'code',
      title_ru: 'Операторы присваивания',
      title_en: 'Assignment Operators',
      body_ru: 'Составные операторы присваивания сокращают запись: x += 1 означает x = x + 1.',
      body_en: 'Compound assignment operators shorten the notation: x += 1 means x = x + 1.',
      code: `let score = 100;

score += 50;   // score = 150
score -= 20;   // score = 130
score *= 2;    // score = 260
score /= 4;    // score = 65
score %= 10;   // score = 5

let count = 0;
count++;       // count = 1  (постинкремент)
count--;       // count = 0  (постдекремент)
++count;       // count = 1  (преинкремент)`,
      codeLang: 'javascript',
    },
    {
      id: 'compare-equality',
      type: 'compare',
      title_ru: '== против ===',
      title_en: '== vs ===',
      body_ru: 'Всегда используйте строгое сравнение === вместо нестрогого ==, чтобы избежать неожиданных результатов.',
      body_en: 'Always use strict equality === instead of loose ==, to avoid unexpected results.',
      compareLeft: {
        label_ru: '== нестрогое равенство',
        label_en: '== loose equality',
        items_ru: ['"5" == 5 → true (плохо!)', 'null == undefined → true', '0 == false → true', 'Преобразует типы перед сравнением'],
        items_en: ['"5" == 5 → true (bad!)', 'null == undefined → true', '0 == false → true', 'Converts types before comparing'],
        color: 'red',
      },
      compareRight: {
        label_ru: '=== строгое равенство',
        label_en: '=== strict equality',
        items_ru: ['"5" === 5 → false (верно!)', 'null === undefined → false', '0 === false → false', 'Сравнивает тип И значение'],
        items_en: ['"5" === 5 → false (correct!)', 'null === undefined → false', '0 === false → false', 'Compares type AND value'],
        color: 'green',
      },
    },
    {
      id: 'comparison-ops',
      type: 'code',
      title_ru: 'Операторы сравнения',
      title_en: 'Comparison Operators',
      body_ru: 'Операторы сравнения всегда возвращают boolean: true или false.',
      body_en: 'Comparison operators always return a boolean: true or false.',
      code: `const a = 10;
const b = 20;

console.log(a === b);  // false — строгое равенство
console.log(a !== b);  // true  — строгое неравенство
console.log(a > b);    // false — больше
console.log(a < b);    // true  — меньше
console.log(a >= 10);  // true  — больше или равно
console.log(b <= 20);  // true  — меньше или равно`,
      codeLang: 'javascript',
    },
    {
      id: 'logical-ops',
      type: 'concept',
      title_ru: 'Логические операторы',
      title_en: 'Logical Operators',
      body_ru: 'Логические операторы комбинируют условия и возвращают значение одного из операндов.',
      body_en: 'Logical operators combine conditions and return the value of one of the operands.',
      bullets: [
        { text_ru: '&& (И) — true только если оба операнда truthy', text_en: '&& (AND) — true only if both operands are truthy' },
        { text_ru: '|| (ИЛИ) — true если хотя бы один операнд truthy', text_en: '|| (OR) — true if at least one operand is truthy' },
        { text_ru: '! (НЕ) — инвертирует значение: !true = false', text_en: '! (NOT) — inverts the value: !true = false' },
        { text_ru: '?? (нулевое слияние) — возвращает правый, если левый null/undefined', text_en: '?? (nullish coalescing) — returns right if left is null/undefined' },
      ],
    },
    {
      id: 'anim-calculator',
      type: 'code-anim',
      title_ru: 'Строим калькулятор',
      title_en: 'Building a Calculator',
      body_ru: 'Посмотрите, как операторы используются для создания простого калькулятора.',
      body_en: 'Watch how operators are used to build a simple calculator.',
      animMode: 'console',
      animSteps: [
        {
          code: 'const a = 16;\nconst b = 4;',
          comment_ru: 'Задаём два числа',
          comment_en: 'Define two numbers',
          output: '',
        },
        {
          code: 'const a = 16;\nconst b = 4;\nconsole.log(a + b);',
          comment_ru: 'Сложение',
          comment_en: 'Addition',
          output: '20',
        },
        {
          code: 'const a = 16;\nconst b = 4;\nconsole.log(a - b);\nconsole.log(a * b);',
          comment_ru: 'Вычитание и умножение',
          comment_en: 'Subtraction and multiplication',
          output: '12\n64',
        },
        {
          code: 'const a = 16;\nconst b = 4;\nconsole.log(a / b);\nconsole.log(a % b);',
          comment_ru: 'Деление и остаток',
          comment_en: 'Division and remainder',
          output: '4\n0',
        },
        {
          code: 'const a = 16;\nconst b = 4;\nconst isEqual = a === b;\nconst aIsBigger = a > b;\nconsole.log(`Равны: ${isEqual}, A больше: ${aIsBigger}`);',
          comment_ru: 'Сравниваем с помощью операторов',
          comment_en: 'Compare using operators',
          output: 'Равны: false, A больше: true',
        },
      ],
    },
    {
      id: 'string-plus',
      type: 'tip',
      title_ru: 'Оператор + со строками',
      title_en: 'The + Operator with Strings',
      body_ru: 'Когда один из операндов — строка, + выполняет конкатенацию, а не сложение. Это частая причина ошибок.',
      body_en: 'When one operand is a string, + performs concatenation, not addition. This is a common source of bugs.',
      code: `console.log("5" + 3);      // "53"  — конкатенация!
console.log(5 + 3);        // 8    — сложение
console.log("5" - 3);      // 2    — вычитание всегда числовое
console.log(+"5" + 3);     // 8    — унарный + приводит к числу`,
      codeLang: 'javascript',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Попробуйте сами!',
      title_en: 'Try It Yourself!',
      body_ru: 'Напишите простой калькулятор, используя все арифметические операторы, и проверьте результаты через console.log.',
      body_en: 'Write a simple calculator using all arithmetic operators and verify results with console.log.',
    },
  ],

  content: {
    intro_ru: 'Операторы — это строительные блоки любой логики в JavaScript. Умение правильно использовать арифметические, операторы присваивания, сравнения и логические операторы необходимо для написания любого кода.',
    intro_en: 'Operators are the building blocks of any logic in JavaScript. Knowing how to correctly use arithmetic, assignment, comparison, and logical operators is essential for writing any code.',
    blocks: [
      {
        sectionId: 'arithmetic',
        heading_ru: 'Арифметика и приоритет операторов',
        heading_en: 'Arithmetic and Operator Precedence',
        text_ru: 'JavaScript соблюдает математический порядок действий: умножение и деление выполняются до сложения и вычитания. Скобки изменяют приоритет.',
        text_en: 'JavaScript respects mathematical order of operations: multiplication and division happen before addition and subtraction. Parentheses override precedence.',
        code: `console.log(2 + 3 * 4);    // 14, не 20
console.log((2 + 3) * 4);  // 20
console.log(10 % 3);       // 1 (остаток от деления 10 на 3)
console.log(2 ** 10);      // 1024`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'assignment',
        heading_ru: 'Короткая запись присваивания',
        heading_en: 'Shorthand Assignment',
        text_ru: 'Составные операторы присваивания читаются быстрее и вызывают меньше ошибок, чем длинная форма. Используйте их как можно чаще.',
        text_en: 'Compound assignment operators read faster and cause fewer mistakes than the long form. Use them whenever possible.',
        code: `let hp = 100;
hp -= 15;   // получили урон
hp += 20;   // восстановление
hp *= 0.9;  // дебафф -10%
console.log(Math.round(hp)); // 94`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'comparison',
        heading_ru: 'Сравнение и строгость',
        heading_en: 'Comparison and Strictness',
        text_ru: 'Используйте === и !== везде. Нестрогие операторы == и != выполняют неявное преобразование типов, которое может привести к трудноуловимым ошибкам.',
        text_en: 'Use === and !== everywhere. The loose == and != operators perform implicit type coercion, which can lead to hard-to-find bugs.',
        code: `// Безопасные сравнения
const input = "42";
if (input === 42) { /* не сработает */ }
if (Number(input) === 42) { /* правильно */ }`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'logical',
        heading_ru: 'Логические операторы и короткое замыкание',
        heading_en: 'Logical Operators and Short-Circuit Evaluation',
        text_ru: '&& и || не просто возвращают true/false — они возвращают один из своих операндов. Это позволяет писать компактный код с «коротким замыканием».',
        text_en: '&& and || do not just return true/false — they return one of their operands. This enables compact "short-circuit" code.',
        code: `const user = null;
const name = user && user.name; // null (не упадёт)
const display = name || "Гость"; // "Гость"

// Нулевое слияние
const config = null;
const timeout = config ?? 3000; // 3000`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'strings',
        heading_ru: 'Строки и оператор +',
        heading_en: 'Strings and the + Operator',
        text_ru: 'Когда оператор + применяется к строкам, он выполняет конкатенацию — склеивает их в одну. Достаточно, чтобы хотя бы один из операндов был строкой, и JavaScript автоматически приведёт второй к строковому типу. Это часто приводит к неожиданным результатам при смешивании чисел и строк.\n\nЧтобы явно преобразовать значение в число, используйте функцию Number() или унарный оператор +. В современном коде для формирования строк с переменными предпочтительнее использовать шаблонные литералы с обратными кавычками — они избавляют от неоднозначности оператора +.',
        text_en: 'When the + operator is applied to strings it performs concatenation — joining them into one. It is enough for just one operand to be a string and JavaScript will automatically coerce the other to a string type. This frequently leads to surprising results when mixing numbers and strings.\n\nTo explicitly convert a value to a number, use the Number() function or the unary + operator. In modern code, template literals with backticks are preferred for building strings with variables — they remove the ambiguity of the + operator.',
        code: `// Конкатенация строк
console.log("Привет" + ", " + "мир!"); // "Привет, мир!"

// Скрытое преобразование типов
console.log("Счёт: " + 42);   // "Счёт: 42"
console.log("5" + 3);          // "53" (не 8!)
console.log("10" - 4);         // 6   (вычитание всегда числовое)

// Явное приведение к числу
console.log(Number("5") + 3);  // 8
console.log(+"5" + 3);         // 8

// Предпочтительный способ — шаблонный литерал
const total = 150;
console.log(\`Итого: \${total} ₽\`); // "Итого: 150 ₽"`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Простой калькулятор',
    title_en: 'Simple Calculator',
    instructions_ru: 'Создайте переменные a и b. Вычислите и выведите в консоль результаты сложения, вычитания, умножения и деления. Также проверьте, равны ли числа строгим сравнением.',
    instructions_en: 'Create variables a and b. Compute and log the results of addition, subtraction, multiplication, and division. Also check whether the numbers are equal using strict comparison.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// Задайте два числа / Set two numbers
const a = 20;
const b = 6;

// Арифметика / Arithmetic
console.log("Сложение:", a + b);
console.log("Вычитание:", a - b);
console.log("Умножение:", a * b);
console.log("Деление:", a / b);
console.log("Остаток:", a % b);

// Сравнение / Comparison
console.log("a === b:", a === b);
console.log("a > b:", a > b);
`,
    },
    hints_ru: [
      'Измените значения a и b, чтобы увидеть разные результаты.',
      '% возвращает остаток от деления, не процент.',
      'Деление в JavaScript всегда возвращает дробное число.',
      '=== проверяет тип И значение одновременно.',
      'Попробуйте использовать составные операторы: a += 5.',
    ],
    hints_en: [
      'Change the values of a and b to see different results.',
      '% returns the division remainder, not a percentage.',
      'Division in JavaScript always returns a floating-point number.',
      '=== checks type AND value at the same time.',
      'Try using compound operators: a += 5.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Оператор',
      term_en: 'Operator',
      definition_ru: 'Символ или ключевое слово, выполняющее операцию над одним или несколькими значениями.',
      definition_en: 'A symbol or keyword that performs an operation on one or more values.',
      example_ru: '+, -, *, /, %',
      example_en: '+, -, *, /, %',
    },
    {
      term_ru: 'Строгое равенство',
      term_en: 'Strict Equality',
      definition_ru: 'Оператор ===, который сравнивает значение И тип без преобразований.',
      definition_en: 'The === operator, which compares value AND type without any conversion.',
      example_ru: '42 === "42" // false',
      example_en: '42 === "42" // false',
    },
    {
      term_ru: 'Остаток от деления',
      term_en: 'Modulo / Remainder',
      definition_ru: 'Оператор %, возвращающий остаток от целочисленного деления.',
      definition_en: 'The % operator, returning the remainder of integer division.',
      example_ru: '17 % 5 // 2',
      example_en: '17 % 5 // 2',
    },
    {
      term_ru: 'Короткое замыкание',
      term_en: 'Short-Circuit Evaluation',
      definition_ru: 'Поведение && и ||: вычисление прекращается, как только результат известен.',
      definition_en: 'The behavior of && and ||: evaluation stops as soon as the result is known.',
      example_ru: 'null && doSomething() // doSomething не вызовется',
      example_en: 'null && doSomething() // doSomething never called',
    },
    {
      term_ru: 'Конкатенация',
      term_en: 'Concatenation',
      definition_ru: 'Объединение строк с помощью оператора +.',
      definition_en: 'Joining strings together using the + operator.',
      example_ru: '"Привет" + " " + "мир"',
      example_en: '"Hello" + " " + "world"',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Оператор ** для возведения в степень (2 ** 8 = 256) появился только в ES2016. До этого приходилось использовать Math.pow(2, 8).',
      text_en: 'The ** exponentiation operator (2 ** 8 = 256) was only introduced in ES2016. Before that, you had to use Math.pow(2, 8).',
    },
    {
      text_ru: 'В JavaScript деление на ноль не вызывает ошибку, а возвращает специальное значение Infinity. А 0 / 0 возвращает NaN (Not a Number).',
      text_en: 'In JavaScript, dividing by zero does not throw an error — it returns the special value Infinity. And 0 / 0 returns NaN (Not a Number).',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Чему равно выражение "5" + 3 в JavaScript?',
      text_en: 'What does the expression "5" + 3 equal in JavaScript?',
      options_ru: ['8', '"53"', '53', 'NaN'],
      options_en: ['8', '"53"', '53', 'NaN'],
      correctIndex: 1,
      explanation_ru: 'Когда один из операндов — строка, оператор + выполняет конкатенацию. "5" + 3 = "53".',
      explanation_en: 'When one operand is a string, the + operator performs concatenation. "5" + 3 = "53".',
    },
    {
      id: 'q2',
      text_ru: 'Что вернёт выражение 17 % 5?',
      text_en: 'What does 17 % 5 return?',
      options_ru: ['3', '2', '3.4', '1'],
      options_en: ['3', '2', '3.4', '1'],
      correctIndex: 1,
      explanation_ru: '17 делится на 5 три раза (15), остаток 17 - 15 = 2.',
      explanation_en: '17 divides by 5 three times (15), remainder 17 - 15 = 2.',
    },
    {
      id: 'q3',
      text_ru: 'Почему рекомендуется использовать === вместо ==?',
      text_en: 'Why is === recommended over ==?',
      options_ru: [
        '=== работает быстрее',
        '=== сравнивает и тип, и значение без преобразований',
        '== не работает с числами',
        '=== поддерживается во всех браузерах',
      ],
      options_en: [
        '=== runs faster',
        '=== compares both type and value without coercion',
        '== does not work with numbers',
        '=== is supported in all browsers',
      ],
      correctIndex: 1,
      explanation_ru: '=== не преобразует типы, поэтому "5" === 5 возвращает false — предсказуемо и безопасно.',
      explanation_en: '=== does not coerce types, so "5" === 5 returns false — predictable and safe.',
    },
    {
      id: 'q4',
      text_ru: 'Что означает запись x += 10?',
      text_en: 'What does x += 10 mean?',
      options_ru: ['x > 10', 'x = 10', 'x = x + 10', 'x + 10'],
      options_en: ['x > 10', 'x = 10', 'x = x + 10', 'x + 10'],
      correctIndex: 2,
      explanation_ru: '+= — составной оператор присваивания. x += 10 эквивалентно x = x + 10.',
      explanation_en: '+= is a compound assignment operator. x += 10 is equivalent to x = x + 10.',
    },
    {
      id: 'q5',
      text_ru: 'Что вернёт выражение false || "запасное"?',
      text_en: 'What does false || "fallback" return?',
      options_ru: ['false', 'true', '"запасное"', 'undefined'],
      options_en: ['false', 'true', '"fallback"', 'undefined'],
      correctIndex: 2,
      explanation_ru: '|| возвращает первый truthy операнд. false — falsy, поэтому возвращается "запасное".',
      explanation_en: '|| returns the first truthy operand. false is falsy, so "fallback" is returned.',
    },
  ],
}
