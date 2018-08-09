import {Item} from '../src';
import {_Id as Type} from '../src/properties';
import {_idValidator as validator} from '../src/validators';
import {isAProperProperty, isSetOnce, makePropertyTestArgs} from './helpers';

describe('class _Id', function () {
  const name = '_id';

  isAProperProperty({
    ...makePropertyTestArgs({
      name, Item, Type, item: {[name]: 42}, validator,
    }),

    updates: [],
  });

  isSetOnce({
    ...makePropertyTestArgs({
      name, Item, Type, item: {[name]: 42}, validator,
    }),

    updates: [
      [{[name]: 'Bert'}, false],
      [{[name]: ''}, false],
      [{[name]: 10}, true],
      [{[name]: {}}, false],
    ],
  });
});
