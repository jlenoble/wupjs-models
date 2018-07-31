import EventEmitter from 'events';
import aggregation from './aggregation';

export default class Collection extends aggregation(Set, EventEmitter) {
  delete (obj) {
    if (this.has(obj)) { // Don't propagate if missing obj
      this.emit('delete', obj);
      return super.delete(obj);
    } else {
      return false;
    }
  }

  connect (collection) {
    collection.on('delete', obj => this.delete(obj));
  }
}
