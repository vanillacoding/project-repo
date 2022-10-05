import React, { Component } from 'react';
import Settings from '../Settings/Settings';
import PianoKey from '../../Data/PianoKey';
import Sheet from '../Sheet/Sheet'
import axios from 'axios';

import Modal from '../Modal/Modal';
import shareBtn from '../../img/share.png';
import Share from '../Share/Share';
import './PianoKeyboard.css';

var instrument;
const sounds = ['piano', 'organ', 'edm', 'acoustic'];

class PianoKeyboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bpm: 100,
      octave: 4,
      duration: 2,
      sound: sounds[0], //organ, edm, acoustic
      soundValue: 0,
      addClass: false,
      keys: [],
      fourMeter: '',
      pdfUrl: null,
      activateShare: false,
      currentKey: null,
      isKeyPressed: false,
      isModalOpen: false
    }
  }

  componentDidMount = () => {
    window.addEventListener('keydown', this.keyDownMapping.bind(this));
    window.addEventListener('keyup', this.keyUpMapping.bind(this));
    this.setSound(0);
  }

  componentWillUnmount = () => {
    window.removeEventListener('keydown', this.keyDownMapping.bind(this));
    window.removeEventListener('keyup', this.keyUpMapping.bind(this));
  }

  setSound(no) {
    this.setState({
      sound: sounds[no]
    }, () => {
      instrument = window.Synth.createInstrument(this.state.sound);
    });
  }

  playSound(note, octave, ev) {
    instrument.play(note, octave, 3);
  }

  keyUpMapping (ev) {
    if(!this.state.isKeyPressed){
      this.setState({
        isKeyPressed: false
      });
    } else if(ev.key === this.state.currentKey) {
      this.setState({
        currentKey: null
      });
    }
  }

  keyDownMapping(ev) {
    let note;

    if((ev.key !== this.state.currentKey) || !this.state.isKeyPressed) {
      this.setState({
        currentKey: ev.key,
        isKeyPressed: true
      });

      switch (ev.key) {
        case 'q':
          this.playSound('C', this.state.octave - 1); 
          note = 'C'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case '2':
          this.playSound('C#', this.state.octave - 1);
          note = 'C#'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case 'w': 
          this.playSound('D', this.state.octave - 1);
          note = 'D'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case '3':
          this.playSound('D#', this.state.octave - 1);
          note = 'D#'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case 'e':
          this.playSound('E', this.state.octave - 1);
          note = 'E'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case 'r':
          this.playSound('F', this.state.octave - 1);
          note = 'F'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case '5':
          this.playSound('F#', this.state.octave - 1);
          note = 'F#'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case 't':
          this.playSound('G', this.state.octave - 1);
          note = 'G'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case '6':
          this.playSound('G#', this.state.octave - 1);
          note = 'G#'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case 'y':
          this.playSound('A', this.state.octave - 1);
          note = 'A'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case '7':
          this.playSound('A#', this.state.octave - 1);
          note = 'A#'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;
        case 'u':
          this.playSound('B', this.state.octave - 1);
          note = 'B'+(this.state.octave - 1).toString();
          this.pressedKey(note);
          break;

        case 'i':
          this.playSound('C', this.state.octave);
          note = 'C'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case '9':
          this.playSound('C#', this.state.octave);
          note = 'C#'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case 'o':
          this.playSound('D', this.state.octave);
          note = 'D'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case '0':
          this.playSound('D#', this.state.octave);
          note = 'D#'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case 'p':
          this.playSound('E', this.state.octave);
          note = 'E'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case '[':
          this.playSound('F', this.state.octave);
          note = 'F'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case '=':
          this.playSound('F#', this.state.octave);
          note = 'F#'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case ']':
          this.playSound('G', this.state.octave);
          note = 'G'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case 'a':
          this.playSound('G#', this.state.octave);
          note = 'G#'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case 'z':
          this.playSound('A', this.state.octave);
          note = 'A'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case 's':
          this.playSound('A#', this.state.octave);
          note = 'A#'+(this.state.octave).toString();
          this.pressedKey(note);
          break;
        case 'x':
          this.playSound('B', this.state.octave);
          note = 'B'+(this.state.octave).toString();
          this.pressedKey(note);
          break;

        case 'c':
          this.playSound('C', this.state.octave + 1);
          note = 'C'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'f':
          this.playSound('C#', this.state.octave + 1);
          note = 'C#'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'v':
          this.playSound('D', this.state.octave + 1);
          note = 'D'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'g':
          this.playSound('D#', this.state.octave + 1);
          note = 'D#'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'b':
          this.playSound('E', this.state.octave + 1);
          note = 'E'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'n':
          this.playSound('F', this.state.octave + 1);
          note = 'F'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'j':
          this.playSound('F#', this.state.octave + 1);
          note = 'F#'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'm':
          this.playSound('G', this.state.octave + 1);
          note = 'G'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'k':
          this.playSound('G#', this.state.octave + 1);
          note = 'G#'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case ',':
          this.playSound('A', this.state.octave + 1);
          note = 'A'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case 'l':
          this.playSound('A#', this.state.octave + 1);
          note = 'A#'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case '.':
          this.playSound('B', this.state.octave + 1);
          note = 'B'+(this.state.octave + 1).toString();
          this.pressedKey(note);
          break;
        case ';':
          note = 'rest'
          this.pressedKey(note);
          break;

        case 'ArrowRight':
          if(this.state.octave < 7) {
            this.incrementOctaveValue();
          }
          break;
        case 'ArrowLeft':
          if(this.state.octave > 2) {
            this.decrementOctaveValue();
          }
          break;
      }
    }
  }

  pressedKey(key) {
    let parseKey;
    
    if(key==='rest') {
      parseKey = "B4/4/r"
    } else {
      parseKey = key+"/4";
    }

    this.setState({
      keys: [...this.state.keys, parseKey]
      }, () => {
        if(this.state.keys.length === 4) {
          let keysToString = this.state.keys.toString();

          this.setState({
            fourMeter: keysToString
          }, () => {
             this.setInitialize();
          });
      }
    });
  }

  setInitialize() {
    this.setState({
      keys: [],
      fourMeter: ''
    });
  }

  onClickShareButton() {
    this.state.activateShare ? 
      this.setState({
        activateShare: false
      }) :
      this.setState({
        activateShare: true
      });
  }

  createPDF() {
    if(this.props.isLoggedIn) {
      var notesData = document.getElementById('sheet').innerHTML;
    
      //로컬서버
      //axios.post('http://localhost:8080/toPDF', {
      //aws 서버
      axios.post('http://typeyourmelody-env.73ikyyt83n.ap-northeast-2.elasticbeanstalk.com/toPDF',{
        tagData: notesData
      }).then ((res) => {
        this.setState({
          pdfUrl: res.data.url,
          isModalOpen: !this.state.isModalOpen
        });
      }).catch((err) => {
        console.log(err.response)
      });
    } else {
      alert("로그인 후 이용하실 수 있습니다!");
    }
  }

  incrementOctaveValue() {
    this.setState({
      octave: this.state.octave + 1
    });
  }

  decrementOctaveValue() {
    this.setState({
      octave: this.state.octave - 1
    });
  } 

  incrementSoundValue() {
    this.setState({
      soundValue: this.state.soundValue + 1
    }, () => {
      this.setSound(this.state.soundValue)
    });
  }

  decrementSoundValue() {
    this.setState({
      soundValue: this.state.soundValue - 1
    }, () => {
      this.setSound(this.state.soundValue)
    });
  }
  mousePlay(note, octave) {
    this.playSound(note, octave);
    let key = (note+octave).toString();
    this.pressedKey(key);
  }

  toggleModal(){
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  render() {
    let keys = [];
    let count = 0;
    let octaveSet = -2;
    PianoKey.map((key, index) => {
      if((count % 12) === 0) {
        octaveSet ++;
      }
        keys.push(
          <li
            key={`${key.note}`+'/'+`${this.state.octave + octaveSet}`}
            className={`${key.color} ${key.value}`}
            onClick={this.mousePlay.bind(this, key.note, this.state.octave + octaveSet)}
          >
            <div className="key-maps">{key.keyboard}</div>
          </li>
        );
      count ++;
    });

    return (
      <div className="PianoKeyboard">
        <div className="Setting">
          <div className="Octave">
            <Settings
              value={this.state.octave}
              max={7}
              min={2}
              increment={this.incrementOctaveValue.bind(this)}
              decrement={this.decrementOctaveValue.bind(this)}
            /><br/>
            OCTAVE : {this.state.octave - 1} to {this.state.octave + 1}
          </div>
          <div className="Sounds">
            <Settings
              value={this.state.soundValue}
              max={3}
              min={0}
              increment={this.incrementSoundValue.bind(this)}
              decrement={this.decrementSoundValue.bind(this)}
            /><br/>
            Instrument : {this.state.sound}
          </div>
        </div>
        <ul className="keys">
          {keys}
        </ul>
        <div className="sheet">
          {
            !this.props.playMode && 
            <Sheet notes={this.state.fourMeter} />
          }
        </div>
          {
            !this.props.playMode && 
            <button 
              onClick={this.createPDF.bind(this)}>
              Done And Create PDF
            </button>
          }
          <Modal
            show={this.state.isModalOpen}
            onClose={this.toggleModal.bind(this)}>
              <img alt="button" className="share-btn" 
                  src={shareBtn}
                  onClick={this.onClickShareButton.bind(this)}/>
              {
                this.state.activateShare &&
                <div className="social-btn">
                  <Share url={this.state.pdfUrl}/>
                </div>
              }
            <iframe id="pdf-file" src={this.state.pdfUrl}></iframe>
          </Modal>
      </div>
    );
  }
}

export default PianoKeyboard;
