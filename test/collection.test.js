import {Collection} from '../src';
import {isAProperCollection} from './helpers';

describe('class Collection', function () {
  isAProperCollection({
    Type: Collection,
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
});
