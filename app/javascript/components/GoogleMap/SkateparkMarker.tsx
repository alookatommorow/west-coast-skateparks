import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Skatepark } from '../../types';
import { titleize } from '../../utils';
import { Stars } from '../Stars';
import { ColorOption, getIcon } from './utils';

type SkateparkMarkerProps = {
  skatepark: Skatepark;
  isVisible: boolean;
  isInfoWindowVisible: boolean;
  type: ColorOption;
  handleClick: () => void;
  handleCloseClick: () => void;
};

export const SkateparkMarker = ({
  skatepark,
  isVisible,
  isInfoWindowVisible,
  type,
  handleClick,
  handleCloseClick,
}: SkateparkMarkerProps) => {
  if (!isVisible) return;

  return (
    <>
      {skatepark.latitude && skatepark.longitude && (
        <>
          <Marker
            position={{ lat: skatepark.latitude, lng: skatepark.longitude }}
            icon={getIcon(type)}
            onClick={handleClick}
          />
          {isInfoWindowVisible && (
            <InfoWindow
              position={{ lat: skatepark.latitude, lng: skatepark.longitude }}
              onCloseClick={handleCloseClick}
              options={{ pixelOffset: new window.google.maps.Size(0, -32) }}
            >
              <a href={`/skateparks/${skatepark.slug}`}>
                {skatepark.map_photo && (
                  <img loading="lazy" src={skatepark.map_photo} />
                )}
                <strong>{titleize(skatepark.name)}</strong>
                <p>{titleize(skatepark.city)}</p>
                {skatepark.stars && (
                  <Stars stars={skatepark.stars} tiny></Stars>
                )}
              </a>
            </InfoWindow>
          )}
        </>
      )}
    </>
  );
};
