'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
const makeClassFactory = exports.makeClassFactory = (className, classImpl) => {
  return ([name, obj]) => {
    const Class = classImpl(name, obj);

    Object.defineProperty(Class, 'name', {
      value: className(name)
    });

    return Class;
  };
};