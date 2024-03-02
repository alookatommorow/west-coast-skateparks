import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Skatepark } from '../../types';
import { MapContent } from './MapContent';
import { Options } from './Options';
import { request } from '../../utils';
import { Flash } from '../Flash';

type GMapProps = {
  resourceName: 'user' | 'skatepark';
  resourceId: number;
  mapKey: string;
};

export type CollectionCategory = 'nearby' | 'favorite' | 'visited' | 'both';

export type Collection = {
  type: CollectionCategory;
  items: Skatepark[];
};

type Resource = {
  main?: Skatepark;
  collections: Collection[];
};

type LatLng = {
  lat: number;
  lng: number;
};

const DEFAULT_CENTER = {
  lat: -3.745,
  lng: -38.523,
};

const GMap = React.memo(function GMap({
  resourceName,
  resourceId,
  mapKey,
}: GMapProps) {
  const [resource, setResource] = useState<Resource | undefined>();
  const [resourceIsLoading, setResourceIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [mapCenter, setMapCenter] = useState<LatLng | undefined>(
    DEFAULT_CENTER,
  );
  const [collectionVisibility, setCollectionVisibility] = useState<
    Record<CollectionCategory, boolean>
  >({
    nearby: false,
    favorite: true,
    visited: true,
    both: true,
  });

  const { isLoaded: mapIsLoaded } = useJsApiLoader({
    googleMapsApiKey: mapKey,
  });

  const findMapCenter = (fetchedResource: Resource) => {
    const centerSource =
      fetchedResource.main || fetchedResource.collections[0].items[0];

    if (centerSource.latitude && centerSource.longitude) {
      return { lat: centerSource.latitude, lng: centerSource.longitude };
    }
    return DEFAULT_CENTER;
  };

  const toggleCollection = (category: CollectionCategory) => {
    setCollectionVisibility({
      ...collectionVisibility,
      [category]: !collectionVisibility[category],
    });
  };

  const handleError = () => {
    setError('Error. Could not load map data');
    setResourceIsLoading(false);
  };

  const handleFlashClose = () => setError('');

  const handleSuccess = (json: Resource) => {
    const center = findMapCenter(json);
    setResource(json);
    setResourceIsLoading(false);
    setMapCenter(center);
  };

  useEffect(() => {
    const fetchResource = async () => {
      await request(
        '/api/maps/' + resourceId + '?resource_name=' + resourceName,
        { onSuccess: handleSuccess, onError: handleError },
      );
    };

    fetchResource();
  }, [resourceName, resourceId]);

  const isLoading = !mapIsLoaded || resourceIsLoading;

  return (
    <>
      <Flash type="error" message={error} onClose={handleFlashClose} />
      <div id="map-container">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-icon"></div>
          </div>
        ) : (
          <>
            <GoogleMap
              center={mapCenter}
              zoom={resourceName === 'skatepark' ? 9 : 6}
              id="map"
            >
              {resource !== undefined && (
                <MapContent
                  main={resource.main}
                  collections={resource.collections}
                  collectionVisibility={collectionVisibility}
                />
              )}
            </GoogleMap>
            <Options
              collections={resource?.collections}
              toggleCollection={toggleCollection}
              collectionVisibility={collectionVisibility}
            />
          </>
        )}
      </div>
    </>
  );
});

export { GMap };
