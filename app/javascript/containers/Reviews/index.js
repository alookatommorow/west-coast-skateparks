import React, { useState, useEffect } from 'react';
import useToggle from 'hooks/useToggle';
import Modal from 'components/Modal';
import ReviewComponent from './components';

function ReviewForm(props) {
  const { skateparkId, userId, ratings } = props;

  // TODO: Rename to stars and figure out how maxStars fits in
  const [stars, setStars] = useState(0);
  const [ratingError, setRatingError] = useState('');
  const [review, setReview] = useState(null);
  const {
    isShowing: modalIsShowing,
    toggle: toggleModalIsShowing,
  } = useToggle(false);

  useEffect(() => {
    if (stars > 0 && ratingError !== '') {
      setRatingError('');
    }
  }, [stars]);

  useEffect(() => {
    if (!modalIsShowing) clearForm();
  }, [modalIsShowing]);

  const handleSubmit = event => {
    event.preventDefault();

    if (isValid()) {
      $.ajax({
        url: `/ratings`,
        method: 'POST',
        data: {
          stars,
          review,
          skatepark_id: skateparkId,
          user_id: userId,
        }
      }).done(response => {
        ratings.unshift(response);
        toggleModalIsShowing();
      });
    }
  }

  const clearForm = () => {
    setStars(0);
    setReview('');
    setReview(null);
    setRatingError('');
  }

  const handleClick = event => {
    const {currentTarget: { value }} = event;
    let newStars = parseInt(value, 10);

    if (newStars === stars) {
      newStars -= 1;
    }

    setStars(newStars);
  };

  const handleChange = event => setReview(event.target.value);

  const isValid = () => {
    let valid = true;

    if (stars < 1) {
      setRatingError('Please add a rating');
      valid = false;
    }

    return valid;
  }

  const sortedRatings = () => {
    let numUserRatings = 0;
    let allRatings = ratings;

    if (userId) {
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

      allRatings = userRatings.concat(otherRatings)
    }

    return { numUserRatings, allRatings };
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
      <ReviewComponent
        isVisible={modalIsShowing}
        onClose={toggleModalIsShowing}
        ratingError={ratingError}
        stars={stars}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        handleClick={handleClick}
        userId={userId}
        numUserRatings={numUserRatings}
      />
    </React.Fragment>
  );
};

export default props => <ReviewForm {...props} />
