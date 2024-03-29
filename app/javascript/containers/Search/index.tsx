import React, { useState, useEffect, useRef, ReactNode } from 'react';

import { SearchForm } from './SearchForm';
import { SearchResults } from './SearchResults';
import { Skatepark } from '../../types';
import { request, findMatchIndices } from '../../utils';
import { BoldString } from '../../components/BoldString';
import { Flash } from '../../components/Flash';

const STATE_DISPLAY = {
  california: 'CA',
  oregon: 'OR',
  washington: 'WA',
};

export type SearchResult = Skatepark & {
  displayString: ReactNode;
};

export const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [skateparks, setSkateparks] = useState<Skatepark[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
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
      document.addEventListener('click', handleClickOutside);
    }

    if (query && skateparks && !isLoading) {
      searchSkateparks();
    }

    return () => document.removeEventListener('click', handleClickOutside);
  }, [query, skateparks, isLoading]);

  const filterQuery = (searchResult: SearchResult) => {
    let displayString = (
      searchResult.name +
      ', ' +
      searchResult.city
    ).toLowerCase();
    const matchIndices = findMatchIndices(displayString, query);

    if (matchIndices.length > 0) {
      displayString = displayString + ', ' + STATE_DISPLAY[searchResult.state];
      searchResult.displayString = (
        <BoldString
          string={displayString}
          matchIndices={matchIndices}
          length={query.length}
        />
      );
      return true;
    }

    return false;
  };

  const searchSkateparks = () => {
    const castResults = skateparks as SearchResult[];
    setResults(castResults.filter(filterQuery));
  };

  const storeSkateparks = (response: Skatepark[]) => {
    setSkateparks(response);
    setIsLoading(false);
  };

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuery(event.currentTarget.value);
  };

  const handleError = () => {
    setError('Search unavailable, try again later');
    setIsLoading(false);
  };

  const onFlashClose = () => setError('');

  const getSkateparks = async () => {
    if (!skateparks.length) {
      setIsLoading(true);
      await request('/api/skateparks', {
        onSuccess: storeSkateparks,
        onError: handleError,
      });
    }
  };

  const exitResults = () => {
    setResults([]);
    setQuery('');
  };

  return (
    <>
      <Flash type="error" message={error} onClose={onFlashClose} />
      <div id="react-search">
        <div className="react-search-container" ref={containerRef}>
          <SearchForm
            handleChange={handleChange}
            query={query}
            handleFocus={getSkateparks}
            exitResults={exitResults}
          />
          {query && <SearchResults results={results} isLoading={isLoading} />}
        </div>
      </div>
    </>
  );
};
