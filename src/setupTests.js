import createObjectURL from '../test/APIs/URL.createObjectURL';
import MediaRecorder from '../test/APIs/MediaRecorder';
import MediaStream from '../test/APIs/MediaStream';

global.URL.createObjectURL = createObjectURL;
global.MediaRecorder = MediaRecorder;
global.MediaStream = MediaStream;
