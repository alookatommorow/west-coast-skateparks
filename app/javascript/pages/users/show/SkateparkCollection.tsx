import React, { Dispatch, SetStateAction } from 'react';
import { Skatepark } from '../../../types';
import { skateparkLocation } from '../../../utils';
import { favoriteVisitSkatepark } from '../../../utils/favoriteVisitSkatepark';
import { UserSkateparkKey } from '.';
// import { UserMapResource } from '../../../components/GoogleMap';

// export type CollectionType = Exclude<keyof UserMapResource, 'both'>;

type SkateparkCollectionProps = {
  skateparks: Skatepark[];
  type: UserSkateparkKey;
  userId: number;
  setError: Dispatch<SetStateAction<string>>;
  removePark: (slug: string, type: UserSkateparkKey) => void;
};

export const SkateparkCollection = ({
  skateparks,
  type,
  userId,
  setError,
  removePark,
}: SkateparkCollectionProps) => {
  const handleClick = async (slug: string) => {
    const requestType = type === 'favorite' ? 'unfavorite' : 'unvisit';
    removePark(slug, type);

    await favoriteVisitSkatepark({
      slug,
      type: requestType,
      userId,
      onError: () => setError('Something went wrong'),
      onSuccess: () => removePark(slug, type),
    });
  };

  return (
    skateparks.length > 0 &&
    skateparks.map(skatepark => (
      <div className="park-item-container" key={`${type}-${skatepark.slug}`}>
        <a href={`/skateparks/${skatepark.slug}`} className="park-item">
          <img src={skatepark.map_photo} />
          <div>
            <p className="capitalize">
              <strong>{skateparkLocation(skatepark)}</strong>
            </p>
            <p className="capitalize">{skatepark.name}</p>
          </div>
        </a>
        <button onClick={() => handleClick(skatepark.slug)}>
          <i className="fa-solid fa-trash-can"></i>
        </button>
      </div>
    ))
  );
};
