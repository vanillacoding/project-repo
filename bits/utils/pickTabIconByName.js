import React from 'react';
import { NAMES, SIZES } from '../constants/index';

import {
  Entypo,
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome
} from '@expo/vector-icons';

/**
 * Generate bottom tap icon
 * @param {String} name - Type of bottom tap
 * @param {String} color - Default tap color in hex code
 * @param {Number} size  - Default tap size
 * @returns {Component} - Bottom tap icon
 */

export const pickTabIconByName = (name, color, size) => {
  switch (name) {
    case NAMES.HABIT: {
      return <Entypo
              name={NAMES.CIRCLE_ICON}
              size={SIZES.CIRCLE_ICON}
              color={color}
            />;
    }
    case NAMES.LIVE: {
      return <Ionicons
                name={NAMES.PLAY_ICON}
                size={size}
                color={color}
              />;
    }
    case NAMES.SEARCH: {
      return <MaterialCommunityIcons
                name={NAMES.SEARCH_ICON}
                size={size}
                color={color}
              />;
    }
    case NAMES.MYPROFILE: {
      return <FontAwesome
                name={NAMES.USER_CIRCLE_ICON}
                size={size}
                color={color}
              />
    }
  }
};
