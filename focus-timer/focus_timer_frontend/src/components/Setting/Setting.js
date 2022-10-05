import React, { useState, useEffect } from 'react';
import { View, Text, Button, Switch, Alert, Linking, TouchableOpacity, SafeAreaView } from 'react-native';
import styles from './Setting.style.ios.js';
import AsyncStorage from '@react-native-community/async-storage';
import * as Calendar from 'expo-calendar';
import { createCalendarAsync } from '../../utils/calendar';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function Setting({ navigation }) {
  const [isCalendarEnabled, setIsCalendarEnabled] = useState(false);
  const [isPlayingInSilent, setIsPlayingInSilent] = useState(false);

  useEffect(() => {
    (async() => {
      const calendarSettings = JSON.parse(await AsyncStorage.getItem('calendar_settings'));
      setIsCalendarEnabled(calendarSettings.is_calendar_enabled);

      const soundSettings = JSON.parse(await AsyncStorage.getItem('sound_settings'));
      setIsPlayingInSilent(soundSettings.is_playing_in_silent);
    })();
  }, []);

  async function toggleCalendarSwitch() {
    const toggledState = !isCalendarEnabled;

    if (toggledState) {
      const calendar_settings = JSON.parse(await AsyncStorage.getItem('calendar_settings'));
      calendarId = calendar_settings.calendar_id;

      const calendarPermission = await Calendar.getCalendarPermissionsAsync()
      if (!(calendarPermission.granted)) {
        const { status } = await Calendar.requestCalendarPermissionsAsync();
        AsyncStorage.mergeItem('calendar_settings', JSON.stringify({
          permission_requested: true
        }));
        if (status !== 'granted') {
          // trigger popup to let user know that
          // calendar permission should be configured manually
          Alert.alert(
            'Calendar Access Required',
            'To use the calendar syncing, please allow us to access Calendars in "Settings" of this device.',
            [
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
              {text: 'Settings', onPress: () => Linking.openSettings()},
            ],
            { cancelable: false }
          );
          return;
        }
      }

      // check if calendar id exists in asyncstorage & if it really exists in the calendar
      const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
      let calendarExists;
      calendars.forEach(calendar => {
        if (calendar.id === calendarId) {calendarExists = true;}
      });
      if (!calendarExists) {
        calendarId = await createCalendarAsync();
        await AsyncStorage.mergeItem(
          'calendar_settings',
          JSON.stringify({calendar_id : calendarId})
        );
      }
    }

    (async() => {
      await AsyncStorage.mergeItem(
        'calendar_settings',
        JSON.stringify({ is_calendar_enabled: toggledState })
      );
    })();
    setIsCalendarEnabled(toggledState);
  }

  async function toggleSilentSwitch() {
    const toggledState = !isPlayingInSilent;
    (async() => {
      await AsyncStorage.mergeItem(
        'sound_settings',
        JSON.stringify({ is_playing_in_silent: toggledState })
      );
    })();
    setIsPlayingInSilent(toggledState);
  }

  return(
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
            style={styles.mainButtonContainer}
          >
            <FontAwesomeIcon icon={ faHome } size={ 50 } />
          </TouchableOpacity>
          <Text style={styles.settingsHeaderText}>Settings</Text>
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.eachSettingContainer}>
            <View style={styles.eachSettingTextContainer}>
              <Text style={styles.eachSettingText}>
                Add events to calendar
              </Text>
            </View>
            <View>
              <Switch
                value={isCalendarEnabled}
                onValueChange={toggleCalendarSwitch}
              />
            </View>
          </View>
          <View style={styles.eachSettingContainer}>
            <View style={styles.eachSettingTextContainer}>
              <Text style={styles.eachSettingText}>
                Play alarm in silent
              </Text>
            </View>
            <View>
              <Switch
                value={isPlayingInSilent}
                onValueChange={toggleSilentSwitch}
              />
            </View>
          </View>
          <View style={styles.eachSettingContainer}>
            <TouchableOpacity
              onPress={() => navigation.navigate('CopyrightNotice')}
            >
              <Text style={styles.eachSettingText}>Copyright Notice</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};
