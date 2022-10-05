import React from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import asyncStorage from '@react-native-async-storage/async-storage';
import { resetUserInfo, resetMeeting } from '../actions/index';
import resetAction from '../utils/resetAction';
import MESSAGE from '../constants/message';
import SCREEN from '../constants/screen';
import { Wrapper, Title, OutlineButton, StyledText } from '../shared/index';

const MyPageScreen = ({ navigation, userId, resetUserInfo, resetMeeting }) => {
  const logout = () => {
    if (!userId) return;

    return Alert.alert(MESSAGE.LOGOUT, null, [
      {
        text: MESSAGE.YES,
        onPress: async () => {
          await asyncStorage.removeItem('token');
          resetUserInfo();
          resetMeeting();
          navigation.dispatch(resetAction(0, SCREEN.HOME));
        },
      },
      {
        text: MESSAGE.NO,
      },
    ]);
  };

  return (
    <Wrapper>
      <Title>My Page</Title>
      <OutlineButton
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.EDIT_USER_INFO);
        }}
      >
        <StyledText>내 정보 수정하기</StyledText>
      </OutlineButton>
      <OutlineButton
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.PREFERRED_PARTNER);
        }}
      >
        <StyledText>선호하는 친구</StyledText>
      </OutlineButton>
      <OutlineButton
        onPress={() => {
          if (!userId) return;
          navigation.navigate(SCREEN.PAYMENT);
        }}
      >
        <StyledText>결제</StyledText>
      </OutlineButton>
      <OutlineButton onPress={logout}>
        <StyledText>로그아웃</StyledText>
      </OutlineButton>
    </Wrapper>
  );
};

export default connect(
  state => ({
    user: state.user,
    userId: state.user._id,
  }),
  {
    resetUserInfo,
    resetMeeting,
  }
)(MyPageScreen);
