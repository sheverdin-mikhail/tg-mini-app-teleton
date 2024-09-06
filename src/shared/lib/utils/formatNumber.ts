export function formatNumber(str: string) {
  // Удаляем все пробелы
  const stripped = str.replace(/\s/g, '');

  // Проверяем, содержит ли строка символ $
  const isDollar = stripped.includes('$');

  // Удаляем символ $
  const numString = isDollar ? stripped.slice(1) : stripped;

  // Преобразуем строку в число
  let num = parseInt(numString, 10);

  // Определяем разрядность числа
  let suffix = '';
  if (num >= 1e9) {
    num /= 1e9;
    suffix = 'B';
  } else if (num >= 1e6) {
    num /= 1e6;
    suffix = 'M';
  } else if (num >= 1e3) {
    num /= 1e3;
    suffix = 'K';
  }
  // Округляем число до двух знаков после запятой
  const roundedNum = num

  // Формируем итоговую строку
  const formatted = isDollar ? `$${roundedNum}${suffix}` : `${roundedNum}${suffix}`;
  return formatted;
}


export function formatNumberWithSpaces(number: number) {
  return number.toLocaleString('ru-RU').replace(/,/g, ' ');
}