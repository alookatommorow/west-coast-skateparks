import React, { useState } from 'react';
import { Skatepark } from '../../types';
import { SkateparkMarker } from './SkateparkMarker';
import { MapData, SkateparkData, SkateparkType } from './types';

type MapContentProps = {
  mapData: MapData;
};

export const MapContent = ({ mapData }: MapContentProps) => {
  const [currentParkId, setCurrentParkId] = useState<string | undefined>();

  const handleClick = (slug: string) => setCurrentParkId(slug);

  const renderSkateparks = (skateparks: SkateparkData) => {
    if (!skateparks.isVisible) return;

    return skateparkMarkers(
      skateparks.items,
      skateparks.renderAsType || skateparks.type,
    );
  };

  const skateparkMarkers = (skateparks: Skatepark[], type: SkateparkType) => {
    return skateparks.map((park: Skatepark) => {
      if (park.latitude && park.longitude) {
        return (
          <SkateparkMarker
            key={park.slug}
            skatepark={park}
            isVisible={true}
            handleCloseClick={handleCloseClick}
            handleClick={() => handleClick(park.slug)}
            type={type}
            isInfoWindowVisible={currentParkId === park.slug}
          />
        );
      }
    });
  };

  const handleCloseClick = () => setCurrentParkId(undefined);

  return Object.values(mapData).map((skateparks: SkateparkData) =>
    renderSkateparks(skateparks),
  );
};
