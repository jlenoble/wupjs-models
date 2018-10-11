'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _validators = require('./validators');

var _makeModels = require('./helpers/make-models');

exports.default = (0, _makeModels.makeModels)(_validators.modelValidators);
module.exports = exports.default;