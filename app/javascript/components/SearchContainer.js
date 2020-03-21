import React, { useState, useEffect } from 'react';
import SearchForm from './SearchForm';
import SearchResults from './SearchResults';

function SearchContainer() {
  const [query, setQuery] = useState(null);
  const [results, setResults] = useState([]);
  const [skateparks, setSkateparks] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query) {
      setResults([]);
    } else {
      setResults(searchSkateparks(query));
    }
  }, [query]);

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
      .done(storeAllSkateparks)
      .fail(errorFunction);
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

  const errorFunction = () => {
    console.log("yer fuckin up");
  };

  return (
    <div className="react-search-container">
      <SearchForm handleChange={handleChange} loading={loading} getSkateparks={getSkateparks} results={results} query={query} />
      <SearchResults className="react-search-results" results={results} exitResults={exitResults} query={query} />
    </div>
  );
};

export default props => <SearchContainer {...props} />
