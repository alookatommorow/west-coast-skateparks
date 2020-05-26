import React, { useEffect, useState } from 'react';
import { PropTypes } from 'prop-types';

function SearchResults(props) {
  const { exitResults, results, query } = props;

  const [activeResultIndex, setActiveResultIndex] = useState(0);
  const [mouseIsActive, setMouseIsActive] = useState(false);

  useEffect(() => {
    setActiveResultIndex(0);
  }, [results]);

  useEffect(() => {
    // update the listener whenever results or active result change
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [results, activeResultIndex]);

  const handleMouseLeave = () => {
    setActiveResultIndex(0);
    setMouseIsActive(false);
  };

  const handleMouseEnter = () => {
    setMouseIsActive(true);
    setActiveResultIndex(null);
  };

  const handleClick = event => {
    if (event.target.firstChild) {
      window.location = event.target.firstChild.href;
    }
  };

  const selectNext = () => {
    if (activeResultIndex < results.length - 1) {
      setActiveResultIndex(activeResultIndex + 1);
    }
  };

  const selectPrevious = () => {
    if (activeResultIndex > 0) {
      setActiveResultIndex(activeResultIndex - 1);
    }
  };

  const handleKeyDown = event => {
    event = event || window.event;
    switch(event.which || event.keyCode) {
      case 40: // down
        if (!mouseIsActive) selectNext();
      break;

      case 38: //up
        if (!mouseIsActive) selectPrevious();
      break;

      case 13: // enter
        event.preventDefault();
        visitSelectedLink();
      break;

      case 27: // esc
        exitResults();
      break;

      default: return; // exit this handler for other keys
    }
  };

  const visitSelectedLink = () => {
    Turbolinks.visit(`/skateparks/${results[activeResultIndex].slug}`);
  };

  const handleLinkClick = event => {
    event.preventDefault();
    event.stopPropagation();
    Turbolinks.visit(event.currentTarget.href);
  };


  const createBoldString = (string, matchIndex, query) => {
    const output = titleize(string);
    const first = output.slice(0, matchIndex);
    const bold = output.slice(matchIndex, matchIndex + query.length);
    const last = output.slice(matchIndex + query.length);

    return <span>{first}<span className="bold">{bold}</span>{last}</span>;
  };

  const numResults = results.length;
  const matchText = numResults === 1 ? 'Match' : 'Matches';
  let numResultsDisplay;
  let resultsDisplay;

  if (query) {
    numResultsDisplay = <div className="item num-results"><span className="bold">{numResults} {matchText}</span></div>;
    resultsDisplay = results.map((skatepark, index) => (
      <div className={`item${index === activeResultIndex ? ' active' : ''}`} key={skatepark.id} onMouseEnter={handleMouseEnter} onClick={handleClick}>
        <a href={`/skateparks/${skatepark.slug}`} onClick={handleLinkClick}>{createBoldString(skatepark.string, skatepark.matchIndex, query)}</a>
      </div>
    ));
  }

  return (
    <div id="react-search-results" className="divided selection list" onKeyDown={handleKeyDown} onMouseLeave={handleMouseLeave} >
      {numResultsDisplay}
      <div>
        {resultsDisplay}
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
