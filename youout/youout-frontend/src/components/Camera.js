import React from 'react';
import CameraScreen, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import PropTypes from 'prop-types';
import styles from './Camera.module.scss';

const Camera = ({ matchPhotoToKeyword }) => {
  return (
    <div className={styles.container}>
      {
        <CameraScreen
          className={styles.cameraScreen}
          onTakePhotoAnimationDone={matchPhotoToKeyword}
          isFullscreen={true}
          isImageMirror={false}
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          imageType={IMAGE_TYPES.JPG}
          imageCompression={0.5}
        />
      }
    </div>
  );
};

Camera.propTypes = {
  matchPhotoToKeyword: PropTypes.func.isRequired,
};

export default Camera;
