/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import PropTypes from 'prop-types';
import { formatISO } from 'date-fns';

import Glyph from '../Glyph';

import './SelectorYear.css';

/**
 * Селектор выбора года
 *
 *
 */
function SelectorYear({ changeDate, date }) {
  const curDate = new Date(date);
  const minYear = curDate.getFullYear() - 10;
  const maxYear = curDate.getFullYear();

  const [selectYear, setSelectYear] = React.useState(maxYear);
  const [visibleYear, setVisibleYear] = React.useState(maxYear);
  const years = [visibleYear - 2, visibleYear - 1, visibleYear];

  return (
    <div className="SelectorYear">
      <div className="SelectorYear_container">
        <button
          type="button"
          className={`SelectorYear_btn__arrow ${
            visibleYear - 2 === minYear ? 'noClick' : ''
          }`}
          onClick={() => {
            setVisibleYear(visibleYear - 1);
          }}
        >
          <Glyph name="Chevron" />
        </button>

        {years.map((yearItem, index) => (
          <button
            key={+index}
            type="button"
            className={`${
              yearItem === selectYear
                ? 'SelectorYear_btn__active'
                : 'SelectorYear_btn__noActive'
            } SelectorYear_btn__visible`}
            onClick={() => {
              setSelectYear(yearItem);
              const selectDate = new Date();
              selectDate.setFullYear(yearItem);
              changeDate('Year', formatISO(selectDate));
            }}
          >
            {yearItem}
          </button>
        ))}
        <button
          type="button"
          className={`SelectorYear_btn__arrow ${
            visibleYear === maxYear ? 'noClick' : ''
          }`}
          onClick={() => {
            setVisibleYear(visibleYear + 1);
          }}
        >
          <Glyph name="Chevron" />
        </button>
      </div>
    </div>
  );
}

SelectorYear.propTypes = {
  changeDate: PropTypes.func,
  date: PropTypes.instanceOf(new Date()),
};

SelectorYear.defaultProps = {
  changeDate: () => {},
  date: new Date(),
};

export default SelectorYear;
