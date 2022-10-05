/**
 * @license
 * Copyright 2020 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * =============================================================================
 */

import * as paper from "paper";

import { SVGUtils } from "./utils/svgUtils";
import { PoseIllustration } from "./illustrationGen/illustration";
import { Skeleton } from "./illustrationGen/skeleton";

import girlSVG from "./resources/illustration/girl.svg";
import boySVG from "./resources/illustration/boy.svg";
import abstractSVG from "./resources/illustration/abstract.svg";
import blathersSVG from "./resources/illustration/blathers.svg";
import tomNookSVG from "./resources/illustration/tom-nook.svg";

class PoseAnimator {
  constructor(avatarCanvasRef, videoWidth, videoHeight, characterRef) {
    this.avatarCanvas = avatarCanvasRef.current;

    this.videoWidth = videoWidth;
    this.videoHeight = videoHeight;

    this.illustration = null;
    this.canvasScope = null;
    this.canvasWidth = this.avatarCanvas.width;
    this.canvasHeight = this.avatarCanvas.height;

    this.avatarSvgs = {
      "girl": girlSVG,
      "boy": boySVG,
      "abstract": abstractSVG,
      "blathers": blathersSVG,
      "tom-nook": tomNookSVG,
    };

    this.characterRef = characterRef;

    window.addEventListener("resize", this.resize.bind(this), false);
    this.animate();
    this.resize();
  }

  resize() {
    this.canvasWidth = this.avatarCanvas.width;
    this.canvasHeight = this.avatarCanvas.height;

    this.avatarCanvas.style.width = null;
    this.avatarCanvas.style.height = null;
  }

  async animate() {
    this.setupCanvas();
    await this.parseSVG(Object.values(this.avatarSvgs)[0]);
  }

  setupCanvas() {
    this.canvasScope = paper.default;
    this.canvasScope.setup(this.avatarCanvas);
  }

  async parseSVG(target) {
    const svgScope = await SVGUtils.importSVG(target);
    const skeleton = new Skeleton(svgScope);
    this.illustration = new PoseIllustration(this.canvasScope);
    this.illustration.bindSkeleton(skeleton, svgScope);
  }

  draw(faceDetection, poseDetection) {
    this.canvasScope.project.clear();

    if (poseDetection.length >= 1 && this.illustration) {
      Skeleton.flipPose(poseDetection[0]);

      if (faceDetection && faceDetection.length > 0) {
        const face = Skeleton.toFaceFrame(faceDetection[0]);
        this.illustration.updateSkeleton(poseDetection[0], face);
      } else {
        this.illustration.updateSkeleton(poseDetection[0], null);
      }

      this.illustration.draw(this.canvasScope, this.videoWidth, this.videoHeight);
    }

    this.canvasScope.project.activeLayer.scale(
      this.canvasWidth / this.videoWidth,
      this.canvasHeight / this.videoHeight,
      new this.canvasScope.Point(0, 0)
    );

    this.characterRef.current = SVGUtils.exportSVG(this.canvasScope.project);
  }
}

export default PoseAnimator;
