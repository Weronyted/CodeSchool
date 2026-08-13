import type { DevOpsLesson } from '@/types/devops'

export const devopsCompose: DevOpsLesson = {
  slug: 'devops-compose',
  moduleId: 'containers',
  order: 3,
  icon: '🧩',
  readTime: 14,

  title_ru: 'Docker Compose',
  title_en: 'Docker Compose',
  description_ru: 'Несколько сервисов, сети, тома и зависимости в одном YAML-файле.',
  description_en: 'Several services, networks, volumes and dependencies in one YAML file.',

  sections: [
    { id: 'why',       title_ru: 'Зачем нужен Compose',        title_en: 'Why Compose exists' },
    { id: 'file',      title_ru: 'Структура compose-файла',    title_en: 'Structure of a compose file' },
    { id: 'network',   title_ru: 'Сеть между сервисами',       title_en: 'The network between services' },
    { id: 'depends',   title_ru: 'Зависимости и healthcheck',  title_en: 'Dependencies and healthchecks' },
    { id: 'volumes',   title_ru: 'Тома и данные',              title_en: 'Volumes and data' },
    { id: 'key-terms', title_ru: 'Ключевые термины',           title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Настоящее приложение — это редко один контейнер. Обычно их минимум три: API, база данных и что-нибудь вроде Redis. Поднимать их по одному длинными командами с флагами невозможно. Compose описывает всю систему в одном файле и поднимает её одной командой.',
    intro_en:
      'A real application is rarely a single container. Usually there are at least three: the API, the database and something like Redis. Starting them one by one with long flag-laden commands is not viable. Compose describes the whole system in one file and starts it with one command.',

    blocks: [
      {
        sectionId: 'why',
        heading_ru: 'Зачем нужен Compose',
        heading_en: 'Why Compose exists',
        text_ru:
          'Сравни. Без Compose — три команды по 200 символов, которые нужно выполнить в правильном порядке, с правильными именами сетей и правильными переменными. Ошибся во флаге — ищи опечатку глазами.\n\nС Compose — один файл `compose.yaml` в репозитории и команда `docker compose up`. Новый разработчик клонирует проект и через минуту у него работает вся система, включая базу с нужной версией.\n\nЭто и есть «инфраструктура как код»: конфигурация лежит в git, ревьюится в pull request и меняется вместе с приложением.',
        text_en:
          'Compare. Without Compose — three 200-character commands that must run in the right order with the right network names and the right variables. Mistype a flag and you hunt for it by eye.\n\nWith Compose — one `compose.yaml` in the repository and `docker compose up`. A new developer clones the project and a minute later the whole system runs, including the database at the right version.\n\nThis is infrastructure as code: the configuration lives in git, gets reviewed in a pull request and changes together with the application.',
      },
      {
        sectionId: 'file',
        heading_ru: 'Структура compose-файла',
        heading_en: 'Structure of a compose file',
        text_ru:
          'Файл описывает три вещи: сервисы (контейнеры), тома (постоянные данные) и сети (кто с кем общается).\n\nУ каждого сервиса указывают либо готовый образ (`image`), либо путь к Dockerfile (`build`). Дальше — порты, переменные окружения, тома и зависимости.\n\nОбрати внимание на `${DB_PASSWORD}`: Compose подставляет значения из файла `.env`, который лежит рядом и не коммитится. Пароли в compose.yaml писать нельзя — файл едет в git.',
        text_en:
          'The file describes three things: services (containers), volumes (persistent data) and networks (who talks to whom).\n\nEach service points either at a ready image (`image`) or at a Dockerfile (`build`). Then come ports, environment variables, volumes and dependencies.\n\nNote `${DB_PASSWORD}`: Compose substitutes values from the neighbouring `.env` file, which is not committed. Passwords must never be written into compose.yaml — that file goes into git.',
        code: 'services:\n  api:\n    build: .\n    ports:\n      - "3000:3000"\n    environment:\n      DATABASE_URL: postgres://app:${DB_PASSWORD}@db:5432/shop\n    depends_on:\n      db:\n        condition: service_healthy\n\n  db:\n    image: postgres:16-alpine\n    environment:\n      POSTGRES_PASSWORD: ${DB_PASSWORD}\n    volumes:\n      - pgdata:/var/lib/postgresql/data\n    healthcheck:\n      test: ["CMD-SHELL", "pg_isready -U app"]\n      interval: 5s\n      retries: 5\n\nvolumes:\n  pgdata:',
        codeLang: 'yaml',
        codeCaption: 'compose.yaml',
      },
      {
        sectionId: 'network',
        heading_ru: 'Сеть между сервисами',
        heading_en: 'The network between services',
        text_ru:
          'Compose создаёт общую сеть и поднимает в ней внутренний DNS. Благодаря этому сервисы обращаются друг к другу по имени: API подключается к базе по адресу `db:5432`, а не по IP, который меняется при каждом перезапуске.\n\nКлючевой момент, на котором спотыкаются все: `localhost` внутри контейнера — это сам контейнер, а не хост и не соседний сервис. Строка `postgres://localhost:5432` внутри контейнера API означает «база внутри контейнера API» — её там нет.\n\nИ второе: `ports` нужен только чтобы открыть сервис наружу, на твой ноутбук. Внутри сети контейнеры видят все порты друг друга без всякой публикации. Базе `ports` в проде обычно вообще не нужен — так её не достанут из интернета.',
        text_en:
          'Compose creates a shared network with an internal DNS. Thanks to that, services address each other by name: the API connects to the database at `db:5432` rather than an IP that changes on every restart.\n\nThe thing everybody trips over: `localhost` inside a container is that container itself, not the host and not a neighbouring service. `postgres://localhost:5432` inside the API container means "a database inside the API container" — there is none.\n\nSecond: `ports` is only needed to expose a service outward, to your laptop. Inside the network containers already see each other\'s ports without publishing anything. In production a database usually needs no `ports` at all — that way it cannot be reached from the internet.',
      },
      {
        sectionId: 'depends',
        heading_ru: 'Зависимости и healthcheck',
        heading_en: 'Dependencies and healthchecks',
        text_ru:
          'Наивное `depends_on: [db]` означает всего лишь «запусти db раньше api». Но «запущен» и «готов принимать соединения» — разные вещи: Postgres стартует несколько секунд, и всё это время API получает ECONNREFUSED и падает.\n\nПоэтому нужен healthcheck: команда, которой Docker регулярно проверяет, живой ли сервис на самом деле. Тогда `condition: service_healthy` заставит API дождаться готовности базы, а не просто её запуска.\n\nЭто ровно та же логика, что и в CI-пайплайне: нельзя деплоить сервис раньше, чем готова его зависимость. Дальше в курсе ты будешь собирать такие зависимости руками.',
        text_en:
          'A naive `depends_on: [db]` only means "start db before api". But "started" and "ready to accept connections" are different things: Postgres takes a few seconds to boot, and during that time the API gets ECONNREFUSED and dies.\n\nHence healthchecks: a command Docker runs regularly to check whether the service is actually alive. Then `condition: service_healthy` makes the API wait for readiness, not just for startup.\n\nThis is exactly the logic of a CI pipeline: you cannot deploy a service before its dependency is ready. Later in the course you will wire such dependencies by hand.',
      },
      {
        sectionId: 'volumes',
        heading_ru: 'Тома и данные',
        heading_en: 'Volumes and data',
        text_ru:
          'Два типа монтирования, и путать их дорого.\n\nИменованный том (`pgdata:/var/lib/postgresql/data`) — Docker хранит данные у себя, они переживают удаление контейнера. Так хранят базы.\n\nBind mount (`./src:/app/src`) — папка с твоего диска подключается внутрь. Так делают в разработке, чтобы изменения в коде подхватывались без пересборки образа.\n\nИ главное предупреждение курса: `docker compose down -v` удаляет тома вместе с данными. Без `-v` — только контейнеры. Одна буква отделяет перезапуск от потери базы.',
        text_en:
          'Two kinds of mount, and confusing them is expensive.\n\nA named volume (`pgdata:/var/lib/postgresql/data`) — Docker stores the data itself and it survives container removal. This is how databases are stored.\n\nA bind mount (`./src:/app/src`) — a folder from your disk is attached inside. This is used in development so code changes are picked up without rebuilding the image.\n\nAnd the main warning of this course: `docker compose down -v` deletes volumes along with the data. Without `-v` it only removes containers. One letter separates a restart from losing the database.',
        code: 'docker compose up -d          # поднять всё в фоне\ndocker compose ps             # что работает\ndocker compose logs -f api    # логи одного сервиса\ndocker compose down           # остановить (тома целы)\ndocker compose down -v        # ⚠ остановить и стереть данные',
        codeLang: 'bash',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Сервис (service)', term_en: 'Service',
      definition_ru: 'Описание одного контейнера в compose-файле: из какого образа, с какими портами и переменными.',
      definition_en: 'The description of one container in a compose file: which image, which ports and variables.',
    },
    {
      term_ru: 'Внутренний DNS', term_en: 'Internal DNS',
      definition_ru: 'Механизм, позволяющий контейнерам находить друг друга по имени сервиса вместо IP.',
      definition_en: 'The mechanism letting containers find each other by service name instead of IP.',
      example_ru: 'postgres://app@db:5432/shop', example_en: 'postgres://app@db:5432/shop',
    },
    {
      term_ru: 'healthcheck', term_en: 'healthcheck',
      definition_ru: 'Команда проверки, действительно ли сервис готов работать, а не просто запущен.',
      definition_en: 'A probe command checking whether a service is genuinely ready, not merely started.',
    },
    {
      term_ru: 'Именованный том', term_en: 'Named volume',
      definition_ru: 'Хранилище под управлением Docker, переживающее пересоздание контейнера.',
      definition_en: 'Docker-managed storage that survives re-creating the container.',
    },
    {
      term_ru: 'Bind mount', term_en: 'Bind mount',
      definition_ru: 'Подключение папки с хоста внутрь контейнера. Используется в разработке для живой правки кода.',
      definition_en: 'Attaching a host folder inside the container. Used in development for live code editing.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Раньше это была отдельная программа `docker-compose` на Python. Теперь Compose встроен в Docker и вызывается как `docker compose` — без дефиса.',
      text_en: 'It used to be a separate Python program called `docker-compose`. Now Compose is built into Docker and invoked as `docker compose` — no hyphen.',
    },
    {
      text_ru: 'Compose добавляет имя проекта к именам контейнеров: сервис `db` в папке `shop` станет `shop-db-1`. Поэтому две копии проекта в разных папках не конфликтуют.',
      text_en: 'Compose prefixes container names with the project name: service `db` in folder `shop` becomes `shop-db-1`. That is why two copies of a project in different folders do not clash.',
    },
    {
      text_ru: 'Compose отлично подходит для разработки и небольшого прода на одном сервере. Для десятков машин используют Kubernetes — но принципы те же.',
      text_en: 'Compose is great for development and modest production on a single server. Dozens of machines call for Kubernetes — but the principles are the same.',
    },
  ],

  labs: [
    {
      id: 'lab-compose-up',
      title_ru: 'Подними стек и посмотри, что ломается без healthcheck',
      title_en: 'Bring the stack up and see what breaks without a healthcheck',
      brief_ru: 'Три сервиса: API, база и кэш. Запусти их в разном порядке и увидь своими глазами, почему API падает, если стартовать его раньше готовности базы.',
      brief_en: 'Three services: API, database and cache. Start them in different orders and watch why the API dies when it starts before the database is ready.',
      task: {
        kind: 'container-visualizer',
        initial: [
          { id: 'db',    name: 'shop-db-1',    image: 'postgres:16-alpine', state: 'absent', ports: 'внутр. 5432', restartPolicy: 'always' },
          { id: 'cache', name: 'shop-cache-1', image: 'redis:7-alpine',     state: 'absent', ports: 'внутр. 6379', restartPolicy: 'always' },
          { id: 'api',   name: 'shop-api-1',   image: 'shop-api:1.4.0',     state: 'absent', ports: '3000→3000',   restartPolicy: 'on-failure' },
        ],
        actions: [
          {
            id: 'api-first',
            command: 'docker compose up -d api',
            label_ru: 'Запустить только API (без базы)',
            label_en: 'Start only the API (no database)',
            narration_ru: '# API поднялся, не нашёл db:5432 и упал. Политика on-failure крутит его по кругу — это классический CrashLoopBackOff',
            narration_en: '# the API came up, could not find db:5432 and died. The on-failure policy loops it — the classic CrashLoopBackOff',
            effects: [
              { at: 0,    containerId: 'api', state: 'creating' },
              { at: 600,  containerId: 'api', state: 'running',    note_ru: 'shop-api-1 стартует…', note_en: 'shop-api-1 starting…' },
              { at: 1500, containerId: 'api', state: 'crashed',    note_ru: 'ERROR connect ECONNREFUSED db:5432 — базы нет', note_en: 'ERROR connect ECONNREFUSED db:5432 — no database' },
              { at: 2400, containerId: 'api', state: 'restarting', note_ru: 'restart on-failure: попытка 2…', note_en: 'restart on-failure: attempt 2…' },
              { at: 3300, containerId: 'api', state: 'crashed',    note_ru: 'снова ECONNREFUSED — перезапуск не лечит отсутствие зависимости', note_en: 'ECONNREFUSED again — restarting does not fix a missing dependency' },
            ],
          },
          {
            id: 'db-up',
            command: 'docker compose up -d db',
            label_ru: 'Поднять базу данных',
            label_en: 'Start the database',
            narration_ru: '# healthcheck pg_isready прошёл — только теперь база действительно готова принимать соединения',
            narration_en: '# the pg_isready healthcheck passed — only now is the database genuinely accepting connections',
            effects: [
              { at: 0,    containerId: 'db', state: 'creating' },
              { at: 700,  containerId: 'db', state: 'running', note_ru: 'postgres запускается, healthcheck: starting', note_en: 'postgres booting, healthcheck: starting' },
              { at: 2200, containerId: 'db', state: 'running', note_ru: 'healthcheck: healthy — том pgdata подключен', note_en: 'healthcheck: healthy — volume pgdata attached' },
            ],
          },
          {
            id: 'cache-up',
            command: 'docker compose up -d cache',
            label_ru: 'Поднять Redis',
            label_en: 'Start Redis',
            narration_ru: '# redis стартует мгновенно — ему не нужен том и не нужна миграция',
            narration_en: '# redis starts instantly — no volume and no migration needed',
            effects: [
              { at: 0,   containerId: 'cache', state: 'creating' },
              { at: 500, containerId: 'cache', state: 'running', note_ru: 'shop-cache-1 готов', note_en: 'shop-cache-1 ready' },
            ],
          },
          {
            id: 'api-after',
            command: 'docker compose up -d api',
            label_ru: 'Перезапустить API (база уже готова)',
            label_en: 'Restart the API (database is ready)',
            narration_ru: '# теперь db отвечает по внутреннему DNS, соединение установлено — сервис здоров',
            narration_en: '# now db answers over the internal DNS, the connection is established — the service is healthy',
            effects: [
              { at: 0,    containerId: 'api', state: 'creating' },
              { at: 700,  containerId: 'api', state: 'running', note_ru: 'подключение к db:5432 установлено', note_en: 'connected to db:5432' },
              { at: 1600, containerId: 'api', state: 'running', note_ru: 'shop-api-1 healthy, слушает 3000', note_en: 'shop-api-1 healthy, listening on 3000' },
            ],
          },
          {
            id: 'down',
            command: 'docker compose down',
            label_ru: 'Остановить всё (данные целы)',
            label_en: 'Stop everything (data intact)',
            narration_ru: '# контейнеры удалены, но именованный том pgdata остался — данные на месте. С флагом -v их бы не стало',
            narration_en: '# containers removed, but the named volume pgdata stayed — the data is safe. With -v it would be gone',
            effects: [
              { at: 0,    containerId: 'api',   state: 'stopping' },
              { at: 400,  containerId: 'cache', state: 'stopping' },
              { at: 800,  containerId: 'db',    state: 'stopping' },
              { at: 1400, containerId: 'api',   state: 'exited' },
              { at: 1500, containerId: 'cache', state: 'exited' },
              { at: 1700, containerId: 'db',    state: 'exited', note_ru: 'том pgdata сохранён', note_en: 'volume pgdata preserved' },
            ],
          },
        ],
        quest: {
          goal_ru: 'Сначала запусти API без базы и посмотри, что будет. Затем подними базу и Redis, перезапусти API и убедись, что он здоров. В конце останови стек, не потеряв данные.',
          goal_en: 'First start the API with no database and watch what happens. Then bring up the database and Redis, restart the API and confirm it is healthy. Finally stop the stack without losing data.',
          requiredActionIds: ['api-first', 'db-up', 'cache-up', 'api-after', 'down'],
          ordered: true,
        },
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'API в контейнере подключается по адресу `postgres://localhost:5432`. Почему не работает?',
      text_en: 'The API container connects to `postgres://localhost:5432`. Why does it fail?',
      options_ru: [
        'Postgres не поддерживает localhost',
        'localhost внутри контейнера — это сам контейнер API, а не соседний сервис; нужно имя сервиса db',
        'Нужно указать IP-адрес хоста',
        'Порт 5432 занят',
      ],
      options_en: [
        'Postgres does not support localhost',
        'localhost inside the container is the API container itself, not a neighbour; you need the service name db',
        'You must use the host IP address',
        'Port 5432 is busy',
      ],
      correctIndex: 1,
      explanation_ru: 'У каждого контейнера свой сетевой стек. Compose поднимает внутренний DNS, где сервисы доступны по своим именам.',
      explanation_en: 'Every container has its own network stack. Compose runs an internal DNS where services resolve by their names.',
    },
    {
      id: 'q2',
      text_ru: 'Чем `depends_on` с `condition: service_healthy` лучше обычного `depends_on`?',
      text_en: 'Why is `depends_on` with `condition: service_healthy` better than a plain `depends_on`?',
      options_ru: [
        'Он запускает сервисы параллельно',
        'Он ждёт не старта контейнера, а успешного healthcheck — то есть реальной готовности принимать соединения',
        'Он перезапускает зависимость при ошибке',
        'Разницы нет',
      ],
      options_en: [
        'It starts services in parallel',
        'It waits for a passing healthcheck rather than container start — that is, real readiness to accept connections',
        'It restarts the dependency on error',
        'There is no difference',
      ],
      correctIndex: 1,
      explanation_ru: 'Postgres «запущен» через 0.2 секунды, а принимает соединения через 3–5. Без healthcheck API успевает упасть в этом промежутке.',
      explanation_en: 'Postgres is "started" after 0.2 seconds but accepts connections after 3–5. Without a healthcheck the API dies in that gap.',
    },
    {
      id: 'q3',
      text_ru: 'Что делает `docker compose down -v`?',
      text_en: 'What does `docker compose down -v` do?',
      options_ru: [
        'Останавливает контейнеры и показывает подробный вывод',
        'Останавливает контейнеры и удаляет именованные тома вместе с данными базы',
        'Останавливает только тот сервис, который указан',
        'Проверяет версию compose-файла',
      ],
      options_en: [
        'Stops containers and prints verbose output',
        'Stops containers and deletes named volumes together with the database data',
        'Stops only the named service',
        'Validates the compose file version',
      ],
      correctIndex: 1,
      explanation_ru: '`-v` означает volumes. Это самая дорогая опечатка в Docker: одна буква отделяет перезапуск от потери базы.',
      explanation_en: '`-v` means volumes. It is the most expensive typo in Docker: one letter separates a restart from losing the database.',
    },
    {
      id: 'q4',
      text_ru: 'Нужно ли базе данных в проде указывать `ports: "5432:5432"`?',
      text_en: 'Does a production database need `ports: "5432:5432"`?',
      options_ru: [
        'Да, иначе API не сможет подключиться',
        'Нет — внутри сети Compose сервисы и так видят порты друг друга, а публикация откроет базу наружу',
        'Да, этого требует Postgres',
        'Нужно только для Redis',
      ],
      options_en: [
        'Yes, otherwise the API cannot connect',
        'No — inside the Compose network services already see each other\'s ports, and publishing exposes the database outward',
        'Yes, Postgres requires it',
        'Only Redis needs it',
      ],
      correctIndex: 1,
      explanation_ru: '`ports` открывает сервис наружу, на хост. Для внутреннего общения он не нужен, а в проде опасен: базу станет видно из интернета.',
      explanation_en: '`ports` exposes a service outward to the host. Internal traffic does not need it, and in production it is dangerous: the database becomes visible from the internet.',
    },
  ],
}
