import {Item} from '../src/item';
import {defaultProperties} from '../src/properties';
import {_idValidator as validator} from '../src/validators';
import {isAProperProperty, isSetOnce, makePropertyTestArgs} from './helpers';

describe('class _Id', function () {
  const name = '_id';
  const Type = defaultProperties._Id;

  isAProperProperty({
    ...makePropertyTestArgs({
      name, Item, Type, item: {[name]: 42}, validator,
    }),

    updates: [],
  });

  isSetOnce({
    ...makePropertyTestArgs({
      name, Item, Type, item: {[name]: 42}, validator, setOnce: true,
    }),

    updates: [
      [{[name]: 'Bert'}, false],
      [{[name]: ''}, false],
      [{[name]: 10}, true],
      [{[name]: {}}, false],
    ],
  });
});
