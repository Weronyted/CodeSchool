import type { Lesson } from '@/types/lesson'

export const htmlTables: Lesson = {
  slug: 'html-tables',
  category: 'HTML',
  readTime: 11,
  icon: '📊',
  title_ru: 'Таблицы в HTML',
  title_en: 'HTML Tables',
  description_ru: 'Освойте создание таблиц с помощью <table>, <tr>, <th>, <td>. Изучите группировку строк, объединение ячеек и стилизацию таблиц через CSS.',
  description_en: 'Master creating tables with <table>, <tr>, <th>, <td>. Learn row grouping, cell merging, and CSS table styling.',
  sections: [
    { id: 'intro', title_ru: 'Когда использовать таблицы', title_en: 'When to Use Tables' },
    { id: 'basic-structure', title_ru: 'Базовая структура таблицы', title_en: 'Basic Table Structure' },
    { id: 'groups', title_ru: 'Группировка строк', title_en: 'Row Grouping' },
    { id: 'spanning', title_ru: 'Объединение ячеек', title_en: 'Spanning Cells' },
    { id: 'styling', title_ru: 'Стилизация таблиц', title_en: 'Styling Tables' },
  ],
  slides: [
    {
      id: 'slide-title',
      type: 'title',
      title_ru: 'Таблицы в HTML',
      title_en: 'HTML Tables',
      body_ru: 'Таблицы — мощный инструмент для отображения структурированных данных. Расписание, прайс-лист, статистика — всё это про таблицы.',
      body_en: 'Tables are a powerful tool for displaying structured data. Schedules, price lists, statistics — that\'s what tables are for.',
      visual: { kind: 'emoji', emojis: ['📊', '🗂️', '📈'] },
    },
    {
      id: 'slide-analogy',
      type: 'analogy',
      title_ru: 'Таблица как клетчатая тетрадь',
      title_en: 'Table as a Grid Notebook',
      body_ru: 'Представьте таблицу как клетчатую тетрадь: строки идут по горизонтали (tr), а столбцы — по вертикали. Каждая клетка — это ячейка данных (td) или заголовка (th).',
      body_en: 'Think of a table like a grid notebook: rows go horizontally (tr), and columns go vertically. Each cell is either a data cell (td) or a header cell (th).',
      visual: {
        kind: 'emoji',
        emojis: ['📓', '➡️', '📊'],
        caption_ru: 'Строки → ячейки → данные',
        caption_en: 'Rows → cells → data',
      },
      bullets: [
        { text_ru: '<table> — вся таблица целиком', text_en: '<table> — the entire table' },
        { text_ru: '<tr> — строка (table row)', text_en: '<tr> — a row (table row)' },
        { text_ru: '<th> — ячейка заголовка (table header)', text_en: '<th> — a header cell (table header)' },
        { text_ru: '<td> — ячейка с данными (table data)', text_en: '<td> — a data cell (table data)' },
      ],
    },
    {
      id: 'slide-concept-structure',
      type: 'concept',
      title_ru: 'Структура таблицы',
      title_en: 'Table Structure',
      body_ru: 'Таблица строится из вложенных элементов. <thead>, <tbody> и <tfoot> семантически делят таблицу на шапку, тело и подвал. Это улучшает доступность и позволяет браузеру оптимизировать рендеринг.',
      body_en: 'A table is built from nested elements. <thead>, <tbody>, and <tfoot> semantically divide the table into header, body, and footer. This improves accessibility and lets the browser optimize rendering.',
      code: `<table>
  <thead>
    <tr>
      <th>Имя</th>
      <th>Возраст</th>
      <th>Город</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Анна</td>
      <td>28</td>
      <td>Москва</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <td colspan="3">Всего: 1 запись</td>
    </tr>
  </tfoot>
</table>`,
      codeLang: 'html',
    },
    {
      id: 'slide-anim',
      type: 'code-anim',
      title_ru: 'Строим таблицу строка за строкой',
      title_en: 'Building a Table Row by Row',
      body_ru: 'Посмотрите, как постепенно собирается таблица с расписанием занятий.',
      body_en: 'Watch how a class schedule table is assembled step by step.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<table border="1">
</table>`,
          comment_ru: 'Начинаем с пустого тега table',
          comment_en: 'Start with an empty table tag',
          preview: '<table border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px"></table>',
        },
        {
          code: `<table border="1">
  <thead>
    <tr>
      <th>День</th>
      <th>Предмет</th>
      <th>Время</th>
    </tr>
  </thead>
</table>`,
          comment_ru: 'Добавляем шапку с заголовками столбцов',
          comment_en: 'Add the header row with column headings',
          preview: '<table border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px"><thead><tr><th style="padding:6px 12px;background:#f0f0f0">День</th><th style="padding:6px 12px;background:#f0f0f0">Предмет</th><th style="padding:6px 12px;background:#f0f0f0">Время</th></tr></thead></table>',
        },
        {
          code: `<table border="1">
  <thead>
    <tr>
      <th>День</th>
      <th>Предмет</th>
      <th>Время</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Понедельник</td>
      <td>Математика</td>
      <td>09:00</td>
    </tr>
    <tr>
      <td>Вторник</td>
      <td>Физика</td>
      <td>10:30</td>
    </tr>
  </tbody>
</table>`,
          comment_ru: 'Добавляем строки данных в tbody',
          comment_en: 'Add data rows inside tbody',
          preview: '<table border="1" style="border-collapse:collapse;font-family:sans-serif;font-size:14px"><thead><tr><th style="padding:6px 12px;background:#f0f0f0">День</th><th style="padding:6px 12px;background:#f0f0f0">Предмет</th><th style="padding:6px 12px;background:#f0f0f0">Время</th></tr></thead><tbody><tr><td style="padding:6px 12px">Понедельник</td><td style="padding:6px 12px">Математика</td><td style="padding:6px 12px">09:00</td></tr><tr><td style="padding:6px 12px">Вторник</td><td style="padding:6px 12px">Физика</td><td style="padding:6px 12px">10:30</td></tr></tbody></table>',
        },
      ],
    },
    {
      id: 'slide-concept-spanning',
      type: 'concept',
      title_ru: 'Объединение ячеек: colspan и rowspan',
      title_en: 'Merging Cells: colspan and rowspan',
      body_ru: 'colspan объединяет ячейки по горизонтали (по столбцам), rowspan — по вертикали (по строкам). Значение атрибута указывает количество объединяемых ячеек.',
      body_en: 'colspan merges cells horizontally (across columns), rowspan merges them vertically (across rows). The attribute value specifies how many cells to merge.',
      code: `<table border="1">
  <tr>
    <!-- Эта ячейка занимает 2 столбца -->
    <th colspan="2">Контакты</th>
  </tr>
  <tr>
    <td>Телефон</td>
    <td>+7 999 000-00-00</td>
  </tr>
  <tr>
    <!-- Эта ячейка занимает 2 строки -->
    <td rowspan="2">Адрес</td>
    <td>ул. Ленина, 1</td>
  </tr>
  <tr>
    <td>г. Москва</td>
  </tr>
</table>`,
      codeLang: 'html',
    },
    {
      id: 'slide-code-styling',
      type: 'code',
      title_ru: 'Стилизация таблицы через CSS',
      title_en: 'Styling a Table with CSS',
      body_ru: 'По умолчанию таблицы выглядят старомодно. CSS позволяет сделать их современными и удобными для чтения.',
      body_en: 'By default, tables look dated. CSS lets you make them modern and easy to read.',
      code: `table {
  width: 100%;
  border-collapse: collapse; /* убирает двойные границы */
  font-family: sans-serif;
}

th, td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #e0e0e0;
}

th {
  background-color: #f5f5f5;
  font-weight: 600;
  color: #333;
}

/* Зебра-полосатость для читаемости */
tbody tr:nth-child(even) {
  background-color: #fafafa;
}

tbody tr:hover {
  background-color: #f0f7ff;
}`,
      codeLang: 'css',
    },
    {
      id: 'slide-compare',
      type: 'compare',
      title_ru: 'Таблица для данных vs таблица для макета',
      title_en: 'Data Table vs Layout Table',
      body_ru: 'В 2000-х таблицы использовали для вёрстки страниц. Сегодня это антипаттерн. Таблицы — только для табличных данных.',
      body_en: 'In the 2000s, tables were used to lay out pages. Today that\'s an anti-pattern. Tables are only for tabular data.',
      compareLeft: {
        label_ru: 'Правильно: данные',
        label_en: 'Correct: data',
        items_ru: [
          'Расписание, прайс-лист, статистика',
          'Строки и столбцы имеют смысловую связь',
          'Работает со скринридерами',
          'SEO-дружественно',
        ],
        items_en: [
          'Schedule, price list, statistics',
          'Rows and columns have meaningful relationships',
          'Works with screen readers',
          'SEO-friendly',
        ],
        color: 'green',
      },
      compareRight: {
        label_ru: 'Неправильно: макет',
        label_en: 'Wrong: layout',
        items_ru: [
          'Расположение колонок, шапки, футера',
          'Данные не связаны структурно',
          'Ломает доступность',
          'Сложно обслуживать и адаптировать',
        ],
        items_en: [
          'Positioning columns, headers, footers',
          'Data has no structural relationship',
          'Breaks accessibility',
          'Hard to maintain and make responsive',
        ],
        color: 'red',
      },
    },
    {
      id: 'slide-tip',
      type: 'tip',
      title_ru: 'Совет: используйте scope для доступности',
      title_en: 'Tip: Use scope for Accessibility',
      body_ru: 'Добавляйте атрибут scope="col" к заголовкам столбцов и scope="row" к заголовкам строк. Это помогает скринридерам правильно связывать ячейки с заголовками в сложных таблицах.',
      body_en: 'Add scope="col" to column headers and scope="row" to row headers. This helps screen readers correctly associate cells with headers in complex tables.',
    },
    {
      id: 'slide-practice',
      type: 'practice-cta',
      title_ru: 'Пора практиковаться!',
      title_en: 'Time to Practice!',
      body_ru: 'Создайте таблицу с расписанием недели: дни в строках, уроки в столбцах. Добавьте стили и объедините выходные дни через rowspan.',
      body_en: 'Create a weekly schedule table: days in rows, lessons in columns. Add styles and merge weekend cells with rowspan.',
    },
  ],
  content: {
    intro_ru: 'Таблицы — один из старейших элементов HTML. Когда-то их использовали для вёрстки, но сегодня их назначение строго определено: отображение табличных данных со строками и столбцами.',
    intro_en: 'Tables are one of HTML\'s oldest elements. They were once used for layout, but today their purpose is strictly defined: displaying tabular data with rows and columns.',
    blocks: [
      {
        sectionId: 'intro',
        heading_ru: 'Когда использовать таблицы',
        heading_en: 'When to Use Tables',
        text_ru: 'Таблицы в HTML предназначены исключительно для отображения табличных данных — информации, которая имеет естественную структуру строк и столбцов. Расписание занятий, прайс-лист, сравнение характеристик продуктов, финансовая статистика — всё это хорошие кандидаты для таблицы.\n\nГлавный вопрос при выборе таблицы: «Связаны ли данные в строках и столбцах смысловой связью?» Если да — таблица уместна. Если вы просто хотите расположить блоки в несколько колонок — используйте CSS Flexbox или Grid. Использование таблиц для вёрстки макета — серьёзная ошибка, нарушающая доступность и семантику.\n\nВ эпоху до CSS (1990-е — начало 2000-х) таблицы были стандартным инструментом вёрстки. Сегодня это антипаттерн: скринридеры воспринимают таблицу как набор данных и читают её иначе, чем обычную разметку, что полностью ломает восприятие у незрячих пользователей.',
        text_en: 'Tables in HTML are exclusively intended for displaying tabular data — information that has a natural structure of rows and columns. A class schedule, price list, product feature comparison, financial statistics — all of these are good candidates for a table.\n\nThe key question when choosing a table: "Do the data in rows and columns have a meaningful relationship?" If yes — a table is appropriate. If you simply want to arrange blocks in multiple columns — use CSS Flexbox or Grid. Using tables for page layout is a serious mistake that breaks accessibility and semantics.\n\nIn the pre-CSS era (1990s — early 2000s) tables were the standard layout tool. Today this is an anti-pattern: screen readers treat a table as a data set and read it differently from regular markup, which completely breaks comprehension for blind users.',
        code: `<!-- Правильно: таблица для данных -->
<table>
  <caption>Расписание уроков</caption>
  <thead>
    <tr>
      <th scope="col">День</th>
      <th scope="col">Предмет</th>
      <th scope="col">Время</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Понедельник</td>
      <td>Математика</td>
      <td>09:00–10:30</td>
    </tr>
  </tbody>
</table>

<!-- Неправильно: таблица для макета -->
<!-- Используйте CSS Grid или Flexbox! -->`,
        codeLang: 'html',
      },
      {
        sectionId: 'basic-structure',
        heading_ru: 'Основные теги таблицы',
        heading_en: 'Core Table Tags',
        text_ru: 'Минимальная таблица состоит из трёх типов тегов: <table> — контейнер, <tr> — строка, <td> — ячейка. Тег <th> используется для ячеек заголовков — браузер делает текст в них жирным и центрирует. Атрибут scope помогает скринридерам понять, к какому направлению относится заголовок.',
        text_en: 'A minimal table consists of three tag types: <table> — the container, <tr> — a row, <td> — a cell. The <th> tag is used for header cells — the browser bolds and centers their text. The scope attribute helps screen readers understand which direction a header applies to.',
        code: `<table>
  <tr>
    <th scope="col">Продукт</th>
    <th scope="col">Цена</th>
    <th scope="col">Количество</th>
  </tr>
  <tr>
    <td>Яблоки</td>
    <td>89 ₽/кг</td>
    <td>50 кг</td>
  </tr>
  <tr>
    <td>Груши</td>
    <td>120 ₽/кг</td>
    <td>30 кг</td>
  </tr>
</table>`,
        codeLang: 'html',
      },
      {
        sectionId: 'groups',
        heading_ru: '<thead>, <tbody>, <tfoot>',
        heading_en: '<thead>, <tbody>, <tfoot>',
        text_ru: 'Эти три элемента семантически делят таблицу. <thead> содержит строки заголовков, <tbody> — строки с данными, <tfoot> — итоговые строки. При печати браузер может повторять <thead> на каждой странице. <tfoot> можно ставить перед <tbody> в коде — браузер всё равно отрендерит его внизу.',
        text_en: 'These three elements semantically divide the table. <thead> holds header rows, <tbody> holds data rows, <tfoot> holds summary rows. When printing, the browser can repeat <thead> on every page. <tfoot> can appear before <tbody> in code — the browser will still render it at the bottom.',
        code: `<table>
  <caption>Итоги продаж за март</caption>
  <thead>
    <tr><th>Менеджер</th><th>Сделок</th><th>Сумма</th></tr>
  </thead>
  <tbody>
    <tr><td>Иванов</td><td>15</td><td>450 000 ₽</td></tr>
    <tr><td>Петрова</td><td>22</td><td>680 000 ₽</td></tr>
  </tbody>
  <tfoot>
    <tr><td>Итого</td><td>37</td><td>1 130 000 ₽</td></tr>
  </tfoot>
</table>`,
        codeLang: 'html',
      },
      {
        sectionId: 'spanning',
        heading_ru: 'colspan и rowspan',
        heading_en: 'colspan and rowspan',
        text_ru: 'colspan="N" заставляет ячейку занять N столбцов вместо одного. rowspan="N" растягивает ячейку на N строк. При использовании rowspan важно убрать из следующих строк ровно столько ячеек, сколько поглощает объединённая ячейка.',
        text_en: 'colspan="N" makes a cell span N columns instead of one. rowspan="N" stretches a cell across N rows. When using rowspan, you must remove exactly as many cells from subsequent rows as the merged cell absorbs.',
        code: `<table border="1">
  <tr>
    <th colspan="3">Расписание на неделю</th>
  </tr>
  <tr>
    <td rowspan="2">Пн/Вт</td>
    <td>Математика</td>
    <td>09:00</td>
  </tr>
  <tr>
    <!-- первая ячейка уже занята rowspan -->
    <td>Физика</td>
    <td>11:00</td>
  </tr>
</table>`,
        codeLang: 'html',
      },
      {
        sectionId: 'styling',
        heading_ru: 'Современная стилизация таблиц',
        heading_en: 'Modern Table Styling',
        text_ru: 'Ключевое CSS-свойство для таблиц — border-collapse: collapse, которое убирает двойные границы между ячейками. Для адаптивности оборачивайте таблицу в div с overflow-x: auto, чтобы на мобильных устройствах появлялась горизонтальная прокрутка.',
        text_en: 'The key CSS property for tables is border-collapse: collapse, which removes double borders between cells. For responsiveness, wrap the table in a div with overflow-x: auto so a horizontal scrollbar appears on mobile devices.',
        code: `.table-wrapper {
  overflow-x: auto; /* прокрутка на мобильных */
  -webkit-overflow-scrolling: touch;
}

table {
  width: 100%;
  border-collapse: collapse;
}

caption {
  font-size: 1.1rem;
  font-weight: bold;
  margin-bottom: 8px;
  text-align: left;
  color: #555;
}`,
        codeLang: 'css',
      },
    ],
  },
  editorTask: {
    title_ru: 'Создайте таблицу прайс-листа',
    title_en: 'Create a Price List Table',
    instructions_ru: 'Создайте HTML-таблицу прайс-листа с заголовком, тремя столбцами (Услуга, Цена, Срок) и минимум тремя строками данных. Добавьте итоговую строку в tfoot. Стилизуйте таблицу через CSS.',
    instructions_en: 'Create an HTML price list table with a caption, three columns (Service, Price, Timeline), and at least three data rows. Add a summary row in tfoot. Style the table with CSS.',
    activeTabs: ['html', 'css'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Прайс-лист</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <div class="table-wrapper">
    <!-- Создайте таблицу здесь -->
  </div>
</body>
</html>`,
      css: `/* Стилизуйте таблицу здесь */
.table-wrapper {
  overflow-x: auto;
  padding: 16px;
}

table {
  /* ваши стили */
}`,
    },
    hints_ru: [
      'Начните с <table>, затем добавьте <thead>, <tbody>, <tfoot>',
      'В <thead> используйте <th>, в <tbody> — <td>',
      'Для итоговой строки используйте colspan="2" чтобы объединить первые две ячейки',
      'border-collapse: collapse убирает двойные границы',
    ],
    hints_en: [
      'Start with <table>, then add <thead>, <tbody>, <tfoot>',
      'Use <th> in <thead> and <td> in <tbody>',
      'For the summary row, use colspan="2" to merge the first two cells',
      'border-collapse: collapse removes double borders',
    ],
  },
  keyTerms: [
    {
      term_ru: 'border-collapse',
      term_en: 'border-collapse',
      definition_ru: 'CSS-свойство, которое объединяет границы соседних ячеек в одну. Значение collapse убирает двойные линии.',
      definition_en: 'A CSS property that merges borders of adjacent cells into one. The collapse value removes double lines.',
      example_ru: 'table { border-collapse: collapse; }',
      example_en: 'table { border-collapse: collapse; }',
    },
    {
      term_ru: 'colspan',
      term_en: 'colspan',
      definition_ru: 'Атрибут ячейки таблицы. Указывает, сколько столбцов должна занимать ячейка по горизонтали.',
      definition_en: 'A table cell attribute. Specifies how many columns the cell should span horizontally.',
      example_ru: '<td colspan="3">Объединённая ячейка</td>',
      example_en: '<td colspan="3">Merged cell</td>',
    },
    {
      term_ru: 'rowspan',
      term_en: 'rowspan',
      definition_ru: 'Атрибут ячейки таблицы. Указывает, сколько строк должна занимать ячейка по вертикали.',
      definition_en: 'A table cell attribute. Specifies how many rows the cell should span vertically.',
      example_ru: '<td rowspan="2">На две строки</td>',
      example_en: '<td rowspan="2">Spans two rows</td>',
    },
    {
      term_ru: 'caption',
      term_en: 'caption',
      definition_ru: 'Тег, задающий подпись для всей таблицы. Располагается сразу после открывающего <table>. Улучшает доступность.',
      definition_en: 'A tag that provides a caption for the entire table. Placed immediately after the opening <table> tag. Improves accessibility.',
    },
    {
      term_ru: 'scope',
      term_en: 'scope',
      definition_ru: 'Атрибут тега <th>. Указывает, относится ли заголовок к столбцу (col) или строке (row). Критически важен для доступности.',
      definition_en: 'An attribute of the <th> tag. Specifies whether the header applies to a column (col) or row (row). Critical for accessibility.',
      example_ru: '<th scope="col">Имя</th>',
      example_en: '<th scope="col">Name</th>',
    },
  ],
  didYouKnow: [
    {
      text_ru: 'До появления CSS Flexbox и Grid в 2010-х годах веб-разработчики активно использовали таблицы для вёрстки сайтов. Сегодня это считается грубой ошибкой, ломающей доступность.',
      text_en: 'Before CSS Flexbox and Grid emerged in the 2010s, web developers widely used tables to lay out websites. Today this is considered a serious mistake that breaks accessibility.',
    },
    {
      text_ru: 'Элемент <tfoot> можно указать в HTML-коде до <tbody>, и браузер всё равно отрендерит его в конце таблицы. Это историческая особенность стандарта, позволявшая браузерам отображать футер до полной загрузки данных.',
      text_en: 'The <tfoot> element can appear in HTML before <tbody>, and the browser will still render it at the end of the table. This is a historical quirk of the standard, allowing browsers to show the footer before all data loaded.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой тег создаёт строку в таблице?',
      text_en: 'Which tag creates a row in a table?',
      options_ru: ['<td>', '<tr>', '<th>', '<row>'],
      options_en: ['<td>', '<tr>', '<th>', '<row>'],
      correctIndex: 1,
      explanation_ru: '<tr> (table row) создаёт строку. Внутри строки размещаются ячейки <td> и <th>.',
      explanation_en: '<tr> (table row) creates a row. Inside the row you place <td> and <th> cells.',
    },
    {
      id: 'q2',
      text_ru: 'Какое CSS-свойство убирает двойные границы между ячейками?',
      text_en: 'Which CSS property removes double borders between cells?',
      options_ru: ['border: none', 'border-spacing: 0', 'border-collapse: collapse', 'outline: none'],
      options_en: ['border: none', 'border-spacing: 0', 'border-collapse: collapse', 'outline: none'],
      correctIndex: 2,
      explanation_ru: 'border-collapse: collapse объединяет границы соседних ячеек в одну линию, убирая двойные рамки.',
      explanation_en: 'border-collapse: collapse merges adjacent cell borders into a single line, eliminating double borders.',
    },
    {
      id: 'q3',
      text_ru: 'Какой атрибут позволяет ячейке занять несколько столбцов?',
      text_en: 'Which attribute makes a cell span multiple columns?',
      options_ru: ['colspan', 'rowspan', 'span', 'merge'],
      options_en: ['colspan', 'rowspan', 'span', 'merge'],
      correctIndex: 0,
      explanation_ru: 'colspan указывает количество столбцов, которые должна занять ячейка по горизонтали.',
      explanation_en: 'colspan specifies the number of columns a cell should span horizontally.',
    },
    {
      id: 'q4',
      text_ru: 'Для чего предназначен тег <tfoot>?',
      text_en: 'What is the <tfoot> tag used for?',
      options_ru: [
        'Для нижнего колонтитула страницы',
        'Для первой строки таблицы',
        'Для добавления CSS к таблице',
        'Для итоговых строк таблицы',
      ],
      options_en: [
        'For the page footer',
        'For the first table row',
        'For adding CSS to the table',
        'For summary rows of the table',
      ],
      correctIndex: 3,
      explanation_ru: '<tfoot> содержит итоговые или сводные строки таблицы. Браузер отображает его внизу таблицы независимо от позиции в коде.',
      explanation_en: '<tfoot> contains summary or totals rows of the table. The browser renders it at the bottom regardless of its position in the code.',
    },
    {
      id: 'q5',
      text_ru: 'Зачем использовать таблицы в HTML сегодня?',
      text_en: 'What should tables be used for in HTML today?',
      options_ru: [
        'Для создания многоколоночных макетов страниц',
        'Только для отображения табличных данных',
        'Для выравнивания изображений и текста',
        'Для создания навигационных меню',
      ],
      options_en: [
        'To create multi-column page layouts',
        'Only for displaying tabular data',
        'To align images and text',
        'To create navigation menus',
      ],
      correctIndex: 1,
      explanation_ru: 'Таблицы предназначены исключительно для табличных данных (расписания, прайс-листы, статистика). Для макетов используют CSS Flexbox и Grid.',
      explanation_en: 'Tables are exclusively for tabular data (schedules, price lists, statistics). For layouts, use CSS Flexbox and Grid.',
    },
  ],
}
