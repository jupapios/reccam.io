let createObjectURLSpy = jest.fn();
const videoURL = 'http://localhost/e75dbc24-dd2c-4157-bf0e-f0a7773e98c8';

function createObjectURL(stream) {
  const className = Object.getPrototypeOf(stream).constructor.name;
  if (className === 'Blob' || className === 'MediaStream') {
    createObjectURLSpy(...arguments);
    return videoURL;
  } else {
    throw new TypeError('Failed to execute \'createObjectURL\' on \'URL\': No function was found that matched the signature provided.');
  }
}

export default createObjectURL;
export { createObjectURLSpy };
