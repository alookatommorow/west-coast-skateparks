import React, { createContext, useContext } from "react";
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import ModalComponent from './components';
import styles from 'styles/modal.module.scss';
import { classNames } from 'utils/styles';

const modalContext = createContext();

export default function Modal(props) {
  const { isVisible, ...otherProps } = props;

  return (
    <TransitionGroup component={null}>
      {isVisible && (
        <CSSTransition timeout={300} classNames={{ ...styles }}>
          <ModalComponent styles={styles} context={modalContext} {...otherProps} />
        </CSSTransition>
      )}
    </TransitionGroup>
  );
}

Modal.Header = function ModalHeader(props) {
  return <div className={styles.modalHeader}>{props.children}</div>;
};

Modal.Body = function ModalBody(props) {
  const { className, children } = props;

  return <div className={classNames(styles.modalBody, className)}>{children}</div>;
};

Modal.Footer = function ModalFooter(props) {
  return <div className={styles.modalFooter}>{props.children}</div>;
};

Modal.Footer.CloseBtn = function CloseBtn() {
  const { onClose } = useContext(modalContext);
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
