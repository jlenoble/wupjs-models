import {Item} from '../src';
import {_Id} from '../src/properties';
import {_idValidator as validator} from '../src/validators';
import {isAProperProperty, isSetOnce} from './helpers';

describe('class _Id', function () {
  const name = '_id';
  const requestEvent = `change:property:${name}`;
  const errorEvent = `error:change:property:${name}`;

  isAProperProperty({
    Type: _Id,
    typeArgs: [{[name]: 42}, {name, context: new Item(), validator}],
    name, requestEvent, errorEvent,
    updates: [],
  });

  isSetOnce({
    Type: _Id,
    typeArgs: [{[name]: 42}, {name, context: new Item(), validator}],
    name,
    updates: [
      [{[name]: 'Bert'}, false],
      [{[name]: ''}, false],
      [{[name]: 10}, true],
      [{[name]: {}}, false],
    ],
  });
});
