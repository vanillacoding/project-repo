import React from 'react';
import {
  CardItem,
  Thumbnail,
  Text,
  Left,
  Body,
} from 'native-base';
import { getDetailDate } from '../utils';

export default function CardHeader(props) {
  const { photo, title, note } = props;

  return (
    <CardItem>
      <Left>
        <Thumbnail source={{ uri: photo }} />
        <Body>
          <Text>{title}</Text>
          {note && <Text note>{getDetailDate(note)}</Text>}
        </Body>
      </Left>
    </CardItem>
  );
}
