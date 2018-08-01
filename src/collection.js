import EventEmitter from 'events';
import aggregation from './aggregation';

export class Collection extends aggregation(Set, EventEmitter) {
  add (obj) {
    if (!this.has(obj)) { // Don't propagate if already present obj
      this.emit('add', obj);
      return super.add(obj);
    } else {
      return this;
    }
  }

  delete (obj) {
    if (this.has(obj)) { // Don't propagate if missing obj
      this.emit('delete', obj);
      return super.delete(obj);
    } else {
      return false;
    }
  }

  connectOnAdd (collection) {
    collection.on('add', obj => this.add(obj));
  }

  connectOnDelete (collection) {
    collection.on('delete', obj => this.delete(obj));
  }

  connectOnSet (selection) {
    selection.on('set', obj => this.add(obj));
  }
}
