import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Camera from '../screens/Camera';
import Preview from '../screens/Preview';
import PostForm from '../screens/PostForm';

const PostStack = createStackNavigator();

export default function PostNavigator() {
  const navigation = useNavigation();

  function handlePressCancelButton() {
    navigation.reset({
      index: 0,
      routes: [{ name: '피드' }],
    });
  }

  return (
    <>
      <PostStack.Navigator>
        <PostStack.Screen
          name="PostForm"
          component={PostForm}
          options={{
            title: "분양글 작성",
            headerRight: () => (
              <Button
                title="취소"
                onPress={handlePressCancelButton}
              />
            )
          }}
        />
        <PostStack.Screen
          name="Camera"
          component={Camera}
          options={{
            title: "카메라"
          }}
        />
        <PostStack.Screen
          name="Preview"
          component={Preview}
          options={{
            title: "미리보기"
          }}
        />
      </PostStack.Navigator>
    </>
  );
}
