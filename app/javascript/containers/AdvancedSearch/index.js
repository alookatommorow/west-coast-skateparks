import React, { useState, useEffect, useRef } from 'react';
import useToggle from 'hooks/useToggle';
import StarInput from 'components/StarInput';

function AdvancedSearch(props) {
  const { caParks, orParks, waParks } = props;
  const [city, setCity] = useState(null);
  const [stars, setStars] = useState(1);
  const [cityFilterIsOn, setCityFilterIsOn] = useState(false);
  const [name, setName] = useState(null);
  const [nameFilterIsOn, setNameFilterIsOn] = useState(false);
  const [starsAtLeastIsOn, setStarsAtLeastIsOn] = useState(false);
  const [starsEqualIsOn, setStarsEqualIsOn] = useState(false);
  const { toggleIsOn: ca, toggle: toggleCa } = useToggle(true);
  const { toggleIsOn: or, toggle: toggleOr } = useToggle(true);
  const { toggleIsOn: wa, toggle: toggleWa } = useToggle(true);

  useEffect(() => {
    if (!city || city === '') setCityFilterIsOn(false);
    else if (!cityFilterIsOn) setCityFilterIsOn(true);
  }, [city]);

  useEffect(() => {
    if (!name || name === '') setNameFilterIsOn(false);
    else if (!nameFilterIsOn) setNameFilterIsOn(true);
  }, [name]);

  useEffect(() => {
    if (!starsAtLeastIsOn && !starsEqualIsOn) setStarsAtLeastIsOn(true);
  }, [stars]);

  useEffect(() => {
    if (starsAtLeastIsOn) setStarsEqualIsOn(false);
  }, [starsAtLeastIsOn]);

  useEffect(() => {
    if (starsEqualIsOn) setStarsAtLeastIsOn(false);
  }, [starsEqualIsOn]);

  const handleCityChange = event => setCity(event.target.value);
  const handleNameChange = event => setName(event.target.value);
  const handleStarsChange = event => {
    const { currentTarget: { value } } = event;
    let newStars = Number(value);
    console.log(newStars)
    console.log(stars)
    if (newStars === Number(stars)) {
      newStars -= 1;
    }

    setStars(newStars);
  };
  const toggleStarsEqualIsOn = () => setStarsEqualIsOn(!starsEqualIsOn);
  const togglestarsAtLeastIsOn = () => setStarsAtLeastIsOn(!starsAtLeastIsOn);
  const filterCity = cityToCheck => cityToCheck.indexOf(city) !== -1;
  const filterName = nameToCheck => nameToCheck.indexOf(name) !== -1;
  const filterSkateparks = skatepark => {
    if (cityFilterIsOn && (!skatepark.city || !filterCity(skatepark.city))) {
      return false;
    }

    if (nameFilterIsOn && (!skatepark.name || !filterName(skatepark.name))) {
      return false;
    }

    if (starsAtLeastIsOn && !!stars && (Number(skatepark.rating) < Number(stars))) {
      return false;
    }

    if (starsEqualIsOn && !!stars && (Number(skatepark.rating) !== Number(stars))) {
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
    <div className="advanced-search-container">
      <form>
        <div className="row">
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
            <label className="label" htmlFor="city">
              City
            </label>
            <input name="city" type="text" onChange={handleCityChange} />
          </div>
          <div className="field">
            <label htmlFor="name" className="label">
              Name
            </label>
            <input name="name" type="text" onChange={handleNameChange} />
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
              />
            </div>
          </div>
        </div>

      </form>
      <p>{skateparks.length}</p>
      { skateparks.map(park => <p key={park.slug}>{park.name} - {park.city}, {park.state} ({park.rating})</p>) }
    </div>
  );
};

export default props => <AdvancedSearch {...props} />
