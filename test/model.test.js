import {Model} from '../src';
import {isAProperModel} from './helpers';

describe('class Model', function () {
  isAProperModel({
    Type: Model,
    typeArgs: [{_id: 1}],
    createNames: ['_id'],
    updateNames: ['title'],
    createItem: [
      [{_id: 1, title: 'Bert'}, true],
      [{_id: 2, title: ''}, true],
      [{_id: 3, title: 10}, true],
      [{_id: 4, title: {}}, true],
    ],
    updateProperties: [
      [{title: 'Bert'}, false],
      [{title: ''}, false],
      [{title: 10}, false],
      [{title: {}}, false],
    ],
  });
});
