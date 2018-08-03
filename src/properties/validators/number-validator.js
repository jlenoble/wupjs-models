import Schema from 'validate';

export class NumberValidator extends Schema {
  constructor (propName) {
    super({
      [propName]: {
        type: Number,
      },
    });
  }
}
