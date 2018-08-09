import {Item} from '../src';
import {_Id} from '../src/properties';
import {_idValidator as validator} from '../src/validators';
import {isAProperProperty, isSetOnce} from './helpers';
import {makeEvents} from '../src/helpers';

describe('class _Id', function () {
  const name = '_id';
  class Name extends Item {}
  Name.props = new Set([name]);
  const {request, error} = makeEvents(Name, Name.name).validate[name];

  isAProperProperty({
    Type: _Id,
    typeArgs: [{[name]: 42}, {name, context: new Name(), validator}],
    name, requestEvent: request, errorEvent: error,
    updates: [],
  });

  isSetOnce({
    Type: _Id,
    typeArgs: [{[name]: 42}, {name, context: new Name(), validator}],
    name,
    updates: [
      [{[name]: 'Bert'}, false],
      [{[name]: ''}, false],
      [{[name]: 10}, true],
      [{[name]: {}}, false],
    ],
  });
});
