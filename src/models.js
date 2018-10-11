import EventEmitter from 'events';
import {Model} from './model';
import Properties, {defaultProperties} from './properties';
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
  constructor (input = defaultProperties) {
    super();

    const properties = input instanceof Properties
      ? input
      : new Properties(input);

    Object.defineProperties(this, {
      byName: {value: {}},
      schemas: {value: properties.schemas},
      validators: {value: properties.validators},
      properties: {value: properties},
    });

    const models = makeModels(this.validators.modelValidators);

    Object.assign(this, models);
    Object.assign(this.byName, models.byName);
  }
}

export const defaultModels = new Models();
