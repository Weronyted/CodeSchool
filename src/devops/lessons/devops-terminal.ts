import type { DevOpsLesson } from '@/types/devops'

export const devopsTerminal: DevOpsLesson = {
  slug: 'devops-terminal',
  moduleId: 'foundations',
  order: 2,
  icon: '⌨️',
  readTime: 14,

  title_ru: 'Продвинутый терминал',
  title_en: 'Advanced Terminal',
  description_ru: 'Пайпы, grep, процессы, права доступа и переменные окружения.',
  description_en: 'Pipes, grep, processes, permissions and environment variables.',

  sections: [
    { id: 'why',       title_ru: 'Почему терминал, а не мышка', title_en: 'Why the terminal, not the mouse' },
    { id: 'pipes',     title_ru: 'Пайпы и фильтры',             title_en: 'Pipes and filters' },
    { id: 'processes', title_ru: 'Процессы и порты',            title_en: 'Processes and ports' },
    { id: 'env',       title_ru: 'Переменные окружения',        title_en: 'Environment variables' },
    { id: 'perms',     title_ru: 'Права доступа',               title_en: 'Permissions' },
    { id: 'key-terms', title_ru: 'Ключевые термины',            title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'На сервере нет графического интерфейса. Совсем. Всё, что у тебя есть, — чёрное окно и клавиатура, и именно поэтому терминал для DevOps не «способ выглядеть хакером», а основной инструмент. Хорошая новость: 90% работы делается двумя десятками команд.',
    intro_en:
      'A server has no graphical interface. None. All you get is a black window and a keyboard, which is why the terminal is not a "look like a hacker" thing for DevOps but the main tool. The good news: 90% of the work is done with about twenty commands.',

    blocks: [
      {
        sectionId: 'why',
        heading_ru: 'Почему терминал, а не мышка',
        heading_en: 'Why the terminal, not the mouse',
        text_ru:
          'Три причины, и все три практические.\n\nПервая: команду можно записать в скрипт, а движение мышкой — нет. Всё, что ты делаешь в терминале, автоматизируется копипастом.\n\nВторая: команда воспроизводима. «Нажми на третью вкладку и поставь галочку» через полгода означает уже другое, а `systemctl restart nginx` — то же самое.\n\nТретья: терминал работает через SSH по узкому каналу из любой точки мира, а удалённый рабочий стол — нет.',
        text_en:
          'Three reasons, all practical.\n\nFirst: a command can be written into a script, a mouse movement cannot. Everything you do in a terminal automates by copy-paste.\n\nSecond: a command is reproducible. "Click the third tab and tick the box" means something different six months later; `systemctl restart nginx` does not.\n\nThird: a terminal works over SSH on a thin connection from anywhere in the world. A remote desktop does not.',
      },
      {
        sectionId: 'pipes',
        heading_ru: 'Пайпы и фильтры',
        heading_en: 'Pipes and filters',
        text_ru:
          'Философия Unix: каждая программа делает одну вещь, но делает её хорошо, а связываются они через пайп `|` — вывод одной команды становится вводом следующей.\n\nЭто главный приём при разборе логов. Не нужно искать глазами по десяти тысячам строк: цепочка из трёх команд отвечает на вопрос за секунду.\n\n• `grep` — оставить строки, где встречается образец\n• `tail -n 50` — последние 50 строк, `-f` — следить за новыми\n• `wc -l` — посчитать строки\n• `sort | uniq -c` — сгруппировать и посчитать повторы',
        text_en:
          'The Unix philosophy: every program does one thing well, and they connect through the pipe `|` — the output of one command becomes the input of the next.\n\nThis is the core technique for reading logs. You do not scan ten thousand lines with your eyes: a chain of three commands answers the question in a second.\n\n• `grep` — keep lines matching a pattern\n• `tail -n 50` — last 50 lines, `-f` — follow new ones\n• `wc -l` — count lines\n• `sort | uniq -c` — group and count repeats',
        code: '# сколько ошибок 500 в логе за сегодня\ngrep " 500 " access.log | wc -l\n\n# топ-5 IP, которые чаще всего стучались\nawk \'{print $1}\' access.log | sort | uniq -c | sort -rn | head -5\n\n# следить за ошибками в реальном времени\ntail -f app.log | grep --line-buffered ERROR',
        codeLang: 'bash',
        codeCaption: 'разбор лога в три команды',
      },
      {
        sectionId: 'processes',
        heading_ru: 'Процессы и порты',
        heading_en: 'Processes and ports',
        text_ru:
          'Самая частая ошибка новичка на сервере: «порт 3000 уже занят». Значит, старый процесс не умер. Разбираться нужно так: найти процесс → понять, что это → аккуратно попросить его завершиться.\n\n`kill` отправляет процессу сигнал TERM — вежливую просьбу закрыться, дав ему сохранить данные. `kill -9` отправляет KILL, который нельзя перехватить: процесс умирает мгновенно, не закрыв файлы и соединения. Начинай всегда с обычного `kill`.',
        text_en:
          'The most common beginner error on a server: "port 3000 is already in use". That means an old process did not die. The routine is: find the process → understand what it is → politely ask it to exit.\n\n`kill` sends the TERM signal — a polite request to shut down that lets the process save its data. `kill -9` sends KILL, which cannot be intercepted: the process dies instantly with files and connections still open. Always start with a plain `kill`.',
        code: '# кто занял порт 3000\nlsof -i :3000\n\n# все процессы node\nps aux | grep node\n\n# вежливо завершить\nkill 4821\n\n# если не помогло — жёстко\nkill -9 4821',
        codeLang: 'bash',
      },
      {
        sectionId: 'env',
        heading_ru: 'Переменные окружения',
        heading_en: 'Environment variables',
        text_ru:
          'Одно и то же приложение должно работать локально, на staging и в проде — с разной базой, разными ключами и разным уровнем логов. Хардкодить эти значения в коде нельзя: тогда для каждого окружения нужна своя сборка.\n\nРешение — переменные окружения. Код читает `process.env.DATABASE_URL`, а значение подставляет окружение. Отсюда важнейшее правило безопасности: файл `.env` с реальными паролями никогда не попадает в git. В репозитории лежит только `.env.example` — список нужных ключей без значений.',
        text_en:
          'The same application must run locally, on staging and in production — with a different database, different keys and a different log level. Hard-coding those values is not an option: you would need a separate build per environment.\n\nThe answer is environment variables. The code reads `process.env.DATABASE_URL` and the environment supplies the value. Hence the crucial security rule: a `.env` file with real passwords never goes into git. The repository only holds `.env.example` — the list of required keys without values.',
        code: '# посмотреть переменную\necho $DATABASE_URL\n\n# задать на один запуск\nNODE_ENV=production node server.js\n\n# экспортировать в текущую сессию\nexport LOG_LEVEL=debug\n\n# все переменные разом\nprintenv | sort',
        codeLang: 'bash',
      },
      {
        sectionId: 'perms',
        heading_ru: 'Права доступа',
        heading_en: 'Permissions',
        text_ru:
          'В Linux у каждого файла есть владелец, группа и три набора прав: чтение (r=4), запись (w=2), выполнение (x=1). Отсюда знакомые числа: 755 — владелец может всё, остальные читать и выполнять; 644 — владелец пишет, остальные только читают.\n\nПравило для приватного ключа SSH — 600. Если прав больше, ssh откажется его использовать: ключ, который может прочитать кто угодно, считается скомпрометированным.\n\nИ отдельно про `sudo`: это не «волшебная приставка, чтобы заработало». Каждое `sudo` — это выполнение команды от root, где опечатка в пути может стереть систему.',
        text_en:
          'In Linux every file has an owner, a group and three permission sets: read (r=4), write (w=2), execute (x=1). Hence the familiar numbers: 755 — the owner can do everything, others read and execute; 644 — the owner writes, others only read.\n\nThe rule for an SSH private key is 600. With looser permissions ssh refuses to use it: a key anyone can read is considered compromised.\n\nAnd about `sudo`: it is not a "magic prefix that makes things work". Every `sudo` runs a command as root, where a typo in a path can wipe the system.',
        code: 'chmod 600 ~/.ssh/id_ed25519   # только владелец\nchmod +x deploy.sh             # сделать исполняемым\nchown -R appuser:appuser /srv/app\nls -la                         # посмотреть, что получилось',
        codeLang: 'bash',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Пайп (|)', term_en: 'Pipe (|)',
      definition_ru: 'Оператор, направляющий вывод одной команды на вход другой.',
      definition_en: 'An operator sending the output of one command into the input of another.',
      example_ru: 'cat app.log | grep ERROR', example_en: 'cat app.log | grep ERROR',
    },
    {
      term_ru: 'stdout / stderr', term_en: 'stdout / stderr',
      definition_ru: 'Два отдельных потока вывода: обычный результат и ошибки. Поэтому `2>&1` перенаправляет ошибки туда же, куда и результат.',
      definition_en: 'Two separate output streams: normal results and errors. That is why `2>&1` redirects errors into the same place as results.',
    },
    {
      term_ru: 'PID', term_en: 'PID',
      definition_ru: 'Числовой идентификатор процесса, по которому его можно найти и завершить.',
      definition_en: 'The numeric process identifier used to find and terminate it.',
    },
    {
      term_ru: 'SIGTERM / SIGKILL', term_en: 'SIGTERM / SIGKILL',
      definition_ru: 'Сигналы завершения. TERM просит закрыться корректно, KILL (-9) убивает мгновенно и без шансов сохраниться.',
      definition_en: 'Termination signals. TERM asks for a graceful shutdown, KILL (-9) terminates instantly with no chance to save.',
    },
    {
      term_ru: 'Переменная окружения', term_en: 'Environment variable',
      definition_ru: 'Значение, которое окружение передаёт процессу при запуске. Способ настроить приложение, не меняя код.',
      definition_en: 'A value the environment passes to a process at startup. The way to configure an app without changing code.',
    },
  ],

  didYouKnow: [
    {
      text_ru: '`grep` расшифровывается как g/re/p — команда текстового редактора ed, означающая «глобально найти регулярное выражение и напечатать».',
      text_en: '`grep` stands for g/re/p — an ed editor command meaning "globally search for a regular expression and print".',
    },
    {
      text_ru: 'Если приложение в контейнере игнорирует SIGTERM, Docker ждёт 10 секунд и присылает SIGKILL. Именно поэтому «graceful shutdown» пишут в коде явно.',
      text_en: 'If an app in a container ignores SIGTERM, Docker waits 10 seconds and sends SIGKILL. That is exactly why graceful shutdown is written explicitly in the code.',
    },
    {
      text_ru: 'Команда, начинающаяся с пробела, не попадает в историю bash. Удобно, когда в аргументах пароль.',
      text_en: 'A command starting with a space is not stored in bash history. Handy when the arguments contain a password.',
    },
  ],

  labs: [
    {
      id: 'lab-triage-terminal',
      title_ru: 'Сервер не отвечает — разберись из терминала',
      title_en: 'The server is not responding — triage it from the terminal',
      brief_ru: 'Приложение не открывается на порту 3000. Настоящей системы за симулятором нет, но команды и вывод — реальные. Выполни все задачи справа.',
      brief_en: 'The app does not answer on port 3000. There is no real system behind the simulator, but the commands and output are real. Complete every task on the right.',
      task: {
        kind: 'terminal-simulator',
        prompt: 'student@codeschool:~/app$',
        motd_ru: [
          'Ubuntu 24.04.1 LTS  (GNU/Linux 6.8.0-45-generic x86_64)',
          '',
          '  Загрузка системы: 0.42   Память: 61%   Процессы: 128',
          '  Последний вход: сегодня, 09:14 с 10.0.0.4',
          '',
          '# Приложение не отвечает на порту 3000. Разберись.',
          '# Подсказка: `help` покажет доступные команды.',
          '',
        ],
        motd_en: [
          'Ubuntu 24.04.1 LTS  (GNU/Linux 6.8.0-45-generic x86_64)',
          '',
          '  System load: 0.42   Memory: 61%   Processes: 128',
          '  Last login: today, 09:14 from 10.0.0.4',
          '',
          '# The app is not responding on port 3000. Find out why.',
          '# Hint: `help` lists the available commands.',
          '',
        ],
        responses: [
          {
            match: 'ls',
            output: ['deploy.sh  node_modules  package.json  server.js  .env.example  logs'],
          },
          {
            match: 'ls -la',
            output: [
              'total 48',
              'drwxr-xr-x  5 student student 4096 Aug 13 09:20 .',
              'drwxr-xr-x 12 student student 4096 Aug 13 08:02 ..',
              '-rw-r--r--  1 student student  214 Aug 13 09:02 .env.example',
              '-rwxr-xr-x  1 student student 1204 Aug 13 09:02 deploy.sh',
              'drwxr-xr-x  2 student student 4096 Aug 13 09:18 logs',
              '-rw-r--r--  1 student student 1840 Aug 13 09:02 package.json',
              '-rw-r--r--  1 student student 3120 Aug 13 09:02 server.js',
            ],
          },
          {
            match: 'lsof -i :3000',
            output: [
              'COMMAND   PID    USER   FD   TYPE DEVICE SIZE/OFF NODE NAME',
              'node     4821 student   21u  IPv4 118342      0t0  TCP *:3000 (LISTEN)',
            ],
          },
          {
            match: 'ps aux \\| grep node',
            regex: true,
            output: [
              'student   4821  0.1 12.4 1284560 98420 ?  Sl   09:02   0:11 node server.js',
              'student   5190  0.0  0.0   6432   712 pts/0 S+  09:21   0:00 grep --color=auto node',
            ],
          },
          {
            match: 'tail -n 20 logs/app.log',
            output: [
              '2026-08-13T09:18:02Z INFO  [server] request GET /api/orders',
              '2026-08-13T09:18:03Z ERROR [db] connect ECONNREFUSED 127.0.0.1:5432',
              '2026-08-13T09:18:03Z ERROR [db] connect ECONNREFUSED 127.0.0.1:5432',
              '2026-08-13T09:18:04Z FATAL [server] database pool exhausted, refusing connections',
            ],
          },
          {
            match: 'grep ERROR logs/app\\.log \\| wc -l',
            regex: true,
            output: ['37'],
          },
          {
            match: 'grep ERROR logs/app\\.log',
            regex: true,
            output: [
              '2026-08-13T09:18:03Z ERROR [db] connect ECONNREFUSED 127.0.0.1:5432',
              '2026-08-13T09:18:03Z ERROR [db] connect ECONNREFUSED 127.0.0.1:5432',
              '... (35 строк пропущено)',
            ],
          },
          {
            match: 'echo \\$DATABASE_URL',
            regex: true,
            output: ['', '# переменная пуста — приложение не знает, куда подключаться'],
          },
          {
            match: 'printenv',
            output: [
              'PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin',
              'HOME=/home/student',
              'NODE_ENV=production',
              'LOG_LEVEL=info',
              '# DATABASE_URL отсутствует',
            ],
          },
          {
            match: 'kill 4821',
            output: [],
            sets: ['killed'],
          },
          {
            match: 'kill -9 4821',
            output: [],
            sets: ['killed'],
          },
          {
            match: 'chmod 600 ~/\\.ssh/id_ed25519',
            regex: true,
            output: [],
          },
          {
            match: 'cat .env.example',
            output: [
              'DATABASE_URL=',
              'REDIS_URL=',
              'LOG_LEVEL=info',
              'PORT=3000',
            ],
          },
        ],
        goals: [
          {
            id: 'g1',
            description_ru: 'Найди процесс, который занял порт 3000',
            description_en: 'Find the process holding port 3000',
            pattern: '^lsof -i :3000$',
          },
          {
            id: 'g2',
            description_ru: 'Посмотри последние строки лога приложения',
            description_en: 'Read the last lines of the app log',
            pattern: '^tail -n 20 logs/app\\.log$',
          },
          {
            id: 'g3',
            description_ru: 'Посчитай количество ошибок в логе через пайп',
            description_en: 'Count the errors in the log using a pipe',
            pattern: 'grep ERROR logs/app\\.log \\| wc -l',
          },
          {
            id: 'g4',
            description_ru: 'Проверь, задана ли переменная DATABASE_URL',
            description_en: 'Check whether DATABASE_URL is set',
            pattern: '^(echo \\$DATABASE_URL|printenv)$',
          },
          {
            id: 'g5',
            description_ru: 'Заверши зависший процесс вежливым сигналом',
            description_en: 'Terminate the stuck process with a polite signal',
            pattern: '^kill 4821$',
          },
        ],
        suggestions: [
          'ls -la',
          'lsof -i :3000',
          'ps aux | grep node',
          'tail -n 20 logs/app.log',
          'grep ERROR logs/app.log | wc -l',
          'echo $DATABASE_URL',
          'printenv',
          'cat .env.example',
          'kill 4821',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что делает команда `tail -f app.log | grep ERROR`?',
      text_en: 'What does `tail -f app.log | grep ERROR` do?',
      options_ru: [
        'Удаляет из лога все строки с ошибками',
        'Показывает в реальном времени только новые строки, содержащие ERROR',
        'Считает количество ошибок за всё время',
        'Копирует лог в файл ERROR',
      ],
      options_en: [
        'Deletes every error line from the log',
        'Shows only new lines containing ERROR, in real time',
        'Counts all errors ever recorded',
        'Copies the log into a file named ERROR',
      ],
      correctIndex: 1,
      explanation_ru: '`tail -f` следит за концом файла и отдаёт новые строки, а `grep` пропускает дальше только те, где есть образец.',
      explanation_en: '`tail -f` follows the end of the file and emits new lines, and `grep` passes through only those matching the pattern.',
    },
    {
      id: 'q2',
      text_ru: 'Почему `kill -9` считают крайней мерой?',
      text_en: 'Why is `kill -9` considered a last resort?',
      options_ru: [
        'Он требует прав root',
        'Процесс не может перехватить сигнал и умирает, не закрыв файлы, соединения и не сохранив данные',
        'Он завершает вообще все процессы пользователя',
        'Он работает медленнее обычного kill',
      ],
      options_en: [
        'It requires root privileges',
        'The process cannot intercept the signal and dies without closing files, connections or saving data',
        'It terminates every process of the user',
        'It is slower than a plain kill',
      ],
      correctIndex: 1,
      explanation_ru: 'SIGKILL нельзя обработать. Приложение не выполнит graceful shutdown — недописанные данные и открытые транзакции просто пропадут.',
      explanation_en: 'SIGKILL cannot be handled. The app never runs its graceful shutdown — half-written data and open transactions are simply lost.',
    },
    {
      id: 'q3',
      text_ru: 'Что должно лежать в репозитории вместо файла .env с настоящими паролями?',
      text_en: 'What belongs in the repository instead of a .env file with real passwords?',
      options_ru: [
        '.env, но с закомментированными паролями',
        '.env.example со списком нужных ключей и пустыми значениями',
        'Ничего — переменные придумывает каждый разработчик сам',
        'Пароли в README, чтобы не потерялись',
      ],
      options_en: [
        '.env with the passwords commented out',
        '.env.example listing the required keys with empty values',
        'Nothing — each developer invents their own variables',
        'The passwords in the README so they are not lost',
      ],
      correctIndex: 1,
      explanation_ru: '`.env.example` документирует, какие переменные нужны, не раскрывая значений. Сами значения живут в секретах CI и на сервере.',
      explanation_en: '`.env.example` documents which variables are needed without exposing values. The values themselves live in CI secrets and on the server.',
    },
    {
      id: 'q4',
      text_ru: 'Права 600 на приватном SSH-ключе означают, что…',
      text_en: 'Permissions 600 on an SSH private key mean that…',
      options_ru: [
        'Ключ может читать и писать только владелец',
        'Ключ доступен всем на чтение',
        'Ключ исполняемый',
        'Ключ принадлежит root',
      ],
      options_en: [
        'Only the owner can read and write the key',
        'Everyone can read the key',
        'The key is executable',
        'The key belongs to root',
      ],
      correctIndex: 0,
      explanation_ru: '6 = чтение (4) + запись (2) для владельца, нули — для группы и остальных. При более широких правах ssh откажется использовать ключ.',
      explanation_en: '6 = read (4) + write (2) for the owner, zeros for group and others. With looser permissions ssh refuses to use the key.',
    },
  ],
}
