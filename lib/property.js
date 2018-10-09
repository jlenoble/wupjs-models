'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Property = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const lock = (name, value, ctx) => {
  Object.defineProperty(ctx, name, {
    value,
    writable: false,
    configurable: false
  });
  Object.freeze(ctx[name]);
};

class Property {
  constructor(item, { name, context, validator, events, options = {} } = {}) {
    let value;
    const setOnce = options.setOnce; //
    const { request, error } = events;

    const get = () => value;
    const set = v => {
      const errors = validator.validate({ [name]: v, lhs: value });

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
        value: name
      },

      context: {
        value: context
      },

      validator: {
        value: validator
      },

      item: {
        get() {
          return { [name]: value };
        },
        set: item => {
          if (!validator.validate(_extends({}, item, { lhs: value })).length) {
            value = item[name];
          }
        },
        configurable: setOnce
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
        configurable: setOnce
      }
    });

    this.item = item;

    if (setOnce && value !== undefined) {
      lock('value', value, this);
      lock('item', this.item, this);
    }
  }
}

exports.Property = Property;
const proto = Property.prototype;
for (let [name, fn] of Object.entries(_events2.default.prototype)) {
  if (typeof fn == 'function') {
    proto[name] = (fn => function (...args) {
      return fn.apply(this.context, args);
    })(fn);
  }
}