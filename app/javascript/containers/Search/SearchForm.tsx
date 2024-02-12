import React, { FormEvent, KeyboardEvent } from 'react';

type SearchFormProps = {
  exitResults: () => void;
  handleChange: (event: FormEvent<HTMLInputElement>) => void;
  handleFocus: () => void;
  query?: string;
};

export const SearchForm = ({
  exitResults,
  handleChange,
  query,
  handleFocus,
}: SearchFormProps) => {
  // close results on escape keypress
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case 'Escape':
        exitResults();
        break;

      default:
        return;
    }
  };

  return (
    <form action={`/skateparks/search?query=${query}`} id="react-search-form">
      <input
        id="react-search-input"
        placeholder={'e.g. San Francisco'}
        type="text"
        name="query"
        onChange={handleChange}
        onFocus={handleFocus}
        value={query}
        onKeyDown={handleKeyDown}
      />
      <i className="fa fa-search"></i>
    </form>
  );
};
