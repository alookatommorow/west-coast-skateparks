import React from 'react';
import { Marker } from '@react-google-maps/api';
import { Skatepark } from '../../types';

type ColorOptions = {
  main: string;
  nearby: string;
  favorite: string;
  visited: string;
  both: string;
};

type LatLng = {
  lat: number;
  lng: number;
};

type ColorCategory = keyof ColorOptions;

const COLOR_OPTIONS = {
  main: 'red-dot',
  nearby: 'green-dot',
  favorite: 'purple-dot',
  visited: 'yellow-dot',
  both: 'blue-dot',
};

type MapContentProps = {
  resource?: Skatepark;
  center: LatLng;
  showNearby: boolean;
};

export const MapContent = ({
  resource,
  center,
  showNearby,
}: MapContentProps) => {
  const getIcon = (type: ColorCategory) => {
    return (
      'https://maps.google.com/mapfiles/ms/icons/' +
      COLOR_OPTIONS[type] +
      '.png'
    );
  };

  return (
    <>
      <Marker position={center} icon={getIcon('main')} />
      {showNearby &&
        resource?.neighbor_parks?.map((park: Skatepark) => {
          if (park.latitude && park.longitude) {
            return (
              <Marker
                key={park.slug}
                position={{ lat: park.latitude, lng: park.longitude }}
                icon={getIcon('nearby')}
              />
            );
          }
        })}
    </>
  );
};
