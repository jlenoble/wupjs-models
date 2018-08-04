import {Property} from '../property';
import validators from './validators';
import {className} from '../helpers';

const Properties = Object.entries(validators).map(([name, validator]) => {
  const Class = class extends Property {
    constructor (item, {context} = {}) {
      super(item, {name, context, validator});
    }
  }

  Object.defineProperty(Class, 'name', {
    value: className(name),
  });

  return Class;
}).reduce((properties, Class) => {
  properties[Class.name] = Class;
  return properties;
}, {});

export default Properties;
