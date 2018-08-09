import {Property} from '../property';
import {className, makeClassFactory} from '../helpers';

const classImpl = (name, validator) => class extends Property {
  constructor (item, {context, events} = {}) {
    super(item, {name, context, validator, events});
  }
};

export const makeProperty = makeClassFactory(className, classImpl);
