import * as Calendar from 'expo-calendar';
import AsyncStorage from '@react-native-community/async-storage';

export async function createCalendarAsync() {
  const defaultCalendarSource =
  Platform.OS === 'ios'
    ? (await Calendar.getDefaultCalendarAsync()).source
    : { isLocalAccount: true, name: 'Expo Calendar' };
  
  const newCalendarId = await Calendar.createCalendarAsync({
    title: 'Focus Timer Calendar',
    color: 'Blue',
    entityType: Calendar.EntityTypes.EVENT,
    sourceId: defaultCalendarSource.id,
    source: defaultCalendarSource,
    name: 'internalCalendarName',
    ownerAccount: 'personal',
    accessLevel: Calendar.CalendarAccessLevel.OWNER,
  });
  await AsyncStorage.mergeItem(
    'calendar_settings',
    JSON.stringify({ calendar_id: newCalendarId })
  );
  return newCalendarId
};
