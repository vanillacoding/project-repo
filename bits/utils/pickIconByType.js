import React from 'react';
import { COLORS, NAMES, SIZES, STRINGS } from '../constants/index';

import {
  AntDesign,
  FontAwesome5,
  Entypo,
  MaterialCommunityIcons,
} from '@expo/vector-icons';

/**
 * Generate icons by user's selection
 * @param {String} habitType - type of hbit
 * @param {Boolean} isHabitSelected - User's selected habit status
 * @param {String} targetHabitType - User's selected habit type;
 * @returns {Component} -User's selected habit icon
 */

const pickImgByType = (
  habitType,
  isHabitSelected,
  targetHabitType
) => {
  switch (habitType) {
    case STRINGS.CODE:
      return (
        <AntDesign
          name={NAMES.CODING_ICON}
          size={SIZES.CODING_ICON}
          color={(isHabitSelected && (targetHabitType === STRINGS.CODE)) ? COLORS.LIGHT_GREEN : COLORS.WHITE} />
      );

      case STRINGS.READ:
        return (
          <Entypo
            name={NAMES.READING_ICON}
            size={SIZES.READING_ICON}
            color={(isHabitSelected && (targetHabitType === STRINGS.READ)) ? COLORS.LIGHT_GREEN : COLORS.WHITE}
          />
        );

    case STRINGS.SWIM:
      return (
        <FontAwesome5
          name={NAMES.SWIMMING_ICON}
          size={SIZES.SWIMMING_ICON}
          color={(isHabitSelected && (targetHabitType === STRINGS.SWIM)) ? COLORS.LIGHT_GREEN : COLORS.WHITE}
        />
      );

    case STRINGS.MEDITATE:
      return (
        <MaterialCommunityIcons
          name={NAMES.MEDITATING_ICON}
          size={SIZES.MEDITATING_ICON}
          color={(isHabitSelected && (targetHabitType === STRINGS.MEDITATE)) ? COLORS.LIGHT_GREEN : COLORS.WHITE}
        />
      );

    case STRINGS.RUN:
      return (
        <MaterialCommunityIcons
          name={NAMES.RUNNING_ICON}
          size={SIZES.RUNNING_ICON}
          color={(isHabitSelected && (targetHabitType === STRINGS.RUN)) ? COLORS.LIGHT_GREEN : COLORS.WHITE}
        />
      );

    case STRINGS.BICYCLE:
      return (
        <MaterialCommunityIcons
          name={NAMES.BICYCLE_ICON}
          size={SIZES.BICYCLE_ICON}
          color={(isHabitSelected && (targetHabitType === STRINGS.BICYCLE)) ? COLORS.LIGHT_GREEN : COLORS.WHITE}
        />
      );

    case STRINGS.YOGA:
      return (
        <MaterialCommunityIcons
          name={NAMES.YOGA_ICON}
          size={SIZES.YOGA_ICON}
          color={(isHabitSelected && (targetHabitType === STRINGS.YOGA)) ? COLORS.LIGHT_GREEN : COLORS.WHITE}
        />
      );
  }
};

export default pickImgByType;
