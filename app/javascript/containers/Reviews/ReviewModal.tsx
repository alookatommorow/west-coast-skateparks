import React, { FormEvent, ChangeEvent } from 'react';
import { Modal } from '../../components/Modal';
import { WarningModal } from '../../components/WarningModal';
import { StarInput } from '../../components/StarInput';

type ReviewModalProps = {
  isVisible: boolean;
  onClose: () => void;
  error: string;
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  userId?: number;
  stars: number;
  setStars: React.Dispatch<React.SetStateAction<number>>;
  numUserRatings: number;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
};

export const ReviewModal = ({
  isVisible,
  onClose,
  error,
  handleSubmit,
  handleChange,
  setStars,
  userId,
  stars,
  numUserRatings,
}: ReviewModalProps) => {
  const showError = error.length > 0;

  if (!userId) {
    return (
      <WarningModal
        mainText="Please sign in"
        confirmText="Sign In"
        href="/sessions/new"
        onClose={onClose}
        isVisible={isVisible}
      />
    );
  }

  return (
    <Modal isVisible={isVisible} onClose={onClose}>
      {numUserRatings === 2 ? (
        <Modal.Body className="modal-warning">
          <i className="fa-solid fa-radiation"></i>
          <p>You only get two reviews per park. Now go skate!</p>
          <i className="fa-solid fa-radiation"></i>
        </Modal.Body>
      ) : (
        <form onSubmit={handleSubmit} className="review-form">
          <Modal.Body>
            <StarInput
              stars={stars}
              setStars={setStars}
              showError={showError}
            />
            <p className={`error-message-v2 ${showError && 'visible'}`}>
              {error}
            </p>
            <textarea name="review" onChange={handleChange} />
          </Modal.Body>
          <Modal.Footer>
            <Modal.Footer.CloseBtn />
            <button className="basic-button regular" type="submit">
              Submit
            </button>
          </Modal.Footer>
        </form>
      )}
    </Modal>
  );
};
