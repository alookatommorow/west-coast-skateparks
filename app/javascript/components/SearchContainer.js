import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import styles from '../styles/search.module.scss';
import useToggle from '../hooks/useToggle';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function SearchContainer() {
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([]);
  const [skateparks, setSkateparks] = useState(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);
  const {
    isShowing: searchIsShowing,
    toggle: toggleSearchIsShowing,
  } = useToggle(false);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  useEffect(() => {
    if (!skateparks) getSkateparks();
  }, [searchIsShowing]);

  useEffect(() => {
    if (!query) {
      setResults([]);
    } else if (!loading) {
      setResults(searchSkateparks(query));
    }
  }, [query]);

  useEffect(() => {
    // if query was input during skaeparks data load, apply query after load
    if (query && query !== '') {
      setResults(searchSkateparks(query));
    }
  }, [skateparks]);

  const searchSkateparks = searchQuery => skateparks.filter(filterAndAddIndexOfMatch(searchQuery));

  const filterAndAddIndexOfMatch = () => {
    return function(skatepark) {
      if (!skatepark.location) return false;

      if (skatepark.name.indexOf(query) !== -1 || skatepark.location.city.indexOf(query) !== -1) {
        skatepark.string = skatepark.name+", "+skatepark.location.city+", "+stateDisplay[skatepark.location.state];
        skatepark.matchIndex = skatepark.string.indexOf(query);
        return true;
      } else {
        return false;
      }
    }
  };

  const getSkateparks = () => {
    if (!skateparks) {
      setLoading(true);
      $.get('/api/skateparks')
      .done(storeAllSkateparks);
    }
  };

  const storeAllSkateparks = response => {
    setSkateparks(response);
    setLoading(false);
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

  const handleClickOutside = event => {
    // check if search is active, click is outside component, and target is not search trigger icon
    if (
      containerRef.current &&
        !event.target.classList.contains("display-search") &&
        !containerRef.current.contains(event.target)
    ) {
      exitResults();
    }
  }

  return (
    <div id="react-search">
      <TransitionGroup component={null}>
        {!searchIsShowing && (
          <CSSTransition timeout={1000} classNames={{ ...styles }}>
            <div
              className="display-search"
              role="button"
              tabIndex="0"
              onClick={toggleSearchIsShowing}
            >
              <i className="large fa fa-search"></i>
            </div>
          </CSSTransition>
        )}
        {searchIsShowing && (
          <CSSTransition timeout={1000} classNames={{ ...styles }}>
            <div className="react-search-container" ref={containerRef}>
              <SearchForm
                handleChange={handleChange}
                loading={loading}
                results={results}
                query={query}
              />
              <SearchResults
                className="react-search-results"
                results={results}
                exitResults={exitResults}
                query={query}
              />
            </div>
          </CSSTransition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default props => <SearchContainer {...props} />
