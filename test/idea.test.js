import {Idea} from '../src/models';
import {isAProperModel} from './helpers';

describe('class Idea', function () {
  isAProperModel({
    Type: Idea,
    typeArgs: [{_id: 1, title: 'foo'}],
    createNames: ['_id', 'title'],
    updateNames: ['title', 'name'],
    createItem: [
      [{title: 'Bert'}, true],
      [{title: ''}, false],
      [{title: 10}, false],
      [{title: {}}, false],
      [{name: 'Bert'}, true],
      [{name: ''}, true],
      [{name: 10}, true],
      [{name: {}}, true],
      [{title: 'Bert', name: 'Karl'}, true],
      [{title: '', name: 'Karl'}, false],
      [{title: 10, name: 'Karl'}, false],
      [{title: {}, name: 'Karl'}, false],
      [{title: 'Karl', name: 'Bert'}, true],
      [{title: 'Karl', name: ''}, true],
      [{title: 'Karl', name: 10}, true],
      [{title: 'Karl', name: {}}, true],
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
