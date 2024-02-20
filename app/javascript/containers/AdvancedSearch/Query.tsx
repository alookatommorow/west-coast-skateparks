import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { Filter } from '.';

type QueryProps = {
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
};

export const Query = ({ filters, setFilters }: QueryProps) => {
  const handleChange = (event: FormEvent<HTMLInputElement>) =>
    setFilters({
      ...filters,
      query: event.currentTarget.value,
    });

  return (
    <form className="query-form">
      <input
        name="query"
        type="text"
        value={filters.query}
        onChange={handleChange}
      />
      <i className="fa fa-search"></i>
    </form>
  );
};
