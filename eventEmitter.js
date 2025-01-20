class EventEmitter {
  constructor() {
    this.events = new Map();
  }

  on(eventName, listener) {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }

    this.events.get(eventName).push(listener);
  }

  emit(eventName, ...args) {
    if (!this.events.has(eventName)) return;

    const listeners = this.events.get(eventName);

    for (const callback of listeners) {
      try {
        callback(...args);
      } catch (error) {
        console.error(`Error in event ${eventName}: ${error}`);
      }
    }
  }

  off(eventName, listener) {
    if (!this.events.has(eventName)) return;

    const listeners = this.events.get(eventName);
    const index = listeners.indexOf(listener);

    if (index !== -1) {
      listeners.splice(index, 1);
    }

    if (listeners.length === 0) {
      this.events.delete(eventName);
    }
  }
}

const emitter = new EventEmitter();

const logData = (data) => console.log(data);

emitter.on('data', logData);

emitter.emit('data', { message: 'hello world' });

emitter.off('data', logData);
