'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _schemas = require('./schemas');

var _schemas2 = _interopRequireDefault(_schemas);

var _makeName = require('./helpers/make-name');

var _makeValidator = require('./factories/make-validator');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Validators extends _events2.default {
  constructor() {
    super();

    Object.defineProperties(this, {
      propertyValidators: { value: {} },
      modelValidators: { value: {} },
      byName: { value: {} }
    });

    Object.defineProperty(this.propertyValidators, 'byName', { value: {} });
    Object.defineProperty(this.modelValidators, 'byName', { value: {} });

    _schemas2.default.on('add:schema', name => {
      this._setSingle(name);
      this.emit('add:validator', name);
    });

    _schemas2.default.on('reset:schema', name => {
      this._setSingle(name);
      this.emit('reset:validator', name);
    });

    this.add(_schemas2.default.propertySchemas);
    this.add(_schemas2.default.modelSchemas);
  }

  has(name) {
    return !!this[name];
  }

  hasPropertyValidator(name) {
    return !!this.propertyValidators[name];
  }

  hasModelValidator(name) {
    return !!this.modelValidators[name];
  }

  addSingle(name, schema) {
    if (this.has(name)) {
      console.warn('To redefine a validator, call validators.reset(schemas) ' + 'or validators.resetSingle(name, schema)');
      return;
    }

    if (!_schemas2.default.has(name)) {
      _schemas2.default._setSingle(name, schema);
    }

    this._setSingle(name);
  }

  resetSingle(name, schema) {
    _schemas2.default.resetSingle(name, _schemas2.default);
  }

  add(schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.addSingle(name, schema));
  }

  reset(schemas) {
    schemas.reset(schemas);
  }

  _setSingle(name) {
    const stem = _schemas2.default.hasPropertySchema(name) ? 'property' : 'model';
    const sname = stem + 'Schemas';
    const vname = stem + 'Validators';

    const Class = (0, _makeValidator.makeValidator)([name, _schemas2.default[sname][name]]);
    const instance = new Class();
    const iname = (0, _makeName.instanceName)(Class.name);

    this[vname][iname] = instance;
    this[vname].byName[name] = instance;
    this[iname] = instance;
    this.byName[name] = instance;
  }
}

exports.default = new Validators();
module.exports = exports.default;