import React, { Component } from 'react';
import styles from '../styles/App.module.scss';
import NoteListComponent from './NoteListComponent';
import NumberComponent from './NumberComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class NotePanelCompoenent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      onMouse: false
    };
  }

  onMouseDownHandler(ev) {
    this.setState({
      onMouse: true
    });
  }

  onMouseUpHandler(ev) {
    this.setState({
      onMouse: false
    });
  }

  onMouseOverHandler(ev) {
    if (ev.relatedTarget && !(ev.relatedTarget.tagName === 'UL' || ev.relatedTarget.tagName === 'LI')) {
      this.setState({
        onMouse: false
      });
    }
  }

  playNoteSound(beat) {
    const audio = new Audio(this.props.soundList[beat]);
    audio.play();
  }

  onSelectBeatLine(beat) {
    this.playNoteSound(beat);
    this.props.onSelectBeatLine(beat);
    this.props.onBeatListShow(true);
  }

  onMuteBeat(beat) {
    this.props.onMuteBeat(beat);
  }

  render() {
    return (
      <div className={styles.player} onMouseOut={this.onMouseOverHandler.bind(this)}>
        {
          this.props.beat.map((beat, index) => {
            const _beat = Object.keys(beat)[0];
            return (
              <div
                key={index}
                className={
                  this.props.nowSelectedBeatLine === _beat ?
                    this.props.muteBeat && this.props.muteBeat.indexOf(_beat) > -1 ?
                      `panelWrap ${styles.sample} ${styles.muteLine}` :
                      `panelWrap ${styles.activeLine} ${styles.sample}`
                    : this.props.muteBeat && this.props.muteBeat.indexOf(_beat) > -1 ?
                      `panelWrap ${styles.sample} ${styles.muteLine}` :
                      `panelWrap ${styles.sample}`
                }
                onMouseDown={this.onMouseDownHandler.bind(this)}
                onMouseUp={this.onMouseUpHandler.bind(this)}
              >
                <button
                  className={styles.muteButton}
                  onClick={this.onMuteBeat.bind(this, _beat)}
                >
                  {
                    this.props.muteBeat && this.props.muteBeat.indexOf(_beat) > -1 ?
                      <FontAwesomeIcon
                        icon="volume-off"
                      /> :
                      <FontAwesomeIcon
                        icon="volume-up"
                      />
                  }
                </button>
                <button
                  className="panerSelectButton"
                  onClick={this.onSelectBeatLine.bind(this, _beat)}
                  data-event="selectBeat"
                >
                  {_beat}
                </button>

                <ul className={styles[_beat]}>
                  <NoteListComponent
                    nowBeat={_beat}
                    nowNoteIndex={this.props.nowNoteIndex}
                    nowLineIndex={index}
                    beat={this.props.beat}
                    beatCopy={this.props.beat[index]}
                    onNoteChange={this.props.onNoteChange}
                    isMouseDown={this.state.onMouse}
                  />
                </ul>
              </div>
            );
          })
        }
        <div className={styles.numberWrap}>
          <ul>
            <NumberComponent
              noteCount={this.props.initBeat}
              currentNoteIndex={this.props.nowNoteIndex}
            />
          </ul>
        </div>
      </div>
    );
  }
}

export default NotePanelCompoenent;
