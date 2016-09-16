import React from 'react';
import renderer from 'react-test-renderer';
import App from '../src/App';
import Deferred from './utils/Deferred';

describe('App', () => {
  const getUserMediaDeferred = new Deferred();

  beforeEach(() => {
    URL.createObjectURL = stream => 'http://some_url';
    navigator.mediaDevices = { getUserMedia: constraints => getUserMediaDeferred.promise };
  });

  it('renders null while loading', () => {
    const component = renderer.create(<App />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  it('renders the video URL from the stream', async () => {
    const component = renderer.create(<App />);

    getUserMediaDeferred.resolve({});
    await getUserMediaDeferred.promise;

    expect(component.toJSON()).toMatchSnapshot();
  });
});
