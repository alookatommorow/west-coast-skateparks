import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import LocationSearchInput from 'components/LocationSearchInput';

function Explore(props) {
  const [skateparks, setSkateparks] = useState(null);
  const [currentSkatepark, setCurrentSkatepark] = useState(null);
  const [location, setLocation] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        setLocation(position);
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }

    if (!skateparks) getSkateparks();
  }, []);

  const getSkateparks = () => {
    $.get('/api/skateparks', { for_map: true })
      .done(storeAllSkateparks);
  };

  const storeAllSkateparks = response => {
    setSkateparks(response);
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
        skateparks={skateparks}
        userLat={userLat}
        userLng={userLng}
        isLoading={isLoading}
        handleClick={handleClickMarker}
        currentSkatepark={currentSkatepark}
      />
      <LocationSearchInput
        handleSelect={handleSelectOption}
        setIsLoading={setIsLoading}
      />
    </div>
  );
};

export default props => <Explore {...props} />
