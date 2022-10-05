import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateHabitLikes } from '../../../featrues/habitSlice';
import { EvilIcons } from '@expo/vector-icons';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import pickIconByType from '../../../utils/pickIconByType';
import Like from '../../../screens/Animations/Like/Like';
import { NAMES, SIZES, COLORS, STRINGS } from '../../../constants/index';

import styles from './styles';

const MateHabit = ({ followingUserHabits }) => {
  const [likeHabitId, setHabitId] = useState('');
  const dispatch = useDispatch();

  const handleLikePress = (userId, habitId) => {
    const updateHabitInput = {
      userId,
      habitId
    };

    dispatch(updateHabitLikes(updateHabitInput));

    setHabitId(habitId);
  };

  const handleAnimationFinish = () => {
    setHabitId('');
  };

  return (
    <View style={styles.mateHabitWrapper}>
      <ScrollView>
        {followingUserHabits?.length > 0 &&
          followingUserHabits.map((followingUser) => {
            const userId = followingUser.userId;

            return (
              <View
                style={styles.mateLivewrapper}
                key={followingUser.userName}
              >
                <View style={styles.profileImg}>
                  {followingUser.imageUri
                    ? <View style={styles.uriWrapper}>
                        <Image
                          source={{ uri: followingUser.imageUri }}
                          style={styles.profileUriImg}
                        />
                      </View>
                    : <EvilIcons
                        name={NAMES.USER_ICON}
                        size={SIZES.USER_ICON}
                        color={COLORS.BLACK}
                        style={styles.img}
                      />}
                  <Text style={styles.name}>
                    {followingUser.userName}
                  </Text>
                </View>
                <ScrollView horizontal={true}>
                  {followingUser.habits.length > 0 &&
                    followingUser.habits.map((habitData) => {
                      const habitIcon = pickIconByType(habitData.habitType);

                      return (
                        <TouchableOpacity
                          onPress={() => handleLikePress(userId, habitData._id)}
                          key={habitData._id}
                        >
                          <View style={styles.habitWrapper}>
                            <View style={styles.statusTextWrapper}>
                              <Text style={styles.statusText}>
                                {habitData.habitType}
                              </Text>
                            </View>
                            {(likeHabitId === habitData._id) &&
                              <Like onFinish={handleAnimationFinish} />}
                            <View style={styles.habitIcon}>
                              {habitIcon}
                            </View>
                            <Text style={styles.startTimeText}>
                              {STRINGS.BITS}
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                </ScrollView>
              </View>
            );
          })}
      </ScrollView>
    </View>
  );
};

export default MateHabit;
