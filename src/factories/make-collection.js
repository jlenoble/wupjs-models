import {Collection} from '../collection';
import {collectionClassName, makeClassFactory} from '../helpers';

const classImpl = (name, Model) => class extends Collection {
  constructor (item, {context} = {}) {
    super(item, {Model, context});
  }
};

export const makeCollection = makeClassFactory(collectionClassName, classImpl);
