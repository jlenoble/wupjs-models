// Adapted from:
// https://stackoverflow.com/questions/29879267/es6-class-multiple-inheritance
// Added recursion up the prototype chain
// Added no overwrite

export const copyProps = (target, source) => {
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
