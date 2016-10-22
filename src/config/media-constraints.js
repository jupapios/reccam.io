import isMobile from 'ismobilejs'

const mobile = {
  audio: true,
  video: true
}

const desktop = {
  audio: true,
  video: {
    height: { ideal: 720 },
    width: { ideal: 1280 }
  }
}

export default isMobile.any ? mobile : desktop
