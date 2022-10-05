import React from 'react';
import { Text } from 'react-native';
import { Marker, Callout } from 'react-native-maps';

export default function ChatMarkers({
  latitude,
  longitude,
  chatTitle,
  chatId,
  navigation
}) {
  const handleMarkerClick = () => {
    navigation.navigate('chat', { chatTitle, chatId });
  };

  return (
    <Marker coordinate={{ latitude, longitude }}>
      <Callout onPress={handleMarkerClick}>
        <Text>{chatTitle}</Text>
      </Callout>
    </Marker>
  );
}
