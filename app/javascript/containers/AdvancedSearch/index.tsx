import React, { useState, useEffect, ReactNode } from 'react';
import { findMatchIndices } from '../../utils';
import { Skatepark } from '../../types';
import { Results } from './Results';
import { BoldString } from '../../components/BoldString';
import { Header } from './Header';
import { Filters } from './Filters';
import { Query } from './Query';
import { Modal } from '../../components/Modal';
import { useMediaQueries } from '../../hooks/useMediaQueries';

export type Attr = keyof Pick<
  Skatepark,
  'city' | 'name' | 'state' | 'rating' | 'obstacles' | 'map_photo'
>;

export type QueryAttr = keyof Pick<Skatepark, 'city' | 'name'>;

type AdvancedSearchProps = {
  skateparks: Skatepark[];
};

export type Filter = {
  query: string;
  starsEquality: 'atLeast' | 'equal';
  stars: number;
  california: boolean;
  oregon: boolean;
  washington: boolean;
  sortAttr: Attr;
  sortOrder: 'asc' | 'desc';
};

type QueryMatch = {
  name?: ReactNode;
  city?: ReactNode;
};

export type SearchResult = Skatepark & {
  queryMatch?: QueryMatch;
};

export const AdvancedSearch = ({ skateparks }: AdvancedSearchProps) => {
  const params = new URLSearchParams(window.location.search);
  const { isTablet } = useMediaQueries();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filter>({
    query: params.get('query') || '',
    starsEquality: 'atLeast',
    stars: 1,
    california: true,
    oregon: true,
    washington: true,
    sortAttr: 'state',
    sortOrder: 'asc',
  });
  const [filteredSkateparks, setFilteredSkateparks] =
    useState<SearchResult[]>();

  const filterStars = (skatepark: SearchResult) => {
    const { rating } = skatepark;
    if (!rating || isNaN(Number(rating))) return false;

    if (filters.starsEquality === 'atLeast') {
      return Number(rating) >= filters.stars;
    }
    return Number(rating) === filters.stars;
  };

  const filterStates = (skatepark: SearchResult) => {
    const stateFilters = ['california', 'oregon', 'washington'].filter(
      key => filters[key as Skatepark['state']],
    );

    return stateFilters.includes(skatepark.state);
  };

  const filterQuery = (skatepark: SearchResult) => {
    skatepark.queryMatch = {};
    if (filters.query === '') return true;

    const attrs = ['city' as QueryAttr, 'name' as QueryAttr];
    let match = false;

    attrs.forEach(key => {
      const matchIndices = findMatchIndices(skatepark[key], filters.query);

      if (matchIndices.length > 0 && skatepark.queryMatch !== undefined) {
        match = true;

        skatepark.queryMatch[key as keyof QueryMatch] = (
          <BoldString
            string={skatepark[key]}
            matchIndices={matchIndices}
            length={filters.query.length}
          />
        );
      }
    });

    return match;
  };

  const runFilters = (skatepark: SearchResult) => {
    const filtersToRun = [];
    if (!filters.california || !filters.oregon || !filters.washington) {
      filtersToRun.push(filterStates);
    }
    if (filters.stars > 1 || filters.starsEquality == 'equal') {
      filtersToRun.push(filterStars);
    }

    // always filter by query to ensure pruning of prior query match
    filtersToRun.push(filterQuery);

    return filtersToRun.every(filter => filter(skatepark));
  };

  const compareAttrs = (a: Skatepark, b: Skatepark) => {
    const attrA =
      typeof a[filters.sortAttr] === 'string'
        ? a[filters.sortAttr]?.toUpperCase()
        : a[filters.sortAttr];
    const attrB =
      typeof b[filters.sortAttr] === 'string'
        ? b[filters.sortAttr]?.toUpperCase()
        : b[filters.sortAttr];

    let comparison = 0;
    if (attrA === undefined && attrB === undefined) {
      return comparison;
    } else if (attrA === undefined) {
      comparison = 1;
    } else if (attrB === undefined) {
      comparison = -1;
    } else if (attrA > attrB) {
      comparison = 1;
    } else if (attrA < attrB) {
      comparison = -1;
    }
    return filters.sortOrder === 'desc' ? comparison * -1 : comparison;
  };

  useEffect(() => {
    const filterSkateparks = () => {
      setFilteredSkateparks(
        (skateparks as SearchResult[]).filter(runFilters).sort(compareAttrs),
      );
    };

    filterSkateparks();
  }, [filters]);

  return (
    <div className="advanced-search-container">
      <Query filters={filters} setFilters={setFilters} />
      <div className="results-container">
        {!isTablet && <Filters filters={filters} setFilters={setFilters} />}
        <div>
          <div className="results-filters">
            <p className="header-text">
              {filteredSkateparks?.length}{' '}
              {`Result${filteredSkateparks?.length === 1 ? '' : 's'}`}
            </p>

            {isTablet && (
              <button onClick={() => setModalIsOpen(true)}>
                <i className="fa-solid fa-sliders"></i>
              </button>
            )}
          </div>
          <Header filters={filters} setFilters={setFilters} />
          <Results skateparks={filteredSkateparks} />
        </div>
      </div>
      <Modal isVisible={modalIsOpen} onClose={() => setModalIsOpen(false)}>
        <Modal.Body>
          <Filters filters={filters} setFilters={setFilters} />
        </Modal.Body>
      </Modal>
    </div>
  );
};
