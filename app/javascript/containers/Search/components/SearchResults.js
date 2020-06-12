import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import BoldString from 'components/BoldString';

export const SearchResults = function(props) {
  const { exitResults, results, query } = props;

  const [mouseIsActive, setMouseIsActive] = useState(false);

  useEffect(() => {
    // update the listener whenever results change
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results]);

  const handleMouseLeave = () => {
    setMouseIsActive(false);
  };

  const handleMouseEnter = () => {
    setMouseIsActive(true);
  };

  const handleClick = event => {
    if (event.target.firstChild) {
      window.location = event.target.firstChild.href;
    }
  };

  const handleKeyDown = event => {
    event = event || window.event;
    switch(event.which || event.keyCode) {
      case 27: // esc
        exitResults();
      break;

      default: return; // exit this handler for other keys
    }
  };

  const handleLinkClick = event => {
    event.preventDefault();
    event.stopPropagation();
    Turbolinks.visit(event.currentTarget.href);
  };

  const numResults = results.length;

  return (
    <div id="react-search-results" className="divided selection list" onKeyDown={handleKeyDown} onMouseLeave={handleMouseLeave} >
      {query && (
        <div className="item num-results">
          <span className="bold">{numResults} {numResults === 1 ? 'Match' : 'Matches'}</span>
        </div>
      )}
      <div>
        {query && results.map(skatepark => (
          <div
            className="item"
            key={skatepark.id}
            onMouseEnter={handleMouseEnter}
            onClick={handleClick}
          >
            <a
              href={`/skateparks/${skatepark.slug}`}
              onClick={handleLinkClick}
            >
              <BoldString
                string={skatepark.string}
                matchIndex={skatepark.matchIndex}
                query={query}
              />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

SearchResults.propTypes = {
  exitResults: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  query: PropTypes.string,
};

export default props => <SearchResults {...props} />
