import type { MultipleChoiceRow } from '@/types/lesson'

export const buildYourWebpage = {
  slug: 'build-your-webpage',
  title: 'Создай свою страницу',
  readTime: 12,
  sections: [
    { id: 'project-overview', title: 'Обзор проекта' },
    { id: 'html-structure', title: 'HTML-структура' },
    { id: 'css-styling', title: 'CSS-стили' },
    { id: 'js-interactivity', title: 'JavaScript-интерактивность' },
    { id: 'final-code', title: 'Финальный код' },
    { id: 'key-terms', title: 'Ключевые термины' },
  ],
  content: {
    intro: `Поздравляем! Ты прошёл путь от первого тега до JavaScript. Пришло время объединить
всё, что ты узнал, в один полноценный проект. Ты создашь личную карточку-визитку:
страницу с твоим именем, информацией о себе, списком навыков и кнопкой приветствия.
Это твой первый реальный веб-проект!`,

    projectOverview: {
      description: 'Что мы создадим: Личная визитная карточка с:',
      items: [
        { name: 'Навигация', description: 'Шапка с именем и ссылками' },
        { name: 'Hero-секция', description: 'Заголовок с приветствием и аватаром' },
        { name: 'Навыки', description: 'Список того, что умеешь' },
        { name: 'Интерактивность', description: 'Кнопка, которая меняет цветовую схему' },
      ],
    },

    htmlStructure: {
      description: 'Начнём с HTML-каркаса:',
      code: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Моя визитная карточка</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <!-- Навигация -->
  <nav class="navbar">
    <span class="logo">👨‍💻 МоёИмя</span>
    <div class="nav-links">
      <a href="#about">Обо мне</a>
      <a href="#skills">Навыки</a>
    </div>
  </nav>

  <!-- Hero-секция -->
  <section id="about" class="hero">
    <div class="avatar">🧑</div>
    <h1>Привет, я <span class="highlight">Твоё Имя</span>!</h1>
    <p>Изучаю веб-разработку. Люблю создавать красивые сайты.</p>
    <button id="themeBtn">🌙 Тёмная тема</button>
  </section>

  <!-- Навыки -->
  <section id="skills" class="skills-section">
    <h2>Мои навыки</h2>
    <div class="skills">
      <div class="skill-card">🏗️ HTML</div>
      <div class="skill-card">🎨 CSS</div>
      <div class="skill-card">⚡ JavaScript</div>
      <div class="skill-card">📱 Responsive</div>
    </div>
  </section>

  <script src="script.js"></script>
</body>
</html>`,
    },

    cssStyling: {
      description: 'Теперь добавим стили:',
      code: `/* style.css */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Inter', sans-serif;
  color: #1e293b;
  background: #f8fafc;
  transition: background 0.3s, color 0.3s;
}

body.dark {
  background: #0f172a;
  color: #f1f5f9;
}

.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 32px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  position: sticky;
  top: 0;
}

body.dark .navbar {
  background: #1e293b;
  border-color: #334155;
}

.hero {
  text-align: center;
  padding: 80px 16px;
}

.avatar {
  font-size: 80px;
  margin-bottom: 16px;
}

h1 { font-size: 2.5rem; margin-bottom: 12px; }
.highlight { color: #3B5BDB; }

.skills {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}

.skill-card {
  padding: 12px 24px;
  border-radius: 12px;
  background: #ede9fe;
  color: #5b21b6;
  font-weight: 600;
}

button {
  margin-top: 24px;
  padding: 12px 24px;
  background: #3B5BDB;
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  cursor: pointer;
}`,
    },

    jsInteractivity: {
      description: 'Добавим переключатель темы:',
      code: `// script.js
const themeBtn = document.getElementById("themeBtn");
const body = document.body;

let isDark = false;

themeBtn.addEventListener("click", () => {
  isDark = !isDark;

  if (isDark) {
    body.classList.add("dark");
    themeBtn.textContent = "☀️ Светлая тема";
  } else {
    body.classList.remove("dark");
    themeBtn.textContent = "🌙 Тёмная тема";
  }
});`,
    },
  },

  keyTerms: [
    { term: 'Разделение ответственности', definition: 'Принцип: HTML — структура, CSS — стиль, JS — поведение. Каждый язык делает своё дело.' },
    { term: 'Responsive Design', definition: 'Адаптивный дизайн — страница корректно отображается на любом устройстве.' },
    { term: 'Viewport', definition: 'Видимая область браузера. <meta name="viewport"> настраивает масштаб на мобильных.' },
    { term: 'CSS transition', definition: 'Плавная анимация изменения CSS-свойства.' },
    { term: 'body.classList.toggle()', definition: 'Переключение CSS-класса на теге body для смены темы всей страницы.' },
  ],

  didYouKnow: [
    'Первый сайт в истории (1991) был создан на HTML и до сих пор доступен по адресу info.cern.ch!',
    'Сейчас существует более 1,7 миллиарда сайтов. Ты только что научился создавать такие же.',
    'GitHub Pages позволяет опубликовать твой HTML/CSS/JS сайт бесплатно за несколько минут.',
  ],

  multipleChoiceQuiz: {
    scenario: 'Финальный тест — проверь, что ты освоил весь курс.',
    rows: [
      {
        id: 'q1',
        question: 'Какой принцип описывает роль HTML, CSS и JS?',
        options: [
          'HTML делает всё',
          'Все три языка делают одно и то же',
          'HTML — структура, CSS — стиль, JS — поведение',
          'CSS управляет логикой',
        ],
        correctIndex: 2,
      },
      {
        id: 'q2',
        question: 'Как переключить CSS-класс "dark" на элементе body?',
        options: ['body.style.dark = true', 'body.classList.toggle("dark")', 'body.class = "dark"', 'toggleDark(body)'],
        correctIndex: 1,
      },
      {
        id: 'q3',
        question: 'Какой мета-тег нужен для правильного отображения на мобильных?',
        options: ['<meta charset="UTF-8">', '<meta name="viewport" content="width=device-width, initial-scale=1.0">', '<meta name="mobile">', '<meta type="responsive">'],
        correctIndex: 1,
      },
      {
        id: 'q4',
        question: 'Что делает position: sticky у навигации?',
        options: ['Фиксирует в левом углу', 'Навбар прилипает к верху при прокрутке', 'Скрывает навбар', 'Делает навбар прозрачным'],
        correctIndex: 1,
      },
      {
        id: 'q5',
        question: 'Где лучше подключить <script> в HTML?',
        options: ['В <head>', 'В начале <body>', 'В конце <body> перед </body>', 'Не важно'],
        correctIndex: 2,
      },
    ] as MultipleChoiceRow[],
  },
}
