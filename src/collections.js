import {makeCollection} from './factories/make-collection';
import models from './models';
import {makeDefaultExport, instanceName} from './helpers';

export default makeDefaultExport(
  models.byName,
  makeCollection,
  Class => Class.name,
  Class => Class,
  instanceName
);
