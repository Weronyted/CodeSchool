import type { DevOpsLesson } from '@/types/devops'

export const devopsLinuxAdmin: DevOpsLesson = {
  slug: 'devops-linux-admin',
  moduleId: 'servers',
  order: 1,
  icon: '🐧',
  readTime: 15,

  title_ru: 'Linux-администрирование',
  title_en: 'Linux Administration',
  description_ru: 'SSH, пользователи, systemd, порты и диагностика упавшего сервиса.',
  description_en: 'SSH, users, systemd, ports and diagnosing a dead service.',

  sections: [
    { id: 'ssh',       title_ru: 'SSH и ключи',              title_en: 'SSH and keys' },
    { id: 'users',     title_ru: 'Пользователи и sudo',      title_en: 'Users and sudo' },
    { id: 'systemd',   title_ru: 'systemd: сервисы',         title_en: 'systemd: services' },
    { id: 'resources', title_ru: 'Диск, память, процессы',   title_en: 'Disk, memory, processes' },
    { id: 'firewall',  title_ru: 'Порты и фаервол',          title_en: 'Ports and the firewall' },
    { id: 'key-terms', title_ru: 'Ключевые термины',         title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Сервер — это тот же Linux, что и в контейнере, только его нельзя пересоздать одной командой. Здесь важно уметь три вещи: безопасно зайти, понять, что происходит, и вернуть упавший сервис к жизни.',
    intro_en:
      'A server is the same Linux you have in a container, except you cannot re-create it with one command. Three skills matter here: getting in safely, understanding what is happening, and bringing a dead service back to life.',

    blocks: [
      {
        sectionId: 'ssh',
        heading_ru: 'SSH и ключи',
        heading_en: 'SSH and keys',
        text_ru:
          'SSH — зашифрованный канал до сервера. Аутентификация бывает по паролю и по ключу, и в проде допустим только второй вариант.\n\nКлюч — это пара файлов. Приватный (`id_ed25519`) никогда не покидает твою машину. Публичный (`id_ed25519.pub`) кладётся на сервер в `~/.ssh/authorized_keys`. Сервер шифрует случайную строку публичным ключом, и только владелец приватного может её расшифровать — пароль по сети не передаётся вообще.\n\nПервое, что делают на новом сервере: выкладывают ключ, проверяют вход, затем отключают вход по паролю (`PasswordAuthentication no`). Боты сканируют интернет и перебирают пароли к 22 порту круглосуточно — без пароля перебирать нечего.',
        text_en:
          'SSH is an encrypted channel to the server. Authentication can be by password or by key, and only the second is acceptable in production.\n\nA key is a pair of files. The private one (`id_ed25519`) never leaves your machine. The public one (`id_ed25519.pub`) goes onto the server into `~/.ssh/authorized_keys`. The server encrypts a random string with the public key and only the holder of the private key can decrypt it — no password crosses the network at all.\n\nThe first thing done on a new server: install the key, verify the login, then disable password auth (`PasswordAuthentication no`). Bots scan the internet and brute-force port 22 around the clock — with no password there is nothing to brute-force.',
        code: 'ssh-keygen -t ed25519 -C "deploy@codeschool"\nssh-copy-id deploy@203.0.113.10\nssh deploy@203.0.113.10\n\n# на сервере: /etc/ssh/sshd_config\n#   PasswordAuthentication no\n#   PermitRootLogin no\nsudo systemctl restart ssh',
        codeLang: 'bash',
      },
      {
        sectionId: 'users',
        heading_ru: 'Пользователи и sudo',
        heading_en: 'Users and sudo',
        text_ru:
          'Работать под root постоянно — плохая идея, и дело не в паранойе. У root нет предохранителей: команда с опечаткой в пути выполнится молча и до конца.\n\nПравильная схема: отдельный пользователь для приложения (например, `deploy`), у которого есть доступ только к своим файлам. Для административных действий он получает `sudo` — тогда каждое повышение прав явное и попадает в лог `/var/log/auth.log`.\n\nОтдельно: приложение внутри контейнера тоже не должно работать от root. Если его взломают, злоумышленник окажется root внутри контейнера — а это уже половина пути к хосту.',
        text_en:
          'Working as root all the time is a bad idea, and not out of paranoia. Root has no safety catch: a command with a typo in the path runs silently and completely.\n\nThe right setup: a dedicated user for the application (say, `deploy`) with access only to its own files. For administrative work it gets `sudo` — then every privilege escalation is explicit and lands in `/var/log/auth.log`.\n\nSeparately: the app inside a container should not run as root either. If it is compromised, the attacker is root inside the container — already halfway to the host.',
        code: 'sudo adduser deploy\nsudo usermod -aG sudo deploy\nsudo usermod -aG docker deploy   # чтобы не писать sudo docker\n\nid deploy\nwhoami',
        codeLang: 'bash',
      },
      {
        sectionId: 'systemd',
        heading_ru: 'systemd: сервисы',
        heading_en: 'systemd: services',
        text_ru:
          'Запустить приложение командой в терминале мало: закроешь SSH — процесс умрёт. Нужен менеджер сервисов, и в современном Linux это systemd.\n\nОн умеет то, ради чего всё затевалось: запускать сервис при загрузке машины, перезапускать его при падении, писать логи в журнал и показывать статус.\n\nЧетыре команды покрывают почти всё:\n• `systemctl status app` — жив ли, когда упал, последние строки лога\n• `systemctl restart app` — перезапустить\n• `systemctl enable app` — включить автозапуск при загрузке\n• `journalctl -u app -f` — читать логи сервиса в реальном времени\n\nОбрати внимание на `enable`: без него сервис не поднимется после перезагрузки сервера. Это классическая история «всё работало, пока хостер не перезагрузил машину ночью».',
        text_en:
          'Starting an app with a terminal command is not enough: close the SSH session and the process dies. You need a service manager, and on modern Linux that is systemd.\n\nIt does exactly what is needed: start the service at boot, restart it on failure, write logs into the journal and report status.\n\nFour commands cover almost everything:\n• `systemctl status app` — is it alive, when did it die, the last log lines\n• `systemctl restart app` — restart it\n• `systemctl enable app` — enable start at boot\n• `journalctl -u app -f` — follow the service logs live\n\nNote `enable`: without it the service will not come back after a server reboot. That is the classic "everything worked until the host rebooted the machine at night" story.',
        code: '[Unit]\nDescription=Shop API\nAfter=network.target\n\n[Service]\nUser=deploy\nWorkingDirectory=/srv/shop\nExecStart=/usr/bin/docker compose up\nRestart=always\nRestartSec=5\n\n[Install]\nWantedBy=multi-user.target',
        codeLang: 'ini',
        codeCaption: '/etc/systemd/system/shop.service',
      },
      {
        sectionId: 'resources',
        heading_ru: 'Диск, память, процессы',
        heading_en: 'Disk, memory, processes',
        text_ru:
          'Три причины, по которым сервер «вдруг» перестаёт работать, и все три диагностируются одной командой каждая.\n\nЗакончилось место на диске (`df -h`). Самый частый виновник — логи и старые docker-образы. Приложение не может записать файл, база не может писать WAL, всё встаёт. Именно поэтому логи ротируют, а `docker system prune` запускают по расписанию.\n\nЗакончилась память (`free -h`). Тогда ядро включает OOM killer и убивает самый прожорливый процесс — обычно это и есть твоё приложение. В логах ты увидишь загадочный код выхода 137, что означает «убит сигналом 9».\n\nПроцессор загружен на 100% (`top`). Здесь важно смотреть не только на процент, но и на load average: если он устойчиво выше числа ядер, очередь задач растёт быстрее, чем машина успевает их разбирать.',
        text_en:
          'Three reasons a server "suddenly" stops working, each diagnosed by one command.\n\nThe disk is full (`df -h`). The usual culprits are logs and old docker images. The app cannot write a file, the database cannot write its WAL, everything stalls. That is exactly why logs are rotated and `docker system prune` runs on a schedule.\n\nMemory ran out (`free -h`). The kernel then triggers the OOM killer and kills the greediest process — usually your application. In the logs you see the mysterious exit code 137, meaning "killed by signal 9".\n\nThe CPU is pinned at 100% (`top`). Here you look beyond the percentage at load average: if it stays above the core count, the task queue grows faster than the machine can drain it.',
        code: 'df -h              # место на диске\nfree -h            # память\ntop                # процессы в реальном времени\nuptime             # load average за 1, 5 и 15 минут\ndu -sh /var/log/*  # кто занял диск\ndocker system prune -a --volumes   # ⚠ удалит и неиспользуемые тома',
        codeLang: 'bash',
      },
      {
        sectionId: 'firewall',
        heading_ru: 'Порты и фаервол',
        heading_en: 'Ports and the firewall',
        text_ru:
          'Правило простое: наружу открыто только то, что действительно должно быть доступно из интернета. Обычно это 22 (SSH), 80 (HTTP) и 443 (HTTPS). Всё остальное — база, Redis, метрики — доступно только внутри сервера или внутри сети Docker.\n\nСамая частая и самая дорогая ошибка новичка: `ports: "5432:5432"` у Postgres в compose-файле на публичном сервере. Через несколько часов базу найдут сканеры, а если пароль слабый — данные утекут или их зашифруют с требованием выкупа.\n\nПроверяй, что действительно слушает наружу: `ss -tulpn` покажет все открытые сокеты. Адрес `0.0.0.0:5432` означает «доступен из интернета», `127.0.0.1:5432` — «только с этой машины».',
        text_en:
          'The rule is simple: only expose what genuinely needs to be reachable from the internet. Usually 22 (SSH), 80 (HTTP) and 443 (HTTPS). Everything else — the database, Redis, metrics — is reachable only inside the server or inside the Docker network.\n\nThe most common and most expensive beginner mistake: `ports: "5432:5432"` for Postgres in a compose file on a public server. Within hours scanners find the database, and with a weak password the data leaks or gets encrypted for ransom.\n\nCheck what actually listens outward: `ss -tulpn` shows every open socket. An address of `0.0.0.0:5432` means "reachable from the internet", `127.0.0.1:5432` means "this machine only".',
        code: 'sudo ufw allow 22\nsudo ufw allow 80\nsudo ufw allow 443\nsudo ufw enable\nsudo ufw status\n\nss -tulpn          # что реально слушает',
        codeLang: 'bash',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'SSH-ключ', term_en: 'SSH key',
      definition_ru: 'Пара файлов: приватный остаётся у тебя, публичный кладётся на сервер. Пароль по сети не передаётся.',
      definition_en: 'A pair of files: the private one stays with you, the public one goes on the server. No password crosses the network.',
    },
    {
      term_ru: 'systemd', term_en: 'systemd',
      definition_ru: 'Менеджер сервисов Linux: запускает при загрузке, перезапускает при падении, ведёт журнал.',
      definition_en: 'The Linux service manager: starts services at boot, restarts them on failure, keeps the journal.',
    },
    {
      term_ru: 'journalctl', term_en: 'journalctl',
      definition_ru: 'Просмотр журнала systemd. `-u имя` фильтрует по сервису, `-f` следит за новыми строками.',
      definition_en: 'Reads the systemd journal. `-u name` filters by service, `-f` follows new lines.',
      example_ru: 'journalctl -u shop -n 50', example_en: 'journalctl -u shop -n 50',
    },
    {
      term_ru: 'OOM killer', term_en: 'OOM killer',
      definition_ru: 'Механизм ядра, убивающий процесс при нехватке памяти. Проявляется кодом выхода 137.',
      definition_en: 'The kernel mechanism that kills a process when memory runs out. Shows up as exit code 137.',
    },
    {
      term_ru: 'Load average', term_en: 'Load average',
      definition_ru: 'Средняя длина очереди задач за 1, 5 и 15 минут. Устойчивое значение выше числа ядер — перегрузка.',
      definition_en: 'The average task queue length over 1, 5 and 15 minutes. Consistently above the core count means overload.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Свежий сервер с открытым 22 портом начинают перебирать через несколько минут после появления в сети. Это не «кому я нужен» — это фоновый шум интернета.',
      text_en: 'A fresh server with port 22 open starts getting brute-forced minutes after it appears online. It is not "who would target me" — it is internet background noise.',
    },
    {
      text_ru: 'Код выхода 137 = 128 + 9, то есть «завершён сигналом 9». Увидел 137 в логах контейнера — почти наверняка не хватило памяти.',
      text_en: 'Exit code 137 = 128 + 9, meaning "terminated by signal 9". Seeing 137 in container logs almost always means it ran out of memory.',
    },
    {
      text_ru: '`docker system prune -a --volumes` освобождает десятки гигабайт, но флаг `--volumes` удалит и тома с данными базы, если их контейнеры остановлены.',
      text_en: '`docker system prune -a --volumes` frees tens of gigabytes, but `--volumes` also deletes database volumes whose containers are stopped.',
    },
  ],

  labs: [
    {
      id: 'lab-server-triage',
      title_ru: 'Сервис лежит после ночной перезагрузки',
      title_en: 'The service is down after a night reboot',
      brief_ru: 'Хостер перезагрузил машину в 03:40. Сайт не открывается. Зайди по SSH, найди причину и подними сервис так, чтобы он пережил следующую перезагрузку.',
      brief_en: 'The host rebooted the machine at 03:40 and the site is down. SSH in, find the cause and bring the service back so it survives the next reboot.',
      task: {
        kind: 'terminal-simulator',
        prompt: 'deploy@shop-prod:~$',
        motd_ru: [
          'Ubuntu 24.04.1 LTS',
          '  System restarted: today 03:40 (unscheduled by provider)',
          '',
          '# Сайт shop.example.com не открывается.',
          '# Разберись и восстанови сервис.',
          '',
        ],
        motd_en: [
          'Ubuntu 24.04.1 LTS',
          '  System restarted: today 03:40 (unscheduled by provider)',
          '',
          '# The site shop.example.com does not open.',
          '# Find out why and restore the service.',
          '',
        ],
        responses: [
          {
            match: 'uptime',
            output: [' 09:22:14 up 5:42,  1 user,  load average: 0.08, 0.11, 0.09'],
          },
          {
            match: 'systemctl status shop',
            unless: [],
            output: [
              '● shop.service - Shop API',
              '     Loaded: loaded (/etc/systemd/system/shop.service; disabled; preset: enabled)',
              '     Active: inactive (dead)',
              '',
              '# ← обрати внимание на два слова: disabled и inactive',
              '# сервис не запущен и не включён в автозапуск',
            ],
          },
          {
            match: 'df -h',
            output: [
              'Filesystem      Size  Used Avail Use% Mounted on',
              '/dev/vda1        78G   34G   41G  46% /',
              'tmpfs           1.9G     0  1.9G   0% /dev/shm',
            ],
          },
          {
            match: 'free -h',
            output: [
              '               total        used        free      shared  buff/cache   available',
              'Mem:           3.8Gi       612Mi       2.4Gi        12Mi       842Mi       3.0Gi',
              'Swap:          2.0Gi          0B       2.0Gi',
            ],
          },
          {
            match: 'ss -tulpn',
            output: [
              'Netid State  Local Address:Port   Process',
              'tcp   LISTEN 0.0.0.0:22          sshd',
              'tcp   LISTEN 0.0.0.0:80          nginx',
              '',
              '# порт 3000 никем не слушается — приложение действительно не работает',
            ],
          },
          {
            match: 'journalctl -u shop -n 20',
            output: [
              'авг 13 03:40:11 shop-prod systemd[1]: Stopped Shop API.',
              'авг 13 03:40:11 shop-prod systemd[1]: shop.service: Consumed 4h 12min CPU time.',
              '-- Boot 8f2a1c --',
              '# после перезагрузки записей нет: сервис ни разу не стартовал',
            ],
          },
          {
            match: 'sudo systemctl start shop',
            delayMs: 1100,
            output: [],
            sets: ['started'],
          },
          {
            match: 'sudo systemctl enable shop',
            delayMs: 600,
            output: [
              'Created symlink /etc/systemd/system/multi-user.target.wants/shop.service → /etc/systemd/system/shop.service.',
              '# теперь сервис поднимется сам после следующей перезагрузки',
            ],
            sets: ['enabled'],
          },
          {
            match: 'curl -I localhost:3000/healthz',
            requires: 'started',
            unless: ['curl: (7) Failed to connect to localhost port 3000: Connection refused'],
            delayMs: 500,
            output: ['HTTP/1.1 200 OK', 'content-type: application/json', '{"status":"ok"}'],
          },
          {
            match: 'docker ps',
            requires: 'started',
            unless: ['CONTAINER ID   IMAGE   STATUS   PORTS   NAMES', '# ни одного запущенного контейнера'],
            output: [
              'CONTAINER ID   IMAGE              STATUS         PORTS                    NAMES',
              'a91c4f7e2b83   shop-api:1.4.0     Up 40 seconds  0.0.0.0:3000->3000/tcp   shop-api-1',
              'c72d1a5b9e04   postgres:16-alpine Up 42 seconds  5432/tcp                 shop-db-1',
            ],
          },
          {
            match: 'cat /etc/systemd/system/shop\\.service',
            regex: true,
            output: [
              '[Unit]',
              'Description=Shop API',
              'After=network.target docker.service',
              '',
              '[Service]',
              'User=deploy',
              'WorkingDirectory=/srv/shop',
              'ExecStart=/usr/bin/docker compose up',
              'Restart=always',
              '',
              '[Install]',
              'WantedBy=multi-user.target',
            ],
          },
        ],
        goals: [
          { id: 'g1', description_ru: 'Посмотри состояние сервиса shop', description_en: 'Check the state of the shop service', pattern: '^systemctl status shop$' },
          { id: 'g2', description_ru: 'Убедись, что дело не в диске и не в памяти', description_en: 'Rule out disk and memory', pattern: '^(df -h|free -h)$' },
          { id: 'g3', description_ru: 'Проверь, слушает ли кто-нибудь нужный порт', description_en: 'Check whether anything listens on the port', pattern: '^ss -tulpn$' },
          { id: 'g4', description_ru: 'Запусти сервис', description_en: 'Start the service', pattern: '^sudo systemctl start shop$' },
          { id: 'g5', description_ru: 'Включи автозапуск, чтобы это не повторилось', description_en: 'Enable start at boot so it does not happen again', pattern: '^sudo systemctl enable shop$' },
          { id: 'g6', description_ru: 'Подтверди, что приложение отвечает', description_en: 'Confirm the app responds', pattern: '^curl -I localhost:3000/healthz$' },
        ],
        suggestions: [
          'uptime',
          'systemctl status shop',
          'journalctl -u shop -n 20',
          'df -h',
          'free -h',
          'ss -tulpn',
          'sudo systemctl start shop',
          'sudo systemctl enable shop',
          'docker ps',
          'curl -I localhost:3000/healthz',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Сервис работал, но после перезагрузки сервера не поднялся. Чего не хватало?',
      text_en: 'The service worked but did not come back after a reboot. What was missing?',
      options_ru: [
        '`systemctl start` — его никогда не запускали',
        '`systemctl enable` — автозапуск при загрузке не был включён',
        'Прав root',
        'Переустановки systemd',
      ],
      options_en: [
        '`systemctl start` — it was never started',
        '`systemctl enable` — start at boot was never turned on',
        'Root privileges',
        'A systemd reinstall',
      ],
      correctIndex: 1,
      explanation_ru: '`start` запускает сервис сейчас, `enable` добавляет его в автозапуск. Без второго всё работает ровно до первой перезагрузки.',
      explanation_en: '`start` runs the service now, `enable` adds it to boot. Without the latter everything works right up until the first reboot.',
    },
    {
      id: 'q2',
      text_ru: 'Контейнер завершился с кодом 137. Что это почти наверняка значит?',
      text_en: 'A container exited with code 137. What does that almost certainly mean?',
      options_ru: [
        'Ошибка в коде приложения',
        'Процесс убит сигналом 9 — чаще всего OOM killer из-за нехватки памяти',
        'Не найден образ',
        'Порт занят',
      ],
      options_en: [
        'A bug in the application code',
        'The process was killed by signal 9 — usually the OOM killer due to memory exhaustion',
        'The image was not found',
        'The port is busy',
      ],
      correctIndex: 1,
      explanation_ru: '137 = 128 + 9. Приложение не «упало само» — его убило ядро, потому что на машине кончилась память.',
      explanation_en: '137 = 128 + 9. The app did not "crash on its own" — the kernel killed it because the machine ran out of memory.',
    },
    {
      id: 'q3',
      text_ru: 'Почему на публичном сервере нельзя пробрасывать порт базы наружу?',
      text_en: 'Why must you not publish the database port on a public server?',
      options_ru: [
        'Postgres работает медленнее при пробросе',
        'База станет доступна из интернета: сканеры находят такие порты за часы и подбирают пароль',
        'Docker не разрешает больше двух портов',
        'Это ломает внутренний DNS',
      ],
      options_en: [
        'Postgres runs slower when published',
        'The database becomes reachable from the internet: scanners find such ports within hours and brute-force the password',
        'Docker allows no more than two ports',
        'It breaks the internal DNS',
      ],
      correctIndex: 1,
      explanation_ru: 'Для приложения внутри той же сети проброс не нужен вообще. Наружу открывают только 22, 80 и 443.',
      explanation_en: 'An app in the same network needs no publishing at all. Only 22, 80 and 443 face outward.',
    },
    {
      id: 'q4',
      text_ru: 'Почему вход по SSH-ключу безопаснее входа по паролю?',
      text_en: 'Why is SSH key login safer than password login?',
      options_ru: [
        'Ключ короче пароля',
        'Приватный ключ не передаётся по сети, и его нельзя подобрать перебором как пароль',
        'Ключ меняется каждый час',
        'Ключ шифрует трафик, а пароль нет',
      ],
      options_en: [
        'A key is shorter than a password',
        'The private key never crosses the network and cannot be brute-forced like a password',
        'The key rotates every hour',
        'The key encrypts traffic while a password does not',
      ],
      correctIndex: 1,
      explanation_ru: 'Сервер проверяет владение приватным ключом криптографически. Перебирать нечего — секрет никогда не покидает твою машину.',
      explanation_en: 'The server verifies possession of the private key cryptographically. There is nothing to brute-force — the secret never leaves your machine.',
    },
  ],
}
