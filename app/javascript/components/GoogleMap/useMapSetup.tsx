import { useEffect, useState } from 'react';
import { LatLng, MapData, Resource, ResourceName } from './types';
import { request } from '../../utils';
import { useJsApiLoader } from '@react-google-maps/api';
import { findMapCenter, resourceToMapData } from './utils';

type UseMapSetupArgs = {
  resourceName: ResourceName;
  resourceId: number;
  initialMapData: MapData | undefined;
  mapKey: string;
};

export const useMapSetup = ({
  resourceName,
  resourceId,
  initialMapData,
  mapKey,
}: UseMapSetupArgs) => {
  const [error, setError] = useState('');
  const [fetchIsLoading, setFetchIsLoading] = useState(false);
  const [mapData, setMapData] = useState<MapData | undefined>();
  const [center, setCenter] = useState<LatLng | undefined>();

  const { isLoaded: mapIsLoaded } = useJsApiLoader({
    googleMapsApiKey: mapKey,
  });

  const isLoading = !mapIsLoaded || fetchIsLoading;

  const handleError = () => {
    setError('Could not load map data');
    setFetchIsLoading(false);
  };

  const handleSuccess = (json: Resource) => {
    const fetchedCollection = resourceToMapData(json, resourceName);
    setMapData(fetchedCollection);
    setCenter(findMapCenter(fetchedCollection));
    setFetchIsLoading(false);
  };

  useEffect(() => {
    const fetchResource = async () => {
      setFetchIsLoading(true);
      await request(
        '/api/maps/' + resourceId + '?resource_name=' + resourceName,
        { onSuccess: handleSuccess, onError: handleError },
      );
    };

    if (initialMapData === undefined) {
      fetchResource();
    } else {
      setMapData(initialMapData);
      if (center === undefined) setCenter(findMapCenter(initialMapData));
    }
  }, [initialMapData, resourceName, resourceId]);

  return { error, isLoading, mapData, center, setMapData, setError };
};
