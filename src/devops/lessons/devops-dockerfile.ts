import type { DevOpsLesson } from '@/types/devops'

export const devopsDockerfile: DevOpsLesson = {
  slug: 'devops-dockerfile',
  moduleId: 'containers',
  order: 2,
  icon: '📄',
  readTime: 15,

  title_ru: 'Dockerfile',
  title_en: 'Dockerfile',
  description_ru: 'Слои, кэш, multi-stage build и как не собрать образ на 1.2 ГБ.',
  description_en: 'Layers, cache, multi-stage builds and how not to ship a 1.2 GB image.',

  sections: [
    { id: 'anatomy',    title_ru: 'Анатомия Dockerfile',      title_en: 'Anatomy of a Dockerfile' },
    { id: 'layers',     title_ru: 'Слои и кэш',               title_en: 'Layers and cache' },
    { id: 'order',      title_ru: 'Порядок инструкций решает', title_en: 'Instruction order decides everything' },
    { id: 'multistage', title_ru: 'Multi-stage build',        title_en: 'Multi-stage build' },
    { id: 'mistakes',   title_ru: 'Частые ошибки',            title_en: 'Common mistakes' },
    { id: 'key-terms',  title_ru: 'Ключевые термины',         title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Dockerfile — это рецепт образа: пошаговая инструкция, как из базового образа получить твоё приложение. Написать работающий Dockerfile легко. Написать такой, который собирается за 8 секунд вместо 4 минут и весит 90 МБ вместо 1.2 ГБ, — это уже навык.',
    intro_en:
      'A Dockerfile is a recipe for an image: a step-by-step instruction turning a base image into your application. Writing a working Dockerfile is easy. Writing one that builds in 8 seconds instead of 4 minutes and weighs 90 MB instead of 1.2 GB is a skill.',

    blocks: [
      {
        sectionId: 'anatomy',
        heading_ru: 'Анатомия Dockerfile',
        heading_en: 'Anatomy of a Dockerfile',
        text_ru:
          'Инструкций много, но в 95% случаев хватает семи:\n\n• FROM — от какого базового образа отталкиваемся\n• WORKDIR — рабочая директория внутри образа\n• COPY — скопировать файлы из проекта в образ\n• RUN — выполнить команду во время сборки\n• ENV — переменная окружения\n• EXPOSE — документирует, какой порт слушает приложение\n• CMD — что запускать при старте контейнера\n\nРазница между RUN и CMD принципиальна: RUN выполняется один раз при сборке образа, CMD — каждый раз при запуске контейнера.',
        text_en:
          'There are many instructions, but seven cover 95% of cases:\n\n• FROM — the base image to start from\n• WORKDIR — the working directory inside the image\n• COPY — copy files from the project into the image\n• RUN — execute a command during the build\n• ENV — an environment variable\n• EXPOSE — documents which port the app listens on\n• CMD — what to run when the container starts\n\nThe difference between RUN and CMD is fundamental: RUN executes once while building the image, CMD executes every time a container starts.',
        code: 'FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --omit=dev\nCOPY . .\nENV NODE_ENV=production\nEXPOSE 3000\nCMD ["node", "server.js"]',
        codeLang: 'dockerfile',
        codeCaption: 'Dockerfile',
      },
      {
        sectionId: 'layers',
        heading_ru: 'Слои и кэш',
        heading_en: 'Layers and cache',
        text_ru:
          'Каждая инструкция создаёт слой — снимок изменений файловой системы. Образ является стопкой таких слоёв.\n\nПри повторной сборке Docker сверяет слои по порядку: если инструкция и её входные файлы не изменились, он берёт готовый слой из кэша вместо пересборки. Но есть жёсткое правило: как только один слой изменился, все следующие пересобираются заново, даже если сами по себе не менялись.\n\nИменно поэтому порядок инструкций влияет на скорость сборки в разы.',
        text_en:
          'Every instruction creates a layer — a snapshot of filesystem changes. An image is a stack of such layers.\n\nOn a rebuild Docker compares layers in order: if an instruction and its input files did not change, it takes the ready layer from cache instead of rebuilding. But there is a hard rule: once one layer changes, every following layer is rebuilt, even if it did not change itself.\n\nThat is exactly why instruction order changes build times by an order of magnitude.',
      },
      {
        sectionId: 'order',
        heading_ru: 'Порядок инструкций решает',
        heading_en: 'Instruction order decides everything',
        text_ru:
          'Сравни два варианта. Плохой:\n\n  COPY . .\n  RUN npm ci\n\nЛюбое изменение в любом файле проекта ломает кэш слоя COPY, а значит `npm ci` выполняется заново — минуты ожидания на каждую правку одной строчки.\n\nХороший:\n\n  COPY package*.json ./\n  RUN npm ci\n  COPY . .\n\nЗависимости ставятся из отдельного слоя, который меняется только когда меняется package.json. Правишь код — пересобирается лишь последний слой. Сборка занимает секунды.\n\nПравило: сначала копируй то, что меняется редко; в конце — то, что меняется постоянно.',
        text_en:
          'Compare two versions. The bad one:\n\n  COPY . .\n  RUN npm ci\n\nAny change to any project file invalidates the COPY layer, so `npm ci` re-runs — minutes of waiting for a one-line edit.\n\nThe good one:\n\n  COPY package*.json ./\n  RUN npm ci\n  COPY . .\n\nDependencies come from a separate layer that only changes when package.json changes. Edit the code and only the last layer rebuilds. The build takes seconds.\n\nThe rule: copy what rarely changes first, and what changes constantly last.',
        code: '# ❌ кэш ломается на каждой правке\nCOPY . .\nRUN npm ci\n\n# ✅ зависимости кэшируются отдельно\nCOPY package*.json ./\nRUN npm ci\nCOPY . .',
        codeLang: 'dockerfile',
      },
      {
        sectionId: 'multistage',
        heading_ru: 'Multi-stage build',
        heading_en: 'Multi-stage build',
        text_ru:
          'Для сборки фронтенда нужны Node, npm и 300 МБ node_modules. Для отдачи готовых файлов нужен только nginx и папка со статикой. Тащить инструменты сборки в прод бессмысленно и небезопасно.\n\nMulti-stage решает это: в одном Dockerfile описываются несколько стадий, а в финальный образ копируется только результат нужной. Всё остальное — компиляторы, кэши, исходники — остаётся в промежуточной стадии и в итоговый образ не попадает.\n\nТипичный выигрыш: 1.2 ГБ → 60 МБ. Плюс меньше поверхность атаки: в проде физически нет ни npm, ни исходников.',
        text_en:
          'Building a frontend needs Node, npm and 300 MB of node_modules. Serving the built files needs only nginx and a folder of static assets. Dragging build tooling into production is pointless and unsafe.\n\nMulti-stage solves this: one Dockerfile describes several stages, and only the result of the stage you need is copied into the final image. Everything else — compilers, caches, sources — stays in the intermediate stage.\n\nA typical win: 1.2 GB → 60 MB. Plus a smaller attack surface: neither npm nor the sources physically exist in production.',
        code: '# ── стадия сборки ──\nFROM node:20-alpine AS builder\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci\nCOPY . .\nRUN npm run build\n\n# ── финальный образ ──\nFROM nginx:1.27-alpine\nCOPY --from=builder /app/dist /usr/share/nginx/html\nEXPOSE 80\nCMD ["nginx", "-g", "daemon off;"]',
        codeLang: 'dockerfile',
        codeCaption: 'Dockerfile · multi-stage',
      },
      {
        sectionId: 'mistakes',
        heading_ru: 'Частые ошибки',
        heading_en: 'Common mistakes',
        text_ru:
          '• Копировать node_modules с хоста. Внутри другая архитектура и другая ОС — нативные модули сломаются. Спасает .dockerignore.\n• Класть секреты в ENV в Dockerfile. Всё, что попало в слой, остаётся в образе навсегда, даже если удалить это следующей инструкцией. Секреты передаются при запуске, а не при сборке.\n• Запускать процесс от root. Если приложение взломают, злоумышленник получит root внутри контейнера. Добавь USER.\n• Использовать полновесный образ вместо alpine или slim, когда тебе не нужны все системные пакеты.',
        text_en:
          '• Copying node_modules from the host. A different architecture and OS inside means native modules break. A .dockerignore file prevents it.\n• Putting secrets into ENV in the Dockerfile. Anything that lands in a layer stays in the image forever, even if the next instruction deletes it. Secrets are passed at run time, not at build time.\n• Running the process as root. If the app is compromised, the attacker gets root inside the container. Add USER.\n• Using a full-fat base image instead of alpine or slim when you do not need every system package.',
        code: 'node_modules\n.git\n.env\ndist\n*.log\nDockerfile',
        codeLang: 'ini',
        codeCaption: '.dockerignore',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Слой (layer)', term_en: 'Layer',
      definition_ru: 'Снимок изменений файловой системы, создаваемый одной инструкцией Dockerfile.',
      definition_en: 'A snapshot of filesystem changes produced by a single Dockerfile instruction.',
    },
    {
      term_ru: 'Кэш сборки', term_en: 'Build cache',
      definition_ru: 'Переиспользование готовых слоёв при повторной сборке. Ломается на первой изменившейся инструкции и на всех следующих.',
      definition_en: 'Reusing existing layers on a rebuild. It breaks at the first changed instruction and every one after it.',
    },
    {
      term_ru: 'Multi-stage build', term_en: 'Multi-stage build',
      definition_ru: 'Сборка в несколько стадий, из которых в финальный образ попадает только нужный результат.',
      definition_en: 'A build with several stages where only the needed result reaches the final image.',
    },
    {
      term_ru: '.dockerignore', term_en: '.dockerignore',
      definition_ru: 'Список путей, которые не отправляются в контекст сборки. Уменьшает образ и ускоряет сборку.',
      definition_en: 'A list of paths excluded from the build context. Shrinks the image and speeds up the build.',
    },
    {
      term_ru: 'RUN vs CMD', term_en: 'RUN vs CMD',
      definition_ru: 'RUN выполняется один раз при сборке образа, CMD — при каждом запуске контейнера.',
      definition_en: 'RUN runs once while building the image, CMD runs each time a container starts.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Alpine Linux весит около 5 МБ против ~120 МБ у обычного Debian-образа. Но у него другая libc (musl), из-за чего редкие нативные пакеты могут не собраться.',
      text_en: 'Alpine Linux weighs about 5 MB versus ~120 MB for a regular Debian image. But it uses a different libc (musl), so rare native packages may fail to build.',
    },
    {
      text_ru: 'Удалённый в следующем слое файл всё равно остаётся в образе — просто становится невидимым. Секрет, попавший в слой, извлекается командой `docker history`.',
      text_en: 'A file deleted in a later layer still lives in the image, just hidden. A secret that landed in a layer can be extracted with `docker history`.',
    },
    {
      text_ru: 'В CI кэш слоёв по умолчанию пуст: раннер каждый раз чистый. Поэтому пайплайны отдельно настраивают внешний кэш сборки.',
      text_en: 'In CI the layer cache is empty by default: the runner is fresh every time. That is why pipelines configure an external build cache explicitly.',
    },
  ],

  labs: [
    {
      id: 'lab-build-image',
      title_ru: 'Собери образ и разберись, почему он огромный',
      title_en: 'Build the image and find out why it is huge',
      brief_ru: 'Собери образ, посмотри его размер и историю слоёв, затем собери multi-stage версию и сравни. Симулятор отдаёт реалистичный вывод настоящего docker.',
      brief_en: 'Build the image, inspect its size and layer history, then build the multi-stage version and compare. The simulator returns realistic output from real docker.',
      task: {
        kind: 'terminal-simulator',
        prompt: 'student@codeschool:~/shop-web$',
        motd_ru: [
          '# В проекте два файла сборки: Dockerfile и Dockerfile.multi',
          '# Собери оба и сравни размеры образов.',
          '',
        ],
        motd_en: [
          '# The project has two build files: Dockerfile and Dockerfile.multi',
          '# Build both and compare the image sizes.',
          '',
        ],
        responses: [
          {
            match: 'ls',
            output: ['Dockerfile  Dockerfile.multi  package.json  src  vite.config.ts'],
          },
          {
            match: 'cat Dockerfile',
            output: [
              'FROM node:20',
              'WORKDIR /app',
              'COPY . .',
              'RUN npm ci',
              'RUN npm run build',
              'CMD ["npx", "serve", "dist"]',
            ],
          },
          {
            match: 'cat Dockerfile.multi',
            output: [
              'FROM node:20-alpine AS builder',
              'WORKDIR /app',
              'COPY package*.json ./',
              'RUN npm ci',
              'COPY . .',
              'RUN npm run build',
              '',
              'FROM nginx:1.27-alpine',
              'COPY --from=builder /app/dist /usr/share/nginx/html',
              'CMD ["nginx", "-g", "daemon off;"]',
            ],
          },
          {
            match: 'docker build -t shop-web:fat \\.',
            regex: true,
            delayMs: 1600,
            output: [
              '[+] Building 74.2s (9/9) FINISHED',
              ' => [1/5] FROM docker.io/library/node:20                    38.1s',
              ' => [2/5] WORKDIR /app                                       0.1s',
              ' => [3/5] COPY . .                                           0.4s',
              ' => [4/5] RUN npm ci                                        24.6s',
              ' => [5/5] RUN npm run build                                  9.8s',
              ' => exporting to image                                       1.2s',
              'Successfully tagged shop-web:fat',
            ],
            sets: ['built-fat'],
          },
          {
            match: 'docker build -f Dockerfile\\.multi -t shop-web:slim \\.',
            regex: true,
            delayMs: 1500,
            output: [
              '[+] Building 41.7s (12/12) FINISHED',
              ' => [builder 1/6] FROM docker.io/library/node:20-alpine      9.4s',
              ' => CACHED [builder 4/6] RUN npm ci                          0.0s',
              ' => [builder 6/6] RUN npm run build                          9.1s',
              ' => [stage-1 2/2] COPY --from=builder /app/dist ...          0.3s',
              'Successfully tagged shop-web:slim',
            ],
            sets: ['built-slim'],
          },
          {
            match: 'docker images',
            requires: 'built-fat',
            unless: ['REPOSITORY   TAG   IMAGE ID   CREATED   SIZE', '# пока ничего не собрано'],
            output: [
              'REPOSITORY   TAG    IMAGE ID       CREATED         SIZE',
              'shop-web     slim   c4f1a9b7e210   2 minutes ago   62.4MB',
              'shop-web     fat    8a3d2e5c1f04   3 minutes ago   1.24GB',
              'node         20     91b2c7d4e8a1   2 weeks ago     1.09GB',
              'nginx        1.27   3f8a1b2c9d76   3 weeks ago     48.2MB',
            ],
          },
          {
            match: 'docker history shop-web:fat',
            requires: 'built-fat',
            unless: ['Error: No such image: shop-web:fat'],
            output: [
              'IMAGE          CREATED         CREATED BY                        SIZE',
              '8a3d2e5c1f04   3 minutes ago   CMD ["npx" "serve" "dist"]        0B',
              '<missing>      3 minutes ago   RUN npm run build                 84.2MB',
              '<missing>      3 minutes ago   RUN npm ci                        312MB',
              '<missing>      3 minutes ago   COPY . .                          14.8MB',
              '<missing>      2 weeks ago     /bin/sh -c #(nop) ...             1.09GB',
              '# ← базовый образ node:20 и node_modules и есть основной вес',
            ],
          },
          {
            match: 'docker run -d -p 8080:80 shop-web:slim',
            requires: 'built-slim',
            unless: ['Unable to find image \'shop-web:slim\' locally'],
            delayMs: 600,
            output: ['e91f4a7c2b83d5619af0c8e2b7d41a6c', '# открыто на http://localhost:8080'],
          },
        ],
        goals: [
          { id: 'g1', description_ru: 'Прочитай оба Dockerfile и найди разницу', description_en: 'Read both Dockerfiles and spot the difference', pattern: '^cat Dockerfile\\.multi$' },
          { id: 'g2', description_ru: 'Собери «толстый» образ', description_en: 'Build the fat image', pattern: '^docker build -t shop-web:fat \\.$' },
          { id: 'g3', description_ru: 'Собери multi-stage образ', description_en: 'Build the multi-stage image', pattern: '^docker build -f Dockerfile\\.multi -t shop-web:slim \\.$' },
          { id: 'g4', description_ru: 'Сравни размеры образов', description_en: 'Compare the image sizes', pattern: '^docker images$' },
          { id: 'g5', description_ru: 'Найди по слоям, что весит больше всего', description_en: 'Find which layer weighs the most', pattern: '^docker history shop-web:fat$' },
        ],
        suggestions: [
          'ls',
          'cat Dockerfile',
          'cat Dockerfile.multi',
          'docker build -t shop-web:fat .',
          'docker build -f Dockerfile.multi -t shop-web:slim .',
          'docker images',
          'docker history shop-web:fat',
          'docker run -d -p 8080:80 shop-web:slim',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Почему `COPY package*.json ./` ставят до `COPY . .`?',
      text_en: 'Why does `COPY package*.json ./` come before `COPY . .`?',
      options_ru: [
        'Иначе npm не найдёт package.json',
        'Чтобы слой с установкой зависимостей брался из кэша, пока package.json не изменился',
        'Так требует синтаксис Dockerfile',
        'Это уменьшает количество слоёв',
      ],
      options_en: [
        'Otherwise npm cannot find package.json',
        'So the dependency layer comes from cache until package.json changes',
        'The Dockerfile syntax requires it',
        'It reduces the number of layers',
      ],
      correctIndex: 1,
      explanation_ru: 'Изменение любого файла проекта ломает кэш начиная с того слоя, где этот файл скопирован. Отделяя зависимости, ты защищаешь самый долгий шаг сборки.',
      explanation_en: 'Changing any project file invalidates the cache from the layer that copied it. Splitting out dependencies protects the slowest build step.',
    },
    {
      id: 'q2',
      text_ru: 'Что даёт multi-stage build?',
      text_en: 'What does a multi-stage build give you?',
      options_ru: [
        'Возможность собирать образ на нескольких машинах сразу',
        'В финальный образ попадает только результат сборки, без компиляторов, кэшей и исходников',
        'Автоматическое обновление базового образа',
        'Параллельный запуск контейнеров',
      ],
      options_en: [
        'The ability to build an image on several machines at once',
        'Only the build result reaches the final image — no compilers, caches or sources',
        'Automatic base image updates',
        'Running containers in parallel',
      ],
      correctIndex: 1,
      explanation_ru: 'Промежуточная стадия выбрасывается. В проде остаётся только то, что реально нужно для работы — обычно в 10–20 раз меньше.',
      explanation_en: 'The intermediate stage is discarded. Production keeps only what is actually needed to run — typically 10–20× smaller.',
    },
    {
      id: 'q3',
      text_ru: 'Секрет случайно попал в ENV в Dockerfile и был удалён следующей инструкцией. Он в безопасности?',
      text_en: 'A secret accidentally landed in an ENV in a Dockerfile and was removed by the next instruction. Is it safe?',
      options_ru: [
        'Да, удаление стирает его из образа',
        'Нет — слой остаётся в образе, и значение достаётся через docker history',
        'Да, если пересобрать образ с --no-cache',
        'Да, ENV не сохраняется в образе',
      ],
      options_en: [
        'Yes, deleting removes it from the image',
        'No — the layer stays in the image and the value can be read via docker history',
        'Yes, if you rebuild with --no-cache',
        'Yes, ENV is not stored in the image',
      ],
      correctIndex: 1,
      explanation_ru: 'Слои неизменяемы. Всё, что однажды туда попало, остаётся навсегда. Секреты передаются только при запуске контейнера.',
      explanation_en: 'Layers are immutable. Anything that once landed there stays forever. Secrets are only passed at container run time.',
    },
    {
      id: 'q4',
      text_ru: 'В чём разница между RUN и CMD?',
      text_en: 'What is the difference between RUN and CMD?',
      options_ru: [
        'Разницы нет, это синонимы',
        'RUN выполняется при сборке образа, CMD — при запуске контейнера',
        'RUN работает только с shell-командами, CMD — только с бинарниками',
        'CMD выполняется при сборке, RUN — при запуске',
      ],
      options_en: [
        'No difference, they are synonyms',
        'RUN executes at build time, CMD executes at container start',
        'RUN only works with shell commands, CMD only with binaries',
        'CMD executes at build time, RUN at start',
      ],
      correctIndex: 1,
      explanation_ru: 'RUN формирует слой образа один раз. CMD — это команда по умолчанию, которую Docker выполняет каждый раз при `docker run`.',
      explanation_en: 'RUN produces an image layer once. CMD is the default command Docker executes on every `docker run`.',
    },
  ],
}
