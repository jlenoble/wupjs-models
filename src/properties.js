import {makeProperty} from './factories';
import {propertyValidators as validators} from './validators';
import {makeDefaultExport, instanceName} from './helpers';

export default makeDefaultExport(
  validators.byName,
  makeProperty,
  Class => Class.name,
  Class => Class,
  instanceName
);
