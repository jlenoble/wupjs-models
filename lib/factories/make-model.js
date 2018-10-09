'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeModel = undefined;

var _model = require('../model');

var _helpers = require('../helpers');

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
  Class.events = (0, _helpers.makeEvents)(Class, name);

  return Class;
};

const makeModel = exports.makeModel = (0, _helpers.makeClassFactory)(_helpers.className, classImpl);