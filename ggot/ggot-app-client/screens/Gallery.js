import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as MediaLibrary from 'expo-media-library';
import {
  View,
  FlatList,
  StyleSheet,
  SafeAreaView
} from 'react-native';

import { countPhoto, deCountPhoto } from '../actions/index';
import { ALERT_NUMBER_OF_POSSIBLE_IMAGE_UPLOADS } from '../constants/index';
import {
  renderGalleryPhotoFlatListItem,
  renderGallerySelectedPhotoFlatListItem
} from '../components/FlatListRenderItem';

export default function Gallery() {
  const [ photosInUserGallery, setPhotosInUserGallery ] = useState(null);
  const [ mediaLibaryCurrentPage, setMediaLibaryCurrentPage ] = useState('');

  const dispatch = useDispatch();

  const selectedList = useSelector(state => state.selectedPhotos.selectedList);

  const deSelectPhoto = (_, item) => {
    const filteredSelectedList = selectedList.filter(el => el.uri !== item.uri);

    return dispatch(deCountPhoto(filteredSelectedList));
  };
  const selectPhoto = (_, item) => {
    if (selectedList.filter(el => el.uri === item.uri).length) return deSelectPhoto(_, item);
    if (selectedList.length >= 5) return alert(ALERT_NUMBER_OF_POSSIBLE_IMAGE_UPLOADS);

    return dispatch(countPhoto([ ...selectedList, item ]));
  };
  const getPhotos = async () => {
    try {
      const { assets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
        first: 18,
        sortBy: MediaLibrary.SortBy.creationTime,
      });

      if (hasNextPage) {
        setMediaLibaryCurrentPage(endCursor);
      }

      setPhotosInUserGallery(assets);
    } catch (err) {
      console.warn(err);
    }
  };
  const getNextPagePhotos = async () => {
    try {
      const { assets, endCursor, hasNextPage } = await MediaLibrary.getAssetsAsync({
        first: 18,
        after: mediaLibaryCurrentPage,
        sortBy: MediaLibrary.SortBy.creationTime,
      });

      if (hasNextPage) {
        setMediaLibaryCurrentPage(endCursor);
      }

      const newGalleryList = photosInUserGallery.concat(assets);

      setPhotosInUserGallery(newGalleryList);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    getPhotos();
  }, []);

  return (
    <View style={styles.container}>
      {
        selectedList.length > 0 &&
        <View style={styles.selectedImageBox}>
          <FlatList
            style={styles.selectedList}
            data={selectedList}
            renderItem={({ item }) => renderGallerySelectedPhotoFlatListItem(item, deSelectPhoto)}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      }
      <SafeAreaView style={styles.photoListContainer}>
        <FlatList
          data={photosInUserGallery}
          renderItem={({ item }) => renderGalleryPhotoFlatListItem(selectedList, item, selectPhoto)}
          keyExtractor={item => item.uri}
          numColumns={3}
          showsVerticalScrollIndicator={false}
          onEndReached={() => {
            getNextPagePhotos();
          }}
          onEndReachedThreshold={0.5}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F2F2F0',
    flex: 1
  },
  photoListContainer: {
    padding: 1,
    flex: 1,
    flexDirection: 'row'
  },
  selectedList: {
    width: 'auto'
  },
  selectedImageBox: {
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: 80,
    backgroundColor: '#F2F2F0'
  }
});
