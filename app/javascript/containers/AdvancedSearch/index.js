import React, { useState, useEffect, useRef } from 'react';
import useToggle from 'hooks/useToggle';
import StarInput from 'components/StarInput';
import { SKATEPARK_ATTRS } from './constants';

function AdvancedSearch(props) {
  const { caParks, orParks, waParks } = props;
  const [fuzzyFilter, setfuzzyFilter] = useState(null);
  const [cityFilter, setCityFilter] = useState(null);
  const [stars, setStars] = useState(1);
  const [name, setName] = useState(null);
  const [starsAtLeastIsOn, setStarsAtLeastIsOn] = useState(false);
  const [starsEqualIsOn, setStarsEqualIsOn] = useState(false);
  const [hasBeenSorted, setHasBeenSorted] = useState(false);
  const { toggleIsOn: ca, toggle: toggleCa } = useToggle(true);
  const { toggleIsOn: or, toggle: toggleOr } = useToggle(true);
  const { toggleIsOn: wa, toggle: toggleWa } = useToggle(true);
  const [skateparks, setSkateparks] = useState([...caParks, ...orParks, ...waParks ]);
  const [sortAttr, setSortAttr] = useState('state');
  const [sortDirection, setSortDirection] = useState('asc');

  useEffect(() => {
    if (fuzzyFilter) {
      if (cityFilter) setCityFilter(null);
      if (name) setName(null);
    }
  }, [fuzzyFilter]);

  useEffect(() => {
    if (!starsAtLeastIsOn && !starsEqualIsOn) setStarsAtLeastIsOn(true);
  }, [stars]);

  useEffect(() => {
    if (starsAtLeastIsOn) setStarsEqualIsOn(false);
  }, [starsAtLeastIsOn]);

  useEffect(() => {
    if (starsEqualIsOn) setStarsAtLeastIsOn(false);
  }, [starsEqualIsOn]);

  useEffect(() => {
    const newSkateparks = [
      ...(ca ? caParks : []),
      ...(or ? orParks : []),
      ...(wa ? waParks : []),
    ];
    setSkateparks(hasBeenSorted ? newSkateparks.sort(compareAttrs) : newSkateparks);
  }, [ca, or, wa]);

  useEffect(() => {
    if (hasBeenSorted) setSkateparks([...skateparks].sort(compareAttrs));
  }, [sortAttr, sortDirection]);

  const handleFuzzyChange = event => setfuzzyFilter(event.target.value);
  const handleCityChange = event => setCityFilter(event.target.value);
  const handleNameChange = event => setName(event.target.value);
  const toggleStarsEqualIsOn = () => setStarsEqualIsOn(!starsEqualIsOn);
  const togglestarsAtLeastIsOn = () => setStarsAtLeastIsOn(!starsAtLeastIsOn);
  const isSorted = attrToCheck => attrToCheck === sortAttr;
  const hasSortDirection = attrToCheck => attrToCheck === sortAttr ? ` ${sortDirection}` : '';
  const filterParks = () => skateparks.filter(skatepark => filterSkateparks(skatepark));

  const filterTextAttr = (skatepark, attr, filter) => {
    if (!skatepark[attr]) return false;
    if (skatepark.city === 'la habra') {
      console.log(attr)
    }
    const matchIndex = skatepark[attr].toLowerCase().indexOf(filter.toLowerCase());

    if (matchIndex !== -1) {
      skatepark.matches[attr] = matchIndex;

      return true;
    }

    return false;
  }

  const handleStarsChange = event => {
    const { currentTarget: { value } } = event;
    let newStars = Number(value);

    if (newStars === Number(stars) && Number(stars) > 1) {
      newStars -= 1;
    }

    setStars(newStars);
  };

  const filterSkateparks = skatepark => {
    skatepark.matches = {};

    if (fuzzyFilter && fuzzyFilter !== '') {
      if (!filterTextAttr(skatepark, 'city', fuzzyFilter) || !filterTextAttr(skatepark, 'name', fuzzyFilter)) {
        return false;
      }
    } else {
      const cityFilterIsOn = cityFilter && cityFilter !== '';
      if (cityFilterIsOn && !filterTextAttr(skatepark, 'city', cityFilter)) {
        return false;
      }

      const nameFilterIsOn = name && name !== '';
      if (nameFilterIsOn && !filterTextAttr(skatepark, 'name', name)) {
        return false;
      }

      if (starsAtLeastIsOn && (Number(skatepark.rating) < Number(stars))) {
        return false;
      }

      if (starsEqualIsOn && (Number(skatepark.rating) !== Number(stars))) {
        return false;
      }
    }

    return true;
  }

  const keySort = event => {
    const keyCode = event.code || event.which;
    if (keyCode === 13 || keyCode === 32) {
      handleTableHeaderClick(event);
    }
  }

  const compareAttrs = (a, b) => {
    const varA = (typeof a[sortAttr] === 'string') ?
      a[sortAttr].toUpperCase() : a[sortAttr];
    const varB = (typeof b[sortAttr] === 'string') ?
      b[sortAttr].toUpperCase() : b[sortAttr];

    let comparison = 0;
    if (varA > varB) {
      comparison = 1;
    } else if (varA < varB) {
      comparison = -1;
    }
    return sortDirection === 'desc' ? (comparison * -1) : comparison;
  };

  const handleTableHeaderClick = event => {
    const { currentTarget: { attributes: { name: { value } } } } = event;
    const newDirection = (sortAttr === value && sortDirection === 'asc') ? 'desc' : 'asc';

    if (!hasBeenSorted) setHasBeenSorted(true);
    setSortAttr(value)
    setSortDirection(newDirection)
  }

  const createBoldString = (filter, attrString, matchIndex) => {
    let query = cityFilter;
    if (filter === 'name') query = name;
    if (fuzzyFilter && fuzzyFilter !== '') query = fuzzyFilter;

    const output = titleize(attrString);
    const first = output.slice(0, matchIndex);
    const bold = output.slice(matchIndex, matchIndex + query.length);
    const last = output.slice(matchIndex + query.length);

    return <span>{first}<span className="bold">{bold}</span>{last}</span>;
  };

  const displayAttr = (park, attr) => {
    if (park.matches && park.matches[attr] > -1) {
      return createBoldString(attr, park[attr], park.matches[attr]);
    } else if (park[attr] && (attr === 'name' || attr === 'city')) {
      return titleize(park[attr])
    }

    return park[attr];
  }

  return (
    <div className="advanced-search-container">
      <h2>Quick Search</h2>
      <form>
        <div className="row">
          <div className="field">
            <input name="name" type="text" onChange={handleFuzzyChange} />
          </div>
        </div>
      </form>
      <h2>Advanced Search</h2>
      <form>
        <div className="row">
          <div className="field">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input name="name" type="text" onChange={handleNameChange} />
          </div>
          <div className="field">
            <label className="label" htmlFor="city">
              City
            </label>
            <input name="city" type="text" onChange={handleCityChange} />
          </div>
          <div className="field column states">
            <label htmlFor="states" className="label">
              State
            </label>
            <div className="row">
              <label htmlFor="california">
                <input name="california" type="checkbox" checked={ca} onChange={toggleCa} />
                CA
              </label>
              <label htmlFor="oregon">
                <input name="oregon" type="checkbox" checked={or} onChange={toggleOr} />
                OR
              </label>
              <label htmlFor="washington">
                <input name="washington" type="checkbox" checked={wa} onChange={toggleWa} />
                WA
              </label>
            </div>
          </div>
          <div className="field">
            <label htmlFor="stars" className="label">
              Stars
            </label>
            <div className="row">
              <div className="column">
                <label htmlFor="starsAtLeastIsOn">
                  <input name="starsAtLeastIsOn" type="checkbox" checked={starsAtLeastIsOn} onChange={togglestarsAtLeastIsOn} />
                  at least
                </label>
                <label htmlFor="starsEqualIsOn">
                  <input name="starsEqualIsOn" type="checkbox" checked={starsEqualIsOn} onChange={toggleStarsEqualIsOn} />
                  equal to
                </label>
              </div>
              <StarInput
                stars={stars}
                handleClick={handleStarsChange}
                setStars={setStars}
              />
            </div>
          </div>
        </div>
      </form>
      <p>{skateparks.length}</p>
      <div className="table">
        <div className="row table-header">
          {
            SKATEPARK_ATTRS.map(attrObj => (
              <div
                key={attrObj.name}
                className="column"
                name={attrObj.name}
                role="button"
                tabIndex="0"
                onClick={handleTableHeaderClick}
                onKeyDown={keySort}
              >
                {attrObj.text}
                {isSorted(attrObj.name) && (
                  <i className={`fas fa-arrow-down sort-arrow${hasSortDirection(attrObj.name)}`}></i>
                )}
              </div>
            ))
          }
        </div>
        {filterParks().map(park => (
          <a
            href={`/skateparks/${park.slug}`}
            key={park.slug}
            className="row"
          >
            {SKATEPARK_ATTRS.map(attrObj => (
              <div className="column" key={`${park.slug}-${attrObj.name}`}>
                {displayAttr(park, attrObj.name)}
              </div>
            ))}
          </a>
        ))}
      </div>
    </div>
  );
};

export default props => <AdvancedSearch {...props} />
