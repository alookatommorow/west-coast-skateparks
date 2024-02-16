import React, { useState } from 'react';
import { Skatepark } from '../../types';
import { SkateparkMarker } from './SkateparkMarker';
import { Collection, CollectionCategory } from '.';

type MapContentProps = {
  main?: Skatepark;
  collections: Collection[];
  collectionVisibility: Record<CollectionCategory, boolean>;
};

export const MapContent = ({
  main,
  collections,
  collectionVisibility,
}: MapContentProps) => {
  const [currentParkId, setCurrentParkId] = useState<string | undefined>();

  const handleClick = (slug: string) => {
    setCurrentParkId(slug);
  };

  const handleCloseClick = () => setCurrentParkId(undefined);

  return (
    <>
      {main && (
        <SkateparkMarker
          skatepark={main}
          type="main"
          isVisible
          handleClick={() => handleClick(main.slug)}
          handleCloseClick={handleCloseClick}
          isInfoWindowVisible={currentParkId === main.slug}
        />
      )}
      {collections.map((collection: Collection) => {
        if (collectionVisibility[collection.type]) {
          return collection.items.map((park: Skatepark) => {
            if (park.latitude && park.longitude) {
              return (
                <SkateparkMarker
                  key={park.slug}
                  skatepark={park}
                  isVisible={true}
                  handleCloseClick={handleCloseClick}
                  handleClick={() => handleClick(park.slug)}
                  type={collection.type}
                  isInfoWindowVisible={currentParkId === park.slug}
                />
              );
            }
          });
        }
      })}
    </>
  );
};
