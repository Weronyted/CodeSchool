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
]
