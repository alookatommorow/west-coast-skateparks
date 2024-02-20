import React, { Dispatch, FormEvent, SetStateAction } from 'react';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { Filter } from '.';
import { StarInput } from '../../components/StarInput';

type FiltersProps = {
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
};

export const Filters = ({ filters, setFilters }: FiltersProps) => {
  const { isMobile } = useMediaQueries();

  const handleCheckboxChange = (event: FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.getAttribute('name') as keyof Filter;
    if (!name) return;

    setFilters({
      ...filters,
      [name]: !filters[name],
    });
  };

  const handleInputChange = (event: FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.getAttribute('name') as keyof Filter;
    if (!name) return;

    setFilters({
      ...filters,
      [name]: event.currentTarget.value,
    });
  };

  const setStars = (stars: number) =>
    setFilters({
      ...filters,
      stars,
    });

  return (
    <form className="filter-form">
      <p className="header-text">Filters</p>
      <div className="field states">
        <p>State</p>
        <label>
          <input
            name="california"
            type="checkbox"
            className="checkbox"
            checked={filters.california}
            onChange={handleCheckboxChange}
          />
          <span />
          CA
        </label>
        <label>
          <input
            name="oregon"
            type="checkbox"
            className="checkbox"
            checked={filters.oregon}
            onChange={handleCheckboxChange}
          />
          <span />
          OR
        </label>
        <label>
          <input
            name="washington"
            type="checkbox"
            className="checkbox"
            checked={filters.washington}
            onChange={handleCheckboxChange}
          />
          <span />
          WA
        </label>
      </div>
      <div className="field">
        <p>Stars</p>

        <StarInput
          stars={filters.stars}
          setStars={setStars}
          isTiny={isMobile}
          showError={false}
        />
        <label>
          <input
            name="starsEquality"
            value="atLeast"
            type="radio"
            checked={filters.starsEquality === 'atLeast'}
            onChange={handleInputChange}
          />
          <span />
          at least
        </label>
        <label>
          <input
            name="starsEquality"
            type="radio"
            value="equal"
            checked={filters.starsEquality === 'equal'}
            onChange={handleInputChange}
          />
          <span />
          equal to
        </label>
      </div>
    </form>
  );
};
