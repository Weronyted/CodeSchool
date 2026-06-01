import type { Lesson } from '@/types/lesson'

export const intrToProgramming: Lesson = {
  slug: 'intro-to-programming',
  category: 'BASICS',
  readTime: 8,
  icon: '💡',

  title_ru: 'Что такое программирование',
  title_en: 'What is Programming',

  description_ru: 'Узнай, что такое код, алгоритм и зачем вообще учиться программировать.',
  description_en: 'Find out what code and algorithms are, and why learning to program matters.',

  sections: [
    { id: 'what-is-programming', title_ru: 'Что такое программирование', title_en: 'What is programming' },
    { id: 'instructions',        title_ru: 'Компьютер и инструкции',      title_en: 'Computers and instructions' },
    { id: 'algorithm',           title_ru: 'Что такое алгоритм',          title_en: 'What is an algorithm' },
    { id: 'languages',           title_ru: 'Языки программирования',      title_en: 'Programming languages' },
    { id: 'tools',               title_ru: 'Инструменты разработчика',    title_en: 'Developer tools' },
    { id: 'key-terms',           title_ru: 'Важные слова',                title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Что такое программирование?',
      title_en: 'What is Programming?',
      body_ru: 'Сегодня ты узнаешь, что такое код, зачем его пишут и почему программирование — это суперсила 21 века.',
      body_en: 'Today you will learn what code is, why people write it, and why programming is the superpower of the 21st century.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Программист — как повар',
      title_en: 'A programmer is like a chef',
      body_ru: 'Повар берёт рецепт и готовит блюдо. Программист берёт идею и пишет код, чтобы компьютер выполнил задачу. Рецепт — это и есть программа: пошаговая инструкция, которую надо выполнить точно и в нужном порядке.',
      body_en: 'A chef takes a recipe and cooks a dish. A programmer takes an idea and writes code so a computer can carry out a task. The recipe is the program: a step-by-step instruction that must be followed precisely and in the right order.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Компьютер не думает — он выполняет',
      title_en: 'A computer does not think — it executes',
      body_ru: 'Компьютер невероятно быстрый, но абсолютно буквальный. Он делает только то, что ему сказали. Если написать «покрась кнопку красным», он покрасит именно кнопку, не фон. Задача программиста — описать каждый шаг максимально точно.',
      body_en: 'A computer is incredibly fast, but completely literal. It does exactly what it is told. If you write "colour the button red", it colours that button — not the background. The programmer\'s job is to describe every step as precisely as possible.',
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Что такое код?',
      title_en: 'What is code?',
      body_ru: 'Код — это текст, написанный на специальном языке, который понимает компьютер. Он выглядит не совсем как обычный текст, но в нём есть слова, числа и знаки препинания. Каждая строка кода — одна небольшая инструкция.',
      body_en: 'Code is text written in a special language that a computer understands. It does not look quite like ordinary text, but it has words, numbers and punctuation. Each line of code is one small instruction.',
    },
    {
      id: 's5',
      type: 'analogy',
      title_ru: 'Алгоритм — это маршрут',
      title_en: 'An algorithm is a route',
      body_ru: 'Когда ты идёшь в школу, ты делаешь шаги в определённом порядке: выйди из дома, поверни направо, пройди 200 метров, войди в дверь. Этот порядок шагов — алгоритм. В программировании алгоритм — это последовательность действий, которая решает задачу.',
      body_en: 'When you walk to school, you follow steps in a set order: leave the house, turn right, walk 200 metres, enter the door. That sequence of steps is an algorithm. In programming, an algorithm is a sequence of actions that solves a problem.',
    },
    {
      id: 's6',
      type: 'tip',
      title_ru: 'А ты знал?',
      title_en: 'Did you know?',
      body_ru: 'Первым программистом в истории была женщина — Ада Лавлейс. Ещё в 1843 году она написала алгоритм для вычислительной машины, которой ещё даже не существовало!',
      body_en: 'The first programmer in history was a woman — Ada Lovelace. Back in 1843 she wrote an algorithm for a computing machine that did not even exist yet!',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Языки программирования',
      title_en: 'Programming languages',
      body_ru: 'Так же как люди говорят на русском, английском и других языках, программисты пишут на разных языках программирования. HTML строит страницы, CSS украшает их, JavaScript делает интерактивными. Python используют учёные, Swift — для iPhone. Всего таких языков более 700!',
      body_en: 'Just as people speak Russian, English and other languages, programmers write in different programming languages. HTML builds pages, CSS styles them, JavaScript makes them interactive. Python is used by scientists, Swift for iPhone apps. There are over 700 such languages!',
    },
    {
      id: 's7b',
      type: 'concept',
      title_ru: 'Инструменты разработчика: VSCode, Git, GitHub',
      title_en: 'Developer tools: VSCode, Git, GitHub',
      body_ru: 'Программисты пишут код не в обычном блокноте. Самый популярный редактор — Visual Studio Code (VSCode): он подсвечивает код, подсказывает ошибки и имеет тысячи расширений. Чтобы не потерять работу — используют Git: он хранит всю историю изменений. А GitHub — это интернет-платформа, где хранятся проекты миллионов разработчиков.',
      body_en: 'Programmers do not write code in a basic text editor. The most popular editor is Visual Studio Code (VSCode): it highlights code, points out errors and has thousands of extensions. To never lose work, developers use Git — it stores the full history of changes. And GitHub is an internet platform where millions of developers store their projects.',
      bullets: [
        { text_ru: 'VSCode — редактор кода с подсветкой и подсказками', text_en: 'VSCode — a code editor with highlighting and hints' },
        { text_ru: 'Git — система сохранения истории изменений', text_en: 'Git — a system for saving the history of changes' },
        { text_ru: 'GitHub — облачное хранилище и портфолио разработчика', text_en: 'GitHub — cloud storage and a developer portfolio' },
      ],
    },
    {
      id: 's8',
      type: 'concept',
      title_ru: 'Зачем учиться программировать?',
      title_en: 'Why learn to code?',
      body_ru: 'Программирование — это не только профессия. Это способ думать: разбивать большую задачу на маленькие шаги, находить закономерности и решать проблемы творчески. Люди, которые умеют программировать, создают игры, приложения, сайты и даже управляют роботами.',
      body_en: 'Programming is not just a career. It is a way of thinking: breaking a big task into small steps, finding patterns and solving problems creatively. People who can code create games, apps, websites and even control robots.',
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Ошибки — это нормально',
      title_en: 'Mistakes are normal',
      body_ru: 'Каждый программист делает ошибки — даже самые опытные. Ошибки в коде называются «баги». Искать и исправлять их — это часть работы и даже часть удовольствия. Не бойся ошибаться!',
      body_en: 'Every programmer makes mistakes — even the most experienced ones. Errors in code are called "bugs". Finding and fixing them is part of the job, and even part of the fun. Don\'t be afraid to make mistakes!',
    },
    {
      id: 's10',
      type: 'practice-cta',
      title_ru: 'Ты готов начать!',
      title_en: 'You are ready to start!',
      body_ru: 'Теперь ты знаешь, что такое программирование, код и алгоритм. В следующем уроке ты узнаешь про Git и GitHub — инструменты, без которых не обходится ни один разработчик. А потом напишешь свои первые строки HTML!',
      body_en: 'Now you know what programming, code and algorithms are. In the next lesson you will learn about Git and GitHub — tools no developer can do without. After that you will write your first lines of HTML!',
    },
  ],

  content: {
    intro_ru: `Программирование — это искусство давать компьютеру точные инструкции.
Компьютер сам по себе — просто железо. Он не знает, что делать, пока ты не напишешь
программу. Программа — это набор команд, записанных на специальном языке (коде),
которые компьютер читает и выполняет шаг за шагом. Освоив программирование, ты
сможешь создавать игры, приложения, сайты и решать самые разные задачи.`,
    intro_en: `Programming is the art of giving a computer precise instructions.
A computer on its own is just hardware. It does not know what to do until you write a
program. A program is a set of commands written in a special language (code) that the
computer reads and executes step by step. Once you learn to program, you can create
games, apps, websites and solve all kinds of problems.`,

    blocks: [
      {
        sectionId: 'what-is-programming',
        heading_ru: 'Что такое программирование',
        heading_en: 'What is programming',
        text_ru: `Программирование — это процесс написания точных инструкций для компьютера, чтобы он выполнял нужные задачи. Эти инструкции называются кодом, а написанный набор инструкций — программой. Компьютер — это невероятно быстрая и точная машина, но он не умеет думать самостоятельно: он делает ровно то, что ему говорит программист.

Каждое приложение, сайт, игра или операционная система — это программа. Когда ты открываешь приложение на телефоне, нажимаешь кнопку или смотришь видео онлайн, всё это происходит благодаря чьему-то коду. Программирование — это способ превратить идею в работающий продукт.

Хорошая новость: программирование доступно каждому. Это навык, который можно освоить так же, как чтение или математику. Начинают обычно с простых задач: вывести текст на экран, сложить два числа, показать картинку. Постепенно задачи усложняются — и вместе с ними растёт твой набор инструментов и уверенность.`,
        text_en: `Programming is the process of writing precise instructions for a computer so it carries out the tasks you need. These instructions are called code, and a written set of instructions is called a program. A computer is an incredibly fast and precise machine, but it cannot think for itself — it does exactly what the programmer tells it to do.

Every app, website, game, or operating system is a program. When you open an app on your phone, press a button, or watch a video online, all of that happens because of someone's code. Programming is the way to turn an idea into a working product.

Good news: programming is accessible to everyone. It is a skill you can learn just like reading or maths. People usually start with simple tasks: print text to the screen, add two numbers, display an image. Gradually the tasks grow more complex — and with them grow your toolkit and confidence.`,
      },
      {
        sectionId: 'instructions',
        heading_ru: 'Компьютер и инструкции',
        heading_en: 'Computers and instructions',
        text_ru: `Представь, что ты объясняешь дорогу роботу, который ничего не знает
о твоём городе. Ты не можешь сказать «иди прямо до парка» — он не знает, где парк.
Нужно сказать: «сделай 50 шагов вперёд, поверни налево, сделай ещё 30 шагов».
Компьютер — такой же. Он выполняет только конкретные, точные команды. Это требует
аккуратности, зато даёт тебе полный контроль над тем, что происходит.`,
        text_en: `Imagine explaining directions to a robot that knows nothing about your
city. You cannot say "go straight to the park" — it does not know where the park is.
You need to say: "take 50 steps forward, turn left, take 30 more steps". A computer is
the same. It only carries out specific, precise commands. This demands care, but it
gives you complete control over what happens.`,
      },
      {
        sectionId: 'algorithm',
        heading_ru: 'Что такое алгоритм',
        heading_en: 'What is an algorithm',
        text_ru: `Алгоритм — это чёткая последовательность шагов для решения задачи.
У хорошего алгоритма три свойства: он конечен (заканчивается), однозначен (каждый
шаг понятен) и результативен (даёт нужный ответ). Например, алгоритм «как почистить
зубы»: взять щётку → нанести пасту → чистить 2 минуты → прополоскать. Каждый шаг
конкретный, и у процесса есть конец.`,
        text_en: `An algorithm is a clear sequence of steps for solving a problem.
A good algorithm has three properties: it is finite (it ends), unambiguous (each step
is clear) and effective (it produces the needed result). For example, the algorithm for
brushing teeth: grab a toothbrush → apply toothpaste → brush for 2 minutes → rinse.
Each step is concrete, and the process has an end.`,
      },
      {
        sectionId: 'languages',
        heading_ru: 'Языки программирования',
        heading_en: 'Programming languages',
        text_ru: `На каждую задачу — свой инструмент. HTML и CSS используются для
создания веб-страниц. JavaScript добавляет на страницы интерактивность. Python
отлично подходит для анализа данных и искусственного интеллекта. Swift и Kotlin
создают приложения для смартфонов. В этом курсе ты начнёшь с HTML — самого простого
и наглядного языка, результат работы которого ты видишь сразу в браузере.`,
        text_en: `Different tasks call for different tools. HTML and CSS are used to
create web pages. JavaScript adds interactivity to pages. Python is great for data
analysis and artificial intelligence. Swift and Kotlin build smartphone apps. In this
course you will start with HTML — the simplest and most visual language, whose output
you can see immediately in the browser.`,
      },
      {
        sectionId: 'tools',
        heading_ru: 'Инструменты разработчика',
        heading_en: 'Developer tools',
        text_ru: `Прежде чем писать код, нужно подготовить рабочее место. У программиста
есть три главных инструмента, которые ты будешь использовать постоянно.

**Visual Studio Code (VSCode)** — бесплатный редактор кода от Microsoft. Он
подсвечивает синтаксис разными цветами, помогает находить ошибки до запуска,
автодополняет код и имеет тысячи расширений. Это не просто блокнот — это целая
мастерская разработчика. Скачать можно с официального сайта code.visualstudio.com.

**Git** — система контроля версий. Она работает прямо на твоём компьютере и
запоминает каждое «сохранение» проекта (коммит). Если ты случайно удалишь важный
код — Git поможет его восстановить. Профессионалы делают коммиты несколько раз
в день, чтобы никогда не терять работу.

**GitHub** — это сайт, где хранятся Git-репозитории. Представь его как Google Диск
для кода: ты загружаешь проект, и он доступен с любого устройства. Кроме того,
GitHub — это портфолио разработчика: работодатели смотрят на твои проекты там.
Миллионы открытых проектов на GitHub можно изучать и использовать бесплатно.

Подробнее о Git и GitHub — в следующем уроке курса.`,
        text_en: `Before writing code you need to set up your workspace. A developer
has three main tools you will use constantly.

**Visual Studio Code (VSCode)** — a free code editor by Microsoft. It highlights
syntax in different colours, helps find errors before running, autocompletes code and
has thousands of extensions. It is not just a text editor — it is a full developer
workshop. Download it at code.visualstudio.com.

**Git** — a version control system. It runs right on your computer and remembers
every project "save" (commit). If you accidentally delete important code — Git helps
you restore it. Professionals commit several times a day to never lose their work.

**GitHub** — a website that hosts Git repositories. Think of it as Google Drive for
code: you upload a project and it is accessible from any device. GitHub is also a
developer portfolio: employers look at your projects there. Millions of open projects
on GitHub can be studied and used for free.

More about Git and GitHub — in the next lesson of this course.`,
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Программирование',
      term_en: 'Programming',
      definition_ru: 'Процесс написания инструкций (кода) для компьютера, чтобы он выполнял нужные задачи.',
      definition_en: 'The process of writing instructions (code) for a computer so it carries out the desired tasks.',
      example_ru: 'Создание игры или сайта — это программирование.',
      example_en: 'Building a game or a website is programming.',
    },
    {
      term_ru: 'Код',
      term_en: 'Code',
      definition_ru: 'Текст на языке программирования, который компьютер умеет читать и выполнять.',
      definition_en: 'Text written in a programming language that a computer can read and execute.',
      example_ru: 'console.log("Привет!") — это одна строка кода на JavaScript.',
      example_en: 'console.log("Hello!") is one line of code in JavaScript.',
    },
    {
      term_ru: 'Алгоритм',
      term_en: 'Algorithm',
      definition_ru: 'Чёткая последовательность шагов, которая решает определённую задачу.',
      definition_en: 'A clear sequence of steps that solves a specific problem.',
      example_ru: 'Рецепт торта — это алгоритм приготовления.',
      example_en: 'A cake recipe is an algorithm for baking.',
    },
    {
      term_ru: 'Язык программирования',
      term_en: 'Programming language',
      definition_ru: 'Специальный язык с правилами, на котором пишут инструкции для компьютера.',
      definition_en: 'A special language with rules used to write instructions for a computer.',
      example_ru: 'HTML, CSS, JavaScript, Python — всё это языки программирования.',
      example_en: 'HTML, CSS, JavaScript, Python are all programming languages.',
    },
    {
      term_ru: 'VSCode',
      term_en: 'VSCode',
      definition_ru: 'Visual Studio Code — бесплатный редактор кода с подсветкой синтаксиса, подсказками и встроенной поддержкой Git.',
      definition_en: 'Visual Studio Code — a free code editor with syntax highlighting, hints and built-in Git support.',
      example_ru: 'Большинство веб-разработчиков пишут код в VSCode.',
      example_en: 'Most web developers write code in VSCode.',
    },
    {
      term_ru: 'Git',
      term_en: 'Git',
      definition_ru: 'Система контроля версий: сохраняет историю изменений проекта и позволяет вернуться к любой предыдущей версии.',
      definition_en: 'A version control system: saves the history of project changes and lets you return to any previous version.',
      example_ru: 'git commit — сохраняет текущее состояние кода как «точку сохранения».',
      example_en: 'git commit — saves the current state of the code as a "save point".',
    },
    {
      term_ru: 'GitHub',
      term_en: 'GitHub',
      definition_ru: 'Веб-платформа для хранения Git-репозиториев в облаке и совместной работы над проектами.',
      definition_en: 'A web platform for storing Git repositories in the cloud and collaborating on projects.',
      example_ru: 'Загрузи проект на GitHub — он будет доступен с любого устройства.',
      example_en: 'Upload a project to GitHub — it will be accessible from any device.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Первым программистом в истории была Ада Лавлейс — она написала программу для несуществующего компьютера ещё в 1843 году!',
      text_en: 'The first programmer in history was Ada Lovelace — she wrote a program for a non-existent computer back in 1843!',
    },
    {
      text_ru: 'В мире существует более 700 языков программирования. Большинство профессионалов знают 2–3 языка и при необходимости учат новые.',
      text_en: 'There are over 700 programming languages in the world. Most professionals know 2–3 languages and learn new ones when needed.',
    },
    {
      text_ru: 'Слово «баг» (ошибка в программе) появилось в 1947 году, когда инженеры нашли настоящего мотылька внутри компьютера!',
      text_en: 'The word "bug" (error in a program) appeared in 1947 when engineers found a real moth inside a computer!',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что такое программа?',
      text_en: 'What is a program?',
      options_ru: [
        'Набор точных инструкций для компьютера',
        'Красивое оформление сайта',
        'Список покупок',
        'Любой текстовый файл',
      ],
      options_en: [
        'A set of precise instructions for a computer',
        'The visual design of a website',
        'A shopping list',
        'Any text file',
      ],
      correctIndex: 0,
      explanation_ru: 'Программа — это набор точных инструкций, записанных на языке программирования, которые компьютер выполняет шаг за шагом.',
      explanation_en: 'A program is a set of precise instructions written in a programming language that a computer executes step by step.',
    },
    {
      id: 'q2',
      text_ru: 'Что из этого является примером алгоритма?',
      text_en: 'Which of these is an example of an algorithm?',
      options_ru: [
        'Случайный набор слов',
        'Красивая картинка',
        'Имя файла',
        'Рецепт приготовления блюда',
      ],
      options_en: [
        'A random set of words',
        'A pretty picture',
        'A file name',
        'A recipe for cooking a dish',
      ],
      correctIndex: 3,
      explanation_ru: 'Рецепт — это алгоритм: чёткая последовательность шагов с определённым результатом.',
      explanation_en: 'A recipe is an algorithm: a clear sequence of steps with a defined result.',
    },
    {
      id: 'q3',
      text_ru: 'Как компьютер обрабатывает инструкции?',
      text_en: 'How does a computer process instructions?',
      options_ru: [
        'Угадывает, что имел в виду программист',
        'Выбирает самую лёгкую инструкцию',
        'Точно и буквально, шаг за шагом',
        'Случайным образом',
      ],
      options_en: [
        'It guesses what the programmer meant',
        'It picks the easiest instruction',
        'Precisely and literally, step by step',
        'Randomly',
      ],
      correctIndex: 2,
      explanation_ru: 'Компьютер выполняет инструкции точно и буквально: он не додумывает и не угадывает.',
      explanation_en: 'A computer executes instructions precisely and literally — it does not guess or improvise.',
    },
    {
      id: 'q4',
      text_ru: 'Какой язык используют для создания структуры веб-страниц?',
      text_en: 'Which language is used to create the structure of web pages?',
      options_ru: ['Python', 'HTML', 'Swift', 'Kotlin'],
      options_en: ['Python', 'HTML', 'Swift', 'Kotlin'],
      correctIndex: 1,
      explanation_ru: 'HTML — это язык разметки, с помощью которого создаётся структура любой веб-страницы.',
      explanation_en: 'HTML is the markup language used to create the structure of any web page.',
    },
    {
      id: 'q5',
      text_ru: 'Что такое «баг» в программировании?',
      text_en: 'What is a "bug" in programming?',
      options_ru: [
        'Особенность браузера',
        'Специальный файл настроек',
        'Тип данных',
        'Ошибка в программе',
      ],
      options_en: [
        'A browser feature',
        'A special settings file',
        'A data type',
        'An error in a program',
      ],
      correctIndex: 3,
      explanation_ru: 'Баг — это ошибка в коде. Название пошло от случая 1947 года, когда в компьютере нашли настоящего мотылька.',
      explanation_en: 'A bug is an error in code. The name comes from a 1947 incident when a real moth was found inside a computer.',
    },
  ],
}
