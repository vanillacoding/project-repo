import {
  NOTE_INDEX_SET,
  NOTE_CHANGE,
  BEAT_BPM_SET,
  BEAT_INITIALIZED,
  BEAT_STATE_SET,
  BEAT_LIST_SHOW,
  BEAT_LINE_SELECT,
  BEAT_LINE_CHANGE,
  BEAT_SOUND_FILE_ADD,
  BEAT_LINE_ADD,
  BEAT_LINE_REMOVE,
  BEAT_URL_SAVE,
  BEAT_URL_SAVE_AND_SHOW,
  SOUND_LIST_ADD,
  SOUND_UPLOAD_AND_LOAD,
  BEAT_MUTE,
  SOUND_LIST_LOAD,
} from "../constants/actionTypes";
import { defaultSound } from "../source/defaultSound";

const emptyNote = [
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
  "-",
];
const initEvents = [
  0,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
];

export const initialState = {
  bpm: 80,
  nowNoteIndex: null,
  noteNum: 32,
  isPlay: "stop",
  initBeat: emptyNote.slice(),
  initEvents: initEvents.slice(),
  beat: [
    { snare: emptyNote.slice() },
    { kick: emptyNote.slice() },
    { bass: emptyNote.slice() },
    { ch: emptyNote.slice() },
    { oh: emptyNote.slice() },
  ],
  isBeatListShow: false,
  nowSelectedBeatLine: null,
  nowSelectedUploadFile: null,
  soundList: defaultSound,
  isSoundUploadAndLoding: false,
  saveUrl: null,
  saveUrlShow: false,
  muteBeat: [],
  maxLine: 12,
};

function beatupReducer(state = initialState, action) {
  switch (action.type) {
    case NOTE_INDEX_SET:
      return Object.assign({}, state, {
        nowNoteIndex: action.noteIdx,
      });
    case NOTE_CHANGE:
      return Object.assign({}, state, {
        ...state,
        beat: action.beat,
      });
    case BEAT_BPM_SET:
      return Object.assign({}, state, {
        bpm: action.bpm,
      });
    case BEAT_INITIALIZED:
      let beatCopy = state.beat.slice();
      beatCopy = beatCopy.map((beat, index) => {
        return {
          [Object.keys(beat)[0]]: state.initBeat.slice(),
        };
      });
      return Object.assign({}, state, {
        beat: beatCopy,
        nowNoteIndex: null,
        muteBeat: [],
      });
    case BEAT_STATE_SET:
      return Object.assign({}, state, {
        isPlay: action.state,
      });
    case BEAT_LIST_SHOW:
      return Object.assign({}, state, {
        isBeatListShow: action.state,
      });
    case BEAT_LINE_SELECT:
      return Object.assign({}, state, {
        nowSelectedBeatLine: action.beat,
      });
    case BEAT_LINE_CHANGE:
      let beatChangeCopy = state.beat.slice();
      beatChangeCopy = beatChangeCopy.filter(
        (beat, index) => !beat[state.nowSelectedBeatLine]
      );
      beatChangeCopy.push({ [action.beat]: state.initBeat.slice() });
      return Object.assign({}, state, {
        beat: beatChangeCopy,
        nowSelectedBeatLine: action.beat,
      });
    case BEAT_SOUND_FILE_ADD:
      return Object.assign({}, state, {
        nowSelectedUploadFile: action.file,
      });
    case SOUND_LIST_ADD:
      const soundListCopy = {
        ...state.soundList,
        [action.addSoundFile.beatName]: action.addSoundFile.beatUrl,
      };
      return Object.assign({}, state, {
        soundList: soundListCopy,
      });
    case SOUND_UPLOAD_AND_LOAD:
      return Object.assign({}, state, {
        isSoundUploadAndLoding: action.state,
      });
    case BEAT_LINE_ADD:
      const addBeat = state.beat.slice();
      addBeat.push({
        [`noname${Object.keys(addBeat).length}`]: state.initBeat.slice(),
      });
      return Object.assign({}, state, {
        ...state,
        beat: addBeat,
      });
    case BEAT_LINE_REMOVE:
      let _beatChangeCopy = state.beat.slice();
      _beatChangeCopy = _beatChangeCopy.filter(
        (beat, index) => !beat[state.nowSelectedBeatLine]
      );
      return Object.assign({}, state, {
        beat: _beatChangeCopy,
        nowSelectedBeatLine: null,
      });
    case BEAT_URL_SAVE:
      return Object.assign({}, state, {
        saveUrl: action.saveUrl,
      });
    case BEAT_URL_SAVE_AND_SHOW:
      return Object.assign({}, state, {
        saveUrlShow: action.state,
      });
    case BEAT_MUTE:
      let muteBeatCopy = state.muteBeat.slice();
      if (muteBeatCopy.indexOf(action.beat) > -1) {
        muteBeatCopy.splice(muteBeatCopy.indexOf(action.beat), 1);
      } else {
        muteBeatCopy.push(action.beat);
      }

      return Object.assign({}, state, {
        muteBeat: muteBeatCopy,
      });
    case SOUND_LIST_LOAD:
      let soundListLoadCopy = { ...state.soundList };
      soundListLoadCopy = action.list;
      return Object.assign({}, state, {
        soundList: soundListLoadCopy,
      });
    default:
      return Object.assign({}, state);
  }
}

export default beatupReducer;
