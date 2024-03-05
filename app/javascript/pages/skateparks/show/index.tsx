import React, { useState } from 'react';
import { titleize } from '../../../utils';
import { Rating, Skatepark } from '../../../types';
import { Stars } from '../../../components/Stars';
import { UserActions } from './UserActions';
import { Reviews } from './Reviews';
import { GMap } from '../../../components/GoogleMap';
import { Photos } from './Photos';
import { Flash } from '../../../components/Flash';

const INFO_ATTRS = [
  'material',
  'designer',
  'builder',
  'opened',
  'size',
  'lights',
  'obstacles',
];

type InfoAttr = keyof Pick<
  Skatepark,
  | 'material'
  | 'designer'
  | 'builder'
  | 'opened'
  | 'size'
  | 'lights'
  | 'obstacles'
>;

const INFO_ICONS = {
  material: 'fa-layer-group',
  opened: 'fa-baby',
  info: 'fa-info',
  designer: 'fa-drafting-compass',
  builder: 'fa-hammer',
  size: 'fa-ruler',
  hours: 'fa-clock',
  obstacles: 'fa-wave-square',
  helmet: 'fa-hard-hat',
  lights: 'fa-lightbulb',
};

type SkateparksShowProps = {
  skatepark: Skatepark;
  hasFavorited: boolean;
  hasVisited: boolean;
  isAdmin: boolean;
  userId?: number;
  ratings: Rating[];
  mapKey: string;
  photos: string[];
};

export const SkateparksShow = ({
  skatepark,
  hasFavorited: initialHasFavorited,
  hasVisited: initialHasVisited,
  isAdmin,
  userId,
  ratings,
  mapKey,
  photos,
}: SkateparksShowProps) => {
  const [hasFavorited, setHasFavorited] = useState(initialHasFavorited);
  const [hasVisited, setHasVisited] = useState(initialHasVisited);
  const [error, setError] = useState('');

  const handleFlashClose = () => setError('');

  return (
    <div className="skatepark-show-container">
      <Flash type="error" message={error} onClose={handleFlashClose} />
      <div className="sidebar">
        <div className="fav-visit-indicators">
          <h1>{titleize(skatepark.name)}</h1>
          {(hasFavorited || hasVisited) && (
            <div className="user-indicators">
              {hasVisited && <i className="fa fa-check green"></i>}
              {hasFavorited && <i className="fa fa-heart red"></i>}
            </div>
          )}
        </div>
        <h2>
          {titleize(skatepark.city)}, {skatepark.state}
        </h2>
        {skatepark.stars !== undefined && <Stars stars={skatepark.stars} />}
        <p className="location">
          {skatepark.address}
          {/* <i className="fa fa-copy" /> */}
        </p>
        <UserActions
          hasFavorited={hasFavorited}
          hasVisited={hasVisited}
          skatepark={skatepark}
          isAdmin={isAdmin}
          userId={userId}
          setError={setError}
          setHasVisited={setHasVisited}
          setHasFavorited={setHasFavorited}
          error={error}
        />
        <div className="info-container">
          {(INFO_ATTRS as InfoAttr[]).map(attr => {
            if (skatepark[attr] !== undefined)
              return (
                <div className="col" key={attr}>
                  <i className={`fa ${INFO_ICONS[attr]}`} />
                  <p key={attr}>{skatepark[attr]}</p>
                </div>
              );
          })}
          {skatepark.info !== undefined && (
            <p className="info">{skatepark.info}</p>
          )}
        </div>
        <div className="reviews comments">
          <Reviews
            ratings={ratings}
            userId={userId}
            skatepark={skatepark}
            setError={setError}
          />
        </div>
      </div>
      <div className="map-photos">
        <Photos photos={photos} />
        <GMap
          resourceName="skatepark"
          resourceId={Number(skatepark.id)}
          mapKey={mapKey}
        />
      </div>
    </div>
  );
};
