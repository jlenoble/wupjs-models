import {makeEvents} from '../../src/helpers';

export const makePropertyTestArgs = ({
  name, Item, Type, item, validator, setOnce,
}) => {
  class Name extends Item {}
  Name.props = new Set([name]);
  Name.events = makeEvents(Name, Name.name);
  const {request, error} = Name.events.validate[name];

  return {
    Type, name, requestEvent: request, errorEvent: error,
    typeArgs: [item, {name, context: new Name(), validator, events: {
      request, error}, options: {setOnce}}],
  };
};
