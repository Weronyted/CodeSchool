import type { Lesson } from '@/types/lesson'

export const reactIntro: Lesson = {
  slug: 'react-intro',
  category: 'REACT',
  readTime: 12,
  icon: '⚛️',

  title_ru: 'Введение в React',
  title_en: 'Introduction to React',

  description_ru: 'Что такое React, зачем он нужен, компоненты и первый JSX.',
  description_en: 'What React is, why it exists, components and your first JSX.',

  sections: [
    { id: 'what-is-react', title_ru: 'Что такое React',        title_en: 'What is React' },
    { id: 'why-react',     title_ru: 'Зачем нужен React',      title_en: 'Why React exists' },
    { id: 'components',    title_ru: 'Компоненты',             title_en: 'Components' },
    { id: 'jsx',           title_ru: 'JSX — HTML в JavaScript', title_en: 'JSX — HTML in JavaScript' },
    { id: 'first-app',     title_ru: 'Первое приложение',       title_en: 'Your first app' },
    { id: 'key-terms',     title_ru: 'Важные слова',            title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'React — библиотека для создания интерфейсов',
      title_en: 'React — a library for building interfaces',
      body_ru: 'React создан в Facebook в 2013 году и сегодня используется в Instagram, Airbnb, Netflix и тысячах других компаний. Это самая популярная JavaScript-библиотека в мире.',
      body_en: 'React was created at Facebook in 2013 and is now used by Instagram, Airbnb, Netflix and thousands of other companies. It is the most popular JavaScript library in the world.',
      visual: { kind: 'emoji', emojis: ['⚛️', '🌐', '🚀'] },
    },
    {
      id: 's2',
      type: 'concept',
      title_ru: 'Проблема без React',
      title_en: 'The problem without React',
      body_ru: 'С ростом сложности интерфейса управлять DOM вручную становится кошмаром. Нужно помнить, что обновить и когда — и легко ошибиться.',
      body_en: 'As UI complexity grows, managing the DOM manually becomes a nightmare. You have to remember what to update and when — and it is easy to make mistakes.',
      bullets: [
        { text_ru: '😓 Добавил элемент → обнови список → обнови счётчик → обнови кнопку...', text_en: '😓 Add item → update list → update counter → update button...' },
        { text_ru: '😱 При 50 элементах всё запутывается', text_en: '😱 With 50 elements everything gets tangled' },
        { text_ru: '✅ React делает это автоматически', text_en: '✅ React does this automatically' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Решение React — декларативность',
      title_en: 'React\'s solution — declarativeness',
      body_ru: 'В обычном JS ты говоришь КАК изменить DOM. В React ты описываешь КАК должен выглядеть интерфейс — а React сам решает, что изменить.',
      body_en: 'In plain JS you say HOW to change the DOM. In React you describe WHAT the interface should look like — and React figures out what to change.',
      visual: { kind: 'emoji', emojis: ['🤔', '→', '✅'] },
      bullets: [
        { text_ru: '❌ Императивно: document.getElementById("count").textContent = count', text_en: '❌ Imperative: document.getElementById("count").textContent = count' },
        { text_ru: '✅ Декларативно: <span>{count}</span> — React обновит сам', text_en: '✅ Declarative: <span>{count}</span> — React updates it automatically' },
      ],
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Компонент — строительный блок React',
      title_en: 'Component — React\'s building block',
      body_ru: 'Компонент — это функция, которая возвращает кусочек интерфейса. Весь React-сайт — это дерево компонентов, вложенных друг в друга.',
      body_en: 'A component is a function that returns a piece of interface. An entire React site is a tree of components nested inside each other.',
      visual: { kind: 'emoji', emojis: ['🧩', '🧩', '🧩'] },
      bullets: [
        { text_ru: 'Компонент = функция + возвращает JSX', text_en: 'Component = function + returns JSX' },
        { text_ru: 'Имя компонента — с заглавной буквы: Button, UserCard', text_en: 'Component name — starts with capital: Button, UserCard' },
        { text_ru: 'Компоненты переиспользуются как HTML-теги', text_en: 'Components are reused like HTML tags' },
      ],
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Первый компонент',
      title_en: 'Your first component',
      body_ru: 'Компонент — это обычная JavaScript-функция. Она возвращает JSX — почти как HTML, но с суперсилами.',
      body_en: 'A component is just a regular JavaScript function. It returns JSX — almost like HTML but with superpowers.',
      code: `// Компонент — функция с заглавной буквы
function Greeting() {
  return <h1>Привет, React! 👋</h1>
}

// Используем как тег
function App() {
  return (
    <div>
      <Greeting />
      <Greeting />
      <Greeting />
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'JSX — HTML внутри JavaScript',
      title_en: 'JSX — HTML inside JavaScript',
      body_ru: 'JSX выглядит как HTML, но это JavaScript. Babel компилирует JSX в вызовы React.createElement(). Это не обязательно знать, но важно понимать, что JSX — это просто удобный синтаксис.',
      body_en: 'JSX looks like HTML but it is JavaScript. Babel compiles JSX into React.createElement() calls. You do not need to know this, but it is important to understand that JSX is just convenient syntax.',
      bullets: [
        { text_ru: 'className вместо class (class — зарезервированное слово)', text_en: 'className instead of class (class is a reserved word)' },
        { text_ru: 'Все теги должны быть закрыты: <br />, <img />', text_en: 'All tags must be closed: <br />, <img />' },
        { text_ru: 'Возвращать можно только один корневой элемент', text_en: 'Only one root element can be returned' },
        { text_ru: 'JavaScript в JSX — в фигурных скобках { }', text_en: 'JavaScript in JSX — inside curly braces { }' },
      ],
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'JSX: HTML + JavaScript вместе',
      title_en: 'JSX: HTML + JavaScript together',
      body_ru: 'Фигурные скобки {} позволяют вставлять любые JavaScript-выражения прямо в JSX. Это делает интерфейс динамическим.',
      body_en: 'Curly braces {} let you insert any JavaScript expression right into JSX. This makes the interface dynamic.',
      code: `function UserCard() {
  const name = 'Алиса'
  const age = 17
  const isAdult = age >= 18

  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Возраст: {age}</p>
      <p>{isAdult ? 'Взрослый' : 'Ребёнок'}</p>
      <p>Год: {new Date().getFullYear()}</p>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'compare',
      title_ru: 'HTML vs JSX',
      title_en: 'HTML vs JSX',
      body_ru: 'JSX похож на HTML, но есть важные отличия.',
      body_en: 'JSX looks like HTML but has important differences.',
      compareLeft: {
        label_ru: 'HTML',
        label_en: 'HTML',
        items_ru: [
          '<div class="box">',
          '<input type="text">',
          '<br>',
          'onclick="fn()"',
        ],
        items_en: [
          '<div class="box">',
          '<input type="text">',
          '<br>',
          'onclick="fn()"',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'JSX',
        label_en: 'JSX',
        items_ru: [
          '<div className="box">',
          '<input type="text" />',
          '<br />',
          'onClick={fn}',
        ],
        items_en: [
          '<div className="box">',
          '<input type="text" />',
          '<br />',
          'onClick={fn}',
        ],
        color: 'green',
      },
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Virtual DOM — секрет скорости React',
      title_en: 'Virtual DOM — the secret of React\'s speed',
      body_ru: 'React хранит копию DOM в памяти (Virtual DOM). При изменении state он сравнивает старый и новый Virtual DOM и обновляет в реальном DOM только то, что изменилось. Это называется reconciliation.',
      body_en: 'React keeps a copy of the DOM in memory (Virtual DOM). When state changes it compares the old and new Virtual DOM and updates only what changed in the real DOM. This is called reconciliation.',
      visual: { kind: 'emoji', emojis: ['🧠', '🔄', '⚡'] },
    },
    {
      id: 's10',
      type: 'practice-cta',
      title_ru: 'Попробуй написать компонент!',
      title_en: 'Try writing a component!',
      body_ru: 'В редакторе ниже — React через CDN. Напиши свой первый компонент и увидь результат прямо здесь.',
      body_en: 'The editor below has React via CDN. Write your first component and see the result right here.',
      visual: { kind: 'emoji', emojis: ['✍️', '⚛️', '🎉'] },
    },
  ],

  content: {
    intro_ru: `React — это JavaScript-библиотека для создания пользовательских интерфейсов.
Она была разработана в Facebook в 2013 году и с тех пор стала стандартом индустрии.
React решает одну конкретную задачу: как эффективно обновлять интерфейс в ответ на изменение данных.
Ключевая идея — компонентный подход: вместо одной большой страницы ты строишь множество
маленьких переиспользуемых кирпичиков-компонентов.`,
    intro_en: `React is a JavaScript library for building user interfaces.
It was developed at Facebook in 2013 and has since become the industry standard.
React solves one specific problem: how to efficiently update the UI in response to data changes.
The key idea is the component approach: instead of one large page you build many small
reusable building blocks called components.`,

    blocks: [
      {
        sectionId: 'what-is-react',
        heading_ru: 'Что такое React',
        heading_en: 'What is React',
        text_ru: `React — это не фреймворк, а библиотека. Она отвечает только за отображение (View в паттерне MVC).
Это означает большую гибкость: React можно использовать с разными роутерами, системами управления состоянием и API-клиентами.

Сегодня экосистема React включает: Next.js (серверный рендеринг), React Native (мобильные приложения),
React Query (работа с API) и многое другое. Освоив React, ты открываешь двери во весь этот мир.`,
        text_en: `React is not a framework but a library. It only handles the display layer (the View in MVC).
This means great flexibility: React can be combined with different routers, state management systems and API clients.

Today the React ecosystem includes: Next.js (server-side rendering), React Native (mobile apps),
React Query (API work) and much more. Mastering React opens the door to all of this.`,
      },
      {
        sectionId: 'why-react',
        heading_ru: 'Зачем нужен React',
        heading_en: 'Why React exists',
        text_ru: `До React разработчики управляли DOM вручную через jQuery или чистый JavaScript.
При каждом изменении данных нужно было вручную найти нужные элементы и обновить их.
Это работало для простых сайтов, но для сложных приложений (таких как Facebook с тысячами
интерактивных элементов) это превращалось в кошмар поддержки.

React предложил революционную идею: описывай, как интерфейс должен выглядеть при любых данных,
а библиотека сама разберётся, что нужно обновить. Это называется декларативным подходом.`,
        text_en: `Before React developers managed the DOM manually through jQuery or plain JavaScript.
Every time data changed they had to manually find the right elements and update them.
This worked for simple sites but for complex applications (like Facebook with thousands of
interactive elements) it became a maintenance nightmare.

React proposed a revolutionary idea: describe what the interface should look like for any data,
and the library will figure out what needs to be updated. This is called the declarative approach.`,
      },
      {
        sectionId: 'components',
        heading_ru: 'Компоненты',
        heading_en: 'Components',
        text_ru: `Компонент в React — это функция (или класс, но сейчас используют функции), которая
принимает данные (props) и возвращает JSX — описание кусочка интерфейса.

Компоненты можно вкладывать друг в друга, переиспользовать и тестировать независимо.
Весь React-сайт — это дерево компонентов: сверху App, внутри Header, Sidebar, Main...
Каждый компонент отвечает только за свою часть UI.`,
        text_en: `A React component is a function (or class, but functions are used today) that
accepts data (props) and returns JSX — a description of a piece of the interface.

Components can be nested inside each other, reused and tested independently.
An entire React site is a tree of components: App at the top, inside Header, Sidebar, Main...
Each component is responsible only for its piece of the UI.`,
        code: `// Маленькие компоненты
function Avatar({ src, name }) {
  return <img src={src} alt={name} className="avatar" />
}

function UserName({ name, role }) {
  return <div><strong>{name}</strong><span>{role}</span></div>
}

// Собираем из маленьких — большой
function UserCard({ user }) {
  return (
    <div className="card">
      <Avatar src={user.photo} name={user.name} />
      <UserName name={user.name} role={user.role} />
    </div>
  )
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'jsx',
        heading_ru: 'JSX — HTML в JavaScript',
        heading_en: 'JSX — HTML in JavaScript',
        text_ru: `JSX — это расширение синтаксиса JavaScript, позволяющее писать HTML-подобный код внутри JS.
Babel (инструмент компиляции) преобразует JSX в обычные вызовы React.createElement().

Важные правила JSX:
- className вместо class
- htmlFor вместо for (в label)
- Все теги должны быть закрыты (<br />, <input />)
- Только один корневой элемент (или пустой тег <> </>)
- JavaScript в JSX — в фигурных скобках {}`,
        text_en: `JSX is a JavaScript syntax extension that lets you write HTML-like code inside JS.
Babel (a compilation tool) converts JSX into regular React.createElement() calls.

Important JSX rules:
- className instead of class
- htmlFor instead of for (in label)
- All tags must be closed (<br />, <input />)
- Only one root element (or empty tag <> </>)
- JavaScript in JSX — inside curly braces {}`,
        code: `function Card() {
  const title = 'Мой компонент'
  const items = ['HTML', 'CSS', 'JS', 'React']

  return (
    <>
      <h2 className="title">{title}</h2>
      <ul>
        {items.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <input type="text" placeholder="Введи текст" />
      <br />
    </>
  )
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'first-app',
        heading_ru: 'Первое приложение',
        heading_en: 'Your first app',
        text_ru: `Для запуска React без сборщика можно использовать CDN. Это идеально для обучения.
В реальных проектах используют Vite: npm create vite@latest my-app -- --template react`,
        text_en: `To run React without a bundler you can use a CDN. This is perfect for learning.
In real projects use Vite: npm create vite@latest my-app -- --template react`,
        code: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function App() {
      return <h1>Привет, React! ⚛️</h1>
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  </script>
</body>
</html>`,
        codeLang: 'html',
      },
    ],
  },

  editorTask: {
    title_ru: 'Первый React-компонент',
    title_en: 'Your first React component',
    instructions_ru: `React подключён через CDN — можно сразу писать компоненты!

Создай компонент ProfileCard, который отображает:
- Имя (в теге h2)
- Профессию (в теге p)
- Любимый язык программирования (в теге p)

Используй JSX: className вместо class, { } для переменных.`,
    instructions_en: `React is loaded via CDN — you can write components right away!

Create a ProfileCard component that shows:
- A name (in an h2 tag)
- A profession (in a p tag)
- A favourite programming language (in a p tag)

Use JSX: className instead of class, { } for variables.`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; padding: 40px; background: #f0f4ff; }
    .card { background: white; padding: 24px 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
    h2 { color: #3B5BDB; margin: 0 0 8px; }
    p { color: #555; margin: 4px 0; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function ProfileCard() {
      const name = "Твоё имя"
      const profession = "Разработчик"
      const language = "JavaScript"

      return (
        <div className="card">
          <h2>{name}</h2>
          <p>{profession}</p>
          <p>❤️ {language}</p>
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<ProfileCard />)
  </script>
</body>
</html>`,
    },
    hints_ru: [
      'Измени значения переменных name, profession, language на свои данные',
      'Попробуй добавить ещё один тег <p> с эмодзи',
    ],
    hints_en: [
      'Change the name, profession, language variable values to your own',
      'Try adding another <p> tag with an emoji',
    ],
  },

  keyTerms: [
    {
      term_ru: 'React',
      term_en: 'React',
      definition_ru: 'JavaScript-библиотека для создания пользовательских интерфейсов через компонентный подход.',
      definition_en: 'A JavaScript library for building user interfaces through a component-based approach.',
      example_ru: 'import React from \'react\'',
      example_en: 'import React from \'react\'',
    },
    {
      term_ru: 'Компонент',
      term_en: 'Component',
      definition_ru: 'Функция, возвращающая JSX. Строительный блок React-приложения. Имя начинается с заглавной буквы.',
      definition_en: 'A function that returns JSX. The building block of a React application. Name starts with a capital letter.',
      example_ru: 'function Button() { return <button>Click</button> }',
      example_en: 'function Button() { return <button>Click</button> }',
    },
    {
      term_ru: 'JSX',
      term_en: 'JSX',
      definition_ru: 'Синтаксическое расширение JavaScript, позволяющее писать HTML-подобный код в JS-файлах. Компилируется Babel в React.createElement().',
      definition_en: 'A JavaScript syntax extension that lets you write HTML-like code in JS files. Compiled by Babel into React.createElement().',
      example_ru: 'const el = <h1 className="title">Привет</h1>',
      example_en: 'const el = <h1 className="title">Hello</h1>',
    },
    {
      term_ru: 'Virtual DOM',
      term_en: 'Virtual DOM',
      definition_ru: 'Копия DOM в памяти JavaScript. React сравнивает старый и новый Virtual DOM и обновляет только изменившиеся части реального DOM.',
      definition_en: 'A copy of the DOM in JavaScript memory. React compares the old and new Virtual DOM and updates only the changed parts of the real DOM.',
      example_ru: 'React сам решает, какие DOM-узлы обновить',
      example_en: 'React decides itself which DOM nodes to update',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'React был создан Джорданом Уолком (Jordan Walke) в Facebook в 2011 году и открыт для всех в 2013. Сейчас его скачивают более 20 миллионов раз в неделю.',
      text_en: 'React was created by Jordan Walke at Facebook in 2011 and open-sourced in 2013. Today it is downloaded more than 20 million times per week.',
    },
    {
      text_ru: 'JSX изначально многие разработчики ненавидели — казалось странным смешивать HTML и JS. Сейчас это стандарт, и большинство считают JSX удобным.',
      text_en: 'JSX was initially hated by many developers — mixing HTML and JS seemed odd. Now it is the standard and most find JSX convenient.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Как называется функция, возвращающая JSX в React?',
      text_en: 'What do you call a function that returns JSX in React?',
      options_ru: ['Компонент', 'Модуль', 'Метод', 'Обработчик'],
      options_en: ['Component', 'Module', 'Method', 'Handler'],
      correctIndex: 0,
      explanation_ru: 'Компонент — это функция, которая возвращает JSX. Имя компонента начинается с заглавной буквы.',
      explanation_en: 'A component is a function that returns JSX. The component name starts with a capital letter.',
    },
    {
      id: 'q2',
      text_ru: 'Какой атрибут используется в JSX вместо class?',
      text_en: 'Which attribute is used in JSX instead of class?',
      options_ru: ['className', 'classList', 'cssClass', 'style'],
      options_en: ['className', 'classList', 'cssClass', 'style'],
      correctIndex: 0,
      explanation_ru: 'В JSX нельзя использовать class — это зарезервированное слово JavaScript. Вместо него — className.',
      explanation_en: 'JSX cannot use class — it is a reserved JavaScript word. Use className instead.',
    },
    {
      id: 'q3',
      text_ru: 'Как вставить JavaScript-выражение в JSX?',
      text_en: 'How do you insert a JavaScript expression into JSX?',
      options_ru: ['В фигурных скобках { }', 'В квадратных скобках [ ]', 'Через $( )', 'Через <!-- -->'],
      options_en: ['In curly braces { }', 'In square brackets [ ]', 'Through $( )', 'Through <!-- -->'],
      correctIndex: 0,
      explanation_ru: 'Фигурные скобки { } в JSX позволяют вставлять любые JavaScript-выражения.',
      explanation_en: 'Curly braces { } in JSX let you insert any JavaScript expression.',
    },
    {
      id: 'q4',
      text_ru: 'Что такое Virtual DOM?',
      text_en: 'What is the Virtual DOM?',
      options_ru: [
        'Копия DOM в памяти JavaScript для быстрого сравнения изменений',
        'Новый стандарт HTML',
        'База данных React',
        'Инструмент разработчика Chrome',
      ],
      options_en: [
        'A copy of the DOM in JavaScript memory for fast comparison of changes',
        'A new HTML standard',
        'React\'s database',
        'A Chrome developer tool',
      ],
      correctIndex: 0,
      explanation_ru: 'Virtual DOM — это копия реального DOM в памяти. React сравнивает её с новой версией и обновляет только изменившиеся части.',
      explanation_en: 'The Virtual DOM is a copy of the real DOM in memory. React compares it with the new version and updates only the changed parts.',
    },
  ],
}
