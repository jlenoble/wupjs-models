'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Model = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _item = require('./item');

var _properties = require('./properties');

var _properties2 = _interopRequireDefault(_properties);

var _validators = require('./validators');

var _validators2 = _interopRequireDefault(_validators);

var _makeEvents = require('./helpers/make-events');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const modelValidator = _validators.modelValidators.byName['model'];

class Model extends _item.Item {
  constructor(item, { validator = modelValidator, context } = {}) {
    super();

    Object.defineProperties(this, {
      props: {
        value: new Map()
      },

      context: {
        value: context
      }
    });

    const Class = this.constructor;
    const validateEvents = Class.events.validate;

    Class.props.forEach(name => {
      const Property = _properties2.default.byName[name];
      const validator = _validators2.default.byName[name];
      const options = {
        setOnce: validator.getOption(name, 'setOnce')
      };
      const prop = new Property(item, { context: this, validator, options,
        events: validateEvents[name] });

      Object.defineProperty(this, name, {
        get() {
          return prop.value;
        },
        set(i) {
          return prop.value = i;
        },
        enumerable: true
      });

      this.props.set(name, prop);
    });

    Object.defineProperties(this, {
      validator: {
        value: validator
      },

      item: {
        get() {
          return _extends({}, this);
        },
        set(item) {
          const literal = _extends({}, item);
          const prevItem = this.item;
          const errors = validator.validate(literal);

          if (!errors.length) {
            for (let prop of this.props.values()) {
              if (Object.getOwnPropertyDescriptor(prop, 'item').writable !== false) {
                // Must distinguish explicit false from undefined
                // as most likely .item is a set() accessor
                prop.item = literal;
              }
            };
            this.emit(Class.events.update.request, this, prevItem);
          } else {
            // console.log('model', errors.map(error => error.message), item);
            this.emit(Class.events.update.error, this, item, errors);
          }
        }
      }
    });

    this.emit(Class.events.create.request, this);
  }

  delete() {
    this.emit(this.constructor.events.delete.request, this);
  }
}

exports.Model = Model;
Model.props = new Set(['_id']);
Model.events = (0, _makeEvents.makeEvents)(Model, 'model');