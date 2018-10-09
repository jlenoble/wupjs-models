'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Item = undefined;

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Item extends _events2.default {
  constructor() {
    super();

    Object.keys(this).forEach(key => {
      Object.defineProperty(this, key, {
        value: this[key],
        writable: true,
        enumerable: false,
        configurable: false
      });
    });
  }

  setMaxListeners(...args) {
    if (this.context) {
      return this.context.setMaxListeners(...args);
    } else {
      return super.setMaxListeners(...args);
    }
  }

  getMaxListeners(...args) {
    if (this.context) {
      return this.context.getMaxListeners(...args);
    } else {
      return super.getMaxListeners(...args);
    }
  }

  emit(...args) {
    if (this.context) {
      return this.context.emit(...args);
    } else {
      return super.emit(...args);
    }
  }

  addListener(...args) {
    if (this.context) {
      return this.context.addListener(...args);
    } else {
      return super.addListener(...args);
    }
  }

  on(...args) {
    if (this.context) {
      return this.context.on(...args);
    } else {
      return super.on(...args);
    }
  }

  prependListener(...args) {
    if (this.context) {
      return this.context.prependListener(...args);
    } else {
      return super.prependListener(...args);
    }
  }

  once(...args) {
    if (this.context) {
      return this.context.once(...args);
    } else {
      return super.once(...args);
    }
  }

  prependOnceListener(...args) {
    if (this.context) {
      return this.context.prependOnceListener(...args);
    } else {
      return super.prependOnceListener(...args);
    }
  }

  removeListener(...args) {
    if (this.context) {
      return this.context.removeListener(...args);
    } else {
      return super.removeListener(...args);
    }
  }

  removeAllListeners(...args) {
    if (this.context) {
      return this.context.removeAllListeners(...args);
    } else {
      return super.removeAllListeners(...args);
    }
  }

  listeners(...args) {
    if (this.context) {
      return this.context.listeners(...args);
    } else {
      return super.listeners(...args);
    }
  }

  rawListeners(...args) {
    if (this.context) {
      return this.context.rawListeners(...args);
    } else {
      return super.rawListeners(...args);
    }
  }

  listenerCount(...args) {
    if (this.context) {
      return this.context.listenerCount(...args);
    } else {
      return super.listenerCount(...args);
    }
  }

  eventNames(...args) {
    if (this.context) {
      return this.context.eventNames(...args);
    } else {
      return super.eventNames(...args);
    }
  }
}
exports.Item = Item;