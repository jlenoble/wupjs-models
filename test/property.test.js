import Schema from 'validate';
import {Property, Item} from '../src';
import {isAProperProperty} from './helpers';
import {makeEvents} from '../src/helpers';

describe('class Property', function () {
  const name = 'name';
  class Name extends Item {}
  Name.props = new Set([name]);
  const {request, error} = makeEvents(Name, Name.name).validate[name];

  isAProperProperty({
    Type: Property,
    typeArgs: [{[name]: 'Al'}, {
      name,
      context: new Name(),
      validator: new Schema({[name]: String}),
    }],
    name, requestEvent: request, errorEvent: error,
    updates: [
      [{[name]: 'Bert'}, true],
      [{[name]: ''}, true],
      [{[name]: 10}, false],
      [{[name]: {}}, false],
    ],
  });
});
