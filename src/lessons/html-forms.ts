import type { Lesson } from '@/types/lesson'

export const htmlForms: Lesson = {
  slug: 'html-forms',
  category: 'HTML',
  readTime: 12,
  icon: '📬',
  title_ru: 'Формы в HTML',
  title_en: 'HTML Forms',
  description_ru: 'Научитесь создавать интерактивные формы: текстовые поля, кнопки, чекбоксы, выпадающие списки. Разберитесь в методах GET и POST.',
  description_en: 'Learn to create interactive forms: text fields, buttons, checkboxes, dropdowns. Understand GET and POST methods.',
  sections: [
    { id: 'intro', title_ru: 'Что такое HTML-форма', title_en: 'What Is an HTML Form' },
    { id: 'inputs', title_ru: 'Типы полей ввода', title_en: 'Input Types' },
    { id: 'labels', title_ru: 'Подписи и доступность', title_en: 'Labels and Accessibility' },
    { id: 'select-textarea', title_ru: 'Select и Textarea', title_en: 'Select and Textarea' },
    { id: 'get-post', title_ru: 'Методы GET и POST', title_en: 'GET and POST Methods' },
  ],
  slides: [
    {
      id: 'slide-title',
      type: 'title',
      title_ru: 'Формы в HTML',
      title_en: 'HTML Forms',
      body_ru: 'Формы — главный способ получить данные от пользователя. Регистрация, поиск, заказ — всё это HTML-формы.',
      body_en: 'Forms are the primary way to collect data from users. Registration, search, checkout — all of these are HTML forms.',
    },
    {
      id: 'slide-analogy',
      type: 'analogy',
      title_ru: 'Форма как бланк в банке',
      title_en: 'A Form Like a Bank Application',
      body_ru: 'HTML-форма — это как бумажный бланк в банке. У каждого поля есть подпись (label), место для заполнения (input) и способ передачи данных (action + method).',
      body_en: 'An HTML form is like a paper form at a bank. Each field has a label, a place to fill in (input), and a way to submit the data (action + method).',
      visual: {
        kind: 'emoji',
        emojis: ['📄', '✏️', '📮'],
        caption_ru: 'Бланк → заполнение → отправка',
        caption_en: 'Form → fill → submit',
      },
      bullets: [
        { text_ru: 'action — куда отправятся данные (URL сервера)', text_en: 'action — where the data goes (server URL)' },
        { text_ru: 'method — как отправятся данные (GET или POST)', text_en: 'method — how the data is sent (GET or POST)' },
        { text_ru: '<input> — поле для ввода любого типа данных', text_en: '<input> — a field for entering any type of data' },
        { text_ru: '<label> — подпись к полю для доступности', text_en: '<label> — a field caption for accessibility' },
      ],
    },
    {
      id: 'slide-concept-inputs',
      type: 'concept',
      title_ru: 'Типы <input>',
      title_en: 'Input Types',
      body_ru: 'Атрибут type определяет поведение и внешний вид поля ввода. Браузер автоматически валидирует данные в зависимости от типа.',
      body_en: 'The type attribute determines the behavior and appearance of the input field. The browser automatically validates data depending on the type.',
      code: `<input type="text"     placeholder="Имя">
<input type="email"    placeholder="Email">
<input type="password" placeholder="Пароль">
<input type="number"   min="0" max="100">
<input type="date">
<input type="checkbox" id="agree">
<input type="radio"    name="gender" value="male">
<input type="submit"   value="Отправить">`,
      codeLang: 'html',
    },
    {
      id: 'slide-anim',
      type: 'code-anim',
      title_ru: 'Строим форму входа шаг за шагом',
      title_en: 'Building a Login Form Step by Step',
      body_ru: 'Посмотрите, как пустая форма постепенно превращается в готовую форму входа.',
      body_en: 'Watch how an empty form gradually becomes a complete login form.',
      animMode: 'preview',
      animSteps: [
        {
          code: `<form action="/login" method="post">
</form>`,
          comment_ru: 'Начинаем с тега form — контейнера для всех полей',
          comment_en: 'Start with the form tag — the container for all fields',
          preview: '<form style="font-family:sans-serif;max-width:300px;padding:16px;border:1px dashed #ccc;border-radius:8px"><p style="color:#999;font-size:13px;margin:0">Форма пока пуста...</p></form>',
        },
        {
          code: `<form action="/login" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email"
    placeholder="user@example.com">
</form>`,
          comment_ru: 'Добавляем поле email с подписью label',
          comment_en: 'Add the email field with a label',
          preview: '<form style="font-family:sans-serif;max-width:300px;padding:16px;border:1px solid #ddd;border-radius:8px"><label style="display:block;margin-bottom:4px;font-size:14px;font-weight:600" for="email">Email</label><input type="email" placeholder="user@example.com" style="width:100%;padding:8px;border:1px solid #ccc;border-radius:4px;box-sizing:border-box;font-size:14px"></form>',
        },
        {
          code: `<form action="/login" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email"
    placeholder="user@example.com">

  <label for="password">Пароль</label>
  <input type="password" id="password" name="password"
    placeholder="Минимум 8 символов">
</form>`,
          comment_ru: 'Добавляем поле пароля',
          comment_en: 'Add the password field',
          preview: '<form style="font-family:sans-serif;max-width:300px;padding:16px;border:1px solid #ddd;border-radius:8px;display:flex;flex-direction:column;gap:8px"><label style="font-size:14px;font-weight:600">Email</label><input type="email" placeholder="user@example.com" style="padding:8px;border:1px solid #ccc;border-radius:4px;font-size:14px"><label style="font-size:14px;font-weight:600">Пароль</label><input type="password" placeholder="Минимум 8 символов" style="padding:8px;border:1px solid #ccc;border-radius:4px;font-size:14px"></form>',
        },
        {
          code: `<form action="/login" method="post">
  <label for="email">Email</label>
  <input type="email" id="email" name="email"
    placeholder="user@example.com" required>

  <label for="password">Пароль</label>
  <input type="password" id="password" name="password"
    placeholder="Минимум 8 символов" required>

  <button type="submit">Войти</button>
</form>`,
          comment_ru: 'Добавляем атрибут required и кнопку отправки',
          comment_en: 'Add the required attribute and a submit button',
          preview: '<form style="font-family:sans-serif;max-width:300px;padding:16px;border:1px solid #ddd;border-radius:8px;display:flex;flex-direction:column;gap:8px"><label style="font-size:14px;font-weight:600">Email</label><input type="email" placeholder="user@example.com" style="padding:8px;border:1px solid #ccc;border-radius:4px;font-size:14px"><label style="font-size:14px;font-weight:600">Пароль</label><input type="password" placeholder="Минимум 8 символов" style="padding:8px;border:1px solid #ccc;border-radius:4px;font-size:14px"><button type="submit" style="padding:10px;background:#2563eb;color:white;border:none;border-radius:4px;font-size:14px;cursor:pointer;font-weight:600">Войти</button></form>',
        },
      ],
    },
    {
      id: 'slide-concept-label',
      type: 'concept',
      title_ru: '<label>: связываем поле с описанием',
      title_en: '<label>: Linking Fields to Descriptions',
      body_ru: 'Тег <label> связывает текстовое описание с полем ввода через атрибут for, совпадающий с id поля. Это позволяет кликать на подпись для фокуса на поле и критически важно для скринридеров.',
      body_en: 'The <label> tag links a text description to an input via the for attribute, which matches the field\'s id. This allows clicking the label to focus the field, and is critical for screen readers.',
      code: `<!-- Способ 1: через for и id -->
<label for="username">Имя пользователя</label>
<input type="text" id="username" name="username">

<!-- Способ 2: вложенный input -->
<label>
  Имя пользователя
  <input type="text" name="username">
</label>`,
      codeLang: 'html',
    },
    {
      id: 'slide-code-select',
      type: 'code',
      title_ru: '<select>, <textarea> и <button>',
      title_en: '<select>, <textarea>, and <button>',
      body_ru: 'Помимо <input>, HTML предоставляет специализированные элементы для разных типов пользовательского ввода.',
      body_en: 'Beyond <input>, HTML provides specialized elements for different types of user input.',
      code: `<!-- Выпадающий список -->
<label for="city">Город</label>
<select id="city" name="city">
  <option value="">-- Выберите --</option>
  <option value="msk">Москва</option>
  <option value="spb">Санкт-Петербург</option>
  <option value="ekb">Екатеринбург</option>
</select>

<!-- Многострочный текст -->
<label for="bio">О себе</label>
<textarea id="bio" name="bio"
  rows="4" cols="40"
  placeholder="Расскажите о себе...">
</textarea>

<!-- Кнопки -->
<button type="submit">Сохранить</button>
<button type="reset">Сбросить</button>
<button type="button">Просто кнопка</button>`,
      codeLang: 'html',
    },
    {
      id: 'slide-compare',
      type: 'compare',
      title_ru: 'GET vs POST',
      title_en: 'GET vs POST',
      body_ru: 'Метод формы определяет, как данные передаются на сервер. Выбор метода влияет на безопасность и поведение браузера.',
      body_en: 'The form method determines how data is sent to the server. The choice affects security and browser behavior.',
      compareLeft: {
        label_ru: 'GET — данные в URL',
        label_en: 'GET — data in the URL',
        items_ru: [
          'Данные видны в адресной строке',
          'Страницу можно сохранить в закладки',
          'Подходит для поиска и фильтров',
          'НЕ для паролей и личных данных',
        ],
        items_en: [
          'Data is visible in the address bar',
          'Page can be bookmarked',
          'Suitable for search and filters',
          'NOT for passwords and personal data',
        ],
        color: 'blue',
      },
      compareRight: {
        label_ru: 'POST — данные в теле запроса',
        label_en: 'POST — data in the request body',
        items_ru: [
          'Данные скрыты от адресной строки',
          'Нельзя сохранить в закладки',
          'Для форм регистрации, оплаты, логина',
          'Безопаснее для чувствительных данных',
        ],
        items_en: [
          'Data is hidden from the address bar',
          'Cannot be bookmarked',
          'For registration, payment, login forms',
          'Safer for sensitive data',
        ],
        color: 'green',
      },
    },
    {
      id: 'slide-tip',
      type: 'tip',
      title_ru: 'Совет: используйте атрибут required и type',
      title_en: 'Tip: Use required and type Attributes',
      body_ru: 'Браузер выполнит базовую валидацию бесплатно: type="email" проверит формат почты, type="number" не позволит ввести буквы, required не даст отправить пустое поле. Это не заменяет серверную валидацию, но улучшает UX.',
      body_en: 'The browser performs basic validation for free: type="email" checks the email format, type="number" prevents letters, required blocks submitting empty fields. This doesn\'t replace server-side validation, but improves UX.',
    },
    {
      id: 'slide-practice',
      type: 'practice-cta',
      title_ru: 'Пора практиковаться!',
      title_en: 'Time to Practice!',
      body_ru: 'Создайте форму регистрации с полями: имя, email, пароль, город (select), согласие с правилами (checkbox) и кнопкой отправки.',
      body_en: 'Create a registration form with fields: name, email, password, city (select), terms agreement (checkbox), and a submit button.',
    },
  ],
  content: {
    intro_ru: 'Формы — это главный механизм взаимодействия пользователя с веб-приложением. Без форм невозможны авторизация, поиск, оформление заказов и отправка любых данных на сервер.',
    intro_en: 'Forms are the primary mechanism for user interaction with a web application. Without forms, login, search, checkout, and sending any data to the server would be impossible.',
    blocks: [
      {
        sectionId: 'inputs',
        heading_ru: 'Атрибуты тега <input>',
        heading_en: 'Attributes of the <input> Tag',
        text_ru: 'Тег <input> — самозакрывающийся и чрезвычайно гибкий. Атрибут name обязателен для передачи данных на сервер — именно он становится ключом в паре ключ-значение. Атрибут placeholder показывает подсказку внутри поля, пока оно пустое. Атрибут required делает поле обязательным для заполнения.',
        text_en: 'The <input> tag is self-closing and extremely flexible. The name attribute is required to send data to the server — it becomes the key in a key-value pair. The placeholder attribute shows a hint inside the field while it\'s empty. The required attribute makes the field mandatory.',
        code: `<input
  type="text"
  id="fullname"
  name="fullname"
  placeholder="Иван Иванов"
  required
  minlength="2"
  maxlength="100"
  autocomplete="name"
>`,
        codeLang: 'html',
      },
      {
        sectionId: 'labels',
        heading_ru: 'Доступность форм',
        heading_en: 'Form Accessibility',
        text_ru: 'Каждое поле формы должно иметь связанный <label>. Это критически важно: скринридеры объявляют название поля при фокусе. Клик на label фокусирует связанное поле. Используйте fieldset и legend для группировки связанных полей (например, группы радиокнопок).',
        text_en: 'Every form field must have an associated <label>. This is critical: screen readers announce the field name on focus. Clicking a label focuses the associated field. Use fieldset and legend to group related fields (e.g., radio button groups).',
        code: `<fieldset>
  <legend>Пол</legend>

  <label>
    <input type="radio" name="gender" value="male">
    Мужской
  </label>

  <label>
    <input type="radio" name="gender" value="female">
    Женский
  </label>

  <label>
    <input type="radio" name="gender" value="other">
    Другой
  </label>
</fieldset>`,
        codeLang: 'html',
      },
      {
        sectionId: 'select-textarea',
        heading_ru: 'Выпадающие списки и текстовые области',
        heading_en: 'Dropdowns and Text Areas',
        text_ru: 'Элемент <select> создаёт выпадающий список. Атрибут multiple позволяет выбрать несколько значений. Элемент <optgroup> группирует опции. <textarea> создаёт многострочное поле — в отличие от input, у него есть закрывающий тег, а начальное значение задаётся содержимым, а не атрибутом value.',
        text_en: 'The <select> element creates a dropdown. The multiple attribute allows selecting several values. The <optgroup> element groups options. <textarea> creates a multi-line field — unlike input, it has a closing tag, and its initial value is set by content, not the value attribute.',
        code: `<select id="country" name="country" required>
  <optgroup label="Популярные">
    <option value="ru">Россия</option>
    <option value="by">Беларусь</option>
    <option value="kz">Казахстан</option>
  </optgroup>
  <optgroup label="Другие">
    <option value="de">Германия</option>
    <option value="fr">Франция</option>
  </optgroup>
</select>`,
        codeLang: 'html',
      },
      {
        sectionId: 'get-post',
        heading_ru: 'Атрибуты action и method',
        heading_en: 'The action and method Attributes',
        text_ru: 'Атрибут action задаёт URL, на который будут отправлены данные формы. Если action не указан, данные отправляются на текущий URL. method="get" добавляет данные в строку запроса URL (видны пользователю). method="post" отправляет данные в теле HTTP-запроса (скрыты от URL).',
        text_en: 'The action attribute sets the URL where form data will be sent. If action is omitted, data is sent to the current URL. method="get" appends data to the URL query string (visible to the user). method="post" sends data in the HTTP request body (hidden from the URL).',
        code: `<!-- Форма поиска — GET логично: результат можно поделиться -->
<form action="/search" method="get">
  <input type="search" name="q" placeholder="Поиск...">
  <button type="submit">Найти</button>
</form>

<!-- Форма входа — POST обязательно: пароль скрыт -->
<form action="/login" method="post">
  <input type="email" name="email" required>
  <input type="password" name="password" required>
  <button type="submit">Войти</button>
</form>`,
        codeLang: 'html',
      },
    ],
  },
  editorTask: {
    title_ru: 'Создайте форму регистрации',
    title_en: 'Create a Registration Form',
    instructions_ru: 'Создайте HTML-форму регистрации с полями: имя (text), email, пароль (password), выбор города (select с минимум 3 вариантами), чекбокс согласия с правилами и кнопка "Зарегистрироваться". Все поля должны быть обязательными (required). Добавьте label к каждому полю.',
    instructions_en: 'Create an HTML registration form with fields: name (text), email, password, city selection (select with at least 3 options), a terms agreement checkbox, and a "Register" button. All fields should be required. Add a label to each field.',
    activeTabs: ['html'],
    starterCode: {
      html: `<!DOCTYPE html>
<html lang="ru">
<head>
  <meta charset="UTF-8">
  <title>Регистрация</title>
</head>
<body>
  <h1>Регистрация</h1>

  <form action="/register" method="post">

    <!-- Поле имени -->

    <!-- Поле email -->

    <!-- Поле пароля -->

    <!-- Выпадающий список городов -->

    <!-- Чекбокс согласия -->

    <!-- Кнопка отправки -->

  </form>
</body>
</html>`,
    },
    hints_ru: [
      'Каждый input должен иметь уникальный id и соответствующий label с атрибутом for',
      'Для пароля используйте type="password", для email — type="email"',
      'Для select добавьте первый option с пустым value как подсказку: <option value="">Выберите город</option>',
      'Чекбокс согласия: <input type="checkbox" id="terms" name="terms" required>',
    ],
    hints_en: [
      'Each input should have a unique id and a corresponding label with the for attribute',
      'Use type="password" for password, type="email" for email',
      'For select, add the first option with an empty value as a hint: <option value="">Select a city</option>',
      'Terms checkbox: <input type="checkbox" id="terms" name="terms" required>',
    ],
  },
  keyTerms: [
    {
      term_ru: 'action',
      term_en: 'action',
      definition_ru: 'Атрибут тега <form>. Указывает URL, на который будут отправлены данные формы при сабмите.',
      definition_en: 'An attribute of the <form> tag. Specifies the URL where form data will be sent on submit.',
      example_ru: '<form action="/submit">',
      example_en: '<form action="/submit">',
    },
    {
      term_ru: 'method',
      term_en: 'method',
      definition_ru: 'Атрибут тега <form>. Определяет HTTP-метод отправки: GET (данные в URL) или POST (данные в теле запроса).',
      definition_en: 'An attribute of the <form> tag. Defines the HTTP method: GET (data in URL) or POST (data in request body).',
    },
    {
      term_ru: 'placeholder',
      term_en: 'placeholder',
      definition_ru: 'Атрибут <input> и <textarea>. Показывает подсказку внутри поля, когда оно пустое. Исчезает при вводе.',
      definition_en: 'An attribute of <input> and <textarea>. Shows a hint inside the field when it\'s empty. Disappears on input.',
    },
    {
      term_ru: 'required',
      term_en: 'required',
      definition_ru: 'Булевый атрибут. Запрещает отправку формы, если поле с этим атрибутом пустое. Встроенная валидация браузера.',
      definition_en: 'A boolean attribute. Prevents form submission if the field with this attribute is empty. Built-in browser validation.',
    },
    {
      term_ru: 'fieldset / legend',
      term_en: 'fieldset / legend',
      definition_ru: '<fieldset> группирует связанные поля формы. <legend> даёт группе заголовок. Критически важно для групп радиокнопок.',
      definition_en: '<fieldset> groups related form fields. <legend> gives the group a heading. Critical for radio button groups.',
    },
  ],
  didYouKnow: [
    {
      text_ru: 'Первые HTML-формы появились в HTML 2.0 в 1995 году. До этого веб был полностью статическим — пользователи могли только читать, но не вводить данные.',
      text_en: 'The first HTML forms appeared in HTML 2.0 in 1995. Before that, the web was entirely static — users could only read, not enter data.',
    },
    {
      text_ru: 'Атрибут autocomplete помогает браузеру автоматически заполнять поля на основе ранее введённых данных. Значения вроде autocomplete="email" или autocomplete="new-password" значительно улучшают UX форм.',
      text_en: 'The autocomplete attribute helps browsers auto-fill fields based on previously entered data. Values like autocomplete="email" or autocomplete="new-password" significantly improve form UX.',
    },
  ],
  quiz: [
    {
      id: 'q1',
      text_ru: 'Какой атрибут тега <input> определяет тип поля?',
      text_en: 'Which <input> attribute determines the field type?',
      options_ru: ['name', 'id', 'type', 'value'],
      options_en: ['name', 'id', 'type', 'value'],
      correctIndex: 2,
      explanation_ru: 'Атрибут type определяет тип поля: text, email, password, checkbox, radio и другие.',
      explanation_en: 'The type attribute determines the field type: text, email, password, checkbox, radio, and others.',
    },
    {
      id: 'q2',
      text_ru: 'Какой метод формы нужно использовать для отправки пароля?',
      text_en: 'Which form method should be used to send a password?',
      options_ru: ['GET', 'POST', 'PUT', 'SEND'],
      options_en: ['GET', 'POST', 'PUT', 'SEND'],
      correctIndex: 1,
      explanation_ru: 'POST отправляет данные в теле HTTP-запроса, скрывая их от адресной строки. GET добавляет данные в URL — это небезопасно для паролей.',
      explanation_en: 'POST sends data in the HTTP request body, hiding it from the address bar. GET appends data to the URL — unsafe for passwords.',
    },
    {
      id: 'q3',
      text_ru: 'Для чего нужен атрибут for у тега <label>?',
      text_en: 'What is the for attribute of <label> used for?',
      options_ru: [
        'Задаёт стиль поля',
        'Связывает label с input через совпадающий id',
        'Указывает имя поля при отправке',
        'Задаёт порядок перехода по Tab',
      ],
      options_en: [
        'Sets the field style',
        'Links the label to an input via matching id',
        'Specifies the field name on submission',
        'Sets the Tab order',
      ],
      correctIndex: 1,
      explanation_ru: 'Атрибут for должен совпадать с id связанного input. Это позволяет кликать на label для фокуса поля и помогает скринридерам.',
      explanation_en: 'The for attribute must match the id of the associated input. This allows clicking the label to focus the field and helps screen readers.',
    },
    {
      id: 'q4',
      text_ru: 'Какой тег создаёт многострочное текстовое поле?',
      text_en: 'Which tag creates a multi-line text field?',
      options_ru: ['<input type="multiline">', '<textbox>', '<textarea>', '<input type="text" rows="4">'],
      options_en: ['<input type="multiline">', '<textbox>', '<textarea>', '<input type="text" rows="4">'],
      correctIndex: 2,
      explanation_ru: '<textarea> — единственный HTML-элемент для многострочного текстового ввода. Его размер задаётся атрибутами rows и cols или через CSS.',
      explanation_en: '<textarea> is the only HTML element for multi-line text input. Its size is set with rows and cols attributes or via CSS.',
    },
    {
      id: 'q5',
      text_ru: 'Что произойдёт при отправке формы с методом GET?',
      text_en: 'What happens when a form with method GET is submitted?',
      options_ru: [
        'Данные шифруются и скрываются',
        'Данные добавляются в URL как параметры запроса',
        'Данные отправляются в теле запроса',
        'Форма перезагружает страницу без отправки данных',
      ],
      options_en: [
        'Data is encrypted and hidden',
        'Data is appended to the URL as query parameters',
        'Data is sent in the request body',
        'The form reloads the page without sending data',
      ],
      correctIndex: 1,
      explanation_ru: 'При GET данные становятся частью URL: /search?q=html&lang=ru. Это удобно для поиска, но не для конфиденциальных данных.',
      explanation_en: 'With GET, data becomes part of the URL: /search?q=html&lang=en. Convenient for search, but not for sensitive data.',
    },
  ],
}
