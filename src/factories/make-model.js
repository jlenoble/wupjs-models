import {Model} from '../model';
import {className} from '../helpers/make-name';
import {makeClassFactory} from '../helpers/make-class-factory';
import {makeEvents} from '../helpers/make-events';

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
