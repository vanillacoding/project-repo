import React from 'react';
import { View, Text } from 'react-native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { AntDesign } from '@expo/vector-icons';

import {
  NAMES,
  SIZES,
  COLORS,
  STRINGS,
  MONTHS,
  DAYS,
  SHORTNAMES
} from '../../../constants/index';

LocaleConfig.locales[STRINGS.FR] = {
  monthNames: [...MONTHS],
  dayNames: [...DAYS],
  dayNamesShort: [...SHORTNAMES],
};

LocaleConfig.defaultLocale = STRINGS.FR;

const ProfileCalendar = ({ completedDates }) => {

  return (
    <Calendar
      theme={{
        arrowColor: COLORS.ARROW,
        textMonthFontWeight: STRINGS.BOLD,
        textDayFontSize: SIZES.TEXT_DAY_FONT
      }}
      dayComponent={({ date, state }) => {
        return (
          <View>
            <Text style={{
                textAlign: STRINGS.CENTER,
                color: state === STRINGS.DISABLED
                ? COLORS.GRAY
                : COLORS.BLACK
              }}>
              {completedDates.includes(`${date.year}-${date.month}-${date.day}`)
                ? <AntDesign
                    name={NAMES.CHECK_SQUARE}
                    size={SIZES.CHECK_SQUARE}
                    color={COLORS.CHECK_SQUARE}
                  />
                : date.day}
            </Text>
          </View>
        );
      }}
    />
  );
};

export default ProfileCalendar;
