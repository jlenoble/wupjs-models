import Schema from 'validate';

export class IdValidator extends Schema {
  constructor (propName) {
    super({
      [propName]: {
        type: Number,
        required: true,
      },
    });
  }
}
