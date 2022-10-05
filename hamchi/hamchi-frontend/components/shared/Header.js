import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../../theme/color';

const Header = ({ title, back, submit }) => {
  return (
    <View style={styles.container}>
      {back
        && <Ionicons name='arrow-back-outline' size={30} />
      }
      <Text style={styles.title}>{title}</Text>
      {submit && <Button title={submit} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: colors.outline,
    paddingTop: 20,
    paddingBottom: 8,
  },
  title: {
    fontSize: 20,
  },
  button: {
    paddingTop: 30,
  }
});

export default Header;
