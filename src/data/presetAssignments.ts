import type { AssignmentQuestion } from '@/types/roles'

export interface PresetAssignment {
  title: string
  description: string
  type: 'quiz' | 'code'
  questions?: AssignmentQuestion[]
  maxScore?: number
  starterHtml?: string
  starterCss?: string
}

export const PRESET_ASSIGNMENTS: PresetAssignment[] = [
  {
    title: 'Входной тест: Что ты уже знаешь?',
    description:
      'Диагностический тест для новых учеников — помогает понять стартовый уровень знаний перед началом курса',
    type: 'quiz',
    maxScore: 7,
    questions: [
      {
        id: 'entry_q1',
        text: 'Что такое программирование?',
        type: 'multiple_choice',
        options: [
          'Написание инструкций (кода), которые понимает компьютер',
          'Ремонт компьютерного оборудования',
          'Дизайн интерфейса сайтов',
          'Работа с таблицами в Excel',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'entry_q2',
        text: 'Что из перечисленного является браузером?',
        type: 'multiple_choice',
        options: ['Google Chrome', 'Microsoft Word', 'Adobe Photoshop', 'WinRAR'],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'entry_q3',
        text: 'Что такое алгоритм?',
        type: 'multiple_choice',
        options: [
          'Пошаговая инструкция для решения задачи',
          'Вид компьютерного вируса',
          'Язык программирования',
          'Устройство для хранения данных',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'entry_q4',
        text: 'Что делают HTML, CSS и JavaScript вместе?',
        type: 'multiple_choice',
        options: [
          'Создают веб-страницы: структуру, оформление и поведение',
          'Управляют операционной системой компьютера',
          'Запускают игры в браузере',
          'Форматируют документы Word',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'entry_q5',
        text: 'Что из этого является языком программирования?',
        type: 'multiple_choice',
        options: ['JavaScript', 'HTML', 'CSS', 'Markdown'],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'entry_q6',
        text: 'Что такое переменная в программировании?',
        type: 'multiple_choice',
        options: [
          'Контейнер для хранения данных, который может меняться',
          'Тип ошибки в программе',
          'Скорость выполнения кода',
          'Специальный символ для оформления текста',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'entry_q7',
        text: 'Для чего нужен GitHub?',
        type: 'multiple_choice',
        options: [
          'Хранить код и совместно работать над проектами в облаке',
          'Создавать графические дизайны',
          'Тестировать скорость интернета',
          'Отправлять электронные письма',
        ],
        correctAnswer: '0',
        points: 1,
      },
    ],
  },
  {
    title: 'Тест: Уроки 1–4',
    description:
      'Проверка усвоения первых 4 уроков: «Что такое программирование», «Git и GitHub», «Что такое HTML», «Теги и элементы HTML»',
    type: 'quiz',
    maxScore: 8,
    questions: [
      // Урок 1: intro-to-programming
      {
        id: 'l4_q1',
        text: 'Что такое программирование?',
        type: 'multiple_choice',
        options: [
          'Написание инструкций для компьютера на специальном языке',
          'Починка компьютерного оборудования',
          'Рисование дизайна сайтов',
          'Работа с документами в офисных программах',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'l4_q2',
        text: 'Что такое алгоритм?',
        type: 'multiple_choice',
        options: [
          'Точная пошаговая инструкция для решения задачи',
          'Название языка программирования',
          'Тип компьютерного устройства',
          'Ошибка в программе',
        ],
        correctAnswer: '0',
        points: 1,
      },
      // Урок 2: git-github
      {
        id: 'l4_q3',
        text: 'Для чего используется Git?',
        type: 'multiple_choice',
        options: [
          'Для контроля версий и отслеживания изменений в коде',
          'Для создания веб-страниц',
          'Для редактирования фотографий',
          'Для отправки электронных писем',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'l4_q4',
        text: 'Что делает команда git commit?',
        type: 'multiple_choice',
        options: [
          'Сохраняет снимок изменений в истории репозитория',
          'Удаляет все файлы проекта',
          'Создаёт новую ветку',
          'Загружает проект с GitHub',
        ],
        correctAnswer: '0',
        points: 1,
      },
      // Урок 3: intro-to-html
      {
        id: 'l4_q5',
        text: 'Что означает аббревиатура HTML?',
        type: 'multiple_choice',
        options: [
          'HyperText Markup Language (Язык разметки гипертекста)',
          'High Technology Modern Language',
          'Hyper Transfer Markup Language',
          'Home Tool Making Language',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'l4_q6',
        text: 'Что делает браузер с HTML-файлом?',
        type: 'multiple_choice',
        options: [
          'Читает код и отображает визуальную страницу',
          'Компилирует код в исполняемую программу',
          'Отправляет файл по электронной почте',
          'Сохраняет файл в облако',
        ],
        correctAnswer: '0',
        points: 1,
      },
      // Урок 4: html-tags-elements
      {
        id: 'l4_q7',
        text: 'Как записывается тег заголовка первого уровня в HTML?',
        type: 'multiple_choice',
        options: [
          '<h1>Заголовок</h1>',
          '<header>Заголовок</header>',
          '<heading>Заголовок</heading>',
          '<title>Заголовок</title>',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'l4_q8',
        text: 'Что такое атрибут HTML-тега?',
        type: 'multiple_choice',
        options: [
          'Дополнительная информация о теге, например class, id или href',
          'Содержимое (текст) внутри тега',
          'Закрывающий тег элемента',
          'Комментарий в HTML-коде',
        ],
        correctAnswer: '0',
        points: 1,
      },
    ],
  },
  {
    title: 'ДЗ: Моя первая HTML-страница',
    description:
      'Домашнее задание по темам 1–7. Создай HTML-страницу «Обо мне»: заголовки, параграфы, списки, ссылки и правильная структура документа.',
    type: 'code',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Обо мне</title>
</head>
<body>

  <!-- 1. Напиши заголовок h1 со своим именем -->

  <!-- 2. Добавь параграф (p) — пару слов о себе -->

  <!-- 3. Добавь заголовок h2 «Мои интересы» -->

  <!-- 4. Создай список (ul) из 3-х своих увлечений -->

  <!-- 5. Добавь заголовок h2 «Полезные ссылки» -->

  <!-- 6. Создай список (ol) из 2-х ссылок (a href) на любые сайты -->

</body>
</html>`,
    starterCss: `body {
  background: white;
  color: #222;
  font-family: Arial, sans-serif;
  max-width: 600px;
  margin: 0 auto;
  padding: 24px;
}

h1 { color: #4f46e5; }
h2 { color: #374151; margin-top: 24px; }
p  { line-height: 1.6; }
li { margin-bottom: 6px; }
a  { color: #4f46e5; }`,
  },
]
