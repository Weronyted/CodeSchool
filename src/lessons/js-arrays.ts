import type { Lesson } from '@/types/lesson'

export const jsArrays: Lesson = {
  slug: 'js-arrays',
  category: 'JS',
  readTime: 10,
  icon: '📋',
  title_ru: 'Массивы в JavaScript',
  title_en: 'Arrays in JavaScript',
  description_ru: 'Создание массивов, доступ по индексу, изменение с push/pop и мощные методы map, filter, reduce.',
  description_en: 'Creating arrays, index access, modification with push/pop, and powerful methods map, filter, reduce.',

  sections: [
    { id: 'creation', title_ru: 'Создание и доступ', title_en: 'Creating and Accessing' },
    { id: 'mutation', title_ru: 'Изменение массива', title_en: 'Mutating Arrays' },
    { id: 'iteration', title_ru: 'Перебор элементов', title_en: 'Iterating Elements' },
    { id: 'map-filter', title_ru: 'map и filter', title_en: 'map and filter' },
    { id: 'spread-rest', title_ru: 'Spread и деструктуризация', title_en: 'Spread and Destructuring' },
  ],

  slides: [
    {
      id: 'title',
      type: 'title',
      title_ru: 'Массивы в JavaScript',
      title_en: 'Arrays in JavaScript',
      body_ru: 'Массив — это упорядоченный список значений. Он позволяет хранить набор данных под одним именем и предоставляет богатый набор методов для обработки.',
      body_en: 'An array is an ordered list of values. It lets you store a collection of data under one name and provides a rich set of methods for processing.',
      visual: { kind: 'emoji', emojis: ['📋', '🗃️', '📦'], caption_ru: 'Коллекция данных', caption_en: 'Data Collection' },
    },
    {
      id: 'creation',
      type: 'concept',
      title_ru: 'Создание массива и доступ по индексу',
      title_en: 'Creating an Array and Index Access',
      body_ru: 'Массивы создаются в квадратных скобках. Элементы индексируются начиная с 0. Длина доступна через свойство length.',
      body_en: 'Arrays are created with square brackets. Elements are indexed starting at 0. Length is accessible via the length property.',
      bullets: [
        { text_ru: 'const arr = [1, 2, 3] — создание массива', text_en: 'const arr = [1, 2, 3] — create an array' },
        { text_ru: 'arr[0] — первый элемент (индекс 0)', text_en: 'arr[0] — first element (index 0)' },
        { text_ru: 'arr[arr.length - 1] — последний элемент', text_en: 'arr[arr.length - 1] — last element' },
        { text_ru: 'arr.length — количество элементов', text_en: 'arr.length — number of elements' },
        { text_ru: 'Массив может хранить значения разных типов', text_en: 'Arrays can hold values of different types' },
      ],
    },
    {
      id: 'mutation-methods',
      type: 'code',
      title_ru: 'Методы изменения массива',
      title_en: 'Array Mutation Methods',
      body_ru: 'push, pop, shift, unshift изменяют массив на месте и возвращают добавленный/удалённый элемент или новую длину.',
      body_en: 'push, pop, shift, unshift modify the array in place and return the added/removed element or new length.',
      code: `const fruits = ["яблоко", "банан"];

fruits.push("вишня");       // добавить в конец → длина 3
fruits.push("дыня", "груша"); // можно несколько

console.log(fruits);
// ["яблоко", "банан", "вишня", "дыня", "груша"]

const last = fruits.pop();  // удалить с конца → "груша"
const first = fruits.shift(); // удалить с начала → "яблоко"
fruits.unshift("манго");    // добавить в начало

console.log(fruits);
// ["манго", "банан", "вишня", "дыня"]`,
      codeLang: 'javascript',
    },
    {
      id: 'compare-mutate-copy',
      type: 'compare',
      title_ru: 'Мутирующие vs немутирующие методы',
      title_en: 'Mutating vs Non-Mutating Methods',
      body_ru: 'Одни методы изменяют исходный массив, другие возвращают новый, не трогая оригинал.',
      body_en: 'Some methods modify the original array; others return a new one without touching the original.',
      compareLeft: {
        label_ru: 'Изменяют массив (мутируют)',
        label_en: 'Mutate the array',
        items_ru: ['push / pop', 'shift / unshift', 'sort', 'reverse', 'splice'],
        items_en: ['push / pop', 'shift / unshift', 'sort', 'reverse', 'splice'],
        color: 'amber',
      },
      compareRight: {
        label_ru: 'Возвращают новый массив',
        label_en: 'Return a new array',
        items_ru: ['map', 'filter', 'slice', 'concat', '[...arr].sort()'],
        items_en: ['map', 'filter', 'slice', 'concat', '[...arr].sort()'],
        color: 'green',
      },
    },
    {
      id: 'anim-arrays',
      type: 'code-anim',
      title_ru: 'Работа с массивом шаг за шагом',
      title_en: 'Working with an Array Step by Step',
      body_ru: 'Посмотрите, как строится и обрабатывается массив имён.',
      body_en: 'Watch how an array of names is built and processed step by step.',
      animMode: 'console',
      animSteps: [
        {
          code: 'const names = ["Алиса", "Боб", "Вера"];\nconsole.log(names.length);',
          comment_ru: 'Создаём массив и смотрим длину',
          comment_en: 'Create array and check length',
          output: '3',
        },
        {
          code: 'const names = ["Алиса", "Боб", "Вера"];\nnames.push("Георгий");\nconsole.log(names);',
          comment_ru: 'Добавляем элемент в конец',
          comment_en: 'Add an element to the end',
          output: '["Алиса", "Боб", "Вера", "Георгий"]',
        },
        {
          code: 'const names = ["Алиса", "Боб", "Вера", "Георгий"];\nconst upper = names.map(n => n.toUpperCase());\nconsole.log(upper);',
          comment_ru: 'map — применяем функцию к каждому элементу',
          comment_en: 'map — apply a function to each element',
          output: '["АЛИСА", "БОБ", "ВЕРА", "ГЕОРГИЙ"]',
        },
        {
          code: 'const names = ["Алиса", "Боб", "Вера", "Георгий"];\nconst longNames = names.filter(n => n.length > 3);\nconsole.log(longNames);',
          comment_ru: 'filter — оставляем только имена длиннее 3 символов',
          comment_en: 'filter — keep only names longer than 3 characters',
          output: '["Алиса", "Вера", "Георгий"]',
        },
        {
          code: 'const names = ["Алиса", "Боб", "Вера"];\nconsole.log(`Всего: ${names.length} человек`);',
          comment_ru: 'Используем length в шаблонной строке',
          comment_en: 'Use length in a template literal',
          output: 'Всего: 3 человек',
        },
      ],
    },
    {
      id: 'map-filter',
      type: 'code',
      title_ru: 'map и filter',
      title_en: 'map and filter',
      body_ru: 'map преобразует каждый элемент, filter отбирает элементы по условию. Оба возвращают новый массив.',
      body_en: 'map transforms each element; filter selects elements by a condition. Both return a new array.',
      code: `const prices = [100, 250, 50, 800, 370];

// map — умножаем все цены на коэффициент
const withTax = prices.map(p => Math.round(p * 1.2));
console.log(withTax); // [120, 300, 60, 960, 444]

// filter — только цены выше 200
const expensive = prices.filter(p => p > 200);
console.log(expensive); // [250, 800, 370]

// Комбинируем
const expensiveWithTax = prices
  .filter(p => p > 200)
  .map(p => Math.round(p * 1.2));
console.log(expensiveWithTax); // [300, 960, 444]`,
      codeLang: 'javascript',
    },
    {
      id: 'find-reduce',
      type: 'code',
      title_ru: 'find, findIndex и reduce',
      title_en: 'find, findIndex, and reduce',
      body_ru: 'find возвращает первый подходящий элемент, findIndex — его индекс, reduce сворачивает массив до одного значения.',
      body_en: 'find returns the first matching element, findIndex its index, reduce folds an array into a single value.',
      code: `const scores = [45, 82, 93, 60, 75];

const firstPassing = scores.find(s => s >= 60);
console.log(firstPassing); // 82

const failIndex = scores.findIndex(s => s < 60);
console.log(failIndex); // 0 (45 — первый провалившийся)

const total = scores.reduce((sum, s) => sum + s, 0);
console.log(total);   // 355
console.log(total / scores.length); // 71 (среднее)`,
      codeLang: 'javascript',
    },
    {
      id: 'spread',
      type: 'code',
      title_ru: 'Spread и деструктуризация',
      title_en: 'Spread and Destructuring',
      body_ru: 'Spread (...) создаёт поверхностную копию массива или объединяет массивы. Деструктуризация позволяет извлекать элементы в переменные.',
      body_en: 'Spread (...) creates a shallow copy of an array or merges arrays. Destructuring extracts elements into variables.',
      code: `const a = [1, 2, 3];
const b = [4, 5, 6];

// Объединение
const combined = [...a, ...b]; // [1,2,3,4,5,6]

// Копия (без мутации оригинала)
const sorted = [...a].sort((x, y) => y - x); // [3,2,1]

// Деструктуризация
const [first, second, ...rest] = combined;
console.log(first);  // 1
console.log(second); // 2
console.log(rest);   // [3,4,5,6]`,
      codeLang: 'javascript',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Попробуйте сами!',
      title_en: 'Try It Yourself!',
      body_ru: 'Создайте массив задач, добавьте несколько элементов, отфильтруйте выполненные и преобразуйте оставшиеся с помощью map.',
      body_en: 'Create a task array, add several items, filter out completed ones, and transform the remaining ones with map.',
    },
  ],

  content: {
    intro_ru: 'Массивы — одна из самых важных структур данных в JavaScript. Практически любое приложение работает со списками: товары в корзине, сообщения в чате, результаты поиска. Встроенные методы массивов позволяют элегантно решать самые разные задачи.',
    intro_en: 'Arrays are one of the most important data structures in JavaScript. Almost every application works with lists: cart items, chat messages, search results. Built-in array methods let you solve a wide variety of tasks elegantly.',
    blocks: [
      {
        sectionId: 'creation',
        heading_ru: 'Создание и доступ к элементам',
        heading_en: 'Creating and Accessing Elements',
        text_ru: 'Массивы в JavaScript динамически типизированы и изменяемы. Они могут содержать любые типы данных вперемешку и менять размер в процессе работы программы.',
        text_en: 'JavaScript arrays are dynamically typed and mutable. They can hold any mix of data types and change size during program execution.',
        code: `const mixed = [42, "строка", true, null, { key: "value" }];

console.log(mixed[0]);     // 42
console.log(mixed[1]);     // "строка"
console.log(mixed.length); // 5
console.log(mixed.at(-1)); // { key: "value" } — ES2022`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'mutation',
        heading_ru: 'splice — вставка и удаление',
        heading_en: 'splice — Insert and Remove',
        text_ru: 'splice — мощный метод для вставки, удаления и замены элементов в произвольной позиции. Изменяет оригинал.',
        text_en: 'splice is a powerful method for inserting, removing, and replacing elements at any position. It mutates the original.',
        code: `const arr = ["a", "b", "c", "d", "e"];

// Удалить 2 элемента начиная с индекса 1
const removed = arr.splice(1, 2);
console.log(removed); // ["b", "c"]
console.log(arr);     // ["a", "d", "e"]

// Вставить на место индекса 1
arr.splice(1, 0, "X", "Y");
console.log(arr);     // ["a", "X", "Y", "d", "e"]`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'iteration',
        heading_ru: 'Перебор: for, for...of, forEach',
        heading_en: 'Iteration: for, for...of, forEach',
        text_ru: 'Для перебора массивов чаще всего используют for...of (когда нужны значения) или forEach (когда нужен побочный эффект). Классический for нужен, когда важен индекс или нужно break.',
        text_en: 'For iterating arrays, for...of (when you need values) or forEach (when you need a side effect) are most common. Classic for is needed when the index matters or you need break.',
        code: `const items = ["яблоко", "банан", "вишня"];

for (const item of items) {
  console.log(item);
}

items.forEach((item, index) => {
  console.log(\`\${index}: \${item}\`);
});`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'map-filter',
        heading_ru: 'Функциональный стиль обработки',
        heading_en: 'Functional Style Processing',
        text_ru: 'Цепочки map, filter и reduce позволяют описывать преобразования данных декларативно — без мутаций и временных переменных. Это делает код более читаемым и тестируемым.',
        text_en: 'Chains of map, filter, and reduce let you describe data transformations declaratively — without mutations or temporary variables. This makes code more readable and testable.',
        code: `const students = [
  { name: "Алиса", grade: 88 },
  { name: "Боб", grade: 55 },
  { name: "Вера", grade: 92 },
  { name: "Дима", grade: 61 },
];

const topStudents = students
  .filter(s => s.grade >= 70)
  .map(s => s.name)
  .sort();

console.log(topStudents); // ["Алиса", "Вера"]`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'spread-rest',
        heading_ru: 'Spread и деструктуризация массивов',
        heading_en: 'Spread and Array Destructuring',
        text_ru: 'Оператор spread (...) позволяет «распаковать» массив в отдельные элементы. Это удобно для создания копий массива без мутации оригинала, для объединения нескольких массивов в один и для передачи массива как отдельных аргументов в функцию. Копия, созданная через spread, поверхностная: вложенные объекты по-прежнему разделяются.\n\nДеструктуризация массива позволяет извлекать элементы по позиции сразу в переменные. Остаточный параметр ...rest собирает все оставшиеся элементы в новый массив. Комбинация spread и деструктуризации значительно сокращает код при работе с массивами и делает намерения программиста явными.',
        text_en: 'The spread operator (...) lets you "unpack" an array into individual elements. This is useful for creating copies of an array without mutating the original, for merging multiple arrays into one, and for passing an array as separate arguments to a function. A spread copy is shallow: nested objects are still shared.\n\nArray destructuring lets you extract elements by position directly into variables. The rest parameter ...rest collects all remaining elements into a new array. Combining spread and destructuring significantly reduces code when working with arrays and makes the programmer\'s intent explicit.',
        code: `const fruits = ["яблоко", "банан", "вишня"];
const vegs = ["морковь", "картофель"];

// Объединение массивов
const basket = [...fruits, ...vegs];
console.log(basket);
// ["яблоко", "банан", "вишня", "морковь", "картофель"]

// Копия без мутации оригинала
const sorted = [...fruits].sort();
console.log(fruits);  // оригинал не изменился
console.log(sorted);  // ["банан", "вишня", "яблоко"]

// Деструктуризация
const [first, second, ...rest] = basket;
console.log(first);  // "яблоко"
console.log(second); // "банан"
console.log(rest);   // ["вишня", "морковь", "картофель"]`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Обработка списка товаров',
    title_en: 'Processing a Product List',
    instructions_ru: 'Дан массив товаров с именем и ценой. Используйте filter, чтобы найти товары дешевле 300 ₽. Используйте map, чтобы получить массив только названий. Используйте reduce, чтобы посчитать общую стоимость всех товаров.',
    instructions_en: 'Given an array of products with name and price. Use filter to find products cheaper than 300. Use map to get an array of names only. Use reduce to calculate the total cost of all products.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `const products = [
  { name: "Чай", price: 200 },
  { name: "Кофе", price: 450 },
  { name: "Сок", price: 150 },
  { name: "Вода", price: 80 },
  { name: "Шоколад", price: 320 },
];

// 1. Товары дешевле 300 / Products cheaper than 300
const cheap = products.filter(p => p.price < 300);
console.log("Дешёвые:", cheap.map(p => p.name));

// 2. Все названия / All names
const names = products.map(p => p.name);
console.log("Все товары:", names);

// 3. Общая стоимость / Total cost
const total = products.reduce((sum, p) => sum + p.price, 0);
console.log("Итого:", total, "₽");
`,
    },
    hints_ru: [
      'filter принимает функцию-предикат, возвращающую true/false.',
      'map преобразует каждый элемент — верните нужное поле объекта.',
      'reduce(fn, initialValue) — fn принимает (аккумулятор, текущийЭлемент).',
      'Можно объединять методы в цепочку: .filter(...).map(...)',
      'Стрелочная функция с объектом: p => p.price обращается к полю price.',
    ],
    hints_en: [
      'filter takes a predicate function that returns true/false.',
      'map transforms each element — return the field you need from the object.',
      'reduce(fn, initialValue) — fn receives (accumulator, currentElement).',
      'You can chain methods: .filter(...).map(...)',
      'Arrow with object: p => p.price accesses the price field.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Массив',
      term_en: 'Array',
      definition_ru: 'Упорядоченный список значений, индексированный начиная с 0.',
      definition_en: 'An ordered list of values, indexed starting at 0.',
      example_ru: 'const arr = [1, 2, 3];',
      example_en: 'const arr = [1, 2, 3];',
    },
    {
      term_ru: 'push / pop',
      term_en: 'push / pop',
      definition_ru: 'push добавляет элемент в конец массива, pop удаляет и возвращает последний элемент.',
      definition_en: 'push adds an element to the end; pop removes and returns the last element.',
      example_ru: 'arr.push(4); arr.pop();',
      example_en: 'arr.push(4); arr.pop();',
    },
    {
      term_ru: 'map',
      term_en: 'map',
      definition_ru: 'Метод массива, возвращающий новый массив с результатами применения функции к каждому элементу.',
      definition_en: 'Array method that returns a new array with the results of applying a function to each element.',
      example_ru: '[1,2,3].map(x => x * 2) // [2,4,6]',
      example_en: '[1,2,3].map(x => x * 2) // [2,4,6]',
    },
    {
      term_ru: 'filter',
      term_en: 'filter',
      definition_ru: 'Метод массива, возвращающий новый массив только с элементами, прошедшими проверку.',
      definition_en: 'Array method that returns a new array containing only elements that pass the test.',
      example_ru: '[1,2,3,4].filter(x => x > 2) // [3,4]',
      example_en: '[1,2,3,4].filter(x => x > 2) // [3,4]',
    },
    {
      term_ru: 'reduce',
      term_en: 'reduce',
      definition_ru: 'Метод, сворачивающий массив до одного значения путём последовательного применения функции.',
      definition_en: 'Method that folds an array into a single value by sequentially applying a function.',
      example_ru: '[1,2,3].reduce((sum, x) => sum + x, 0) // 6',
      example_en: '[1,2,3].reduce((sum, x) => sum + x, 0) // 6',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В JavaScript массив — это на самом деле объект. typeof [] возвращает "object". Чтобы проверить, является ли значение массивом, используйте Array.isArray(value).',
      text_en: 'In JavaScript an array is actually an object. typeof [] returns "object". To check if a value is an array, use Array.isArray(value).',
    },
    {
      text_ru: 'Метод at() (ES2022) позволяет использовать отрицательные индексы: arr.at(-1) — последний элемент, arr.at(-2) — предпоследний. Это удобнее, чем arr[arr.length - 1].',
      text_en: 'The at() method (ES2022) allows negative indices: arr.at(-1) is the last element, arr.at(-2) the second to last. Much more convenient than arr[arr.length - 1].',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой индекс у первого элемента массива в JavaScript?',
      text_en: 'What is the index of the first element in a JavaScript array?',
      options_ru: ['1', '0', '-1', 'first'],
      options_en: ['1', '0', '-1', 'first'],
      correctIndex: 1,
      explanation_ru: 'Массивы в JavaScript индексируются с 0. Первый элемент — arr[0], второй — arr[1] и т.д.',
      explanation_en: 'Arrays in JavaScript are zero-indexed. The first element is arr[0], the second is arr[1], etc.',
    },
    {
      id: 'q2',
      text_ru: 'Какой метод добавляет элемент в конец массива?',
      text_en: 'Which method adds an element to the end of an array?',
      options_ru: ['append()', 'add()', 'push()', 'insert()'],
      options_en: ['append()', 'add()', 'push()', 'insert()'],
      correctIndex: 2,
      explanation_ru: 'push() добавляет один или несколько элементов в конец массива и возвращает новую длину.',
      explanation_en: 'push() adds one or more elements to the end of an array and returns the new length.',
    },
    {
      id: 'q3',
      text_ru: 'Что делает метод map?',
      text_en: 'What does the map method do?',
      options_ru: [
        'Ищет элемент в массиве',
        'Изменяет элементы оригинального массива',
        'Возвращает новый массив с преобразованными элементами',
        'Удаляет дубликаты из массива',
      ],
      options_en: [
        'Searches for an element in the array',
        'Modifies elements of the original array',
        'Returns a new array with transformed elements',
        'Removes duplicates from the array',
      ],
      correctIndex: 2,
      explanation_ru: 'map применяет функцию к каждому элементу и возвращает новый массив того же размера, не изменяя оригинал.',
      explanation_en: 'map applies a function to each element and returns a new array of the same size without modifying the original.',
    },
    {
      id: 'q4',
      text_ru: 'Как правильно проверить, является ли значение массивом?',
      text_en: 'How do you correctly check whether a value is an array?',
      options_ru: ['typeof value === "array"', 'value instanceof Object', 'Array.isArray(value)', 'value.isArray()'],
      options_en: ['typeof value === "array"', 'value instanceof Object', 'Array.isArray(value)', 'value.isArray()'],
      correctIndex: 2,
      explanation_ru: 'typeof [] возвращает "object", поэтому используют Array.isArray() для надёжной проверки.',
      explanation_en: 'typeof [] returns "object", so Array.isArray() is used for a reliable check.',
    },
    {
      id: 'q5',
      text_ru: 'Что вернёт [10, 20, 30].reduce((sum, n) => sum + n, 0)?',
      text_en: 'What does [10, 20, 30].reduce((sum, n) => sum + n, 0) return?',
      options_ru: ['[10, 20, 30]', '0', '60', '30'],
      options_en: ['[10, 20, 30]', '0', '60', '30'],
      correctIndex: 2,
      explanation_ru: 'reduce накапливает сумму: 0+10=10, 10+20=30, 30+30=60. Результат — 60.',
      explanation_en: 'reduce accumulates the sum: 0+10=10, 10+20=30, 30+30=60. Result is 60.',
    },
  ],
}
