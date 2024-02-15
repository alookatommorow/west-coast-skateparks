import React, { useEffect, useState, useMemo } from 'react';
import { GoogleMap, LoadScript, useJsApiLoader } from '@react-google-maps/api';
import { Skatepark } from '../../types';
import { MapContent } from './MapContent';
import { useToggle } from '../../hooks/useToggle';

type GMapProps = {
  resourceName: 'users' | 'skateparks';
  resourceId: number;
  mapKey: string;
};

const GMap = React.memo(function GMap({
  resourceName,
  resourceId,
  mapKey,
}: GMapProps) {
  const [resource, setResource] = useState<Skatepark | undefined>();
  const [resourceIsLoading, setResourceIsLoading] = useState(true);
  const { toggleIsOn: showNearby, toggle: toggleShowNearby } = useToggle(false);

  let center = {
    lat: -3.745,
    lng: -38.523,
  };

  if (resource?.latitude && resource?.longitude) {
    center = { lat: resource.latitude, lng: resource.longitude };
  }

  const { isLoaded: mapIsLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: mapKey,
  });

  useEffect(() => {
    const fetchResource = async () => {
      const resourceUrl =
        '/maps/' + resourceId + '?resource_name=' + resourceName;
      const response = await fetch(resourceUrl);
      const resourceJson = await response.json();
      setResource(resourceJson);
      setResourceIsLoading(false);
    };

    fetchResource();
  }, [resourceName, resourceId]);

  const isLoading = !mapIsLoaded || resourceIsLoading;

  return (
    // <div id="skatepark-map">
    <div id="map-container">
      {isLoading ? (
        <div className="loading-container">
          <div className="loading-icon"></div>
        </div>
      ) : (
        <>
          <GoogleMap center={center} zoom={10} id="map">
            {resource !== undefined && (
              <MapContent
                resource={resource}
                center={center}
                showNearby={showNearby}
              />
            )}
          </GoogleMap>
          <div id="map-toggle-buttons">
            <button
              id="toggle-nearby"
              className="basic-button"
              onClick={toggleShowNearby}
            >
              {showNearby ? 'Hide' : 'Show'} Nearby Parks
            </button>
          </div>
        </>
      )}
    </div>
    // </div>
  );
});

export { GMap };
