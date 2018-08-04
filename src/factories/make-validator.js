import Schema from 'validate';
import {validatorClassName, makeClassFactory} from '../helpers';

const classImpl = (name, schema) => class extends Schema {
  constructor () {
    super({[name]: schema});
  }
};

export const makeValidator = makeClassFactory(validatorClassName, classImpl);
