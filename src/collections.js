import EventEmitter from 'events';
import {Collection} from './collection';
import models from './models';
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

class Collections extends EventEmitter {
  constructor (_models = models) {
    super();

    Object.defineProperty(this, 'byName', {value: {}});

    const collections = makeCollections(_models);

    Object.assign(this, collections);
    Object.assign(this.byName, collections.byName);
  }
}

export default new Collections();
