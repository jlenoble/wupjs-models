import {_Id, Item} from '../src';
import {_id as validator} from '../src/validators';
import {isAProperProperty} from './helpers';

describe('class _Id', function () {
  isAProperProperty({
    Type: _Id,
    typeArgs: [{_id: 42}, {name: '_id', context: new Item(), validator}],
    name: '_id',
  });
});
