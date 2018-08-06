import {propertySchemas, modelSchemas} from './schemas';
import {makeDefaultExport, instanceName, reverseValidatorClassName}
  from './helpers';
import {makeValidator} from './factories';

// Must be created first, because of caching in makeValidator
const propertyValidators = makeDefaultExport(
  propertySchemas,
  makeValidator,
  Class => instanceName(Class.name),
  Class => new Class(),
  reverseValidatorClassName
);

// Must be created after propertyValidators is created, because of caching
// in makeValidator
const modelValidators = makeDefaultExport(
  modelSchemas,
  makeValidator,
  Class => instanceName(Class.name),
  Class => new Class(),
  reverseValidatorClassName
);

[propertyValidators, modelValidators].forEach(validators => {
  Object.defineProperty(validators, 'byName', {enumerable: false});
  Object.freeze(validators.byName);
  Object.freeze(validators);
});

const validators = {...propertyValidators, ...modelValidators};
validators.byName = {...propertyValidators.byName, ...modelValidators.byName};

export default validators;
export {propertyValidators, modelValidators};
