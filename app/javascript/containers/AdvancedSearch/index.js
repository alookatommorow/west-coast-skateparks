import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AdvancedSearch(props) {
  const { caParks, orParks, waParks } = props;
  const [ca, setCa] = useState(true);
  const [or, setOr] = useState(true);
  const [wa, setWa] = useState(true);
  const [city, setCity] = useState(null);
  const [cityFilterIsOn, setCityFilterIsOn] = useState(false);
  const [name, setName] = useState(null);
  const [nameFilterIsOn, setNameFilterIsOn] = useState(false);

  useEffect(() => {
    if (!city || city === '') setCityFilterIsOn(false);
    else if (!cityFilterIsOn) setCityFilterIsOn(true);
  }, [city]);

  useEffect(() => {
    if (!name || name === '') setNameFilterIsOn(false);
    else if (!nameFilterIsOn) setNameFilterIsOn(true);
  }, [name]);

  const handleCityChange = event => setCity(event.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handleCaChange = () => setCa(!ca);
  const handleWaChange = () => setWa(!wa);
  const handleOrChange = () => setOr(!or);
  const filterCity = cityToCheck => cityToCheck.indexOf(city) !== -1;
  const filterName = nameToCheck => nameToCheck.indexOf(name) !== -1;
  const filterSkateparks = skatepark => {
    if (cityFilterIsOn && (!skatepark.city || !filterCity(skatepark.city))) {
      return false;
    }
    if (nameFilterIsOn && (!skatepark.name || !filterName(skatepark.name))) {
      return false;
    }
    return true;
  }

  const skateparks = [
    ...(ca ? caParks : []),
    ...(or ? orParks : []),
    ...(wa ? waParks : []),
  ].filter(skatepark => filterSkateparks(skatepark));

  return (
    <div>
      <label htmlFor="city">
        City
        <input name="city" type="text" onChange={handleCityChange} />
      </label>
      <label htmlFor="name">
        Name
        <input name="name" type="text" onChange={handleNameChange} />
      </label>
      <label htmlFor="california">
        <input name="california" type="checkbox" checked={ca} onChange={handleCaChange} />
        CA
      </label>
      <label htmlFor="oregon">
        <input name="oregon" type="checkbox" checked={or} onChange={handleOrChange} />
        OR
      </label>
      <label htmlFor="washington">
        <input name="washington" type="checkbox" checked={wa} onChange={handleWaChange} />
        WA
      </label>
      <p>{skateparks.length}</p>
      { skateparks.map(park => <p key={park.slug}>{park.name} - {park.city}, {park.state}</p>) }
    </div>
  );
};

export default props => <AdvancedSearch {...props} />
