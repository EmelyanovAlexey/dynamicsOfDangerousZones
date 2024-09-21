import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import styles from './Panel.module.css';

function Panel({
  className,
  title,
  children,
  TitleBarRightComponent,
  TitleBarLeftComponent,
}) {
  return (
    <div className={clsx([styles.panel, className])}>
      {title || TitleBarLeftComponent || TitleBarRightComponent ? (
        <div className={styles.bar}>
          {title ? <h2 className={styles.title}>{title}</h2> : null}
          <div className={styles.title_left}>{TitleBarLeftComponent}</div>
          <div className={styles.title_right}>{TitleBarRightComponent}</div>
        </div>
      ) : null}
      <div className={styles.body}>{children}</div>
    </div>
  );
}

Panel.propTypes = {
  className: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
  TitleBarLeftComponent: PropTypes.node,
  TitleBarRightComponent: PropTypes.node,
};

Panel.defaultProps = {
  className: undefined,
  title: undefined,
  children: undefined,
  TitleBarLeftComponent: undefined,
  TitleBarRightComponent: undefined,
};

export default Panel;
