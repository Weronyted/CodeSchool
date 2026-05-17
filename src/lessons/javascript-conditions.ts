import type { MultipleChoiceRow } from '@/types/lesson'

export const javascriptConditions = {
  slug: 'javascript-conditions',
  title: 'Условия в JavaScript',
  readTime: 8,
  sections: [
    { id: 'if-else', title: 'if / else' },
    { id: 'else-if', title: 'else if' },
    { id: 'comparison', title: 'Операторы сравнения' },
    { id: 'logical', title: 'Логические операторы' },
    { id: 'ternary', title: 'Тернарный оператор' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `Условные операторы позволяют программе принимать решения. Как в жизни: «если идёт дождь — возьми зонт,
иначе — оставь дома». В JavaScript это записывается через if/else. Без условий программы были бы
жёсткими скриптами — с условиями они становятся умными.`,

    ifElse: {
      code: `let temperature = 25;

if (temperature > 30) {
  console.log("Жарко! Надень лёгкую одежду.");
} else {
  console.log("Комфортная температура.");
}

// temperature = 25, поэтому выведет:
// "Комфортная температура."`,
    },

    elseIf: {
      description: 'else if позволяет проверить несколько условий:',
      code: `let score = 75;

if (score >= 90) {
  console.log("Отлично! A");
} else if (score >= 80) {
  console.log("Хорошо! B");
} else if (score >= 70) {
  console.log("Неплохо! C");
} else {
  console.log("Нужно больше практики!");
}
// Выведет: "Неплохо! C"`,
    },

    comparison: {
      description: 'Операторы сравнения возвращают true или false:',
      items: [
        { name: '===', description: 'Строгое равенство (значение и тип)', example: '5 === 5 // true\n5 === "5" // false' },
        { name: '!==', description: 'Строгое неравенство', example: '5 !== 3 // true' },
        { name: '>', description: 'Больше', example: '10 > 5 // true' },
        { name: '<', description: 'Меньше', example: '3 < 8 // true' },
        { name: '>=', description: 'Больше или равно', example: '5 >= 5 // true' },
        { name: '<=', description: 'Меньше или равно', example: '4 <= 5 // true' },
      ],
    },

    logical: {
      description: 'Логические операторы объединяют условия:',
      items: [
        { name: '&& (И)', description: 'true только если ОБА условия истинны', example: 'age >= 6 && age <= 12 // школьник' },
        { name: '|| (ИЛИ)', description: 'true если ХОТЯ БЫ одно условие истинно', example: 'isAdmin || isOwner' },
        { name: '! (НЕ)', description: 'Инвертирует условие', example: '!isLoggedIn // не вошёл в систему' },
      ],
    },

    ternary: {
      description: 'Тернарный оператор — короткая запись if/else:',
      code: `// Обычный if/else
let message;
if (age >= 18) {
  message = "Взрослый";
} else {
  message = "Ребёнок";
}

// То же через тернарный оператор
const message = age >= 18 ? "Взрослый" : "Ребёнок";
// условие ? значение_если_true : значение_если_false`,
    },
  },

  keyTerms: [
    { term: 'if / else', definition: 'Условный оператор. Выполняет один из двух блоков кода в зависимости от условия.' },
    { term: 'Оператор сравнения', definition: 'Сравнивает два значения и возвращает true или false.' },
    { term: '&& (И)', definition: 'Логический оператор И. True только если оба операнда истинны.' },
    { term: '|| (ИЛИ)', definition: 'Логический оператор ИЛИ. True если хотя бы один операнд истинен.' },
    { term: 'Тернарный оператор', definition: 'Краткая форма if/else: условие ? true_значение : false_значение' },
  ],

  didYouKnow: [
    'Оператор == делает "нестрогое" сравнение: 0 == false — это true! Поэтому всегда используй ===.',
    'Цепочку if/else if можно заменить оператором switch — он удобнее, когда вариантов много.',
    'В JavaScript пустая строка "", 0, null, undefined, NaN и false — все являются "falsy" (ложными).',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание условных операторов.',
    rows: [
      {
        id: 'q1',
        question: 'Что выведет: if (10 > 5) { console.log("Да"); } else { console.log("Нет"); }',
        options: ['Нет', 'Да', 'Ничего', 'Ошибку'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Что вернёт: true && false?',
        options: ['true', 'false', 'null', 'undefined'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Что вернёт: false || true?',
        options: ['false', 'true', '1', '0'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        question: 'Как записать тернарно: if (x > 0) { y = "+" } else { y = "-" }?',
        options: ['y = x > 0 ? "+" : "-"', 'y = x > 0 || "+" || "-"', 'y = if(x > 0) "+" else "-"', 'y = (x > 0) && "+"'],
        correctIndex: 0,
      },
      {
        id: 'q5',
        question: 'Почему предпочтительнее === вместо ==?',
        options: ['Они одинаковы', '=== быстрее', '=== проверяет и тип, и значение — избегая скрытых преобразований', '== строже'],
        correctIndex: 2,
      },
    ] as MultipleChoiceRow[],
  },
}
