import type { DevOpsLesson } from '@/types/devops'

export const devopsMindset: DevOpsLesson = {
  slug: 'devops-mindset',
  moduleId: 'foundations',
  order: 1,
  icon: '🧠',
  readTime: 10,

  title_ru: 'DevOps-мышление',
  title_en: 'The DevOps Mindset',
  description_ru: 'Зачем нужен DevOps, что такое цикл поставки и почему «у меня работает» — не аргумент.',
  description_en: 'Why DevOps exists, what the delivery loop is and why "works on my machine" is not an argument.',

  sections: [
    { id: 'problem',   title_ru: 'Проблема, из которой вырос DevOps', title_en: 'The problem DevOps grew out of' },
    { id: 'loop',      title_ru: 'Цикл поставки',                     title_en: 'The delivery loop' },
    { id: 'culture',   title_ru: 'Это культура, а не должность',      title_en: 'A culture, not a job title' },
    { id: 'metrics',   title_ru: 'Как измеряют DevOps',               title_en: 'How DevOps is measured' },
    { id: 'key-terms', title_ru: 'Ключевые термины',                  title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Ты умеешь писать код. Теперь вопрос посложнее: как этот код каждый день оказывается у пользователей — без ручных шагов, без ночных дежурств и без фразы «а у меня локально работало»? Этим и занимается DevOps.',
    intro_en:
      'You can write code. Now the harder question: how does that code reach users every day — with no manual steps, no night shifts and no "but it worked on my machine"? That is what DevOps is for.',

    blocks: [
      {
        sectionId: 'problem',
        heading_ru: 'Проблема, из которой вырос DevOps',
        heading_en: 'The problem DevOps grew out of',
        text_ru:
          'Раньше мир делился на две команды. Разработчики писали код и «перебрасывали его через стену» в отдел эксплуатации. Эксплуатация отвечала за стабильность и боялась любых изменений. Интересы прямо противоположны: одним нужно быстрее выкатывать, другим — чтобы ничего не падало.\n\nВ итоге релиз превращался в событие: раз в квартал, ночью, с планом отката на десять страниц и командой из восьми человек в переговорке. Если что-то ломалось, начинался поиск виноватого, а не причины.\n\nDevOps — это ответ: одна команда отвечает и за код, и за то, как он работает в бою. А всё, что делалось руками по чек-листу, отдаётся автоматике.',
        text_en:
          'The world used to be split into two teams. Developers wrote code and "threw it over the wall" to operations. Operations owned stability and feared every change. The incentives were exactly opposite: one side wants to ship faster, the other wants nothing to break.\n\nReleases became events: once a quarter, at night, with a ten-page rollback plan and eight people in a meeting room. When something broke, the hunt was for a culprit, not for a cause.\n\nDevOps is the answer: one team owns the code and how it behaves in production. Everything that used to be done by hand from a checklist is handed to automation.',
      },
      {
        sectionId: 'loop',
        heading_ru: 'Цикл поставки',
        heading_en: 'The delivery loop',
        text_ru:
          'Путь изменения от твоего редактора до пользователя всегда состоит из одних и тех же шагов. Ты уже знаешь первые два — остальные и есть этот курс.\n\nКод → сборка → тесты → упаковка в контейнер → деплой → мониторинг → обратная связь → снова код.\n\nВажно понимать: это кольцо, а не прямая. Мониторинг — не финиш, а источник данных для следующего изменения. Если из продакшена в разработку ничего не возвращается, ты выкатываешь вслепую.',
        text_en:
          'The path of a change from your editor to a user always has the same steps. You already know the first two — the rest is this course.\n\nCode → build → tests → package into a container → deploy → monitoring → feedback → code again.\n\nThe key is that it is a loop, not a line. Monitoring is not the finish line, it is the data source for the next change. If nothing flows back from production into development, you are shipping blind.',
        code: 'git push  →  build  →  test  →  deploy  →  monitor\n  ↑                                            │\n  └──────────────  feedback  ──────────────────┘',
        codeLang: 'bash',
        codeCaption: 'delivery loop',
      },
      {
        sectionId: 'culture',
        heading_ru: 'Это культура, а не должность',
        heading_en: 'A culture, not a job title',
        text_ru:
          'В вакансиях пишут «DevOps-инженер», но изначально DevOps — это набор договорённостей внутри команды:\n\n• Всё, что повторяется больше двух раз, автоматизируется.\n• Инфраструктура описывается кодом, а не кликами в панели — иначе её нельзя воспроизвести.\n• Сломанная сборка важнее новой фичи: пока main красный, никто не пишет новый код.\n• Инцидент разбирают без обвинений: ищут, какая часть системы позволила ошибке дойти до продакшена.\n\nПоследний пункт — самый недооценённый. Человек, который уронил прод, обычно не виноват: виновата система, которая позволила одной командой всё сломать.',
        text_en:
          'Job ads say "DevOps engineer", but DevOps started as a set of agreements inside a team:\n\n• Anything done more than twice gets automated.\n• Infrastructure is described as code, not as clicks in a dashboard — otherwise it cannot be reproduced.\n• A broken build beats a new feature: while main is red, nobody writes new code.\n• Incidents are reviewed blamelessly: the question is which part of the system let the mistake reach production.\n\nThat last one is the most underrated. The person who took production down is usually not at fault — the system that let one command break everything is.',
      },
      {
        sectionId: 'metrics',
        heading_ru: 'Как измеряют DevOps',
        heading_en: 'How DevOps is measured',
        text_ru:
          'Есть четыре метрики (их называют DORA), по которым сравнивают команды. Они хорошо объясняют, зачем всё это:\n\n• Частота деплоев — как часто изменения доезжают до пользователей.\n• Время от коммита до продакшена — сколько живёт готовая фича, ожидая выката.\n• Доля неудачных изменений — какой процент деплоев ломает что-то.\n• Время восстановления — сколько минут от «упало» до «работает».\n\nОбрати внимание на четвёртую: сильные команды не те, у кого никогда не падает. Сильные — те, кто чинит за минуты, потому что умеет откатываться одной командой.',
        text_en:
          'There are four metrics (known as DORA) used to compare teams. They explain the point of all this quite well:\n\n• Deployment frequency — how often changes reach users.\n• Lead time for changes — how long a finished feature waits to ship.\n• Change failure rate — what share of deployments break something.\n• Time to restore — how many minutes from "it is down" to "it works".\n\nNote the fourth one: strong teams are not the ones that never fail. They are the ones that recover in minutes, because rolling back is a single command.',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Пайплайн (pipeline)', term_en: 'Pipeline',
      definition_ru: 'Последовательность автоматических шагов, через которые проходит каждое изменение кода.',
      definition_en: 'The sequence of automatic steps every code change goes through.',
      example_ru: 'build → test → deploy', example_en: 'build → test → deploy',
    },
    {
      term_ru: 'Деплой (deploy)', term_en: 'Deploy',
      definition_ru: 'Доставка новой версии приложения на сервер, где её видят пользователи.',
      definition_en: 'Delivering a new version of the app to the server where users see it.',
    },
    {
      term_ru: 'Откат (rollback)', term_en: 'Rollback',
      definition_ru: 'Быстрый возврат к предыдущей рабочей версии, когда новая оказалась сломанной.',
      definition_en: 'Quickly returning to the previous working version when the new one turns out broken.',
    },
    {
      term_ru: 'Продакшен (production)', term_en: 'Production',
      definition_ru: 'Боевое окружение — то, которым пользуются настоящие пользователи. В отличие от dev и staging.',
      definition_en: 'The live environment real users work with, as opposed to dev and staging.',
    },
    {
      term_ru: 'Идемпотентность', term_en: 'Idempotency',
      definition_ru: 'Свойство операции давать один и тот же результат при повторном запуске. Важнейшее качество скриптов деплоя.',
      definition_en: 'A property of an operation that yields the same result when re-run. The most important quality of deploy scripts.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Amazon деплоит в продакшен в среднем чаще, чем раз в секунду. Это возможно только потому, что ни один деплой не делается руками.',
      text_en: 'Amazon deploys to production more than once per second on average. That is only possible because no deployment is done by hand.',
    },
    {
      text_ru: 'Термин DevOps появился в 2009 году на конференции DevOpsDays в Бельгии — до этого у явления просто не было названия.',
      text_en: 'The term DevOps appeared in 2009 at the DevOpsDays conference in Belgium — before that the practice simply had no name.',
    },
    {
      text_ru: 'Правило «пятницы без деплоев» существует не из-за техники, а из-за людей: чинить инцидент в субботу некому.',
      text_en: 'The "no deploys on Friday" rule is not about technology but about people: there is nobody around to fix an incident on Saturday.',
    },
  ],

  labs: [
    {
      id: 'lab-first-pipeline',
      title_ru: 'Собери свой первый пайплайн',
      title_en: 'Assemble your first pipeline',
      brief_ru: 'Четыре этапа, один правильный порядок. Перетащи их в конвейер и запусти — как в настоящей CI-системе, ошибка остановит выполнение на сломанном шаге.',
      brief_en: 'Four stages, one correct order. Drag them into the pipeline and run it — just like a real CI system, a mistake stops the run at the broken step.',
      task: {
        kind: 'pipeline-builder',
        levels: [
          {
            level: 'basic',
            title_ru: 'Базовый порядок',
            title_en: 'Basic order',
            goal_ru: 'Расставь четыре этапа так, чтобы изменение безопасно доехало до пользователей. Подумай: что бессмысленно делать до сборки, а что теряет смысл до деплоя?',
            goal_en: 'Order the four stages so a change safely reaches users. Think: what is pointless before the build, and what is meaningless before the deploy?',
            stages: [
              { id: 'build',   kind: 'build',   label_ru: 'Сборка',      label_en: 'Build',   command: 'npm run build' },
              { id: 'test',    kind: 'test',    label_ru: 'Тесты',       label_en: 'Test',    command: 'npm test' },
              { id: 'deploy',  kind: 'deploy',  label_ru: 'Деплой',      label_en: 'Deploy',  command: 'deploy.sh production' },
              { id: 'monitor', kind: 'monitor', label_ru: 'Мониторинг',  label_en: 'Monitor', command: 'healthcheck --watch' },
            ],
            solution: ['build', 'test', 'deploy', 'monitor'],
            hint_ru: 'Тестировать нечего, пока приложение не собрано. А мониторить нечего, пока оно не задеплоено.',
            hint_en: 'There is nothing to test until the app is built. And nothing to monitor until it is deployed.',
            explanation_ru: 'Сборка даёт артефакт, тесты проверяют именно его, деплой доставляет проверенный артефакт, мониторинг подтверждает, что в бою всё хорошо. Каждый шаг опирается на результат предыдущего — в этом вся идея пайплайна.',
            explanation_en: 'The build produces an artifact, tests check exactly that artifact, the deploy ships the verified artifact, and monitoring confirms it is healthy in production. Every step consumes the previous one — that is the whole idea of a pipeline.',
          },
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какая из метрик DORA лучше всего показывает зрелость команды в реагировании на аварии?',
      text_en: 'Which DORA metric best shows a team’s maturity in handling outages?',
      options_ru: ['Частота деплоев', 'Время восстановления после сбоя', 'Количество написанных тестов', 'Размер команды'],
      options_en: ['Deployment frequency', 'Time to restore service', 'Number of tests written', 'Team size'],
      correctIndex: 1,
      explanation_ru: 'Падения случаются у всех. Разница между слабой и сильной командой — в том, сколько минут занимает возврат к рабочему состоянию.',
      explanation_en: 'Everyone has outages. The difference between a weak and a strong team is how many minutes it takes to get back to a working state.',
    },
    {
      id: 'q2',
      text_ru: 'Почему деплой руками по чек-листу считается плохой практикой?',
      text_en: 'Why is deploying by hand from a checklist considered bad practice?',
      options_ru: [
        'Он медленнее автоматического на пару секунд',
        'Он невоспроизводим: человек устаёт, пропускает шаги и делает их в разном порядке',
        'Он требует лицензии',
        'Он не работает на Linux',
      ],
      options_en: [
        'It is a couple of seconds slower than automation',
        'It is not reproducible: humans get tired, skip steps and reorder them',
        'It requires a license',
        'It does not work on Linux',
      ],
      correctIndex: 1,
      explanation_ru: 'Главная ценность автоматизации не в скорости, а в повторяемости: скрипт делает одно и то же в сотый раз так же, как в первый.',
      explanation_en: 'The main value of automation is not speed but repeatability: a script does the same thing the hundredth time as it did the first.',
    },
    {
      id: 'q3',
      text_ru: 'Что означает «безобвинительный разбор инцидента» (blameless postmortem)?',
      text_en: 'What does a "blameless postmortem" mean?',
      options_ru: [
        'Инцидент не разбирают вообще, чтобы не расстраивать команду',
        'Ищут не виноватого человека, а место в системе, которое позволило ошибке дойти до продакшена',
        'Отчёт пишет только руководитель',
        'Виноватого не наказывают, но запоминают',
      ],
      options_en: [
        'The incident is not reviewed at all, to spare the team',
        'You look for the place in the system that let the mistake reach production, not for a guilty person',
        'Only the manager writes the report',
        'The culprit is not punished but remembered',
      ],
      correctIndex: 1,
      explanation_ru: 'Если человек смог одной командой уронить прод — проблема в отсутствии проверок, а не в человеке. Наказание виноватых приводит только к тому, что об инцидентах перестают рассказывать.',
      explanation_en: 'If one person could take production down with a single command, the problem is the missing guard rails, not the person. Punishing people only teaches them to hide incidents.',
    },
    {
      id: 'q4',
      text_ru: 'Почему цикл поставки изображают кольцом, а не прямой линией?',
      text_en: 'Why is the delivery loop drawn as a circle rather than a straight line?',
      options_ru: [
        'Так красивее на слайдах',
        'Потому что данные из мониторинга возвращаются в разработку и определяют следующее изменение',
        'Потому что деплой всегда откатывают',
        'Потому что тесты запускаются дважды',
      ],
      options_en: [
        'It looks better on slides',
        'Because monitoring data flows back into development and shapes the next change',
        'Because every deploy gets rolled back',
        'Because tests run twice',
      ],
      correctIndex: 1,
      explanation_ru: 'Мониторинг — не конец процесса, а его источник информации. Без обратной связи команда выкатывает вслепую.',
      explanation_en: 'Monitoring is not the end of the process but its information source. Without feedback, a team ships blind.',
    },
  ],
}
