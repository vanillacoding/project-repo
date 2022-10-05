import React, { useEffect, useState } from 'react';
import HomeScreen from '../screens/HomeScreen'
import { catsData, clickedCat, userLocation, resetCommnets, updateCatsData } from '../actions';
import { useSelector, useDispatch } from 'react-redux';
import getRequestWithToken from '../utils/getRequestWithToken'
import { API } from '../constants';
import { Alert } from 'react-native';

const HomeContainer = ({ navigation }) => {
  const { location } = useSelector((state) => state.user);
  const [newLocation, setNewLocaiton] = useState({ 
    latitude: location.latitude, 
    longitude: location.longitude,
  });

  const { catsAround } = useSelector((state) => state.cat);
  const dispatch = useDispatch();
  
  const getClickedCatData = (index) => {
    dispatch(clickedCat(index));
  };

  const emptyComments = () => {
    dispatch(resetCommnets());
  };

  const changeLocation = (e) => {
    const { latitude, longitude } = e.nativeEvent.coordinate;
    Alert.alert('위치변경', '위치변경을 하시겠습니까?',
      [
        { text: '네', onPress: async () => {
          setNewLocaiton({ latitude, longitude });
          const { cats } = await getRequestWithToken(`${API}/cat`);
          dispatch(updateCatsData(cats));
          dispatch(userLocation({ latitude, longitude }))
          dispatch(catsData({ latitude, longitude }));
        }
         },
        { text: '취소' }
      ],
    );
  };

  useEffect(() => {
    const fetchData = async() => {
      await getRequestWithToken(`${API}/cat`);
      const currentLocation = { 
        latitude: location.latitude, 
        longitude: location.longitude,
      };

      dispatch(userLocation(currentLocation));
      dispatch(catsData(currentLocation));
    }
    
    fetchData();
  }, []);
  
  return (
    <HomeScreen 
      location={location}
      newLocation={newLocation}
      nearCat={catsAround} 
      changeLocation={changeLocation}
      navigation={navigation}
      getClickedCatData={getClickedCatData}
      emptyComments={emptyComments}
    />
  );
};

export default HomeContainer;
