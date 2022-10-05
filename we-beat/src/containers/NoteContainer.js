import { connect } from 'react-redux';
import NotePanelComponent from '../components/NotePanelComponent';
import {
  noteChange,
  beatListShow,
  beatLineSelect,
  beatMute
} from '../actions'

const beatupStateToProps = (state) => {
  return {
    nowNoteIndex: state.nowNoteIndex,
    beat: state.beat,
    isBeatListShow: state.isBeatListShow,
    nowSelectedBeatLine: state.nowSelectedBeatLine,
    soundList: state.soundList,
    initBeat: state.initBeat,
    muteBeat: state.muteBeat
  }
}

const beatupDispatchProps = (dispatch) => {
  return {
    onNoteChange(beat) {
      dispatch(noteChange(beat));
    },
    onBeatListShow(state) {
      dispatch(beatListShow(state));
    },
    onSelectBeatLine(beat) {
      dispatch(beatLineSelect(beat));
    },
    onMuteBeat(beat) {
      dispatch(beatMute(beat));
    }
  }
}

export default connect(beatupStateToProps, beatupDispatchProps)(NotePanelComponent);
