import {makeModel} from '../factories/make-model';
import {makeDefaultExport} from './make-default-export';
import {instanceName} from './make-name';

export const makeModels = validators => makeDefaultExport(
  validators.byName,
  makeModel,
  Class => Class.name,
  Class => Class,
  instanceName
);
