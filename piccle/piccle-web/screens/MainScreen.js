import React, { Component, Fragment } from 'react';
import { StyleSheet, Text, Image, View, Platform, ViewPagerAndroid, TouchableOpacity, Alert } from 'react-native';
import { SecureStore } from 'expo';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import PhotoScreen from './PhotoScreen';

export default class MainScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myPhotoList: [],
      receivedPhotoList: []
    };
  }

  componentDidMount() {
    this._getPhotos();
  }

  componentDidUpdate() {
    const { params } = this.props.navigation.state;
    if (params && params.needToRerender) {
      this._getPhotos();
      params.needToRerender = false;
    }
  }


  async _getPhotos() {
    try {
      const token = await SecureStore.getItemAsync('ACCESS_TOKEN');
      const { userId } = this.props.screenProps;

      const myPhotoResponse = await fetch(`http://piccle-production.eu-west-1.elasticbeanstalk.com/api/users/${userId}/my-photos`, {
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`}
      });
      const myPhotoJson = await myPhotoResponse.json();
      const myPhotoList = myPhotoJson.myPhotoList;

      const receivedPhotoResponse = await fetch(`http://piccle-production.eu-west-1.elasticbeanstalk.com/api/users/${userId}/received-photos`, {
        method: 'get',
        headers: {'Authorization': `Bearer ${token}`}
      });
      const receivedJson = await receivedPhotoResponse.json();
      const receivedPhotoList = receivedJson.receivedPhotoList;

      this.setState({
        myPhotoList: myPhotoList.reverse(),
        receivedPhotoList: receivedPhotoList.reverse()
      });
    } catch(err) {
      console.error(err);
    }
  }

  _onCameraBtnClick() {
    const { navigation } = this.props;
    navigation.navigate('CameraScreen');
  }

  _onMyPhotoSingleTap(index) {
    this.setState(prevState => {
      prevState.myPhotoList[index].showPhoto = !prevState.myPhotoList[index].showPhoto;
      return { myPhotoList: prevState.myPhotoList };
    });
  }

  async _onPressLogoutOkBtn() {
    const { navigation } = this.props;
    const { setUserInfo } = this.props.screenProps;
    setUserInfo('', '');
    await SecureStore.deleteItemAsync('ACCESS_TOKEN');
    Alert.alert('Logout', '로그아웃 되었습니다');
    navigation.navigate('LoginScreen');
  }

  _onPressLogoutBtn() {
    Alert.alert('Logout', '로그아웃 하시겠습니까?', [
      {text: 'Cancel', style: 'cancel'},
      {text: 'OK', onPress: this._onPressLogoutOkBtn.bind(this)}
    ]);
  }

  _onReceivedPhotoSingleTap(index) {
    this.setState(prevState => {
      prevState.receivedPhotoList[index].showPhoto = !prevState.receivedPhotoList[index].showPhoto;
      return { receivedPhotoList: prevState.receivedPhotoList };
    });
  }

  _renderiOSError() {
    return (
      <View style={styles.container}>
        <Text>Sorry, this is a demo of android-only native components</Text>
      </View>
    );
  }

  _renderHeader() {
    const { userName } = this.props.screenProps;
    return (
      <View style={styles.header}>
        <View style={styles.logo}>
          <Image
            source={require('../assets/icon.png')}
            style={{width: 30, height: 30}}
          />
        </View>
        <TouchableOpacity
          style={styles.userTab}
          onPress={this._onPressLogoutBtn.bind(this)}
        >
          <Text style={styles.userName}>{userName.split(' ')[0]}</Text>
          <AntDesign name="logout" size={17} color="#777" />
        </TouchableOpacity>
      </View>
    );
  }

  _renderMainButton() {
    return (
      <TouchableOpacity
        style={styles.mainButton}
        onPress={this._onCameraBtnClick.bind(this)}
      >
        <Ionicons name="ios-radio-button-on" size={70} color="#ee325f" />
      </TouchableOpacity>
    );
  }

  render() {
    const { userName } = this.props.screenProps;
    const { myPhotoList, receivedPhotoList } = this.state;

    if (Platform.OS !== 'android') {
      {this._renderiOSError()}
    } else {
      return (
        <Fragment>
          {this._renderHeader()}
          <ViewPagerAndroid style={styles.container}>
            <View>
              <PhotoScreen
                userName={userName}
                photoList={myPhotoList}
                onSingleTap={this._onMyPhotoSingleTap.bind(this)}
              />
            </View>
            <View>
              <PhotoScreen
                userName={userName}
                photoList={receivedPhotoList}
                onSingleTap={this._onReceivedPhotoSingleTap.bind(this)}
              />
            </View>
          </ViewPagerAndroid>
          {this._renderMainButton()}
        </Fragment>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    flexDirection:'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingTop: 25,
    paddingBottom: 7,
    backgroundColor: '#fff'
  },
  logo: {
    marginLeft: 10
  },
  userTab: {
    flexDirection:'row',
    alignItems: 'center',
    marginRight: 10
  },
  userName: {
    fontSize: 15,
    color: '#777',
    marginRight: 5
  },
  mainButton: {
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20
  }
});
