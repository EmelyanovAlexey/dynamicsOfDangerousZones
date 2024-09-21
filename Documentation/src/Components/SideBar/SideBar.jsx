/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { ROUTER_LIST } from '../../Shered/const';
import Glyph from '../Glyph';

import styles from './ContentSlider.module.css';

function ContentSlider() {
  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <img src="../../../Img/logo.png" alt="logo" />
      </div>

      <div className={styles.list}>
        {ROUTER_LIST.map((link) => (
          <NavLink
            key={link.id}
            to={link.href}
            className={styles.item_link}
            activeClassName={styles.item_link_active}
          >
            {link.icon !== undefined && (
              <Glyph className={styles.icon} name={link.icon} />
            )}
            {link.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

export default ContentSlider;
