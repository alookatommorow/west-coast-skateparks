import React from 'react';
import { getIcon } from './utils';
import { ResourceName, SkateparkType } from './types';

type LegendProps = {
  main?: string;
  resourceName: ResourceName;
};

export const Legend = ({ main, resourceName }: LegendProps) => {
  const icons: SkateparkType[] =
    resourceName === 'user' ? ['favorite', 'visited', 'both'] : ['nearby'];
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
        {icons.map((type: SkateparkType) => {
          return (
            <div className="icon-container" key={type}>
              <img src={getIcon(type)} />
              <p className="capitalize">{type}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
