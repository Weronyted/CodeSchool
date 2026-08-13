import type { DevOpsModule, DevOpsModuleId } from '@/types/devops'

// ─── Course registry ────────────────────────────────────────────────────────
//
// Mirrors src/lessons/index.ts (slugs + meta map) so the DevOps course is
// listed and navigated the same way, but adds a module layer on top.

export const DEVOPS_MODULES: DevOpsModule[] = [
  {
    id: 'foundations',
    order: 1,
    icon: '⚙️',
    accent: '#38BDF8',
    title_ru: 'Основы и подготовка',
    title_en: 'Foundations & Setup',
    description_ru: 'DevOps-мышление, продвинутый терминал и Git на уровне команды.',
    description_en: 'The DevOps mindset, an advanced terminal and team-level Git.',
    lessonSlugs: ['devops-mindset', 'devops-terminal', 'devops-git-advanced'],
  },
  {
    id: 'containers',
    order: 2,
    icon: '📦',
    accent: '#4361EE',
    title_ru: 'Контейнеризация',
    title_en: 'Containerization',
    description_ru: 'Docker, Dockerfile и Docker Compose — приложение едет целиком.',
    description_en: 'Docker, Dockerfile and Docker Compose — ship the whole app.',
    lessonSlugs: ['devops-docker-intro', 'devops-dockerfile', 'devops-compose'],
  },
  {
    id: 'cicd',
    order: 3,
    icon: '🔁',
    accent: '#7B2FBE',
    title_ru: 'Автоматизация / CI-CD',
    title_en: 'Automation / CI-CD',
    description_ru: 'GitHub Actions и пайплайны build → test → deploy.',
    description_en: 'GitHub Actions and build → test → deploy pipelines.',
    lessonSlugs: ['devops-cicd-basics', 'devops-github-actions', 'devops-pipeline-design'],
  },
  {
    id: 'servers',
    order: 4,
    icon: '🖥️',
    accent: '#F472B6',
    title_ru: 'Серверы и облако',
    title_en: 'Servers & Cloud',
    description_ru: 'Linux-администрирование и деплой на настоящий сервер.',
    description_en: 'Linux administration and deploying to a real server.',
    lessonSlugs: ['devops-linux-admin', 'devops-server-deploy', 'devops-nginx-tls'],
  },
  {
    id: 'observability',
    order: 5,
    icon: '📡',
    accent: '#F08C00',
    title_ru: 'Мониторинг и логирование',
    title_en: 'Monitoring & Logging',
    description_ru: 'Логи, метрики, аптайм-мониторинг и алерты, которые будят вовремя.',
    description_en: 'Logs, metrics, uptime monitoring and alerts that wake you at the right time.',
    lessonSlugs: ['devops-logging', 'devops-monitoring'],
  },
  {
    id: 'capstone',
    order: 6,
    icon: '🏁',
    accent: '#2F9E44',
    title_ru: 'Финальный проект',
    title_en: 'Capstone Project',
    description_ru: 'Полный цикл: контейнер → CI/CD → деплой → мониторинг.',
    description_en: 'The full loop: container → CI/CD → deploy → monitoring.',
    lessonSlugs: ['devops-capstone'],
  },
]

/** Flat, ordered list of every lesson in the course — drives prev/next and gating. */
export const DEVOPS_SLUGS: string[] = DEVOPS_MODULES.flatMap((m) => m.lessonSlugs)

export interface DevOpsLessonMeta {
  moduleId: DevOpsModuleId
  icon: string
  readTime: number
  title_ru: string
  title_en: string
  description_ru: string
  description_en: string
}

