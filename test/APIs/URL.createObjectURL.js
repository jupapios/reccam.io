import uuid from 'uuid';

function createObjectURL(stream) {
  const className = Object.getPrototypeOf(stream).constructor.name;
  if (className === 'Blob' || className === 'MediaStream') {
    return `http://localhost/${uuid()}`;
  } else {
    throw new TypeError('Failed to execute \'createObjectURL\' on \'URL\': No function was found that matched the signature provided.');
  }
}

export default createObjectURL;
