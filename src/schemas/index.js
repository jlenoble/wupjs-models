import EventEmitter from 'events';

import {_id} from './_id';
import {idea} from './idea';
import {model} from './model';
import {title} from './title';

export const defaultSchemas = {_id, idea, model, title};

export default class Schemas extends EventEmitter {
  constructor (schemas) {
    super();

    Object.defineProperties(this, {
      propertySchemas: {
        value: {},
        enumerable: true,
      },

      modelSchemas: {
        value: {},
        enumerable: true,
      },
    });

    this.add(schemas);
  }

  has (name) {
    return !!(this.propertySchemas[name] || this.modelSchemas[name]);
  }

  hasPropertySchema (name) {
    return !!this.propertySchemas[name];
  }

  hasModelSchema (name) {
    return !!this.modelSchemas[name];
  }

  addSingle (name, schema) {
    if (this.has(name)) {
      console.warn(`Resetting ${this.constructor.name} is not implemented`);
      // console.warn(`To redefine the schema for '${
      //   name}', call schemas.reset({'${
      //   name}': schema}) or schemas.resetSingle('${name}', schema)`);
      return;
    }

    this._setSingle(name, schema);
  }

  add (schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.addSingle(name,
      schema));
  }

  _setSingle (name, schema) {
    const type = schema.type ? schema.type : schema;

    switch (type) {
    case String: case Number:
      this.propertySchemas[name] = schema.type ? schema : {type};
      break;

    default:
      this.modelSchemas[name] = schema;
    }
  }
}
