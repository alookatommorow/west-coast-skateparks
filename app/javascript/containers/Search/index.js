import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from 'styles/search.module.scss';
import useToggle from 'hooks/useToggle';
import SearchForm from './components/SearchForm';
import SearchResults from './components/SearchResults';

function Search() {
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([]);
  const [skateparks, setSkateparks] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      // check if click is outside component and close if so
      if (!containerRef.current.contains(event.target)) {
        exitResults();
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!query) {
      setResults([]);
    } else if (!isLoading) {
      setResults(searchSkateparks(query));
    }
  }, [query]);

  useEffect(() => {
    // if query was input during skateparks load, apply query after load
    if (query && query !== '') {
      setResults(searchSkateparks(query));
    }
  }, [skateparks]);

  const searchSkateparks = searchQuery => skateparks.filter(filterAndAddIndexOfMatch(searchQuery));

  const filterAndAddIndexOfMatch = () => {
    return function(skatepark) {
      let matchIndex = skatepark.name.indexOf(query);

      if (matchIndex < 0) matchIndex = skatepark.city.indexOf(query);

      if (matchIndex > -1) {
        skatepark.string = skatepark.name + ", " + skatepark.city + ", " + STATE_DISPLAY[skatepark.state];
        skatepark.matchIndex = matchIndex;
        return true;
      }

      return false;
    }
  };

  const getSkateparks = () => {
    if (!skateparks) {
      setIsLoading(true);
      $.get('/api/skateparks')
      .done(storeAllSkateparks);
    }
  };

  const storeAllSkateparks = response => {
    setSkateparks(response);
    setIsLoading(false);
  };

  const handleChange = event => {
    const newQuery = event.target.value.toLowerCase();
    if (newQuery === '') return setQuery(null);

    setQuery(newQuery);
  };

  const exitResults = () => {
    clearForm();
    document.getElementById("react-search-form").reset();
  };

  const clearForm = () => {
    setResults([]);
    setQuery(null);
  };

  return (
    <div id="react-search">
      <div className="react-search-container" ref={containerRef}>
        <SearchForm
          handleChange={handleChange}
          results={results}
          query={query}
          getSkateparks={getSkateparks}
        />
        <SearchResults
          className="react-search-results"
          results={results}
          exitResults={exitResults}
          query={query}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default props => <Search {...props} />
