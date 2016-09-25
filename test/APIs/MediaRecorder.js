import EventTarget from './EventTarget';

const INACTIVE = 'inactive';
const PAUSED = 'paused';
const RECORDING = 'recording';

class MediaRecorder extends EventTarget {
  static isTypeSupported(type) {
    return type === 'video/webm;codecs=vp9' || type === 'video/webm;codecs=vp8';
  }

  state = INACTIVE

  constructor(stream, options) {
    super();

    if (!arguments.length) {
      throw new TypeError('Failed to construct \'MediaRecorder\': 1 argument required, but only 0 present.');
    }

    const className = stream.constructor.name;
    if (className !== 'MediaStream') {
      throw new TypeError('Failed to construct \'MediaRecorder\': parameter 1 is not of type \'MediaStream\'.');
    }
  }

  start() {
    if (this.state !== INACTIVE) {
      throw new DOMException('Failed to execute \'start\' on \'MediaRecorder\': The MediaRecorder\'s state is \'${this.state}\'.');
    }
    this.state = RECORDING;
    this.dispatchEvent({ type: 'start' });

    const chunks = [new Blob, new Blob, new Blob];
    chunks.forEach(data => this.dispatchEvent({ type: 'dataavailable', data }));
  }
  stop() {
    if (this.state === INACTIVE) {
      throw new DOMException('Failed to execute \'stop\' on \'MediaRecorder\': The MediaRecorder\'s state is \'${this.state}\'.');
    }
    this.state = INACTIVE;
    this.dispatchEvent({ type: 'stop' });
  }
  pause() {
    if (this.state !== RECORDING) {
      throw new DOMException('Failed to execute \'pause\' on \'MediaRecorder\': The MediaRecorder\'s state is \'${this.state}\'.');
    }
    this.state = PAUSED;
    this.dispatchEvent({ type: 'pause' });
  }
  resume() {
    if (this.state !== PAUSED) {
      throw new DOMException('Failed to execute \'resume\' on \'MediaRecorder\': The MediaRecorder\'s state is \'${this.state}\'.');
    }
    this.state = RECORDING;
    this.dispatchEvent({ type: 'resume' });
  }
}

export default MediaRecorder;
