import type { MultipleChoiceRow } from '@/types/lesson'

export const htmlElements = {
  slug: 'html-elements',
  title: 'Элементы HTML',
  readTime: 10,
  sections: [
    { id: 'headings', title: 'Заголовки' },
    { id: 'text', title: 'Текст и абзацы' },
    { id: 'lists', title: 'Списки' },
    { id: 'links', title: 'Ссылки' },
    { id: 'images', title: 'Изображения' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `В HTML есть десятки тегов для разных задач. Но большинство сайтов строятся из небольшого набора
основных элементов: заголовков, абзацев, списков, ссылок и изображений. Освоив эти теги,
ты уже сможешь создавать настоящие веб-страницы!`,

    headings: {
      description: 'Теги h1–h6 создают заголовки разного уровня. h1 — самый важный, h6 — наименее важный.',
      items: [
        { name: '<h1>', description: 'Главный заголовок страницы. Используй только один раз.', example: '<h1>Название сайта</h1>' },
        { name: '<h2>', description: 'Заголовок раздела.', example: '<h2>Глава 1</h2>' },
        { name: '<h3>–<h6>', description: 'Подзаголовки уровней 3–6.', example: '<h3>Параграф 1.1</h3>' },
      ],
    },

    text: {
      description: 'Основные теги для работы с текстом:',
      items: [
        { name: '<p>', description: 'Абзац текста. Браузер добавляет отступы сверху и снизу.', example: '<p>Это абзац текста.</p>' },
        { name: '<strong>', description: 'Выделяет важный текст жирным.', example: 'Это <strong>важно</strong>!' },
        { name: '<em>', description: 'Выделяет текст курсивом (акцент).', example: 'Прочитай <em>внимательно</em>.' },
        { name: '<br>', description: 'Перенос строки (одиночный тег).', example: 'Строка 1<br>Строка 2' },
        { name: '<span>', description: 'Контейнер для части текста. Сам по себе ничего не делает — используется с CSS.', example: '<span class="red">красный</span>' },
      ],
    },

    lists: {
      description: 'HTML поддерживает два вида списков:',
      items: [
        {
          name: '<ul> — неупорядоченный список',
          description: 'Список с точками (буллетами). Каждый пункт — тег <li>.',
          example: '<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>',
        },
        {
          name: '<ol> — упорядоченный список',
          description: 'Нумерованный список. Каждый пункт — тег <li>.',
          example: '<ol>\n  <li>Открой редактор</li>\n  <li>Напиши код</li>\n  <li>Сохрани файл</li>\n</ol>',
        },
      ],
    },

    links: {
      description: 'Тег <a> создаёт гиперссылку. Атрибут href задаёт адрес назначения:',
      items: [
        { name: 'Внешняя ссылка', description: 'Открывает другой сайт', example: '<a href="https://google.com">Google</a>' },
        { name: 'target="_blank"', description: 'Открывает ссылку в новой вкладке', example: '<a href="..." target="_blank">...</a>' },
        { name: 'Якорная ссылка', description: 'Переходит к элементу на этой же странице', example: '<a href="#section1">К разделу</a>' },
      ],
    },

    images: {
      description: 'Тег <img> вставляет изображение. Это одиночный тег — закрывать не нужно.',
      items: [
        { name: 'src', description: 'Путь к изображению (обязательный атрибут)', example: '<img src="photo.jpg">' },
        { name: 'alt', description: 'Альтернативный текст (важно для доступности!)', example: '<img src="cat.jpg" alt="Кот">' },
        { name: 'width / height', description: 'Размеры изображения в пикселях', example: '<img src="logo.png" width="200" height="100">' },
      ],
    },
  },

  keyTerms: [
    { term: '<h1>–<h6>', definition: 'Теги заголовков. h1 — наиболее важный, h6 — наименее важный.' },
    { term: '<p>', definition: 'Тег абзаца. Создаёт отдельный блок текста с отступами.' },
    { term: '<ul> / <ol>', definition: 'Теги списков: неупорядоченного (с точками) и упорядоченного (с номерами).' },
    { term: '<li>', definition: 'Элемент списка. Используется внутри <ul> или <ol>.' },
    { term: '<a href="...">',  definition: 'Тег ссылки. Атрибут href задаёт адрес назначения.' },
    { term: '<img src="..." alt="...">', definition: 'Тег изображения. src — путь к файлу, alt — описание.' },
  ],

  didYouKnow: [
    'Атрибут alt в теге <img> очень важен для незрячих пользователей — экранные читалки зачитывают его вслух.',
    'Тег <a> расшифровывается как "anchor" (якорь) — ссылки появились ещё в первых версиях HTML.',
    'HTML не чувствителен к регистру: <P> и <p> работают одинаково, но принято писать строчными буквами.',
  ],

  multipleChoiceQuiz: {
    scenario: 'Проверь знание основных HTML-элементов.',
    rows: [
      {
        id: 'q1',
        question: 'Какой тег создаёт нумерованный список?',
        options: ['<ul>', '<ol>', '<li>', '<list>'],
        correctIndex: 1,
      },
      {
        id: 'q2',
        question: 'Как открыть ссылку в новой вкладке?',
        options: ['<a new="tab">', '<a href="..." open>', '<a href="..." target="_blank">', '<a href="..." tab="new">'],
        correctIndex: 2,
      },
      {
        id: 'q3',
        question: 'Какой атрибут тега <img> описывает изображение для незрячих?',
        options: ['src', 'title', 'alt', 'desc'],
        correctIndex: 2,
      },
      {
        id: 'q4',
        question: 'Чем <strong> отличается от <b>?',
        options: [
          'Они полностью одинаковы',
          '<strong> — семантический (важность), <b> — только визуальное выделение',
          '<b> жирнее, чем <strong>',
          '<strong> работает только в <h1>',
        ],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'Что выводит следующий код: <h2>Привет</h2>?',
        options: ['Текст «Привет» мелкими буквами', 'Текст «h2Привет/h2» как есть', 'Заголовок второго уровня «Привет»', 'Ошибку браузера'],
        correctIndex: 2,
      },
    ] as MultipleChoiceRow[],
  },
}
