'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Collection = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _aggregation = require('./helpers/aggregation');

var _aggregation2 = _interopRequireDefault(_aggregation);

var _item = require('./item');

var _model = require('./model');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Collection extends (0, _aggregation2.default)(Map, _item.Item) {
  constructor(map = new Map(), { Model = _model.Model, context } = {}) {
    super();

    Object.defineProperties(this, {
      Model: {
        value: Model
      },

      context: {
        value: context
      }
    });

    Array.from(map).forEach(([key, obj]) => this.set(key, obj));
  }

  set(_id, item) {
    if (this.has(_id)) {
      this.get(_id).item = item;
    } else if (item instanceof this.Model && item._id === _id) {
      super.set(_id, item);
    } else {
      super.set(_id, new this.Model(_extends({}, item, { _id }), { context: this }));
    }

    return this;
  }
}
exports.Collection = Collection;