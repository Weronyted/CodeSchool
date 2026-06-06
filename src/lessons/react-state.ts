import type { Lesson } from '@/types/lesson'

export const reactState: Lesson = {
  slug: 'react-state',
  category: 'REACT',
  readTime: 11,
  icon: '🔄',

  title_ru: 'State — состояние компонента',
  title_en: 'State — component state',

  description_ru: 'Хук useState: как хранить и обновлять данные внутри компонента, вызывая перерисовку.',
  description_en: 'The useState hook: how to store and update data inside a component, triggering re-renders.',

  sections: [
    { id: 'what-state',     title_ru: 'Что такое state',      title_en: 'What is state' },
    { id: 'usestate-hook',  title_ru: 'Хук useState',         title_en: 'The useState hook' },
    { id: 'update-state',   title_ru: 'Обновление state',     title_en: 'Updating state' },
    { id: 'multiple-state', title_ru: 'Несколько состояний',  title_en: 'Multiple state variables' },
    { id: 'key-terms',      title_ru: 'Важные слова',         title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'State — память компонента',
      title_en: 'State — the component\'s memory',
      body_ru: 'State — это данные, которые компонент хранит сам у себя и которые могут меняться со временем. При каждом изменении state React перерисовывает компонент.',
      body_en: 'State is data that a component keeps internally and that can change over time. Every time state changes, React re-renders the component.',
      visual: { kind: 'emoji', emojis: ['🧠', '🔄', '✨'] },
    },
    {
      id: 's2',
      type: 'compare',
      title_ru: 'State vs Props',
      title_en: 'State vs Props',
      body_ru: 'State — внутри компонента. Props — снаружи. Оба влияют на то, что отображается.',
      body_en: 'State is inside the component. Props come from outside. Both affect what is displayed.',
      compareLeft: {
        label_ru: 'State',
        label_en: 'State',
        items_ru: [
          'Хранится внутри компонента',
          'Компонент сам его меняет',
          'Меняется — компонент рисуется заново',
          'Пример: счётчик, открыто/закрыто',
        ],
        items_en: [
          'Lives inside the component',
          'The component changes it itself',
          'Changes → component re-renders',
          'Example: counter, open/closed',
        ],
        color: 'green',
      },
      compareRight: {
        label_ru: 'Props',
        label_en: 'Props',
        items_ru: [
          'Приходит снаружи (от родителя)',
          'Компонент не может менять',
          'Меняется — родитель перерисовывает',
          'Пример: имя, цвет, текст кнопки',
        ],
        items_en: [
          'Comes from outside (parent)',
          'Component cannot change it',
          'Changes → parent re-renders',
          'Example: name, colour, button text',
        ],
        color: 'blue',
      },
    },
    {
      id: 's3',
      type: 'analogy',
      title_ru: 'Аналогия: state — это светофор',
      title_en: 'Analogy: state is a traffic light',
      body_ru: 'Светофор хранит своё текущее состояние (красный, жёлтый, зелёный) и периодически его меняет. Остальные на него реагируют — но состояние хранится в самом светофоре.',
      body_en: 'A traffic light keeps its current state (red, yellow, green) and changes it periodically. Others react to it — but the state lives inside the light itself.',
      visual: { kind: 'emoji', emojis: ['🔴', '🟡', '🟢'] },
      bullets: [
        { text_ru: 'Состояние хранится внутри "светофора" (компонента)', text_en: 'State is stored inside the "traffic light" (component)' },
        { text_ru: 'При смене состояния — всё вокруг обновляется', text_en: 'When state changes — everything around updates' },
        { text_ru: 'Обычный JS-код при смене переменной не обновляет DOM — React делает это за тебя', text_en: 'Plain JS won\'t update the DOM on variable change — React does it for you' },
      ],
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Синтаксис useState',
      title_en: 'useState syntax',
      body_ru: 'useState — это хук. Он возвращает массив из двух элементов: текущее значение и функция для его обновления.',
      body_en: 'useState is a hook. It returns an array of two elements: the current value and a function to update it.',
      code: `import { useState } from 'react'

function Counter() {
  // [текущее значение, функция обновления] = useState(начальное значение)
  const [count, setCount] = useState(0)

  return (
    <div>
      <p>Счёт: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        +1
      </button>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's5',
      type: 'concept',
      title_ru: 'Почему нельзя просто менять переменную?',
      title_en: 'Why can\'t you just change a variable?',
      body_ru: 'React не знает о простых переменных JS. Он отслеживает только изменения через setter-функцию useState. Без неё DOM не обновится.',
      body_en: 'React does not know about plain JS variables. It only tracks changes made through the useState setter function. Without it the DOM will not update.',
      bullets: [
        { text_ru: '❌ count++ → React не узнает → DOM не изменится', text_en: '❌ count++ → React won\'t know → DOM won\'t change' },
        { text_ru: '✅ setCount(count + 1) → React узнает → компонент перерисуется', text_en: '✅ setCount(count + 1) → React knows → component re-renders' },
        { text_ru: 'Setter-функция "говорит" React: "данные изменились, обнови UI"', text_en: 'The setter function tells React: "data changed, update the UI"' },
      ],
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Счётчик с + и −',
      title_en: 'Counter with + and −',
      body_ru: 'Пример полноценного счётчика с ограничением: не уходит ниже нуля.',
      body_en: 'A full counter example with a guard: it won\'t go below zero.',
      code: `function Counter() {
  const [count, setCount] = useState(0)

  const increment = () => setCount(count + 1)
  const decrement = () => {
    if (count > 0) setCount(count - 1)
  }
  const reset = () => setCount(0)

  return (
    <div>
      <h2>{count}</h2>
      <button onClick={decrement}>−</button>
      <button onClick={reset}>Сброс</button>
      <button onClick={increment}>+</button>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Функциональное обновление state',
      title_en: 'Functional state update',
      body_ru: 'Если новое значение зависит от предыдущего, лучше передать функцию в setter. React передаст в неё актуальное значение.',
      body_en: 'If the new value depends on the previous one, it is better to pass a function to the setter. React will pass the current value into it.',
      bullets: [
        { text_ru: '⚠️ setCount(count + 1) — может быть неточным при быстрых кликах', text_en: '⚠️ setCount(count + 1) — can be inaccurate with fast clicks' },
        { text_ru: '✅ setCount(prev => prev + 1) — всегда точно', text_en: '✅ setCount(prev => prev + 1) — always accurate' },
        { text_ru: 'Особенно важно при асинхронных обновлениях', text_en: 'Especially important with async updates' },
      ],
    },
    {
      id: 's8',
      type: 'code',
      title_ru: 'Несколько переменных состояния',
      title_en: 'Multiple state variables',
      body_ru: 'Хук useState можно вызывать несколько раз — каждый вызов создаёт независимую переменную состояния.',
      body_en: 'useState can be called multiple times — each call creates an independent state variable.',
      code: `function ProfileForm() {
  const [name, setName] = useState('')
  const [age, setAge] = useState(0)
  const [isPublic, setIsPublic] = useState(false)

  return (
    <form>
      <input
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Имя"
      />
      <input
        type="number"
        value={age}
        onChange={e => setAge(Number(e.target.value))}
      />
      <label>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={e => setIsPublic(e.target.checked)}
        />
        Публичный профиль
      </label>
    </form>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Правила хуков',
      title_en: 'Rules of hooks',
      body_ru: 'Хуки (useState, useEffect и др.) нельзя вызывать внутри условий или циклов — только на верхнем уровне компонента. React запоминает их порядок.',
      body_en: 'Hooks (useState, useEffect, etc.) cannot be called inside conditions or loops — only at the top level of the component. React remembers their order.',
      visual: { kind: 'emoji', emojis: ['📜', '⚠️', '✅'] },
    },
    {
      id: 's10',
      type: 'concept',
      title_ru: 'State объектов и массивов',
      title_en: 'State with objects and arrays',
      body_ru: 'Если state — объект или массив, при обновлении нужно создать новый объект/массив (иммутабельность). React сравнивает ссылки, а не содержимое.',
      body_en: 'If state is an object or array, you must create a new object/array when updating (immutability). React compares references, not content.',
      bullets: [
        { text_ru: '❌ state.name = "Боб" → ссылка та же → React не увидит изменение', text_en: '❌ state.name = "Bob" → same reference → React won\'t see the change' },
        { text_ru: '✅ setState({...state, name: "Боб"}) → новый объект → React обновит', text_en: '✅ setState({...state, name: "Bob"}) → new object → React updates' },
        { text_ru: '✅ setList([...list, newItem]) → новый массив', text_en: '✅ setList([...list, newItem]) → new array' },
      ],
    },
    {
      id: 's11',
      type: 'practice-cta',
      title_ru: 'Практика: сделай счётчик!',
      title_en: 'Practice: build a counter!',
      body_ru: 'В редакторе — заготовка счётчика. Добавь кнопки + и − и посмотри, как React перерисовывает компонент.',
      body_en: 'The editor has a counter template. Add + and − buttons and watch React re-render the component.',
      visual: { kind: 'emoji', emojis: ['🔢', '🔄', '🎉'] },
    },
  ],

  content: {
    intro_ru: `State (состояние) — это внутренние данные компонента, которые могут меняться со временем.
В отличие от props, state контролируется самим компонентом. Хук useState позволяет добавить реактивность:
при изменении state React автоматически перерисовывает компонент с новыми данными.`,
    intro_en: `State is a component's internal data that can change over time.
Unlike props, state is controlled by the component itself. The useState hook adds reactivity:
when state changes, React automatically re-renders the component with the new data.`,

    blocks: [
      {
        sectionId: 'what-state',
        heading_ru: 'Что такое state',
        heading_en: 'What is state',
        text_ru: `State — это "память" компонента. Он хранит данные, которые могут изменяться в ответ на действия пользователя
или другие события. Классические примеры: открыт/закрыт модальный диалог, текст в поле ввода, текущий счёт игры.

Главное отличие от обычной JS-переменной: когда state меняется, React знает об этом и автоматически
перерисовывает компонент. Обычные переменные не имеют такой "реактивности".`,
        text_en: `State is the component's "memory". It holds data that can change in response to user actions
or other events. Classic examples: whether a modal is open or closed, text in an input field, current game score.

The key difference from a plain JS variable: when state changes, React knows about it and automatically
re-renders the component. Plain variables do not have this "reactivity".`,
      },
      {
        sectionId: 'usestate-hook',
        heading_ru: 'Хук useState',
        heading_en: 'The useState hook',
        text_ru: `useState — это функция (хук), которую нужно вызвать внутри компонента.
Она возвращает массив из двух элементов:
1. Текущее значение state
2. Функция для обновления этого значения (setter)

Обновляя state через setter, ты сообщаешь React о необходимости перерисовать компонент.`,
        text_en: `useState is a function (hook) that you call inside a component.
It returns an array of two elements:
1. The current state value
2. A function to update that value (setter)

By updating state through the setter you tell React to re-render the component.`,
        code: `// const [значение, функцияОбновления] = useState(начальноеЗначение)

const [count, setCount] = useState(0)      // число
const [name, setName] = useState('')       // строка
const [isOpen, setIsOpen] = useState(false) // булево
const [items, setItems] = useState([])     // массив`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'update-state',
        heading_ru: 'Обновление state',
        heading_en: 'Updating state',
        text_ru: `Чтобы обновить state, нужно вызвать setter-функцию с новым значением. React поставит перерисовку в очередь
и в следующем рендере компонент получит обновлённое значение.

Важно: state обновляется асинхронно. После вызова setCount(5) нельзя сразу прочитать обновлённое значение —
только в следующем рендере.`,
        text_en: `To update state you call the setter function with a new value. React queues a re-render
and on the next render the component will receive the updated value.

Important: state updates are asynchronous. After calling setCount(5) you cannot immediately read the updated
value — only on the next render.`,
        code: `function Toggle() {
  const [isOn, setIsOn] = useState(false)

  return (
    <button onClick={() => setIsOn(!isOn)}>
      {isOn ? '✅ Включено' : '⭕ Выключено'}
    </button>
  )
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'multiple-state',
        heading_ru: 'Несколько переменных состояния',
        heading_en: 'Multiple state variables',
        text_ru: `Один компонент может иметь сколько угодно переменных состояния. Каждый вызов useState создаёт независимый кусочек state.
React сохраняет порядок вызовов хуков, поэтому их нельзя вызывать внутри условий или циклов.`,
        text_en: `A single component can have as many state variables as needed. Each useState call creates an independent piece of state.
React keeps track of the order of hook calls, so you must not call them inside conditions or loops.`,
        code: `function ShoppingCart() {
  const [items, setItems] = useState([])
  const [discount, setDiscount] = useState(0)
  const [promoCode, setPromoCode] = useState('')

  const total = items.reduce((sum, i) => sum + i.price, 0)
  const finalPrice = total * (1 - discount / 100)

  return (
    <div>
      <p>Товаров: {items.length}</p>
      <p>Итого: {finalPrice} ₽</p>
      <input
        value={promoCode}
        onChange={e => setPromoCode(e.target.value)}
        placeholder="Промокод"
      />
    </div>
  )
}`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Счётчик с кнопками + и −',
    title_en: 'Counter with + and − buttons',
    instructions_ru: `Создай счётчик с кнопками + и −:

1. Нажатие + увеличивает число на 1
2. Нажатие − уменьшает число на 1 (но не ниже 0)
3. Добавь кнопку "Сброс", которая возвращает к 0
4. Показывай разный текст: "Ноль", "Маленькое" (1-5), "Большое" (6+)`,
    instructions_en: `Build a counter with + and − buttons:

1. Pressing + increases the number by 1
2. Pressing − decreases it by 1 (but not below 0)
3. Add a "Reset" button that goes back to 0
4. Show different text: "Zero", "Small" (1-5), "Big" (6+)`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f0f4ff; }
    .counter { background: white; padding: 40px; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); text-align: center; }
    .number { font-size: 72px; font-weight: bold; color: #3B5BDB; margin: 0; }
    .label { color: #888; margin: 8px 0 24px; font-size: 18px; }
    .buttons { display: flex; gap: 12px; justify-content: center; }
    button { padding: 12px 24px; font-size: 20px; border: none; border-radius: 12px; cursor: pointer; }
    .btn-dec { background: #ffe3e3; color: #c92a2a; }
    .btn-inc { background: #d3f9d8; color: #2b8a3e; }
    .btn-reset { background: #e7f5ff; color: #1971c2; font-size: 14px; padding: 8px 16px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React

    function Counter() {
      const [count, setCount] = useState(0)

      // Добавь функции increment, decrement, reset

      return (
        <div className="counter">
          <p className="number">{count}</p>
          <p className="label">Счётчик</p>
          <div className="buttons">
            <button className="btn-dec">−</button>
            <button className="btn-reset">Сброс</button>
            <button className="btn-inc">+</button>
          </div>
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<Counter />)
  </script>
</body>
</html>`,
    },
    hints_ru: [
      'Добавь onClick к кнопкам: <button onClick={() => setCount(count + 1)}>+</button>',
      'Для ограничения снизу используй if: if (count > 0) setCount(count - 1)',
      'Для сброса: setCount(0)',
      'Для разного текста используй тернарный оператор или if внутри JSX',
    ],
    hints_en: [
      'Add onClick to buttons: <button onClick={() => setCount(count + 1)}>+</button>',
      'For the lower limit use if: if (count > 0) setCount(count - 1)',
      'For reset: setCount(0)',
      'For different text use a ternary operator or if inside JSX',
    ],
  },

  keyTerms: [
    {
      term_ru: 'State (состояние)',
      term_en: 'State',
      definition_ru: 'Внутренние данные компонента, которые могут меняться. При изменении React перерисовывает компонент.',
      definition_en: 'A component\'s internal data that can change. When it changes React re-renders the component.',
      example_ru: 'const [count, setCount] = useState(0)',
      example_en: 'const [count, setCount] = useState(0)',
    },
    {
      term_ru: 'useState',
      term_en: 'useState',
      definition_ru: 'Хук React для добавления реактивного состояния в функциональный компонент.',
      definition_en: 'A React hook for adding reactive state to a function component.',
      example_ru: 'const [isOpen, setIsOpen] = useState(false)',
      example_en: 'const [isOpen, setIsOpen] = useState(false)',
    },
    {
      term_ru: 'Setter (сеттер)',
      term_en: 'Setter',
      definition_ru: 'Функция, возвращаемая useState для обновления state. Вызов setter-а запускает перерисовку.',
      definition_en: 'The function returned by useState to update state. Calling the setter triggers a re-render.',
      example_ru: 'setCount(42)  // обновляет count до 42',
      example_en: 'setCount(42)  // updates count to 42',
    },
    {
      term_ru: 'Перерисовка (re-render)',
      term_en: 'Re-render',
      definition_ru: 'Повторное выполнение функции компонента React-ом при изменении state или props.',
      definition_en: 'React executing the component function again when state or props change.',
      example_ru: 'setCount(5) → компонент выполняется заново → DOM обновляется',
      example_en: 'setCount(5) → component runs again → DOM updates',
    },
    {
      term_ru: 'Иммутабельность',
      term_en: 'Immutability',
      definition_ru: 'Принцип: не изменять существующие данные, а создавать новые. Обязателен при работе с объектами и массивами в state.',
      definition_en: 'The principle of not modifying existing data but creating new copies. Required when working with objects and arrays in state.',
      example_ru: 'setItems([...items, newItem])',
      example_en: 'setItems([...items, newItem])',
    },
    {
      term_ru: 'Хук (Hook)',
      term_en: 'Hook',
      definition_ru: 'Специальная функция React с префиксом use, добавляющая возможности (state, effects, context) в функциональные компоненты.',
      definition_en: 'A special React function prefixed with use that adds capabilities (state, effects, context) to function components.',
      example_ru: 'useState, useEffect, useRef — всё это хуки',
      example_en: 'useState, useEffect, useRef — all are hooks',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'До появления хуков в React 16.8 (2019) состояние можно было использовать только в классовых компонентах. Хуки позволили писать всё в функциях — код стал короче и чище.',
      text_en: 'Before hooks were introduced in React 16.8 (2019), state could only be used in class components. Hooks made it possible to write everything in functions — code became shorter and cleaner.',
    },
    {
      text_ru: 'React не обновляет DOM немедленно при вызове setState. Он группирует несколько обновлений вместе (batching) и применяет их за один раз для лучшей производительности.',
      text_en: 'React does not update the DOM immediately when setState is called. It groups multiple updates together (batching) and applies them all at once for better performance.',
    },
    {
      text_ru: 'useState — это самый используемый хук в React. По статистике GitHub, он встречается в несколько раз чаще, чем любой другой хук.',
      text_en: 'useState is the most used hook in React. According to GitHub statistics, it appears several times more often than any other hook.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что возвращает хук useState?',
      text_en: 'What does the useState hook return?',
      options_ru: [
        'Массив: [текущее значение, функция обновления]',
        'Объект с полями value и setValue',
        'Только текущее значение',
        'Только функцию обновления',
      ],
      options_en: [
        'An array: [current value, updater function]',
        'An object with value and setValue fields',
        'Only the current value',
        'Only the updater function',
      ],
      correctIndex: 0,
      explanation_ru: 'useState возвращает массив из двух элементов: текущее значение и функцию для его обновления.',
      explanation_en: 'useState returns an array of two elements: the current value and a function to update it.',
    },
    {
      id: 'q2',
      text_ru: 'Почему нельзя изменить state напрямую (count++)?',
      text_en: 'Why can\'t you change state directly (count++)?',
      options_ru: [
        'React не увидит изменение и не перерисует компонент',
        'Это вызовет синтаксическую ошибку',
        'count — это константа и её нельзя изменить',
        'Это слишком медленно',
      ],
      options_en: [
        'React won\'t see the change and won\'t re-render',
        'It will cause a syntax error',
        'count is a constant and cannot be changed',
        'It is too slow',
      ],
      correctIndex: 0,
      explanation_ru: 'React отслеживает state только через setter-функцию. Прямое изменение переменной не уведомит React, и DOM останется прежним.',
      explanation_en: 'React only tracks state through the setter function. Changing the variable directly does not notify React, so the DOM stays the same.',
    },
    {
      id: 'q3',
      text_ru: 'Можно ли вызывать useState внутри условия (if)?',
      text_en: 'Can you call useState inside a condition (if)?',
      options_ru: [
        'Нет, хуки нельзя вызывать внутри условий',
        'Да, это нормальная практика',
        'Да, если значение не изменится',
        'Только если условие всегда true',
      ],
      options_en: [
        'No, hooks cannot be called inside conditions',
        'Yes, that is normal practice',
        'Yes, if the value won\'t change',
        'Only if the condition is always true',
      ],
      correctIndex: 0,
      explanation_ru: 'Правила хуков: вызывай их только на верхнем уровне компонента, не внутри условий, циклов или вложенных функций.',
      explanation_en: 'The rules of hooks: only call them at the top level of a component, not inside conditions, loops or nested functions.',
    },
    {
      id: 'q4',
      text_ru: 'Как правильно добавить элемент в массив-state?',
      text_en: 'How do you correctly add an element to an array state?',
      options_ru: [
        'setItems([...items, newItem])',
        'items.push(newItem)',
        'setItems(items.push(newItem))',
        'items[items.length] = newItem',
      ],
      options_en: [
        'setItems([...items, newItem])',
        'items.push(newItem)',
        'setItems(items.push(newItem))',
        'items[items.length] = newItem',
      ],
      correctIndex: 0,
      explanation_ru: 'Нужно создать новый массив через spread-оператор. push мутирует оригинальный массив — React не увидит изменение.',
      explanation_en: 'You must create a new array using the spread operator. push mutates the original array — React won\'t detect the change.',
    },
  ],
}
