import React, { useState, useEffect } from 'react';
import { View, Button, Text, Dimensions, Animated, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import styles from './StatsList.style.ios.js';
import AsyncStorage from '@react-native-community/async-storage';
import { getDateRange, getIsoDate, addDays } from '../../utils/dates';
import moment from 'moment';
const momentDurationFormatSetup = require("moment-duration-format");
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

export default function StatsList({ navigation }) {
  const today = getIsoDate(new Date().valueOf());
  const screenWidth = Dimensions.get("window").width;
  const bgColors = [
    'rgb(183, 206, 178)',
    'rgb(188, 204, 222)',
    'rgb(211, 135, 131)',
    'rgb(239, 239, 197)',
    'rgb(251, 202, 142)',
    'rgb(235, 230, 133)',
    'rgb(186, 188, 190)',
    'rgb(209, 122, 128)'
  ];

  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);
  const [eventsByTag, setEventsByTag] = useState([]);
  const [eventsByTagMaxDuration, setEventsByTagMaxDuration] = useState(10000);
  const [selectedDaysNum, setSelectedDaysNum] = useState(0);

  useEffect(() => {
    (async() => {
      let eventsByDate;
      try {
        eventsByDate = JSON.parse(await AsyncStorage.getItem('events_by_date'));
      } catch (err) {
        console.log('Error while getting eventsByDate from AsyncStorage\n', err);
      }

      const dateRange = getDateRange(startDate, endDate);
      const eventsByDateFiltered = {};
      for (date of dateRange) {
        if (date in eventsByDate) {
          eventsByDateFiltered[date] = eventsByDate[date];
        }
      }

      // aggregate them by category
      // get tags and their duration
      const durationByTag = {};
      const filteredDates = Object.keys(eventsByDateFiltered);
      let events;
      try {
        events = JSON.parse(await AsyncStorage.getItem('events'));
      } catch (err) {
        console.log('Error while getting events\n', err);
      }
      for (date of filteredDates) {
        for (eventId of eventsByDateFiltered[date]) {
          const event = events[eventId];
          const duration = (new Date(event.end_date).valueOf() - new Date(event.start_date).valueOf()) / 1000;
          for (tag of event.tags) {
            if (tag in durationByTag) {
              ('adding duration', tag)
              durationByTag[tag] += duration;
            } else {
              ('creating duration', tag)
              durationByTag[tag] = duration;
            }
          }
        }
      }

      const durationByTagSorted = [];
      for (tag in durationByTag) {
        durationByTagSorted.push({
          tag: tag,
          duration: durationByTag[tag]
        });
      }
      durationByTagSorted.sort(function compare(a,b) {
        return (b.duration - a.duration);
      });
      const maxDuration = durationByTagSorted.length && durationByTagSorted[0]['duration'] || 3600;
      setEventsByTag(durationByTagSorted);
      setEventsByTagMaxDuration(maxDuration);
    })();
  }, [startDate, endDate]);

  useEffect(() => {
    const nthDayFromToday = getIsoDate(addDays(new Date().valueOf(), -selectedDaysNum));
    setStartDate(nthDayFromToday);
    setEndDate(today);
  }, [selectedDaysNum]);

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Main')}
          >
            <FontAwesomeIcon icon={ faHome } size={ 50 } />
          </TouchableOpacity>
        </View>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.dateRangeButtonsContainer}>
            <View style={selectedDaysNum === 0 ? styles.rangeButtonSelected : styles.rangeButton}>
              <Button
                title='D'
                color='black'
                onPress={()=>setSelectedDaysNum(0)}
              />
            </View>
            <View style={selectedDaysNum === 6 ? styles.rangeButtonSelected : styles.rangeButton}>
              <Button
                title='W'
                color='black'
                onPress={()=>setSelectedDaysNum(6)}
              />
            </View>
            <View style={selectedDaysNum === 30 ? styles.rangeButtonSelected : styles.rangeButton}>
              <Button
                title='M'
                color='black'
                onPress={()=>setSelectedDaysNum(30)}
              />
            </View>
            <View style={selectedDaysNum === 365 ? styles.rangeButtonSelected : styles.rangeButton}>
              <Button
                title='Y'
                color='black'
                onPress={()=>setSelectedDaysNum(365)}
              />
             </View>
          </View>
          <View style={styles.tagsHeaderContainer}>
            <Text style={styles.tagsHeaderText}>Tags</Text>
          </View>
          <View>
            <Text style={styles.tagsHeaderDateRangeText}>
              {moment(startDate).format('MMM DD, YYYY')}-{moment(endDate).format('MMM DD, YYYY')}
            </Text>
          </View>
          <View>
            {
              eventsByTag.map((event, index) => {
                const barWidth = (event.duration / eventsByTagMaxDuration) * screenWidth * 0.8;
                return (
                  <View
                    key={index}
                  >
                    <Animated.View
                      style={[
                        styles.bars,
                        {
                          width: barWidth,
                          backgroundColor: bgColors[index % 8]
                        }
                      ]}
                      key={index}
                    >
                    </Animated.View>
                    <Text style={styles.barTitleText}>
                      {event.tag}
                    </Text>
                    <Text style={styles.barDurationText}>
                      {moment.duration(event.duration, "seconds").format("hh:mm:ss", {
                        trim: false
                      })}
                    </Text>
                  </View>
                );
              })
            }
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};
