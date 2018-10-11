'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _id2 = require('./_id');

var _idea = require('./idea');

var _model = require('./model');

var _title = require('./title');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const schemas = { _id: _id2._id, idea: _idea.idea, model: _model.model, title: _title.title };

class Schemas extends _events2.default {
  constructor(schemas) {
    super();

    Object.defineProperties(this, {
      propertySchemas: {
        value: {},
        enumerable: true
      },

      modelSchemas: {
        value: {},
        enumerable: true
      }
    });

    this.add(schemas);
  }

  has(name) {
    return !!(this.propertySchemas[name] || this.modelSchemas[name]);
  }

  hasPropertySchema(name) {
    return !!this.propertySchemas[name];
  }

  hasModelSchema(name) {
    return !!this.modelSchemas[name];
  }

  addSingle(name, schema) {
    if (this.has(name)) {
      console.warn(`To redefine the schema for '${name}', call schemas.reset({'${name}': schema}) or schemas.resetSingle('${name}', schema)`);
      return;
    }

    this._setSingle(name, schema);
    this.emit('add:schema', name);
  }

  resetSingle(name, schema) {
    this._setSingle(name, schema);
    this.emit('reset:schema', name);
  }

  add(schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.addSingle(name, schema));
  }

  reset(schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.resetSingle(name, schema));
  }

  _setSingle(name, schema) {
    const type = schema.type ? schema.type : schema;

    switch (type) {
      case String:case Number:
        this.propertySchemas[name] = schema.type ? schema : { type };
        break;

      default:
        this.modelSchemas[name] = schema;
    }
  }
}

exports.default = new Schemas(schemas);
module.exports = exports.default;