import React, { Component } from 'react';
import mediaConstraints from './config/media-constraints';
import recorderOptions from './config/media-recorder';
import 'webrtc-adapter';
import './App.css';

class App extends Component {
  state = { videoURL: '' }

  componentWillMount() {
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(this.onCameraStream)
      .catch(this.onCameraError);
  }

  onCameraStream = (stream) => {
    const videoURL = URL.createObjectURL(stream);
    const recorder = new MediaRecorder(stream, recorderOptions);
    this.setState({ videoURL });
  }

  onCameraError = (error) => {
    this.setState({ error });
  }

  render() {
    if (!this.state.videoURL) return null;

    return <video className="fullscreen-video" src={this.state.videoURL} muted loop autoPlay />;
  }
}

export default App;
