import React, { useContext, useEffect, useRef, MouseEvent } from 'react';
import { classNames } from '../../utils/styles';
import styles from '../../styles/modal.module.scss';
import { ModalContext } from './ModalContext';

type ModalComponentProps = {
  children: React.ReactNode;
};

const ModalComponent = ({ children }: ModalComponentProps) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const { onClose, className, fullScreenMobile } = useContext(ModalContext);

  useEffect(() => {
    function keyListener(this: Document, event: KeyboardEvent) {
      const listener = keyListenersMap.get(event.key);
      return listener && listener(event);
    }

    document.addEventListener('keydown', keyListener);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', keyListener);
      document.body.style.overflow = 'auto';
    };
  });

  const handleTabKey = (event: KeyboardEvent) => {
    console.log('tabbing');
    if (modalRef.current) {
      const focasable = modalRef.current.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
      );
      const first = focasable[0] as HTMLElement;
      const last = focasable[focasable.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === first) {
        last.focus();
        return event.preventDefault();
      }

      if (!event.shiftKey && document.activeElement === last) {
        first.focus();
        event.preventDefault();
      }
    }
  };

  const keyListenersMap = new Map([
    ['Escape', onClose],
    ['Tab', handleTabKey],
  ]);

  const handleContentClick = (event: MouseEvent<HTMLDivElement>) => {
    if (
      modalRef.current &&
      event.target instanceof Node &&
      modalRef.current.contains(event.target)
    ) {
      return event.stopPropagation();
    }

    onClose?.();
  };

  return (
    <div
      className={styles.modalContainer}
      role="dialog"
      aria-modal="true"
      onClick={handleContentClick}
    >
      <div
        className={classNames(styles.modalContent, className || '', {
          [styles.fullScreenMobile]: Boolean(fullScreenMobile),
        })}
        ref={modalRef}
      >
        <button
          className={classNames(styles.closeBtn, {
            [styles.fullScreenMobile]: !!fullScreenMobile,
          })}
          title="close modal"
          type="button"
          onClick={onClose}
        >
          {fullScreenMobile ? (
            <>
              <i
                className={classNames(
                  'fas',
                  'fa-arrow-left',
                  styles.mobileArrowLeftIcon,
                )}
              ></i>
              <i
                className={classNames(
                  'fas',
                  'fa-times',
                  styles.mobileTimesIcon,
                )}
              ></i>
            </>
          ) : (
            <i className="fas fa-times"></i>
          )}
        </button>
        {children}
      </div>
    </div>
  );
};

export default ModalComponent;
