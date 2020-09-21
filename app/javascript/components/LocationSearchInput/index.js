import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

function LocationSearchInput(props) {
  const [address, setAddress] = useState('');

  const handleChange = newAddress => setAddress(newAddress);

  const handleSelect = newAddress => {
    setAddress(newAddress);
    geocodeByAddress(newAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => console.log('Success', latLng))
      .catch(error => console.error('Error', error));
  };

  const searchOptions = {
    types: ['(cities)']
  }

  const shouldDisplayOption = option => {
    const text = option.description
    return text.indexOf('CA, USA') > -1 || text.indexOf('OR, USA') > -1 || text.indexOf('WA, USA') > -1;
  }

  return (
    <PlacesAutocomplete
      value={address}
      onChange={handleChange}
      onSelect={handleSelect}
      searchOptions={searchOptions}
    >
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div>
          <input
            {...getInputProps({
              placeholder: 'Search Places ...',
              className: 'location-search-input',
            })}
          />
          <div className="autocomplete-dropdown-container">
            {loading && <div>Loading...</div>}
            {suggestions.map(suggestion => {
              if (shouldDisplayOption(suggestion)) {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                return(
                  <div
                    { ...getSuggestionItemProps(
                      suggestion,
                      {
                        className,
                      },
                    )}
                    key={suggestion.placeId}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              }
            })}
          </div>
        </div>
      )}
    </PlacesAutocomplete>
  );
}

export default props => <LocationSearchInput {...props} />