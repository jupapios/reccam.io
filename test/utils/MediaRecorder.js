let MediaRecorderSpy = jest.fn();

class MediaRecorder {
  static isTypeSupported(type) {
    return type === 'video/webm;codecs=vp9' || type === 'video/webm;codecs=vp8';
  }

  constructor(stream, options) {
    const className = Object.getPrototypeOf(stream).constructor.name;
    if (className !== 'MediaStream') {
      throw new TypeError('Failed to construct \'MediaRecorder\': parameter 1 is not of type \'MediaStream\'.');
    }

    MediaRecorderSpy(...arguments);
  }
}

export default MediaRecorder;
export { MediaRecorderSpy };
