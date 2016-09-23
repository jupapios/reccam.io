const recorderSymbol = Symbol();

const RecorderMixin = superclass => class extends superclass {
  get recorder() {
    return this[recorderSymbol];
  }

  set recorder(recorder) {
    const className = recorder.constructor.name;
    if (className !== 'MediaRecorder') {
      throw new TypeError('Failed to assign \'recorder\': it is not of type \'MediaRecorder\'.');
    }

    const stateEvents = ['start', 'stop', 'pause', 'resume'];
    stateEvents.forEach(type => recorder.addEventListener(type, this.updateRecorderState));

    this[recorderSymbol] = recorder;
    this.updateRecorderState();
  }

  updateRecorderState = () => this.setState({ recorderState: this[recorderSymbol].state })

  isPaused = () => this.state.recorderState === 'paused'
  isInactive = () => this.state.recorderState === 'inactive'
  isRecording = () => !this.isInactive()

  startRecording = () => this[recorderSymbol].start()
  stopRecording = () => this[recorderSymbol].stop()
  pauseRecording = () => this[recorderSymbol].pause()
  resumeRecording = () => this[recorderSymbol].resume()
}

export default RecorderMixin;
