import React from 'react';
import { PropTypes } from 'prop-types';

const SearchForm = props => {
  const { handleChange, loading } = props;

  return (
    <form id="react-search-form">
      <input
        id="react-search-input"
        placeholder={loading ? 'Loading, please wait...' : 'e.g. San Francisco'}
        type="text"
        name="query"
        onChange={handleChange}
      />
      <i className="fa fa-search"></i>
    </form>
  );
};

SearchForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default SearchForm;