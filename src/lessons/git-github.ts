import type { Lesson } from '@/types/lesson'

export const gitGithub: Lesson = {
  slug: 'git-github',
  category: 'BASICS',
  readTime: 10,
  icon: '🌿',

  title_ru: 'Git и GitHub',
  title_en: 'Git & GitHub',

  description_ru: 'Контроль версий, история изменений и командная работа над проектами.',
  description_en: 'Version control, change history and team collaboration on projects.',

  sections: [
    { id: 'what-is-vcs',       title_ru: 'Что такое контроль версий',   title_en: 'What is version control' },
    { id: 'git-basics',        title_ru: 'Основы Git',                   title_en: 'Git basics' },
    { id: 'github-basics',     title_ru: 'Что такое GitHub',             title_en: 'What is GitHub' },
    { id: 'basic-commands',    title_ru: 'Основные команды',             title_en: 'Basic commands' },
    { id: 'vscode-git',        title_ru: 'Git в VSCode',                 title_en: 'Git in VSCode' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Git и GitHub',
      title_en: 'Git & GitHub',
      body_ru: 'Узнай, как профессиональные разработчики сохраняют историю изменений, работают в команде и не теряют свой код.',
      body_en: 'Learn how professional developers save change history, collaborate in teams and never lose their code.',
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Git — как точки сохранения в игре',
      title_en: 'Git is like save points in a game',
      body_ru: 'Представь, что ты проходишь сложную игру. Ты делаешь «сохранение» перед каждым трудным боссом — чтобы можно было вернуться, если проиграешь. Git делает то же самое с твоим кодом: ты в любой момент можешь сохранить текущее состояние проекта и при необходимости откатиться назад.',
      body_en: 'Imagine playing a hard game. You save before every difficult boss — so you can go back if you fail. Git does the same for your code: at any moment you can save the current state of the project and roll back to it if needed.',
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Что такое Git?',
      title_en: 'What is Git?',
      body_ru: 'Git — это система контроля версий. Она хранит всю историю изменений твоего кода: кто что изменил, когда и зачем. Если ты случайно удалишь важную функцию, Git поможет её восстановить. Если несколько человек работают над одним проектом — Git помогает объединять их изменения без конфликтов.',
      body_en: 'Git is a version control system. It stores the entire history of changes to your code: who changed what, when and why. If you accidentally delete an important function, Git helps you restore it. When multiple people work on one project, Git helps merge their changes without conflicts.',
      bullets: [
        { text_ru: 'Хранит полную историю изменений', text_en: 'Stores the complete change history' },
        { text_ru: 'Позволяет откатиться к любой версии', text_en: 'Lets you roll back to any version' },
        { text_ru: 'Помогает команде работать параллельно', text_en: 'Helps teams work in parallel' },
        { text_ru: 'Работает локально на твоём компьютере', text_en: 'Works locally on your computer' },
      ],
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Что такое GitHub?',
      title_en: 'What is GitHub?',
      body_ru: 'GitHub — это платформа в интернете, где хранятся Git-репозитории. Если Git — это твой локальный дневник, то GitHub — это облачное хранилище, доступное отовсюду. Здесь можно делиться кодом, работать с командой, участвовать в открытых проектах. GitHub используют миллионы разработчиков по всему миру.',
      body_en: 'GitHub is an internet platform that hosts Git repositories. If Git is your local diary, GitHub is cloud storage accessible from anywhere. You can share code, collaborate with teams and contribute to open-source projects. GitHub is used by millions of developers worldwide.',
      bullets: [
        { text_ru: 'Облачное хранилище для репозиториев', text_en: 'Cloud storage for repositories' },
        { text_ru: 'Платформа для командной работы', text_en: 'Platform for team collaboration' },
        { text_ru: 'Место для публикации open-source проектов', text_en: 'Home for open-source projects' },
        { text_ru: 'Профиль разработчика — как портфолио', text_en: 'Developer profile as a portfolio' },
      ],
    },
    {
      id: 's5',
      type: 'compare',
      title_ru: 'Git против GitHub',
      title_en: 'Git vs GitHub',
      body_ru: 'Это разные инструменты, которые отлично дополняют друг друга.',
      body_en: 'These are different tools that complement each other perfectly.',
      compareLeft: {
        label_ru: 'Git',
        label_en: 'Git',
        items_ru: [
          'Программа на твоём компьютере',
          'Хранит историю локально',
          'Работает без интернета',
          'Инструмент контроля версий',
        ],
        items_en: [
          'An app on your computer',
          'Stores history locally',
          'Works offline',
          'A version control tool',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'GitHub',
        label_en: 'GitHub',
        items_ru: [
          'Веб-сайт в интернете',
          'Хранит репозитории в облаке',
          'Нужен интернет',
          'Платформа для совместной работы',
        ],
        items_en: [
          'A website on the internet',
          'Stores repos in the cloud',
          'Requires the internet',
          'A platform for collaboration',
        ],
        color: 'green',
      },
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Первые шаги: настройка Git',
      title_en: 'First steps: setting up Git',
      body_ru: 'После установки Git нужно один раз представиться — указать своё имя и email. Эти данные будут отображаться в истории коммитов.',
      body_en: 'After installing Git you need to introduce yourself once — set your name and email. This data will appear in the commit history.',
      code: `# Настройка имени и email (делается один раз)
git config --global user.name "Имя Фамилия"
git config --global user.email "email@example.com"

# Создать новый репозиторий в текущей папке
git init

# Проверить статус файлов
git status`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Ежедневный рабочий цикл Git',
      title_en: 'The everyday Git workflow',
      body_ru: 'Три главные команды, которые ты будешь использовать каждый день: добавить файлы, создать коммит, отправить на GitHub.',
      body_en: 'Three main commands you will use every day: add files, create a commit, push to GitHub.',
      code: `# 1. Добавить изменённые файлы в «корзину» коммита
git add .           # добавить все файлы
git add index.html  # или только конкретный файл

# 2. Создать коммит с описанием изменений
git commit -m "Добавил страницу контактов"

# 3. Отправить коммиты на GitHub
git push

# Получить изменения от команды с GitHub
git pull`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'concept',
      title_ru: 'Что такое ветки?',
      title_en: 'What are branches?',
      body_ru: 'Ветка (branch) — это независимая копия проекта, в которой можно безопасно пробовать новые идеи. Основная ветка называется main. Если ты хочешь добавить новую функцию, создаёшь отдельную ветку, работаешь в ней, а когда всё готово — объединяешь с main. Так основной код всегда остаётся рабочим.',
      body_en: 'A branch is an independent copy of the project where you can safely experiment with new ideas. The main branch is called main. To add a new feature you create a separate branch, work there, and when everything is ready — merge it into main. This way the main code always stays working.',
      bullets: [
        { text_ru: 'main — основная рабочая ветка', text_en: 'main — the primary working branch' },
        { text_ru: 'Новые функции делаются в отдельных ветках', text_en: 'New features are built in separate branches' },
        { text_ru: 'git branch имя — создать ветку', text_en: 'git branch name — create a branch' },
        { text_ru: 'git merge — объединить ветки', text_en: 'git merge — merge branches' },
      ],
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Git встроен в VSCode',
      title_en: 'Git is built into VSCode',
      body_ru: 'Visual Studio Code имеет встроенную поддержку Git. На боковой панели есть значок «Source Control» (ветка дерева) — он показывает все изменённые файлы. Ты можешь создавать коммиты, переключаться между ветками и отправлять код на GitHub прямо из редактора, без терминала. Это особенно удобно для начинающих.',
      body_en: 'Visual Studio Code has built-in Git support. In the sidebar there is a "Source Control" icon (a branch tree) — it shows all changed files. You can create commits, switch branches and push code to GitHub right from the editor, without a terminal. This is especially handy for beginners.',
    },
    {
      id: 's10',
      type: 'practice-cta',
      title_ru: 'Ты готов работать как профессионал!',
      title_en: 'You are ready to work like a pro!',
      body_ru: 'Теперь ты знаешь, что такое Git и GitHub. Создай аккаунт на GitHub, установи Git и VSCode — и ты готов сохранять свои проекты и делиться ими с миром. В следующих уроках мы начнём писать настоящий HTML-код.',
      body_en: 'Now you know what Git and GitHub are. Create a GitHub account, install Git and VSCode — and you are ready to save your projects and share them with the world. In the next lessons we will start writing real HTML code.',
    },
  ],

  content: {
    intro_ru: `Когда ты пишешь код, ты постоянно вносишь изменения: добавляешь функции,
исправляешь ошибки, переписываешь части. Без системы контроля версий легко потерять
важные изменения или сломать что-то, что работало. Git решает эту проблему: он помнит
каждое твоё «сохранение» и позволяет вернуться к любому из них. GitHub добавляет к
этому возможность работать с командой и хранить проекты в облаке.`,
    intro_en: `When you write code, you constantly make changes: adding features, fixing
bugs, rewriting parts. Without a version control system it is easy to lose important
changes or break something that was working. Git solves this problem — it remembers
every "save" you make and lets you return to any of them. GitHub adds the ability to
collaborate with a team and store projects in the cloud.`,

    blocks: [
      {
        sectionId: 'what-is-vcs',
        heading_ru: 'Что такое контроль версий',
        heading_en: 'What is version control',
        text_ru: `Представь, что ты работаешь над большим эссе. Ты делаешь копию файла
перед каждым серьёзным изменением: «эссе_v1.docx», «эссе_v2.docx», «эссе_финал.docx»,
«эссе_финал2.docx»... Знакомо? Это и есть контроль версий вручную — неудобный и хаотичный.

Система контроля версий (Version Control System, VCS) автоматизирует этот процесс.
Она хранит все версии в одном месте с понятными метками: кто что изменил, когда и
с какой целью. В любой момент можно посмотреть историю, сравнить версии или вернуться
к более ранней.

Git — самая популярная система контроля версий в мире. Её создал Линус Торвальдс
(создатель Linux) в 2005 году. Сегодня Git используется практически во всех
профессиональных проектах.`,
        text_en: `Imagine working on a long essay. You make a copy before every major
change: "essay_v1.docx", "essay_v2.docx", "essay_final.docx", "essay_final2.docx"...
Sound familiar? That is manual version control — inconvenient and chaotic.

A Version Control System (VCS) automates this process. It stores all versions in one
place with clear labels: who changed what, when and why. At any moment you can browse
the history, compare versions or revert to an earlier one.

Git is the most popular version control system in the world. It was created by Linus
Torvalds (the creator of Linux) in 2005. Today Git is used in virtually every
professional project.`,
      },
      {
        sectionId: 'git-basics',
        heading_ru: 'Основы Git',
        heading_en: 'Git basics',
        text_ru: `Git работает локально — прямо на твоём компьютере. Основные понятия:

**Репозиторий (repo)** — папка проекта, отслеживаемая Git. Внутри неё создаётся
скрытая папка .git, где хранится вся история.

**Коммит (commit)** — одно «сохранение» состояния проекта. К каждому коммиту
прикладывается описание: что именно изменилось. Хорошие описания коммитов — признак
хорошего разработчика.

**Ветка (branch)** — независимая линия разработки. Основная ветка называется main
(или master в старых проектах). Новые функции разрабатывают в отдельных ветках, а
потом объединяют с основной.

**Рабочий цикл Git:**
1. Вносишь изменения в файлы
2. git add — выбираешь, что войдёт в следующий коммит
3. git commit — создаёшь коммит с описанием
4. git push — отправляешь коммиты на GitHub`,
        text_en: `Git works locally — right on your computer. Key concepts:

**Repository (repo)** — a project folder tracked by Git. Inside it Git creates a
hidden .git folder where all history is stored.

**Commit** — one "save" of the project state. Each commit has a message describing
what changed. Good commit messages are a sign of a good developer.

**Branch** — an independent line of development. The main branch is called main
(or master in older projects). New features are developed in separate branches and
then merged into the main one.

**Git workflow:**
1. Make changes to files
2. git add — select what goes into the next commit
3. git commit — create a commit with a message
4. git push — send commits to GitHub`,
        code: `# Полный пример рабочего цикла
git status                        # посмотреть изменения
git add index.html style.css      # добавить файлы
git commit -m "Оформил главную страницу"  # сохранить
git push origin main              # отправить на GitHub`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'github-basics',
        heading_ru: 'Что такое GitHub',
        heading_en: 'What is GitHub',
        text_ru: `GitHub — это не просто хранилище кода. Это целая экосистема для
разработчиков. Вот что ты можешь делать на GitHub:

**Хранить проекты** — все твои репозитории доступны из любого места и устройства.

**Работать в команде** — несколько разработчиков могут вносить изменения в один
проект. GitHub помогает объединять эти изменения без конфликтов.

**Открытый исходный код** — тысячи бесплатных библиотек и инструментов,
которыми пользуются разработчики, хранятся на GitHub. Ты можешь пользоваться
ими и даже улучшать их.

**Portfolio** — твой профиль на GitHub виден работодателям. Активный профиль
с проектами — лучшее резюме разработчика.

**Pull Request** — механизм предложить изменения в чужой проект или в командный
репозиторий. Другие разработчики могут проверить код и одобрить или отклонить
изменения.`,
        text_en: `GitHub is more than just a code storage. It is a whole ecosystem for
developers. Here is what you can do on GitHub:

**Store projects** — all your repositories are accessible from anywhere on any device.

**Team collaboration** — multiple developers can contribute to one project. GitHub
helps merge those changes without conflicts.

**Open source** — thousands of free libraries and tools that developers rely on are
hosted on GitHub. You can use them and even improve them.

**Portfolio** — your GitHub profile is visible to employers. An active profile with
projects is the best developer resume.

**Pull Request** — a mechanism to propose changes to someone else's project or a team
repository. Other developers can review the code and approve or reject changes.`,
      },
      {
        sectionId: 'basic-commands',
        heading_ru: 'Основные команды Git',
        heading_en: 'Basic Git commands',
        text_ru: `Вот самые важные команды, которые нужно знать в начале:`,
        text_en: `Here are the most important commands to know at the start:`,
        code: `# ── Настройка (один раз) ──────────────────────────────
git config --global user.name "Твоё Имя"
git config --global user.email "email@example.com"

# ── Создание репозитория ───────────────────────────────
git init              # инициализировать Git в текущей папке
git clone <url>       # скопировать репозиторий с GitHub

# ── Ежедневная работа ──────────────────────────────────
git status            # что изменилось?
git add .             # добавить все изменения
git add file.html     # добавить конкретный файл
git commit -m "Текст" # создать коммит
git log               # история коммитов

# ── Работа с GitHub ────────────────────────────────────
git push              # отправить коммиты на GitHub
git pull              # получить изменения с GitHub

# ── Ветки ──────────────────────────────────────────────
git branch            # список веток
git branch feature    # создать ветку «feature»
git checkout feature  # переключиться на ветку
git merge feature     # объединить ветку с текущей`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'vscode-git',
        heading_ru: 'Git в VSCode',
        heading_en: 'Git in VSCode',
        text_ru: `Visual Studio Code имеет встроенную поддержку Git — тебе не нужно
помнить все команды наизусть, особенно в начале.

**Source Control (Ctrl+Shift+G)** — боковая панель, которая показывает все
изменённые файлы. Нажми «+» рядом с файлом, чтобы добавить его в коммит (git add),
введи сообщение и нажми галочку — это и есть git commit.

**Синхронизация** — кнопка в нижней строке состояния позволяет делать git push и
git pull одним нажатием.

**Цветовая подсветка** — строки, которые ты добавил, выделяются зелёным; удалённые —
красным; изменённые — синим прямо в редакторе.

**GitLens** — популярное расширение для VSCode, которое добавляет ещё больше возможностей:
историю строки, blame (кто написал эту строку), сравнение ветвей и многое другое.

Совет: начни с визуального интерфейса VSCode, а потом постепенно изучай терминальные
команды — так будет легче понять, что происходит «под капотом».`,
        text_en: `Visual Studio Code has built-in Git support — you don't need to
memorise all commands by heart, especially at the start.

**Source Control (Ctrl+Shift+G)** — a sidebar panel showing all changed files. Click
"+" next to a file to stage it (git add), type a message and click the checkmark — that
is git commit.

**Sync** — a button in the bottom status bar lets you do git push and git pull with
one click.

**Colour highlighting** — lines you added are highlighted green; deleted lines red;
changed lines blue — right in the editor.

**GitLens** — a popular VSCode extension that adds even more: line history, blame
(who wrote this line), branch comparison and much more.

Tip: start with VSCode's visual interface, then gradually learn the terminal commands —
it will be easier to understand what is happening "under the hood".`,
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Git',
      term_en: 'Git',
      definition_ru: 'Система контроля версий, которая хранит историю всех изменений в проекте и работает локально на компьютере.',
      definition_en: 'A version control system that stores the history of all changes in a project and runs locally on your computer.',
      example_ru: 'git commit -m "Исправил баг в форме входа"',
      example_en: 'git commit -m "Fixed bug in login form"',
    },
    {
      term_ru: 'GitHub',
      term_en: 'GitHub',
      definition_ru: 'Веб-платформа для хранения Git-репозиториев в облаке и совместной работы над кодом.',
      definition_en: 'A web platform for storing Git repositories in the cloud and collaborating on code.',
      example_ru: 'Загрузи свой проект на GitHub и поделись ссылкой с другом.',
      example_en: 'Upload your project to GitHub and share the link with a friend.',
    },
    {
      term_ru: 'Репозиторий',
      term_en: 'Repository',
      definition_ru: 'Папка проекта, отслеживаемая Git. Хранит все файлы и полную историю изменений.',
      definition_en: 'A project folder tracked by Git. Stores all files and the complete history of changes.',
      example_ru: 'Создай репозиторий на GitHub для своего первого сайта.',
      example_en: 'Create a repository on GitHub for your first website.',
    },
    {
      term_ru: 'Коммит',
      term_en: 'Commit',
      definition_ru: 'Одна «точка сохранения» — снимок состояния проекта в определённый момент времени с описанием изменений.',
      definition_en: 'One "save point" — a snapshot of the project state at a specific moment in time with a description of changes.',
      example_ru: 'git commit -m "Добавил меню навигации"',
      example_en: 'git commit -m "Added navigation menu"',
    },
    {
      term_ru: 'Ветка',
      term_en: 'Branch',
      definition_ru: 'Независимая копия проекта для разработки новых функций, не затрагивающая основной код.',
      definition_en: 'An independent copy of the project for developing new features without affecting the main code.',
      example_ru: 'Создай ветку "contact-page" для работы над страницей контактов.',
      example_en: 'Create a branch "contact-page" to work on the contacts page.',
    },
    {
      term_ru: 'Push / Pull',
      term_en: 'Push / Pull',
      definition_ru: 'Push — отправить локальные коммиты на GitHub. Pull — получить новые коммиты с GitHub на свой компьютер.',
      definition_en: 'Push — send local commits to GitHub. Pull — fetch new commits from GitHub to your computer.',
      example_ru: 'После коммита сделай git push, чтобы сохранить код в облаке.',
      example_en: 'After committing, do git push to save the code in the cloud.',
    },
    {
      term_ru: 'Clone',
      term_en: 'Clone',
      definition_ru: 'Команда git clone копирует репозиторий с GitHub на твой компьютер вместе со всей историей.',
      definition_en: 'The git clone command copies a repository from GitHub to your computer along with its full history.',
      example_ru: 'git clone https://github.com/user/project.git',
      example_en: 'git clone https://github.com/user/project.git',
    },
    {
      term_ru: 'VSCode',
      term_en: 'VSCode',
      definition_ru: 'Visual Studio Code — бесплатный редактор кода от Microsoft со встроенной поддержкой Git, подсветкой синтаксиса и тысячами расширений.',
      definition_en: 'Visual Studio Code — a free code editor by Microsoft with built-in Git support, syntax highlighting and thousands of extensions.',
      example_ru: 'В VSCode нажми Ctrl+Shift+G, чтобы открыть панель Git.',
      example_en: 'In VSCode press Ctrl+Shift+G to open the Git panel.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Git был создан за 10 дней! Линус Торвальдс написал первую версию в апреле 2005 года, потому что не нашёл подходящего инструмента для разработки ядра Linux.',
      text_en: 'Git was created in 10 days! Linus Torvalds wrote the first version in April 2005 because he could not find a suitable tool for developing the Linux kernel.',
    },
    {
      text_ru: 'На GitHub хранится более 420 миллионов репозиториев. Это крупнейший в мире хостинг исходного кода.',
      text_en: 'GitHub hosts more than 420 million repositories. It is the world\'s largest source code hosting platform.',
    },
    {
      text_ru: 'Название «Git» — сленговое британское слово, означающее «неприятный человек». Линус Торвальдс в шутку назвал программу своим именем.',
      text_en: 'The name "Git" is British slang for an unpleasant person. Linus Torvalds jokingly named the program after himself.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что такое Git?',
      text_en: 'What is Git?',
      options_ru: [
        'Система контроля версий для отслеживания изменений в коде',
        'Веб-сайт для хранения проектов в интернете',
        'Редактор кода от Microsoft',
        'Язык программирования',
      ],
      options_en: [
        'A version control system for tracking code changes',
        'A website for storing projects online',
        'A code editor by Microsoft',
        'A programming language',
      ],
      correctIndex: 0,
      explanation_ru: 'Git — это локальная система контроля версий. GitHub — это веб-платформа для хранения репозиториев, VSCode — редактор кода.',
      explanation_en: 'Git is a local version control system. GitHub is a web platform for hosting repositories, VSCode is a code editor.',
    },
    {
      id: 'q2',
      text_ru: 'В чём главное отличие Git от GitHub?',
      text_en: 'What is the main difference between Git and GitHub?',
      options_ru: [
        'Git работает локально, GitHub — в интернете',
        'Git платный, GitHub бесплатный',
        'Git для новичков, GitHub для профессионалов',
        'Это одно и то же, просто разные названия',
      ],
      options_en: [
        'Git works locally, GitHub works on the internet',
        'Git is paid, GitHub is free',
        'Git is for beginners, GitHub is for professionals',
        'They are the same thing with different names',
      ],
      correctIndex: 0,
      explanation_ru: 'Git — программа на твоём компьютере. GitHub — облачный сервис. Они дополняют друг друга: Git хранит историю локально, GitHub — в облаке.',
      explanation_en: 'Git is an app on your computer. GitHub is a cloud service. They complement each other: Git stores history locally, GitHub in the cloud.',
    },
    {
      id: 'q3',
      text_ru: 'Что делает команда git commit?',
      text_en: 'What does the git commit command do?',
      options_ru: [
        'Сохраняет текущее состояние проекта как «точку сохранения»',
        'Отправляет код на GitHub',
        'Скачивает репозиторий с GitHub',
        'Удаляет последние изменения',
      ],
      options_en: [
        'Saves the current project state as a "save point"',
        'Sends code to GitHub',
        'Downloads a repository from GitHub',
        'Deletes the latest changes',
      ],
      correctIndex: 0,
      explanation_ru: 'git commit создаёт коммит — снимок проекта в этот момент. Отправка на GitHub — это git push, скачивание — git clone или git pull.',
      explanation_en: 'git commit creates a commit — a snapshot of the project at this moment. Sending to GitHub is git push, downloading is git clone or git pull.',
    },
    {
      id: 'q4',
      text_ru: 'Какая команда отправляет коммиты на GitHub?',
      text_en: 'Which command sends commits to GitHub?',
      options_ru: ['git push', 'git pull', 'git add', 'git status'],
      options_en: ['git push', 'git pull', 'git add', 'git status'],
      correctIndex: 0,
      explanation_ru: 'git push отправляет локальные коммиты на удалённый репозиторий (GitHub). git pull — обратная операция: получить изменения с GitHub.',
      explanation_en: 'git push sends local commits to the remote repository (GitHub). git pull is the reverse: fetch changes from GitHub.',
    },
    {
      id: 'q5',
      text_ru: 'Как называется «независимая линия разработки» в Git?',
      text_en: 'What is an "independent line of development" called in Git?',
      options_ru: ['Ветка (branch)', 'Коммит (commit)', 'Репозиторий (repository)', 'Клон (clone)'],
      options_en: ['Branch', 'Commit', 'Repository', 'Clone'],
      correctIndex: 0,
      explanation_ru: 'Ветка (branch) позволяет работать над новой функцией, не затрагивая основной код в ветке main.',
      explanation_en: 'A branch lets you work on a new feature without affecting the main code in the main branch.',
    },
  ],
}
