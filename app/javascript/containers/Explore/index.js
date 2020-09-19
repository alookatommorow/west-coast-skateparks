import React, { useState, useEffect } from 'react';
import Map from './components/Map';

function Explore(props) {
  const [skateparks, setSkateparks] = useState(null);
  const [location, setLocation] = useState(null);
  const [userLat, setUserLat] = useState(null);
  const [userLng, setUserLng] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (navigator.geolocation) {
      const Geolocation = navigator.geolocation;
      Geolocation.getCurrentPosition(position => {
        setLocation(position);
        setUserLat(position.coords.latitude);
        setUserLng(position.coords.longitude);
      });
    }

    if (!skateparks) getSkateparks();
  }, []);

  const getSkateparks = () => {
    setIsLoading(true);
    $.get('/api/skateparks', { for_map: true })
      .done(storeAllSkateparks);
  };

  const storeAllSkateparks = response => {
    setSkateparks(response);
    setIsLoading(false);
  };

  return (
    <div id="explore">
      <h1>supwiddit</h1>
      <Map
        skateparks={skateparks}
        userLat={userLat}
        userLng={userLng}
      />
    </div>
  );
};

export default props => <Explore {...props} />
