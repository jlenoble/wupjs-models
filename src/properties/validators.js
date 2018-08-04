import Schema from 'validate';
import schemas from '../schemas';
import {className, instanceName} from '../helpers';

const validators = Object.entries(schemas).map(([name, schema]) => {
  const Class = class extends Schema {
    constructor () {
      super({[name]: schema});
    }
  };

  Object.defineProperty(Class, 'name', {
    value: className(name) + 'Validator',
  });

  return Class;
}).reduce((validators, Class) => {
  validators[instanceName(Class.name)] = new Class();
  return validators;
}, {});

Object.freeze(validators);

export default validators;
