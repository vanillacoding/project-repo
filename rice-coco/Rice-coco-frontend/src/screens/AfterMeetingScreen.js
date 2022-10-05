import React from 'react';
import { connect } from 'react-redux';
import { resetMeeting } from '../actions';
import configuredAxios from '../config/axiosConfig';
import resetAction from '../utils/resetAction';
import ROUTE from '../constants/route';
import SCREEN from '../constants/screen';
import { COLOR } from '../constants/color';
import {
  Wrapper,
  WhiteText,
  StyledView,
  StyledText,
  StyledButton,
} from '../shared/index';

const AfterMeetingScreen = ({
  userId,
  resetMeeting,
  partnerNickname,
  navigation,
}) => {
  const handleAgreeButtonClick = async () => {
    await configuredAxios.put(`/users/${userId}${ROUTE.FAVORITE_PARTNERS}`, {
      partnerNickname,
    });

    navigation.dispatch(resetAction(0, SCREEN.MAIN_MAP));
    resetMeeting();
  };

  const handleRejectButtonClick = () => {
    navigation.dispatch(resetAction(0, SCREEN.MAIN_MAP));
    resetMeeting();
  };

  return (
    <Wrapper color={COLOR.THEME_COLOR}>
      <StyledView>
        <WhiteText>{partnerNickname}님과의 식사는 어떠하셨나요?</WhiteText>
        <WhiteText>밥친구로 추가하시겠어요?</WhiteText>
      </StyledView>
      <StyledButton
        marginTop={'20px'}
        color={COLOR.WHITE}
        onPress={handleAgreeButtonClick}
      >
        <StyledText>나의 라이스코코</StyledText>
      </StyledButton>
      <StyledButton
        marginTop={'20px'}
        color={COLOR.WHITE}
        onPress={handleRejectButtonClick}
      >
        <StyledText>아니요 하지 않겠습니다</StyledText>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(
  state => ({
    userId: state.user._id,
    meetingId: state.meetings.selectedMeeting.meetingId,
    partnerNickname: state.meetings.selectedMeeting.partnerNickname,
  }),
  {
    resetMeeting,
  }
)(AfterMeetingScreen);
