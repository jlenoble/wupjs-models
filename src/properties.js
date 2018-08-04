import {makeProperty} from './factories';
import validators from './validators';

const Properties = Object.entries(validators).map(makeProperty)
  .reduce((properties, Class) => {
    properties[Class.name] = Class;
    return properties;
  }, {});

export default Properties;
