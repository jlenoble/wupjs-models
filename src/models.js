import EventEmitter from 'events';
import {Model} from './model';
import Properties, {defaultProperties} from './properties';
import {makeDefaultExport} from './helpers/make-default-export';
import {instanceName, className} from './helpers/make-name';
import {makeClassFactory} from './helpers/make-class-factory';
import {makeEvents} from './helpers/make-events';

const classImpl = (name, validator) => {
  const Class = class extends Model {
    constructor (item, {context} = {}) {
      super(item, {validator, context});
    }
  };

  const props = new Set(Object.keys(validator.constructor.schemaOptions));

  if (!props.has('_id')) {
    props.add('_id');
  }

  Class.props = props;
  Class.events = makeEvents(Class, name);

  return Class;
};

const makeModel = makeClassFactory(className, classImpl);

const makeModels = validators => makeDefaultExport(
  validators.byName,
  makeModel,
  Class => Class.name,
  Class => Class,
  instanceName
);

export default class Models extends EventEmitter {
  constructor (input = defaultProperties) {
    super();

    const properties = input instanceof Properties
      ? input
      : new Properties(input);

    Object.defineProperties(this, {
      byName: {value: {}},
      schemas: {value: properties.schemas},
      validators: {value: properties.validators},
      properties: {value: properties},
    });

    const models = makeModels(this.validators.modelValidators);

    Object.values(models).forEach(Class => {
      Object.assign(Class, {
        validators: this.validators,
        properties: this.properties,
      });
    });

    Object.assign(this, models);
    Object.assign(this.byName, models.byName);

    this.validators.on('reset:validator:model', name => {
      this._setSingle(name);
      this.emit('reset:model', name);
    });
  }

  has (name) {
    return !!this.byName[name];
  }

  addSingle (name, schema) {
    if (this.has(name)) {
      console.warn(`To redefine the model for '${
        name}', call models.reset({'${
        name}': schema}) or models.resetSingle('${name}', schema)`);
      return;
    }

    if (!this.schemas.has(name)) {
      this.schemas._setSingle(name, schema);
      this.validators._setSingle(name);
    }

    this._setSingle(name);
  }

  resetSingle (name, schema) {
    this.schemas.resetSingle(name, schema);
  }

  add (schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.addSingle(name,
      schema));
  }

  reset (schemas) {
    this.schemas.reset(schemas);
  }

  _setSingle (name) {
    if (this.validators.hasModelValidator(name)) {
      const Class = makeModel([name, this.validators.byName[name]]);
      this[Class.name] = Class;
      this.byName[name] = Class;
    }
  }
}

export const defaultModels = new Models();
