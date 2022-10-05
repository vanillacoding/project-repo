import React from 'react';
import { StyleSheet } from 'react-native';
import { Container, View, Text, Icon } from 'native-base';
import Colors from '../constants/Colors';

export default function EmptyScreen(props) {
  return (
    <Container style={styles.container}>
      <View style={styles.content}>
        <Icon
          name='ios-information-circle-outline'
          style={styles.icon}
        />
        <Text>{props.message}</Text>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: Colors.ultraLightGray
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  icon: {
    fontSize: 35,
    marginBottom: 20
  }
});
