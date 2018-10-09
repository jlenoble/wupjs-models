'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelValidators = exports.propertyValidators = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _schemas = require('./schemas');

var _helpers = require('./helpers');

var _makeValidator = require('./factories/make-validator');

// Must be created first, because of caching in makeValidator
const propertyValidators = (0, _helpers.makeDefaultExport)(_schemas.propertySchemas, _makeValidator.makeValidator, Class => (0, _helpers.instanceName)(Class.name), Class => new Class(), _helpers.reverseValidatorClassName);

// Must be created after propertyValidators is created, because of caching
// in makeValidator
const modelValidators = (0, _helpers.makeDefaultExport)(_schemas.modelSchemas, _makeValidator.makeValidator, Class => (0, _helpers.instanceName)(Class.name), Class => new Class(), _helpers.reverseValidatorClassName);

[propertyValidators, modelValidators].forEach(validators => {
  Object.defineProperty(validators, 'byName', { enumerable: false });
  Object.freeze(validators.byName);
  Object.freeze(validators);
});

const validators = _extends({}, propertyValidators, modelValidators);
validators.byName = _extends({}, propertyValidators.byName, modelValidators.byName);

exports.default = validators;
exports.propertyValidators = propertyValidators;
exports.modelValidators = modelValidators;