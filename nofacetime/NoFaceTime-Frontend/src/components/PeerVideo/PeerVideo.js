import React, { useEffect, useState, useRef } from 'react';
import styles from './PeerVideo.module.css';

const PeerVideo = ({ faceapi, peer, analyzeFace }) => {
  const videoRef = useRef();
  const canvasRef = useRef();
  const [initialized, setInitialized] = useState(false);

  // const handleVideoPlay = () => {
  //   analyzeFace();
  // };

  useEffect(() => {
    if (!initialized) return;
    const useInterval = setInterval(analyzeFace, 5000);
    return (() => {
      clearInterval(useInterval);
      setInitialized(false);
    });
  }, [initialized]);

  // const analyzeFace = () => {
  //   console.log('handle video Play!!!!');

  //   setInterval(async () => {
  //     if (!initialized) return;
  //     if (!videoRef.current) return;
  //     if (!canvasRef.current) return;

  //     canvasRef.current.innerHTML = faceapi.createCanvasFromMedia(videoRef.current);

  //     const displaySize = {
  //       width: 500,
  //       height: 500
  //     };

  //     faceapi.matchDimensions(canvasRef.current, displaySize);

  //     const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceLandmarks().withFaceExpressions();
  //     const resizedDetections = faceapi.resizeResults(detections, displaySize);

  //     canvasRef.current.getContext('2d').clearRect(0, 0, 500, 500);
  //     faceapi.draw.drawDetections(canvasRef.current, resizedDetections);
  //     faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedDetections);
  //     faceapi.draw.drawFaceExpressions(canvasRef.current, resizedDetections);

  //     if (detections.length > 0) {
  //       const xCoord = resizedDetections[0]?.detection?._box?._x;
  //       const yCoord = resizedDetections[0]?.detection?._box?._y;

  //       console.log("X좌표", xCoord, "Y좌표", yCoord);

  //       detections.forEach(element => {
  //         console.log("HERE", element);
  //         let status = "";
  //         let valueStatus = 0.0;
  //         for (const [key, value] of Object.entries(element.expressions)) {
  //           console.log(element.expressions, '##', key, value, status);

  //           if (value > valueStatus) {
  //             status = key;
  //             valueStatus = value;
  //           }
  //         }

  //         const context = canvasRef.current.getContext('2d');
  //         const { _x, _y, _width, _height } = resizedDetections[0].detection._box;
  //         console.log("RESIZED", resizedDetections);

  //         const img = new Image();
  //         img.src = 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/emoji-sleep-smiley-emoticon-fatigue-tired.jpg';
  //         context.drawImage(img, xCoord - xCoord * 0.25, yCoord - yCoord * 0.25, _width * 1.5, _height * 1.5);
  //       }
  //       );
  //     } else {
  //       console.log("No Faces");
  //       const context = canvasRef.current.getContext('2d');

  //       const img = new Image();
  //       img.src = 'https://no-face-time.s3.ap-northeast-2.amazonaws.com/Emoji/mask_emoji.jpeg';
  //       context.drawImage(img, 0, 0, 500, 500);
  //     }
  //   }, 5000);
  // };

  useEffect(() => {
    peer.peer.on("stream", stream => {
      videoRef.current.srcObject = stream;
    });
  }, []);

  return (
    <div className={styles.PeerVideoWrapper}>
      <video
        className={styles.PeerVideo}
        ref={videoRef}
        autoPlay
        playsInline
        onPlay={() => setInitialized(true)}
      />
      <canvas
        className={styles.Canvas}
        ref={canvasRef}
      />
    </div>
  );
};

export default PeerVideo;
