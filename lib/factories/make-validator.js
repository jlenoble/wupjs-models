'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeValidator = undefined;

var _validate = require('validate');

var _validate2 = _interopRequireDefault(_validate);

var _schemas = require('../schemas');

var _makeName = require('../helpers/make-name');

var _makeClassFactory = require('../helpers/make-class-factory');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-param-reassign */

const schemaOptionKeys = ['message', 'schema', 'use', 'required', 'type', 'length', 'enum', 'match', 'each', 'elements', 'path', 'typecast', 'validate'];

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

  if (_schemas.propertySchemas[name]) {
    const schemaOptions = getSchemaOptions(schema);
    const customOptions = getCustomOptions(schema);

    handleSetOnce(name, schemaOptions, customOptions);

    Class = class extends _validate2.default {
      constructor() {
        // lhs makes sure some info used by custom Validators
        // won't be lost by stripping
        super({ [name]: schemaOptions, lhs: {} });
      }

      getOption(propName, optName) {
        return !!this.props[propName].registry[optName];
      }
    };

    Object.assign(Class, { schemaOptions, customOptions });
  } else {
    const schemaOptions = Object.keys(schema).reduce((schema, key) => {
      const { schemaOptions, customOptions } = classImpl(key, schema);

      handleSetOnce(key, schemaOptions, customOptions);
      schema[key] = schemaOptions;

      return schema;
    }, {});
    const customOptions = getCustomOptions(schema);

    Class = class extends _validate2.default {
      constructor() {
        super(schemaOptions);
      }

      getOption(name) {
        return !!this.props[propName].registry[optName];
      }
    };

    Object.assign(Class, { schemaOptions, customOptions });
  }

  Validators.set(name, Class);

  return Class;
};

const makeValidator = exports.makeValidator = (0, _makeClassFactory.makeClassFactory)(_makeName.validatorClassName, classImpl);