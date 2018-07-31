import EventEmitter from 'events';
import aggregation from './aggregation';

export default class Collection extends aggregation(Set, EventEmitter) {
  delete (obj) {
    this.emit('delete', obj);
    return super.delete(obj);
  }

  connect (collection) {
    collection.on('delete', obj => {
      if (this.has(obj)) { // No point in propagating an event if missing obj
        this.delete(obj);
      }
    });
  }
}
