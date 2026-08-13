import type { DevOpsLesson } from '@/types/devops'

export const devopsMonitoring: DevOpsLesson = {
  slug: 'devops-monitoring',
  moduleId: 'observability',
  order: 2,
  icon: '📈',
  readTime: 14,

  title_ru: 'Мониторинг и алерты',
  title_en: 'Monitoring & Alerts',
  description_ru: 'Аптайм, health-check, метрики, SLO и алерты, на которые реально реагируют.',
  description_en: 'Uptime, health checks, metrics, SLOs and alerts people actually act on.',

  sections: [
    { id: 'uptime',    title_ru: 'Аптайм-мониторинг',        title_en: 'Uptime monitoring' },
    { id: 'health',    title_ru: 'Честный health-check',     title_en: 'An honest health check' },
    { id: 'metrics',   title_ru: 'Четыре золотых сигнала',   title_en: 'The four golden signals' },
    { id: 'alerts',    title_ru: 'Алерты, которые работают', title_en: 'Alerts that work' },
    { id: 'key-terms', title_ru: 'Ключевые термины',         title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Мониторинг отвечает на два разных вопроса. «Работает ли сайт прямо сейчас?» — это аптайм. «Почему он работает плохо?» — это метрики и логи. Без первого ты узнаёшь о падении от пользователей. Без второго — знаешь, что упало, но не знаешь почему.',
    intro_en:
      'Monitoring answers two different questions. "Is the site up right now?" — that is uptime. "Why is it behaving badly?" — that is metrics and logs. Without the first you learn about outages from users. Without the second you know what broke but not why.',

    blocks: [
      {
        sectionId: 'uptime',
        heading_ru: 'Аптайм-мониторинг',
        heading_en: 'Uptime monitoring',
        text_ru:
          'Самый простой и самый недооценённый инструмент: внешний сервис раз в минуту дёргает твой URL и проверяет, что ответ 200 и пришёл быстрее, чем за N секунд. Не ответил трижды подряд — приходит уведомление.\n\nКлючевое слово — внешний. Мониторинг, который живёт на том же сервере, что и приложение, бесполезен ровно в тот момент, когда он нужен: сервер лёг вместе с ним.\n\nПроверять нужно не главную страницу, а эндпоинт, который реально что-то делает. Статичная главная может отдаваться из кэша nginx, пока приложение и база давно мертвы.',
        text_en:
          'The simplest and most underrated tool: an external service hits your URL every minute and checks that the response is 200 and arrived faster than N seconds. Three failures in a row and you get a notification.\n\nThe key word is external. Monitoring that lives on the same server as the application is useless at exactly the moment you need it: the server went down with it.\n\nAnd check an endpoint that actually does something, not the homepage. A static homepage can be served from the nginx cache long after the app and the database are dead.',
      },
      {
        sectionId: 'health',
        heading_ru: 'Честный health-check',
        heading_en: 'An honest health check',
        text_ru:
          'Эндпоинт `/healthz`, который возвращает `{"status":"ok"}` без единой проверки, — это ложь, встроенная в приложение. Он подтверждает только то, что процесс запустился и умеет отвечать на HTTP.\n\nЧестная проверка обращается к зависимостям: делает запрос к базе, проверяет доступность очереди, смотрит, не исчерпан ли пул соединений. Тогда деплой, после которого приложение не может работать, будет остановлен автоматикой, а не замечен пользователями.\n\nРазделяют два вида проверок:\n• liveness — «процесс жив, перезапускать не надо». Если она падает, контейнер перезапускают.\n• readiness — «готов принимать трафик». Если она падает, экземпляр временно выводят из-под балансировки, но не убивают.\n\nПутать их дорого: если в liveness проверять доступность базы, кратковременная недоступность БД приведёт к перезапуску всех контейнеров разом — и вместо частичной деградации ты получишь полный отказ.',
        text_en:
          'A `/healthz` endpoint returning `{"status":"ok"}` with no checks at all is a lie built into the application. It only proves the process started and can answer HTTP.\n\nAn honest check probes dependencies: queries the database, checks the queue, looks at whether the connection pool is exhausted. Then a deploy that leaves the app unable to work is stopped by automation rather than noticed by users.\n\nTwo kinds of probe are distinguished:\n• liveness — "the process is alive, no restart needed". If it fails, the container is restarted.\n• readiness — "ready to take traffic". If it fails, the instance is pulled out of the load balancer but not killed.\n\nConfusing them is expensive: putting a database check into liveness means a brief database blip restarts every container at once — turning partial degradation into a total outage.',
        code: '// liveness: только процесс\napp.get(\'/livez\', (_, res) => res.send(\'ok\'))\n\n// readiness: зависимости\napp.get(\'/readyz\', async (_, res) => {\n  try {\n    await db.query(\'SELECT 1\')\n    await redis.ping()\n    res.json({ status: \'ok\' })\n  } catch (e) {\n    res.status(503).json({ status: \'degraded\', error: String(e) })\n  }\n})',
        codeLang: 'javascript',
      },
      {
        sectionId: 'metrics',
        heading_ru: 'Четыре золотых сигнала',
        heading_en: 'The four golden signals',
        text_ru:
          'Метрик можно собирать сотни, но начинать стоит с четырёх — они покрывают почти все реальные проблемы:\n\n• Latency — время ответа. Смотри не среднее, а перцентили: p50, p95, p99. Среднее прячет катастрофу — при 5% очень медленных запросов оно почти не сдвинется.\n• Traffic — сколько запросов в секунду. Нужен, чтобы отличить «стало плохо» от «стало много».\n• Errors — доля пятисоток. Именно доля, а не абсолютное число: 100 ошибок при 10 000 запросов и при 200 запросах — разные ситуации.\n• Saturation — насколько загружены ресурсы: CPU, память, диск, пул соединений. Растёт раньше остальных и предупреждает заранее.\n\nОтсюда SLO — цель, которую команда себе назначает: например, «99.5% запросов быстрее 500 мс за месяц». SLO превращает спор «сайт тормозит» — «да нормально всё» в измеримое утверждение.',
        text_en:
          'You can collect hundreds of metrics, but start with four — they cover almost every real problem:\n\n• Latency — response time. Look at percentiles, not the average: p50, p95, p99. An average hides catastrophes — with 5% of requests very slow it barely moves.\n• Traffic — requests per second. Needed to tell "things got bad" from "things got busy".\n• Errors — the share of 5xx responses. The share, not the count: 100 errors out of 10,000 requests and out of 200 are different situations.\n• Saturation — how loaded the resources are: CPU, memory, disk, connection pool. It rises before the others and warns you in advance.\n\nFrom these come SLOs — targets a team sets for itself: for example "99.5% of requests faster than 500 ms over a month". An SLO turns the argument "the site is slow" versus "it is fine" into a measurable statement.',
      },
      {
        sectionId: 'alerts',
        heading_ru: 'Алерты, которые работают',
        heading_en: 'Alerts that work',
        text_ru:
          'Главная опасность мониторинга — не отсутствие алертов, а их избыток. Если уведомления приходят двадцать раз в день и девятнадцать из них ни о чём, команда перестаёт их читать. Это называется alert fatigue, и именно так пропускают настоящую аварию.\n\nПравила хорошего алерта:\n• Он сообщает о симптоме, который чувствует пользователь, а не о внутренней метрике. «Доля ошибок выше 5% пять минут» лучше, чем «CPU 90%»: высокий CPU при работающем сайте — не повод будить человека.\n• У него есть окно. Не «диск заполнен», а «диск заполнен более чем на 85% в течение десяти минут» — иначе алерт сработает на кратковременный всплеск.\n• Он предупреждает заранее. Алерт на 85% диска даёт время среагировать, алерт на 100% — это уже разбор аварии.\n• На него можно что-то сделать. Если реакция на алерт — «ну да, бывает», алерт нужно удалить или переделать.\n\nИ последнее: алерт обязан вести к инструкции. Разбуженный в три часа ночи человек не должен вспоминать, что делать — он должен открыть ссылку из уведомления и увидеть шаги.',
        text_en:
          'The main danger in monitoring is not missing alerts but too many. If twenty notifications arrive daily and nineteen mean nothing, the team stops reading them. That is alert fatigue, and it is exactly how a real outage gets missed.\n\nRules for a good alert:\n• It reports a symptom the user feels, not an internal metric. "Error rate above 5% for five minutes" beats "CPU at 90%": high CPU on a working site is no reason to wake anyone.\n• It has a window. Not "disk full" but "disk above 85% for ten minutes" — otherwise it fires on a brief spike.\n• It warns in advance. An alert at 85% disk gives you time to react; an alert at 100% is already an incident review.\n• It is actionable. If the reaction to an alert is "yeah, that happens", the alert must be deleted or reworked.\n\nAnd finally: an alert must link to a runbook. Someone woken at three in the morning should not have to recall what to do — they should open the link in the notification and see the steps.',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Аптайм-мониторинг', term_en: 'Uptime monitoring',
      definition_ru: 'Внешняя проверка доступности сайта по расписанию с уведомлением при недоступности.',
      definition_en: 'A scheduled external availability check with a notification when the site is unreachable.',
    },
    {
      term_ru: 'liveness / readiness', term_en: 'liveness / readiness',
      definition_ru: 'Две разные проверки: жив ли процесс и готов ли он принимать трафик. Первая приводит к перезапуску, вторая — к выводу из балансировки.',
      definition_en: 'Two different probes: is the process alive, and is it ready for traffic. The first triggers a restart, the second removes the instance from the load balancer.',
    },
    {
      term_ru: 'Перцентиль (p95, p99)', term_en: 'Percentile (p95, p99)',
      definition_ru: 'Значение, ниже которого лежат 95% или 99% измерений. Показывает, что чувствуют самые невезучие пользователи.',
      definition_en: 'The value below which 95% or 99% of measurements fall. Shows what the unluckiest users experience.',
    },
    {
      term_ru: 'SLO', term_en: 'SLO',
      definition_ru: 'Измеримая цель по качеству сервиса, например «99.5% запросов быстрее 500 мс за месяц».',
      definition_en: 'A measurable service quality target, e.g. "99.5% of requests under 500 ms per month".',
    },
    {
      term_ru: 'Alert fatigue', term_en: 'Alert fatigue',
      definition_ru: 'Состояние, когда алертов так много, что команда перестаёт на них реагировать — и пропускает настоящую аварию.',
      definition_en: 'The state where alerts are so frequent that the team stops reacting — and misses a real outage.',
    },
  ],

  didYouKnow: [
    {
      text_ru: '99.9% аптайма — это 43 минуты простоя в месяц. 99.99% — четыре минуты. Каждая девятка стоит примерно на порядок дороже предыдущей.',
      text_en: '99.9% uptime is 43 minutes of downtime a month. 99.99% is four minutes. Every extra nine costs roughly an order of magnitude more.',
    },
    {
      text_ru: 'Среднее время ответа — самая обманчивая метрика. При 1000 запросов по 100 мс и 50 запросах по 10 секундах среднее выглядит приличным, а 5% пользователей уже ушли.',
      text_en: 'Average response time is the most deceptive metric. With 1000 requests at 100 ms and 50 at 10 seconds the average looks fine, while 5% of users have already left.',
    },
    {
      text_ru: 'Проверка базы внутри liveness-пробы — классическая причина каскадного отказа: короткий сбой БД перезапускает разом все экземпляры приложения.',
      text_en: 'Probing the database inside a liveness check is a classic cause of cascading failure: a brief DB blip restarts every application instance at once.',
    },
  ],

  labs: [
    {
      id: 'lab-incident-rootcause',
      title_ru: 'Найди корневую причину, а не первый симптом',
      title_en: 'Find the root cause, not the first symptom',
      brief_ru: 'Сложный инцидент: событий много, самое громкое пришло последним. Восстанови цепочку и определи, с чего всё началось.',
      brief_en: 'A hard incident: many events, and the loudest one arrived last. Reconstruct the chain and work out where it started.',
      task: {
        kind: 'incident-simulator',
        scenarios: [
          {
            id: 'inc-cascade',
            level: 3,
            title_ru: 'Каскадный отказ после релиза',
            title_en: 'Cascading failure after a release',
            context_ru: 'В 14:02 выкатили релиз 2.1.0 с новым эндпоинтом отчётов. Полчаса всё было нормально. В 14:31 посыпались алерты: рост p99, затем OOM-kill контейнеров, затем полная недоступность. Дежурный видит в чате три разных алерта и не понимает, с какого начинать.',
            context_en: 'At 14:02 release 2.1.0 shipped with a new reports endpoint. For half an hour everything looked fine. At 14:31 the alerts started: p99 climbing, then OOM-killed containers, then a full outage. The on-call engineer sees three different alerts in the chat and cannot tell which to start from.',
            logs: [
              { ts: '14:02:10', level: 'info',  service: 'deploy',   message_ru: 'выкачен shop-api:2.1.0 (новый эндпоинт GET /api/reports)', message_en: 'shipped shop-api:2.1.0 (new endpoint GET /api/reports)' },
              { ts: '14:04:33', level: 'info',  service: 'shop-api', message_ru: '200 GET /api/reports duration_ms=180', message_en: '200 GET /api/reports duration_ms=180' },
              { ts: '14:18:02', level: 'debug', service: 'postgres', message_ru: 'seq scan on orders (14.2M rows), no index for created_at', message_en: 'seq scan on orders (14.2M rows), no index for created_at', rootCause: true },
              { ts: '14:22:47', level: 'warn',  service: 'shop-api', message_ru: 'pool: 18/20 соединений занято, среднее ожидание 340 мс', message_en: 'pool: 18/20 connections in use, average wait 340 ms' },
              { ts: '14:28:19', level: 'warn',  service: 'shop-api', message_ru: 'p99 latency 4.8s (было 210 мс), очередь запросов растёт', message_en: 'p99 latency 4.8s (was 210 ms), request queue growing' },
              { ts: '14:31:02', level: 'error', service: 'shop-api', message_ru: 'pool timeout: не удалось получить соединение за 5000 мс', message_en: 'pool timeout: could not acquire a connection within 5000 ms', symptom: true },
              { ts: '14:31:40', level: 'error', service: 'kernel',   message_ru: 'Out of memory: killed process 4821 (node), rss 3.6GB', message_en: 'Out of memory: killed process 4821 (node), rss 3.6GB', symptom: true },
              { ts: '14:31:41', level: 'info',  service: 'docker',   message_ru: 'restart policy always: поднимаю shop-api-1', message_en: 'restart policy always: restarting shop-api-1' },
              { ts: '14:32:05', level: 'error', service: 'kernel',   message_ru: 'Out of memory: killed process 5033 (node), rss 3.6GB', message_en: 'Out of memory: killed process 5033 (node), rss 3.6GB', symptom: true },
              { ts: '14:32:30', level: 'fatal', service: 'nginx',    message_ru: '502 на всех маршрутах: ни один upstream не отвечает', message_en: '502 on every route: no upstream is responding', symptom: true },
            ],
            causeQuestion_ru: 'С чего началась авария?',
            causeQuestion_en: 'Where did the outage begin?',
            causes: [
              {
                id: 'c-oom',
                label_ru: 'Нехватка памяти: OOM killer убивает контейнеры',
                label_en: 'Memory exhaustion: the OOM killer is killing containers',
                correct: false,
                feedback_ru: 'Это самое громкое событие, но оно случилось в 14:31 — через 13 минут после первого признака. Память кончилась потому, что в очереди копились незавершённые запросы. Следствие, а не причина.',
                feedback_en: 'That is the loudest event, but it happened at 14:31 — thirteen minutes after the first sign. Memory ran out because unfinished requests piled up in the queue. A consequence, not a cause.',
              },
              {
                id: 'c-index',
                label_ru: 'Новый эндпоинт делает запрос без индекса — полный скан таблицы на 14 млн строк',
                label_en: 'The new endpoint runs an unindexed query — a full scan over 14M rows',
                correct: true,
                feedback_ru: 'Верно. Самая ранняя аномалия — строка DEBUG в 14:18: seq scan по большой таблице. Дальше цепочка: медленные запросы держат соединения → пул исчерпан → очередь растёт → память кончается → OOM → 502.',
                feedback_en: 'Correct. The earliest anomaly is the DEBUG line at 14:18: a seq scan over a big table. Then the chain: slow queries hold connections → the pool is exhausted → the queue grows → memory runs out → OOM → 502.',
              },
              {
                id: 'c-nginx',
                label_ru: 'Сломался nginx: он отдаёт 502 на всех маршрутах',
                label_en: 'Nginx broke: it returns 502 on every route',
                correct: false,
                feedback_ru: 'Нет. Nginx честно сообщает, что за ним никто не отвечает — все upstream-контейнеры к этому моменту уже убиты. Это последнее звено цепочки.',
                feedback_en: 'No. Nginx is honestly reporting that nothing answers behind it — every upstream container is already dead by then. It is the last link of the chain.',
              },
              {
                id: 'c-pool',
                label_ru: 'Слишком маленький пул соединений: всего 20',
                label_en: 'The connection pool is too small: only 20',
                correct: false,
                feedback_ru: 'Близко, но нет. Пул шесть дней справлялся с той же нагрузкой. Он исчерпался не потому, что мал, а потому, что каждое соединение стало удерживаться в 20 раз дольше. Увеличение пула лишь отсрочит ту же аварию.',
                feedback_en: 'Close, but no. The pool handled the same load for six days. It drained not because it is small but because each connection is now held twenty times longer. Enlarging it would only postpone the same outage.',
              },
            ],
            actionQuestion_ru: 'Сайт лежит. Первое действие дежурного?',
            actionQuestion_en: 'The site is down. What is the on-call engineer\'s first action?',
            actions: [
              {
                id: 'a-rollback',
                label_ru: 'Откатиться на 2.0.x, а индекс добавить отдельным релизом',
                label_en: 'Roll back to 2.0.x and add the index in a separate release',
                correct: true,
                feedback_ru: 'Верно. Откат убирает источник тяжёлых запросов за секунды, и система разгружается сама. Создание индекса на таблице в 14 млн строк под нагрузкой — отдельная операция, которую делают спокойно и, желательно, без блокировки.',
                feedback_en: 'Correct. The rollback removes the source of heavy queries in seconds and the system drains itself. Building an index on a 14M-row table under load is a separate operation, done calmly and preferably without locking.',
              },
              {
                id: 'a-more-memory',
                label_ru: 'Увеличить лимит памяти контейнеров и перезапустить',
                label_en: 'Raise the container memory limit and restart',
                correct: false,
                feedback_ru: 'Нет. Это лечит симптом: контейнеры перестанут падать, но запросы останутся медленными, а очередь продолжит расти. Сайт будет отвечать по 30 секунд вместо 502 — пользователю не легче.',
                feedback_en: 'No. That treats the symptom: containers stop dying but the queries stay slow and the queue keeps growing. The site answers in 30 seconds instead of 502 — no better for users.',
              },
              {
                id: 'a-restart-all',
                label_ru: 'Перезапустить все контейнеры и базу',
                label_en: 'Restart every container and the database',
                correct: false,
                feedback_ru: 'Нет. Docker уже перезапускает их автоматически, и каждый новый контейнер умирает через полминуты. Пока эндпоинт с тяжёлым запросом принимает трафик, перезапуск ничего не меняет.',
                feedback_en: 'No. Docker is already restarting them automatically and each new container dies within half a minute. While the endpoint with the heavy query keeps taking traffic, restarting changes nothing.',
              },
              {
                id: 'a-investigate',
                label_ru: 'Сначала собрать метрики и написать подробный отчёт',
                label_en: 'First gather metrics and write a detailed report',
                correct: false,
                feedback_ru: 'Нет. Отчёт нужен, но после восстановления. Каждая минута расследования при лежащем сайте — это минута простоя, а метрики никуда не денутся.',
                feedback_en: 'No. The report matters, but after recovery. Every minute of investigation with the site down is a minute of downtime, and the metrics are not going anywhere.',
              },
            ],
            postmortem_ru: 'Корневая причина: эндпоинт /api/reports фильтрует по created_at, для которого нет индекса. На тестовой базе в 5 тысяч строк запрос отрабатывал за 12 мс, на проде с 14 млн строк — за 9 секунд. Что чинит систему: индекс, обязательный EXPLAIN для новых запросов на ревью, тестовая база сопоставимого размера, таймаут на уровне запроса к БД и алерт на p99, а не только на доступность.',
            postmortem_en: 'Root cause: the /api/reports endpoint filters by created_at, which has no index. On a 5,000-row test database the query took 12 ms; on production with 14M rows it takes 9 seconds. What fixes the system: the index, a mandatory EXPLAIN for new queries in review, a test database of comparable size, a statement-level timeout on the database, and an alert on p99 rather than availability alone.',
          },
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Почему нельзя проверять доступность базы в liveness-пробе?',
      text_en: 'Why should a liveness probe not check database availability?',
      options_ru: [
        'Это слишком медленно',
        'Кратковременный сбой БД приведёт к одновременному перезапуску всех экземпляров и превратит деградацию в полный отказ',
        'Liveness не поддерживает внешние вызовы',
        'База может вернуть неверный формат',
      ],
      options_en: [
        'It is too slow',
        'A brief database blip would restart every instance at once, turning degradation into a total outage',
        'Liveness does not support external calls',
        'The database may return the wrong format',
      ],
      correctIndex: 1,
      explanation_ru: 'Liveness отвечает на вопрос «нужно ли перезапустить процесс». Зависимости проверяет readiness — она лишь выводит экземпляр из-под балансировки.',
      explanation_en: 'Liveness answers "should this process be restarted". Dependencies belong in readiness, which merely removes the instance from the load balancer.',
    },
    {
      id: 'q2',
      text_ru: 'Почему смотрят p95 и p99, а не среднее время ответа?',
      text_en: 'Why look at p95 and p99 rather than average response time?',
      options_ru: [
        'Среднее сложнее считать',
        'Среднее прячет хвост: несколько процентов очень медленных запросов почти не сдвигают его, но именно эти пользователи уходят',
        'Перцентили точнее по стандарту',
        'Среднее работает только для GET-запросов',
      ],
      options_en: [
        'The average is harder to compute',
        'The average hides the tail: a few percent of very slow requests barely move it, yet those are the users who leave',
        'Percentiles are more accurate by standard',
        'Averages only work for GET requests',
      ],
      correctIndex: 1,
      explanation_ru: 'p99 показывает, что чувствует самый невезучий процент пользователей. Именно там видно проблему до того, как она станет всеобщей.',
      explanation_en: 'p99 shows what the unluckiest percent of users experience. That is where a problem shows up before it becomes universal.',
    },
    {
      id: 'q3',
      text_ru: 'Какой алерт лучше?',
      text_en: 'Which alert is better?',
      options_ru: [
        '«CPU выше 90%»',
        '«Доля ответов 5xx выше 5% в течение пяти минут»',
        '«Пришёл новый запрос»',
        '«Диск заполнен на 100%»',
      ],
      options_en: [
        '"CPU above 90%"',
        '"5xx share above 5% for five minutes"',
        '"A new request arrived"',
        '"Disk 100% full"',
      ],
      correctIndex: 1,
      explanation_ru: 'Он описывает симптом, который чувствует пользователь, имеет окно и требует действия. Высокий CPU при работающем сайте — не повод будить человека, а 100% диска — это уже авария, а не предупреждение.',
      explanation_en: 'It describes a symptom users feel, has a window and demands action. High CPU on a working site is no reason to wake anyone, and a 100% full disk is already an outage, not a warning.',
    },
    {
      id: 'q4',
      text_ru: 'Почему аптайм-мониторинг должен быть внешним?',
      text_en: 'Why must uptime monitoring be external?',
      options_ru: [
        'Так дешевле',
        'Мониторинг на том же сервере упадёт вместе с приложением и не сможет сообщить об аварии',
        'Внешний работает быстрее',
        'Этого требует TLS',
      ],
      options_en: [
        'It is cheaper',
        'Monitoring on the same server goes down with the application and cannot report the outage',
        'External checks are faster',
        'TLS requires it',
      ],
      correctIndex: 1,
      explanation_ru: 'Инструмент наблюдения не должен зависеть от объекта наблюдения. Иначе он молчит ровно тогда, когда нужен.',
      explanation_en: 'The observer must not depend on the observed. Otherwise it goes silent exactly when you need it.',
    },
  ],
}
