import {Item} from './item';
import properties from './properties';
import validators from './validators';

export class Model extends Item {
  constructor (item, {validator = {props: {}}} = {}) {
    super();

    const props = new Set(Object.keys(validator.props));

    if (!props.has('_id')) {
      props.add('_id');
    }

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
    });
  }
}
