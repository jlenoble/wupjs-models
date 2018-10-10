import {Property} from '../property';
import {className} from '../helpers/make-name';
import {makeClassFactory} from '../helpers/make-class-factory';

const classImpl = (name, validator) => class extends Property {
  constructor (item, {context, events, options} = {}) {
    super(item, {name, context, validator, events, options});
  }
};

export const makeProperty = makeClassFactory(className, classImpl);
