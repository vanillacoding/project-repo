import React, { Fragment } from 'react';
import { Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import PropTypes from 'prop-types';
import CameraMapBox from './CameraMapBox';
import message from '../constants/message';

const { width } = Dimensions.get('window');

export default function CameraMapRow({
  uriList,
  dispatch,
  action,
  location,
  hasPermissionCamera,
  hasPermissionLocation,
  navigation
}) {
  const onCamera = () => {
    if (uriList.length >= 3) return alert(message.maxImg);
    if (!hasPermissionCamera) return alert(message.deniedPermission);
    navigation.navigate('Hide', { screen: 'TakePicture' });
  };

  const onGallery = async() => {
    if (uriList.length >= 3) return alert(message.maxImg);
    if (!hasPermissionCamera) return alert(message.deniedPermission);
    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (pickerResult.cancelled) return;

    const { uri } = pickerResult;
    const resizedPhoto = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width } }],
      { compress: 0, format: ImageManipulator.SaveFormat.PNG }
    );
    dispatch(action(resizedPhoto.uri));
  };

  const onMap = () => {
    if (location.latitude) {
      if (!hasPermissionLocation) return alert(message.deniedPermission);
      navigation.navigate('ShowMap', { location });
    }
  };

  const types = [
    { title: 'Camera', onPress: onCamera },
    { title: 'Gallery', onPress: onGallery },
    { title: 'Map', onPress: onMap },
  ];

  return (
    <Fragment>
      {types.map((type, index) => {
        return (<CameraMapBox
          testID={type.title}
          key={index}
          type={type.title}
          onPress={type.onPress}
        />);
      })}
    </Fragment>
  );
}

CameraMapRow.propTypes = {
  uriList: PropTypes.array.isRequired,
  dispatch: PropTypes.func.isRequired,
  action: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired,
  hasPermissionCamera: PropTypes.bool.isRequired,
  hasPermissionLocation: PropTypes.bool.isRequired,
};
