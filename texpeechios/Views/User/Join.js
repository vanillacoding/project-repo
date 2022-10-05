import React, { Component } from 'react';
import { View, AlertIOS, StatusBar, ImageBackground, TextInput, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';

export default class Join extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: null,
      pwValue: null,
      pwValue2: null,
      mobileValue: null,
      username: null,
      joinUsers: null,
    }
  }

  changeState(type, value) {
    if (type === 'name') {
      this.setState({
        username: value,
      })
    } else if (type === 'email') {
      this.setState({
        emailValue: value,
      })
    } else if (type === 'number') {
      this.setState({
        mobileValue: value,
      })
    } else if (type === 'pw') {
      this.setState({
        pwValue: value,
      })
    } else if (type === 'pw2') {
      this.setState({
        pwValue2: value,
      })
    }
  }

  componentDidUpdate() {
    if (this.state.joinUsers) {
      this.props.addJoinUsers(this.state.joinUsers);
    }
  }

  newMemberData() {
    let username = this.state.username;
    let email = this.state.emailValue;
    let number = this.state.mobileValue;
    let password = this.state.pwValue;
    let password2 = this.state.pwValue2;
    if (!username || !email || !number || !password || !password2) {
      AlertIOS.alert('빈 항목이 없어야 합니다.');
      return;
    } else if (password !== password2 || password.length > 6) {
      AlertIOS.alert('비밀번호를 다시 확인해 주세요.');
      return;
    } else if (email.indexOf('@') === -1 || email.indexOf('.') === -1) {
      AlertIOS.alert('이메일이 형식과 맞지 않습니다.');
      return;
    } else if (number.length >= 12 && number.length <= 9 && number.indexOf('010') !== 0) {
      AlertIOS.alert('폰번호를 형식에 맞게 다시 입력해주세요.');
    } else {
      this.setState({
        emailValue: null,
        pwValue: null,
        pwValue2: null,
        mobileValue: null,
        username: null,
        joinUsers: {
          emailValue: email,
          pwValue: password,
          mobileValue: number,
          username: username,
          created_at: Date().toLocaleString().slice(4, 21),
        }
      });
    }
  }


  render() {
    return (
      <ImageBackground source={require('../../Sources/Images/login-bg.png')} style={JoinStyles.container}>
        <StatusBar barStyle="light-content" />
        <View style={JoinStyles.tpTitleWrap}>
          <Text style={JoinStyles.lpTitle}>회원가입</Text>
        </View>
        <View style={JoinStyles.JoinPasswordSection}>
          <Text style={JoinStyles.lpText}>이름</Text>
          <View style={JoinStyles.inputBoxwrap}>
            <TextInput
              onChangeText={(value) => { this.changeState('name', value) }}
              value={this.state.username}
              placeholder={'홍길동'}
              style={JoinStyles.inputBox}>
            </TextInput>
          </View>
        </View>
        <View style={JoinStyles.JoinPasswordSection}>
          <Text style={JoinStyles.lpText}>이메일</Text>
          <View style={JoinStyles.inputBoxwrap}>
            <TextInput
              onChangeText={(value) => { this.changeState('email', value) }}
              value={this.state.emailValue}
              autoCapitalize={'none'}
              keyboardType={'email-address'}
              placeholder={'email@example.com'}
              style={JoinStyles.inputBox}>
            </TextInput>
          </View>
        </View>
        <View style={JoinStyles.JoinPasswordSection}>
          <Text style={JoinStyles.lpText}>전화번호</Text>
          <View style={JoinStyles.inputBoxwrap}>
            <TextInput
              onChangeText={(value) => { this.changeState('number', value) }}
              autoCapitalize={'none'}
              keyboardType={'phone-pad'}
              placeholder={'01012345678'}
              value={this.state.mobileValue}
              style={JoinStyles.inputBox}>
            </TextInput>
          </View>
        </View>
        <View style={JoinStyles.JoinPasswordSection}>
          <Text style={JoinStyles.lpText} >비밀번호</Text>
          <View style={JoinStyles.inputBoxwrap}>
            <TextInput
              onChangeText={(value) => { this.changeState('pw', value) }}
              placeholder={'6자 이상'}
              value={this.state.pwValue}
              secureTextEntry={true}
              style={JoinStyles.inputBox}>
            </TextInput>
          </View>
        </View>
        <View style={JoinStyles.JoinPasswordSection}>
          <Text style={JoinStyles.lpText} >비밀번호 확인</Text>
          <View style={JoinStyles.inputBoxwrap}>
            <TextInput
              onChangeText={(value) => { this.changeState('pw2', value) }}
              placeholder={'6자 이상'}
              secureTextEntry={true}
              value={this.state.pwValue2}
              style={JoinStyles.inputBox}>
            </TextInput>
          </View>
        </View>
        <View style={JoinStyles.btnSection}>
          <TouchableHighlight
            onPress={() => { this.newMemberData() }}
            style={JoinStyles.JoinBtn}>
            <Text>가입완료</Text>
          </TouchableHighlight>
        </View>
        <View style={JoinStyles.linkSection}>
          <Text onPress={() => { this.props.moveToLogin() }} style={{ color: '#fff', opacity: 0.9, }}>이미 회원이신가요?</Text>
        </View>
      </ImageBackground>
    );
  };
};

const JoinStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tpTitleWrap: {
    marginTop: 30,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tpIcon: {
    width: 150,
    height: 100,
  },
  JoinPasswordSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSection: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkSection: {
    flex: 6,
    flexDirection: 'row',
    marginBottom: 8,
  },
  fbBtnSection: {
    flex: 6,
  },
  lpTitle: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    opacity: 0.9,
    fontWeight: 'bold',
    fontSize: 18,
  },
  lpText: {
    alignSelf: 'flex-start',
    color: '#fff',
    fontWeight: 'bold',
    opacity: 0.9,
  },
  linkTextBlank: {
    paddingLeft: 10,
    paddingRight: 10,
    color: '#fff',
    opacity: 0.8,
  },
  inputBoxwrap: {
    flexDirection: 'row',
  },
  inputBox: {
    width: 300,
    height: 40,
    padding: 0,
    marginTop: 4,
    paddingLeft: 8,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderWidth: 1,
    borderColor: 'rgba(220,220,220,0.3)',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
  },
  JoinBtn: {
    width: 300,
    height: 40,
    padding: 0,
    paddingLeft: 8,
    backgroundColor: '#fff',
    opacity: 0.9,
    borderWidth: 1,
    borderColor: '#979797',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fbJoinBtn: {
    width: 300,
    height: 40,
    padding: 0,
    paddingLeft: 8,
    backgroundColor: '#3b5998',
    opacity: 0.9,
    borderWidth: 1,
    borderColor: '#29487d',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  JoinBtnText: {
    color: '#C86DD7',
  }
});

