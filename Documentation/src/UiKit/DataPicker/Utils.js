/* eslint-disable no-debugger */
import { format, formatISO } from 'date-fns';
import Holidays from 'date-holidays';

// получить текст даты
export function getTextDate(dateStart, dateEnd) {
  const start = format(dateStart, 'dd.MM.yyyy');
  const finish = format(dateEnd, 'dd.MM.yyyy');
  if (start === finish) {
    return start;
  }
  return `${start} - ${finish}`;
}

// проверка дат без времени
export function isEquallyDate(dateS, dateE) {
  if (formatISO(dateS).slice(0, 10) === formatISO(dateE).slice(0, 10)) {
    return true;
  }
  return false;
}

// возвращаем какие сутки были выбраны
export function getTextSelector(dateS, dateE) {
  if (dateS === null || dateE === null) return 'Период';
  if (isEquallyDate(dateS, dateE)) {
    const curDate = new Date();
    if (isEquallyDate(dateS, curDate)) return 'Сегодня';
    curDate.setHours(curDate.getHours() - 24);
    if (isEquallyDate(dateS, curDate)) return 'Вчера';
    return 'Сутки';
  }
  return 'Период';
}

export function getListHoliday(year) {
  const holidays = new Holidays('RU');
  return holidays.getHolidays(year).map((holiday) => {
    return new Date(holiday.date);
  });
}

export function getTextDateForInput(date) {
  if (date === undefined || date === null) {
    return '';
  }
  return `${format(date, 'dd.MM.yyyy')}`;
}

export default {};
