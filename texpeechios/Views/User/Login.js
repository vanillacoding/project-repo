import React, { Component } from 'react';
import { View, AlertIOS, StatusBar, ImageBackground, TextInput, Text, TouchableHighlight, Image, StyleSheet } from 'react-native';
// import { AccessToken, LoginManager } from 'react-native-fbsdk';
import firebase from 'react-native-firebase';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailValue: null,
      pwValue: null,
      userData: null,
      userDatas: null,
    }
  }

  // authenticate(token) {
  //   const provider = firebase.auth.FacebookAuthProvider
  //   const credential = provider.credential(token)

  //   let ret = firebase.auth().signInWithCredential(credential)

  //   return ret;
  // }

  // createUser(uid, userDatas, token, dp) {
  //   const defaults = {
  //     uid,
  //     token,
  //     dp,
  //     ageRange: [20, 30]
  //   }
  //   firebase.database().ref('users').child(uid).update({ ...userDatas, ...defaults })
  // }

  fbBtnAction() {
    //   onLoginOrRegister = () => {
    //     LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_friends'])
    //       .then((result) => this._handleCallBack(result),
    //         function (error) {
    //           alert('Login fail with error: ' + error);
    //         }
    //       )
    //   }
    //   onLoginOrRegister();
  }

  // _handleCallBack(result) {
  //   let _this = this;
  //   if (result.isCancelled) {
  //     alert('Login cancelled');
  //   } else {
  //     AccessToken.getCurrentAccessToken().then((data) => {
  //       const token = data.accessToken;
  //       fetch('https://graph.facebook.com/v2.8/me?fields=id,first_name,last_name,gender,birthday,email&access_token=' + token)
  //         .then((response) => response.json())
  //         .then((json) => {
  //           _this.setState({
  //             userData: json,
  //           })
  //           const imageSize = 120;
  //           const facebookID = json.id;
  //           const fbImage = `https://graph.facebook.com/${facebookID}/picture?height=${imageSize}`
  //           this.authenticate(data.accessToken)
  //             .then(function (result) {
  //               console.warn('result', result)
  //               const { uid } = result
  //               _this.createUser(uid, json, token, fbImage)
  //             }).catch(function (err) {
  //               console.warn(err)
  //               //alert('Login fail with error: ' + err);
  //             });
  //         })
  //         .catch(function (err) {
  //           // console.warn(err)
  //           //alert('Login fail with error: ' + err);
  //           return err;
  //         });
  //     })
  //   }
  // }

  inputEmail(value) {
    this.setState({
      emailValue: value,
    })

  }

  inputPw(value) {
    this.setState({
      pwValue: value,
    })
    // AlertIOS.alert(this.state.emailValue)
  }

  loginCheck() {
    if (!this.state.emailValue || !this.state.pwValue) {
      AlertIOS.alert(
        '아이디 혹은 비밀번호가 입력되지 않았습니다.'
      );
      return;
    }
    let chkCount = 0;
    this.props.joinedUserDatas.forEach((userdata, i) => {
      if (this.state.emailValue === userdata.emailValue && this.state.pwValue === userdata.pwValue) {
        this.props.onSession(userdata);
        this.props.logChange();
        return;
      } else if (this.state.emailValue === userdata.emailValue && this.state.pwValue !== userdata.pwValue) {
        AlertIOS.alert(
          '아이디와 비밀번호가 일치하지 않습니다.'
        );
      } else if (this.state.emailValue !== userdata.emailValue) {
        if (chkCount === this.props.joinedUserDatas.length - 1) {
          AlertIOS.alert(
            '가입되지 않은 사용자입니다.'
          );
          return;
        }
        chkCount++;
      }
    })

    // if (this.state.emailValue === 'admin' && this.state.pwValue === 'dj1234') {
    //   this.props.logChange();
    // } else {
    //   AlertIOS.alert(
    //     this.props.emailValue // + this.props.pwValue + '아이디와 비밀번호가 일치하지 않습니다.'
    //   );
    //   this.props.logChange('err');
    // }
  }

  render() {
    return (
      <ImageBackground source={require('../../Sources/Images/login-bg.png')} style={LoginStyles.container}>
        <StatusBar barStyle="light-content" />
        <View style={LoginStyles.tpIconWrap}>
          <Image source={require('../../Sources/Images/tp-icon-large.png')} style={LoginStyles.tpIcon} />
        </View>
        <View style={LoginStyles.loginPasswordSection}>
          <Text style={LoginStyles.lpText}>이메일</Text>
          <View style={LoginStyles.inputBoxwrap}>
            <TextInput onChangeText={(value) => { this.inputEmail(value) }} autoCapitalize={'none'} keyboardType={'email-address'} placeholder={'email@example.com'} style={LoginStyles.inputBox}></TextInput>
          </View>
        </View>
        <View style={LoginStyles.loginPasswordSection}>
          <Text style={LoginStyles.lpText} >비밀번호</Text>
          <View style={LoginStyles.inputBoxwrap}>
            <TextInput onChangeText={(value) => { this.inputPw(value) }} placeholder={'6자 이상'} secureTextEntry={true} style={LoginStyles.inputBox}></TextInput>
          </View>
        </View>
        <View style={LoginStyles.btnSection}>
          <TouchableHighlight onPress={() => { this.loginCheck() }} style={LoginStyles.loginBtn}>
            <Text>로그인</Text>
          </TouchableHighlight>
        </View>
        <View style={LoginStyles.linkSection}>
          <Text style={{ color: '#fff', opacity: 0.9, }}>비밀번호를 잊으셨나요?</Text>
          <Text style={LoginStyles.linkTextBlank}> | </Text>
          <Text onPress={() => { this.props.moveToJoin() }} style={{ color: '#fff', opacity: 0.9, }}>아직 회원이 아니신가요?</Text>
        </View>
        <View style={LoginStyles.fbBtnSection}>
          <TouchableHighlight style={LoginStyles.fbLoginBtn} onPress={this.fbBtnAction.bind(this)}>
            <Text style={{ color: '#fff', opacity: 0.9, fontWeight: 'bold', }}>페북으로 로그인</Text>
          </TouchableHighlight>
        </View>
      </ImageBackground>
    );
  };
};

const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tpIconWrap: {
    flex: 6,
    marginTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tpIcon: {
    width: 200,
    height: 150,
  },
  loginPasswordSection: {
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
    flex: 1,
    flexDirection: 'row',
    marginBottom: 8,
  },
  fbBtnSection: {
    flex: 6,
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
  loginBtn: {
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
  fbLoginBtn: {
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
  loginBtnText: {
    color: '#C86DD7',
  }
});

