'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeModel = require('./factories/make-model');

var _validators = require('./validators');

var _helpers = require('./helpers');

exports.default = (0, _helpers.makeDefaultExport)(_validators.modelValidators.byName, _makeModel.makeModel, Class => Class.name, Class => Class, _helpers.instanceName);
module.exports = exports.default;