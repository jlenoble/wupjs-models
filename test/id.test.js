import {Id} from '../src';
import {isAProperProperty} from './helpers';

describe('class Id', function () {
  isAProperProperty(Id, [{id: 42}]);
});
