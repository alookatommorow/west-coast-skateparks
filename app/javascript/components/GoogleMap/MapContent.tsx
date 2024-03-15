import React, { useState } from 'react';
import { Skatepark } from '../../types';
import { SkateparkMarker } from './SkateparkMarker';
import { CollectionCategory } from './types';
import { CollectionVisibility, VisibilityOption } from './Map';

type MapContentProps = {
  // main?: Skatepark;
  // collections: CollectionVisibility;
  collectionVisibility: CollectionVisibility;
};

export const MapContent = ({ collectionVisibility }: MapContentProps) => {
  const [currentParkId, setCurrentParkId] = useState<string | undefined>();

  const handleClick = (slug: string) => {
    setCurrentParkId(slug);
  };

  const renderCollection = (collection: VisibilityOption) => {
    if (!collection.isVisible) return;

    return skateparkMarkers(
      collection.items,
      collection.renderAsType || collection.type,
    );
  };

  const skateparkMarkers = (
    skateparks: Skatepark[],
    type: CollectionCategory,
  ) => {
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

  return Object.values(collectionVisibility).map(
    (collection: VisibilityOption) => renderCollection(collection),
  );
};
