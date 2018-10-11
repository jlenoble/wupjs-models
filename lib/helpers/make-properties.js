'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeProperties = undefined;

var _makeProperty = require('../factories/make-property');

var _makeDefaultExport = require('./make-default-export');

var _makeName = require('./make-name');

const makeProperties = exports.makeProperties = validators => (0, _makeDefaultExport.makeDefaultExport)(validators.byName, _makeProperty.makeProperty, Class => Class.name, Class => Class, _makeName.instanceName);