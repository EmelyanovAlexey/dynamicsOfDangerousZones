/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { ROUTER_LIST } from '../../Shered/const';
// import PropTypes from 'prop-types';

import styles from './SideBar.module.css';

function SideBar() {
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
            {link.title}
          </NavLink>
        ))}
      </div>
    </div>
  );
}

{
  /* <img
              className={styles.navIcon}
              src={require(`../../Assets/images/${navItem.urlIcon}`)}
              alt={navItem.urlIcon}
            /> */
}

export default SideBar;
