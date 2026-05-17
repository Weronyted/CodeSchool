import type { Lesson } from '@/types/lesson'

export const javascriptConditions: Lesson = {
  slug: 'javascript-conditions',
  category: 'JS',
  readTime: 8,
  icon: '🔀',

  title_ru: 'Условия в JavaScript',
  title_en: 'Conditions in JavaScript',

  description_ru: 'if/else, операторы сравнения, логические операторы и тернарный оператор.',
  description_en: 'if/else, comparison operators, logical operators and the ternary operator.',

  sections: [
    { id: 'if-else',    title_ru: 'if / else',                 title_en: 'if / else' },
    { id: 'else-if',    title_ru: 'else if',                   title_en: 'else if' },
    { id: 'comparison', title_ru: 'Операторы сравнения',       title_en: 'Comparison operators' },
    { id: 'logical',    title_ru: 'Логические операторы',      title_en: 'Logical operators' },
    { id: 'ternary',    title_ru: 'Тернарный оператор',        title_en: 'Ternary operator' },
    { id: 'key-terms',  title_ru: 'Ключевые термины',          title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Условия: программа принимает решения',
      title_en: 'Conditions: the program makes decisions',
      body_ru: 'Условия позволяют программе делать разные вещи в зависимости от данных. Без условий все программы делали бы одно и то же. Это самый важный инструмент логики.',
      body_en: 'Conditions let a program do different things depending on data. Without conditions every program would do the same thing every time. This is the most important tool for logic.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Условие как развилка на дороге',
      title_en: 'A condition is like a fork in the road',
      body_ru: 'Едешь к перекрёстку: если горит зелёный — едешь прямо, если красный — останавливаешься. Программа точно так же: проверяет условие и выбирает путь.',
      body_en: 'You reach a crossroads: if the light is green — go straight, if red — stop. A program does the same: it checks a condition and chooses a path.',
      visual: {
        kind: 'emoji',
        emojis: ['🔀', '✅', '❌'],
      },
      bullets: [
        { text_ru: '🔀 Условие — это вопрос: да или нет?', text_en: '🔀 A condition is a question: yes or no?' },
        { text_ru: '✅ true — выполняется блок if', text_en: '✅ true — the if block runs' },
        { text_ru: '❌ false — выполняется блок else', text_en: '❌ false — the else block runs' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'if / else — основа условий',
      title_en: 'if / else — the basis of conditions',
      body_ru: 'if проверяет условие в скобках. Если оно true — выполняет первый блок. Если false — блок else (необязательный). Условие — любое выражение, которое даёт true или false.',
      body_en: 'if checks the condition in parentheses. If it is true — runs the first block. If false — runs the else block (optional). The condition is any expression that gives true or false.',
      bullets: [
        { text_ru: '📋 if (условие) { ... } — выполнить если true', text_en: '📋 if (condition) { ... } — run if true' },
        { text_ru: '🔄 else { ... } — выполнить если false (необязательно)', text_en: '🔄 else { ... } — run if false (optional)' },
        { text_ru: '➕ else if — дополнительная проверка', text_en: '➕ else if — additional check' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Строим условие шаг за шагом',
      title_en: 'Building a condition step by step',
      body_ru: 'Посмотри, как программа проверяет оценку и выводит результат.',
      body_en: 'Watch how the program checks a score and prints the result.',
      animMode: 'console',
      animSteps: [
        {
          code: 'let score = 75;',
          comment_ru: '1. Объявляем переменную — оценка 75',
          comment_en: '1. Declare variable — score is 75',
        },
        {
          code: 'let score = 75;\n\nif (score >= 90) {\n  console.log("Отлично! A");\n}',
          comment_ru: '2. Первая проверка: 75 >= 90? Нет — блок не выполнится',
          comment_en: '2. First check: 75 >= 90? No — block does not run',
        },
        {
          code: 'let score = 75;\n\nif (score >= 90) {\n  console.log("Отлично! A");\n} else if (score >= 80) {\n  console.log("Хорошо! B");\n} else if (score >= 70) {\n  console.log("Неплохо! C");\n}',
          comment_ru: '3. Добавляем else if — 75 >= 70? Да!',
          comment_en: '3. Add else if — 75 >= 70? Yes!',
          output: 'Неплохо! C',
        },
        {
          code: 'let score = 75;\n\nif (score >= 90) {\n  console.log("Отлично! A");\n} else if (score >= 80) {\n  console.log("Хорошо! B");\n} else if (score >= 70) {\n  console.log("Неплохо! C");\n} else {\n  console.log("Нужно больше практики!");\n}',
          comment_ru: '4. else — запасной путь для любого другого значения',
          comment_en: '4. else — fallback for any other value',
          output: 'Неплохо! C',
        },
      ],
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Операторы сравнения',
      title_en: 'Comparison operators',
      body_ru: 'Операторы сравнения возвращают true или false. === проверяет и значение, и тип — всегда используй его вместо ==.',
      body_en: 'Comparison operators return true or false. === checks both value and type — always use it instead of ==.',
      bullets: [
        { text_ru: '=== строгое равенство: 5 === 5 → true, 5 === "5" → false', text_en: '=== strict equality: 5 === 5 → true, 5 === "5" → false' },
        { text_ru: '!== неравенство: 5 !== 3 → true', text_en: '!== inequality: 5 !== 3 → true' },
        { text_ru: '> >= < <= — больше/меньше/равно', text_en: '> >= < <= — greater/less/equal' },
        { text_ru: '⚠️ == и != — нестрогие, избегай их', text_en: '⚠️ == and != — loose, avoid them' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Логические операторы',
      title_en: 'Logical operators',
      body_ru: '&& (И) требует оба условия. || (ИЛИ) требует хотя бы одно. ! (НЕ) инвертирует.',
      body_en: '&& (AND) requires both conditions. || (OR) requires at least one. ! (NOT) inverts.',
      code: `// && — И: оба должны быть true
let age = 15;
let hasTicket = true;

if (age >= 6 && hasTicket) {
  console.log("Проходи!");
} else {
  console.log("Нельзя.");  // ← age < 18, но hasTicket true
}

// || — ИЛИ: хотя бы один true
let isAdmin = false;
let isOwner = true;
if (isAdmin || isOwner) {
  console.log("Доступ открыт!"); // ← isOwner = true
}

// ! — НЕ: инвертирует
let isLoggedIn = false;
if (!isLoggedIn) {
  console.log("Войди в систему"); // ← !false = true
}`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'compare',
      title_ru: 'if/else vs тернарный оператор',
      title_en: 'if/else vs ternary operator',
      body_ru: 'Тернарный оператор — короткая запись простого if/else для одного значения.',
      body_en: 'The ternary operator is a short form of simple if/else for a single value.',
      compareLeft: {
        label_ru: 'if / else',
        label_en: 'if / else',
        items_ru: [
          'if (age >= 18) {',
          '  label = "Взрослый";',
          '} else {',
          '  label = "Ребёнок";',
          '}',
          'Читается легко',
          'Подходит для сложных блоков',
        ],
        items_en: [
          'if (age >= 18) {',
          '  label = "Adult";',
          '} else {',
          '  label = "Child";',
          '}',
          'Easy to read',
          'Good for complex blocks',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'тернарный ?:',
        label_en: 'ternary ?:',
        items_ru: [
          'const label =',
          '  age >= 18',
          '  ? "Взрослый"',
          '  : "Ребёнок";',
          'Короче — одна строка',
          'Только для одного значения',
        ],
        items_en: [
          'const label =',
          '  age >= 18',
          '  ? "Adult"',
          '  : "Child";',
          'Shorter — one line',
          'Only for a single value',
        ],
        color: 'amber',
      },
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'В JavaScript есть "falsy"-значения — они ведут себя как false в условиях: 0, "" (пустая строка), null, undefined, NaN и false. Всё остальное — "truthy". Поэтому if (username) проверяет, что строка непустая — удобный трюк!',
      body_en: 'JavaScript has "falsy" values — they behave like false in conditions: 0, "" (empty string), null, undefined, NaN, and false. Everything else is "truthy". So if (username) checks that the string is not empty — a handy trick!',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Напиши условную логику!',
      title_en: 'Write some conditional logic!',
      body_ru: 'Создай функцию, которая принимает температуру и возвращает "Жарко", "Тепло" или "Холодно". Используй if/else if/else.',
      body_en: 'Create a function that takes temperature and returns "Hot", "Warm" or "Cold". Use if/else if/else.',
    },
  ],

  content: {
    intro_ru: `Условные операторы позволяют программе принимать решения. Как в жизни: «если идёт
дождь — возьми зонт, иначе — оставь дома». В JavaScript это записывается через if/else.
Без условий программы были бы жёсткими скриптами — с условиями они становятся умными.`,
    intro_en: `Conditional statements let a program make decisions. Just like in real life: "if it is
raining — take an umbrella, otherwise — leave it at home". In JavaScript this is written with
if/else. Without conditions programs would be rigid scripts — with them they become intelligent.`,

    blocks: [
      {
        sectionId: 'if-else',
        heading_ru: 'if / else',
        heading_en: 'if / else',
        text_ru: `Синтаксис if/else:
  if (условие) {
    // выполнится если true
  } else {
    // выполнится если false
  }

Условие — любое выражение с результатом true или false.
else — необязателен, если ничего делать не нужно.`,
        text_en: `if/else syntax:
  if (condition) {
    // runs if true
  } else {
    // runs if false
  }

The condition is any expression that produces true or false.
else is optional when nothing needs to happen on false.`,
        code: `let temperature = 25;

if (temperature > 30) {
  console.log("Жарко!");
} else {
  console.log("Комфортно.");
}
// temperature = 25, поэтому: "Комфортно."`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'else-if',
        heading_ru: 'else if',
        heading_en: 'else if',
        text_ru: `else if добавляет дополнительные проверки. Проверки идут сверху вниз.
Как только одна оказалась true — остальные пропускаются.
Порядок важен!`,
        text_en: `else if adds more checks. Checks go top to bottom.
As soon as one is true — the rest are skipped.
Order matters!`,
        code: `let score = 75;

if (score >= 90) {
  console.log("Отлично! A");
} else if (score >= 80) {
  console.log("Хорошо! B");
} else if (score >= 70) {
  console.log("Неплохо! C");
} else {
  console.log("Нужно больше практики!");
}
// score = 75, поэтому: "Неплохо! C"`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'comparison',
        heading_ru: 'Операторы сравнения',
        heading_en: 'Comparison operators',
        text_ru: `=== строгое равенство — проверяет значение И тип. Используй всегда.
!== строгое неравенство.
> >= < <= — больше, больше/равно, меньше, меньше/равно.

Избегай == и != (нестрогое сравнение):
  0 == false → true (плохо!)
  0 === false → false (правильно)`,
        text_en: `=== strict equality — checks value AND type. Always use it.
!== strict inequality.
> >= < <= — greater, greater/equal, less, less/equal.

Avoid == and != (loose comparison):
  0 == false → true (bad!)
  0 === false → false (correct)`,
        code: `console.log(5 === 5);    // true
console.log(5 === "5");  // false (разные типы!)
console.log(5 !== 3);   // true
console.log(10 > 5);    // true
console.log(5 >= 5);    // true
console.log(3 < 8);     // true

// Почему === важен:
console.log(0 == false);   // true (опасно!)
console.log(0 === false);  // false (правильно)`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'logical',
        heading_ru: 'Логические операторы',
        heading_en: 'Logical operators',
        text_ru: `&& (И) — true только если ОБА условия true.
|| (ИЛИ) — true если ХОТЯ БЫ одно условие true.
! (НЕ) — инвертирует: !true = false, !false = true.

Можно комбинировать: age >= 13 && age <= 19`,
        text_en: `&& (AND) — true only if BOTH conditions are true.
|| (OR) — true if AT LEAST ONE condition is true.
! (NOT) — inverts: !true = false, !false = true.

Can be combined: age >= 13 && age <= 19`,
        code: `// && — И
let age = 15;
if (age >= 13 && age <= 19) {
  console.log("Подросток"); // ← выполнится
}

// || — ИЛИ
let day = "Суббота";
if (day === "Суббота" || day === "Воскресенье") {
  console.log("Выходной!"); // ← выполнится
}

// ! — НЕ
let isOpen = false;
if (!isOpen) {
  console.log("Магазин закрыт"); // ← выполнится
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'ternary',
        heading_ru: 'Тернарный оператор',
        heading_en: 'Ternary operator',
        text_ru: `Тернарный оператор — краткая форма if/else для одного значения:
  условие ? значение_если_true : значение_если_false

Удобен когда нужно присвоить одно из двух значений.
Не злоупотребляй — вложенные тернарники тяжело читать.`,
        text_en: `The ternary operator is a short form of if/else for one value:
  condition ? value_if_true : value_if_false

Useful when assigning one of two values.
Don't overuse it — nested ternaries are hard to read.`,
        code: `// Обычный if/else
let message;
if (age >= 18) {
  message = "Взрослый";
} else {
  message = "Ребёнок";
}

// То же через тернарный оператор
const message = age >= 18 ? "Взрослый" : "Ребёнок";

// В JSX (React) очень популярен:
// {isLoggedIn ? <Dashboard /> : <Login />}`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: условия',
    title_en: 'Try it yourself: conditions',
    instructions_ru: `Напиши функцию getWeatherAdvice(temp):
— temp > 30: "Жарко! Пей воду."
— temp >= 20: "Тепло, отличная погода."
— temp >= 10: "Прохладно, возьми куртку."
— иначе: "Холодно! Оставайся дома."
Проверь несколько значений через console.log.`,
    instructions_en: `Write function getWeatherAdvice(temp):
— temp > 30: "Hot! Drink water."
— temp >= 20: "Warm, great weather."
— temp >= 10: "Cool, take a jacket."
— otherwise: "Cold! Stay home."
Check several values with console.log.`,
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `function getWeatherAdvice(temp) {
  if (temp > 30) {
    return "Жарко! Пей воду.";
  } else if (temp >= 20) {
    return "Тепло, отличная погода.";
  } else if (temp >= 10) {
    return "Прохладно, возьми куртку.";
  } else {
    return "Холодно! Оставайся дома.";
  }
}

console.log(getWeatherAdvice(35)); // Жарко!
console.log(getWeatherAdvice(22)); // Тепло
console.log(getWeatherAdvice(8));  // Холодно!

// Бонус: тернарный оператор
const label = 35 > 30 ? "Жарко" : "Нормально";
console.log(label);`,
    },
    hints_ru: [
      'else if проверяется только если предыдущее условие было false. Порядок важен — начинай с самого строгого.',
      'Тернарный оператор: condition ? valueIfTrue : valueIfFalse — хорошо для коротких условий.',
    ],
    hints_en: [
      'else if is only checked if the previous condition was false. Order matters — start with the strictest check.',
      'Ternary: condition ? valueIfTrue : valueIfFalse — great for short conditions.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'if / else', term_en: 'if / else',
      definition_ru: 'Условный оператор. Выполняет один из двух блоков кода в зависимости от условия.',
      definition_en: 'Conditional statement. Runs one of two code blocks depending on the condition.',
      example_ru: 'if (x > 0) { ... } else { ... }',
      example_en: 'if (x > 0) { ... } else { ... }',
    },
    {
      term_ru: '=== (строгое равенство)', term_en: '=== (strict equality)',
      definition_ru: 'Сравнивает значение И тип. Всегда предпочтительнее ==.',
      definition_en: 'Compares value AND type. Always preferable to ==.',
      example_ru: '5 === 5 → true; 5 === "5" → false',
      example_en: '5 === 5 → true; 5 === "5" → false',
    },
    {
      term_ru: '&& (И)', term_en: '&& (AND)',
      definition_ru: 'Логический оператор И. true только если оба операнда истинны.',
      definition_en: 'Logical AND operator. true only if both operands are true.',
      example_ru: 'age >= 6 && age <= 12 // школьник',
      example_en: 'age >= 6 && age <= 12 // school age',
    },
    {
      term_ru: '|| (ИЛИ)', term_en: '|| (OR)',
      definition_ru: 'Логический оператор ИЛИ. true если хотя бы один операнд истинен.',
      definition_en: 'Logical OR operator. true if at least one operand is true.',
      example_ru: 'isAdmin || isOwner',
      example_en: 'isAdmin || isOwner',
    },
    {
      term_ru: 'Тернарный оператор', term_en: 'Ternary operator',
      definition_ru: 'Краткая форма if/else: условие ? true_значение : false_значение',
      definition_en: 'Short form of if/else: condition ? true_value : false_value',
      example_ru: 'const msg = age >= 18 ? "Взрослый" : "Ребёнок"',
      example_en: 'const msg = age >= 18 ? "Adult" : "Child"',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Оператор == делает "нестрогое" сравнение: 0 == false — это true! 1 == "1" — тоже true! Это приводит к непредсказуемым багам. Всегда используй ===.',
      text_en: 'The == operator does "loose" comparison: 0 == false is true! 1 == "1" is also true! This leads to unpredictable bugs. Always use ===.',
    },
    {
      text_ru: 'В JavaScript пустая строка "", 0, null, undefined, NaN и false — всё это "falsy" значения, которые ведут себя как false в условиях. Всё остальное — "truthy". Поэтому if ([]) — это true, даже для пустого массива!',
      text_en: 'In JavaScript the empty string "", 0, null, undefined, NaN, and false are all "falsy" values that behave like false in conditions. Everything else is "truthy". So if ([]) is true even for an empty array!',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что выведет: if (10 > 5) { console.log("Да"); } else { console.log("Нет"); }',
      text_en: 'What prints: if (10 > 5) { console.log("Yes"); } else { console.log("No"); }',
      options_ru: ['Нет', 'Да', 'Ничего', 'Ошибку'],
      options_en: ['No', 'Yes', 'Nothing', 'An error'],
      correctIndex: 1,
      explanation_ru: '10 > 5 это true, поэтому выполняется первый блок и выводится "Да".',
      explanation_en: '10 > 5 is true, so the first block runs and "Yes" is printed.',
    },
    {
      id: 'q2',
      text_ru: 'Что вернёт: true && false?',
      text_en: 'What does true && false return?',
      options_ru: ['true', 'false', 'null', 'undefined'],
      options_en: ['true', 'false', 'null', 'undefined'],
      correctIndex: 1,
      explanation_ru: '&& (И) возвращает true только если ОБА значения true. true && false = false.',
      explanation_en: '&& (AND) returns true only if BOTH values are true. true && false = false.',
    },
    {
      id: 'q3',
      text_ru: 'Что вернёт: false || true?',
      text_en: 'What does false || true return?',
      options_ru: ['false', 'true', '1', '0'],
      options_en: ['false', 'true', '1', '0'],
      correctIndex: 1,
      explanation_ru: '|| (ИЛИ) возвращает true если хотя бы одно значение true. false || true = true.',
      explanation_en: '|| (OR) returns true if at least one value is true. false || true = true.',
    },
    {
      id: 'q4',
      text_ru: 'Как записать тернарно: if (x > 0) { y = "+" } else { y = "-" }?',
      text_en: 'How to write with ternary: if (x > 0) { y = "+" } else { y = "-" }?',
      options_ru: ['y = x > 0 ? "+" : "-"', 'y = x > 0 || "+" || "-"', 'y = if(x > 0) "+" else "-"', 'y = (x > 0) && "+"'],
      options_en: ['y = x > 0 ? "+" : "-"', 'y = x > 0 || "+" || "-"', 'y = if(x > 0) "+" else "-"', 'y = (x > 0) && "+"'],
      correctIndex: 0,
      explanation_ru: 'Тернарный оператор: условие ? значение_если_true : значение_если_false. Здесь: y = x > 0 ? "+" : "-"',
      explanation_en: 'Ternary operator: condition ? value_if_true : value_if_false. Here: y = x > 0 ? "+" : "-"',
    },
    {
      id: 'q5',
      text_ru: 'Почему === предпочтительнее ==?',
      text_en: 'Why is === preferable to ==?',
      options_ru: ['Они одинаковы', '=== быстрее', '=== проверяет и тип, и значение — нет скрытых преобразований', '== строже'],
      options_en: ['They are identical', '=== is faster', '=== checks both type and value — no hidden conversions', '== is stricter'],
      correctIndex: 2,
      explanation_ru: '=== не делает преобразование типов. 5 === "5" → false. == преобразует: 5 == "5" → true (неожиданно и опасно).',
      explanation_en: '=== does no type conversion. 5 === "5" → false. == converts: 5 == "5" → true (unexpected and dangerous).',
    },
  ],
}
