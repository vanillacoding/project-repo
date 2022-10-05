import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { followUser } from '../../featrues/userSlice';
import { EvilIcons, Entypo, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView } from 'react-native';

import { NAMES, SIZES, COLORS, STRINGS } from '../../constants/index';

import styles from './styles';

const FollowMate = ({ allUsers, following, userName }) => {
  const dispatch = useDispatch();
  const [searchUserName, setUserName] = useState('');

  const handleFollowPress = (userInfo) => {
    const followingInfo = { followId: userInfo._id };

    dispatch(followUser(followingInfo));
  };

  return (
    <View style={styles.followMateWrapper}>
      <View style={styles.searchBarWrapper}>
        <View style={styles.searchBar}>
          <View style={styles.searchIcon}>
            <MaterialCommunityIcons
              name={NAMES.SEARCH_ICON}
              size={SIZES.SEARCH_ICON}
              color={COLORS.BLACK}
            />
          </View>
          <TextInput
            value={searchUserName}
            placeholder={STRINGS.SEARCH_FRIEND}
            style={styles.searchInput}
            onChangeText={setUserName}
          />
        </View>
      </View>
      <ScrollView style={styles.scroll}>
        {allUsers.length > 0 &&
          allUsers.map((userInfo, index) => {
            const isFollowing = following.some(followUser => {
              return followUser.id === userInfo._id;
            });

            if (userInfo.userName === userName) return;

            if (!userInfo.userName.includes(searchUserName) &&
                searchUserName !== '') return;

            return (
              <View style={styles.mateWrapper} key={index}>
                <View style={styles.profileImg}>
                  {userInfo.imageUri
                    ? <View style={styles.userProfileWrapper}>
                        <Image
                          source={{ uri: userInfo.imageUri }}
                          style={styles.userProfileImg}
                        />
                      </View>
                    : <EvilIcons
                        name={NAMES.USER_ICON}
                        size={SIZES.FOLLOW_USER_ICON}
                        color={COLORS.BLACK}
                      />}
                  <View style={styles.userNameWrapper}>
                    <Text style={styles.userName}>
                      {userInfo.userName}
                    </Text>
                  </View>
                </View>
                {isFollowing
                  ? <View style={styles.followIconWrapper}>
                      <FontAwesome
                        name={NAMES.CHECK_ICON}
                        size={SIZES.CHECK_ICON}
                        color={COLORS.CHECK_ICON}
                      />
                    </View>
                  : <TouchableOpacity
                      style={styles.followButton}
                      onPress={() => handleFollowPress(userInfo, index)}
                    >
                      <Entypo
                        name={NAMES.CIRCLE_PLUS_ICON}
                        size={SIZES.CIRCLE_PLUS_ICON}
                        color={COLORS.FOLLOW_CIRCLE_PLUS_ICON}
                      />
                    </TouchableOpacity>}
              </View>
            );
        })}
      </ScrollView>
    </View>
  );
};

export default FollowMate;
