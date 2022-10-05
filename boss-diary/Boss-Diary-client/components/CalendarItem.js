import React from 'react';
import { StyleSheet } from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Text,
  Body
} from 'native-base';

export default function CalendarItem(props) {
  const { item } = props;

  return (
    <Container style={styles.container}>
      <Card transparent>
        <CardItem header>
          <Text>{item.title}</Text>
        </CardItem>
        <CardItem button>
          <Body>
            <Text>{item.body}</Text>
          </Body>
        </CardItem>
        <CardItem>
          <Text>{item.time}</Text>
        </CardItem>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignSelf: 'flex-end',
    width: 300,
    height: 150,
    marginTop: 15,
    marginRight: 15,
    marginBottom: 10
  }
});
