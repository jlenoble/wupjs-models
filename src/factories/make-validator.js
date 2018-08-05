import Schema from 'validate';
import {validatorClassName, makeClassFactory} from '../helpers';

const classImpl = (name, schema) => class extends Schema {
  constructor () {
    if (typeof schema == 'function') {
      super({[name]: schema});
      return;
    }

    const validateProps = new Set(['message', 'schema', 'use', 'required',
      'type', 'length', 'enum', 'match', 'each', 'elements', 'path', 'typecast',
      'validate']);
    const otherProps = new Set(['setOnce']);

    const validateSchema = {};
    const otherSchema = {};

    Object.entries(schema).forEach(([key, value]) => {
      if (validateProps.has(key)) {
        validateSchema[key] = value;
      } else if (otherProps.has(key)) {
        otherSchema[key] = value;
      }
    });

    super({[name]: validateSchema});

    Object.assign(this.opts, otherSchema);
  }
};

export const makeValidator = makeClassFactory(validatorClassName, classImpl);
