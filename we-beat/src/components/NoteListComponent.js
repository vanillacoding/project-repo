import React, { Component } from 'react';
import styles from '../styles/App.module.scss';

class NoteComponent extends Component {

  onClickHandler(ev) {
    const sample = ev.target.dataset.sample.split('.');
    const sampleIndex = sample[1];
    const sampleName = sample[0];
    const beatCopy = { ...this.props.beatCopy };
    const sampleCopy = beatCopy[sampleName].slice();
    if (this.props.beatCopy[sampleName][sampleIndex] === 'x') {
      sampleCopy[sampleIndex] = '-';
    } else {
      sampleCopy[sampleIndex] = 'x';
    }

    beatCopy[sampleName] = sampleCopy;
    const _beatCopy = this.props.beat.slice();
    _beatCopy[this.props.nowLineIndex] = beatCopy;
    this.props.onNoteChange(_beatCopy);
  }

  onMouseOverHandler(ev) {
    if (this.props.isMouseDown) {
      this.onClickHandler(ev);
    }
  }

  onMouseDrag(ev) {
    ev.preventDefault();
  }

  render() {
    return (
      this.props.beatCopy[this.props.nowBeat].map((beat, index) => {
        return (
          <li
            key={index}
            className={
              this.props.beatCopy[this.props.nowBeat][index] === 'x' ?
                this.props.nowNoteIndex === index ? `${styles.note} ${styles.active} ${styles.on}` : `${styles.note} ${styles.active}`
                : this.props.nowNoteIndex === index ? `${styles.note} ${styles.on}` : styles.note
            }
            onMouseDown={this.onClickHandler.bind(this)}
            onMouseEnter={this.onMouseOverHandler.bind(this)}
            onDragStart={this.onMouseDrag.bind(this)}
            data-sample={`${this.props.nowBeat}.${index}`}
          >
          </li>
        )
      })
    )
  }
}

export default NoteComponent;
