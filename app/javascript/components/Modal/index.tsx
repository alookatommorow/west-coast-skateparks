import React, { useContext } from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ModalComponent from './components';
import styles from 'styles/modal.module.scss';
import { classNames } from 'utils/styles';
import { ModalContext, ModalContextProps } from './modalContext';

type ChildrenProps = {
  children: React.ReactNode;
};

type ModalProps = ChildrenProps & ModalContextProps;

type ModalBodyProps = ChildrenProps & {
  className?: string;
};

export const Modal = ({
  onClose,
  isVisible,
  fullScreenMobile,
  className,
  children,
}: ModalProps) => {
  return (
    <TransitionGroup component={null}>
      {isVisible && (
        <CSSTransition timeout={300} classNames={{ ...styles }}>
          <ModalContext.Provider
            value={{ onClose, isVisible, fullScreenMobile, className }}
          >
            <ModalComponent>{children}</ModalComponent>
          </ModalContext.Provider>
        </CSSTransition>
      )}
    </TransitionGroup>
  );
};

const Footer = function ModalFooter({ children }: ChildrenProps) {
  return <div className={styles.modalFooter}>{children}</div>;
};

Modal.Header = function ModalHeader({ children }: ChildrenProps) {
  return <div className={styles.modalHeader}>{children}</div>;
};

Modal.Body = function ModalBody({ className, children }: ModalBodyProps) {
  return (
    <div className={classNames(styles.modalBody, className)}>{children}</div>
  );
};

Modal.Footer = Footer;

Footer.CloseBtn = function CloseBtn() {
  const { onClose } = useContext(ModalContext);

  return (
    <button
      className="basic-button"
      title="close modal"
      type="button"
      onClick={onClose}
    >
      Cancel
    </button>
  );
};
