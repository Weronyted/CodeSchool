import type { MultipleChoiceRow } from '@/types/lesson'

export const javascriptFunctions = {
  slug: 'javascript-functions',
  title: 'Функции JavaScript',
  readTime: 9,
  sections: [
    { id: 'what-is-function', title: 'Что такое функция?' },
    { id: 'declare', title: 'Объявление функции' },
    { id: 'params', title: 'Параметры и аргументы' },
    { id: 'return', title: 'Возврат значения' },
    { id: 'arrow', title: 'Стрелочные функции' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `Функция — это многоразовый блок кода, который выполняет определённую задачу. Вместо того
чтобы писать один и тот же код снова и снова, ты создаёшь функцию один раз и вызываешь
её когда угодно. Функции — это строительные блоки любой программы.`,

    declare: {
      description: 'Функция создаётся ключевым словом function:',
      code: `// Объявление функции
function greet() {
  console.log("Привет!");
  console.log("Как дела?");
}

// Вызов функции
greet(); // Привет! Как дела?
greet(); // Можно вызвать снова!`,
    },

    params: {
      description: 'Функции могут принимать входные данные через параметры:',
      code: `// name — это параметр (местозаполнитель)
function greet(name) {
  console.log("Привет, " + name + "!");
}

// "Аня" и "Боб" — это аргументы (конкретные значения)
greet("Аня");  // Привет, Аня!
greet("Боб");  // Привет, Боб!

// Несколько параметров
function add(a, b) {
  console.log(a + b);
}
add(3, 5);  // 8`,
    },

    return: {
      description: 'Функция может вернуть результат с помощью return:',
      code: `function multiply(a, b) {
  return a * b;  // Возвращает результат
}

let result = multiply(4, 5);
console.log(result);  // 20

// После return функция прекращает работу
function checkAge(age) {
  if (age < 18) {
    return "Несовершеннолетний";
  }
  return "Совершеннолетний";
}`,
    },

    arrow: {
      description: 'Стрелочная функция — более короткий синтаксис:',
      code: `// Обычная функция
function square(x) {
  return x * x;
}

// То же самое — стрелочная функция
const square = (x) => {
  return x * x;
};

// Ещё короче (если один return)
const square = (x) => x * x;

// Использование
console.log(square(5));  // 25`,
    },

    workedExamples: [
      {
        title: 'Пример: Калькулятор оценки',
        scenario: 'Напиши функцию, которая принимает процент и возвращает оценку (A/B/C/D/F).',
        solution: `function getGrade(percent) {
  if (percent >= 90) return "A";
  if (percent >= 80) return "B";
  if (percent >= 70) return "C";
  if (percent >= 60) return "D";
  return "F";
}

console.log(getGrade(95));  // A
console.log(getGrade(73));  // C
console.log(getGrade(55));  // F`,
      },
    ],
  },

  keyTerms: [
    { term: 'Функция', definition: 'Именованный блок кода, который выполняет задачу и может быть вызван многократно.' },
    { term: 'Параметр', definition: 'Переменная-местозаполнитель в объявлении функции. Получает значение при вызове.' },
    { term: 'Аргумент', definition: 'Конкретное значение, передаваемое в функцию при её вызове.' },
    { term: 'return', definition: 'Ключевое слово для возврата значения из функции. Прекращает её выполнение.' },
    { term: 'Стрелочная функция', definition: 'Сокращённый синтаксис функции: const fn = (x) => x * 2;' },
  ],

  didYouKnow: [
    'В JavaScript функции — это объекты! Их можно хранить в переменных, передавать как аргументы и возвращать из других функций.',
    'Функция без оператора return возвращает undefined.',
    'Рекурсия — это когда функция вызывает саму себя. Это позволяет решать сложные задачи элегантно.',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание функций JavaScript.',
    rows: [
      {
        id: 'q1',
        question: 'Что такое параметр функции?',
        options: ['Результат функции', 'Переменная-местозаполнитель в объявлении', 'Тип функции', 'Имя функции'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Что вернёт функция без оператора return?',
        options: ['0', 'null', 'undefined', 'Ошибку'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        question: 'Как записать стрелочную функцию для (x) => x * 2 в полном виде?',
        options: ['function arrow(x) { return x * 2 }', 'function(x) { return x * 2 }', 'const fn = function(x) { x * 2 }', 'fn = x: x * 2'],
        correctIndex: 0,
      },
      {
        id: 'q4',
        question: 'Что произойдёт после выполнения return в функции?',
        options: ['Функция начнётся заново', 'Функция прекращает выполнение', 'Появится ошибка', 'Код продолжится'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'Сколько раз можно вызвать одну функцию?',
        options: ['Только 1 раз', 'Только 2 раза', 'Максимум 100 раз', 'Сколько угодно раз'],
        correctIndex: 3,
      },
    ] as MultipleChoiceRow[],
  },
}
