import type { Lesson } from '../types/lesson'

const lesson: Lesson = {
  slug: 'js-logic',
  category: 'JS',
  readTime: 14,
  icon: '🔀',
  title_ru: 'Условия и циклы',
  title_en: 'Conditions and Loops',
  description_ru: 'if/else, операторы сравнения и циклы — учим JavaScript принимать решения и повторять действия.',
  description_en: 'if/else, comparison operators, and loops — teach JavaScript to make decisions and repeat actions.',

  sections: [
    { id: 'conditions', title_ru: 'Условия if/else', title_en: 'if/else Conditions' },
    { id: 'comparison', title_ru: 'Операторы сравнения', title_en: 'Comparison Operators' },
    { id: 'logical', title_ru: 'Логические операторы', title_en: 'Logical Operators' },
    { id: 'loops', title_ru: 'Циклы', title_en: 'Loops' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Логика — сердце программирования',
      title_en: 'Logic — the Heart of Programming',
      body_ru: 'Программы принимают решения: «если пользователь вошёл — показать профиль, иначе — показать форму входа». Это условия. А циклы повторяют действие много раз без копирования кода.',
      body_en: 'Programs make decisions: "if the user is logged in — show profile, else — show login form". These are conditions. Loops repeat an action many times without copying code.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Аналогия: Развилка на дороге',
      title_en: 'Analogy: Fork in the Road',
      body_ru: 'Условие `if/else` — как развилка на дороге. Ты проверяешь знак (условие). Если знак верный — едешь налево (if-блок). Иначе — направо (else-блок).',
      body_en: 'An `if/else` statement is like a fork in the road. You check a sign (condition). If it\'s the right sign — go left (if block). Otherwise — go right (else block).',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'if / else if / else',
      title_en: 'if / else if / else',
      body_ru: '`if` проверяет условие. `else if` добавляет ещё одну проверку. `else` — ветка «во всех остальных случаях». Исполняется первая подходящая ветка, остальные пропускаются.',
      body_en: '`if` checks a condition. `else if` adds another check. `else` is the "in all other cases" branch. The first matching branch executes; the rest are skipped.',
      code: `let score = 75;

if (score >= 90) {
  console.log("A — Excellent!");
} else if (score >= 70) {
  console.log("B — Good job");
} else if (score >= 50) {
  console.log("C — Keep trying");
} else {
  console.log("F — Study more");
}
// Output: "B — Good job"`,
      codeLang: 'javascript',
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Операторы сравнения',
      title_en: 'Comparison Operators',
      body_ru: 'Операторы сравнения возвращают `true` или `false`. Главное: используй `===` (строгое равенство), а не `==`. Строгое сравнение проверяет и значение, и тип данных.',
      body_en: 'Comparison operators return `true` or `false`. Key rule: use `===` (strict equality), not `==`. Strict comparison checks both value and data type.',
      code: `console.log(5 === 5);    // true
console.log(5 === "5");  // false — different types
console.log(5 !== 3);    // true  — not equal
console.log(10 > 7);     // true
console.log(3 <= 3);     // true
console.log(2 >= 5);     // false`,
      codeLang: 'javascript',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Логические операторы',
      title_en: 'Logical Operators',
      body_ru: '`&&` (И) — оба условия должны быть истинными. `||` (ИЛИ) — хотя бы одно. `!` (НЕ) — инвертирует значение.',
      body_en: '`&&` (AND) — both conditions must be true. `||` (OR) — at least one. `!` (NOT) — inverts the value.',
      code: `let age = 16;
let hasTicket = true;

// AND — both must be true
if (age >= 16 && hasTicket) {
  console.log("You can enter!");
}

// OR — at least one true
let isWeekend = false;
let isHoliday = true;
if (isWeekend || isHoliday) {
  console.log("Day off!");
}

// NOT — flip true/false
console.log(!hasTicket); // false`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Цикл for',
      title_en: 'The for Loop',
      body_ru: 'Цикл `for` повторяет блок кода заданное число раз. Он состоит из трёх частей: начального значения счётчика, условия продолжения и шага изменения.',
      body_en: 'The `for` loop repeats a block of code a set number of times. It has three parts: initial counter value, continuation condition, and step.',
      code: `// for (start; condition; step)
for (let i = 1; i <= 5; i++) {
  console.log("Step " + i);
}
// Step 1
// Step 2
// Step 3
// Step 4
// Step 5

// Count down
for (let i = 5; i >= 1; i--) {
  console.log(i);
}`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Цикл while',
      title_en: 'The while Loop',
      body_ru: '`while` повторяет блок, пока условие истинно. Используй его, когда не знаешь заранее, сколько раз нужно выполнить код.',
      body_en: '`while` repeats a block as long as the condition is true. Use it when you don\'t know in advance how many iterations you need.',
      code: `let energy = 5;

while (energy > 0) {
  console.log("Working... energy left: " + energy);
  energy--; // same as energy = energy - 1
}
console.log("Out of energy!");

// Be careful: if the condition never becomes false,
// you'll get an infinite loop!`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'for vs while — когда что использовать',
      title_en: 'for vs while — when to use which',
      body_ru: 'Используй **`for`**, когда знаешь количество итераций заранее (например, пройти по 10 элементам). Используй **`while`**, когда цикл должен продолжаться до выполнения какого-то условия (например, «пока не получим правильный ответ»).',
      body_en: 'Use **`for`** when you know the iteration count in advance (e.g., go through 10 items). Use **`while`** when the loop should continue until some condition is met (e.g., "until we get the correct answer").',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Пора практиковаться!',
      title_en: 'Time to Practice!',
      body_ru: 'Напиши программу с условиями и циклом — проверь, как JavaScript принимает решения.',
      body_en: 'Write a program with conditions and a loop — see how JavaScript makes decisions.',
    },
  ],

  content: {
    intro_ru: 'Условия позволяют программе выбирать разные пути. Циклы позволяют выполнять код повторно. Вместе они дают JavaScript его настоящую силу.',
    intro_en: 'Conditions let a program choose different paths. Loops let code execute repeatedly. Together they give JavaScript its real power.',
    blocks: [
      {
        sectionId: 'conditions',
        heading_ru: 'Условия: if, else if, else',
        heading_en: 'Conditions: if, else if, else',
        text_ru: 'Инструкция `if` выполняет блок кода, только если условие истинно (truthy). Условие пишется в круглых скобках, блок кода — в фигурных.\n\n`else if` добавляет дополнительную проверку, которая выполняется, только если предыдущее условие было ложным. `else` без условия — это «запасной» вариант, который выполняется, если ни одна из предыдущих проверок не прошла.\n\nВажно: как только одна из ветвей выполняется — остальные пропускаются, даже если их условия тоже истинны.',
        text_en: 'The `if` statement executes a block of code only when the condition is truthy. The condition goes in parentheses, the code block in curly braces.\n\n`else if` adds an additional check that only runs if the previous condition was false. `else` without a condition is the fallback that runs if none of the previous checks passed.\n\nKey point: once one branch executes, the rest are skipped — even if their conditions would also be true.',
        code: `let temperature = 22;

if (temperature > 30) {
  console.log("It's hot — wear light clothes");
} else if (temperature > 20) {
  console.log("It's warm — perfect weather");
} else if (temperature > 10) {
  console.log("It's cool — take a jacket");
} else {
  console.log("It's cold — dress warmly");
}
// Output: "It's warm — perfect weather"`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'comparison',
        heading_ru: 'Операторы сравнения',
        heading_en: 'Comparison Operators',
        text_ru: 'Операторы сравнения возвращают `true` или `false` и используются в условиях.\n\n| Оператор | Значение | Пример |\n|----------|----------|---------|\n| `===` | строго равно | `5 === 5` → true |\n| `!==` | не равно | `5 !== 3` → true |\n| `>` | больше | `7 > 3` → true |\n| `<` | меньше | `2 < 5` → true |\n| `>=` | больше или равно | `5 >= 5` → true |\n| `<=` | меньше или равно | `3 <= 4` → true |\n\nЗапомни: **всегда используй `===`** для проверки равенства. Оператор `==` выполняет неявное преобразование типов, что может давать неожиданные результаты.',
        text_en: 'Comparison operators return `true` or `false` and are used in conditions.\n\n| Operator | Meaning | Example |\n|----------|---------|--------|\n| `===` | strictly equal | `5 === 5` → true |\n| `!==` | not equal | `5 !== 3` → true |\n| `>` | greater than | `7 > 3` → true |\n| `<` | less than | `2 < 5` → true |\n| `>=` | greater or equal | `5 >= 5` → true |\n| `<=` | less or equal | `3 <= 4` → true |\n\nRemember: **always use `===`** to check equality. The `==` operator does implicit type conversion, which can produce unexpected results.',
        code: `// === checks both value AND type
console.log(5 === 5);    // true
console.log(5 === "5");  // false (number vs string)

// == only checks value (avoid this)
console.log(5 == "5");   // true (dangerous!)

// Practical example
let userInput = "18";
let minAge = 18;

// Wrong way
if (userInput == minAge) {
  console.log("Allowed (but this could be a bug)");
}

// Right way — convert first
if (Number(userInput) === minAge) {
  console.log("Allowed — correct check");
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'logical',
        heading_ru: 'Логические операторы',
        heading_en: 'Logical Operators',
        text_ru: 'Логические операторы позволяют комбинировать несколько условий.\n\n**`&&` (И / AND)** — результат `true`, только если **оба** условия истинны. Если первое условие ложно, второе даже не проверяется (short-circuit evaluation).\n\n**`||` (ИЛИ / OR)** — результат `true`, если **хотя бы одно** условие истинно. Если первое условие истинно, второе не проверяется.\n\n**`!` (НЕ / NOT)** — инвертирует boolean: `!true` → `false`, `!false` → `true`.',
        text_en: 'Logical operators let you combine multiple conditions.\n\n**`&&` (AND)** — result is `true` only if **both** conditions are true. If the first condition is false, the second is never evaluated (short-circuit evaluation).\n\n**`||` (OR)** — result is `true` if **at least one** condition is true. If the first condition is true, the second is not evaluated.\n\n**`!` (NOT)** — inverts a boolean: `!true` → `false`, `!false` → `true`.',
        code: `// Game access check
let level = 5;
let hasPremium = true;

// Both must be true
if (level >= 5 && hasPremium) {
  console.log("Boss fight unlocked!");
}

// Either is enough
let hasKey = false;
let hasPassword = true;
if (hasKey || hasPassword) {
  console.log("Door opens!");
}

// NOT — checking the opposite
let isLoggedOut = !true; // false
console.log(isLoggedOut); // false

// Combining all three
let age = 17;
let withParent = true;
if (age >= 18 || (age >= 16 && withParent)) {
  console.log("Can watch the film");
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'loops',
        heading_ru: 'Циклы: for и while',
        heading_en: 'Loops: for and while',
        text_ru: 'Циклы позволяют выполнять блок кода многократно без дублирования.\n\n**Цикл `for`** состоит из трёх частей в скобках:\n1. `let i = 0` — инициализация счётчика\n2. `i < 10` — условие продолжения\n3. `i++` — изменение счётчика после каждой итерации\n\n**Цикл `while`** проще устроен: только условие. Тело цикла выполняется, пока условие истинно. Ты сам управляешь изменением переменной внутри тела.\n\n`break` немедленно прерывает цикл. `continue` пропускает текущую итерацию и переходит к следующей.',
        text_en: 'Loops let you execute a block of code multiple times without duplication.\n\n**The `for` loop** has three parts in parentheses:\n1. `let i = 0` — counter initialization\n2. `i < 10` — continuation condition\n3. `i++` — counter change after each iteration\n\n**The `while` loop** is simpler: just a condition. The body runs while the condition is true. You manage the variable change inside the body yourself.\n\n`break` immediately stops the loop. `continue` skips the current iteration and moves to the next.',
        code: `// for loop — sum 1 to 10
let total = 0;
for (let i = 1; i <= 10; i++) {
  total += i; // total = total + i
}
console.log(total); // 55

// while loop — find first power of 2 above 100
let n = 1;
while (n <= 100) {
  n *= 2; // n = n * 2
}
console.log(n); // 128

// break — stop when found
for (let i = 1; i <= 100; i++) {
  if (i * i > 50) {
    console.log("First i where i² > 50: " + i); // 8
    break;
  }
}

// continue — skip even numbers
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) continue; // skip even
  console.log(i); // 1 3 5 7 9
}`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Угадай число',
    title_en: 'Number Guessing Game',
    instructions_ru: 'Напиши программу, которая проверяет несколько вариантов числа против «загаданного». Используй цикл for, чтобы перебрать массив догадок, и условие if/else для каждой: «угадал», «слишком мало» или «слишком много». Остановись циклом break, когда найдёшь правильный ответ.',
    instructions_en: 'Write a program that checks several number guesses against a "secret" number. Use a for loop to go through an array of guesses, and an if/else for each: "correct", "too low", or "too high". Stop the loop with break when you find the right answer.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `const secret = 42;
const guesses = [10, 70, 35, 42, 55];

for (let i = 0; i < guesses.length; i++) {
  let guess = guesses[i];

  // Check: is guess === secret, < secret, or > secret?
  // Log the result
  // If correct, break the loop
}
`,
    },
    hints_ru: [
      'Сначала проверь равенство: if (guess === secret)',
      'Внутри блока правильного ответа выведи сообщение и напиши break',
      'Добавь else if (guess < secret) — вывести "Слишком мало"',
      'Добавь else — вывести "Слишком много"',
    ],
    hints_en: [
      'First check equality: if (guess === secret)',
      'Inside the correct block, log a message and write break',
      'Add else if (guess < secret) — log "Too low"',
      'Add else — log "Too high"',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Условие (if)',
      term_en: 'Condition (if)',
      definition_ru: 'Инструкция, которая выполняет блок кода только при истинном условии.',
      definition_en: 'A statement that executes a code block only when the condition is true.',
      example_ru: 'if (age >= 18) { console.log("Adult"); }',
      example_en: 'if (age >= 18) { console.log("Adult"); }',
    },
    {
      term_ru: 'Строгое равенство (===)',
      term_en: 'Strict Equality (===)',
      definition_ru: 'Оператор сравнения, проверяющий одновременно значение и тип данных.',
      definition_en: 'Comparison operator that checks both value and data type simultaneously.',
      example_ru: '5 === "5" → false (разные типы)',
      example_en: '5 === "5" → false (different types)',
    },
    {
      term_ru: 'Цикл',
      term_en: 'Loop',
      definition_ru: 'Конструкция, повторяющая блок кода, пока выполняется условие.',
      definition_en: 'A construct that repeats a code block while a condition is met.',
      example_ru: 'for (let i = 0; i < 5; i++) { console.log(i); }',
      example_en: 'for (let i = 0; i < 5; i++) { console.log(i); }',
    },
    {
      term_ru: 'Логические операторы',
      term_en: 'Logical Operators',
      definition_ru: '`&&` (И), `||` (ИЛИ), `!` (НЕ) — объединяют или инвертируют boolean-выражения.',
      definition_en: '`&&` (AND), `||` (OR), `!` (NOT) — combine or invert boolean expressions.',
      example_ru: 'age > 12 && hasTicket — оба условия должны быть true',
      example_en: 'age > 12 && hasTicket — both conditions must be true',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Первый компьютерный «баг» был настоящим жуком! В 1947 году инженеры нашли мотылька в реле компьютера Harvard Mark II. С тех пор ошибки в программах называют «bugs».',
      text_en: 'The first computer "bug" was a real insect! In 1947, engineers found a moth stuck in a relay of the Harvard Mark II computer. Since then, program errors have been called "bugs".',
    },
    {
      text_ru: 'Оператор `&&` в JavaScript «ленивый»: если левая часть ложна, правая часть вообще не вычисляется. Это называется «ленивые вычисления» (short-circuit evaluation) и помогает избежать ошибок.',
      text_en: 'The `&&` operator in JavaScript is "lazy": if the left side is false, the right side is never evaluated. This is called short-circuit evaluation and helps avoid errors.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что выведет код: let x = 15; if (x > 10) { console.log("A"); } else { console.log("B"); }',
      text_en: 'What does this code print: let x = 15; if (x > 10) { console.log("A"); } else { console.log("B"); }',
      options_ru: ['"B"', '"A"', 'Ничего / Nothing', '"A" и "B"'],
      options_en: ['"B"', '"A"', 'Nothing', '"A" and "B"'],
      correctIndex: 1,
      explanation_ru: 'x = 15 и 15 > 10 истинно, поэтому выполняется блок if и выводится "A". Блок else пропускается.',
      explanation_en: 'x = 15 and 15 > 10 is true, so the if block runs and "A" is printed. The else block is skipped.',
    },
    {
      id: 'q2',
      text_ru: 'Какой результат у выражения: true && false?',
      text_en: 'What is the result of: true && false?',
      options_ru: ['true', 'false', 'undefined', 'Ошибка / Error'],
      options_en: ['true', 'false', 'undefined', 'Error'],
      correctIndex: 1,
      explanation_ru: '`&&` возвращает `true` только если **оба** операнда истинны. false в правой части делает весь результат false.',
      explanation_en: '`&&` returns `true` only if **both** operands are true. The false on the right makes the whole result false.',
    },
    {
      id: 'q3',
      text_ru: 'Сколько раз выполнится тело цикла: for (let i = 0; i < 5; i++)?',
      text_en: 'How many times will the loop body execute: for (let i = 0; i < 5; i++)?',
      options_ru: ['4', '5', '6', '0'],
      options_en: ['4', '5', '6', '0'],
      correctIndex: 1,
      explanation_ru: 'i начинается с 0 и увеличивается до тех пор, пока i < 5. Значения: 0, 1, 2, 3, 4 — это 5 итераций.',
      explanation_en: 'i starts at 0 and increments while i < 5. Values: 0, 1, 2, 3, 4 — that\'s 5 iterations.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает оператор break внутри цикла?',
      text_en: 'What does the break operator do inside a loop?',
      options_ru: [
        'Пропускает текущую итерацию',
        'Немедленно завершает цикл',
        'Перезапускает цикл с начала',
        'Выбрасывает ошибку',
      ],
      options_en: [
        'Skips the current iteration',
        'Immediately exits the loop',
        'Restarts the loop from the beginning',
        'Throws an error',
      ],
      correctIndex: 1,
      explanation_ru: '`break` немедленно прекращает выполнение цикла и переходит к коду после него. Для пропуска итерации используют `continue`.',
      explanation_en: '`break` immediately stops the loop and jumps to the code after it. To skip an iteration use `continue`.',
    },
    {
      id: 'q5',
      text_ru: 'Что выведет: console.log(false || true)?',
      text_en: 'What does console.log(false || true) print?',
      options_ru: ['false', 'true', '"false || true"', 'Ошибка / Error'],
      options_en: ['false', 'true', '"false || true"', 'Error'],
      correctIndex: 1,
      explanation_ru: '`||` возвращает `true`, если хотя бы один операнд истинен. Правый операнд `true`, поэтому результат `true`.',
      explanation_en: '`||` returns `true` if at least one operand is true. The right operand is `true`, so the result is `true`.',
    },
  ],
}

export default lesson
