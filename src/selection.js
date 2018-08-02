import EventEmitter from 'events';
import aggregation from './aggregation';

export class Selection extends aggregation(Map, EventEmitter) {
  set (key, obj) {
    if (!this.has(key)) { // Don't propagate if already present obj
      this.emit('set', obj, key);
      return super.set(key, obj);
    } else {
      return this;
    }
  }

  delete (key) {
    if (this.has(key)) { // Don't propagate if missing obj
      this.emit('delete', this.get(key), key);
      return super.delete(key);
    } else {
      return false;
    }
  }

  clear () {
    for (let key of this.keys()) {
      this.delete(key);
    }
  }

  connectOnSet (selection) {
    selection.on('set', (obj, key) => this.set(key, obj));
  }

  connectOnDelete (selection) {
    selection.on('delete', (obj, key) => this.delete(key));
  }

  connectOnAdd (collection, idProperty) {
    collection.on('add', obj => this.set(obj[idProperty], obj));
  }

  connectOnDeleteInCollection (collection, idProperty) {
    collection.on('delete', obj => this.delete(obj[idProperty]));
  }
}
