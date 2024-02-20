import React from 'react';
import { Stars } from '../../components/Stars';
import { SKATEPARK_ATTRS } from './constants';
import { useMediaQueries } from '../../hooks/useMediaQueries';
import { Attr, SearchResult } from '.';

type ResultsProps = {
  skateparks?: SearchResult[];
};

export const Results = ({ skateparks }: ResultsProps) => {
  const { isTablet } = useMediaQueries();

  const displayAttr = (park: SearchResult, attr: Attr) => {
    const parkAttr = park[attr];

    if (!parkAttr) return;

    if (attr === 'obstacles' && isTablet) {
      return;
    } else if (attr === 'rating') {
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
    return <p>{parkAttr}</p>;
  };

  const renderResults = (park: SearchResult) => (
    <>
      {SKATEPARK_ATTRS.map(attrMap => (
        <div key={`${park.slug}-${attrMap.name}`}>
          {displayAttr(park, attrMap.name)}
        </div>
      ))}
    </>
  );

  return (
    <>
      {skateparks?.map(park => (
        <a
          href={`/skateparks/${park.slug}`}
          key={park.slug}
          className="column-layout"
        >
          {displayAttr(park, 'map_photo')}

          {isTablet ? <div>{renderResults(park)}</div> : renderResults(park)}
        </a>
      ))}
    </>
  );
};
