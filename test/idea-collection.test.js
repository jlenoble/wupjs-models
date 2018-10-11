import {defaultModels} from '../src/models';
import {defaultCollections} from '../src/collections';
import {isAProperCollection, hasACollectionCrudApi} from './helpers';

describe('class IdeaCollection', function () {
  const Idea = defaultModels.Idea;
  const IdeaCollection = defaultCollections.IdeaCollection;

  isAProperCollection({
    Type: IdeaCollection,
    typeArgs: [
      [
        [1, {_id: 1, title: 'a'}],
        [2, {_id: 2, title: 'b'}],
        [3, {_id: 3, title: 'c'}],
      ],
    ],
    names: ['_id', 'title'],
    updates: [
      [4, {_id: 4, title: 'd'}],
    ],
  });

  hasACollectionCrudApi({
    Type: IdeaCollection,
    ElementType: Idea,
    typeArgs: [
      [
        [1, {_id: 1, title: 'a'}],
        [2, {_id: 2, title: 'b'}],
        [3, {_id: 3, title: 'c'}],
      ],
    ],
    names: ['_id', 'title'],
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
