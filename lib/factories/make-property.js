'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeProperty = undefined;

var _property = require('../property');

var _makeName = require('../helpers/make-name');

var _makeClassFactory = require('../helpers/make-class-factory');

const classImpl = (name, validator) => class extends _property.Property {
  constructor(item, { context, events, options } = {}) {
    super(item, { name, context, validator, events, options });
  }
};

const makeProperty = exports.makeProperty = (0, _makeClassFactory.makeClassFactory)(_makeName.className, classImpl);