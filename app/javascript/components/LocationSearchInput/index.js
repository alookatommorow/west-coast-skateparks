import React, { useState, useRef } from 'react';
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'components/PlacesAutocomplete';

function LocationSearchInput(props) {
  const { setIsLoading } = props;
  const places = useRef();

  const [address, setAddress] = useState('');

  const handleChange = (newAddress) => {
    setAddress(newAddress)
  };

  const handleSelect = newAddress => {
    console.log('selection is firing')
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

  return (
    <form>
      <PlacesAutocomplete
        value={address}
        onChange={handleChange}
        onSelect={handleSelect}
        searchOptions={searchOptions}
        ref={places}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => {
          return (
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
                  const className = suggestion.active
                    ? 'item active'
                    : 'item';
                  return (
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
                })}
              </div>
            </div>
          )
        }}
      </PlacesAutocomplete>
    </form>
  );
}

export default props => <LocationSearchInput {...props} />