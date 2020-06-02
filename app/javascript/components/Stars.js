import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

function Stars(props) {
  const { stars, keyPrefix, tiny } = props;

  const renderStars = () => {
    let isInteger = true;
    let wholeStars = Number(stars);
    let emptyStars = 5 - wholeStars;

    if (!Number.isInteger(wholeStars)) {
      isInteger = false;
      wholeStars = Math.floor(wholeStars);
      emptyStars = Math.floor(emptyStars);
    }

    return (
      <div>
        {[...Array(wholeStars)].map((_e, i) => (
          <i
            key={`${keyPrefix}-${i}`}
            className={`star fas fa-star${tiny ? ' tiny' : ''}`}
          />
        ))}
        {!isInteger && (
          <i
            key={`${keyPrefix}-half`}
            className={`star fas fa-star-half-alt${tiny ? ' tiny' : ''}`}
          />
        )}
        {[...Array(emptyStars)].map((_e, i) => (
          <i
            key={`${keyPrefix}-${5 - i}`}
            className={`star far fa-star${tiny ? ' tiny' : ''}`}
          />
        ))}
      </div>
    );
  }

  return (
    <React.Fragment>
      { renderStars() }
    </React.Fragment>
  );
}

Stars.propTypes = {
  stars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  keyPrefix: PropTypes.string,
  tiny: PropTypes.bool,
};

Stars.defaultProps = {
  keyPrefix: 'standard',
  tiny: false,
};

export default props => <Stars {...props} />