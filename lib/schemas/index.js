'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelSchemas = exports.propertySchemas = undefined;

var _id2 = require('./_id');

var _idea = require('./idea');

var _model = require('./model');

var _title = require('./title');

const schemas = { _id: _id2._id, idea: _idea.idea, model: _model.model, title: _title.title };

Object.values(schemas).forEach(schema => Object.freeze(schema));
Object.freeze(schemas);

const propertySchemas = {};
const modelSchemas = {};

Object.entries(schemas).forEach(([name, schema]) => {
  const type = schema.type ? schema.type : schema;

  switch (type) {
    case String:case Number:
      propertySchemas[name] = schema.type ? schema : { type };
      break;

    default:
      modelSchemas[name] = schema;
  }
});

Object.freeze(propertySchemas);
Object.freeze(modelSchemas);

exports.propertySchemas = propertySchemas;
exports.modelSchemas = modelSchemas;