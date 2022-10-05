function VolumeMeter(stream, option) {
  this.volume = 0;
  this.stream = stream;
  this.audioProcessor = this.audioProcessor(stream, option);
}

VolumeMeter.prototype.audioProcessor = function audioProcessor(stream, option) {
  const { bufferSize, minDecibels, maxDecibels, timeConstant } = option;

  const context = new AudioContext();
  const source = context.createMediaStreamSource(stream);
  const analyser = context.createAnalyser();
  const processor = context.createScriptProcessor(bufferSize, 1, 1);

  analyser.fftSize = bufferSize / 2;
  analyser.minDecibels = minDecibels;
  analyser.maxDecibels = maxDecibels;
  analyser.smoothingTimeConstant = timeConstant;

  source.connect(analyser);
  analyser.connect(processor);
  processor.connect(context.destination);

  this.analyser = analyser;
  this.processor = processor;
};

VolumeMeter.prototype.getVolume = function getVolume() {
  const data = new Uint8Array(this.analyser.frequencyBinCount);
  this.analyser.getByteFrequencyData(data);
  const average = data.reduce((acc, item) => acc + item) / data.length;
  this.volume = average;

  return this.volume;
};

export default VolumeMeter;
