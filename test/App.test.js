import React from 'react';
import App from '../src/App';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { mountToJson } from 'enzyme-to-json';
import Deferred from './utils/Deferred';
import NavigatorUserMediaError from './utils/NavigatorUserMediaError';

describe('App', () => {
  let deferred;
  let component;

  beforeEach(() => {
    deferred = new Deferred();
    navigator.mediaDevices = { getUserMedia: constraints => deferred.promise };
    component = mount(<App />);
  });

  it('renders empty while loading', () => {
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it('renders empty when media access is denied', async () => {
    const error = new NavigatorUserMediaError();
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch(e) {
      expect(mountToJson(component)).toMatchSnapshot();
    }
  });

  it('renders the video URL from the stream', async () => {
    const videoURL = 'http://localhost/e75dbc24-dd2c-4157-bf0e-f0a7773e98c8';
    sinon.stub(URL, 'createObjectURL', stream => videoURL);

    const stream = new MediaStream();
    deferred.resolve(stream);

    await deferred.promise;
    expect(URL.createObjectURL.calledWith(stream));
    expect(mountToJson(component)).toMatchSnapshot();
  });

  it('initializes the MediaRecorder', async () => {
    sinon.spy(global, 'MediaRecorder');

    const stream = new MediaStream();
    deferred.resolve(stream);

    await deferred.promise;
    expect(MediaRecorder.calledWith(stream, { mimeType: 'video/webm;codecs=vp9' }));
  });
});
