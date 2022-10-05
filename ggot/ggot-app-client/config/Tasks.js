import { AppState } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as TaskManger from 'expo-task-manager';
import * as Location from 'expo-location';

import { getDistanceFromLatLngInMeter } from '../utils/api';
import { LOCATION_TRACKING, LOGIN_DATA } from '../constants/index';
import { schedulePushNotification} from './Notification';

const Tasks = () => {
  TaskManger.defineTask(LOCATION_TRACKING, async ({ data, error }) => {
    let userPhotoList;

    if (AppState.currentState !== 'background') return;

    if (error) return console.warn('background tracking error');

    if (data) {
      const loginData = await AsyncStorage.getItem(LOGIN_DATA);

      if (loginData) {
        const { locations } = data;

        let lat = locations[0].coords.latitude;
        let lng = locations[0].coords.longitude;

        userPhotoList = JSON.parse(loginData).USER.photos;

        userPhotoList.forEach(item => {
          (async function () {
            const distance = getDistanceFromLatLngInMeter(lat, lng, item.location[0], item.location[1]);

            if (distance < 10) {
              await schedulePushNotification();
              Location.stopLocationUpdatesAsync(LOCATION_TRACKING);
            }
          })();
        });
      }
    }
  });
};

export default Tasks;
