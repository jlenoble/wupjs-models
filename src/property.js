import {Item} from './item';

export class Property extends Item {
  constructor (item, {name, validator, setOnce = false} = {}) {
    super();

    let value;

    const get = () => value;
    const set = v => {
      const errors = validator.validate({[name]: v});

      if (!errors.length) {
        const prevValue = value;
        value = v;
        this.emit(`change:property:${name}`, this, prevValue);
      } else {
        this.emit(`error:change:property:${name}`, this, v, errors);
      }

      return errors;
    };

    Object.defineProperties(this, {
      name: {
        value: name,
      },

      validator: {
        value: validator,
      },

      item: {
        get () {
          return {[name]: value};
        },
        set (item) {
          this.value = item[name];
        },
      },

      value: {
        get,
        set: setOnce ? v => {
          if (!set.call(this, v).length) {
            Object.defineProperty(this, 'value', {
              value: value,
              writable: false,
              enumerable: true,
              configurable: false,
            });
          }
        } : set,
        enumerable: true,
        configurable: setOnce,
      },
    });

    this.item = item;
  }
}
