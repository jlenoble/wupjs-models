import EventEmitter from 'events';
import aggregation from './aggregation';

export default class Store extends aggregation(Set, EventEmitter) {
  delete (obj) {
    this.emit('delete', obj);
    return super.delete(obj);
  }
}
