import React, { Dispatch, SetStateAction } from 'react';
import { MapData, SkateparkData, SkateparkType } from './types';

type OptionsProps = {
  setMapData: Dispatch<SetStateAction<MapData | undefined>>;
  mapData: MapData;
};

const BUTTON_TEXT = {
  nearby: 'Nearby Parks',
  visited: 'Visited Parks',
  favorite: 'Favorite Parks',
};

type ButtonCategory = keyof typeof BUTTON_TEXT;

export const Options = ({ setMapData, mapData }: OptionsProps) => {
  const toggleVisibility = (type: SkateparkType) => {
    setMapData({
      ...mapData,
      ...newVisibility(type),
    });
  };

  const newBothVisibility = (visibility: MapData) => {
    let isVisible = true;
    let renderAsType: SkateparkType = 'both';
    const favoriteVisibility = visibility.favorite?.isVisible;
    const visitVisibility = visibility.visited?.isVisible;

    // if neither favorites or visits are visible, do not show 'both'
    if (!(favoriteVisibility || visitVisibility)) {
      isVisible = false;
    } else {
      if (!visitVisibility) renderAsType = 'favorite';
      else if (!favoriteVisibility) renderAsType = 'visited';
    }

    return {
      both: {
        ...visibility.both,
        isVisible,
        renderAsType,
      },
    };
  };

  const newVisibility = (type: SkateparkType) => {
    const newState = {
      ...mapData,
      [type]: {
        ...mapData[type],
        isVisible: !mapData[type].isVisible,
      },
    };

    if (type === 'favorite' || type === 'visited') {
      return {
        ...newState,
        ...newBothVisibility(newState),
      };
    }

    return newState;
  };

  return (
    <div id="map-toggle-buttons">
      <p>Display Options</p>
      {Object.values(mapData).map((collection: SkateparkData) => {
        if (collection.toggleEnabled)
          return (
            <label key={collection.type}>
              <input
                type="checkbox"
                name={collection.type}
                onChange={() => toggleVisibility(collection.type)}
                checked={collection.isVisible}
              />
              {BUTTON_TEXT[collection.type as ButtonCategory]}
            </label>
          );
      })}
    </div>
  );
};
