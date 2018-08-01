import EventEmitter from 'events';
import aggregation from './aggregation';

export default class Selection extends aggregation(Map, EventEmitter) {
  set (key, obj) {
    if (!this.has(key)) { // Don't propagate if already present obj
      this.emit('set', key, obj);
      return super.set(key, obj);
    } else {
      return this;
    }
  }

  delete (key) {
    if (this.has(key)) { // Don't propagate if missing obj
      this.emit('delete', key);
      return super.delete(key);
    } else {
      return false;
    }
  }

  connectOnSet (selection) {
    selection.on('set', (key, obj) => this.set(key, obj));
  }

  connectOnDelete (selection) {
    selection.on('delete', key => this.delete(key));
  }
}
