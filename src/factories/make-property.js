import {Property} from '../property';
import {className, makeClassFactory} from '../helpers';

const classImpl = (name, validator) => class extends Property {
  constructor (item, {context} = {}) {
    super(item, {name, context, validator});
  }
};

export const makeProperty = makeClassFactory(className, classImpl);
