import React, {
  useState,
  useEffect,
  FormEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from 'react';
import { useToggle } from '../../../../hooks/useToggle';
import { ReviewModal } from './ReviewModal';
import { Stars } from '../../../../components/Stars';
import { request } from '../../../../utils';
import { Rating, Skatepark } from '../../../../types';

type ReviewFormProps = {
  skatepark: Skatepark;
  userId?: number;
  ratings: Rating[];
  setError: Dispatch<SetStateAction<string>>;
};

export const Reviews = ({
  skatepark,
  userId,
  ratings,
  setError: setRequestError,
}: ReviewFormProps) => {
  const { id: skateparkId, average_rating: initialAverageRating } = skatepark;
  const [stars, setStars] = useState(0);
  const [formError, setFormError] = useState('');
  const [review, setReview] = useState('');
  const [averageRating, setAverageRating] = useState(initialAverageRating);
  const { toggleIsOn: modalIsShowing, toggle: toggleModalIsShowing } =
    useToggle(false);

  useEffect(() => {
    if (stars > 0 && formError !== '') {
      setFormError('');
    }
  }, [stars]);

  useEffect(() => {
    if (!modalIsShowing) clearForm();
  }, [modalIsShowing]);

  const handleSuccess = (json: Rating) => {
    ratings.unshift(json);
    setAverageRating(json.new_average);
    toggleModalIsShowing();
  };

  const handleError = () => {
    setRequestError('Something went wrong');
    toggleModalIsShowing();
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      stars,
      review,
      skatepark_id: skateparkId,
      user_id: userId,
    };

    if (isValid()) {
      await request('/ratings', {
        fetchOptions: {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        },
        onSuccess: handleSuccess,
        onError: handleError,
      });
    }
  };

  const clearForm = () => {
    setStars(0);
    setReview('');
    setFormError('');
  };

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) =>
    setReview(event.currentTarget.value);

  const isValid = () => {
    let valid = true;

    if (stars < 1) {
      setFormError('Please add a rating');
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
        <button className="write-review-button" onClick={toggleModalIsShowing}>
          <i className="fa-solid fa-comments"></i>
          <p>Write a review</p>
        </button>
      </div>
      {allRatings.length > 0 ? (
        <>
          {allRatings.map((rating, i) => (
            <div className="comment" key={`rating-${i}`}>
              <img src={`${rating.avatar}`} />
              <div className="content">
                <div className="headers">
                  <p className="author">{rating.author}</p>
                  <p className="date">{rating.created_at}</p>
                </div>
                <Stars stars={rating.stars} tiny />
                <p className="text">{rating.review}</p>
              </div>
            </div>
          ))}
          <h4>User Rating</h4>
          {averageRating && <Stars stars={averageRating} />}
        </>
      ) : (
        <p>No reviews yet</p>
      )}
      <ReviewModal
        isVisible={modalIsShowing}
        onClose={toggleModalIsShowing}
        error={formError}
        stars={stars}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        setStars={setStars}
        userId={userId}
        numUserRatings={numUserRatings}
      />
    </>
  );
};
