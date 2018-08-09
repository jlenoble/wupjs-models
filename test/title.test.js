import {Item} from '../src';
import {Title} from '../src/properties';
import {titleValidator as validator} from '../src/validators';
import {isAProperProperty} from './helpers';

describe('class Title', function () {
  const name = 'title';
  const requestEvent = `change:property:${name}`;
  const errorEvent = `error:change:property:${name}`;

  isAProperProperty({
    Type: Title,
    typeArgs: [{[name]: 'foo'}, {name, context: new Item(), validator}],
    name, requestEvent, errorEvent,
    updates: [
      [{[name]: 'Bert'}, true],
      [{[name]: ''}, false],
      [{[name]: 10}, false],
      [{[name]: {}}, false],
    ],
  });
});
