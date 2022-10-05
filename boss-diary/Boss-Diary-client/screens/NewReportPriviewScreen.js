import React, { useState, useRef } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import { captureRef } from 'react-native-view-shot';
import {
  ImageBackground,
  Alert,
  Button,
  StyleSheet
} from 'react-native';
import {
  Container,
  View,
  Fab,
  Icon,
  Text
} from 'native-base';
import BottomButton from '../components/BottomButton';
import { getToday } from '../utils';
import Colors from '../constants/Colors';
import { fontFamilyList, fontName, fontSizeList } from '../constants/Fonts';

export default function NewReportInputScreen(props) {
  const [ isActive, setIsActive ] = useState(false);
  const [ fontSize, setFontSize ] = useState(20);
  const [ fontFamily, setFontFamily ] = useState('myeongjo');

  const { navigation } = props;
  const { onReportSubmit, userData } = props.screenProps;
  const { text, template } = props.navigation.state.params;

  const screen = useRef(null);

  const _resetAction = StackActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: 'NewReport' })],
  });

  const _alert = () => {
    return (
      Alert.alert(
        '보고서 제출',
        `${template.name}를 제출 하시겠습니까?`,
        [
          {
            text: '제출',
            onPress: _submit
          },
          {
            text: '취소',
            style: 'destructive',
          },
        ]
      )
    );
  };

  const _moveToReportScreen = () => {
    navigation.dispatch(_resetAction);
    navigation.navigate('ReportsStack');
  };

  const _moveToNewReportScreen = () => {
    navigation.navigate('NewReport');
  };

  const _submit = async() => {
    const data = await captureRef(screen, {
      format: 'jpg',
      quality: 0.8,
    });

    const photo = {
      uri: data,
      name: 'new-photo.jpg',
      type: 'multipart/form-data',
    };

    await onReportSubmit(template.name, text, photo, template._id);

    Alert.alert(
      `${template.name} 제출 완료`,
      '상여금이 지급되었습니다',
      [
        {
          text: '보고서 페이지 이동',
          onPress: _moveToReportScreen
        },
        {
          text: '새로운 보고서 작성',
          onPress: _moveToNewReportScreen
        }
      ]
    );
  };

  return (
    <Container>
      <ImageBackground
        style={styles.container}
        source={{ uri: template.url }}
        ref={screen}
      >
        <View style={[styles.date, { fontFamily: fontFamily }]}>
          <Text style={styles.text}>
            {getToday}
          </Text>
        </View>
        <View style={styles.createdBy}>
          <Text style={styles.text}>
            {userData.name}
          </Text>
        </View>
        <View style={styles.textContainer}>
          <Text
            style={{ fontFamily: fontFamily, fontSize: fontSize }}
          >
            {text}
          </Text>
        </View>
      </ImageBackground>
      <View style={styles.fabConatiner}>
        <Fab
          active={isActive}
          direction='up'
          style={styles.mainFab}
          position='bottomRight'
          onPress={() => setIsActive(!isActive)}
        >
          <Icon name='ios-color-wand' />
          {fontFamilyList.map((font, i) => (
            <Button
              style={styles.fontButton}
              key={font}
              onPress={() => setFontFamily(font)}
            >
              <Text style={[styles.fontBase, { fontFamily: font }]}>
                {fontName[i]}
              </Text>
            </Button>
          ))}
          {fontSizeList.map(size => (
            <Button
              style={styles.sizeButton}
              key={size}
              onPress={() => setFontSize(size)}
            >
              <Text style={styles.fontBase}>{size}</Text>
            </Button>
          ))}
        </Fab>
      </View>
      <View style={styles.bottom}>
        <BottomButton title='저장하기' onPress={_alert} />
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    resizeMode: 'cover'
  },
  date: {
    marginTop: 170,
    marginLeft: 50
  },
  createdBy: {
    marginTop: 10,
    marginLeft: 50
  },
  text: {
    fontSize: 12,
    fontFamily: 'batang'
  },
  textContainer: {
    height: 300,
    marginTop: 50,
    marginLeft: 50,
    marginRight: 50
  },
  mainFab: {
    backgroundColor: Colors.deepGray
  },
  sizeButton: {
    backgroundColor: Colors.deepGreen
  },
  fontButton: {
    backgroundColor: Colors.darkGray
  },
  fontBase: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 12
  },
  bottom: {
    justifyContent: 'flex-end',
    marginBottom: 15
  }
});
