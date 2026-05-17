import type { MultipleChoiceRow } from '@/types/lesson'

export const cssBasics = {
  slug: 'css-basics',
  title: 'Основы CSS',
  readTime: 9,
  sections: [
    { id: 'what-is-css', title: 'Что такое CSS?' },
    { id: 'syntax', title: 'Синтаксис CSS' },
    { id: 'selectors', title: 'Селекторы' },
    { id: 'properties', title: 'Основные свойства' },
    { id: 'how-to-add', title: 'Как подключить CSS' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `CSS (Cascading Style Sheets) — это язык стилей, который отвечает за внешний вид веб-страниц.
Если HTML — это каркас дома, то CSS — это его отделка: цвет стен, мебель, освещение.
С помощью CSS можно задать цвет, шрифт, размеры, расположение и анимацию любого элемента.`,

    syntax: {
      description: 'CSS-правило состоит из селектора и блока объявлений:',
      code: `селектор {
  свойство: значение;
  свойство: значение;
}

/* Пример: */
h1 {
  color: blue;
  font-size: 24px;
}`,
      parts: [
        { name: 'Селектор', description: 'Указывает, к какому HTML-элементу применяется стиль', example: 'h1, p, .class, #id' },
        { name: 'Свойство', description: 'Что именно мы хотим изменить', example: 'color, font-size, background' },
        { name: 'Значение', description: 'Новое значение свойства', example: 'red, 16px, #3B5BDB' },
        { name: 'Объявление', description: 'Пара свойство:значение, заканчивается точкой с запятой', example: 'color: red;' },
      ],
    },

    selectors: {
      description: 'Селекторы позволяют выбрать нужные элементы:',
      items: [
        { name: 'Тег', description: 'Применяется ко всем тегам этого типа', example: 'p { color: black; }' },
        { name: '.класс', description: 'Применяется к элементам с данным классом', example: '.title { font-size: 20px; }' },
        { name: '#идентификатор', description: 'Применяется к одному уникальному элементу', example: '#header { background: blue; }' },
        { name: '* (универсальный)', description: 'Применяется ко всем элементам', example: '* { box-sizing: border-box; }' },
        { name: 'Потомок', description: 'Выбирает элемент внутри другого', example: 'div p { margin: 0; }' },
      ],
    },

    properties: {
      description: 'Самые часто используемые CSS-свойства:',
      items: [
        { name: 'color', description: 'Цвет текста', example: 'color: red; color: #3B5BDB;' },
        { name: 'background-color', description: 'Цвет фона', example: 'background-color: yellow;' },
        { name: 'font-size', description: 'Размер шрифта', example: 'font-size: 16px; font-size: 1.2rem;' },
        { name: 'font-weight', description: 'Жирность шрифта', example: 'font-weight: bold; font-weight: 700;' },
        { name: 'text-align', description: 'Выравнивание текста', example: 'text-align: center;' },
        { name: 'width / height', description: 'Ширина и высота элемента', example: 'width: 200px; height: 100px;' },
      ],
    },

    howToAdd: {
      description: 'Три способа добавить CSS на страницу:',
      items: [
        {
          name: 'Внешний файл (рекомендуется)',
          description: 'Стили в отдельном файле .css',
          example: '<link rel="stylesheet" href="styles.css">',
        },
        {
          name: 'Тег <style>',
          description: 'Стили прямо в HTML-документе',
          example: '<style>\n  h1 { color: blue; }\n</style>',
        },
        {
          name: 'Инлайн-стиль',
          description: 'Стиль прямо в теге (не рекомендуется)',
          example: '<p style="color: red;">Текст</p>',
        },
      ],
    },
  },

  keyTerms: [
    { term: 'CSS', definition: 'Cascading Style Sheets — язык стилей для оформления веб-страниц.' },
    { term: 'Селектор', definition: 'Часть CSS-правила, указывающая, к каким элементам применить стиль.' },
    { term: 'Свойство', definition: 'Параметр элемента, который можно изменить (color, font-size, margin...).' },
    { term: 'Каскад', definition: 'Принцип CSS: если несколько правил применяются к одному элементу, побеждает более специфичное.' },
    { term: 'Класс', definition: 'Атрибут class в HTML, позволяющий применить один стиль к нескольким элементам.' },
  ],

  didYouKnow: [
    'CSS был создан Хоконом Виум Ли в 1994 году. До CSS стили задавались прямо в HTML-атрибутах!',
    '"Каскад" в CSS означает, что стили накапливаются и перекрываются по определённым правилам.',
    'Цвета в CSS можно задавать по имени (red), в HEX (#FF0000), RGB (rgb(255,0,0)) и HSL форматах.',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание основ CSS.',
    rows: [
      {
        id: 'q1',
        question: 'Как выбрать все элементы с классом "title"?',
        options: ['#title', '.title', '*title', 'title'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Какое свойство меняет цвет текста?',
        options: ['background-color', 'font-color', 'color', 'text-color'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        question: 'Что значит CSS — "Cascading..."?',
        options: ['Создающие', 'Каскадные', 'Красочные', 'Конструкторские'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        question: 'Какой способ подключения CSS считается лучшим?',
        options: ['Инлайн через style=""', 'Тег <style> в HTML', 'Внешний файл .css через <link>', 'Прямо в теге <body>'],
        correctIndex: 2,
      },
      {
        id: 'q5',
        question: 'Как записать CSS-комментарий?',
        options: ['// Комментарий', '<!-- Комментарий -->', '/* Комментарий */', '# Комментарий'],
        correctIndex: 2,
      },
    ] as MultipleChoiceRow[],
  },
}
