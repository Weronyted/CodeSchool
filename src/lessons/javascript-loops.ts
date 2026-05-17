import type { MultipleChoiceRow } from '@/types/lesson'

export const javascriptLoops = {
  slug: 'javascript-loops',
  title: 'Циклы в JavaScript',
  readTime: 9,
  sections: [
    { id: 'what-is-loop', title: 'Что такое цикл?' },
    { id: 'for', title: 'Цикл for' },
    { id: 'while', title: 'Цикл while' },
    { id: 'break-continue', title: 'break и continue' },
    { id: 'loops-arrays', title: 'Перебор массивов' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `Цикл — это способ выполнить один и тот же код много раз. Представь, что тебе нужно
вывести числа от 1 до 100. Писать 100 строк console.log вручную — ужасно. Цикл сделает
это за тебя. Циклы — один из самых важных инструментов программиста.`,

    forLoop: {
      description: 'Цикл for — самый популярный. Имеет три части: начало, условие, шаг:',
      code: `// for (начало; условие; шаг)
for (let i = 0; i < 5; i++) {
  console.log(i); // 0, 1, 2, 3, 4
}

// Считаем сумму 1 + 2 + ... + 10
let sum = 0;
for (let i = 1; i <= 10; i++) {
  sum += i;
}
console.log(sum); // 55`,
    },

    whileLoop: {
      description: 'Цикл while выполняется, пока условие истинно:',
      code: `let count = 0;

while (count < 5) {
  console.log("Шаг: " + count);
  count++; // Важно! Иначе бесконечный цикл
}
// Шаг: 0, Шаг: 1, Шаг: 2, Шаг: 3, Шаг: 4

// do...while выполняется хотя бы 1 раз:
do {
  console.log("Выполнится хотя бы раз");
} while (false);`,
    },

    breakContinue: {
      description: 'break прерывает цикл, continue пропускает итерацию:',
      code: `// break — выйти из цикла
for (let i = 0; i < 10; i++) {
  if (i === 5) break; // Стоп!
  console.log(i); // 0, 1, 2, 3, 4
}

// continue — пропустить итерацию
for (let i = 0; i < 5; i++) {
  if (i === 2) continue; // Пропускаем 2
  console.log(i); // 0, 1, 3, 4
}`,
    },

    loopsArrays: {
      description: 'Циклы идеально подходят для перебора массивов:',
      code: `const fruits = ["яблоко", "банан", "манго"];

// Через обычный for
for (let i = 0; i < fruits.length; i++) {
  console.log(fruits[i]);
}

// Через for...of (удобнее для массивов)
for (const fruit of fruits) {
  console.log(fruit);
}

// Через forEach (метод массива)
fruits.forEach(fruit => console.log(fruit));`,
    },

    workedExamples: [
      {
        title: 'Пример: Таблица умножения',
        scenario: 'Выведи таблицу умножения для числа 5.',
        solution: `for (let i = 1; i <= 10; i++) {
  console.log(\`5 × \${i} = \${5 * i}\`);
}
// 5 × 1 = 5
// 5 × 2 = 10
// ...
// 5 × 10 = 50`,
      },
    ],
  },

  keyTerms: [
    { term: 'Цикл', definition: 'Инструкция, повторяющая блок кода несколько раз.' },
    { term: 'for', definition: 'Цикл с известным числом итераций: for (начало; условие; шаг).' },
    { term: 'while', definition: 'Цикл, выполняющийся пока условие истинно.' },
    { term: 'break', definition: 'Немедленно завершает выполнение цикла.' },
    { term: 'continue', definition: 'Пропускает текущую итерацию и переходит к следующей.' },
    { term: 'for...of', definition: 'Удобный способ перебора элементов массива или строки.' },
  ],

  didYouKnow: [
    'Бесконечный цикл (например, while(true)) может "подвесить" браузер! Всегда убедись, что условие когда-нибудь станет ложным.',
    'for...of появился в ES6 (2015). До этого все использовали обычный for с индексом.',
    'Рекурсия — это альтернатива циклу, где функция вызывает саму себя. Иногда она более элегантна, чем цикл.',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание циклов JavaScript.',
    rows: [
      {
        id: 'q1',
        question: 'Сколько раз выполнится: for (let i = 0; i < 5; i++)?',
        options: ['4 раза', '5 раз', '6 раз', 'Бесконечно'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Что делает break внутри цикла?',
        options: ['Пропускает текущую итерацию', 'Выходит из цикла полностью', 'Перезапускает цикл', 'Ничего не делает'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Что делает continue внутри цикла?',
        options: ['Завершает цикл', 'Продолжает выполнение после цикла', 'Пропускает остаток текущей итерации', 'Увеличивает счётчик'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        question: 'Какой цикл лучше для перебора элементов массива?',
        options: ['while', 'do...while', 'for...of', 'for...in'],
        correctIndex: 2,
      },
      {
        id: 'q5',
        question: 'Чем опасен while(true)?',
        options: ['Ничем', 'Бесконечным циклом, который подвесит программу', 'Неправильным результатом', 'Медленной работой'],
        correctIndex: 1,
      },
    ] as MultipleChoiceRow[],
  },
}
