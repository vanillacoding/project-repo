import React from 'react';
import { ActivityIndicator, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size='large' />
    </View>
  );
};

const styles = {
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
};

export default Loading;
