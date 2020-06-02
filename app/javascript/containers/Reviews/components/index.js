import React from 'react';
import Modal from 'components/Modal';
import WarningModal from 'components/WarningModal';
import StarInput from 'components/StarInput';

function ReviewsComponent(props) {
  const {
    isVisible,
    onClose,
    ratingError,
    handleSubmit,
    handleChange,
    handleClick,
    userId,
    stars,
    numUserRatings,
  } = props;
  const showError = ratingError.length > 0;

  if (!userId) {
    return (
      <WarningModal
        mainText="Please sign in"
        confirmText="Sign In"
        href="/sessions/new"
        onClose={onClose}
        isVisible={isVisible}
      />
    )
  }

  return (
    <React.Fragment>
      <Modal isVisible={isVisible} onClose={onClose}>
        {numUserRatings === 2 ? (
          <Modal.Body className="modal-warning">
            <i className="fas fa-radiation"></i>
            <p>You only get two reviews per park. Now go skate!</p>
            <i className="fas fa-radiation"></i>
          </Modal.Body>
        ) : (
          <form onSubmit={handleSubmit} className="review-form">
            <Modal.Body>
              <StarInput
                stars={stars}
                handleClick={handleClick}
                showError={showError}
              />
              <p className={`error-message-v2 ${showError && 'visible'}`}>{ratingError}</p>
              <textarea onChange={handleChange} />
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
    </React.Fragment>
  );
};

export default props => <ReviewsComponent {...props} />
