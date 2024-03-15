import React from 'react';
// import { Collection } from '.';
import { getIcon } from './utils';
import { CollectionVisibility, VisibilityOption } from './Map';

type LegendProps = {
  collections: CollectionVisibility;
  main?: string;
};

export const Legend = ({ collections, main }: LegendProps) => {
  return (
    <div id="map-legend">
      <p className="legend-title">Legend</p>
      <div className="icons">
        {main && (
          <div className="icon-container">
            <img src={getIcon('main')} />
            <p className="capitalize">{main}</p>
          </div>
        )}
        {Object.values(collections).map((collection: VisibilityOption) => {
          if (collection.isVisible) {
            return (
              <div className="icon-container" key={collection.type}>
                <img src={getIcon(collection.type)} />
                <p className="capitalize">{collection.type}</p>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};
