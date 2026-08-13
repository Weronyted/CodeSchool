import type { DevOpsLesson } from '@/types/devops'

export const devopsGitAdvanced: DevOpsLesson = {
  slug: 'devops-git-advanced',
  moduleId: 'foundations',
  order: 3,
  icon: '🌿',
  readTime: 14,

  title_ru: 'Продвинутый Git',
  title_en: 'Advanced Git',
  description_ru: 'Ветки, rebase, конфликты, теги и стратегия ветвления в команде.',
  description_en: 'Branches, rebase, conflicts, tags and a team branching strategy.',

  sections: [
    { id: 'branching', title_ru: 'Стратегия ветвления',      title_en: 'Branching strategy' },
    { id: 'rebase',    title_ru: 'Merge против rebase',       title_en: 'Merge vs rebase' },
    { id: 'conflicts', title_ru: 'Конфликты без паники',      title_en: 'Conflicts without panic' },
    { id: 'tags',      title_ru: 'Теги и версии релизов',     title_en: 'Tags and release versions' },
    { id: 'undo',      title_ru: 'Как всё вернуть назад',     title_en: 'How to undo things' },
    { id: 'key-terms', title_ru: 'Ключевые термины',          title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Git ты уже знаешь на уровне «добавил, закоммитил, запушил». В DevOps Git становится ещё и триггером: пуш в ветку запускает пайплайн, тег запускает релиз, а мердж в main отправляет код в прод. Поэтому важно, как именно устроены ветки в команде.',
    intro_en:
      'You already know Git at the "add, commit, push" level. In DevOps, Git also becomes a trigger: a push to a branch starts a pipeline, a tag starts a release, a merge into main ships to production. That is why the shape of your branches matters.',

    blocks: [
      {
        sectionId: 'branching',
        heading_ru: 'Стратегия ветвления',
        heading_en: 'Branching strategy',
        text_ru:
          'Самая распространённая сегодня схема — trunk-based development с короткоживущими ветками:\n\n• `main` — всегда рабочая и всегда готова к деплою. Прямые пуши в неё запрещены.\n• `feature/orders-filter` — ветка на одну задачу, живёт 1–3 дня.\n• Изменения попадают в main только через pull request с зелёной сборкой и ревью.\n\nПочему ветка должна жить недолго: чем дольше она живёт, тем сильнее расходится с main и тем больнее будет мердж. Ветка на две недели — это гарантированные конфликты.',
        text_en:
          'The most common scheme today is trunk-based development with short-lived branches:\n\n• `main` — always working and always deployable. Direct pushes are forbidden.\n• `feature/orders-filter` — one branch per task, alive for 1–3 days.\n• Changes reach main only through a pull request with a green build and a review.\n\nWhy branches must be short-lived: the longer a branch lives, the further it drifts from main and the more painful the merge. A two-week branch means guaranteed conflicts.',
        code: 'git switch -c feature/orders-filter\n# ...работа, коммиты...\ngit push -u origin feature/orders-filter\n# открыть PR, дождаться зелёной сборки, смёржить',
        codeLang: 'bash',
      },
      {
        sectionId: 'rebase',
        heading_ru: 'Merge против rebase',
        heading_en: 'Merge vs rebase',
        text_ru:
          '`git merge` соединяет две ветки новым коммитом слияния. История правдива, но со временем превращается в паутину.\n\n`git rebase` переносит твои коммиты так, будто ты начал работать от свежего main. История линейная и читаемая, но коммиты получают новые хеши — это переписывание истории.\n\nОтсюда золотое правило: делай rebase только на своей ветке, которую никто больше не тянул. Никогда не делай rebase на main — коллеги получат конфликт с историей, которой у них уже нет.',
        text_en:
          '`git merge` joins two branches with a merge commit. The history is truthful but eventually becomes a web.\n\n`git rebase` replays your commits as if you had started from a fresh main. The history is linear and readable, but the commits get new hashes — that is rewriting history.\n\nHence the golden rule: rebase only your own branch that nobody else has pulled. Never rebase main — your colleagues would conflict with a history that no longer exists.',
        code: '# подтянуть свежий main в свою ветку линейно\ngit fetch origin\ngit rebase origin/main\n\n# если что-то пошло не так — отменить\ngit rebase --abort',
        codeLang: 'bash',
      },
      {
        sectionId: 'conflicts',
        heading_ru: 'Конфликты без паники',
        heading_en: 'Conflicts without panic',
        text_ru:
          'Конфликт — это не поломка. Git просто говорит: «в этом месте два человека поменяли одни и те же строки, я не знаю, чей вариант правильный».\n\nПорядок действий всегда один: открыть файл → найти маркеры `<<<<<<<`, `=======`, `>>>>>>>` → оставить нужный код (иногда — оба куска) → удалить маркеры → `git add` → продолжить.\n\nВажно: после разрешения конфликта обязательно запусти приложение или тесты. Синтаксически корректный результат склейки двух правок легко может быть логически бессмысленным.',
        text_en:
          'A conflict is not a breakage. Git simply says: "two people changed the same lines here and I do not know whose version is right".\n\nThe routine is always the same: open the file → find the `<<<<<<<`, `=======`, `>>>>>>>` markers → keep the right code (sometimes both parts) → delete the markers → `git add` → continue.\n\nImportant: after resolving a conflict, always run the app or the tests. A syntactically valid mix of two edits can easily be logical nonsense.',
        code: '<<<<<<< HEAD\nconst LIMIT = 50\n=======\nconst LIMIT = 100\n>>>>>>> feature/orders-filter',
        codeLang: 'javascript',
        codeCaption: 'так выглядит конфликт в файле',
      },
      {
        sectionId: 'tags',
        heading_ru: 'Теги и версии релизов',
        heading_en: 'Tags and release versions',
        text_ru:
          'Ветка двигается, тег — нет. Тег прибивает конкретный коммит гвоздём и говорит: «вот это была версия 1.4.0». В CI/CD теги обычно и запускают релизный пайплайн.\n\nВерсии принято писать по SemVer — MAJOR.MINOR.PATCH:\n• PATCH (1.4.1) — исправление, ничего не сломано;\n• MINOR (1.5.0) — новая возможность, старое продолжает работать;\n• MAJOR (2.0.0) — ломающее изменение, требуется миграция.\n\nБлагодаря тегам откат — это не «найди тот коммит, где всё работало», а `git checkout v1.3.9`.',
        text_en:
          'A branch moves, a tag does not. A tag nails a specific commit down and says: "this was version 1.4.0". In CI/CD, tags usually trigger the release pipeline.\n\nVersions follow SemVer — MAJOR.MINOR.PATCH:\n• PATCH (1.4.1) — a fix, nothing broken;\n• MINOR (1.5.0) — a new capability, old behaviour still works;\n• MAJOR (2.0.0) — a breaking change, migration required.\n\nThanks to tags, a rollback is not "find the commit where it worked" but `git checkout v1.3.9`.',
        code: 'git tag -a v1.4.0 -m "Release 1.4.0: order filters"\ngit push origin v1.4.0\n\ngit tag                 # список версий\ngit show v1.4.0         # что именно вошло',
        codeLang: 'bash',
      },
      {
        sectionId: 'undo',
        heading_ru: 'Как всё вернуть назад',
        heading_en: 'How to undo things',
        text_ru:
          'Три команды с похожими названиями и очень разным смыслом:\n\n• `git revert <commit>` — создаёт новый коммит, отменяющий изменения. История сохраняется. Единственный безопасный способ откатить то, что уже в main.\n• `git reset --soft HEAD~1` — снимает последний коммит, но оставляет изменения в файлах. Удобно, когда закоммитил не то.\n• `git reset --hard HEAD~1` — стирает коммит вместе с изменениями. Данные пропадают.\n\nИ спасательный круг: `git reflog` помнит, где ты был, даже после жёсткого reset. Почти всё в Git можно вернуть в течение 30 дней.',
        text_en:
          'Three commands with similar names and very different meanings:\n\n• `git revert <commit>` — creates a new commit that undoes the changes. History is preserved. The only safe way to undo something already in main.\n• `git reset --soft HEAD~1` — drops the last commit but keeps the changes in your files. Handy when you committed the wrong thing.\n• `git reset --hard HEAD~1` — erases the commit together with the changes. Data is gone.\n\nAnd the life-ring: `git reflog` remembers where you were even after a hard reset. Almost anything in Git can be recovered within 30 days.',
        code: 'git revert a1b2c3d      # безопасно откатить в main\ngit reset --soft HEAD~1 # снять коммит, оставить правки\ngit reflog              # где я был раньше',
        codeLang: 'bash',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Trunk-based development', term_en: 'Trunk-based development',
      definition_ru: 'Подход, при котором все работают вокруг одной главной ветки, а фичи живут в коротких ветках по 1–3 дня.',
      definition_en: 'An approach where everyone works around one main branch and features live in short 1–3 day branches.',
    },
    {
      term_ru: 'Rebase', term_en: 'Rebase',
      definition_ru: 'Перенос коммитов на новую основу с переписыванием их хешей. Даёт линейную историю.',
      definition_en: 'Replaying commits onto a new base, rewriting their hashes. Produces a linear history.',
    },
    {
      term_ru: 'Тег (tag)', term_en: 'Tag',
      definition_ru: 'Неподвижная метка на конкретном коммите, обычно обозначающая версию релиза.',
      definition_en: 'An immovable label on a specific commit, usually marking a release version.',
      example_ru: 'v1.4.0', example_en: 'v1.4.0',
    },
    {
      term_ru: 'SemVer', term_en: 'SemVer',
      definition_ru: 'Соглашение о версиях MAJOR.MINOR.PATCH, где номер сам сообщает о характере изменений.',
      definition_en: 'The MAJOR.MINOR.PATCH versioning convention where the number itself communicates the nature of the change.',
    },
    {
      term_ru: 'Revert', term_en: 'Revert',
      definition_ru: 'Отмена изменений новым коммитом — безопасный откат для общей ветки.',
      definition_en: 'Undoing changes with a new commit — the safe rollback for a shared branch.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Git создал Линус Торвальдс за десять дней в 2005 году, когда команде ядра Linux закрыли бесплатный доступ к BitKeeper.',
      text_en: 'Linus Torvalds built Git in ten days in 2005, after the Linux kernel team lost free access to BitKeeper.',
    },
    {
      text_ru: 'Ветка в Git — это файл размером 41 байт с хешем коммита. Поэтому создание ветки мгновенно, сколько бы кода в проекте ни было.',
      text_en: 'A Git branch is a 41-byte file containing a commit hash. That is why creating one is instant, no matter how much code the project holds.',
    },
    {
      text_ru: 'В большинстве команд `main` защищена настройками репозитория: пуш напрямую физически невозможен даже для админа.',
      text_en: 'In most teams `main` is protected by repository settings: a direct push is physically impossible, even for an admin.',
    },
  ],

  labs: [
    {
      id: 'lab-git-release',
      title_ru: 'Подготовь релиз из терминала',
      title_en: 'Prepare a release from the terminal',
      brief_ru: 'Ветка с фичей готова, но main ушёл вперёд. Подтяни изменения, посмотри историю и поставь тег версии.',
      brief_en: 'The feature branch is ready but main has moved on. Rebase onto it, inspect the history and tag the version.',
      task: {
        kind: 'terminal-simulator',
        prompt: 'student@codeschool:~/shop$',
        motd_ru: [
          '# Репозиторий: shop-api',
          '# Ветка feature/orders-filter готова к мерджу, но main ушёл на 4 коммита вперёд.',
          '# Задача: линейно подтянуть main, проверить статус и выпустить версию v1.4.0.',
          '',
        ],
        motd_en: [
          '# Repository: shop-api',
          '# Branch feature/orders-filter is ready to merge, but main is 4 commits ahead.',
          '# Task: rebase onto main linearly, check the status and release version v1.4.0.',
          '',
        ],
        responses: [
          {
            match: 'git status',
            output: [
              'On branch feature/orders-filter',
              "Your branch is up to date with 'origin/feature/orders-filter'.",
              '',
              'nothing to commit, working tree clean',
            ],
          },
          {
            match: 'git branch',
            output: ['* feature/orders-filter', '  main'],
          },
          {
            match: 'git log --oneline -5',
            output: [
              'a1b2c3d (HEAD -> feature/orders-filter) feat: filter orders by status',
              '9f8e7d6 test: cover the orders filter',
              '4c5b6a7 (origin/main, main) fix: null check in cart total',
              '3b2a1c0 chore: bump deps',
              '2a1b0c9 feat: order history endpoint',
            ],
          },
          {
            match: 'git fetch origin',
            delayMs: 700,
            output: [
              'remote: Enumerating objects: 24, done.',
              'From github.com:codeschool/shop-api',
              '   4c5b6a7..7d8e9f0  main -> origin/main',
            ],
            sets: ['fetched'],
          },
          {
            match: 'git rebase origin/main',
            requires: 'fetched',
            unless: [
              'fatal: invalid upstream origin/main',
              '# сначала нужно забрать свежие данные с сервера: git fetch origin',
            ],
            delayMs: 900,
            output: [
              'Successfully rebased and updated refs/heads/feature/orders-filter.',
              '# твои 2 коммита теперь лежат поверх свежего main — история линейная',
            ],
            sets: ['rebased'],
          },
          {
            match: 'git tag -a v1\\.4\\.0 -m "(.+)"',
            regex: true,
            requires: 'rebased',
            unless: ['# ветка ещё не приведена к свежему main — сначала rebase'],
            output: ['# создан аннотированный тег v1.4.0: $1'],
            sets: ['tagged'],
          },
          {
            match: 'git push origin v1\\.4\\.0',
            regex: true,
            requires: 'tagged',
            unless: ['error: src refspec v1.4.0 does not match any'],
            delayMs: 800,
            output: [
              'To github.com:codeschool/shop-api.git',
              ' * [new tag]  v1.4.0 -> v1.4.0',
              '# релизный пайплайн запущен по тегу',
            ],
          },
          {
            match: 'git tag',
            output: ['v1.2.0', 'v1.3.0', 'v1.3.9'],
          },
          {
            match: 'git reflog',
            output: [
              'a1b2c3d HEAD@{0}: rebase (finish): returning to refs/heads/feature/orders-filter',
              '7d8e9f0 HEAD@{1}: rebase (start): checkout origin/main',
              '4c5b6a7 HEAD@{2}: commit: feat: filter orders by status',
            ],
          },
        ],
        goals: [
          { id: 'g1', description_ru: 'Проверь состояние рабочей копии', description_en: 'Check the working tree state', pattern: '^git status$' },
          { id: 'g2', description_ru: 'Забери свежие изменения с сервера', description_en: 'Fetch the latest changes from the server', pattern: '^git fetch origin$' },
          { id: 'g3', description_ru: 'Линейно перенеси свои коммиты поверх main', description_en: 'Replay your commits linearly on top of main', pattern: '^git rebase origin/main$' },
          { id: 'g4', description_ru: 'Поставь аннотированный тег v1.4.0', description_en: 'Create an annotated v1.4.0 tag', pattern: '^git tag -a v1\\.4\\.0 -m ".+"$' },
          { id: 'g5', description_ru: 'Отправь тег на сервер — он запустит релиз', description_en: 'Push the tag — it triggers the release', pattern: '^git push origin v1\\.4\\.0$' },
        ],
        suggestions: [
          'git status',
          'git branch',
          'git log --oneline -5',
          'git fetch origin',
          'git rebase origin/main',
          'git tag -a v1.4.0 -m "Release 1.4.0"',
          'git push origin v1.4.0',
          'git reflog',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Почему нельзя делать rebase ветки, которую уже вытянули коллеги?',
      text_en: 'Why must you not rebase a branch your colleagues have already pulled?',
      options_ru: [
        'Rebase работает только с одной веткой в репозитории',
        'Коммиты получают новые хеши, и у коллег остаётся история, которой больше не существует',
        'Rebase удаляет удалённую ветку',
        'GitHub запрещает это технически',
      ],
      options_en: [
        'Rebase only works with one branch per repository',
        'Commits get new hashes, and colleagues are left holding a history that no longer exists',
        'Rebase deletes the remote branch',
        'GitHub forbids it technically',
      ],
      correctIndex: 1,
      explanation_ru: 'Rebase переписывает историю. Старые коммиты у коллег и новые у тебя — это разные объекты, и следующий push превращается в кашу.',
      explanation_en: 'Rebase rewrites history. Their old commits and your new ones are different objects, and the next push turns into a mess.',
    },
    {
      id: 'q2',
      text_ru: 'В main попал сломанный коммит, который уже вытянули пять человек. Что применить?',
      text_en: 'A broken commit landed in main and five people already pulled it. What do you use?',
      options_ru: ['git reset --hard', 'git revert', 'git rebase -i', 'git clean -fd'],
      options_en: ['git reset --hard', 'git revert', 'git rebase -i', 'git clean -fd'],
      correctIndex: 1,
      explanation_ru: '`revert` создаёт новый коммит, отменяющий изменения, и не трогает существующую историю — единственный безопасный вариант для общей ветки.',
      explanation_en: '`revert` adds a new commit undoing the change and leaves existing history intact — the only safe option for a shared branch.',
    },
    {
      id: 'q3',
      text_ru: 'Исправили баг, публичный API не изменился. Какая версия по SemVer?',
      text_en: 'You fixed a bug and the public API did not change. Which SemVer bump?',
      options_ru: ['С 1.4.0 до 2.0.0', 'С 1.4.0 до 1.5.0', 'С 1.4.0 до 1.4.1', 'Версию менять не нужно'],
      options_en: ['1.4.0 → 2.0.0', '1.4.0 → 1.5.0', '1.4.0 → 1.4.1', 'No version change needed'],
      correctIndex: 2,
      explanation_ru: 'Исправление без новых возможностей и без ломающих изменений — это PATCH, то есть третье число.',
      explanation_en: 'A fix with no new features and no breaking changes is a PATCH — the third number.',
    },
    {
      id: 'q4',
      text_ru: 'Зачем в CI/CD нужны теги, если есть ветки?',
      text_en: 'Why does CI/CD need tags when branches exist?',
      options_ru: [
        'Теги быстрее клонируются',
        'Тег неподвижно указывает на конкретный коммит, поэтому по нему можно повторить или откатить ровно ту версию',
        'Ветки нельзя пушить на сервер',
        'Теги занимают меньше места',
      ],
      options_en: [
        'Tags clone faster',
        'A tag points immovably at one commit, so you can reproduce or roll back exactly that version',
        'Branches cannot be pushed to the server',
        'Tags take less space',
      ],
      correctIndex: 1,
      explanation_ru: 'Ветка завтра будет указывать на другой коммит, тег — на тот же самый. Именно поэтому релизы привязывают к тегам.',
      explanation_en: 'A branch will point at a different commit tomorrow; a tag will not. That is exactly why releases are tied to tags.',
    },
  ],
}
