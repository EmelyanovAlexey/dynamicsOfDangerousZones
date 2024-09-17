/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/control-has-associated-label */

import React, { useEffect, useState } from 'react';
import ru from 'date-fns/locale/ru';
import DatePicker, { registerLocale } from 'react-datepicker';

// Utils
import PropTypes from 'prop-types';
import { getTextDate } from './Utils';

// Components
import HeaderPicker from './part/HeaderPicker';
import Glyph from '../Glyph';

// Styles
import './DataPicker.css';
import styles from './DataPicker.module.css';

registerLocale('ru', ru);

function DataPickerRange({ datesValue, onChange }) {
  const [dates, setDate] = useState([datesValue[0], datesValue[1]]);
  const [isOpen, setIsOpen] = useState(false);

  const onChangeDate = (newDate) => {
    setDate(newDate);
    if (newDate[0] !== null && newDate[1] !== null) {
      const dateS = newDate[0];
      const dateF = newDate[1];
      dateF.setHours(23);
      dateF.setMinutes(59);
      onChange([dateS.toISOString(), dateF.toISOString()]);
    }
  };

  useEffect(() => {
    setDate(datesValue);
  }, [datesValue]);

  return (
    <DatePicker
      startDate={dates[0]}
      endDate={dates[1]}
      onChange={(newDate) => onChangeDate(newDate)}
      selectsRange
      selected={dates[0]}
      dateFormat="yyyy-mm-dd h:mm aa"
      locale="ru"
      isClearable
      onClickOutside={() => {
        setIsOpen(false);
      }}
      customInput={
        <div className={styles.root}>
          {dates[0] !== null && dates[1] !== null ? (
            <div className={styles.curDateRange}>
              <p>{getTextDate(dates[0], dates[1])}</p>
              <button
                className={styles.deleteRange}
                type="button"
                onClick={() => {
                  setDate([null, null]);
                  onChange([null, null]);
                }}
              >
                <Glyph name="Cross" />
              </button>
            </div>
          ) : (
            <div className={styles.curDateRange}>
              <p />
              <button
                className={styles.button_calendar}
                type="button"
                onClick={() => onChangeDate([null, null])}
              >
                <Glyph className={styles.calendar_icon} name="Calendar" />
              </button>
            </div>
          )}
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
    />
  );
}
DataPickerRange.propTypes = {
  datesValue: PropTypes.arrayOf(Date),
  onChange: PropTypes.func,
};

DataPickerRange.defaultProps = {
  datesValue: null,
  onChange: () => {},
};
export default DataPickerRange;
