import {makeEvents} from '../../src/helpers';

export const makePropertyTestArgs = ({
  name, Item, Type, item, validator,
}) => {
  class Name extends Item {}
  Name.props = new Set([name]);
  const {request, error} = makeEvents(Name, Name.name).validate[name];

  return {
    Type, name, requestEvent: request, errorEvent: error,
    typeArgs: [item, {name, context: new Name(), validator}],
  };
};
