import EventEmitter from 'events';

const lock = (name, value, ctx) => {
  Object.defineProperty(ctx, name, {
    value,
    writable: false,
    configurable: false,
  });
  Object.freeze(ctx[name]);
};

export class Property {
  constructor (item, {name, context, validator, events} = {}) {
    let value;
    const setOnce = !!validator.props[name].registry.setOnce;
    const {request, error} = events;

    const get = () => value;
    const set = v => {
      const errors = validator.validate({[name]: v, lhs: value});

      if (!errors.length) {
        const prevValue = value;
        value = v;
        context.emit(request, this, prevValue);
      } else {
        // console.log('property', errors.map(error => error.message), v);
        context.emit(error, this, v, errors);
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
        set: item => {
          if (!validator.validate({...item, lhs: value}).length) {
            value = item[name];
          }
        },
        configurable: setOnce,
      },

      value: {
        get,
        set: setOnce ? v => {
          const errors = set.call(this, v);

          if (!errors.length || errors[0].message.match(/already set/)) {
            lock('value', value, this);
            lock('item', this.item, this);
          }

          return errors;
        } : set,
        enumerable: true,
        configurable: setOnce,
      },
    });

    this.item = item;

    if (setOnce && value !== undefined) {
      lock('value', value, this);
      lock('item', this.item, this);
    }
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
