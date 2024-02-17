import React, {
  useState,
  useEffect,
  FormEvent,
  KeyboardEvent,
  MouseEvent,
} from 'react';
import { useToggle } from '../../hooks/useToggle';
import { StarInput } from '../../components/StarInput';
import { Stars } from '../../components/Stars';
import { SKATEPARK_ATTRS } from './constants';
import { titleize } from '../../utils';
import { Skatepark } from '../../types';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { Results } from './Results';

export type Attr = keyof Pick<
  Skatepark,
  'city' | 'name' | 'state' | 'rating' | 'obstacles' | 'map_photo'
>;

export type QueryAttr = keyof Pick<Skatepark, 'city' | 'name'>;

type AdvancedSearchProps = {
  initialQuery?: string;
  skateparks: Skatepark[];
};

type Filters = {
  query: string;
  starsEquality: 'atLeast' | 'equal';
  stars: number;
  california: boolean;
  oregon: boolean;
  washington: boolean;
  exact: boolean;
  sortAttr: Attr;
  sortOrder: 'asc' | 'desc';
};

type QueryMatch = {
  name?: number;
  city?: number;
};

export type SearchResult = Skatepark & {
  queryMatch: QueryMatch;
};

export const AdvancedSearch = ({
  skateparks,
  initialQuery,
}: AdvancedSearchProps) => {
  const [filters, setFilters] = useState<Filters>({
    query: initialQuery || '',
    starsEquality: 'atLeast',
    stars: 1,
    california: true,
    oregon: true,
    washington: true,
    exact: true,
    sortAttr: 'state',
    sortOrder: 'asc',
  });
  // const [query, setQuery] = useState(initialQuery);
  const [filteredSkateparks, setFilteredSkateparks] =
    useState<SearchResult[]>();
  const { isMobile } = useMediaQueries();
  // const [splitQuery, setSplitQuery] = useState(initialQuery?.split(' '));
  // const [obstacles, setObstacles] = useState<string>();
  // const [splitObstacles, setSplitObstacles] = useState<string[]>();
  // const [hasBeenSorted, setHasBeenSorted] = useState(false);

  // const filterState = (skatepark: Skatepark, state: Skatepark['state']) =>
  //   skatepark.state === state;

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

  const filterExact = (skatepark: SearchResult) => {
    const attrs = ['city' as QueryAttr, 'name' as QueryAttr];
    let match = false;
    let matchIndex;

    attrs.forEach(key => {
      matchIndex = skatepark[key]
        .toLowerCase()
        .indexOf(filters.query.toLowerCase());

      if (matchIndex > -1) {
        match = true;
        skatepark.queryMatch[key as keyof QueryMatch] = matchIndex;
      }
    });

    if (skatepark.city === 'Garucha 67') {
      console.log(skatepark.queryMatch);
    }

    return match;
  };

  const filterQuery = (skatepark: SearchResult) => {
    skatepark.queryMatch = {};
    if (filters.query === '') return true;

    if (filters.exact) return filterExact(skatepark);
  };

  const filterFns = {
    query: filterQuery,
    stars: filterStars,
    states: filterStates,
  };

  useEffect(() => {
    const filterSkateparks = () => {
      setFilteredSkateparks(
        Object.values(filterFns).reduce(
          (d, f) => d.filter(f),
          skateparks as SearchResult[],
        ),
      );
    };

    filterSkateparks();
  }, [filters]);

  console.log(filteredSkateparks);

  const [sortAttr, setSortAttr] = useState<Attr>('state');
  const [sortDirection, setSortDirection] = useState('asc');
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  const handleCheckboxChange = (event: FormEvent<HTMLElement>) => {
    const name = event.currentTarget.getAttribute('name') as keyof Filters;
    if (!name) return;

    setFilters({
      ...filters,
      [name]: !filters[name],
    });
  };

  const handleRadioChange = (event: FormEvent<HTMLInputElement>) => {
    const name = event.currentTarget.getAttribute('name') as keyof Filters;
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

  // useEffect(() => {
  //   if (hasBeenSorted) setSkateparks([...skateparks].sort(compareAttrs));
  // }, [sortAttr, sortDirection]);

  // const isSorted = (attrToCheck: Attr) => attrToCheck === sortAttr;
  // const hasSortDirection = (attrToCheck: Attr) =>
  //   attrToCheck === sortAttr ? ` ${sortDirection}` : '';
  // const filterParks = () =>
  //   skateparks.filter(skatepark => filterSkateparks(skatepark));

  // console.log(filters.query);

  // const findMatch = (skatepark: SearchResult, attr: k) => {
  // }

  // const handleObstaclesChange = (event: FormEvent<HTMLInputElement>) => {
  //   const {
  //     currentTarget: { value },
  //   } = event;

  //   // setObstacles(value);
  //   // setSplitObstacles(value.split(' '));
  // };

  // const filterTextAttr = (
  //   skatepark: Skatepark,
  //   attr: Attr,
  //   filter: string,
  //   useExact: boolean,
  // ) => {
  //   if (!skatepark[attr]) return false;

  //   const splitValue = skatepark[attr]?.toLowerCase().split(' ');
  //   let hasMatch = false;
  //   let matchIndex;

  //   if (!useExact && splitValue?.length && splitValue.length > 1) {
  //     if (Object.values(skatepark.matches[attr]) === splitValue.length)
  //       return true;

  //     skatepark.displayHtmlStrings[attr] = splitValue
  //       .map((str, index) => {
  //         if (!skatepark.matches[attr][str]) {
  //           matchIndex = str.indexOf(filter.toLowerCase());
  //           if (matchIndex > -1) {
  //             hasMatch = true;
  //             skatepark.matches[attr][str] = createBoldString(
  //               str,
  //               matchIndex,
  //               filter,
  //             );
  //             return skatepark.matches[attr][str];
  //           }
  //         } else {
  //           hasMatch = true;
  //           return skatepark.matches[attr][str];
  //         }
  //         return titleize(str);
  //       })
  //       .join(' ');
  //   } else {
  //     matchIndex = skatepark[attr].toLowerCase().indexOf(filter.toLowerCase());
  //     if (matchIndex > -1) {
  //       skatepark.displayHtmlStrings[attr] = createBoldString(
  //         skatepark[attr],
  //         matchIndex,
  //         filter,
  //       );
  //       hasMatch = true;
  //     }
  //   }

  //   return hasMatch;
  // };

  // const filterSkateparks = skatepark => {
  //   skatepark.displayHtmlStrings = {};
  //   skatepark.matches = { city: {}, name: {}, obstacles: {} };

  //   if (starsEqualityIsOn && Number(skatepark.rating) < Number(stars)) {
  //     return false;
  //   }

  //   if (starsEqualIsOn && Number(skatepark.rating) !== Number(stars)) {
  //     return false;
  //   }

  //   if (query && query !== '') {
  //     let queryMatch = false;

  //     if (exactMatchIsOn) {
  //       if (filterTextAttr(skatepark, 'city', query, exactMatchIsOn)) {
  //         queryMatch = true;
  //       }

  //       if (filterTextAttr(skatepark, 'name', query, exactMatchIsOn)) {
  //         queryMatch = true;
  //       }
  //     } else {
  //       splitQuery
  //         .filter(query => query !== '')
  //         .map(query => {
  //           if (filterTextAttr(skatepark, 'city', query, exactMatchIsOn)) {
  //             queryMatch = true;
  //           }

  //           if (filterTextAttr(skatepark, 'name', query, exactMatchIsOn)) {
  //             queryMatch = true;
  //           }
  //         });
  //     }

  //     if (!queryMatch) return false;
  //   }

  //   if (obstacles && obstacles !== '') {
  //     let obstaclesMatch = false;

  //     splitObstacles
  //       .filter(query => query !== '')
  //       .map(query => {
  //         if (filterTextAttr(skatepark, 'obstacles', query, false)) {
  //           obstaclesMatch = true;
  //         }
  //       });

  //     if (!obstaclesMatch) return false;
  //   }

  //   return true;
  // };

  // const keySort = (event: KeyboardEvent<HTMLInputElement>) => {
  //   const keyCode = event.code;
  //   console.log(keyCode);
  //   // if (keyCode === 13 || keyCode === 32) {
  //   //   handleTableHeaderClick(event);
  //   // }
  // };

  // const compareAttrs = (a: Skatepark, b: Skatepark) => {
  //   const varA =
  //     typeof a[sortAttr] === 'string' ? a[sortAttr].toUpperCase() : a[sortAttr];
  //   const varB =
  //     typeof b[sortAttr] === 'string' ? b[sortAttr].toUpperCase() : b[sortAttr];

  //   let comparison = 0;
  //   if (varA > varB) {
  //     comparison = 1;
  //   } else if (varA < varB) {
  //     comparison = -1;
  //   }
  //   return sortDirection === 'desc' ? comparison * -1 : comparison;
  // };

  // const handleSort = (attr: Attr) => {
  //   setSortAttr(attr);
  // };

  // const handleTableHeaderClick = (event: MouseEvent<HTMLDivElement>) => {
  //   console.log(event);
  // const {
  //   currentTarget: {
  //     attributes: {
  //       name: { value },
  //     },
  //   },
  // } = event;
  // const newDirection =
  //   sortAttr === value && sortDirection === 'asc' ? 'desc' : 'asc';

  // if (!hasBeenSorted) setHasBeenSorted(true);
  // setSortAttr(value);
  // setSortDirection(newDirection);
  // };

  // const createBoldString = (attrString, matchIndex, filter) => {
  //   const output = titleize(attrString);
  //   const first = output.slice(0, matchIndex);
  //   const bold = output.slice(matchIndex, matchIndex + filter.length);
  //   const last = output.slice(matchIndex + filter.length);

  //   return `${first}<span class="orange">${bold}</span>${last}`;
  // };

  // const displayAttr = (park: Skatepark, attr: Attr) => {
  //   // if (park.displayHtmlStrings && park.displayHtmlStrings[attr]) {
  //   //   return (
  //   //     <span
  //   //       dangerouslySetInnerHTML={{ __html: park.displayHtmlStrings[attr] }}
  //   //     />
  //   //   );
  // };

  return (
    <div className="advanced-search-container">
      <h2>Search</h2>
      <form>
        <div className="row">
          <div className="field query">
            <label htmlFor="query" className="label">
              Name/City
            </label>
            <div className="input-container">
              <input
                name="query"
                type="text"
                value={filters.query}
                onChange={handleRadioChange}
              />
            </div>
            <div className="row">
              <label htmlFor="exactMatchIsOn">
                <input
                  name="exact"
                  type="checkbox"
                  checked={filters.exact}
                  onChange={handleCheckboxChange}
                />
                Use exact match
              </label>
            </div>
          </div>
          <div className="field column states">
            <label htmlFor="states" className="label">
              State
            </label>
            <div className="input-container row">
              <label className="checkbox-container">
                <input
                  name="california"
                  type="checkbox"
                  className="checkbox"
                  checked={filters.california}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark" />
                CA
              </label>
              <label className="checkbox-container">
                <input
                  name="oregon"
                  type="checkbox"
                  className="checkbox"
                  checked={filters.oregon}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark" />
                OR
              </label>
              <label className="checkbox-container">
                <input
                  name="washington"
                  type="checkbox"
                  className="checkbox"
                  checked={filters.washington}
                  onChange={handleCheckboxChange}
                />
                <span className="checkmark" />
                WA
              </label>
            </div>
          </div>
          <div className="field">
            <label htmlFor="stars" className="label">
              Stars
            </label>
            <div className="row input-container">
              <div className="column">
                <label className="checkbox-container tiny">
                  <input
                    name="starsEquality"
                    value="atLeast"
                    type="radio"
                    checked={filters.starsEquality === 'atLeast'}
                    onChange={handleRadioChange}
                  />
                  <span className="checkmark" />
                  at least
                </label>
                <label className="checkbox-container tiny">
                  <input
                    name="starsEquality"
                    type="radio"
                    value="equal"
                    checked={filters.starsEquality === 'equal'}
                    onChange={handleRadioChange}
                  />
                  <span className="checkmark" />
                  equal to
                </label>
              </div>
              <StarInput
                stars={filters.stars}
                setStars={setStars}
                isTiny={isMobile}
                showError={false}
              />
            </div>
          </div>
          <div className="field">
            <label htmlFor="obstacles" className="label">
              Obstacles
            </label>
            <input
              name="obstacles"
              type="text"
              // onChange={handleObstaclesChange}
            />
          </div>
        </div>
        <p className="num-results">
          {filteredSkateparks?.length}{' '}
          {`Result${filteredSkateparks?.length === 1 ? '' : 's'}`}
        </p>
      </form>
      {isMobile && (
        <div className="field">
          <label className="label">Sort by</label>
        </div>
      )}
      {/* <div className="table-header">
        {!isMobile && <div className="column photo" />}
        {SKATEPARK_ATTRS.map(attrObj => (
          <div
            key={attrObj.name}
            className={`column sort-button ${attrObj.name}`}
            // name={attrObj.name}
            role="button"
            // tabIndex="0"
            onClick={handleTableHeaderClick}
            onKeyDown={keySort}
          >
            {attrObj.text}
            {isSorted(attrObj.name) && (
              <i
                className={`fas fa-arrow-down sort-arrow${hasSortDirection(attrObj.name)}`}
              ></i>
            )}
          </div>
        ))}
      </div> */}
      <Results
        skateparks={filteredSkateparks}
        queryLength={filters.query.length}
      />
      {/* {filteredParks.map(park => (
        <a href={`/skateparks/${park.slug}`} key={park.slug} className="row">
          <div className="column photo">{displayAttr(park, 'map_photo')}</div>
          {isMobile ? (
            <React.Fragment>
              <div className="main-text">
                <p className="name">{displayAttr(park, 'name')}</p>
                <p>
                  {displayAttr(park, 'city')}, {displayAttr(park, 'state')}
                </p>
                {displayAttr(park, 'rating')}
              </div>
            </React.Fragment>
          ) : (
            SKATEPARK_ATTRS.map(attrObj => (
              <div
                className={`column ${attrObj.name}`}
                key={`${park.slug}-${attrObj.name}`}
              >
                {displayAttr(park, attrObj.name)}
              </div>
            ))
          )}
        </a>
      ))} */}
    </div>
  );
};
