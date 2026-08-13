import type { DevOpsLesson } from '@/types/devops'

export const devopsLogging: DevOpsLesson = {
  slug: 'devops-logging',
  moduleId: 'observability',
  order: 1,
  icon: '📜',
  readTime: 14,

  title_ru: 'Логи и разбор инцидентов',
  title_en: 'Logs & Incident Triage',
  description_ru: 'Уровни логов, структурированные логи и поиск корневой причины в потоке событий.',
  description_en: 'Log levels, structured logs and finding the root cause in a stream of events.',

  sections: [
    { id: 'levels',    title_ru: 'Уровни логов',                title_en: 'Log levels' },
    { id: 'structured',title_ru: 'Структурированные логи',      title_en: 'Structured logs' },
    { id: 'trace',     title_ru: 'Связывание запросов',         title_en: 'Correlating requests' },
    { id: 'rootcause', title_ru: 'Симптом против причины',      title_en: 'Symptom versus cause' },
    { id: 'key-terms', title_ru: 'Ключевые термины',            title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Когда что-то ломается, логи — единственное, что у тебя есть. Но лог из десяти тысяч строк без структуры бесполезен ровно так же, как его отсутствие. Этот урок — про то, как писать логи, которые помогут, и как читать их, когда всё горит.',
    intro_en:
      'When something breaks, logs are all you have. But ten thousand unstructured lines are exactly as useless as no logs at all. This lesson is about writing logs that help — and reading them while everything is on fire.',

    blocks: [
      {
        sectionId: 'levels',
        heading_ru: 'Уровни логов',
        heading_en: 'Log levels',
        text_ru:
          'Уровень — это ответ на вопрос «кого и когда это должно разбудить».\n\n• DEBUG — подробности для разработки. В проде отключён: он забивает диск и замедляет приложение.\n• INFO — значимые события: сервис запустился, заказ создан, задача выполнена.\n• WARN — что-то пошло не по плану, но система справилась: повторное подключение, деградация, приближение к лимиту.\n• ERROR — операция не выполнена, пользователь пострадал. Требует разбора.\n• FATAL — приложение не может продолжать работу и завершается.\n\nДве типичные крайности одинаково плохи. Логировать всё подряд на INFO — значит утопить настоящие ошибки в шуме. Логировать только ERROR — значит остаться без контекста: ты увидишь падение, но не увидишь, что к нему вело.\n\nПравило: уровень задаётся переменной окружения, а не хардкодом. На проде INFO, при разборе инцидента временно поднимают до DEBUG.',
        text_en:
          'A level answers the question "who should this wake up, and when".\n\n• DEBUG — development detail. Disabled in production: it fills the disk and slows the app.\n• INFO — meaningful events: the service started, an order was created, a job finished.\n• WARN — something went off-plan but the system coped: a reconnect, degradation, approaching a limit.\n• ERROR — an operation failed and a user was affected. Needs investigation.\n• FATAL — the application cannot continue and exits.\n\nTwo typical extremes are equally bad. Logging everything at INFO drowns real errors in noise. Logging only ERROR leaves you without context: you see the crash but not what led to it.\n\nThe rule: the level comes from an environment variable, never hard-coded. INFO in production, temporarily raised to DEBUG while investigating.',
      },
      {
        sectionId: 'structured',
        heading_ru: 'Структурированные логи',
        heading_en: 'Structured logs',
        text_ru:
          'Строка `Ошибка при обработке заказа` бесполезна: какого заказа, какого пользователя, что именно за ошибка? Найти по ней что-то через месяц невозможно.\n\nСтруктурированный лог — это JSON с полями. Его читает и человек, и машина: можно отфильтровать все записи по конкретному пользователю, посчитать ошибки по эндпоинтам, построить график.\n\nЧто добавлять всегда: время в UTC, уровень, имя сервиса, идентификатор запроса, идентификатор пользователя (не персональные данные!), длительность операции.\n\nЧто не добавлять никогда: пароли, токены, номера карт, содержимое персональных данных. Логи хранятся дольше, читаются шире и утекают чаще, чем база.',
        text_en:
          'The line `Error processing order` is useless: which order, which user, what error exactly? Finding anything by it a month later is impossible.\n\nA structured log is JSON with fields. Both humans and machines read it: you can filter every record for one user, count errors per endpoint, plot a graph.\n\nAlways include: UTC timestamp, level, service name, request id, user id (not personal data!), operation duration.\n\nNever include: passwords, tokens, card numbers, personal data content. Logs are kept longer, read more widely and leak more often than the database.',
        code: '{\n  "ts": "2026-08-13T09:41:14.220Z",\n  "level": "error",\n  "service": "shop-api",\n  "request_id": "c8f1-4a29",\n  "user_id": 8121,\n  "route": "POST /api/orders",\n  "duration_ms": 4021,\n  "error": "QueryFailedError: column \\"status_v2\\" does not exist"\n}',
        codeLang: 'json',
      },
      {
        sectionId: 'trace',
        heading_ru: 'Связывание запросов',
        heading_en: 'Correlating requests',
        text_ru:
          'Один клик пользователя проходит через несколько сервисов: прокси → API → база → очередь. В логах это четыре независимых потока строк, перемешанных с тысячами чужих запросов.\n\nРешение — request id: уникальный идентификатор, который присваивается на входе и передаётся дальше во всех вызовах. Теперь одна команда `grep c8f1-4a29` собирает весь путь запроса по всем сервисам, в правильном порядке.\n\nБез этого разбор инцидента превращается в сопоставление времени вручную — а времена на разных машинах ещё и расходятся.',
        text_en:
          'One user click travels through several services: proxy → API → database → queue. In the logs that is four independent streams of lines mixed with thousands of other requests.\n\nThe answer is a request id: a unique identifier assigned at the entry point and passed along every downstream call. Now a single `grep c8f1-4a29` reconstructs the whole path of that request across all services, in order.\n\nWithout it, incident triage becomes manual timestamp matching — and clocks on different machines drift, too.',
      },
      {
        sectionId: 'rootcause',
        heading_ru: 'Симптом против причины',
        heading_en: 'Symptom versus cause',
        text_ru:
          'Самая дорогая ошибка при разборе инцидента — принять первый громкий ERROR за причину. Обычно всё наоборот: самое заметное сообщение приходит последним и является следствием.\n\nПорядок разбора:\n1. Найди начало. Не первую ошибку, а момент, когда поведение изменилось — часто это безобидный WARN за несколько минут до.\n2. Спроси «что произошло прямо перед этим?». Деплой? Миграция? Рост трафика? Изменение конфига?\n3. Проверь зависимости. Приложение обычно ломается не само, а вслед за базой, диском, очередью или внешним API.\n4. Проверь гипотезу: если причина в этом, то в логах должно быть ещё вот это. Если не находится — гипотеза неверна.\n\nИ главное правило дежурного: перезапуск сервиса лечит симптом, а не причину. Иногда это оправдано, чтобы вернуть сайт пользователям, — но расследование на этом не заканчивается, а начинается.',
        text_en:
          'The most expensive mistake in triage is taking the first loud ERROR for the cause. Usually it is the opposite: the most visible message arrives last and is a consequence.\n\nThe triage order:\n1. Find the beginning. Not the first error but the moment behaviour changed — often an innocuous WARN a few minutes earlier.\n2. Ask "what happened right before this?". A deploy? A migration? A traffic spike? A config change?\n3. Check dependencies. An app rarely breaks by itself; it breaks after the database, the disk, the queue or an external API.\n4. Test the hypothesis: if this is the cause, the logs must also contain that. If they do not, the hypothesis is wrong.\n\nAnd the main on-call rule: restarting a service treats the symptom, not the cause. Sometimes that is justified to give users their site back — but the investigation starts there, it does not end.',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Уровень лога', term_en: 'Log level',
      definition_ru: 'Метка важности записи: debug, info, warn, error, fatal. Управляется переменной окружения.',
      definition_en: 'The importance label of a record: debug, info, warn, error, fatal. Controlled by an environment variable.',
    },
    {
      term_ru: 'Структурированный лог', term_en: 'Structured log',
      definition_ru: 'Запись в виде JSON с полями вместо свободного текста. Пригодна для фильтрации и агрегации.',
      definition_en: 'A record as JSON fields instead of free text. Suitable for filtering and aggregation.',
    },
    {
      term_ru: 'Request ID', term_en: 'Request ID',
      definition_ru: 'Идентификатор, присваиваемый запросу на входе и передаваемый во все сервисы. Позволяет собрать весь путь запроса.',
      definition_en: 'An identifier assigned at the entry point and passed to every service. Lets you reconstruct the whole request path.',
    },
    {
      term_ru: 'Корневая причина', term_en: 'Root cause',
      definition_ru: 'Первопричина сбоя, а не его самое заметное последствие.',
      definition_en: 'The underlying reason for a failure, not its most visible consequence.',
    },
    {
      term_ru: 'Ротация логов', term_en: 'Log rotation',
      definition_ru: 'Автоматическое разбиение и удаление старых логов, чтобы они не заполнили диск.',
      definition_en: 'Automatically splitting and deleting old logs so they do not fill the disk.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Логи в контейнере пишутся в stdout, а Docker складывает их в файл на хосте. Без ограничения размера этот файл спокойно вырастает до десятков гигабайт и кладёт сервер.',
      text_en: 'Container logs go to stdout and Docker stores them in a file on the host. With no size limit that file happily grows to tens of gigabytes and takes the server down.',
    },
    {
      text_ru: 'Время в логах всегда пишут в UTC. Иначе при разборе инцидента с двух серверов в разных зонах события выстраиваются в неправильном порядке.',
      text_en: 'Log timestamps are always in UTC. Otherwise, when triaging across servers in different zones, events line up in the wrong order.',
    },
    {
      text_ru: 'Токен, случайно попавший в лог, считается скомпрометированным: логи читают шире, чем базу, и хранят дольше.',
      text_en: 'A token accidentally written to a log counts as compromised: logs are read more widely than the database and kept longer.',
    },
  ],

  labs: [
    {
      id: 'lab-incident-basics',
      title_ru: 'Два инцидента: очевидный и не очень',
      title_en: 'Two incidents: one obvious, one less so',
      brief_ru: 'Прочитай поток логов, определи причину и выбери действие. Сначала называешь причину — только потом действуешь. В реальности порядок такой же.',
      brief_en: 'Read the log stream, identify the cause and choose an action. You name the cause first and act second. In reality the order is the same.',
      task: {
        kind: 'incident-simulator',
        scenarios: [
          {
            id: 'inc-env',
            level: 1,
            title_ru: 'API не поднимается',
            title_en: 'The API will not start',
            context_ru: 'В 09:02 задеплоили версию 1.4.0. Через минуту мониторинг сообщил: shop-api не отвечает, пользователи видят 502. Предыдущая версия работала шесть дней без единой ошибки.',
            context_en: 'At 09:02 version 1.4.0 was deployed. A minute later monitoring reported: shop-api is not responding and users see 502. The previous version ran six days without a single error.',
            logs: [
              { ts: '09:02:11', level: 'info',  service: 'deploy',   message_ru: 'выкатываю shop-api:1.4.0', message_en: 'deploying shop-api:1.4.0' },
              { ts: '09:02:14', level: 'info',  service: 'shop-api', message_ru: 'старт приложения, окружение production', message_en: 'application starting, environment production' },
              { ts: '09:02:14', level: 'warn',  service: 'shop-api', message_ru: 'переменная REDIS_URL не задана, кэш отключён', message_en: 'REDIS_URL is not set, cache disabled', symptom: true },
              { ts: '09:02:15', level: 'error', service: 'shop-api', message_ru: 'DATABASE_URL is undefined — не могу построить строку подключения', message_en: 'DATABASE_URL is undefined — cannot build a connection string', rootCause: true },
              { ts: '09:02:15', level: 'fatal', service: 'shop-api', message_ru: 'выход с кодом 1', message_en: 'exiting with code 1' },
              { ts: '09:02:20', level: 'info',  service: 'docker',   message_ru: 'restart policy on-failure: попытка 2', message_en: 'restart policy on-failure: attempt 2' },
              { ts: '09:02:21', level: 'fatal', service: 'shop-api', message_ru: 'выход с кодом 1', message_en: 'exiting with code 1' },
              { ts: '09:02:26', level: 'error', service: 'nginx',    message_ru: '502 Bad Gateway: upstream 127.0.0.1:3000 недоступен', message_en: '502 Bad Gateway: upstream 127.0.0.1:3000 unreachable', symptom: true },
            ],
            causeQuestion_ru: 'Что стало причиной падения?',
            causeQuestion_en: 'What caused the outage?',
            causes: [
              {
                id: 'c-nginx',
                label_ru: 'Сломался nginx — он отдаёт 502',
                label_en: 'Nginx broke — it returns 502',
                correct: false,
                feedback_ru: 'Нет. 502 означает «я не смог достучаться до приложения». Nginx исправно сообщает о чужой проблеме — это симптом, а не причина.',
                feedback_en: 'No. A 502 means "I could not reach the application". Nginx is faithfully reporting someone else\'s problem — a symptom, not the cause.',
              },
              {
                id: 'c-env',
                label_ru: 'В окружении новой версии не задана переменная DATABASE_URL',
                label_en: 'The new version\'s environment is missing DATABASE_URL',
                correct: true,
                feedback_ru: 'Верно. Приложение не может построить строку подключения и завершается с кодом 1 сразу после старта. Всё остальное в логе — последствия.',
                feedback_en: 'Correct. The app cannot build a connection string and exits with code 1 right after start. Everything else in the log is a consequence.',
              },
              {
                id: 'c-redis',
                label_ru: 'Не задан REDIS_URL — из-за этого приложение падает',
                label_en: 'REDIS_URL is missing — that is what kills the app',
                correct: false,
                feedback_ru: 'Почти. Эта строка действительно есть, но у неё уровень WARN: приложение сообщило, что отключило кэш, и продолжило работу. Падает оно строкой ниже.',
                feedback_en: 'Close. That line is real but its level is WARN: the app said it disabled the cache and carried on. It dies on the next line.',
              },
              {
                id: 'c-db-down',
                label_ru: 'Упала база данных',
                label_en: 'The database went down',
                correct: false,
                feedback_ru: 'Нет. В логах нет ни одной попытки подключения к базе — приложение до неё просто не дошло. Оно не знает адреса.',
                feedback_en: 'No. There is not a single connection attempt in the logs — the app never got that far. It does not know the address.',
              },
            ],
            actionQuestion_ru: 'Пользователи видят 502 прямо сейчас. Что делаешь?',
            actionQuestion_en: 'Users are seeing 502 right now. What do you do?',
            actions: [
              {
                id: 'a-rollback',
                label_ru: 'Откатиться на 1.3.9, затем добавить переменную и выкатить заново',
                label_en: 'Roll back to 1.3.9, then add the variable and ship again',
                correct: true,
                feedback_ru: 'Верно. Сначала возвращаем работающий сайт — предыдущий образ уже в реестре, откат занимает секунды. Правку конфига делаем спокойно, без пользователей на линии.',
                feedback_en: 'Correct. Give users a working site first — the previous image is already in the registry and the rollback takes seconds. Then fix the config calmly, with nobody waiting.',
              },
              {
                id: 'a-restart',
                label_ru: 'Перезапустить контейнер ещё раз',
                label_en: 'Restart the container again',
                correct: false,
                feedback_ru: 'Нет. Docker уже перезапускал его дважды с тем же результатом. Перезапуск не создаёт отсутствующую переменную окружения.',
                feedback_en: 'No. Docker already restarted it twice with the same result. A restart does not conjure a missing environment variable.',
              },
              {
                id: 'a-ssh-fix',
                label_ru: 'Зайти на сервер и дописать переменную прямо в работающий контейнер',
                label_en: 'SSH in and add the variable straight into the running container',
                correct: false,
                feedback_ru: 'Нет. Правка внутри контейнера исчезнет при следующем деплое, а причина останется в конфиге. И всё это время сайт лежит.',
                feedback_en: 'No. An edit inside the container vanishes on the next deploy while the cause stays in the config. And the site is down the whole time.',
              },
            ],
            postmortem_ru: 'Причина: при добавлении нового окружения секрет DATABASE_URL не был перенесён в конфигурацию деплоя. Что чинит систему, а не случай: шаг пайплайна, который до деплоя проверяет наличие всех обязательных переменных и падает, если чего-то нет.',
            postmortem_en: 'Cause: when the new environment was created the DATABASE_URL secret was never carried over into the deploy configuration. What fixes the system rather than this one case: a pipeline step that asserts every required variable exists before deploying and fails if one is missing.',
          },
          {
            id: 'inc-disk',
            level: 2,
            title_ru: 'Заказы сохраняются через раз',
            title_en: 'Orders save only half the time',
            context_ru: 'Деплоев не было четыре дня. С утра пользователи жалуются: часть заказов оформляется, часть выдаёт ошибку. Мониторинг показывает 15% пятисоток на POST /api/orders. Сервис при этом «работает» и healthcheck зелёный.',
            context_en: 'There have been no deploys for four days. Since morning users report that some orders go through and some fail. Monitoring shows 15% 500s on POST /api/orders. Meanwhile the service is "up" and the health check is green.',
            logs: [
              { ts: '06:12:03', level: 'warn',  service: 'system',   message_ru: 'раздел / заполнен на 86%', message_en: 'partition / is 86% full' },
              { ts: '07:48:51', level: 'warn',  service: 'system',   message_ru: 'раздел / заполнен на 94%', message_en: 'partition / is 94% full' },
              { ts: '08:31:20', level: 'error', service: 'postgres', message_ru: 'could not write to file "pg_wal/00000001": No space left on device', message_en: 'could not write to file "pg_wal/00000001": No space left on device', rootCause: true },
              { ts: '08:31:20', level: 'error', service: 'shop-api', message_ru: 'transaction rolled back: 53100 disk_full', message_en: 'transaction rolled back: 53100 disk_full' },
              { ts: '08:31:21', level: 'error', service: 'shop-api', message_ru: '500 POST /api/orders (request_id 7f3a-91cd)', message_en: '500 POST /api/orders (request_id 7f3a-91cd)', symptom: true },
              { ts: '08:33:04', level: 'info',  service: 'shop-api', message_ru: '201 POST /api/orders (request_id 8b02-4411)', message_en: '201 POST /api/orders (request_id 8b02-4411)' },
              { ts: '08:34:52', level: 'error', service: 'shop-api', message_ru: '500 POST /api/orders (request_id 9c17-2ab8)', message_en: '500 POST /api/orders (request_id 9c17-2ab8)', symptom: true },
              { ts: '08:35:00', level: 'info',  service: 'healthz',  message_ru: 'GET /healthz → 200 (проверяется только живость процесса)', message_en: 'GET /healthz → 200 (only process liveness is checked)' },
            ],
            causeQuestion_ru: 'Почему часть заказов не сохраняется?',
            causeQuestion_en: 'Why do some orders fail to save?',
            causes: [
              {
                id: 'c-api-bug',
                label_ru: 'Баг в коде API: он отдаёт 500 на некоторых заказах',
                label_en: 'A bug in the API code: it returns 500 for some orders',
                correct: false,
                feedback_ru: 'Нет. Деплоев не было четыре дня, а код за ночь не меняется сам. И 500 приходят вперемешку с успешными 201 — на баг в логике это не похоже.',
                feedback_en: 'No. There were no deploys for four days and code does not change itself overnight. Also the 500s alternate with successful 201s — that does not look like a logic bug.',
              },
              {
                id: 'c-disk',
                label_ru: 'На сервере закончилось место: Postgres не может писать WAL, транзакции откатываются',
                label_en: 'The server ran out of disk: Postgres cannot write its WAL and transactions roll back',
                correct: true,
                feedback_ru: 'Верно. Смотри на начало: два WARN про заполнение диска за два часа до первой ошибки. Это и есть момент, когда поведение изменилось. Дальше — цепочка следствий.',
                feedback_en: 'Correct. Look at the beginning: two disk-usage WARNs two hours before the first error. That is the moment behaviour changed. Everything after is a chain of consequences.',
              },
              {
                id: 'c-healthcheck',
                label_ru: 'Сломался healthcheck — он показывает 200, хотя сервис нездоров',
                label_en: 'The health check is broken — it shows 200 while the service is unhealthy',
                correct: false,
                feedback_ru: 'Это настоящая проблема, но не причина инцидента. Healthcheck проверяет только живость процесса — из-за этого сбой не заметили раньше, но заказы падают не поэтому.',
                feedback_en: 'That is a real problem but not the cause of this incident. The health check only probes process liveness — it is why the failure went unnoticed, but not why orders fail.',
              },
              {
                id: 'c-load',
                label_ru: 'Наплыв пользователей: база не справляется с нагрузкой',
                label_en: 'A traffic spike: the database cannot keep up',
                correct: false,
                feedback_ru: 'Нет. При перегрузке в логах были бы таймауты и растущее время ответа. Здесь конкретная ошибка записи на диск с кодом 53100.',
                feedback_en: 'No. Overload would show timeouts and rising response times. Here we have a specific disk write error with code 53100.',
              },
            ],
            actionQuestion_ru: 'Что делаешь в первую очередь?',
            actionQuestion_en: 'What do you do first?',
            actions: [
              {
                id: 'a-free-disk',
                label_ru: 'Освободить место: ротация логов и удаление неиспользуемых docker-образов, затем настроить лимиты и алерт на 80%',
                label_en: 'Free up disk: rotate logs and prune unused docker images, then set limits and an alert at 80%',
                correct: true,
                feedback_ru: 'Верно. Сначала убираем причину — база сразу начнёт писать. Затем закрываем дыру навсегда: ограничение размера логов и алерт, который сработает до аварии, а не во время.',
                feedback_en: 'Correct. Remove the cause first — the database starts writing immediately. Then close the hole for good: log size limits and an alert that fires before an outage, not during one.',
              },
              {
                id: 'a-restart-db',
                label_ru: 'Перезапустить Postgres',
                label_en: 'Restart Postgres',
                correct: false,
                feedback_ru: 'Нет. Перезапуск не создаёт свободное место. После него база встанет ещё раз на первой же записи — только теперь с холодным кэшем.',
                feedback_en: 'No. A restart does not create free space. The database will stall again on the first write — now with a cold cache too.',
              },
              {
                id: 'a-rollback',
                label_ru: 'Откатить приложение на предыдущую версию',
                label_en: 'Roll the application back to the previous version',
                correct: false,
                feedback_ru: 'Нет. Откатывать некуда: последний деплой был четыре дня назад и работал нормально. Причина не в коде.',
                feedback_en: 'No. There is nothing to roll back to: the last deploy was four days ago and worked fine. The cause is not in the code.',
              },
            ],
            postmortem_ru: 'Причина: логи docker-контейнеров не ограничены по размеру и за три недели заняли 41 ГБ. Что чинит систему: max-size для драйвера логов, еженедельная очистка образов и алерт на заполнение диска при 80%. Отдельным пунктом — healthcheck должен проверять запись в базу, а не только живость процесса.',
            postmortem_en: 'Cause: docker container logs had no size limit and grew to 41 GB over three weeks. What fixes the system: a max-size on the log driver, weekly image pruning and a disk alert at 80%. Separately — the health check must probe a database write, not just process liveness.',
          },
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что нельзя писать в логи ни при каких условиях?',
      text_en: 'What must never appear in logs under any circumstances?',
      options_ru: [
        'Идентификатор запроса',
        'Токены, пароли и номера карт',
        'Длительность операции',
        'Имя сервиса',
      ],
      options_en: [
        'The request id',
        'Tokens, passwords and card numbers',
        'Operation duration',
        'The service name',
      ],
      correctIndex: 1,
      explanation_ru: 'Логи читают шире и хранят дольше, чем базу. Токен, попавший в лог, считается скомпрометированным.',
      explanation_en: 'Logs are read more widely and kept longer than the database. A token that lands in a log counts as compromised.',
    },
    {
      id: 'q2',
      text_ru: 'Зачем нужен request id?',
      text_en: 'What is a request id for?',
      options_ru: [
        'Чтобы ускорить обработку запроса',
        'Чтобы собрать весь путь одного запроса через все сервисы одной командой grep',
        'Чтобы шифровать логи',
        'Чтобы ограничить частоту запросов',
      ],
      options_en: [
        'To speed up request processing',
        'To reconstruct the whole path of one request across all services with a single grep',
        'To encrypt logs',
        'To rate-limit requests',
      ],
      correctIndex: 1,
      explanation_ru: 'Без него приходится сопоставлять события по времени вручную, а часы на разных машинах ещё и расходятся.',
      explanation_en: 'Without it you match events by timestamp by hand — and clocks on different machines drift.',
    },
    {
      id: 'q3',
      text_ru: 'Первый ERROR в логе — это обычно…',
      text_en: 'The first ERROR in a log is usually…',
      options_ru: [
        'Всегда корневая причина',
        'Часто уже следствие: начало инцидента нередко выглядит как безобидный WARN раньше по времени',
        'Ошибка мониторинга',
        'Признак сетевой проблемы',
      ],
      options_en: [
        'Always the root cause',
        'Often already a consequence: an incident often begins as an innocuous WARN earlier in time',
        'A monitoring glitch',
        'A sign of a network problem',
      ],
      correctIndex: 1,
      explanation_ru: 'Ищи момент, когда поведение изменилось, а не первое красное сообщение. В примере с диском всё началось с WARN за два часа до ошибок.',
      explanation_en: 'Look for the moment behaviour changed, not the first red message. In the disk example everything started with a WARN two hours before the errors.',
    },
    {
      id: 'q4',
      text_ru: 'Почему DEBUG отключают в продакшене?',
      text_en: 'Why is DEBUG disabled in production?',
      options_ru: [
        'DEBUG небезопасен по стандарту',
        'Он заполняет диск, замедляет приложение и топит настоящие ошибки в шуме',
        'Он не поддерживается в контейнерах',
        'Его нельзя включить обратно',
      ],
      options_en: [
        'DEBUG is insecure by standard',
        'It fills the disk, slows the app and drowns real errors in noise',
        'It is unsupported in containers',
        'It cannot be turned back on',
      ],
      correctIndex: 1,
      explanation_ru: 'Уровень задают переменной окружения, чтобы при разборе инцидента его можно было временно поднять без пересборки образа.',
      explanation_en: 'The level comes from an environment variable so it can be raised temporarily during triage without rebuilding the image.',
    },
  ],
}
