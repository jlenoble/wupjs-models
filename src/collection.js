import aggregation from './helpers/aggregation';
import {Item} from './item';
import {Model} from './model';

export class Collection extends aggregation(Map, Item) {
  constructor (map = new Map(), {context} = {}) {
    super();
    Object.defineProperty(this, 'context', {value: context});
    Array.from(map).forEach(([key, obj]) => this.set(key, obj));
  }

  set (_id, item) {
    if (this.has(_id)) {
      this.get(_id).item = item;
      return this;
    }

    const Model = this.constructor.Model;

    if (item instanceof Model && item._id === _id) {
      super.set(_id, item);
    } else {
      super.set(_id, new Model({...item, _id}, {context: this}));
    }

    return this;
  }
}

Collection.Model = Model;
