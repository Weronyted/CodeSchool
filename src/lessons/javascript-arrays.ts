import type { MultipleChoiceRow } from '@/types/lesson'

export const javascriptArrays = {
  slug: 'javascript-arrays',
  title: 'Массивы JavaScript',
  readTime: 10,
  sections: [
    { id: 'what-is-array', title: 'Что такое массив?' },
    { id: 'access', title: 'Доступ к элементам' },
    { id: 'methods', title: 'Методы массивов' },
    { id: 'map-filter', title: 'map и filter' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `Массив — это упорядоченный список значений. Вместо того чтобы хранить каждое имя
в отдельной переменной (name1, name2, name3...), можно положить их все в один массив.
Массивы — основа работы с коллекциями данных в программировании.`,

    whatIsArray: {
      code: `// Создание массива (квадратные скобки)
const fruits = ["яблоко", "банан", "манго"];
const numbers = [1, 2, 3, 4, 5];
const mixed = [42, "привет", true, null]; // Разные типы!

// Пустой массив
const empty = [];

// Длина массива
console.log(fruits.length); // 3`,
    },

    access: {
      description: 'Элементы массива нумеруются с нуля (0-индексация):',
      code: `const colors = ["красный", "зелёный", "синий"];

console.log(colors[0]); // "красный"  (первый)
console.log(colors[1]); // "зелёный"  (второй)
console.log(colors[2]); // "синий"    (третий)
console.log(colors[3]); // undefined  (нет такого!)

// Изменить элемент
colors[0] = "оранжевый";
console.log(colors); // ["оранжевый", "зелёный", "синий"]`,
    },

    methods: {
      description: 'Методы для изменения массива:',
      items: [
        { name: 'push()', description: 'Добавляет элемент в конец', example: 'fruits.push("клубника")' },
        { name: 'pop()', description: 'Удаляет и возвращает последний элемент', example: 'const last = fruits.pop()' },
        { name: 'unshift()', description: 'Добавляет элемент в начало', example: 'fruits.unshift("дыня")' },
        { name: 'shift()', description: 'Удаляет и возвращает первый элемент', example: 'const first = fruits.shift()' },
        { name: 'indexOf()', description: 'Возвращает индекс элемента (-1 если не найден)', example: 'fruits.indexOf("банан")' },
        { name: 'includes()', description: 'Проверяет, есть ли элемент в массиве', example: 'fruits.includes("яблоко") // true' },
        { name: 'join()', description: 'Соединяет элементы в строку', example: 'fruits.join(", ")' },
      ],
    },

    mapFilter: {
      description: 'map и filter — мощные методы для трансформации массивов:',
      code: `const numbers = [1, 2, 3, 4, 5, 6];

// map — создаёт новый массив, применяя функцию к каждому элементу
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10, 12]

// filter — создаёт новый массив только с элементами, прошедшими проверку
const evens = numbers.filter(n => n % 2 === 0);
console.log(evens); // [2, 4, 6]

// reduce — сводит массив к одному значению
const sum = numbers.reduce((acc, n) => acc + n, 0);
console.log(sum); // 21`,
    },
  },

  keyTerms: [
    { term: 'Массив', definition: 'Упорядоченный список значений. Создаётся квадратными скобками: [1, 2, 3].' },
    { term: 'Индекс', definition: 'Порядковый номер элемента массива. Начинается с 0.' },
    { term: 'push() / pop()', definition: 'Методы добавления и удаления элементов с конца массива.' },
    { term: 'map()', definition: 'Создаёт новый массив, применяя функцию к каждому элементу.' },
    { term: 'filter()', definition: 'Создаёт новый массив из элементов, прошедших условие.' },
    { term: 'length', definition: 'Свойство массива, возвращающее количество элементов.' },
  ],

  didYouKnow: [
    'В JavaScript массивы — это объекты. Поэтому typeof [] возвращает "object", а не "array"!',
    'Метод Array.isArray([]) возвращает true — правильный способ проверить, является ли значение массивом.',
    'Spread-оператор (...) позволяет "распаковать" массив: const copy = [...original];',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание массивов JavaScript.',
    rows: [
      {
        id: 'q1',
        question: 'С какого индекса начинается нумерация элементов массива?',
        options: ['1', '0', '-1', 'Зависит от массива'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Что делает метод push()?',
        options: ['Удаляет первый элемент', 'Добавляет элемент в конец', 'Разворачивает массив', 'Сортирует массив'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Что вернёт [1,2,3].length?',
        options: ['2', '3', '4', 'undefined'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        question: 'Что делает map()?',
        options: [
          'Удаляет дубликаты',
          'Сортирует элементы',
          'Создаёт новый массив, применяя функцию к каждому элементу',
          'Ищет элемент по значению',
        ],
        correctIndex: 2,
      },
      {
        id: 'q5',
        question: 'Что вернёт ["a","b","c"][5]?',
        options: ['null', '"c"', 'undefined', 'Ошибку'],
        correctIndex: 2,
      },
    ] as MultipleChoiceRow[],
  },
}
