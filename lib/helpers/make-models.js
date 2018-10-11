'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeModels = undefined;

var _makeModel = require('../factories/make-model');

var _makeDefaultExport = require('./make-default-export');

var _makeName = require('./make-name');

const makeModels = exports.makeModels = validators => (0, _makeDefaultExport.makeDefaultExport)(validators.byName, _makeModel.makeModel, Class => Class.name, Class => Class, _makeName.instanceName);