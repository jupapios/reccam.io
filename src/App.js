import React, { Component } from 'react';
import RecorderMixin from './RecorderMixin';
import mediaConstraints from './config/media-constraints';
import { mix } from 'mixwith';
import 'webrtc-adapter';
import './App.css';

class App extends mix(Component).with(RecorderMixin) {
  state = { videoURL: '', previewURL: '', hasRecorded: false }

  componentWillMount() {
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(this.onCameraStream)
      .catch(this.onCameraError);
  }

  onCameraStream = (stream) => {
    const videoURL = URL.createObjectURL(stream);
    this.initRecorder(stream);
    this.setState({ videoURL });
  }

  onCameraError = (error) => {
    this.setState({ error });
  }

  onRecorderStop = (chunks) => {
    const blob = new Blob(chunks, { type: 'video/webm' });
    const previewURL = URL.createObjectURL(blob);
    this.setState({ previewURL, hasRecorded: true });
  }

  onRecorderStart = () => this.setState({ hasRecorded: false });

  downloadVideo = () => {
    const videoName = Math.floor(100000 + Math.random() * 900000);
    const a = document.createElement('a')
    a.download = `reccam-${videoName}.webm`;
    a.hidden = true;
    a.href = this.state.previewURL;

    document.body.appendChild(a);
    a.click();
  }

  shouldShowPreviewURL() {
    return this.state.previewURL && this.isInactive();
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

  downloadButton() {
    return <button ref="download" disabled={!this.state.hasRecorded} onClick={this.downloadVideo}>Download</button>;
  }

  render() {
    if (!this.state.videoURL) return null;

    const src = this.shouldShowPreviewURL() ? this.state.previewURL : this.state.videoURL;

    return <div>
      <video className="fullscreen" src={src} muted loop autoPlay />
      {this.startButton()}
      {this.pauseButton()}
      {this.downloadButton()}
    </div>
  }
}

export default App;
