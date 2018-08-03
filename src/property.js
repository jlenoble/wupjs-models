import {Item} from './item';

export class Property extends Item {
  constructor (item, {name, context, validator, setOnce = false} = {}) {
    super();

    let value;
    const ctx = context || this;

    const get = () => value;
    const set = v => {
      const errors = validator.validate({[name]: v});

      if (!errors.length) {
        const prevValue = value;
        value = v;
        ctx.emit(`change:property:${name}`, this, prevValue);
      } else {
        ctx.emit(`error:change:property:${name}`, this, v, errors);
      }

      return errors;
    };

    Object.defineProperties(this, {
      name: {
        value: name,
      },

      context: {
        value: ctx,
      },

      validator: {
        value: validator,
      },

      item: {
        get () {
          return {[name]: value};
        },
        set (item) {
          value = item[name]; // Doesn't trigger events
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
