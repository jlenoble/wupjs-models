import {Model} from '../src';
import {isAProperModel} from './helpers';

describe('class Model', function () {
  isAProperModel({
    Type: Model,
    typeArgs: [{_id: 1}],
    createNames: ['_id'],
    updateNames: ['title'],
    updateProperties: [
      [{title: 'Bert'}, false],
      [{title: ''}, false],
      [{title: 10}, false],
      [{title: {}}, false],
    ],
  });
});
