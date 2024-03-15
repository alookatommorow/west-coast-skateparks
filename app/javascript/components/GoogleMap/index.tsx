import React, { useEffect, useState } from 'react';
import { CollectionVisibility, Map } from './Map';
import { findMapCenter, resourceToCollection } from './utils';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { useFetch } from './useFetch';
import { Flash } from '../Flash';
import { Resource } from './types';

type GMapProps = {
  resourceName: 'user' | 'skatepark';
  resourceId: number;
  mapKey: string;
  resource?: Resource;
};

const GMap = React.memo(function GMap({
  resourceName,
  resourceId,
  mapKey,
  resource: initialResource,
}: GMapProps) {
  const [error, setError] = useState('');
  const [mapResource, setMapResource] = useState<
    CollectionVisibility | undefined
  >();

  const [center, setCenter] = useState(findMapCenter(mapResource));
  const zoom = resourceName === 'skatepark' ? 9 : 6;

  const { isLoaded: mapIsLoaded } = useJsApiLoader({
    googleMapsApiKey: mapKey,
  });

  const { isLoading: resourceIsLoading } = useFetch({
    resourceName,
    resourceId,
    shouldFetch: initialResource === undefined,
    onSuccess: (json: Resource) => {
      const fetchedCollection = resourceToCollection(json);
      setMapResource(fetchedCollection);
      setCenter(findMapCenter(fetchedCollection));
    },
    onError: setError,
  });

  useEffect(() => {
    if (initialResource) {
      setMapResource(resourceToCollection(initialResource));
    }
  }, [initialResource]);

  const isLoading = !mapIsLoaded || resourceIsLoading;

  return (
    <>
      <Flash type="error" message={error} onClose={() => setError('')} />
      <div id="map-container">
        {isLoading ? (
          <div className="loading-container">
            <div className="loading-icon"></div>
          </div>
        ) : (
          <GoogleMap center={center} zoom={zoom} id="map">
            {mapResource !== undefined && (
              <Map
                collectionVisibility={mapResource}
                setMapResource={setMapResource}
              />
            )}
          </GoogleMap>
        )}
      </div>
    </>
  );
});

export { GMap };
