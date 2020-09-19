import React, { useState, useEffect, useRef } from 'react';
import { compose, withProps } from 'recompose';
import { PropTypes, DefaultProps } from 'prop-types';
import { withGoogleMap, GoogleMap, Marker } from 'react-google-maps';
import { DEFAULT_LAT, DEFAULT_LNG } from '../constants';

const Map = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div className="map-container" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)(props => {
  const {
    userLat,
    userLng,
    skateparks,
  } = props;

  const map = useRef();

  if (map.current) {
    console.log(map.current.getBounds());
  }

  const [centerLat, setCenterLat] = useState(DEFAULT_LAT);
  const [centerLng, setCenterLng] = useState(DEFAULT_LNG);

  useEffect(() => {
    if (userLat) setCenterLat(userLat);
    if (userLng) setCenterLng(userLng);
  }, [userLat, userLng]);

  return (
    <GoogleMap
      defaultZoom={8}
      center={{ lat: centerLat, lng: centerLng}}
      ref={map}
    >
      {userLat && userLng && (
        <Marker position={{ lat: userLat, lng: userLng }} />
      )}
      {skateparks && skateparks.map(skatepark => (
        skatepark.latitude && skatepark.longitude && (
          <Marker
            key={`${skatepark.slug}-marker`}
            position={
              { lat: skatepark.latitude, lng: skatepark.longitude }
            }
          />
        )
      ))}
    </GoogleMap>
  );
});

Map.propTypes = {
  userLat: PropTypes.number,
  userLng: PropTypes.number,
}

Map.defaultProps = {
  userLat: PropTypes.number,
  userLng: PropTypes.number,
}

export default props => <Map {...props} />