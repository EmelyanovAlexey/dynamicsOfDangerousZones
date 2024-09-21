/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './ContentSlider.module.css';

function ContentSlider({ className, label, max, min, step, onChange, value }) {
  const handleSliderChange = (event) => {
    onChange(Number(event.target.value));
  };

  return (
    <div className={styles.root}>
      <div className={styles.label}>{label}</div>
      <input
        id="content-slider"
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleSliderChange}
        className={styles.input}
      />
    </div>
  );
}

ContentSlider.propTypes = {
  className: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number,
  onChange: PropTypes.func,
};

ContentSlider.defaultProps = {
  className: undefined,
  label: undefined,
  value: 1,
  max: 5,
  min: 1,
  step: 1,
  onChange: () => {},
};

export default ContentSlider;
