'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validators = require('./validators');

var _makeProperties = require('./helpers/make-properties');

exports.default = (0, _makeProperties.makeProperties)(_validators.propertyValidators);
module.exports = exports.default;