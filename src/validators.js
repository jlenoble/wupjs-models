/* eslint-disable no-param-reassign */

import EventEmitter from 'events';
import schemas, {propertySchemas} from './schemas';
import {instanceName, validatorClassName} from './helpers/make-name';
import Schema from 'validate';
import {makeClassFactory} from './helpers/make-class-factory';

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

const validators = new Map();

const classImpl = (name, schema) => {
  if (validators.has(name)) {
    return validators.get(name);
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

  validators.set(name, Class);

  return Class;
};

const makeValidator = (name, schema) => new (makeClassFactory(
  validatorClassName, classImpl)(name, schema))();

class Validators extends EventEmitter {
  constructor () {
    super();

    Object.defineProperties(this, {
      propertyValidators: {value: {}},
      modelValidators: {value: {}},
      byName: {value: {}},
    });

    Object.defineProperty(this.propertyValidators, 'byName', {value: {}});
    Object.defineProperty(this.modelValidators, 'byName', {value: {}});

    schemas.on('add:schema', name => {
      this._setSingle(name);
      this.emit('add:validator', name);
    });

    schemas.on('reset:schema', name => {
      this._setSingle(name);
      this.emit('reset:validator', name);
    });

    this.add(schemas.propertySchemas);
    this.add(schemas.modelSchemas);
  }

  has (name) {
    return !!this.byName[name];
  }

  hasPropertyValidator (name) {
    return !!this.propertyValidators.byName[name];
  }

  hasModelValidator (name) {
    return !!this.modelValidators.byName[name];
  }

  addSingle (name, schema) {
    if (this.has(name)) {
      console.warn('To redefine a validator, call validators.reset(schemas) ' +
        'or validators.resetSingle(name, schema)');
      return;
    }

    if (!schemas.has(name)) {
      schemas._setSingle(name, schema);
    }

    this._setSingle(name);
  }

  resetSingle (name, schema) {
    schemas.resetSingle(name, schemas);
  }

  add (schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.addSingle(name,
      schema));
  }

  reset (schemas) {
    schemas.reset(schemas);
  }

  _setSingle (name) {
    const stem = schemas.hasPropertySchema(name) ? 'property' : 'model';
    const sname = stem + 'Schemas';
    const vname = stem + 'Validators';

    const instance = this._makeValidator(name, schemas[sname][name]);
    const iname = instanceName(validatorClassName(name));

    this[vname][iname] = instance;
    this[vname].byName[name] = instance;
    this[iname] = instance;
    this.byName[name] = instance;
  }

  _makeValidator (name, schema) {
    return makeValidator([name, schema]);
  }
}

export default new Validators();
