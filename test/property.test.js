import Schema from 'validate';
import {Property as Type} from '../src/property';
import {Item} from '../src/item';
import {isAProperProperty, makePropertyTestArgs} from './helpers';

describe('class Property', function () {
  const name = 'name';

  isAProperProperty({
    ...makePropertyTestArgs({
      name, Item, Type, item: {[name]: 'Al'},
      validator: new Schema({[name]: String}),
    }),

    updates: [
      [{[name]: 'Bert'}, true],
      [{[name]: ''}, true],
      [{[name]: 10}, false],
      [{[name]: {}}, false],
    ],
  });
});
