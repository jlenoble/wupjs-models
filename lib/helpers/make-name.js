'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const makeName = method => function fn(name) {
  if (name[0] == '_') {
    return '_' + fn(name.substring(1));
  }

  return name[0][method]() + name.substring(1);
};

const className = exports.className = makeName('toUpperCase');
const instanceName = exports.instanceName = makeName('toLowerCase');

const collectionClassName = exports.collectionClassName = name => className(name) + 'Collection';
const reverseCollectionClassName = exports.reverseCollectionClassName = name => instanceName(name.substring(0, name.length - 'Collection'.length));

const validatorClassName = exports.validatorClassName = name => className(name) + 'Validator';