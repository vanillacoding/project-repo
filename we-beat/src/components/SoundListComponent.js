import React, { Component, Fragment } from 'react';

class SoundListCompoennt extends Component {
  playTest(beat) {
    const audio = new Audio(this.props.soundList[beat]);
    audio.play();
  }

  addBeatSoundFile(ev) {
    if (ev.target.files[0]) {
      if (ev.target.files[0].type.split('/')[0] === 'audio' && ev.target.files[0].size < 900000) {
        this.props.addBeatSoundFile(ev.target.files[0], this.props.keys);
      } else {
        ev.target.value = '';
        alert('File upload Error');
      }
    }
  }

  render() {
    const beatKeys = this.props.beat.map((_beat, index) => {
      return Object.keys(_beat)[0];
    });

    return (
      <Fragment>
        <input id="beatSelectButton" type="file" accept="audio/*" onChange={this.addBeatSoundFile.bind(this)} data-event="selectBeat" />
        <label htmlFor="beatSelectButton" data-event="selectBeat">Beat Select</label>
        <ul>
          {
            Object.keys(this.props.soundList).map((beat, index) => {
              if (beatKeys.indexOf(beat) < 0) {
                return (
                  <li key={index}>
                    <button
                      className="beatLineChangebutton"
                      onClick={this.props.onChangeBeatLine.bind(this, beat)}
                      data-event="selectBeat"
                    >{beat}</button>
                    <button className="audioPlayButton" onClick={this.playTest.bind(this, beat)} data-event="selectBeat">Play</button>
                  </li>
                );
              } else {
                return false;
              }
            })
          }
        </ul>
      </Fragment>
    )
  }
}

export default SoundListCompoennt;
