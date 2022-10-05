import React from 'react';
import { Image, StatusBar, TouchableHighlight, Button, StyleSheet, Text, View } from 'react-native';


export default class Intro extends React.Component {

  startedApp() {

  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.imgWrap}>
          <Image style={styles.img} source={require('../../Sources/Images/voice-toggle.png')} />
        </View>
        <View style={styles.textWrap}>
          <Text style={styles.textBody}>대화 중 음성모드를 사용하면</Text>
          <Text style={styles.textBody}>화면을 보지 않고도</Text>
          <Text style={styles.textBody}>상대방의 메시지를 듣고</Text>
          <Text style={styles.textBody}>상대방에게 음성으로</Text>
          <Text style={styles.textBody}>메시지를 보낼 수 있습니다.</Text>
        </View>
        <View style={styles.btnWrap}>
          <TouchableHighlight
            underlayColor={'#7A47C2'}
            onPress={this.props.pageStateChange.bind(this, 'Join')}
            style={styles.startButton}
            accessibilityLabel="Get Started button"
          >
            <Text style={styles.btnText}>
              시작하기
        </Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,

  },
  imgWrap: {
    flex: 5,

    justifyContent: 'flex-end',
  },
  textBody: {
    fontSize: 20,
    lineHeight: 30,
    color: '#5A5A5A',
    textAlign: 'center',
  },
  textWrap: {
    flex: 4,

    justifyContent: 'center',
  },
  btnWrap: {
    flex: 4,

    justifyContent: 'center',
  },
  btnText: {
    fontSize: 16,
    color: '#fff',
  },
  startButton: {
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    borderRadius: 4,
    // borderColor: 'black',
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 4,
    backgroundColor: '#C86DD7',
  },
  img: {
    width: 198,
    height: 63,
  },
});
