/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useRef, useState } from 'react';
import reactDom from 'react-dom';
import PropTypes from 'prop-types';

import { joinClassNames } from '../../Utils';

import './Modal.css';
import { ModalContext } from './ModalContext';
import Glyph from '../Glyph';

function Modal({ className, title, children, onModalClose = () => {} }) {
  const [isShown, setIsShown] = useState(true);
  const modalAreaRef = useRef(document.querySelector('#root_modals'));

  return reactDom.createPortal(
    <ModalContext.Provider
      value={{
        onClose: () => setIsShown(false),
      }}
    >
      <div
        className={joinClassNames([
          'modal',
          { 'modal--hidden': !isShown },
          // className,
        ])}
        onAnimationEnd={() => {
          if (!isShown) onModalClose();
        }}
      >
        <div className={joinClassNames(['Modal', className])}>
          <div className="Modal_header">
            <h2>{title}</h2>
            {onModalClose !== null && (
              <button type="button" onClick={() => onModalClose()}>
                <Glyph name="Cross" className="Modal_close" />
              </button>
            )}
          </div>

          <div className="Modal_content">{children}</div>
        </div>
      </div>
    </ModalContext.Provider>,
    modalAreaRef.current,
  );
}

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  onModalClose: PropTypes.func,
};

Modal.defaultProps = {
  className: undefined,
  children: undefined,
  onModalClose: null,
};

export default Modal;
