import type { Lesson } from '@/types/lesson'

export const reactForms: Lesson = {
  slug: 'react-forms',
  category: 'REACT',
  readTime: 10,
  icon: '📝',

  title_ru: 'Формы в React',
  title_en: 'Forms in React',

  description_ru: 'Управляемые компоненты, обработка ввода, отправка форм и работа с несколькими полями.',
  description_en: 'Controlled components, handling input, form submission and working with multiple fields.',

  sections: [
    { id: 'controlled-inputs', title_ru: 'Управляемые компоненты', title_en: 'Controlled components' },
    { id: 'onchange',          title_ru: 'Обработчик onChange',     title_en: 'onChange handler' },
    { id: 'form-submit',       title_ru: 'Отправка формы',          title_en: 'Form submission' },
    { id: 'multiple-fields',   title_ru: 'Несколько полей',         title_en: 'Multiple fields' },
    { id: 'key-terms',         title_ru: 'Важные слова',            title_en: 'Key terms' },
  ],

  slides: [
    {
      id: 's1',
      type: 'title',
      title_ru: 'Формы в React — управляемые компоненты',
      title_en: 'Forms in React — controlled components',
      body_ru: 'В React формы работают иначе, чем в обычном HTML. State компонента — это единственный источник правды для значений полей.',
      body_en: 'In React forms work differently from plain HTML. The component\'s state is the single source of truth for field values.',
      visual: { kind: 'emoji', emojis: ['📝', '🔄', '✅'] },
    },
    {
      id: 's2',
      type: 'compare',
      title_ru: 'Управляемые vs Неуправляемые компоненты',
      title_en: 'Controlled vs Uncontrolled components',
      body_ru: 'Есть два подхода к работе с формами в React.',
      body_en: 'There are two approaches to forms in React.',
      compareLeft: {
        label_ru: 'Управляемые (Controlled)',
        label_en: 'Controlled',
        items_ru: [
          'Значение хранится в state',
          'onChange обновляет state',
          'React контролирует ввод',
          '✅ Рекомендуется в React',
        ],
        items_en: [
          'Value is stored in state',
          'onChange updates state',
          'React controls input',
          '✅ Recommended in React',
        ],
        color: 'green',
      },
      compareRight: {
        label_ru: 'Неуправляемые (Uncontrolled)',
        label_en: 'Uncontrolled',
        items_ru: [
          'Значение хранится в DOM',
          'Читаем через ref',
          'DOM контролирует ввод',
          '⚠️ Для редких случаев',
        ],
        items_en: [
          'Value is stored in DOM',
          'Read via ref',
          'DOM controls input',
          '⚠️ For rare cases',
        ],
        color: 'amber',
      },
    },
    {
      id: 's3',
      type: 'concept',
      title_ru: 'Принцип управляемого компонента',
      title_en: 'Controlled component principle',
      body_ru: 'В управляемом компоненте каждый нажатый клавиш: 1) запускает onChange, 2) вызывает setState, 3) компонент перерисовывается с новым значением в input.',
      body_en: 'In a controlled component each keystroke: 1) fires onChange, 2) calls setState, 3) the component re-renders with the new value in the input.',
      bullets: [
        { text_ru: 'value={name} — поле отображает state', text_en: 'value={name} — the field displays state' },
        { text_ru: 'onChange={e => setName(e.target.value)} — state обновляется при вводе', text_en: 'onChange={e => setName(e.target.value)} — state updates on input' },
        { text_ru: 'React — единственный источник правды', text_en: 'React is the single source of truth' },
      ],
    },
    {
      id: 's4',
      type: 'code',
      title_ru: 'Управляемый input',
      title_en: 'Controlled input',
      body_ru: 'Связываем input с state через value и onChange.',
      body_en: 'Connect input to state through value and onChange.',
      code: `function NameInput() {
  const [name, setName] = useState('')

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={e => setName(e.target.value)}
        placeholder="Введи имя"
      />
      <p>Привет, {name || 'незнакомец'}!</p>
      <p>Длина: {name.length} символов</p>
    </div>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's5',
      type: 'code',
      title_ru: 'Разные типы полей ввода',
      title_en: 'Different input types',
      body_ru: 'Каждый тип input управляется немного по-своему.',
      body_en: 'Each input type is controlled slightly differently.',
      code: `function Form() {
  const [text, setText] = useState('')
  const [checked, setChecked] = useState(false)
  const [selected, setSelected] = useState('js')

  return (
    <form>
      {/* Текст */}
      <input value={text} onChange={e => setText(e.target.value)} />

      {/* Чекбокс — используем checked, не value */}
      <input
        type="checkbox"
        checked={checked}
        onChange={e => setChecked(e.target.checked)}
      />

      {/* Select */}
      <select value={selected} onChange={e => setSelected(e.target.value)}>
        <option value="js">JavaScript</option>
        <option value="py">Python</option>
        <option value="go">Go</option>
      </select>
    </form>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's6',
      type: 'code',
      title_ru: 'Отправка формы — onSubmit',
      title_en: 'Form submission — onSubmit',
      body_ru: 'Для обработки отправки формы добавь onSubmit к тегу form. Не забудь e.preventDefault() чтобы предотвратить перезагрузку страницы.',
      body_en: 'To handle form submission add onSubmit to the form tag. Don\'t forget e.preventDefault() to prevent page reload.',
      code: `function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault() // предотвращаем перезагрузку
    console.log({ email, password })
    setSubmitted(true)
  }

  if (submitted) return <p>✅ Добро пожаловать, {email}!</p>

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Пароль"
      />
      <button type="submit">Войти</button>
    </form>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's7',
      type: 'concept',
      title_ru: 'Несколько полей — один объект в state',
      title_en: 'Multiple fields — one object in state',
      body_ru: 'Для форм с несколькими полями удобно хранить все значения в одном объекте state и обновлять через spread-оператор.',
      body_en: 'For forms with multiple fields it is convenient to store all values in one state object and update with the spread operator.',
      bullets: [
        { text_ru: 'const [form, setForm] = useState({ name: "", email: "" })', text_en: 'const [form, setForm] = useState({ name: "", email: "" })' },
        { text_ru: 'setForm(prev => ({ ...prev, name: "Алиса" }))', text_en: 'setForm(prev => ({ ...prev, name: "Alice" }))' },
        { text_ru: 'Меньше useState вызовов — чище код', text_en: 'Fewer useState calls — cleaner code' },
      ],
    },
    {
      id: 's8',
      type: 'code',
      title_ru: 'Форма с объектом state',
      title_en: 'Form with object state',
      body_ru: 'Один onChange-обработчик для всех полей через атрибут name.',
      body_en: 'One onChange handler for all fields via the name attribute.',
      code: `function RegistrationForm() {
  const [form, setForm] = useState({
    name: '', email: '', password: ''
  })

  // Универсальный обработчик через e.target.name
  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(\`Зарегистрирован: \${form.name}\`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="name"     value={form.name}     onChange={handleChange} placeholder="Имя" />
      <input name="email"    value={form.email}    onChange={handleChange} placeholder="Email" type="email" />
      <input name="password" value={form.password} onChange={handleChange} placeholder="Пароль" type="password" />
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}`,
      codeLang: 'javascript',
    },
    {
      id: 's9',
      type: 'tip',
      title_ru: 'Валидация формы',
      title_en: 'Form validation',
      body_ru: 'Перед отправкой проверяй данные: не пустые ли поля, правильный ли формат email. Показывай сообщения об ошибках рядом с полями.',
      body_en: 'Before submitting check the data: are fields empty, is the email format correct. Show error messages next to the fields.',
      visual: { kind: 'emoji', emojis: ['✅', '❌', '⚠️'] },
    },
    {
      id: 's10',
      type: 'practice-cta',
      title_ru: 'Практика: форма регистрации!',
      title_en: 'Practice: registration form!',
      body_ru: 'В редакторе — шаблон формы регистрации. Добавь управляемые поля и показ сообщения об успехе.',
      body_en: 'The editor has a registration form template. Add controlled fields and a success message display.',
      visual: { kind: 'emoji', emojis: ['📝', '✅', '🎉'] },
    },
  ],

  content: {
    intro_ru: `Формы — один из главных способов взаимодействия пользователя с приложением. В React рекомендуется
использовать "управляемые компоненты": значение поля хранится в state, а при каждом нажатии клавиши
state обновляется через onChange. Это даёт полный контроль над данными формы в React.`,
    intro_en: `Forms are one of the main ways users interact with an application. In React "controlled components"
are recommended: the field value is stored in state, and on each keystroke state is updated via onChange.
This gives you full control over the form data in React.`,

    blocks: [
      {
        sectionId: 'controlled-inputs',
        heading_ru: 'Управляемые компоненты',
        heading_en: 'Controlled components',
        text_ru: `В HTML поля ввода хранят своё состояние сами (в DOM). В React-подходе мы берём контроль на себя:
значение поля определяется state, а не DOM.

Это называется "управляемым компонентом" (controlled component).
Преимущество: в любой момент ты знаешь точное значение каждого поля, можешь валидировать,
форматировать и трансформировать ввод.`,
        text_en: `In HTML input fields store their own state (in the DOM). In the React approach we take control:
the field value is determined by state, not the DOM.

This is called a "controlled component".
The advantage: at any point you know the exact value of each field, and can validate,
format and transform the input.`,
      },
      {
        sectionId: 'onchange',
        heading_ru: 'Обработчик onChange',
        heading_en: 'onChange handler',
        text_ru: `onChange — событие, вызываемое при каждом изменении значения поля.
В обработчике мы получаем event объект, из которого извлекаем e.target.value — новое значение поля.

Для текстовых полей: e.target.value (строка)
Для чекбоксов: e.target.checked (булево)
Для select: e.target.value (значение выбранного option)`,
        text_en: `onChange is an event fired on every change of the field value.
In the handler we get the event object, from which we extract e.target.value — the field's new value.

For text inputs: e.target.value (string)
For checkboxes: e.target.checked (boolean)
For select: e.target.value (selected option value)`,
        code: `// Текстовое поле
<input onChange={e => setText(e.target.value)} />

// Чекбокс
<input type="checkbox" onChange={e => setChecked(e.target.checked)} />

// Textarea
<textarea onChange={e => setMessage(e.target.value)} />

// Select
<select onChange={e => setChoice(e.target.value)}>
  <option value="a">А</option>
  <option value="b">Б</option>
</select>`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'form-submit',
        heading_ru: 'Отправка формы',
        heading_en: 'Form submission',
        text_ru: `Событие submit на форме срабатывает при нажатии кнопки type="submit" или Enter в поле.
Обязательно вызови e.preventDefault() — иначе браузер перезагрузит страницу (поведение HTML по умолчанию).

После preventDefault делай всё что нужно: валидацию, запрос к API, показ сообщения.`,
        text_en: `The submit event on a form fires when a type="submit" button is clicked or Enter is pressed in a field.
Always call e.preventDefault() — otherwise the browser reloads the page (default HTML behaviour).

After preventDefault do whatever is needed: validation, API request, showing a message.`,
        code: `function ContactForm() {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    // Валидация
    if (!name.trim()) {
      setError('Введи своё имя')
      return
    }

    // Успешная отправка
    console.log('Отправлено:', { name, message })
    setSent(true)
  }

  if (sent) return <p>✅ Сообщение отправлено, {name}!</p>

  return (
    <form onSubmit={handleSubmit}>
      {error && <p style={{color:'red'}}>{error}</p>}
      <input value={name} onChange={e => setName(e.target.value)} placeholder="Имя" />
      <textarea value={message} onChange={e => setMessage(e.target.value)} placeholder="Сообщение" />
      <button type="submit">Отправить</button>
    </form>
  )
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'multiple-fields',
        heading_ru: 'Несколько полей',
        heading_en: 'Multiple fields',
        text_ru: `Для форм с несколькими полями есть два подхода:

1. Отдельный useState для каждого поля (удобно для простых форм)
2. Один объект в useState для всех полей (удобно для сложных форм)

Второй подход использует трюк с вычисляемым ключом объекта: { [name]: value }.
Это позволяет написать один универсальный обработчик onChange.`,
        text_en: `For forms with multiple fields there are two approaches:

1. A separate useState for each field (convenient for simple forms)
2. One object in useState for all fields (convenient for complex forms)

The second approach uses a computed object key trick: { [name]: value }.
This lets you write one universal onChange handler.`,
        code: `const [form, setForm] = useState({
  firstName: '', lastName: '', email: '', age: ''
})

// [e.target.name] — вычисляемый ключ
const handleChange = ({ target: { name, value } }) => {
  setForm(prev => ({ ...prev, [name]: value }))
}

// Каждый input имеет атрибут name совпадающий с ключом в form
<input name="firstName" value={form.firstName} onChange={handleChange} />
<input name="lastName"  value={form.lastName}  onChange={handleChange} />
<input name="email"     value={form.email}     onChange={handleChange} />`,
        codeLang: 'javascript',
      },
    ],
  },

  editorTask: {
    title_ru: 'Форма регистрации',
    title_en: 'Registration form',
    instructions_ru: `Создай форму регистрации с полями: Имя, Email, Пароль.

1. Поля должны быть управляемыми (value + onChange)
2. При нажатии "Зарегистрироваться" проверяй:
   - Имя не пустое
   - Email содержит @
   - Пароль не менее 6 символов
3. Показывай сообщения об ошибках под полями
4. При успешной отправке — показывай "✅ Добро пожаловать, [Имя]!"`,
    instructions_en: `Create a registration form with fields: Name, Email, Password.

1. Fields must be controlled (value + onChange)
2. On clicking "Register" check:
   - Name is not empty
   - Email contains @
   - Password is at least 6 characters
3. Show error messages under the fields
4. On successful submit — show "✅ Welcome, [Name]!"`,
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html>
<head>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <style>
    * { box-sizing: border-box; }
    body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; margin: 0; background: #f0f4ff; }
    .form-card { background: white; padding: 36px; border-radius: 20px; box-shadow: 0 4px 24px rgba(0,0,0,0.1); width: 100%; max-width: 400px; }
    h2 { margin: 0 0 24px; color: #212529; }
    .field { margin-bottom: 16px; }
    label { display: block; font-size: 13px; color: #495057; margin-bottom: 6px; font-weight: 500; }
    input { width: 100%; padding: 10px 14px; border: 2px solid #dee2e6; border-radius: 10px; font-size: 15px; outline: none; }
    input:focus { border-color: #4c6ef5; }
    .error { color: #f03e3e; font-size: 12px; margin-top: 4px; }
    button { width: 100%; padding: 12px; background: #4c6ef5; color: white; border: none; border-radius: 12px; font-size: 16px; cursor: pointer; font-weight: 600; margin-top: 8px; }
    button:hover { background: #3b5bdb; }
    .success { text-align: center; font-size: 20px; color: #2f9e44; }
  </style>
</head>
<body>
  <div id="root"></div>
  <script type="text/babel">
    const { useState } = React

    function RegistrationForm() {
      const [name, setName] = useState('')
      const [email, setEmail] = useState('')
      const [password, setPassword] = useState('')
      const [submitted, setSubmitted] = useState(false)
      // Добавь state для ошибок

      const handleSubmit = (e) => {
        e.preventDefault()
        // Добавь валидацию
        setSubmitted(true)
      }

      if (submitted) {
        return <div className="form-card success"><p>✅ Добро пожаловать, {name}!</p></div>
      }

      return (
        <div className="form-card">
          <h2>📝 Регистрация</h2>
          <form onSubmit={handleSubmit}>
            <div className="field">
              <label>Имя</label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Введи имя"
              />
            </div>
            <div className="field">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="example@mail.com"
              />
            </div>
            <div className="field">
              <label>Пароль</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Минимум 6 символов"
              />
            </div>
            <button type="submit">Зарегистрироваться</button>
          </form>
        </div>
      )
    }

    ReactDOM.createRoot(document.getElementById('root')).render(<RegistrationForm />)
  </script>
</body>
</html>`,
    },
    hints_ru: [
      'Для ошибок: const [errors, setErrors] = useState({})',
      'Валидация: if (!name.trim()) newErrors.name = "Введи имя"',
      'Показ ошибки: {errors.name && <p className="error">{errors.name}</p>}',
      'Проверка email: !email.includes("@")',
      'Проверка пароля: password.length < 6',
    ],
    hints_en: [
      'For errors: const [errors, setErrors] = useState({})',
      'Validation: if (!name.trim()) newErrors.name = "Enter your name"',
      'Show error: {errors.name && <p className="error">{errors.name}</p>}',
      'Email check: !email.includes("@")',
      'Password check: password.length < 6',
    ],
  },

  keyTerms: [
    {
      term_ru: 'Управляемый компонент',
      term_en: 'Controlled component',
      definition_ru: 'Компонент формы, значение которого управляется React state, а не DOM.',
      definition_en: 'A form component whose value is controlled by React state, not the DOM.',
      example_ru: '<input value={name} onChange={e => setName(e.target.value)} />',
      example_en: '<input value={name} onChange={e => setName(e.target.value)} />',
    },
    {
      term_ru: 'onChange',
      term_en: 'onChange',
      definition_ru: 'Обработчик события React, вызываемый при каждом изменении значения поля ввода.',
      definition_en: 'A React event handler called every time the value of an input field changes.',
      example_ru: 'onChange={e => setValue(e.target.value)}',
      example_en: 'onChange={e => setValue(e.target.value)}',
    },
    {
      term_ru: 'onSubmit',
      term_en: 'onSubmit',
      definition_ru: 'Обработчик события формы, вызываемый при её отправке (нажатие submit-кнопки или Enter).',
      definition_en: 'A form event handler called when it is submitted (submit button click or Enter key).',
      example_ru: '<form onSubmit={handleSubmit}>',
      example_en: '<form onSubmit={handleSubmit}>',
    },
    {
      term_ru: 'e.preventDefault()',
      term_en: 'e.preventDefault()',
      definition_ru: 'Метод объекта события, отменяющий стандартное поведение браузера (например, перезагрузку страницы при отправке формы).',
      definition_en: 'An event object method that cancels the browser\'s default behaviour (e.g. page reload on form submit).',
      example_ru: 'const handle = (e) => { e.preventDefault(); ... }',
      example_en: 'const handle = (e) => { e.preventDefault(); ... }',
    },
    {
      term_ru: 'e.target.value',
      term_en: 'e.target.value',
      definition_ru: 'Текущее значение поля ввода, доступное в обработчике события через объект event.',
      definition_en: 'The current value of the input field, accessible in the event handler via the event object.',
      example_ru: 'onChange={e => setName(e.target.value)}',
      example_en: 'onChange={e => setName(e.target.value)}',
    },
    {
      term_ru: 'Валидация',
      term_en: 'Validation',
      definition_ru: 'Проверка правильности данных формы перед отправкой. Обычно показывает сообщения об ошибках рядом с полями.',
      definition_en: 'Checking the correctness of form data before submission. Usually shows error messages next to fields.',
      example_ru: 'if (!email.includes("@")) setError("Неверный email")',
      example_en: 'if (!email.includes("@")) setError("Invalid email")',
    },
  ],

  didYouKnow: [
    {
      text_ru: 'В больших проектах для работы с формами используют специальные библиотеки: React Hook Form, Formik или Zod. Они упрощают валидацию, управление ошибками и отслеживание "грязных" полей.',
      text_en: 'In large projects dedicated libraries are used for forms: React Hook Form, Formik or Zod. They simplify validation, error management and tracking "dirty" fields.',
    },
    {
      text_ru: 'HTML5 даёт браузерам встроенную валидацию (required, minlength, pattern). В React-формах это часто отключают через noValidate на форме, чтобы самостоятельно контролировать UX ошибок.',
      text_en: 'HTML5 gives browsers built-in validation (required, minlength, pattern). In React forms this is often disabled via noValidate on the form, to control the error UX manually.',
    },
    {
      text_ru: 'Паттерн "один обработчик для всех полей" через e.target.name — это классический React-паттерн. Он особенно полезен в формах с 5+ полями, сокращая дублирование кода.',
      text_en: 'The "one handler for all fields" pattern via e.target.name is a classic React pattern. It is especially useful in forms with 5+ fields, reducing code duplication.',
    },
  ],

  quiz: [
    {
      id: 'q1',
      text_ru: 'Что такое управляемый компонент формы?',
      text_en: 'What is a controlled form component?',
      options_ru: [
        'Компонент, значение которого управляется React state',
        'Компонент с жёстко заданным значением',
        'Компонент, который нельзя изменить',
        'Любой HTML-элемент формы',
      ],
      options_en: [
        'A component whose value is controlled by React state',
        'A component with a hardcoded value',
        'A component that cannot be changed',
        'Any HTML form element',
      ],
      correctIndex: 0,
      explanation_ru: 'Управляемый компонент: value берётся из state, onChange обновляет state. React — единственный источник правды.',
      explanation_en: 'Controlled component: value comes from state, onChange updates state. React is the single source of truth.',
    },
    {
      id: 'q2',
      text_ru: 'Зачем вызывать e.preventDefault() в обработчике onSubmit?',
      text_en: 'Why call e.preventDefault() in the onSubmit handler?',
      options_ru: [
        'Чтобы предотвратить перезагрузку страницы браузером',
        'Чтобы сбросить значения полей',
        'Чтобы остановить выполнение React',
        'Чтобы отменить onChange события',
      ],
      options_en: [
        'To prevent the browser from reloading the page',
        'To reset the field values',
        'To stop React execution',
        'To cancel onChange events',
      ],
      correctIndex: 0,
      explanation_ru: 'По умолчанию отправка HTML-формы перезагружает страницу. e.preventDefault() отменяет это, позволяя React обработать данные.',
      explanation_en: 'By default submitting an HTML form reloads the page. e.preventDefault() cancels this, letting React handle the data.',
    },
    {
      id: 'q3',
      text_ru: 'Как получить значение checkbox в React?',
      text_en: 'How do you get the value of a checkbox in React?',
      options_ru: [
        'e.target.checked',
        'e.target.value',
        'e.target.selected',
        'e.target.boolean',
      ],
      options_en: [
        'e.target.checked',
        'e.target.value',
        'e.target.selected',
        'e.target.boolean',
      ],
      correctIndex: 0,
      explanation_ru: 'Для checkbox используй e.target.checked (булево). e.target.value у чекбокса всегда "on" независимо от состояния.',
      explanation_en: 'For checkboxes use e.target.checked (boolean). e.target.value for a checkbox is always "on" regardless of state.',
    },
    {
      id: 'q4',
      text_ru: 'Как правильно обновить одно поле объекта-состояния формы?',
      text_en: 'How do you correctly update one field of an object form state?',
      options_ru: [
        'setForm(prev => ({ ...prev, name: "Алиса" }))',
        'form.name = "Алиса"',
        'setForm({ name: "Алиса" })',
        'setForm.name("Алиса")',
      ],
      options_en: [
        'setForm(prev => ({ ...prev, name: "Alice" }))',
        'form.name = "Alice"',
        'setForm({ name: "Alice" })',
        'setForm.name("Alice")',
      ],
      correctIndex: 0,
      explanation_ru: 'Нужно сохранить остальные поля через спред ...prev и обновить только нужное. setForm({ name: "Алиса" }) удалит остальные поля.',
      explanation_en: 'You must preserve the other fields via spread ...prev and update only the target field. setForm({ name: "Alice" }) would delete the other fields.',
    },
  ],
}
