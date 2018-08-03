import EventEmitter from 'events';

export class Item extends EventEmitter {
  constructor () {
    super();

    Object.keys(this).forEach(key => {
      Object.defineProperty(this, key, {
        value: this[key],
        writable: true,
        enumerable: false,
        configurable: false,
      });
    });
  }
}
