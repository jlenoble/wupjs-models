import EventEmitter from 'events';

export class Property {
  constructor (item, {name, context, validator, setOnce = false} = {}) {
    let value;

    const get = () => value;
    const set = v => {
      const errors = validator.validate({[name]: v});

      if (!errors.length) {
        const prevValue = value;
        value = v;
        context.emit(`change:property:${name}`, this, prevValue);
      } else {
        context.emit(`error:change:property:${name}`, this, v, errors);
      }

      return errors;
    };

    Object.defineProperties(this, {
      name: {
        value: name,
      },

      context: {
        value: context,
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

const proto = Property.prototype;
for (let [name, fn] of Object.entries(EventEmitter.prototype)) {
  if (typeof fn == 'function') {
    proto[name] = (fn => function (...args) {
      return fn.apply(this.context, args);
    })(fn);
  }
}
