import React from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { updateImageUri } from '../../../featrues/userSlice';
import { EvilIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import {
  NAMES,
  NUMBERS,
  SIZES,
  COLORS,
  STRINGS,
  ASPECT
} from '../../../constants/index';

import styles from './styles';

const ProfileStatus = ({
  imageUri,
  userInfo,
  handleActingPress,
  handleCompletePress,
  handleCalendarPress
}) => {
  const dispatch = useDispatch();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [...ASPECT],
      quality: NUMBERS.QUALITY,
    });

    if (!result.cancelled) {
      const imageUriPayload = {
        uri: result.uri
      };

      dispatch(updateImageUri(imageUriPayload));
    }
  };

  return (
    <View style={styles.profileTopWrapper}>
      <TouchableOpacity
        onPress={pickImage}
        style={styles.profileImgWrapper}
      >
        {imageUri
          ? <Image
              source={{ uri: imageUri }}
              style={styles.profileImg}
            />
          : <EvilIcons
              name={NAMES.USER_ICON}
              size={SIZES.PROFILE_USER_ICON}
              color={COLORS.BLACK}
              style={styles.img}
            />}
      </TouchableOpacity>
      <View style={styles.actMateWrapper}>
        <View style={styles.actWrapper}>
          <Text style={styles.actText}>Act</Text>
          <Text style={styles.actCountText}>
            {userInfo.habits.length > 0
              ? userInfo.habits.length
              : 0}
          </Text>
        </View>
        <View style={styles.mateWrapper}>
          <Text style={styles.mateText}>Mate</Text>
          <Text style={styles.mateCountText}>
            {userInfo.following.length > 0
              ? userInfo.following.length
              : 0}
          </Text>
        </View>
      </View>
      <View style={styles.doneStatusWrapper}>
        <TouchableOpacity>
          <Text
            style={styles.statusText}
            onPress={handleActingPress}
          >
            {STRINGS.PROGRESSING}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.statusText}
            onPress={handleCompletePress}
          >
            {STRINGS.COMPLETED}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text
            style={styles.statusText}
            onPress={handleCalendarPress}
          >
            {STRINGS.CALENDAR}
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.divideLine} />
    </View>
  );
};

export default ProfileStatus;
