import React from 'react';
import { Root } from 'native-base';
import { useSelector, useDispatch } from 'react-redux';
import AppNavigator from '../navigation/AppNavigator';
import { API } from '../constants';
import getRequestWithToken from '../utils/getRequestWithToken';
import { logOut } from '../actions';
import { AsyncStorage } from "react-native";

const AppContainer = () => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.render);
  const { user } = useSelector((state) => state);

  const fetchMyCats = async (userId) => {
    const api = `${API}/user/${userId}/mycats`;
    return await getRequestWithToken(api);
  };

  const fetchLikedcats = async (userId) => {
    const api = `${API}/user/${userId}/likedcats`;
    return await getRequestWithToken(api);
  };

  const proceedLogout = async () => {
    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('userId');
    await AsyncStorage.getItem('token');
    dispatch(logOut());
  };

  return (
    <Root>
      <AppNavigator 
        isLoggedIn={isLoggedIn}
        user={user} 
        fetchMyCats={fetchMyCats} 
        fetchLikedcats={fetchLikedcats}
        proceedLogout={proceedLogout}
      />
    </Root>
  );

};

export default AppContainer;
