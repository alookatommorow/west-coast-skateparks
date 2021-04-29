import React from 'react';
import { PropTypes } from 'prop-types';

export const BoldString = function ({ string, matchIndex, query }) {
  const output = titleize(string);

  return (
    <span>{
      output.slice(0, matchIndex)
    }<span className="orange">{
      output.slice(matchIndex, matchIndex + query.length)
    }</span>{
      output.slice(matchIndex + query.length)
    }</span>
  );
};

BoldString.propTypes = {
  query: PropTypes.string.isRequired,
  matchIndex: PropTypes.number.isRequired,
  string: PropTypes.string.isRequired,
};

export default props => <BoldString {...props} />