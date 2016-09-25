/* global MediaRecorder */
import recorderOptions from './config/media-recorder';

const recorderSymbol = Symbol();
const chunksSymbol = Symbol();
const onDataSymbol = Symbol();
const onStartSymbol = Symbol();
const onStopSymbol = Symbol();
const updateRecorderStateSymbol = Symbol();

const RecorderMixin = superclass => class extends superclass {
  initRecorder(stream) {
    const recorder = new MediaRecorder(stream, recorderOptions);
    const stateEvents = ['start', 'stop', 'pause', 'resume'];
    stateEvents.forEach(type => recorder.addEventListener(type, this[updateRecorderStateSymbol].bind(this)));
    recorder.addEventListener('start', this[onStartSymbol].bind(this));
    recorder.addEventListener('stop', this[onStopSymbol].bind(this));
    recorder.addEventListener('dataavailable', this[onDataSymbol].bind(this));

    this[recorderSymbol] = recorder;
    this[updateRecorderStateSymbol]();
  }

  onRecorderData() {}
  onRecorderStart() {}
  onRecorderStop() {}

  [onStartSymbol]() {
    this[chunksSymbol] = [];
    this.onRecorderStart();
  }

  [onStopSymbol]() {
    const chunks = this[chunksSymbol];
    this.onRecorderStop(chunks);
  }

  [onDataSymbol]({ data }) {
    this[chunksSymbol].push(data);
    this.onRecorderData(data);
  }

  [updateRecorderStateSymbol]() {
    this.setState({ recorderState: this[recorderSymbol].state })
  }

  isPaused = () => this.state.recorderState === 'paused'
  isInactive = () => this.state.recorderState === 'inactive'
  isRecording = () => !this.isInactive()

  startRecording = () => this[recorderSymbol].start()
  stopRecording = () => this[recorderSymbol].stop()
  pauseRecording = () => this[recorderSymbol].pause()
  resumeRecording = () => this[recorderSymbol].resume()
}

export default RecorderMixin;
