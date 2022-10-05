import * as posenet_module from "@tensorflow-models/posenet";
import * as facemesh_module from "@tensorflow-models/facemesh";
import * as tf from "@tensorflow/tfjs";
import PoseAnimator from "./poseAnimator";

class PoseDetector {
  constructor(avatarCanvasRef, outputCanvasRef, videoRef, characterRef) {
    this.outputCanvas = outputCanvasRef.current;
    this.ctx = this.outputCanvas.getContext("2d");

    this.video = videoRef.current;
    this.videoWidth = 300;
    this.videoHeight = 300;

    this.facemesh = null;
    this.posenet = null;

    this.minPartConfidence = 0.1;
    this.nmsRadius = 30.0;
    this.defaultPoseNetArchitecture = "MobileNetV1";
    this.defaultQuantBytes = 2;
    this.defaultMultiplier = 1.0;
    this.defaultStride = 16;
    this.defaultInputResolution = 200;

    this.poseAnimator = new PoseAnimator(avatarCanvasRef, this.videoWidth, this.videoHeight, characterRef);

    this.setupDetector();
  }

  async setupDetector() {
    this.posenet = await posenet_module.load({
      architecture: this.defaultPoseNetArchitecture,
      outputStride: this.defaultStride,
      inputResolution: this.defaultInputResolution,
      multiplier: this.defaultMultiplier,
      quantBytes: this.defaultQuantBytes
    });
    this.facemesh = await facemesh_module.load();

    try {
      await this.loadVideo();
    } catch (err) {
      throw new Error(err);
    }

    this.detectPoseInRealTime();
  }

  async loadVideo() {
    this.video = await this.setupCamera(this.video);
    this.video.play();
  }

  async setupCamera(video) {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error("Browser API navigator.mediaDevices.getUserMedia not available");
    }

    video.width = this.videoWidth;
    video.height = this.videoHeight;

    const stream = await navigator.mediaDevices.getUserMedia({
      "audio": true,
      "video": {
        facingMode: "user",
        width: this.videoWidth,
        height: this.videoHeight,
      },
    });
    video.srcObject = stream;

    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        resolve(video);
      };
    });
  }

  detectPoseInRealTime() {
    this.outputCanvas.width = this.videoWidth;
    this.outputCanvas.height = this.videoHeight;

    this.poseDetectionFrame(this.outputCanvas);
  }

  async poseDetectionFrame() {
    this.ctx.clearRect(0, 0, this.videoWidth, this.videoHeight);
    this.ctx.save();
    this.ctx.scale(-1, 1);
    this.ctx.translate(-this.videoWidth, 0);
    this.ctx.drawImage(this.video, 0, 0, this.videoWidth, this.videoHeight);
    this.ctx.restore();

    const input = tf.browser.fromPixels(this.outputCanvas);
    this.faceDetection = await this.facemesh.estimateFaces(input, false, false);
    this.poseDetection = await this.posenet.estimatePoses(this.video, {
      flipHorizontal: true,
      decodingMethod: "multi-person",
      maxDetections: 1,
      scoreThreshold: this.minPartConfidence,
      nmsRadius: this.nmsRadius,
    });

    input.dispose();
    this.poseAnimator.draw(this.faceDetection, this.poseDetection);

    requestAnimationFrame(this.poseDetectionFrame.bind(this));
  }
}

export default PoseDetector;
