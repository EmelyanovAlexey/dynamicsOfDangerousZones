/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ru from 'date-fns/locale/ru';
import { format, setHours, setMinutes } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import clsx from 'clsx';
import { getListHoliday } from './Utils';

import { getIsWeekday } from '../../Utils/getDate';

// Components
import HeaderPicker from './part/HeaderPicker';
import Glyph from '../Glyph';

// Styles
import './DataPicker.css';

registerLocale('ru', ru);

function DataPicker({
  className,
  valueDate,
  label,
  placeholder,
  formatDate,
  isTime,
  isYear,
  maxDate,
  minDate,
  isClear,
  onChange,
  isWeekday,
  isExcludeDates,
  holidays,
}) {
  const [curDate, setCurDate] = useState(valueDate);
  const [yearSave, setYear] = useState(
    curDate === null ? new Date().getFullYear() : curDate.getFullYear(),
  );

  // изменение времени
  const onChangeDate = (newDate) => {
    setCurDate(newDate);
    if (newDate !== null) {
      const curDateCopy = newDate;
      onChange(curDateCopy.toISOString());
      return;
    }
    setCurDate(null);
    onChange('');
  };

  useEffect(() => {
    setCurDate(valueDate);
  }, [valueDate]);

  return (
    <DatePicker
      startDate={curDate}
      selected={curDate}
      onChange={(newDate) => onChangeDate(newDate)}
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
        <div className={clsx(['data_picker', className])}>
          {label && <div className="data_picker_label">{label}</div>}
          <div className="data_picker_input">
            <p>
              {curDate !== null
                ? format(
                    curDate,
                    formatDate === undefined ? 'dd.MM.yyyy' : formatDate,
                  )
                : placeholder}
            </p>

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
    />
  );
}

DataPicker.propTypes = {
  className: PropTypes.string,
  valueDate: PropTypes.shape(Date),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  formatDate: PropTypes.string,
  isTime: PropTypes.bool,
  isYear: PropTypes.bool,
  maxDate: PropTypes.shape(Date),
  minDate: PropTypes.shape(Date),
  isClear: PropTypes.bool,
  isWeekday: PropTypes.bool,
  isExcludeDates: PropTypes.bool,
  onChange: PropTypes.func,
  holidays: PropTypes.arrayOf(PropTypes.string),
};

DataPicker.defaultProps = {
  className: '',
  valueDate: null,
  label: '',
  placeholder: '',
  formatDate: undefined,
  isTime: false,
  isYear: false,
  maxDate: null,
  minDate: null,
  isClear: false,
  isWeekday: false,
  isExcludeDates: false,
  onChange: () => {},
  holidays: [],
};

export default DataPicker;
