/* eslint-disable no-param-reassign */

import EventEmitter from 'events';
import Schemas, {defaultSchemas} from './schemas';
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

class Validators extends EventEmitter {
  constructor (schemas = defaultSchemas) {
    super();

    Object.defineProperties(this, {
      schemas: {value: new Schemas(schemas)},
      validators: {value: new Map()},
      propertyValidators: {value: {}},
      modelValidators: {value: {}},
      byName: {value: {}},
    });

    Object.defineProperty(this.propertyValidators, 'byName', {value: {}});
    Object.defineProperty(this.modelValidators, 'byName', {value: {}});

    this.schemas.on('add:schema', name => {
      this._setSingle(name);
      this.emit('add:validator', name);
    });

    this.schemas.on('reset:schema', name => {
      this._setSingle(name);
      this.emit('reset:validator', name);
    });

    this.add(this.schemas.propertySchemas);
    this.add(this.schemas.modelSchemas);
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

    if (!this.schemas.has(name)) {
      this.schemas._setSingle(name, schema);
    }

    this._setSingle(name);
  }

  resetSingle (name, schema) {
    this.schemas.resetSingle(name, schema);
  }

  add (schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.addSingle(name,
      schema));
  }

  reset (schemas) {
    this.schemas.reset(schemas);
  }

  _setSingle (name) {
    const stem = this.schemas.hasPropertySchema(name) ? 'property' : 'model';
    const sname = stem + 'Schemas';
    const vname = stem + 'Validators';

    const instance = this._makeValidator(name, this.schemas[sname][name]);
    const iname = instanceName(validatorClassName(name));

    this[vname][iname] = instance;
    this[vname].byName[name] = instance;
    this[iname] = instance;
    this.byName[name] = instance;
  }

  _makeValidator (name, schema) {
    return new (makeClassFactory(
      validatorClassName, this._classImpl.bind(this))([name, schema]))();
  }

  _classImpl (name, schema) {
    if (this.validators.has(name)) {
      return this.validators.get(name);
    }

    let Class;

    if (this.schemas.propertySchemas[name]) {
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
        const {schemaOptions, customOptions} = this._classImpl(key, schema);

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

    this.validators.set(name, Class);

    return Class;
  }
}

export default new Validators();
