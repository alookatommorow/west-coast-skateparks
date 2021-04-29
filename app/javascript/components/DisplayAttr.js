import React from 'react';
import { PropTypes } from 'prop-types';
const TEXT_ATTRS = ['name', 'city', 'state', 'obstacles'];

export const DisplayAttr = function ({ park, attr }) {
  if (!park[attr]) return null;

  if (park.displayHtmlStrings && park.displayHtmlStrings[attr]) {
    return <span dangerouslySetInnerHTML={{ __html: park.displayHtmlStrings[attr] }} />;
  } else if (TEXT_ATTRS.includes(park[attr])) {
    return <span>{titleize(park[attr])}</span>
  } else if (attr === 'rating') {
    return <Stars stars={park[attr]} prefix={`${park.slug}-stars`} tiny />;
  } else if (attr === 'map_photo') {
    return <img src={park[attr]} />;
  }

  return <span>{park[attr]}</span>;
};

DisplayAttr.propTypes = {
  park: PropTypes.object.isRequired,
  attr: PropTypes.string.isRequired,
};

export default props => <DisplayAttr {...props} />