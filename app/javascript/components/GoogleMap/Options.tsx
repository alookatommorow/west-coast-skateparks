import React from 'react';
import { Collection, CollectionCategory } from '.';

type OptionsProps = {
  collections?: Collection[];
  toggleCollection: (category: CollectionCategory) => void;
  collectionVisibility: Record<CollectionCategory, boolean>;
};

const BUTTON_TEXT = {
  nearby: 'Nearby Parks',
  visited: 'Visited Parks',
  favorite: 'Favorite Parks',
  both: 'Both',
};

export const Options = ({
  collections,
  toggleCollection,
  collectionVisibility,
}: OptionsProps) => {
  return (
    <div id="map-toggle-buttons">
      <p>View Options</p>
      {collections &&
        collections.map((collection: Collection) => {
          return (
            <label key={collection.type}>
              <input
                type="checkbox"
                name={collection.type}
                onChange={() => toggleCollection(collection.type)}
                checked={collectionVisibility[collection.type]}
              />
              {BUTTON_TEXT[collection.type]}
            </label>
          );
        })}
    </div>
  );
};
