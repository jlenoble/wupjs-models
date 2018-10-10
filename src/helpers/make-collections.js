import {makeCollection} from '../factories/make-collection';
import {makeDefaultExport} from './make-default-export';
import {instanceName} from './make-name';

export const makeCollections = models => makeDefaultExport(
  models.byName,
  makeCollection,
  Class => Class.name,
  Class => Class,
  instanceName
);
