import React from 'react';
import { StyleSheet, View, Button } from 'react-native';

const LogInScreen = ({ fetchFacebookData }) => {
  return (
    <View style={styles.container}>
      <Button 
         title="Facebook login"
         onPress={fetchFacebookData}     
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

export default LogInScreen;
