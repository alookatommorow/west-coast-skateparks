import React, { useState, useEffect, useRef } from 'react';
import { compose, withProps } from 'recompose';
import { PropTypes } from 'prop-types';
import {
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
} from 'react-google-maps';
import Stars from 'components/Stars';
import { DEFAULT_LAT, DEFAULT_LNG } from '../constants';

const Map = compose(
  withProps({
    loadingElement: <div style={{ height: `100%` }} className="loading-icon" />,
    containerElement: <div className="map-container" />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withGoogleMap
)(props => {
  const {
    userLat,
    userLng,
    skateparks,
    isLoading,
    handleClick,
    currentSkatepark,
  } = props;

  const [centerLat, setCenterLat] = useState(DEFAULT_LAT);
  const [centerLng, setCenterLng] = useState(DEFAULT_LNG);
  const map = useRef();

  useEffect(() => {
    if (userLat) setCenterLat(userLat);
    if (userLng) setCenterLng(userLng);
  }, [userLat, userLng]);

  if (isLoading) return <div className="loading-icon" />;
  else return (
    <React.Fragment>
      <GoogleMap
        defaultZoom={8}
        defaultCenter={{ lat: centerLat, lng: centerLng }}
        ref={map}
        defaultOptions={{ fullscreenControl: false }}
      >
        {userLat && userLng && (
          <Marker position={{ lat: userLat, lng: userLng }} />
        )}
        {skateparks && skateparks.map(skatepark => (
          skatepark.latitude && skatepark.longitude && (
            <Marker
              key={`${skatepark.slug}-marker`}
              onClick={handleClick}
              position={
                { lat: skatepark.latitude, lng: skatepark.longitude }
              }
            />
          )
        ))}
      </GoogleMap>
      <div className="info-window">
        {currentSkatepark && (
          <>
            <p className="park-name">
              {currentSkatepark.name}
            </p>
            <p>
              {currentSkatepark.city}, {currentSkatepark.state}
            </p>
            <Stars
              stars={currentSkatepark.rating}
              tiny
            />
            <img src={currentSkatepark.map_photo} />
          </>
        )}
      </div>
    </React.Fragment>
  );
});

Map.propTypes = {
  userLat: PropTypes.number,
  userLng: PropTypes.number,
}

export default props => <Map {...props} />