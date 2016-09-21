import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';
import Deferred from './utils/Deferred';
import NavigatorUserMediaError from './utils/NavigatorUserMediaError';

import { MediaRecorderSpy } from './utils/MediaRecorder';
import { createObjectURLSpy } from './utils/createObjectURL';

describe('App', () => {
  let deferred;
  let component;

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
    expect(createObjectURLSpy).lastCalledWith(stream);
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

  it('it initializes the MediaRecorder', async () => {
    const stream = new MediaStream();
    deferred.resolve(stream);

    await deferred.promise;
    expect(MediaRecorderSpy).lastCalledWith(stream, { mimeType: 'video/webm;codecs=vp9' });
  });
});
