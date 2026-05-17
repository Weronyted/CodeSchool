import type { MultipleChoiceRow } from '@/types/lesson'

export const cssBoxModel = {
  slug: 'css-box-model',
  title: 'Блочная модель CSS',
  readTime: 8,
  sections: [
    { id: 'box-model', title: 'Что такое блочная модель?' },
    { id: 'parts', title: 'Части блочной модели' },
    { id: 'margin-padding', title: 'Margin и Padding' },
    { id: 'border', title: 'Border' },
    { id: 'box-sizing', title: 'box-sizing' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `Каждый HTML-элемент — это прямоугольная коробка. Это и есть блочная модель CSS (Box Model).
Понимание блочной модели — ключ к правильной вёрстке. Она объясняет, как браузер вычисляет
размер и положение каждого элемента на странице.`,

    parts: {
      description: 'Блочная модель состоит из четырёх уровней (снаружи внутрь):',
      items: [
        { name: 'margin', description: 'Внешний отступ — пространство ВНЕ рамки. Создаёт расстояние между элементами.', example: 'margin: 20px;' },
        { name: 'border', description: 'Рамка вокруг элемента. Может иметь цвет, толщину и стиль.', example: 'border: 2px solid black;' },
        { name: 'padding', description: 'Внутренний отступ — пространство ВНУТРИ рамки между рамкой и контентом.', example: 'padding: 16px;' },
        { name: 'content', description: 'Само содержимое: текст, изображение. Размер задаётся через width и height.', example: 'width: 200px; height: 100px;' },
      ],
    },

    marginPadding: {
      description: 'Margin и padding принимают до четырёх значений:',
      items: [
        { name: '1 значение', description: 'Все четыре стороны', example: 'padding: 10px;' },
        { name: '2 значения', description: 'Верх/низ, Лево/право', example: 'margin: 10px 20px;' },
        { name: '3 значения', description: 'Верх, Лево/право, Низ', example: 'padding: 5px 10px 15px;' },
        { name: '4 значения', description: 'Верх, Право, Низ, Лево (по часовой)', example: 'margin: 5px 10px 15px 20px;' },
        { name: 'auto', description: 'Браузер вычисляет значение (удобно для центрирования)', example: 'margin: 0 auto;' },
      ],
    },

    border: {
      description: 'Свойство border задаётся тремя параметрами: толщина стиль цвет',
      items: [
        { name: 'Стили рамки', description: 'solid, dashed, dotted, double, none', example: 'border: 1px solid #ccc;' },
        { name: 'Закруглённые углы', description: 'border-radius делает углы круглыми', example: 'border-radius: 8px; border-radius: 50%;' },
        { name: 'Отдельные стороны', description: 'border-top, border-right, border-bottom, border-left', example: 'border-bottom: 2px solid blue;' },
      ],
    },

    boxSizing: {
      description: 'По умолчанию width/height задаёт размер только контента. border-box меняет это:',
      code: `/* По умолчанию (content-box) */
/* width: 200px, но реальная ширина = 200 + padding + border */
.box { width: 200px; padding: 20px; border: 2px solid; }
/* Реальная ширина = 244px! */

/* С border-box — всё предсказуемо */
* { box-sizing: border-box; }
.box { width: 200px; padding: 20px; border: 2px solid; }
/* Реальная ширина = 200px (padding и border внутри) */`,
    },
  },

  keyTerms: [
    { term: 'Box Model', definition: 'Модель, в которой каждый элемент — прямоугольник из четырёх слоёв: content, padding, border, margin.' },
    { term: 'margin', definition: 'Внешний отступ. Пространство снаружи рамки между этим и соседними элементами.' },
    { term: 'padding', definition: 'Внутренний отступ. Пространство между рамкой и контентом элемента.' },
    { term: 'border', definition: 'Рамка вокруг элемента. Задаётся: толщина, стиль, цвет.' },
    { term: 'box-sizing: border-box', definition: 'Делает width/height "честными" — padding и border включаются в размер, а не добавляются к нему.' },
  ],

  didYouKnow: [
    'Трюк с margin: 0 auto центрирует блочный элемент по горизонтали — один из самых популярных приёмов CSS.',
    'border-radius: 50% превращает квадратный элемент в идеальный круг!',
    'box-sizing: border-box рекомендуют добавлять для всех элементов (*) в начале каждого CSS-файла.',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание блочной модели CSS.',
    rows: [
      {
        id: 'q1',
        question: 'Что такое padding?',
        options: [
          'Внешний отступ между элементами',
          'Рамка вокруг элемента',
          'Внутренний отступ между рамкой и содержимым',
          'Цвет фона элемента',
        ],
        correctIndex: 2,
      },
      {
        id: 'q2',
        question: 'Сколько сторон охватывает запись margin: 10px 20px?',
        options: ['Только левую', 'Все четыре одинаково', 'Верх/низ = 10px, лево/право = 20px', 'Только верх'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        question: 'Что делает border-radius: 50%?',
        options: ['Убирает рамку', 'Делает элемент круглым', 'Устанавливает радиус в 50 пикселей', 'Скрывает overflow'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        question: 'Зачем используют * { box-sizing: border-box }?',
        options: [
          'Чтобы скрыть все рамки',
          'Чтобы padding и border входили в заданные width/height',
          'Чтобы отключить CSS',
          'Для тёмной темы',
        ],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'Как центрировать блочный элемент по горизонтали?',
        options: ['text-align: center', 'position: center', 'margin: 0 auto', 'align: center'],
        correctIndex: 2,
      },
    ] as MultipleChoiceRow[],
  },
}
