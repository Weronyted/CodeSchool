import type { Lesson } from '@/types/lesson'

export const jsArrayMethods: Lesson = {
  slug: 'js-array-methods',
  category: 'JS',
  icon: '🔍',
  readTime: 12,
  title_ru: 'Методы массивов',
  title_en: 'Array Methods',
  description_ru: 'Изучите мощные методы высшего порядка: map, filter, reduce, find, some, every и другие для элегантной работы с данными.',
  description_en: 'Master higher-order array methods: map, filter, reduce, find, some, every and more for elegant data manipulation.',
  sections: [
    { id: 'transform', title_ru: 'Трансформация: map', title_en: 'Transform: map' },
    { id: 'filter', title_ru: 'Фильтрация: filter', title_en: 'Filter: filter' },
    { id: 'accumulate', title_ru: 'Накопление: reduce', title_en: 'Accumulate: reduce' },
    { id: 'search', title_ru: 'Поиск: find / findIndex', title_en: 'Search: find / findIndex' },
    { id: 'check', title_ru: 'Проверка: some / every', title_en: 'Check: some / every' },
    { id: 'other', title_ru: 'Остальные: sort, flat, includes', title_en: 'Others: sort, flat, includes' },
    { id: 'chaining', title_ru: 'Цепочки методов', title_en: 'Method Chaining' },
  ],
  slides: [
    {
      id: 'title-slide',
      type: 'title',
      title_ru: 'Методы массивов',
      title_en: 'Array Methods',
      body_ru: 'Функции высшего порядка превращают сложные циклы в читаемые однострочники.',
      body_en: 'Higher-order functions turn complex loops into readable one-liners.',
      visual: { kind: 'emoji', emojis: ['🔍', '🗂️', '⚡'], caption_ru: 'Фильтруй, трансформируй, накапливай', caption_en: 'Filter, transform, accumulate' },
    },
    {
      id: 'concept-map',
      type: 'concept',
      title_ru: 'map — трансформация каждого элемента',
      title_en: 'map — transform every element',
      body_ru: 'map создаёт новый массив, применяя функцию к каждому элементу. Исходный массив не изменяется.',
      body_en: 'map creates a new array by applying a function to each element. The original array is unchanged.',
      code: `const numbers = [1, 2, 3, 4];\nconst doubled = numbers.map(n => n * 2);\nconsole.log(doubled); // [2, 4, 6, 8]\n\nconst names = ['alice', 'bob'];\nconst upper = names.map(name => name.toUpperCase());\nconsole.log(upper); // ['ALICE', 'BOB']`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-filter',
      type: 'concept',
      title_ru: 'filter — выбор нужных элементов',
      title_en: 'filter — select matching elements',
      body_ru: 'filter возвращает новый массив только с теми элементами, для которых функция вернула true.',
      body_en: 'filter returns a new array with only elements for which the function returned true.',
      code: `const scores = [45, 72, 88, 34, 91];\nconst passing = scores.filter(s => s >= 60);\nconsole.log(passing); // [72, 88, 91]\n\nconst words = ['apple', 'ant', 'banana', 'avocado'];\nconst aWords = words.filter(w => w.startsWith('a'));\nconsole.log(aWords); // ['apple', 'ant', 'avocado']`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-reduce',
      type: 'concept',
      title_ru: 'reduce — свернуть в одно значение',
      title_en: 'reduce — collapse to a single value',
      body_ru: 'reduce проходит по массиву, накапливая результат. Принимает функцию (accumulator, current) и начальное значение.',
      body_en: 'reduce iterates through the array, accumulating a result. Takes a function (accumulator, current) and an initial value.',
      code: `const prices = [10, 20, 30, 40];\nconst total = prices.reduce((acc, price) => acc + price, 0);\nconsole.log(total); // 100\n\n// Count occurrences\nconst fruits = ['apple','banana','apple','cherry','banana','apple'];\nconst count = fruits.reduce((acc, f) => {\n  acc[f] = (acc[f] || 0) + 1;\n  return acc;\n}, {});\nconsole.log(count); // { apple:3, banana:2, cherry:1 }`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-find',
      type: 'concept',
      title_ru: 'find и findIndex — первое совпадение',
      title_en: 'find and findIndex — first match',
      body_ru: 'find возвращает первый элемент, удовлетворяющий условию. findIndex — его индекс. Если ничего не найдено, возвращают undefined / -1.',
      body_en: 'find returns the first element satisfying the condition. findIndex returns its index. If nothing found, they return undefined / -1.',
      code: `const users = [\n  { id: 1, name: 'Alice' },\n  { id: 2, name: 'Bob' },\n  { id: 3, name: 'Charlie' }\n];\n\nconst bob = users.find(u => u.name === 'Bob');\nconsole.log(bob); // { id: 2, name: 'Bob' }\n\nconst idx = users.findIndex(u => u.id === 3);\nconsole.log(idx); // 2`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-some-every',
      type: 'concept',
      title_ru: 'some и every — логические проверки',
      title_en: 'some and every — boolean checks',
      body_ru: 'some возвращает true если хотя бы один элемент удовлетворяет условию. every — если все.',
      body_en: 'some returns true if at least one element satisfies the condition. every — if all do.',
      code: `const ages = [16, 21, 18, 25];\n\nconsole.log(ages.some(a => a >= 21));  // true (Bob is 21)\nconsole.log(ages.every(a => a >= 18)); // false (16 is not)\nconsole.log(ages.every(a => a >= 16)); // true`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-other',
      type: 'concept',
      title_ru: 'sort, flat и includes',
      title_en: 'sort, flat and includes',
      body_ru: 'sort сортирует массив на месте. flat разворачивает вложенные массивы. includes проверяет наличие элемента.',
      body_en: 'sort sorts the array in-place. flat flattens nested arrays. includes checks element presence.',
      code: `// sort (numbers need comparator!)\nconst nums = [10, 1, 5, 3];\nnums.sort((a, b) => a - b);\nconsole.log(nums); // [1, 3, 5, 10]\n\n// flat\nconst nested = [1, [2, 3], [4, [5]]];\nconsole.log(nested.flat());   // [1,2,3,4,[5]]\nconsole.log(nested.flat(2));  // [1,2,3,4,5]\n\n// includes\nconst colors = ['red','green','blue'];\nconsole.log(colors.includes('green')); // true`,
      codeLang: 'javascript',
    },
    {
      id: 'compare-foreach-map',
      type: 'compare',
      title_ru: 'forEach vs map',
      title_en: 'forEach vs map',
      body_ru: 'Ключевое отличие: map возвращает новый массив, forEach — нет.',
      body_en: 'The key difference: map returns a new array, forEach does not.',
      compareLeft: {
        label_ru: 'forEach — нет возврата',
        label_en: 'forEach — no return',
        items_ru: ['Возвращает undefined', 'Используется для побочных эффектов', 'Нельзя цеплять методы', 'arr.forEach(fn) → undefined'],
        items_en: ['Returns undefined', 'Used for side effects', 'Cannot be chained', 'arr.forEach(fn) → undefined'],
        color: 'amber',
      },
      compareRight: {
        label_ru: 'map — возвращает новый массив',
        label_en: 'map — returns new array',
        items_ru: ['Возвращает новый массив', 'Используется для трансформации', 'Можно цеплять методы', 'arr.map(fn) → new array'],
        items_en: ['Returns a new array', 'Used for transformation', 'Can be chained', 'arr.map(fn) → new array'],
        color: 'green',
      },
    },
    {
      id: 'anim-chain',
      type: 'code-anim',
      title_ru: 'Цепочка методов на массиве оценок',
      title_en: 'Method chain on a grades array',
      body_ru: 'Смотрите, как filter → map → reduce выстраиваются в элегантную цепочку.',
      body_en: 'Watch how filter → map → reduce chain together elegantly.',
      animMode: 'console',
      animSteps: [
        {
          code: `const grades = [45, 82, 91, 38, 74, 66, 55, 88];`,
          comment_ru: 'Исходный массив оценок',
          comment_en: 'Starting grades array',
          output: '',
        },
        {
          code: `const grades = [45, 82, 91, 38, 74, 66, 55, 88];\nconst passing = grades.filter(g => g >= 60);`,
          comment_ru: 'Фильтруем — оставляем только >= 60',
          comment_en: 'Filter — keep only scores >= 60',
          output: '// passing: [82, 91, 74, 66, 88]',
        },
        {
          code: `const grades = [45, 82, 91, 38, 74, 66, 55, 88];\nconst passing = grades.filter(g => g >= 60);\nconst curved = passing.map(g => Math.min(100, g + 5));`,
          comment_ru: 'map — добавляем 5 бонусных баллов (макс. 100)',
          comment_en: 'map — add 5 bonus points (max 100)',
          output: '// curved: [87, 96, 79, 71, 93]',
        },
        {
          code: `const grades = [45, 82, 91, 38, 74, 66, 55, 88];\nconst passing = grades.filter(g => g >= 60);\nconst curved = passing.map(g => Math.min(100, g + 5));\nconst average = curved.reduce((acc, g) => acc + g, 0) / curved.length;\nconsole.log('Average:', average.toFixed(1));`,
          comment_ru: 'reduce вычисляет среднее — готово!',
          comment_en: 'reduce computes the average — done!',
          output: 'Average: 85.2',
        },
      ],
    },
    {
      id: 'tip-immutability',
      type: 'tip',
      title_ru: 'Совет: методы не изменяют исходный массив',
      title_en: 'Tip: methods do not mutate the original array',
      body_ru: 'map, filter и reduce возвращают новые массивы. sort и splice изменяют исходный — используйте [...arr].sort() для безопасной сортировки.',
      body_en: 'map, filter and reduce return new arrays. sort and splice mutate the original — use [...arr].sort() for safe sorting.',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Практика',
      title_en: 'Practice',
      body_ru: 'Примените map, filter и reduce к реальному набору данных в редакторе.',
      body_en: 'Apply map, filter and reduce to a real dataset in the editor.',
    },
  ],
  content: {
    intro_ru: 'Методы массивов высшего порядка — один из самых мощных инструментов JavaScript. Они позволяют обрабатывать коллекции данных декларативно, без ручных циклов, делая код чище и понятнее.',
    intro_en: 'Higher-order array methods are one of the most powerful tools in JavaScript. They let you process data collections declaratively, without manual loops, making code cleaner and more readable.',
    blocks: [
      {
        sectionId: 'transform',
        heading_ru: 'map: создание нового массива',
        heading_en: 'map: creating a new array',
        text_ru: 'map принимает функцию-коллбэк и возвращает новый массив той же длины, где каждый элемент — результат применения коллбэка. Это основной инструмент для трансформации данных.',
        text_en: 'map accepts a callback function and returns a new array of the same length, where each element is the result of applying the callback. It is the primary tool for data transformation.',
        code: `const products = [\n  { name: 'Laptop', price: 999 },\n  { name: 'Phone', price: 599 },\n];\nconst withTax = products.map(p => ({ ...p, price: p.price * 1.2 }));\n// [{ name:'Laptop', price:1198.8 }, { name:'Phone', price:718.8 }]`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'filter',
        heading_ru: 'filter: отбор элементов по условию',
        heading_en: 'filter: selecting elements by condition',
        text_ru: 'filter принимает функцию-предикат и возвращает новый массив, содержащий только те элементы, для которых функция вернула true. Исходный массив при этом не изменяется. Это основной инструмент для выборки данных из коллекций.\n\nПредикат получает три аргумента: текущий элемент, его индекс и сам массив. Чаще всего используется только первый. filter удобно комбинировать с map: сначала отфильтровать нужные записи, затем трансформировать их.',
        text_en: 'filter accepts a predicate function and returns a new array containing only the elements for which the function returned true. The original array is not modified. It is the primary tool for selecting data from collections.\n\nThe predicate receives three arguments: the current element, its index, and the array itself. Typically only the first is used. filter pairs naturally with map: first filter the relevant records, then transform them.',
        code: `const scores = [45, 72, 88, 34, 91, 60];

// Keep only passing grades (>= 60)
const passing = scores.filter(s => s >= 60);
console.log(passing); // [72, 88, 91, 60]

// Filter objects by a property
const users = [
  { name: 'Alice', active: true },
  { name: 'Bob',   active: false },
  { name: 'Cara',  active: true },
];
const activeUsers = users.filter(u => u.active);
console.log(activeUsers.map(u => u.name)); // ['Alice', 'Cara']

// Remove falsy values (null, undefined, '', 0, false)
const mixed = [0, 'hello', null, 42, '', undefined, true];
const truthy = mixed.filter(Boolean);
console.log(truthy); // ['hello', 42, true]`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'accumulate',
        heading_ru: 'reduce: сворачивание массива в одно значение',
        heading_en: 'reduce: collapsing an array into a single value',
        text_ru: 'reduce — самый универсальный метод массивов. Он обходит массив слева направо, передавая накопленный результат (аккумулятор) следующей итерации. Сигнатура коллбэка: (accumulator, currentValue, index, array). Второй аргумент reduce — начальное значение аккумулятора.\n\nС помощью reduce можно вычислить сумму, среднее, найти максимум, сгруппировать объекты или даже реализовать map и filter. Если начальное значение не указано, первый элемент массива становится аккумулятором — это может привести к неожиданным результатам, поэтому лучше всегда указывать его явно.',
        text_en: 'reduce is the most versatile array method. It traverses the array left to right, passing the accumulated result (accumulator) to the next iteration. The callback signature is (accumulator, currentValue, index, array). The second argument to reduce is the initial accumulator value.\n\nWith reduce you can compute a sum, average, find a maximum, group objects, or even implement map and filter. If no initial value is provided, the first element becomes the accumulator — this can produce unexpected results, so it is best to always provide one explicitly.',
        code: `const prices = [10, 25, 5, 40, 20];

// Sum all prices
const total = prices.reduce((acc, price) => acc + price, 0);
console.log(total); // 100

// Find maximum value
const max = prices.reduce((acc, price) => price > acc ? price : acc, -Infinity);
console.log(max); // 40

// Group array of objects by a key
const orders = [
  { product: 'coffee', qty: 2 },
  { product: 'tea',    qty: 1 },
  { product: 'coffee', qty: 3 },
];
const grouped = orders.reduce((acc, order) => {
  const key = order.product;
  acc[key] = (acc[key] || 0) + order.qty;
  return acc;
}, {});
console.log(grouped); // { coffee: 5, tea: 1 }`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'search',
        heading_ru: 'find и findIndex: поиск первого совпадения',
        heading_en: 'find and findIndex: locating the first match',
        text_ru: 'find возвращает первый элемент массива, для которого предикат вернул true. Если ни один элемент не подошёл, возвращается undefined. findIndex работает аналогично, но возвращает числовой индекс найденного элемента, а при неудаче — -1.\n\nОба метода прекращают обход сразу после первого совпадения, что делает их эффективнее filter, когда нужен только один результат. Для поиска в массиве примитивов лучше использовать indexOf или includes, а find/findIndex предназначены для массивов объектов со сложными условиями.',
        text_en: 'find returns the first element of the array for which the predicate returns true. If no element matches, it returns undefined. findIndex works the same way but returns the numeric index of the found element, or -1 on failure.\n\nBoth methods stop traversing immediately after the first match, making them more efficient than filter when only one result is needed. For searching arrays of primitives prefer indexOf or includes; find and findIndex are designed for arrays of objects with complex conditions.',
        code: `const products = [
  { id: 101, name: 'Laptop',  inStock: false },
  { id: 102, name: 'Mouse',   inStock: true  },
  { id: 103, name: 'Monitor', inStock: true  },
];

// find — returns the element itself
const firstAvailable = products.find(p => p.inStock);
console.log(firstAvailable); // { id: 102, name: 'Mouse', inStock: true }

// Returns undefined if nothing matches
const gpu = products.find(p => p.name === 'GPU');
console.log(gpu); // undefined

// findIndex — returns the position
const monitorIdx = products.findIndex(p => p.name === 'Monitor');
console.log(monitorIdx); // 2

// Useful for updating a specific object in an array
const idx = products.findIndex(p => p.id === 101);
if (idx !== -1) {
  products[idx] = { ...products[idx], inStock: true };
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'check',
        heading_ru: 'some и every: логические проверки массива',
        heading_en: 'some and every: boolean checks over an array',
        text_ru: 'some возвращает true, если хотя бы один элемент удовлетворяет условию, и немедленно останавливает обход (короткое замыкание). every возвращает true только если все элементы удовлетворяют условию — и тоже прекращает обход при первой неудаче.\n\nОба метода возвращают булево значение, поэтому идеально подходят для валидации данных перед их обработкой. Важная граничная ситуация: every([]) возвращает true (принцип «вакуумной истины»), а some([]) возвращает false — поведение согласуется с математической логикой, но может удивить.',
        text_en: 'some returns true if at least one element satisfies the condition, and immediately stops traversing (short-circuit). every returns true only if all elements satisfy the condition — and also stops at the first failure.\n\nBoth methods return a boolean, making them ideal for validating data before processing. An important edge case: every([]) returns true (vacuous truth), while some([]) returns false — the behavior is consistent with mathematical logic but can be surprising.',
        code: `const cart = [
  { name: 'Book',     price: 15, inStock: true  },
  { name: 'Pen',      price: 2,  inStock: true  },
  { name: 'Notebook', price: 8,  inStock: false },
];

// some — is at least one item out of stock?
const hasOutOfStock = cart.some(item => !item.inStock);
console.log(hasOutOfStock); // true

// every — are all items affordable (under $20)?
const allAffordable = cart.every(item => item.price < 20);
console.log(allAffordable); // true

// Practical: validate a form array
const fields = ['Alice', 'alice@example.com', '123 Main St'];
const allFilled = fields.every(f => f.trim().length > 0);
console.log('Form valid:', allFilled); // true

// Edge cases
console.log([].every(x => x > 100)); // true  (vacuous truth)
console.log([].some(x => x > 100));  // false`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'other',
        heading_ru: 'sort, flat и includes: дополнительные методы',
        heading_en: 'sort, flat and includes: additional methods',
        text_ru: 'sort сортирует массив на месте (мутирует его!) и по умолчанию сравнивает элементы как строки. Для числовой сортировки обязательно передавайте компаратор (a, b) => a - b. Чтобы не мутировать исходный массив, создайте копию: [...arr].sort(...).\n\nflat разворачивает вложенные массивы на заданную глубину (по умолчанию 1). flat(Infinity) разворачивает полностью. includes проверяет наличие значения в массиве и возвращает булево — удобная альтернатива indexOf !== -1. Все три метода часто используются в реальных задачах: сортировка таблиц, нормализация вложенных данных с сервера, проверка членства.',
        text_en: 'sort sorts the array in-place (mutates it!) and by default compares elements as strings. For numeric sorting always pass a comparator (a, b) => a - b. To avoid mutating the original array, create a copy first: [...arr].sort(...).\n\nflat flattens nested arrays to a given depth (default 1). flat(Infinity) flattens completely. includes checks whether a value is present in the array and returns a boolean — a convenient alternative to indexOf !== -1. All three methods appear frequently in real tasks: sorting tables, normalising nested data from a server, and membership checks.',
        code: `// --- sort ---
const nums = [10, 1, 21, 3];

// Wrong: lexicographic sort (treats numbers as strings)
console.log([...nums].sort());          // [1, 10, 21, 3] ← incorrect!

// Correct: numeric comparator
console.log([...nums].sort((a, b) => a - b)); // [1, 3, 10, 21]
console.log([...nums].sort((a, b) => b - a)); // [21, 10, 3, 1] descending

// Sort objects by a property
const people = [{ name: 'Zara', age: 30 }, { name: 'Ana', age: 25 }];
const byName = [...people].sort((a, b) => a.name.localeCompare(b.name));
console.log(byName.map(p => p.name)); // ['Ana', 'Zara']

// --- flat ---
const nested = [1, [2, 3], [4, [5, [6]]]];
console.log(nested.flat());          // [1, 2, 3, 4, [5, [6]]]
console.log(nested.flat(2));         // [1, 2, 3, 4, 5, [6]]
console.log(nested.flat(Infinity));  // [1, 2, 3, 4, 5, 6]

// --- includes ---
const roles = ['admin', 'editor', 'viewer'];
console.log(roles.includes('editor')); // true
console.log(roles.includes('owner'));  // false`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'chaining',
        heading_ru: 'Цепочки методов',
        heading_en: 'Method chaining',
        text_ru: 'Поскольку map и filter возвращают новые массивы, их можно объединять в цепочки. Читайте слева направо: сначала фильтруем, потом трансформируем.',
        text_en: 'Since map and filter return new arrays, they can be chained together. Read left to right: first filter, then transform.',
        code: `const students = [\n  { name:'Ana', grade:88, active:true },\n  { name:'Ben', grade:55, active:false },\n  { name:'Cara', grade:92, active:true },\n];\n\nconst topNames = students\n  .filter(s => s.active)\n  .filter(s => s.grade >= 80)\n  .map(s => s.name);\n\nconsole.log(topNames); // ['Ana','Cara']`,
        codeLang: 'javascript',
      },
    ],
  },
  editorTask: {
    title_ru: 'Обработка списка товаров',
    title_en: 'Process a product list',
    instructions_ru: 'У вас есть массив товаров. Используйте filter, map и reduce чтобы: 1) Оставить только товары дороже 20$. 2) Добавить к ним скидку 10%. 3) Посчитать итоговую сумму.',
    instructions_en: 'You have an array of products. Use filter, map and reduce to: 1) Keep only items over $20. 2) Apply a 10% discount. 3) Calculate the total cost.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `const products = [\n  { name: 'Coffee', price: 12 },\n  { name: 'Notebook', price: 35 },\n  { name: 'Pen', price: 5 },\n  { name: 'Backpack', price: 75 },\n  { name: 'Eraser', price: 2 },\n  { name: 'Headphones', price: 120 },\n];\n\n// Step 1: filter items over $20\nconst expensive = products.filter(/* your code */);\n\n// Step 2: apply 10% discount with map\nconst discounted = expensive.map(/* your code */);\n\n// Step 3: calculate total with reduce\nconst total = discounted.reduce(/* your code */, 0);\n\nconsole.log('Discounted items:', discounted);\nconsole.log('Total: $' + total.toFixed(2));`,
    },
    hints_ru: [
      'filter принимает функцию: p => p.price > 20',
      'map для скидки: p => ({ ...p, price: p.price * 0.9 })',
      'reduce для суммы: (acc, p) => acc + p.price',
    ],
    hints_en: [
      'filter takes a function: p => p.price > 20',
      'map for discount: p => ({ ...p, price: p.price * 0.9 })',
      'reduce for total: (acc, p) => acc + p.price',
    ],
  },
  keyTerms: [
    { term_ru: 'Метод высшего порядка', term_en: 'Higher-order method', definition_ru: 'Метод, принимающий функцию в качестве аргумента', definition_en: 'A method that accepts a function as an argument', example_ru: 'arr.map(fn), arr.filter(fn)', example_en: 'arr.map(fn), arr.filter(fn)' },
    { term_ru: 'Коллбэк', term_en: 'Callback', definition_ru: 'Функция, переданная как аргумент другой функции', definition_en: 'A function passed as an argument to another function', example_ru: 'arr.filter(x => x > 0) — стрелочная функция как коллбэк', example_en: 'arr.filter(x => x > 0) — arrow function as callback' },
    { term_ru: 'Аккумулятор', term_en: 'Accumulator', definition_ru: 'Переменная в reduce, накапливающая результат', definition_en: 'The variable in reduce that accumulates the result', example_ru: 'reduce((acc, cur) => acc + cur, 0)', example_en: 'reduce((acc, cur) => acc + cur, 0)' },
    { term_ru: 'Иммутабельность', term_en: 'Immutability', definition_ru: 'Принцип: не изменять исходные данные, а возвращать новые', definition_en: 'Principle: do not mutate source data, return new data', example_ru: 'map и filter не меняют исходный массив', example_en: 'map and filter do not change the original array' },
    { term_ru: 'Цепочка методов', term_en: 'Method chaining', definition_ru: 'Вызов нескольких методов подряд через точку', definition_en: 'Calling multiple methods in sequence with dot notation', example_ru: 'arr.filter(fn).map(fn).reduce(fn)', example_en: 'arr.filter(fn).map(fn).reduce(fn)' },
  ],
  didYouKnow: [
    { text_ru: 'reduce настолько мощный, что с его помощью можно реализовать map и filter — он является фундаментальной операцией свёртки.', text_en: 'reduce is so powerful that map and filter can both be implemented using it — it is the fundamental fold operation.' },
    { text_ru: 'sort без компаратора преобразует элементы в строки! Поэтому [10,2,1].sort() даёт [1,10,2] — всегда передавайте (a,b) => a-b.', text_en: 'sort without a comparator converts elements to strings! That is why [10,2,1].sort() gives [1,10,2] — always pass (a,b) => a-b.' },
  ],
  quiz: [
    { id: 'q1', text_ru: 'Какой метод создаёт новый массив, трансформируя каждый элемент?', text_en: 'Which method creates a new array by transforming each element?', options_ru: ['filter', 'reduce', 'map', 'find'], options_en: ['filter', 'reduce', 'map', 'find'], correctIndex: 2, explanation_ru: 'map применяет функцию к каждому элементу и возвращает новый массив той же длины.', explanation_en: 'map applies a function to each element and returns a new array of the same length.' },
    { id: 'q2', text_ru: 'Что вернёт [1,2,3].filter(x => x > 1)?', text_en: 'What does [1,2,3].filter(x => x > 1) return?', options_ru: ['[1]', '[2,3]', '[1,2,3]', 'undefined'], options_en: ['[1]', '[2,3]', '[1,2,3]', 'undefined'], correctIndex: 1, explanation_ru: 'filter оставляет только элементы, для которых условие истинно. 2 и 3 больше 1.', explanation_en: 'filter keeps only elements where the condition is true. 2 and 3 are greater than 1.' },
    { id: 'q3', text_ru: 'В чём разница между forEach и map?', text_en: 'What is the difference between forEach and map?', options_ru: ['forEach быстрее', 'map возвращает новый массив, forEach — нет', 'forEach принимает функцию, map — нет', 'Разницы нет'], options_en: ['forEach is faster', 'map returns a new array, forEach does not', 'forEach takes a function, map does not', 'There is no difference'], correctIndex: 1, explanation_ru: 'map возвращает новый массив, forEach всегда возвращает undefined.', explanation_en: 'map returns a new array, forEach always returns undefined.' },
    { id: 'q4', text_ru: 'Что вернёт [5,3,8].find(x => x > 4)?', text_en: 'What does [5,3,8].find(x => x > 4) return?', options_ru: ['[5,8]', '5', '8', 'true'], options_en: ['[5,8]', '5', '8', 'true'], correctIndex: 1, explanation_ru: 'find возвращает первый элемент, удовлетворяющий условию. 5 — первое число больше 4.', explanation_en: 'find returns the first element satisfying the condition. 5 is the first number greater than 4.' },
    { id: 'q5', text_ru: 'Как безопасно отсортировать массив чисел по возрастанию?', text_en: 'How do you safely sort an array of numbers in ascending order?', options_ru: ['arr.sort()', 'arr.sort((a,b) => a-b)', 'arr.filter(sort)', 'arr.map(sort)'], options_en: ['arr.sort()', 'arr.sort((a,b) => a-b)', 'arr.filter(sort)', 'arr.map(sort)'], correctIndex: 1, explanation_ru: 'Без компаратора sort сравнивает как строки. (a,b) => a-b задаёт числовую сортировку по возрастанию.', explanation_en: 'Without a comparator sort compares as strings. (a,b) => a-b sets numeric ascending sort.' },
  ],
}
