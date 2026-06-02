import type { Lesson } from '@/types/lesson'

export const intrToProgramming: Lesson = {
  slug: 'intro-to-programming',
  category: 'BASICS',
  readTime: 14,
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
    { id: 'career',              title_ru: 'Что создают программисты',    title_en: 'What programmers create' },
    { id: 'books',               title_ru: 'Полезные книги',              title_en: 'Recommended books' },
    { id: 'key-terms',           title_ru: 'Важные слова',                title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Что такое программирование?',
      title_en: 'What is Programming?',
      body_ru: 'Сегодня ты узнаешь, что такое код, алгоритм и языки программирования — и почему умение программировать стало ключевым навыком 21 века.',
      body_en: 'Today you will learn what code, algorithms and programming languages are — and why knowing how to program has become a key skill of the 21st century.',
      visual: { kind: 'emoji', emojis: ['💻', '🚀', '🌍'] },
    },
    {
      id: 's2',
      type: 'concept',
      title_ru: 'Что такое программирование?',
      title_en: 'What is programming?',
      body_ru: 'Программирование — это способ общаться с компьютером на его языке. Ты пишешь точные инструкции, компьютер их выполняет. Всё, что ты видишь на экране — сайты, игры, приложения — создано с помощью кода.',
      body_en: 'Programming is a way of communicating with a computer in its own language. You write precise instructions, the computer executes them. Everything you see on screen — websites, games, apps — was created with code.',
      bullets: [
        { text_ru: 'Код — текст на специальном языке, который понимает компьютер', text_en: 'Code is text in a special language the computer understands' },
        { text_ru: 'Программа — набор инструкций, выполняемых по порядку', text_en: 'A program is a set of instructions that run in order' },
        { text_ru: 'Результат программы — приложение, сайт, игра или система', text_en: 'The result of a program can be an app, website, game or system' },
        { text_ru: 'Программирование — навык, доступный каждому', text_en: 'Programming is a skill accessible to everyone' },
      ],
    },
    {
      id: 's3',
      type: 'analogy',
      title_ru: 'Программист — как повар',
      title_en: 'A programmer is like a chef',
      body_ru: 'Повар берёт рецепт — список точных шагов — и готовит блюдо. Программист берёт идею, записывает точные шаги в виде кода — и компьютер «готовит» программу. Рецепт и есть программа.',
      body_en: 'A chef takes a recipe — a list of precise steps — and cooks a dish. A programmer takes an idea, writes precise steps as code — and the computer "cooks" the program. The recipe is the program.',
      visual: { kind: 'emoji', emojis: ['👨‍🍳', '📋', '💻'] },
      bullets: [
        { text_ru: 'Рецепт = программа: пошаговая инструкция', text_en: 'Recipe = program: step-by-step instructions' },
        { text_ru: 'Повар = компьютер: точно выполняет каждый шаг', text_en: 'Chef = computer: executes each step precisely' },
        { text_ru: 'Ингредиенты = данные: то, с чем работает программа', text_en: 'Ingredients = data: what the program works with' },
        { text_ru: 'Блюдо = результат: работающее приложение', text_en: 'Dish = result: a working application' },
      ],
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Компьютер не думает — он выполняет',
      title_en: 'A computer does not think — it executes',
      body_ru: 'Компьютер — невероятно быстрая, но абсолютно буквальная машина. Он делает ровно то, что написано в коде, — без инициативы, без догадок. Задача программиста — описать каждый шаг максимально точно.',
      body_en: 'A computer is an incredibly fast but completely literal machine. It does exactly what the code says — no initiative, no guessing. The programmer\'s job is to describe every step as precisely as possible.',
      bullets: [
        { text_ru: 'Компьютер не угадывает намерения программиста', text_en: 'The computer does not guess the programmer\'s intentions' },
        { text_ru: 'Каждая команда выполняется точно так, как написана', text_en: 'Every command is executed exactly as written' },
        { text_ru: 'Одна лишняя или пропущенная буква может сломать программу', text_en: 'One extra or missing character can break the program' },
        { text_ru: 'Это учит быть внимательным и точным в деталях', text_en: 'This teaches you to be attentive and precise about details' },
      ],
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Как выглядит код?',
      title_en: 'What does code look like?',
      body_ru: 'Вот простой пример на JavaScript. Код выводит приветствие. Каждая строка — отдельная инструкция. Уже через несколько уроков ты будешь писать такой код сам.',
      body_en: 'Here is a simple JavaScript example. The code prints a greeting. Each line is a separate instruction. In just a few lessons you will be writing code like this yourself.',
      code: `// Создаём переменную с именем
const name = "Студент";

// Считаем год рождения
const birthYear = 2026 - 15;

// Выводим приветствие
console.log("Привет, " + name + "!");
console.log("Ты родился в " + birthYear + " году.");

// Результат:
// Привет, Студент!
// Ты родился в 2011 году.`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Что такое алгоритм?',
      title_en: 'What is an algorithm?',
      body_ru: 'Алгоритм — это чёткий план действий для решения задачи. Любой рецепт, маршрут или инструкция — это алгоритм. В программировании алгоритм является основой любой программы.',
      body_en: 'An algorithm is a clear action plan for solving a problem. Any recipe, route or instruction is an algorithm. In programming, an algorithm is the foundation of any program.',
      visual: { kind: 'emoji', emojis: ['1️⃣', '2️⃣', '3️⃣', '✅'] },
      bullets: [
        { text_ru: 'Конечность: алгоритм обязательно завершается', text_en: 'Finiteness: an algorithm must always terminate' },
        { text_ru: 'Однозначность: каждый шаг понятен и чёток', text_en: 'Clarity: every step is clear and unambiguous' },
        { text_ru: 'Результативность: алгоритм решает поставленную задачу', text_en: 'Effectiveness: the algorithm solves the given problem' },
        { text_ru: 'Применимость: работает не для одного случая, а для целого класса задач', text_en: 'Generality: works not just for one case but for a whole class of problems' },
      ],
    },
    {
      id: 's7',
      type: 'analogy',
      title_ru: 'Алгоритм — это маршрут',
      title_en: 'An algorithm is a route',
      body_ru: 'Когда ты идёшь в школу, ты выполняешь шаги в точном порядке — это и есть алгоритм. Тот же принцип работает в программировании: набор шагов в нужном порядке решает задачу.',
      body_en: 'When you walk to school, you follow steps in a precise order — that is an algorithm. The same principle works in programming: a set of steps in the right order solves the problem.',
      visual: { kind: 'emoji', emojis: ['🏠', '➡️', '🏫'] },
      bullets: [
        { text_ru: '1. Выйди из дома', text_en: '1. Leave the house' },
        { text_ru: '2. Поверни направо', text_en: '2. Turn right' },
        { text_ru: '3. Пройди 200 метров прямо', text_en: '3. Walk 200 metres straight ahead' },
        { text_ru: '4. Войди в школу — задача решена!', text_en: '4. Enter school — problem solved!' },
      ],
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
      title_ru: 'Языки программирования',
      title_en: 'Programming languages',
      body_ru: 'Существует более 700 языков программирования. Каждый создан для определённых задач. В этом курсе ты изучишь три главных языка веба.',
      body_en: 'There are over 700 programming languages. Each is designed for specific tasks. In this course you will learn the three main web languages.',
      bullets: [
        { text_ru: '🌐 HTML — строит структуру веб-страниц', text_en: '🌐 HTML — builds the structure of web pages' },
        { text_ru: '🎨 CSS — добавляет стиль, цвета и анимации', text_en: '🎨 CSS — adds styles, colours and animations' },
        { text_ru: '⚡ JavaScript — делает страницы живыми и интерактивными', text_en: '⚡ JavaScript — makes pages alive and interactive' },
        { text_ru: '🐍 Python — наука о данных, ИИ, автоматизация', text_en: '🐍 Python — data science, AI, automation' },
        { text_ru: '📱 Swift / Kotlin — нативные мобильные приложения', text_en: '📱 Swift / Kotlin — native mobile apps' },
      ],
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Ада Лавлейс — первый программист в истории',
      title_en: 'Ada Lovelace — the first programmer in history',
      body_ru: 'В 1843 году английский математик Ада Лавлейс написала первый алгоритм для аналитической машины Чарльза Бэббиджа — устройства, которого ещё не существовало в металле. Именно её считают первым программистом в истории человечества.',
      body_en: 'In 1843, English mathematician Ada Lovelace wrote the first algorithm for Charles Babbage\'s Analytical Engine — a device that did not yet physically exist. She is considered the first programmer in the history of humankind.',
      visual: {
        kind: 'image',
        imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/440px-Ada_Lovelace_portrait.jpg',
        caption_ru: 'Ада Лавлейс (1815–1852)',
        caption_en: 'Ada Lovelace (1815–1852)',
      },
    },
    {
      id: 's10',
      type: 'concept',
      title_ru: 'Что создают программисты?',
      title_en: 'What do programmers create?',
      body_ru: 'Программирование открывает двери в огромный мир возможностей. Всё цифровое вокруг нас — результат чьей-то работы с кодом. И ты тоже можешь создавать такие вещи.',
      body_en: 'Programming opens the door to an enormous world of possibilities. Everything digital around us is the result of someone\'s work with code. And you too can create such things.',
      visual: { kind: 'emoji', emojis: ['🎮', '📱', '🤖', '🌐'] },
      bullets: [
        { text_ru: '🎮 Видеоигры — от мобильных до AAA-блокбастеров', text_en: '🎮 Video games — from mobile to AAA blockbusters' },
        { text_ru: '📱 Мобильные приложения для iOS и Android', text_en: '📱 Mobile apps for iOS and Android' },
        { text_ru: '🌐 Веб-сайты и онлайн-сервисы', text_en: '🌐 Websites and online services' },
        { text_ru: '🤖 Искусственный интеллект и нейросети', text_en: '🤖 Artificial intelligence and neural networks' },
        { text_ru: '🚗 Системы управления роботами и автомобилями', text_en: '🚗 Control systems for robots and self-driving cars' },
      ],
    },
    {
      id: 's11',
      type: 'concept',
      title_ru: 'Зачем учиться программировать?',
      title_en: 'Why learn to code?',
      body_ru: 'Программирование — это не только профессия. Это способ думать: разбивать большую задачу на шаги, находить закономерности, решать проблемы творчески. Этот навык полезен в любой сфере жизни.',
      body_en: 'Programming is not just a career. It is a way of thinking: breaking a big task into steps, finding patterns, solving problems creatively. This skill is useful in every area of life.',
      bullets: [
        { text_ru: '💰 Одна из самых высокооплачиваемых профессий в мире', text_en: '💰 One of the highest-paid professions in the world' },
        { text_ru: '🌍 Работа из любой точки планеты', text_en: '🌍 Work from anywhere on the planet' },
        { text_ru: '🧠 Развивает логическое и аналитическое мышление', text_en: '🧠 Develops logical and analytical thinking' },
        { text_ru: '🛠️ Позволяет создавать собственные продукты и стартапы', text_en: '🛠️ Lets you build your own products and startups' },
        { text_ru: '📈 Спрос на разработчиков растёт каждый год', text_en: '📈 Demand for developers grows every year' },
      ],
    },
    {
      id: 's12',
      type: 'tip',
      title_ru: 'Ошибки — это нормально',
      title_en: 'Mistakes are normal',
      body_ru: 'Каждый программист, от новичка до эксперта, делает ошибки каждый день. Ошибки в коде называются «баги». Само слово появилось в 1947 году, когда инженеры буквально нашли мотылька внутри компьютера!',
      body_en: 'Every programmer, from beginner to expert, makes mistakes every day. Code errors are called "bugs". The word itself appeared in 1947 when engineers literally found a moth inside a computer!',
      visual: { kind: 'emoji', emojis: ['🐛', '🔍', '✅'] },
      bullets: [
        { text_ru: 'Первый «баг» — настоящий мотылёк в компьютере Mark II, 1947 г.', text_en: 'The first "bug" — a real moth in the Mark II computer, 1947' },
        { text_ru: 'Поиск и исправление ошибок — дебаггинг (debugging)', text_en: 'Finding and fixing errors is called debugging' },
        { text_ru: 'Умение находить ошибки так же важно, как умение не делать их', text_en: 'Finding bugs is as important a skill as not making them' },
        { text_ru: 'Не бойся ошибок — они учат лучше, чем правильный код', text_en: 'Don\'t fear mistakes — they teach better than correct code' },
      ],
    },
    {
      id: 's13',
      type: 'concept',
      title_ru: 'Рекомендуемые книги',
      title_en: 'Recommended books',
      body_ru: 'Хочешь пойти глубже и стать настоящим профессионалом? Эти книги — лучшие помощники на пути. Особое место занимает фундаментальная серия А.В. Столярова — наиболее полный русскоязычный курс по программированию.',
      body_en: 'Want to go deeper and become a true professional? These books are the best guides on the journey. A special place is held by the fundamental series of A.V. Stolyarov — the most comprehensive Russian-language programming course.',
      visual: {
        kind: 'image',
        imageUrl: 'https://imo10.labirint.ru/books/809304/cover.jpg/242-0',
        caption_ru: 'А.В. Столяров «Программирование: введение в профессию»',
        caption_en: 'A.V. Stolyarov «Programming: Introduction to the Profession»',
      },
      bullets: [
        { text_ru: '⭐ Столяров А.В. «Программирование: введение в профессию» (4 тома) — лучший выбор для глубокого изучения', text_en: '⭐ Stolyarov A.V. «Programming: Introduction to the Profession» (4 volumes) — best choice for thorough learning' },
        { text_ru: '🆓 Все тома Столярова бесплатно доступны на stolyarov.info', text_en: '🆓 All Stolyarov volumes are freely available at stolyarov.info' },
        { text_ru: '📗 Бхаргава «Грокаем алгоритмы» — алгоритмы с иллюстрациями, легко и наглядно', text_en: '📗 Bhargava «Grokking Algorithms» — algorithms explained with illustrations' },
        { text_ru: '📘 Роберт Мартин «Чистый код» — как писать код, который легко читать и поддерживать', text_en: '📘 Robert Martin «Clean Code» — how to write readable and maintainable code' },
      ],
    },
    {
      id: 's14',
      type: 'practice-cta',
      title_ru: 'Ты готов начать!',
      title_en: 'You are ready to start!',
      body_ru: 'Теперь ты знаешь, что такое программирование, код и алгоритм. В следующем уроке ты напишешь свои первые строки HTML — языка, на котором построены все сайты мира.',
      body_en: 'Now you know what programming, code and algorithms are. In the next lesson you will write your first lines of HTML — the language every website in the world is built with.',
      visual: { kind: 'emoji', emojis: ['🎉', '💻', '🚀'] },
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
аккуратности, зато даёт тебе полный контроль над тем, что происходит.

Именно поэтому программисты так внимательно относятся к деталям. Одна лишняя запятая, одна заглавная буква вместо строчной — и программа может не запуститься или работать неправильно. Это кажется сложным, но на самом деле учит быть точным и аккуратным, что ценно в любой профессии.`,
        text_en: `Imagine explaining directions to a robot that knows nothing about your
city. You cannot say "go straight to the park" — it does not know where the park is.
You need to say: "take 50 steps forward, turn left, take 30 more steps". A computer is
the same. It only carries out specific, precise commands. This demands care, but it
gives you complete control over what happens.

This is why programmers pay such close attention to detail. One extra comma, one capital letter instead of lowercase — and the program may fail to start or behave incorrectly. This seems difficult, but it actually teaches you to be precise and careful, which is valuable in any profession.`,
      },
      {
        sectionId: 'algorithm',
        heading_ru: 'Что такое алгоритм',
        heading_en: 'What is an algorithm',
        text_ru: `Алгоритм — это чёткая последовательность шагов для решения задачи.
У хорошего алгоритма четыре свойства: он конечен (обязательно заканчивается), однозначен (каждый шаг понятен), результативен (даёт нужный ответ) и применим к целому классу похожих задач. Например, алгоритм «как почистить зубы»: взять щётку → нанести пасту → чистить 2 минуты → прополоскать. Каждый шаг конкретный, и у процесса есть конец.

Алгоритмы окружают нас повсюду: рецепт торта, инструкция по сборке мебели, навигатор в телефоне — всё это алгоритмы. Умение составлять чёткие алгоритмы — один из главных навыков программиста. Прежде чем писать код, опытные разработчики сначала продумывают алгоритм решения задачи.`,
        text_en: `An algorithm is a clear sequence of steps for solving a problem.
A good algorithm has four properties: it is finite (it always ends), unambiguous (each step is clear), effective (it produces the needed result) and general (it works for a whole class of similar problems). For example, the algorithm for brushing teeth: grab a toothbrush → apply toothpaste → brush for 2 minutes → rinse. Each step is concrete, and the process has an end.

Algorithms surround us everywhere: a cake recipe, furniture assembly instructions, a phone navigator — all of these are algorithms. The ability to design clear algorithms is one of the key skills of a programmer. Before writing code, experienced developers first think through the algorithm for solving the problem.`,
      },
      {
        sectionId: 'languages',
        heading_ru: 'Языки программирования',
        heading_en: 'Programming languages',
        text_ru: `На каждую задачу — свой инструмент. HTML и CSS используются для
создания веб-страниц. JavaScript добавляет на страницы интерактивность. Python
отлично подходит для анализа данных и искусственного интеллекта. Swift и Kotlin
создают приложения для смартфонов. В этом курсе ты начнёшь с HTML — самого простого
и наглядного языка, результат работы которого ты видишь сразу в браузере.

Не нужно знать все языки сразу. Большинство профессиональных программистов хорошо знают 2–3 языка и при необходимости изучают новые. Главное — понять базовые принципы программирования: они одинаковы во всех языках. Освоив один язык, ты сможешь намного быстрее выучить второй.`,
        text_en: `Different tasks call for different tools. HTML and CSS are used to
create web pages. JavaScript adds interactivity to pages. Python is great for data
analysis and artificial intelligence. Swift and Kotlin build smartphone apps. In this
course you will start with HTML — the simplest and most visual language, whose output
you can see immediately in the browser.

You don't need to know all languages at once. Most professional programmers know 2–3 languages well and learn new ones when needed. The most important thing is to understand the core principles of programming — they are the same in all languages. Once you master one language, you can learn the next one much faster.`,
      },
      {
        sectionId: 'career',
        heading_ru: 'Что создают программисты',
        heading_en: 'What programmers create',
        text_ru: `Программирование открывает двери в огромный мир возможностей. Всё цифровое вокруг нас создано программистами. Веб-разработчики строят сайты и онлайн-сервисы. Мобильные разработчики создают приложения для смартфонов. Разработчики игр создают виртуальные миры. Инженеры по машинному обучению строят нейросети и ИИ-системы.

Программирование — одна из самых высокооплачиваемых и востребованных профессий в мире. По данным исследований, к 2030 году дефицит разработчиков в мире составит более 85 миллионов человек. При этом работать программистом можно из любой точки мира — достаточно ноутбука и интернета.`,
        text_en: `Programming opens the door to an enormous world of possibilities. Everything digital around us was created by programmers. Web developers build websites and online services. Mobile developers create smartphone apps. Game developers build virtual worlds. Machine learning engineers build neural networks and AI systems.

Programming is one of the highest-paid and most in-demand professions in the world. According to research, by 2030 the global shortage of developers will exceed 85 million people. Meanwhile, you can work as a programmer from anywhere in the world — all you need is a laptop and internet connection.`,
      },
      {
        sectionId: 'books',
        heading_ru: 'Полезные книги',
        heading_en: 'Recommended books',
        text_ru: `Книги — один из лучших способов получить глубокое понимание программирования. Среди русскоязычных материалов особое место занимает серия А.В. Столярова «Программирование: введение в профессию» — четыре тома, которые охватывают всё: от основ алгоритмического мышления до системного программирования и парадигм. Это не просто учебник — это фундаментальный труд, написанный практикующим преподавателем для тех, кто хочет стать настоящим профессионалом.

Важно: все четыре тома Столярова доступны бесплатно в PDF на официальном сайте автора stolyarov.info. Это редкий случай, когда качественная фундаментальная литература открыта для всех.

Из других рекомендуемых книг: «Грокаем алгоритмы» Адитьи Бхаргавы — отличный старт для понимания алгоритмов с наглядными иллюстрациями; «Чистый код» Роберта Мартина — классика о том, как писать профессиональный, читаемый код.`,
        text_en: `Books are one of the best ways to gain a deep understanding of programming. Among Russian-language materials, the series by A.V. Stolyarov «Programming: Introduction to the Profession» holds a special place — four volumes covering everything from the basics of algorithmic thinking to systems programming and programming paradigms. This is not just a textbook — it is a fundamental work written by a practising educator for those who want to become true professionals.

Important: all four Stolyarov volumes are available free as PDFs on the author's official website stolyarov.info. This is a rare case where high-quality fundamental literature is open to everyone.

Other recommended books: «Grokking Algorithms» by Aditya Bhargava — an excellent starting point for understanding algorithms with clear illustrations; «Clean Code» by Robert Martin — a classic on writing professional, readable code.`,
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
      definition_ru: 'Чёткая конечная последовательность шагов, которая решает определённую задачу.',
      definition_en: 'A clear, finite sequence of steps that solves a specific problem.',
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
      term_ru: 'Баг',
      term_en: 'Bug',
      definition_ru: 'Ошибка в программе, из-за которой она работает неправильно или не запускается.',
      definition_en: 'An error in a program that causes it to behave incorrectly or not start at all.',
      example_ru: 'Кнопка не работает из-за бага в коде.',
      example_en: 'The button does not work because of a bug in the code.',
    },
    {
      term_ru: 'Дебаггинг',
      term_en: 'Debugging',
      definition_ru: 'Процесс поиска и исправления ошибок (багов) в программе.',
      definition_en: 'The process of finding and fixing errors (bugs) in a program.',
      example_ru: 'Программист час занимался дебаггингом, пока не нашёл ошибку.',
      example_en: 'The programmer spent an hour debugging before finding the error.',
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
    {
      text_ru: 'Серия книг А.В. Столярова «Программирование: введение в профессию» доступна бесплатно на stolyarov.info — это один из лучших курсов по программированию на русском языке.',
      text_en: 'A.V. Stolyarov\'s book series «Programming: Introduction to the Profession» is available for free at stolyarov.info — one of the best programming courses in Russian.',
    },
    {
      text_ru: 'По прогнозам, к 2030 году в мире будет не хватать более 85 миллионов программистов. Начинай учиться сейчас!',
      text_en: 'According to forecasts, by 2030 the world will be short of more than 85 million programmers. Start learning now!',
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
    {
      id: 'q6',
      text_ru: 'Чьи книги особенно рекомендуются для глубокого изучения программирования на русском языке?',
      text_en: 'Whose books are especially recommended for a thorough study of programming in Russian?',
      options_ru: [
        'А.В. Столярова',
        'Льва Толстого',
        'Билла Гейтса',
        'Стива Джобса',
      ],
      options_en: [
        'A.V. Stolyarov',
        'Leo Tolstoy',
        'Bill Gates',
        'Steve Jobs',
      ],
      correctIndex: 0,
      explanation_ru: 'Серия А.В. Столярова «Программирование: введение в профессию» — один из лучших фундаментальных курсов по программированию на русском языке, доступный бесплатно на stolyarov.info.',
      explanation_en: 'A.V. Stolyarov\'s series «Programming: Introduction to the Profession» is one of the best fundamental programming courses in Russian, available free at stolyarov.info.',
    },
  ],
}
