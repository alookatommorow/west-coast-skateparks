import React from 'react';
import { PropTypes } from 'prop-types';

const SearchForm = props => {
  const { handleChange, loading, getSkateparks } = props;

  return (
    <div className="search">
      <form id="react-search-form">
        <div className="icon input" onClick={getSkateparks}>
          {loading ? (
            <input id="react-search-input" placeholder="Loading, please wait..." className="prompt" type="text" name="query" onChange={handleChange} />
           ) : (
              <input id="react-search-input" className="prompt" type="text" name="query" onChange={handleChange} />
           )}
          <i className="fa fa-search"></i>
        </div>
      </form>
    </div>
  );
};

SearchForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  getSkateparks: PropTypes.func.isRequired,
};

export default SearchForm;