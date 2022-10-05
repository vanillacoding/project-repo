import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Profile = ({ name }) => {
  return (
    <View style={styles.profileBox}>
      <Text style={styles.profileText}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileBox: {
    padding: 10,
  },
  profileText: {
    textAlign: 'center', 
    fontSize: 20,
  },
});

export default Profile;
