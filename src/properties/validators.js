import Schema from 'validate';
import schemas from '../schemas';

const className = name => {
  if (name[0] == '_') {
    return '_' + className(name.substring(1));
  }

  return name[0].toUpperCase() + name.substring(1);
};

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
});

const Validators = {};

validators.forEach(validator => {
  Validators[validator.name] = validator;
});

Object.freeze(Validators);

export default Validators;
