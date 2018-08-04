import Schema from 'validate';
import {validatorClassName} from '../helpers';

export const makeValidator = ([name, schema]) => {
  const Class = class extends Schema {
    constructor () {
      super({[name]: schema});
    }
  };

  Object.defineProperty(Class, 'name', {
    value: validatorClassName(name),
  });

  return Class;
};