export const DEVOPS_META: Record<string, DevOpsLessonMeta> = {
  // ─── 1. Основы и подготовка
  'devops-mindset': {
    moduleId: 'foundations',
    icon: '🧠',
    readTime: 10,
    title_ru: 'DevOps-мышление',
    title_en: 'The DevOps Mindset',
    description_ru: 'Зачем нужен DevOps, что такое цикл поставки и почему «у меня работает» — не аргумент.',
    description_en: 'Why DevOps exists, what the delivery loop is and why "works on my machine" is not an argument.',
  },
  'devops-terminal': {
    moduleId: 'foundations',
    icon: '⌨️',
    readTime: 14,
    title_ru: 'Продвинутый терминал',
    title_en: 'Advanced Terminal',
    description_ru: 'Пайпы, grep, процессы, права доступа и переменные окружения.',
    description_en: 'Pipes, grep, processes, permissions and environment variables.',
  },
  'devops-git-advanced': {
    moduleId: 'foundations',
    icon: '🌿',
    readTime: 14,
    title_ru: 'Продвинутый Git',
    title_en: 'Advanced Git',
    description_ru: 'Ветки, rebase, конфликты, теги и стратегия ветвления в команде.',
    description_en: 'Branches, rebase, conflicts, tags and a team branching strategy.',
  },

  // ─── 2. Контейнеризация
  'devops-docker-intro': {
    moduleId: 'containers',
    icon: '🐳',
    readTime: 12,
    title_ru: 'Docker: зачем контейнеры',
    title_en: 'Docker: Why Containers',
    description_ru: 'Образ, контейнер, реестр — и чем это отличается от виртуальной машины.',
    description_en: 'Image, container, registry — and how it differs from a virtual machine.',
  },
  'devops-dockerfile': {
    moduleId: 'containers',
    icon: '📄',
    readTime: 15,
    title_ru: 'Dockerfile',
    title_en: 'Dockerfile',
    description_ru: 'Слои, кэш, multi-stage build и как не собрать образ на 1.2 ГБ.',
    description_en: 'Layers, cache, multi-stage builds and how not to ship a 1.2 GB image.',
  },
  'devops-compose': {
    moduleId: 'containers',
    icon: '🧩',
    readTime: 14,
    title_ru: 'Docker Compose',
    title_en: 'Docker Compose',
    description_ru: 'Несколько сервисов, сети, тома и зависимости в одном YAML-файле.',
    description_en: 'Several services, networks, volumes and dependencies in one YAML file.',
  },

  // ─── 3. Автоматизация / CI-CD
  'devops-cicd-basics': {
    moduleId: 'cicd',
    icon: '🔁',
    readTime: 12,
    title_ru: 'Что такое CI/CD',
    title_en: 'What is CI/CD',
    description_ru: 'Непрерывная интеграция и доставка: зачем автоматизировать то, что делаешь руками.',
    description_en: 'Continuous integration and delivery: why automate what you do by hand.',
  },
  'devops-github-actions': {
    moduleId: 'cicd',
    icon: '🤖',
    readTime: 16,
    title_ru: 'GitHub Actions',
    title_en: 'GitHub Actions',
    description_ru: 'Workflow, jobs, steps, триггеры и секреты — пишем первый пайплайн.',
    description_en: 'Workflows, jobs, steps, triggers and secrets — writing your first pipeline.',
  },
  'devops-pipeline-design': {
    moduleId: 'cicd',
    icon: '🏗️',
    readTime: 15,
    title_ru: 'Проектирование пайплайна',
    title_en: 'Designing a Pipeline',
    description_ru: 'build → test → deploy → monitor: порядок, ветвления и зависимости сервисов.',
    description_en: 'build → test → deploy → monitor: order, branching and service dependencies.',
  },

  // ─── 4. Серверы и облако
  'devops-linux-admin': {
    moduleId: 'servers',
    icon: '🐧',
    readTime: 15,
    title_ru: 'Linux-администрирование',
    title_en: 'Linux Administration',
    description_ru: 'SSH, пользователи, systemd, порты и диагностика упавшего сервиса.',
    description_en: 'SSH, users, systemd, ports and diagnosing a dead service.',
  },
  'devops-server-deploy': {
    moduleId: 'servers',
    icon: '🚀',
    readTime: 16,
    title_ru: 'Деплой на реальный сервер',
    title_en: 'Deploying to a Real Server',
    description_ru: 'От чистой машины до работающего приложения: окружения, релизы и откат.',
    description_en: 'From a bare machine to a running app: environments, releases and rollback.',
  },
  'devops-nginx-tls': {
    moduleId: 'servers',
    icon: '🔐',
    readTime: 13,
    title_ru: 'Nginx, домен и HTTPS',
    title_en: 'Nginx, Domain & HTTPS',
    description_ru: 'Обратный прокси, домен, сертификат Let’s Encrypt и заголовки безопасности.',
    description_en: 'Reverse proxy, domain, a Let’s Encrypt certificate and security headers.',
  },

  // ─── 5. Мониторинг и логирование
  'devops-logging': {
    moduleId: 'observability',
    icon: '📜',
    readTime: 14,
    title_ru: 'Логи и разбор инцидентов',
    title_en: 'Logs & Incident Triage',
    description_ru: 'Уровни логов, структурированные логи и поиск корневой причины в потоке событий.',
    description_en: 'Log levels, structured logs and finding the root cause in a stream of events.',
  },
  'devops-monitoring': {
    moduleId: 'observability',
    icon: '📈',
    readTime: 14,
    title_ru: 'Мониторинг и алерты',
    title_en: 'Monitoring & Alerts',
    description_ru: 'Аптайм, health-check, метрики, SLO и алерты, на которые реально реагируют.',
    description_en: 'Uptime, health checks, metrics, SLOs and alerts people actually act on.',
  },

  // ─── 6. Финальный проект
  'devops-capstone': {
    moduleId: 'capstone',
    icon: '🏁',
    readTime: 25,
    title_ru: 'Финальный проект: полный цикл',
    title_en: 'Capstone: The Full Loop',
    description_ru: 'Контейнеризуй, собери пайплайн, задеплой, поставь мониторинг и разбери инцидент.',
    description_en: 'Containerize, build a pipeline, deploy, add monitoring and handle an incident.',
  },
}

export function getModule(id: DevOpsModuleId): DevOpsModule {
  return DEVOPS_MODULES.find((m) => m.id === id) as DevOpsModule
}

export function getModuleOfLesson(slug: string): DevOpsModule | undefined {
  const meta = DEVOPS_META[slug]
  return meta ? DEVOPS_MODULES.find((m) => m.id === meta.moduleId) : undefined
}

export function isDevOpsSlug(slug: string): boolean {
  return Object.prototype.hasOwnProperty.call(DEVOPS_META, slug)
}
