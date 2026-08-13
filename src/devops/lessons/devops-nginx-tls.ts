import type { DevOpsLesson } from '@/types/devops'

export const devopsNginxTls: DevOpsLesson = {
  slug: 'devops-nginx-tls',
  moduleId: 'servers',
  order: 3,
  icon: '🔐',
  readTime: 13,

  title_ru: 'Nginx, домен и HTTPS',
  title_en: 'Nginx, Domain & HTTPS',
  description_ru: 'Обратный прокси, домен, сертификат Let’s Encrypt и заголовки безопасности.',
  description_en: 'Reverse proxy, domain, a Let’s Encrypt certificate and security headers.',

  sections: [
    { id: 'proxy',     title_ru: 'Зачем нужен обратный прокси', title_en: 'Why a reverse proxy' },
    { id: 'dns',       title_ru: 'Домен и DNS',                 title_en: 'Domain and DNS' },
    { id: 'tls',       title_ru: 'HTTPS за десять минут',       title_en: 'HTTPS in ten minutes' },
    { id: 'headers',   title_ru: 'Заголовки и безопасность',    title_en: 'Headers and security' },
    { id: 'key-terms', title_ru: 'Ключевые термины',            title_en: 'Key terms' },
  ],

  content: {
    intro_ru:
      'Приложение слушает порт 3000, а пользователи ходят на 443 по домену с замочком в адресной строке. Между ними стоит обратный прокси — обычно nginx. Он же решает задачи, которые приложению решать не нужно: TLS, статика, сжатие, ограничение частоты запросов.',
    intro_en:
      'The app listens on port 3000 while users arrive at 443, on a domain, with a padlock in the address bar. Between them sits a reverse proxy — usually nginx. It also handles what the app should not: TLS, static files, compression, rate limiting.',

    blocks: [
      {
        sectionId: 'proxy',
        heading_ru: 'Зачем нужен обратный прокси',
        heading_en: 'Why a reverse proxy',
        text_ru:
          'Можно ли открыть приложение прямо на 80 порту? Технически да. Но тогда на него ложится всё, для чего оно не предназначено.\n\nЧто делает прокси:\n• Терминирует TLS — сертификат живёт в одном месте, а не в каждом сервисе.\n• Раздаёт статику напрямую с диска, не тревожа приложение.\n• Распределяет трафик между несколькими экземплярами — основа rolling и blue-green деплоев.\n• Ограничивает частоту запросов и размер тела, отсекая мусорный трафик до приложения.\n\nИ ещё одно, важное для DevOps: прокси позволяет переключать трафик между версиями. Пока новый контейнер прогревается, старый продолжает отвечать — именно так делается деплой без простоя.',
        text_en:
          'Could you expose the app directly on port 80? Technically yes. But then it carries everything it was never designed for.\n\nWhat the proxy does:\n• Terminates TLS — the certificate lives in one place instead of in every service.\n• Serves static files straight from disk without bothering the app.\n• Balances traffic across several instances — the basis of rolling and blue-green deploys.\n• Limits request rate and body size, cutting junk traffic before it reaches the app.\n\nAnd one more thing that matters for DevOps: a proxy can switch traffic between versions. While the new container warms up, the old one keeps answering — that is exactly how zero-downtime deploys work.',
        code: 'server {\n  listen 80;\n  server_name shop.example.com;\n\n  location / {\n    proxy_pass http://127.0.0.1:3000;\n    proxy_set_header Host              $host;\n    proxy_set_header X-Real-IP         $remote_addr;\n    proxy_set_header X-Forwarded-For   $proxy_add_x_forwarded_for;\n    proxy_set_header X-Forwarded-Proto $scheme;\n  }\n}',
        codeLang: 'ini',
        codeCaption: '/etc/nginx/sites-available/shop',
      },
      {
        sectionId: 'dns',
        heading_ru: 'Домен и DNS',
        heading_en: 'Domain and DNS',
        text_ru:
          'Чтобы домен указывал на сервер, нужна одна A-запись: `shop.example.com → 203.0.113.10`. Всё.\n\nЕдинственная тонкость — TTL и кэширование. Изменения DNS расходятся по миру не мгновенно: от нескольких минут до суток, в зависимости от TTL записи. Поэтому перед переездом сервера TTL заранее уменьшают до 300 секунд, а после переезда возвращают обратно.\n\nПроверить, куда сейчас указывает домен, можно локально: `dig +short shop.example.com`. Если ответ не совпадает с IP сервера, дело не в nginx — до него запрос просто не доходит.',
        text_en:
          'To point a domain at a server you need one A record: `shop.example.com → 203.0.113.10`. That is all.\n\nThe only subtlety is TTL and caching. DNS changes do not propagate instantly: anywhere from minutes to a day, depending on the record TTL. So before moving a server the TTL is lowered to 300 seconds in advance and restored afterwards.\n\nYou can check where a domain currently points locally: `dig +short shop.example.com`. If the answer does not match the server IP, the problem is not nginx — requests never reach it.',
      },
      {
        sectionId: 'tls',
        heading_ru: 'HTTPS за десять минут',
        heading_en: 'HTTPS in ten minutes',
        text_ru:
          'Бесплатные сертификаты Let’s Encrypt выдаются автоматически. Инструмент `certbot` сам получает сертификат, сам правит конфиг nginx и сам ставит задачу на обновление.\n\nСертификат действует 90 дней и обновляется автоматически — это сделано намеренно: короткий срок жизни заставляет автоматизировать процесс, а не полагаться на человека, который «не забудет через год».\n\nПосле подключения HTTPS обязательно оставь редирект с 80 на 443. Иначе часть пользователей, набравших адрес руками, продолжит ходить по незашифрованному соединению.\n\nИ самая частая ошибка: certbot не может выдать сертификат, пока домен не указывает на этот сервер. Проверка проходит через реальный HTTP-запрос к твоему домену. Сначала DNS — потом сертификат.',
        text_en:
          'Free Let’s Encrypt certificates are issued automatically. The `certbot` tool obtains the certificate, edits the nginx config and schedules the renewal itself.\n\nA certificate is valid for 90 days and renews automatically — deliberately so: a short lifetime forces the process to be automated rather than trusted to a human who "will not forget in a year".\n\nAfter enabling HTTPS, keep the redirect from 80 to 443. Otherwise users who typed the address by hand keep browsing over an unencrypted connection.\n\nAnd the most common failure: certbot cannot issue a certificate until the domain points at this server. Validation goes through a real HTTP request to your domain. DNS first, certificate second.',
        code: 'sudo apt install certbot python3-certbot-nginx\nsudo certbot --nginx -d shop.example.com\n\n# проверить автообновление\nsudo certbot renew --dry-run\n\n# срок действия текущего сертификата\nsudo certbot certificates',
        codeLang: 'bash',
      },
      {
        sectionId: 'headers',
        heading_ru: 'Заголовки и безопасность',
        heading_en: 'Headers and security',
        text_ru:
          'Несколько строк в конфиге закрывают целый класс атак:\n\n• `Strict-Transport-Security` — браузер запомнит, что на этот домен ходить только по HTTPS, даже если пользователь наберёт http://.\n• `X-Content-Type-Options: nosniff` — браузер не будет угадывать тип файла и исполнять картинку как скрипт.\n• `X-Frame-Options: DENY` — сайт нельзя встроить во фрейм на чужой странице (защита от кликджекинга).\n• `client_max_body_size` — ограничивает размер загружаемого файла до того, как он дойдёт до приложения.\n\nОтдельно про `X-Forwarded-For`: без этого заголовка приложение будет видеть IP прокси вместо IP пользователя, и все логи, ограничения и геолокация сломаются. Это тот самый случай, когда забытая строка конфига обнаруживается через месяц при разборе инцидента.',
        text_en:
          'A few config lines close an entire class of attacks:\n\n• `Strict-Transport-Security` — the browser remembers to use HTTPS for this domain even if the user types http://.\n• `X-Content-Type-Options: nosniff` — the browser will not guess file types and execute an image as a script.\n• `X-Frame-Options: DENY` — the site cannot be embedded in a frame on someone else\'s page (clickjacking protection).\n• `client_max_body_size` — caps upload size before it ever reaches the app.\n\nOn `X-Forwarded-For` specifically: without that header the app sees the proxy IP instead of the user IP, and all logs, rate limits and geolocation break. This is the classic forgotten config line that surfaces a month later during an incident review.',
        code: 'add_header Strict-Transport-Security "max-age=31536000" always;\nadd_header X-Content-Type-Options "nosniff" always;\nadd_header X-Frame-Options "DENY" always;\n\nclient_max_body_size 10m;\ngzip on;\ngzip_types text/css application/javascript application/json;',
        codeLang: 'ini',
      },
    ],
  },

  keyTerms: [
    {
      term_ru: 'Обратный прокси', term_en: 'Reverse proxy',
      definition_ru: 'Сервер, принимающий запросы пользователей и передающий их приложению. Отвечает за TLS, статику и распределение трафика.',
      definition_en: 'A server that accepts user requests and forwards them to the app. Handles TLS, static files and traffic distribution.',
    },
    {
      term_ru: 'A-запись', term_en: 'A record',
      definition_ru: 'DNS-запись, связывающая доменное имя с IP-адресом сервера.',
      definition_en: 'The DNS record binding a domain name to a server IP address.',
    },
    {
      term_ru: 'TLS-терминация', term_en: 'TLS termination',
      definition_ru: 'Расшифровка HTTPS на прокси: дальше внутрь трафик идёт обычным HTTP по локальной сети.',
      definition_en: 'Decrypting HTTPS at the proxy: traffic continues inward as plain HTTP over the local network.',
    },
    {
      term_ru: 'Let’s Encrypt', term_en: 'Let’s Encrypt',
      definition_ru: 'Центр сертификации, выдающий бесплатные TLS-сертификаты на 90 дней с автоматическим обновлением.',
      definition_en: 'A certificate authority issuing free 90-day TLS certificates with automatic renewal.',
    },
    {
      term_ru: 'X-Forwarded-For', term_en: 'X-Forwarded-For',
      definition_ru: 'Заголовок, в котором прокси передаёт приложению настоящий IP пользователя.',
      definition_en: 'The header through which the proxy passes the real user IP to the application.',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'У Let’s Encrypt есть лимит: 5 неудачных попыток выпуска в час на домен. Отлаживать конфиг лучше с флагом `--dry-run`, иначе можно заблокировать себе выпуск на час.',
      text_en: 'Let’s Encrypt has a limit of 5 failed issuance attempts per hour per domain. Debug your config with `--dry-run`, or you can lock yourself out for an hour.',
    },
    {
      text_ru: 'Срок жизни сертификата в 90 дней выбран намеренно: он делает ручное обновление невыносимым и вынуждает автоматизировать процесс.',
      text_en: 'The 90-day certificate lifetime is deliberate: it makes manual renewal unbearable and forces automation.',
    },
    {
      text_ru: '`nginx -t` проверяет конфиг до перезапуска. Без этой привычки одна опечатка в конфиге кладёт сайт целиком.',
      text_en: '`nginx -t` validates the config before a restart. Without that habit one typo takes the whole site down.',
    },
  ],

  labs: [
    {
      id: 'lab-nginx-https',
      title_ru: 'Подключи домен и HTTPS',
      title_en: 'Wire up the domain and HTTPS',
      brief_ru: 'Приложение работает на 3000, домен куплен. Настрой прокси, проверь конфиг, выпусти сертификат и убедись, что HTTP редиректит на HTTPS.',
      brief_en: 'The app runs on 3000 and the domain is registered. Configure the proxy, validate the config, issue the certificate and confirm HTTP redirects to HTTPS.',
      task: {
        kind: 'terminal-simulator',
        prompt: 'deploy@shop-prod:~$',
        motd_ru: [
          '# Приложение слушает 127.0.0.1:3000',
          '# Домен shop.example.com куплен. Нужно: прокси + HTTPS.',
          '',
        ],
        motd_en: [
          '# The app listens on 127.0.0.1:3000',
          '# Domain shop.example.com is registered. You need: proxy + HTTPS.',
          '',
        ],
        responses: [
          {
            match: 'dig \\+short shop\\.example\\.com',
            regex: true,
            delayMs: 500,
            output: ['203.0.113.10', '# домен указывает на этот сервер — можно выпускать сертификат'],
            sets: ['dns-ok'],
          },
          {
            match: 'curl -I localhost:3000/healthz',
            output: ['HTTP/1.1 200 OK', '{"status":"ok"}'],
          },
          {
            match: 'cat /etc/nginx/sites-available/shop',
            output: [
              'server {',
              '  listen 80;',
              '  server_name shop.example.com;',
              '  location / {',
              '    proxy_pass http://127.0.0.1:3000;',
              '    proxy_set_header Host $host;',
              '    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;',
              '    proxy_set_header X-Forwarded-Proto $scheme;',
              '  }',
              '}',
            ],
          },
          {
            match: 'sudo nginx -t',
            delayMs: 500,
            output: [
              'nginx: the configuration file /etc/nginx/nginx.conf syntax is ok',
              'nginx: configuration file /etc/nginx/nginx.conf test is successful',
            ],
            sets: ['config-ok'],
          },
          {
            match: 'sudo systemctl reload nginx',
            requires: 'config-ok',
            unless: ['nginx: [emerg] unexpected end of file — сначала проверь конфиг: sudo nginx -t'],
            delayMs: 600,
            output: [],
            sets: ['nginx-reloaded'],
          },
          {
            match: 'sudo certbot --nginx -d shop\\.example\\.com',
            regex: true,
            requires: 'dns-ok',
            unless: [
              'Challenge failed for domain shop.example.com',
              '# проверка Let\'s Encrypt идёт HTTP-запросом к домену — сначала убедись, что DNS указывает сюда',
            ],
            delayMs: 2000,
            output: [
              'Requesting a certificate for shop.example.com',
              'Successfully received certificate.',
              'Certificate is saved at: /etc/letsencrypt/live/shop.example.com/fullchain.pem',
              'This certificate expires on 2026-11-11.',
              'Deploying certificate — nginx config updated, redirect 80 → 443 added.',
            ],
            sets: ['tls-on'],
          },
          {
            match: 'curl -I http://shop\\.example\\.com',
            regex: true,
            requires: 'tls-on',
            unless: ['HTTP/1.1 200 OK', '# сайт открыт по незашифрованному соединению — сертификата ещё нет'],
            delayMs: 600,
            output: [
              'HTTP/1.1 301 Moved Permanently',
              'Location: https://shop.example.com/',
              '# редирект работает',
            ],
          },
          {
            match: 'sudo certbot renew --dry-run',
            requires: 'tls-on',
            unless: ['No renewals were attempted — сертификатов пока нет'],
            delayMs: 1400,
            output: [
              'Processing /etc/letsencrypt/renewal/shop.example.com.conf',
              'Simulating renewal of an existing certificate for shop.example.com',
              'Congratulations, all simulated renewals succeeded.',
            ],
          },
        ],
        goals: [
          { id: 'g1', description_ru: 'Убедись, что домен указывает на этот сервер', description_en: 'Confirm the domain points at this server', pattern: '^dig \\+short shop\\.example\\.com$' },
          { id: 'g2', description_ru: 'Прочитай конфиг прокси', description_en: 'Read the proxy config', pattern: '^cat /etc/nginx/sites-available/shop$' },
          { id: 'g3', description_ru: 'Проверь синтаксис конфига до перезапуска', description_en: 'Validate the config before reloading', pattern: '^sudo nginx -t$' },
          { id: 'g4', description_ru: 'Примени конфиг', description_en: 'Apply the config', pattern: '^sudo systemctl reload nginx$' },
          { id: 'g5', description_ru: 'Выпусти TLS-сертификат', description_en: 'Issue the TLS certificate', pattern: '^sudo certbot --nginx -d shop\\.example\\.com$' },
          { id: 'g6', description_ru: 'Проверь, что HTTP редиректит на HTTPS', description_en: 'Check that HTTP redirects to HTTPS', pattern: '^curl -I http://shop\\.example\\.com$' },
        ],
        suggestions: [
          'dig +short shop.example.com',
          'curl -I localhost:3000/healthz',
          'cat /etc/nginx/sites-available/shop',
          'sudo nginx -t',
          'sudo systemctl reload nginx',
          'sudo certbot --nginx -d shop.example.com',
          'curl -I http://shop.example.com',
          'sudo certbot renew --dry-run',
        ],
      },
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Certbot не может выпустить сертификат. Что проверить первым делом?',
      text_en: 'Certbot cannot issue a certificate. What do you check first?',
      options_ru: [
        'Версию nginx',
        'Указывает ли домен на этот сервер: проверка идёт реальным HTTP-запросом к домену',
        'Свободное место на диске',
        'Часовой пояс сервера',
      ],
      options_en: [
        'The nginx version',
        'Whether the domain points at this server: validation is a real HTTP request to the domain',
        'Free disk space',
        'The server timezone',
      ],
      correctIndex: 1,
      explanation_ru: 'Let’s Encrypt проверяет владение доменом, обращаясь к нему по HTTP. Если DNS ведёт на другой IP, проверка не пройдёт.',
      explanation_en: 'Let’s Encrypt proves domain ownership by requesting it over HTTP. If DNS points elsewhere, validation fails.',
    },
    {
      id: 'q2',
      text_ru: 'В логах приложения у всех запросов один и тот же IP. Почему?',
      text_en: 'Every request in the app logs shows the same IP. Why?',
      options_ru: [
        'Все пользователи из одной страны',
        'Прокси не передаёт X-Forwarded-For, поэтому приложение видит IP самого прокси',
        'Сломался DNS',
        'Nginx кэширует ответы',
      ],
      options_en: [
        'All users are from one country',
        'The proxy does not pass X-Forwarded-For, so the app sees the proxy IP',
        'DNS is broken',
        'Nginx caches responses',
      ],
      correctIndex: 1,
      explanation_ru: 'Для приложения источник запроса — прокси. Настоящий IP пользователя приходит только в заголовке X-Forwarded-For.',
      explanation_en: 'From the app\'s perspective the request comes from the proxy. The real user IP arrives only in the X-Forwarded-For header.',
    },
    {
      id: 'q3',
      text_ru: 'Зачем запускать `nginx -t` перед перезапуском?',
      text_en: 'Why run `nginx -t` before reloading?',
      options_ru: [
        'Чтобы очистить кэш',
        'Чтобы проверить синтаксис конфига: иначе одна опечатка положит сайт после reload',
        'Чтобы обновить сертификат',
        'Чтобы посмотреть логи',
      ],
      options_en: [
        'To clear the cache',
        'To validate the config syntax: otherwise one typo takes the site down on reload',
        'To renew the certificate',
        'To view the logs',
      ],
      correctIndex: 1,
      explanation_ru: 'Nginx с битым конфигом не стартует. Проверка занимает секунду и спасает от простоя.',
      explanation_en: 'Nginx will not start with a broken config. The check takes a second and prevents downtime.',
    },
    {
      id: 'q4',
      text_ru: 'Почему сертификаты Let’s Encrypt живут всего 90 дней?',
      text_en: 'Why do Let’s Encrypt certificates last only 90 days?',
      options_ru: [
        'Чтобы продавать длинные сертификаты',
        'Короткий срок вынуждает автоматизировать обновление и ограничивает ущерб от утечки ключа',
        'Из-за ограничений TLS',
        'Так требует браузер Chrome',
      ],
      options_en: [
        'To sell longer certificates',
        'A short lifetime forces automated renewal and limits the damage of a leaked key',
        'Because of TLS limitations',
        'Chrome requires it',
      ],
      correctIndex: 1,
      explanation_ru: 'Ручное обновление раз в 90 дней невыносимо — значит, его автоматизируют. А украденный ключ протухнет максимум через три месяца.',
      explanation_en: 'Renewing by hand every 90 days is unbearable — so it gets automated. And a stolen key expires within three months at most.',
    },
  ],
}
