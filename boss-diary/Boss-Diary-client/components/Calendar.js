import React from 'react';
import { Agenda, LocaleConfig } from 'react-native-calendars';
import { StyleSheet } from 'react-native';
import CalendarItem from './CalendarItem';
import CalendarDay from './CalendarDay';
import EmptyScreen from './EmptyScreen';
import Colors from '../constants/Colors';
import { local } from '../utils';

export default function Calendar(props) {
  const { reportDates, reportItems } = props;

  const themeConfig = {
    selectedDayBackgroundColor: Colors.deepGray,
    todayTextColor: Colors.gray,
    dayTextColor: Colors.deepGray,
    dotColor: Colors.gray,
    agendaDayTextColor: 'yellow',
    agendaDayNumColor: 'green',
    agendaTodayColor: 'green',
    agendaKnobColor: Colors.lightGray
  };

  LocaleConfig.locales.ko = local;
  LocaleConfig.defaultLocale = 'ko';

  return (
    <Agenda
      style={styles.container}
      theme={themeConfig}
      monthFormat={'yyyy년 MM월'}
      minDate={'2019-01-01'}
      markedDates={reportDates}
      items={reportItems}
      renderItem={item => <CalendarItem item={item} />}
      renderDay={day => <CalendarDay day={day} />}
      renderEmptyData = {() => <EmptyScreen message={'선택한 날짜에 작성한 보고서가 없습니다'}/>}
      rowHasChanged={(r1, r2) => r1.text !== r2.text}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    height: 500
  },
  day: {
    alignSelf: 'center'
  },
  dayText: {
    width: 60,
    fontSize: 25,
    textAlign: 'center'
  }
});
