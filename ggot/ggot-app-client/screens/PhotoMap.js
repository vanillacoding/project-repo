import React, { useState, useRef } from 'react';
import { Marker } from 'react-native-maps';
import { AntDesign } from '@expo/vector-icons';
import MapView from 'react-native-map-clustering';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Text
} from 'react-native';

export default function PhotoMap({ route }) {
  const { photoList, focusedPhotoNumber } = route.params;
  const [ isModalVisible, setIsModalVisible ] = useState(false);
  const [ focusedNumber, setFocusedNumber ] = useState(focusedPhotoNumber);
  const mapRef = useRef();

  const closingModal = () => setIsModalVisible(false);
  const changePhotoFocus = direction => {
    if (direction === 'right') {
      if (focusedNumber < photoList.length -1) {
        mapRef.current.animateToRegion({
          latitude: photoList[focusedNumber + 1].location[0],
          longitude: photoList[focusedNumber + 1].location[1],
          latitudeDelta: 0,
          longitudeDelta: 0.001
        });

        setFocusedNumber(focusedNumber + 1);
      }
    } else if (direction === 'left') {
      if (focusedNumber > 0) {
        mapRef.current.animateToRegion({
          latitude: photoList[focusedNumber - 1].location[0],
          longitude: photoList[focusedNumber - 1].location[1],
          latitudeDelta: 0,
          longitudeDelta: 0.001
        });

        setFocusedNumber(focusedNumber - 1);
      }
    }
  };

  return (
    <View style={styles.mapContainer}>
      <MapView
        ref={mapRef}
        style={styles.mapView}
        initialRegion={{
          latitude: photoList[focusedNumber].location[0],
          longitude: photoList[focusedNumber].location[1],
          latitudeDelta: 0,
          longitudeDelta: 0.005
        }}
        clusterColor='#BF0436'
      >
        {
          photoList.map((item, index) => {
            return (
              <Marker
                style={styles.mapMarker}
                key={item.published_at + item.photo_url_list[0]}
                coordinate={{
                  latitude: item.location[0],
                  longitude: item.location[1]
                }}
                pinColor='#BF0436'
                onPress={() => setFocusedNumber(index)}
              >
                {
                  index === focusedNumber &&
                  <View style={styles.markerDim}>
                    <Image
                      style={styles.markerPhoto}
                      source={{uri: photoList[focusedNumber].photo_url_list[0]}}
                    />
                  </View>
                }
              </Marker>
            );
          })
        }
      </MapView>
      <View style={styles.PhotoMapindicator}>
        <TouchableOpacity onPress={() => changePhotoFocus('left')}>
          <Image
            style={styles.beforePhoto}
            source={
              focusedNumber
                ? {uri: photoList[focusedNumber - 1].photo_url_list[0]}
                : {uri: '#'}
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Image
            style={styles.currentPhoto}
            source={{uri: photoList[focusedNumber].photo_url_list[0]}}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => changePhotoFocus('right')}>
          <Image
            style={styles.afterPhoto}
            source={
              focusedNumber < photoList.length -1
                ? {uri: photoList[focusedNumber + 1].photo_url_list[0]}
                : {uri: '#'}
            }
          />
        </TouchableOpacity>
      </View>
      <Modal
        animationType='slide'
        transparent={true}
        visible={isModalVisible}
      >
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
            <View style={styles.modalImageBox}>
              <Image
                style={styles.modalImage}
                source={{ uri: photoList[focusedNumber].photo_url_list[0] }}
              />
            </View>
            <View style={styles.modalDescription}>
              <Text>
                {photoList[focusedNumber].description}
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  mapContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'red'
  },
  mapMarker: {
    zIndex: 90
  },
  mapView: {
    flex: 1,
    height: '100%'
  },
  PhotoMapindicator: {
    display: 'flex',
    flexDirection: 'row',
    position: 'absolute',
    top: '75%',
    left: 0,
    right: 0,
    bottom: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  currentPhoto: {
    width: 100,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BF0436',
    margin: 10
  },
  beforePhoto: {
    width: 60,
    height: 60,
    borderRadius: 10,
    opacity: 0.5,
    borderWidth: 1,
    borderColor: '#BF0436'
  },
  afterPhoto: {
    width: 60,
    height: 60,
    borderRadius: 10,
    opacity: 0.5,
    borderWidth: 1,
    borderColor: '#BF0436'
  },
  markerPhoto: {
    width: 50,
    height: 50,
    borderRadius: 100
  },
  markerDim: {
    width: 53,
    height: 52,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    zIndex: 100
  },
  modalDim: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)'
  },
  modalContent: {
    width: '90%',
    height: '65%',
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
  modalImageBox: {
    alignItems: 'center'
  },
  modalImage: {
    width: '100%',
    aspectRatio: 1
  },
  modalDescription: {
    width: '100%',
    height: 100,
    backgroundColor: '#F2F2F0',
    justifyContent: 'center',
    alignItems: 'center'
  },
});
