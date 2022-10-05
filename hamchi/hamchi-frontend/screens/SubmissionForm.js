import React from 'react';
import {
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  TouchableOpacity,
  Keyboard,
  View,
  Text,
  Image,
  StyleSheet
} from 'react-native';
import {
  KeyboardAwareScrollView
} from 'react-native-keyboard-aware-scroll-view';
import Form from '../components/shared/Form';
import { Feather } from '@expo/vector-icons';
import colors from '../theme/color';

import mapEnumToString from '../constants/mapEnumToString';
import submissionAPI from '../api/submissions';

const SubmissionForm = ({ route, navigation }) => {
  let photo;
  const postId = route.params.postId;

  if (route.params) {
    photo = route.params.photo;
  }

  function handlePress() {
    photo = null;
    navigation.navigate('Camera', { redirectTo: 'SubmissionForm' });
  }

  function handleAfterSubmit() {
    photo = null;
    navigation.navigate('신청현황', { screen: '내 신청서' });
  }
  return (
    <KeyboardAvoidingView
      behavior="padding"
      style={{ flex: 1 }}
      enabled
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAwareScrollView>
          {photo ?
            <View>
              <Image
                style={styles.stretch}
                source={{ uri: photo.uri }} />
            </View>
            : <TouchableOpacity
              style={styles.container}
              onPress={handlePress}
            >
              <Feather name="camera" size={160} color={colors.bold} />
              <Text style={styles.text}>미리 준비해두신 햄스터 사육 환경을 촬영해주세요!</Text>
            </TouchableOpacity>
          }

          <Form
            additionalParams={{ photo, postId }}
            fields={{
              experience: {
                label: '햄스터 사육 경험',
                inputType: 'radio',
                options: ['none', 'one', 'many'],
                map: mapEnumToString.experienceType
              },
              location: {
                label: '지역',
                inputProps: {
                  placeholder: '지역을 입력해주세요'
                }
              },
              details: {
                label: '기타',
                inputProps: {
                  placeholder: '기타 참고사항을 입력해주세요',
                  multiline: true,
                  customInputStyle: { height: 100 }
                }
              },
            }}
            action={submissionAPI.requestCreateSubmission}
            afterSubmit={handleAfterSubmit}
          />
        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.outline,
    width: '100%',
    height: 300,
    marginBottom: 30,
  },
  stretch: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: 20
  },
  text: {
    fontSize: 16,
    alignSelf: 'center',
    color: colors.bold
  },
});

export default SubmissionForm;
