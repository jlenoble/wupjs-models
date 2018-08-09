import {Model} from '../model';
import {className, makeClassFactory, makeEvents} from '../helpers';

const classImpl = (name, validator) => {
  const Class = class extends Model {
    constructor (item, {context} = {}) {
      super(item, {validator, context});
    }
  };

  const props = new Set(Object.keys(validator.constructor.schemaOptions));

  if (!props.has('_id')) {
    props.add('_id');
  }

  Class.props = props;
  Class.events = makeEvents(Class, name);

  return Class;
};

export const makeModel = makeClassFactory(className, classImpl);
