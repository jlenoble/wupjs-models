import {Model} from '../model';
import {className, makeClassFactory} from '../helpers';

const classImpl = (name, validator) => class extends Model {
  constructor (item) {
    super(item, {validator});
  }
};

export const makeModel = makeClassFactory(className, classImpl);
