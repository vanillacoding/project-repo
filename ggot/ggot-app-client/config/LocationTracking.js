import * as Location from 'expo-location';

import { LOCATION_TRACKING } from '../constants/index';

export const startLocationTracking = async () => {
  await Location.startLocationUpdatesAsync(LOCATION_TRACKING, {
    accuracy: Location.Accuracy.Highest,
      timeInterval: 1000,
      distanceInterval: 0,
      foregroundService: {
        notificationTitle: '꽂',
        notificationColor: 'black'
      }
  });
};
