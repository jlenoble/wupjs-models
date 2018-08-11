import {Idea} from '../src/models';
import {isAProperModel} from './helpers';

describe('class Idea', function () {
  isAProperModel({
    Type: Idea,
    typeArgs: [{_id: 1, title: 'foo'}],
    createNames: ['_id', 'title'],
    updateNames: ['title', 'name'],
    createItem: [
      [{_id: 1, title: 'Bert'}, true],
      [{_id: 2, title: ''}, false],
      [{_id: 3, title: 10}, false],
      [{_id: 4, title: {}}, false],
      [{_id: 5, name: 'Bert'}, true],
      [{_id: 6, name: ''}, true],
      [{_id: 7, name: 10}, true],
      [{_id: 8, name: {}}, true],
      [{_id: 9, title: 'Bert', name: 'Karl'}, true],
      [{_id: 10, title: '', name: 'Karl'}, false],
      [{_id: 11, title: 10, name: 'Karl'}, false],
      [{_id: 12, title: {}, name: 'Karl'}, false],
      [{_id: 13, title: 'Karl', name: 'Bert'}, true],
      [{_id: 14, title: 'Karl', name: ''}, true],
      [{_id: 15, title: 'Karl', name: 10}, true],
      [{_id: 16, title: 'Karl', name: {}}, true],
    ],
    updateProperties: [
      [{title: 'Bert'}, true],
      [{title: ''}, false],
      [{title: 10}, false],
      [{title: {}}, false],
      [{name: 'Bert'}, false],
      [{name: ''}, false],
      [{name: 10}, false],
      [{name: {}}, false],
    ],
    updateItem: [
      [{title: 'Bert', name: 'Karl'}, true],
      [{title: '', name: 'Karl'}, false],
      [{title: 10, name: 'Karl'}, false],
      [{title: {}, name: 'Karl'}, false],
      [{title: 'Karl', name: 'Bert'}, true],
      [{title: 'Karl', name: ''}, true],
      [{title: 'Karl', name: 10}, true],
      [{title: 'Karl', name: {}}, true],
    ],
  });
});
