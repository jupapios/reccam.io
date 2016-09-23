import EventTarget from './EventTarget';
import uuid from 'uuid';

class MediaStream extends EventTarget {
  id = uuid()
  active = true
}

export default MediaStream;
