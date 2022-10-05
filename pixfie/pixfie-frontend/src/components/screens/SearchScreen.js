import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from 'react-native';

import { setSearchKeyword, setSearchResults, setSearchedUser } from '../../actions';
import { fetchKeyword } from '../../utils/api';
import Header from '../layouts/Header';

export const Results = ({ users, setSearchedUser, navigation }) => {

  const handlePress = user => {
    setSearchedUser(user);
    navigation.navigate('Mypage', { user });
  };

  return (
    <View style={styles.resultContainer}>
      {users.length ?
      users.map((user, index) => {
        return (
          <TouchableOpacity style={styles.userContainer} onPress={() => handlePress(user)} key={index}>
            <Image style={styles.profileImage} source={{ uri: user.profile_url }} />
            <View>
              <Text style={styles.userId}>{user.user_id}</Text>
              <Text style={styles.userName}>{user.user_name}</Text>
            </View>
          </TouchableOpacity>
        );
      })
      :<Text style={styles.noResult}>검색 결과 없음</Text>}
    </View>
  );
};

export const SearchScreen = props => {
  const { 
    keyword, 
    loggedIn, 
    users, 
    setSearchKeyword, 
    setSearchResults, 
    setSearchedUser, 
    clearStates,
    navigation } = props;

  useEffect(() => {
    clearStates();
  }, []);

  return (
    <View style={styles.container}>
      <Header navigation={navigation} />
      <TextInput
        style={styles.inputText}
        placeholder="아이디/이름 검색"
        onChangeText={keyword => fetchKeyword(keyword, loggedIn, setSearchKeyword, setSearchResults)}
        value={keyword} />
      <Results
        users={users}
        setSearchedUser={setSearchedUser}
        navigation={navigation} />
    </View>
  );
};

const mapStateToProps = state => {
  return {
    keyword: state.keyword,
    loggedIn: state.loggedIn,
    users: state.users
  };
};

const mapDispatchToProps = dispatch => {
  return {
    setSearchKeyword(value) { dispatch(setSearchKeyword(value)); },
    setSearchedUser(user) { dispatch(setSearchedUser(user)) },
    setSearchResults(result) { dispatch(setSearchResults(result)); },
    clearStates() {
      dispatch(setSearchKeyword(''));
      dispatch(setSearchResults([]));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  inputText: {
    width: '100%',
    height: 45,
    marginBottom: 10,
    paddingLeft: 50,
    paddingRight: 50,
    fontSize: 20,
    borderColor: 'transparent',
    backgroundColor: 'white'
  },
  button: {
    width: 250
  },
  resultContainer: {
    marginBottom: 30
  },
  userContainer: {
    marginTop: 10,
    paddingLeft: 10,
    width: 300,
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    backgroundColor: 'white'
  },
  profileImage: {
    width: 35,
    height: 35,
    marginRight: 10
  },
  userId: {
    fontSize: 25
  },
  userName: {
    fontSize: 15
  },
  noResult: {
    fontSize: 15,
    color: 'gray'
  }
});
