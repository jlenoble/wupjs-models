import {aggregation} from './helpers';
import {Item} from './item';
import {Model as Class} from './model';

export class Collection extends aggregation(Map, Item) {
  constructor (map = new Map(), {Model = Class} = {}) {
    super();

    Object.defineProperty(this, 'Model', {value: Model});

    Array.from(map).forEach(([key, obj]) => this.set(key, obj));
  }

  set (_id, item) {
    if (this.has(_id)) {
      this.get(_id).item = item;
    } else if (item instanceof this.Model && item._id === _id) {
      super.set(_id, item);
    } else {
      super.set(_id, new this.Model({...item, _id}));
    }

    return this;
  }
}
