import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MapScreen from '../screens/MapScreen';
import * as Location from 'expo-location';
import Loading from '../components/Loading';
import {
  GET_CHATS,
  ADD_CHAT,
  MODAL_TOGGLE,
  SET_MY_LOCATIN,
  SET_ERROR_MESSAGE
} from '../constants/actionTypes';
import axios from 'axios';
import _ from 'lodash';
import { socket, connectSocket } from '../socket';

let trackedLocation;

export default function MapContainer({ navigation }) {
  const { errorMessage, chats } = useSelector((state) => state.chatReducer);
  const { deviceAddress, latitude, longitude } = useSelector(
    (state) => state.userReducer
  );
  const { isVisible } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();

  const getChats = async (latitude, longitude) => {
    if (latitude && longitude) {
      const { data: data } = await axios.post(
        `http://loca-chat.ap-northeast-2.elasticbeanstalk.com/api/chats`,
        {
          location: { latitude, longitude }
        }
      );

      if (data.result === 'ok') {
        setErrorMessage('');
        dispatch({ type: GET_CHATS, data: data.data });
      } else {
        setErrorMessage(data.errorMessage);
      }
    }
  };

  const excuteDispatch = (myLocation) => {
    dispatch({ type: SET_MY_LOCATIN, data: myLocation });
  };

  const trackLocation = async () => {
    trackedLocation = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 5
      },
      (location) => {
        const myLocation = {
          latitude: parseFloat(location.coords.latitude),
          longitude: parseFloat(location.coords.longitude)
        };
        const throttledDispatch = _.throttle(excuteDispatch, 3000);

        throttledDispatch(myLocation);
        getChats(myLocation.latitude, myLocation.longitude);
      }
    );
  };

  const setErrorMessage = (message) => {
    dispatch({ type: SET_ERROR_MESSAGE, data: message });
  };

  const addChat = (chat) => {
    dispatch({ type: ADD_CHAT, data: chat });
  };

  const showModal = () => {
    dispatch({ type: MODAL_TOGGLE });
  };

  const hideModal = () => {
    dispatch({ type: MODAL_TOGGLE });
  };

  useEffect(() => {
    trackLocation();
    connectSocket();

    return () => {
      trackedLocation.remove();
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    socket.on('createChat', () => getChats(latitude, longitude));

    return () => {
      socket.off('createChat');
    };
  }, [latitude, longitude]);

  if (latitude && longitude) {
    return (
      <MapScreen
        navigation={navigation}
        myLatitude={latitude}
        myLongitude={longitude}
        chats={chats}
        isVisible={isVisible}
        deviceAddress={deviceAddress}
        errorMessage={errorMessage}
        setErrorMessage={setErrorMessage}
        addChat={addChat}
        showModal={showModal}
        hideModal={hideModal}
      />
    );
  }
  return <Loading />;
}
