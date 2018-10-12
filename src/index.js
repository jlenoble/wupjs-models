import EventEmitter from 'events';
import Schemas, {defaultSchemas} from './schemas';
import Validators from './validators';
import Properties from './properties';
import Models from './models';
import Collections from './collections';

export default class WupModels extends EventEmitter {
  constructor (schemas = {}, {useDefault = false} = {}) {
    super();

    const _schemas = new Schemas(useDefault ? defaultSchemas :
      this._expand({_id: defaultSchemas._id, ...schemas}));
    const _validators = new Validators(_schemas);
    const _properties = new Properties(_validators);
    const _models = new Models(_properties);
    const _collections = new Collections(_models);

    Object.defineProperty(this, '_collections', {value: _collections});

    if (schemas) {
      this._setSchemas(schemas);
    } else {
      const Classes = Object.entries({
        ...this._collections,
        ...this._collections.models,
        ...this._collections.properties,
      }).reduce((obj, [k, o]) => {
        return Object.assign(obj, {[k]: this._wrap(o)});
      }, {});

      Object.assign(
        this,
        Classes,
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

  addSchemas (schemas = {}) {
    this._collections.add(schemas);
    this._setSchemas(schemas);
  }

  resetSchemas (schemas = {}) {
    this._collections.reset(schemas);
    this._setSchemas(schemas);
  }

  _setSchemas (schemas = {}) {
    const names = Object.keys(this._expand(schemas));

    [
      ...this.get(names),
      ...this.get(names, {type: 'model'}),
      ...this.get(names, {type: 'property'}),
    ]
      .filter(Class => !!Class)
      .forEach(Class => {
        this[Class.name] = this._wrap(Class);
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

  _wrap (Class) {
    // Make sure WupModels aggregates all events
    const that = this;

    const C = class extends Class {
      constructor (init, opt) {
        super(init, Object.assign({}, opt, {context: that}));
      }
    };

    Object.defineProperty(C, 'name', {value: Class.name});

    return C;
  }
}
