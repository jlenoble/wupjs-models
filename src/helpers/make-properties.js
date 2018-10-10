import {makeProperty} from '../factories/make-property';
import {makeDefaultExport} from './make-default-export';
import {instanceName} from './make-name';

export const makeProperties =validators => makeDefaultExport(
  validators.byName,
  makeProperty,
  Class => Class.name,
  Class => Class,
  instanceName
);
