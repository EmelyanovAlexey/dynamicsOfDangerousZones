import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ru from 'date-fns/locale/ru';
import { format, setHours, setMinutes } from 'date-fns';
import DatePicker, { registerLocale } from 'react-datepicker';
import clsx from 'clsx';

// Components
import HeaderPicker from './part/HeaderPicker';
import Glyph from '../Glyph';

// Styles
// import './DataPicker.css';
import './DataPicker.css';

registerLocale('ru', ru);

function DataPickerForFilter({
  className,
  valueDate,
  label,
  placeholder,
  formatDate,
  maxDate,
  onChange,
}) {
  const [curDate, setcurDate] = useState(valueDate);

  // изменение времени
  const onChangeDate = (newDate) => {
    setcurDate(newDate);
    if (newDate !== null) {
      const curDateCopy = newDate;
      onChange(curDateCopy.toISOString());
      return;
    }
    setcurDate(null);
    onChange(null);
  };

  useEffect(() => {
    setcurDate(valueDate);
  }, [valueDate]);

  return (
    <DatePicker
      startDate={curDate}
      selected={curDate}
      onChange={(newDate) => onChangeDate(newDate)}
      dateFormat="yyyy-mm-dd hh:mm aa"
      locale="ru"
      isClearable
      maxDate={maxDate}
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
              onClick={() => onChangeDate(null)}
            >
              {curDate === null ? (
                <Glyph className="calendar_icon" name="Calendar" />
              ) : (
                <Glyph className="delete_icon" name="Cross" />
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
          onYearChange={(year) => changeYear(year)}
          onNextMonth={() => increaseMonth()}
          onPrevMonth={() => decreaseMonth()}
        />
      )}
      maxTime={setHours(setMinutes(new Date(), 30), 20)}
    />
  );
}

DataPickerForFilter.propTypes = {
  className: PropTypes.string,
  valueDate: PropTypes.shape(Date),
  label: PropTypes.string,
  placeholder: PropTypes.string,
  formatDate: PropTypes.string,
  maxDate: PropTypes.shape(Date),
  onChange: PropTypes.func,
};

DataPickerForFilter.defaultProps = {
  className: '',
  valueDate: null,
  label: '',
  placeholder: '',
  formatDate: undefined,
  maxDate: null,
  onChange: () => {},
};

export default DataPickerForFilter;
