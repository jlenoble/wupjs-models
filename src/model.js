import {Item} from './item';
import properties from './properties';
import validators, {modelValidators} from './validators';
import {makeEvents} from './helpers/make-events';

const modelValidator = modelValidators.byName['model'];

export class Model extends Item {
  constructor (item, {validator = modelValidator, context} = {}) {
    super();

    Object.defineProperties(this, {
      props: {
        value: new Map(),
      },

      context: {
        value: context,
      },
    });

    const Class = this.constructor;
    const validateEvents = Class.events.validate;

    Class.props.forEach(name => {
      const Property = properties.byName[name];
      const validator = validators.byName[name];
      const options = {
        setOnce: validator.getOption(name, 'setOnce'),
      };
      const prop = new Property(item, {context: this, validator, options,
        events: validateEvents[name]});

      Object.defineProperty(this, name, {
        get () {
          return prop.value;
        },
        set (i) {
          return prop.value = i;
        },
        enumerable: true,
      });

      this.props.set(name, prop);
    });

    Object.defineProperties(this, {
      validator: {
        value: validator,
      },

      item: {
        get () {
          return {...this};
        },
        set (item) {
          const literal = {...item};
          const prevItem = this.item;
          const errors = validator.validate(literal);

          if (!errors.length) {
            for (let prop of this.props.values()) {
              if (Object.getOwnPropertyDescriptor(prop, 'item').writable !==
                false) { // Must distinguish explicit false from undefined
                // as most likely .item is a set() accessor
                prop.item = literal;
              }
            };
            this.emit(Class.events.update.request, this, prevItem);
          } else {
            // console.log('model', errors.map(error => error.message), item);
            this.emit(Class.events.update.error, this, item, errors);
          }
        },
      },
    });

    this.emit(Class.events.create.request, this);
  }

  delete () {
    this.emit(this.constructor.events.delete.request, this);
  }
}

Model.props = new Set(['_id']);
Model.events = makeEvents(Model, 'model');
