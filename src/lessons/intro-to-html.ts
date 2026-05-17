import type { Lesson } from '@/types/lesson'

export const introToHtml: Lesson = {
  slug: 'intro-to-html',
  category: 'HTML',
  readTime: 7,
  icon: '🏗️',

  title_ru: 'Что такое HTML',
  title_en: 'What is HTML',

  description_ru: 'Знакомимся с языком, на котором написаны все сайты в мире.',
  description_en: 'Meet the language every website in the world is built with.',

  sections: [
    { id: 'what-is-html',       title_ru: 'Что такое HTML',              title_en: 'What is HTML' },
    { id: 'how-page-works',     title_ru: 'Как браузер строит страницу', title_en: 'How the browser builds a page' },
    { id: 'first-tag',          title_ru: 'Твой первый тег',             title_en: 'Your first tag' },
    { id: 'document-structure', title_ru: 'Структура документа',         title_en: 'Document structure' },
    { id: 'key-terms',          title_ru: 'Важные слова',                title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Что такое HTML?',
      title_en: 'What is HTML?',
      body_ru: 'Сегодня ты узнаешь, на каком языке «разговаривают» все сайты в интернете.',
      body_en: 'Today you will learn the language that every website on the internet speaks.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Сайт — как человек',
      title_en: 'A website is like a person',
      body_ru: 'У человека есть скелет, одежда и мозг. У сайта тоже: HTML — это скелет (что находится на странице), CSS — одежда (как это выглядит), JavaScript — мозг (что страница умеет делать). Сегодня мы изучаем скелет.',
      body_en: 'A person has a skeleton, clothes and a brain. A website does too: HTML is the skeleton (what is on the page), CSS is the clothing (how it looks), JavaScript is the brain (what the page can do). Today we study the skeleton.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'HTML расшифровывается',
      title_en: 'HTML stands for',
      body_ru: 'HyperText Markup Language — «язык разметки гипертекста». Слово «разметка» здесь главное: мы не пишем программу, мы РАЗМЕЧАЕМ текст — говорим браузеру: «это заголовок», «это абзац», «это картинка».',
      body_en: 'HyperText Markup Language. The key word is "markup": we are not writing a program, we are MARKING UP text — telling the browser: "this is a heading", "this is a paragraph", "this is an image".',
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Браузер — это читатель',
      title_en: 'The browser is a reader',
      body_ru: 'Ты пишешь HTML — обычный текст со специальными пометками. Браузер (Chrome, Firefox) читает этот текст и превращает его в красивую страницу, которую ты видишь. HTML — это инструкция, страница — результат.',
      body_en: 'You write HTML — plain text with special marks. The browser (Chrome, Firefox) reads that text and turns it into the nice page you see. HTML is the instruction, the page is the result.',
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Как выглядит тег',
      title_en: 'What a tag looks like',
      body_ru: 'Пометки в HTML называются тегами. У тега почти всегда есть открытие и закрытие — как скобки. Между ними — содержимое.',
      body_en: 'The marks in HTML are called tags. A tag almost always has an opening and a closing — like brackets. The content goes between them.',
      code: '<h1>Привет, мир!</h1>',
      codeLang: 'html',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Разбираем тег по частям',
      title_en: 'A tag piece by piece',
      body_ru: '<h1> — открывающий тег. </h1> — закрывающий тег (с косой чертой). «Привет, мир!» — содержимое. h1 значит «заголовок первого уровня» — самый крупный заголовок на странице.',
      body_en: '<h1> is the opening tag. </h1> is the closing tag (with a slash). "Hello, world!" is the content. h1 means "heading level 1" — the biggest heading on the page.',
    },
    {
      id: 's7',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Самый первый сайт в мире появился в 1991 году. Он до сих пор работает, и на нём всего лишь текст и ссылки — ни одной картинки!',
      body_en: 'The very first website appeared in 1991. It still works today, and it has only text and links — not a single image!',
    },
    {
      id: 's8',
      type: 'concept',
      title_ru: 'Каждая страница имеет каркас',
      title_en: 'Every page has a frame',
      body_ru: 'У любой HTML-страницы есть обязательный каркас: <!DOCTYPE html> в начале, тег <html> вокруг всего, <head> для невидимых настроек и <title>, и <body> для всего, что видит пользователь.',
      body_en: 'Every HTML page has a required frame: <!DOCTYPE html> at the start, an <html> tag around everything, <head> for invisible settings and the <title>, and <body> for everything the user sees.',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Теперь — твоя очередь!',
      title_en: 'Now it is your turn!',
      body_ru: 'Хватит теории — пора писать код. В редакторе ниже ты создашь свой первый заголовок и увидишь результат вживую.',
      body_en: 'Enough theory — time to write code. In the editor below you will create your first heading and see the result live.',
    },
  ],

  content: {
    intro_ru: `HTML — это язык, на котором написаны абсолютно все страницы в интернете.
Когда ты открываешь любимый сайт, твой браузер на самом деле читает HTML-файл и
показывает тебе то, что в нём написано. Хорошая новость: HTML — это НЕ сложное
программирование. Это скорее как разметка текста цветными маркерами — ты просто
показываешь браузеру, где заголовок, где абзац, а где картинка.`,
    intro_en: `HTML is the language that every single page on the internet is written in.
When you open your favourite website, your browser actually reads an HTML file and
shows you what is inside it. Good news: HTML is NOT difficult programming. It is more
like marking up text with coloured highlighters — you simply show the browser where a
heading is, where a paragraph is, and where an image is.`,

    blocks: [
      {
        sectionId: 'how-page-works',
        heading_ru: 'Как браузер строит страницу',
        heading_en: 'How the browser builds a page',
        text_ru: `Представь, что HTML — это записка строителю. Ты пишешь: «здесь поставь
большой заголовок, под ним абзац текста, а справа картинку». Браузер — это строитель.
Он читает твою записку сверху вниз и строит страницу именно в том порядке, в котором
ты написал. Если ты поменяешь порядок строк в HTML — поменяется и порядок на странице.`,
        text_en: `Imagine HTML is a note to a builder. You write: "put a big heading here,
a paragraph of text under it, and an image on the right". The browser is the builder.
It reads your note top to bottom and builds the page in exactly the order you wrote it.
If you change the order of lines in HTML, the order on the page changes too.`,
      },
      {
        sectionId: 'first-tag',
        heading_ru: 'Твой первый тег',
        heading_en: 'Your first tag',
        text_ru: `Тег — это команда для браузера, завёрнутая в угловые скобки < >.
Большинство тегов работают парами: открывающий <p> и закрывающий </p>. Закрывающий
отличается косой чертой. Всё, что между ними — содержимое тега. Например,
<p>Я учу HTML</p> говорит браузеру: «текст "Я учу HTML" — это абзац».`,
        text_en: `A tag is a command for the browser, wrapped in angle brackets < >.
Most tags work in pairs: an opening <p> and a closing </p>. The closing one has a
slash. Everything between them is the tag's content. For example,
<p>I am learning HTML</p> tells the browser: "the text 'I am learning HTML' is a paragraph".`,
      },
      {
        sectionId: 'document-structure',
        heading_ru: 'Структура документа',
        heading_en: 'Document structure',
        text_ru: `У каждой HTML-страницы есть обязательный «скелет». Строка <!DOCTYPE html>
говорит браузеру: «это современный HTML». Тег <html> оборачивает всю страницу.
Внутри него два раздела: <head> — невидимая часть с настройками и названием вкладки
(<title>), и <body> — видимая часть, где находится всё, что увидит пользователь:
заголовки, текст, картинки.`,
        text_en: `Every HTML page has a required "skeleton". The line <!DOCTYPE html>
tells the browser: "this is modern HTML". The <html> tag wraps the whole page.
Inside it are two sections: <head> — the invisible part with settings and the tab
name (<title>), and <body> — the visible part holding everything the user will see:
headings, text, images.`,
        code: `<!DOCTYPE html>
<html>
  <head>
    <title>Мой первый сайт</title>
  </head>
  <body>
    <h1>Привет!</h1>
    <p>Это моя первая страница.</p>
  </body>
</html>`,
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Попробуй сам: твой первый заголовок',
    title_en: 'Try it yourself: your first heading',
    instructions_ru: `Создай заголовок с помощью тега <h1> и абзац с помощью тега <p>.
Напиши в заголовке своё имя, а в абзаце — свою любимую игру. Нажми «Запустить» и
посмотри на результат справа!`,
    instructions_en: `Create a heading with the <h1> tag and a paragraph with the <p>
tag. Write your name in the heading and your favourite game in the paragraph. Press
"Run" and look at the result on the right!`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!-- Напиши свой код здесь -->
<h1>Твоё имя</h1>
<p>Твоя любимая игра</p>`,
    },
    hints_ru: [
      'Не забудь закрыть тег: <h1>текст</h1>',
      'Заголовок и абзац — это два разных тега на двух строках.',
    ],
    hints_en: [
      'Do not forget to close the tag: <h1>text</h1>',
      'The heading and the paragraph are two separate tags on two lines.',
    ],
  },

  keyTerms: [
    {
      term_ru: 'HTML', term_en: 'HTML',
      definition_ru: 'Язык разметки, на котором создаются все веб-страницы.',
      definition_en: 'The markup language used to create every web page.',
      example_ru: 'Файл index.html — это HTML-документ.',
      example_en: 'The file index.html is an HTML document.',
    },
    {
      term_ru: 'Тег', term_en: 'Tag',
      definition_ru: 'Команда в угловых скобках, которая размечает содержимое страницы.',
      definition_en: 'A command in angle brackets that marks up the page content.',
      example_ru: '<p> — тег абзаца, <h1> — тег заголовка.',
      example_en: '<p> is the paragraph tag, <h1> is the heading tag.',
    },
    {
      term_ru: 'Элемент', term_en: 'Element',
      definition_ru: 'Открывающий тег, содержимое и закрывающий тег вместе.',
      definition_en: 'An opening tag, its content and a closing tag together.',
      example_ru: '<h1>Привет</h1> — это один элемент.',
      example_en: '<h1>Hello</h1> is one element.',
    },
    {
      term_ru: 'Браузер', term_en: 'Browser',
      definition_ru: 'Программа, которая читает HTML и показывает готовую страницу.',
      definition_en: 'A program that reads HTML and shows the finished page.',
      example_ru: 'Chrome, Firefox, Safari — это браузеры.',
      example_en: 'Chrome, Firefox, Safari are browsers.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'HTML придумал учёный Тим Бернерс-Ли в 1991 году — и подарил его всему миру бесплатно.',
      text_en: 'HTML was invented by scientist Tim Berners-Lee in 1991 — and he gave it to the whole world for free.',
    },
    {
      text_ru: 'В HTML более 100 разных тегов, но для создания хорошего сайта обычно хватает 20–30 из них.',
      text_en: 'HTML has over 100 different tags, but you usually only need 20–30 of them to build a good website.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что означает буква "M" в слове HTML?',
      text_en: 'What does the letter "M" in HTML stand for?',
      options_ru: ['Markup (разметка)', 'Music (музыка)', 'Mouse (мышь)', 'Memory (память)'],
      options_en: ['Markup', 'Music', 'Mouse', 'Memory'],
      correctIndex: 0,
      explanation_ru: 'HTML — HyperText Markup Language, язык разметки.',
      explanation_en: 'HTML stands for HyperText Markup Language.',
    },
    {
      id: 'q2',
      text_ru: 'Какой тег создаёт самый крупный заголовок?',
      text_en: 'Which tag creates the biggest heading?',
      options_ru: ['<p>', '<h1>', '<title>', '<big>'],
      options_en: ['<p>', '<h1>', '<title>', '<big>'],
      correctIndex: 1,
      explanation_ru: '<h1> — заголовок первого, самого высокого уровня.',
      explanation_en: '<h1> is the heading of the first, highest level.',
    },
    {
      id: 'q3',
      text_ru: 'Чем закрывающий тег отличается от открывающего?',
      text_en: 'How is a closing tag different from an opening one?',
      options_ru: ['Он написан заглавными буквами', 'У него есть косая черта /', 'Он в круглых скобках', 'Ничем не отличается'],
      options_en: ['It is in capital letters', 'It has a slash /', 'It is in round brackets', 'There is no difference'],
      correctIndex: 1,
      explanation_ru: 'Закрывающий тег всегда содержит косую черту: </p>.',
      explanation_en: 'A closing tag always contains a slash: </p>.',
    },
    {
      id: 'q4',
      text_ru: 'В каком разделе страницы находится то, что видит пользователь?',
      text_en: 'In which section of the page is the content the user sees?',
      options_ru: ['<head>', '<title>', '<body>', '<top>'],
      options_en: ['<head>', '<title>', '<body>', '<top>'],
      correctIndex: 2,
      explanation_ru: 'Всё видимое содержимое находится внутри <body>.',
      explanation_en: 'All visible content lives inside <body>.',
    },
    {
      id: 'q5',
      text_ru: 'Что делает браузер с HTML-файлом?',
      text_en: 'What does the browser do with an HTML file?',
      options_ru: ['Читает его и строит страницу', 'Удаляет его', 'Отправляет его другу', 'Превращает его в музыку'],
      options_en: ['Reads it and builds the page', 'Deletes it', 'Sends it to a friend', 'Turns it into music'],
      correctIndex: 0,
      explanation_ru: 'Браузер читает HTML сверху вниз и строит из него страницу.',
      explanation_en: 'The browser reads HTML top to bottom and builds the page from it.',
    },
  ],
}
