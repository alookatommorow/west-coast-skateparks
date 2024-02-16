import React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Skatepark } from '../../types';
import { titleize } from '../../utils';
import { Stars } from '../Stars';
import { CollectionCategory } from '.';

type Main = 'main';
type ColorOption = CollectionCategory | Main;

const COLOR_OPTIONS = {
  main: 'red-dot',
  nearby: 'green-dot',
  favorite: 'purple-dot',
  visited: 'yellow-dot',
  both: 'blue-dot',
};

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
  const getIcon = (type: ColorOption) => {
    return (
      'https://maps.google.com/mapfiles/ms/icons/' +
      COLOR_OPTIONS[type] +
      '.png'
    );
  };

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
                <img loading="lazy" src={skatepark.map_photo} />
                <strong>{titleize(skatepark.name)}</strong>
                <p>{titleize(skatepark.city)}</p>
                {skatepark.rating && (
                  <Stars stars={Number(skatepark.rating)} tiny></Stars>
                )}
              </a>
            </InfoWindow>
          )}
        </>
      )}
    </>
  );
};
