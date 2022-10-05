import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Icon } from 'native-base';

const LogOutButton = ({ proceedLogout }) => {
  return (
    <View style={styles.container}>
      <Icon
        size={40}
        name="md-log-out"
        onPress={proceedLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LogOutButton;
