import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';
import { Skatepark } from '../../types';
import { MapContent } from './MapContent';
import { useToggle } from '../../hooks/useToggle';

type GMapProps = {
  resourceName: 'users' | 'skateparks';
  resourceId: number;
};

const GMap = React.memo(function GMap({ resourceName, resourceId }: GMapProps) {
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

  const fetchResource = async () => {
    const resourceUrl =
      '/maps/' + resourceId + '?resource_name=' + resourceName;
    const response = await fetch(resourceUrl);
    const resourceJson = await response.json();
    setResource(resourceJson);
    setResourceIsLoading(false);
  };

  useEffect(() => {
    fetchResource();
  }, [resourceName, resourceId]);

  return (
    <div id="skatepark-map">
      <div id="map-container">
        {resourceIsLoading ? (
          <p>loading...</p>
        ) : (
          <>
            <LoadScript googleMapsApiKey="AIzaSyDCv7YgxTd9UHrQUF-zQO9P0nhkvECu4jU">
              <GoogleMap center={center} zoom={10} id="map">
                <MapContent
                  resource={resource}
                  center={center}
                  showNearby={showNearby}
                />
              </GoogleMap>
            </LoadScript>
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
    </div>
  );
});

export { GMap };
