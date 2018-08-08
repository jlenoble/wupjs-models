// Adapted from:
// https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance
// Added recursion uo the prototype chain
// Added no overwrite

const copyProps = (target, source) => {
  // this function copies all properties and symbols, filtering out some
  // special ones

  Object.getOwnPropertyNames(source)
    .concat(Object.getOwnPropertySymbols(source))
    .forEach(prop => {
      if (!prop.match(/^(?:constructor|prototype|arguments|caller|name|bind|call|apply|toString|length)$/)
        && !target[prop]) { // Don't overwrite if already overloaded
        Object.defineProperty(target, prop,
          Object.getOwnPropertyDescriptor(source, prop));
      }
    });
};

const aggregation = (BaseClass, ...Classes) => {
  class Base extends BaseClass {
    constructor (...args) {
      super(...args);
      Classes.forEach(Class => {
        copyProps(this, new Class());
      });
    }
  }

  Classes.forEach(Class => {
    // outside contructor() to allow aggregation(A,B,C).staticFunction()
    // to be called etc.

    let _Class = Class;

    while (_Class !== Object) {
      copyProps(Base.prototype, _Class.prototype);
      _Class = Object.getPrototypeOf(_Class.prototype).constructor;
    }

    copyProps(Base, Class);
  });

  return Base;
};

export default aggregation;
