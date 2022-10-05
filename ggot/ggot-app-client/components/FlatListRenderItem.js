import React from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import Photo from './Photo';
import SelectedPhoto from './SelectedPhoto';

export const renderHomeFlatListItem = (index, item, setIsModalVisible, setFocusedPhotoNumber) => {
  return (
    <View style={styles.homePhotoContainer}>
      <TouchableOpacity
        style={styles.homePhotoTouchContainer}
        onPress={() => {
          setIsModalVisible(true);
          setFocusedPhotoNumber(index);
        }}
      >
        <Image
          style={styles.homePhoto}
          source={{ uri: item.photo_url_list[0] }}
        />
      </TouchableOpacity>
    </View>
  );
};

export const renderGalleryPhotoFlatListItem = (selectedList, item, selectPhoto) => {
  return (
    <Photo
      item={item}
      selectedList={selectedList}
      selectPhoto={selectPhoto}
    />
  );
};

export const renderGallerySelectedPhotoFlatListItem = (item, deSelectPhoto) => {
  return (
    <SelectedPhoto
      item={item}
      deSelectPhoto={deSelectPhoto}
    />
  );
};

const styles = StyleSheet.create({
  homePhotoContainer: {
    flex: 1,
    aspectRatio: 1,
    padding: 1
  },
  homePhotoTouchContainer: {
    width: '100%',
    height: '100%'
  },
  homePhoto: {
    width: '100%',
    height: '100%',
    flex: 1
  }
});
