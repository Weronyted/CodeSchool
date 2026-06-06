import type { Lesson } from '@/types/lesson'

export const reactLists: Lesson = {
  slug: 'react-lists',
  category: 'REACT',
  readTime: 9,
  icon: '📋',

  title_ru: 'Списки и условный рендеринг',
  title_en: 'Lists and conditional rendering',

  description_ru: 'Как рендерить массивы через .map(), зачем нужен key, и как показывать элементы условно.',
  description_en: 'How to render arrays with .map(), why key is needed, and how to display elements conditionally.',

  sections: [
    { id: 'lists-map',           title_ru: 'Список через .map()',     title_en: 'Lists with .map()' },
    { id: 'key-prop',            title_ru: 'Проп key',                title_en: 'The key prop' },
    { id: 'conditional-if',      title_ru: 'Условный рендеринг (&&)', title_en: 'Conditional rendering (&&)' },
    { id: 'conditional-ternary', title_ru: 'Тернарный оператор',      title_en: 'Ternary operator' },
    { id: 'key-terms',           title_ru: 'Важные слова',            title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Списки и условный рендеринг',
      title_en: 'Lists and conditional rendering',
      body_ru: 'В реальных приложениях почти всегда нужно показывать наборы данных и скрывать/показывать элементы в зависимости от условий.',
      body_en: 'In real applications you almost always need to display sets of data and show/hide elements based on conditions.',
      visual: { kind: 'emoji', emojis: ['📋', '🔀', '👁️'] },
    },
    {
      id: 's2',
      type: 'concept',
      title_ru: '.map() — рендеринг массивов',
      title_en: '.map() — rendering arrays',
      body_ru: 'В JSX нельзя использовать цикл for напрямую. Зато можно использовать метод .map(), который превращает массив данных в массив JSX-элементов.',
      body_en: 'You cannot use a for loop directly in JSX. But you can use the .map() method, which transforms an array of data into an array of JSX elements.',
      bullets: [
        { text_ru: 'data.map(item => <li>{item}</li>) — рендерит каждый элемент', text_en: 'data.map(item => <li>{item}</li>) — renders each item' },
        { text_ru: '.map() возвращает новый массив — React рендерит его', text_en: '.map() returns a new array — React renders it' },
        { text_ru: 'Каждый элемент массива должен иметь уникальный key', text_en: 'Each array element must have a unique key' },
      ],
    },
    {
      id: 's3',
      type: 'code',
      title_ru: 'Рендеринг списка через .map()',
      title_en: 'Rendering a list with .map()',
      body_ru: 'Используй .map() для превращения массива данных в JSX-элементы.',
      body_en: 'Use .map() to transform an array of data into JSX elements.',
      code: `function LanguageList() {
  const languages = ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript']

  return (
    <ul>
      {languages.map(lang => (
        <li key={lang}>{lang}</li>
      ))}
    </ul>
  )
}

// Список объектов
function UserList({ users }) {
  return (
    <div>
      {users.map(user => (
        <div key={user.id}>
          <h3>{user.name}</h3>
          <p>{user.email}</p>
        </div>
      ))}
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Зачем нужен key?',
      title_en: 'Why is key needed?',
      body_ru: 'React использует key для идентификации элементов списка. Это позволяет эффективно обновлять только изменившиеся элементы, а не перерисовывать весь список.',
      body_en: 'React uses key to identify list elements. This allows it to efficiently update only the changed elements instead of re-rendering the whole list.',
      bullets: [
        { text_ru: '❌ key={index} — плохо, если список меняется (добавление/удаление)', text_en: '❌ key={index} — bad if the list changes (add/remove)' },
        { text_ru: '✅ key={user.id} — хорошо, уникальный и стабильный ID', text_en: '✅ key={user.id} — good, unique and stable ID' },
        { text_ru: '✅ key={lang} — хорошо для строк, если они уникальны', text_en: '✅ key={lang} — good for strings if they are unique' },
      ],
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Фильтрация списка',
      title_en: 'Filtering a list',
      body_ru: 'Часто нужно показывать не весь список, а только часть. Используй .filter() перед .map().',
      body_en: 'Often you need to show only part of the list. Use .filter() before .map().',
      code: `function FilteredList() {
  const [search, setSearch] = useState('')
  const languages = ['HTML', 'CSS', 'JavaScript', 'React', 'TypeScript', 'Python']

  const filtered = languages.filter(lang =>
    lang.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div>
      <input
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="Поиск языка..."
      />
      <ul>
        {filtered.map(lang => (
          <li key={lang}>{lang}</li>
        ))}
      </ul>
      <p>Найдено: {filtered.length}</p>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Условный рендеринг — && оператор',
      title_en: 'Conditional rendering — && operator',
      body_ru: 'Оператор && позволяет показать JSX только если условие true. Если false — ничего не рендерится.',
      body_en: 'The && operator lets you show JSX only if the condition is true. If false — nothing is rendered.',
      bullets: [
        { text_ru: '{isLoggedIn && <Dashboard />} — покажет Dashboard только если isLoggedIn true', text_en: '{isLoggedIn && <Dashboard />} — shows Dashboard only when isLoggedIn is true' },
        { text_ru: 'Осторожно: {count && <p>{count}</p>} — если count равен 0, рендерится "0"!', text_en: 'Careful: {count && <p>{count}</p>} — if count is 0, it renders "0"!' },
        { text_ru: 'Лучше: {count > 0 && <p>{count}</p>}', text_en: 'Better: {count > 0 && <p>{count}</p>}' },
      ],
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Условный рендеринг через &&',
      title_en: 'Conditional rendering with &&',
      body_ru: 'Используй && для показа элементов только при выполнении условия.',
      body_en: 'Use && to show elements only when the condition is met.',
      code: `function Notification({ messages }) {
  const count = messages.length

  return (
    <div>
      <h2>Входящие</h2>
      {count > 0 && (
        <span className="badge">{count} новых</span>
      )}
      {count === 0 && (
        <p>Нет новых сообщений</p>
      )}
      <ul>
        {messages.map(msg => (
          <li key={msg.id}>{msg.text}</li>
        ))}
      </ul>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'code',
      title_ru: 'Тернарный оператор в JSX',
      title_en: 'Ternary operator in JSX',
      body_ru: 'Тернарный оператор ? : позволяет выбрать один из двух вариантов отображения.',
      body_en: 'The ternary operator ? : lets you choose between two display options.',
      code: `function LoginButton({ isLoggedIn, onLogin, onLogout }) {
  return (
    <div>
      {isLoggedIn
        ? <button onClick={onLogout}>Выйти</button>
        : <button onClick={onLogin}>Войти</button>
      }
      <p>
        {isLoggedIn
          ? '✅ Вы вошли в систему'
          : '❌ Вы не авторизованы'
        }
      </p>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's9',
      type: 'practice-cta',
      title_ru: 'Практика: список с поиском!',
      title_en: 'Practice: list with search!',
      body_ru: 'В редакторе — список языков программирования. Добавь поле поиска для фильтрации.',
      body_en: 'The editor has a list of programming languages. Add a search field for filtering.',
      visual: { kind: 'emoji', emojis: ['🔍', '📋', '✅'] },
    },
  ],

  content: {
    intro_ru: `В React рендеринг списков — одна из самых частых задач. Вместо HTML-таблиц или ручного создания DOM-элементов
мы используем JavaScript-метод .map() прямо в JSX. Условный рендеринг позволяет показывать и скрывать части
интерфейса в зависимости от данных.`,
    intro_en: `In React rendering lists is one of the most common tasks. Instead of HTML tables or manually creating DOM elements
we use the JavaScript .map() method right inside JSX. Conditional rendering lets us show and hide parts of
the interface depending on data.`,

    blocks: [
      {
        sectionId: 'lists-map',
        heading_ru: 'Список через .map()',
        heading_en: 'Lists with .map()',
        text_ru: `Метод .map() перебирает массив и для каждого элемента возвращает новое значение.
В React мы возвращаем JSX-элемент для каждого пункта данных. Результирующий массив JSX-элементов
React рендерит в DOM.

Всё это происходит прямо внутри JSX в фигурных скобках {}.`,
        text_en: `The .map() method iterates over an array and returns a new value for each element.
In React we return a JSX element for each data item. The resulting array of JSX elements
is rendered to the DOM by React.

All of this happens right inside JSX within curly braces {}.`,
        code: `const fruits = [
  { id: 1, name: 'Яблоко', emoji: '🍎' },
  { id: 2, name: 'Банан',  emoji: '🍌' },
  { id: 3, name: 'Вишня',  emoji: '🍒' },
]

function FruitList() {
  return (
    <ul>
      {fruits.map(fruit => (
        <li key={fruit.id}>
          {fruit.emoji} {fruit.name}
        </li>
      ))}
    </ul>
  )
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'key-prop',
        heading_ru: 'Проп key',
        heading_en: 'The key prop',
        text_ru: `Когда React видит список элементов, ему нужно отслеживать каждый из них.
Проп key — уникальный идентификатор, который помогает React понять, какой элемент
добавился, удалился или переместился.

Без key React должен перерисовывать весь список при любом изменении — это медленно.
С правильным key он обновляет только изменившиеся элементы.`,
        text_en: `When React sees a list of elements it needs to track each of them.
The key prop is a unique identifier that helps React understand which element
was added, removed or moved.

Without key React has to re-render the whole list on any change — that is slow.
With a proper key it only updates the changed elements.`,
      },
      {
        sectionId: 'conditional-if',
        heading_ru: 'Условный рендеринг (&&)',
        heading_en: 'Conditional rendering (&&)',
        text_ru: `Оператор && (И) в JavaScript возвращает второй операнд, если первый истинный.
В JSX это используется для показа элемента только при выполнении условия:

{условие && <Компонент />}

Если условие true — рендерится Компонент.
Если false — не рендерится ничего.`,
        text_en: `The && (AND) operator in JavaScript returns the second operand if the first is truthy.
In JSX this is used to show an element only when the condition is met:

{condition && <Component />}

If the condition is true — Component renders.
If false — nothing renders.`,
        code: `function UserPanel({ user }) {
  return (
    <div>
      {user.isAdmin && (
        <button className="admin-btn">
          ⚙️ Панель администратора
        </button>
      )}
      {user.hasNewMessages && (
        <div className="notification">
          У вас {user.messageCount} новых сообщений
        </div>
      )}
      <p>Привет, {user.name}!</p>
    </div>
  )
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'conditional-ternary',
        heading_ru: 'Тернарный оператор',
        heading_en: 'Ternary operator',
        text_ru: `Тернарный оператор условие ? ЕслиДа : ЕслиНет позволяет выбрать один из двух вариантов.
Это удобно когда нужно показать разный JSX в зависимости от условия.

Можно вкладывать тернарные операторы, но более двух уровней делают код нечитаемым.
В таких случаях лучше вынести логику в переменную или отдельную функцию.`,
        text_en: `The ternary operator condition ? IfTrue : IfFalse lets you choose between two options.
This is handy when you need to show different JSX depending on a condition.

You can nest ternary operators, but more than two levels make the code unreadable.
In those cases it is better to extract the logic into a variable or a separate function.`,
        code: `function StatusBadge({ status }) {
  // Сложная логика — лучше вынести в переменную
  let label, color
  if (status === 'active')   { label = 'Активен';  color = 'green' }
  if (status === 'inactive') { label = 'Неактивен'; color = 'red' }
  if (status === 'pending')  { label = 'Ожидание'; color = 'yellow' }

  return (
    <span style={{ background: color }}>
      {label}
    </span>
  )
}`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Список языков с фильтром',
    title_en: 'Language list with filter',
    instructions_ru: `Уже есть список языков программирования. Доработай его:

1. Поле поиска фильтрует список в реальном времени
2. Если результатов нет — показывай "Ничего не найдено 😔"
3. Добавь счётчик: "Показано X из Y языков"
4. Выдели совпадение: если язык начинается на введённую букву, показывай ⭐ перед ним`,
    instructions_en: `There is already a list of programming languages. Improve it:

1. The search field filters the list in real time
2. If no results — show "Nothing found 😔"
3. Add a counter: "Showing X of Y languages"
4. Highlight matches: if a language starts with the typed letter, show ⭐ before it`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: sans-serif; max-width: 480px; margin: 40px auto; padding: 0 20px; background: #f8f9fa; }
    .card { background: white; border-radius: 16px; padding: 24px; box-shadow: 0 2px 12px rgba(0,0,0,0.08); }
    h2 { margin: 0 0 16px; color: #212529; }
    input { width: 100%; padding: 10px 14px; border: 2px solid #dee2e6; border-radius: 10px; font-size: 15px; box-sizing: border-box; outline: none; }
    input:focus { border-color: #4c6ef5; }
    ul { list-style: none; padding: 0; margin: 16px 0 0; }
    li { padding: 10px 14px; border-radius: 8px; margin-bottom: 6px; background: #f1f3f5; font-size: 15px; }
    .count { color: #868e96; font-size: 13px; margin-top: 12px; }
    .empty { text-align: center; color: #adb5bd; padding: 20px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React

    const LANGUAGES = [
      'HTML', 'CSS', 'JavaScript', 'TypeScript', 'React',
      'Vue', 'Angular', 'Python', 'Java', 'Kotlin',
      'Swift', 'Go', 'Rust', 'PHP', 'Ruby'
    ]

    function LanguageList() {
      const [search, setSearch] = useState('')

      // Отфильтруй LANGUAGES по search
      const filtered = LANGUAGES

      return (
        <div className="card">
          <h2>💻 Языки программирования</h2>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Поиск..."
          />
          <ul>
            {filtered.map(lang => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <p className="count">Показано {filtered.length} из {LANGUAGES.length}</p>
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<LanguageList />)
  </script>
</body>
</html>`,
    },
    hints_ru: [
      'Для фильтра: const filtered = LANGUAGES.filter(lang => lang.toLowerCase().includes(search.toLowerCase()))',
      'Для пустого состояния: {filtered.length === 0 && <p className="empty">Ничего не найдено 😔</p>}',
      'Для звёздочки: lang.toLowerCase().startsWith(search.toLowerCase()) && search ? \'⭐ \' + lang : lang',
    ],
    hints_en: [
      'For filtering: const filtered = LANGUAGES.filter(lang => lang.toLowerCase().includes(search.toLowerCase()))',
      'For empty state: {filtered.length === 0 && <p className="empty">Nothing found 😔</p>}',
      'For the star: lang.toLowerCase().startsWith(search.toLowerCase()) && search ? \'⭐ \' + lang : lang',
    ],
  },

  keyTerms: [
    {
      term_ru: '.map()',
      term_en: '.map()',
      definition_ru: 'Метод массива, создающий новый массив из результатов вызова функции для каждого элемента. В React используется для рендеринга списков.',
      definition_en: 'Array method that creates a new array from the results of calling a function for each element. Used in React for rendering lists.',
      example_ru: 'items.map(item => <li key={item.id}>{item.name}</li>)',
      example_en: 'items.map(item => <li key={item.id}>{item.name}</li>)',
    },
    {
      term_ru: 'key',
      term_en: 'key',
      definition_ru: 'Специальный проп React, обязательный для элементов списка. Должен быть уникальным среди соседних элементов.',
      definition_en: 'A special React prop required for list elements. Must be unique among sibling elements.',
      example_ru: '<li key={user.id}>{user.name}</li>',
      example_en: '<li key={user.id}>{user.name}</li>',
    },
    {
      term_ru: '.filter()',
      term_en: '.filter()',
      definition_ru: 'Метод массива, возвращающий новый массив только с элементами, прошедшими проверку функции.',
      definition_en: 'Array method that returns a new array with only the elements that passed the function check.',
      example_ru: 'users.filter(u => u.isActive)',
      example_en: 'users.filter(u => u.isActive)',
    },
    {
      term_ru: 'Условный рендеринг',
      term_en: 'Conditional rendering',
      definition_ru: 'Показ или скрытие JSX-элементов в зависимости от условия. Реализуется через && или тернарный оператор.',
      definition_en: 'Showing or hiding JSX elements based on a condition. Implemented with && or the ternary operator.',
      example_ru: '{isVisible && <Modal />}',
      example_en: '{isVisible && <Modal />}',
    },
    {
      term_ru: 'Тернарный оператор',
      term_en: 'Ternary operator',
      definition_ru: 'Краткая запись if-else: условие ? значениеЕслиДа : значениеЕслиНет.',
      definition_en: 'Shorthand for if-else: condition ? valueIfTrue : valueIfFalse.',
      example_ru: '{isAdmin ? <AdminPanel /> : <UserPanel />}',
      example_en: '{isAdmin ? <AdminPanel /> : <UserPanel />}',
    },
    {
      term_ru: 'Reconciliation (согласование)',
      term_en: 'Reconciliation',
      definition_ru: 'Процесс сравнения React Virtual DOM со старым, при котором используются key для эффективного обновления списков.',
      definition_en: 'The React process of comparing the Virtual DOM with the old one, where key is used for efficient list updates.',
      example_ru: 'React использует key чтобы знать, что изменилось в списке',
      example_en: 'React uses key to know what changed in the list',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'Использование индекса массива (index) как key — распространённая ошибка. Если элементы переставляются или удаляются, React может перепутать их и показать неправильные данные.',
      text_en: 'Using the array index as key is a common mistake. If items are reordered or deleted, React may confuse them and show incorrect data.',
    },
    {
      text_ru: 'React не рендерит false, null, undefined и 0 (кроме числа 0!). Это позволяет безопасно писать {isLoggedIn && <Panel />} — если isLoggedIn false, ничего не появится.',
      text_en: 'React does not render false, null, undefined and 0 (except the number 0!). This makes {isLoggedIn && <Panel />} safe — if isLoggedIn is false, nothing appears.',
    },
    {
      text_ru: 'Можно рендерить сразу несколько списков с разными источниками данных в одном компоненте. React обрабатывает их независимо, и key должны быть уникальными только среди соседних элементов.',
      text_en: 'You can render multiple lists from different data sources in one component. React handles them independently, and keys only need to be unique among sibling elements.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой метод используется для рендеринга массива в JSX?',
      text_en: 'Which method is used to render an array in JSX?',
      options_ru: [
        '.map()',
        '.forEach()',
        '.filter()',
        '.reduce()',
      ],
      options_en: [
        '.map()',
        '.forEach()',
        '.filter()',
        '.reduce()',
      ],
      correctIndex: 0,
      explanation_ru: '.map() возвращает новый массив JSX-элементов. .forEach() не возвращает значение и не подходит для рендеринга.',
      explanation_en: '.map() returns a new array of JSX elements. .forEach() does not return a value and is not suitable for rendering.',
    },
    {
      id: 'q2',
      text_ru: 'Почему проп key важен при рендеринге списков?',
      text_en: 'Why is the key prop important when rendering lists?',
      options_ru: [
        'Он помогает React отслеживать элементы и эффективно обновлять список',
        'Он задаёт CSS-класс каждому элементу',
        'Он указывает порядок рендеринга',
        'Без него React выдаёт синтаксическую ошибку',
      ],
      options_en: [
        'It helps React track elements and efficiently update the list',
        'It sets a CSS class for each element',
        'It specifies the render order',
        'Without it React throws a syntax error',
      ],
      correctIndex: 0,
      explanation_ru: 'key позволяет React точно знать, какой элемент изменился, добавился или удалился, что делает обновление DOM более эффективным.',
      explanation_en: 'key lets React know exactly which element changed, was added or removed, making DOM updates more efficient.',
    },
    {
      id: 'q3',
      text_ru: 'Что выведет {0 && <p>Привет</p>}?',
      text_en: 'What will {0 && <p>Hello</p>} render?',
      options_ru: [
        'Число 0 (не <p>)',
        'Текст "Привет"',
        'Ничего',
        'false',
      ],
      options_en: [
        'The number 0 (not <p>)',
        'The text "Hello"',
        'Nothing',
        'false',
      ],
      correctIndex: 0,
      explanation_ru: 'React не рендерит false, null, undefined — но 0 является числом и рендерится! Используй {count > 0 && ...} чтобы избежать этого.',
      explanation_en: 'React does not render false, null, undefined — but 0 is a number and does render! Use {count > 0 && ...} to avoid this.',
    },
    {
      id: 'q4',
      text_ru: 'Как показать один из двух компонентов в зависимости от условия?',
      text_en: 'How do you show one of two components based on a condition?',
      options_ru: [
        '{условие ? <КомпА /> : <КомпБ />}',
        '{if (условие) <КомпА /> else <КомпБ />}',
        '{условие && <КомпА /> || <КомпБ />}',
        'show(условие, <КомпА />, <КомпБ />)',
      ],
      options_en: [
        '{condition ? <CompA /> : <CompB />}',
        '{if (condition) <CompA /> else <CompB />}',
        '{condition && <CompA /> || <CompB />}',
        'show(condition, <CompA />, <CompB />)',
      ],
      correctIndex: 0,
      explanation_ru: 'Тернарный оператор — стандартный способ показать один из двух вариантов JSX.',
      explanation_en: 'The ternary operator is the standard way to show one of two JSX options.',
    },
  ],
}
