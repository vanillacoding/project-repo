import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { isMobile } from '../utils/device';
import { VIDEO_PIXELS } from '../utils/constants';
import './Camera.scss';

export default class Camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCameraFront: false,
      isCameraPaused: false
    };
    this.snapShotCanvas = document.createElement('canvas');
    this.videoRef = React.createRef();

    this.handleOnLoadedMetadata = this.handleOnLoadedMetadata.bind(this);
    this.pauseCamera = this.pauseCamera.bind(this);
    this.snapshot = this.snapshot.bind(this);
    this.unPauseCamera = this.unPauseCamera.bind(this);
  }

  componentDidMount() {
    this.setupCamera();
    this.setCameraFacing(); // for desktop device
  }

  componentDidUpdate() {
    const { isCameraPaused } = this.state;
    const { isGamePaused, doSnapShotNow } = this.props;

    if (isCameraPaused !== isGamePaused) {
      if (isGamePaused) {
        this.pauseCamera();
      } else {
        this.unPauseCamera();
      }
    }

    if (doSnapShotNow) {
      this.snapshot();
    }
  }

  handleOnLoadedMetadata() {
    const { onLoadedMetadata } = this.props;

    this.setupVideoDimensions(
      this.videoRef.current.videoWidth,
      this.videoRef.current.videoHeight
    );

    onLoadedMetadata(this.videoRef);
  }

  pauseCamera() {
    this.videoRef.current.pause();
    this.setState({
      isCameraPaused: true
    });
  }

  async setupCamera() {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { facingMode: 'environment' }
        });

        window.stream = stream;
        this.videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.log('error occured in camera setup process', err);
    }
  }

  setCameraFacing() {
    if (!isMobile()) {
      this.setState({
        isCameraFront: true
      });
    }
  }

  setupVideoDimensions(width, height) {
    this.aspectRatio = width / height;

    if (width >= height) {
      this.videoRef.current.height = VIDEO_PIXELS;
      this.videoRef.current.width = this.aspectRatio * VIDEO_PIXELS;
    } else {
      this.videoRef.current.width = VIDEO_PIXELS;
      this.videoRef.current.height = VIDEO_PIXELS / this.aspectRatio;
    }
  }

  async snapshot() {
    const { onSnapShot } = this.props;

    this.snapShotCanvas.height = this.videoRef.current.height;
    this.snapShotCanvas.width = this.videoRef.current.width;

    const context = this.snapShotCanvas.getContext('2d');

    context.drawImage(
      this.videoRef.current,
      0,
      0,
      this.snapShotCanvas.width,
      this.snapShotCanvas.height
    );

    const img = new Image();

    try {
      const imageSrc = await this.snapShotCanvas.toDataURL('image/png');
      img.src = await imageSrc.replace('image/png', 'image/octet-stream');
    } catch (err) {
      console.log('error occured in snapshot save process', err);
    }

    onSnapShot(img);
  }

  unPauseCamera() {
    this.videoRef.current.play();
    this.setState({
      isCameraPaused: false
    });
  }

  render() {
    const { isCameraFront, isCameraPaused } = this.state;

    return (
      <div className={isCameraPaused ? 'Camera capture' : 'Camera'}>
        {isCameraPaused && (
          <Fragment>
            <div className="Camera__capture-flash" />
          </Fragment>
        )}
        <video
          ref={this.videoRef}
          className={
            isCameraFront ? 'Camera__video camera-front' : 'Camera__video'
          }
          autoPlay={true}
          playsInline={true}
          onLoadedMetadata={this.handleOnLoadedMetadata}
        >
          <track kind="captions" />
        </video>
      </div>
    );
  }
}

Camera.propTypes = {
  isGamePaused: PropTypes.bool.isRequired,
  doSnapShotNow: PropTypes.bool.isRequired,
  onLoadedMetadata: PropTypes.func.isRequired
};
