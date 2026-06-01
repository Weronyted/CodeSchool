interface ErrorExplanation {
  title: string
  explanation: string
  tip: string
}

const ERROR_MAP: Array<{ pattern: RegExp; explain: ErrorExplanation }> = [
  {
    pattern: /ReferenceError: (\w+) is not defined/,
    explain: {
      title: 'Переменная не найдена',
      explanation: 'Ты используешь переменную, которую ещё не создал. Сначала объяви её через let, const или var.',
      tip: 'Проверь: нет ли опечатки в имени переменной?',
    },
  },
  {
    pattern: /SyntaxError: Unexpected token/,
    explain: {
      title: 'Синтаксическая ошибка',
      explanation: 'JavaScript нашёл что-то неожиданное. Скорее всего пропущена скобка, запятая или кавычка.',
      tip: 'Проверь каждую открывающую скобку { ( [ — у неё должна быть закрывающая.',
    },
  },
  {
    pattern: /TypeError: Cannot read propert/,
    explain: {
      title: 'Объект равен null или undefined',
      explanation: 'Ты обращаешься к свойству объекта, но сам объект не существует.',
      tip: 'Убедись, что переменная уже получила значение перед использованием.',
    },
  },
  {
    pattern: /TypeError: (\w+) is not a function/,
    explain: {
      title: 'Это не функция',
      explanation: 'Ты пытаешься вызвать что-то как функцию, но это не функция.',
      tip: 'Проверь название функции — возможно, ты забыл её создать или опечатался.',
    },
  },
  {
    pattern: /SyntaxError: Unexpected end of input/,
    explain: {
      title: 'Код внезапно закончился',
      explanation: 'Твой код закончился раньше времени. Скорее всего не хватает закрывающей скобки или кавычки.',
      tip: 'Подсчитай открывающие и закрывающие скобки — их количество должно совпадать.',
    },
  },
]

export function explainError(error: string): ErrorExplanation {
  for (const { pattern, explain } of ERROR_MAP) {
    if (pattern.test(error)) return explain
  }
  return {
    title: 'Ошибка в коде',
    explanation: error,
    tip: 'Внимательно прочитай сообщение об ошибке — там обычно написана подсказка.',
  }
}
