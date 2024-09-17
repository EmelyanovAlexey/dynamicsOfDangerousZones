/* eslint-disable no-unused-vars */
/* eslint-disable no-debugger */
import { formatISO, format } from 'date-fns';

export function getDateFormatSendUTC(date, onlyDate = false, endDay = false) {
  if (date === '') return '';

  const dateCur = new Date(date);
  if (endDay) {
    dateCur.setHours(23);
    dateCur.setMinutes(59);
    dateCur.setSeconds(59);
  }

  dateCur.setHours(dateCur.getHours() + dateCur.getTimezoneOffset() / 60);
  return onlyDate
    ? dateCur.toUTCString().slice(0, 10)
    : `${formatISO(dateCur).replace('+', '%2B').slice(0, 22)}00:00`;
}

// получить дату с форматом
export function getDateWithFormat(
  date,
  timeZone = false,
  formatDate = 'yyyy-MM-dd',
) {
  const dateCur = new Date(date);

  if (timeZone) {
    dateCur.setMinutes(dateCur.getMinutes() - dateCur.getTimezoneOffset());
  }

  return format(dateCur, formatDate);
}

// получить текущий день с обнулением часов
export function getCurrentDay(isZeroTime = false) {
  const date = new Date();
  if (isZeroTime) {
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
  }
  return date;
}

// получить разницу во времени
export function timeDifference(start, end) {
  if (start === null || end === null) return null;
  const dateS = new Date(start);
  const dateF = new Date(end);
  const res = new Date(dateF - dateS);
  res.setHours(res.getHours() + res.getTimezoneOffset() / 60);
  return res;
}

// проверка выходного дня суб и воск
export const getIsWeekday = (date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6;
};

// проверка даты на выходной день из списка
export function isHoliday(date, holidayList) {
  if (
    holidayList.find((holiday) => format(holiday, 'yyyy-MM-dd') === date) ===
    undefined
  ) {
    return false;
  }
  return true;
}

// получение последнего рабочего дня
export function getLastWorkday(
  date = null,
  countTakeAwayDays = 0,
  holidays = [],
) {
  if (date === undefined) {
    return new Date();
  }
  const copyDate = new Date(date);
  copyDate.setDate(copyDate.getDate() - countTakeAwayDays);
  // проверяем выходные дни
  if (date !== null) {
    while (isHoliday(format(copyDate, 'yyyy-MM-dd'), holidays)) {
      if (countTakeAwayDays > 0) copyDate.setDate(copyDate.getDate() - 1);
      else copyDate.setDate(copyDate.getDate() + 1);
    }
  }
  return copyDate;
}

// получить рабочий день (дата - X раб. дней)
export function getWorkdayMinusDay(
  date = null,
  countTakeAwayDays = 0,
  holidays = [],
) {
  if (date === undefined) {
    return new Date();
  }
  const copyDate = new Date(date);
  let cntDayMinus = countTakeAwayDays;
  // проверяем выходные дни
  if (date !== null) {
    while (cntDayMinus !== 0) {
      if (countTakeAwayDays > 0) {
        copyDate.setDate(copyDate.getDate() - 1);
        const holiday = isHoliday(format(copyDate, 'yyyy-MM-dd'), holidays);
        if (!holiday) cntDayMinus -= 1; // если вых. то не учитываем
      } else {
        copyDate.setDate(copyDate.getDate() + 1);
        const holiday = isHoliday(format(copyDate, 'yyyy-MM-dd'), holidays);
        if (!holiday) cntDayMinus += 1; // если вых. то не учитываем
      }
    }
  }
  return copyDate;
}

// сравнение 2х дней
export function sameDay(d1, d2) {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

// разница в днях между датами
export function daysDifference(dateStr1, dateStr2) {
  try {
    // Преобразование строк в объекты Date
    const date1 = new Date(dateStr1);
    const date2 = new Date(dateStr2);

    // Вычисление разницы в миллисекундах
    const differenceInTime = date2.getTime() - date1.getTime();

    // Преобразование разницы из миллисекунд в дни
    const differenceInDays = differenceInTime / (1000 * 3600 * 24);

    return differenceInDays;
  } catch (error) {
    return `Ошибка: ${error.message}`;
  }
}

export function resetDateTime(date) {
  const copyDate = date;
  copyDate.setHours(0);
  copyDate.setMinutes(0);
  copyDate.setSeconds(0);
  return copyDate;
}

// разница в днях между датами без выходных
export function differenceDaysWithoutWeekends(dateStr1, dateStr2, holidays) {
  // Преобразование строк в объекты Date
  let date1 = new Date(dateStr1);
  let date2 = new Date(dateStr2);
  let cntDay = 0;

  date1 = resetDateTime(date1);
  date2 = resetDateTime(date2);

  // Вычисление разницы в миллисекундах
  const differenceInTime = date2.getTime() - date1.getTime();
  if (differenceInTime < 0) {
    date2 = new Date(dateStr1);
    date1 = new Date(dateStr2);
    date2 = resetDateTime(date1);
    date1 = resetDateTime(date2);
  }
  while (date2 > date1) {
    date1.setDate(date1.getDate() + 1);
    const holiday = isHoliday(format(date1, 'yyyy-MM-dd'), holidays);
    if (!holiday) cntDay += 1;
  }
  return cntDay;
}

export default {};
