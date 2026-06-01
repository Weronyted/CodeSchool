import type { Lesson } from '@/types/lesson'

export const jsAsyncBasics: Lesson = {
  slug: 'js-async-basics',
  category: 'JS',
  icon: '⏱️',
  readTime: 13,
  title_ru: 'Асинхронный JavaScript',
  title_en: 'Async JavaScript',
  description_ru: 'Разберитесь с синхронным и асинхронным кодом, setTimeout, Promise, fetch и современным async/await.',
  description_en: 'Understand synchronous vs asynchronous code, setTimeout, Promise, fetch and modern async/await.',
  sections: [
    { id: 'sync-async', title_ru: 'Синхронный vs асинхронный', title_en: 'Synchronous vs asynchronous' },
    { id: 'settimeout', title_ru: 'setTimeout и setInterval', title_en: 'setTimeout and setInterval' },
    { id: 'promise', title_ru: 'Promise', title_en: 'Promise' },
    { id: 'fetch', title_ru: 'fetch API', title_en: 'fetch API' },
    { id: 'async-await', title_ru: 'async / await', title_en: 'async / await' },
    { id: 'error-handling', title_ru: 'Обработка ошибок в async', title_en: 'Async error handling' },
  ],
  slides: [
    {
      id: 'title-slide',
      type: 'title',
      title_ru: 'Асинхронный JavaScript',
      title_en: 'Async JavaScript',
      body_ru: 'JavaScript однопоточный, но умеет не блокироваться. Асинхронность — суперсила современного JS.',
      body_en: 'JavaScript is single-threaded, but it knows how not to block. Async is the superpower of modern JS.',
      visual: { kind: 'emoji', emojis: ['⏱️', '🔄', '📡'], caption_ru: 'Время, очередь, сеть', caption_en: 'Time, queue, network' },
    },
    {
      id: 'concept-sync-async',
      type: 'concept',
      title_ru: 'Синхронный vs асинхронный код',
      title_en: 'Synchronous vs asynchronous code',
      body_ru: 'Синхронный код выполняется строка за строкой и блокирует выполнение. Асинхронный — позволяет продолжать работу, пока ждёт результат.',
      body_en: 'Synchronous code runs line by line and blocks execution. Asynchronous code lets the program continue while waiting for a result.',
      code: `// Synchronous — blocks everything\nconsole.log('1: start');\nconst result = verySlowCalculation(); // blocks for 5 seconds!\nconsole.log('2: done');\n\n// Asynchronous — non-blocking\nconsole.log('1: start');\nfetch('/api/data').then(data => {\n  console.log('3: data arrived'); // runs later\n});\nconsole.log('2: continuing immediately'); // runs before fetch completes\n// Output order: 1, 2, 3`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-settimeout',
      type: 'concept',
      title_ru: 'setTimeout и setInterval',
      title_en: 'setTimeout and setInterval',
      body_ru: 'setTimeout выполняет функцию один раз через заданную задержку. setInterval повторяет через каждый интервал. clearInterval останавливает интервал.',
      body_en: 'setTimeout executes a function once after a given delay. setInterval repeats at each interval. clearInterval stops an interval.',
      code: `// Execute once after 2 seconds\nconst timerId = setTimeout(() => {\n  console.log('2 seconds later!');\n}, 2000);\n\n// Cancel before it fires\n// clearTimeout(timerId);\n\n// Repeat every second\nlet count = 0;\nconst intervalId = setInterval(() => {\n  count++;\n  console.log('Tick:', count);\n  if (count >= 5) {\n    clearInterval(intervalId); // stop after 5 ticks\n    console.log('Stopped!');\n  }\n}, 1000);`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-promise',
      type: 'concept',
      title_ru: 'Promise — обещание результата',
      title_en: 'Promise — a promise of a result',
      body_ru: 'Promise — объект, представляющий операцию, которая ещё не завершена. Может быть: pending (ожидание), fulfilled (выполнен) или rejected (отклонён).',
      body_en: 'A Promise is an object representing an operation that has not completed yet. It can be: pending, fulfilled, or rejected.',
      code: `// Creating a Promise\nconst myPromise = new Promise((resolve, reject) => {\n  const success = Math.random() > 0.5;\n  setTimeout(() => {\n    if (success) resolve('Great result!');\n    else reject(new Error('Something went wrong'));\n  }, 1000);\n});\n\n// Consuming a Promise\nmyPromise\n  .then(value => console.log('Success:', value))\n  .catch(error => console.error('Error:', error.message))\n  .finally(() => console.log('Promise settled'));`,
      codeLang: 'javascript',
    },
    {
      id: 'concept-fetch',
      type: 'concept',
      title_ru: 'fetch API — запросы к серверу',
      title_en: 'fetch API — server requests',
      body_ru: 'fetch — встроенная функция для HTTP-запросов. Возвращает Promise. Нужно два шага: получить Response, потом прочитать тело (.json(), .text()).',
      body_en: 'fetch is a built-in function for HTTP requests. It returns a Promise. You need two steps: get the Response, then read the body (.json(), .text()).',
      code: `// GET request\nfetch('https://jsonplaceholder.typicode.com/users/1')\n  .then(response => {\n    if (!response.ok) throw new Error('HTTP error: ' + response.status);\n    return response.json(); // parse body as JSON\n  })\n  .then(user => {\n    console.log(user.name); // 'Leanne Graham'\n    console.log(user.email);\n  })\n  .catch(error => console.error('Fetch failed:', error));\n\n// POST request\nfetch('/api/users', {\n  method: 'POST',\n  headers: { 'Content-Type': 'application/json' },\n  body: JSON.stringify({ name: 'Alice', age: 25 }),\n}).then(r => r.json()).then(console.log);`,
      codeLang: 'javascript',
    },
    {
      id: 'compare-then-await',
      type: 'compare',
      title_ru: 'Promise .then() vs async/await',
      title_en: 'Promise .then() vs async/await',
      body_ru: 'Оба подхода работают с Promise. async/await — синтаксический сахар, делающий код линейным и читаемым.',
      body_en: 'Both approaches work with Promises. async/await is syntactic sugar that makes code look linear and readable.',
      compareLeft: {
        label_ru: 'Promise .then() цепочка',
        label_en: 'Promise .then() chain',
        items_ru: ['Цепочки .then().then()', 'Быстро становится глубоким', 'Сложнее отлаживать', 'Хорошо для параллельных операций'],
        items_en: ['.then().then() chains', 'Quickly becomes deeply nested', 'Harder to debug', 'Good for parallel operations'],
        color: 'amber',
      },
      compareRight: {
        label_ru: 'async/await',
        label_en: 'async/await',
        items_ru: ['Похож на синхронный код', 'Линейный и читаемый', 'try/catch для ошибок', 'Поддерживает await Promise.all()'],
        items_en: ['Looks like synchronous code', 'Linear and readable', 'try/catch for errors', 'Supports await Promise.all()'],
        color: 'green',
      },
    },
    {
      id: 'concept-async-await',
      type: 'concept',
      title_ru: 'async / await',
      title_en: 'async / await',
      body_ru: 'async делает функцию асинхронной и всегда возвращает Promise. await приостанавливает выполнение функции до разрешения Promise.',
      body_en: 'async makes a function asynchronous and always returns a Promise. await pauses function execution until the Promise resolves.',
      code: `async function getUser(id) {\n  const response = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);\n  if (!response.ok) throw new Error('User not found');\n  const user = await response.json();\n  return user;\n}\n\n// Call it (must use .then or another async fn)\ngetUser(1)\n  .then(user => console.log(user.name))\n  .catch(err => console.error(err));\n\n// Or inside another async function:\nasync function main() {\n  const user = await getUser(1);\n  console.log('Got user:', user.name);\n}`,
      codeLang: 'javascript',
    },
    {
      id: 'anim-fetch-await',
      type: 'code-anim',
      title_ru: 'fetch → await → отображение данных',
      title_en: 'fetch → await → display data',
      body_ru: 'Пошаговый запрос к публичному API с async/await.',
      body_en: 'Step-by-step request to a public API using async/await.',
      animMode: 'console',
      animSteps: [
        {
          code: `async function getPost(id) {\n  // Step 1: send the request\n  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);\n}`,
          comment_ru: 'Объявляем async-функцию и делаем запрос',
          comment_en: 'Declare async function and make the request',
          output: '',
        },
        {
          code: `async function getPost(id) {\n  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);\n  // Step 2: check status\n  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);\n  // Step 3: parse JSON\n  const post = await response.json();\n  return post;\n}`,
          comment_ru: 'Проверяем статус и парсим JSON',
          comment_en: 'Check status and parse JSON',
          output: '',
        },
        {
          code: `async function getPost(id) {\n  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);\n  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);\n  return await response.json();\n}\n\ngetPost(1).then(post => {\n  console.log('Title:', post.title);\n  console.log('Body:', post.body.slice(0, 50) + '...');\n});`,
          comment_ru: 'Вызываем и отображаем результат',
          comment_en: 'Call and display the result',
          output: 'Title: sunt aut facere repellat provident occaecati\nBody: quia et suscipit\nsuscipit recusandae con...',
        },
        {
          code: `async function getPost(id) {\n  const response = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);\n  if (!response.ok) throw new Error(\`HTTP \${response.status}\`);\n  return await response.json();\n}\n\nasync function main() {\n  try {\n    const post = await getPost(1);\n    console.log('Post id:', post.id);\n    console.log('User id:', post.userId);\n  } catch (e) {\n    console.error('Failed:', e.message);\n  }\n}\nmain();`,
          comment_ru: 'Добавляем try/catch для обработки ошибок',
          comment_en: 'Add try/catch for error handling',
          output: 'Post id: 1\nUser id: 1',
        },
      ],
    },
    {
      id: 'concept-parallel',
      type: 'concept',
      title_ru: 'Promise.all — параллельные запросы',
      title_en: 'Promise.all — parallel requests',
      body_ru: 'Promise.all позволяет запускать несколько асинхронных операций одновременно и ждать завершения всех.',
      body_en: 'Promise.all lets you run multiple async operations in parallel and wait for all of them to complete.',
      code: `async function loadDashboard() {\n  // Sequential (slow) — one after another:\n  // const user = await fetchUser();\n  // const posts = await fetchPosts();\n\n  // Parallel (fast) — all at once:\n  const [user, posts, comments] = await Promise.all([\n    fetch('/api/user').then(r => r.json()),\n    fetch('/api/posts').then(r => r.json()),\n    fetch('/api/comments').then(r => r.json()),\n  ]);\n\n  console.log(user, posts, comments);\n}`,
      codeLang: 'javascript',
    },
    {
      id: 'tip-async-error',
      type: 'tip',
      title_ru: 'Совет: всегда обрабатывайте ошибки fetch',
      title_en: 'Tip: always handle fetch errors',
      body_ru: 'fetch НЕ бросает ошибку при HTTP-кодах 4xx/5xx — только при сетевых ошибках. Всегда проверяйте response.ok.',
      body_en: 'fetch does NOT throw an error on HTTP 4xx/5xx status — only on network failures. Always check response.ok.',
      code: `const res = await fetch('/api/missing');\nif (!res.ok) throw new Error('HTTP ' + res.status); // manual check`,
      codeLang: 'javascript',
    },
    {
      id: 'practice-cta',
      type: 'practice-cta',
      title_ru: 'Практика',
      title_en: 'Practice',
      body_ru: 'Создайте функцию, загружающую список пользователей с API и выводящую их имена.',
      body_en: 'Create a function that loads a list of users from an API and displays their names.',
    },
  ],
  content: {
    intro_ru: 'Асинхронность позволяет JavaScript не замирать во время ожидания ответа сервера, таймеров или других операций. Это фундамент для любого веб-приложения, работающего с данными.',
    intro_en: 'Async allows JavaScript to not freeze while waiting for server responses, timers, or other operations. It is the foundation for any web application that works with data.',
    blocks: [
      {
        sectionId: 'sync-async',
        heading_ru: 'Синхронный и асинхронный код: в чём разница',
        heading_en: 'Synchronous vs asynchronous code: what is the difference',
        text_ru: 'JavaScript — однопоточный язык: в каждый момент времени выполняется только одна инструкция. Синхронный код выполняется строго последовательно, и пока одна операция не завершится, следующая не начнётся. Если операция занимает много времени (например, чтение большого файла), поток блокируется — браузер «замирает».\n\nАсинхронный код решает эту проблему с помощью Event Loop. Медленная операция отправляется «в фон» (браузерный API или среда Node.js), а основной поток продолжает работу. Когда операция завершается, её коллбэк помещается в очередь задач и выполняется, как только стек вызовов освобождается. Это позволяет JavaScript оставаться отзывчивым, обрабатывая сеть, таймеры и ввод пользователя без блокировки.',
        text_en: 'JavaScript is single-threaded: only one instruction executes at any given moment. Synchronous code runs strictly in sequence — the next operation cannot start until the current one finishes. If an operation takes a long time (such as reading a large file), the thread is blocked and the browser appears to freeze.\n\nAsynchronous code solves this problem with the Event Loop. A slow operation is handed off to the background (a browser API or the Node.js runtime), and the main thread continues. When the operation completes, its callback is placed in the task queue and runs as soon as the call stack is empty. This keeps JavaScript responsive, handling network requests, timers, and user input without blocking.',
        code: `// --- Synchronous: blocks the thread ---
function slowSync() {
  const start = Date.now();
  while (Date.now() - start < 2000) {} // busy-wait 2 s
  return 'done';
}
console.log('before');
const result = slowSync(); // freezes for 2 seconds!
console.log('after:', result);
// Output (with 2 s pause): before → after: done

// --- Asynchronous: non-blocking ---
console.log('1: start');

setTimeout(() => {
  console.log('3: timer fired'); // runs after current code finishes
}, 0);

console.log('2: end of synchronous code');
// Output (immediately): 1: start → 2: end → 3: timer fired

// Even setTimeout(..., 0) runs AFTER the current synchronous block!`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'settimeout',
        heading_ru: 'setTimeout и setInterval: планирование задач',
        heading_en: 'setTimeout and setInterval: scheduling tasks',
        text_ru: 'setTimeout(fn, delay) планирует однократный вызов функции fn через не менее delay миллисекунд. Функция возвращает числовой идентификатор таймера, который можно передать в clearTimeout для отмены. Важно: delay — минимальная задержка, а не гарантированная. Если поток занят, вызов произойдёт позже.\n\nsetInterval(fn, period) вызывает fn повторно через каждые period мс. clearInterval останавливает интервал. setInterval не подходит для точного тайминга: если выполнение fn занимает дольше period, следующий вызов запустится сразу после завершения предыдущего. Для таких случаев предпочтительна рекурсивная цепочка setTimeout.',
        text_en: 'setTimeout(fn, delay) schedules a one-time call to fn after at least delay milliseconds. The function returns a numeric timer ID that can be passed to clearTimeout to cancel it. Importantly, delay is a minimum delay, not a guarantee — if the thread is busy the call will happen later.\n\nsetInterval(fn, period) calls fn repeatedly every period ms. clearInterval stops the interval. setInterval is not suitable for precise timing: if executing fn takes longer than period, the next call fires immediately after the previous one finishes. For such cases a recursive setTimeout chain is preferred.',
        code: `// --- setTimeout ---
const timerId = setTimeout(() => {
  console.log('Runs once after 1.5 seconds');
}, 1500);

// Cancel before it fires
// clearTimeout(timerId);

// --- setInterval ---
let ticks = 0;
const intervalId = setInterval(() => {
  ticks++;
  console.log(\`Tick \${ticks}\`);
  if (ticks >= 3) {
    clearInterval(intervalId);
    console.log('Interval stopped');
  }
}, 1000);
// Tick 1 → Tick 2 → Tick 3 → Interval stopped

// --- Recursive setTimeout (more precise) ---
function poll() {
  console.log('polling...');
  setTimeout(poll, 1000); // next call only after this one ends
}
// poll();

// Useful pattern: debounce with setTimeout
let debounceTimer;
function onInput(value) {
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    console.log('Search for:', value); // fires 300 ms after last keystroke
  }, 300);
}`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'promise',
        heading_ru: 'Promise.allSettled и Promise.race',
        heading_en: 'Promise.allSettled and Promise.race',
        text_ru: 'Помимо Promise.all существуют другие комбинаторы. allSettled ждёт всех (включая отклонённые). race возвращает первый завершившийся.',
        text_en: 'Beyond Promise.all there are other combinators. allSettled waits for all (including rejected). race returns the first to settle.',
        code: `// allSettled — never rejects, returns status of each\nconst results = await Promise.allSettled([\n  fetch('/api/a').then(r => r.json()),\n  fetch('/api/b').then(r => r.json()),  // may fail\n]);\nresults.forEach(r => {\n  if (r.status === 'fulfilled') console.log(r.value);\n  else console.error(r.reason);\n});\n\n// race — resolves/rejects with the first settled promise\nconst fastest = await Promise.race([slowFetch(), fastFetch()]);`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'fetch',
        heading_ru: 'fetch API: HTTP-запросы из браузера',
        heading_en: 'fetch API: making HTTP requests from the browser',
        text_ru: 'fetch — встроенная функция для отправки HTTP-запросов. Она возвращает Promise, который разрешается объектом Response. Получение данных — двухэтапный процесс: сначала ждём объект ответа (заголовки), затем вызываем метод чтения тела (.json(), .text(), .blob()) — он тоже возвращает Promise.\n\nГлавная ловушка fetch: он не выбрасывает ошибку при HTTP-статусах 4xx и 5xx — только при сетевых сбоях (нет соединения, DNS-ошибка). Чтобы корректно обрабатывать ошибки сервера, необходимо вручную проверять свойство response.ok. Для отправки данных (POST/PUT) передайте объект настроек вторым аргументом с полями method, headers и body.',
        text_en: 'fetch is a built-in function for sending HTTP requests. It returns a Promise that resolves to a Response object. Receiving data is a two-step process: first await the response object (headers), then call a body-reading method (.json(), .text(), .blob()) — which also returns a Promise.\n\nThe main fetch gotcha: it does NOT throw on HTTP 4xx/5xx status codes — only on network failures (no connection, DNS error). To handle server errors correctly you must manually check the response.ok property. To send data (POST/PUT) pass a settings object as the second argument with method, headers, and body fields.',
        code: `// --- GET request ---
fetch('https://jsonplaceholder.typicode.com/posts/1')
  .then(response => {
    // fetch only rejects on network errors — check HTTP status manually
    if (!response.ok) {
      throw new Error(\`HTTP error: \${response.status}\`);
    }
    return response.json(); // reads and parses the body
  })
  .then(post => {
    console.log('Title:', post.title);
  })
  .catch(err => console.error('Request failed:', err));

// --- POST request ---
fetch('https://jsonplaceholder.typicode.com/posts', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ title: 'Hello', body: 'World', userId: 1 }),
})
  .then(res => res.json())
  .then(created => console.log('Created post id:', created.id));

// --- Checking response.ok ---
const res = await fetch('/api/might-fail');
if (!res.ok) {
  throw new Error('Server error: ' + res.status); // 404, 500, etc.
}
const data = await res.json();`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'async-await',
        heading_ru: 'async/await: асинхронный код в линейном стиле',
        heading_en: 'async/await: async code in a linear style',
        text_ru: 'async/await — синтаксический сахар над Promise, появившийся в ES2017. Ключевое слово async перед функцией делает её асинхронной: она всегда возвращает Promise (обычное возвращаемое значение автоматически оборачивается в Promise.resolve). Внутри async-функции можно использовать await перед любым Promise — выполнение функции приостанавливается до разрешения промиса, но основной поток при этом не блокируется.\n\nГлавное преимущество async/await — код выглядит и читается как синхронный, хотя под капотом остаётся асинхронным. Обработка ошибок выполняется привычным try/catch. await можно использовать не только с fetch, но с любым Promise: задержками, операциями с БД, анимациями и т.д. Для параллельного запуска нескольких операций используйте await Promise.all([...]).',
        text_en: 'async/await is syntactic sugar over Promises, introduced in ES2017. The async keyword before a function makes it asynchronous: it always returns a Promise (a plain return value is automatically wrapped in Promise.resolve). Inside an async function you can use await before any Promise — function execution pauses until the Promise settles, but the main thread is not blocked.\n\nThe main advantage of async/await is that the code looks and reads like synchronous code, even though it remains asynchronous under the hood. Error handling uses the familiar try/catch syntax. await works with any Promise — not just fetch — including delays, database operations, animations, and more. To run multiple async operations in parallel use await Promise.all([...]).',
        code: `// Basic async/await
async function loadUser(id) {
  const res = await fetch(\`https://jsonplaceholder.typicode.com/users/\${id}\`);
  if (!res.ok) throw new Error('User not found');
  const user = await res.json();
  return user; // wraps value in Promise.resolve automatically
}

// Call it
loadUser(1).then(u => console.log(u.name)); // 'Leanne Graham'

// Error handling with try/catch
async function safeLoad(id) {
  try {
    const user = await loadUser(id);
    console.log('Loaded:', user.name);
  } catch (err) {
    console.error('Failed:', err.message);
  }
}

// Parallel requests with Promise.all
async function loadDashboard() {
  const [user, posts] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
  ]);
  console.log(user, posts); // both loaded simultaneously
}

// async function always returns a Promise
async function getNumber() { return 42; }
getNumber().then(console.log); // 42`,
        codeLang: 'javascript',
      },
      {
        sectionId: 'error-handling',
        heading_ru: 'Обработка ошибок с async/await',
        heading_en: 'Error handling with async/await',
        text_ru: 'В async/await используйте try/catch так же, как в синхронном коде. Для более гранулярного контроля можно ловить ошибки на уровне отдельного await.',
        text_en: 'With async/await use try/catch just like in synchronous code. For more granular control you can catch errors at individual await level.',
        code: `async function fetchUserSafely(id) {\n  let user;\n  try {\n    const res = await fetch(\`/api/users/\${id}\`);\n    if (!res.ok) throw new Error('Not found');\n    user = await res.json();\n  } catch (e) {\n    console.warn('Could not load user, using default:', e.message);\n    user = { id: 0, name: 'Guest' }; // fallback\n  }\n  return user;\n}`,
        codeLang: 'javascript',
      },
    ],
  },
  editorTask: {
    title_ru: 'Загрузчик пользователей',
    title_en: 'User loader',
    instructions_ru: 'Напишите async-функцию fetchUsers(), которая загружает пользователей с https://jsonplaceholder.typicode.com/users и выводит имя и email каждого. Обработайте ошибки через try/catch.',
    instructions_en: 'Write an async function fetchUsers() that loads users from https://jsonplaceholder.typicode.com/users and logs the name and email of each. Handle errors with try/catch.',
    activeTabs: ['javascript'],
    starterCode: {
      javascript: `async function fetchUsers() {\n  // TODO: wrap in try/catch\n  // TODO: fetch from 'https://jsonplaceholder.typicode.com/users'\n  // TODO: check response.ok\n  // TODO: parse JSON\n  // TODO: loop through users and console.log each name and email\n}\n\n// Call the function\nfetchUsers();\n\n// Expected output:\n// 1. Leanne Graham — Sincere@april.biz\n// 2. Ervin Howell — Shanna@melissa.tv\n// ... (10 users total)`,
    },
    hints_ru: [
      'const response = await fetch("https://jsonplaceholder.typicode.com/users");',
      'if (!response.ok) throw new Error("HTTP " + response.status);',
      'const users = await response.json();',
      'users.forEach((u, i) => console.log(`${i+1}. ${u.name} — ${u.email}`));',
    ],
    hints_en: [
      'const response = await fetch("https://jsonplaceholder.typicode.com/users");',
      'if (!response.ok) throw new Error("HTTP " + response.status);',
      'const users = await response.json();',
      'users.forEach((u, i) => console.log(`${i+1}. ${u.name} — ${u.email}`));',
    ],
  },
  keyTerms: [
    { term_ru: 'Promise', term_en: 'Promise', definition_ru: 'Объект, представляющий будущий результат асинхронной операции', definition_en: 'An object representing the future result of an async operation', example_ru: 'new Promise((resolve, reject) => { ... })', example_en: 'new Promise((resolve, reject) => { ... })' },
    { term_ru: 'async/await', term_en: 'async/await', definition_ru: 'Синтаксис для работы с Promise в линейном стиле', definition_en: 'Syntax for working with Promises in a linear style', example_ru: 'const data = await fetch(url).then(r => r.json())', example_en: 'const data = await fetch(url).then(r => r.json())' },
    { term_ru: 'fetch', term_en: 'fetch', definition_ru: 'Встроенная функция для HTTP-запросов, возвращает Promise', definition_en: 'Built-in function for HTTP requests, returns a Promise', example_ru: 'fetch("/api").then(r => r.json())', example_en: 'fetch("/api").then(r => r.json())' },
    { term_ru: 'Event Loop', term_en: 'Event Loop', definition_ru: 'Механизм, позволяющий JS выполнять асинхронные операции', definition_en: 'The mechanism that allows JS to perform async operations', example_ru: 'Выполняет колбэки из очереди когда стек вызовов пуст', example_en: 'Runs callbacks from the queue when the call stack is empty' },
    { term_ru: 'Promise.all', term_en: 'Promise.all', definition_ru: 'Запускает несколько промисов параллельно и ждёт всех', definition_en: 'Runs multiple promises in parallel and waits for all', example_ru: 'await Promise.all([fetch(a), fetch(b)])', example_en: 'await Promise.all([fetch(a), fetch(b)])' },
  ],
  didYouKnow: [
    { text_ru: 'await можно использовать с любым Promise, не только с fetch. Например, await new Promise(resolve => setTimeout(resolve, 1000)) — это способ "поспать" в async-функции.', text_en: 'await can be used with any Promise, not just fetch. For example, await new Promise(resolve => setTimeout(resolve, 1000)) is a way to "sleep" inside an async function.' },
    { text_ru: 'Top-level await (await вне функции) доступен в ES2022 и работает в современных браузерах и Node.js с ES-модулями.', text_en: 'Top-level await (await outside a function) is available in ES2022 and works in modern browsers and Node.js with ES modules.' },
  ],
  quiz: [
    { id: 'q1', text_ru: 'Что возвращает функция, объявленная с ключевым словом async?', text_en: 'What does a function declared with the async keyword return?', options_ru: ['Обычное значение', 'Promise', 'undefined', 'Generator'], options_en: ['A plain value', 'Promise', 'undefined', 'Generator'], correctIndex: 1, explanation_ru: 'async-функция всегда возвращает Promise. Если вернуть обычное значение, оно оборачивается в Promise.resolve().', explanation_en: 'An async function always returns a Promise. If you return a plain value, it is wrapped in Promise.resolve().' },
    { id: 'q2', text_ru: 'Что делает ключевое слово await?', text_en: 'What does the await keyword do?', options_ru: ['Останавливает браузер', 'Ждёт разрешения Promise и возвращает результат', 'Создаёт новый Promise', 'Отменяет запрос'], options_en: ['Stops the browser', 'Waits for a Promise to resolve and returns the result', 'Creates a new Promise', 'Cancels the request'], correctIndex: 1, explanation_ru: 'await приостанавливает выполнение async-функции до разрешения Promise и возвращает его значение.', explanation_en: 'await pauses the async function execution until the Promise resolves and returns its value.' },
    { id: 'q3', text_ru: 'Как fetch обрабатывает HTTP-ошибки (404, 500)?', text_en: 'How does fetch handle HTTP errors (404, 500)?', options_ru: ['Бросает ошибку автоматически', 'Не бросает ошибку — нужно проверять response.ok', 'Возвращает null', 'Перезапрашивает автоматически'], options_en: ['Throws an error automatically', 'Does not throw — you need to check response.ok', 'Returns null', 'Retries automatically'], correctIndex: 1, explanation_ru: 'fetch бросает ошибку только при сетевых сбоях. HTTP 4xx/5xx — это успешный Promise, но response.ok будет false.', explanation_en: 'fetch only throws on network failure. HTTP 4xx/5xx are resolved Promises but response.ok will be false.' },
    { id: 'q4', text_ru: 'Как запустить несколько запросов параллельно и дождаться всех?', text_en: 'How do you run multiple requests in parallel and wait for all?', options_ru: ['Вложенные await', 'Promise.all([...promises])', 'setTimeout', 'for await...of'], options_en: ['Nested awaits', 'Promise.all([...promises])', 'setTimeout', 'for await...of'], correctIndex: 1, explanation_ru: 'Promise.all принимает массив промисов, запускает их параллельно и разрешается когда все выполнены.', explanation_en: 'Promise.all takes an array of promises, runs them in parallel and resolves when all are fulfilled.' },
    { id: 'q5', text_ru: 'Что нужно сделать после получения ответа от fetch для получения JSON?', text_en: 'What do you need to do after getting the fetch Response to get JSON?', options_ru: ['JSON.parse(response)', 'response.text()', 'await response.json()', 'response.data'], options_en: ['JSON.parse(response)', 'response.text()', 'await response.json()', 'response.data'], correctIndex: 2, explanation_ru: 'response.json() читает тело ответа и парсит его как JSON. Возвращает Promise, поэтому нужен await.', explanation_en: 'response.json() reads the response body and parses it as JSON. It returns a Promise, so await is needed.' },
  ],
}
