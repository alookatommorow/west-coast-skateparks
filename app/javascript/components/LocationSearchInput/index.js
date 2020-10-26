import React, { useState } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';

function LocationSearchInput(props) {
  const { setIsLoading } = props;

  const [address, setAddress] = useState('');

  const handleChange = newAddress => setAddress(newAddress);

  const handleSelect = newAddress => {
    setIsLoading(true)
    setAddress(newAddress);
    geocodeByAddress(newAddress)
      .then(results => getLatLng(results[0]))
      .then(latLng => props.handleSelect(latLng))
      // to do - handle error
  };

  const searchOptions = {
    componentRestrictions: { country: ['us'] },
    types: ['(cities)']
  }

  const shouldDisplayOption = option => {
    const text = option.description
    return text.indexOf('CA, USA') > -1 || text.indexOf('OR, USA') > -1 || text.indexOf('WA, USA') > -1;
  }

  return (
    <form>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div className="field">
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container selection divided list">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                if (shouldDisplayOption(suggestion)) {
                  const className = suggestion.active
                    ? 'item active'
                    : 'item';
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
    </form>
  );
}

export default props => <LocationSearchInput {...props} />