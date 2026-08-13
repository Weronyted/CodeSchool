import type { DevOpsLesson } from '@/types/devops'

export const devopsCicdBasics: DevOpsLesson = {
  slug: 'devops-cicd-basics',
  moduleId: 'cicd',
  order: 1,
  icon: '🔁',
  readTime: 12,

  title_ru: 'Что такое CI/CD',
  title_en: 'What is CI/CD',
  description_ru: 'Непрерывная интеграция и доставка: зачем автоматизировать то, что делаешь руками.',
  description_en: 'Continuous integration and delivery: why automate what you do by hand.',

  sections: [
    { id: 'ci',        title_ru: 'CI — непрерывная интеграция', title_en: 'CI — continuous integration' },
    { id: 'cd',        title_ru: 'CD — доставка и развёртывание', title_en: 'CD — delivery and deployment' },
    { id: 'artifact',  title_ru: 'Артефакт: собрать один раз',  title_en: 'The artifact: build once' },
    { id: 'failure',   title_ru: 'Что делать, когда упало',     title_en: 'What to do when it fails' },
    { id: 'key-terms', title_ru: 'Ключевые термины',            title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'CI/CD — это про то, чтобы между «я закоммитил» и «пользователь увидел» не было ни одного ручного шага. Не потому что лень, а потому что ручные шаги невоспроизводимы: человек устаёт, торопится и пропускает пункты чек-листа именно тогда, когда это дороже всего.',
    intro_en:
      'CI/CD is about having zero manual steps between "I committed" and "the user sees it". Not out of laziness, but because manual steps are not reproducible: people get tired, rush, and skip checklist items exactly when it costs the most.',

    blocks: [
      {
        sectionId: 'ci',
        heading_ru: 'CI — непрерывная интеграция',
        heading_en: 'CI — continuous integration',
        text_ru:
          'Идея простая: каждое изменение автоматически собирается и проверяется сразу после пуша, а не раз в неделю перед релизом.\n\nЗачем: чем раньше найдена ошибка, тем дешевле она стоит. Баг, пойманный через 3 минуты после пуша, чинится за 5 минут — ты ещё помнишь контекст. Тот же баг, найденный пользователем через две недели, обойдётся в разбор логов, воспроизведение, хотфикс и извинения.\n\nМинимальный CI выглядит так: установить зависимости → проверить линтером → запустить тесты → собрать. Если что-то из этого упало — pull request нельзя смёржить. Это и есть главный смысл: сломанный код физически не попадает в main.',
        text_en:
          'The idea is simple: every change is built and checked automatically right after the push, not once a week before a release.\n\nWhy: the earlier a bug is found, the cheaper it is. A bug caught 3 minutes after the push takes 5 minutes to fix — you still remember the context. The same bug found by a user two weeks later costs log digging, reproduction, a hotfix and an apology.\n\nA minimal CI looks like: install dependencies → lint → run tests → build. If any of those fail, the pull request cannot be merged. That is the whole point: broken code physically cannot reach main.',
      },
      {
        sectionId: 'cd',
        heading_ru: 'CD — доставка и развёртывание',
        heading_en: 'CD — delivery and deployment',
        text_ru:
          'Под аббревиатурой CD скрываются два разных подхода, и их постоянно путают.\n\nContinuous Delivery — пайплайн доводит изменение до состояния «готово к деплою» и останавливается. Кнопку выката нажимает человек. Так работает большинство команд: автоматика делает всё, кроме финального решения.\n\nContinuous Deployment — деплой происходит автоматически, без человека, как только все проверки зелёные. Это требует высокой зрелости: надёжных тестов, мониторинга и мгновенного отката.\n\nПрактический совет: начинай с Delivery. Автоматический деплой без хорошего мониторинга — это способ узнавать о поломках от пользователей.',
        text_en:
          'Two different approaches hide behind CD, and they are constantly confused.\n\nContinuous Delivery — the pipeline takes a change to the "ready to deploy" state and stops. A human presses the deploy button. This is how most teams work: automation does everything except the final decision.\n\nContinuous Deployment — the deploy happens automatically, with no human, as soon as every check is green. That demands maturity: reliable tests, monitoring and instant rollback.\n\nPractical advice: start with Delivery. Automatic deployment without solid monitoring is a way to learn about breakages from your users.',
      },
      {
        sectionId: 'artifact',
        heading_ru: 'Артефакт: собрать один раз',
        heading_en: 'The artifact: build once',
        text_ru:
          'Ключевое правило CI/CD: build once, deploy many. Приложение собирается ровно один раз, и получившийся артефакт (обычно docker-образ) едет сначала на staging, потом в прод.\n\nПочему нельзя пересобирать под каждое окружение: сборка не детерминирована. Обновилась минорная версия зависимости, изменился базовый образ, поменялась дата — и в прод уезжает не то, что вы тестировали на staging. Тесты прошли на одном артефакте, а пользователи получили другой.\n\nПоэтому окружения различаются только переменными и секретами, но не содержимым образа.',
        text_en:
          'The key CI/CD rule: build once, deploy many. The application is built exactly once, and the resulting artifact (usually a docker image) goes first to staging, then to production.\n\nWhy you must not rebuild per environment: builds are not deterministic. A dependency picked up a minor update, the base image changed, the date moved — and production receives something other than what you tested on staging. Tests passed on one artifact and users got another.\n\nSo environments differ only by variables and secrets, never by image content.',
        code: '# ✅ правильно\nbuild → образ shop-api:1.4.0 → staging → prod\n\n# ❌ неправильно\nbuild → staging\nbuild ещё раз → prod   # это уже другой образ',
        codeLang: 'bash',
      },
      {
        sectionId: 'failure',
        heading_ru: 'Что делать, когда упало',
        heading_en: 'What to do when it fails',
        text_ru:
          'Пайплайн падает регулярно — это нормально, для этого он и нужен. Важно, на каком шаге и что происходит дальше.\n\nУпали тесты — пайплайн останавливается. Дальше идти бессмысленно: деплоить непроверенный код хуже, чем не деплоить вовсе. Автоматический повтор (retry) здесь вреден: он маскирует настоящую ошибку. Повтор оправдан только для нестабильных внешних шагов — скачивания зависимостей, обращения к чужому API.\n\nУпал деплой или сервис не поднялся — нужен откат на предыдущую рабочую версию, причём автоматический. Разбираться в причинах будешь потом, а пользователи должны видеть работающий сайт сейчас. Именно это отличает зрелую команду: не «никогда не падаем», а «возвращаемся за минуту».',
        text_en:
          'Pipelines fail regularly — that is normal, that is their job. What matters is which step failed and what happens next.\n\nTests failed — the pipeline stops. Going further is pointless: deploying unverified code is worse than not deploying. An automatic retry here is harmful: it masks a real bug. Retries are only justified for flaky external steps — dependency downloads, third-party API calls.\n\nThe deploy failed or the service did not come up — you need a rollback to the last working version, and an automatic one. You will investigate later; users must see a working site now. This is what separates a mature team: not "we never fail" but "we are back in a minute".',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'CI (Continuous Integration)', term_en: 'CI (Continuous Integration)',
      definition_ru: 'Автоматическая сборка и проверка каждого изменения сразу после пуша.',
      definition_en: 'Automatically building and checking every change right after the push.',
    },
    {
      term_ru: 'Continuous Delivery', term_en: 'Continuous Delivery',
      definition_ru: 'Пайплайн доводит изменение до готовности к деплою, финальное решение принимает человек.',
      definition_en: 'The pipeline gets a change ready to deploy; a human makes the final call.',
    },
    {
      term_ru: 'Continuous Deployment', term_en: 'Continuous Deployment',
      definition_ru: 'Деплой в прод происходит автоматически, если все проверки зелёные.',
      definition_en: 'Deployment to production happens automatically when every check is green.',
    },
    {
      term_ru: 'Артефакт', term_en: 'Artifact',
      definition_ru: 'Результат сборки, который едет по окружениям без пересборки. Обычно docker-образ.',
      definition_en: 'The build result that travels across environments without being rebuilt. Usually a docker image.',
    },
    {
      term_ru: 'Staging', term_en: 'Staging',
      definition_ru: 'Копия прода для финальной проверки перед выкатом на пользователей.',
      definition_en: 'A production-like environment for the final check before shipping to users.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Термин «непрерывная интеграция» ввёл Гради Буч в 1991 году — за десятилетие до того, как появились инструменты, способные это делать.',
      text_en: 'The term "continuous integration" was coined by Grady Booch in 1991 — a decade before tools capable of doing it existed.',
    },
    {
      text_ru: 'Правило «зелёный main важнее новой фичи» родилось в Google: если сборка сломана, вся команда бросает задачи и чинит её.',
      text_en: 'The rule "a green main beats a new feature" came from Google: if the build is broken, the whole team drops everything and fixes it.',
    },
    {
      text_ru: 'Автоматический retry упавших тестов — самая частая причина того, что баг доезжает до прода. Нестабильный тест почти всегда указывает на настоящую гонку в коде.',
      text_en: 'Automatically retrying failed tests is the most common reason a bug reaches production. A flaky test almost always points at a real race in the code.',
    },
  ],

  labs: [
    {
      id: 'lab-cicd-flow',
      title_ru: 'От пуша до пользователя',
      title_en: 'From push to user',
      brief_ru: 'Сначала собери базовый пайплайн с проверками. Затем перейди на второй уровень: там появятся условные ветвления — нужно решить, что делать, когда шаг падает.',
      brief_en: 'First assemble the basic pipeline with its checks. Then switch to level two: conditional branches appear and you must decide what happens when a step fails.',
      task: {
        kind: 'pipeline-builder',
        levels: [
          {
            level: 'basic',
            title_ru: 'Полный цикл CI',
            title_en: 'The full CI cycle',
            goal_ru: 'Собери пайплайн, который запускается на каждый пуш. Учти: линтер дешевле тестов, а тесты дешевле сборки образа — значит, дешёвые проверки должны идти первыми и отсекать заведомо плохой код.',
            goal_en: 'Assemble the pipeline that runs on every push. Note: linting is cheaper than tests and tests are cheaper than building an image — so the cheap checks go first and cut off obviously bad code.',
            stages: [
              { id: 'checkout', kind: 'checkout', label_ru: 'Забрать код',        label_en: 'Checkout',         command: 'actions/checkout@v4' },
              { id: 'install',  kind: 'install',  label_ru: 'Установить зависимости', label_en: 'Install deps',  command: 'npm ci' },
              { id: 'lint',     kind: 'lint',     label_ru: 'Линтер',             label_en: 'Lint',             command: 'npm run lint' },
              { id: 'test',     kind: 'test',     label_ru: 'Тесты',              label_en: 'Test',             command: 'npm test' },
              { id: 'build',    kind: 'build',    label_ru: 'Собрать образ',      label_en: 'Build image',      command: 'docker build -t shop-api:$SHA .' },
              { id: 'deploy',   kind: 'deploy',   label_ru: 'Деплой на staging',  label_en: 'Deploy to staging', command: './deploy.sh staging' },
            ],
            solution: ['checkout', 'install', 'lint', 'test', 'build', 'deploy'],
            hint_ru: 'Без кода нечего устанавливать, без зависимостей не запустятся ни линтер, ни тесты. Образ собирают из уже проверенного кода.',
            hint_en: 'Without the code there is nothing to install; without dependencies neither the linter nor the tests can run. The image is built from already-verified code.',
            explanation_ru: 'Порядок отражает стоимость шагов: линтер отрабатывает за секунды, тесты за минуту, сборка образа — дольше всего. Чем раньше отсекается плохой код, тем меньше времени раннера потрачено впустую.',
            explanation_en: 'The order mirrors the cost of each step: linting takes seconds, tests a minute, building an image the longest. The earlier bad code is cut off, the less runner time is wasted.',
          },
          {
            level: 'branching',
            title_ru: 'Ветвления при сбое',
            title_en: 'Branching on failure',
            goal_ru: 'Тот же пайплайн, но теперь добавь шаги реакции на сбой и ответь на вопросы о ветвлениях. Уведомление отправляется в самом конце — оно должно сообщать об итоге всего запуска.',
            goal_en: 'The same pipeline, but now add the failure-handling steps and answer the branching questions. The notification comes last — it must report the outcome of the whole run.',
            stages: [
              { id: 'checkout', kind: 'checkout', label_ru: 'Забрать код',       label_en: 'Checkout',        command: 'actions/checkout@v4' },
              { id: 'install',  kind: 'install',  label_ru: 'Зависимости',       label_en: 'Install deps',    command: 'npm ci' },
              { id: 'test',     kind: 'test',     label_ru: 'Тесты',             label_en: 'Test',            command: 'npm test' },
              { id: 'build',    kind: 'build',    label_ru: 'Собрать образ',     label_en: 'Build image',     command: 'docker build .' },
              { id: 'deploy',   kind: 'deploy',   label_ru: 'Деплой',            label_en: 'Deploy',          command: './deploy.sh production' },
              { id: 'monitor',  kind: 'monitor',  label_ru: 'Проверка здоровья', label_en: 'Health check',    command: 'curl -f /healthz' },
              { id: 'notify',   kind: 'notify',   label_ru: 'Уведомление в чат', label_en: 'Notify the chat', command: 'slack-notify $STATUS' },
            ],
            solution: ['checkout', 'install', 'test', 'build', 'deploy', 'monitor', 'notify'],
            branches: [
              {
                id: 'b-test-failed',
                stageId: 'test',
                condition_ru: 'tests.status == "failed"',
                condition_en: 'tests.status == "failed"',
                question_ru: 'Тесты упали. Что должен сделать пайплайн?',
                question_en: 'The tests failed. What should the pipeline do?',
                options: [
                  {
                    id: 'stop',
                    label_ru: 'Остановить выполнение и пометить запуск красным',
                    label_en: 'Stop the run and mark it red',
                    correct: true,
                    feedback_ru: 'Верно. Дальше идти незачем: непроверенный код не должен попасть даже в образ, не то что в прод.',
                    feedback_en: 'Correct. There is no point going on: unverified code should not even become an image, let alone reach production.',
                  },
                  {
                    id: 'retry',
                    label_ru: 'Автоматически перезапустить тесты — вдруг повезёт',
                    label_en: 'Retry the tests automatically — maybe it passes',
                    correct: false,
                    feedback_ru: 'Нет. Retry маскирует настоящую ошибку и приучает команду игнорировать красные запуски. Нестабильный тест — это баг, а не погода.',
                    feedback_en: 'No. Retrying masks a real bug and teaches the team to ignore red runs. A flaky test is a bug, not the weather.',
                  },
                  {
                    id: 'skip',
                    label_ru: 'Пропустить тесты и продолжить деплой',
                    label_en: 'Skip the tests and continue deploying',
                    correct: false,
                    feedback_ru: 'Нет. Тогда весь пайплайн бессмыслен: проверка, которую можно пропустить, ничего не гарантирует.',
                    feedback_en: 'No. That makes the whole pipeline pointless: a check you can skip guarantees nothing.',
                  },
                ],
              },
              {
                id: 'b-deploy-failed',
                stageId: 'deploy',
                condition_ru: 'healthcheck.status != 200 после деплоя',
                condition_en: 'healthcheck.status != 200 after the deploy',
                question_ru: 'Деплой прошёл, но проверка здоровья не отвечает 200. Действие?',
                question_en: 'The deploy finished but the health check does not return 200. What now?',
                options: [
                  {
                    id: 'rollback',
                    label_ru: 'Автоматически откатиться на предыдущую версию',
                    label_en: 'Roll back to the previous version automatically',
                    correct: true,
                    feedback_ru: 'Верно. Пользователи должны видеть рабочий сайт сейчас, а разбор причин подождёт. Время восстановления — ключевая метрика.',
                    feedback_en: 'Correct. Users must see a working site now; the investigation can wait. Time to restore is the key metric.',
                  },
                  {
                    id: 'retry-deploy',
                    label_ru: 'Задеплоить ту же версию ещё раз',
                    label_en: 'Deploy the same version again',
                    correct: false,
                    feedback_ru: 'Нет. Версия сломана — повторный деплой того же артефакта даст тот же результат, только пользователи подождут дольше.',
                    feedback_en: 'No. The version is broken — redeploying the same artifact gives the same result, users just wait longer.',
                  },
                  {
                    id: 'wait',
                    label_ru: 'Подождать: возможно, сервис ещё прогревается',
                    label_en: 'Wait: maybe the service is still warming up',
                    correct: false,
                    feedback_ru: 'Опасно. Ожидание допустимо только внутри заранее заданного окна healthcheck. Если окно вышло — это сбой, а не прогрев.',
                    feedback_en: 'Risky. Waiting is only acceptable inside a predefined health-check window. Once it expires, it is a failure, not warm-up.',
                  },
                ],
              },
            ],
            hint_ru: 'Уведомление логично ставить последним: оно сообщает итог всего запуска. А проверка здоровья имеет смысл только после деплоя.',
            hint_en: 'The notification belongs last: it reports the outcome of the whole run. And a health check only makes sense after the deploy.',
            explanation_ru: 'Хороший пайплайн не только выполняет шаги, но и знает, что делать при сбое каждого из них. Тесты упали — стоп. Деплой не поднялся — откат. Уведомление приходит в любом случае, потому что молчащий пайплайн хуже красного.',
            explanation_en: 'A good pipeline not only runs steps but knows what to do when each fails. Tests failed — stop. Deploy unhealthy — roll back. The notification always fires, because a silent pipeline is worse than a red one.',
          },
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Чем Continuous Delivery отличается от Continuous Deployment?',
      text_en: 'How does Continuous Delivery differ from Continuous Deployment?',
      options_ru: [
        'Ничем, это синонимы',
        'При Delivery финальное решение о выкате принимает человек, при Deployment деплой полностью автоматический',
        'Delivery работает только со статикой',
        'Deployment не требует тестов',
      ],
      options_en: [
        'Nothing, they are synonyms',
        'With Delivery a human makes the final ship decision; with Deployment the deploy is fully automatic',
        'Delivery only works with static sites',
        'Deployment requires no tests',
      ],
      correctIndex: 1,
      explanation_ru: 'Обе практики автоматизируют весь путь. Разница ровно в одной кнопке: нажимает её человек или пайплайн сам.',
      explanation_en: 'Both automate the whole path. The difference is exactly one button: whether a human presses it or the pipeline does.',
    },
    {
      id: 'q2',
      text_ru: 'Почему нельзя пересобирать образ отдельно для staging и отдельно для прода?',
      text_en: 'Why must you not rebuild the image separately for staging and for production?',
      options_ru: [
        'Это занимает больше времени',
        'Сборка недетерминирована: в прод уедет не тот артефакт, который проверяли на staging',
        'Docker запрещает две сборки одного проекта',
        'Реестр не примет два образа',
      ],
      options_en: [
        'It takes more time',
        'Builds are not deterministic: production would get a different artifact from the one verified on staging',
        'Docker forbids building one project twice',
        'The registry will not accept two images',
      ],
      correctIndex: 1,
      explanation_ru: 'Правило build once, deploy many. Окружения различаются только переменными и секретами, но не содержимым артефакта.',
      explanation_en: 'The build once, deploy many rule. Environments differ only in variables and secrets, never in artifact content.',
    },
    {
      id: 'q3',
      text_ru: 'Тест иногда падает, иногда проходит без изменений в коде. Что делать?',
      text_en: 'A test sometimes fails and sometimes passes with no code changes. What do you do?',
      options_ru: [
        'Настроить автоматический перезапуск до первого зелёного',
        'Разобраться в причине: нестабильность почти всегда указывает на настоящую гонку или зависимость от времени',
        'Удалить тест',
        'Перенести его в конец пайплайна',
      ],
      options_en: [
        'Configure automatic retries until it goes green',
        'Investigate the cause: flakiness almost always points at a real race or a time dependency',
        'Delete the test',
        'Move it to the end of the pipeline',
      ],
      correctIndex: 1,
      explanation_ru: 'Retry прячет проблему, которая рано или поздно проявится в проде — там перезапустить будет нечего.',
      explanation_en: 'A retry hides a problem that will eventually surface in production — where there is nothing to retry.',
    },
    {
      id: 'q4',
      text_ru: 'Почему в пайплайне линтер ставят раньше тестов и сборки?',
      text_en: 'Why does the linter come before the tests and the build?',
      options_ru: [
        'Линтер важнее тестов',
        'Он выполняется за секунды и отсекает заведомо плохой код до дорогих шагов',
        'Тесты не запустятся без линтера',
        'Так требует GitHub Actions',
      ],
      options_en: [
        'The linter matters more than the tests',
        'It runs in seconds and cuts off obviously bad code before the expensive steps',
        'Tests will not run without the linter',
        'GitHub Actions requires it',
      ],
      correctIndex: 1,
      explanation_ru: 'Принцип fail fast: самые дешёвые проверки идут первыми, чтобы не тратить минуты раннера на код, который всё равно не пройдёт ревью.',
      explanation_en: 'The fail-fast principle: the cheapest checks go first so runner minutes are not spent on code that would fail review anyway.',
    },
  ],
}
