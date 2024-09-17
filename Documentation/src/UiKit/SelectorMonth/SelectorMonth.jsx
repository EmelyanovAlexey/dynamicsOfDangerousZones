/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { formatISO } from 'date-fns';

import Glyph from '../Glyph';

import './SelectorMonth.css';

/**
 * Селектор выбора месяца
 *
 *
 */
function SelectorMonth({ changeDate, date }) {
  const curDate = new Date(date);
  const [selectMonth, setSelectMonth] = React.useState(curDate.getMonth());
  const [visibleMonth, setVisibleMonth] = React.useState(curDate.getMonth());
  const month = [
    {
      id: 0,
      text: 'Январь',
    },
    {
      id: 1,
      text: 'Февраль',
    },
    {
      id: 2,
      text: 'Март',
    },
    {
      id: 3,
      text: 'Апрель',
    },
    {
      id: 4,
      text: 'Май',
    },
    {
      id: 5,
      text: 'Июнь',
    },
    {
      id: 6,
      text: 'Июль',
    },
    {
      id: 7,
      text: 'Август',
    },
    {
      id: 8,
      text: 'Сентябрь',
    },
    {
      id: 9,
      text: 'Октябрь',
    },
    {
      id: 10,
      text: 'Ноябрь',
    },
    {
      id: 11,
      text: 'Декабрь',
    },
  ];

  function getVisibleClass(idItem) {
    if (visibleMonth === idItem) {
      return 'SelectorMonth_btn__visible';
    }
    if (idItem - 1 !== -2 && visibleMonth - 1 === idItem) {
      return 'SelectorMonth_btn__visible';
    }
    return 'SelectorMonth_btn__noVisible';
  }

  return (
    <div className="SelectorMonth">
      <div className="SelectorMonth_container">
        <button
          type="button"
          className={`SelectorMonth_btn__arrow ${
            visibleMonth === 1 || curDate.getMonth() === 0 ? 'noClick' : ''
          }`}
          onClick={() => {
            setVisibleMonth(visibleMonth - 1);
          }}
        >
          <Glyph name="Chevron" />
        </button>
        {month.map((btn) => (
          <button
            key={btn.id}
            type="button"
            className={`${
              btn.id === selectMonth
                ? 'SelectorMonth_btn__active'
                : 'SelectorMonth_btn__noActive'
            } ${getVisibleClass(btn.id)}`}
            onClick={() => {
              setSelectMonth(btn.id);
              const selectMouth = new Date();
              selectMouth.setMonth(btn.id);
              changeDate('Mouth', formatISO(selectMouth));
            }}
          >
            {btn.text}
          </button>
        ))}
        <button
          type="button"
          className={`SelectorMonth_btn__arrow ${
            visibleMonth === 11 ||
            visibleMonth === curDate.getMonth() + 1 ||
            curDate.getMonth() === 0
              ? 'noClick'
              : ''
          }`}
          onClick={() => {
            setVisibleMonth(visibleMonth + 1);
          }}
        >
          <Glyph name="Chevron" />
        </button>
      </div>
    </div>
  );
}

SelectorMonth.propTypes = {
  changeDate: PropTypes.func,
  date: PropTypes.instanceOf(new Date()),
};

SelectorMonth.defaultProps = {
  changeDate: () => {},
  date: new Date(),
};

export default SelectorMonth;
