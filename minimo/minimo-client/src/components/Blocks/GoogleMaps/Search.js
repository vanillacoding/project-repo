import React from 'react';
import PropTypes from 'prop-types';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from '@reach/combobox';

const OK = 'OK';

export default function Search({ panTo, setMarker, setAddress }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);

      panTo({ lat, lng });
      setMarker({ lat, lng });
      setAddress(address);
    } catch (error) {
      // TODO: error component
      console.log('😱 Error: ', error);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        value={value}
        disabled={!ready}
        onChange={handleInput}
        placeholder='Search your location'
      />
      <ComboboxPopover>
        <ComboboxList>
          {status === OK
            && data.map(({ place_id: id, description }) => (
              <ComboboxOption
                key={id}
                value={description}
              />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
}

Search.propTypes = {
  panTo: PropTypes.func,
  setAddress: PropTypes.func,
  setMarker: PropTypes.func,
};
