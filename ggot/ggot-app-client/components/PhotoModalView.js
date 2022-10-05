import React, { useState } from 'react';
import { AntDesign } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';
import ViewPager from '@react-native-community/viewpager';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function PhotoModalView({
  photoList,
  navigation,
  setIsModalVisible,
  focusedPhotoNumber
}) {
  const [ currentPhotoNumber, setCurrentPhotoNumber ] = useState(0);

  const closingModal = () => setIsModalVisible(false);
  const onChangeCurrentPhotoNumber = e => setCurrentPhotoNumber(e.nativeEvent.position);
  const onChangePhotoMap = () => {
    setIsModalVisible(false);
    navigation.navigate('PhotoMap', {
      photoList,
      focusedPhotoNumber
    });
  };

  return (
    <View
      style={styles.modalDim}
      onPress={closingModal}
    >
      <View style={styles.modalContent}>
        <TouchableOpacity
          style={styles.modalCloseButton}
          onPress={closingModal}
        >
          <AntDesign
            name="closecircleo"
            size={24}
            color='black'
          />
        </TouchableOpacity>
        <ViewPager
          initialPage={0}
          style={styles.modalViewPagerContainer}
          onPageSelected={onChangeCurrentPhotoNumber}
        >
          {
            photoList[focusedPhotoNumber].photo_url_list.map((uri, index) => {
              return (
                <View
                  key={index}
                  style={styles.modalImageBox}
                >
                  <Image
                    style={styles.modalImage}
                    source={{ uri }}
                  />
                </View>
              );
            })
          }
        </ViewPager>
        <View style={styles.modalImageIndicator}>
          {
            photoList[focusedPhotoNumber].photo_url_list.map((_, index) => {
              return (
                <View
                  key={index}
                  style={
                    [
                      styles.indicatorDot,
                      currentPhotoNumber === index
                        ? styles.indicatorDotCurrent
                        : styles.indicatorDot
                    ]
                  }
                />
              );
            })
          }
        </View>
        <View style={styles.modalDescription}>
          <Text>
            {photoList[focusedPhotoNumber].description}
          </Text>
        </View>
        <TouchableOpacity
          style={styles.modalMapViewContainer}
          onPress={onChangePhotoMap}
        >
          <MapView
            style={styles.modalMapView}
            initialRegion={{
              latitude: photoList[focusedPhotoNumber].location[0],
              longitude: photoList[focusedPhotoNumber].location[1],
              latitudeDelta: 0,
              longitudeDelta: 0.005
            }}
            scrollEnabled={false}
          >
            <Marker
              coordinate={{
                latitude: photoList[focusedPhotoNumber].location[0],
                longitude: photoList[focusedPhotoNumber].location[1]
              }}
            />
          </MapView>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalDim: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  modalContent: {
    width: '90%',
    height: '90%',
    backgroundColor: '#F2F2F0',
    borderRadius: 10,
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  modalCloseButton: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 10
  },
  modalViewPagerContainer: {
    flex: 1,
    width: '100%'
  },
  modalImageBox: {
    alignItems: 'center'
  },
  modalImage: {
    width: '100%',
    height: '100%',
    aspectRatio: 1.2
  },
  modalImageIndicator: {
    display: 'flex',
    width: '100%',
    height: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
    paddingBottom: 10
  },
  indicatorDotCurrent: {
    margin: 2,
    width: 8,
    height: 8,
    borderWidth: 0,
    borderRadius: 100,
    marginLeft: 5,
    backgroundColor: '#BF0436'
  },
  indicatorDot: {
    margin: 2,
    width: 8,
    height: 8,
    borderRadius: 100,
    borderWidth: 0.5,
    marginLeft: 5,
    backgroundColor: 'rgba(0,0,0,0)'
  },
  modalDescription: {
    width: '100%',
    height: 100,
    backgroundColor: '#F2F2F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalMapViewContainer: {
    width: '100%',
    height: 100
  },
  modalMapView: {
    width: '100%',
    height: '100%'
  }
});
