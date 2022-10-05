import { shuffle } from 'lodash';
import { isIOS } from './device';

import {
  EMOJIS_LVL_1,
  EMOJIS_LVL_2,
  EMOJIS_LVL_3,
  EMOJIS_LVL_4,
  EMOJIS_LVL_5,
  EMOJIS_LVL_DEMO
} from './game_levels';

const emojiLvl1 = shuffle(EMOJIS_LVL_1);
const emojiLvl2 = shuffle(EMOJIS_LVL_2);
const emojiLvl3 = shuffle(EMOJIS_LVL_3);
const emojiLvl4 = shuffle(EMOJIS_LVL_4);
const emojiLvl5 = shuffle(EMOJIS_LVL_5);
const emojiLvlDemo = Array.from(EMOJIS_LVL_DEMO);

export const emojiLvlLookup = {
  1: emojiLvl1,
  2: emojiLvl2,
  3: emojiLvl3,
  4: emojiLvl4,
  5: emojiLvl5,
  '#': emojiLvlDemo
};

export function reShuffleLevelEmojis(level) {
  switch (level) {
    case '1':
      emojiLvlLookup[level] = shuffle(EMOJIS_LVL_1);
      break;
    case '2':
      emojiLvlLookup[level] = shuffle(EMOJIS_LVL_2);
      break;
    case '3':
      emojiLvlLookup[level] = shuffle(EMOJIS_LVL_3);
      break;
    case '4':
      emojiLvlLookup[level] = shuffle(EMOJIS_LVL_4);
      break;
    case '5':
      emojiLvlLookup[level] = shuffle(EMOJIS_LVL_5);
      break;
    case '#':
      // NOTE: the Demo list is not shuffled since we always request them in
      // same order for demo purposes.
      emojiLvlLookup[level] = Array.from(EMOJIS_LVL_DEMO);
      break;
    default:
      throw new Error(
        `Error: expected ${level} level string in the level EmojiLevelsLookup`
      );
  }
}

export const AUDIO = {
  GAME_LOOP: 'gameloop',
  TIME_RUNNING_LOW: 'timerunningout',
  COUNTDOWN: 'countdown',
  FAIL: 'fail',
  FOUND_IT: 'foundit',
  WIN: 'win',
  END: 'endofgame',
  TIMER_INCREASE: 'timerincrease',
  IOS_SPEECH_SPRITE: 'iosspeechsprite',
  LOADING: 'wakawaka',
  INTRO: 'background',
};

export const audioSources = {
  [AUDIO.GAME_LOOP]: new Audio('/audio/game-loop.mp4'),
  [AUDIO.TIME_RUNNING_LOW]: new Audio('/audio/time-running-out.mp4'),
  [AUDIO.COUNTDOWN]: new Audio('/audio/countdown.mp4'),
  [AUDIO.FAIL]: new Audio('/audio/fail.mp4'),
  [AUDIO.FOUND_IT]: new Audio('/audio/foundit.mp4'),
  [AUDIO.WIN]: new Audio('/audio/win.mp4'),
  [AUDIO.END]: new Audio('/audio/end-of-game.mp4'),
  [AUDIO.TIMER_INCREASE]: new Audio('/audio/timer-increase.mp4'),
  [AUDIO.LOADING]: new Audio('/audio/wakawaka.mp3'),
  [AUDIO.INTRO]: new Audio('/audio/background.mp3')
};

if (isIOS()) {
  audioSources[AUDIO.IOS_SPEECH_SPRITE] = new Audio(
    '/audio/ios-speech-sprite.m4a'
  );
}
