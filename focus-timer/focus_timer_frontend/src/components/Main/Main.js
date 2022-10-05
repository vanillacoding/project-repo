import React, { useState, useEffect } from 'react';
import { TextInput, View, ScrollView, Text, Alert, Linking, SafeAreaView, TouchableOpacity, Button } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import PushNotificationIOS from "@react-native-community/push-notification-ios";
import Voice from '@react-native-community/voice';
import processTextToCommand from '../../utils/nlp';
import { NativeModules } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Tts from 'react-native-tts';
import styles from './Main.style.ios.js';
import { check, PERMISSIONS, RESULTS } from 'react-native-permissions';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCog, faChartBar, faPlayCircle, faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { MAIN_STATUS_TYPES as STATUS_TYPES} from '../../constants/stateTypes.js';

export default function Main({ navigation }) {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState([]);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(1);
  const [text, setText] = useState('');
  const [locale, setLocale] = useState('');
  const [status, setStatus] = useState(STATUS_TYPES.WAITING);
  const [queuedTimer, setQueuedTimer] = useState();

  useEffect(() => {
    (async() => {
      const hasLaunched = await(AsyncStorage.getItem('has_launched'));
      if (!hasLaunched) {
        AsyncStorage.setItem('calendar_settings', JSON.stringify({
          calendar_id: '',
          is_calendar_enabled: false,
          permission_requested: false
        }));
        AsyncStorage.setItem('sound_settings', JSON.stringify({
          is_playing_in_silent: false
        }));
        await AsyncStorage.setItem('has_launched', JSON.stringify(true));
        await AsyncStorage.setItem('events_by_date', JSON.stringify({}));
      }
    })();
  }, []);

  // Trigger two changes on start-up,
  // to deal with an issue presumably from iOS Swift API,
  // The issue is that the first two changes don't trigger onChange.
  useEffect(() => {
    setHours(0);
    setMinutes(0);
    setTimeout(() => {
      setHours(1);
      setMinutes(0);
    });
  }, []);

  useEffect(() => {
    if (status === STATUS_TYPES.DICTATING) {
      const timer = setTimeout(async() => {
        await Voice.stop();
        const response = await processTextToCommand(text, locale);
          if (response.duration && response.title) {
            const totalSeconds = Number(response.duration);
            const hrs = Math.floor(totalSeconds / 3600);
            const mins = (totalSeconds - (hrs * 3600)) / 60;

            setTitle(response.title);
            setTags(response.tags);
            setHours(hrs);
            setMinutes(mins);
            setStatus(STATUS_TYPES.COMMAND_PROCESSED);
          } else {
            console.log('could not process text');
            setStatus(STATUS_TYPES.WAITING);
          }
      }, 3000);
      setQueuedTimer(timer);

      return function cleanUp() {
        clearTimeout(timer);
      }
    }
  }, [text, status]);

  useEffect(() => {
    if (status === STATUS_TYPES.COMMAND_PROCESSED) {
      const hoursMessage = 
        hours ? 
        (hours > 1 ? `${hours} hours` : `${hours} hour`) :
        '';
      const minutesMessage =
        minutes ?
        (minutes > 1 ? `${minutes} minutes` : `${minutes} minute`) :
        '';
      const andMessage = hoursMessage && minutesMessage ? 'and' : '';
      const message = `Starting ${title} for ${hoursMessage} ${andMessage} ${minutesMessage}`;
      setStatus(STATUS_TYPES.STARTING_TIMER);
      Tts.speak(message);
    }
  }, [status, hours, minutes, title]);

  useEffect(() => {
    if (status === STATUS_TYPES.STARTING_TIMER) {
      PushNotificationIOS.checkPermissions(result => {
        if (!result.alert || !result.sound) {
          PushNotificationIOS.requestPermissions();
        }
      });
      setStatus(STATUS_TYPES.WAITING);

      navigation.navigate('Timer', {
        title,
        tags,
        hours,
        minutes,
      });
    }
  }, [status]);

  useEffect(() => {
    const extractedTags = [];
    for (word of title.split(' ')) {
      if (word.includes('#')) {
        extractedTags.push(word);
      }
    }
    setTags(extractedTags);
  }, [title]);

  useEffect(() => {
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechRecognized = onSpeechRecognized;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;
    const locale = NativeModules.SettingsManager.settings.AppleLanguages
    setLocale(locale[0]);

    Tts.addEventListener('tts-start', (event) => {
      console.log("start", event);
    });
    Tts.addEventListener('tts-finish', (event) => {
      console.log("finish", event);
    });
    Tts.addEventListener('tts-cancel', (event) => {
      console.log("cancel", event);
    });
    return function cleanup() {
      Voice.removeAllListeners();
      Tts.removeEventListener('tts-start');
      Tts.removeEventListener('tts-finish');
      Tts.removeEventListener('tts-cancel');
    }
  }, []);

  function onSpeechStart(e) {
    console.log('onSpeechStart', e);
  }

  function onSpeechRecognized(e) {
    console.log('onSpeechRecognized: ', e);
  }

  function onSpeechEnd(e) {
    console.log('onSpeechEnd: ', e);
    setText('');
  }

  function onSpeechError(e) {
    console.log('onSpeechError: ', e);
  }

  function onSpeechResults(e) {
    console.log('onSpeechResults: ', e);
    setText(e.value[0]);
  }

  async function onRecordingIconTouch() {
    const speechRecognitionPermission = await check(PERMISSIONS.IOS.SPEECH_RECOGNITION);
    switch (speechRecognitionPermission) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available on this device');
        return;
      case RESULTS.DENIED:
      case RESULTS.GRANTED:
        setStatus(STATUS_TYPES.DICTATING);
        try {
          await Voice.start(locale);
        } catch (err) {
          console.log('Error occured while starting voice recognition.\n', err);
        }
        break;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Speech Recognition Access Required',
          'To use voice-typing, please allow us to access Speech Recognition in "Settings" of this device.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Settings', onPress: () => Linking.openSettings()},
          ],
          { cancelable: false }
        );
        return;
    }

    const microphonePermission = await check(PERMISSIONS.IOS.MICROPHONE);
    switch (microphonePermission) {
      case RESULTS.UNAVAILABLE:
        console.log('This feature is not available on this device');
        return;
      case RESULTS.DENIED:
      case RESULTS.GRANTED:
        return;
      case RESULTS.BLOCKED:
        Alert.alert(
          'Microphone Access Required',
          'To use voice-typing, please allow us to access Microphone in "Settings" of this device.',
          [
            {text: 'Cancel', style: 'cancel'},
            {text: 'Settings', onPress: () => Linking.openSettings()},
          ],
          { cancelable: false }
        );
        return;
    }    
  }

  async function onCancelRecordingIconTouch() {
    clearTimeout(queuedTimer);
    setStatus(STATUS_TYPES.WAITING);
    try {
      await Voice.stop();
    } catch (err) {
      console.log('Error occured while stopping voice recognition.\n', err);
    }
  }

  return(
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Setting')}
          >
            <FontAwesomeIcon icon={ faCog } size={ 40 }/>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('StatsList')}
          >
            <FontAwesomeIcon icon={ faChartBar } size={ 40 }/>
          </TouchableOpacity>
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            testID='titleTextInput'
            style={styles.titleInput}
            placeholder='Jogging #workout'
            value={title}
            onChangeText={text => setTitle(text)}
          />
        </View>
        <View>
          {tags && tags.map((tag, index) => 
            <Text style={styles.tagTexts} key={index}>
              {tag}
            </Text>
          )}
        </View>
        <View>
          <Text style={styles.listeningText}>
            {status === STATUS_TYPES.DICTATING ? 'Listening...' : ' '}
          </Text>
          <Text style={styles.dictatedText}>
            {status === STATUS_TYPES.DICTATING ? text : ' '}
          </Text>
        </View>
        <View style={styles.durationContainer}>
          <DateTimePicker
            value={new Date(2020, 1, 1, hours, minutes, 0)}
            mode='countdown'
            onChange={(event, selectedDate) => {
              setHours(selectedDate.getHours());
              setMinutes(selectedDate.getMinutes());
            }}
            textColor='#000000'
          />
        </View>
        <View style={styles.mainButtonsContainer}>
          {status !== STATUS_TYPES.DICTATING && 
            (
              <TouchableOpacity
                onPress={onRecordingIconTouch}
              >
                <FontAwesomeIcon icon={ faMicrophone } size={ 60 } />
              </TouchableOpacity>
            )
          }
          { status === STATUS_TYPES.DICTATING &&
            (
              <TouchableOpacity
                onPress={onCancelRecordingIconTouch}
              >
                <FontAwesomeIcon
                  icon={ faMicrophone }
                  size={ 60 }
                  style={styles.cancelRecordingIcon}
                />
              </TouchableOpacity>
            )
          }
          <TouchableOpacity
            testID='startButton'
            onPress={() => {
              setStatus(STATUS_TYPES.STARTING_TIMER);
            }}
          >
            <FontAwesomeIcon icon={ faPlayCircle } size={ 60 } />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
