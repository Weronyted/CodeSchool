import type { Lesson } from '@/types/lesson'

export const reactProps: Lesson = {
  slug: 'react-props',
  category: 'REACT',
  readTime: 10,
  icon: '🎁',

  title_ru: 'Props — передача данных',
  title_en: 'Props — passing data',

  description_ru: 'Как передавать данные в компоненты через props и делать их переиспользуемыми.',
  description_en: 'How to pass data into components via props and make them reusable.',

  sections: [
    { id: 'what-props',    title_ru: 'Что такое props',         title_en: 'What are props' },
    { id: 'passing-props', title_ru: 'Передача props',          title_en: 'Passing props' },
    { id: 'prop-types',    title_ru: 'Типы props',              title_en: 'Prop types' },
    { id: 'children',      title_ru: 'Проп children',           title_en: 'The children prop' },
    { id: 'key-terms',     title_ru: 'Важные слова',            title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Props — параметры компонента',
      title_en: 'Props — component parameters',
      body_ru: 'Props (от "properties") — это способ передавать данные в компонент снаружи. Они делают компоненты гибкими и переиспользуемыми.',
      body_en: 'Props (short for "properties") are the way to pass data into a component from the outside. They make components flexible and reusable.',
      visual: { kind: 'emoji', emojis: ['🎁', '📦', '🧩'] },
    },
    {
      id: 's2',
      type: 'analogy',
      title_ru: 'Аналогия: props как аргументы функции',
      title_en: 'Analogy: props as function arguments',
      body_ru: 'Компонент — это функция. Props — это её аргументы. Точно так же как Math.max(3, 7) получает числа, компонент Button получает label и onClick через props.',
      body_en: 'A component is a function. Props are its arguments. Just like Math.max(3, 7) receives numbers, a Button component receives label and onClick through props.',
      visual: { kind: 'emoji', emojis: ['🧮', '→', '🎯'] },
      bullets: [
        { text_ru: 'Math.max(3, 7) → аргументы: 3 и 7', text_en: 'Math.max(3, 7) → arguments: 3 and 7' },
        { text_ru: '<Button label="Войти" /> → prop: label="Войти"', text_en: '<Button label="Login" /> → prop: label="Login"' },
        { text_ru: 'Без аргументов функция не гибкая — то же с компонентом', text_en: 'Without arguments a function is not flexible — same with a component' },
      ],
    },
    {
      id: 's3',
      type: 'code',
      title_ru: 'Передача props в JSX',
      title_en: 'Passing props in JSX',
      body_ru: 'Props передаются как HTML-атрибуты. Строки — в кавычках, числа и выражения — в фигурных скобках.',
      body_en: 'Props are passed like HTML attributes. Strings go in quotes, numbers and expressions go in curly braces.',
      code: `// Определяем компонент с props
function UserCard({ name, age, role }) {
  return (
    <div className="card">
      <h2>{name}</h2>
      <p>Возраст: {age}</p>
      <p>Роль: {role}</p>
    </div>
  )
}

// Передаём props при использовании
function App() {
  return (
    <div>
      <UserCard name="Алиса" age={17} role="Студент" />
      <UserCard name="Боб"   age={25} role="Разработчик" />
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's4',
      type: 'concept',
      title_ru: 'Props — только для чтения',
      title_en: 'Props are read-only',
      body_ru: 'Компонент не должен изменять свои props. Данные текут только в одну сторону — от родителя к ребёнку. Это называется "однонаправленный поток данных".',
      body_en: 'A component must never modify its own props. Data flows only one way — from parent to child. This is called "one-way data flow".',
      bullets: [
        { text_ru: '❌ props.name = "Новое" — нельзя!', text_en: '❌ props.name = "New" — not allowed!' },
        { text_ru: '✅ Читать props — можно: {props.name}', text_en: '✅ Reading props is fine: {props.name}' },
        { text_ru: '✅ Для изменяемых данных — используй state', text_en: '✅ For mutable data — use state' },
      ],
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Деструктуризация props',
      title_en: 'Destructuring props',
      body_ru: 'Принято деструктурировать props прямо в параметрах функции — это делает код чище.',
      body_en: 'It is common practice to destructure props right in the function parameters — this makes the code cleaner.',
      code: `// Без деструктуризации — многословно
function Greeting(props) {
  return <h1>Привет, {props.name}! Тебе {props.age} лет.</h1>
}

// С деструктуризацией — чисто и кратко
function Greeting({ name, age }) {
  return <h1>Привет, {name}! Тебе {age} лет.</h1>
}

// Значения по умолчанию
function Button({ label = 'Нажми меня', color = 'blue' }) {
  return <button style={{ background: color }}>{label}</button>
}`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'concept',
      title_ru: 'Значения по умолчанию (default props)',
      title_en: 'Default prop values',
      body_ru: 'Если prop не передан, компонент может использовать значение по умолчанию. Это задаётся прямо в деструктуризации.',
      body_en: 'If a prop is not passed, the component can use a default value. This is set right in the destructuring.',
      bullets: [
        { text_ru: 'function Btn({ label = "OK" }) — если label не передан, будет "OK"', text_en: 'function Btn({ label = "OK" }) — if label is not passed, it will be "OK"' },
        { text_ru: 'Помогает избежать ошибок при пустых значениях', text_en: 'Helps avoid errors with missing values' },
        { text_ru: 'Компонент становится надёжнее', text_en: 'Makes the component more robust' },
      ],
    },
    {
      id: 's7',
      type: 'code',
      title_ru: 'Проп children — вложенный контент',
      title_en: 'The children prop — nested content',
      body_ru: 'Специальный проп children содержит всё, что ты поместил между открывающим и закрывающим тегами компонента.',
      body_en: 'The special children prop contains everything you put between the opening and closing tags of a component.',
      code: `// Card принимает любой контент внутрь
function Card({ title, children }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="content">
        {children}
      </div>
    </div>
  )
}

// Используем с разным содержимым
function App() {
  return (
    <div>
      <Card title="Профиль">
        <p>Имя: Алиса</p>
        <img src="photo.jpg" alt="фото" />
      </Card>
      <Card title="Статистика">
        <p>Уроков пройдено: 12</p>
      </Card>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's8',
      type: 'compare',
      title_ru: 'Props vs State',
      title_en: 'Props vs State',
      body_ru: 'Важно понимать разницу между props и state.',
      body_en: 'It is important to understand the difference between props and state.',
      compareLeft: {
        label_ru: 'Props',
        label_en: 'Props',
        items_ru: [
          'Приходят снаружи (от родителя)',
          'Только для чтения',
          'Заданы при использовании компонента',
          'Делают компонент настраиваемым',
        ],
        items_en: [
          'Come from outside (from parent)',
          'Read-only',
          'Set when using the component',
          'Make the component configurable',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'State',
        label_en: 'State',
        items_ru: [
          'Хранится внутри компонента',
          'Можно изменять',
          'Меняется со временем',
          'Вызывает перерисовку',
        ],
        items_en: [
          'Lives inside the component',
          'Can be changed',
          'Changes over time',
          'Triggers re-render',
        ],
        color: 'green',
      },
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Спред-оператор для props',
      title_en: 'Spread operator for props',
      body_ru: 'Если у тебя есть объект с данными, можно передать все его свойства как props сразу через спред-оператор {...obj}.',
      body_en: 'If you have an object with data, you can pass all its properties as props at once using the spread operator {...obj}.',
      visual: { kind: 'emoji', emojis: ['📦', '→', '🎯'] },
    },
    {
      id: 's10',
      type: 'practice-cta',
      title_ru: 'Практика: компонент UserCard с props!',
      title_en: 'Practice: UserCard component with props!',
      body_ru: 'В редакторе ниже — компонент UserCard. Измени значения props и добавь новые поля.',
      body_en: 'The editor below has a UserCard component. Change the prop values and add new fields.',
      visual: { kind: 'emoji', emojis: ['✍️', '🎁', '🎉'] },
    },
  ],

  content: {
    intro_ru: `Props — это механизм передачи данных в React-компоненты. Они работают как аргументы функции:
ты передаёшь данные снаружи, а компонент их использует для отображения. Props делают компоненты
переиспользуемыми — один и тот же Button может показывать "Войти", "Зарегистрироваться" или "Выйти"
в зависимости от переданного label.`,
    intro_en: `Props are the mechanism for passing data into React components. They work like function arguments:
you pass data from outside, and the component uses it for display. Props make components reusable —
the same Button can show "Login", "Register" or "Logout" depending on the label passed to it.`,

    blocks: [
      {
        sectionId: 'what-props',
        heading_ru: 'Что такое props',
        heading_en: 'What are props',
        text_ru: `Props (свойства) — это данные, которые родительский компонент передаёт дочернему.
Представь, что у тебя есть компонент Кнопка. Без props у неё всегда один и тот же текст.
С props ты можешь передать любой текст, цвет, обработчик клика — и получить настраиваемую кнопку.

Props — это объект. React собирает все атрибуты JSX-тега в один объект и передаёт его компоненту.`,
        text_en: `Props (properties) are data that a parent component passes to a child.
Imagine you have a Button component. Without props it always has the same text.
With props you can pass any text, colour, click handler — and get a configurable button.

Props are an object. React collects all JSX tag attributes into one object and passes it to the component.`,
      },
      {
        sectionId: 'passing-props',
        heading_ru: 'Передача props',
        heading_en: 'Passing props',
        text_ru: `Props передаются как атрибуты в JSX. Строковые значения — в кавычках, все остальные — в фигурных скобках.
Внутри компонента props принимаются как параметр функции (обычно деструктурированный).`,
        text_en: `Props are passed as attributes in JSX. String values go in quotes, everything else in curly braces.
Inside the component props are received as a function parameter (usually destructured).`,
        code: `// Строки — в кавычках
<Avatar name="Алиса" role="admin" />

// Числа и выражения — в скобках
<Avatar age={17} score={100 * 2} />

// Булев prop (true можно не писать)
<Avatar verified />          // то же, что verified={true}
<Avatar verified={false} />  // явно false`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'prop-types',
        heading_ru: 'Типы значений props',
        heading_en: 'Types of prop values',
        text_ru: `Через props можно передавать любые значения JavaScript: строки, числа, булевы, массивы, объекты и даже функции.
Передача функции через props — это способ дать дочернему компоненту возможность "сообщать" родителю о событиях.`,
        text_en: `You can pass any JavaScript value as a prop: strings, numbers, booleans, arrays, objects and even functions.
Passing a function as a prop is how a child component can "communicate back" to the parent about events.`,
        code: `function ProductCard({ name, price, tags, onBuy }) {
  return (
    <div>
      <h3>{name}</h3>
      <p>{price} ₽</p>
      <ul>{tags.map(t => <li key={t}>{t}</li>)}</ul>
      <button onClick={onBuy}>Купить</button>
    </div>
  )
}

// Передаём разные типы
<ProductCard
  name="Курс React"
  price={2990}
  tags={['frontend', 'javascript']}
  onBuy={() => alert('Куплено!')}
/>`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'children',
        heading_ru: 'Проп children',
        heading_en: 'The children prop',
        text_ru: `children — специальный встроенный проп, который содержит JSX-содержимое между открывающим и закрывающим тегами компонента.
Это позволяет создавать компоненты-обёртки (layout components): Modal, Card, Section и т.д.`,
        text_en: `children is a special built-in prop that holds the JSX content between a component's opening and closing tags.
This lets you create wrapper (layout) components: Modal, Card, Section, etc.`,
        code: `function Modal({ title, children, onClose }) {
  return (
    <div className="modal-backdrop">
      <div className="modal">
        <div className="modal-header">
          <h2>{title}</h2>
          <button onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  )
}

// Любой JSX внутри становится children
<Modal title="Подтверждение" onClose={handleClose}>
  <p>Ты уверен, что хочешь удалить этот элемент?</p>
  <button>Да, удалить</button>
</Modal>`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Карточка пользователя с props',
    title_en: 'User card with props',
    instructions_ru: `Компонент UserCard уже написан. Он принимает три пропа: name, age, role.

Твои задачи:
1. Измени значения name, age, role на свои данные
2. Добавь четвёртый проп — city (город) и покажи его в карточке
3. Добавь второй компонент <UserCard /> с другими данными`,
    instructions_en: `The UserCard component is already written. It accepts three props: name, age, role.

Your tasks:
1. Change the name, age, role values to your own data
2. Add a fourth prop — city — and display it in the card
3. Add a second <UserCard /> with different data`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    body { font-family: sans-serif; display: flex; gap: 20px; justify-content: center; padding: 40px; background: #f0f4ff; flex-wrap: wrap; }
    .card { background: white; padding: 24px 32px; border-radius: 16px; box-shadow: 0 4px 20px rgba(0,0,0,0.1); min-width: 200px; }
    .card h2 { color: #3B5BDB; margin: 0 0 8px; }
    .card p { color: #555; margin: 4px 0; }
    .badge { display: inline-block; background: #e7f5ff; color: #1971c2; padding: 2px 10px; border-radius: 20px; font-size: 13px; margin-top: 8px; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    function UserCard({ name, age, role }) {
      return (
        <div className="card">
          <h2>👤 {name}</h2>
          <p>Возраст: {age}</p>
          <span className="badge">{role}</span>
        </div>
      )
    }

    function App() {
      return (
        <div>
          <UserCard name="Алиса" age={17} role="Студент" />
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<App />)
  </script>
</body>
</html>`,
    },
    hints_ru: [
      'Добавь city в деструктуризацию: function UserCard({ name, age, role, city })',
      'Добавь <p>{city}</p> внутри JSX компонента',
      'Скопируй тег <UserCard /> и измени значения пропов',
    ],
    hints_en: [
      'Add city to destructuring: function UserCard({ name, age, role, city })',
      'Add <p>{city}</p> inside the component JSX',
      'Copy the <UserCard /> tag and change the prop values',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Props',
      term_en: 'Props',
      definition_ru: 'Данные, передаваемые в компонент снаружи (от родителя). Доступны только для чтения.',
      definition_en: 'Data passed into a component from the outside (from the parent). Read-only.',
      example_ru: '<Button label="Войти" />',
      example_en: '<Button label="Login" />',
    },
    {
      term_ru: 'Деструктуризация',
      term_en: 'Destructuring',
      definition_ru: 'JavaScript-синтаксис для извлечения значений из объекта в отдельные переменные.',
      definition_en: 'JavaScript syntax for extracting values from an object into separate variables.',
      example_ru: 'function Card({ name, age }) { ... }',
      example_en: 'function Card({ name, age }) { ... }',
    },
    {
      term_ru: 'children',
      term_en: 'children',
      definition_ru: 'Специальный проп, содержащий JSX-содержимое между открывающим и закрывающим тегами компонента.',
      definition_en: 'A special prop containing the JSX content between a component\'s opening and closing tags.',
      example_ru: '<Card><p>Текст</p></Card>',
      example_en: '<Card><p>Text</p></Card>',
    },
    {
      term_ru: 'Однонаправленный поток данных',
      term_en: 'One-way data flow',
      definition_ru: 'Принцип React: данные передаются только от родительского компонента к дочернему, никогда наоборот.',
      definition_en: 'React\'s principle: data flows only from parent to child, never the other way.',
      example_ru: 'App → Header → Logo (данные идут вниз)',
      example_en: 'App → Header → Logo (data flows down)',
    },
    {
      term_ru: 'Значение по умолчанию',
      term_en: 'Default value',
      definition_ru: 'Значение prop, используемое когда он не был передан. Задаётся через деструктуризацию.',
      definition_en: 'The value of a prop used when it was not passed. Set through destructuring.',
      example_ru: 'function Btn({ label = "OK" }) { ... }',
      example_en: 'function Btn({ label = "OK" }) { ... }',
    },
    {
      term_ru: 'Переиспользование компонентов',
      term_en: 'Component reuse',
      definition_ru: 'Возможность использовать один компонент много раз с разными props — главное преимущество React.',
      definition_en: 'The ability to use one component many times with different props — the main advantage of React.',
      example_ru: '<Card user={alice} /> <Card user={bob} />',
      example_en: '<Card user={alice} /> <Card user={bob} />',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В ранних версиях React для типизации props использовали библиотеку PropTypes. Сейчас в TypeScript-проектах типы задаются через интерфейсы: interface Props { name: string }.',
      text_en: 'In early React versions the PropTypes library was used to type-check props. In TypeScript projects today types are defined with interfaces: interface Props { name: string }.',
    },
    {
      text_ru: 'Принцип однонаправленного потока данных (props вниз, события вверх) — одна из причин, почему React-приложения проще отлаживать. Ты всегда знаешь, откуда пришли данные.',
      text_en: 'The one-way data flow principle (props down, events up) is one of the reasons React applications are easier to debug. You always know where the data came from.',
    },
    {
      text_ru: 'Спред-оператор позволяет передать все свойства объекта как props: если user = {name:"Алиса", age:17}, то <UserCard {...user} /> эквивалентно <UserCard name="Алиса" age={17} />.',
      text_en: 'The spread operator lets you pass all object properties as props: if user = {name:"Alice", age:17}, then <UserCard {...user} /> is equivalent to <UserCard name="Alice" age={17} />.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что такое props в React?',
      text_en: 'What are props in React?',
      options_ru: [
        'Данные, передаваемые в компонент снаружи',
        'Внутреннее состояние компонента',
        'CSS-стили компонента',
        'Методы компонента',
      ],
      options_en: [
        'Data passed into a component from outside',
        'The internal state of the component',
        'CSS styles of the component',
        'Methods of the component',
      ],
      correctIndex: 0,
      explanation_ru: 'Props — это данные, которые родитель передаёт дочернему компоненту, как аргументы функции.',
      explanation_en: 'Props are data that a parent passes to a child component, like function arguments.',
    },
    {
      id: 'q2',
      text_ru: 'Можно ли изменять props внутри компонента?',
      text_en: 'Can you modify props inside a component?',
      options_ru: [
        'Нет, props только для чтения',
        'Да, можно изменять напрямую',
        'Да, через setState',
        'Только числовые props',
      ],
      options_en: [
        'No, props are read-only',
        'Yes, you can modify them directly',
        'Yes, via setState',
        'Only numeric props',
      ],
      correctIndex: 0,
      explanation_ru: 'Props доступны только для чтения. Для изменяемых данных используй state.',
      explanation_en: 'Props are read-only. Use state for mutable data.',
    },
    {
      id: 'q3',
      text_ru: 'Что содержит специальный проп children?',
      text_en: 'What does the special children prop contain?',
      options_ru: [
        'JSX-содержимое между тегами компонента',
        'Список дочерних компонентов из файла',
        'Данные из базы данных',
        'CSS-классы компонента',
      ],
      options_en: [
        'The JSX content between the component\'s tags',
        'A list of child components from a file',
        'Data from a database',
        'CSS classes of the component',
      ],
      correctIndex: 0,
      explanation_ru: 'children — это всё, что ты помещаешь между открывающим и закрывающим тегами компонента.',
      explanation_en: 'children is everything you place between the component\'s opening and closing tags.',
    },
    {
      id: 'q4',
      text_ru: 'Как задать значение по умолчанию для пропа label?',
      text_en: 'How do you set a default value for the label prop?',
      options_ru: [
        'function Btn({ label = "OK" }) { }',
        'function Btn(label = "OK") { }',
        'Btn.defaultProps.label = "OK"',
        'props.label.default = "OK"',
      ],
      options_en: [
        'function Btn({ label = "OK" }) { }',
        'function Btn(label = "OK") { }',
        'Btn.defaultProps.label = "OK"',
        'props.label.default = "OK"',
      ],
      correctIndex: 0,
      explanation_ru: 'Значения по умолчанию задаются в деструктуризации параметров функции-компонента.',
      explanation_en: 'Default values are set in the destructuring of the component function\'s parameters.',
    },
  ],
}
