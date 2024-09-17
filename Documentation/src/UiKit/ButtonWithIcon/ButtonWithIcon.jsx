import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';

import Button from '../Button';
import Glyph from '../Glyph';

import './ButtonWithIcon.css';

function ButtonWithIcon({
  className,
  glyphClassName,
  primary,
  glyphNameLeft,
  glyphNameRight,
  children,
  title,
  onClick = () => {},
  disabled,
}) {
  const glyphClass = `button_with_icon__glyph ${glyphClassName}`;

  return (
    <Button
      className={clsx(
        'button_with_icon',
        {
          'button_with_icon--left': glyphNameLeft != null,
          'button_with_icon--right': glyphNameRight != null,
          'button_with_icon--no_child': children == null,
        },
        className,
      )}
      primary={primary}
      onClick={onClick}
      title={title}
      disabled={disabled}
    >
      {glyphNameLeft ? (
        <Glyph name={glyphNameLeft} className={glyphClass} />
      ) : null}
      {children}
      {glyphNameRight ? (
        <Glyph name={glyphNameRight} className={glyphClass} />
      ) : null}
    </Button>
  );
}

ButtonWithIcon.propTypes = {
  className: PropTypes.string,
  glyphClassName: PropTypes.string,
  primary: PropTypes.bool,
  glyphNameLeft: PropTypes.string,
  glyphNameRight: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  title: PropTypes.string,
  disabled: PropTypes.bool,
};
ButtonWithIcon.defaultProps = {
  className: '',
  glyphClassName: '',
  primary: undefined,
  glyphNameLeft: '',
  glyphNameRight: '',
  children: undefined,
  onClick: () => {},
  title: '',
  disabled: undefined,
};

export default ButtonWithIcon;
