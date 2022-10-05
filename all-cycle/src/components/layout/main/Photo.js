import Camera, { FACING_MODES, IMAGE_TYPES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import usePhoto from "@/hooks/usePhoto";
import FindIt from "@/components/layout/main/FindIt";
import Loading from "@/components/layout/Loading";
import {
  PhotoContainer,
  ImagePreview,
  ToggleButton,
  Message,
} from "@/components/layout/main/styled";

function Photo({ idealResolution, handleClose }) {
  const {
    startedCamera,
    isError,
    detectedText,
    dataUri,
    handleTakePhoto,
    handleStart,
  } = usePhoto(handleClose);

  return (
    <PhotoContainer>
      {startedCamera && <Loading />}
      {detectedText && <FindIt result={detectedText} />}
      {isError && <Message>TRY AGAIN!</Message>}
      {
        (dataUri)
          ? <ImagePreview src={dataUri} alt="photo by user" />
          : (
            <>
              <ToggleButton onClick={handleClose}>X</ToggleButton>
              <Camera
                onTakePhotoAnimationDone={handleTakePhoto}
                isImageMirror={false}
                idealFacingMode={FACING_MODES.ENVIRONMENT}
                isFullscreen
                imageCompression={0.9}
                sizeFactor={0.9}
                imageType={IMAGE_TYPES.JPG}
                isDisplayStartCameraError={false}
                idealResolution={idealResolution}
                onCameraStart={handleStart}
              />
            </>
          )
      }
    </PhotoContainer>
  );
}

export default Photo;
