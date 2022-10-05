import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { RADIUS } from '../constants/constant';
import Modal from '../components/Modal';
import ChatMarkers from '../components/ChatMarkers';

export default function MapScreen({
  myLatitude,
  myLongitude,
  navigation,
  chats,
  isVisible,
  setErrorMessage,
  errorMessage,
  deviceAddress,
  addChat,
  showModal,
  hideModal
}) {
  const handleCreateChatButtonClick = () => {
    showModal();
  };
  // console.log('Map', myLatitude, myLongitude);
  // console.log('Chat', chats);
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isVisible}
        deviceAddress={deviceAddress}
        errorMessage={errorMessage}
        myLatitude={myLatitude}
        myLongitude={myLongitude}
        setErrorMessage={setErrorMessage}
        addChat={addChat}
        hideModal={hideModal}
      />
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.mapStyle}
        zoomTapEnabled={false}
        zoomEnabled={true}
        initialRegion={{
          latitude: myLatitude,
          longitude: myLongitude,
          latitudeDelta: 0.003,
          longitudeDelta: 0.003
        }}>
        <MapView.Circle
          center={{ latitude: myLatitude, longitude: myLongitude }}
          radius={RADIUS}
          strokeWidth={1}
          strokeColor={'#1a66ff'}
          fillColor={'rgba(230,238,255,0.5)'}
        />
        <Marker coordinate={{ latitude: myLatitude, longitude: myLongitude }}>
          <View style={styles.markerView}>
            <Image
              style={styles.marker}
              source={{
                uri:
                  'https://upload.wikimedia.org/wikipedia/commons/thumb/3/35/Location_dot_blue.svg/1200px-Location_dot_blue.svg.png'
              }}
            />
          </View>
        </Marker>
        {chats.map((chat, index) => (
          <ChatMarkers
            key={index}
            latitude={chat.latitude}
            longitude={chat.longitude}
            chatTitle={chat.title}
            chatId={chat._id}
            navigation={navigation}
          />
        ))}
      </MapView>
      <View style={styles.createChatButtonContainer}>
        <TouchableOpacity
          style={styles.createChatButton}
          onPress={handleCreateChatButtonClick}>
          <Text style={styles.createChatButtonText}>채팅방 만들기</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  marker: {
    width: 15,
    height: 15,
    alignItems: 'center'
  },
  markerText: {
    fontSize: 13,
    padding: 4
  },
  chatMarker: {
    width: 17,
    height: 25
  },
  markerView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  createChatButton: {
    width: 200,
    height: 40,
    borderRadius: 5,
    position: 'absolute',
    top: -50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderColor: '#1fcd97'
  },
  createChatButtonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end'
  },
  createChatButtonText: {
    color: '#1fcd97',
    fontWeight: 'bold',
    fontSize: 16
  }
});
