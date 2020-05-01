import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';

function WarningModal(props) {
  const { isVisible, onClose, mainText, confirmText, href, onConfirm } = props;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Modal.Body className="modal-warning">
        <i className="fas fa-radiation"></i>
        <p>{mainText}</p>
        <i className="fas fa-radiation"></i>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Footer.CloseBtn />
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
}

export default props => <WarningModal {...props} />