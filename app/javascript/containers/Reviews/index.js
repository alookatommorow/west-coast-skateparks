import React, { useState, useEffect } from 'react';
import useToggle from 'hooks/useToggle';
import ReviewComponent from './components';
import Stars from '../../components/Stars';

function ReviewForm(props) {
  const { skateparkId, userId, ratings } = props;

  const [stars, setStars] = useState(0);
  const [ratingError, setRatingError] = useState('');
  const [review, setReview] = useState(null);
  const [averageRating, setAverageRating] = useState(props.averageRating);
  const {
    toggleIsOn: modalIsShowing,
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
        url: '/ratings',
        method: 'POST',
        data: {
          stars,
          review,
          skatepark_id: skateparkId,
          user_id: userId,
        }
      }).done(response => {
        ratings.unshift(response);
        // TO DO: restructure response with average as separate key
        setAverageRating(response.new_average);
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

      allRatings = userRatings.concat(otherRatings);
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
        <React.Fragment>
          {allRatings.map((rating, i) => (
            <div className="comment" key={`rating-${i}`}>
              <div className="avatar">
                <img src={`${rating.avatar}`} />
              </div>
              <div className="content">
                <div className="headers">
                  <p className="author">{rating.author}</p>
                  <p className="date">{rating.created_at}</p>
                </div>
                <Stars
                  stars={rating.stars}
                  prefix={`review-stars-${i}`}
                  tiny
                />
                <p className="text">{rating.review}</p>
              </div>
            </div>
          ))}
          <h4>User Rating</h4>
          <Stars
            stars={averageRating}
            prefix="average-rating"
          />
        </React.Fragment>
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
        setStars={setStars}
        userId={userId}
        numUserRatings={numUserRatings}
        averageRating={averageRating}
      />
    </React.Fragment>
  );
};

export default props => <ReviewForm {...props} />
