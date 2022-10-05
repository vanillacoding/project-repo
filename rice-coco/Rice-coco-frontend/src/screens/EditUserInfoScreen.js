import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import configuredAxios from '../config/axiosConfig';
import { setUserInfo } from '../actions/index';
import PickerInput from '../components/PickerInput';
import ROUTE from '../constants/route';
import API_URL from '../constants/apiUrl';
import MESSAGE from '../constants/message';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import { COLOR } from '../constants/color';
import {
  StyledInput,
  InputContainer,
  Wrapper,
  StyledButton,
  StyledText,
  Container,
  PickerContainer,
  Label,
  Title,
} from '../shared/index';

const EditUserInfo = ({ navigation, user, userId, setUserInfo }) => {
  const { nickname, birthYear, email, gender, occupation, promise } = user;
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [occupationInput, setOccupationInput] = useState(occupation);

  const getUpdateUser = async () => {
    try {
      const {
        data: { user },
      } = await configuredAxios.get(`${ROUTE.USERS}/${userId}`);

      setUserInfo(user);
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
    }
  };

  useEffect(() => {
    getUpdateUser();
  }, []);

  const handlePressNicknameRefresher = async () => {
    const {
      data: { words: randomName },
    } = await configuredAxios.get(API_URL.randomNickname);
    setNicknameInput(randomName[0]);
  };

  const onPressSubmitButton = async () => {
    if (nickname === nicknameInput && occupation === occupationInput) return;

    try {
      const {
        data: { nickname, occupation },
      } = await configuredAxios.put(`${ROUTE.USERS}/${userId}`, {
        nickname: nicknameInput,
        occupation: occupationInput,
      });

      setUserInfo({ nickname, occupation });
      navigation.goBack();
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
    }
  };

  return (
    <Wrapper>
      <Title>내 정보 수정하기</Title>
      <StyledInput value={email} editable={false} color={COLOR.LIGHT_GRAY} />
      <Label>occupation</Label>
      <Container>
        <StyledInput
          value={occupationInput}
          editable={false}
          color={COLOR.THEME_COLOR}
        />
        <PickerContainer>
          <PickerInput
            onChange={setOccupationInput}
            contentOptions={MY_INFO_OPTIONS.OCCUPATION}
          />
        </PickerContainer>
      </Container>
      <Label>nickname</Label>
      <InputContainer onPress={handlePressNicknameRefresher} width='100%'>
        <StyledInput
          value={nicknameInput}
          editable={false}
          color={COLOR.THEME_COLOR}
        />
      </InputContainer>
      <Label>gender</Label>
      <StyledInput value={gender} editable={false} color={COLOR.LIGHT_GRAY} />
      <Label>age</Label>
      <StyledInput
        value={birthYear}
        editable={false}
        color={COLOR.LIGHT_GRAY}
      />
      <Label>my point </Label>
      <StyledInput
        value={`프로미스 ${promise.toString()}개`}
        editable={false}
        color={COLOR.LIGHT_GRAY}
      />
      <StyledButton onPress={onPressSubmitButton} marginTop='8px'>
        <StyledText color={COLOR.WHITE}>수정하기</StyledText>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(
  state => ({
    user: state.user,
    userId: state.user._id,
  }),
  {
    setUserInfo,
  }
)(EditUserInfo);
