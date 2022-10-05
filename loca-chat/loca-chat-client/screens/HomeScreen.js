import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useFonts } from '@use-expo/font';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

export default function HomeScreen({
  navigation,
  errorMessage,
  changeNickname,
  setErrorMessage
}) {
  const [nickname, setNickname] = useState('');
  const [fontsLoaded] = useFonts({
    BMJUA: require('../assets/fonts/BMJUA_otf.otf')
  });

  const handleStartButtonClick = () => {
    if (!nickname.trim()) return setErrorMessage('닉네임을 입력해주세요.');

    changeNickname(nickname);
    navigation.navigate('Map');
  };
  if (!fontsLoaded) {
    return <Loading />;
  }
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>LocaChat</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          value={nickname}
          placeholder="Nickname"
          placeholderTextColor="gray"
          onChangeText={(nickname) => setNickname(nickname)}
        />
        <TouchableOpacity onPress={handleStartButtonClick} style={styles.startButton}>
          <Text style={styles.startButtonText}>시작하기</Text>
        </TouchableOpacity>
        <ErrorMessage errorMessage={errorMessage} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    fontSize: 70,
    fontWeight: '100',
    fontFamily: 'BMJUA',
    color: 'rgba(160, 160, 160, 2)'
  },
  inputContainer: {
    flex: 1,
    width: '100%',
    height: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textInput: {
    height: 50,
    width: 200,
    borderWidth: 1,
    borderColor: '#1fcd97',
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: 'white'
  },
  startButton: {
    backgroundColor: '#1fcd97',
    width: 200,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderColor: '#1fcd97',
    marginTop: 20
  },
  startButtonText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
