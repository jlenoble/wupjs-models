import {Collection} from '../collection';
import {collectionClassName, makeClassFactory} from '../helpers';

const classImpl = (name, Model) => {
  const Class = class extends Collection {
    constructor (item, {context} = {}) {
      super(item, {Model, context});
    }
  };

  Class.Model = Model;

  return Class;
};

export const makeCollection = makeClassFactory(collectionClassName, classImpl);
