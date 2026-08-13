import type { DevOpsLesson } from '@/types/devops'

export const devopsPipelineDesign: DevOpsLesson = {
  slug: 'devops-pipeline-design',
  moduleId: 'cicd',
  order: 3,
  icon: '🏗️',
  readTime: 15,

  title_ru: 'Проектирование пайплайна',
  title_en: 'Designing a Pipeline',
  description_ru: 'build → test → deploy → monitor: порядок, ветвления и зависимости сервисов.',
  description_en: 'build → test → deploy → monitor: order, branching and service dependencies.',

  sections: [
    { id: 'order',      title_ru: 'Почему порядок не произволен', title_en: 'Why order is not arbitrary' },
    { id: 'branching',  title_ru: 'Ветвления: план на случай сбоя', title_en: 'Branching: a plan for failure' },
    { id: 'deps',       title_ru: 'Зависимости между сервисами',   title_en: 'Dependencies between services' },
    { id: 'migrations', title_ru: 'Миграции — самое опасное место', title_en: 'Migrations — the most dangerous part' },
    { id: 'key-terms',  title_ru: 'Ключевые термины',              title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Ты уже собирал линейный пайплайн. Реальность сложнее: сервисов несколько, у них есть зависимости, а любой шаг может упасть. Этот урок — про то, как спроектировать пайплайн, который не сломает прод в момент выката.',
    intro_en:
      'You have already assembled a linear pipeline. Reality is messier: there are several services, they depend on each other, and any step can fail. This lesson is about designing a pipeline that does not break production at the moment of shipping.',

    blocks: [
      {
        sectionId: 'order',
        heading_ru: 'Почему порядок не произволен',
        heading_en: 'Why order is not arbitrary',
        text_ru:
          'Каждый шаг пайплайна потребляет результат предыдущего. Тесты проверяют собранный артефакт, деплой отправляет проверенный артефакт, мониторинг наблюдает за задеплоенным приложением. Разорвёшь цепочку — шаг потеряет смысл.\n\nВторой принцип — fail fast. Внутри группы проверок первыми ставят самые быстрые: линтер отрабатывает за 5 секунд, юнит-тесты за минуту, e2e-тесты за десять. Нет смысла тратить десять минут на e2e, если код не проходит линтер.\n\nТретий — параллелить всё, что независимо. Линтер, типы и юнит-тесты не мешают друг другу, поэтому запускаются одновременно и экономят минуты на каждом pull request.',
        text_en:
          'Every pipeline step consumes the result of the previous one. Tests check the built artifact, the deploy ships the verified artifact, monitoring watches the deployed app. Break the chain and a step loses its meaning.\n\nThe second principle is fail fast. Inside a group of checks, the fastest go first: linting takes 5 seconds, unit tests a minute, e2e tests ten. There is no point spending ten minutes on e2e when the code does not even lint.\n\nThe third is parallelise everything independent. Linting, type-checking and unit tests do not interfere, so they run at once and save minutes on every pull request.',
      },
      {
        sectionId: 'branching',
        heading_ru: 'Ветвления: план на случай сбоя',
        heading_en: 'Branching: a plan for failure',
        text_ru:
          'Хороший пайплайн описывает не только счастливый путь, но и что делать на каждом падении.\n\n• Упал линтер или тесты — остановка. Ничего не деплоим, PR нельзя смёржить.\n• Упала сборка образа — остановка и уведомление: скорее всего, проблема в зависимостях или в самом Dockerfile.\n• Не поднялся healthcheck после деплоя — автоматический откат. Это единственная ветка, где нужно действовать без человека: каждая минута — это минута нерабочего сайта.\n• Отвалилось скачивание зависимостей из реестра — вот здесь retry уместен, потому что причина внешняя и временная.\n\nГлавное правило: retry применяют к нестабильной инфраструктуре, а не к упавшим проверкам. Повтор теста, который поймал баг, — это способ выкатить баг в прод.',
        text_en:
          'A good pipeline describes not only the happy path but what to do at each failure.\n\n• Lint or tests failed — stop. Nothing is deployed, the PR cannot be merged.\n• The image build failed — stop and notify: it is usually dependencies or the Dockerfile itself.\n• The health check did not pass after the deploy — automatic rollback. This is the one branch that must act without a human: every minute is a minute of a broken site.\n• Dependency download from the registry failed — here a retry is appropriate, because the cause is external and temporary.\n\nThe main rule: retries belong to flaky infrastructure, not to failed checks. Retrying a test that caught a bug is a way to ship that bug.',
      },
      {
        sectionId: 'deps',
        heading_ru: 'Зависимости между сервисами',
        heading_en: 'Dependencies between services',
        text_ru:
          'Когда сервисов несколько, единственно правильного линейного порядка уже не существует — существует граф зависимостей. Часть шагов можно менять местами, а часть нельзя ни при каких условиях.\n\nТипичные жёсткие зависимости:\n• Миграция базы — до деплоя backend, который эту схему использует.\n• Backend — до frontend, если новый интерфейс обращается к новым эндпоинтам.\n• Smoke-тесты — после того, как поднялись оба сервиса.\n• Мониторинг — всегда последним: он наблюдает за итоговым состоянием.\n\nА вот сборка frontend и сборка backend друг от друга не зависят — их запускают параллельно.\n\nПрактический приём: если не уверен в порядке, задай вопрос «что сломается, если поменять местами?». Если ответ «ничего» — шаги независимы.',
        text_en:
          'With several services there is no single correct linear order any more — there is a dependency graph. Some steps can swap places, others can never do so.\n\nTypical hard dependencies:\n• The database migration comes before deploying the backend that uses the new schema.\n• The backend comes before the frontend when the new UI calls new endpoints.\n• Smoke tests come after both services are up.\n• Monitoring always comes last: it observes the final state.\n\nBuilding the frontend and building the backend, on the other hand, do not depend on each other — run them in parallel.\n\nA practical trick: when unsure about the order, ask "what breaks if I swap them?". If the answer is "nothing", the steps are independent.',
      },
      {
        sectionId: 'migrations',
        heading_ru: 'Миграции — самое опасное место',
        heading_en: 'Migrations — the most dangerous part',
        text_ru:
          'Код откатывается одной командой. База — нет. Поэтому миграции требуют отдельной дисциплины.\n\nЗолотое правило: миграция должна быть совместима и со старой, и с новой версией кода. В момент выката в проде одновременно живут обе версии — старые контейнеры ещё дорабатывают запросы, новые уже принимают трафик.\n\nОтсюда практика «расширяй, потом сужай»:\n1. Добавь новую колонку, оставив старую. Обе версии кода работают.\n2. Задеплой код, который пишет в обе колонки и читает из новой.\n3. Перенеси данные.\n4. И только следующим релизом удали старую колонку.\n\nДолго? Да. Зато откат на любом шаге безопасен. Удалить колонку в том же релизе, где обновляется код, — верный способ получить неоткатываемую аварию.',
        text_en:
          'Code rolls back with one command. A database does not. So migrations demand their own discipline.\n\nThe golden rule: a migration must be compatible with both the old and the new version of the code. During a rollout both versions live in production at once — old containers are still finishing requests while new ones already take traffic.\n\nHence the expand-then-contract practice:\n1. Add the new column, keep the old one. Both code versions work.\n2. Deploy code that writes to both columns and reads from the new one.\n3. Backfill the data.\n4. Only in a later release, drop the old column.\n\nSlow? Yes. But a rollback is safe at every step. Dropping a column in the same release that updates the code is a reliable way to create an un-rollbackable outage.',
        code: '# ✅ безопасно, в четыре релиза\nALTER TABLE orders ADD COLUMN status_v2 text;\n-- деплой кода, пишущего в обе колонки\nUPDATE orders SET status_v2 = status WHERE status_v2 IS NULL;\n-- следующий релиз:\nALTER TABLE orders DROP COLUMN status;\n\n# ❌ откатить это уже нельзя\nALTER TABLE orders DROP COLUMN status;',
        codeLang: 'bash',
        codeCaption: 'expand → migrate → contract',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Fail fast', term_en: 'Fail fast',
      definition_ru: 'Принцип: самые быстрые и дешёвые проверки идут первыми, чтобы отсечь плохой код раньше.',
      definition_en: 'The principle of running the fastest, cheapest checks first so bad code is cut off earlier.',
    },
    {
      term_ru: 'Граф зависимостей', term_en: 'Dependency graph',
      definition_ru: 'Описание того, какие шаги обязаны идти раньше других, а какие независимы и могут выполняться параллельно.',
      definition_en: 'A description of which steps must precede others and which are independent and can run in parallel.',
    },
    {
      term_ru: 'Smoke-тест', term_en: 'Smoke test',
      definition_ru: 'Быстрая проверка после деплоя: отвечает ли приложение и работают ли ключевые сценарии.',
      definition_en: 'A quick post-deploy check: does the app respond and do the key flows work.',
    },
    {
      term_ru: 'Expand-contract', term_en: 'Expand-contract',
      definition_ru: 'Стратегия миграций: сначала добавить новое, не удаляя старое, и удалить старое только через несколько релизов.',
      definition_en: 'A migration strategy: add the new without removing the old, and drop the old only several releases later.',
    },
    {
      term_ru: 'Автоматический откат', term_en: 'Automatic rollback',
      definition_ru: 'Возврат на предыдущую версию без участия человека, когда проверка здоровья после деплоя не прошла.',
      definition_en: 'Returning to the previous version without human input when the post-deploy health check fails.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В большинстве крупных сервисов миграции базы вообще не выполняются пайплайном автоматически — их запускает человек отдельным шагом с подтверждением.',
      text_en: 'In most large services database migrations are not run automatically by the pipeline at all — a human triggers them as a separate approved step.',
    },
    {
      text_ru: 'Blue-green деплой держит две копии приложения и переключает трафик мгновенно. Откат в такой схеме — это переключение маршрута обратно, то есть секунды.',
      text_en: 'A blue-green deploy keeps two copies of the app and switches traffic instantly. A rollback there is just flipping the route back — seconds.',
    },
    {
      text_ru: 'Канареечный деплой отправляет новую версию сначала 1% пользователей. Если метрики ошибок растут — выкат останавливается автоматически.',
      text_en: 'A canary deploy sends the new version to 1% of users first. If the error metrics rise, the rollout stops automatically.',
    },
  ],

  labs: [
    {
      id: 'lab-pipeline-master',
      title_ru: 'Три уровня проектирования пайплайна',
      title_en: 'Three levels of pipeline design',
      brief_ru: 'Пройди все три уровня: линейный порядок, ветвления при сбоях и граф зависимостей трёх сервисов. На третьем уровне правильных порядков несколько — важно не нарушить зависимости.',
      brief_en: 'Clear all three levels: linear order, failure branching and a three-service dependency graph. On level three several orders are correct — what matters is not violating the dependencies.',
      task: {
        kind: 'pipeline-builder',
        levels: [
          {
            level: 'basic',
            title_ru: 'Линейный порядок',
            title_en: 'Linear order',
            goal_ru: 'Разминка: расставь пять этапов одного сервиса в единственно верном порядке.',
            goal_en: 'A warm-up: order the five stages of a single service the only correct way.',
            stages: [
              { id: 'checkout', kind: 'checkout', label_ru: 'Забрать код',   label_en: 'Checkout',    command: 'git checkout $SHA' },
              { id: 'build',    kind: 'build',    label_ru: 'Сборка',        label_en: 'Build',       command: 'docker build -t api:$SHA .' },
              { id: 'test',     kind: 'test',     label_ru: 'Тесты',         label_en: 'Test',        command: 'npm test' },
              { id: 'deploy',   kind: 'deploy',   label_ru: 'Деплой',        label_en: 'Deploy',      command: './deploy.sh' },
              { id: 'monitor',  kind: 'monitor',  label_ru: 'Мониторинг',    label_en: 'Monitor',     command: 'watch /healthz' },
            ],
            solution: ['checkout', 'build', 'test', 'deploy', 'monitor'],
            hint_ru: 'Каждый шаг потребляет результат предыдущего. Спроси себя: что нужно этому шагу на входе?',
            hint_en: 'Every step consumes the previous result. Ask yourself: what does this step need as input?',
            explanation_ru: 'Классическая цепочка. Дальше она усложнится, но принцип «шаг потребляет результат предыдущего» останется тем же.',
            explanation_en: 'The classic chain. It will get more complex, but the principle "a step consumes the previous result" stays the same.',
          },
          {
            level: 'branching',
            title_ru: 'Ветвления при сбоях',
            title_en: 'Failure branching',
            goal_ru: 'Добавь ручное подтверждение перед продом и уведомление в конце. Затем ответь, что пайплайн должен делать в двух аварийных ситуациях.',
            goal_en: 'Add a manual approval before production and a notification at the end. Then decide what the pipeline must do in two failure situations.',
            stages: [
              { id: 'build',    kind: 'build',    label_ru: 'Сборка образа',      label_en: 'Build image',       command: 'docker build .' },
              { id: 'test',     kind: 'test',     label_ru: 'Тесты',              label_en: 'Test',              command: 'npm test' },
              { id: 'approve',  kind: 'approve',  label_ru: 'Подтверждение релиза', label_en: 'Release approval', command: 'environment: production' },
              { id: 'deploy',   kind: 'deploy',   label_ru: 'Деплой в прод',      label_en: 'Deploy to prod',    command: './deploy.sh production' },
              { id: 'monitor',  kind: 'monitor',  label_ru: 'Проверка здоровья',  label_en: 'Health check',      command: 'curl -f /healthz' },
              { id: 'notify',   kind: 'notify',   label_ru: 'Уведомление',        label_en: 'Notify',            command: 'slack-notify $STATUS' },
            ],
            solution: ['build', 'test', 'approve', 'deploy', 'monitor', 'notify'],
            branches: [
              {
                id: 'b-deps',
                stageId: 'build',
                condition_ru: 'npm registry вернул 503 при установке зависимостей',
                condition_en: 'the npm registry returned 503 while installing dependencies',
                question_ru: 'Сборка упала не из-за кода, а из-за недоступного реестра. Что делать?',
                question_en: 'The build failed not because of the code but because the registry was unreachable. What now?',
                options: [
                  {
                    id: 'retry',
                    label_ru: 'Повторить шаг автоматически (2–3 попытки с задержкой)',
                    label_en: 'Retry the step automatically (2–3 attempts with a delay)',
                    correct: true,
                    feedback_ru: 'Верно. Это тот редкий случай, когда retry уместен: причина внешняя и временная, код здесь ни при чём.',
                    feedback_en: 'Correct. This is the rare case where a retry belongs: the cause is external and temporary, the code is fine.',
                  },
                  {
                    id: 'ignore',
                    label_ru: 'Пропустить установку зависимостей и продолжить',
                    label_en: 'Skip the dependency install and continue',
                    correct: false,
                    feedback_ru: 'Нет. Без зависимостей ни тесты, ни сборка не имеют смысла — упадёт следующий шаг, только позже.',
                    feedback_en: 'No. Without dependencies neither tests nor the build make sense — the next step fails anyway, just later.',
                  },
                  {
                    id: 'rollback',
                    label_ru: 'Откатить прод на предыдущую версию',
                    label_en: 'Roll production back to the previous version',
                    correct: false,
                    feedback_ru: 'Нет. В прод ещё ничего не уехало — откатывать нечего. Откат нужен после неудачного деплоя, а не после неудачной сборки.',
                    feedback_en: 'No. Nothing shipped to production yet — there is nothing to roll back. Rollback follows a failed deploy, not a failed build.',
                  },
                ],
              },
              {
                id: 'b-health',
                stageId: 'monitor',
                condition_ru: 'healthcheck возвращает 500 три минуты подряд после деплоя',
                condition_en: 'the health check returns 500 for three minutes straight after the deploy',
                question_ru: 'Новая версия уехала в прод и не отвечает. Что должно произойти?',
                question_en: 'The new version shipped and does not respond. What must happen?',
                options: [
                  {
                    id: 'auto-rollback',
                    label_ru: 'Автоматический откат на предыдущий образ и уведомление команды',
                    label_en: 'Automatic rollback to the previous image plus a team notification',
                    correct: true,
                    feedback_ru: 'Верно. Сначала возвращаем рабочий сайт пользователям, разбираемся потом. Время восстановления важнее скорости диагностики.',
                    feedback_en: 'Correct. First give users a working site, investigate afterwards. Time to restore matters more than diagnosis speed.',
                  },
                  {
                    id: 'debug-live',
                    label_ru: 'Зайти на сервер и чинить прямо в проде',
                    label_en: 'SSH into the server and fix it live in production',
                    correct: false,
                    feedback_ru: 'Нет. Правки руками на живом сервере не воспроизводимы и потеряются при следующем деплое. И всё это время сайт лежит.',
                    feedback_en: 'No. Hand edits on a live server are not reproducible and vanish on the next deploy. Meanwhile the site stays down.',
                  },
                  {
                    id: 'nothing',
                    label_ru: 'Ничего: подождать, вдруг само поднимется',
                    label_en: 'Nothing: wait and see whether it recovers',
                    correct: false,
                    feedback_ru: 'Нет. Три минуты пятисоток — это уже инцидент. Ожидание увеличивает единственную метрику, которую нельзя увеличивать.',
                    feedback_en: 'No. Three minutes of 500s is already an incident. Waiting inflates the one metric you must not inflate.',
                  },
                ],
              },
            ],
            hint_ru: 'Подтверждение имеет смысл только между проверенным артефактом и продом. Уведомление о результате — всегда в самом конце.',
            hint_en: 'An approval only makes sense between a verified artifact and production. The result notification always comes last.',
            explanation_ru: 'Ты собрал пайплайн с человеком в контуре: автоматика делает всё, кроме решения выкатывать. И у каждого сбоя есть заранее описанная реакция — retry для внешних причин, откат для сломанного релиза.',
            explanation_en: 'You built a pipeline with a human in the loop: automation does everything except deciding to ship. And every failure has a predefined reaction — retry for external causes, rollback for a broken release.',
          },
          {
            level: 'advanced',
            title_ru: 'Три сервиса и зависимости',
            title_en: 'Three services and their dependencies',
            goal_ru: 'Выкатываем релиз из трёх частей: база, backend и frontend. Правильных порядков здесь несколько — независимые шаги можно менять местами. Но жёсткие зависимости нарушать нельзя: backend не задеплоить раньше миграции, а frontend — раньше backend, эндпоинтов которого он ждёт. Один этап в списке лишний: подумай, какой.',
            goal_en: 'Ship a three-part release: database, backend and frontend. Several orders are correct here — independent steps can swap places. But hard dependencies cannot be violated: the backend cannot ship before the migration, and the frontend cannot ship before the backend whose endpoints it needs. One stage in the tray does not belong: work out which.',
            stages: [
              { id: 'build-back',  kind: 'build',    service: 'backend',  label_ru: 'Сборка backend',    label_en: 'Build backend',    command: 'docker build -t api:$SHA ./api' },
              { id: 'build-front', kind: 'build',    service: 'frontend', label_ru: 'Сборка frontend',   label_en: 'Build frontend',   command: 'npm run build' },
              { id: 'migrate',     kind: 'migrate',  service: 'db',       label_ru: 'Миграция БД',       label_en: 'DB migration',     command: 'npm run migrate:up' },
              { id: 'deploy-back', kind: 'deploy',   service: 'backend',  label_ru: 'Деплой backend',    label_en: 'Deploy backend',   command: './deploy.sh api' },
              { id: 'deploy-front',kind: 'deploy',   service: 'frontend', label_ru: 'Деплой frontend',   label_en: 'Deploy frontend',  command: './deploy.sh web' },
              { id: 'smoke',       kind: 'test',     service: 'e2e',      label_ru: 'Smoke-тесты',       label_en: 'Smoke tests',      command: 'npm run test:smoke' },
              { id: 'monitor',     kind: 'monitor',  label_ru: 'Мониторинг релиза',                      label_en: 'Release monitoring', command: 'watch error_rate' },
              { id: 'rollback',    kind: 'rollback', label_ru: 'Откат релиза',      label_en: 'Rollback release', command: './rollback.sh' },
            ],
            rules: [
              { id: 'r-req-1', type: 'required', stageId: 'build-back',   message_ru: 'Без сборки backend деплоить нечего.', message_en: 'With no backend build there is nothing to deploy.' },
              { id: 'r-req-2', type: 'required', stageId: 'build-front',  message_ru: 'Без сборки frontend деплоить нечего.', message_en: 'With no frontend build there is nothing to deploy.' },
              { id: 'r-req-3', type: 'required', stageId: 'migrate',      message_ru: 'Схема БД должна быть обновлена — иначе новый backend не найдёт нужных колонок.', message_en: 'The database schema must be updated — otherwise the new backend will not find the columns it needs.' },
              { id: 'r-req-4', type: 'required', stageId: 'deploy-back',  message_ru: 'Backend нужно задеплоить.', message_en: 'The backend has to be deployed.' },
              { id: 'r-req-5', type: 'required', stageId: 'deploy-front', message_ru: 'Frontend нужно задеплоить.', message_en: 'The frontend has to be deployed.' },
              { id: 'r-req-6', type: 'required', stageId: 'smoke',        message_ru: 'После выката нужно убедиться, что ключевые сценарии работают.', message_en: 'After the rollout you must confirm the key flows still work.' },
              { id: 'r-req-7', type: 'required', stageId: 'monitor',      message_ru: 'Релиз без наблюдения — это выкат вслепую.', message_en: 'A release with no observation is shipping blind.' },
              {
                id: 'r-forbid-rollback', type: 'forbidden', stageId: 'rollback',
                message_ru: 'Откат — не этап штатного пайплайна. Это ветка, которая запускается по условию, когда что-то пошло не так.',
                message_en: 'Rollback is not a step of the happy path. It is a conditional branch that fires when something goes wrong.',
              },
              {
                id: 'r-migrate-back', type: 'before', stageId: 'migrate', otherStageId: 'deploy-back',
                message_ru: 'Нельзя задеплоить backend раньше миграции БД: новый код обратится к колонкам, которых ещё нет, и упадёт на первом же запросе.',
                message_en: 'The backend cannot ship before the DB migration: the new code would query columns that do not exist yet and die on the first request.',
              },
              {
                id: 'r-build-migrate', type: 'before', stageId: 'build-back', otherStageId: 'migrate',
                message_ru: 'Скрипт миграции едет внутри артефакта backend — сначала собери его.',
                message_en: 'The migration script travels inside the backend artifact — build it first.',
              },
              {
                id: 'r-back-front', type: 'before', stageId: 'deploy-back', otherStageId: 'deploy-front',
                message_ru: 'Frontend вызывает новые эндпоинты API. Если выкатить его раньше backend, пользователи получат 404 на каждое действие.',
                message_en: 'The frontend calls new API endpoints. Ship it before the backend and users get a 404 on every action.',
              },
              {
                id: 'r-buildfront-deployfront', type: 'before', stageId: 'build-front', otherStageId: 'deploy-front',
                message_ru: 'Собери frontend прежде, чем его деплоить.',
                message_en: 'Build the frontend before deploying it.',
              },
              {
                id: 'r-smoke-after', type: 'before', stageId: 'deploy-front', otherStageId: 'smoke',
                message_ru: 'Smoke-тесты проверяют систему целиком — они имеют смысл только после того, как поднялись оба сервиса.',
                message_en: 'Smoke tests exercise the whole system — they only make sense once both services are up.',
              },
              {
                id: 'r-monitor-last', type: 'last', stageId: 'monitor',
                message_ru: 'Мониторинг всегда завершает пайплайн: он наблюдает за итоговым состоянием релиза.',
                message_en: 'Monitoring always ends the pipeline: it observes the final state of the release.',
              },
            ],
            hint_ru: 'Сборки frontend и backend независимы — их можно ставить в любом порядке относительно друг друга. Жёстких зависимостей всего четыре: сборка backend → миграция → деплой backend → деплой frontend. И один этап сюда вообще не относится.',
            hint_en: 'The frontend and backend builds are independent — their relative order does not matter. There are only four hard dependencies: build backend → migrate → deploy backend → deploy frontend. And one stage does not belong here at all.',
            explanation_ru: 'Именно так выглядит реальный релиз: не линия, а граф. Независимые сборки идут параллельно, а цепочка «миграция → backend → frontend» нерушима, потому что каждое звено использует результат предыдущего. Откат остался в трее — он живёт в условной ветке, а не в основном потоке.',
            explanation_en: 'This is what a real release looks like: a graph, not a line. Independent builds run in parallel, while the migration → backend → frontend chain is unbreakable because each link consumes the previous result. Rollback stayed in the tray — it lives in a conditional branch, not in the main flow.',
          },
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Почему миграцию базы выполняют до деплоя backend, а не после?',
      text_en: 'Why is the database migration run before deploying the backend rather than after?',
      options_ru: [
        'Миграции всегда быстрее деплоя',
        'Новый код рассчитывает на новую схему: без миграции он упадёт на первом же запросе к отсутствующей колонке',
        'Так требует Docker',
        'Чтобы сэкономить минуты раннера',
      ],
      options_en: [
        'Migrations are always faster than deploys',
        'The new code expects the new schema: without the migration it dies on the first query to a missing column',
        'Docker requires it',
        'To save runner minutes',
      ],
      correctIndex: 1,
      explanation_ru: 'Зависимость направленная: код зависит от схемы, а не наоборот. Поэтому схему готовят заранее.',
      explanation_en: 'The dependency is directional: the code depends on the schema, not the other way round. So the schema is prepared first.',
    },
    {
      id: 'q2',
      text_ru: 'В каком случае автоматический retry шага оправдан?',
      text_en: 'When is an automatic step retry justified?',
      options_ru: [
        'Когда упали юнит-тесты',
        'Когда внешний реестр вернул 503 при скачивании зависимостей',
        'Когда упал линтер',
        'Retry оправдан всегда',
      ],
      options_en: [
        'When unit tests failed',
        'When an external registry returned 503 while downloading dependencies',
        'When the linter failed',
        'A retry is always justified',
      ],
      correctIndex: 1,
      explanation_ru: 'Retry лечит нестабильную инфраструктуру. Упавшая проверка — это найденный баг, и повторять её значит прятать его.',
      explanation_en: 'Retries cure flaky infrastructure. A failed check is a found bug, and retrying it means hiding it.',
    },
    {
      id: 'q3',
      text_ru: 'Что означает стратегия миграций expand-contract?',
      text_en: 'What does the expand-contract migration strategy mean?',
      options_ru: [
        'Сначала удалить старое, потом добавить новое',
        'Сначала добавить новое, не трогая старое, а старое удалить только через несколько релизов',
        'Выполнять миграции только ночью',
        'Хранить две базы одновременно',
      ],
      options_en: [
        'Remove the old first, then add the new',
        'Add the new without touching the old, and drop the old only several releases later',
        'Run migrations only at night',
        'Keep two databases at once',
      ],
      correctIndex: 1,
      explanation_ru: 'Во время выката в проде одновременно работают обе версии кода. Схема обязана быть совместимой с обеими — иначе откат невозможен.',
      explanation_en: 'During a rollout both code versions run in production at once. The schema must be compatible with both — otherwise a rollback is impossible.',
    },
    {
      id: 'q4',
      text_ru: 'Сборка frontend и сборка backend — как их правильно запускать?',
      text_en: 'The frontend build and the backend build — how should they run?',
      options_ru: [
        'Строго последовательно: сначала backend, потом frontend',
        'Параллельно: они не зависят друг от друга',
        'Только вручную',
        'В одной джобе на одной машине',
      ],
      options_en: [
        'Strictly sequentially: backend first, then frontend',
        'In parallel: they do not depend on each other',
        'Manually only',
        'In one job on one machine',
      ],
      correctIndex: 1,
      explanation_ru: 'Параллелить нужно всё независимое. Зависимость появляется только на этапе деплоя: frontend ждёт новых эндпоинтов backend.',
      explanation_en: 'Everything independent should be parallel. The dependency appears only at deploy time: the frontend waits for the backend\'s new endpoints.',
    },
  ],
}
