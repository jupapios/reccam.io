import React, { Component } from 'react';
import mediaConstraints from './config/media-constraints';
import './App.css';

class App extends Component {
  state = { isLoading: true }

  componentWillMount() {
    navigator.mediaDevices.getUserMedia(mediaConstraints)
      .then(this.onCameraStream)
      .catch(this.onCameraError)
  }

  onCameraStream = (stream) => {
    const videoURL = URL.createObjectURL(stream);
    this.setState({ videoURL, isLoading: false });
  }

  onCameraError = ({ message: error }) => {
    this.setState({ error });
  }

  render() {
    if (this.state.isLoading) return null;

    return <video src={this.state.videoURL} muted loop autoPlay />;
  }
}

export default App;
