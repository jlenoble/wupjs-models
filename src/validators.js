import schemas, {propertySchemas, modelSchemas} from './schemas';
import {makeDefaultExport, instanceName, reverseValidatorClassName}
  from './helpers';
import {makeValidator} from './factories';

const validators = makeDefaultExport(
  schemas,
  makeValidator,
  Class => instanceName(Class.name),
  Class => new Class(),
  reverseValidatorClassName
);

export default validators;

const propertyValidators = {byName: {}};
const modelValidators = {byName: {}};

Object.entries(validators).forEach(([key, obj]) => {
  const name = reverseValidatorClassName(key);

  if (propertySchemas[name]) {
    propertyValidators[key] = obj;
    propertyValidators.byName[name] = obj;
  } else if (modelSchemas[name]) {
    modelValidators[key] = obj;
    modelValidators.byName[name] = obj;
  }
});

[propertyValidators, modelValidators].forEach(validators => {
  Object.defineProperty(validators, 'byName', {enumerable: false});
  Object.freeze(validators.byName);
  Object.freeze(validators);
});

export {propertyValidators, modelValidators};
