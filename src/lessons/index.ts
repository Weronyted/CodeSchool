export const LESSON_SLUGS = [
  'intro-to-html',
  'html-tags',
  'html-structure',
  'html-elements',
  'intro-to-css',
  'css-styling',
  'css-layout',
  'css-basics',
  'css-box-model',
  'css-flexbox',
  'intro-to-js',
  'js-logic',
  'js-dom',
  'intro-to-javascript',
  'javascript-functions',
  'javascript-conditions',
  'javascript-loops',
  'javascript-arrays',
  'dom-manipulation',
  'build-your-webpage',
] as const

export type LessonSlug = (typeof LESSON_SLUGS)[number]

export const LESSON_META: Record<LessonSlug, { title: string; description: string; icon: string }> = {
  'intro-to-html': {
    title: 'Что такое HTML',
    description: 'Знакомимся с языком, на котором написаны все сайты в мире.',
    icon: '🏗️',
  },
  'html-tags': {
    title: 'Основные теги HTML',
    description: 'Заголовки, абзацы, ссылки, картинки и списки — теги, которые строят любой сайт.',
    icon: '🔤',
  },
  'html-structure': {
    title: 'Структура HTML-документа',
    description: 'Каркас любой веб-страницы: DOCTYPE, html, head, body и семантические теги.',
    icon: '🏛️',
  },
  'html-elements': {
    title: 'Элементы HTML',
    description: 'Заголовки, абзацы, списки, ссылки и изображения',
    icon: '🔤',
  },
  'intro-to-css': {
    title: 'Что такое CSS',
    description: 'Добавляем цвета, шрифты и красоту — учимся одевать HTML-скелет.',
    icon: '🎨',
  },
  'css-styling': {
    title: 'Стили CSS: цвета, шрифты, фон',
    description: 'Раскрашиваем страницу: работаем с цветами, шрифтами, фоном и рамками.',
    icon: '🖌️',
  },
  'css-layout': {
    title: 'Раскладка CSS: блочная модель и Flexbox',
    description: 'Учимся расставлять элементы: блочная модель, margin, padding и Flexbox.',
    icon: '📐',
  },
  'css-basics': {
    title: 'Основы CSS',
    description: 'Что такое CSS, селекторы, свойства и значения',
    icon: '🎨',
  },
  'css-box-model': {
    title: 'Блочная модель CSS',
    description: 'Margin, padding, border — как устроено пространство',
    icon: '📦',
  },
  'css-flexbox': {
    title: 'Flexbox',
    description: 'Выравнивание и расположение элементов с Flexbox',
    icon: '↔️',
  },
  'intro-to-js': {
    title: 'Введение в JavaScript',
    description: 'Переменные, типы данных и первые шаги в программировании на JS.',
    icon: '⚡',
  },
  'js-logic': {
    title: 'Условия и циклы',
    description: 'if/else, операторы сравнения и циклы — учим JavaScript принимать решения.',
    icon: '🔀',
  },
  'js-dom': {
    title: 'Работа с DOM',
    description: 'Находи элементы, меняй содержимое и реагируй на действия пользователя.',
    icon: '🖱️',
  },
  'intro-to-javascript': {
    title: 'Введение в JavaScript',
    description: 'Переменные, типы данных, console.log',
    icon: '⚡',
  },
  'javascript-functions': {
    title: 'Функции JavaScript',
    description: 'Создание функций, параметры и возврат значения',
    icon: '🔧',
  },
  'javascript-conditions': {
    title: 'Условия в JavaScript',
    description: 'if/else, операторы сравнения, логические операторы',
    icon: '🔀',
  },
  'javascript-loops': {
    title: 'Циклы в JavaScript',
    description: 'for, while — повторяем действия автоматически',
    icon: '🔁',
  },
  'javascript-arrays': {
    title: 'Массивы JavaScript',
    description: 'Создание массивов, методы push/pop/map/filter',
    icon: '📋',
  },
  'dom-manipulation': {
    title: 'Работа с DOM',
    description: 'Находим элементы, меняем содержимое, обрабатываем события',
    icon: '🖱️',
  },
  'build-your-webpage': {
    title: 'Создай свою страницу',
    description: 'Итоговый проект: собираем полноценную веб-страницу',
    icon: '🚀',
  },
}
