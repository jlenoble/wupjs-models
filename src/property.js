import {Item} from './item';

export class Property extends Item {
  constructor (item, {name, validator} = {}) {
    super();

    let value;

    Object.defineProperties(this, {
      name: {
        value: name,
      },

      validator: {
        value: validator,
      },

      item: {
        get () {
          return {[name]: value};
        },
        set (item) {
          this.value = item[name];
        },
      },

      value: {
        get () {
          return value;
        },
        set (v) {
          const errors = validator.validate({[name]: v});
          if (!errors.length) {
            const prevValue = value;
            value = v;
            this.emit(`change:property:${name}`, this, prevValue);
          } else {
            this.emit(`error:change:property:${name}`, this, v, errors);
          }
        },
        enumerable: true,
      },
    });

    this.item = item;
  }
}
