import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import { StackActions } from '@react-navigation/native';
import {
  setCurrentMeeting,
  setSelectedMeeting,
  resetMeeting,
} from '../actions/index';
import { socket, socketApi } from '../socket';
import configuredAxios from '../config/axiosConfig';
import resetAction from '../utils/resetAction';
import RemainingTime from '../components/RemainingTime';
import RotatedIcon from '../components/RotatedIcon';
import MESSAGE from '../constants/message';
import SCREEN from '../constants/screen';
import ROUTE from '../constants/route';
import SOCKET_EVENT from '../constants/socket';
import { COLOR } from '../constants/color';
import { Wrapper, StyledButton, StyledText, Title } from '../shared/index';

const MatchWaiting = ({
  navigation,
  userId,
  setSelectedMeeting,
  setCurrentMeeting,
  meetingId,
  expiredTime,
  resetMeeting,
}) => {
  useEffect(() => {
    socketApi.createMeeting(meetingId, userId);

    socket.on(
      SOCKET_EVENT.PARTNER_JOIN_MEETING,
      async ({ meetingData, partnerId }) => {
        const { data: partner } = await configuredAxios.get(
          `${ROUTE.USERS}/${partnerId}`
        );
        const partnerNickname = partner.nickname;

        setSelectedMeeting({ partnerNickname });
        setCurrentMeeting(meetingData);

        navigation.dispatch(resetAction(0, SCREEN.MATCH_SUCCESS));
      }
    );

    return () => socket.off(SOCKET_EVENT.PARTNER_JOIN_MEETING);
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

  const handlePressCancelButton = async () => {
    resetMeeting();
    socketApi.cancelMeeting(() => {
      navigation.dispatch(StackActions.replace(SCREEN.MAIN_MAP));
    });
  };

  const handleTimeEnd = async () => {
    socketApi.cancelMeeting(() => {
      Alert.alert(
        MESSAGE.TIME_OUT_TITLE,
        MESSAGE.TIME_OUT,
        [
          {
            text: MESSAGE.OK,
            onPress: () => navigation.dispatch(resetAction(0, SCREEN.MAIN_MAP)),
          },
        ],
        { cancelable: false }
      );
    });
  };

  return (
    <Wrapper>
      <Title size='30px'>라이스코코 기다리는 중🥱</Title>
      {!!expiredTime && (
        <RemainingTime expiredTime={expiredTime} onTimeEnd={handleTimeEnd} />
      )}
      <RotatedIcon />
      <StyledButton onPress={handlePressCancelButton}>
        <StyledText color={COLOR.WHITE}>취소하기</StyledText>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(
  state => ({
    userId: state.user._id,
    currentMeeting: state.meetings.currentMeeting,
    meetingId: state.meetings.selectedMeeting.meetingId,
    expiredTime: state.meetings.selectedMeeting.expiredTime,
    restaurantName: state.meetings.selectedMeeting.restaurantName,
  }),
  {
    setCurrentMeeting,
    setSelectedMeeting,
    resetMeeting,
  }
)(MatchWaiting);
