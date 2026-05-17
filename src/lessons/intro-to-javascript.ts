import type { MultipleChoiceRow } from '@/types/lesson'

export const introToJavascript = {
  slug: 'intro-to-javascript',
  title: 'Введение в JavaScript',
  readTime: 10,
  sections: [
    { id: 'what-is-js', title: 'Что такое JavaScript?' },
    { id: 'variables', title: 'Переменные' },
    { id: 'data-types', title: 'Типы данных' },
    { id: 'console', title: 'console.log' },
    { id: 'operators', title: 'Операторы' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `JavaScript — это язык программирования, который делает веб-страницы интерактивными.
HTML создаёт структуру, CSS добавляет стиль, а JavaScript — это «мозг» страницы: кнопки нажимаются,
анимации играют, данные отправляются. JS работает прямо в браузере — никакой установки не нужно!`,

    variables: {
      description: 'Переменная — это именованное хранилище для данных. Создаётся через let или const:',
      code: `let name = "Алиса";     // let — можно изменить
const age = 12;          // const — нельзя изменить
let score = 0;

name = "Боб";            // ✅ Работает (let)
// age = 13;             // ❌ Ошибка (const нельзя менять)`,
      items: [
        { name: 'let', description: 'Переменная, значение которой можно изменить', example: 'let count = 0; count = 1;' },
        { name: 'const', description: 'Константа — значение нельзя переприсвоить', example: 'const PI = 3.14;' },
        { name: 'var', description: 'Устаревший способ объявления (лучше не использовать)', example: 'var x = 5;' },
      ],
    },

    dataTypes: {
      description: 'В JavaScript есть 7 основных типов данных:',
      items: [
        { name: 'String (строка)', description: 'Текст в кавычках', example: 'let name = "Привет"; let msg = \'мир\';' },
        { name: 'Number (число)', description: 'Целые и дробные числа', example: 'let age = 14; let price = 99.9;' },
        { name: 'Boolean (булев)', description: 'Только true или false', example: 'let isLoggedIn = true;' },
        { name: 'null', description: 'Намеренное отсутствие значения', example: 'let user = null;' },
        { name: 'undefined', description: 'Переменная объявлена, но значение не задано', example: 'let x; // x === undefined' },
        { name: 'Array (массив)', description: 'Список значений', example: 'let colors = ["red", "blue", "green"];' },
        { name: 'Object (объект)', description: 'Набор пар ключ: значение', example: 'let person = { name: "Аня", age: 13 };' },
      ],
    },

    console: {
      description: 'console.log() выводит информацию в консоль браузера. Незаменим для отладки:',
      code: `console.log("Привет, мир!"); // Строка
console.log(42);              // Число
console.log(true);            // Boolean

let name = "Аня";
let age = 13;
console.log(name, age);               // Аня 13
console.log(\`Меня зовут \${name}\`);   // Шаблонная строка`,
    },

    operators: {
      description: 'Арифметические и операторы сравнения:',
      items: [
        { name: '+ - * / %', description: 'Сложение, вычитание, умножение, деление, остаток', example: '5 + 3  // 8\n10 % 3 // 1' },
        { name: '===', description: 'Строгое равенство (проверяет и значение, и тип)', example: '5 === 5  // true\n5 === "5" // false' },
        { name: '!==', description: 'Строгое неравенство', example: '5 !== 3  // true' },
        { name: '> >= < <=', description: 'Больше, больше или равно, меньше, меньше или равно', example: '10 > 5   // true' },
        { name: '+=, -=, ++, --', description: 'Присваивающие операторы', example: 'count += 1; count++;' },
      ],
    },
  },

  keyTerms: [
    { term: 'Переменная', definition: 'Именованная ячейка памяти для хранения данных.', example: 'let score = 100;' },
    { term: 'let', definition: 'Ключевое слово для объявления изменяемой переменной.' },
    { term: 'const', definition: 'Ключевое слово для объявления неизменяемой константы.' },
    { term: 'Тип данных', definition: 'Вид данных: строка, число, булев, null, undefined, массив, объект.' },
    { term: 'console.log()', definition: 'Функция для вывода данных в консоль браузера. Незаменима при отладке.' },
    { term: '=== (строгое равенство)', definition: 'Сравнивает значение И тип. Рекомендуется вместо == (нестрогого).' },
  ],

  didYouKnow: [
    'JavaScript был создан за 10 дней в 1995 году программистом Бренданом Эйком. Несмотря на это, он стал самым популярным языком в мире!',
    'JavaScript и Java — это совершенно разные языки. Их схожесть в названии — просто маркетинговый трюк 1990-х.',
    'Консоль браузера открывается клавишей F12 — это твой лучший друг при изучении JavaScript!',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание основ JavaScript.',
    rows: [
      {
        id: 'q1',
        question: 'Чем let отличается от const?',
        options: ['let быстрее', 'const можно изменить, let — нет', 'let можно изменить, const — нельзя переприсвоить', 'Они одинаковы'],
        correctIndex: 2,
      },
      {
        id: 'q2',
        question: 'Какой тип данных у значения true?',
        options: ['String', 'Number', 'Boolean', 'Null'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        question: 'Что выведет console.log(5 + "3")?',
        options: ['8', '"53"', '53', 'Ошибку'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        question: 'Почему 5 === "5" возвращает false?',
        options: ['Это ошибка в JavaScript', 'Потому что === проверяет и тип, и значение', 'Потому что строки нельзя сравнивать', 'Это верно только для чисел'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'Как объявить переменную с именем score и значением 0?',
        options: ['variable score = 0;', 'let score = 0;', 'score := 0;', 'set score 0;'],
        correctIndex: 1,
      },
    ] as MultipleChoiceRow[],
  },
}
