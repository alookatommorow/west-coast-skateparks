import React from 'react';
// import { Collection, CollectionCategory } from '.';
import { CollectionVisibility, VisibilityOption } from './Map';
import { CollectionCategory } from './types';

type OptionsProps = {
  // collections: Collection[];
  toggleCollection: (category: CollectionCategory) => void;
  collectionVisibility: CollectionVisibility;
};

const BUTTON_TEXT = {
  nearby: 'Nearby Parks',
  visited: 'Visited Parks',
  favorite: 'Favorite Parks',
};

type ButtonCategory = keyof typeof BUTTON_TEXT;

export const Options = ({
  // collections,
  toggleCollection,
  collectionVisibility,
}: OptionsProps) => {
  return (
    <div id="map-toggle-buttons">
      <p>Display Options</p>
      {Object.values(collectionVisibility).map(
        (collection: VisibilityOption) => {
          if (collection.toggleEnabled)
            return (
              <label key={collection.type}>
                <input
                  type="checkbox"
                  name={collection.type}
                  onChange={() => toggleCollection(collection.type)}
                  checked={collection.isVisible}
                />
                {BUTTON_TEXT[collection.type as ButtonCategory]}
              </label>
            );
        },
      )}
    </div>
  );
};
