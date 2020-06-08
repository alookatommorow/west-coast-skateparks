import React from 'react';
import { PropTypes } from 'prop-types';

export const BoldString = function ({ string, matchIndex, query }) {
  const output = titleize(string);
  const first = output.slice(0, matchIndex);
  const bold = output.slice(matchIndex, matchIndex + query.length);
  const last = output.slice(matchIndex + query.length);

  return <span>{first}<span className="orange">{bold}</span>{last}</span>;
};

BoldString.propTypes = {
  query: PropTypes.string.isRequired,
  matchIndex: PropTypes.number.isRequired,
  string: PropTypes.string.isRequired,
};

export default props => <BoldString {...props} />