import {makeDefaultExport} from './make-default-export';
import {instanceName, reverseValidatorClassName} from './make-name';
import {makeValidator} from '../factories/make-validator';

export const makeValidators = schemas => makeDefaultExport(
  schemas,
  makeValidator,
  Class => instanceName(Class.name),
  Class => new Class(),
  reverseValidatorClassName
);
