import React from 'react';
import { titleize } from '../../../utils';
import { Rating, Skatepark } from '../../../types';
import { Stars } from '../../../components/Stars';
import { UserActions } from '../../../components/UserActions';
import { Reviews } from '../../../containers/Reviews';
import { GMap } from '../../../components/GoogleMap';
import { Photos } from '../../../components/Photos';

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
  hasFavorited,
  hasVisited,
  isAdmin,
  userId,
  ratings,
  mapKey,
  photos,
}: SkateparksShowProps) => {
  return (
    <div className="skatepark-show-container">
      <div className="sidebar">
        <h1>{titleize(skatepark.name)}</h1>
        {hasVisited && <i className="fa fa-slash red"></i>}
        {hasFavorited && <i className="fa fa-slash red"></i>}
        <h2>
          {titleize(skatepark.city)}, {skatepark.state}
        </h2>
        {skatepark.stars !== undefined && (
          <div className="stars-container">
            <Stars stars={skatepark.stars} />
          </div>
        )}
        <p className="location">
          {skatepark.address} <i className="fa fa-copy" />
        </p>
        <UserActions
          hasFavorited={hasFavorited}
          hasVisited={hasVisited}
          slug={skatepark.slug}
          address={skatepark.address || ''}
          isAdmin={isAdmin}
          userId={userId}
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
            skateparkId={Number(skatepark.id)}
            initialAverageRating={2}
          />
        </div>
      </div>
      <div className="map-photos">
        <div className="photos">
          <Photos photos={photos} />
        </div>
        <GMap
          resourceName="skatepark"
          resourceId={Number(skatepark.id)}
          mapKey={mapKey}
        />
      </div>
    </div>
  );
};
