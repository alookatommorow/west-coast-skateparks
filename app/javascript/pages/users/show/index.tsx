import React, { useState } from 'react';
import { Skatepark, User } from '../../../types';
import { GMap } from '../../../components/GoogleMap';
import { SkateparkReference } from '../../../components/GoogleMap/types';
import { ProfileCard } from './ProfileCard';
import { SkateparkCollection } from './SkateparkCollection';

type UserSkatepark = {
  favorite: Skatepark[];
  visited: Skatepark[];
  both: SkateparkReference;
};

export type UserSkateparkKey = keyof Omit<UserSkatepark, 'both'>;

type UsersShowProps = {
  user: User;
  skateparks: UserSkatepark;
  numRatings: number;
  mapKey: string;
};

export const UsersShow = ({
  user,
  skateparks: initialSkateparks,
  mapKey,
  numRatings,
}: UsersShowProps) => {
  const [error, setError] = useState('');
  const [collections, setSkateparks] = useState(initialSkateparks);

  const { favorite, visited, both } = collections;

  const removeFromCollection = (collection: Skatepark[], slug: string) => {
    return collection.filter((skatepark: Skatepark) => skatepark.slug !== slug);
  };

  const removeFromCollections = (slug: string, type: UserSkateparkKey) => {
    const freshBoth = both;
    delete freshBoth[slug];

    setSkateparks({
      ...collections,
      [type]: removeFromCollection(collections[type], slug),
      both: freshBoth,
    });
  };

  return (
    <div className="user-show-container">
      <div className="map-card-container">
        <ProfileCard
          user={user}
          numFavorites={favorite.length}
          numVisits={visited.length}
          numRatings={numRatings}
        />
        <GMap
          resourceName="user"
          resourceId={user.id}
          mapKey={mapKey}
          resource={collections}
        />
      </div>
      <div className="favorites-visits">
        <div className="favorites">
          <p className="header">Favorites</p>
          {favorite.length > 0 && (
            <SkateparkCollection
              skateparks={favorite}
              type="favorite"
              userId={user.id}
              setError={setError}
              removePark={removeFromCollections}
            />
          )}
        </div>
        <div className="visits">
          <p className="header">Visits</p>
          {visited.length > 0 && (
            <SkateparkCollection
              skateparks={visited}
              type="visited"
              userId={user.id}
              setError={setError}
              removePark={removeFromCollections}
            />
          )}
        </div>
      </div>
    </div>
  );
};
