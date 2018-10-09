'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _makeCollection = require('./factories/make-collection');

var _models = require('./models');

var _models2 = _interopRequireDefault(_models);

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _helpers.makeDefaultExport)(_models2.default.byName, _makeCollection.makeCollection, Class => Class.name, Class => Class, _helpers.instanceName);
module.exports = exports.default;