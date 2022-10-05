import React from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function Photo({
  item,
  selectPhoto,
  selectedList
}) {
  return (
    <TouchableOpacity
      style={styles.photoBox}
      onPress={(e) => selectPhoto(e, item)}
    >
      {
        selectedList.length > 0 &&
        selectedList.map((el, i) => {
          if (el.uri === item.uri) {
            return (
              <View
                style={styles.photoDim}
                key={i}
              >
                <Text style={styles.photoDimNumber}>
                  {i + 1}
                </Text>
              </View>
            );
          }
        })
      }
      <Image
        source={{ uri: item.uri }}
        style={styles.photoItem}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  photoBox: {
    margin: 1,
    flex: 1,
    aspectRatio: 1,
    backgroundColor: '#474F59'
  },
  photoDim: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.6)',
    zIndex: 100
  },
  photoDimNumber: {
    width: 20,
    height: 20,
    margin: 5,
    borderRadius: 100,
    textAlign: 'center',
    backgroundColor: '#D9737B',
    fontWeight: '500',
    fontSize: 13
  },
  photoItem: {
    flex: 1,
    aspectRatio: 1
  }
});
