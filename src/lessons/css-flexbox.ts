import type { MultipleChoiceRow } from '@/types/lesson'

export const cssFlexbox = {
  slug: 'css-flexbox',
  title: 'Flexbox',
  readTime: 10,
  sections: [
    { id: 'what-is-flex', title: 'Что такое Flexbox?' },
    { id: 'container', title: 'Flex-контейнер' },
    { id: 'direction', title: 'Направление и перенос' },
    { id: 'alignment', title: 'Выравнивание' },
    { id: 'items', title: 'Flex-элементы' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `Flexbox (Flexible Box Layout) — это мощный инструмент CSS для расположения элементов в ряд или колонку.
До Flexbox выравнивание элементов было настоящим кошмаром. Сейчас одна строка CSS может сделать то,
что раньше требовало десятки строк хаков. Flexbox — это то, что нужно знать каждому веб-разработчику.`,

    container: {
      description: 'Чтобы включить Flexbox, добавь display: flex к родительскому элементу:',
      code: `.container {
  display: flex; /* Включаем Flexbox */
}`,
      items: [
        { name: 'display: flex', description: 'Делает элемент flex-контейнером. Все прямые дети становятся flex-элементами.' },
        { name: 'flex-direction', description: 'Направление главной оси', example: 'row | row-reverse | column | column-reverse' },
        { name: 'flex-wrap', description: 'Перенос элементов', example: 'nowrap | wrap | wrap-reverse' },
        { name: 'gap', description: 'Расстояние между элементами', example: 'gap: 16px; gap: 8px 16px;' },
      ],
    },

    alignment: {
      description: 'Два главных свойства выравнивания:',
      items: [
        {
          name: 'justify-content (по главной оси)',
          description: 'Выравнивает по горизонтали (при row) или вертикали (при column)',
          example: 'flex-start | flex-end | center | space-between | space-around | space-evenly',
        },
        {
          name: 'align-items (по поперечной оси)',
          description: 'Выравнивает по вертикали (при row) или горизонтали (при column)',
          example: 'flex-start | flex-end | center | stretch | baseline',
        },
      ],
      tip: 'Запомни: justify — по главной оси, align — по поперечной.',
    },

    items: {
      description: 'Свойства для flex-элементов (children):',
      items: [
        { name: 'flex-grow', description: 'Насколько элемент растёт, чтобы заполнить свободное место', example: 'flex-grow: 1;' },
        { name: 'flex-shrink', description: 'Насколько элемент уменьшается при нехватке места', example: 'flex-shrink: 0;' },
        { name: 'flex-basis', description: 'Начальный размер элемента', example: 'flex-basis: 200px;' },
        { name: 'flex: 1', description: 'Сокращение: flex-grow: 1, flex-shrink: 1, flex-basis: 0', example: 'flex: 1; /* равномерно заполняет пространство */' },
        { name: 'align-self', description: 'Выравнивание одного конкретного элемента', example: 'align-self: flex-end;' },
      ],
    },

    workedExamples: [
      {
        title: 'Пример 1: Навигация в один ряд',
        scenario: 'Нужно создать навигацию, где лого слева, а ссылки справа.',
        solution: `.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
}`,
      },
      {
        title: 'Пример 2: Карточки в ряд с переносом',
        scenario: 'Карточки должны располагаться в ряд, но при нехватке места переносить на следующую строку.',
        solution: `.cards {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.card {
  flex: 1 1 250px; /* минимум 250px, растёт и сжимается */
}`,
      },
    ],
  },

  keyTerms: [
    { term: 'Flexbox', definition: 'Технология CSS для создания гибких одномерных макетов (в строку или в колонку).' },
    { term: 'flex-контейнер', definition: 'Элемент с display: flex. Управляет расположением своих прямых потомков.' },
    { term: 'flex-элемент', definition: 'Прямой потомок flex-контейнера.' },
    { term: 'justify-content', definition: 'Выравнивает flex-элементы по главной оси (горизонталь при row).' },
    { term: 'align-items', definition: 'Выравнивает flex-элементы по поперечной оси (вертикаль при row).' },
    { term: 'gap', definition: 'Расстояние между flex-элементами.' },
  ],

  didYouKnow: [
    'Flexbox решает "проблему вертикального центрирования", над которой веб-разработчики мучились с 1996 года! Просто: display: flex; align-items: center; justify-content: center;',
    'Игра Flexbox Froggy (flexboxfroggy.com) обучает Flexbox через задания с лягушками — очень рекомендуем!',
    'CSS Grid — другой мощный инструмент вёрстки, для двумерных макетов. Flexbox лучше для строк, Grid — для сетки.',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание Flexbox.',
    rows: [
      {
        id: 'q1',
        question: 'Как включить Flexbox для элемента?',
        options: ['flex: true', 'display: flex', 'flexbox: on', 'position: flex'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Какое свойство выравнивает элементы по вертикали (при flex-direction: row)?',
        options: ['justify-content', 'vertical-align', 'align-items', 'flex-align'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        question: 'Что делает justify-content: space-between?',
        options: ['Сжимает все элементы к центру', 'Равномерно распределяет с пространством между (не по краям)', 'Добавляет одинаковые отступы со всех сторон', 'Переносит элементы'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        question: 'Как сделать, чтобы элемент занял всё доступное пространство?',
        options: ['width: 100%', 'flex-grow: 1', 'align-self: stretch', 'flex: none'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'Что делает flex-wrap: wrap?',
        options: ['Скрывает лишние элементы', 'Разрешает переносить элементы на следующую строку', 'Группирует элементы', 'Добавляет рамку'],
        correctIndex: 1,
      },
    ] as MultipleChoiceRow[],
  },
}
