/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import Glyph from '../../Glyph';

import '../DataPicker.css';

/**
 *
 *
 */
function HeaderPicker({
  date,
  onYearChange,
  onMonthChange,
  onPrevMonth,
  onNextMonth,
}) {
  const [isOpenYear, setIsOpenYear] = useState(false);
  const [isOpenMount, setIsOpenMount] = useState(false);

  const range = (start, end) =>
    Array.from(Array(end - start + 1).keys()).map((x) => x + start);
  const years = range(
    new Date().getFullYear() - 14,
    new Date().getFullYear() + 1,
  );
  const months = [
    'Янв',
    'Фев',
    'Мар',
    'Апр',
    'Май',
    'Июн',
    'Июл',
    'Авг',
    'Сен',
    'Окт',
    'Ноя',
    'Дек',
  ];

  return (
    <div className="header_picker_header">
      <div className="header_picker_year">
        <button
          type="button"
          className="header_picker_btnYarn"
          onClick={() => {
            setIsOpenYear(!isOpenYear);
            setIsOpenMount(false);
          }}
        >
          {date.getFullYear()}
          <Glyph
            className={clsx([
              'header_picker_iconYarn',
              isOpenYear && 'header_picker_iconYarnOpen',
            ])}
            name="Chevron"
          />
        </button>
      </div>
      <div className="header_picker_mouth">
        <button
          type="button"
          className="header_picker_btnMount"
          onClick={() => {
            setIsOpenMount(!isOpenMount);
            setIsOpenYear(false);
          }}
        >
          {months[date.getMonth()]}
          <Glyph
            className={clsx([
              'header_picker_iconMount',
              isOpenMount && 'header_picker_iconMountOpen',
            ])}
            name="Chevron"
          />
        </button>
      </div>
      <div className="header_picker_btnsMouthArrow">
        <button
          type="button"
          className={clsx([
            'header_picker_btnMouthArrow',
            'header_picker_btnMouthPrev',
          ])}
          onClick={() => onPrevMonth()}
        >
          <Glyph className="header_picker_iconMouthArrowPrev" name="Chevron" />
        </button>
        <button
          type="button"
          className={clsx([
            'header_picker_btnMouthArrow',
            'header_picker_btnMouthNext',
            // date.getFullYear() === new Date().getFullYear() &&
            //   date.getMonth() === new Date().getMonth() &&
            //   'header_picker_btnDisabled',
          ])}
          onClick={() => onNextMonth()}
        >
          <Glyph className="header_picker_iconMouthArrowNext" name="Chevron" />
        </button>
      </div>

      {isOpenYear && (
        <div className="header_picker_popup">
          <div className="header_picker_popupContent">
            {years.map((year) => (
              <button
                key={year}
                type="button"
                className={clsx([
                  'header_picker_btnPopup',
                  year === date.getFullYear() && 'header_picker_btnPopupChoice',
                ])}
                onClick={() => {
                  onYearChange(year);
                  setIsOpenYear(false);
                }}
              >
                {year}
              </button>
            ))}
          </div>
        </div>
      )}

      {isOpenMount && (
        <div className="header_picker_popup">
          <div className="header_picker_popupContent">
            {months.map((month, index) => (
              <button
                key={month}
                type="button"
                className={clsx([
                  'header_picker_btnPopup',
                  index === date.getMonth() && 'header_picker_btnPopupChoice',
                  // date.getFullYear() === new Date().getFullYear() &&
                  //   index > new Date().getMonth() &&
                  // 'header_picker_btnDisabled',
                ])}
                onClick={() => {
                  onMonthChange(index);
                  setIsOpenMount(false);
                }}
              >
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

HeaderPicker.propTypes = {
  date: PropTypes.shape(Date()),
  onYearChange: PropTypes.func,
  onMonthChange: PropTypes.func,
  onPrevMonth: PropTypes.func,
  onNextMonth: PropTypes.func,
};

HeaderPicker.defaultProps = {
  date: null,
  onYearChange: () => {},
  onMonthChange: () => {},
  onPrevMonth: () => {},
  onNextMonth: () => {},
};

export default HeaderPicker;
