import React, { useEffect, createRef } from 'react';
import { PropTypes } from 'prop-types';

const SearchForm = props => {
  const { handleChange, query, getSkateparks } = props;

  return (
    <form action={`/skateparks/search?query=${query}`} id="react-search-form">
      <input
        id="react-search-input"
        placeholder={'e.g. San Francisco'}
        type="text"
        name="query"
        onChange={handleChange}
        onFocus={getSkateparks}
      />
      <i className="fa fa-search"></i>
    </form>
  );
};

SearchForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  getSkateparks: PropTypes.func.isRequired,
  query: PropTypes.string,
};

export default SearchForm;