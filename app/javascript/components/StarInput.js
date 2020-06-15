import React from 'react';
import PropTypes from 'prop-types';

function StarInput(props) {
  const { stars, showError, setStars, tiny } = props;
  const maxStars = 5;

  const handleStarsChange = event => {
    const { currentTarget: { value } } = event;
    const currentStars = Number(stars);
    let newStars = Number(value);

    if (newStars === currentStars && currentStars > 1) {
      newStars -= 1;
    }

    setStars(newStars);
  };

  const renderStars = () => {
    return [...Array(stars)].map((e, i) => (
      <label htmlFor={i + 1} key={`star-${i + 1}`}>
        <input
          type="checkbox"
          name="rating"
          onChange={handleStarsChange}
          id={i + 1}
          value={i + 1}
          checked={stars === i + 1}
        />
        <i className={`star fas fa-star ${showError && 'error'} ${tiny && 'tiny'}`} />
      </label>
    ));
  }

  const renderEmptyStars = () => {
    if (stars > 4) return;

    return [...Array(maxStars - stars)].map((e, i) => (
      <label htmlFor={stars + i + 1} key={`star-${stars + i + 1}`}>
        <input
          type="checkbox"
          name="stars"
          id={stars + i + 1}
          value={stars + i + 1}
          checked={stars === (stars + i + 1)}
          onChange={handleStarsChange}
        />
        <i className={`star far fa-star ${showError && 'error'} ${tiny && 'tiny'}`} />
      </label>
    ));
  }

  return (
    <div className="star-input">
      {renderStars()}
      {renderEmptyStars()}
    </div>
  );
}

StarInput.propTypes = {
  stars: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setStars: PropTypes.func.isRequired,
  showError: PropTypes.bool,
  tiny: PropTypes.bool,
};

StarInput.defaultProps = {
  showError: false,
  tiny: false,
};

export default props => <StarInput {...props} />