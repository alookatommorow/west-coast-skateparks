import React, { useState } from 'react';


import useToggle from '../hooks/useToggle';


function UserActions(props) {
  const {
    hasFavorited: initialHasFavorited,
    hasVisited: initialHasVisited,
    skateparkId,
    address,
    user,
  } = props;

  const [hasFavorited, setHasFavorited] = useState(initialHasFavorited);
  const [hasVisited, setHasVisited] = useState(initialHasVisited);
  const [visitIsLoading, setVisitIsLoading] = useState(false);
  const [favoriteIsLoading, setFavoriteIsLoading] = useState(false);

  const handleClick = event => {
    const { currentTarget: { name, value }} = event;

    setIsLoading(name, true);

    $.ajax({
      url: `/skateparks/${skateparkId}/${value}`,
      method: 'PATCH',
    }).done(() => {
      toggleHasAction(name);
      setIsLoading(name, false);
    });
  }

  const setIsLoading = (name, isLoading) =>
    name === 'visit' ? setVisitIsLoading(isLoading) : setFavoriteIsLoading(isLoading);

  const toggleHasAction = name =>
    name === 'visit' ? setHasVisited(!hasVisited) : setHasFavorited(!hasFavorited);

  const modifiedAddress = address.replace(/ &/g, ',');

  return (
    <React.Fragment>
      {(hasFavorited || hasVisited) && (
        <div className="user-indicators">
          { hasVisited && <i className="fa fa-check green"></i> }
          { hasFavorited && <i className="fa fa-heart red"></i> }
        </div>
      )}

      <div className="actions">
        <button
          className="btn"
          name={'visit'}
          value={hasVisited ? 'unvisit' : 'visit'}
          disabled={!user || visitIsLoading}
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
          disabled={!user || favoriteIsLoading}
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
        <a
          className="btn"
          rel="nofollow noopener"
          target="_blank"
          href={`https://maps.google.com/maps?saddr='Current Location'&daddr=${modifiedAddress}`}
        >
          <i className="fa fa-map-marked-alt"></i>
        </a>
      </div>
    </React.Fragment>
  );
};

export default props => <UserActions {...props} />