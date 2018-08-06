import Schema from 'validate';
import {Property, Item} from '../src';
import {isAProperProperty} from './helpers';

describe('class Property', function () {
  isAProperProperty({
    Type: Property,
    typeArgs: [{name: 'Al'}, {
      name: 'name',
      context: new Item(),
      validator: new Schema({name: String}),
    }],
    name: 'name',
    updates: [
      [{name: 'Bert'}, true],
      [{name: ''}, true],
      [{name: 10}, false],
      [{name: {}}, false],
    ],
  });
});
