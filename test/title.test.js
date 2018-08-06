import {Item} from '../src';
import {Title} from '../src/properties';
import {titleValidator as validator} from '../src/validators';
import {isAProperProperty} from './helpers';

describe('class Title', function () {
  isAProperProperty({
    Type: Title,
    typeArgs: [{title: 'foo'}, {name: 'title', context: new Item(), validator}],
    name: 'title',
    updates: [
      [{title: 'Bert'}, true],
      [{title: ''}, false],
      [{title: 10}, false],
      [{title: {}}, false],
    ],
  });
});
