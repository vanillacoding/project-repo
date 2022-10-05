import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

export default function SelectedPhoto({ item, deSelectPhoto }) {
  return (
    <View style={styles.selectedPhotoBox}>
      <TouchableOpacity
        style={styles.selectedPhotoContainer}
        onPress={e => deSelectPhoto(e, item)}
      >
        <MaterialIcons
          name='close'
          size={17}
          color='white'
          style={styles.deselectButton}
        />
      </TouchableOpacity>
      <Image
        source={{ uri: item.uri }}
        style={styles.selectedPhotoItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  selectedPhotoContainer: {
    padding: 3,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'flex-end',
    zIndex: 100
  },
  selectedPhotoBox: {
    flex: 1,
    padding: 1,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  selectedPhotoItem: {
    borderRadius: 5,
    flex: 0.8,
    aspectRatio: 1
  },
  deselectButton: {
    borderRadius: 100,
    backgroundColor: 'rgba(0,0,0,0.7)'
  }
});
