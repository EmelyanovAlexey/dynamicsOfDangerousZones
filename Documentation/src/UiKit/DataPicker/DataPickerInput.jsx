/* eslint-disable consistent-return */
/* eslint-disable no-debugger */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ru from 'date-fns/locale/ru';
import {
  format,
  setHours,
  setMinutes,
  isBefore,
  isAfter,
  formatISO,
} from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import clsx from 'clsx';
import InputMask from 'react-input-mask';
import styles from './DataPicker.module.css';
import { getListHoliday, getTextDateForInput } from './Utils';

import { getIsWeekday } from '../../Utils/getDate';

// Components
import HeaderPicker from './part/HeaderPicker';
import Glyph from '../Glyph';

// Styles
import './DataPicker.css';

registerLocale('ru', ru);

/**
 * Дата пикер с функцией ввода даты вручную
 *
 * @param {String} className класс стиля
 * @param {String} label заголовок стиля
 * @param {String} placeholder placeholder
 * @param {String} formatDate формат даты
 * @param {Date} valueDate дата
 * @param {Date} maxDate максимальная дата
 * @param {Date} minDate минимальная дата
 * @param {Date} maxDateSelected  исключение все что раньше данной даты можно выбрать,
 *                                но дата исключение
 * @param {Boolean} isClear флаг чистки (крестик)
 * @param {Boolean} isWeekday есть ли возможность выбора выходных
 * @param {Boolean} isExcludeDates
 * @param {Boolean} isTime флаг выбора времени
 * @param {Array} holidays список исключений дат (производственные выходные)
 * @param {Function} onChange функция для обновления выбранного времени
 */
