import schemas from './schemas';
import {makeDefaultExport} from './helpers/make-default-export';
import {instanceName, reverseValidatorClassName} from './helpers/make-name';
import {makeValidator} from './factories/make-validator';

const makeValidators = schemas => makeDefaultExport(
  schemas,
  makeValidator,
  Class => instanceName(Class.name),
  Class => new Class(),
  reverseValidatorClassName
);

class Validators {
  constructor () {
    Object.defineProperties(this, {
      propertyValidators: {
        value: makeValidators(schemas.propertySchemas),
      },
      modelValidators: {
        value: makeValidators(schemas.modelSchemas),
      },
    });

    [this.propertyValidators, this.modelValidators].forEach(validators => {
      Object.defineProperty(validators, 'byName', {enumerable: false});
      Object.freeze(validators.byName);
      Object.freeze(validators);
    });

    Object.assign(this, this.propertyValidators, this.modelValidators);
    Object.defineProperty(this, 'byName', {value: {
      ...this.propertyValidators.byName, ...this.modelValidators.byName,
    }});
  }
}

export default new Validators();
