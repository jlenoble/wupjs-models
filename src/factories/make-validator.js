/* eslint-disable no-param-reassign */

import Schema from 'validate';
import {propertySchemas} from '../schemas';
import {validatorClassName} from '../helpers/make-name';
import {makeClassFactory} from '../helpers/make-class-factory';

const schemaOptionKeys = ['message', 'schema', 'use', 'required',
  'type', 'length', 'enum', 'match', 'each', 'elements', 'path',
  'typecast', 'validate'];

const customOptionKeys = ['setOnce'];

const getOptions = (schema, keys) => {
  const options = {};
  keys.forEach(key => {
    if (schema[key] !== undefined) {
      options[key] = schema[key];
    }
  });
  return options;
};

const getSchemaOptions = schema => getOptions(schema, schemaOptionKeys);
const getCustomOptions = schema => getOptions(schema, customOptionKeys);

const handleSetOnce = (name, schemaOptions, customOptions) => {
  if (customOptions.setOnce) {
    const setOnce = (val, ctx) => {
      return ctx.lhs === undefined && val !== undefined;
    };

    if (!schemaOptions.use) {
      schemaOptions.use = {};
    }
    schemaOptions.use.setOnce = setOnce;

    if (!schemaOptions.message) {
      schemaOptions.message = {};
    }
    schemaOptions.message.setOnce = path => `${path} already set.`;
  }
};

const Validators = new Map();

const classImpl = (name, schema) => {
  if (Validators.has(name)) {
    return Validators.get(name);
  }

  let Class;

  if (propertySchemas[name]) {
    const schemaOptions = getSchemaOptions(schema);
    const customOptions = getCustomOptions(schema);

    handleSetOnce(name, schemaOptions, customOptions);

    Class = class extends Schema {
      constructor () {
        // lhs makes sure some info used by custom Validators
        // won't be lost by stripping
        super({[name]: schemaOptions, lhs: {}});
      }

      getOption (propName, optName) {
        return !!this.props[propName].registry[optName];
      }
    };

    Object.assign(Class, {schemaOptions, customOptions});
  } else {
    const schemaOptions = Object.keys(schema).reduce((schema, key) => {
      const {schemaOptions, customOptions} = classImpl(key, schema);

      handleSetOnce(key, schemaOptions, customOptions);
      schema[key] = schemaOptions;

      return schema;
    }, {});
    const customOptions = getCustomOptions(schema);

    Class = class extends Schema {
      constructor () {
        super(schemaOptions);
      }

      getOption (name) {
        return !!this.props[propName].registry[optName];
      }
    };

    Object.assign(Class, {schemaOptions, customOptions});
  }

  Validators.set(name, Class);

  return Class;
};

export const makeValidator = makeClassFactory(validatorClassName, classImpl);
