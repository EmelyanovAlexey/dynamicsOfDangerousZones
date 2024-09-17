import React from 'react';
import PropTypes from 'prop-types';
import joinClassNames from '../../Utils/joinClassNames';

import './MarkerSwitcher.css';

function MarkerSwitcher({ checked, className }) {
  return (
    <span
      className={joinClassNames([
        'marker__switcher',
        { 'marker--checked': checked },
        className,
      ])}
    />
  );
}

MarkerSwitcher.propTypes = {
  checked: PropTypes.bool,
  className: PropTypes.string,
};

MarkerSwitcher.defaultProps = {
  checked: false,
  className: '',
};

export default MarkerSwitcher;
