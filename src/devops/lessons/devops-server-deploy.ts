import type { DevOpsLesson } from '@/types/devops'

export const devopsServerDeploy: DevOpsLesson = {
  slug: 'devops-server-deploy',
  moduleId: 'servers',
  order: 2,
  icon: '🚀',
  readTime: 16,

  title_ru: 'Деплой на реальный сервер',
  title_en: 'Deploying to a Real Server',
  description_ru: 'От чистой машины до работающего приложения: окружения, релизы и откат.',
  description_en: 'From a bare machine to a running app: environments, releases and rollback.',

  sections: [
    { id: 'prepare',   title_ru: 'Подготовка сервера',        title_en: 'Preparing the server' },
    { id: 'envs',      title_ru: 'Окружения и секреты',       title_en: 'Environments and secrets' },
    { id: 'release',   title_ru: 'Как выглядит релиз',        title_en: 'What a release looks like' },
    { id: 'rollback',  title_ru: 'Откат за одну команду',     title_en: 'Rollback in one command' },
    { id: 'zerodown',  title_ru: 'Деплой без простоя',        title_en: 'Zero-downtime deploys' },
    { id: 'key-terms', title_ru: 'Ключевые термины',          title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Ты собрал образ и настроил пайплайн. Осталось главное — доставить это на машину, которую видят пользователи, так, чтобы выкат занимал секунды, а откат — ещё меньше.',
    intro_en:
      'You have built the image and set up the pipeline. What remains is the main part — delivering it to the machine users can see, so that shipping takes seconds and rolling back takes even less.',

    blocks: [
      {
        sectionId: 'prepare',
        heading_ru: 'Подготовка сервера',
        heading_en: 'Preparing the server',
        text_ru:
          'Чистая виртуальная машина у любого провайдера превращается в готовый к деплою сервер за несколько шагов. Порядок важен: сначала безопасность, потом инструменты.\n\n1. Создать непривилегированного пользователя `deploy` и выложить ему SSH-ключ.\n2. Отключить вход по паролю и вход под root.\n3. Настроить фаервол: только 22, 80 и 443.\n4. Установить Docker и добавить `deploy` в группу docker.\n5. Настроить автоматические обновления безопасности.\n\nВажный принцип: всё это должно быть описано скриптом, а не выполнено руками. Через полгода, когда понадобится второй сервер, ты не вспомнишь, что именно делал — а скрипт вспомнит.',
        text_en:
          'A bare VM from any provider becomes a deploy-ready server in a few steps. Order matters: security first, tooling second.\n\n1. Create an unprivileged `deploy` user and install its SSH key.\n2. Disable password login and root login.\n3. Configure the firewall: only 22, 80 and 443.\n4. Install Docker and add `deploy` to the docker group.\n5. Enable automatic security updates.\n\nA key principle: all of this belongs in a script rather than being done by hand. Six months later, when you need a second server, you will not remember what you did — the script will.',
      },
      {
        sectionId: 'envs',
        heading_ru: 'Окружения и секреты',
        heading_en: 'Environments and secrets',
        text_ru:
          'Три окружения, три роли:\n\n• dev — твоя машина. Ломается часто, никого не волнует.\n• staging — копия прода на настоящем сервере, но с тестовыми данными. Здесь проверяют релиз перед выкатом.\n• production — то, что видят пользователи.\n\nОдин и тот же образ едет по всем трём. Различаются только переменные окружения: адрес базы, ключи внешних сервисов, уровень логирования.\n\nСекреты на сервере лежат в файле, который не в git, с правами 600 и владельцем `deploy`. В CI они хранятся в секретах репозитория. Нигде между этими двумя точками секрет не должен появляться в открытом виде — ни в логах, ни в истории команд, ни в аргументах `docker run`, которые видны в `ps aux` любому пользователю системы.',
        text_en:
          'Three environments, three roles:\n\n• dev — your machine. Breaks often, nobody cares.\n• staging — a copy of production on a real server but with test data. This is where a release is verified before shipping.\n• production — what users see.\n\nThe same image travels through all three. Only environment variables differ: the database address, third-party keys, the log level.\n\nSecrets on the server live in a file that is not in git, with mode 600 and owner `deploy`. In CI they live in repository secrets. Between those two points a secret must never appear in the clear — not in logs, not in shell history, and not in `docker run` arguments, which any user of the system can read via `ps aux`.',
        code: '# на сервере\nsudo install -o deploy -g deploy -m 600 /dev/null /srv/shop/.env\nnano /srv/shop/.env\n\n# .env\nDATABASE_URL=postgres://app:***@db:5432/shop\nNODE_ENV=production\nLOG_LEVEL=info',
        codeLang: 'bash',
      },
      {
        sectionId: 'release',
        heading_ru: 'Как выглядит релиз',
        heading_en: 'What a release looks like',
        text_ru:
          'Современный деплой контейнерного приложения — это не копирование файлов по FTP, а четыре команды:\n\n1. Забрать новый образ из реестра (`docker compose pull`).\n2. Выполнить миграции базы, если они есть.\n3. Пересоздать контейнеры с новым образом (`docker compose up -d`).\n4. Проверить healthcheck и убедиться, что приложение отвечает.\n\nКлючевая деталь: тег образа должен быть конкретным. `shop-api:1.4.0` или `shop-api:<sha коммита>`, но никогда не `latest`. Только так можно точно сказать, какая версия сейчас в проде, и вернуться к предыдущей.\n\nВесь этот скрипт запускает пайплайн по SSH — руками на сервер в норме никто не заходит.',
        text_en:
          'A modern container deployment is not FTP file copying but four commands:\n\n1. Pull the new image from the registry (`docker compose pull`).\n2. Run database migrations, if any.\n3. Re-create the containers with the new image (`docker compose up -d`).\n4. Check the healthcheck and confirm the app responds.\n\nThe key detail: the image tag must be specific. `shop-api:1.4.0` or `shop-api:<commit sha>`, never `latest`. Only then can you say exactly which version is in production and return to the previous one.\n\nThe pipeline runs this whole script over SSH — normally nobody logs into the server by hand.',
        code: '#!/usr/bin/env bash\nset -euo pipefail          # падать на первой же ошибке\n\nVERSION="$1"\ncd /srv/shop\n\necho "IMAGE_TAG=$VERSION" > .env.version\ndocker compose pull\ndocker compose run --rm api npm run migrate:up\ndocker compose up -d\n\nfor i in {1..10}; do\n  curl -fs localhost:3000/healthz && exit 0\n  sleep 3\ndone\n\necho "healthcheck не прошёл" >&2\nexit 1',
        codeLang: 'bash',
        codeCaption: 'scripts/deploy.sh',
      },
      {
        sectionId: 'rollback',
        heading_ru: 'Откат за одну команду',
        heading_en: 'Rollback in one command',
        text_ru:
          'Откат должен быть настолько простым, чтобы его не боялись выполнять. Если для возврата нужно «собрать предыдущую версию заново», это не откат, а второй деплой — с теми же рисками и той же длительностью.\n\nПравильный откат — это запуск предыдущего образа, который уже лежит в реестре и уже был проверен. Секунды вместо минут.\n\nЕдинственное, что не откатывается автоматически, — миграции базы. Именно поэтому в прошлом модуле мы разбирали стратегию expand-contract: если новая схема совместима со старым кодом, откат кода безопасен сам по себе.\n\nПравило дежурного: сначала откат, потом расследование. Не наоборот.',
        text_en:
          'A rollback must be simple enough that nobody is afraid to run it. If returning requires "rebuild the previous version", that is not a rollback but a second deploy — with the same risks and the same duration.\n\nA proper rollback runs the previous image, which already sits in the registry and has already been verified. Seconds instead of minutes.\n\nThe one thing that does not roll back automatically is a database migration. That is exactly why the previous module covered expand-contract: when the new schema is compatible with the old code, rolling back the code is safe on its own.\n\nThe on-call rule: roll back first, investigate second. Not the other way round.',
        code: './scripts/deploy.sh 1.3.9    # предыдущая версия уже в реестре\n\n# что сейчас в проде\ndocker compose ps --format "{{.Service}}\\t{{.Image}}"',
        codeLang: 'bash',
      },
      {
        sectionId: 'zerodown',
        heading_ru: 'Деплой без простоя',
        heading_en: 'Zero-downtime deploys',
        text_ru:
          'Простой вариант `docker compose up -d` останавливает старый контейнер и поднимает новый — между этими событиями есть окно в несколько секунд, когда сайт отвечает ошибкой.\n\nЧтобы этого избежать, используют схемы, где старая версия работает, пока новая не готова:\n\n• Rolling update — контейнеры обновляются по одному, трафик идёт на оставшиеся.\n• Blue-green — поднимается полная вторая копия, и трафик переключается мгновенно. Откат — переключение обратно.\n• Canary — новая версия получает 1–5% трафика, и если метрики ошибок растут, выкат останавливается.\n\nВсем трём нужны две вещи: несколько экземпляров приложения и обратный прокси, умеющий переключать трафик. Этим прокси мы займёмся в следующем уроке.',
        text_en:
          'The simple `docker compose up -d` stops the old container and starts the new one — and between those events there is a window of a few seconds when the site returns errors.\n\nTo avoid it, use schemes where the old version keeps serving until the new one is ready:\n\n• Rolling update — containers are replaced one by one while traffic goes to the rest.\n• Blue-green — a full second copy comes up and traffic switches instantly. A rollback is switching back.\n• Canary — the new version takes 1–5% of traffic, and if error metrics rise the rollout stops.\n\nAll three need two things: several instances of the app and a reverse proxy able to switch traffic. That proxy is the next lesson.',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Staging', term_en: 'Staging',
      definition_ru: 'Полная копия прода на настоящем сервере, но с тестовыми данными. Последняя проверка перед выкатом.',
      definition_en: 'A full copy of production on a real server with test data. The last check before shipping.',
    },
    {
      term_ru: 'set -euo pipefail', term_en: 'set -euo pipefail',
      definition_ru: 'Строка в начале bash-скрипта: падать при первой ошибке, при обращении к неизвестной переменной и при сбое внутри пайпа.',
      definition_en: 'A line at the top of a bash script: fail on the first error, on an undefined variable and on a failure inside a pipe.',
    },
    {
      term_ru: 'Blue-green', term_en: 'Blue-green',
      definition_ru: 'Две полные копии приложения; трафик переключается между ними мгновенно, откат — переключение обратно.',
      definition_en: 'Two full copies of the app with instant traffic switching; a rollback is switching back.',
    },
    {
      term_ru: 'Canary', term_en: 'Canary',
      definition_ru: 'Постепенный выкат: новая версия сначала получает несколько процентов трафика.',
      definition_en: 'A gradual rollout: the new version first takes a few percent of traffic.',
    },
    {
      term_ru: 'Health check', term_en: 'Health check',
      definition_ru: 'Эндпоинт вроде /healthz, по которому определяют, действительно ли приложение готово принимать трафик.',
      definition_en: 'An endpoint like /healthz used to decide whether the app is genuinely ready for traffic.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Аргументы `docker run` видны любому пользователю сервера через `ps aux`. Поэтому секреты передают файлом или через env-file, а не флагом в командной строке.',
      text_en: '`docker run` arguments are visible to any user via `ps aux`. That is why secrets go through a file or an env-file, never as a command-line flag.',
    },
    {
      text_ru: 'Без `set -e` bash-скрипт продолжит выполнение после упавшей команды. Деплой «успешно завершится», хотя миграция не прошла.',
      text_en: 'Without `set -e` a bash script keeps going after a failed command. The deploy "succeeds" even though the migration did not run.',
    },
    {
      text_ru: 'Многие команды считают откат нормальной частью рабочего дня, а не аварией. Чем спокойнее относятся к откату, тем чаще решаются деплоить.',
      text_en: 'Many teams treat rollbacks as a normal part of the day, not an emergency. The calmer the attitude to rollback, the more often they dare to deploy.',
    },
  ],

  labs: [
    {
      id: 'lab-deploy-release',
      title_ru: 'Выкати релиз и откати его',
      title_en: 'Ship a release and roll it back',
      brief_ru: 'Версия 1.4.0 собрана и лежит в реестре. Задеплой её, проверь здоровье, обнаружь проблему и вернись на 1.3.9 — как это делает дежурный.',
      brief_en: 'Version 1.4.0 is built and sitting in the registry. Deploy it, check its health, discover the problem and return to 1.3.9 — the way an on-call engineer would.',
      task: {
        kind: 'terminal-simulator',
        prompt: 'deploy@shop-prod:/srv/shop$',
        motd_ru: [
          '# Пайплайн собрал образ shop-api:1.4.0 и запушил его в реестр.',
          '# Сейчас в проде работает 1.3.9. Выкати новую версию и проверь её.',
          '',
        ],
        motd_en: [
          '# The pipeline built shop-api:1.4.0 and pushed it to the registry.',
          '# Production currently runs 1.3.9. Ship the new version and verify it.',
          '',
        ],
        responses: [
          {
            match: 'docker compose ps',
            output: [
              'NAME          IMAGE                STATUS         PORTS',
              'shop-api-1    shop-api:1.3.9       Up 6 days      0.0.0.0:3000->3000/tcp',
              'shop-db-1     postgres:16-alpine   Up 6 days      5432/tcp',
            ],
          },
          {
            match: 'cat scripts/deploy\\.sh',
            regex: true,
            output: [
              '#!/usr/bin/env bash',
              'set -euo pipefail',
              'VERSION="$1"',
              'echo "IMAGE_TAG=$VERSION" > .env.version',
              'docker compose pull',
              'docker compose up -d',
              'for i in {1..10}; do curl -fs localhost:3000/healthz && exit 0; sleep 3; done',
              'exit 1',
            ],
          },
          {
            match: './scripts/deploy\\.sh 1\\.4\\.0',
            regex: true,
            delayMs: 1800,
            output: [
              '+ echo IMAGE_TAG=1.4.0',
              '+ docker compose pull',
              'api Pulling ... done',
              '+ docker compose up -d',
              'Recreating shop-api-1 ... done',
              '+ curl -fs localhost:3000/healthz',
              '{"status":"ok","version":"1.4.0"}',
              '# деплой завершён успешно',
            ],
            sets: ['deployed-140'],
          },
          {
            match: 'curl -s localhost:3000/api/orders',
            requires: 'deployed-140',
            unless: ['[{"id":812,"status":"paid"},{"id":813,"status":"new"}]'],
            delayMs: 600,
            output: [
              '{"error":"column \\"status_v2\\" does not exist"}',
              '# ← новый код ждёт колонку, которой нет: миграцию забыли выполнить',
            ],
            sets: ['found-bug'],
          },
          {
            match: 'docker compose logs --tail 10 api',
            output: [
              'shop-api-1  | 09:41:02 INFO  server listening on 3000',
              'shop-api-1  | 09:41:14 ERROR QueryFailedError: column "status_v2" does not exist',
              'shop-api-1  | 09:41:15 ERROR QueryFailedError: column "status_v2" does not exist',
            ],
          },
          {
            match: './scripts/deploy\\.sh 1\\.3\\.9',
            regex: true,
            delayMs: 1500,
            output: [
              '+ echo IMAGE_TAG=1.3.9',
              '+ docker compose pull',
              'api Pulling ... done (образ уже в кэше)',
              '+ docker compose up -d',
              'Recreating shop-api-1 ... done',
              '+ curl -fs localhost:3000/healthz',
              '{"status":"ok","version":"1.3.9"}',
              '# откат занял 14 секунд — старый образ уже был в реестре',
            ],
            sets: ['rolled-back'],
          },
          {
            match: 'docker compose run --rm api npm run migrate:up',
            delayMs: 1400,
            output: [
              '> migrate:up',
              'Running migration 20260813_add_status_v2.ts ...',
              'ALTER TABLE orders ADD COLUMN status_v2 text;',
              'Migration complete. 1 applied.',
            ],
          },
          {
            match: 'cat \\.env\\.version',
            regex: true,
            output: ['IMAGE_TAG=1.3.9'],
          },
        ],
        goals: [
          { id: 'g1', description_ru: 'Посмотри, какая версия сейчас в проде', description_en: 'See which version production runs now', pattern: '^docker compose ps$' },
          { id: 'g2', description_ru: 'Прочитай скрипт деплоя перед запуском', description_en: 'Read the deploy script before running it', pattern: '^cat scripts/deploy\\.sh$' },
          { id: 'g3', description_ru: 'Выкати версию 1.4.0', description_en: 'Ship version 1.4.0', pattern: '^\\./scripts/deploy\\.sh 1\\.4\\.0$' },
          { id: 'g4', description_ru: 'Проверь реальный эндпоинт, а не только healthcheck', description_en: 'Check a real endpoint, not just the health check', pattern: '^curl -s localhost:3000/api/orders$' },
          { id: 'g5', description_ru: 'Откатись на предыдущую рабочую версию', description_en: 'Roll back to the last working version', pattern: '^\\./scripts/deploy\\.sh 1\\.3\\.9$' },
          { id: 'g6', description_ru: 'Только теперь выполни забытую миграцию', description_en: 'Only now run the forgotten migration', pattern: '^docker compose run --rm api npm run migrate:up$' },
        ],
        suggestions: [
          'docker compose ps',
          'cat scripts/deploy.sh',
          './scripts/deploy.sh 1.4.0',
          'curl -s localhost:3000/api/orders',
          'docker compose logs --tail 10 api',
          './scripts/deploy.sh 1.3.9',
          'docker compose run --rm api npm run migrate:up',
          'cat .env.version',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Healthcheck после деплоя вернул 200, но пользователи жалуются на ошибки. Как это возможно?',
      text_en: 'The post-deploy health check returned 200 but users report errors. How is that possible?',
      options_ru: [
        'Healthcheck всегда врёт',
        'Он проверяет только «процесс жив», а не работоспособность реальных эндпоинтов и запросов к базе',
        'Значит, ошибка на стороне пользователей',
        'Нужно перезапустить nginx',
      ],
      options_en: [
        'Health checks always lie',
        'It only proves "the process is alive", not that real endpoints and database queries work',
        'Then the error is on the users\' side',
        'You need to restart nginx',
      ],
      correctIndex: 1,
      explanation_ru: 'Хороший healthcheck проверяет и зависимости: соединение с базой, доступность очереди. Иначе он подтверждает только то, что процесс запустился.',
      explanation_en: 'A good health check also probes dependencies: the database connection, the queue. Otherwise it only confirms the process started.',
    },
    {
      id: 'q2',
      text_ru: 'Почему откат должен запускать уже собранный образ, а не пересобирать предыдущую версию?',
      text_en: 'Why must a rollback run an already-built image instead of rebuilding the previous version?',
      options_ru: [
        'Пересборка требует лицензии',
        'Пересборка занимает минуты и может дать другой артефакт — а откат должен быть быстрым и предсказуемым',
        'Docker не умеет собирать старые коммиты',
        'Разницы нет',
      ],
      options_en: [
        'Rebuilding requires a license',
        'A rebuild takes minutes and may produce a different artifact — a rollback must be fast and predictable',
        'Docker cannot build old commits',
        'There is no difference',
      ],
      correctIndex: 1,
      explanation_ru: 'Старый образ уже проверен и лежит в реестре. Запуск занимает секунды, и это ровно та версия, которая работала.',
      explanation_en: 'The old image is already verified and sits in the registry. Starting it takes seconds, and it is exactly the version that worked.',
    },
    {
      id: 'q3',
      text_ru: 'Зачем скрипт деплоя начинают со `set -euo pipefail`?',
      text_en: 'Why does a deploy script start with `set -euo pipefail`?',
      options_ru: [
        'Для цветного вывода',
        'Чтобы скрипт останавливался на первой ошибке, а не продолжал деплой после упавшей миграции',
        'Чтобы ускорить выполнение',
        'Это требование Docker',
      ],
      options_en: [
        'For coloured output',
        'So the script stops at the first error instead of continuing the deploy after a failed migration',
        'To make it run faster',
        'Docker requires it',
      ],
      correctIndex: 1,
      explanation_ru: 'По умолчанию bash игнорирует ошибки и идёт дальше. Деплой «успешно завершится», хотя половина шагов провалилась.',
      explanation_en: 'By default bash ignores errors and moves on. The deploy "succeeds" even though half the steps failed.',
    },
    {
      id: 'q4',
      text_ru: 'Что отличает окружение staging от production?',
      text_en: 'What distinguishes staging from production?',
      options_ru: [
        'На staging другая версия кода',
        'Тот же образ и та же конфигурация инфраструктуры, но тестовые данные и отдельные секреты',
        'На staging нет базы данных',
        'Staging работает без Docker',
      ],
      options_en: [
        'Staging runs a different code version',
        'The same image and infrastructure setup, but test data and separate secrets',
        'Staging has no database',
        'Staging runs without Docker',
      ],
      correctIndex: 1,
      explanation_ru: 'Смысл staging в том, чтобы отличий от прода было как можно меньше. Иначе проверка на нём ничего не гарантирует.',
      explanation_en: 'The point of staging is to differ from production as little as possible. Otherwise verifying there guarantees nothing.',
    },
  ],
}
