import {makeModel} from './factories';
import {modelValidators as validators} from './validators';
import {makeDefaultExport, instanceName} from './helpers';

export default makeDefaultExport(
  validators.byName,
  makeModel,
  Class => Class.name,
  Class => Class,
  instanceName
);
