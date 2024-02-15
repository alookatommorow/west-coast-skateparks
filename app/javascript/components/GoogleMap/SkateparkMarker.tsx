import React, { useState } from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import { Skatepark } from '../../types';
import { titleize } from '../../utils';
import { Stars } from '../Stars';

type ColorOptions = {
  main: string;
  nearby: string;
  favorite: string;
  visited: string;
  both: string;
};

type ColorCategory = keyof ColorOptions;

const COLOR_OPTIONS = {
  main: 'red-dot',
  nearby: 'green-dot',
  favorite: 'purple-dot',
  visited: 'yellow-dot',
  both: 'blue-dot',
};

type SkateparkMarkerProps = {
  skatepark: Skatepark;
  isVisible: boolean;
  type: ColorCategory;
};

export const SkateparkMarker = ({
  skatepark,
  isVisible,
  type,
}: SkateparkMarkerProps) => {
  const [infoWindowVisible, setInfoWindowVisible] = useState(false);

  const getIcon = (type: ColorCategory) => {
    return (
      'https://maps.google.com/mapfiles/ms/icons/' +
      COLOR_OPTIONS[type] +
      '.png'
    );
  };

  if (!isVisible) return;

  return (
    <>
      {skatepark.latitude && skatepark.longitude && (
        <div>
          <Marker
            position={{ lat: skatepark.latitude, lng: skatepark.longitude }}
            icon={getIcon(type)}
            onClick={() => setInfoWindowVisible(true)}
          />
          {infoWindowVisible && (
            <div style={{ marginBottom: '10px' }}>
              <InfoWindow
                position={{ lat: skatepark.latitude, lng: skatepark.longitude }}
                onCloseClick={() => setInfoWindowVisible(false)}
                options={{ pixelOffset: new window.google.maps.Size(0, -32) }}
              >
                <div id="content">
                  <a href={`/skateparks/${skatepark.slug}`}>
                    <div>
                      <img loading="lazy" src={skatepark.map_photo} />
                    </div>
                    <strong>{titleize(skatepark.name)}</strong>
                    <div>{titleize(skatepark.city)}</div>
                    <div>
                      {skatepark.rating && (
                        <Stars stars={Number(skatepark.rating)} tiny></Stars>
                      )}
                    </div>
                  </a>
                </div>
              </InfoWindow>
            </div>
          )}
        </div>
      )}
    </>
  );
};
