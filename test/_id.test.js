import {_Id} from '../src';
import {isAProperProperty} from './helpers';

describe('class _Id', function () {
  isAProperProperty({
    Type: _Id,
    typeArgs: [{}], // Id must be set once, so pass an empty object
    name: '_id',
  });
});
