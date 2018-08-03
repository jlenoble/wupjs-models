import {Title} from '../src';
import {isAProperProperty} from './helpers';

describe('class Title', function () {
  isAProperProperty({
    Type: Title,
    typeArgs: [{title: 'foo'}],
    name: 'title',
  });
});
