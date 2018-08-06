import {Model} from '../src';
import {isAProperModel} from './helpers';

describe('class Model', function () {
  isAProperModel({
    Type: Model,
    typeArgs: [{_id: 1}],
    names: ['title'],
    updates: [
      [{title: 'Bert'}, false],
      [{title: ''}, false],
      [{title: 10}, false],
      [{title: {}}, false],
    ],
  });
});
