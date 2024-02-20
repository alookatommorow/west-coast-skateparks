import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { SKATEPARK_ATTRS } from './constants';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { Attr, Filter } from '.';

type HeaderProps = {
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
};

export const Header = ({ filters, setFilters }: HeaderProps) => {
  const { isMobile } = useMediaQueries();

  const handleSort = (event: MouseEvent<HTMLButtonElement>) => {
    const name = event.currentTarget.getAttribute('name') as keyof Filter;
    if (!name) return;

    const sortAttr = name as Attr;
    const sortOrder =
      filters.sortAttr === sortAttr && filters.sortOrder === 'asc'
        ? 'desc'
        : 'asc';

    setFilters({
      ...filters,
      sortAttr,
      sortOrder,
    });
  };

  return (
    <>
      {isMobile && (
        <div className="field">
          <label className="label">Sort by</label>
        </div>
      )}
      <div className="table-header">
        {!isMobile && <div className="column photo" />}
        {SKATEPARK_ATTRS.map(attrObj => (
          <button
            key={attrObj.name}
            className={`column sort-button ${attrObj.name}`}
            name={attrObj.name}
            onClick={handleSort}
          >
            {attrObj.text}
            {filters.sortAttr == attrObj.name && (
              <i
                className={`fas fa-arrow-down sort-arrow${filters.sortOrder === 'asc' ? ' asc' : ''}`}
              ></i>
            )}
          </button>
        ))}
      </div>
    </>
  );
};
