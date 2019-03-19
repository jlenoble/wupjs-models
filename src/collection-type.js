import EventEmitter from 'events';
import makeListType from './collection-types/list';
import makeCategoryType from './collection-types/category';

const aggregator = new EventEmitter();
const categories = new Map();

export default class CollectionType {
  constructor ({name, eventAggregator = aggregator} = {}) {
    let Type;
    if (name) {
      Type = makeCategoryType({name, eventAggregator});
    } else {
      Type = makeListType({eventAggregator});
    }

    Type.prototype.categorize = function (name) {
      if (!categories.has(name)) {
        categories.set(name, new CollectionType({
          name,
          eventAggregator: aggregator,
        }));
      }
      const Category = categories.get(name);
      return new Category(this);
    };

    return Type;
  }
}
