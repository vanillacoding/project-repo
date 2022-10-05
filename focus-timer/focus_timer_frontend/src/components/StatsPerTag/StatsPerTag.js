import React, { useState, useEffect } from 'react';
import { View, Button, Text, Dimensions, Animated, Picker, SafeAreaView } from 'react-native';
import styles from './StatsPerTag.style.ios.js';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { BarChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-community/async-storage';
import { getIsoDate, getDateRange } from '../../utils/dates';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

export default function StatsPerTag({ route, navigation }) {
  const { tag } = route.params;
  const [barChartData, setBarChartData] = useState({});
  const [dataReady, setDataReady] = useState(false);

  useEffect(() => {
    if (barChartData.datasets) {
      setDataReady(true);
    }
  }, [barChartData])

  // get data for the tag
  // and aggregate per date
  useEffect(() => {
    (async() => {
      let eventsByTag;
      let events;
      try {
        eventsByTag = JSON.parse(await AsyncStorage.getItem('events_by_tag'));
        events = JSON.parse(await AsyncStorage.getItem('events'));
      } catch (err) {
        console.log('Error while fetching events_by_tag\n', err);
      }
      const eventIds = eventsByTag[tag];
      const tagDurationByDate = {};
      for (let eventId of eventIds) {
        const event = events[eventId];
        const eventDate = getIsoDate(new Date(event.start_date).valueOf());
        const eventDuration = (new Date(event.end_date) - new Date(event.start_date)) / (1000 * 3600);
        if (tagDurationByDate[eventDate]) {
          tagDurationByDate[eventDate].duration =+ eventDuration;
        } else {
          tagDurationByDate[eventDate] = {duration: eventDuration};
        }
      }

      // manipulate data
      const eventDates = Object.keys(tagDurationByDate);
      eventDates.sort(function compare(a,b) {
        return (new Date(b) - new Date(a));
      });

      const data = {
        labels: [],
        datasets: [
          {
            data: [],
          }
        ]
      };
      const dateRange = getDateRange(eventDates[eventDates.length - 1], eventDates[0]);
      for (let date of dateRange) {
        data.labels.push(date);
        if (eventDates.includes(date)) {
          data.datasets[0].data.push(tagDurationByDate[date].duration);
        } else {
          data.datasets[0].data.push(0);
        }
      }
      setBarChartData(data);
    })();
  }, []);

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundColor: 'rgb(242, 242, 242)',
    backgroundGradientFrom: 'rgb(242, 242, 242)',
    backgroundGradientTo: 'rgb(242, 242, 242)',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(246, 103, 106, ${opacity})`,
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderWidth: 0.5,
      borderColor: 'grey'
    },
    propsForDots: {
      r: "6",
      strokeWidth: "2",
      stroke: "#ffa726"
    },
    barPercentage: 0.5,
  };

  return (
    <SafeAreaView>
      <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.navigate('StatsList')}
          >
            <FontAwesomeIcon icon={ faBars } size={ 40 }/>
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.tagText}>
            {tag}
          </Text>
          {dataReady && (
            <ScrollView
              horizontal
              style={styles.chartContainer}
            >
              <BarChart
                style={{marginVertical: 8, ...chartConfig.style}}
                data={barChartData}
                width={barChartData.datasets[0].data.length * 30 < screenWidth ? screenWidth : barChartData.datasets[0].data.length * 30}
                height={500}
                yAxisSuffix="hrs"
                chartConfig={chartConfig}
                verticalLabelRotation={90}
                fromZero={true}
              />
            </ScrollView>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
