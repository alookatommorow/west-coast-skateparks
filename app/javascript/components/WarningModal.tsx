import React from 'react';
import { Modal } from './Modal';

type WarningModalProps = {
  isVisible: boolean;
  onClose: () => void;
  mainText: string;
  confirmText: string;
  href: string;
  onConfirm?: () => void;
};

export const WarningModal = ({
  isVisible,
  onClose,
  mainText,
  confirmText,
  href,
  onConfirm,
}: WarningModalProps) => {
  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Modal.Body className="modal-warning">
        <i className="fa-solid fa-radiation"></i>
        <p>{mainText}</p>
        <i className="fa-solid fa-radiation"></i>
      </Modal.Body>
      <Modal.Footer>
        {href ? (
          <a href={href} className="basic-button regular">
            {confirmText}
          </a>
        ) : (
          <button
            className="basic-button"
            title="close modal"
            onClick={onConfirm}
          >
            Cancel
          </button>
        )}
      </Modal.Footer>
    </Modal>
  );
};
