import React, { Component } from 'react';
import './Watch.scss';

class Watch extends Component {
  constructor(props) {
    super(props);
    this.videoRef = React.createRef();
  }

  componentDidMount() {
    this.setupCamera();
  }

  componentDidUpdate() {
    this.setupCamera();
  }

  setupCamera() {
    this.videoRef.current.srcObject = window.watcherStream;
    window.videoRef = this.videoRef;
  }

  render() {
    return (
      <div className="Watch">
        <video
          className="Watch__video"
          ref={this.videoRef}
          autoPlay={true}
          playsInline={true}
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }
}

export default Watch;
