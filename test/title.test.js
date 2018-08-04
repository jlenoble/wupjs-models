import {Title, Item} from '../src';
import {title as validator} from '../src/validators';
import {isAProperProperty} from './helpers';

describe('class Title', function () {
  isAProperProperty({
    Type: Title,
    typeArgs: [{title: 'foo'}, {name: 'title', context: new Item(), validator}],
    name: 'title',
  });
});
