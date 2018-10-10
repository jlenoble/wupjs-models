import {propertySchemas, modelSchemas, addSchemas} from './schemas';
import {makeValidators} from './helpers/make-validators';

// Must be created first, because of caching in makeValidator
const propertyValidators = makeValidators(propertySchemas);

// Must be created after propertyValidators is created, because of caching
// in makeValidator
const modelValidators = makeValidators(modelSchemas);

[propertyValidators, modelValidators].forEach(validators => {
  Object.defineProperty(validators, 'byName', {enumerable: false});
  Object.freeze(validators.byName);
  Object.freeze(validators);
});

const validators = {...propertyValidators, ...modelValidators};
Object.defineProperty(validators, 'byName', {value: {
  ...propertyValidators.byName, ...modelValidators.byName,
}});

export default validators;
export {propertyValidators, modelValidators};

export const addValidators = schemas => {
  addSchemas(schemas); // Must be set first or makeValidators will ignore them
  const vals = makeValidators(schemas);
  Object.assign(validators, vals);
  Object.assign(validators.byName, vals.byName);
  return vals;
};
