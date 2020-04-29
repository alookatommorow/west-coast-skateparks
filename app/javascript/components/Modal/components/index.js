import React, { useEffect, createRef } from "react";

export default function ModalComponent({ children, onClose, isVisible, height, styles, context }) {
  const modalRef = createRef();

  const keyListener = e => {
    const listener = keyListenersMap.get(e.keyCode);
    return listener && listener(e);
  }

  useEffect(() => {
    console.log(modalRef.current)
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      document.addEventListener('keydown', keyListener);
      console.log('adding')
    }

    return () => {
      console.log('return firing')
      console.log(modalRef.current)
      document.removeEventListener('keydown', keyListener);
      document.body.style.overflow = 'auto';
    }
  }, [isVisible]);

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

  return (
    <div className={styles.modalContainer} role="dialog" aria-modal="true" onClick={handleContentClick}>
      <div className={styles.modalContent} ref={modalRef} style={height && { height: `${height}` }}>
        <context.Provider value={{ onClose }}>
          <button className={styles.closeBtn} title="close modal" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
          {children}
        </context.Provider>
      </div>
    </div>
  );
}