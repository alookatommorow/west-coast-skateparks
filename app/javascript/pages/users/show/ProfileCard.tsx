import React from 'react';
import { User } from '../../../types';

type ProfileCardProps = {
  user: User;
  numFavorites: number;
  numVisits: number;
  numRatings: number;
};

export const ProfileCard = ({
  user,
  numFavorites,
  numVisits,
  numRatings,
}: ProfileCardProps) => (
  <div className="card">
    <img src={user.avatar} />
    <p className="header">{user.username}</p>
    <p>{user.name}</p>
    <p>Joined {user.created_at}</p>
    <div className="extra">
      <div className="user-stat">
        <i className="fa-solid fa-heart red"></i>
        <p>{numFavorites}</p>
      </div>
      <div className="user-stat">
        <i className="fa-solid fa-check green"></i>
        <p>{numVisits}</p>
      </div>
      <div className="user-stat">
        <i className="fa-solid fa-comments blue"></i>
        <p>{numRatings}</p>
      </div>
    </div>
    <a href={`/users/${user.id}/edit`} className="basic-button">
      Edit Info
    </a>
  </div>
);
