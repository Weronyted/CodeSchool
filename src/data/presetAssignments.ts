import type { AssignmentQuestion } from '@/types/roles'

export interface PresetAssignment {
  title: string
  description: string
  type: 'quiz' | 'code'
  lessonSlug?: string
  questions?: AssignmentQuestion[]
  maxScore?: number
  starterHtml?: string
  starterCss?: string
  starterJs?: string
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

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Урок 6: Списки (html-lists)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Тест: Списки (Урок 6)',
    description: 'Проверка темы «Списки»: маркированные ul, нумерованные ol, пункты li и вложенные списки.',
    type: 'quiz',
    lessonSlug: 'html-lists',
    maxScore: 5,
    questions: [
      {
        id: 'l6_q1',
        text: 'Какой тег создаёт маркированный (с точками) список?',
        type: 'multiple_choice',
        options: ['<ol>', '<ul>', '<li>', '<list>'],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l6_q2',
        text: 'Каким тегом обозначается отдельный пункт списка?',
        type: 'multiple_choice',
        options: ['<ul>', '<li>', '<ol>', '<item>'],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l6_q3',
        text: 'Какой тег создаёт нумерованный список?',
        type: 'multiple_choice',
        options: ['<ol>', '<ul>', '<nl>', '<number>'],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'l6_q4',
        text: 'Можно ли вложить один список внутрь пункта другого?',
        type: 'multiple_choice',
        options: [
          'Нет, это запрещено',
          'Да, вложенные списки допустимы',
          'Только ol можно вкладывать',
          'Только один уровень вложенности',
        ],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l6_q5',
        text: 'Что делает атрибут type="A" у тега <ol>?',
        type: 'multiple_choice',
        options: [
          'Делает маркеры квадратными',
          'Нумерует пункты заглавными буквами A, B, C…',
          'Убирает нумерацию',
          'Меняет цвет текста',
        ],
        correctAnswer: '1',
        points: 1,
      },
    ],
  },
  {
    title: 'ДЗ (код): Списки (Урок 6)',
    description: 'Создай страницу со списком покупок (ul) и пошаговым рецептом (ol). Закрепляем ul, ol и li.',
    type: 'code',
    lessonSlug: 'html-lists',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Списки</title>
</head>
<body>

  <h1>Список покупок</h1>
  <!-- 1. Создай маркированный список (ul) из 4 продуктов (li) -->

  <h2>Рецепт: как заварить чай</h2>
  <!-- 2. Создай нумерованный список (ol) из 3 шагов (li) -->

</body>
</html>`,
    starterCss: `body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #222; }
h1 { color: #4f46e5; }
h2 { color: #374151; margin-top: 24px; }
li { margin-bottom: 6px; line-height: 1.6; }`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Урок 7: Ссылки (html-links)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Тест: Ссылки (Урок 7)',
    description: 'Проверка темы «Ссылки»: тег <a>, атрибут href, target, email- и якорные ссылки.',
    type: 'quiz',
    lessonSlug: 'html-links',
    maxScore: 5,
    questions: [
      {
        id: 'l7_q1',
        text: 'Какой тег создаёт ссылку?',
        type: 'multiple_choice',
        options: ['<link>', '<a>', '<href>', '<url>'],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l7_q2',
        text: 'Какой атрибут задаёт адрес, на который ведёт ссылка?',
        type: 'multiple_choice',
        options: ['src', 'href', 'target', 'link'],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l7_q3',
        text: 'Что делает target="_blank"?',
        type: 'multiple_choice',
        options: [
          'Открывает ссылку в новой вкладке',
          'Открывает в той же вкладке',
          'Скачивает файл по ссылке',
          'Делает ссылку неактивной',
        ],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'l7_q4',
        text: 'Как сделать ссылку, открывающую почтовый клиент?',
        type: 'multiple_choice',
        options: [
          'href="email:name@mail.com"',
          'href="mailto:name@mail.com"',
          'src="mail:name@mail.com"',
          'href="send:name@mail.com"',
        ],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l7_q5',
        text: 'Что такое якорная (anchor) ссылка?',
        type: 'multiple_choice',
        options: [
          'Ссылка на другой сайт',
          'Ссылка на раздел внутри той же страницы через #id',
          'Ссылка на скачивание файла',
          'Ссылка на изображение',
        ],
        correctAnswer: '1',
        points: 1,
      },
    ],
  },
  {
    title: 'ДЗ (код): Ссылки (Урок 7)',
    description: 'Создай страницу с разными типами ссылок: внешняя (в новой вкладке), email-ссылка и якорная ссылка внутри страницы.',
    type: 'code',
    lessonSlug: 'html-links',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Ссылки</title>
</head>
<body>

  <h1>Мои ссылки</h1>

  <!-- 1. Ссылка на https://google.com, открывается в новой вкладке (target="_blank") -->

  <!-- 2. Email-ссылка (mailto:) на любой адрес -->

  <!-- 3. Якорная ссылка на раздел "contacts" внизу страницы (href="#contacts") -->

  <h2 id="contacts">Контакты</h2>
  <p>Сюда ведёт якорная ссылка.</p>

</body>
</html>`,
    starterCss: `body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #222; }
h1 { color: #4f46e5; }
a  { color: #4f46e5; display: block; margin: 8px 0; }`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Урок 8: Изображения и медиа (html-images-media)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Тест: Изображения и медиа (Урок 8)',
    description: 'Проверка темы «Изображения»: тег <img>, атрибуты src и alt, самозакрывающиеся теги и видео.',
    type: 'quiz',
    lessonSlug: 'html-images-media',
    maxScore: 5,
    questions: [
      {
        id: 'l8_q1',
        text: 'Какой тег вставляет изображение на страницу?',
        type: 'multiple_choice',
        options: ['<img>', '<image>', '<picture>', '<src>'],
        correctAnswer: '0',
        points: 1,
      },
      {
        id: 'l8_q2',
        text: 'Какой атрибут задаёт путь к файлу изображения?',
        type: 'multiple_choice',
        options: ['href', 'alt', 'src', 'link'],
        correctAnswer: '2',
        points: 1,
      },
      {
        id: 'l8_q3',
        text: 'Зачем нужен атрибут alt у изображения?',
        type: 'multiple_choice',
        options: [
          'Задаёт ширину картинки',
          'Альтернативный текст, если картинка не загрузилась, и для доступности',
          'Добавляет рамку вокруг картинки',
          'Меняет формат изображения',
        ],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l8_q4',
        text: 'Нужен ли тегу <img> закрывающий тег?',
        type: 'multiple_choice',
        options: [
          'Да, обязательно </img>',
          'Нет, это самозакрывающийся тег',
          'Только в старом HTML4',
          'Только если есть атрибут alt',
        ],
        correctAnswer: '1',
        points: 1,
      },
      {
        id: 'l8_q5',
        text: 'Какой тег вставляет видео на страницу?',
        type: 'multiple_choice',
        options: ['<media>', '<movie>', '<video>', '<play>'],
        correctAnswer: '2',
        points: 1,
      },
    ],
  },
  {
    title: 'ДЗ (код): Изображения (Урок 8)',
    description: 'Создай галерею: вставь 2 изображения с правильным alt и подписями. Закрепляем тег <img>, src и alt.',
    type: 'code',
    lessonSlug: 'html-images-media',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Галерея</title>
</head>
<body>

  <h1>Моя галерея</h1>

  <!-- 1. Вставь первое изображение через <img>. Используй ссылку:
       https://picsum.photos/300/200
       Обязательно добавь атрибут alt с описанием. -->

  <!-- 2. Добавь под картинкой подпись в теге <p> -->

  <!-- 3. Вставь второе изображение https://picsum.photos/300/201 со своим alt -->

</body>
</html>`,
    starterCss: `body { font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #222; text-align: center; }
h1 { color: #4f46e5; }
img { border-radius: 12px; margin-top: 16px; max-width: 100%; }
p  { color: #555; margin: 8px 0 24px; }`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 9-10: Таблицы и Формы (html-tables + html-forms)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Таблицы и формы (Уроки 9–10)',
    description: 'Общее задание по темам «Таблицы» и «Формы». Свёрстай страницу «Запись на курс»: таблица с расписанием и форма регистрации.',
    type: 'code',
    lessonSlug: 'html-forms',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Запись на курс</title>
</head>
<body>

  <h1>Запись на курс</h1>

  <h2>Расписание занятий</h2>
  <!-- ЧАСТЬ 1 — ТАБЛИЦА (тема «Таблицы»)
       Создай таблицу <table> с 3 столбцами: День, Время, Тема.
       - В первой строке используй заголовки <th> внутри <tr>
       - Добавь минимум 2 строки данных <tr> с ячейками <td> -->


  <h2>Форма регистрации</h2>
  <!-- ЧАСТЬ 2 — ФОРМА (тема «Формы»)
       Внутри <form> добавь:
       1. Текстовое поле для имени:  <label> + <input type="text">
       2. Поле email:               <input type="email">
       3. Выпадающий список курса:   <select> с 2-3 вариантами <option>
       4. Чекбокс согласия:          <input type="checkbox"> + <label>
       5. Кнопку отправки:           <button type="submit"> -->


</body>
</html>`,
    starterCss: `body { font-family: Arial, sans-serif; max-width: 640px; margin: 0 auto; padding: 24px; color: #222; }
h1 { color: #4f46e5; }
h2 { color: #374151; margin-top: 28px; }

table { border-collapse: collapse; width: 100%; margin-top: 12px; }
th, td { border: 1px solid #d1d5db; padding: 8px 12px; text-align: left; }
th { background: #eef2ff; color: #4f46e5; }

form { display: flex; flex-direction: column; gap: 12px; margin-top: 12px; max-width: 360px; }
label { font-weight: 600; font-size: 14px; }
input[type="text"], input[type="email"], select {
  padding: 8px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;
}
button {
  padding: 10px; background: #4f46e5; color: white; border: none;
  border-radius: 8px; font-weight: 600; cursor: pointer;
}`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 11-12-13: Семантика + Введение в CSS + Селекторы
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Семантика и селекторы (Уроки 11–13)',
    description: 'Общее задание по темам «Семантический HTML», «Введение в CSS» и «Селекторы CSS». Свёрстай страницу с правильной семантической структурой и стилизуй её разными типами селекторов (тег, класс, id).',
    type: 'code',
    lessonSlug: 'css-selectors',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Мой блог</title>
</head>
<body>

  <!-- ЧАСТЬ 1 — СЕМАНТИКА (тема «Семантический HTML»)
       Собери страницу из семантических тегов вместо div:

       1. <header> — внутри <h1> с названием сайта
       2. <nav>    — список ссылок (ul > li > a): Главная, О нас, Контакты
       3. <main>   — внутри две статьи <article>, в каждой <h2> и <p>
       4. <footer> — параграф с (c) и текущим годом

       Подсказка по селекторам ниже:
       - дай тегу <header> атрибут id="top"
       - дай обоим <article> атрибут class="post"
  -->

</body>
</html>`,
    starterCss: `/* ЧАСТЬ 2 — СЕЛЕКТОРЫ (темы «Введение в CSS» и «Селекторы CSS»)
   Стилизуй страницу, используя ТРИ разных типа селектора: */

/* 1. СЕЛЕКТОР ПО ТЕГУ — задай шрифт и отступы для всей страницы */
body {
  font-family: Arial, sans-serif;
  max-width: 700px;
  margin: 0 auto;
  padding: 24px;
  color: #222;
}

/* 2. СЕЛЕКТОР ПО ID (#top) — оформи шапку <header id="top"> */
/* Например: фон, цвет текста, отступы. Напиши правило #top { ... } */


/* 3. СЕЛЕКТОР ПО КЛАССУ (.post) — оформи карточки статей <article class="post"> */
/* Например: рамка, скруглённые углы, padding. Напиши правило .post { ... } */


/* Доп.: оформи nav и ссылки внутри него (nav a { ... }) */
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 12-13-14: Введение в CSS + Селекторы + Цвет и фон
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Цвет, фон и селекторы (Уроки 12–14)',
    description: 'Общее задание по темам «Введение в CSS», «Селекторы CSS» и «Цвет и фон». Свёрстай карточку профиля и оформи её: примени селекторы (тег/класс/id), цвета в разных форматах (HEX, RGB) и градиентный фон.',
    type: 'code',
    lessonSlug: 'css-color-background',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Карточка профиля</title>
</head>
<body>

  <!-- Готовая разметка — её менять не нужно, всё оформление делается в CSS.
       Обрати внимание на id и class — они понадобятся для селекторов. -->

  <div class="card" id="profile">
    <h1 class="name">Анна Смирнова</h1>
    <p class="role">Frontend-разработчик</p>
    <p class="bio">Люблю верстать красивые интерфейсы и учиться новому.</p>
    <button class="btn">Написать мне</button>
  </div>

</body>
</html>`,
    starterCss: `/* Задание: оформи карточку профиля. Используй РАЗНЫЕ селекторы и форматы цвета. */

/* 1. СЕЛЕКТОР ПО ТЕГУ + ГРАДИЕНТНЫЙ ФОН (тема «Цвет и фон»)
   Задай для body градиентный фон через linear-gradient
   и выровни содержимое по центру. */
body {
  margin: 0;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, sans-serif;
  /* добавь: background: linear-gradient(...); */
}

/* 2. СЕЛЕКТОР ПО КЛАССУ (.card) — фон карточки в HEX (#ffffff),
   скруглённые углы, padding и тень box-shadow. */
.card {
  /* твой код */
}

/* 3. СЕЛЕКТОР ПО ID (#profile) — задай ширину карточки и выравнивание текста по центру. */


/* 4. ЦВЕТ ТЕКСТА в разных форматах:
   - .name  — цвет в HEX (например #1f2937)
   - .role  — цвет в формате RGB (например rgb(99, 102, 241))
   - .bio   — любой светло-серый цвет */


/* 5. .btn — фон кнопки цветом, белый текст, без рамки, скруглённые углы, cursor: pointer. */

`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 16-17-18: Блочная модель + Размеры и единицы + Flexbox
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Box model, единицы и Flexbox (Уроки 16–18)',
    description: 'Общее задание по темам «Блочная модель», «Размеры и единицы» и «Flexbox: основы». Свёрстай ряд из трёх карточек: расставь их через flexbox, задай отступы через box model и используй разные единицы (px, rem, %).',
    type: 'code',
    lessonSlug: 'css-flexbox-basics',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Наши услуги</title>
</head>
<body>

  <!-- Разметка готова — менять её не нужно, всё делается в CSS. -->

  <h1>Наши услуги</h1>

  <div class="cards">
    <div class="card">
      <h2>Дизайн</h2>
      <p>Создаём красивые и удобные интерфейсы.</p>
    </div>
    <div class="card">
      <h2>Вёрстка</h2>
      <p>Превращаем макеты в живые страницы.</p>
    </div>
    <div class="card">
      <h2>Поддержка</h2>
      <p>Помогаем и обновляем ваш сайт.</p>
    </div>
  </div>

</body>
</html>`,
    starterCss: `body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 24px; color: #222; }
h1 { color: #4f46e5; text-align: center; }

/* 1. FLEXBOX (тема «Flexbox: основы»)
   Расставь карточки в ряд через flexbox.
   Добавь .cards: display: flex; задай расстояние между карточками (gap)
   и при желании justify-content / align-items. */
.cards {
  /* твой код: display: flex; gap: ...; */
}

/* 2. РАЗМЕРЫ И ЕДИНИЦЫ (тема «Размеры и единицы»)
   Сделай так, чтобы каждая карточка занимала равную ширину.
   Используй РАЗНЫЕ единицы: например width в % или flex: 1,
   а внутренние отступы (padding) — в rem. */
.card {
  /* 3. БЛОЧНАЯ МОДЕЛЬ (тема «Блочная модель»)
     Задай: padding (в rem), border (1px solid),
     border-radius и margin при необходимости. */

  /* твой код */
}

.card h2 { color: #374151; margin-top: 0; }
.card p  { color: #6b7280; line-height: 1.5; }
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 19-20: Flexbox-практика + Позиционирование
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Flexbox-практика и позиционирование (Уроки 19–20)',
    description: 'Общее задание по темам «Flexbox: практика» и «Позиционирование». Свёрстай витрину товаров: карточки в гибкой сетке (flex-wrap, gap), бейдж «-30%» через position: absolute и липкую шапку position: sticky.',
    type: 'code',
    lessonSlug: 'css-positioning',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Магазин</title>
</head>
<body>

  <!-- Разметка готова — менять её не нужно, всё делается в CSS. -->

  <header class="topbar">🛍️ Мой магазин</header>

  <main class="catalog">
    <div class="product">
      <span class="badge">-30%</span>
      <h3>Кроссовки</h3>
      <p>4 990 ₽</p>
    </div>
    <div class="product">
      <h3>Рюкзак</h3>
      <p>2 490 ₽</p>
    </div>
    <div class="product">
      <span class="badge">-30%</span>
      <h3>Куртка</h3>
      <p>7 990 ₽</p>
    </div>
    <div class="product">
      <h3>Кепка</h3>
      <p>990 ₽</p>
    </div>
  </main>

</body>
</html>`,
    starterCss: `* { box-sizing: border-box; }
body { font-family: Arial, sans-serif; margin: 0; color: #222; background: #f3f4f6; }

/* 1. ЛИПКАЯ ШАПКА (тема «Позиционирование»)
   Сделай шапку прилипающей к верху при прокрутке:
   position: sticky; top: 0; + фон, цвет, padding. */
.topbar {
  /* твой код: position: sticky; top: 0; ... */
  background: #4f46e5;
  color: white;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
}

/* 2. FLEXBOX-ПРАКТИКА (тема «Flexbox: практика»)
   Разложи карточки гибкой сеткой: display: flex; flex-wrap: wrap;
   задай gap между ними и отступы вокруг. */
.catalog {
  /* твой код: display: flex; flex-wrap: wrap; gap: ...; padding: ...; */
}

/* 3. Карточка товара. ВАЖНО: задай position: relative —
   это нужно, чтобы бейдж позиционировался относительно карточки. */
.product {
  position: relative;
  background: white;
  border-radius: 12px;
  padding: 20px;
  width: 200px;
  text-align: center;
}

/* 4. БЕЙДЖ (тема «Позиционирование»)
   Прижми бейдж «-30%» к правому верхнему углу карточки:
   position: absolute; top / right; + фон, цвет, padding, скругление. */
.badge {
  /* твой код: position: absolute; top: 10px; right: 10px; ... */
}
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 22-23: Адаптивный дизайн + Псевдоклассы и анимации
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Адаптивность и анимации (Уроки 22–23)',
    description: 'Общее задание по темам «Адаптивный дизайн» и «Псевдоклассы и анимации». Свёрстай промо-страницу: карточки перестраиваются в колонку на телефоне через @media, кнопка и карточки плавно реагируют на наведение (:hover + transition + transform), а бейдж «NEW» пульсирует через @keyframes.',
    type: 'code',
    lessonSlug: 'css-pseudo-animations',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Промо-страница</title>
</head>
<body>

  <!-- Разметка готова — менять её не нужно, всё делается в CSS. -->

  <section class="hero">
    <span class="badge">NEW</span>
    <h1>Курс по вёрстке</h1>
    <a href="#" class="btn">Записаться</a>
  </section>

  <main class="features">
    <div class="card">
      <h3>📱 Адаптивность</h3>
      <p>Сайт красиво выглядит на любом экране.</p>
    </div>
    <div class="card">
      <h3>✨ Анимации</h3>
      <p>Плавные эффекты без единой строчки JS.</p>
    </div>
    <div class="card">
      <h3>🚀 Практика</h3>
      <p>Реальные проекты с первого урока.</p>
    </div>
  </main>

</body>
</html>`,
    starterCss: `* { box-sizing: border-box; }
body { font-family: Arial, sans-serif; margin: 0; color: #222; background: #f3f4f6; }

.hero {
  position: relative;
  text-align: center;
  padding: 60px 20px;
  background: #4f46e5;
  color: white;
}
.hero h1 { margin: 0 0 24px; }

/* ─────────────────────────────────────────────────────────────
   1. КНОПКА С ПЛАВНЫМ НАВЕДЕНИЕМ (тема «Псевдоклассы и анимации»)
   Добавь transition, чтобы изменения были плавными,
   и опиши :hover — кнопка должна чуть приподниматься.
   Подсказка: transition: all 0.3s ease;
              .btn:hover { transform: translateY(-3px); + другой фон } */
.btn {
  display: inline-block;
  background: #22c55e;
  color: white;
  padding: 12px 28px;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  /* твой код: transition: ... */
}
/* твой код: .btn:hover { ... } */

/* ─────────────────────────────────────────────────────────────
   2. АНИМАЦИЯ ПУЛЬСАЦИИ (тема «Псевдоклассы и анимации»)
   Опиши @keyframes pulse, где бейдж меняет размер (transform: scale),
   и подключи его к .badge через свойство animation.
   Подсказка:
     @keyframes pulse {
       0%, 100% { transform: scale(1); }
       50%      { transform: scale(1.2); }
     }
     .badge { animation: pulse 1s ease-in-out infinite; } */
.badge {
  position: absolute;
  top: 16px;
  right: 16px;
  background: #ef4444;
  color: white;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: bold;
  /* твой код: animation: ... */
}

/* ─────────────────────────────────────────────────────────────
   3. КАРТОЧКИ (тема «Псевдоклассы и анимации»)
   Добавь transition и :hover, чтобы карточка приподнималась
   и появлялась тень при наведении. */
.features {
  display: flex;
  gap: 20px;
  padding: 40px;
}
.card {
  flex: 1;
  background: white;
  border-radius: 12px;
  padding: 24px;
  /* твой код: transition: ...; */
}
.card h3 { margin-top: 0; }
/* твой код: .card:hover { transform: ...; box-shadow: ...; } */

/* ─────────────────────────────────────────────────────────────
   4. АДАПТИВНОСТЬ (тема «Адаптивный дизайн»)
   На экранах уже 600px карточки должны стоять НЕ в ряд, а в колонку.
   Заполни медиа-запрос: поменяй flex-direction у .features на column. */
@media (max-width: 600px) {
  .features {
    /* твой код: flex-direction: column; */
  }
}
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 24-26: Введение в JS + Переменные + Операторы
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Переменные и операторы (Уроки 24–26)',
    description:
      'Общее задание по темам «Введение в JavaScript», «Переменные» и «Операторы». Напиши скрипт «Мой профиль»: объяви переменные о себе, проверь их типы, посчитай значения арифметическими операторами и прими решения через операторы сравнения и логические операторы. Каждый шаг выводится в консоль через console.log — результат сразу видно после нажатия «Запустить код».',
    type: 'code',
    lessonSlug: 'js-operators',
    starterJs: `// ДЗ: «Мой профиль» — переменные и операторы
// Выполняй задания по порядку. Не забывай console.log() после каждого
// шага — только так ты увидишь результат в консоли справа после
// нажатия «Запустить код».

// ─────────────────────────────────────────────────────────────
// 1. ПЕРЕМЕННЫЕ (тема «Переменные»)
// Объяви три переменные о себе, выбрав правильное слово:
//   const — если значение никогда не изменится
//   let   — если значение может измениться позже
//
//   const name       — твоё имя, строка, например "Аружан"
//   let   age        — твой возраст, число
//   let   isStudent  — учишься ли ты сейчас, true или false

// твой код:


console.log('Меня зовут', name, ', мне', age, 'лет');

// ─────────────────────────────────────────────────────────────
// 2. ТИПЫ ДАННЫХ (тема «Введение в JavaScript»)
// У каждого значения есть тип. Узнать тип переменной помогает
// оператор typeof. Пример: console.log(typeof name); // "string"
//
// Выведи в консоль типы всех трёх переменных: name, age, isStudent.

// твой код:


// ─────────────────────────────────────────────────────────────
// 3. АРИФМЕТИЧЕСКИЕ ОПЕРАТОРЫ (тема «Операторы»)
// Посчитай, сколько лет осталось до 18-летия, и сохрани
// результат в новую переменную yearsUntil18 (если возраст
// уже больше 18 — число получится отрицательным, это нормально).
// Подсказка: 18 - age

let yearsUntil18 = 0 /* замени 0 на своё выражение */;
console.log('Лет до 18-летия:', yearsUntil18);

// ─────────────────────────────────────────────────────────────
// 4. ОПЕРАТОРЫ СРАВНЕНИЯ (тема «Операторы»)
// Сравни age с 18 через оператор >= и сохрани результат
// (true или false) в переменную isAdult.

let isAdult = false /* замени на своё сравнение: age >= 18 */;
console.log('Совершеннолетний:', isAdult);

// ─────────────────────────────────────────────────────────────
// 5. ЛОГИЧЕСКИЕ ОПЕРАТОРЫ (тема «Операторы»)
// Объедини isStudent и isAdult через && (И) и || (ИЛИ):
//
//   canGetStudentDiscount — true, если isStudent И НЕ isAdult
//     (подсказка: используй !isAdult)
//   canVote               — true, если isAdult ИЛИ isStudent
//
// Выведи оба результата в консоль.

// твой код:
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 28-29: Условия + Циклы
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Условия и циклы (Уроки 28–29)',
    description:
      'Общее задание по темам «Условия» и «Циклы». Напиши скрипт «Погода на неделе»: определяй тип погоды через if/else и тернарный оператор, считай сумму и среднее циклом for, выводи дни через for...of, находи первый жаркий день через while + break и фильтруй холодные дни через continue. Каждый шаг выводится в консоль через console.log — результат сразу видно после нажатия «Запустить код».',
    type: 'code',
    lessonSlug: 'js-loops',
    starterJs: `// ДЗ: «Погода на неделе» — условия и циклы
// Выполняй задания по порядку. Не забывай console.log() после каждого
// шага — только так ты увидишь результат в консоли справа после
// нажатия «Запустить код».

const temps = [18, 22, 27, 15, 30, 12, 25]; // температура по дням, °C
const days  = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

// ─────────────────────────────────────────────────────────────
// 1. IF / ELSE IF / ELSE (тема «Условия»)
// Напиши функцию describeTemp(t), которая возвращает строку:
//   - "жарко"      если t >= 25
//   - "тепло"      если t >= 18 и t < 25
//   - "прохладно"  если t < 18

function describeTemp(t) {
  // твой код

}

console.log('Пн:', describeTemp(temps[0]));

// ─────────────────────────────────────────────────────────────
// 2. ТЕРНАРНЫЙ ОПЕРАТОР (тема «Условия»)
// Одной строкой выведи, нужна ли куртка в понедельник:
// если temps[0] < 20 — "Возьми куртку", иначе — "Куртка не нужна".
// Подсказка: условие ? 'если true' : 'если false'

// твой код:


// ─────────────────────────────────────────────────────────────
// 3. ЦИКЛ FOR (тема «Циклы»)
// Посчитай сумму всех температур недели классическим циклом
// for (let i = 0; i < temps.length; i++), прибавляя temps[i] к total.

let total = 0;
// твой код: цикл for


console.log('Сумма температур:', total);
console.log('Средняя температура:', total / temps.length);

// ─────────────────────────────────────────────────────────────
// 4. ЦИКЛ FOR...OF (тема «Циклы»)
// Пройдись по массиву days обычным циклом for (нужен индекс i,
// чтобы достать temps[i] и days[i]) и выведи для каждого дня
// строку вида "Пн: 18°C — прохладно", используя describeTemp.

// твой код:


// ─────────────────────────────────────────────────────────────
// 5. WHILE + BREAK (тема «Циклы»)
// Найди ПЕРВЫЙ жаркий день (temp >= 25) через цикл while:
// как только нашёл — выведи его в консоль и прерви цикл через break.

let i = 0;
while (i < temps.length) {
  // твой код: если temps[i] >= 25 — вывести days[i] и сделать break

  i++;
}

// ─────────────────────────────────────────────────────────────
// 6. CONTINUE (тема «Циклы»)
// Пройдись по temps циклом for и выведи в консоль только
// холодные дни (temp < 18), пропуская остальные через continue.

// твой код:
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Урок 30: Функции
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Функции (Урок 30)',
    description:
      'Большое задание по теме «Функции». Напиши систему расчёта чека для кофейни «Кофейня»: объявление функций с параметрами и return, параметры по умолчанию, функция-выражение, функции, вызывающие другие функции, и разбор области видимости переменных. Каждый шаг выводится в консоль через console.log — результат сразу видно после нажатия «Запустить код».',
    type: 'code',
    lessonSlug: 'js-functions',
    starterJs: `// ДЗ: «Кофейня» — считаем чек с помощью функций
// Выполняй задания по порядку. Не забывай console.log() после каждого
// шага — только так ты увидишь результат в консоли справа после
// нажатия «Запустить код».

const prices = {
  latte: 1200,
  cappuccino: 1100,
  americano: 900,
  tea: 700,
};

// ─────────────────────────────────────────────────────────────
// 1. ОБЪЯВЛЕНИЕ ФУНКЦИИ + ПАРАМЕТР + RETURN (тема «Функции»)
// Напиши функцию getPrice(drink), которая принимает название
// напитка (строку) и возвращает его цену из объекта prices.
// Если такого напитка нет в prices — верни 0.
// Подсказка: prices[drink] ?? 0

function getPrice(drink) {
  // твой код

}

console.log('Цена латте:', getPrice('latte'));
console.log('Цена неизвестного напитка:', getPrice('cocoa'));

// ─────────────────────────────────────────────────────────────
// 2. ПАРАМЕТР ПО УМОЛЧАНИЮ (тема «Функции»)
// Напиши функцию calculateTotal(drink, quantity = 1), которая
// вызывает getPrice(drink) и умножает результат на quantity.
// Если quantity не передать — должна использоваться 1.

function calculateTotal(drink, quantity = 1) {
  // твой код

}

console.log('1 капучино:', calculateTotal('cappuccino'));
console.log('3 американо:', calculateTotal('americano', 3));

// ─────────────────────────────────────────────────────────────
// 3. ФУНКЦИЯ-ВЫРАЖЕНИЕ (тема «Функции»)
// Здесь функция записана не через "function name() {}", а как
// значение, сохранённое в переменной — это и есть функция-выражение.
// Допиши тело: applyDiscount(total, percent) должна вернуть total,
// уменьшенный на percent процентов.
// Подсказка: total - (total * percent) / 100

const applyDiscount = function (total, percent) {
  // твой код

};

console.log('1000 со скидкой 10%:', applyDiscount(1000, 10));

// ─────────────────────────────────────────────────────────────
// 4. ФУНКЦИЯ, ВЫЗЫВАЮЩАЯ ДРУГУЮ ФУНКЦИЮ (тема «Функции»)
// Напиши функцию makeOrder(drink, quantity, discountPercent),
// которая:
//   1) считает сумму через calculateTotal(drink, quantity)
//   2) применяет скидку через applyDiscount(сумма, discountPercent)
//   3) возвращает итоговую сумму

function makeOrder(drink, quantity, discountPercent) {
  // твой код

}

console.log('Заказ: 2 латте со скидкой 15%:', makeOrder('latte', 2, 15));

// ─────────────────────────────────────────────────────────────
// 5. МАССИВ ЗАКАЗОВ (собираем всё вместе)
// Пройдись циклом по массиву orders и для каждого заказа вызови
// makeOrder(), прибавляя результат к переменной grandTotal.
// В конце выведи grandTotal в консоль.

const orders = [
  { drink: 'latte', quantity: 2, discountPercent: 0 },
  { drink: 'tea', quantity: 1, discountPercent: 0 },
  { drink: 'americano', quantity: 3, discountPercent: 10 },
];

let grandTotal = 0;
// твой код: цикл по orders, вызывающий makeOrder() для каждого заказа


console.log('Итого по всем заказам:', grandTotal);

// ─────────────────────────────────────────────────────────────
// 6. ОБЛАСТЬ ВИДИМОСТИ (тема «Функции»)
// Переменная total внутри calculateTotal — ЛОКАЛЬНАЯ: она видна
// только внутри этой функции и не существует снаружи.
// Раскомментируй строку ниже и посмотри, что произойдёт при запуске
// (в консоли появится ошибка — это ожидаемо, так и должно быть).

// console.log(total);

// Объясни в комментарии своими словами: почему JS не находит
// переменную total здесь, хотя она использовалась внутри
// calculateTotal выше?

// твой ответ (комментарием):
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ДЗ — Уроки 31-33: Стрелочные функции + Массивы + Методы массивов
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'ДЗ (код): Стрелочные функции, массивы и методы массивов (Уроки 31–33)',
    description:
      'Общее задание по темам «Стрелочные функции», «Массивы» и «Методы массивов». Напиши скрипт «Корзина интернет-магазина»: добавляй и удаляй товары через push/pop, перепиши обычную функцию в стрелочную, посчитай стоимость каждого товара через map, отфильтруй дорогие товары через filter, посчитай сумму корзины через reduce и проверь условия через find/some/every. Каждый шаг выводится в консоль через console.log — результат сразу видно после нажатия «Запустить код».',
    type: 'code',
    lessonSlug: 'js-array-methods',
    starterJs: `// ДЗ: «Корзина интернет-магазина» — стрелочные функции и массивы
// Выполняй задания по порядку. Не забывай console.log() после каждого
// шага — только так ты увидишь результат в консоли справа после
// нажатия «Запустить код».

const cart = [
  { name: 'Наушники', price: 5990, qty: 1 },
  { name: 'Чехол',    price: 990,  qty: 2 },
  { name: 'Кабель',   price: 490,  qty: 3 },
];

// ─────────────────────────────────────────────────────────────
// 1. МАССИВЫ: ДОСТУП И ИЗМЕНЕНИЕ (тема «Массивы»)
// - Выведи в консоль первый товар корзины через индекс (cart[0]).
// - Добавь новый товар { name: 'Зарядка', price: 1490, qty: 1 }
//   в конец массива через push().
// - Удали последний товар из корзины через pop() и выведи,
//   что именно удалилось (pop() возвращает удалённый элемент).

// твой код:


console.log('Корзина после изменений:', cart);

// ─────────────────────────────────────────────────────────────
// 2. СТРЕЛОЧНЫЕ ФУНКЦИИ (тема «Стрелочные функции»)
// Вот обычная функция, которая считает стоимость одного товара
// (цена * количество). Перепиши её в стрелочную функцию
// getItemTotal — с тем же результатом, но через синтаксис =>.
//
// function getItemTotal(item) {
//   return item.price * item.qty;
// }

const getItemTotal = (item) => 0; // твой код: замени 0 на item.price * item.qty

console.log('Стоимость наушников:', getItemTotal(cart[0]));

// ─────────────────────────────────────────────────────────────
// 3. MAP (тема «Методы массивов»)
// С помощью cart.map() и функции getItemTotal получи новый
// массив itemTotals — стоимость каждого товара в корзине.

const itemTotals = cart.map((item) => 0); // твой код: верни getItemTotal(item)
console.log('Стоимость каждого товара:', itemTotals);

// ─────────────────────────────────────────────────────────────
// 4. FILTER (тема «Методы массивов»)
// С помощью cart.filter() получи массив expensiveItems —
// только товары с ценой больше 1000.

const expensiveItems = cart.filter((item) => false); // твой код: item.price > 1000
console.log('Дорогие товары:', expensiveItems);

// ─────────────────────────────────────────────────────────────
// 5. REDUCE (тема «Методы массивов»)
// С помощью cart.reduce() посчитай итоговую сумму корзины —
// сумму getItemTotal(item) по всем товарам.
// Подсказка: cart.reduce((sum, item) => sum + getItemTotal(item), 0)

const cartTotal = cart.reduce((sum, item) => sum, 0); // твой код: sum + getItemTotal(item)
console.log('Итоговая сумма корзины:', cartTotal);

// ─────────────────────────────────────────────────────────────
// 6. FIND, SOME, EVERY (тема «Методы массивов»)
// - find:  найди в корзине товар с именем 'Кабель' через find()
// - some:  проверь, есть ли в корзине хоть один товар дороже 5000
// - every: проверь, что у ВСЕХ товаров количество (qty) больше 0

const cableItem    = cart.find((item) => false);  // твой код: item.name === 'Кабель'
const hasExpensive = cart.some((item) => false);  // твой код: item.price > 5000
const allInStock   = cart.every((item) => true);  // твой код: item.qty > 0

console.log('Найденный товар:', cableItem);
console.log('Есть товар дороже 5000:', hasExpensive);
console.log('У всех товаров qty > 0:', allInStock);
`,
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // ФИНАЛЬНЫЙ ПРОЕКТ: Интернет-магазин (Темы 1–35)
  // ─────────────────────────────────────────────────────────────────────────────
  {
    title: 'Финальный проект: Интернет-магазин электроники',
    description:
      'Огромный проект, объединяющий ВСЕ темы курса (1–35). Напиши полноценный интернет-магазин: правильная HTML-структура, отзывчивый дизайн с flexbox/grid и адаптивностью, динамический рендеринг товаров, фильтрацию по цене и категориям, поиск, работающую корзину с localStorage, вычисление скидок и скидки при оформлении заказа. Ты напишешь всё с нуля — HTML, CSS, и полный JavaScript функционал. Это настоящий проект!',
    type: 'code',
    starterHtml: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Магазин Электроники</title>
</head>
<body>

  <!--
    ЗАДАНИЕ: Напиши HTML разметку магазина с семантическими тегами.

    Структура должна включать:

    1. ШАПКА (header) с:
       - Логотипом/названием магазина
       - Инпутом для поиска (id="searchInput")
       - Количеством товаров в корзине (id="cartCount")
       - Кнопкой "Мобильное меню" для адаптивности (не обязательно)

    2. ОСНОВНОЕ СОДЕРЖИМОЕ (main) с двумя колонками:

       а) ЛЕВАЯ КОЛОНКА - ФИЛЬТРЫ:
          - Заголовок "Фильтры"
          - Диапазон цены (два инпута: минимум, максимум) с кнопкой "Применить"
            (id="priceMin", id="priceMax", id="applyFiltersBtn")
          - Чекбоксы категорий (Ноутбуки, Телефоны, Планшеты, Наушники)
            (class="categoryCheckbox", data-category="...")
          - Кнопка очистить фильтры

       б) ПРАВАЯ КОЛОНКА - ТОВАРЫ:
          - Контейнер для товаров (id="productsContainer")
            Каждый товар будет добавлен JS-ом, формат:
            <div class="product-card">
              <img src="..." alt="...">
              <h3>Название</h3>
              <p class="category">Категория</p>
              <p class="price">Цена</p>
              <button class="add-to-cart" data-id="...">В корзину</button>
            </div>

    3. БОКОВАЯ ПАНЕЛЬ КОРЗИНЫ (aside, может быть справа или внизу):
       - Заголовок "Корзина"
       - Список товаров в корзине (id="cartItems")
       - Итоговая сумма (id="cartTotal")
       - Поле ввода кода скидки (id="discountCode")
       - Кнопка "Применить скидку" (id="applyDiscountBtn")
       - Сумма со скидкой (id="cartTotalWithDiscount")
       - Кнопка "Оформить заказ" (id="checkoutBtn")

    Используй семантические теги: <header>, <nav>, <main>, <section>, <article>, <aside>, <footer>
  -->

</body>
</html>`,
    starterCss: `/*
  ЗАДАНИЕ: Напиши CSS для магазина с использованием всех изученных свойств.

  Требования:

  1. БЛОЧНАЯ МОДЕЛЬ И СЕЛЕКТОРЫ (темы 12-16):
     - Используй селекторы по тегу, классу, id и комбинаторы
     - Задай margin и padding для отступов
     - Используй border, border-radius для рамок
     - box-sizing: border-box для контейнеров

  2. РАЗМЕРЫ И ЕДИНИЦЫ (тема 17):
     - Используй разные единицы: px, rem, %, vw/vh
     - max-width для ограничения ширины контейнера
     - max-width для адаптивности

  3. FLEXBOX (темы 18-19):
     - header должна быть flex с распределением элементов
     - main с двумя колонками через flex (левая узкая, правая широкая)
     - товары в сетку через flex-wrap
     - корзина — тоже flex колонна

  4. ЦВЕТ И ШРИФТЫ (темы 13-15):
     - Используй разные форматы цветов: #HEX, rgb(), rgba()
     - Задай font-family, font-size, line-height
     - Используй разные оттенки для заголовков, текста, фона

  5. ПОЗИЦИОНИРОВАНИЕ (тема 20):
     - Липкая шапка (position: sticky; top: 0)
     - Может быть fixed корзина сбоку

  6. АДАПТИВНОСТЬ (тема 22):
     - @media (max-width: 768px) - планшет
     - @media (max-width: 480px) - мобила
     - На мобиле: колонки в ряд, товары в одну колонку, скрыть фильтры

  7. АНИМАЦИИ (тема 23):
     - transition при hover на товарах (поднятие, изменение тени)
     - Плавное изменение цвета кнопок при hover
     - @keyframes для анимации добавления в корзину (опционально)

  Напиши полный CSS, используя все эти техники.
*/

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
  background-color: #f5f5f5;
}

/* твой CSS код здесь */`,
    starterJs: `/*
  ФИНАЛЬНЫЙ ПРОЕКТ: ИНТЕРНЕТ-МАГАЗИН ЭЛЕКТРОНИКИ

  Напиши весь JavaScript с нуля, используя все изученные техники.
  Работай по секциям ниже.
*/

// ═══════════════════════════════════════════════════════════════════════════
// СЕКЦИЯ 1: ДАННЫЕ (темы 24-26, 29, 32)
// ═══════════════════════════════════════════════════════════════════════════

// Массив товаров. Каждый товар — объект с полями:
// id, name, category, price, image (можно использовать https://via.placeholder.com/200)
// ЗАДАНИЕ: Создай массив из минимум 12 товаров 4 категорий.

// КОДЫ СКИДОК (для применения скидки):
// "SUMMER2024" - 10% скидка
// "NEWYEAR" - 15% скидка
// "STUDENT" - 20% скидка

// ═══════════════════════════════════════════════════════════════════════════
// СЕКЦИЯ 2: СОСТОЯНИЕ КОРЗИНЫ (тема 24-26, 32)
// ═══════════════════════════════════════════════════════════════════════════

// ЗАДАНИЕ: Создай переменные для:
// - cart (массив товаров в корзине, загружаемый из localStorage при загрузке)
// - appliedDiscount (строка с кодом скидки или null)

// ЗАДАНИЕ: При загрузке страницы:
// - Загрузи cart из localStorage (ключ "cart")
// - Загрузи appliedDiscount из localStorage (ключ "discount")
// - Обнови интерфейс (renderProducts, updateCartUI)

// ═══════════════════════════════════════════════════════════════════════════
// СЕКЦИЯ 3: ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ (тема 30-31)
// ═══════════════════════════════════════════════════════════════════════════

// ЗАДАНИЕ 3.1: Напиши функцию saveCart(), которая сохраняет
// текущий массив cart в localStorage под ключом "cart"
// Подсказка: JSON.stringify()

// ЗАДАНИЕ 3.2: Напиши функцию getCartTotal(items), которая
// принимает массив товаров и возвращает сумму всех товаров.
// Используй reduce() (тема 33)

// ЗАДАНИЕ 3.3: Напиши функцию applyDiscountCode(code), которая:
// - Проверяет, существует ли такой код в объекте discountCodes
// - Если да — сохраняет в appliedDiscount и возвращает процент скидки
// - Если нет — выводит alert "Неверный код" и возвращает 0
// Используй объекты и условия (темы 26, 29)

// ═══════════════════════════════════════════════════════════════════════════
// СЕКЦИЯ 4: РЕНДЕРИНГ ТОВАРОВ (тема 35: DOM)
// ═══════════════════════════════════════════════════════════════════════════

// ЗАДАНИЕ 4.1: Напиши функцию renderProducts(productsToShow), которая:
// 1) Находит элемент с id="productsContainer"
// 2) Очищает его (innerHTML = "")
// 3) Проходит циклом (for или forEach) по массиву productsToShow
// 4) Для каждого товара создаёт <div class="product-card"> с:
//    - <img src="...">
//    - <h3> с названием
//    - <p class="category"> с категорией
//    - <p class="price"> с ценой
//    - <button class="add-to-cart" data-id="ID"> с текстом "В корзину"
// 5) Добавляет эту карточку в контейнер через appendChild()
// Подсказка: document.createElement(), textContent, dataset

// ЗАДАНИЕ 4.2: Вызови renderProducts(products) при загрузке страницы
// (в конце скрипта или в обработчике DOMContentLoaded)

// ═══════════════════════════════════════════════════════════════════════════
// СЕКЦИЯ 5: ФИЛЬТРАЦИЯ И ПОИСК (темы 28-29, 33)
// ═══════════════════════════════════════════════════════════════════════════

// ЗАДАНИЕ 5.1: Напиши функцию filterProducts(), которая:
// 1) Получает значения из инпутов фильтра (priceMin, priceMax, выбранные чекбоксы)
// 2) Использует filter() (тема 33) для отбора товаров:
//    - Цена между минимум и максимум
//    - Категория в выбранных
// 3) Вызывает renderProducts() с отфильтрованным массивом
// Подсказка: document.getElementById(), document.querySelectorAll(),
//           Array.from(), includes()

// ЗАДАНИЕ 5.2: Напиши функцию searchProducts(), которая:
// 1) Получает значение из инпута поиска (id="searchInput")
// 2) Использует filter() для поиска товаров по названию (includes())
// 3) Комбинирует с текущими фильтрами и выводит результат
// Подсказка: toLowerCase() для регистронезависимого поиска

// ЗАДАНИЕ 5.3: Добавь обработчики событий (addEventListener):
// - На инпут поиска (input) — вызывай searchProducts()
// - На чекбоксы категорий (change) — вызывай filterProducts()
// - На кнопку "Применить фильтры" (click) — вызывай filterProducts()
// - На кнопку "Очистить фильтры" (click) — сброс и renderProducts(products)

// ═══════════════════════════════════════════════════════════════════════════
// СЕКЦИЯ 6: РАБОТА С КОРЗИНОЙ (темы 24-35)
// ═══════════════════════════════════════════════════════════════════════════

// ЗАДАНИЕ 6.1: Напиши функцию addToCart(productId), которая:
// 1) Находит товар в массиве products по id
// 2) Проверяет, есть ли уже такой товар в cart
//    - Если да — увеличи quantity на 1
//    - Если нет — добавь товар в cart с quantity: 1
// 3) Сохрани cart в localStorage через saveCart()
// 4) Обнови интерфейс через updateCartUI()
// Подсказка: find() из тема 33

// ЗАДАНИЕ 6.2: Напиши функцию removeFromCart(productId), которая:
// 1) Удаляет товар из cart по id
// 2) Сохраняет изменения в localStorage
// 3) Обновляет UI

// ЗАДАНИЕ 6.3: Напиши функцию updateCartQuantity(productId, newQuantity), которая:
// 1) Находит товар в cart
// 2) Если newQuantity <= 0 — удаляет товар (removeFromCart)
// 3) Иначе — меняет quantity на newQuantity
// 4) Обновляет UI

// ЗАДАНИЕ 6.4: Напиши функцию updateCartUI(), которая:
// 1) Находит элемент с id="cartItems" и очищает его
// 2) Для каждого товара в cart выводит строку:
//    "Название — Цена × Кол-во = Сумма" с кнопками "-" и "+"
// 3) Обновляет id="cartCount" (количество товаров)
// 4) Вычисляет итоговую сумму через getCartTotal(cart)
// 5) Обновляет id="cartTotal"
// 6) Если применена скидка — вычисляет сумму со скидкой
//    и обновляет id="cartTotalWithDiscount"

// ЗАДАНИЕ 6.5: Добавь обработчики событий:
// - На все кнопки "В корзину" (делегирование! event.target.closest())
//   вызывай addToCart()
// - На кнопки "-" в корзине — вызывай updateCartQuantity(id, qty-1)
// - На кнопки "+" в корзине — вызывай updateCartQuantity(id, qty+1)
// - На кнопку "Удалить" в корзине — вызывай removeFromCart()

// ═══════════════════════════════════════════════════════════════════════════
// СЕКЦИЯ 7: ПРИМЕНЕНИЕ СКИДОК (темы 24-35)
// ═══════════════════════════════════════════════════════════════════════════

// ЗАДАНИЕ 7.1: На кнопке "Применить скидку" (id="applyDiscountBtn")
// добавь обработчик, который:
// 1) Получает значение из инпута кода скидки (id="discountCode")
// 2) Вызывает applyDiscountCode(code)
// 3) Если код верный — сохраняет в localStorage и обновляет UI
// 4) Выводит alert с процентом скидки

// ═══════════════════════════════════════════════════════════════════════════
// СЕКЦИЯ 8: ОФОРМЛЕНИЕ ЗАКАЗА (темы 24-35)
// ═══════════════════════════════════════════════════════════════════════════

// ЗАДАНИЕ 8.1: На кнопке "Оформить заказ" (id="checkoutBtn")
// добавь обработчик, который:
// 1) Проверяет, не пуста ли корзина
// 2) Считает итоговую сумму
// 3) Выводит alert с информацией о заказе:
//    "Спасибо! Ваш заказ на сумму X рублей создан"
// 4) Очищает корзину и localStorage
// 5) Обновляет UI

// ═══════════════════════════════════════════════════════════════════════════
// ИНИЦИАЛИЗАЦИЯ (тема 35)
// ═══════════════════════════════════════════════════════════════════════════

// При загрузке DOM (используй DOMContentLoaded):
// 1) Загрузи cart и discount из localStorage
// 2) Вызови renderProducts(products)
// 3) Вызови updateCartUI()
// 4) Добавь все обработчики событий (addEventListener)

document.addEventListener('DOMContentLoaded', () => {
  // твой код инициализации
});
`,
  },
]
