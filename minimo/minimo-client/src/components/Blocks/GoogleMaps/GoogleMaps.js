import React, { useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import {
  GoogleMap,
  useLoadScript,
  Marker,
} from '@react-google-maps/api';
import * as ICON from 'react-feather';
import styled from 'styled-components';
import '@reach/combobox/styles.css';
import Search from './Search';
import CurrentPositionButton from './CurrentPositionButton';
import googleMapsConfig from '../../../configs/googleMapsConfig';
import useModal from '../../../hooks/useModal';
import ConfigIcon from '../../shared/Config/Config';
import Modal from '../../shared/Modal';
import { OkButton } from '../../shared/StyledButton/index';
import isEmptyObject from '../../../utils/isEmptyObject';

const mapContainerStyle = {
  width: '100%',
  height: '250px',
};

const options = {
  disableDefaultUI: true,
  zoomControl: true,
};

const defaultLocation = {
  lat: 37.4990748,
  lng: 127.0470296,
};

export default function Map({
  data,
  index,
  isActive,
  resetBlockContents,
}) {
  const {
    location: markedLocation = {},
    address: markedAddress = '',
  } = data.contents;

  const [marker, setMarker] = useState(markedLocation);
  const [address, setAddress] = useState(markedAddress);

  const mapRef = useRef();
  const { modalOpen, setModalOpen, toggle } = useModal();
  const { isLoaded, loadError } = useLoadScript(googleMapsConfig);

  const initialLocation = isEmptyObject(markedLocation) ? defaultLocation : markedLocation;

  const onMapLoad = useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(15);
  }, []);

  function onClick() {
    const newContents = {
      location: marker,
      address,
    };

    resetBlockContents(index, newContents);
    setModalOpen(false);
  }

  function handleCurrentPositionClick() {
    function success(position) {
      panTo({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    }

    function error(err) {
      // TODO: error component.
      console.warn(err.message);
    }

    navigator.geolocation.getCurrentPosition(success, error);
  }

  if (loadError) {
    return 'Error';
  }

  if (!isLoaded) {
    return 'Loading...';
  }

  return (
    <Container
      draggable={false}
    >
      <Address>
        <CurrentPositionButton onClick={handleCurrentPositionClick} />
        <IconWrapper>
          <ICON.MapPin color='white' size={20} />
          {address}
        </IconWrapper>
      </Address>
      <GoogleMap
        id='map'
        mapContainerStyle={mapContainerStyle}
        zoom={15}
        center={initialLocation}
        options={options}
        onLoad={onMapLoad}
      >
        {marker.lat && (
          <Marker
            position={{ lat: marker.lat, lng: marker.lng }}
          />
        )}
      </GoogleMap>
      {isActive && (
        <ConfigIcon onClick={toggle} />
      )}
      {modalOpen && (
        <Modal
          handleClose={() => setModalOpen(false)}
        >
          <SearchWrapper>
            <Search
              panTo={panTo}
              setMarker={setMarker}
              setAddress={setAddress}
            />
          </SearchWrapper>
          <OkButton
            type='button'
            onClick={onClick}
          >
            Confirm
          </OkButton>
        </Modal>
      )}
    </Container>
  );
}

Map.propTypes = {
  data: PropTypes.shape({
    contents: PropTypes.shape({
      location: PropTypes.object,
      address: PropTypes.string,
    }).isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
  isActive: PropTypes.bool,
  resetBlockContents: PropTypes.func,
};

const Container = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

const SearchWrapper = styled.div`
  height: 300px;

  & input {
    width: 100%;
    height: 50px;
    font-size: 1rem;
    &:focus {
      outline: none;
    }
  }
`;

const Address = styled.div`
  display: flex;
`;

const IconWrapper = styled.div`
  width: 100%;
  height: 35px;
  text-align: center;
  line-height: 2;
  font-size: 1.1rem;
  color: #989898;
`;
