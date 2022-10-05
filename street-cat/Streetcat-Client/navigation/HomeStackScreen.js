import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeContainer from '../containers/HomeContainer';
import CatRegisterContainer from '../containers/CatRegisterContainer';
import CatPageContainer from '../containers/CatPageContainer';
import { Ionicons } from '@expo/vector-icons';
import { COLOR } from '../constants/'

const HomeStack = createStackNavigator();

const HomeStackScreen = ({ navigation }) => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen 
        name="Home" 
        component={HomeContainer} 
        options={{ 
          headerStyle: {
            backgroundColor: COLOR.main,
            elevation: 0,
          },
          title: '',
          headerRight: () => (
            <Ionicons 
              name="md-add-circle" 
              size={50}
              color='black'
              onPress={() => navigation.navigate('냥이등록')}
            />
          ),
          headerLeft: () => (
            <Ionicons
              name="md-list-box" size={50}
              color='black'
              onPress={() => navigation.openDrawer()}
            />
          ),
        }} 
      />
      <HomeStack.Screen name="냥이등록" component={CatRegisterContainer}/>
      <HomeStack.Screen name="Detail" 
        component={CatPageContainer} 
        options= {{ headerShown: false }}
      />
    </HomeStack.Navigator>
  );
};

export default HomeStackScreen;
