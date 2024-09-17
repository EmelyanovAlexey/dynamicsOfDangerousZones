/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';

import Button from '../Button';

import './FilterDate.css';

/**
 * Модальное окно формирования отчета
 *
 * @param {Number} filterActive id выбранной даты
 * @param {Function} setFilterActive функция для изменения активного
 * выбранной даты
 */
function FilterDate({ filterActive, setFilterActive }) {
  const list = [
    {
      id: 1,
      text: 'Сутки',
    },
    {
      id: 2,
      text: 'Месяц',
    },
    {
      id: 3,
      text: 'Год',
    },
    {
      id: 4,
      text: 'Период',
    },
  ];

  return (
    <div className="FilterDate">
      {/* <div className="FilterDate_container">
        {list.map((option) => (
          <div key={option.id}>
            <Button
              className={`${
                option.id === filterActive
                  ? 'FilterDate_btn__active'
                  : 'FilterDate_btn__noActive'
              }`}
              onClick={() => setFilterActive(option.id)}
            >
              {option.text}
            </Button>
          </div>
        ))}
      </div> */}
    </div>
  );
}

FilterDate.propTypes = {
  filterActive: PropTypes.number,
  setFilterActive: PropTypes.func,
};

FilterDate.defaultProps = {
  filterActive: null,
  setFilterActive: () => {},
};

export default FilterDate;
