import {Item} from '../src/item';
import {defaultProperties} from '../src/properties';
import {titleValidator as validator} from '../src/validators';
import {isAProperProperty, makePropertyTestArgs} from './helpers';

describe('class Title', function () {
  const name = 'title';
  const Type = defaultProperties.Title;

  isAProperProperty({
    ...makePropertyTestArgs({
      name, Item, Type, item: {[name]: 'foo'}, validator,
    }),

    updates: [
      [{[name]: 'Bert'}, true],
      [{[name]: ''}, false],
      [{[name]: 10}, false],
      [{[name]: {}}, false],
    ],
  });
});
