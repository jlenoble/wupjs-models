import EventEmitter from 'events';
import {Model} from './model';
import {defaultValidators} from './validators';
import {makeDefaultExport} from './helpers/make-default-export';
import {instanceName, className} from './helpers/make-name';
import {makeClassFactory} from './helpers/make-class-factory';
import {makeEvents} from './helpers/make-events';

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

const makeModel = makeClassFactory(className, classImpl);

const makeModels = validators => makeDefaultExport(
  validators.byName,
  makeModel,
  Class => Class.name,
  Class => Class,
  instanceName
);

export default class Models extends EventEmitter {
  constructor (validators = defaultValidators.modelValidators) {
    super();

    Object.defineProperty(this, 'byName', {value: {}});

    const models = makeModels(validators);

    Object.assign(this, models);
    Object.assign(this.byName, models.byName);
  }
}

export const defaultModels = new Models();
