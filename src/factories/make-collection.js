import {Collection} from '../collection';
import {collectionClassName, makeClassFactory} from '../helpers';

const classImpl = (name, Model) => class extends Collection {
  constructor (item) {
    super(item, {Model});
  }
};

export const makeCollection = makeClassFactory(collectionClassName, classImpl);
