import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'native-base';
import BackButton from '../components/BackButton';

const CustomHeader = ({ navigation, isFounder, setIsModifying, sendDeleteRequest }) => {
  return (
    <View style={styles.header}>
      <View style={styles.left}>
        <BackButton navigation={navigation}/>
      </View>
      <View style={styles.right}>
      {isFounder && (
        <View style={{ flexDirection: 'row' }}>
          <View style={styles.buttonBox}>
            <Button
              style={styles.button}
              rounded
              onPress={() => setIsModifying(true)}>
              <Text style={styles.text}>수정</Text>
            </Button>
          </View>
          <View style={styles.buttonBox}>
            <Button
              style={styles.button}
              rounded
              onPress={sendDeleteRequest}>
              <Text style={styles.text}>삭제</Text>
            </Button>
          </View>
        </View>
      )}
      </View>  
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
    height: 70,
    paddingTop: 14,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  left: {
    width: '50%',
    padding: 10,
  },
  right: {
    flex: 1,
    width: '50%',
    padding: 10,
  },
  headerTitle: {
    color: 'black',
    fontSize: 18,
    marginLeft: 80
  },
  buttonBox: {
    width: '40%',
    marginLeft: 20,
  },
  button: {
    justifyContent: 'center',
    backgroundColor: '#C64242',
  },
  text: {
    color: 'white',
  }
});

export default CustomHeader;
