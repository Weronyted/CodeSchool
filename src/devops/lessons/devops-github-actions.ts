import type { DevOpsLesson } from '@/types/devops'

export const devopsGithubActions: DevOpsLesson = {
  slug: 'devops-github-actions',
  moduleId: 'cicd',
  order: 2,
  icon: '🤖',
  readTime: 16,

  title_ru: 'GitHub Actions',
  title_en: 'GitHub Actions',
  description_ru: 'Workflow, jobs, steps, триггеры и секреты — пишем первый пайплайн.',
  description_en: 'Workflows, jobs, steps, triggers and secrets — writing your first pipeline.',

  sections: [
    { id: 'anatomy',   title_ru: 'Анатомия workflow',        title_en: 'Anatomy of a workflow' },
    { id: 'triggers',  title_ru: 'Триггеры: когда запускать', title_en: 'Triggers: when to run' },
    { id: 'jobs',      title_ru: 'Jobs и зависимости',        title_en: 'Jobs and dependencies' },
    { id: 'secrets',   title_ru: 'Секреты и окружения',       title_en: 'Secrets and environments' },
    { id: 'debug',     title_ru: 'Когда пайплайн красный',    title_en: 'When the pipeline is red' },
    { id: 'key-terms', title_ru: 'Ключевые термины',          title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'GitHub Actions — CI-система, встроенная прямо в репозиторий. Ничего не нужно поднимать: кладёшь YAML-файл в `.github/workflows/`, пушишь — и на каждый коммит запускается чистая виртуальная машина, которая делает то, что ты описал.',
    intro_en:
      'GitHub Actions is a CI system built right into the repository. Nothing to set up: drop a YAML file into `.github/workflows/`, push, and every commit spins up a clean virtual machine doing exactly what you described.',

    blocks: [
      {
        sectionId: 'anatomy',
        heading_ru: 'Анатомия workflow',
        heading_en: 'Anatomy of a workflow',
        text_ru:
          'Иерархия ровно из трёх уровней, и её стоит запомнить сразу:\n\n• Workflow — весь файл целиком. Один файл = один процесс, например «проверка pull request».\n• Job — блок, который выполняется на отдельной чистой машине (раннере). Джобы по умолчанию идут параллельно.\n• Step — один шаг внутри джобы. Либо `run` с shell-командой, либо `uses` с готовым действием из маркетплейса.\n\nВажное следствие параллельности: разные джобы не видят файлы друг друга. Собранный в одной джобе образ не появится в другой сам по себе — его нужно передать через артефакты или реестр.',
        text_en:
          'Exactly three levels of hierarchy, worth memorising right away:\n\n• Workflow — the whole file. One file = one process, for example "check a pull request".\n• Job — a block that runs on its own clean machine (a runner). Jobs run in parallel by default.\n• Step — a single step inside a job. Either `run` with a shell command or `uses` with a ready-made action from the marketplace.\n\nAn important consequence of that parallelism: different jobs do not see each other\'s files. An image built in one job will not magically appear in another — you pass it through artifacts or a registry.',
        code: 'name: CI\n\non:\n  push:\n    branches: [main]\n  pull_request:\n\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with:\n          node-version: 20\n          cache: npm\n      - run: npm ci\n      - run: npm run lint\n      - run: npm test',
        codeLang: 'yaml',
        codeCaption: '.github/workflows/ci.yml',
      },
      {
        sectionId: 'triggers',
        heading_ru: 'Триггеры: когда запускать',
        heading_en: 'Triggers: when to run',
        text_ru:
          'Блок `on` определяет, что именно запускает workflow. Самые полезные:\n\n• `pull_request` — проверки на каждое обновление PR. Основной триггер для CI.\n• `push: branches: [main]` — то, что делается после мерджа: обычно сборка и деплой.\n• `push: tags: ["v*"]` — релиз по тегу.\n• `schedule` — по расписанию (ночные прогоны, проверка зависимостей).\n• `workflow_dispatch` — кнопка ручного запуска в интерфейсе.\n\nТипичная схема зрелого проекта: PR запускает проверки, мердж в main запускает деплой на staging, тег версии запускает деплой в прод. Один и тот же код проходит через три разных триггера.',
        text_en:
          'The `on` block defines what starts the workflow. The most useful ones:\n\n• `pull_request` — checks on every PR update. The main CI trigger.\n• `push: branches: [main]` — what happens after a merge: usually build and deploy.\n• `push: tags: ["v*"]` — a release on a tag.\n• `schedule` — on a timer (nightly runs, dependency checks).\n• `workflow_dispatch` — a manual run button in the UI.\n\nA typical mature setup: a PR triggers checks, a merge to main triggers a staging deploy, a version tag triggers production. The same code passes through three different triggers.',
      },
      {
        sectionId: 'jobs',
        heading_ru: 'Jobs и зависимости',
        heading_en: 'Jobs and dependencies',
        text_ru:
          'По умолчанию все джобы стартуют одновременно — это быстро, но подходит только для независимых проверок вроде линтера и типов.\n\nКогда порядок важен, его задают через `needs`. Джоба с `needs: test` не начнётся, пока тесты не станут зелёными. Так строится граф: несколько проверок параллельно → сборка → деплой.\n\nЕсли деплой должен идти только с main, добавляют `if`. Без этого условия каждый pull request будет пытаться выкатиться в прод.',
        text_en:
          'By default every job starts at once — fast, but only right for independent checks like linting and type-checking.\n\nWhen order matters, it is expressed with `needs`. A job with `needs: test` will not start until the tests are green. That builds a graph: several checks in parallel → build → deploy.\n\nIf the deploy must only run from main, add an `if`. Without that condition every pull request would try to ship to production.',
        code: 'jobs:\n  lint:\n    runs-on: ubuntu-latest\n    steps: [...]\n\n  test:\n    runs-on: ubuntu-latest\n    steps: [...]\n\n  build:\n    needs: [lint, test]      # обе проверки должны быть зелёными\n    runs-on: ubuntu-latest\n    steps: [...]\n\n  deploy:\n    needs: build\n    if: github.ref == \'refs/heads/main\'\n    runs-on: ubuntu-latest\n    steps: [...]',
        codeLang: 'yaml',
      },
      {
        sectionId: 'secrets',
        heading_ru: 'Секреты и окружения',
        heading_en: 'Secrets and environments',
        text_ru:
          'Ключ от сервера, токен реестра, пароль базы — всё это нельзя писать в YAML: файл лежит в репозитории. Секреты хранятся в настройках репозитория и подставляются как `${{ secrets.NAME }}`.\n\nGitHub маскирует значения секретов в логах: даже если случайно сделать `echo`, в выводе будет `***`. Но защита не абсолютная — секрет, переданный в стороннее действие, ты уже не контролируешь. Поэтому используй только проверенные actions и фиксируй их версию.\n\nОтдельный уровень — environments. Окружению `production` можно назначить обязательное подтверждение: пайплайн дойдёт до деплоя и остановится, пока человек не нажмёт «одобрить». Это и есть Continuous Delivery на практике.',
        text_en:
          'The server key, the registry token, the database password — none of it can go into YAML: that file lives in the repository. Secrets are stored in repository settings and injected as `${{ secrets.NAME }}`.\n\nGitHub masks secret values in logs: even an accidental `echo` prints `***`. But the protection is not absolute — a secret passed into a third-party action is beyond your control. So use only trusted actions and pin their versions.\n\nA separate layer is environments. The `production` environment can require an approval: the pipeline reaches the deploy step and waits until a human clicks approve. That is Continuous Delivery in practice.',
        code: 'deploy:\n  runs-on: ubuntu-latest\n  environment: production     # требует ручного подтверждения\n  steps:\n    - name: Deploy over SSH\n      env:\n        SSH_KEY: ${{ secrets.DEPLOY_SSH_KEY }}\n        HOST: ${{ secrets.PROD_HOST }}\n      run: ./scripts/deploy.sh',
        codeLang: 'yaml',
      },
      {
        sectionId: 'debug',
        heading_ru: 'Когда пайплайн красный',
        heading_en: 'When the pipeline is red',
        text_ru:
          'Порядок разбора всегда один: открыть упавшую джобу → найти первый красный шаг → прочитать его лог сверху вниз. Ошибка почти всегда в первых строках вывода, а не в последних: дальше идут вторичные сообщения.\n\nСамая частая причина «локально работает, в CI падает» — разница окружений. У тебя Node 22, в workflow указан Node 20. У тебя есть `.env`, а у раннера его нет. У тебя node_modules с прошлой недели, а раннер ставит зависимости с нуля.\n\nВторая по частоте — забытый секрет: переменная пустая, приложение подключается в никуда. Именно поэтому шаг деплоя стоит начинать с проверки, что все нужные переменные заданы.',
        text_en:
          'The triage order is always the same: open the failed job → find the first red step → read its log top to bottom. The error is almost always in the first lines of output, not the last: what follows is secondary noise.\n\nThe most common cause of "works locally, fails in CI" is an environment difference. You have Node 22, the workflow pins Node 20. You have a `.env`, the runner does not. You have last week\'s node_modules, the runner installs from scratch.\n\nSecond most common is a forgotten secret: the variable is empty and the app connects to nowhere. That is exactly why a deploy step should start by asserting that every required variable is set.',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Workflow', term_en: 'Workflow',
      definition_ru: 'YAML-файл в .github/workflows/, описывающий один автоматический процесс.',
      definition_en: 'A YAML file in .github/workflows/ describing one automated process.',
    },
    {
      term_ru: 'Job', term_en: 'Job',
      definition_ru: 'Блок шагов, выполняющийся на отдельной чистой машине. По умолчанию джобы идут параллельно.',
      definition_en: 'A block of steps running on its own clean machine. Jobs run in parallel by default.',
    },
    {
      term_ru: 'Runner', term_en: 'Runner',
      definition_ru: 'Виртуальная машина, на которой выполняется джоба. Каждый запуск получает чистую систему.',
      definition_en: 'The virtual machine executing a job. Every run gets a clean system.',
    },
    {
      term_ru: 'needs', term_en: 'needs',
      definition_ru: 'Указание зависимости: джоба не начнётся, пока перечисленные не завершатся успешно.',
      definition_en: 'A dependency declaration: the job waits until the listed jobs succeed.',
    },
    {
      term_ru: 'Секрет (secret)', term_en: 'Secret',
      definition_ru: 'Зашифрованное значение из настроек репозитория, доступное как ${{ secrets.NAME }} и маскируемое в логах.',
      definition_en: 'An encrypted value from repository settings, available as ${{ secrets.NAME }} and masked in logs.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Каждая джоба получает новую виртуалку. Именно поэтому в CI ничего не «остаётся с прошлого раза» — и именно поэтому сборка там медленнее локальной.',
      text_en: 'Every job gets a fresh VM. That is why nothing "carries over from last time" in CI — and why builds there are slower than local ones.',
    },
    {
      text_ru: 'Действия из маркетплейса стоит фиксировать по версии (`@v4`) или по хешу коммита. Иначе автор может изменить код действия, которому ты передаёшь секреты.',
      text_en: 'Pin marketplace actions to a version (`@v4`) or a commit hash. Otherwise the author can change the code you are handing secrets to.',
    },
    {
      text_ru: 'Для приватных репозиториев минуты Actions платные, для публичных — бесплатны. Поэтому кэш зависимостей экономит не только время, но и деньги.',
      text_en: 'Actions minutes are billed for private repositories and free for public ones. So caching dependencies saves money, not just time.',
    },
  ],

  labs: [
    {
      id: 'lab-actions-debug',
      title_ru: 'Пайплайн красный — разберись через gh',
      title_en: 'The pipeline is red — dig in with gh',
      brief_ru: 'Последний запуск упал. Найди его, посмотри, какая джоба красная, прочитай лог упавшего шага и определи причину. Работаем через GitHub CLI.',
      brief_en: 'The latest run failed. Find it, see which job is red, read the failed step log and identify the cause. All through the GitHub CLI.',
      task: {
        kind: 'terminal-simulator',
        prompt: 'student@codeschool:~/shop-api$',
        motd_ru: [
          '# Пуш в main прошёл 4 минуты назад, workflow CI упал.',
          '# Разберись через gh: какой шаг красный и почему.',
          '',
        ],
        motd_en: [
          '# A push to main landed 4 minutes ago and the CI workflow failed.',
          '# Use gh to find out which step is red and why.',
          '',
        ],
        responses: [
          {
            match: 'cat .github/workflows/ci.yml',
            output: [
              'name: CI',
              'on:',
              '  push:',
              '    branches: [main]',
              'jobs:',
              '  test:',
              '    runs-on: ubuntu-latest',
              '    steps:',
              '      - uses: actions/checkout@v4',
              '      - uses: actions/setup-node@v4',
              '        with: { node-version: 20 }',
              '      - run: npm ci',
              '      - run: npm test',
              '  deploy:',
              '    needs: test',
              '    runs-on: ubuntu-latest',
              '    steps:',
              '      - run: ./scripts/deploy.sh',
              '        env:',
              '          PROD_HOST: ${{ secrets.PROD_HOST }}',
            ],
          },
          {
            match: 'gh run list --limit 5',
            delayMs: 700,
            output: [
              'STATUS  TITLE                        WORKFLOW  BRANCH  EVENT  ID          AGE',
              'X       feat: order status filter    CI        main    push   17482913    4m',
              '✓       fix: null check in cart      CI        main    push   17482744    2h',
              '✓       chore: bump deps             CI        main    push   17482601    5h',
              '✓       feat: order history          CI        main    push   17482330    1d',
              '✓       test: cover cart total       CI        main    push   17482119    1d',
            ],
          },
          {
            match: 'gh run view 17482913',
            delayMs: 600,
            output: [
              'X main CI · 17482913',
              'Triggered via push about 4 minutes ago',
              '',
              'JOBS',
              '  ✓ test in 1m14s',
              '  X deploy in 12s',
              '',
              'To see the logs for a failed job, run: gh run view 17482913 --log-failed',
            ],
          },
          {
            match: 'gh run view 17482913 --log-failed',
            delayMs: 900,
            output: [
              'deploy  Run ./scripts/deploy.sh',
              'deploy  + ssh -i deploy_key deploy@',
              'deploy  ssh: Could not resolve hostname : Name or service not known',
              'deploy  Error: Process completed with exit code 255.',
              '',
              '# обрати внимание: после deploy@ пусто — переменная PROD_HOST не подставилась',
            ],
            sets: ['found-cause'],
          },
          {
            match: 'gh secret list',
            delayMs: 500,
            output: [
              'NAME               UPDATED',
              'DEPLOY_SSH_KEY     2 weeks ago',
              'REGISTRY_TOKEN     2 weeks ago',
              '',
              '# секрета PROD_HOST в репозитории нет',
            ],
          },
          {
            match: 'gh run rerun 17482913',
            requires: 'found-cause',
            unless: ['# сначала выясни причину: gh run view <id> --log-failed'],
            delayMs: 800,
            output: [
              '✓ Requested rerun of run 17482913',
              '# ⚠ но причина не устранена — секрет PROD_HOST так и не задан, запуск упадёт снова',
            ],
          },
          {
            match: 'gh workflow list',
            output: [
              'NAME     STATE   ID',
              'CI       active  91043',
              'Release  active  91044',
            ],
          },
        ],
        goals: [
          { id: 'g1', description_ru: 'Найди упавший запуск в списке', description_en: 'Find the failed run in the list', pattern: '^gh run list --limit 5$' },
          { id: 'g2', description_ru: 'Посмотри, какая джоба красная', description_en: 'See which job is red', pattern: '^gh run view 17482913$' },
          { id: 'g3', description_ru: 'Прочитай лог упавшего шага', description_en: 'Read the failed step log', pattern: '^gh run view 17482913 --log-failed$' },
          { id: 'g4', description_ru: 'Проверь, какие секреты заданы в репозитории', description_en: 'Check which secrets exist in the repository', pattern: '^gh secret list$' },
          { id: 'g5', description_ru: 'Открой workflow и найди, где используется недостающая переменная', description_en: 'Open the workflow and find where the missing variable is used', pattern: '^cat \\.github/workflows/ci\\.yml$' },
        ],
        suggestions: [
          'gh run list --limit 5',
          'gh run view 17482913',
          'gh run view 17482913 --log-failed',
          'gh secret list',
          'cat .github/workflows/ci.yml',
          'gh workflow list',
          'gh run rerun 17482913',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Джоба build собрала файлы, а джоба deploy их не находит. Почему?',
      text_en: 'The build job produced files and the deploy job cannot find them. Why?',
      options_ru: [
        'Файлы удаляются после каждого шага',
        'Каждая джоба выполняется на отдельной чистой машине — данные передают через артефакты или реестр',
        'Deploy запустился раньше build',
        'Нужно добавить sudo',
      ],
      options_en: [
        'Files are deleted after every step',
        'Every job runs on its own clean machine — data is passed via artifacts or a registry',
        'Deploy started before build',
        'You need to add sudo',
      ],
      correctIndex: 1,
      explanation_ru: 'Изоляция джоб — не баг, а свойство. Именно поэтому образ пушат в реестр, а сборку фронтенда сохраняют как артефакт.',
      explanation_en: 'Job isolation is a feature, not a bug. That is exactly why images are pushed to a registry and frontend builds are saved as artifacts.',
    },
    {
      id: 'q2',
      text_ru: 'Как заставить джобу deploy дождаться зелёных lint и test?',
      text_en: 'How do you make the deploy job wait for green lint and test?',
      options_ru: ['Поставить её ниже в файле', 'Добавить `needs: [lint, test]`', 'Добавить `runs-on: last`', 'Указать `if: success()`'],
      options_en: ['Put it lower in the file', 'Add `needs: [lint, test]`', 'Add `runs-on: last`', 'Add `if: success()`'],
      correctIndex: 1,
      explanation_ru: 'Порядок в файле ничего не значит — по умолчанию джобы параллельны. Зависимости задаются только через `needs`.',
      explanation_en: 'File order means nothing — jobs are parallel by default. Dependencies are expressed only through `needs`.',
    },
    {
      id: 'q3',
      text_ru: 'Куда положить приватный SSH-ключ для деплоя?',
      text_en: 'Where do you put the private SSH deploy key?',
      options_ru: [
        'В workflow-файл, но в закодированном виде',
        'В секреты репозитория и обращаться как ${{ secrets.DEPLOY_SSH_KEY }}',
        'В README рядом с инструкцией',
        'В .env, закоммиченный в репозиторий',
      ],
      options_en: [
        'In the workflow file, encoded',
        'In repository secrets, referenced as ${{ secrets.DEPLOY_SSH_KEY }}',
        'In the README next to the instructions',
        'In a .env committed to the repository',
      ],
      correctIndex: 1,
      explanation_ru: 'Всё, что попало в файлы репозитория, доступно каждому, у кого есть доступ к коду, — и остаётся в истории git навсегда.',
      explanation_en: 'Anything in repository files is visible to everyone with code access — and stays in git history forever.',
    },
    {
      id: 'q4',
      text_ru: 'Тесты проходят локально, но падают в CI. Что проверить первым делом?',
      text_en: 'Tests pass locally but fail in CI. What do you check first?',
      options_ru: [
        'Скорость интернета раннера',
        'Различия окружений: версию Node, отсутствующие переменные, свежую установку зависимостей',
        'Размер репозитория',
        'Часовой пояс сервера GitHub',
      ],
      options_en: [
        'The runner\'s internet speed',
        'Environment differences: Node version, missing variables, a fresh dependency install',
        'The repository size',
        'The GitHub server timezone',
      ],
      correctIndex: 1,
      explanation_ru: 'Раннер — чистая машина без твоего `.env` и без старых node_modules. Почти всегда причина именно в этой разнице.',
      explanation_en: 'The runner is a clean machine with no `.env` and no stale node_modules. That difference is almost always the cause.',
    },
  ],
}
