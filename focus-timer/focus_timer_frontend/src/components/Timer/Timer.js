import React, { useState, useEffect } from 'react';
import { View, Button, Text, Vibration, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';
const momentDurationFormatSetup = require("moment-duration-format");
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import { activateKeepAwake, deactivateKeepAwake } from 'expo-keep-awake';
import styles from './Timer.style.ios.js';
import * as Calendar from 'expo-calendar';
import { createCalendarAsync } from '../../utils/calendar';
import { getIsoDate } from '../../utils/dates';
import 'react-native-get-random-values';
import { v4 as uuidv4 } from 'uuid';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faInfinity, faBell, faPauseCircle, faStopCircle, faStop, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { Audio } from 'expo-av';
import { TIMER_STATUS_TYPES as STATUS_TYPES} from '../../constants/stateTypes.js';

export default function Timer({ route, navigation }) {
  const { title } = route.params;
  let tags = route.params.tags || [];
  const secondsTotal = 3600 * route.params.hours + 60 * route.params.minutes;
  const [secondsLeft, setSecondsLeft] = useState(secondsTotal);
  const [status, setStatus] = useState(STATUS_TYPES.ACTIVE);
  const [endTime, setEndTime] = useState(0);
  const [isKeptAwake, setIsKeptAwake] = useState(false);
  const [calendarEventId, setCalendarEventId] = useState('');
  const [storageEventId, setStorageEventId] = useState('');
  const [soundObject, setSoundObject] = useState({});

  useEffect(() => {
    (async function() { 
      PushNotificationIOS.cancelAllLocalNotifications();

      const calendarPermission = await Calendar.getCalendarPermissionsAsync()
      const isCalendarPermitted = calendarPermission.granted;
      let isCalendarEnabled;
      let calendarSettings;
      let calendarId;
      let events = JSON.parse(await AsyncStorage.getItem('events'));

      if (isCalendarPermitted) {
        calendarSettings = await AsyncStorage.getItem('calendar_settings');
        calendarSettings = JSON.parse(calendarSettings);
        calendarId = calendarSettings.calendar_id;
        isCalendarEnabled = calendarSettings.is_calendar_enabled;

        //check if calendar exists, and re-create one if the calendar doesn't exist
        const calendars = await Calendar.getCalendarsAsync(Calendar.EntityTypes.EVENT);
        let calendarExists;
        calendars.forEach(calendar => {
          if (calendar.id === calendarId) {calendarExists = true;}
        });
        if (!calendarExists) {
          calendarId = await createCalendarAsync();
          await AsyncStorage.mergeItem(
            'calendar_settings',
            JSON.stringify({ calendarId })
          );
        }
      }

      // When the timer started or resumed
      if (status === STATUS_TYPES.ACTIVE) {
        const newEndTime = new Date().valueOf() + (secondsLeft * 1000);
        setEndTime(newEndTime);
        const startTime = new Date().valueOf();

        PushNotificationIOS.scheduleLocalNotification({
          fireDate: new Date(newEndTime).valueOf(),
          alertTitle: `${title || 'Your timer'} has completed!`,
          // alertBody: `Duration: ${moment.duration(secondsTotal, "seconds").format("hh:mm:ss", { trim: false })}`,
          isSilent: false,
          applicationIconBadgeNumber: 0
        });

        // save the event to device storage, by date
        let eventId;    
        try {
          const today = getIsoDate(new Date().valueOf());
          const eventsByDate = JSON.parse(await AsyncStorage.getItem('events_by_date')) || {};
          const todayEvents = eventsByDate[today] || [];
          eventId = uuidv4();
          const data = {
            [today]: [...todayEvents, eventId]
          };
          await AsyncStorage.mergeItem(
            'events_by_date',
            JSON.stringify(data)
          );
          setStorageEventId(eventId);
        } catch (err) {
          console.log('Error while storing events_by_day\n', err);
        }

        // save the event details into device storage, by its eventId
        try {
          const data = {
            [eventId]: {
              title,
              tags,
              start_date: new Date(startTime).toISOString(),
              end_date: new Date(newEndTime).toISOString()
            }
          }
          await AsyncStorage.mergeItem(
            'events',
            JSON.stringify(data)
          );
        } catch (err) {
          console.log('Error while storing event into events\n', err);
        }

        // save the event to device storage, by its tag
        try {
          const eventsByTag = JSON.parse(await AsyncStorage.getItem('events_by_tag')) || {};
          const data = {};
          for (tag of tags) {
            data[tag] = eventsByTag[tag] ?
              [...eventsByTag[tag], eventId] : 
              [eventId];
          }
          if (Object.keys(data).length) {
            await AsyncStorage.mergeItem(
              'events_by_tag',
              JSON.stringify(data)
            );
          }
        } catch (err) {
          console.log('Error while storing event id to events_by_tag\n', err);
        }

        // create an event on calendar
        if (isCalendarPermitted && isCalendarEnabled && calendarId) {
          const eventId = await Calendar.createEventAsync(calendarSettings.calendar_id, {
            title,
            startDate: startTime,
            endDate: newEndTime
          });
          setCalendarEventId(eventId);
        }
      };

      if (status === STATUS_TYPES.PAUSED) {
        // update event on calendar
        if (isCalendarPermitted && isCalendarEnabled && calendarId && calendarEventId) {
          Calendar.updateEventAsync(calendarEventId, {
            endDate: new Date()
          });
        }

        // update [end_date] of event in device storage
        const event = events[storageEventId];
        if (event) {
          event.end_date = new Date().toISOString();
          try {
            await AsyncStorage.mergeItem(
              'events', 
              JSON.stringify({
                [storageEventId]: event
              })
            );
          } catch (err) {
            console.log('Error while updating event in AsyncStorage', err);
          }
        }
      }
    })();
  }, [status]);

  // Timer core logic, 
  // which updates timer every second
  useEffect(() => {
    if (
      endTime
      && status === STATUS_TYPES.ACTIVE
    ) {
      if (secondsLeft > 0) {
        const timer = setTimeout(() => {
          newSecondsLeft = (endTime - new Date().valueOf()) / 1000;
          newSecondsLeft >= 0 ? setSecondsLeft(newSecondsLeft) : setSecondsLeft(0);
        }, 1000);
        return function cleanup() {
          clearTimeout(timer);
        }
      }

      async function playBellSound() {
        const soundSettings = JSON.parse(await AsyncStorage.getItem('sound_settings'));
        Audio.setAudioModeAsync({
          playsInSilentModeIOS: soundSettings.is_playing_in_silent
        });
        const { sound } = await Audio.Sound.createAsync(
          require('../assets/sounds/alarm_bell.mp3'),
          { shouldPlay: true }
        );
        setSoundObject(sound);
      }

      if (
        secondsLeft === 0
        && status === STATUS_TYPES.ACTIVE
      ) {
        
        if (new Date().valueOf() - endTime < 5000) {
          const ONE_SECOND_IN_MS = 1000;
          const PATTERN = [
            0.6 * ONE_SECOND_IN_MS,
            0.6 * ONE_SECOND_IN_MS,
            0.6 * ONE_SECOND_IN_MS,
            1.5 * ONE_SECOND_IN_MS,
          ];
          Vibration.vibrate(PATTERN, true);
          setTimeout(() => {
            try {
              Vibration.cancel();
              if (soundObject.unloadAsync) {
                (async() => {
                  await soundObject.unloadAsync();
                })();
              }
            } catch (err) {
              console.log('Error while trying to stop vibration\n', err);
            }
          }, 10000);

          try {
            playBellSound();
          } catch (err) {
            console.log('Error occured while trying to play alarm_bell \n', err);
          }
        }
        setStatus(STATUS_TYPES.COMPLETED);
      }
    }
  }, [secondsLeft, endTime, status]);

  async function onStopIconClick() {
    try {
      if (soundObject.unloadAsync) {
        await soundObject.unloadAsync();
      }
      Vibration.cancel();
    } catch (err) {
      console.log('Error while stopping soundObject\n', err);
    }
    deactivateKeepAwake();
    navigation.navigate("Main");
  }

  return (
    <SafeAreaView style={
      status === STATUS_TYPES.ACTIVE ?
        styles.safeAreaViewContainerActive:
        styles.safeAreaViewContainer
      }
    >
      <View 
        style={
          status === STATUS_TYPES.ACTIVE ?
            styles.containerActive :
            styles.container
        }
      >
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={()=>{
              isKeptAwake ? deactivateKeepAwake() : activateKeepAwake();
              setIsKeptAwake(!isKeptAwake);
            }}
          >
            <FontAwesomeIcon
              icon={ faInfinity }
              size={ 60 }
              style={
                isKeptAwake ? styles.keepAwakeIconOn : styles.keepAwakeIconOff
              }
            />
          </TouchableOpacity>
        </View>
        <View style={styles.mainInfoContainer}>
          <Text style={styles.titleText}>
            {title}
          </Text>
          <Text style={styles.timeLeftText}>
            {moment.duration(secondsLeft, "seconds").format("hh:mm:ss", { trim: false })}
          </Text>
          {/* <Text style={styles.endTimeText}>
            <FontAwesomeIcon
              icon={ faBell }
              style={styles.endTimeIcon}
            />
            {moment(new Date(endTime).toISOString()).format("A hh:mm")}
          </Text> */}
        </View>
        <View
          style={styles.activeButtonContainer}
        >
          {
            (status === STATUS_TYPES.ACTIVE) &&
            <TouchableOpacity
              onPress={() => setStatus(STATUS_TYPES.PAUSED)}
            >
              <FontAwesomeIcon icon={ faPauseCircle } size={ 80 }/>
            </TouchableOpacity>
          }
          {
            ((status === STATUS_TYPES.PAUSED) || (status === STATUS_TYPES.COMPLETED)) &&
            <TouchableOpacity
              onPress={() => onStopIconClick()}
            >
              <FontAwesomeIcon icon={ faStopCircle } size={ 80 } />
            </TouchableOpacity>
          }
          {
            (status === STATUS_TYPES.PAUSED) &&
            <TouchableOpacity
              onPress={() => setStatus(STATUS_TYPES.ACTIVE)}
            >
              <FontAwesomeIcon
                icon={ faPlayCircle }
                size={ 80 }
                style={ styles.playIcon }
              />
            </TouchableOpacity>
          }
        </View>
      </View>
    </SafeAreaView>
  );
};
