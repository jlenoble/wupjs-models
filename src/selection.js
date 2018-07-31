import EventEmitter from 'events';
import aggregation from './aggregation';

export default class Selection extends aggregation(Set, EventEmitter) {
  connect (store) {
    store.on('delete', obj => this.delete(obj));
  }
}
