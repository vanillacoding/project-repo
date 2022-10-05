import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import Entypo from '@expo/vector-icons/Entypo'
import { Ionicons } from '@expo/vector-icons';
import Canvas from 'react-native-canvas';
import DoubleClick from 'react-native-double-tap';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

import Header from '../layouts/Header';
import DropDown from '../layouts/Dropdown';
import { loginAlert, handleCanvas } from '../../utils/index';
import { fetchUserPortraits, handleFollow, handleDoubletap, deletePortrait } from '../../utils/api';
import { setLoggedIn, setUserPortraits, setDropdownStatus, setSearchedUser } from '../../actions';

export function MypageScreen ({ loggedIn, searchedUser, setSearchedUser, userPortraits, setUserPortraits, setDropdownStatus, route, navigation }) {
  const isMypage = !route.params;

  const user = isMypage ? loggedIn.status ? loggedIn.user : false : searchedUser;
  const isFollowing = isMypage ? false : loggedIn.status ? user.followers.includes(loggedIn.user._id): false;

  useEffect(() => {
    isMypage && !loggedIn.status && loginAlert(navigation);

    return navigation.addListener('focus', () => {
      user && fetchUserPortraits(user, setUserPortraits);
    });
  }, [navigation]);

  const hideDropdown = (mode, item) => {
    setDropdownStatus({ status: false, item: {} });
    
    switch(mode) {
      case 'Edit':
        return navigation.navigate('Edit', { portrait: item, mode: 'Edit' });
      case 'Delete':
        return deletePortrait(item, user, setUserPortraits);
    };
  };

  const renderPhotos = item => {
    const isLiked = item.like_users.includes(loggedIn.user._id);

    return (
      <View style={styles.photoContainer}>
        <View style={styles.photoHeader}>
          <Ionicons
            name={isLiked ? "md-heart" : "md-heart-empty"}
            size={32}
            color={isLiked ? "tomato" : "gray"} />
          <Text style={styles.photoTitle}>{item.like_users.length} likes</Text>
          {isMypage && (
          <>
            <TouchableOpacity
              style={styles.photoMenuButton}
              ref={item.ref}
              onPress={() => setDropdownStatus({ status: true, item })}>
              <Entypo name="dots-three-vertical" size={20} color="gray" />
            </TouchableOpacity>
          </>
          )}
        </View>
        {isMypage ?
          <Canvas style={styles.canvas} ref={canvas => handleCanvas(canvas, item.faceType)} />
          : (
          <DoubleClick doubleTap={() => handleDoubletap(item, loggedIn, user, setUserPortraits)}>
            <Canvas style={styles.canvas} ref={canvas => handleCanvas(canvas, item.faceType)} />
          </DoubleClick>)
        }
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Header name={user.user_id} navigation={navigation} />
      <View style={styles.userContainer}>
        <Image style={styles.profileImage} source={{ uri: user.profile_url }} />
        <View style={styles.userInfoContainer}>
          <Text style={styles.userId}>{user.user_id}</Text>
          <Text style={styles.userName}>{user.user_name}</Text>
        </View>
        <View style={styles.followContainer}>
          <View style={styles.followCounts}>
            <View style={styles.followBox}>
              <Text style={styles.follow}>{user ? user.followers.length : 0}</Text>
              <Text style={styles.followTitle}>팔로워</Text>
            </View>
            <View style={styles.followBox}>
              <Text style={styles.follow}>{user ? user.followings.length : 0}</Text>
              <Text style={styles.followTitle}>팔로잉</Text>
            </View>
          </View>
          {!isMypage && (
          <TouchableOpacity
          style={isFollowing ? styles.unfollowButton : styles.followButton}
          onPress={() => handleFollow(loggedIn, user, setSearchedUser)}>
            <Text style={styles.followButtonTitle}>{isFollowing ? "언팔로우" : "팔로우"}</Text>
          </TouchableOpacity>)}
        </View>
      </View>
      {userPortraits.length !== 0 &&
      <>
        <FlatList
          data={userPortraits}
          renderItem={({ item, index }) => renderPhotos(item, index)}
          keyExtractor={item => item._id} />
        <DropDown hide={hideDropdown} navigation={navigation} />
      </>
      }
    </View>
  );
};

const mapStateToProps = state => {
  return {
    loggedIn: state.loggedIn,
    searchedUser: state.searchedUser,
    dropdownStatus: state.dropdownStatus,
    userPortraits: state.userPortraits
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setLoggedIn: user => { dispatch(setLoggedIn(true, user)); },
    setUserPortraits: portraits => { dispatch(setUserPortraits(portraits)); },
    setDropdownStatus: status => { dispatch(setDropdownStatus(status)); },
    setSearchedUser: user => { dispatch(setSearchedUser(user)); },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MypageScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    height: 100,
    backgroundColor: '#D9D9D9',
  },
  profileImage: {
    marginLeft: '2%',
    marginRight: '3%',
    width: 70,
    height: 70,
    borderRadius: 70 / 2,
    borderColor: 'white',
    borderWidth: 3
  },
  canvas: {
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 1
  },
  userInfoContainer: {
    width: '45%'
  },
  userId: {
    fontSize: 30
  },
  followContainer: {
    marginTop: 10
  },
  followCounts: {
    flexDirection: 'row',
    marginBottom: 5
  },
  followBox: {
    justifyContent: 'center',
    width: 50,
    marginRight: 5
  },
  follow: {
    textAlign: 'center',
    fontWeight: 'bold'
  },
  followTitle: {
    textAlign: 'center'
  },
  followButton: {
    width: 105,
    height: 25,
    justifyContent: 'center',
    backgroundColor: '#4968A6'
  },
  unfollowButton: {
    width: 105,
    height: 25,
    justifyContent: 'center',
    backgroundColor: '#D9843B'
  },
  followButtonTitle: {
    textAlign: 'center',
    color: 'white'
  },
  photoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  photoHeader: {
    flexDirection: 'row',
    width: 300,
    height: 50,
    alignItems: 'center',
    paddingLeft: 10,
    paddingTop: 10
  },
  photoTitle: {
    marginLeft: 10,
    fontSize: 15,
    color: 'gray'
  },
  photoMenuButton: {
    position: 'absolute',
    paddingTop: 10,
    right: 10,
  },
  photo: {
    marginBottom: 20,
    width: 300,
    height: 300
  },
});
