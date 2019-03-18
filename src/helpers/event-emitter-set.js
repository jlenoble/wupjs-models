import EventEmitterProxy from './event-emitter-proxy';
import {copyProps} from './copy-props';

export default class EventEmitterSet extends Set {
  constructor (iterable = new Set(), {eventAggregator} = {}) {
    super(iterable);
    copyProps(this, new EventEmitterProxy(eventAggregator));
  }
}

copyProps(EventEmitterSet.prototype, EventEmitterProxy.prototype);
