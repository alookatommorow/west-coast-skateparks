import React, { useState, MouseEvent, Dispatch, SetStateAction } from 'react';
import { WarningModal } from '../../../components/WarningModal';
import { useToggle } from '../../../hooks/useToggle';
import { Skatepark } from '../../../types';
import {
  FavoriteVisitOptions,
  favoriteVisitSkatepark,
} from '../../../utils/favoriteVisitSkatepark';

type UserActionsProps = {
  hasFavorited: boolean;
  hasVisited: boolean;
  skatepark: Skatepark;
  isAdmin: boolean;
  userId?: number;
  error: string;
  setError: Dispatch<SetStateAction<string>>;
  setHasVisited: Dispatch<SetStateAction<boolean>>;
  setHasFavorited: Dispatch<SetStateAction<boolean>>;
};

export const UserActions = ({
  hasFavorited,
  hasVisited,
  skatepark,
  isAdmin,
  userId,
  setError,
  setHasFavorited,
  setHasVisited,
}: UserActionsProps) => {
  const { slug, address } = skatepark;
  const [visitIsLoading, setVisitIsLoading] = useState(false);
  const [favoriteIsLoading, setFavoriteIsLoading] = useState(false);
  const {
    toggleIsOn: warningModalIsShowing,
    toggle: toggleWarningModalIsShowing,
  } = useToggle(false);

  const handleError = () => setError('Something went wrong');

  const handleSuccess = (name: string) => {
    toggleHasAction(name);
    setIsLoading(name, false);
  };

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (!userId) return toggleWarningModalIsShowing();

    const {
      currentTarget: { name, value },
    } = event;

    setIsLoading(name, true);

    await favoriteVisitSkatepark({
      slug,
      type: value as FavoriteVisitOptions['type'],
      userId,
      onError: handleError,
      onSuccess: () => handleSuccess(name),
    });
  };

  const setIsLoading = (name: string, isLoading: boolean) =>
    name === 'visit'
      ? setVisitIsLoading(isLoading)
      : setFavoriteIsLoading(isLoading);

  const toggleHasAction = (name: string) =>
    name === 'visit'
      ? setHasVisited(!hasVisited)
      : setHasFavorited(!hasFavorited);

  const modifiedAddress = address?.replace(/ &/g, ',');

  return (
    <>
      <div className="actions">
        {modifiedAddress && (
          <a
            rel="nofollow noopener noreferrer"
            target="_blank"
            href={`https://www.google.com/maps/dir/?api=1&destination=${modifiedAddress}`}
          >
            <i className="fa fa-map-marked-alt"></i>
          </a>
        )}
        <button
          name={'visit'}
          value={hasVisited ? 'unvisit' : 'visit'}
          disabled={visitIsLoading}
          onClick={handleClick}
        >
          {hasVisited && <i className="fa fa-slash red"></i>}
          <i className="fa fa-check green"></i>
        </button>
        <button
          name={'favorite'}
          value={hasFavorited ? 'unfavorite' : 'favorite'}
          disabled={favoriteIsLoading}
          onClick={handleClick}
        >
          {hasFavorited && <i className="fa fa-slash red"></i>}
          <i className="fa fa-heart red"></i>
        </button>
        {isAdmin && (
          <a
            rel="nofollow noopener noreferrer"
            target="_blank"
            href={`/admin/skateparks/${slug}/edit`}
          >
            <i className="fa fa-pencil-alt"></i>
          </a>
        )}
      </div>
      <WarningModal
        mainText="Please sign in"
        confirmText="Sign In"
        href="/sessions/new"
        onClose={toggleWarningModalIsShowing}
        isVisible={warningModalIsShowing}
      />
    </>
  );
};
