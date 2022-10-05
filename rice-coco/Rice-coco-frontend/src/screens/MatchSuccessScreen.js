import React, { useState, useEffect } from 'react';
import { Text, View, Alert } from 'react-native';
import { connect } from 'react-redux';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from 'react-native-maps';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { StackActions } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import configuredAxios from '../config/axiosConfig';
import * as Location from 'expo-location';
import { socket, socketApi } from '../socket';
import checkTargetIsInDistance from '../utils/checkTargetIsInDistance';
import {
  setUserLocation,
  setSelectedMeeting,
  setCurrentMeeting,
  setPromiseAmount,
  resetMeeting,
} from '../actions';
import resetAction from '../utils/resetAction';
import RemainingTime from '../components/RemainingTime';
import ModalQuestion from '../components/ModalQuestion';
import SOCKET_EVENT from '../constants/socket';
import MESSAGE from '../constants/message';
import SCREEN from '../constants/screen';
import ROUTE from '../constants/route';
import ICON_NAME from '../constants/icon';
import { BACKGROUND_LOCATION_TASK } from '../constants/index';
import { COLOR } from '../constants/color';
import {
  MapWrapper,
  OverlayHeader,
  OverlayText,
  OverlayFooter,
  OutlineButton,
  StyledImage,
  styles,
  StyledText,
} from '../shared/index';

