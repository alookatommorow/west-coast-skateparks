import React from 'react';
import Modal from 'components/Modal';
import WarningModal from 'components/WarningModal';

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
  const maxStars = 5;
  const showError = ratingError.length > 0;

  const renderStars = () => {
    return [...Array(stars)].map((e, i) => (
      <label htmlFor={i + 1} key={`star-${i + 1}`}>
        <input
          type="radio"
          name="rating"
          onChange={handleClick}
          id={i + 1}
          value={i + 1}
          checked={stars === i + 1}
        />
        <i className="star fas fa-star" />
      </label>
    ));
  }

  const renderEmptyStars = () => {
    if (stars > 4) return;

    return [...Array(maxStars - stars)].map((e, i) => (
      <label htmlFor={stars + i + 1} key={`star-${stars + i + 1}`}>
        <input
          type="radio"
          name="stars"
          id={stars + i + 1}
          value={stars + i + 1}
          checked={stars === (stars + i + 1)}
          onChange={handleClick}
        />
        <i className={`star far fa-star ${showError && 'error'}`} />
      </label>
    ));
  }

  if (!userId) {
    return (
      <WarningModal
        mainText="U gotta sign in bitch"
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
              {renderStars()}
              {renderEmptyStars()}
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
