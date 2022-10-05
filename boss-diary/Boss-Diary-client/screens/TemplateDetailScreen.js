import React from 'react';
import {
  ScrollView,
  View,
  Button,
  Image,
  Text,
  Alert,
  StyleSheet
} from 'react-native';
import Color from '../constants/Colors';

export default function SettingsScreen(props) {
  const { navigation } = props;
  const { onTemplateAdd } = props.screenProps;
  const {
    _id: templateId,
    name,
    points,
    url
  } = props.navigation.state.params.template;

  const _onClick = () => {
    Alert.alert('보고서 구입', `${name}를 구입 하시겠습니까?`,
        [
          {
            text: '구입',
            onPress: () => {
              onTemplateAdd(templateId, points);
              Alert.alert('보고서 구입 완료', `${name}를 구입 하였습니다`);
              navigation.navigate('Templates');
            }
          },
          {
            text: '취소',
            onPress: () => navigation.navigate('Templates'),
            style: 'destructive',
          }
        ]
      );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.templateContainer}>
          <Image
            style={styles.templateThum}
            source={{ uri: url }}
          />
          <View>
            <Text style={styles.point}>{points} points</Text>
            <Button
              onPress={_onClick}
              title='구매하기'
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
  },
  spinnerContainer: {
    flex: 1,
    alignContent: 'center',
    alignItems: 'center'
  },
  templatesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  templateContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: -20
  },
  templateThum: {
    width: 400,
    height: 600,
    borderRadius: 10
  },
  point: {
    marginLeft: 10
  }
});
