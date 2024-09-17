import React from 'react';
import PropTypes from 'prop-types';
import { joinClassNames } from '../../Utils';

import './Textbox.css';

function Textbox({
  className,
  value,
  defaultValue,
  type,
  list,
  min,
  onChange,
  onBlur,
  disabled = false,
  name,
}) {
  return (
    <input
      className={joinClassNames(['textbox', className])}
      type={type}
      list={list}
      value={value}
      min={min}
      defaultValue={defaultValue}
      onChange={onChange}
      onBlur={onBlur}
      disabled={disabled}
      name={name}
    />
  );
}

Textbox.propTypes = {
  className: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  type: PropTypes.string,
  list: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  disabled: PropTypes.bool,
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

Textbox.defaultProps = {
  className: undefined,
  value: undefined,
  defaultValue: undefined,
  list: undefined,
  name: undefined,
  type: 'text',
  disabled: false,
  onChange: undefined,
  onBlur: undefined,
  min: undefined,
};

export default Textbox;
