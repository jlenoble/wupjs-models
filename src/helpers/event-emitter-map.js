import EventEmitterProxy from './event-emitter-proxy';
import {copyProps} from './copy-props';

export default class EventEmitterMap extends Map {
  constructor (iterable = new Map(), {eventAggregator} = {}) {
    super(iterable);
    copyProps(this, new EventEmitterProxy(eventAggregator));
  }
}

copyProps(EventEmitterMap.prototype, EventEmitterProxy.prototype);
