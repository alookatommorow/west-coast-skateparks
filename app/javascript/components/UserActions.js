import React, { useState } from 'react';


import useToggle from '../hooks/useToggle';


function UserActions(props) {
  const {
    hasFavorited: initialHasFavorited,
    hasVisited: initialHasVisited,
    skateparkId,
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
      method: "PATCH",
    }).done(() => {
      toggleHasAction(name);
      setIsLoading(name, false);
    })
  }

  const setIsLoading = (name, isLoading) =>
    name === 'visit' ? setVisitIsLoading(isLoading) : setFavoriteIsLoading(isLoading);

  const toggleHasAction = name =>
    name === 'visit' ? setHasVisited(!hasVisited) : setHasFavorited(!hasFavorited);

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
          <i className="fa fa-check"></i>
        </button>
        <button
          className="btn"
          name={'favorite'}
          value={hasFavorited ? 'unfavorite' : 'favorite'}
          disabled={!user || favoriteIsLoading}
          onClick={handleClick}
        >
          <i className="fa fa-heart"></i>
        </button>
        <button className="btn">
          <i className="fa fa-map-marked-alt"></i>
        </button>
      </div>
    </React.Fragment>
  );
};

export default props => <UserActions {...props} />
