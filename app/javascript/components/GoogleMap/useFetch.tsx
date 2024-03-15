import { useEffect, useState } from 'react';
import { Resource } from './types';
import { request } from '../../utils';

type UseFetchArgs = {
  onSuccess?: (json: Resource) => void;
  onError?: (message: string) => void;
  resourceName: string;
  resourceId: number;
  shouldFetch: boolean;
};

export const useFetch = ({
  resourceName,
  resourceId,
  onSuccess,
  onError,
  shouldFetch,
}: UseFetchArgs) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [resource, setResource] = useState<Resource | undefined>();

  const handleError = () => {
    setError('Could not load map data');
    onError?.('Could not load map data');
    setIsLoading(false);
  };

  const handleSuccess = (json: Resource) => {
    setResource(json);
    setIsLoading(false);
    onSuccess?.(json);
  };

  useEffect(() => {
    const fetchResource = async () => {
      setIsLoading(true);
      await request(
        '/api/maps/' + resourceId + '?resource_name=' + resourceName,
        { onSuccess: handleSuccess, onError: handleError },
      );
    };

    if (shouldFetch) fetchResource();
  }, [shouldFetch, resourceName, resourceId]);

  return { error, isLoading, resource };
};
