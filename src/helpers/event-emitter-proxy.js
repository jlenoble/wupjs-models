import EventEmitter from 'events';

const eventsProperties = {
  _events: {
    get () {
      return this.context._events;
    },
  },

  _eventsCount: {
    get () {
      return this.context._eventsCount;
    },
  },

  _maxListeners: {
    get () {
      return this.context._maxListeners;
    },
  },
};

export default class EventEmitterProxy {
  constructor (eventAggregator) {
    // Proxy eventEmitter
    Object.defineProperty(this, 'context', {value: eventAggregator});

    // Proxy (but hide) _events, eventsCount, _maxListeners
    Object.defineProperties(this, eventsProperties);
  }
}

// Proxy all context member methods
Object.keys(EventEmitter.prototype)
  .filter(key => typeof EventEmitter.prototype[key] === 'function')
  .forEach(method => {
    EventEmitterProxy.prototype[method] = function (...args) {
      return this.context[method](...args);
    };
  });
