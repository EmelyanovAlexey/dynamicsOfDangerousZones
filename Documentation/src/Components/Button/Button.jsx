import React from 'react';
import PropTypes from 'prop-types';
import { joinClassNames } from '../../Utils';

import './Button.css';

const buttonClassNames = {
  0: '',
  1: 'button--primary',
};

function Button({
  className,
  children,
  disabled = false,
  primary = false,
  submit = false,
  onClick = () => {},
}) {
  return (
    <button
      type={submit ? 'submit' : 'button'}
      className={joinClassNames([
        'button',
        buttonClassNames[Number(primary)],
        className,
      ])}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  primary: PropTypes.bool,
  submit: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  className: '',
  children: 'Кнопка',
  disabled: false,
  primary: false,
  submit: false,
  onClick: () => {},
};

export default Button;
