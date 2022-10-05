import React from 'react';
import { Alert } from 'react-native';
import {
  Container,
  Content,
  ListItem,
  Text,
  Separator
} from 'native-base';

export default function SettingScreen(props) {
  const { navigation } = props;
  const { onUserLogout } = props.screenProps;

  const _moveToLoginScreen = async() => {
    try {
      navigation.navigate('Loading');
      await onUserLogout();
    } catch(err) {
      console.log(err);
    }
  };

  const _logout = async() => {
    try {
      Alert.alert(
        '로그아웃',
        '로그아웃 하시겠습니까?',
        [
          {
            text: '로그아웃',
            onPress: _moveToLoginScreen
          },
          {
            text: '취소',
            style: 'destructive',
          },
        ]
      );
    } catch(err) {
      Alert.alert('로그아웃 에러', '다시 시도해주세요');
      console.log(err);
    }
  };

  return (
    <Container>
      <Content>
        <Separator bordered>
          <Text>소유자</Text>
        </Separator>
        <ListItem>
          <Text>Hyejin Kim</Text>
        </ListItem>
        <ListItem>
          <Text>yejiinh@gmail.com</Text>
        </ListItem>
        <Separator bordered>
          <Text>계정</Text>
        </Separator>
        <ListItem last button onPress={_logout}>
          <Text>로그아웃</Text>
        </ListItem>
      </Content>
    </Container>
  );
}
