import React, { useEffect, createRef } from 'react';

export default function ModalComponent({ children, onClose, height, styles, context }) {
  const modalRef = createRef();

  useEffect(() => {
    function keyListener(e) {
      const listener = keyListenersMap.get(e.keyCode);
      return listener && listener(e);
    }

    document.addEventListener('keydown', keyListener);

    return () => {
      document.removeEventListener('keydown', keyListener);
      document.body.style.overflow = 'auto';
    }
  });

  const handleTabKey = e => {
    const focasable = modalRef.current.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    const first = focasable[0];
    const last = focasable[focasable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      last.focus();
      return e.preventDefault();
    }

    if (!e.shiftKey && document.activeElement === last) {
      first.focus();
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