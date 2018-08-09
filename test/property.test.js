import Schema from 'validate';
import {Property, Item} from '../src';
import {isAProperProperty} from './helpers';

describe('class Property', function () {
  const name = 'name';
  const requestEvent = `change:property:${name}`;
  const errorEvent = `error:change:property:${name}`;

  isAProperProperty({
    Type: Property,
    typeArgs: [{[name]: 'Al'}, {
      name,
      context: new Item(),
      validator: new Schema({[name]: String}),
    }],
    name, requestEvent, errorEvent,
    updates: [
      [{[name]: 'Bert'}, true],
      [{[name]: ''}, true],
      [{[name]: 10}, false],
      [{[name]: {}}, false],
    ],
  });
});
