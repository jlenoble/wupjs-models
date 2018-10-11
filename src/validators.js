import EventEmitter from 'events';
import schemas from './schemas';
import {instanceName} from './helpers/make-name';
import {makeValidator} from './factories/make-validator';

class Validators extends EventEmitter {
  constructor () {
    super();

    Object.defineProperties(this, {
      propertyValidators: {value: {}},
      modelValidators: {value: {}},
      byName: {value: {}},
    });

    Object.defineProperty(this.propertyValidators, 'byName', {value: {}});
    Object.defineProperty(this.modelValidators, 'byName', {value: {}});

    schemas.on('add:schema', name => {
      this._setSingle(name);
      this.emit('add:validator', name);
    });

    schemas.on('reset:schema', name => {
      this._setSingle(name);
      this.emit('reset:validator', name);
    });

    this.add(schemas.propertySchemas);
    this.add(schemas.modelSchemas);
  }

  has (name) {
    return !!this[name];
  }

  hasPropertyValidator (name) {
    return !!this.propertyValidators[name];
  }

  hasModelValidator (name) {
    return !!this.modelValidators[name];
  }

  addSingle (name, schema) {
    if (this.has(name)) {
      console.warn('To redefine a validator, call validators.reset(schemas) ' +
        'or validators.resetSingle(name, schema)');
      return;
    }

    if (!schemas.has(name)) {
      schemas._setSingle(name, schema);
    }

    this._setSingle(name);
  }

  resetSingle (name, schema) {
    schemas.resetSingle(name, schemas);
  }

  add (schemas) {
    Object.entries(schemas).forEach(([name, schema]) => this.addSingle(name,
      schema));
  }

  reset (schemas) {
    schemas.reset(schemas);
  }

  _setSingle (name) {
    const stem = schemas.hasPropertySchema(name) ? 'property' : 'model';
    const sname = stem + 'Schemas';
    const vname = stem + 'Validators';

    const Class = makeValidator([name, schemas[sname][name]]);
    const instance = new Class();
    const iname = instanceName(Class.name);

    this[vname][iname] = instance;
    this[vname].byName[name] = instance;
    this[iname] = instance;
    this.byName[name] = instance;
  }
}

export default new Validators();
