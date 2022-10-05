import React, { Component } from 'react';
import Vex from 'vexflow';

const VF = Vex.Flow;

class Sheet extends Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 1,
      notes: ''
    };

    this.vf = null;
    this.score = null;
    this.x = 120;
    this.y = 80;
    this.makeSystem = null;
    this.system = null;
  }


  componentDidMount() {
    this.vf = new VF.Factory({
      renderer: {elementId: 'sheet', width: 1000, height: 500}
    });

    this.score = this.vf.EasyScore({ throwOnError: true });

    this.makeSystem = (width) => {
      var system = this.vf.System({
        x: this.x,
        y: this.y,
        width: width,
        spaceBetweenStaves: 10
      });
      this.x += width;
      return system;
    }
  }

  componentDidUpdate() {
    if(this.props.notes !== this.state.notes) {
      this.setState({
        notes: this.props.notes
      });

      if(this.state.notes.length !== 0) {
        if(this.state.count === 1) {
          this.system = this.makeSystem(250);
          this.system.addStave({
            voices: [
              this.score.voice(this.score.notes(this.state.notes, {stem: 'up'}))
            ]
          })
          .addClef('treble');
        } else if (this.state.count < 9){
          if (this.state.count % 4 === 0) {
            this.x = 10;
            this.y += 130;
          }
          this.system = this.makeSystem(200);
          this.system.addStave({
            voices: [
              this.score.voice(this.score.notes(this.state.notes, {stem: 'up'}))
            ]
          });
        }

        this.setState({
          count: this.state.count + 1
        });
      }
    }
    
    this.vf.draw();
  }
  
  render() {
    return(
      <div id="sheet">
      </div>
    )
  }
}

export default Sheet;
