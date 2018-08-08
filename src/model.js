import {Item} from './item';
import properties from './properties';
import validators, {modelValidators} from './validators';

const modelValidator = modelValidators.byName['model'];

export class Model extends Item {
  constructor (item, {validator = modelValidator, context} = {}) {
    super();

    const props = new Set(Object.keys(validator.constructor.schemaOptions));

    if (!props.has('_id')) {
      props.add('_id');
    }

    Object.defineProperties(this, {
      props: {
        value: new Map(),
      },

      context: {
        value: context,
      },
    });

    props.forEach(name => {
      const Property = properties.byName[name];
      const validator = validators.byName[name];
      const prop = new Property(item, {context: this, validator});

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
          const prevValue = this.item;
          const errors = validator.validate(literal);

          if (!errors.length) {
            for (let prop of this.props.values()) {
              if (Object.getOwnPropertyDescriptor(prop, 'item').writable !==
                false) { // Must distinguish explicit false from undefined
                // as most likely .item is a set() accessor
                prop.item = literal;
              }
            };
            this.emit('change:item', this, prevValue);
          } else {
            // console.log('model', errors.map(error => error.message), item);
            this.emit('error:change:item', this, item, errors);
          }
        },
      },
    });
  }
}
