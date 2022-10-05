import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import asyncStorage from '@react-native-async-storage/async-storage';
import configuredAxios from '../config/axiosConfig';
import { setUserInfo } from '../actions';
import PickerInput from '../components/PickerInput';
import ReloadImage from '../components/ReloadImage';
import MY_INFO_OPTIONS from '../constants/myInfoOptions';
import MESSAGE from '../constants/message';
import SCREEN from '../constants/screen';
import { COLOR } from '../constants/color';
import API_URL from '../constants/apiUrl';
import ROUTE from '../constants/route';
import {
  Title,
  Wrapper,
  Label,
  StyledText,
  StyledInput,
  Container,
  StyledButton,
  InputContainer,
} from '../shared/index';

const UserRegisterScreen = ({ route, navigation, setUserInfo }) => {
  const [nickname, setNickname] = useState('');
  const [gender, setGender] = useState('남자');
  const [occupation, setOccupation] = useState('개발');
  const [birthYear, setBirthYear] = useState('20대');
  const [hasSubmit, setHasSubmit] = useState(false);
  const { email } = route.params;

  const generateNickname = async () => {
    try {
      const { data } = await configuredAxios.get(API_URL.randomNickname);
      const generatedNickname = data.words[0];

      setNickname(generatedNickname);
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
    }
  };

  useEffect(() => {
    generateNickname();
  }, []);

  const handleSubmit = async () => {
    if (hasSubmit) return;
    setHasSubmit(true);

    try {
      const userInfo = { nickname, gender, occupation, birthYear, email };
      const { data } = await configuredAxios.post(
        `${ROUTE.USERS}${ROUTE.SIGNUP}`,
        userInfo
      );
      const { token, user } = data;

      setUserInfo(user);
      await asyncStorage.setItem('token', token);
      navigation.navigate(SCREEN.PREFERRED_PARTNER);
    } catch (error) {
      alert(MESSAGE.UNKNWON_ERROR);
      setHasSubmit(false);
    }
  };

  return (
    <Wrapper>
      <Title>내 정보 등록</Title>
      <Label>nickname</Label>
      <Container>
        <StyledInput
          placeholder='nickname'
          value={nickname}
          editable={false}
          selectTextOnFocus={false}
        />
        <ReloadImage onClick={generateNickname} />
      </Container>
      <Label>gender</Label>
      <InputContainer>
        <PickerInput
          content={gender}
          onChange={setGender}
          contentOptions={MY_INFO_OPTIONS.GENDER}
        />
      </InputContainer>
      <Label>occupation</Label>
      <InputContainer>
        <PickerInput
          content={occupation}
          onChange={setOccupation}
          contentOptions={MY_INFO_OPTIONS.OCCUPATION}
        />
      </InputContainer>
      <Label>age</Label>
      <InputContainer>
        <PickerInput
          content={birthYear}
          onChange={setBirthYear}
          contentOptions={MY_INFO_OPTIONS.AGE}
        />
      </InputContainer>
      <StyledButton onPress={handleSubmit}>
        <StyledText color={COLOR.WHITE}>내 정보 등록하기</StyledText>
      </StyledButton>
    </Wrapper>
  );
};

export default connect(null, { setUserInfo })(UserRegisterScreen);
