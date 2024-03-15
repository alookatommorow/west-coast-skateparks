import React, { Dispatch, SetStateAction } from 'react';
// import React, { useState } from 'react';
// import { CollectionCategory, Resource } from '.';
import { MapContent } from './MapContent';
import { Options } from './Options';
import { Legend } from './Legend';
import { Skatepark } from '../../types';
import { CollectionCategory } from './types';

type MapProps = {
  collectionVisibility: CollectionVisibility;
  setMapResource: Dispatch<SetStateAction<CollectionVisibility | undefined>>;
};

export type VisibilityOption = {
  isVisible: boolean;
  toggleEnabled: boolean;
  renderAsType?: CollectionCategory;
  items: Skatepark[];
  type: CollectionCategory;
};

export type CollectionVisibility = Record<CollectionCategory, VisibilityOption>;

export const Map = ({ collectionVisibility, setMapResource }: MapProps) => {
  const toggleCollection = (category: CollectionCategory) => {
    setMapResource({
      ...collectionVisibility,
      ...newVisibility(category),
    });
  };

  const newBothVisibility = (visibility: CollectionVisibility) => {
    let isVisible = true;
    let renderAsType: CollectionCategory = 'both';
    const favoriteVisibility = visibility.favorite.isVisible;
    const visitVisibility = visibility.visited.isVisible;

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
        toggleEnabled: false,
      },
    };
  };

  const newVisibility = (category: CollectionCategory) => {
    const newState = {
      ...collectionVisibility,
      [category]: {
        ...collectionVisibility[category],
        isVisible: !collectionVisibility[category].isVisible,
      },
    };

    if (category === 'favorite' || category === 'visited') {
      return {
        ...newState,
        ...newBothVisibility(newState),
      };
    }

    return newState;
  };

  return (
    collectionVisibility && (
      <>
        <MapContent collectionVisibility={collectionVisibility} />
        <Options
          toggleCollection={toggleCollection}
          collectionVisibility={collectionVisibility}
        />
        <Legend collections={collectionVisibility} />
      </>
    )
  );
};
