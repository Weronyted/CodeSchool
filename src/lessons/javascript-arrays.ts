import type { Lesson } from '@/types/lesson'

export const javascriptArrays: Lesson = {
  slug: 'javascript-arrays',
  category: 'JS',
  readTime: 10,
  icon: '📋',

  title_ru: 'Массивы JavaScript',
  title_en: 'JavaScript Arrays',

  description_ru: 'Создание массивов, доступ по индексу, методы push/pop, map и filter.',
  description_en: 'Creating arrays, index access, push/pop methods, map and filter.',

  sections: [
    { id: 'what-is-array', title_ru: 'Что такое массив',    title_en: 'What is an array' },
    { id: 'access',        title_ru: 'Доступ к элементам',  title_en: 'Accessing elements' },
    { id: 'methods',       title_ru: 'Методы массивов',     title_en: 'Array methods' },
    { id: 'map-filter',    title_ru: 'map и filter',        title_en: 'map and filter' },
    { id: 'key-terms',     title_ru: 'Ключевые термины',    title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Массивы: список всего подряд',
      title_en: 'Arrays: a list of anything',
      body_ru: 'Массив — упорядоченный список значений. Вместо name1, name2, name3 — один массив names. Массивы хранят любые данные: числа, строки, объекты, даже другие массивы.',
      body_en: 'An array is an ordered list of values. Instead of name1, name2, name3 — one array names. Arrays store any data: numbers, strings, objects, even other arrays.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Массив как список покупок',
      title_en: 'An array is like a shopping list',
      body_ru: 'Список покупок: каждый пункт на своей строке, пронумерован. Можно добавить в конец, вычеркнуть, найти по номеру строки. Массив работает точно так же.',
      body_en: 'A shopping list: each item on its own line, numbered. You can add to the end, cross out, find by line number. An array works exactly the same way.',
      visual: {
        kind: 'emoji',
        emojis: ['🛒', '📋', '📦'],
      },
      bullets: [
        { text_ru: '🛒 Список = массив — порядок важен', text_en: '🛒 List = array — order matters' },
        { text_ru: '📋 Строка 0, 1, 2... = индекс — нумерация с нуля', text_en: '📋 Line 0, 1, 2... = index — numbering from zero' },
        { text_ru: '📦 Можно добавлять, удалять, искать элементы', text_en: '📦 Can add, remove, and find elements' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Создание массива и доступ по индексу',
      title_en: 'Creating an array and index access',
      body_ru: 'Массив создаётся квадратными скобками []. Элементы нумеруются с 0. Последний элемент — [length-1]. Обращение к несуществующему индексу возвращает undefined.',
      body_en: 'An array is created with square brackets []. Elements are numbered from 0. The last element is at [length-1]. Accessing a non-existent index returns undefined.',
      bullets: [
        { text_ru: '📝 const arr = [1, "привет", true] — разные типы OK', text_en: '📝 const arr = [1, "hello", true] — mixed types OK' },
        { text_ru: '0️⃣ arr[0] — первый элемент', text_en: '0️⃣ arr[0] — first element' },
        { text_ru: '📏 arr.length — количество элементов', text_en: '📏 arr.length — number of elements' },
        { text_ru: '❓ arr[99] → undefined (не ошибка)', text_en: '❓ arr[99] → undefined (not an error)' },
      ],
    },
    {
      id: 's4',
      type: 'code-anim',
      title_ru: 'Работаем с массивом шаг за шагом',
      title_en: 'Working with an array step by step',
      body_ru: 'Создаём массив, добавляем элементы и перебираем.',
      body_en: 'Create an array, add elements, and iterate.',
      animMode: 'console',
      animSteps: [
        {
          code: 'const fruits = ["яблоко", "банан"];\nconsole.log(fruits[0]);',
          comment_ru: '1. Создаём массив — обращаемся к первому элементу',
          comment_en: '1. Create array — access first element',
          output: 'яблоко',
        },
        {
          code: 'const fruits = ["яблоко", "банан"];\nfruits.push("манго");\nconsole.log(fruits);',
          comment_ru: '2. push() добавляет элемент в конец',
          comment_en: '2. push() adds element to the end',
          output: '["яблоко", "банан", "манго"]',
        },
        {
          code: 'const fruits = ["яблоко", "банан", "манго"];\nconsole.log(fruits.length);',
          comment_ru: '3. length — количество элементов в массиве',
          comment_en: '3. length — number of elements in the array',
          output: '3',
        },
        {
          code: 'const fruits = ["яблоко", "банан", "манго"];\nfor (const fruit of fruits) {\n  console.log(fruit);\n}',
          comment_ru: '4. for..of перебирает все элементы',
          comment_en: '4. for..of iterates over all elements',
          output: 'яблоко\nбанан\nманго',
        },
      ],
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Методы массивов',
      title_en: 'Array methods',
      body_ru: 'push/pop работают с концом массива. unshift/shift — с началом. indexOf и includes — для поиска. join склеивает в строку.',
      body_en: 'push/pop work with the end of the array. unshift/shift — with the beginning. indexOf and includes — for searching. join joins into a string.',
      bullets: [
        { text_ru: '➕ push(x) — добавить в конец', text_en: '➕ push(x) — add to end' },
        { text_ru: '➖ pop() — удалить и вернуть последний', text_en: '➖ pop() — remove and return last' },
        { text_ru: '🔍 includes(x) — есть ли элемент? true/false', text_en: '🔍 includes(x) — does element exist? true/false' },
        { text_ru: '🔗 join(", ") — склеить элементы в строку', text_en: '🔗 join(", ") — join elements into string' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'map и filter — трансформация массивов',
      title_en: 'map and filter — transforming arrays',
      body_ru: 'map создаёт новый массив применяя функцию к каждому элементу. filter создаёт новый массив только из элементов, прошедших проверку. Оба возвращают новый массив — оригинал не меняется.',
      body_en: 'map creates a new array by applying a function to each element. filter creates a new array from elements that pass a test. Both return a new array — the original is unchanged.',
      code: `const numbers = [1, 2, 3, 4, 5, 6];

// map — применить функцию к каждому
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12]

// filter — оставить только чётные
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

// Цепочка: только чётные, умноженные на 3
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 3);
console.log(result); // [6, 12, 18]

// reduce — свернуть в одно значение
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 21`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'compare',
      title_ru: 'push/unshift и pop/shift',
      title_en: 'push/unshift and pop/shift',
      body_ru: 'Два конца массива — два набора методов.',
      body_en: 'Two ends of the array — two sets of methods.',
      compareLeft: {
        label_ru: 'Конец массива',
        label_en: 'End of array',
        items_ru: [
          'push(x) — добавить в конец',
          'pop() — удалить из конца',
          'Быстро: O(1)',
          'Самые популярные операции',
        ],
        items_en: [
          'push(x) — add to end',
          'pop() — remove from end',
          'Fast: O(1)',
          'Most popular operations',
        ],
        color: 'green',
      },
      compareRight: {
        label_ru: 'Начало массива',
        label_en: 'Beginning of array',
        items_ru: [
          'unshift(x) — добавить в начало',
          'shift() — удалить из начала',
          'Медленнее: перенумерует всё',
          'Нужны реже',
        ],
        items_en: [
          'unshift(x) — add to beginning',
          'shift() — remove from beginning',
          'Slower: renumbers everything',
          'Needed less often',
        ],
        color: 'amber',
      },
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'В JavaScript массивы — это объекты! typeof [] возвращает "object", а не "array". Правильный способ проверить: Array.isArray([]). Ещё один трюк: spread-оператор [...arr] создаёт копию массива — полезно когда не хочешь менять оригинал.',
      body_en: 'In JavaScript arrays are objects! typeof [] returns "object", not "array". The correct way to check: Array.isArray([]). Another trick: the spread operator [...arr] creates a copy of the array — useful when you don\'t want to modify the original.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Работай с массивами!',
      title_en: 'Work with arrays!',
      body_ru: 'Создай массив оценок, найди среднее значение через reduce, отфильтруй только отличные (90+) через filter.',
      body_en: 'Create an array of scores, find the average with reduce, filter only excellent ones (90+) with filter.',
    },
  ],

  content: {
    intro_ru: `Массив — это упорядоченный список значений. Вместо того чтобы хранить каждое имя
в отдельной переменной (name1, name2, name3...), кладёшь их все в один массив.
Массивы — основа работы с коллекциями данных в программировании.`,
    intro_en: `An array is an ordered list of values. Instead of storing each name in a separate
variable (name1, name2, name3...), you put them all into one array.
Arrays are the foundation of working with data collections in programming.`,

    blocks: [
      {
        sectionId: 'what-is-array',
        heading_ru: 'Что такое массив',
        heading_en: 'What is an array',
        text_ru: `Массив создаётся квадратными скобками [].
Элементы разделяются запятыми.
Могут быть разных типов — числа, строки, булевы, объекты.
Массив — это тоже переменная, поэтому используй const или let.`,
        text_en: `An array is created with square brackets [].
Elements are separated by commas.
They can be of different types — numbers, strings, booleans, objects.
An array is also a variable, so use const or let.`,
        code: `const fruits = ["яблоко", "банан", "манго"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [42, "привет", true, null];

const empty = []; // Пустой массив

console.log(fruits.length); // 3
console.log(mixed.length);  // 4`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'access',
        heading_ru: 'Доступ к элементам',
        heading_en: 'Accessing elements',
        text_ru: `Элементы нумеруются с 0 (0-индексация).
Первый — arr[0], последний — arr[arr.length - 1].
Обращение к несуществующему индексу возвращает undefined (не ошибку).
Изменить элемент: arr[1] = "новое значение".`,
        text_en: `Elements are numbered from 0 (0-indexing).
First — arr[0], last — arr[arr.length - 1].
Accessing a non-existent index returns undefined (not an error).
Change an element: arr[1] = "new value".`,
        code: `const colors = ["красный", "зелёный", "синий"];

console.log(colors[0]); // "красный"
console.log(colors[1]); // "зелёный"
console.log(colors[2]); // "синий"
console.log(colors[3]); // undefined

// Последний элемент
console.log(colors[colors.length - 1]); // "синий"

// Изменить элемент
colors[0] = "оранжевый";
console.log(colors); // ["оранжевый", "зелёный", "синий"]`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'methods',
        heading_ru: 'Методы массивов',
        heading_en: 'Array methods',
        text_ru: `Основные методы:
• push(x) — добавить в конец, возвращает новую длину
• pop() — удалить из конца, возвращает удалённый элемент
• unshift(x) — добавить в начало
• shift() — удалить из начала
• indexOf(x) — индекс элемента (-1 если нет)
• includes(x) — есть ли элемент (true/false)
• join(sep) — соединить в строку`,
        text_en: `Main methods:
• push(x) — add to end, returns new length
• pop() — remove from end, returns removed element
• unshift(x) — add to beginning
• shift() — remove from beginning
• indexOf(x) — index of element (-1 if absent)
• includes(x) — is element present? (true/false)
• join(sep) — join into a string`,
        code: `const arr = ["a", "b", "c"];

arr.push("d");       // ["a","b","c","d"]
arr.pop();           // ["a","b","c"], вернул "d"
arr.unshift("z");    // ["z","a","b","c"]

console.log(arr.indexOf("b")); // 2
console.log(arr.includes("a")); // true
console.log(arr.join(" - ")); // "z - a - b - c"`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'map-filter',
        heading_ru: 'map и filter',
        heading_en: 'map and filter',
        text_ru: `map — создаёт новый массив, применяя функцию к каждому элементу.
filter — создаёт новый массив из элементов, прошедших тест.
reduce — сворачивает массив в одно значение.

Все три не изменяют оригинальный массив.
Можно вызывать цепочкой: arr.filter(...).map(...)`,
        text_en: `map — creates a new array by applying a function to every element.
filter — creates a new array from elements that pass a test.
reduce — folds the array into a single value.

All three do not modify the original array.
Can be chained: arr.filter(...).map(...)`,
        code: `const scores = [45, 78, 90, 55, 95, 82];

// map — умножить каждый на 1.1 (бонус 10%)
const boosted = scores.map(s => Math.round(s * 1.1));
console.log(boosted); // [50, 86, 99, 61, 105, 90]

// filter — только отличники (>= 80)
const excellent = scores.filter(s => s >= 80);
console.log(excellent); // [90, 95, 82]

// reduce — сумма всех оценок
const total = scores.reduce((sum, s) => sum + s, 0);
const avg = Math.round(total / scores.length);
console.log("Среднее:", avg); // Среднее: 74`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: массивы',
    title_en: 'Try it yourself: arrays',
    instructions_ru: `Работай с массивом оценок:
1. Создай массив scores = [72, 88, 45, 95, 61, 100, 78]
2. Найди количество отличников (score >= 90) через filter
3. Вычисли среднее через reduce
4. Выведи все оценки с комментарием через map`,
    instructions_en: `Work with an array of scores:
1. Create array scores = [72, 88, 45, 95, 61, 100, 78]
2. Find the number of excellent scores (score >= 90) using filter
3. Calculate the average using reduce
4. Print all scores with a comment using map`,
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `const scores = [72, 88, 45, 95, 61, 100, 78];

// 1. Отличники (>= 90)
const excellent = scores.filter(s => s >= 90);
console.log("Отличники:", excellent);        // [95, 100]
console.log("Количество:", excellent.length); // 2

// 2. Среднее значение
const avg = scores.reduce((sum, s) => sum + s, 0) / scores.length;
console.log("Среднее:", Math.round(avg));    // 77

// 3. Добавить комментарий к каждой оценке
const withLabel = scores.map(s => {
  const label = s >= 90 ? "Отлично" : s >= 70 ? "Хорошо" : "Нужна работа";
  return \`\${s} — \${label}\`;
});
withLabel.forEach(line => console.log(line));`,
    },
    hints_ru: [
      'filter возвращает новый массив с элементами, для которых функция вернула true.',
      'reduce((accumulator, current) => accumulator + current, 0) — начальное значение 0 обязательно для суммы.',
    ],
    hints_en: [
      'filter returns a new array with elements for which the function returned true.',
      'reduce((accumulator, current) => accumulator + current, 0) — the initial value 0 is required for summing.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Массив', term_en: 'Array',
      definition_ru: 'Упорядоченный список значений. Создаётся квадратными скобками: [1, 2, 3].',
      definition_en: 'An ordered list of values. Created with square brackets: [1, 2, 3].',
      example_ru: 'const fruits = ["яблоко", "банан", "манго"];',
      example_en: 'const fruits = ["apple", "banana", "mango"];',
    },
    {
      term_ru: 'Индекс', term_en: 'Index',
      definition_ru: 'Порядковый номер элемента массива. Начинается с 0.',
      definition_en: 'The positional number of an array element. Starts at 0.',
      example_ru: 'fruits[0] — "яблоко", fruits[2] — "манго"',
      example_en: 'fruits[0] — "apple", fruits[2] — "mango"',
    },
    {
      term_ru: 'push() / pop()', term_en: 'push() / pop()',
      definition_ru: 'Методы добавления (push) и удаления (pop) элементов с конца массива.',
      definition_en: 'Methods for adding (push) and removing (pop) elements from the end of an array.',
      example_ru: 'arr.push("новый"); arr.pop();',
      example_en: 'arr.push("new"); arr.pop();',
    },
    {
      term_ru: 'map()', term_en: 'map()',
      definition_ru: 'Создаёт новый массив, применяя функцию к каждому элементу.',
      definition_en: 'Creates a new array by applying a function to each element.',
      example_ru: '[1,2,3].map(n => n * 2) → [2,4,6]',
      example_en: '[1,2,3].map(n => n * 2) → [2,4,6]',
    },
    {
      term_ru: 'filter()', term_en: 'filter()',
      definition_ru: 'Создаёт новый массив из элементов, прошедших условие.',
      definition_en: 'Creates a new array from elements that pass a condition.',
      example_ru: '[1,2,3,4].filter(n => n > 2) → [3,4]',
      example_en: '[1,2,3,4].filter(n => n > 2) → [3,4]',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В JavaScript массивы — это объекты. Поэтому typeof [] возвращает "object", а не "array"! Правильный способ проверить: Array.isArray([]). Это классический вопрос на собеседованиях.',
      text_en: 'In JavaScript arrays are objects. So typeof [] returns "object", not "array"! The correct way to check: Array.isArray([]). This is a classic job interview question.',
    },
    {
      text_ru: 'Spread-оператор (...) позволяет "распаковать" массив: const copy = [...original]. Это создаёт поверхностную копию — изменения в копии не затронут оригинал. Очень удобно в React!',
      text_en: 'The spread operator (...) lets you "unpack" an array: const copy = [...original]. This creates a shallow copy — changes to the copy don\'t affect the original. Very handy in React!',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'С какого индекса начинается нумерация элементов массива?',
      text_en: 'What index does array element numbering start from?',
      options_ru: ['1', '0', '-1', 'Зависит от массива'],
      options_en: ['1', '0', '-1', 'Depends on the array'],
      correctIndex: 1,
      explanation_ru: 'В JavaScript (и большинстве языков) массивы индексируются с нуля. arr[0] — первый элемент.',
      explanation_en: 'In JavaScript (and most languages) arrays are zero-indexed. arr[0] is the first element.',
    },
    {
      id: 'q2',
      text_ru: 'Что делает метод push()?',
      text_en: 'What does the push() method do?',
      options_ru: ['Удаляет первый элемент', 'Добавляет элемент в конец', 'Разворачивает массив', 'Сортирует массив'],
      options_en: ['Removes the first element', 'Adds element to the end', 'Reverses the array', 'Sorts the array'],
      correctIndex: 1,
      explanation_ru: 'push() добавляет один или несколько элементов в конец массива и возвращает новую длину.',
      explanation_en: 'push() adds one or more elements to the end of the array and returns the new length.',
    },
    {
      id: 'q3',
      text_ru: 'Что вернёт [1, 2, 3].length?',
      text_en: 'What does [1, 2, 3].length return?',
      options_ru: ['2', '3', '4', 'undefined'],
      options_en: ['2', '3', '4', 'undefined'],
      correctIndex: 1,
      explanation_ru: 'length возвращает количество элементов. В массиве [1, 2, 3] три элемента, поэтому length = 3.',
      explanation_en: 'length returns the number of elements. The array [1, 2, 3] has three elements, so length is 3.',
    },
    {
      id: 'q4',
      text_ru: 'Что делает map()?',
      text_en: 'What does map() do?',
      options_ru: ['Удаляет дубликаты', 'Сортирует элементы', 'Создаёт новый массив, применяя функцию к каждому элементу', 'Ищет элемент'],
      options_en: ['Removes duplicates', 'Sorts elements', 'Creates a new array by applying a function to each element', 'Finds an element'],
      correctIndex: 2,
      explanation_ru: 'map() применяет переданную функцию к каждому элементу и возвращает новый массив с результатами.',
      explanation_en: 'map() applies the given function to each element and returns a new array with the results.',
    },
    {
      id: 'q5',
      text_ru: 'Что вернёт ["a", "b", "c"][5]?',
      text_en: 'What does ["a", "b", "c"][5] return?',
      options_ru: ['null', '"c"', 'undefined', 'Ошибку'],
      options_en: ['null', '"c"', 'undefined', 'An error'],
      correctIndex: 2,
      explanation_ru: 'Обращение к несуществующему индексу возвращает undefined, а не ошибку. Массив содержит индексы 0, 1, 2 — индекса 5 нет.',
      explanation_en: 'Accessing a non-existent index returns undefined, not an error. The array has indices 0, 1, 2 — there is no index 5.',
    },
  ],
}
