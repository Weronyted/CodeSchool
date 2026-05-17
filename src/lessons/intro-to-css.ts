import type { Lesson } from '@/types/lesson'

export const introToCss: Lesson = {
  slug: 'intro-to-css',
  category: 'CSS',
  readTime: 7,
  icon: '🎨',

  title_ru: 'Что такое CSS',
  title_en: 'What is CSS',

  description_ru: 'Добавляем цвета, шрифты и красоту — учимся одевать HTML-скелет.',
  description_en: 'Adding colours, fonts and beauty — learning to dress the HTML skeleton.',

  sections: [
    { id: 'what-is-css',  title_ru: 'Что такое CSS',             title_en: 'What is CSS' },
    { id: 'how-css-works', title_ru: 'Как CSS работает с HTML',  title_en: 'How CSS works with HTML' },
    { id: 'selectors',    title_ru: 'Селекторы',                 title_en: 'Selectors' },
    { id: 'properties',   title_ru: 'Свойства и значения',       title_en: 'Properties and values' },
    { id: 'key-terms',    title_ru: 'Важные слова',              title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'CSS — одежда для твоего сайта',
      title_en: 'CSS — clothes for your website',
      body_ru: 'HTML строит скелет страницы. CSS одевает его: добавляет цвета, шрифты, отступы и красоту. Без CSS весь интернет выглядел бы как скучный текстовый файл.',
      body_en: 'HTML builds the skeleton of a page. CSS dresses it: adds colours, fonts, spacing and beauty. Without CSS the entire internet would look like a boring text file.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Три языка сайта',
      title_en: 'Three languages of a website',
      body_ru: 'Помнишь аналогию с человеком? HTML — скелет (что есть на странице). CSS — одежда и причёска (как это выглядит). JavaScript — мозг (что умеет делать). Сегодня мы учимся «одевать» страницу.',
      body_en: 'Remember the person analogy? HTML is the skeleton (what is on the page). CSS is the clothes and hairstyle (how it looks). JavaScript is the brain (what it can do). Today we learn to "dress" the page.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'CSS расшифровывается',
      title_en: 'CSS stands for',
      body_ru: 'Cascading Style Sheets — «каскадные таблицы стилей». Слово «каскадные» означает, что стили могут перекрывать друг друга по правилам приоритета. Слово «таблицы» — это просто список правил: что как должно выглядеть.',
      body_en: 'Cascading Style Sheets. "Cascading" means styles can override each other by priority rules. "Sheets" is just a list of rules: what should look like what.',
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Анатомия CSS-правила',
      title_en: 'Anatomy of a CSS rule',
      body_ru: 'CSS-правило состоит из трёх частей. Селектор — кого стилизуем (например, все абзацы). Свойство — что меняем (цвет, размер, фон). Значение — как меняем (красный, 20px, синий).',
      body_en: 'A CSS rule has three parts. Selector — who we are styling (for example, all paragraphs). Property — what we are changing (colour, size, background). Value — how we change it (red, 20px, blue).',
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Первое CSS-правило',
      title_en: 'Your first CSS rule',
      body_ru: 'Вот как выглядит CSS. Сначала — кого стилизуем (h1), затем фигурные скобки, внутри — свойство двоеточие значение точка с запятой.',
      body_en: 'Here is what CSS looks like. First — who we are styling (h1), then curly braces, inside — property colon value semicolon.',
      code: `h1 {
  color: tomato;
  font-size: 48px;
}

p {
  color: gray;
  font-size: 16px;
}`,
      codeLang: 'css',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Три способа добавить CSS',
      title_en: 'Three ways to add CSS',
      body_ru: 'Способ 1: отдельный файл style.css (лучший вариант — подключается через <link>). Способ 2: тег <style> внутри <head> (для небольших проектов). Способ 3: атрибут style="" прямо в теге (только для одного элемента, не рекомендуется).',
      body_en: 'Way 1: a separate style.css file (best option — linked via <link>). Way 2: a <style> tag inside <head> (fine for small projects). Way 3: the style="" attribute directly in a tag (only for one element, not recommended).',
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Подключение CSS-файла',
      title_en: 'Linking a CSS file',
      body_ru: 'Самый правильный способ — подключить внешний файл через тег <link> в <head>. Тогда один CSS-файл управляет стилями всего сайта.',
      body_en: 'The cleanest way is to link an external file via the <link> tag in <head>. That way one CSS file controls the styles of the whole site.',
      code: `<!-- В файле index.html: -->
<head>
  <link rel="stylesheet" href="style.css">
</head>

/* В файле style.css: */
body {
  background-color: #f5f5f5;
}`,
      codeLang: 'html',
    },
    {
      id: 's8',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'CSS придумал норвежский учёный Хокон Вим Ли в 1994 году. До CSS веб-разработчики раскрашивали страницы прямо через атрибуты HTML — это был настоящий кошмар!',
      body_en: 'CSS was proposed by Norwegian scientist Håkon Wium Lie in 1994. Before CSS, web developers coloured pages using HTML attributes directly — it was a real nightmare!',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Попробуй сам!',
      title_en: 'Try it yourself!',
      body_ru: 'Напиши своё первое CSS-правило и посмотри, как страница мгновенно преображается.',
      body_en: 'Write your first CSS rule and watch the page transform instantly.',
    },
  ],

  content: {
    intro_ru: `HTML строит содержимое, CSS управляет внешним видом. Без CSS браузер
показывает страницу чёрным текстом на белом фоне — скучно и безлично. Именно CSS
делает современные сайты красивыми: задаёт цвета, шрифты, размеры, отступы,
анимации. Хорошая новость: базовый CSS очень прост и результат виден сразу.`,
    intro_en: `HTML builds the content, CSS controls the appearance. Without CSS the
browser shows the page as black text on a white background — boring and impersonal.
CSS is what makes modern websites beautiful: it sets colours, fonts, sizes, spacing,
animations. Good news: basic CSS is very simple and the results are instant.`,

    blocks: [
      {
        sectionId: 'what-is-css',
        heading_ru: 'Что такое CSS',
        heading_en: 'What is CSS',
        text_ru: `CSS (Cascading Style Sheets) — это язык, который описывает, как должны
выглядеть HTML-элементы. Браузер сначала читает HTML и строит структуру страницы,
затем читает CSS и применяет стили к каждому элементу.

Самое важное: CSS и HTML — разные языки. HTML описывает ЧТО есть на странице,
CSS описывает КАК это выглядит. Это разделение позволяет менять внешний вид сайта,
не трогая его содержимое — и наоборот.`,
        text_en: `CSS (Cascading Style Sheets) is a language that describes how HTML
elements should look. The browser first reads HTML and builds the page structure, then
reads CSS and applies styles to every element.

Most important: CSS and HTML are different languages. HTML describes WHAT is on the
page, CSS describes HOW it looks. This separation lets you change a site's appearance
without touching its content — and vice versa.`,
      },
      {
        sectionId: 'how-css-works',
        heading_ru: 'Как CSS работает с HTML',
        heading_en: 'How CSS works with HTML',
        text_ru: `CSS-правило состоит из двух частей: селектора и блока объявлений.
Селектор указывает, к каким элементам применить стили. Блок объявлений (в фигурных
скобках) содержит одно или несколько объявлений вида свойство: значение.

Каждое объявление заканчивается точкой с запятой — без неё браузер может
неправильно прочитать следующее свойство. Пробелы и переносы строк CSS игнорирует,
так что отступы — только для красоты и удобства чтения.`,
        text_en: `A CSS rule has two parts: a selector and a declaration block.
The selector points to which elements to style. The declaration block (in curly
braces) contains one or more declarations in the form property: value.

Every declaration ends with a semicolon — without it the browser may misread the next
property. CSS ignores spaces and line breaks, so indentation is just for readability.`,
        code: `/* Анатомия CSS-правила */
селектор {
  свойство: значение;   /* одно объявление */
  свойство2: значение2; /* другое объявление */
}

/* Реальный пример */
h1 {
  color: darkblue;
  font-size: 36px;
  text-align: center;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'selectors',
        heading_ru: 'Селекторы',
        heading_en: 'Selectors',
        text_ru: `Селектор — это «адрес» элемента, которому мы хотим задать стиль.
Самые важные виды:

• Тег: h1 — стилизует ВСЕ заголовки h1 на странице.
• Класс: .highlight — стилизует все элементы с атрибутом class="highlight".
• ID: #header — стилизует элемент с атрибутом id="header" (уникальный).

Классы используются чаще всего — они гибкие и переиспользуемые. Имена классов
начинаются с точки в CSS и без точки в HTML.`,
        text_en: `A selector is the "address" of the element we want to style.
The most important types:

• Tag: h1 — styles ALL h1 headings on the page.
• Class: .highlight — styles all elements with class="highlight".
• ID: #header — styles the element with id="header" (unique).

Classes are used most often — they are flexible and reusable. Class names start with
a dot in CSS and without a dot in HTML.`,
        code: `/* Тег-селектор — все абзацы */
p {
  color: #333;
}

/* Класс-селектор — элементы с class="card" */
.card {
  background-color: white;
  border-radius: 12px;
}

/* ID-селектор — элемент с id="logo" */
#logo {
  width: 120px;
}`,
        codeLang: 'css',
      },
      {
        sectionId: 'properties',
        heading_ru: 'Свойства и значения',
        heading_en: 'Properties and values',
        text_ru: `В CSS сотни свойств, но для начала достаточно знать десять самых частых:

• color — цвет текста
• background-color — цвет фона
• font-size — размер шрифта (px, em, rem)
• font-family — название шрифта
• font-weight — жирность (normal, bold, 700)
• text-align — выравнивание текста (left, center, right)
• margin — внешний отступ
• padding — внутренний отступ
• border — рамка
• border-radius — скругление углов

Значения могут быть числами с единицами (16px), именованными цветами (red),
шестнадцатеричными кодами (#ff0000) или функциями (rgb(255, 0, 0)).`,
        text_en: `CSS has hundreds of properties, but knowing the ten most common is enough to start:

• color — text colour
• background-color — background colour
• font-size — font size (px, em, rem)
• font-family — font name
• font-weight — boldness (normal, bold, 700)
• text-align — text alignment (left, center, right)
• margin — outer spacing
• padding — inner spacing
• border — border
• border-radius — corner rounding

Values can be numbers with units (16px), named colours (red), hex codes (#ff0000) or
functions (rgb(255, 0, 0)).`,
        code: `p {
  color: #444444;          /* тёмно-серый текст */
  font-size: 16px;
  font-family: Arial, sans-serif;
  text-align: left;
  margin: 16px 0;          /* вертикальные отступы */
  padding: 12px 20px;      /* внутренний отступ */
  background-color: #fafafa;
  border: 1px solid #ddd;
  border-radius: 8px;
}`,
        codeLang: 'css',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: раскрась страницу',
    title_en: 'Try it yourself: colour the page',
    instructions_ru: `Стилизуй заготовленную HTML-страницу с помощью CSS:
— Сделай заголовок h1 синим (color: royalblue) и крупным (font-size: 40px)
— Добавь абзацу серый цвет текста и размер 16px
— Дай блоку .card белый фон, скруглённые углы (border-radius: 12px) и тень
Нажми «Запустить» и посмотри на результат!`,
    instructions_en: `Style the prepared HTML page with CSS:
— Make the h1 heading blue (color: royalblue) and large (font-size: 40px)
— Give the paragraph grey text and a size of 16px
— Give the .card block a white background, rounded corners (border-radius: 12px) and a shadow
Press "Run" and see the result!`,
    activeTabs: ['css'],
    starterCode: {
      css: `/* Напиши свои стили здесь */

h1 {
  color: royalblue;
  font-size: 40px;
}

p {
  color: #555;
  font-size: 16px;
}

.card {
  background-color: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 16px rgba(0,0,0,0.1);
}`,
    },
    hints_ru: [
      'Свойство — это то ЧТО меняем, значение — КАК. Разделяются двоеточием.',
      'Не забудь точку с запятой в конце каждого объявления.',
    ],
    hints_en: [
      'The property is WHAT we change, the value is HOW. Separated by a colon.',
      'Do not forget the semicolon at the end of each declaration.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'CSS', term_en: 'CSS',
      definition_ru: 'Cascading Style Sheets — язык для описания внешнего вида HTML-элементов.',
      definition_en: 'Cascading Style Sheets — a language for describing the appearance of HTML elements.',
      example_ru: 'h1 { color: blue; } — покрасить заголовок в синий.',
      example_en: 'h1 { color: blue; } — colour the heading blue.',
    },
    {
      term_ru: 'Селектор', term_en: 'Selector',
      definition_ru: 'Часть CSS-правила, которая указывает, к каким HTML-элементам применить стили.',
      definition_en: 'The part of a CSS rule that points to which HTML elements the styles apply to.',
      example_ru: 'p {} выбирает все абзацы, .card {} — элементы с классом card.',
      example_en: 'p {} selects all paragraphs, .card {} — elements with class card.',
    },
    {
      term_ru: 'Свойство', term_en: 'Property',
      definition_ru: 'Конкретный аспект внешнего вида, который мы хотим изменить: цвет, размер, фон.',
      definition_en: 'A specific visual aspect we want to change: colour, size, background.',
      example_ru: 'color, font-size, background-color — это свойства.',
      example_en: 'color, font-size, background-color are properties.',
    },
    {
      term_ru: 'Значение', term_en: 'Value',
      definition_ru: 'Конкретная настройка для свойства: число с единицей, цвет, ключевое слово.',
      definition_en: 'The specific setting for a property: a number with a unit, a colour, a keyword.',
      example_ru: '16px, red, bold, center — это значения.',
      example_en: '16px, red, bold, center are values.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'CSS придумал норвежский учёный Хокон Вим Ли в 1994 году. До CSS всё оформление страниц делалось через атрибуты HTML — это было очень неудобно.',
      text_en: 'CSS was proposed by Norwegian scientist Håkon Wium Lie in 1994. Before CSS all page styling was done through HTML attributes — very inconvenient.',
    },
    {
      text_ru: 'Без CSS главная страница Google выглядела бы как простой текстовый файл с одним полем ввода. CSS — это то, что делает сайты красивыми и удобными.',
      text_en: "Without CSS Google's homepage would look like a plain text file with one input field. CSS is what makes websites beautiful and user-friendly.",
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что означает CSS?',
      text_en: 'What does CSS stand for?',
      options_ru: ['Cascading Style Sheets', 'Colorful Site System', 'Computer Style Script', 'Creative Sheet Software'],
      options_en: ['Cascading Style Sheets', 'Colorful Site System', 'Computer Style Script', 'Creative Sheet Software'],
      correctIndex: 0,
      explanation_ru: 'CSS — Cascading Style Sheets, «каскадные таблицы стилей».',
      explanation_en: 'CSS stands for Cascading Style Sheets.',
    },
    {
      id: 'q2',
      text_ru: 'Что такое селектор в CSS?',
      text_en: 'What is a selector in CSS?',
      options_ru: ['Значение цвета', 'Указатель на HTML-элементы, которые нужно стилизовать', 'Размер шрифта', 'Название файла стилей'],
      options_en: ['A colour value', 'A pointer to HTML elements to be styled', 'A font size', 'The name of the stylesheet'],
      correctIndex: 1,
      explanation_ru: 'Селектор «выбирает» элементы — говорит браузеру, к чему применить стиль.',
      explanation_en: 'The selector "selects" elements — tells the browser what to apply the style to.',
    },
    {
      id: 'q3',
      text_ru: 'Как правильно написать CSS-правило?',
      text_en: 'How do you write a CSS rule correctly?',
      options_ru: ['h1: color = blue', 'h1 { color: blue; }', 'h1 color blue;', '<h1 style color blue>'],
      options_en: ['h1: color = blue', 'h1 { color: blue; }', 'h1 color blue;', '<h1 style color blue>'],
      correctIndex: 1,
      explanation_ru: 'Правило: селектор, фигурные скобки, свойство двоеточие значение точка с запятой.',
      explanation_en: 'Rule: selector, curly braces, property colon value semicolon.',
    },
    {
      id: 'q4',
      text_ru: 'Какой CSS-селектор стилизует элементы с атрибутом class="card"?',
      text_en: 'Which CSS selector styles elements with class="card"?',
      options_ru: ['card {}', '#card {}', '.card {}', '*card {}'],
      options_en: ['card {}', '#card {}', '.card {}', '*card {}'],
      correctIndex: 2,
      explanation_ru: 'Класс-селектор начинается с точки: .card. В HTML атрибут class="card" — без точки.',
      explanation_en: 'A class selector starts with a dot: .card. In HTML the attribute class="card" — no dot.',
    },
    {
      id: 'q5',
      text_ru: 'Какое CSS-свойство меняет цвет текста?',
      text_en: 'Which CSS property changes the text colour?',
      options_ru: ['text-color', 'font-color', 'color', 'background-color'],
      options_en: ['text-color', 'font-color', 'color', 'background-color'],
      correctIndex: 2,
      explanation_ru: 'Именно свойство color задаёт цвет текста. background-color — цвет фона.',
      explanation_en: 'The color property sets the text colour. background-color sets the background.',
    },
  ],
}
