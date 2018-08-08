import {Model} from '../model';
import {className, makeClassFactory} from '../helpers';

const classImpl = (name, validator) => class extends Model {
  constructor (item, {context} = {}) {
    super(item, {validator, context});
  }
};

export const makeModel = makeClassFactory(className, classImpl);
