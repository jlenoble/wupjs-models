import Schema from 'validate';
import {validatorClassName, makeClassFactory} from '../helpers';

const Validators = new Map();

const classImpl = (name, schema) => {
  if (Validators.has(name)) {
    return Validators.get(name);
  }

  const Class = class extends Schema {
    constructor () {
      if (typeof schema == 'function') {
        super({[name]: schema});
        return;
      }

      const validateProps = new Set(['message', 'schema', 'use', 'required',
        'type', 'length', 'enum', 'match', 'each', 'elements', 'path',
        'typecast', 'validate']);
      const knownOptions = new Set(['setOnce']);

      const validateSchema = {};
      const opts = {};
      const subSchemas = {};

      Object.entries(schema).forEach(([key, value]) => {
        if (validateProps.has(key)) {
          validateSchema[key] = value;
        } else if (knownOptions.has(key)) {
          opts[key] = value;
        } else {
          subSchemas[key] = value;
        }
      });

      const subs = Object.keys(subSchemas);
      if (subs.length) {
        const schema = {};

        subs.forEach(name => {
          schema[name] = classImpl(name, subSchemas[name]);
        });

        super(schema);
      } else {
        super({[name]: validateSchema});
      }

      Object.assign(this.opts, opts);
    }
  };

  Validators.set(name, Class);

  return Class;
};

export const makeValidator = makeClassFactory(validatorClassName, classImpl);
