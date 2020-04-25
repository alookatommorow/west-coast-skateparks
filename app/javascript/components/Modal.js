import React, { createContext, useContext, useEffect, createRef } from "react";
import { createPortal } from "react-dom";

import styles from '../styles/modal.module.scss';

const modalContext = createContext();

export default function Modal({ children, onClose, isVisible, height }) {
  const modalRef = createRef();

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    }
    document.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('keydown', keyListener);
      document.body.style.overflow = 'auto';
    }
  });

  const handleTabKey = e => {
    const focusableModalElements = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const firstElement = focusableModalElements[0];
    const lastElement =
      focusableModalElements[focusableModalElements.length - 1];

    if (!e.shiftKey && document.activeElement !== firstElement) {
      firstElement.focus();
      return e.preventDefault();
    }

    if (e.shiftKey && document.activeElement !== lastElement) {
      lastElement.focus();
      e.preventDefault();
    }
  };

  const keyListenersMap = new Map([[27, onClose], [9, handleTabKey]]);

  const handleContentClick = e => {
    if (modalRef.current.contains(e.target)) {
      return e.stopPropagation();
    }

    onClose();
  }

  return isVisible && (
    createPortal(
      <div className={styles.modalContainer} role="dialog" aria-modal="true" onClick={handleContentClick}>
        <div className={styles.modalContent} ref={modalRef} style={height && {height: `${height}`}}>
          <modalContext.Provider value={{ onClose }}>
            <button className={styles.closeBtn} title="close modal" onClick={onClose}>
              <i className="fas fa-times"></i>
            </button>
            {children}
          </modalContext.Provider>
        </div>
      </div>,
      document.body
  ));
}

Modal.Header = function ModalHeader(props) {
  return <div className={styles.modalHeader}>{props.children}</div>;
};

Modal.Body = function ModalBody(props) {
  return <div className={`${styles.modalBody} ${props.className}`}>{props.children}</div>;
};

Modal.Footer = function ModalFooter(props) {
  return <div className={styles.modalFooter}>{props.children}</div>;
};

Modal.Footer.CloseBtn = function CloseBtn(props) {
  const { onClose } = useContext(modalContext);
  return (
    <button
      {...props}
      className={styles.closeBtn}
      title="close modal"
      onClick={onClose}
    />
  );
};
