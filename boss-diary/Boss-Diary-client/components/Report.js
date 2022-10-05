import React from 'react';
import { ImageBackground, Image, StyleSheet } from 'react-native';
import {
  Container,
  Card,
  CardItem,
  Text,
  Button,
  Icon,
  Left,
} from 'native-base';
import { Asset } from 'expo-asset';
import CardHeader from './CardHeader';
import Colors from '../constants/Colors';
import _ from 'lodash';

export default function Report(props) {
  const approved = Asset.fromModule(require('../assets/images/approved.png')).uri;
  const {
    buttonText,
    profilePhoto,
    report,
    openModal,
    onSaveClick,
    onDeleteClick,
    onClick,
    isApprovalPage
  } = props;

  const { title, created_at: createdAt, url, approvals } = report;
  const allApprovals = approvals.map(report => report.approved);
  const isApproved = _.includes(allApprovals, true);

  const _clickButton = () => {
    if (openModal) {
      openModal();
    }
    onClick();
  };

  return (
    <Container style={styles.container}>
      <Card style={styles.cardContainer}>
        <CardHeader
          photo={profilePhoto}
          title={title}
          note={createdAt}
        />
        <CardItem cardBody style={styles.cardBody}>
          <ImageBackground source={{ uri: url }} style={styles.image}>
            {isApproved && <Image source={{ uri: approved }} style={styles.approved} />}
          </ImageBackground>
        </CardItem>
        <CardItem>
          <Left>
            <Button transparent onPress={_clickButton}>
              <Text style={styles.icon}>{buttonText}</Text>
            </Button>
          </Left>
          {!isApprovalPage &&
            <>
              <Button transparent onPress={onSaveClick}>
                <Icon active name='ios-download' style={styles.icon} />
              </Button>
              <Button transparent onPress={onDeleteClick}>
                <Icon active name='ios-trash' style={styles.icon} />
              </Button>
            </>
          }
        </CardItem>
      </Card>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 650
  },
  cardContainer: {
    borderWidth: 1
  },
  cardBody: {
    height: 500
  },
  image: {
    flex: 1,
    height: 500,
    width: null
  },
  approved: {
    position: 'absolute',
    right: 10,
    bottom: 0,
    width: 140,
    height: 100,
    resizeMode: 'contain'
  },
  icon: {
    color: Colors.darkGray
  },
  modal: {
    height: 300,
    backgroundColor: Colors.white
  },
  emailBox: {
    width: 300,
    height: 100,
    alignSelf: 'center',
    marginTop: 40,
  }
});
