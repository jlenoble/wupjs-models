import schemas, {propertySchemas, modelSchemas} from './schemas';
import {reverseValidatorClassName, makeDefaultExport} from './helpers';
import {makeValidator} from './factories';

const validators = makeDefaultExport(
  schemas,
  makeValidator,
  Class => reverseValidatorClassName(Class.name),
  Class => new Class()
);

export default validators;

const propertyValidators = makeDefaultExport(
  propertySchemas,
  makeValidator,
  Class => reverseValidatorClassName(Class.name),
  Class => new Class()
);

const modelValidators = makeDefaultExport(
  modelSchemas,
  makeValidator,
  Class => reverseValidatorClassName(Class.name),
  Class => new Class()
);

export {propertyValidators, modelValidators};
