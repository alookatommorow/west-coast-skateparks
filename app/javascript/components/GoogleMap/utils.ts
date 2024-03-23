import { SkateparkType, Resource, MapData, ResourceName } from './types';
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

export const findMapCenter = (resource?: MapData) => {
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

export const getIcon = (type: SkateparkType) => {
  return (
    'https://maps.google.com/mapfiles/ms/icons/' + COLOR_OPTIONS[type] + '.png'
  );
};

// format raw data for consumption by map components
export const resourceToMapData = (
  resource: Resource | undefined,
  resourceName: ResourceName,
) => {
  if (resource === undefined) return;

  return {
    nearby: {
      isVisible: false,
      toggleEnabled: resourceName === 'skatepark',
      items: resource.nearby || [],
      type: 'nearby' as SkateparkType,
    },
    favorite: {
      isVisible: true,
      toggleEnabled: resourceName === 'user',
      items:
        // remove favorites that appear in 'both'
        resource.favorite?.filter(
          skatepark => resource.both?.[skatepark.slug] === undefined,
        ) || [],
      type: 'favorite' as SkateparkType,
    },
    visited: {
      isVisible: true,
      toggleEnabled: resourceName === 'user',
      items:
        // remove visited that appear in 'both'
        resource.visited?.filter(
          skatepark => resource.both?.[skatepark.slug] === undefined,
        ) || [],
      type: 'visited' as SkateparkType,
    },
    both: {
      isVisible: true,
      toggleEnabled: false,
      renderAsType: 'both' as SkateparkType,
      items: resource.both !== undefined ? Object.values(resource.both) : [],
      type: 'both' as SkateparkType,
    },
    main: {
      isVisible: true,
      toggleEnabled: false,
      items: resource.main || [],
      type: 'main' as SkateparkType,
    },
  };
};
