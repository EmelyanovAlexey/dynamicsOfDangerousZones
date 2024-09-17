import './Tooltip.css';

import React from 'react';
import PropTypes from 'prop-types';

function Tooltip({ text }) {
  return <div className="tooltip">{text}</div>;
}

Tooltip.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Tooltip;
