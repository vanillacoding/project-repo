import reducer from './index';
import { initialState } from './index';
import {
  noteIndexSet,
  noteChange,
  beatBpmSet,
  beatInitialized,
  beatStateSet,
  beatListShow,
  soundListAdd,
  beatLineSelect,
  beatLineAdd,
  beatLineRemove,
  beatUrlSave,
  beatUrlSaveAndShow,
  soundUploadAndLoad,
  beatSoundFileAdd,
  beatLineChange
} from '../actions';

describe('reducers', () => {
  const emptyNote = ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'];

  describe('SET_NOTE_INDEX', () => {
    it('should change the note index', () => {
      const state = {
        nowNoteIndex: null
      }

      const afterIndex = {
        nowNoteIndex: 1
      }

      expect(reducer(state, noteIndexSet(1))).toEqual(afterIndex);
    });
  });

  describe('ON_NOTE_CHANGE', () => {
    it('should change the note', () => {
      const editBeat = [
        { snare: ['-', 'x', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', 'x', '-', '-'] },
        { kick: emptyNote.slice() },
        { bass: emptyNote.slice() },
        { oh: emptyNote.slice() },
        { ch: emptyNote.slice() },
        { Ac_HatCl: emptyNote.slice() },
        { Ac_HatOp2: emptyNote.slice() },
        { Ac_KckCym: emptyNote.slice() },
        { Ac_Kick1: emptyNote.slice() },
        { Ac_Kick2: emptyNote.slice() },
        { Ac_Kick3: emptyNote.slice() },
        { Ac_KiknRide: emptyNote.slice() },
        { Ac_MidTom: emptyNote.slice() },
        { Ac_Snare1: emptyNote.slice() },
        { Ac_Snare3: emptyNote.slice() },
        { Ac_Snare4: emptyNote.slice() }
      ];

      const afterBeat = {
        ...initialState,
        beat: [
          { snare: ['-', 'x', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', 'x', '-', '-'] },
          { kick: emptyNote.slice() },
          { bass: emptyNote.slice() },
          { oh: emptyNote.slice() },
          { ch: emptyNote.slice() },
          { Ac_HatCl: emptyNote.slice() },
          { Ac_HatOp2: emptyNote.slice() },
          { Ac_KckCym: emptyNote.slice() },
          { Ac_Kick1: emptyNote.slice() },
          { Ac_Kick2: emptyNote.slice() },
          { Ac_Kick3: emptyNote.slice() },
          { Ac_KiknRide: emptyNote.slice() },
          { Ac_MidTom: emptyNote.slice() },
          { Ac_Snare1: emptyNote.slice() },
          { Ac_Snare3: emptyNote.slice() },
          { Ac_Snare4: emptyNote.slice() }
        ]
      };
      expect(reducer(initialState, noteChange(editBeat))).toEqual(afterBeat);
    });
  });

  describe('SET_BEAT_BPM', () => {
    it('should change the bpm', () => {
      const afterBpm = {
        ...initialState,
        bpm: 120
      };

      expect(reducer(initialState, beatBpmSet(120))).toEqual(afterBpm);
    });
  });

  describe('ON_BEAT_INIT', () => {
    it('should empty the beat array', () => {
      const state = {
        ...initialState,
        beat: [
          { snare: ['-', 'x', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', 'x', '-', '-'] },
          { kick: ['-', 'x', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', 'x', '-', '-'] },
          { bass: ['-', '-', '-', 'x', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-'] },
          { ch: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-'] },
          { oh: ['-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x'] },
        ],
      };

      expect(reducer(state, beatInitialized())).toEqual(initialState);
    });
  });

  describe('ON_BEAT_STATE', () => {
    it('should change the beat play status', () => {
      const afterState = {
        ...initialState,
        isPlay: 'play'
      };

      expect(reducer(initialState, beatStateSet('play'))).toEqual(afterState);
    });
  });

  describe('ON_BEAT_LIST_SHOW', () => {
    it('should change the beat list status', () => {
      const afterState = {
        ...initialState,
        isBeatListShow: true
      }

      expect(reducer(initialState, beatListShow(true))).toEqual(afterState);
    });
  });

  describe('ON_SELECT_BEAT_LINE', () => {
    it('should select the beat line', () => {
      const state = {
        ...initialState,
        nowSelectedBeatLine: null
      };

      const afterState = {
        ...initialState,
        nowSelectedBeatLine: 'Ac_Snare1'
      };

      expect(reducer(state, beatLineSelect('Ac_Snare1'))).toEqual(afterState);
    });
  });

  describe('ON_CHANGE_BEAT_LINE', () => {
    it('should change the beat line', () => {
      const state = {
        ...initialState,
        beat: [
          { kick: ['-', '-', '-', 'x', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-'] },
          { bass: ['-', '-', '-', 'x', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-'] },
          { oh: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-'] },
          { ch: ['-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x'] },
        ],
        nowSelectedBeatLine: 'kick',
        initBeat: emptyNote.slice()
      };

      const afterState = {
        ...initialState,
        beat: [
          { bass: ['-', '-', '-', 'x', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-'] },
          { oh: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-'] },
          { ch: ['-', 'x', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x', '-', '-', '-', '-', '-', 'x'] },
          { snare: ['-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-', '-'] }
        ],
        nowSelectedBeatLine: 'snare',
        initBeat: emptyNote.slice()
      };

      expect(reducer(state, beatLineChange('snare'))).toEqual(afterState);
    });
  });

  describe('ADD_BEAT_SOUND_FILE', () => {
    it('should add the beat sound file', () => {
      const afterState = {
        ...initialState,
        nowSelectedUploadFile: {
          lastModified: 1492742964000,
          lastModifiedDate: 'Fri Apr 21 2017 11:49:24 GMT+0900 (한국 표준시)',
          name: "E808_CP-14.wav",
          size: 381312,
          type: "audio/wav",
          webkitRelativePath: ""
        }
      };

      const beat = {
        lastModified: 1492742964000,
        lastModifiedDate: 'Fri Apr 21 2017 11:49:24 GMT+0900 (한국 표준시)',
        name: "E808_CP-14.wav",
        size: 381312,
        type: "audio/wav",
        webkitRelativePath: ""
      };

      expect(reducer(initialState, beatSoundFileAdd(beat))).toEqual(afterState);
    });
  });

  describe('ADD_SOUND_LIST', () => {
    it('should add the sound file', () => {
      const afterState = Object.assign({}, initialState, {
        soundList: {
          ...initialState.soundList,
          'E808_CP-15': 'https://firebasestorage.googleapis.com/v0/b/beat-up-b9ef1.appspot.com/o/upload%2FE808_CP-15.wav?alt=media&token=b6ef5b36-b1b3-4ccf-ae0f-878ee2443362'
        }
      });

      const addSoundFile = {
        beatName: 'E808_CP-15',
        beatUrl: 'https://firebasestorage.googleapis.com/v0/b/beat-up-b9ef1.appspot.com/o/upload%2FE808_CP-15.wav?alt=media&token=b6ef5b36-b1b3-4ccf-ae0f-878ee2443362'
      };

      expect(reducer(initialState, soundListAdd(addSoundFile))).toEqual(afterState);
    });
  });

  describe('IS_SOUND_UPLOAD_AND_LODING', () => {
    it('should change the sound upload status', () => {
      const afterState = {
        ...initialState,
        isSoundUploadAndLoding: true
      };

      expect(reducer(initialState, soundUploadAndLoad(true))).toEqual(afterState);
    });
  });

  describe('ADD_BEAT_LINE', () => {
    it('should add the beat line', () => {

      const beatCopy = initialState.beat.slice();
      beatCopy.push({
        [`noname${Object.keys(beatCopy).length}`]: emptyNote.slice()
      });
      const afterState = {
        ...initialState,
        beat: beatCopy
      };

      expect(reducer(initialState, beatLineAdd())).toEqual(afterState);
    });
  });

  describe('REMOVE_BEAT_LINE', () => {
    it('should remove beat line', () => {

      const state = {
        ...initialState,
        nowSelectedBeatLine: 'bass'
      };

      let beatCopy = initialState.beat.slice();
      beatCopy = beatCopy.filter((beat, index) => !beat['bass']);

      const afterState = {
        ...initialState,
        nowSelectedBeatLine: null,
        beat: beatCopy
      };

      expect(reducer(state, beatLineRemove())).toEqual(afterState);
    });
  });

  describe('ON_BEAT_SAVE_URL', () => {
    it('should save beat url', () => {

      const afterState = {
        ...initialState,
        saveUrl: '-LQ7rmCXfm1XYIxKdl4U'
      };

      expect(reducer(initialState, beatUrlSave('-LQ7rmCXfm1XYIxKdl4U'))).toEqual(afterState);
    });
  });

  describe('ON_BEAT_SAVE_URL_SHOW', () => {
    it('should change the beat url status', () => {

      const afterState = {
        ...initialState,
        saveUrlShow: true
      };

      expect(reducer(initialState, beatUrlSaveAndShow(true))).toEqual(afterState);
    });
  });
});
