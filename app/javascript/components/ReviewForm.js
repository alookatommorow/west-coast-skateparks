import React, { useState, useEffect } from 'react';
import useToggle from '../hooks/useToggle';
import Modal from './Modal';

function ReviewForm(props) {
  const { skateparkId, userId, ratings } = props;

  const maxStars = 5;
  // TODO: Rename to stars and figure out how maxStars fits in
  const [rating, setRating] = useState(0);
  const [ratingError, setRatingError] = useState('');
  const [review, setReview] = useState(null);
  const showError = ratingError.length > 0;
  const {
    isShowing: modalIsShowing,
    toggle: toggleModalIsShowing,
  } = useToggle(false);

  useEffect(() => {
    if (rating > 0 && ratingError !== '') {
      setRatingError('');
    }
  }, [rating]);

  useEffect(() => {
    if (!modalIsShowing) {
      setRatingError('');
      setRating(0);
      setReview(null);
    }
  }, [modalIsShowing]);

  const handleSubmit = event => {
    console.log('submitting')
    event.preventDefault();

    if (isValid()) {
      $.ajax({
        url: `/ratings`,
        method: 'POST',
        data: {
          stars: rating,
          review,
          skatepark_id: skateparkId,
          user_id: userId,
        }
      }).done(response => {
        ratings.unshift(response)
        clearForm()
        toggleModalIsShowing();
      });
    }
  }

  const clearForm = () => {
    setRating(0);
    setReview('');
  }

  const handleClick = event => {
    const {currentTarget: { value }} = event;
    let newRating = parseInt(value, 10);

    if (newRating === rating) {
      newRating -= 1;
    }

    setRating(newRating);
  };

  const handleChange = event => setReview(event.target.value);

  const isValid = () => {
    let valid = true;

    if (rating < 1) {
      setRatingError('Please add a rating');
      valid = false;
    }

    return valid;
  }

  const renderStars = () => {
    return [...Array(rating)].map((e, i) => (
      <label htmlFor={i + 1} key={`star-${i + 1}`}>
        <input
          type="radio"
          name="rating"
          onChange={handleClick}
          id={i + 1}
          value={i + 1}
          checked={rating === i + 1}
        />
        <i className="star fas fa-star" />
      </label>
    ));
  }

  const renderEmptyStars = () => {
    if (rating > 4) return;

    return [...Array(maxStars - rating)].map((e, i) => (
      <label htmlFor={rating + i + 1} key={`star-${rating + i + 1}`}>
        <input
          type="radio"
          name="rating"
          id={rating + i + 1}
          value={rating + i + 1}
          checked={rating === (rating + i + 1)}
          onChange={handleClick}
        />
        <i className={`star far fa-star ${showError && 'error'}`} />
      </label>
    ));
  }

  const sortedRatings = () => {
    let numUserRatings = 0;
    const userRatings = [];
    const otherRatings = [];

    ratings.map(rating => {
      if (userId && rating.author_id === userId) {
        numUserRatings += 1;
        userRatings.push(rating);
      } else {
        otherRatings.push(rating);
      }
    });

    return {
      numUserRatings,
      allRatings: userRatings.concat(otherRatings),
    };
  }

  const { numUserRatings, allRatings } = sortedRatings();

  return (
    <React.Fragment>
      <div className="review-header-container">
        <h4>Reviews</h4>
        <div className="write-review-button" role="button" tabIndex="0" onClick={toggleModalIsShowing}>
          <i className="fas fa-comments"></i>
          <p>Write a review</p>
        </div>
      </div>
      {allRatings.length > 0 ? (
        allRatings.map((review, i) => (
          <div className="comment" key={`review-${i}`}>
            <div className="avatar">
              <img src={`${review.avatar}`} />
            </div>
            <div className="content">
              <div className="headers">
                <p className="author">{review.author}</p>
                <p className="date">{review.created_at}</p>
              </div>
              <p className="text">{review.review}</p>
            </div>
          </div>
        ))
      ) : (
        <p>No reviews yet</p>
      )}
      <Modal isVisible={modalIsShowing} onClose={toggleModalIsShowing}>
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

export default props => <ReviewForm {...props} />
