import {Item} from '../src';
import {Title} from '../src/properties';
import {titleValidator as validator} from '../src/validators';
import {isAProperProperty} from './helpers';
import {makeEvents} from '../src/helpers';

describe('class Title', function () {
  const name = 'title';
  class Name extends Item {}
  Name.props = new Set([name]);
  const {request, error} = makeEvents(Name, Name.name).validate[name];

  isAProperProperty({
    Type: Title,
    typeArgs: [{[name]: 'foo'}, {name, context: new Name(), validator}],
    name, requestEvent: request, errorEvent: error,
    updates: [
      [{[name]: 'Bert'}, true],
      [{[name]: ''}, false],
      [{[name]: 10}, false],
      [{[name]: {}}, false],
    ],
  });
});
