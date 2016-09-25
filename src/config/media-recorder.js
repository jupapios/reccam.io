/* global MediaRecorder */
let options = { mimeType: 'video/webm' };

if (MediaRecorder.isTypeSupported('video/webm;codecs=vp9')) {
  options = { mimeType: 'video/webm;codecs=vp9' };
} else if (MediaRecorder.isTypeSupported('video/webm;codecs=vp8')) {
  options = { mimeType: 'video/webm;codecs=vp8' };
}

export default options;
