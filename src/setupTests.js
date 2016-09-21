import createObjectURL from '../test/utils/createObjectURL';
import MediaRecorder from '../test/utils/MediaRecorder';
import MediaStream from '../test/utils/MediaStream';

global.URL.createObjectURL = createObjectURL;
global.MediaRecorder = MediaRecorder;
global.MediaStream = MediaStream;
