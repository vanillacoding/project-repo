/* global kakao */
import React, { useEffect, useState } from 'react';
import Button from './Button';
import { getUserLocation } from '../utils/index';
import { pageName } from '../constants/page';
import PropTypes from 'prop-types';
import styles from './Map.module.scss';

const Map = ({ setPage, gameInfo, setGameInfo }) => {
  const [ currentCoords, setCurrentCoords ] = useState({ lat: 0, lng: 0 });
  const { lat, lng } = currentCoords;
  const [ address, setAddress ] = useState(null);

  useEffect(() => {
    (async () => {
      const { lat, lng } = await getUserLocation();
      setCurrentCoords({ lat, lng });
    })();
  }, []);

  useEffect(() => {
    const container = document.getElementById('map');
    const options = {
      center: new kakao.maps.LatLng(lat, lng),
      level: 3,
    };
    const map = new kakao.maps.Map(container, options);

    const markerPosition = new kakao.maps.LatLng(lat, lng);
    const marker = new kakao.maps.Marker({
      position: markerPosition,
      clickable: true,
      draggable: true,
    });
    marker.setMap(map);

    kakao.maps.event.addListener(marker, 'dragend', () => {
      const newPosition = marker.getPosition();
      setCurrentCoords({
        lat: newPosition.getLat(),
        lng: newPosition.getLng(),
      });
    });

    const geocoder = new kakao.maps.services.Geocoder();
    const coord = new kakao.maps.LatLng(lat, lng);
    geocoder.coord2Address(coord.getLng(), coord.getLat(), (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setAddress(result[0].address.address_name);
      }
    });
  }, [currentCoords]);

  const handleSelectButton = () => {
    setGameInfo({
      ...gameInfo,
      address,
      location: {
        type: 'Point',
        coordinates: [ lng, lat ],
      },
    });
    setPage(pageName.FIRST);
  };

  return (
    <div className={styles.container}>
      <div id='map' className={styles.map} />
      <span className={styles.addressDirection}>
        게임을 만들고 싶은 위치를 선택하세요.
      </span>
      <span className={styles.address}>
        {address}
      </span>
      <Button
        className='basicButton'
        text='선택'
        onClick={handleSelectButton}
      />
    </div>
  );
};

Map.propTypes = {
  setPage: PropTypes.func.isRequired,
  setGameInfo: PropTypes.func.isRequired,
};

export default Map;
