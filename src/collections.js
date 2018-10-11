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
  }
}

export const defaultCollections = new Collections();
