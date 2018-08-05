import {Item} from '../src';
import {_Id} from '../src/properties';
import {_idValidator as validator} from '../src/validators';
import {isAProperProperty, isSetOnce} from './helpers';

describe('class _Id', function () {
  isAProperProperty({
    Type: _Id,
    typeArgs: [{_id: 42}, {name: '_id', context: new Item(), validator}],
    name: '_id',
  });

  isSetOnce({
    Type: _Id,
    typeArgs: [{_id: 42}, {name: '_id', context: new Item(), validator}],
    name: '_id',
  });
});
