import React from 'react';
import PropTypes from 'prop-types';
import joinClassNames from '../../Utils/joinClassNames';
import Glyph from '../Glyph';

import './MarkerCheckbox.css';

function MarkerCheckbox({ checked, className }) {
  return (
    <span
      className={joinClassNames([
        'marker__checkbox',
        { 'marker--checked': checked },
        className,
      ])}
    >
      <Glyph name="Checkmark" className="checkbox__glyph" />
    </span>
  );
}

MarkerCheckbox.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
};

MarkerCheckbox.defaultProps = {
  checked: false,
  className: '',
};

export default MarkerCheckbox;
