import {Item} from '../src';
import {Title as Type} from '../src/properties';
import {titleValidator as validator} from '../src/validators';
import {isAProperProperty, makePropertyTestArgs} from './helpers';

describe('class Title', function () {
  const name = 'title';

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
