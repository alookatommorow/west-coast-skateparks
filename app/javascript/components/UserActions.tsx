import React, { useState, MouseEvent } from 'react';
import { WarningModal } from './WarningModal';
import { useToggle } from '../hooks/useToggle';

type UserActionsProps = {
  hasFavorited: boolean;
  hasVisited: boolean;
  slug: string;
  address: string;
  isAdmin: boolean;
  userId?: number;
};

export const UserActions = ({
  hasFavorited: initialHasFavorited,
  hasVisited: initialHasVisited,
  slug,
  address,
  isAdmin,
  userId,
}: UserActionsProps) => {
  const [hasFavorited, setHasFavorited] = useState(initialHasFavorited);
  const [hasVisited, setHasVisited] = useState(initialHasVisited);
  const [visitIsLoading, setVisitIsLoading] = useState(false);
  const [favoriteIsLoading, setFavoriteIsLoading] = useState(false);
  const {
    toggleIsOn: warningModalIsShowing,
    toggle: toggleWarningModalIsShowing,
  } = useToggle(false);

  const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
    if (!userId) return toggleWarningModalIsShowing();

    const {
      currentTarget: { name, value },
    } = event;

    setIsLoading(name, true);

    try {
      await fetch(`/api/skateparks/${slug}/${value}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userId,
        }),
      });
      toggleHasAction(name);
      setIsLoading(name, false);
    } catch (error) {
      console.log('***********', error);
    }
  };

  const setIsLoading = (name: string, isLoading: boolean) =>
    name === 'visit'
      ? setVisitIsLoading(isLoading)
      : setFavoriteIsLoading(isLoading);

  const toggleHasAction = (name: string) =>
    name === 'visit'
      ? setHasVisited(!hasVisited)
      : setHasFavorited(!hasFavorited);

  const modifiedAddress = address.replace(/ &/g, ',');

  return (
    <>
      {(hasFavorited || hasVisited) && (
        <div className="user-indicators">
          {hasVisited && <i className="fa fa-check green"></i>}
          {hasFavorited && <i className="fa fa-heart red"></i>}
        </div>
      )}
      <div className="actions">
        <a
          className="btn"
          rel="nofollow noopener noreferrer"
          target="_blank"
          href={`https://www.google.com/maps/dir/?api=1&destination=${modifiedAddress}`}
        >
          <i className="fa fa-map-marked-alt"></i>
        </a>
        <button
          className="btn"
          name={'visit'}
          value={hasVisited ? 'unvisit' : 'visit'}
          disabled={visitIsLoading}
          onClick={handleClick}
        >
          {hasVisited && <i className="fa fa-slash red"></i>}
          <i className="fa fa-check green"></i>
          {/* {hasVisited ? (
            <i className="fa fa-times red"></i>
          ) : (
            <i className = "fa fa-check green"></i>

          )} */}
        </button>
        <button
          className="btn"
          name={'favorite'}
          value={hasFavorited ? 'unfavorite' : 'favorite'}
          disabled={favoriteIsLoading}
          onClick={handleClick}
        >
          {hasFavorited && <i className="fa fa-slash red"></i>}
          <i className="fa fa-heart red"></i>
          {/* {hasFavorited ? (
            <i className="fa fa-heart-broken red"></i>
          ): (
            <i className="fa fa-heart red"></i>
          )} */}
        </button>
        {isAdmin && (
          <a
            className="btn"
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
