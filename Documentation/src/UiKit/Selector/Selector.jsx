/* eslint-disable no-unused-vars */
import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { flushSync } from 'react-dom';

import clsx from 'clsx';
import { useOutsideAlerter } from '../../Hocs/clickOutBlock';

import Glyph from '../Glyph';

import styles from './Selector.module.css';

function Selector({
  className,
  disabled,
  error,
  options,
  selectedOption,
  loading,
  required,
  label,
  search,
  handleSelect,
  setSearchText,
}) {
  const [textInput, setTextInput] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef, (show) => {
    setIsOpen(show);
  });

  const onOptionClicked = (option) => {
    flushSync(() => handleSelect(option));
    setIsOpen(false);
  };

  // поиск на фронте
  function searchOption(text) {
    if (text.replace(/\s+/g, '').length <= 0) {
      return options;
    }
    const newList = options.filter(
      (option) => option.label.search(new RegExp(text, 'i')) !== -1,
    );
    return newList;
  }

  // получить список
  function getOptions() {
    if (setSearchText !== undefined && loading !== undefined) {
      return options;
    }
    return searchOption(textInput);
  }

  return (
    <div className={clsx([styles.root])} ref={wrapperRef}>
      <span className={clsx([styles.label])}>
        <span>{label}</span>
        {required && <span className={styles.required_marker}>*</span>}
      </span>
      <div
        className={clsx([
          styles.select,
          Boolean(error) && styles['--error'],
          disabled && styles['--disabled'],
          className,
        ])}
      >
        <button
          type="button"
          className={styles.selector}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption !== null ? (
            <span className={styles.value}>{selectedOption.label}</span>
          ) : (
            <span className={styles.value} />
          )}

          <div className={clsx([styles.arrow, isOpen && styles.arrowDown])}>
            <Glyph name="Chevron" />
          </div>
        </button>

        {isOpen && (
          <div className={styles.content}>
            <div className={styles.options}>
              {getOptions().map((item) => (
                <button
                  type="button"
                  key={item.value}
                  className={clsx([
                    styles.option,
                    selectedOption.value === item.value && styles.optionActive,
                  ])}
                  onClick={() => onOptionClicked(item)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
      <p className={styles.error}>{error}</p>
    </div>
  );
}

Selector.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  error: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string,
      label: PropTypes.string,
    }),
  ),
  selectedOption: PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  }),
  loading: PropTypes.bool,
  required: PropTypes.bool,
  label: PropTypes.string,
  search: PropTypes.bool,
  handleSelect: PropTypes.func,
  setSearchText: PropTypes.func,
};

Selector.defaultProps = {
  className: '',
  disabled: false,
  error: '',
  options: [],
  selectedOption: null,
  loading: false,
  required: false,
  label: '',
  search: false,
  handleSelect: () => {},
  setSearchText: () => {},
};

export default Selector;
