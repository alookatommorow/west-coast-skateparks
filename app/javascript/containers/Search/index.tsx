import React, { useState, useEffect, useRef } from 'react';

import { SearchForm } from './components/SearchForm';
import { SearchResults } from './components/SearchResults';
const STATE_DISPLAY = {
  california: 'CA',
  oregon: 'OR',
  washington: 'WA',
};

export type Skatepark = {
  slug: string;
  name: string;
  city: string;
  state: 'california' | 'oregon' | 'washington';
};

export type SearchResult = Skatepark & {
  displayString: string;
  matchIndex: number;
};

function Search() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [skateparks, setSkateparks] = useState<Skatepark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = function (this: Document, event: MouseEvent) {
      // check if click is outside component and close if so
      if (
        containerRef.current &&
        event.target instanceof Node &&
        !containerRef.current.contains(event.target)
      ) {
        exitResults();
      }
    };

    if (query) {
      console.log('event listener added');
      document.addEventListener('click', handleClickOutside);
    }

    if (query && skateparks && !isLoading) {
      searchSkateparks();
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [query, skateparks, isLoading]);

  const filterAndAddIndexOfMatch = (searchResult: SearchResult) => {
    let displayString = (
      searchResult.name +
      ', ' +
      searchResult.city
    ).toLowerCase();
    const matchIndex = displayString.indexOf(query.toLowerCase());

    if (matchIndex < 0) {
      return false;
    }

    displayString = displayString + ', ' + STATE_DISPLAY[searchResult.state];
    searchResult.displayString = displayString;
    searchResult.matchIndex = matchIndex;
    return true;
  };

  const searchSkateparks = () => {
    const castResults = skateparks as SearchResult[];
    setResults(castResults.filter(filterAndAddIndexOfMatch));
  };

  const storeSkateparks = (response: Skatepark[]) => {
    setSkateparks(response);
    setIsLoading(false);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const getSkateparks = async () => {
    if (!skateparks.length) {
      setIsLoading(true);
      const response = await fetch('/api/skateparks');
      const skateparksJson = await response.json();
      storeSkateparks(skateparksJson);
    }
  };

  const exitResults = () => {
    setResults([]);
    setQuery('');
  };

  return (
    <div id="react-search">
      <div className="react-search-container" ref={containerRef}>
        <SearchForm
          handleChange={handleChange}
          query={query}
          handleFocus={getSkateparks}
          exitResults={exitResults}
        />
        {query && (
          <SearchResults
            results={results}
            queryLength={query.length}
            isLoading={isLoading}
          />
        )}
      </div>
    </div>
  );
}

export default Search;
