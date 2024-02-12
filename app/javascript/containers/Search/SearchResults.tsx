import React from 'react';
import { BoldString } from '../../components/BoldString';
import { SearchResult } from './index';

type SearchResultsProps = {
  results: SearchResult[];
  queryLength: number;
  isLoading: boolean;
};

export const SearchResults = ({
  results,
  queryLength,
  isLoading,
}: SearchResultsProps) => {
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
          <BoldString
            string={skatepark.displayString}
            matchIndex={skatepark.matchIndex}
            length={queryLength}
          />
        </a>
      ))}
    </div>
  );
};
