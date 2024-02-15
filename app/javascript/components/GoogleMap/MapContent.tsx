import React from 'react';
import { Skatepark } from '../../types';
import { SkateparkMarker } from './SkateparkMarker';

type LatLng = {
  lat: number;
  lng: number;
};

type Resource = Skatepark;

type MapContentProps = {
  resource: Resource;
  center: LatLng;
  showNearby: boolean;
};

// const mapContent =

export const MapContent = ({ resource, showNearby }: MapContentProps) => {
  return (
    <>
      <SkateparkMarker skatepark={resource} type="main" isVisible />
      {showNearby &&
        resource?.neighbor_parks?.map((park: Skatepark) => {
          if (park.latitude && park.longitude) {
            return (
              <SkateparkMarker
                key={park.slug}
                skatepark={park}
                isVisible={showNearby}
                type="nearby"
              />
            );
          }
        })}
    </>
  );
};
