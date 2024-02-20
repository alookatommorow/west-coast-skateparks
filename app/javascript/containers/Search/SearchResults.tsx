import React from 'react';
import { SearchResult } from './index';

type SearchResultsProps = {
  results: SearchResult[];
  isLoading: boolean;
};

export const SearchResults = ({ results, isLoading }: SearchResultsProps) => {
  const numResults = results.length;

  return (
    <div id="react-search-results" className="divided selection list">
      <p className="num-results">
        {isLoading
          ? 'Loading...'
          : `${numResults} ${numResults === 1 ? 'Match' : 'Matches'}`}
      </p>
      {results.map(skatepark => (
        <a
          className="item"
          href={`/skateparks/${skatepark.slug}`}
          key={skatepark.slug}
        >
          {skatepark.displayString}
        </a>
      ))}
    </div>
  );
};
