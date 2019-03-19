import {
  categories,
  eventAggregator as aggregator,
} from './globals';

import makeListType from './collection-types/list';
import makeCategoryType from './collection-types/category';

export default class CollectionType {
  constructor ({name, eventAggregator = aggregator} = {}) {
    let Type;

    if (name) {
      Type = makeCategoryType({name, eventAggregator});
    } else {
      Type = makeListType({eventAggregator});
    }

    return Type;
  }
}

Object.defineProperty(categories, 'CollectionType', {value: CollectionType});
