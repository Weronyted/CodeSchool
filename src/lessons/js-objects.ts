import type { Lesson } from '@/types/lesson'

export const jsObjects: Lesson = {
  slug: 'js-objects',
  category: 'JS',
  icon: '🗂️',
  readTime: 11,
  title_ru: 'Объекты в JavaScript',
  title_en: 'JavaScript Objects',
  description_ru: 'Освойте объекты: создание, доступ к свойствам, методы, деструктуризацию, spread и опциональную цепочку.',
  description_en: 'Master objects: creation, property access, methods, destructuring, spread and optional chaining.',
  sections: [
    { id: 'literals', title_ru: 'Объектные литералы', title_en: 'Object literals' },
    { id: 'access', title_ru: 'Доступ к свойствам', title_en: 'Accessing properties' },
    { id: 'methods', title_ru: 'Методы объекта', title_en: 'Object methods' },
    { id: 'builtin', title_ru: 'Object.keys/values/entries', title_en: 'Object.keys/values/entries' },
    { id: 'destructuring', title_ru: 'Деструктуризация', title_en: 'Destructuring' },
    { id: 'spread', title_ru: 'Spread-оператор', title_en: 'Spread operator' },
    { id: 'optional-chain', title_ru: 'Опциональная цепочка', title_en: 'Optional chaining' },
  ],
  slides: [
    {
      id: 'title-slide',
      type: 'title',
      title_ru: 'Объекты в JavaScript',
      title_en: 'JavaScript Objects',
      body_ru: 'Объект — это коллекция пар ключ-значение. Они являются основой JavaScript и описывают всё вокруг.',
      body_en: 'An object is a collection of key-value pairs. They are the foundation of JavaScript and describe everything around you.',
      visual: { kind: 'emoji', emojis: ['🗂️', '🔑', '📦'], caption_ru: 'Ключи, значения, структура', caption_en: 'Keys, values, structure' },
    },
    {
      id: 'concept-literal',
      type: 'concept',
      title_ru: 'Объектный литерал',
      title_en: 'Object literal',
      body_ru: 'Объект создаётся с помощью фигурных скобок {}. Каждое свойство — пара "ключ: значение", разделённые запятыми.',
      body_en: 'An object is created with curly braces {}. Each property is a "key: value" pair separated by commas.',
      code: `const person = {\n  name: 'Alice',\n  age: 28,\n  city: 'Moscow',\n  isStudent: false,\n};\n\nconsole.log(person); // { name:'Alice', age:28, ... }`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-access',
      type: 'concept',
      title_ru: 'Доступ к свойствам',
      title_en: 'Accessing properties',
      body_ru: 'Есть два способа: через точку (obj.key) и через квадратные скобки (obj["key"]). Скобки нужны для динамических ключей.',
      body_en: 'There are two ways: dot notation (obj.key) and bracket notation (obj["key"]). Brackets are needed for dynamic keys.',
      code: `const car = { brand: 'Toyota', model: 'Camry', year: 2022 };\n\n// Dot notation\nconsole.log(car.brand); // 'Toyota'\n\n// Bracket notation\nconsole.log(car['model']); // 'Camry'\n\n// Dynamic key\nconst key = 'year';\nconsole.log(car[key]); // 2022`,
      codeLang: 'javascript',
    },
    {
      id: 'compare-notation',
      type: 'compare',
      title_ru: 'Точечная vs скобочная нотация',
      title_en: 'Dot notation vs bracket notation',
      body_ru: 'Выбирайте точечную нотацию по умолчанию; скобочную — когда ключ динамический или содержит спецсимволы.',
      body_en: 'Use dot notation by default; use bracket notation when the key is dynamic or contains special characters.',
      compareLeft: {
        label_ru: 'Точечная нотация obj.key',
        label_en: 'Dot notation obj.key',
        items_ru: ['Короче и читаемее', 'Ключ должен быть известен заранее', 'Ключ — валидный идентификатор', 'obj.name, obj.age'],
        items_en: ['Shorter and more readable', 'Key must be known in advance', 'Key must be a valid identifier', 'obj.name, obj.age'],
        color: 'green',
      },
      compareRight: {
        label_ru: 'Скобочная нотация obj["key"]',
        label_en: 'Bracket notation obj["key"]',
        items_ru: ['Для динамических ключей', 'Ключ может содержать пробелы', 'Вычисляется во время выполнения', 'obj[variable], obj["first-name"]'],
        items_en: ['For dynamic keys', 'Key can contain spaces', 'Evaluated at runtime', 'obj[variable], obj["first-name"]'],
        color: 'blue',
      },
    },
    {
      id: 'concept-methods',
      type: 'concept',
      title_ru: 'Методы — функции как значения',
      title_en: 'Methods — functions as values',
      body_ru: 'Когда значением свойства является функция, это называется методом. Внутри метода this ссылается на объект.',
      body_en: 'When a property value is a function, it is called a method. Inside a method, this refers to the object.',
      code: `const user = {\n  name: 'Bob',\n  age: 30,\n  greet() {\n    return \`Hi, I'm \${this.name} and I'm \${this.age}\`;\n  },\n  birthday() {\n    this.age += 1;\n  },\n};\n\nconsole.log(user.greet()); // "Hi, I'm Bob and I'm 30"\nuser.birthday();\nconsole.log(user.age); // 31`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-builtin',
      type: 'concept',
      title_ru: 'Object.keys, values, entries',
      title_en: 'Object.keys, values, entries',
      body_ru: 'Статические методы Object позволяют получить ключи, значения или пары ключ-значение в виде массивов.',
      body_en: 'Static Object methods let you get keys, values, or key-value pairs as arrays.',
      code: `const config = { theme: 'dark', lang: 'ru', fontSize: 16 };\n\nconsole.log(Object.keys(config));   // ['theme','lang','fontSize']\nconsole.log(Object.values(config)); // ['dark','ru',16]\nconsole.log(Object.entries(config));\n// [['theme','dark'],['lang','ru'],['fontSize',16]]\n\n// Iterate with entries\nObject.entries(config).forEach(([key, val]) => {\n  console.log(\`\${key}: \${val}\`);\n});`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-destructuring',
      type: 'concept',
      title_ru: 'Деструктуризация объектов',
      title_en: 'Object destructuring',
      body_ru: 'Деструктуризация позволяет извлекать свойства объекта в переменные одной строкой. Можно задавать псевдонимы и значения по умолчанию.',
      body_en: 'Destructuring lets you extract object properties into variables in one line. You can set aliases and default values.',
      code: `const product = { name: 'Laptop', price: 999, inStock: true };\n\n// Basic destructuring\nconst { name, price } = product;\nconsole.log(name, price); // 'Laptop' 999\n\n// Alias (rename)\nconst { name: productName } = product;\nconsole.log(productName); // 'Laptop'\n\n// Default value\nconst { color = 'silver' } = product;\nconsole.log(color); // 'silver' (key doesn't exist)\n\n// In function params\nfunction display({ name, price }) {\n  return \`\${name}: $\${price}\`;\n}\nconsole.log(display(product)); // 'Laptop: $999'`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-spread',
      type: 'concept',
      title_ru: 'Spread-оператор для объектов',
      title_en: 'Spread operator for objects',
      body_ru: 'Оператор ... позволяет копировать и объединять объекты. Свойства правее перезаписывают свойства левее.',
      body_en: 'The ... operator lets you copy and merge objects. Properties on the right overwrite those on the left.',
      code: `const base = { theme: 'light', lang: 'en', fontSize: 14 };\n\n// Copy\nconst copy = { ...base };\n\n// Override some fields\nconst custom = { ...base, theme: 'dark', fontSize: 18 };\nconsole.log(custom); // { theme:'dark', lang:'en', fontSize:18 }\n\n// Merge two objects\nconst extra = { notifications: true };\nconst merged = { ...base, ...extra };\nconsole.log(merged); // all fields combined`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-optional-chain',
      type: 'concept',
      title_ru: 'Опциональная цепочка ?.',
      title_en: 'Optional chaining ?.',
      body_ru: 'Оператор ?. прерывает обращение к свойству, если значение равно null или undefined, вместо того чтобы вызвать ошибку.',
      body_en: 'The ?. operator short-circuits property access if the value is null or undefined, instead of throwing an error.',
      code: `const user = {\n  name: 'Alice',\n  address: {\n    city: 'Berlin',\n  },\n};\n\n// Without optional chaining → crashes if address missing\n// console.log(user.address.zip.code); // TypeError!\n\n// With optional chaining\nconsole.log(user.address?.zip);       // undefined (no crash)\nconsole.log(user.address?.zip?.code); // undefined\nconsole.log(user.profile?.bio ?? 'No bio'); // 'No bio'`,
      codeLang: 'javascript',
    },
    {
      id: 'anim-object',
      type: 'code-anim',
      title_ru: 'Строим объект пользователя шаг за шагом',
      title_en: 'Building a user object step by step',
      body_ru: 'От пустого объекта к полноценному — добавляем метод и деструктурируем.',
      body_en: 'From empty object to a full one — adding a method and destructuring.',
      animMode: 'console',
      animSteps: [
        {
          code: `const user = { name: 'Maria', age: 25, role: 'developer' };`,
          comment_ru: 'Создаём объект пользователя',
          comment_en: 'Create a user object',
          output: '',
        },
        {
          code: `const user = { name: 'Maria', age: 25, role: 'developer' };\nuser.greet = function() {\n  return \`Hi, I'm \${this.name}, a \${this.role}!\`;\n};\nconsole.log(user.greet());`,
          comment_ru: 'Добавляем метод и вызываем его',
          comment_en: 'Add a method and call it',
          output: "Hi, I'm Maria, a developer!",
        },
        {
          code: `const user = { name: 'Maria', age: 25, role: 'developer' };\nuser.greet = function() { return \`Hi, I'm \${this.name}!\`; };\nconst { name, age } = user;\nconsole.log(name, age);`,
          comment_ru: 'Деструктурируем нужные поля',
          comment_en: 'Destructure the needed fields',
          output: 'Maria 25',
        },
        {
          code: `const user = { name: 'Maria', age: 25, role: 'developer' };\nconst updated = { ...user, age: 26, city: 'Kyiv' };\nconsole.log(updated);`,
          comment_ru: 'Spread создаёт обновлённую копию',
          comment_en: 'Spread creates an updated copy',
          output: '{ name: "Maria", age: 26, role: "developer", city: "Kyiv" }',
        },
      ],
    },
    {
      id: 'tip-ref',
      type: 'tip',
      title_ru: 'Объекты передаются по ссылке',
      title_en: 'Objects are passed by reference',
      body_ru: 'const user = anotherUser не копирует объект — оба имени указывают на один и тот же объект в памяти. Используйте spread ({...obj}) для создания копии.',
      body_en: 'const user = anotherUser does not copy the object — both names point to the same object in memory. Use spread ({...obj}) to create a copy.',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Практика',
      title_en: 'Practice',
      body_ru: 'Создайте объект-профиль и попрактикуйтесь с деструктуризацией и spread.',
      body_en: 'Create a profile object and practice destructuring and spread.',
    },
  ],
  content: {
    intro_ru: 'Объекты — фундамент JavaScript. Практически всё в JS является объектом: массивы, функции, DOM-элементы. Понимание объектов открывает путь к продвинутому программированию.',
    intro_en: 'Objects are the foundation of JavaScript. Almost everything in JS is an object: arrays, functions, DOM elements. Understanding objects opens the path to advanced programming.',
    blocks: [
      {
        sectionId: 'literals',
        heading_ru: 'Создание объектов: литералы и вычисляемые ключи',
        heading_en: 'Creating objects: literals and computed keys',
        text_ru: 'Объектный литерал — самый удобный способ создать объект в JavaScript. Вы просто перечисляете пары «ключ: значение» в фигурных скобках. Значениями могут быть любые типы данных: строки, числа, булевы значения, массивы, другие объекты и даже функции.\n\nES6 добавил несколько удобных сокращений. Сокращённые свойства позволяют не повторять имя переменной: если переменная называется так же, как ключ, достаточно написать просто имя. Вычисляемые ключи в квадратных скобках позволяют динамически задавать имя поля во время создания объекта.',
        text_en: 'An object literal is the most convenient way to create an object in JavaScript. You simply list key-value pairs inside curly braces. Values can be any data type: strings, numbers, booleans, arrays, other objects, and even functions.\n\nES6 added several handy shorthand notations. Shorthand properties let you avoid repeating a variable name: if the variable has the same name as the key, you can simply write the name alone. Computed keys in square brackets let you dynamically set a field name at the time the object is created.',
        code: `// Basic object literal
const person = {
  name: 'Alice',
  age: 28,
  isStudent: false,
  hobbies: ['reading', 'coding'],
};

// Shorthand properties (ES6)
const name = 'Bob';
const age = 32;
const user = { name, age }; // same as { name: name, age: age }

// Computed keys (ES6)
const field = 'score';
const game = { [field]: 100 };
console.log(game.score); // 100`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'access',
        heading_ru: 'Чтение, запись и удаление свойств',
        heading_en: 'Reading, writing and deleting properties',
        text_ru: 'Получить значение свойства можно двумя способами: через точку (obj.key) и через квадратные скобки (obj["key"]). Точечная нотация короче и читабельнее — используйте её по умолчанию. Скобочная нотация нужна, когда ключ вычисляется динамически, содержит пробелы или спецсимволы.\n\nДля записи нового или изменения существующего свойства используется обычное присваивание. Оператор delete полностью удаляет свойство из объекта. Оператор in позволяет проверить, существует ли свойство, не обращаясь к его значению.',
        text_en: 'You can read a property value in two ways: dot notation (obj.key) and bracket notation (obj["key"]). Dot notation is shorter and more readable — use it by default. Bracket notation is needed when the key is computed dynamically, or contains spaces or special characters.\n\nTo write a new or update an existing property, use a simple assignment. The delete operator completely removes a property from the object. The in operator lets you check whether a property exists without accessing its value.',
        code: `const car = { brand: 'Toyota', model: 'Camry', year: 2022 };

// Read
console.log(car.brand);     // 'Toyota'
console.log(car['model']);  // 'Camry'

// Dynamic key
const prop = 'year';
console.log(car[prop]);     // 2022

// Write / update
car.color = 'blue';         // add new property
car.year = 2023;            // update existing

// Delete
delete car.color;
console.log('color' in car); // false

// Check existence
console.log('brand' in car); // true`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'methods',
        heading_ru: 'Методы и ключевое слово this',
        heading_en: 'Methods and the this keyword',
        text_ru: 'Метод — это функция, которая является значением свойства объекта. Внутри метода ключевое слово this ссылается на сам объект, что позволяет методу читать и изменять другие его свойства.\n\nES6 ввёл сокращённый синтаксис метода: вместо greet: function() { } можно писать greet() { }. Важно помнить, что стрелочные функции не имеют собственного this — они захватывают this из окружающего контекста, поэтому для методов объекта используйте обычные функции или сокращённый синтаксис.',
        text_en: 'A method is a function that is the value of an object property. Inside a method, the keyword this refers to the object itself, allowing the method to read and modify its other properties.\n\nES6 introduced shorthand method syntax: instead of greet: function() { } you can write greet() { }. It is important to remember that arrow functions do not have their own this — they capture this from the surrounding context, so for object methods use regular functions or shorthand syntax.',
        code: `const user = {
  name: 'Maria',
  age: 25,
  // Shorthand method syntax (ES6)
  greet() {
    return \`Hi, I'm \${this.name}!\`;
  },
  birthday() {
    this.age += 1;
    return this.age;
  },
};

console.log(user.greet());    // "Hi, I'm Maria!"
console.log(user.birthday()); // 26
console.log(user.age);        // 26

// Arrow function: this is NOT the object
const obj = {
  val: 42,
  wrong: () => console.log(this?.val), // undefined
  correct() { console.log(this.val); }, // 42
};`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'builtin',
        heading_ru: 'Итерация по объектам с Object.keys/values/entries',
        heading_en: 'Iterating over objects with Object.keys/values/entries',
        text_ru: 'В отличие от массивов, объекты не имеют встроенного итератора. Три статических метода Object решают эту задачу. Object.keys() возвращает массив строк-ключей, Object.values() — массив значений, а Object.entries() — массив пар [ключ, значение].\n\nМетод Object.fromEntries() — обратная операция: он превращает массив пар обратно в объект. Это особенно удобно, когда нужно трансформировать объект через map или filter, которые работают с массивами.',
        text_en: 'Unlike arrays, objects do not have a built-in iterator. Three static Object methods solve this. Object.keys() returns an array of string keys, Object.values() returns an array of values, and Object.entries() returns an array of [key, value] pairs.\n\nObject.fromEntries() is the reverse operation: it turns an array of pairs back into an object. This is particularly useful when you need to transform an object via map or filter, which work with arrays.',
        code: `const config = { theme: 'dark', lang: 'ru', fontSize: 16 };

console.log(Object.keys(config));
// ['theme', 'lang', 'fontSize']

console.log(Object.values(config));
// ['dark', 'ru', 16]

console.log(Object.entries(config));
// [['theme','dark'], ['lang','ru'], ['fontSize',16]]

// Iterate with for...of + destructuring
for (const [key, value] of Object.entries(config)) {
  console.log(\`\${key} = \${value}\`);
}

// Transform: double all numeric values
const scaled = Object.fromEntries(
  Object.entries(config).map(([k, v]) =>
    [k, typeof v === 'number' ? v * 2 : v]
  )
);
console.log(scaled.fontSize); // 32`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'optional-chain',
        heading_ru: 'Опциональная цепочка и оператор нулевого слияния',
        heading_en: 'Optional chaining and nullish coalescing',
        text_ru: 'Оператор ?. (optional chaining) позволяет безопасно обращаться к вложенным свойствам, не зная наверняка, существуют ли промежуточные объекты. Вместо того чтобы вызвать TypeError, выражение возвращает undefined.\n\nОператор ?? (nullish coalescing) дополняет ?.: он возвращает правый операнд, если левый равен null или undefined. В отличие от ||, оператор ?? не заменяет ложные значения вроде 0 или пустой строки, что делает его более точным инструментом для задания значений по умолчанию.',
        text_en: 'The ?. operator (optional chaining) lets you safely access nested properties without knowing whether intermediate objects exist. Instead of throwing a TypeError, the expression returns undefined.\n\nThe ?? operator (nullish coalescing) complements ?.: it returns the right operand when the left is null or undefined. Unlike ||, the ?? operator does not replace falsy values like 0 or empty string, making it a more precise tool for setting default values.',
        code: `const user = {
  name: 'Alice',
  address: { city: 'Berlin' },
};

// Without ?. → crashes if address is missing
// user.address.zip.code  // TypeError!

// With ?.  → returns undefined safely
console.log(user.address?.zip);       // undefined
console.log(user.address?.zip?.code); // undefined
console.log(user.profile?.bio);       // undefined

// Optional method call
const arr = null;
console.log(arr?.map(x => x * 2));    // undefined (no crash)

// Nullish coalescing ?? for defaults
const lang = user.settings?.lang ?? 'en'; // 'en'
const count = user.stats?.count ?? 0;     // 0

// ?? vs ||: difference with falsy values
console.log(0 || 'default');   // 'default' (wrong!)
console.log(0 ?? 'default');   // 0          (correct)`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'destructuring',
        heading_ru: 'Деструктуризация в параметрах функции',
        heading_en: 'Destructuring in function parameters',
        text_ru: 'Одно из самых частых применений деструктуризации — в параметрах функций. Это делает API функций чище и самодокументированными.',
        text_en: 'One of the most common uses of destructuring is in function parameters. This makes function APIs cleaner and self-documenting.',
        code: `// Instead of this:\nfunction greet(user) {\n  return 'Hi ' + user.name + ', age ' + user.age;\n}\n\n// Write this:\nfunction greet({ name, age }) {\n  return \`Hi \${name}, age \${age}\`;\n}\n\ngreet({ name: 'Leo', age: 22 }); // 'Hi Leo, age 22'`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'spread',
        heading_ru: 'Иммутабельное обновление объектов',
        heading_en: 'Immutable object updates',
        text_ru: 'В современном коде (React, Redux) принято не изменять объекты напрямую, а создавать обновлённые копии через spread.',
        text_en: 'In modern code (React, Redux) it is conventional not to mutate objects directly, but to create updated copies via spread.',
        code: `// Avoid mutation:\nconst state = { count: 0, name: 'App' };\nstate.count = 1; // BAD — mutates!\n\n// Prefer immutability:\nconst newState = { ...state, count: 1 }; // GOOD`,
        codeLang: 'javascript',
      },
    ],
  },
  editorTask: {
    title_ru: 'Профиль пользователя',
    title_en: 'User profile',
    instructions_ru: 'Создайте объект профиля с методом. Используйте деструктуризацию и spread для обновления. Выведите результат через Object.entries.',
    instructions_en: 'Create a profile object with a method. Use destructuring and spread to update it. Print results using Object.entries.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `// Step 1: create profile object\nconst profile = {\n  firstName: 'Alex',\n  lastName: 'Smith',\n  age: 24,\n  skills: ['JS', 'HTML', 'CSS'],\n  // Step 2: add a method 'fullName' that returns firstName + lastName\n};\n\n// Step 3: destructure firstName and skills from profile\nconst { /* your code */ } = profile;\nconsole.log(firstName, skills);\n\n// Step 4: create a new profile with age updated to 25\nconst updatedProfile = { /* your code */ };\n\n// Step 5: print all keys and values using Object.entries\nObject.entries(updatedProfile).forEach(([key, value]) => {\n  console.log(\`\${key}: \${value}\`);\n});`,
    },
    hints_ru: [
      'Метод в объекте: fullName() { return this.firstName + " " + this.lastName; }',
      'Деструктуризация: const { firstName, skills } = profile;',
      'Spread: const updatedProfile = { ...profile, age: 25 };',
    ],
    hints_en: [
      'Method in object: fullName() { return this.firstName + " " + this.lastName; }',
      'Destructuring: const { firstName, skills } = profile;',
      'Spread: const updatedProfile = { ...profile, age: 25 };',
    ],
  },
  keyTerms: [
    { term_ru: 'Объектный литерал', term_en: 'Object literal', definition_ru: 'Создание объекта через {key: value}', definition_en: 'Creating an object via {key: value}', example_ru: 'const obj = { name: "Alex" }', example_en: 'const obj = { name: "Alex" }' },
    { term_ru: 'Метод', term_en: 'Method', definition_ru: 'Функция, являющаяся значением свойства объекта', definition_en: 'A function that is the value of an object property', example_ru: 'obj.greet() { return "Hi" }', example_en: 'obj.greet() { return "Hi" }' },
    { term_ru: 'Деструктуризация', term_en: 'Destructuring', definition_ru: 'Извлечение свойств объекта в переменные', definition_en: 'Extracting object properties into variables', example_ru: 'const { name, age } = user', example_en: 'const { name, age } = user' },
    { term_ru: 'Spread-оператор', term_en: 'Spread operator', definition_ru: 'Оператор ..., копирующий свойства объекта', definition_en: 'The ... operator that copies object properties', example_ru: 'const copy = { ...original }', example_en: 'const copy = { ...original }' },
    { term_ru: 'Опциональная цепочка', term_en: 'Optional chaining', definition_ru: 'Оператор ?., возвращающий undefined вместо ошибки', definition_en: 'The ?. operator returning undefined instead of an error', example_ru: 'user?.address?.city', example_en: 'user?.address?.city' },
  ],
  didYouKnow: [
    { text_ru: 'В JavaScript функции тоже являются объектами — у них есть свойства вроде .name и .length, и вы можете добавить им свои.', text_en: 'In JavaScript, functions are also objects — they have properties like .name and .length, and you can add your own.' },
    { text_ru: 'Ключи объекта в JavaScript всегда строки (или Symbol). Если написать { 1: "one" }, ключ будет строкой "1".', text_en: 'Object keys in JavaScript are always strings (or Symbol). If you write { 1: "one" }, the key will be the string "1".' },
  ],
  quiz: [
    { id: 'q1', text_ru: 'Как получить значение свойства с динамическим ключом?', text_en: 'How do you access a property with a dynamic key?', options_ru: ['obj.key', 'obj[key]', 'obj->key', 'obj::key'], options_en: ['obj.key', 'obj[key]', 'obj->key', 'obj::key'], correctIndex: 1, explanation_ru: 'Скобочная нотация obj[variable] позволяет использовать переменную как ключ.', explanation_en: 'Bracket notation obj[variable] allows using a variable as a key.' },
    { id: 'q2', text_ru: 'Что делает const { name } = user?', text_en: 'What does const { name } = user do?', options_ru: ['Создаёт объект name', 'Извлекает свойство name в переменную', 'Удаляет свойство name', 'Копирует объект'], options_en: ['Creates an object name', 'Extracts property name into a variable', 'Deletes the name property', 'Copies the object'], correctIndex: 1, explanation_ru: 'Это деструктуризация — создаёт переменную name со значением user.name.', explanation_en: 'This is destructuring — it creates a variable name with the value of user.name.' },
    { id: 'q3', text_ru: 'Что вернёт Object.keys({ a: 1, b: 2 })?', text_en: 'What does Object.keys({ a: 1, b: 2 }) return?', options_ru: ['[1, 2]', '["a", "b"]', '[["a",1],["b",2]]', 'undefined'], options_en: ['[1, 2]', '["a", "b"]', '[["a",1],["b",2]]', 'undefined'], correctIndex: 1, explanation_ru: 'Object.keys возвращает массив строк-ключей объекта.', explanation_en: 'Object.keys returns an array of the object\'s string keys.' },
    { id: 'q4', text_ru: 'Что произойдёт при user?.address?.city, если address равен undefined?', text_en: 'What happens with user?.address?.city if address is undefined?', options_ru: ['TypeError', 'null', 'undefined', '"undefined"'], options_en: ['TypeError', 'null', 'undefined', '"undefined"'], correctIndex: 2, explanation_ru: 'Опциональная цепочка возвращает undefined и не вызывает ошибку.', explanation_en: 'Optional chaining returns undefined and does not throw an error.' },
    { id: 'q5', text_ru: 'Как создать копию объекта obj с изменённым полем name?', text_en: 'How do you create a copy of obj with an updated name field?', options_ru: ['obj.name = "new"', 'Object.copy(obj)', '{ ...obj, name: "new" }', 'obj.clone()'], options_en: ['obj.name = "new"', 'Object.copy(obj)', '{ ...obj, name: "new" }', 'obj.clone()'], correctIndex: 2, explanation_ru: 'Spread {...obj, name:"new"} создаёт новый объект с обновлённым полем.', explanation_en: 'Spread {...obj, name:"new"} creates a new object with the updated field.' },
  ],
}
