let EVENTS = {};

function emit(event, ...args) {
  EVENTS[event].forEach((func) => func(...args));
}

function on(event, func) {
  if (EVENTS[event]) {
    return EVENTS[event].push(func);
  }
  EVENTS[event] = [func];
}

function off(event) {
  if (EVENTS[event]) {
    delete EVENTS[event];
  }
}

const socket = { on, emit, off, removeAllListeners(event) { off(event); } };

const io = {
  connect() { return socket; },
};

const serverSocket = { emit };

export { io, serverSocket };
