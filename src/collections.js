import EventEmitter from 'events';
import {Collection} from './collection';
import Models, {defaultModels} from './models';
import {makeDefaultExport} from './helpers/make-default-export';
import {instanceName, collectionClassName} from './helpers/make-name';
import {makeClassFactory} from './helpers/make-class-factory';

const classImpl = (name, Model) => {
  const Class = class extends Collection {
    constructor (item, {context} = {}) {
      super(item, {Model, context});
    }
  };

  Class.Model = Model;

  return Class;
};

const makeCollection = makeClassFactory(collectionClassName, classImpl);

const makeCollections = models => makeDefaultExport(
  models.byName,
  makeCollection,
  Class => Class.name,
  Class => Class,
  instanceName
);

export default class Collections extends EventEmitter {
  constructor (input = defaultModels) {
    super();

    const models = input instanceof Models
      ? input
      : new Models(input);

    Object.defineProperties(this, {
      byName: {value: {}},
      schemas: {value: models.schemas},
      validators: {value: models.validators},
      properties: {value: models.properties},
      models: {value: models},
    });

    const collections = makeCollections(models);

    Object.assign(this, collections);
    Object.assign(this.byName, collections.byName);

    this.models.on('reset:model', name => {
      this._setSingle(name);
    });
  }

  has (name) {
    return !!this.byName[name];
  }

  addSingle (name, schema) {
    if (this.has(name)) {
      console.warn(`To redefine the collection for '${
        name}', call collections.reset({'${
        name}': schema}) or collections.resetSingle('${name}', schema)`);
      return;
    }

    if (!this.schemas.has(name)) {
      this.schemas._setSingle(name, schema);
      this.validators._setSingle(name);
      this.models._setSingle(name);
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
      const Class = makeCollection([name, this.models.byName[name]]);
      this[Class.name] = Class;
      this.byName[name] = Class;
    }
  }
}

export const defaultCollections = new Collections();
