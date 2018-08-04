import schemas from './schemas';
import {reverseValidatorClassName} from './helpers';
import {makeValidator} from './factories';

const validators = Object.entries(schemas).map(makeValidator)
  .reduce((validators, Class) => {
    validators[reverseValidatorClassName(Class.name)] = new Class();
    return validators;
  }, {});

Object.freeze(validators);

export default validators;
