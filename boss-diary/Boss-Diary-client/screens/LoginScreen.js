import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../constants/Colors';

export default function LoginScreen(props) {
  const { navigation } = props;
  const { fetchFacebookData } = props.screenProps;

  const _login = async() => {
    try {
      await fetchFacebookData();

      navigation.navigate('Main');
    } catch(err) {
      console.log(err);
      navigation.navigate('Login');
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.textContainer}>
          <Text>발행일자 2019. 10</Text>
        </View>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>부장님의 보고서</Text>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity testID='welcome' onPress={_login}>
            <Text style={styles.button}>보고서 작성 시작하기</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.copyright}>
          <Text>Copyright © 2019 by yejinh All rights reserved</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    borderWidth: 1,
    alignSelf: 'flex-start',
    marginTop: 100,
    paddingTop: 5,
    paddingBottom: 5,
    paddingRight: 10,
    paddingLeft: 10
  },
  titleContainer: {
    marginTop: 80,
    paddingTop: 40,
    paddingBottom: 40,
    borderTopWidth: 8,
    borderBottomWidth: 8,
    borderColor: Color.deepGreen
  },
  titleText: {
    fontSize: 50
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    fontSize: 5
  },
  button: {
    fontSize: 20
  },
  copyright: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 90
  }
});
