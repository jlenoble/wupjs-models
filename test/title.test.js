import {Title} from '../src';
import {isAProperProperty} from './helpers';

describe('class Title', function () {
  isAProperProperty(Title, [{title: 'foo'}]);
});
