import React, { useMemo } from 'react';
import { GoogleMap } from '@react-google-maps/api';
import { useMapSetup } from './useMapSetup';
import { Flash } from '../Flash';
import { Resource, ResourceName } from './types';
import { resourceToMapData } from './utils';
import { MapContent } from './MapContent';
import { Options } from './Options';
import { Legend } from './Legend';

type GMapProps = {
  resourceName: ResourceName;
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
  const zoom = resourceName === 'skatepark' ? 9 : 6;
  const initialMapData = useMemo(
    () => resourceToMapData(initialResource, resourceName),
    [initialResource],
  );

  const { isLoading, mapData, error, center, setMapData, setError } =
    useMapSetup({
      resourceName,
      resourceId,
      initialMapData,
      mapKey,
    });

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
            {mapData !== undefined && (
              <>
                <MapContent mapData={mapData} />
                <Options setMapData={setMapData} mapData={mapData} />
                <Legend
                  resourceName={resourceName}
                  main={mapData.main.items[0]?.name}
                />
              </>
            )}
          </GoogleMap>
        )}
      </div>
    </>
  );
});

export { GMap };
