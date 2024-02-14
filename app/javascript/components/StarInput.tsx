import React from 'react';

type StarInputProps = {
  stars: number;
  setStars: (numStars: number) => void;
  showError: boolean;
  isTiny?: boolean;
};

export const StarInput = ({
  stars,
  showError,
  setStars,
  isTiny,
}: StarInputProps) => {
  const maxStars = 5;

  const handleStarsChange = (event: React.FormEvent<HTMLInputElement>) => {
    const currentStars = Number(stars);
    let newStars = Number(event.currentTarget.value);

    if (newStars === currentStars && currentStars > 1) {
      newStars -= 1;
    }

    setStars(newStars);
  };

  const renderStars = () => {
    return [...Array(stars)].map((e, i) => (
      <label htmlFor={`${i + 1}`} aria-label={`${i + 1}`} key={`star-${i + 1}`}>
        <input
          type="checkbox"
          name="rating"
          onChange={handleStarsChange}
          id={`${i + 1}`}
          value={i + 1}
          checked={stars === i + 1}
        />
        <i
          className={`star fas fa-star ${showError && 'error'} ${isTiny && 'tiny'}`}
        />
      </label>
    ));
  };

  const renderEmptyStars = () => {
    if (stars > 4) return;

    return [...Array(maxStars - stars)].map((e, i) => (
      <label
        htmlFor={`${stars + i + 1}`}
        aria-label={`${stars + i + 1}`}
        key={`star-${stars + i + 1}`}
      >
        <input
          type="checkbox"
          name="stars"
          id={`${stars + i + 1}`}
          value={stars + i + 1}
          checked={stars === stars + i + 1}
          onChange={handleStarsChange}
        />
        <i
          className={`star far fa-star ${showError && 'error'} ${isTiny && 'tiny'}`}
        />
      </label>
    ));
  };

  return (
    <div className="star-input">
      {renderStars()}
      {renderEmptyStars()}
    </div>
  );
};
