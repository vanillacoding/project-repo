import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ChatList from '../screens/ChatList';
import ChatRoom from '../screens/ChatRoom';

const ChatStack = createStackNavigator();

export default function ChatNavigator() {
  return (
    <>
      <ChatStack.Navigator>
        <ChatStack.Screen
          name="ChatList"
          component={ChatList}
          options={{
            title: "메시지"
          }}
        />
        <ChatStack.Screen
          name="ChatRoom"
          component={ChatRoom}
          options={({ route }) => ({
            title: route.params.name
          })}
        />
      </ChatStack.Navigator>
    </>
  );
}
