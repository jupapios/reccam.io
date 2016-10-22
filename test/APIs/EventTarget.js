// https://developer.mozilla.org/en/docs/Web/API/EventTarget#Example
// using the native EventTarget as parent class for MediaRecorder and MediaStream
// causes a TypeError: Illegal constructor.

class EventTarget {
  listeners = []

  addEventListener (type, callback) {
    if (!(type in this.listeners)) {
      this.listeners[type] = []
    }
    this.listeners[type].push(callback)
  }

  removeEventListener (type, callback) {
    if (!(type in this.listeners)) {
      return
    }
    var stack = this.listeners[type]
    for (var i = 0, l = stack.length; i < l; i++) {
      if (stack[i] === callback) {
        stack.splice(i, 1)
        return this.removeEventListener(type, callback)
      }
    }
  }

  dispatchEvent (event) {
    if (!(event.type in this.listeners)) {
      return
    }
    var stack = this.listeners[event.type]
    event.target = this
    for (var i = 0, l = stack.length; i < l; i++) {
      stack[i].call(this, event)
    }
  }
}

export default EventTarget
