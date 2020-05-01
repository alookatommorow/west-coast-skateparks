import React, { useState, useEffect } from 'react';
import Modal from 'components/Modal';

function WarningModal(props) {
  const { isVisible, onClose, text } = props;

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      <Modal.Body className="modal-warning">
        <i className="fas fa-radiation"></i>
        <p>{text}</p>
        <i className="fas fa-radiation"></i>
      </Modal.Body>
      <Modal.Footer>
        <Modal.Footer.CloseBtn />
        <a href="/sessions/new" className="basic-button regular">
          sign in
        </a>
      </Modal.Footer>
    </Modal>
  );
}

export default props => <WarningModal {...props} />