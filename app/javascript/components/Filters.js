import React, { useState, useEffect } from 'react';
import StarInput from 'components/StarInput';

function Filters({ config, updateConfig }) {
  const {
    nameCity,
    states,
    stars,
    obstacles,
  } = config;

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

  useEffect(() => {
    const handleResize = () => {
      if (!isMobile && window.innerWidth <= 767) {
        setIsMobile(true);
      } else if (isMobile && window.innerWidth > 767) {
        setIsMobile(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const setNameCity = e => {
    updateConfig({
      ...config,
      nameCity: {
        ...nameCity,
        value: e.target.value,
        values: e.target.value.split(' '),
      }
    })
  }

  const setNameCityExact = () => {
    updateConfig({
      ...config,
      nameCity: {
        ...nameCity,
        useExact: !nameCity.useExact,
      }
    })
  }

  const setStars = newStars => {
    updateConfig({
      ...config,
      stars: {
        ...stars,
        value: newStars,
      }
    });
  };

  const setStarsComparator = () => {
    updateConfig({
      ...config,
      stars: {
        ...config.stars,
        comparator: stars.comparator === 'at least' ? 'equal' : 'at least',
      }
    });
  }

  const setObstacles = event => {
    const { target: { value } } = event;
    updateConfig({
      ...config,
      obstacles: {
        ...config.obstacles,
        value: e.target.value,
        values: e.target.value.split(' '),
      }
    })
  };

  return (
    <div className="advanced-search-container">
      <form>
        <div className="row">
          {nameCity.ui && (
            <div className="field name-city">
              <label htmlFor="name-city" className="label">
                Name/City
            </label>
              <input
                name="name-city"
                type="text"
                value={nameCity.value}
                onChange={setNameCity}
              />
              <div className="row">
                <label htmlFor="exactMatchIsOn">
                  <input
                    name="exactMatchIsOn"
                    type="checkbox"
                    checked={nameCity.useExact}
                    onChange={setNameCityExact}
                  />
                Use exact match
              </label>
              </div>
            </div>
          )}
          {states.ui && (
            <div className="field column states">
              <label htmlFor="states" className="label">
                State
              </label>
              <div className="row">
                <label htmlFor="california" className="checkbox-container">
                  CA
                  <input
                    id="california"
                    name="california"
                    type="checkbox"
                    className="checkbox"
                    checked={ca}
                    onChange={toggleCa}
                  />
                  <span className="checkmark" />
                </label>
                <label htmlFor="oregon" className="checkbox-container">
                  OR
                  <input
                    id="oregon"
                    name="oregon"
                    type="checkbox"
                    className="checkbox"
                    checked={or}
                    onChange={toggleOr}
                  />
                  <span className="checkmark" />
                </label>
                <label htmlFor="washington" className="checkbox-container">
                  WA
                  <input
                    id="washington"
                    name="washington"
                    type="checkbox"
                    className="checkbox"
                    checked={wa}
                    onChange={toggleWa}
                  />
                  <span className="checkmark" />
                </label>
              </div>
            </div>
          )}
          {stars.ui && (
            <div className="field">
              <label htmlFor="stars" className="label">
                Stars
              </label>
              <div className="row">
                <div className="column">
                  <label
                    htmlFor="starsAtLeastIsOn"
                    className="checkbox-container tiny"
                  >
                    at least
                    <input
                      id="starsAtLeastIsOn"
                      name="starsAtLeastIsOn"
                      type="checkbox"
                      checked={stars.comparator === 'at least'}
                      onChange={setStarsComparator}
                    />
                    <span className="checkmark" />
                  </label>
                  <label
                    htmlFor="starsEqualIsOn"
                    className="checkbox-container tiny"
                  >
                    equal to
                    <input
                      id="starsEqualIsOn"
                      name="starsEqualIsOn"
                      type="checkbox"
                      checked={stars.comparator === 'equal'}
                      onChange={setStarsComparator}
                    />
                    <span className="checkmark" />
                  </label>
                </div>
                <StarInput
                  stars={stars.value}
                  setStars={setStars}
                  tiny={isMobile}
                />
              </div>
            </div>
          )}
          {obstacles.ui && (
            <div className="field">
              <label htmlFor="obstacles" className="label">
                Obstacles
              </label>
              <input name="obstacles" type="text" onChange={setObstacles} />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default props => <Filters {...props} />
