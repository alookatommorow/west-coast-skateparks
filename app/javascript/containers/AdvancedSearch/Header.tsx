import React, { Dispatch, MouseEvent, SetStateAction } from 'react';
import { SKATEPARK_ATTRS } from './constants';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { Attr, Filter } from '.';

type HeaderProps = {
  filters: Filter;
  setFilters: Dispatch<SetStateAction<Filter>>;
};

export const Header = ({ filters, setFilters }: HeaderProps) => {
  const { isTablet } = useMediaQueries();

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
    <div className="table-header column-layout">
      {SKATEPARK_ATTRS.map(attrObj => {
        if (attrObj.name === 'obstacles') {
          if (isTablet) return;
          return <p key={attrObj.name}>{attrObj.text}</p>;
        }
        return (
          <button key={attrObj.name} name={attrObj.name} onClick={handleSort}>
            {attrObj.text}
            {filters.sortAttr == attrObj.name && (
              <i
                className={`fa-solid fa-arrow-down ${filters.sortOrder === 'asc' ? ' asc' : ''}`}
              ></i>
            )}
          </button>
        );
      })}
    </div>
  );
};
