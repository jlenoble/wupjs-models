import {Idea} from '../src/models';
import {isAProperModel} from './helpers';

describe('class Idea', function () {
  isAProperModel({
    Type: Idea,
    typeArgs: [{_id: 1, title: 'foo'}],
    names: ['title', 'name'],
    updates: [
      [{title: 'Bert'}, true],
      [{title: ''}, false],
      [{title: 10}, false],
      [{title: {}}, false],
      [{name: 'Bert'}, false],
      [{name: ''}, false],
      [{name: 10}, false],
      [{name: {}}, false],
    ],
  });
});