const MatchSuccessScreen = ({
  userId,
  userLocation,
  userPromise,
  partnerNickname,
  restaurantName,
  restaurantLocation,
  meetingId,
  expiredTime,
  currentMeeting,
  setPromiseAmount,
  setSelectedMeeting,
  setCurrentMeeting,
  resetMeeting,
  navigation,
}) => {
  const [isArrived, setIsArrived] = useState(true);
  const [isArrivalConfirmed, setIsArrivalConfirmed] = useState(false);
  const [isOnVergeofBreaking, setIsOnVergeofBreaking] = useState(false);
  const [partnerLocation, setPartnerLocation] = useState({
    latitude: 0,
    longitude: 0,
  });

  useEffect(() => {
    socketApi.joinMeeting(meetingId, userId);

    socket.on(SOCKET_EVENT.CHANGE_CURRENT_MEETING, meetingData => {
      setCurrentMeeting(meetingData);
    });

    socket.on(SOCKET_EVENT.GET_PARTNER_LOCATION, location => {
      setPartnerLocation(location);
    });

    socket.on(SOCKET_EVENT.CANCELED_BY_PARTNER, () => {
      Alert.alert(
        MESSAGE.CANCEL_TITLE,
        MESSAGE.CANCEL_MESSAGE,
        [
          {
            text: MESSAGE.OK,
            onPress: () => {
              socketApi.finishMeeting(() => {
                resetMeeting();
                navigation.dispatch(StackActions.replace(SCREEN.MAIN_MAP));
              });
            },
          },
        ],
        { cancelable: false }
      );
    });

    return () => socketApi.removeAllListeners();
  }, []);

  // useEffect(() => {
  //   checkTargetIsInDistance(userLocation, restaurantLocation, 50)
  //     ? setIsArrived(true)
  //     : setIsArrived(false);

  //   socketApi.sendLocation(userLocation);
  // }, [userLocation]);

  useEffect(() => {
    (async () => {
      await Location.startLocationUpdatesAsync(BACKGROUND_LOCATION_TASK, {
        accuracy: Location.Accuracy.Highest,
        timeInterval: 1000,
        distanceInterval: 1,
        howsBackgroundLocationIndicator: true,
      });
    })();

    return async () =>
      await Location.stopLocationUpdatesAsync(BACKGROUND_LOCATION_TASK);
  }, []);

  const getCurrentMeeting = async () => {
    try {
      const { data } = await configuredAxios.get(
        `${ROUTE.MEETINGS}/${meetingId}`
      );
      setSelectedMeeting(data.meetingDetails);
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
    }
  };

  useEffect(() => {
    getCurrentMeeting();
  }, []);

  const handleTimeEnd = () => {
    const isAllArrived = currentMeeting.arrivalCount >= 2;

    isAllArrived
      ? socketApi.finishMeeting(() => {
          navigation.dispatch(resetAction(0, SCREEN.AFTER_MEETING));
        })
      : socketApi.cancelMeeting(() => {
          resetMeeting();
          navigation.dispatch(resetAction(0, SCREEN.MAIN_MAP));
        });
  };

  const handleArrivalButtonClick = async () => {
    if (isArrivalConfirmed) return;

    setIsArrivalConfirmed(true);
    setPromiseAmount(userPromise + 1);

    await configuredAxios.put(`${ROUTE.USERS}/${userId}${ROUTE.PROMISE}`, {
      amount: 1,
    });

    socketApi.arriveMeeting();
  };

  const handleChatButtonClick = () => {
    navigation.navigate(SCREEN.CHAT_ROOM);
  };

  const handleBreakupButtonClick = async () => {
    await configuredAxios.put(`${ROUTE.USERS}/${userId}${ROUTE.PROMISE}`, {
      amount: -1,
    });

    setPromiseAmount(userPromise - 1);
    socketApi.breakupMeeting(() => {
      resetMeeting();
      navigation.dispatch(StackActions.replace(SCREEN.MAIN_MAP));
    });
  };

  return (
    <MapWrapper>
      <MapView
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        showsMyLocationButton={true}
        showsUserLocation={true}
      >
        <Marker title={partnerNickname} coordinate={partnerLocation} />
        <Marker title={restaurantName} coordinate={restaurantLocation}>
          <View style={styles.view}>
            <Text>{restaurantName}</Text>
            <StyledImage
              source={require('../../assets/images/rice.png')}
              width='24px'
              height='26px'
              resizeMode='cover'
            />
          </View>
        </Marker>
        <Circle
          center={restaurantLocation}
          radius={50}
          strokeColor='rgba(0, 0, 255, 0.1)'
          fillColor='rgba(0, 0, 255, 0.1)'
        />
      </MapView>
      <LinearGradient
        colors={['rgba(255, 255, 255, 1)', 'transparent']}
        style={styles.linearGradient}
      />
      <OverlayHeader>
        <OverlayText size='30px'>R I C E C O C O</OverlayText>
        <OverlayText>매칭 성공! 1시간 내로 도착하세요!</OverlayText>
        {!!expiredTime && (
          <RemainingTime expiredTime={expiredTime} onTimeEnd={handleTimeEnd} />
        )}
      </OverlayHeader>
      <OverlayFooter flexDirection='column' alignItems='flex-end'>
        {isArrived && (
          <OutlineButton
            borderColor={COLOR.THEME_COLOR}
            backgroundColor={COLOR.THEME_COLOR}
            onPress={handleArrivalButtonClick}
            width='40%'
          >
            <StyledText color={COLOR.WHITE}>
              {isArrivalConfirmed
                ? MESSAGE.COMPLATE_ARRIVAL
                : MESSAGE.CONFIRM_ARRIVAL}
            </StyledText>
          </OutlineButton>
        )}
        <OutlineButton
          width='40%'
          borderColor={COLOR.THEME_COLOR}
          backgroundColor={COLOR.THEME_COLOR}
        >
          <Icon
            name={ICON_NAME.COMMENT}
            size={38}
            color={COLOR.WHITE}
            onPress={handleChatButtonClick}
          />
        </OutlineButton>
        <OutlineButton
          width='40%'
          borderColor={COLOR.THEME_COLOR}
          backgroundColor={COLOR.THEME_COLOR}
          onPress={() => setIsOnVergeofBreaking(true)}
        >
          <StyledText color={COLOR.WHITE}>CANCEL</StyledText>
        </OutlineButton>
        {isOnVergeofBreaking && (
          <ModalQuestion
            modalVisible={isOnVergeofBreaking}
            setModalVisible={setIsOnVergeofBreaking}
            question={MESSAGE.CONFIRM_CANCEL_PROMISE}
            onClickYes={handleBreakupButtonClick}
          />
        )}
      </OverlayFooter>
    </MapWrapper>
  );
};

export default connect(
  state => ({
    userId: state.user._id,
    userNickname: state.user.nickname,
    userLocation: state.location,
    partnerNickname: state.meetings.selectedMeeting.partnerNickname,
    restaurantName: state.meetings.selectedMeeting.restaurantName,
    restaurantLocation: state.meetings.selectedMeeting.restaurantLocation,
    expiredTime: state.meetings.selectedMeeting.expiredTime,
    meetingId: state.meetings.selectedMeeting.meetingId,
    currentMeeting: state.meetings.currentMeeting,
  }),
  {
    setUserLocation,
    setSelectedMeeting,
    setCurrentMeeting,
    setPromiseAmount,
    resetMeeting,
  }
)(MatchSuccessScreen);
