import {Property} from './property';
import {propertyValidators} from './validators';
import {makeDefaultExport} from './helpers/make-default-export';
import {instanceName, className} from './helpers/make-name';
import {makeClassFactory} from './helpers/make-class-factory';

const classImpl = (name, validator) => class extends Property {
  constructor (item, {context, events, options} = {}) {
    super(item, {name, context, validator, events, options});
  }
};

const makeProperty = makeClassFactory(className, classImpl);

const makeProperties = validators => makeDefaultExport(
  validators.byName,
  makeProperty,
  Class => Class.name,
  Class => Class,
  instanceName
);

export default makeProperties(propertyValidators);
