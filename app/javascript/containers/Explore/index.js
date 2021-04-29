import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import LocationSearchInput from 'components/LocationSearchInput';
import { filterSkateparks } from 'utils/filterSkateparks';
import DisplayAttr from 'components/DisplayAttr';
import Filters from 'components/Filters';
import { CONFIG } from './constants';

function Explore(props) {
  const [skateparks, setSkateparks] = useState(null);
  const [currentSkatepark, setCurrentSkatepark] = useState(null);
  const [location, setLocation] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [filteredParks, setFilteredParks] = useState([]);
  const [config, setConfig] = useState(CONFIG);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation(position);
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
        setIsLoading(false);
      }, error => {
        // TODO - show error message
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    if (!skateparks) getSkateparks();
  }, []);

  useEffect(() => {
    setConfig({
      ...config,
      distance: {
        ...config.distance,
        fromLat: userLat,
        fromLng: userLng,
      }
    })
  }, [userLat, userLng]);

  useEffect(() => {
    if (skateparks) setFilteredParks(filterSkateparks(skateparks, config))
  }, [config]);

  const getSkateparks = () => {
    $.get('/api/skateparks', { for_map: true })
      .done(storeAllSkateparks);
  };

  const storeAllSkateparks = response => {
    setSkateparks(response);
    setFilteredParks(filterSkateparks(skateparks, config));
  };

  const handleClickMarker = marker => {
    setCurrentSkatepark(
      skateparks.find(skatepark => skatepark.latitude === marker.latLng.lat())
    );
  };

  const handleSelectOption = latLng => {
    setUserLat(latLng.lat);
    setUserLng(latLng.lng);
    setIsLoading(false);
  };

  return (
    <div id="explore">
      <Map
        skateparks={filteredParks}
        userLat={userLat}
        userLng={userLng}
        isLoading={isLoading}
        handleClick={handleClickMarker}
        currentSkatepark={currentSkatepark}
      />
      <p>only show me...</p>
      <Filters
        config={config}
        updateConfig={setConfig}
      />
      {/* {filteredParks && (filteredParks.map(park => (
        <div>
          <DisplayAttr
            park={park}
            attr={'name'}
          />
          <DisplayAttr
            park={park}
            attr={'city'}
          />
        </div>
      )))} */}
      <LocationSearchInput
        handleSelect={handleSelectOption}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default props => <Explore {...props} />
