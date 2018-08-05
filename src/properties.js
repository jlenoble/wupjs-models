import {makeProperty} from './factories';
import {propertyValidators as validators} from './validators';
import {makeDefaultExport} from './helpers';

export default makeDefaultExport(
  validators,
  makeProperty,
  Class => Class.name,
  Class => Class
);
