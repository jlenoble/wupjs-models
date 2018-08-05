import {_id} from './_id';
import {title} from './title';

const schemas = {_id, title};

Object.values(schemas).forEach(schema => Object.freeze(schema));
Object.freeze(schemas);

export default schemas;

const propertySchemas = {};
const modelSchemas = {};

Object.entries(schemas).forEach(([name, schema]) => {
  const type = schema.type ? schema.type : schema;

  switch (type) {
  case String: case Number:
    propertySchemas[name] = schema;
    break;

  default:
    modelSchemas[name] = schema;
  }
});

Object.freeze(propertySchemas);
Object.freeze(modelSchemas);

export {propertySchemas, modelSchemas};
