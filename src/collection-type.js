import makeListType from './collection-types/list';
import makeCategoryType from './collection-types/category';

const categories = new Map();

export default class CollectionType {
  constructor ({name} = {}) {
    let Type;
    if (name) {
      Type = makeCategoryType({name});
    } else {
      Type = makeListType();
    }

    Type.prototype.categorize = function (name) {
      if (!categories.has(name)) {
        categories.set(name, new CollectionType({name}));
      }
      const Category = categories.get(name);
      return new Category(this);
    };

    return Type;
  }
}
