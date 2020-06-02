import React from 'react';
import PropTypes from 'prop-types';

function StarInput(props) {
  const { stars, handleClick, showError } = props;
  const maxStars = 5;

  const renderStars = () => {
    return [...Array(stars)].map((e, i) => (
      <label htmlFor={i + 1} key={`star-${i + 1}`}>
        <input
          type="radio"
          name="rating"
          onClick={handleClick}
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
          onClick={handleClick}
        />
        <i className={`star far fa-star ${showError && 'error'}`} />
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
  handleClick: PropTypes.func.isRequired,
  showError: PropTypes.bool,
};

StarInput.defaultProps = {
  showError: false,
};

export default props => <StarInput {...props} />