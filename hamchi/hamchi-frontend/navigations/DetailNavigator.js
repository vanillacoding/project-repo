import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Hamster from '../screens/Hamster';
import SubmissionForm from '../screens/SubmissionForm';
import Camera from '../screens/Camera';
import Preview from '../screens/Preview';

const DetailStack = createStackNavigator();

export default function DetailNavigator() {
  return (
    <>
      <DetailStack.Navigator>
        <DetailStack.Screen
          name="Hamster"
          component={Hamster}
          options={{
            title: "분양 정보"
          }}
        />
        <DetailStack.Screen
          name="SubmissionForm"
          component={SubmissionForm}
          options={{
            title: "입양 신청서"
          }}
        />
        <DetailStack.Screen
          name="Camera"
          component={Camera}
          options={{
            title: "카메라"
          }}
        />
        <DetailStack.Screen
          name="Preview"
          component={Preview}
          options={{
            title: "미리보기"
          }}
        />
      </DetailStack.Navigator>
    </>
  );
}
