import {Property} from '../property';
import {className} from '../helpers';

export const makeProperty = ([name, validator]) => {
  const Class = class extends Property {
    constructor (item, {context} = {}) {
      super(item, {name, context, validator});
    }
  }

  Object.defineProperty(Class, 'name', {
    value: className(name),
  });

  return Class;
};
