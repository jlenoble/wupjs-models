import {_id} from './_id';
import {idea} from './idea';
import {model} from './model';
import {title} from './title';

const schemas = {_id, idea, model, title};

const propertySchemas = {};
const modelSchemas = {};

const addSchema = ([name, schema]) => {
  if (propertySchemas[name] || modelSchemas[name]) {
    console.warn(`Adding already defined schemas is forbidden.
To redefine schema '${name}', call redefineSchema('${name}', schema)`);
    return; // Don't overwrite implicitly
  }

  const type = schema.type ? schema.type : schema;

  switch (type) {
  case String: case Number:
    propertySchemas[name] = schema.type ? schema : {type};
    break;

  default:
    modelSchemas[name] = schema;
  }
};

export const addSchemas = schemas => Object.entries(schemas).forEach(addSchema);

addSchemas(schemas);

export {propertySchemas, modelSchemas};
