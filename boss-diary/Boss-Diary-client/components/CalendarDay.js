import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CalendarDay(props) {
  const { day } = props;

  return (
    <View style={styles.day}>
      <Text style={styles.dayText}>
        {day ? `${day.day}일` : ''}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  day: {
    alignSelf: 'center'
  },
  dayText: {
    width: 60,
    fontSize: 25,
    textAlign: 'center'
  }
});
