import {Id} from '../src';
import {isAProperProperty} from './helpers';

describe('class Id', function () {
  isAProperProperty(Id, [{}]); // Id must be set once, so pass an empty object
});
