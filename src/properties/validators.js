import Schema from 'validate';
import schemas from '../schemas';
import {validatorClassName, reverseValidatorClassName} from '../helpers';

const validators = Object.entries(schemas).map(([name, schema]) => {
  const Class = class extends Schema {
    constructor () {
      super({[name]: schema});
    }
  };

  Object.defineProperty(Class, 'name', {
    value: validatorClassName(name),
  });

  return Class;
}).reduce((validators, Class) => {
  validators[reverseValidatorClassName(Class.name)] = new Class();
  return validators;
}, {});

Object.freeze(validators);

export default validators;
