import React from 'react';

type StarsProps = {
  stars: number;
  tiny?: boolean;
};

export const Stars = ({ stars, tiny }: StarsProps) => {
  let isInteger = true;
  let wholeStars = stars;
  let emptyStars = 5 - wholeStars;

  if (!Number.isInteger(wholeStars)) {
    isInteger = false;
    wholeStars = Math.floor(wholeStars);
    emptyStars = Math.floor(emptyStars);
  }

  return (
    <>
      {[...Array(wholeStars)].map((_e, i) => (
        <i
          key={`star-${i}`}
          className={`star fa-solid fa-star${tiny ? ' tiny' : ''}`}
        />
      ))}
      {!isInteger && (
        <i
          key={`star-half`}
          className={`star fa-solid fa-star-half-alt${tiny ? ' tiny' : ''}`}
        />
      )}
      {[...Array(emptyStars)].map((_e, i) => (
        <i
          key={`star-${5 - i}`}
          className={`star far fa-star${tiny ? ' tiny' : ''}`}
        />
      ))}
    </>
  );
};
