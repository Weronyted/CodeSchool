import type { Lesson } from '@/types/lesson'

export const jsLoops: Lesson = {
  slug: 'js-loops',
  category: 'JS',
  readTime: 9,
  icon: '🔄',

  title_ru: 'Циклы в JavaScript',
  title_en: 'Loops in JavaScript',

  description_ru: 'for, while, break/continue, for..of — повторяй код автоматически.',
  description_en: 'for, while, break/continue, for..of — repeat code automatically.',

  sections: [
    { id: 'what-is-loop',  title_ru: 'Что такое цикл',     title_en: 'What is a loop' },
    { id: 'for',           title_ru: 'Цикл for',            title_en: 'for loop' },
    { id: 'while',         title_ru: 'Цикл while',          title_en: 'while loop' },
    { id: 'break-continue',title_ru: 'break и continue',    title_en: 'break and continue' },
    { id: 'loops-arrays',  title_ru: 'Перебор массивов',    title_en: 'Iterating arrays' },
    { id: 'key-terms',     title_ru: 'Ключевые термины',    title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Циклы: не повторяй код — повтори цикл',
      title_en: 'Loops: don\'t repeat code — repeat the loop',
      body_ru: 'Цикл выполняет один и тот же блок кода много раз. Вместо 100 строк console.log — один цикл. Циклы — один из самых мощных инструментов программиста.',
      body_en: 'A loop runs the same block of code many times. Instead of 100 console.log lines — one loop. Loops are one of the most powerful tools a programmer has.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Цикл как конвейер',
      title_en: 'A loop is like an assembly line',
      body_ru: 'На заводском конвейере каждая деталь проходит одни и те же шаги — снова и снова. Цикл делает то же: берёт следующий элемент, обрабатывает, переходит к следующему.',
      body_en: 'On a factory assembly line each part goes through the same steps — over and over. A loop does the same: take the next item, process it, move to the next.',
      visual: {
        kind: 'emoji',
        emojis: ['🏭', '🔄', '♻️'],
      },
      bullets: [
        { text_ru: '🏭 Конвейер = цикл — одни и те же шаги для каждого', text_en: '🏭 Assembly line = loop — same steps for each item' },
        { text_ru: '🔄 Итерация = один проход цикла', text_en: '🔄 Iteration = one pass through the loop' },
        { text_ru: '♻️ Условие выхода — иначе бесконечный цикл!', text_en: '♻️ Exit condition — otherwise infinite loop!' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Цикл for: когда знаешь количество повторений',
      title_en: 'for loop: when you know how many times',
      body_ru: 'for — самый популярный цикл. Состоит из трёх частей в скобках: начало, условие, шаг. Идеален когда известно точное количество итераций.',
      body_en: 'for is the most popular loop. It has three parts in parentheses: start, condition, step. Ideal when the exact number of iterations is known.',
      bullets: [
        { text_ru: '1️⃣ Начало: let i = 0 — выполняется один раз', text_en: '1️⃣ Start: let i = 0 — runs once' },
        { text_ru: '2️⃣ Условие: i < 5 — проверяется перед каждой итерацией', text_en: '2️⃣ Condition: i < 5 — checked before each iteration' },
        { text_ru: '3️⃣ Шаг: i++ — выполняется после каждой итерации', text_en: '3️⃣ Step: i++ — runs after each iteration' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Строим цикл шаг за шагом',
      title_en: 'Building a loop step by step',
      body_ru: 'Посмотри, как цикл считает от 1 до 5 и накапливает сумму.',
      body_en: 'Watch how the loop counts from 1 to 5 and accumulates a sum.',
      animMode: 'console',
      animSteps: [
        {
          code: 'for (let i = 1; i <= 5; i++) {\n  console.log(i);\n}',
          comment_ru: '1. Простой счётчик — выводит 1, 2, 3, 4, 5',
          comment_en: '1. Simple counter — prints 1, 2, 3, 4, 5',
          output: '1\n2\n3\n4\n5',
        },
        {
          code: 'let sum = 0;\nfor (let i = 1; i <= 5; i++) {\n  sum += i;\n}\nconsole.log("Сумма:", sum);',
          comment_ru: '2. Накапливаем сумму 1+2+3+4+5 = 15',
          comment_en: '2. Accumulate sum 1+2+3+4+5 = 15',
          output: 'Сумма: 15',
        },
        {
          code: 'const fruits = ["яблоко", "банан", "манго"];\nfor (let i = 0; i < fruits.length; i++) {\n  console.log(fruits[i]);\n}',
          comment_ru: '3. Перебираем массив через for с индексом',
          comment_en: '3. Iterate array with indexed for loop',
          output: 'яблоко\nбанан\nманго',
        },
        {
          code: 'const fruits = ["яблоко", "банан", "манго"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}',
          comment_ru: '4. for..of — удобнее для массивов (без индекса)',
          comment_en: '4. for..of — more convenient for arrays (no index)',
          output: 'яблоко\nбанан\nманго',
        },
      ],
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Цикл while и управление циклом',
      title_en: 'while loop and loop control',
      body_ru: 'while выполняется пока условие true. Используй когда не знаешь заранее количество итераций. break прерывает цикл, continue пропускает итерацию.',
      body_en: 'while runs as long as the condition is true. Use it when you don\'t know the number of iterations in advance. break exits the loop, continue skips an iteration.',
      bullets: [
        { text_ru: '🔁 while (condition) { ... } — повторяй пока true', text_en: '🔁 while (condition) { ... } — repeat while true' },
        { text_ru: '⛔ break — выйти из цикла немедленно', text_en: '⛔ break — exit the loop immediately' },
        { text_ru: '⏭️ continue — пропустить текущую итерацию', text_en: '⏭️ continue — skip the current iteration' },
        { text_ru: '⚠️ Без изменения условия — бесконечный цикл!', text_en: '⚠️ Without changing the condition — infinite loop!' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'while, break и continue в коде',
      title_en: 'while, break and continue in code',
      body_ru: 'Три способа управлять потоком выполнения внутри цикла.',
      body_en: 'Three ways to control execution flow inside a loop.',
      code: `// while — повторяем пока count < 5
let count = 0;
while (count < 5) {
  console.log("Шаг: " + count);
  count++; // Важно! Иначе бесконечный цикл
}

// break — останавливаем цикл при i === 3
for (let i = 0; i < 10; i++) {
  if (i === 3) break;
  console.log(i); // 0, 1, 2
}

// continue — пропускаем чётные числа
for (let i = 0; i < 6; i++) {
  if (i % 2 === 0) continue;
  console.log(i); // 1, 3, 5
}`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'compare',
      title_ru: 'for vs for..of vs forEach',
      title_en: 'for vs for..of vs forEach',
      body_ru: 'Три способа перебрать массив — выбери по ситуации.',
      body_en: 'Three ways to iterate an array — choose based on the situation.',
      compareLeft: {
        label_ru: 'for (индекс)',
        label_en: 'for (indexed)',
        items_ru: [
          'for (let i = 0; i < arr.length; i++)',
          'Есть доступ к индексу i',
          'Можно использовать break/continue',
          'Подходит для изменения массива',
        ],
        items_en: [
          'for (let i = 0; i < arr.length; i++)',
          'Access to index i',
          'Can use break/continue',
          'Good for modifying the array',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'for..of / forEach',
        label_en: 'for..of / forEach',
        items_ru: [
          'for (const item of arr)',
          'arr.forEach(item => ...)',
          'Чище, читабельнее',
          'for..of поддерживает break',
        ],
        items_en: [
          'for (const item of arr)',
          'arr.forEach(item => ...)',
          'Cleaner, more readable',
          'for..of supports break',
        ],
        color: 'green',
      },
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Бесконечный цикл while(true) может "подвесить" браузер! Всегда убедись, что условие в какой-то момент станет ложным. Кстати, for..of появился в ES6 (2015). До этого все перебирали массивы только через for с индексом.',
      body_en: 'An infinite while(true) loop can freeze the browser! Always make sure the condition will eventually become false. By the way, for..of was introduced in ES6 (2015). Before that everyone iterated arrays with indexed for loops.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Пиши циклы!',
      title_en: 'Write some loops!',
      body_ru: 'Напиши цикл, который выводит таблицу умножения на 5 (5×1=5 ... 5×10=50). Потом перебери массив с именами и выведи каждое.',
      body_en: 'Write a loop that prints the multiplication table for 5 (5×1=5 ... 5×10=50). Then iterate an array of names and print each one.',
    },
  ],

  content: {
    intro_ru: `Цикл — это способ выполнить один и тот же код много раз. Представь, что тебе нужно
вывести числа от 1 до 100. Писать 100 строк console.log вручную — ужасно. Цикл сделает
это за тебя одной строкой. Циклы — один из самых важных инструментов программиста.`,
    intro_en: `A loop is a way to run the same code many times. Imagine you need to print numbers
from 1 to 100. Writing 100 console.log lines by hand is terrible. A loop does this in a
single line. Loops are one of the most important tools in a programmer's toolkit.`,

    blocks: [
      {
        sectionId: 'what-is-loop',
        heading_ru: 'Что такое цикл',
        heading_en: 'What is a loop',
        text_ru: `Цикл — инструкция, которая повторяет блок кода определённое количество раз
или пока выполняется условие.

Три вида циклов в JS:
• for — когда знаешь количество повторений
• while — когда повторяешь пока условие true
• for...of — для перебора элементов массива`,
        text_en: `A loop is an instruction that repeats a block of code a certain number of times
or while a condition holds.

Three types of loops in JS:
• for — when you know the number of repetitions
• while — when you repeat while a condition is true
• for...of — for iterating array elements`,
      },
      {
        sectionId: 'for',
        heading_ru: 'Цикл for',
        heading_en: 'for loop',
        text_ru: `Синтаксис for:
  for (начало; условие; шаг) { тело }

Начало — выполняется один раз перед циклом.
Условие — проверяется перед каждой итерацией.
Шаг — выполняется после каждой итерации.
Тело — код, выполняемый на каждой итерации.`,
        text_en: `for syntax:
  for (start; condition; step) { body }

Start — runs once before the loop.
Condition — checked before each iteration.
Step — runs after each iteration.
Body — code executed on each iteration.`,
        code: `// for (начало; условие; шаг)
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Считаем сумму 1 + 2 + ... + 10
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log(sum); // 55

// Таблица умножения на 5
for (let i = 1; i <= 10; i++) {
  console.log(\`5 × \${i} = \${5 * i}\`);
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'while',
        heading_ru: 'Цикл while',
        heading_en: 'while loop',
        text_ru: `while выполняется пока условие true.
Используй когда количество итераций неизвестно заранее.
Обязательно изменяй переменную внутри цикла — иначе бесконечный цикл!

do...while выполняется хотя бы один раз, потом проверяет условие.`,
        text_en: `while runs as long as the condition is true.
Use it when the number of iterations is not known in advance.
Always change the variable inside the loop — otherwise infinite loop!

do...while runs at least once, then checks the condition.`,
        code: `let count = 0;
while (count < 5) {
  console.log("Шаг: " + count);
  count++; // Важно!
}

// do...while — выполнится хотя бы раз
let x = 10;
do {
  console.log(x);
  x++;
} while (x < 5); // Выведет 10 (один раз)`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'break-continue',
        heading_ru: 'break и continue',
        heading_en: 'break and continue',
        text_ru: `break — немедленно прекращает выполнение цикла.
continue — пропускает оставшийся код в текущей итерации и переходит к следующей.

Оба работают в for, while, for...of.`,
        text_en: `break — immediately stops the loop.
continue — skips the rest of the current iteration and goes to the next.

Both work in for, while, for...of.`,
        code: `// break — выйти из цикла
for (let i = 0; i < 10; i++) {
  if (i === 5) break;
  console.log(i); // 0, 1, 2, 3, 4
}

// continue — пропустить итерацию
for (let i = 0; i < 5; i++) {
  if (i === 2) continue; // Пропускаем 2
  console.log(i); // 0, 1, 3, 4
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'loops-arrays',
        heading_ru: 'Перебор массивов',
        heading_en: 'Iterating arrays',
        text_ru: `Три способа перебрать массив:
1. for с индексом — универсальный, нужен когда важен индекс
2. for...of — чистый и простой, не нужен индекс
3. forEach — метод массива, принимает функцию

Для большинства задач предпочитай for...of или forEach.`,
        text_en: `Three ways to iterate an array:
1. Indexed for — universal, needed when the index matters
2. for...of — clean and simple, no index needed
3. forEach — array method, takes a function

For most tasks prefer for...of or forEach.`,
        code: `const fruits = ["яблоко", "банан", "манго"];

// 1. Через for с индексом
for (let i = 0; i < fruits.length; i++) {
  console.log(i, fruits[i]); // 0 яблоко, 1 банан...
}

// 2. Через for...of (нет индекса)
for (const fruit of fruits) {
  console.log(fruit);
}

// 3. Через forEach
fruits.forEach((fruit, index) => {
  console.log(index, fruit);
});`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: циклы',
    title_en: 'Try it yourself: loops',
    instructions_ru: `Задания:
1. Выведи числа от 1 до 10, пропуская кратные 3 (используй continue)
2. Найди первое число от 1 до 100, которое делится на 7 и на 11 (используй break)
3. Перебери массив имён и выведи каждое с порядковым номером`,
    instructions_en: `Tasks:
1. Print numbers from 1 to 10, skipping multiples of 3 (use continue)
2. Find the first number from 1 to 100 divisible by both 7 and 11 (use break)
3. Iterate an array of names and print each with its position number`,
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// 1. Числа без кратных 3
for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) continue;
  console.log(i); // 1, 2, 4, 5, 7, 8, 10
}

// 2. Первое число делящееся на 7 и на 11
for (let i = 1; i <= 100; i++) {
  if (i % 7 === 0 && i % 11 === 0) {
    console.log("Найдено:", i); // 77
    break;
  }
}

// 3. Массив имён с порядковым номером
const names = ["Аня", "Боб", "Вера", "Гриша"];
names.forEach((name, index) => {
  console.log(\`\${index + 1}. \${name}\`);
});`,
    },
    hints_ru: [
      'i % 3 === 0 проверяет, делится ли i на 3 без остатка. continue пропустит эту итерацию.',
      'for...of удобнее когда не нужен индекс. forEach(item, index) даёт и элемент и его позицию.',
    ],
    hints_en: [
      'i % 3 === 0 checks if i is divisible by 3 with no remainder. continue will skip that iteration.',
      'for...of is more convenient when you don\'t need the index. forEach(item, index) gives both the item and its position.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Цикл', term_en: 'Loop',
      definition_ru: 'Инструкция, повторяющая блок кода несколько раз.',
      definition_en: 'An instruction that repeats a block of code multiple times.',
      example_ru: 'for (let i = 0; i < 5; i++) { console.log(i); }',
      example_en: 'for (let i = 0; i < 5; i++) { console.log(i); }',
    },
    {
      term_ru: 'for', term_en: 'for',
      definition_ru: 'Цикл с известным числом итераций: for (начало; условие; шаг).',
      definition_en: 'Loop with a known number of iterations: for (start; condition; step).',
      example_ru: 'for (let i = 0; i < 10; i++) { sum += i; }',
      example_en: 'for (let i = 0; i < 10; i++) { sum += i; }',
    },
    {
      term_ru: 'while', term_en: 'while',
      definition_ru: 'Цикл, выполняющийся пока условие истинно.',
      definition_en: 'A loop that runs while the condition is true.',
      example_ru: 'while (count < 5) { count++; }',
      example_en: 'while (count < 5) { count++; }',
    },
    {
      term_ru: 'break', term_en: 'break',
      definition_ru: 'Немедленно завершает выполнение цикла.',
      definition_en: 'Immediately stops the loop.',
      example_ru: 'if (i === 5) break;',
      example_en: 'if (i === 5) break;',
    },
    {
      term_ru: 'for...of', term_en: 'for...of',
      definition_ru: 'Удобный способ перебора элементов массива без индекса.',
      definition_en: 'A convenient way to iterate array elements without an index.',
      example_ru: 'for (const fruit of fruits) { console.log(fruit); }',
      example_en: 'for (const fruit of fruits) { console.log(fruit); }',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Бесконечный цикл while(true) не всегда плох! Игровые движки, серверы и анимации часто используют "главный цикл" while(true). Главное — иметь break или способ выйти из него.',
      text_en: 'An infinite while(true) loop is not always bad! Game engines, servers, and animations often use a "main loop" with while(true). The key is to have a break or a way to exit it.',
    },
    {
      text_ru: 'for...of появился в ES6 (2015). До этого перебирали массивы только через for с индексом. Сейчас есть ещё for...in — но он для перебора ключей объектов, а не элементов массива.',
      text_en: 'for...of was introduced in ES6 (2015). Before that arrays were iterated with indexed for loops only. There is also for...in — but that iterates object keys, not array elements.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Сколько раз выполнится: for (let i = 0; i < 5; i++)?',
      text_en: 'How many times does for (let i = 0; i < 5; i++) run?',
      options_ru: ['4 раза', '5 раз', '6 раз', 'Бесконечно'],
      options_en: ['4 times', '5 times', '6 times', 'Infinitely'],
      correctIndex: 1,
      explanation_ru: 'i начинается с 0 и идёт до 4 (i < 5). Значения: 0, 1, 2, 3, 4 — всего 5 итераций.',
      explanation_en: 'i starts at 0 and goes to 4 (i < 5). Values: 0, 1, 2, 3, 4 — 5 iterations total.',
    },
    {
      id: 'q2',
      text_ru: 'Что делает break внутри цикла?',
      text_en: 'What does break do inside a loop?',
      options_ru: ['Пропускает текущую итерацию', 'Выходит из цикла полностью', 'Перезапускает цикл', 'Ничего не делает'],
      options_en: ['Skips the current iteration', 'Exits the loop completely', 'Restarts the loop', 'Does nothing'],
      correctIndex: 1,
      explanation_ru: 'break немедленно прекращает выполнение цикла. Код после цикла продолжает работать.',
      explanation_en: 'break immediately stops the loop. Code after the loop continues running.',
    },
    {
      id: 'q3',
      text_ru: 'Что делает continue внутри цикла?',
      text_en: 'What does continue do inside a loop?',
      options_ru: ['Завершает цикл', 'Продолжает выполнение после цикла', 'Пропускает остаток текущей итерации', 'Увеличивает счётчик'],
      options_en: ['Ends the loop', 'Continues after the loop', 'Skips the rest of the current iteration', 'Increments the counter'],
      correctIndex: 2,
      explanation_ru: 'continue пропускает оставшийся код текущей итерации и переходит к следующей.',
      explanation_en: 'continue skips the remaining code of the current iteration and goes to the next one.',
    },
    {
      id: 'q4',
      text_ru: 'Какой цикл лучше для перебора элементов массива без индекса?',
      text_en: 'Which loop is best for iterating array elements without needing an index?',
      options_ru: ['while', 'do...while', 'for...of', 'for...in'],
      options_en: ['while', 'do...while', 'for...of', 'for...in'],
      correctIndex: 2,
      explanation_ru: 'for...of — самый чистый способ перебора массива без индекса. for...in — для объектов.',
      explanation_en: 'for...of is the cleanest way to iterate an array without needing the index. for...in is for objects.',
    },
    {
      id: 'q5',
      text_ru: 'Чем опасен while(true) без break?',
      text_en: 'Why is while(true) without break dangerous?',
      options_ru: ['Ничем', 'Бесконечным циклом, который подвесит программу', 'Неправильным результатом', 'Медленной работой'],
      options_en: ['Nothing', 'Infinite loop that freezes the program', 'Wrong result', 'Slow performance'],
      correctIndex: 1,
      explanation_ru: 'Без break или условия выхода цикл никогда не завершится — браузер "зависнет".',
      explanation_en: 'Without break or an exit condition the loop never ends — the browser will freeze.',
    },
  ],
}
