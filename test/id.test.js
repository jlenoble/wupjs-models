import {Id} from '../src';
import {isAProperProperty} from './helpers';

describe('class Id', function () {
  isAProperProperty({
    Type: Id,
    typeArgs: [{}], // Id must be set once, so pass an empty object
    name: '_id',
  });
});
