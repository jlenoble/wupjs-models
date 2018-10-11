'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCollections = undefined;

var _makeCollection = require('../factories/make-collection');

var _makeDefaultExport = require('./make-default-export');

var _makeName = require('./make-name');

const makeCollections = exports.makeCollections = models => (0, _makeDefaultExport.makeDefaultExport)(models.byName, _makeCollection.makeCollection, Class => Class.name, Class => Class, _makeName.instanceName);