import {aggregation} from './helpers';
import {Item} from './item';
import {Model as Class} from './model';

export class Collection extends aggregation(Map, Item) {
  constructor (map = new Map(), {Model = Class} = {}) {
    super(Array.from(map).map(([key, obj]) => {
      return [key, new Model({...obj})];
    }));

    Object.defineProperty(this, 'Model', {value: Model});
  }

  set (_id, item) {
    if (this.has(_id)) {
      this.get(_id).item = item;
    } else {
      const Model = this.Model || item.constructor; // necessary on init
      super.set(_id, new Model({...item, _id}));
    }

    return this;
  }
}
