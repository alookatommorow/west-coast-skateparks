import { CollectionCategory, Resource } from './types';
import { CollectionVisibility } from './Map';
import { Skatepark } from '../../types';

const DEFAULT_CENTER = {
  lat: 37.78,
  lng: -122.2432604,
};

const COLOR_OPTIONS = {
  main: 'red-dot',
  nearby: 'green-dot',
  favorite: 'purple-dot',
  visited: 'yellow-dot',
  both: 'blue-dot',
};

type Main = 'main';
export type ColorOption = CollectionCategory | Main;

export const findMapCenter = (resource?: CollectionVisibility) => {
  if (!resource) return DEFAULT_CENTER;

  let centerSource: Skatepark | undefined = resource.main?.items[0];

  if (centerSource === undefined) {
    const skateparks = Object.values(resource).find(
      things =>
        things.items.length > 0 &&
        things.items[0].latitude !== undefined &&
        things.items[0].longitude !== undefined,
    );

    centerSource = skateparks?.items[0];
  }

  if (
    centerSource !== undefined &&
    centerSource.latitude &&
    centerSource.longitude
  ) {
    return { lat: centerSource.latitude, lng: centerSource.longitude };
  }

  return DEFAULT_CENTER;
};

export const getIcon = (type: ColorOption) => {
  return (
    'https://maps.google.com/mapfiles/ms/icons/' + COLOR_OPTIONS[type] + '.png'
  );
};

export const resourceToCollection = (resource: Resource | undefined) => {
  if (resource === undefined) return;

  return {
    nearby: {
      isVisible: false,
      toggleEnabled:
        resource.nearby !== undefined && resource.nearby.length > 0,
      items: resource.nearby || [],
      type: 'nearby' as CollectionCategory,
    },
    favorite: {
      isVisible: true,
      toggleEnabled:
        resource.favorite !== undefined && resource.favorite.length > 0,
      items:
        resource.favorite?.filter(
          skatepark => resource.both?.[skatepark.slug] === undefined,
        ) || [],
      type: 'favorite' as CollectionCategory,
    },
    visited: {
      isVisible: true,
      toggleEnabled:
        resource.visited !== undefined && resource.visited.length > 0,
      items:
        resource.visited?.filter(
          skatepark => resource.both?.[skatepark.slug] === undefined,
        ) || [],
      type: 'visited' as CollectionCategory,
    },
    both: {
      isVisible: true,
      toggleEnabled: false,
      renderAsType: 'both' as CollectionCategory,
      items: resource.both !== undefined ? Object.values(resource.both) : [],
      type: 'both' as CollectionCategory,
    },
    main: {
      isVisible: true,
      toggleEnabled: false,
      items: resource.main || [],
      type: 'main' as CollectionCategory,
    },
  };
};
