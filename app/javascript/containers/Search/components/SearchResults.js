import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';
import BoldString from 'components/BoldString';

export const SearchResults = function(props) {
  const { exitResults, results, query, isLoading } = props;

  useEffect(() => {
    // update the listener whenever results change
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results]);

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
    <div id="react-search-results" className="divided selection list" onKeyDown={handleKeyDown}>
      {query && (
          <p className="num-results">
            {isLoading ?
              'Loading...' :
              `${numResults} ${numResults === 1 ? 'Match' : 'Matches'}`
            }
          </p>
      )}
      <div>
        {query && results.map(skatepark => (
          <div
            className="item"
            key={`quick-search-${skatepark.slug}`}
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
  isLoading: PropTypes.bool.isRequired,
};

export default props => <SearchResults {...props} />
