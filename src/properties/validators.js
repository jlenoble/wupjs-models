import Schema from 'validate';
import schemas from '../schemas';

const namer = method => function fn (name) {
  if (name[0] == '_') {
    return '_' + fn(name.substring(1));
  }

  return name[0][method]() + name.substring(1);
};

const className = namer('toUpperCase');
const instanceName = namer('toLowerCase');

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
