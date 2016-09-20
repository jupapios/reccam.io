import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';
import Deferred from './utils/Deferred';
import NavigatorUserMediaError from './utils/NavigatorUserMediaError';
import MediaStream from './utils/MediaStream';

const videoURL = 'http://localhost/e75dbc24-dd2c-4157-bf0e-f0a7773e98c8';
function createObjectURL(stream) {
  const className = Object.getPrototypeOf(stream).constructor.name;
  if (className === 'Blob' || className === 'MediaStream') {
    return videoURL;
  }
}

describe('App', () => {
  let deferred;
  let component;

  beforeAll(() => {
    URL.createObjectURL = createObjectURL;
  });

  beforeEach(() => {
    deferred = new Deferred();
    navigator.mediaDevices = { getUserMedia: constraints => deferred.promise };
    component = renderer.create(<App />);
  });

  it('renders null while loading', () => {
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders the video URL from the stream', async () => {
    const stream = new MediaStream();
    deferred.resolve(stream);

    await deferred.promise;
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders null when media access is denied', async () => {
    const error = new NavigatorUserMediaError();
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch(e) {
      expect(component.toJSON()).toMatchSnapshot();
    }
  });
});
