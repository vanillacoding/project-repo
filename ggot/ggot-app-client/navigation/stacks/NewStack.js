import React from 'react';
import { useSelector } from 'react-redux';
import { createStackNavigator } from '@react-navigation/stack';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity
} from 'react-native';

import NewPhoto from '../../screens/NewPhoto';
import Gallery from '../../screens/Gallery';
import Location from '../../screens/Location';

const NewStack = createStackNavigator();

export default function NewStackNavigation() {
  const userMarkedLocation = useSelector(state => state.user.coords);
  const selectedPhotoList = useSelector(state => state.selectedPhotos.selectedList);

  return (
    <NewStack.Navigator
      screenOptions={{
        headerLeft: false
      }}
    >
      <NewStack.Screen
        name='Gallery'
        component={Gallery}
        options={({ navigation }) => ({
          headerRight: () => (
            <View style={styles.nextButtonContainer}>
              <Text style={styles.photoCount}>
                {
                  `(${selectedPhotoList.length} / 5)`
                }
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('NewPhoto', { selectedPhotoList })}
                style={styles.gelleryNextButton}
              >
                <Text style={{ color: '#2699FB' }}>
                  {
                    selectedPhotoList.length ? '다음' : ''
                  }
                </Text>
              </TouchableOpacity>
            </View>
          ),
          headerStyle: {
            backgroundColor: '#F2F2F0',
          },
          headerTintColor: '#474F59',
          headerTitleStyle: {
            fontWeight: 'bold'
          }
        })}
      />
      <NewStack.Screen
        name='NewPhoto'
        component={NewPhoto}
        options={({ _, navigation }) => ({
          headerTitleAlign: 'center',
          headerLeft: () => (
            <View style={styles.locationNextButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Gallery')}
              >
              <Text>
                뒤로가기
              </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      />
      <NewStack.Screen
        name='Location'
        component={Location}
        options={({ _, navigation }) => ({
          headerRight: () => (
            <View style={styles.locationNextButton}>
              <TouchableOpacity
                onPress={() => navigation.navigate('NewPhoto', { userMarkedLocation })}
              >
              <Text>
                설정
              </Text>
              </TouchableOpacity>
            </View>
          )
        })}
      />
    </NewStack.Navigator>
  );
}

const styles = StyleSheet.create({
  nextButtonContainer: {
    display: 'flex',
    flexDirection: 'row'
  },
  locationNextButton: {
    marginRight: 15
  },
  gelleryNextButton: {
    margin: 15
  },
  photoCount: {
    textAlignVertical: 'center'
  }
});
