import React, { Component } from 'react';
import RecorderMixin from './RecorderMixin';
import mediaConstraints from './config/media-constraints';
import recorderOptions from './config/media-recorder';
import { mix } from 'mixwith';
import 'webrtc-adapter';
import './App.css';

class App extends mix(Component).with(RecorderMixin) {
  state = { videoURL: '' }

  componentWillMount() {
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(this.onCameraStream)
      .catch(this.onCameraError);
  }

  onCameraStream = (stream) => {
    const videoURL = URL.createObjectURL(stream);
    this.recorder = new MediaRecorder(stream, recorderOptions);
    this.setState({ videoURL });
  }

  onCameraError = (error) => {
    this.setState({ error });
  }

  startButton() {
    if (this.isRecording()) {
      return <button ref="stop" onClick={this.stopRecording}>Stop Record</button>;
    }

    return <button ref="start" onClick={this.startRecording}>Start Record</button>;
  }

  pauseButton() {
    if (this.isPaused()) {
      return <button ref="resume" disabled={this.isInactive()} onClick={this.resumeRecording}>Resume Record</button>;
    }

    return <button ref="pause" disabled={this.isInactive()} onClick={this.pauseRecording}>Pause Record</button>;
  }

  render() {
    if (!this.state.videoURL) return null;

    return <div>
      <video className="fullscreen" src={this.state.videoURL} muted loop autoPlay />
      {this.startButton()}
      {this.pauseButton()}
    </div>
  }
}

export default App;
