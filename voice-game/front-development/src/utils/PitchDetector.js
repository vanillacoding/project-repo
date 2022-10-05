/*
The MIT License (MIT)

Copyright (c) 2014 Chris Wilson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

class PitchDetector {
  constructor(audioContext) {
    this.audioContext = audioContext;
	  this.sourceNode = null;
	  this.analyser = null;
	  this.mediaStreamSource = null;

	  this.theBuffer = null;
	  this.buflen = 2048;
    this.buf = new Float32Array(this.buflen);
    this.rafID = null;

    this.isPlaying = false;
  }

  error() {
    console.log("Stream generation failed.");
  }

  getUserMedia(dictionary, callback) {
    try {
      navigator.getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      navigator.getUserMedia(dictionary, callback.bind(this), this.error);
    } catch (e) {
      console.log("getUserMedia threw exception :" + e);
    }
  }

  gotStream(stream) {
    this.analyser = this.audioContext.createAnalyser();
	  this.analyser.fftSize = 2048;

    this.mediaStreamSource = this.audioContext.createMediaStreamSource(stream);
    this.mediaStreamSource.connect(this.analyser);
    this.updatePitch();
  }

  toggleLiveInput(toggle) {
    if (!toggle) {
      this.sourceNode.stop(0);
      this.sourceNode = null;
      this.analyser = null;

      if (this.mediaStreamSource) {
        this.mediaStreamSource.mediaStream.getTracks()[0].stop();
      }

      window.cancelAnimationFrame(this.rafID);

      return;
    }

    this.sourceNode = this.audioContext.createBufferSource();
	  this.sourceNode.buffer = this.theBuffer;
	  this.sourceNode.loop = true;

	  this.analyser = this.audioContext.createAnalyser();
	  this.analyser.fftSize = 2048;

	  this.sourceNode.connect(this.analyser);
	  this.analyser.connect(this.audioContext.destination);

	  this.sourceNode.start(0);

    this.getUserMedia({
      "audio": {
        "mandatory": {
          "googEchoCancellation": "false",
          "googAutoGainControl": "false",
          "googNoiseSuppression": "false",
          "googHighpassFilter": "false",
        },
        "optional": [],
      },
    }, this.gotStream);
  }

  autoCorrelate(buf, sampleRate) {
    let SIZE = buf.length;
    let rms = 0;

    for (let i = 0; i < SIZE; i++) {
      const val = buf[i];
      rms += val * val;
    }

    rms = Math.sqrt(rms / SIZE);

    if (rms < 0.01) {
      return -1;
    }

    let r1 = 0, r2 = SIZE - 1, thres = 0.2;

    for (let i = 0; i < SIZE / 2; i++) {
      if (Math.abs(buf[i]) < thres) {
        r1 = i;

        break;
      }
    }

    for (let i = 1; i < SIZE / 2; i++) {
      if (Math.abs(buf[SIZE - i]) < thres) {
        r2 = SIZE - i;

        break;
      }
    }

    buf = buf.slice(r1, r2);
    SIZE = buf.length;

    const c = new Array(SIZE).fill(0);

    for (let i = 0; i < SIZE; i++) {
      for (let j = 0; j < SIZE - i; j++) {
        c[i] = c[i] + buf[j] * buf[j + i];
      }
    }

    let d = 0;

    while (c[d] > c[d + 1]) {
      d++;
    }

    let maxval = -1, maxpos = -1;

    for (let i = d; i < SIZE; i++) {
      if (c[i] > maxval) {
        maxval = c[i];
        maxpos = i;
      }
    }

    let T0 = maxpos;
    let x1 = c[T0 - 1], x2 = c[T0], x3 = c[T0 + 1];

    const a = (x1 + x3 - 2 * x2) / 2;
    const b = (x3 - x1) / 2;

    if (a) {
      T0 = T0 - b / (2 * a);
    }

    return sampleRate / T0;
  }

  updatePitch(time) {
    if (this.analyser) {
      this.analyser.getFloatTimeDomainData(this.buf);
    }

    const ac = this.autoCorrelate(this.buf, this.audioContext.sampleRate);

    this.rafID = window.requestAnimationFrame(this.updatePitch.bind(this));

    if (ac !== -1) {
      const pitch = ac;

      this.pitch = Math.floor(pitch);
    } else {
      this.pitch = 0;
    }
  }
}

export default PitchDetector;
