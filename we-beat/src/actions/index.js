import {
  NOTE_INDEX_SET,
  NOTE_CHANGE,
  BEAT_BPM_SET,
  BEAT_INITIALIZED,
  BEAT_STATE_SET,
  BEAT_LIST_SHOW,
  BEAT_LINE_SELECT,
  BEAT_LINE_ADD,
  BEAT_LINE_REMOVE,
  BEAT_URL_SAVE,
  BEAT_URL_SAVE_AND_SHOW,
  BEAT_SOUND_FILE_ADD,
  BEAT_LINE_CHANGE,
  SOUND_LIST_ADD,
  SOUND_UPLOAD_AND_LOAD,
  BEAT_MUTE,
  SOUND_LIST_LOAD
} from '../constants/actionTypes';

export const noteIndexSet = (noteIdx) => {
  return { type: NOTE_INDEX_SET, noteIdx };
};

export const noteChange = (beat) => {
  return { type: NOTE_CHANGE, beat };
};

export const beatBpmSet = (bpm) => {
  return { type: BEAT_BPM_SET, bpm };
};

export const beatInitialized = () => {
  return { type: BEAT_INITIALIZED };
};

export const beatStateSet = (state) => {
  return { type: BEAT_STATE_SET, state };
};

export const beatListShow = (state) => {
  return { type: BEAT_LIST_SHOW, state };
};

export const soundListAdd = (addSoundFile) => {
  return { type: SOUND_LIST_ADD, addSoundFile };
};

export const beatLineSelect = (beat) => {
  return { type: BEAT_LINE_SELECT, beat };
};

export const beatLineAdd = () => {
  return { type: BEAT_LINE_ADD };
};

export const beatLineRemove = () => {
  return { type: BEAT_LINE_REMOVE };
};

export const beatUrlSave = (saveUrl) => {
  return { type: BEAT_URL_SAVE, saveUrl };
};

export const beatUrlSaveAndShow = (boolean) => {
  return { type: BEAT_URL_SAVE_AND_SHOW, state: boolean };
};

export const soundUploadAndLoad = (boolean) => {
  return { type: SOUND_UPLOAD_AND_LOAD, state: boolean };
};

export const beatSoundFileAdd = (file) => {
  return { type: BEAT_SOUND_FILE_ADD, file };
};

export const beatLineChange = (beat) => {
  return { type: BEAT_LINE_CHANGE, beat };
};

export const beatMute = (beat) => {
  return { type: BEAT_MUTE, beat }
};

export const soundListLoad = (list) => {
  return { type: SOUND_LIST_LOAD, list }
};
