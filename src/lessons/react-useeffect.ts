import type { Lesson } from '@/types/lesson'

export const reactUseEffect: Lesson = {
  slug: 'react-useeffect',
  category: 'REACT',
  readTime: 10,
  icon: '⚡',

  title_ru: 'useEffect — побочные эффекты',
  title_en: 'useEffect — side effects',

  description_ru: 'Хук useEffect: работа с API, таймерами и другими побочными эффектами в React.',
  description_en: 'The useEffect hook: working with APIs, timers and other side effects in React.',

  sections: [
    { id: 'what-effects',      title_ru: 'Что такое побочный эффект', title_en: 'What is a side effect' },
    { id: 'useeffect-syntax',  title_ru: 'Синтаксис useEffect',       title_en: 'useEffect syntax' },
    { id: 'dependencies',      title_ru: 'Массив зависимостей',       title_en: 'Dependency array' },
    { id: 'cleanup',           title_ru: 'Функция очистки',           title_en: 'Cleanup function' },
    { id: 'key-terms',         title_ru: 'Важные слова',              title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'useEffect — действия за пределами React',
      title_en: 'useEffect — actions outside React',
      body_ru: 'useEffect позволяет синхронизировать компонент с внешним миром: API, таймерами, DOM, подписками на события.',
      body_en: 'useEffect lets you synchronise a component with the outside world: APIs, timers, the DOM, event subscriptions.',
      visual: { kind: 'emoji', emojis: ['⚡', '🌐', '🔗'] },
    },
    {
      id: 's2',
      type: 'concept',
      title_ru: 'Что такое побочный эффект?',
      title_en: 'What is a side effect?',
      body_ru: 'Побочный эффект — это действие, которое выходит за рамки рендеринга: запрос к серверу, изменение заголовка страницы, подписка на события, таймер.',
      body_en: 'A side effect is an action that goes beyond rendering: a server request, changing the page title, subscribing to events, a timer.',
      bullets: [
        { text_ru: '🌐 fetch("https://api.example.com/data")', text_en: '🌐 fetch("https://api.example.com/data")' },
        { text_ru: '📄 document.title = "Новое сообщение"', text_en: '📄 document.title = "New message"' },
        { text_ru: '⏰ setTimeout(() => ..., 1000)', text_en: '⏰ setTimeout(() => ..., 1000)' },
        { text_ru: '🎧 window.addEventListener("resize", handler)', text_en: '🎧 window.addEventListener("resize", handler)' },
      ],
    },
    {
      id: 's3',
      type: 'analogy',
      title_ru: 'Аналогия: useEffect — это "после рендера"',
      title_en: 'Analogy: useEffect is "after render"',
      body_ru: 'Представь строителя. Сначала он строит дом (рендер). Только после этого он подключает воду и электричество (useEffect). Нельзя подключить коммуникации до постройки дома.',
      body_en: 'Imagine a builder. First they build the house (render). Only then do they connect water and electricity (useEffect). You cannot connect utilities before building the house.',
      visual: { kind: 'emoji', emojis: ['🏗️', '→', '🔌'] },
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Базовый синтаксис useEffect',
      title_en: 'Basic useEffect syntax',
      body_ru: 'useEffect принимает функцию-эффект. React вызывает её после каждого рендера.',
      body_en: 'useEffect takes an effect function. React calls it after each render.',
      code: `import { useState, useEffect } from 'react'

function Timer() {
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    // Этот код выполняется ПОСЛЕ рендера
    document.title = \`Прошло \${seconds} сек\`
  })

  return (
    <div>
      <p>Секунд: {seconds}</p>
      <button onClick={() => setSeconds(s => s + 1)}>
        +1 секунда
      </button>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Массив зависимостей — контроль запусков',
      title_en: 'Dependency array — controlling when effects run',
      body_ru: 'Второй аргумент useEffect — массив зависимостей. Он контролирует, когда эффект запускается.',
      body_en: 'The second argument of useEffect is the dependency array. It controls when the effect runs.',
      bullets: [
        { text_ru: 'Без массива: запускается после КАЖДОГО рендера', text_en: 'No array: runs after EVERY render' },
        { text_ru: '[] (пустой): запускается ОДИН РАЗ при монтировании', text_en: '[] (empty): runs ONCE on mount' },
        { text_ru: '[dep1, dep2]: запускается когда dep1 или dep2 изменились', text_en: '[dep1, dep2]: runs when dep1 or dep2 change' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Три варианта массива зависимостей',
      title_en: 'Three variants of the dependency array',
      body_ru: 'Каждый вариант нужен для разных случаев.',
      body_en: 'Each variant is needed for different cases.',
      code: `// 1. Без массива — каждый рендер
useEffect(() => {
  console.log('Компонент перерисован')
})

// 2. Пустой массив — только один раз (componentDidMount)
useEffect(() => {
  fetch('/api/user').then(r => r.json()).then(setUser)
}, [])

// 3. С зависимостями — при изменении userId
useEffect(() => {
  fetch(\`/api/user/\${userId}\`).then(r => r.json()).then(setUser)
}, [userId])  // эффект повторяется при смене userId`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Загрузка данных с API',
      title_en: 'Fetching data from an API',
      body_ru: 'Типичный паттерн: загружаем данные при монтировании компонента с помощью пустого массива зависимостей.',
      body_en: 'A typical pattern: load data when the component mounts using an empty dependency array.',
      code: `function JokeCard() {
  const [joke, setJoke] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('https://official-joke-api.appspot.com/random_joke')
      .then(res => res.json())
      .then(data => {
        setJoke(data)
        setLoading(false)
      })
  }, []) // [] — загружаем только один раз

  if (loading) return <p>Загружаем анекдот... 😄</p>

  return (
    <div>
      <p><strong>{joke.setup}</strong></p>
      <p>{joke.punchline}</p>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'concept',
      title_ru: 'Функция очистки (cleanup)',
      title_en: 'Cleanup function',
      body_ru: 'Если эффект подписывается на события или создаёт таймер, нужно вернуть функцию очистки. React вызовет её перед следующим запуском эффекта или при размонтировании.',
      body_en: 'If the effect subscribes to events or creates a timer, you must return a cleanup function. React calls it before the next effect run or on unmount.',
      bullets: [
        { text_ru: 'Очистка предотвращает утечки памяти', text_en: 'Cleanup prevents memory leaks' },
        { text_ru: 'return () => { ... } — функция очистки', text_en: 'return () => { ... } — the cleanup function' },
        { text_ru: 'Отписка от событий, отмена таймеров, отмена fetch', text_en: 'Unsubscribe from events, cancel timers, abort fetches' },
      ],
    },
    {
      id: 's9',
      type: 'code',
      title_ru: 'Cleanup — очистка эффекта',
      title_en: 'Cleanup — cleaning up the effect',
      body_ru: 'Возвращая функцию из useEffect, мы говорим React: "когда эффект нужно перезапустить или компонент удалён — выполни это".',
      body_en: 'By returning a function from useEffect we tell React: "when the effect needs to re-run or the component is removed — run this".',
      code: `function Clock() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    // Запускаем интервал
    const interval = setInterval(() => {
      setTime(new Date())
    }, 1000)

    // Возвращаем функцию очистки
    return () => {
      clearInterval(interval) // очищаем при размонтировании
    }
  }, []) // один раз при монтировании

  return <p>🕐 {time.toLocaleTimeString()}</p>
}`,
      codeLang: 'javascript',
    },
    {
      id: 's10',
      type: 'practice-cta',
      title_ru: 'Практика: загрузи шутку из API!',
      title_en: 'Practice: fetch a joke from an API!',
      body_ru: 'В редакторе уже подключён React. Используй useEffect и fetch для загрузки случайного анекдота.',
      body_en: 'The editor already has React loaded. Use useEffect and fetch to load a random joke.',
      visual: { kind: 'emoji', emojis: ['😄', '🌐', '⚡'] },
    },
  ],

  content: {
    intro_ru: `useEffect — это хук для работы с побочными эффектами. Побочный эффект — всё, что выходит за рамки
рендеринга компонента: запросы к API, таймеры, подписки на события браузера, изменение заголовка страницы.
React запускает эффект после того, как компонент отрисован в DOM.`,
    intro_en: `useEffect is a hook for working with side effects. A side effect is anything beyond rendering the component:
API requests, timers, browser event subscriptions, changing the page title.
React runs the effect after the component has been painted to the DOM.`,

    blocks: [
      {
        sectionId: 'what-effects',
        heading_ru: 'Что такое побочный эффект',
        heading_en: 'What is a side effect',
        text_ru: `В функциональном программировании "чистая функция" не имеет побочных эффектов: она только принимает аргументы и возвращает результат.
React-компонент в идеале тоже чист: принимает props и возвращает JSX.

Но реальные приложения не могут быть полностью чистыми. Нам нужно загружать данные, подписываться на события,
обновлять заголовок вкладки. Всё это — побочные эффекты, и useEffect — правильное место для них.`,
        text_en: `In functional programming a "pure function" has no side effects: it only takes arguments and returns a result.
A React component ideally is also pure: it takes props and returns JSX.

But real applications cannot be completely pure. We need to load data, subscribe to events,
update the tab title. All of this is side effects, and useEffect is the right place for them.`,
      },
      {
        sectionId: 'useeffect-syntax',
        heading_ru: 'Синтаксис useEffect',
        heading_en: 'useEffect syntax',
        text_ru: `useEffect принимает два аргумента:
1. Функция-эффект — код, который нужно выполнить
2. Массив зависимостей (необязательный) — когда именно запускать эффект

React вызывает функцию-эффект после каждого рендера (если нет массива зависимостей),
или после рендеров, в которых изменились указанные зависимости.`,
        text_en: `useEffect takes two arguments:
1. The effect function — the code to execute
2. The dependency array (optional) — when exactly to run the effect

React calls the effect function after each render (if there is no dependency array),
or after renders in which the specified dependencies changed.`,
        code: `useEffect(() => {
  // код эффекта
  console.log('Эффект запущен')

  // необязательная функция очистки
  return () => {
    console.log('Очистка эффекта')
  }
}, [/* зависимости */])`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'dependencies',
        heading_ru: 'Массив зависимостей',
        heading_en: 'Dependency array',
        text_ru: `Массив зависимостей — ключевой аргумент useEffect. Он определяет, когда эффект нужно перезапустить.

- Нет массива: эффект запускается после каждого рендера
- Пустой массив []: эффект запускается только один раз (при монтировании компонента)
- Массив с значениями [a, b]: эффект запускается при изменении a или b

В массив нужно включать все переменные, которые используются внутри эффекта.`,
        text_en: `The dependency array is the key argument of useEffect. It determines when the effect should re-run.

- No array: effect runs after every render
- Empty array []: effect runs only once (on component mount)
- Array with values [a, b]: effect runs when a or b change

You should include in the array every variable used inside the effect.`,
        code: `const [query, setQuery] = useState('')
const [results, setResults] = useState([])

// Поиск запускается каждый раз при изменении query
useEffect(() => {
  if (!query) return
  fetch(\`/api/search?q=\${query}\`)
    .then(r => r.json())
    .then(setResults)
}, [query]) // запускаем при изменении query`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'cleanup',
        heading_ru: 'Функция очистки',
        heading_en: 'Cleanup function',
        text_ru: `Если эффект создаёт что-то, что нужно удалить (таймер, подписку, WebSocket-соединение),
вернуть функцию очистки — хорошая практика.

React вызывает cleanup в двух случаях:
1. Перед повторным запуском эффекта (при изменении зависимостей)
2. При размонтировании компонента (он удалён из DOM)`,
        text_en: `If the effect creates something that needs to be removed (a timer, a subscription, a WebSocket connection),
returning a cleanup function is good practice.

React calls cleanup in two cases:
1. Before the effect runs again (when dependencies change)
2. When the component unmounts (is removed from the DOM)`,
        code: `function WindowSize() {
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    const handler = () => setWidth(window.innerWidth)

    // Подписываемся на событие
    window.addEventListener('resize', handler)

    // Отписываемся при очистке
    return () => window.removeEventListener('resize', handler)
  }, []) // [] — подписываемся один раз

  return <p>Ширина окна: {width}px</p>
}`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Загрузка случайного анекдота',
    title_en: 'Fetch a random joke',
    instructions_ru: `Используй useEffect для загрузки случайного анекдота из публичного API.

1. При загрузке показывай "Загружаем анекдот... 😄"
2. После загрузки показывай setup и punchline
3. Добавь кнопку "Следующий анекдот" — она загружает новый
4. Обрабатывай ошибки: если fetch не удался — показывай сообщение об ошибке`,
    instructions_en: `Use useEffect to load a random joke from a public API.

1. While loading show "Loading joke... 😄"
2. After loading show setup and punchline
3. Add a "Next joke" button — it loads a new one
4. Handle errors: if fetch fails — show an error message`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #fff9db; }
    .card { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); max-width: 480px; text-align: center; }
    h2 { color: #e67700; margin: 0 0 8px; font-size: 36px; }
    .setup { font-size: 18px; color: #333; margin-bottom: 12px; }
    .punchline { font-size: 16px; color: #666; font-style: italic; }
    button { margin-top: 24px; padding: 12px 28px; background: #ffd43b; border: none; border-radius: 12px; font-size: 16px; cursor: pointer; font-weight: bold; }
    button:hover { background: #fcc419; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState, useEffect } = React

    function JokeCard() {
      const [joke, setJoke] = useState(null)
      const [loading, setLoading] = useState(true)
      const [error, setError] = useState(null)

      // Напиши useEffect здесь
      // URL: https://official-joke-api.appspot.com/random_joke
      // Ответ содержит поля: setup (вопрос) и punchline (ответ)

      if (loading) return <div className="card"><p>Загружаем анекдот... 😄</p></div>
      if (error) return <div className="card"><p>Ошибка: {error}</p></div>

      return (
        <div className="card">
          <h2>😂</h2>
          <p className="setup">{joke?.setup}</p>
          <p className="punchline">{joke?.punchline}</p>
          <button>Следующий анекдот</button>
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<JokeCard />)
  </script>
</body>
</html>`,
    },
    hints_ru: [
      'Добавь useEffect(() => { ... }, []) с пустым массивом для загрузки один раз',
      'Внутри: fetch(url).then(r => r.json()).then(data => { setJoke(data); setLoading(false) })',
      'Для кнопки "Следующий" создай state-переменную count и добавь её в зависимости: [count]',
      'Обработка ошибок: .catch(err => setError(err.message))',
    ],
    hints_en: [
      'Add useEffect(() => { ... }, []) with empty array to load once',
      'Inside: fetch(url).then(r => r.json()).then(data => { setJoke(data); setLoading(false) })',
      'For the "Next" button create a count state variable and add it to dependencies: [count]',
      'Error handling: .catch(err => setError(err.message))',
    ],
  },

  keyTerms: [
    {
      term_ru: 'useEffect',
      term_en: 'useEffect',
      definition_ru: 'Хук React для запуска побочных эффектов после рендера компонента.',
      definition_en: 'A React hook for running side effects after a component renders.',
      example_ru: 'useEffect(() => { fetch(...) }, [])',
      example_en: 'useEffect(() => { fetch(...) }, [])',
    },
    {
      term_ru: 'Побочный эффект',
      term_en: 'Side effect',
      definition_ru: 'Действие, которое выходит за рамки рендеринга: запрос к API, таймер, подписка на событие.',
      definition_en: 'An action that goes beyond rendering: an API request, a timer, an event subscription.',
      example_ru: 'fetch(), setTimeout(), addEventListener()',
      example_en: 'fetch(), setTimeout(), addEventListener()',
    },
    {
      term_ru: 'Массив зависимостей',
      term_en: 'Dependency array',
      definition_ru: 'Второй аргумент useEffect, определяющий когда эффект нужно перезапустить.',
      definition_en: 'The second argument of useEffect that determines when the effect should re-run.',
      example_ru: 'useEffect(() => {...}, [userId]) — перезапуск при смене userId',
      example_en: 'useEffect(() => {...}, [userId]) — re-run when userId changes',
    },
    {
      term_ru: 'Функция очистки',
      term_en: 'Cleanup function',
      definition_ru: 'Функция, возвращаемая из useEffect для отмены подписок и таймеров при размонтировании компонента.',
      definition_en: 'A function returned from useEffect to cancel subscriptions and timers when the component unmounts.',
      example_ru: 'return () => clearInterval(timer)',
      example_en: 'return () => clearInterval(timer)',
    },
    {
      term_ru: 'Монтирование / Размонтирование',
      term_en: 'Mount / Unmount',
      definition_ru: 'Монтирование — добавление компонента в DOM. Размонтирование — удаление. useEffect с [] запускается при монтировании, cleanup — при размонтировании.',
      definition_en: 'Mount — adding the component to the DOM. Unmount — removing it. useEffect with [] runs on mount, cleanup runs on unmount.',
      example_ru: 'useEffect(() => { ... return cleanup }, [])',
      example_en: 'useEffect(() => { ... return cleanup }, [])',
    },
    {
      term_ru: 'fetch',
      term_en: 'fetch',
      definition_ru: 'Встроенная браузерная функция для выполнения HTTP-запросов. Возвращает Promise.',
      definition_en: 'A built-in browser function for making HTTP requests. Returns a Promise.',
      example_ru: 'fetch(url).then(r => r.json()).then(data => ...)',
      example_en: 'fetch(url).then(r => r.json()).then(data => ...)',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'useEffect с пустым массивом зависимостей [] эквивалентен методу componentDidMount() в классовых компонентах. Это паттерн "запусти один раз при монтировании".',
      text_en: 'useEffect with an empty dependency array [] is equivalent to componentDidMount() in class components. It is the "run once on mount" pattern.',
    },
    {
      text_ru: 'В React 18 появился Strict Mode, который в разработке намеренно дважды монтирует компоненты, чтобы выявить ошибки в useEffect. Если видишь двойной вызов — это нормально в dev-режиме.',
      text_en: 'React 18 introduced Strict Mode, which in development intentionally mounts components twice to catch useEffect bugs. If you see a double call — that is normal in dev mode.',
    },
    {
      text_ru: 'Существует библиотека React Query, которая берёт на себя всю работу с асинхронными данными — кеширование, загрузку, обновление. Она делает 90% того, что обычно пишут в useEffect вручную.',
      text_en: 'There is a library called React Query that handles all async data work — caching, loading, updating. It does 90% of what is usually written manually in useEffect.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что делает useEffect с пустым массивом зависимостей []?',
      text_en: 'What does useEffect with an empty dependency array [] do?',
      options_ru: [
        'Запускается один раз при монтировании компонента',
        'Запускается после каждого рендера',
        'Никогда не запускается',
        'Запускается при размонтировании',
      ],
      options_en: [
        'Runs once when the component mounts',
        'Runs after every render',
        'Never runs',
        'Runs on unmount',
      ],
      correctIndex: 0,
      explanation_ru: 'Пустой массив [] означает "нет зависимостей" — эффект запускается только один раз, при монтировании компонента.',
      explanation_en: 'An empty array [] means "no dependencies" — the effect runs only once, when the component mounts.',
    },
    {
      id: 'q2',
      text_ru: 'Зачем нужна функция очистки (cleanup) в useEffect?',
      text_en: 'What is the cleanup function in useEffect for?',
      options_ru: [
        'Для отмены подписок и таймеров при размонтировании компонента',
        'Для очистки state при обновлении',
        'Для перезапуска эффекта',
        'Для удаления компонента из DOM',
      ],
      options_en: [
        'To cancel subscriptions and timers when the component unmounts',
        'To clear state on update',
        'To restart the effect',
        'To remove the component from the DOM',
      ],
      correctIndex: 0,
      explanation_ru: 'Cleanup нужен чтобы предотвратить утечки памяти — отменить таймеры, отписаться от событий, закрыть соединения.',
      explanation_en: 'Cleanup is needed to prevent memory leaks — cancel timers, unsubscribe from events, close connections.',
    },
    {
      id: 'q3',
      text_ru: 'В каком порядке React выполняет рендер и useEffect?',
      text_en: 'In what order does React perform render and useEffect?',
      options_ru: [
        'Сначала рендер, потом useEffect',
        'Сначала useEffect, потом рендер',
        'Оба одновременно',
        'Порядок не определён',
      ],
      options_en: [
        'First render, then useEffect',
        'First useEffect, then render',
        'Both simultaneously',
        'Order is not defined',
      ],
      correctIndex: 0,
      explanation_ru: 'React сначала рисует компонент (рендер), обновляет DOM, и только потом запускает useEffect.',
      explanation_en: 'React first paints the component (render), updates the DOM, and only then runs useEffect.',
    },
    {
      id: 'q4',
      text_ru: 'Как запустить useEffect при изменении переменной userId?',
      text_en: 'How do you make useEffect run when the userId variable changes?',
      options_ru: [
        'useEffect(() => { ... }, [userId])',
        'useEffect(() => { ... })',
        'useEffect(() => { ... }, [])',
        'useEffect([userId], () => { ... })',
      ],
      options_en: [
        'useEffect(() => { ... }, [userId])',
        'useEffect(() => { ... })',
        'useEffect(() => { ... }, [])',
        'useEffect([userId], () => { ... })',
      ],
      correctIndex: 0,
      explanation_ru: 'Переменная userId добавляется в массив зависимостей. При каждом изменении userId эффект перезапускается.',
      explanation_en: 'The userId variable is added to the dependency array. Every time userId changes the effect re-runs.',
    },
  ],
}
