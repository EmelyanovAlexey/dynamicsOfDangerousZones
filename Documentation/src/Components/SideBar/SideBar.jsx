/* eslint-disable no-lone-blocks */
/* eslint-disable no-unused-vars */
import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

import { ROUTER_LIST } from '../../Shered/const';
import Glyph from '../Glyph';

import styles from './ContentSlider.module.css';

function ContentSlider({ user }) {
  const role = user?.role === 2 ? 'Admin' : 'User';

  if (user?.role === undefined) {
    return '';
  }

  return (
    <div className={styles.root}>
      <div className={styles.logo}>
        <img src="../../../Img/logo.png" alt="logo" />
      </div>

      <div className={styles.list}>
        {ROUTER_LIST.map((link) =>
          user?.role >= link.role ? (
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
          ) : (
            ''
          ),
        )}
      </div>

      <div className={styles.user}>
        {role}: {user?.email}
        <button
          className={styles.btn_exit}
          type="button"
          onClick={() => {
            localStorage.removeItem('AUTH_DATA');
            window.location.href = '/auth';
          }}
        >
          Выход
        </button>
      </div>
    </div>
  );
}

ContentSlider.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
    role: PropTypes.number,
  }),
};

ContentSlider.defaultProps = {
  user: null,
};

export default ContentSlider;
