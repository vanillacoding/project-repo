import React from 'react';
import { StyleSheet} from 'react-native';
import { CheckBox } from 'native-base';

const Input = (props) => {
  return <CheckBox {...props} style={styles.checkBoxText} />;
};

const styles = StyleSheet.create({
  checkBoxText: {
    marginLeft: 10,
  }
});

export default Input;
