import React from 'react';
import PropTypes from 'prop-types';
import joinClassNames from '../../Utils/joinClassNames';

import './MarkerRadio.css';

function MarkerRadio({ checked, className }) {
  return (
    <span
      className={joinClassNames([
        'marker__radio',
        { 'marker--checked': checked },
        className,
      ])}
    />
  );
}

MarkerRadio.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
};

MarkerRadio.defaultProps = {
  checked: false,
  className: '',
};

export default MarkerRadio;
