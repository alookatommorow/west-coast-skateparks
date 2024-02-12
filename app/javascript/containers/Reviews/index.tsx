import React, { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useToggle } from '../../hooks/useToggle';
import { ReviewModal } from './ReviewModal';
import Stars from '../../components/Stars';

type Rating = {
  author: string;
  author_id: number;
  avatar?: string;
  created_at: string;
  new_average: 3;
  review: string;
  stars: number;
};

type ReviewFormProps = {
  skateparkId: number;
  userId?: number;
  ratings: Rating[];
  initialAverageRating: number;
};

export const Reviews = ({
  skateparkId,
  userId,
  ratings,
  initialAverageRating,
}: ReviewFormProps) => {
  const [stars, setStars] = useState(0);
  const [ratingError, setRatingError] = useState('');
  const [review, setReview] = useState('');
  const [averageRating, setAverageRating] = useState(initialAverageRating);
  const { toggleIsOn: modalIsShowing, toggle: toggleModalIsShowing } =
    useToggle(false);

  useEffect(() => {
    if (stars > 0 && ratingError !== '') {
      setRatingError('');
    }
  }, [stars]);

  useEffect(() => {
    if (!modalIsShowing) clearForm();
  }, [modalIsShowing]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      stars,
      review,
      skatepark_id: skateparkId,
      user_id: userId,
    };

    if (isValid()) {
      const response = await fetch('/ratings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      const reviewJson = await response.json();
      ratings.unshift(reviewJson);
      setAverageRating(reviewJson.new_average);
      toggleModalIsShowing();
    }
  };

  const clearForm = () => {
    setStars(0);
    setReview('');
    setRatingError('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setReview(event.currentTarget.value);

  const isValid = () => {
    let valid = true;

    if (stars < 1) {
      setRatingError('Please add a rating');
      valid = false;
    }

    return valid;
  };

  const sortedRatings = () => {
    let numUserRatings = 0;
    let allRatings = ratings;

    if (userId) {
      const userRatings: Rating[] = [];
      const otherRatings: Rating[] = [];

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
  };

  const { numUserRatings, allRatings } = sortedRatings();

  return (
    <>
      <div className="review-header-container">
        <h4>Reviews</h4>
        <div
          className="write-review-button"
          role="button"
          tabIndex={0}
          onClick={toggleModalIsShowing}
        >
          <i className="fas fa-comments"></i>
          <p>Write a review</p>
        </div>
      </div>
      {allRatings.length > 0 ? (
        <>
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
                <Stars stars={rating.stars} prefix={`review-stars-${i}`} tiny />
                <p className="text">{rating.review}</p>
              </div>
            </div>
          ))}
          <h4>User Rating</h4>
          <Stars stars={averageRating} prefix="average-rating" />
        </>
      ) : (
        <p>No reviews yet</p>
      )}
      {userId && (
        <ReviewModal
          isVisible={modalIsShowing}
          onClose={toggleModalIsShowing}
          ratingError={ratingError}
          stars={stars}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          setStars={setStars}
          userId={userId}
          numUserRatings={numUserRatings}
        />
      )}
    </>
  );
};
