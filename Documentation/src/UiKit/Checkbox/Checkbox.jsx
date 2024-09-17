/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import './Checkbox.css';

/**
 * Поле ввода
 *
 * @param {String} className название класса
 * @param {String} style стили
 * @param {String} checked флаг активности
 * @param {String} label текст чекбокса
 * @param {Function} onChange фун-я для изменения значения
 */
function Checkbox({ className, style, isChecked, label, onChange }) {
  function getCheckBox() {
    if (isChecked) {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="0.5"
            y="0.5"
            width="19"
            height="19"
            rx="0.5"
            fill="#F7F7F7"
            stroke="#EBEBEB"
          />
          <path d="M4 9.5L8.78947 14L17 5" stroke="#003c7c" strokeWidth="2" />
        </svg>
      );
    }
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.5"
          y="0.5"
          width="19"
          height="19"
          rx="0.5"
          fill="#F7F7F7"
          stroke="#EBEBEB"
        />
      </svg>
    );
  }

  return (
    <div className="Checkbox">
      <button type="button" onClick={() => onChange()}>
        {getCheckBox()}
      </button>
      {label && <p>{label}</p>}
    </div>
  );
}

Checkbox.propTypes = {
  className: PropTypes.string,
  style: PropTypes.string,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  onChange: PropTypes.func,
};

Checkbox.defaultProps = {
  className: '',
  style: '',
  isChecked: false,
  label: '',
  onChange: () => {},
};

export default Checkbox;
