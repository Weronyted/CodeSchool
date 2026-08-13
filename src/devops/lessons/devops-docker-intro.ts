import type { DevOpsLesson } from '@/types/devops'

export const devopsDockerIntro: DevOpsLesson = {
  slug: 'devops-docker-intro',
  moduleId: 'containers',
  order: 1,
  icon: '🐳',
  readTime: 12,

  title_ru: 'Docker: зачем контейнеры',
  title_en: 'Docker: Why Containers',
  description_ru: 'Образ, контейнер, реестр — и чем это отличается от виртуальной машины.',
  description_en: 'Image, container, registry — and how it differs from a virtual machine.',

  sections: [
    { id: 'problem',   title_ru: '«У меня работает»',              title_en: '"Works on my machine"' },
    { id: 'image',     title_ru: 'Образ и контейнер',              title_en: 'Image and container' },
    { id: 'vs-vm',     title_ru: 'Чем это отличается от ВМ',       title_en: 'How this differs from a VM' },
    { id: 'lifecycle', title_ru: 'Жизненный цикл контейнера',      title_en: 'The container lifecycle' },
    { id: 'registry',  title_ru: 'Реестр образов',                 title_en: 'The image registry' },
    { id: 'key-terms', title_ru: 'Ключевые термины',               title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Контейнер — это способ упаковать приложение вместе со всем, что ему нужно для работы: рантаймом, библиотеками, системными пакетами и настройками. Один и тот же образ запускается на твоём ноутбуке, на сервере коллеги и в проде абсолютно одинаково.',
    intro_en:
      'A container is a way to package an application together with everything it needs to run: the runtime, the libraries, the system packages and the configuration. The exact same image runs on your laptop, on a colleague\'s server and in production — identically.',

    blocks: [
      {
        sectionId: 'problem',
        heading_ru: '«У меня работает»',
        heading_en: '"Works on my machine"',
        text_ru:
          'Классическая история: локально всё запускается, на сервере — нет. Причин обычно три: другая версия Node, отсутствующий системный пакет, другая переменная окружения.\n\nМожно написать инструкцию «установи вот это, потом вот это». Но инструкция устареет, а человек ошибётся. Контейнер решает проблему иначе: он фиксирует всё окружение целиком, а не описывает его словами.\n\nЕсли образ собрался и запустился у тебя — он запустится где угодно, где есть Docker. Это и есть та гарантия, ради которой всё затевалось.',
        text_en:
          'The classic story: everything runs locally but not on the server. There are usually three reasons: a different Node version, a missing system package, a different environment variable.\n\nYou could write instructions — "install this, then that". But instructions go stale and people make mistakes. A container solves it differently: it freezes the entire environment instead of describing it in words.\n\nIf the image builds and runs for you, it runs anywhere Docker exists. That guarantee is the whole point.',
      },
      {
        sectionId: 'image',
        heading_ru: 'Образ и контейнер',
        heading_en: 'Image and container',
        text_ru:
          'Это два разных понятия, и путать их — источник половины недоразумений.\n\nОбраз (image) — неизменяемый шаблон: файловая система плюс инструкция, что запускать. Как класс в программировании или как установочный образ системы.\n\nКонтейнер (container) — запущенный экземпляр образа. Как объект класса. Из одного образа можно поднять двадцать контейнеров — они не будут мешать друг другу.\n\nВажное следствие: контейнер эфемерен. Всё, что он записал внутрь себя, исчезнет при удалении. Данные, которые должны пережить контейнер, выносят в тома (volumes).',
        text_en:
          'These are two different things, and confusing them causes half of all misunderstandings.\n\nAn image is an immutable template: a filesystem plus instructions on what to run. Like a class in programming, or an OS installation image.\n\nA container is a running instance of an image. Like an object of that class. One image can back twenty containers that never get in each other\'s way.\n\nAn important consequence: a container is ephemeral. Everything it writes inside itself disappears when it is removed. Data that must outlive the container goes into volumes.',
        code: 'docker pull nginx:1.27        # скачать образ\ndocker run -d -p 8080:80 nginx:1.27   # поднять контейнер\ndocker ps                     # что сейчас работает\ndocker stop <id>              # остановить',
        codeLang: 'bash',
      },
      {
        sectionId: 'vs-vm',
        heading_ru: 'Чем это отличается от ВМ',
        heading_en: 'How this differs from a VM',
        text_ru:
          'Виртуальная машина эмулирует железо и запускает внутри полноценную операционную систему со своим ядром. Отсюда её вес: гигабайты диска и десятки секунд на старт.\n\nКонтейнер использует ядро хоста и изолируется средствами самого Linux (namespaces и cgroups). Внутри — только файлы приложения и его зависимости. Отсюда мегабайты вместо гигабайт и старт за доли секунды.\n\nПрактический вывод: на одном сервере спокойно живут десятки контейнеров, а виртуалок — единицы. Но и изоляция у контейнера слабее: ядро-то общее.',
        text_en:
          'A virtual machine emulates hardware and runs a full operating system with its own kernel inside. Hence its weight: gigabytes of disk and tens of seconds to boot.\n\nA container uses the host kernel and is isolated by Linux itself (namespaces and cgroups). Inside there are only the application files and its dependencies. Hence megabytes instead of gigabytes and a start-up in a fraction of a second.\n\nThe practical takeaway: one server happily hosts dozens of containers but only a handful of VMs. The flip side is weaker isolation — the kernel is shared.',
      },
      {
        sectionId: 'lifecycle',
        heading_ru: 'Жизненный цикл контейнера',
        heading_en: 'The container lifecycle',
        text_ru:
          'Контейнер живёт ровно столько, сколько живёт его главный процесс. Завершился процесс — контейнер перешёл в состояние exited. Это самая частая причина недоумения: «запустил, а он сразу умер» обычно значит, что процесс внутри отработал и вышел.\n\nСостояния, которые ты увидишь: created → running → stopping → exited. А при падении — crashed, и если задана политика `restart: always`, Docker сам переведёт его в restarting и поднимет снова.\n\nОтдельно про stop и kill: `docker stop` отправляет SIGTERM и ждёт 10 секунд, давая приложению закрыть соединения. `docker kill` шлёт SIGKILL сразу.',
        text_en:
          'A container lives exactly as long as its main process. When the process exits, the container becomes exited. This is the most common source of confusion: "I started it and it died instantly" usually means the process inside finished and returned.\n\nThe states you will see: created → running → stopping → exited. On a failure — crashed, and if `restart: always` is configured, Docker moves it to restarting and brings it back.\n\nOn stop versus kill: `docker stop` sends SIGTERM and waits 10 seconds so the app can close its connections. `docker kill` sends SIGKILL immediately.',
      },
      {
        sectionId: 'registry',
        heading_ru: 'Реестр образов',
        heading_en: 'The image registry',
        text_ru:
          'Реестр — это «GitHub для образов». Docker Hub, GitHub Container Registry, реестр облачного провайдера. Пайплайн собирает образ, пушит его в реестр, а сервер оттуда забирает — так собранное один раз доезжает до прода без пересборки.\n\nПро теги: `nginx:latest` — ловушка. Сегодня это одна версия, завтра другая, и воспроизвести вчерашний деплой уже нельзя. В проде всегда указывай конкретный тег, а лучше — дайджест образа.',
        text_en:
          'A registry is "GitHub for images": Docker Hub, GitHub Container Registry, your cloud provider\'s registry. The pipeline builds an image, pushes it to the registry, and the server pulls it from there — so what was built once reaches production without a rebuild.\n\nOn tags: `nginx:latest` is a trap. Today it is one version, tomorrow another, and yesterday\'s deployment can no longer be reproduced. In production always pin a concrete tag, ideally the image digest.',
        code: 'docker build -t ghcr.io/codeschool/shop-api:1.4.0 .\ndocker push ghcr.io/codeschool/shop-api:1.4.0\n\n# на сервере\ndocker pull ghcr.io/codeschool/shop-api:1.4.0',
        codeLang: 'bash',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Образ (image)', term_en: 'Image',
      definition_ru: 'Неизменяемый шаблон: файловая система приложения плюс команда запуска.',
      definition_en: 'An immutable template: the application filesystem plus the start command.',
    },
    {
      term_ru: 'Контейнер (container)', term_en: 'Container',
      definition_ru: 'Запущенный экземпляр образа, изолированный процесс со своей файловой системой и сетью.',
      definition_en: 'A running instance of an image — an isolated process with its own filesystem and network.',
    },
    {
      term_ru: 'Том (volume)', term_en: 'Volume',
      definition_ru: 'Хранилище, живущее отдельно от контейнера. Единственный способ сохранить данные после его удаления.',
      definition_en: 'Storage that lives outside the container. The only way to keep data after it is removed.',
    },
    {
      term_ru: 'Реестр (registry)', term_en: 'Registry',
      definition_ru: 'Хранилище образов, откуда их скачивают серверы и CI.',
      definition_en: 'The image store that servers and CI pull from.',
      example_ru: 'ghcr.io, Docker Hub', example_en: 'ghcr.io, Docker Hub',
    },
    {
      term_ru: 'Политика перезапуска', term_en: 'Restart policy',
      definition_ru: 'Правило, по которому Docker сам поднимает упавший контейнер: no, on-failure или always.',
      definition_en: 'The rule by which Docker brings a failed container back: no, on-failure or always.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Docker не изобрёл контейнеры — механизмы изоляции в Linux существовали годами. Docker сделал их удобными: один файл, одна команда.',
      text_en: 'Docker did not invent containers — Linux isolation primitives existed for years. Docker made them usable: one file, one command.',
    },
    {
      text_ru: '`docker run` без `-d` держит контейнер на переднем плане: закроешь терминал — контейнер остановится вместе с ним.',
      text_en: '`docker run` without `-d` keeps the container in the foreground: close the terminal and the container stops with it.',
    },
    {
      text_ru: 'Строка `-p 8080:80` читается «порт 8080 на хосте → порт 80 внутри контейнера». Перепутанный порядок — самая частая ошибка новичка.',
      text_en: '`-p 8080:80` reads as "host port 8080 → container port 80". Swapping the order is the most common beginner mistake.',
    },
  ],

  labs: [
    {
      id: 'lab-container-lifecycle',
      title_ru: 'Что происходит при docker run и docker stop',
      title_en: 'What happens on docker run and docker stop',
      brief_ru: 'Нажимай команды и смотри, как контейнеры проходят состояния. Задача: запустить веб-сервер, уронить его, увидеть автоматический перезапуск и корректно остановить.',
      brief_en: 'Click the commands and watch containers move through their states. Mission: start the web server, crash it, see the automatic restart and stop it gracefully.',
      task: {
        kind: 'container-visualizer',
        initial: [
          { id: 'web',    name: 'shop-web',   image: 'nginx:1.27',           state: 'absent', ports: '8080→80', restartPolicy: 'always' },
          { id: 'api',    name: 'shop-api',   image: 'shop-api:1.4.0',       state: 'absent', ports: '3000→3000', restartPolicy: 'on-failure' },
          { id: 'worker', name: 'shop-worker', image: 'shop-worker:1.4.0',   state: 'absent', restartPolicy: 'no' },
        ],
        actions: [
          {
            id: 'run-web',
            command: 'docker run -d -p 8080:80 nginx:1.27',
            label_ru: 'Поднять веб-сервер',
            label_en: 'Start the web server',
            narration_ru: '# контейнер создан из образа и переведён в running — процесс nginx стал его главным процессом',
            narration_en: '# the container was created from the image and moved to running — the nginx process became its main process',
            effects: [
              { at: 0,   containerId: 'web', state: 'creating', note_ru: 'создаю контейнер из образа nginx:1.27', note_en: 'creating container from nginx:1.27' },
              { at: 700, containerId: 'web', state: 'running',  note_ru: 'shop-web работает, порт 8080 проброшен', note_en: 'shop-web is running, port 8080 published' },
            ],
          },
          {
            id: 'run-api',
            command: 'docker run -d -p 3000:3000 shop-api:1.4.0',
            label_ru: 'Поднять API',
            label_en: 'Start the API',
            narration_ru: '# второй контейнер из другого образа — они не мешают друг другу',
            narration_en: '# a second container from a different image — they do not interfere with each other',
            effects: [
              { at: 0,   containerId: 'api', state: 'creating' },
              { at: 700, containerId: 'api', state: 'running', note_ru: 'shop-api слушает 3000', note_en: 'shop-api is listening on 3000' },
            ],
          },
          {
            id: 'crash-api',
            command: 'docker exec shop-api kill 1',
            label_ru: 'Уронить главный процесс API',
            label_en: 'Crash the API main process',
            narration_ru: '# главный процесс умер → контейнер упал. Политика on-failure подняла его заново',
            narration_en: '# the main process died → the container failed. The on-failure policy brought it back',
            effects: [
              { at: 0,    containerId: 'api', state: 'crashed',    note_ru: 'shop-api exited with code 137', note_en: 'shop-api exited with code 137' },
              { at: 900,  containerId: 'api', state: 'restarting', note_ru: 'restart policy on-failure: пробую снова', note_en: 'restart policy on-failure: retrying' },
              { at: 1900, containerId: 'api', state: 'running',    note_ru: 'shop-api снова работает', note_en: 'shop-api is running again' },
            ],
          },
          {
            id: 'run-worker',
            command: 'docker run -d shop-worker:1.4.0',
            label_ru: 'Запустить воркер (он отработает и выйдет)',
            label_en: 'Start the worker (it finishes and exits)',
            narration_ru: '# задача выполнена, процесс завершился — контейнер перешёл в exited. Это не ошибка, а нормальное поведение',
            narration_en: '# the job finished, the process returned — the container went to exited. Not an error, just normal behaviour',
            effects: [
              { at: 0,    containerId: 'worker', state: 'creating' },
              { at: 600,  containerId: 'worker', state: 'running', note_ru: 'обрабатываю очередь…', note_en: 'processing the queue…' },
              { at: 2000, containerId: 'worker', state: 'exited',  note_ru: 'worker exited with code 0 — restart policy no, поднимать не буду', note_en: 'worker exited with code 0 — restart policy no, not restarting' },
            ],
          },
          {
            id: 'stop-web',
            command: 'docker stop shop-web',
            label_ru: 'Корректно остановить веб-сервер',
            label_en: 'Stop the web server gracefully',
            narration_ru: '# SIGTERM → приложение закрыло соединения → exited. Политика always не срабатывает при ручной остановке',
            narration_en: '# SIGTERM → the app closed its connections → exited. The always policy does not fire on a manual stop',
            effects: [
              { at: 0,    containerId: 'web', state: 'stopping', note_ru: 'отправляю SIGTERM, жду до 10 секунд', note_en: 'sending SIGTERM, waiting up to 10 seconds' },
              { at: 1400, containerId: 'web', state: 'exited',   note_ru: 'shop-web остановлен корректно', note_en: 'shop-web stopped gracefully' },
            ],
          },
        ],
        quest: {
          goal_ru: 'Пройди полный цикл: подними веб-сервер и API, урони API и посмотри на автоматический перезапуск, запусти воркер и корректно останови веб-сервер.',
          goal_en: 'Walk the full loop: start the web server and the API, crash the API and watch the automatic restart, run the worker, then stop the web server gracefully.',
          requiredActionIds: ['run-web', 'run-api', 'crash-api', 'run-worker', 'stop-web'],
          ordered: false,
        },
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Контейнер запустился и сразу перешёл в exited с кодом 0. Что это значит?',
      text_en: 'A container started and immediately went to exited with code 0. What does that mean?',
      options_ru: [
        'Образ повреждён',
        'Главный процесс внутри отработал и завершился — для Docker это конец жизни контейнера',
        'Не хватило памяти',
        'Порт занят другим контейнером',
      ],
      options_en: [
        'The image is corrupted',
        'The main process inside finished and returned — for Docker that is the end of the container\'s life',
        'It ran out of memory',
        'The port is taken by another container',
      ],
      correctIndex: 1,
      explanation_ru: 'Код 0 означает успешное завершение. Контейнер живёт ровно столько, сколько живёт его главный процесс.',
      explanation_en: 'Exit code 0 means success. A container lives exactly as long as its main process.',
    },
    {
      id: 'q2',
      text_ru: 'Чем контейнер принципиально отличается от виртуальной машины?',
      text_en: 'What is the fundamental difference between a container and a virtual machine?',
      options_ru: [
        'Контейнер использует ядро хоста, а ВМ запускает собственную ОС со своим ядром',
        'Контейнер работает только на Linux, а ВМ — везде',
        'В контейнере нельзя запустить базу данных',
        'Контейнеры не изолированы вообще',
      ],
      options_en: [
        'A container uses the host kernel, while a VM boots its own OS with its own kernel',
        'Containers only work on Linux, VMs work everywhere',
        'You cannot run a database in a container',
        'Containers are not isolated at all',
      ],
      correctIndex: 0,
      explanation_ru: 'Именно общее ядро даёт контейнеру мегабайтный размер и мгновенный старт — и одновременно более слабую изоляцию, чем у ВМ.',
      explanation_en: 'The shared kernel is exactly what makes a container megabytes in size and instant to start — and also less isolated than a VM.',
    },
    {
      id: 'q3',
      text_ru: 'Почему `image:latest` — плохой выбор для продакшена?',
      text_en: 'Why is `image:latest` a bad choice for production?',
      options_ru: [
        'Latest всегда медленнее скачивается',
        'Тег latest со временем указывает на другой образ, поэтому вчерашний деплой невозможно воспроизвести',
        'Latest не работает без интернета',
        'Latest доступен только по подписке',
      ],
      options_en: [
        'latest always downloads slower',
        'The latest tag points at a different image over time, so yesterday\'s deployment cannot be reproduced',
        'latest does not work offline',
        'latest requires a subscription',
      ],
      correctIndex: 1,
      explanation_ru: 'Воспроизводимость — главное требование к деплою. Конкретный тег или дайджест гарантирует, что через месяц поднимется ровно та же версия.',
      explanation_en: 'Reproducibility is the core requirement of a deployment. A pinned tag or digest guarantees the same version comes up a month later.',
    },
    {
      id: 'q4',
      text_ru: 'Где нужно хранить данные базы, работающей в контейнере?',
      text_en: 'Where should the data of a database running in a container live?',
      options_ru: [
        'Внутри контейнера — так быстрее',
        'В томе (volume), который существует независимо от контейнера',
        'В образе, чтобы данные ехали вместе с ним',
        'В переменных окружения',
      ],
      options_en: [
        'Inside the container — it is faster',
        'In a volume that exists independently of the container',
        'In the image, so the data travels with it',
        'In environment variables',
      ],
      correctIndex: 1,
      explanation_ru: 'Файловая система контейнера исчезает вместе с ним. Всё, что должно пережить пересоздание, выносится в том.',
      explanation_en: 'A container\'s filesystem disappears with it. Anything that must survive a re-create goes into a volume.',
    },
  ],
}
