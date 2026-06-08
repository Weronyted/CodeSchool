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
  // ── 1. Входной тест ─────────────────────────────────────────────────────────
  {
    title: 'Входной тест: Что ты уже знаешь?',
    description:
      'Диагностический тест для новых учеников — помогает понять стартовый уровень знаний перед началом курса',
    type: 'quiz',
    maxScore: 8,
    questions: [
      {
        id: 'entry_q1',
        text: 'Что из перечисленного НЕ является языком программирования?',
        type: 'multiple_choice',
        options: [
          'JavaScript',
          'Python',
          'HTML',
          'C++',
        ],
        correctAnswer: '2', // HTML
        points: 1,
      },
      {
        id: 'entry_q2',
        text: 'Что делает тег <a> в HTML?',
        type: 'multiple_choice',
        options: [
          'Вставляет изображение',
          'Создаёт ссылку на другую страницу',
          'Делает текст жирным',
          'Создаёт маркированный список',
        ],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'entry_q3',
        text: 'Какой язык отвечает за внешний вид (цвета, шрифты, отступы) веб-страницы?',
        type: 'multiple_choice',
        options: [
          'JavaScript',
          'HTML',
          'Python',
          'CSS',
        ],
        correctAnswer: '3',
        points: 1,
      },
      {
        id: 'entry_q4',
        text: 'Что такое переменная в программировании?',
        type: 'multiple_choice',
        options: [
          'Ошибка в программе',
          'Контейнер для хранения данных',
          'Тип браузера',
          'Специальный HTML-тег',
        ],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'entry_q5',
        text: 'Что лучше всего описывает алгоритм?',
        type: 'multiple_choice',
        options: [
          'Тип компьютерного устройства',
          'Программа для редактирования фото',
          'Точная пошаговая инструкция для решения задачи',
          'Ошибка в коде',
        ],
        correctAnswer: '2',
        points: 1,
      },
      {
        id: 'entry_q6',
        text: 'Какой из этих файлов содержит HTML-код?',
        type: 'multiple_choice',
        options: [
          'style.css',
          'script.js',
          'index.html',
          'app.py',
        ],
        correctAnswer: '2',
        points: 1,
      },
      {
        id: 'entry_q7',
        text: 'Для чего служит DOCTYPE в начале HTML-файла?',
        type: 'multiple_choice',
        options: [
          'Указывает имя автора страницы',
          'Задаёт шрифт текста',
          'Подключает CSS-стили',
          'Сообщает браузеру, что документ написан на HTML',
        ],
        correctAnswer: '3',
        points: 1,
      },
      {
        id: 'entry_q8',
        text: 'Чем отличается frontend от backend?',
        type: 'multiple_choice',
        options: [
          'Frontend работает на сервере, backend — в браузере',
          'Frontend — это базы данных и серверный код',
          'Frontend — визуальная часть в браузере; backend — серверная логика',
          'Frontend и backend — одно и то же',
        ],
        correctAnswer: '2',
        points: 1,
      },
    ],
  },

  // ── 2. Тест на уроки 1-4 ────────────────────────────────────────────────────
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
          'Починка компьютерного оборудования',
          'Написание инструкций для компьютера на специальном языке',
          'Рисование дизайна сайтов',
          'Работа с документами в офисных программах',
        ],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l4_q2',
        text: 'Что такое алгоритм?',
        type: 'multiple_choice',
        options: [
          'Название языка программирования',
          'Тип компьютерного устройства',
          'Точная пошаговая инструкция для решения задачи',
          'Ошибка в программе',
        ],
        correctAnswer: '2',
        points: 1,
      },
      // Урок 2: git-github
      {
        id: 'l4_q3',
        text: 'Для чего используется Git?',
        type: 'multiple_choice',
        options: [
          'Для создания веб-страниц',
          'Для редактирования фотографий',
          'Для отправки электронных писем',
          'Для контроля версий и отслеживания изменений в коде',
        ],
        correctAnswer: '3',
        points: 1,
      },
      {
        id: 'l4_q4',
        text: 'Что делает команда git commit?',
        type: 'multiple_choice',
        options: [
          'Удаляет все файлы проекта',
          'Сохраняет снимок изменений в истории репозитория',
          'Создаёт новую ветку',
          'Загружает проект с GitHub',
        ],
        correctAnswer: '1',
        points: 1,
      },
      // Урок 3: intro-to-html
      {
        id: 'l4_q5',
        text: 'Что означает аббревиатура HTML?',
        type: 'multiple_choice',
        options: [
          'High Technology Modern Language',
          'Hyper Transfer Markup Language',
          'HyperText Markup Language',
          'Home Tool Making Language',
        ],
        correctAnswer: '2',
        points: 1,
      },
      {
        id: 'l4_q6',
        text: 'Что делает браузер с HTML-файлом?',
        type: 'multiple_choice',
        options: [
          'Компилирует его в исполняемую программу',
          'Отправляет файл по электронной почте',
          'Сохраняет файл в облако',
          'Читает код и отображает визуальную страницу',
        ],
        correctAnswer: '3',
        points: 1,
      },
      // Урок 4: html-tags-elements
      {
        id: 'l4_q7',
        text: 'Как записывается тег заголовка первого уровня в HTML?',
        type: 'multiple_choice',
        options: [
          '<heading>Заголовок</heading>',
          '<title>Заголовок</title>',
          '<h1>Заголовок</h1>',
          '<header>Заголовок</header>',
        ],
        correctAnswer: '2',
        points: 1,
      },
      {
        id: 'l4_q8',
        text: 'Что такое атрибут HTML-тега?',
        type: 'multiple_choice',
        options: [
          'Текстовое содержимое внутри тега',
          'Закрывающий тег элемента',
          'Комментарий в HTML-коде',
          'Дополнительная информация о теге, например class, id или href',
        ],
        correctAnswer: '3',
        points: 1,
      },
    ],
  },

  // ── 3. ДЗ — HTML-страница ────────────────────────────────────────────────────
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
