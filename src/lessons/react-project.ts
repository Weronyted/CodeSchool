import type { Lesson } from '@/types/lesson'

export const reactProject: Lesson = {
  slug: 'react-project',
  category: 'REACT',
  readTime: 15,
  icon: '✅',

  title_ru: 'Финальный проект — Todo App',
  title_en: 'Final project — Todo App',

  description_ru: 'Собери всё вместе: компоненты, state, списки, формы — и построй настоящее Todo-приложение.',
  description_en: 'Put it all together: components, state, lists, forms — and build a real Todo application.',

  sections: [
    { id: 'plan',         title_ru: 'Планирование',        title_en: 'Planning' },
    { id: 'add-todos',    title_ru: 'Добавление задач',    title_en: 'Adding todos' },
    { id: 'delete-todos', title_ru: 'Удаление задач',      title_en: 'Deleting todos' },
    { id: 'filter-todos', title_ru: 'Фильтрация задач',    title_en: 'Filtering todos' },
    { id: 'key-terms',    title_ru: 'Важные слова',        title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Todo App — классика React',
      title_en: 'Todo App — a React classic',
      body_ru: 'Todo App — стандартный учебный проект, который объединяет все основы React: компоненты, state, события, списки и фильтрацию.',
      body_en: 'Todo App is the standard learning project that brings together all React fundamentals: components, state, events, lists and filtering.',
      visual: { kind: 'emoji', emojis: ['✅', '📋', '🚀'] },
    },
    {
      id: 's2',
      type: 'concept',
      title_ru: 'Шаг 1: Планирование — дерево компонентов',
      title_en: 'Step 1: Planning — component tree',
      body_ru: 'Перед кодом думай о структуре. Какие компоненты нужны? Кто хранит данные? Кто только отображает?',
      body_en: 'Before writing code think about structure. What components are needed? Who holds the data? Who just displays?',
      bullets: [
        { text_ru: 'App — главный компонент, хранит весь state (todos, filter)', text_en: 'App — root component, holds all state (todos, filter)' },
        { text_ru: 'TodoForm — форма добавления задачи', text_en: 'TodoForm — form for adding a todo' },
        { text_ru: 'TodoFilter — кнопки фильтрации (Все / Активные / Выполненные)', text_en: 'TodoFilter — filter buttons (All / Active / Done)' },
        { text_ru: 'TodoList — список задач', text_en: 'TodoList — list of todos' },
        { text_ru: 'TodoItem — одна задача (чекбокс + текст + кнопка удалить)', text_en: 'TodoItem — one todo (checkbox + text + delete button)' },
      ],
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Шаг 2: Данные — структура todo',
      title_en: 'Step 2: Data — todo structure',
      body_ru: 'Каждая задача — это объект. Определим структуру заранее.',
      body_en: 'Each todo is an object. Let\'s define the structure upfront.',
      bullets: [
        { text_ru: 'id — уникальный идентификатор (Date.now())', text_en: 'id — unique identifier (Date.now())' },
        { text_ru: 'text — текст задачи', text_en: 'text — the task text' },
        { text_ru: 'done — выполнена ли задача (boolean)', text_en: 'done — whether the task is completed (boolean)' },
      ],
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Добавление задачи',
      title_en: 'Adding a todo',
      body_ru: 'Новая задача создаётся из текста в инпуте и добавляется в массив todos через spread.',
      body_en: 'A new todo is created from the input text and added to the todos array via spread.',
      code: `function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')

  const addTodo = () => {
    if (!text.trim()) return // не добавляем пустые

    const newTodo = {
      id: Date.now(),
      text: text.trim(),
      done: false,
    }

    setTodos(prev => [...prev, newTodo])
    setText('') // очищаем поле
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') addTodo()
  }

  return (
    <div>
      <input
        value={text}
        onChange={e => setText(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Новая задача..."
      />
      <button onClick={addTodo}>Добавить</button>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Отметить как выполненное',
      title_en: 'Mark as done',
      body_ru: 'Переключаем поле done у нужного todo через .map() — создаём новый массив с изменённым объектом.',
      body_en: 'Toggle the done field of the target todo via .map() — creating a new array with the modified object.',
      code: `const toggleTodo = (id) => {
  setTodos(prev =>
    prev.map(todo =>
      todo.id === id
        ? { ...todo, done: !todo.done }
        : todo
    )
  )
}

// Рендеринг
{todos.map(todo => (
  <div key={todo.id}>
    <input
      type="checkbox"
      checked={todo.done}
      onChange={() => toggleTodo(todo.id)}
    />
    <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
      {todo.text}
    </span>
  </div>
))}`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Удаление задачи',
      title_en: 'Deleting a todo',
      body_ru: 'Удаляем задачу через .filter() — возвращаем новый массив без удалённого элемента.',
      body_en: 'Delete a todo with .filter() — return a new array without the removed element.',
      code: `const deleteTodo = (id) => {
  setTodos(prev => prev.filter(todo => todo.id !== id))
}

// Кнопка удаления в TodoItem
{todos.map(todo => (
  <div key={todo.id} style={{ display: 'flex', gap: 8 }}>
    <span style={{ textDecoration: todo.done ? 'line-through' : 'none' }}>
      {todo.text}
    </span>
    <button onClick={() => deleteTodo(todo.id)}>🗑️</button>
  </div>
))}`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Фильтрация задач',
      title_en: 'Filtering todos',
      body_ru: 'Фильтр — это просто производный массив. Оригинальный todos не меняем — только фильтруем при рендеринге.',
      body_en: 'A filter is just a derived array. We don\'t change the original todos — we just filter when rendering.',
      code: `const [filter, setFilter] = useState('all') // 'all' | 'active' | 'done'

const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.done
  if (filter === 'done')   return todo.done
  return true // 'all'
})

// Кнопки фильтра
<div>
  <button onClick={() => setFilter('all')}>Все ({todos.length})</button>
  <button onClick={() => setFilter('active')}>Активные</button>
  <button onClick={() => setFilter('done')}>Выполненные</button>
</div>

// Рендерим отфильтрованный список
{filteredTodos.map(todo => (
  <TodoItem key={todo.id} todo={todo} ... />
))}`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'concept',
      title_ru: 'Подъём состояния (Lifting State Up)',
      title_en: 'Lifting State Up',
      body_ru: 'Когда несколько компонентов нуждаются в одних данных, state поднимается в их общего родителя. App — общий родитель для всех компонентов Todo App.',
      body_en: 'When multiple components need the same data, state is lifted to their common parent. App is the common parent for all Todo App components.',
      bullets: [
        { text_ru: 'todos хранится в App → передаётся в TodoList через props', text_en: 'todos lives in App → passed to TodoList via props' },
        { text_ru: 'deleteTodo — функция в App → передаётся в TodoItem', text_en: 'deleteTodo — function in App → passed to TodoItem' },
        { text_ru: 'Данные вниз (props), события вверх (callbacks)', text_en: 'Data down (props), events up (callbacks)' },
      ],
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Derived State — не дублируй данные',
      title_en: 'Derived State — don\'t duplicate data',
      body_ru: 'filteredTodos и счётчик задач — это "производные" данные. Не сохраняй их в state: вычисляй из todos при каждом рендере. Это предотвращает рассинхронизацию.',
      body_en: 'filteredTodos and the task counter are "derived" data. Don\'t store them in state: compute them from todos on each render. This prevents desynchronisation.',
      visual: { kind: 'emoji', emojis: ['🧮', '✨', '✅'] },
    },
    {
      id: 's10',
      type: 'practice-cta',
      title_ru: 'Финальный проект: собери Todo App!',
      title_en: 'Final project: build the Todo App!',
      body_ru: 'В редакторе — полный стартовый код Todo App. Изучи его, добавь функциональность и сделай своим!',
      body_en: 'The editor has the full Todo App starter code. Study it, add functionality and make it your own!',
      visual: { kind: 'emoji', emojis: ['🚀', '✅', '🎓'] },
    },
  ],

  content: {
    intro_ru: `Финальный проект объединяет всё, что ты изучил о React: компоненты, props, state, события, списки,
фильтрацию и условный рендеринг. Todo App — классический способ продемонстрировать понимание React,
и он часто встречается в портфолио начинающих разработчиков.`,
    intro_en: `The final project brings together everything you have learned about React: components, props, state,
events, lists, filtering and conditional rendering. Todo App is the classic way to demonstrate React
understanding and it often appears in beginner developer portfolios.`,

    blocks: [
      {
        sectionId: 'plan',
        heading_ru: 'Планирование Todo App',
        heading_en: 'Planning the Todo App',
        text_ru: `Перед написанием кода важно спланировать:

1. Что хранит state? — массив todos и текущий фильтр
2. Где находится state? — в корневом компоненте App (lifting state up)
3. Какие компоненты? — App, TodoForm, TodoFilter, TodoList, TodoItem
4. Как данные передаются? — через props вниз, через callbacks вверх

Хорошее планирование экономит время на рефакторинг.`,
        text_en: `Before writing code it's important to plan:

1. What does state hold? — an array of todos and the current filter
2. Where does state live? — in the root App component (lifting state up)
3. What components? — App, TodoForm, TodoFilter, TodoList, TodoItem
4. How does data flow? — props down, callbacks up

Good planning saves time on refactoring.`,
      },
      {
        sectionId: 'add-todos',
        heading_ru: 'Добавление задач',
        heading_en: 'Adding todos',
        text_ru: `Добавление задачи — это три шага:
1. Получить текст из управляемого input
2. Создать объект todo с уникальным id
3. Добавить в массив через setTodos([...todos, newTodo])

Важно всегда создавать новый массив (иммутабельность), а не мутировать существующий.
Также стоит очищать поле ввода после добавления.`,
        text_en: `Adding a todo is three steps:
1. Get the text from a controlled input
2. Create a todo object with a unique id
3. Add to the array via setTodos([...todos, newTodo])

Always create a new array (immutability), never mutate the existing one.
Also clear the input field after adding.`,
        code: `const addTodo = (text) => {
  if (!text.trim()) return

  setTodos(prev => [
    ...prev,
    { id: Date.now(), text: text.trim(), done: false }
  ])
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'delete-todos',
        heading_ru: 'Удаление задач',
        heading_en: 'Deleting todos',
        text_ru: `Удаление через .filter() — создаём новый массив без удалённого элемента.
Кнопка удаления находится в TodoItem. Сама функция deleteTodo — в App (где хранится todos).
Функция передаётся через props: <TodoItem onDelete={deleteTodo} />.
В TodoItem вызываем: <button onClick={() => onDelete(todo.id)}>🗑️</button>`,
        text_en: `Deletion via .filter() — create a new array without the removed element.
The delete button is in TodoItem. The deleteTodo function itself is in App (where todos lives).
The function is passed via props: <TodoItem onDelete={deleteTodo} />.
In TodoItem we call: <button onClick={() => onDelete(todo.id)}>🗑️</button>`,
        code: `// В App
const deleteTodo = (id) => {
  setTodos(prev => prev.filter(t => t.id !== id))
}

// В TodoItem
function TodoItem({ todo, onDelete, onToggle }) {
  return (
    <li>
      <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
      <span className={todo.done ? 'done' : ''}>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>🗑️</button>
    </li>
  )
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'filter-todos',
        heading_ru: 'Фильтрация задач',
        heading_en: 'Filtering todos',
        text_ru: `Фильтр — это дополнительный state: 'all' | 'active' | 'done'.
filteredTodos вычисляется из todos и filter при каждом рендере (derived state).
Не нужно хранить filteredTodos в state — это избыточно и может привести к рассинхронизации.

Счётчик задач тоже производный: todos.filter(t => !t.done).length`,
        text_en: `The filter is extra state: 'all' | 'active' | 'done'.
filteredTodos is computed from todos and filter on each render (derived state).
There is no need to store filteredTodos in state — that would be redundant and could cause desynchronisation.

The task counter is also derived: todos.filter(t => !t.done).length`,
        code: `// Производные данные (вычисляются при рендере)
const filteredTodos = todos.filter(todo => {
  if (filter === 'active') return !todo.done
  if (filter === 'done')   return todo.done
  return true
})

const activeCount = todos.filter(t => !t.done).length
const doneCount = todos.filter(t => t.done).length`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Полноценный Todo App',
    title_en: 'Full-featured Todo App',
    instructions_ru: `В редакторе — стартовый код Todo App. Изучи его и добавь:

1. ✅ Добавление задачи (поле + кнопка, также по Enter)
2. ✅ Отметить как выполнено (чекбокс, зачёркивание текста)
3. ✅ Удаление задачи (кнопка 🗑️ у каждой задачи)
4. ✅ Фильтрация: Все / Активные / Выполненные
5. ✅ Счётчик активных задач
6. 🌟 Бонус: кнопка "Очистить выполненные"`,
    instructions_en: `The editor has Todo App starter code. Study it and add:

1. ✅ Add a todo (input + button, also via Enter)
2. ✅ Mark as done (checkbox, strikethrough text)
3. ✅ Delete todo (🗑️ button per item)
4. ✅ Filtering: All / Active / Done
5. ✅ Active task counter
6. 🌟 Bonus: "Clear completed" button`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body { font-family: 'Segoe UI', sans-serif; background: #f0f4ff; min-height: 100vh; display: flex; justify-content: center; align-items: flex-start; padding: 40px 16px; }
    .app { background: white; border-radius: 20px; box-shadow: 0 8px 32px rgba(0,0,0,0.12); width: 100%; max-width: 500px; overflow: hidden; }
    .header { background: linear-gradient(135deg, #4c6ef5, #845ef7); padding: 28px 24px; color: white; }
    .header h1 { font-size: 24px; margin-bottom: 4px; }
    .header p { opacity: 0.8; font-size: 14px; }
    .add-form { padding: 20px 24px; display: flex; gap: 10px; border-bottom: 1px solid #f1f3f5; }
    .add-form input { flex: 1; padding: 10px 14px; border: 2px solid #dee2e6; border-radius: 10px; font-size: 15px; outline: none; }
    .add-form input:focus { border-color: #4c6ef5; }
    .add-form button { padding: 10px 20px; background: #4c6ef5; color: white; border: none; border-radius: 10px; cursor: pointer; font-size: 15px; white-space: nowrap; }
    .filters { display: flex; gap: 8px; padding: 14px 24px; border-bottom: 1px solid #f1f3f5; }
    .filters button { padding: 6px 14px; border: 2px solid #dee2e6; background: white; border-radius: 20px; cursor: pointer; font-size: 13px; }
    .filters button.active { border-color: #4c6ef5; color: #4c6ef5; background: #e7f5ff; }
    .todo-list { list-style: none; padding: 8px 0; min-height: 60px; }
    .todo-item { display: flex; align-items: center; gap: 12px; padding: 12px 24px; border-bottom: 1px solid #f8f9fa; }
    .todo-item:hover { background: #f8f9fa; }
    .todo-item input[type="checkbox"] { width: 18px; height: 18px; cursor: pointer; accent-color: #4c6ef5; }
    .todo-item span { flex: 1; font-size: 15px; color: #343a40; }
    .todo-item span.done { text-decoration: line-through; color: #adb5bd; }
    .todo-item .del-btn { background: none; border: none; cursor: pointer; font-size: 16px; opacity: 0.4; }
    .todo-item .del-btn:hover { opacity: 1; }
    .footer { padding: 14px 24px; color: #868e96; font-size: 13px; display: flex; justify-content: space-between; align-items: center; }
    .clear-btn { background: none; border: none; color: #adb5bd; cursor: pointer; font-size: 13px; }
    .clear-btn:hover { color: #e03131; }
    .empty { text-align: center; padding: 32px; color: #adb5bd; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React

    function App() {
      const [todos, setTodos] = useState([
        { id: 1, text: 'Изучить React', done: true },
        { id: 2, text: 'Написать Todo App', done: false },
        { id: 3, text: 'Добавить фильтры', done: false },
      ])
      const [inputText, setInputText] = useState('')
      const [filter, setFilter] = useState('all')

      // Добавить задачу
      const addTodo = () => {
        if (!inputText.trim()) return
        setTodos(prev => [...prev, { id: Date.now(), text: inputText.trim(), done: false }])
        setInputText('')
      }

      // Переключить выполнение
      const toggleTodo = (id) => {
        setTodos(prev => prev.map(t => t.id === id ? { ...t, done: !t.done } : t))
      }

      // Удалить задачу
      const deleteTodo = (id) => {
        setTodos(prev => prev.filter(t => t.id !== id))
      }

      // Очистить выполненные
      const clearDone = () => {
        setTodos(prev => prev.filter(t => !t.done))
      }

      // Фильтрация (derived state)
      const filteredTodos = todos.filter(t => {
        if (filter === 'active') return !t.done
        if (filter === 'done')   return t.done
        return true
      })

      const activeCount = todos.filter(t => !t.done).length
      const doneCount = todos.filter(t => t.done).length

      return (
        <div className="app">
          <div className="header">
            <h1>✅ Мои задачи</h1>
            <p>{activeCount} активных · {doneCount} выполненных</p>
          </div>

          {/* Форма добавления */}
          <div className="add-form">
            <input
              value={inputText}
              onChange={e => setInputText(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addTodo()}
              placeholder="Новая задача..."
            />
            <button onClick={addTodo}>+ Добавить</button>
          </div>

          {/* Фильтры */}
          <div className="filters">
            {['all', 'active', 'done'].map(f => (
              <button
                key={f}
                className={filter === f ? 'active' : ''}
                onClick={() => setFilter(f)}
              >
                {{ all: 'Все', active: 'Активные', done: 'Выполненные' }[f]}
              </button>
            ))}
          </div>

          {/* Список задач */}
          <ul className="todo-list">
            {filteredTodos.length === 0 && (
              <li className="empty">Нет задач 🎉</li>
            )}
            {filteredTodos.map(todo => (
              <li key={todo.id} className="todo-item">
                <input
                  type="checkbox"
                  checked={todo.done}
                  onChange={() => toggleTodo(todo.id)}
                />
                <span className={todo.done ? 'done' : ''}>{todo.text}</span>
                <button className="del-btn" onClick={() => deleteTodo(todo.id)}>🗑️</button>
              </li>
            ))}
          </ul>

          {/* Футер */}
          <div className="footer">
            <span>Всего: {todos.length}</span>
            {doneCount > 0 && (
              <button className="clear-btn" onClick={clearDone}>
                Очистить выполненные ({doneCount})
              </button>
            )}
          </div>
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  </script>
</body>
</html>`,
    },
    hints_ru: [
      'Приложение уже работает! Попробуй добавить задачи и переключить фильтры',
      'Раздели на компоненты: вынеси TodoItem в отдельную функцию',
      'Добавь localStorage: при монтировании загружай todos, при изменении — сохраняй',
      'Добавь возможность редактировать задачу двойным кликом',
      'Добавь drag-and-drop для перестановки задач',
    ],
    hints_en: [
      'The app already works! Try adding tasks and switching filters',
      'Split into components: extract TodoItem into a separate function',
      'Add localStorage: load todos on mount, save on change',
      'Add the ability to edit a task on double-click',
      'Add drag-and-drop for reordering tasks',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Lifting State Up',
      term_en: 'Lifting State Up',
      definition_ru: 'Паттерн React: перемещение state в общего родителя, когда несколько дочерних компонентов нуждаются в одних данных.',
      definition_en: 'A React pattern: moving state to a common parent when multiple child components need the same data.',
      example_ru: 'todos хранится в App и передаётся в TodoList и TodoFilter',
      example_en: 'todos lives in App and is passed to TodoList and TodoFilter',
    },
    {
      term_ru: 'Derived State',
      term_en: 'Derived State',
      definition_ru: 'Данные, вычисляемые из существующего state при каждом рендере. Не нужно хранить в state — они всегда актуальны.',
      definition_en: 'Data computed from existing state on each render. No need to store in state — it is always up to date.',
      example_ru: 'const activeCount = todos.filter(t => !t.done).length',
      example_en: 'const activeCount = todos.filter(t => !t.done).length',
    },
    {
      term_ru: 'Callback prop',
      term_en: 'Callback prop',
      definition_ru: 'Функция, передаваемая как prop в дочерний компонент, чтобы тот мог "сообщить" родителю о событии.',
      definition_en: 'A function passed as a prop to a child component, so it can "communicate" an event to the parent.',
      example_ru: '<TodoItem onDelete={deleteTodo} />',
      example_en: '<TodoItem onDelete={deleteTodo} />',
    },
    {
      term_ru: 'Иммутабельное обновление',
      term_en: 'Immutable update',
      definition_ru: 'Создание нового массива/объекта вместо изменения существующего. Обязательно для корректной работы React.',
      definition_en: 'Creating a new array/object instead of mutating the existing one. Required for React to work correctly.',
      example_ru: 'setTodos(prev => [...prev, newItem])',
      example_en: 'setTodos(prev => [...prev, newItem])',
    },
    {
      term_ru: 'Компонентное мышление',
      term_en: 'Thinking in components',
      definition_ru: 'Подход к проектированию React-приложений: разбивай UI на независимые повторно используемые части.',
      definition_en: 'An approach to designing React applications: break the UI into independent reusable pieces.',
      example_ru: 'App → Header + TodoForm + TodoList → TodoItem',
      example_en: 'App → Header + TodoForm + TodoList → TodoItem',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'TodoMVC (todomvc.com) — сайт, где Todo App реализован на десятках фреймворков: React, Vue, Angular, Svelte и даже на чистом JS. Отличный способ сравнить подходы.',
      text_en: 'TodoMVC (todomvc.com) is a site where the Todo App is implemented in dozens of frameworks: React, Vue, Angular, Svelte and even plain JS. A great way to compare approaches.',
    },
    {
      text_ru: 'Хранение todos в localStorage позволяет им сохраняться между перезагрузками. Это делается через useEffect: сохраняй при изменении todos и загружай при монтировании.',
      text_en: 'Storing todos in localStorage lets them persist between page reloads. This is done via useEffect: save on todos change and load on mount.',
    },
    {
      text_ru: 'В production-приложениях Todo App часто усложняют: добавляют приоритеты, дедлайны, теги, drag-and-drop и синхронизацию с сервером. Это всё строится на тех же принципах.',
      text_en: 'In production applications the Todo App is often extended: priorities, deadlines, tags, drag-and-drop and server sync are added. All of this is built on the same principles.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что такое "Lifting State Up" в React?',
      text_en: 'What is "Lifting State Up" in React?',
      options_ru: [
        'Перемещение state в общего родителя, чтобы несколько компонентов могли им пользоваться',
        'Передача state из дочернего в родительский через props',
        'Глобальное хранилище для всех компонентов',
        'Перемещение компонента выше в дереве',
      ],
      options_en: [
        'Moving state to a common parent so multiple components can use it',
        'Passing state from a child to a parent via props',
        'A global store for all components',
        'Moving a component higher in the tree',
      ],
      correctIndex: 0,
      explanation_ru: 'Lifting State Up: если двум дочерним компонентам нужны одни данные, state поднимается в их ближайшего общего родителя.',
      explanation_en: 'Lifting State Up: if two child components need the same data, state is moved to their nearest common parent.',
    },
    {
      id: 'q2',
      text_ru: 'Как правильно удалить элемент из массива-state?',
      text_en: 'How do you correctly remove an element from an array state?',
      options_ru: [
        'setItems(prev => prev.filter(item => item.id !== id))',
        'items.splice(index, 1)',
        'delete items[index]',
        'setItems(items.length - 1)',
      ],
      options_en: [
        'setItems(prev => prev.filter(item => item.id !== id))',
        'items.splice(index, 1)',
        'delete items[index]',
        'setItems(items.length - 1)',
      ],
      correctIndex: 0,
      explanation_ru: '.filter() создаёт новый массив без удалённого элемента. splice и delete мутируют оригинальный массив — это нарушает иммутабельность React.',
      explanation_en: '.filter() creates a new array without the removed element. splice and delete mutate the original array — this breaks React\'s immutability.',
    },
    {
      id: 'q3',
      text_ru: 'Что такое "Derived State"?',
      text_en: 'What is "Derived State"?',
      options_ru: [
        'Данные, вычисляемые из существующего state при каждом рендере',
        'Отдельная переменная состояния для производных данных',
        'State, скопированный из родительского компонента',
        'Начальное значение useState',
      ],
      options_en: [
        'Data computed from existing state on each render',
        'A separate state variable for derived data',
        'State copied from the parent component',
        'The initial value of useState',
      ],
      correctIndex: 0,
      explanation_ru: 'Производные данные вычисляются из state при каждом рендере. Хранить их в state — избыточно и опасно: они могут рассинхронизироваться с источником.',
      explanation_en: 'Derived data is computed from state on each render. Storing them in state is redundant and risky: they can get out of sync with the source.',
    },
    {
      id: 'q4',
      text_ru: 'Как передать функцию удаления из App в TodoItem?',
      text_en: 'How do you pass a delete function from App to TodoItem?',
      options_ru: [
        'Через props: <TodoItem onDelete={deleteTodo} />',
        'Через глобальную переменную window.deleteTodo',
        'Через Context без props',
        'TodoItem должен определить функцию сам',
      ],
      options_en: [
        'Via props: <TodoItem onDelete={deleteTodo} />',
        'Via global variable window.deleteTodo',
        'Via Context without props',
        'TodoItem should define the function itself',
      ],
      correctIndex: 0,
      explanation_ru: 'Функции передаются как callback props. Это стандартный паттерн React: данные вниз через props, события вверх через callbacks.',
      explanation_en: 'Functions are passed as callback props. This is the standard React pattern: data down through props, events up through callbacks.',
    },
    {
      id: 'q5',
      text_ru: 'Нужно ли хранить filteredTodos в отдельном state?',
      text_en: 'Do you need to store filteredTodos in a separate state?',
      options_ru: [
        'Нет, вычисляй из todos и filter при каждом рендере',
        'Да, иначе React не знает об изменениях',
        'Да, это ускоряет рендеринг',
        'Только если список длиннее 100 элементов',
      ],
      options_en: [
        'No, compute it from todos and filter on each render',
        'Yes, otherwise React won\'t know about changes',
        'Yes, it speeds up rendering',
        'Only if the list is longer than 100 items',
      ],
      correctIndex: 0,
      explanation_ru: 'filteredTodos — производное состояние. Храни только источники данных (todos, filter), а производные вычисляй. Это предотвращает рассинхронизацию.',
      explanation_en: 'filteredTodos is derived state. Store only the sources (todos, filter) and compute derivatives. This prevents desynchronisation.',
    },
  ],
}
