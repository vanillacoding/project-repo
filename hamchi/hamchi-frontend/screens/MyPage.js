import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearCredentials } from '../api/secureStore';
import { signOut } from '../features/userSlice';

import { StyleSheet, View, Text } from 'react-native';
import Button from '../components/shared/Button';

const MyPage = () => {
  const dispatch = useDispatch();
  const username = useSelector(state => state.user.username);
  const email = useSelector(state => state.user.email);

  async function handleSignoutButtonClick() {
    await clearCredentials();
    dispatch(signOut());
  }

  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Text>이름:{username}</Text>
        <Text>이메일:{email}</Text>
      </View>
      <Button
        text="로그아웃"
        type="filled"
        onPress={handleSignoutButtonClick}
        customButtonStyle={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center"
  },
  info: {
    width: '60%',
    marginTop: 42
  },
  button: {
    width: '60%',
    alignSelf: 'center'
  }
});

export default MyPage;
