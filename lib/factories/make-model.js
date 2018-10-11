'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeModel = undefined;

var _model = require('../model');

var _makeName = require('../helpers/make-name');

var _makeClassFactory = require('../helpers/make-class-factory');

var _makeEvents = require('../helpers/make-events');

const classImpl = (name, validator) => {
  const Class = class extends _model.Model {
    constructor(item, { context } = {}) {
      super(item, { validator, context });
    }
  };

  const props = new Set(Object.keys(validator.constructor.schemaOptions));

  if (!props.has('_id')) {
    props.add('_id');
  }

  Class.props = props;
  Class.events = (0, _makeEvents.makeEvents)(Class, name);

  return Class;
};

const makeModel = exports.makeModel = (0, _makeClassFactory.makeClassFactory)(_makeName.className, classImpl);