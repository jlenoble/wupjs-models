'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeCollection = undefined;

var _collection = require('../collection');

var _makeName = require('../helpers/make-name');

var _makeClassFactory = require('../helpers/make-class-factory');

const classImpl = (name, Model) => {
  const Class = class extends _collection.Collection {
    constructor(item, { context } = {}) {
      super(item, { Model, context });
    }
  };

  Class.Model = Model;

  return Class;
};

const makeCollection = exports.makeCollection = (0, _makeClassFactory.makeClassFactory)(_makeName.collectionClassName, classImpl);