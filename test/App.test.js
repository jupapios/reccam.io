import React from 'react';
import App from '../src/App';
import sinon from 'sinon';
import { mount } from 'enzyme';
import { renderToJson } from 'enzyme-to-json';
import Deferred from './utils/Deferred';
import NavigatorUserMediaError from './utils/NavigatorUserMediaError';

describe('App', () => {
  let deferred;
  let wrapper;

  beforeEach(() => {
    deferred = new Deferred();
    navigator.mediaDevices = { getUserMedia: constraints => deferred.promise };
    wrapper = mount(<App />);
  });

  it('renders empty while loading', () => {
    expect(renderToJson(wrapper.render())).toMatchSnapshot();
  });

  it('renders empty when media access is denied', async () => {
    const error = new NavigatorUserMediaError();
    deferred.reject(error);

    try {
      await deferred.promise;
    } catch(e) {
      expect(renderToJson(wrapper.render())).toMatchSnapshot();
    }
  });

  it('renders the video URL from the stream', async () => {
    const videoURL = 'http://localhost/e75dbc24-dd2c-4157-bf0e-f0a7773e98c8';
    sinon.stub(URL, 'createObjectURL', stream => videoURL);

    const stream = new MediaStream();
    deferred.resolve(stream);

    await deferred.promise;
    expect(URL.createObjectURL.firstCall.args[0].constructor.name).toBe('MediaStream');
    expect(renderToJson(wrapper.render())).toMatchSnapshot();

    URL.createObjectURL.restore();
  });

  it('initializes the MediaRecorder', async () => {
    sinon.spy(global, 'MediaRecorder');

    const stream = new MediaStream();
    deferred.resolve(stream);

    await deferred.promise;
    expect(MediaRecorder.calledWith(stream, { mimeType: 'video/webm;codecs=vp9' }));

    MediaRecorder.restore();
  });

  it('hides/shows the buttons based on the recorder\' state ', async () => {
    const videoURL = 'http://localhost/714ceded-2c90-43e5-99b0-01bb1badf517';
    sinon.stub(URL, 'createObjectURL', stream => videoURL);

    const stream = new MediaStream();
    deferred.resolve(stream);

    await deferred.promise;
    expect(renderToJson(wrapper.render())).toMatchSnapshot();

    wrapper.ref('start').simulate('click');
    expect(renderToJson(wrapper.render())).toMatchSnapshot();

    wrapper.ref('pause').simulate('click');
    expect(renderToJson(wrapper.render())).toMatchSnapshot();

    wrapper.ref('resume').simulate('click');
    expect(renderToJson(wrapper.render())).toMatchSnapshot();

    wrapper.ref('stop').simulate('click');
    expect(renderToJson(wrapper.render())).toMatchSnapshot();

    URL.createObjectURL.restore();
  });

  it('renders the preview URL from the recorder data', async () => {
    const stream = new MediaStream();
    deferred.resolve(stream);

    await deferred.promise;

    const previewURL = 'http://localhost/e9b601bf-a151-4ab8-970d-b15d32622ab4';
    sinon.stub(URL, 'createObjectURL', blob => previewURL);

    wrapper.ref('start').simulate('click');
    wrapper.ref('stop').simulate('click');

    expect(URL.createObjectURL.firstCall.args[0].constructor.name).toBe('Blob');
    expect(renderToJson(wrapper.render())).toMatchSnapshot();

    URL.createObjectURL.restore();
  });
});
