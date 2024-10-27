import { SizeValue } from './toCssUnit.types'

/**
 * Конвертирует различные форматы размеров в строку с px или оставляет как есть для других единиц измерения
 * @param value - Значение для конвертации (число, строка или undefined)
 * @returns Строка с размером (например, "24px", "1.5rem", "calc(100% - 20px)") или undefined
 */
export const toCssUnit = (value: SizeValue): string | undefined => {
  // Если значение undefined или пустая строка, возвращаем undefined
  if (value === undefined || value === '') {
    return undefined
  }

  // Если значение число, конвертируем в px
  if (typeof value === 'number') {
    return `${value}px`
  }

  // Если значение строка
  if (typeof value === 'string') {
    const trimmedValue = value.trim()

    // Проверяем CSS функции и переменные
    if (
      // CSS функции (calc, min, max, clamp, и т.д.)
      /^(calc|min|max|clamp|var)\(.+\)$/i.test(trimmedValue) ||
      // CSS кастомные свойства (переменные)
      /^var\(--.+\)$/i.test(trimmedValue) ||
      // CSS функции с множественными параметрами
      /^(min|max|clamp)\(.+\)$/i.test(trimmedValue)
    ) {
      return trimmedValue
    }

    // Проверяем, является ли строка числом
    const numValue = Number(trimmedValue)
    if (!isNaN(numValue)) {
      return `${numValue}px`
    }

    // Проверяем, содержит ли строка только цифры и точку
    if (/^\d*\.?\d*$/.test(trimmedValue)) {
      return `${trimmedValue}px`
    }

    // Если значение уже содержит единицы измерения (px, rem, em, vh, vw и т.д.),
    // возвращаем как есть
    if (/^-?\d*\.?\d+(px|rem|em|vh|vw|%|pt|pc|in|cm|mm|ex|ch|vmin|vmax)$/.test(trimmedValue)) {
      return trimmedValue
    }

    // Для некорректных значений возвращаем undefined
    return undefined
  }

  return undefined
}
