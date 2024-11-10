import React from 'react';
import PropTypes from 'prop-types';
import { joinClassNames } from '../../Utils';

import styles from './BlockCopy.module.css';

function BlockCopy({ className }) {
  return (
    <div className={joinClassNames([styles.root, className])}>
      <textarea>текст</textarea>
    </div>
  );
}

BlockCopy.propTypes = {
  className: PropTypes.string,
};

BlockCopy.defaultProps = {
  className: undefined,
};

export default BlockCopy;
