import Schemas, {defaultSchemas} from './schemas';
import Validators from './validators';
import Properties from './properties';
import Models from './models';
import Collections from './collections';

export default class WupModels {
  constructor (schemas = {}, {useDefault = false} = {}) {
    const _schemas = new Schemas(useDefault ? defaultSchemas :
      this._expand(schemas));
    const _validators = new Validators(_schemas);
    const _properties = new Properties(_validators);
    const _models = new Models(_properties);
    const _collections = new Collections(_models);

    Object.defineProperty(this, '_collections', {value: _collections});

    if (schemas) {
      this._set(schemas);
    } else {
      Object.assign(
        this,
        this._collections,
        this._collections.models,
        this._collections.properties,
        this._collections.validators,
        this._collections.schemas.propertySchemas,
        this._collections.schemas.modelSchemas
      );
    }
  }

  get (names = [], {type = 'collections'} = {}) {
    if (Array.isArray(names)) {
      return names.map(name => this.get(name, {type}));
    } else {
      let _type = type.toLowerCase();

      if (_type[_type.length-1] !== 's') {
        _type = type !== 'property' ? _type + 's' : 'properties';
      }

      switch (_type) {
      case 'schemas':
        return this._collections.schemas.propertySchemas[names]
          || this._collections.schemas.modelSchemas[names]
          || null;

      case 'collections':
        return this._collections.byName[names] || null;

      default:
        return this._collections[_type].byName[names] || null;
      }
    }
  }

  create (schemas = {}, options) {
    this._collections.add(schemas);
    this._set(schemas, options);
  }

  reset (schemas = {}, options) {
    this._collections.reset(schemas);
    this._set(schemas, options);
  }

  _set (schemas = {}, options) {
    const names = Object.keys(this._expand(schemas));

    [
      ...this.get(names),
      ...this.get(names, {type: 'model'}),
      ...this.get(names, {type: 'property'}),
    ]
      .filter(Class => !!Class)
      .forEach(Class => {
        this[Class.name] = Class;
      });

    this.get(names, {type: 'validator'}).forEach(obj => {
      if (obj) {
        this[obj.constructor.name] = obj;
      }
    });

    names.forEach(name => {
      const obj = this.get(name, {type: 'schema'});

      if (obj) {
        this[name] = obj;
      }
    });

    if (options) {
      return this.get(schemas, options);
    }
  }

  _expand (schemas) {
    const s = new Map();

    function add (schemas) {
      if (typeof schemas === 'object') {
        Object.entries(schemas).forEach(([key, obj]) => {
          s.set(key, obj);
          add(obj);
        });
      }
    }

    add(schemas);

    return Array.from(s).reduce((obj, [k, o]) => {
      return Object.assign(obj, {[k]: o});
    }, {});
  }
}
