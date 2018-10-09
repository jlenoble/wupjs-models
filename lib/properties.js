'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeProperty = require('./factories/make-property');

var _validators = require('./validators');

var _helpers = require('./helpers');

exports.default = (0, _helpers.makeDefaultExport)(_validators.propertyValidators.byName, _makeProperty.makeProperty, Class => Class.name, Class => Class, _helpers.instanceName);
module.exports = exports.default;