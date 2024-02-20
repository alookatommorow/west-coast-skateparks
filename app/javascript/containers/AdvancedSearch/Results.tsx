import React from 'react';
import { Stars } from '../../components/Stars';
import { SKATEPARK_ATTRS } from './constants';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { Attr, SearchResult } from '.';

type ResultsProps = {
  skateparks?: SearchResult[];
};

export const Results = ({ skateparks }: ResultsProps) => {
  const { isMobile } = useMediaQueries();

  const displayAttr = (park: SearchResult, attr: Attr) => {
    const parkAttr = park[attr];

    if (!parkAttr) return;

    if (attr === 'rating') {
      return <Stars stars={Number(parkAttr)} tiny />;
    } else if (attr === 'map_photo') {
      return <img src={parkAttr} />;
    } else if (
      (attr === 'city' || attr === 'name') &&
      park.queryMatch !== undefined &&
      park.queryMatch[attr] !== undefined
    ) {
      return park.queryMatch[attr];
    }
    return parkAttr;
  };

  return (
    <>
      {skateparks?.map(park => (
        <a href={`/skateparks/${park.slug}`} key={park.slug} className="row">
          <div className="column photo">{displayAttr(park, 'map_photo')}</div>
          {isMobile ? (
            <div className="main-text">
              <p className="name">{displayAttr(park, 'name')}</p>
              <p>
                {displayAttr(park, 'city')}, {displayAttr(park, 'state')}
              </p>
              {displayAttr(park, 'rating')}
            </div>
          ) : (
            <>
              {SKATEPARK_ATTRS.map(attrMap => (
                <div
                  className={`column ${attrMap.name}`}
                  key={`${park.slug}-${attrMap.name}`}
                >
                  {displayAttr(park, attrMap.name)}
                </div>
              ))}
            </>
          )}
        </a>
      ))}
    </>
  );
};