function DataPickerInput({
  className,
  valueDate,
  label,
  placeholder,
  isTime,
  maxDate,
  minDate,
  rangeDate,
  maxDateSelected,
  isClear,
  onChange,
  isWeekday,
  isExcludeDates,
  holidays,
}) {
  const [curDate, setCurDate] = useState(valueDate);
  const [curDateText, setCurDateText] = useState(
    getTextDateForInput(valueDate),
  );
  const [textError, setTextSet] = useState(null);
  const [yearSave, setYear] = useState(
    curDate === null ? new Date().getFullYear() : curDate.getFullYear(),
  );

  // изменение времени
  const onChangeDate = (newDate) => {
    setCurDate(newDate);
    if (newDate !== null) {
      const curDateCopy = newDate;
      onChange(curDateCopy.toISOString());
      setCurDateText(getTextDateForInput(newDate));
      return;
    }
    setCurDateText('');
    onChange('');
  };

  // получить текст даты для поля ввода
  function setDateText(value) {
    if (value.indexOf('_') === -1) {
      const textSplit = value.split('.');
      if (textSplit.length !== 3) return;
      const date = new Date(
        Number(textSplit[2]),
        Number(textSplit[1]) - 1,
        Number(textSplit[0]),
      );

      if (isWeekday || isExcludeDates) {
        const holidayCopy = isExcludeDates
          ? holidays.concat(
              getListHoliday(yearSave).concat(getListHoliday(yearSave + 1)),
            )
          : holidays;
        const findIsHoliday = holidayCopy.find(
          (holidayItem) =>
            format(holidayItem, 'dd-MM-yyyy') === format(date, 'dd-MM-yyyy'),
        );
        if (findIsHoliday !== undefined) {
          setCurDateText('');
          setTextSet('Вы ввели выходной день');
          return;
        }
      }

      if (maxDate !== null && date > maxDate) {
        setCurDateText('');
        setTextSet(
          `Вы ввели дату превышающий диапазон ${format(maxDate, 'dd-MM-yyyy')}`,
        );
        return;
      }

      onChangeDate(date);
    }
    setCurDateText(value);
  }

  // получить стилистику ячейки дня ранее опр даты
  const getDayClassName = (date) => {
    if (maxDateSelected === null) return undefined;
    if (
      isBefore(date, maxDateSelected) &&
      holidays.filter(
        (holiday) =>
          formatISO(holiday).slice(0, 10) === formatISO(date).slice(0, 10),
      ).length === 0
    ) {
      return styles.red_day;
    }
    if (rangeDate !== null) {
      if (isAfter(date, rangeDate[0]) && isBefore(date, rangeDate[1])) {
        return styles.no_click;
      }
    }
    return '';
  };

  useEffect(() => {
    setCurDate(valueDate);
    setCurDateText(getTextDateForInput(valueDate));
  }, [valueDate]);

  useEffect(() => {
    if (textError) {
      const timer = setTimeout(() => {
        setTextSet(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [textError]);

  return (
    <div>
      {textError !== null && (
        <div className={styles.error_holiday}>{textError}</div>
      )}
      <DatePicker
        startDate={curDate}
        selected={curDate}
        onChange={(newDate, el) => {
          if (el.type !== 'change') {
            onChangeDate(newDate);
          }
        }}
        dateFormat="yyyy-mm-dd hh:mm aa"
        locale="ru"
        isClearable
        minDate={minDate}
        maxDate={maxDate}
        filterDate={isWeekday ? getIsWeekday : null}
        excludeDates={
          isExcludeDates
            ? holidays.concat(
                getListHoliday(yearSave).concat(getListHoliday(yearSave + 1)),
              )
            : holidays
        }
        customInput={
          <div
            className={clsx([
              'data_picker',
              styles.data_picker_input_block,
              className,
            ])}
          >
            {label && <div className="data_picker_label">{label}</div>}
            <div className="data_picker_input">
              <InputMask
                className={clsx([
                  styles.data_picker_input,
                  !isClear && styles.data_picker_input_full,
                ])}
                mask="99.99.9999"
                placeholder={placeholder}
                value={curDateText}
                onChange={(value) => setDateText(value.target.value)}
              />
              <button
                type="button"
                className={curDate === null ? 'calendar' : 'delete'}
                onClick={() => {
                  if (curDate !== null) {
                    onChangeDate(null);
                  }
                }}
              >
                {curDate === null ? (
                  <Glyph className="calendar_icon" name="Calendar" />
                ) : (
                  isClear && <Glyph className="delete_icon" name="Cross" />
                )}
              </button>
            </div>
          </div>
        }
        renderCustomHeader={({
          date,
          changeYear,
          changeMonth,
          decreaseMonth,
          increaseMonth,
        }) => (
          <HeaderPicker
            date={date}
            onMonthChange={(index) => changeMonth(index)}
            onYearChange={(year) => {
              changeYear(year);
              setYear(year);
            }}
            onNextMonth={() => {
              if (date.getMonth() === 11) setYear(yearSave + 1);
              increaseMonth();
            }}
            onPrevMonth={() => {
              if (date.getMonth() === 0) setYear(yearSave - 1);
              decreaseMonth();
            }}
          />
        )}
        showTimeInput={isTime}
        timeInputLabel="Время"
        maxTime={setHours(setMinutes(new Date(), 30), 20)}
        dayClassName={getDayClassName}
      />
    </div>
  );
}

DataPickerInput.propTypes = {
  className: PropTypes.string,
  valueDate: PropTypes.shape(Date),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isTime: PropTypes.bool,
  maxDate: PropTypes.shape(Date),
  minDate: PropTypes.shape(Date),
  rangeDate: PropTypes.shape(Date),
  maxDateSelected: PropTypes.shape(Date),
  isClear: PropTypes.bool,
  isWeekday: PropTypes.bool,
  isExcludeDates: PropTypes.bool,
  onChange: PropTypes.func,
  holidays: PropTypes.arrayOf(PropTypes.string),
};

DataPickerInput.defaultProps = {
  className: '',
  valueDate: null,
  label: '',
  placeholder: '',
  isTime: false,
  maxDate: null,
  minDate: null,
  rangeDate: null,
  maxDateSelected: null,
  isClear: false,
  isWeekday: false,
  isExcludeDates: false,
  onChange: () => {},
  holidays: [],
};

export default DataPickerInput;
