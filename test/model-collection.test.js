import {defaultModels} from '../src/models';
import {defaultCollections} from '../src/collections';
import {isAProperCollection, hasACollectionCrudApi} from './helpers';

describe('class ModelCollection', function () {
  const Model = defaultModels.Model;
  const ModelCollection = defaultCollections.ModelCollection;

  isAProperCollection({
    Type: ModelCollection,
    typeArgs: [
      [
        [1, {_id: 1, title: 'a'}],
        [2, {_id: 2, title: 'b'}],
        [3, {_id: 3, title: 'c'}],
      ],
    ],
    names: ['_id'],
    updates: [
      [4, {_id: 4, title: 'd'}],
    ],
  });

  hasACollectionCrudApi({
    Type: ModelCollection,
    ElementType: Model,
    typeArgs: [
      [
        [1, {_id: 1, title: 'a'}],
        [2, {_id: 2, title: 'b'}],
        [3, {_id: 3, title: 'c'}],
      ],
    ],
    names: ['_id'],
    setOnce: ['_id'],
    updates: [
      [1, {title: 'd', name: 'D'}],
      [1, {_id: 10, title: 'e', name: 'E'}],
      [4, {title: 'f', name: 'F'}],
      [5, {_id: 50, title: 'g', name: 'G'}],
      [6, {_id: 6, title: 'h', name: 'H'}],
    ],
  });
});
