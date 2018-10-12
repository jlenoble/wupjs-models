import EventEmitter from 'events';
import {Property} from './property';
import Validators, {defaultValidators} from './validators';
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

class Properties extends EventEmitter {
  constructor (input = defaultValidators) {
    super();

    const validators = input instanceof Validators
      ? input
      : new Validators(input);

    Object.defineProperties(this, {
      byName: {value: {}},
      schemas: {value: validators.schemas},
      validators: {value: validators},
    });

    const properties = makeProperties(validators.propertyValidators);

    Object.assign(this, properties);
    Object.assign(this.byName, properties.byName);
  }

  has (name) {
    return !!this.byName[name];
  }

  addSingle (name, schema) {
    if (this.has(name)) {
      console.warn(`Resetting ${this.constructor.name} is not implemented`);
      // console.warn(`To redefine the property for '${
      //   name}', call properties.reset({'${
      //   name}': schema}) or properties.resetSingle('${name}', schema)`);
      return;
    }

    if (!this.schemas.has(name)) {
      this.schemas._setSingle(name, schema);
      this.validators._setSingle(name);
    }

    this._setSingle(name);
  }

  add (schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.addSingle(name,
      schema));
  }

  _setSingle (name) {
    if (this.validators.hasPropertyValidator(name)) {
      const Class = makeProperty([name, this.validators.byName[name]]);
      this[Class.name] = Class;
      this.byName[name] = Class;
    }
  }
}

export default Properties;
export const defaultProperties = new Properties();
