import schemas from './schemas';
import {reverseValidatorClassName, makeDefaultExport} from './helpers';
import {makeValidator} from './factories';

export default makeDefaultExport(
  schemas,
  makeValidator,
  Class => reverseValidatorClassName(Class.name),
  Class => new Class()
);
