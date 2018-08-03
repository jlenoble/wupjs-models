import Schema from 'validate';

export class TextValidator extends Schema {
  constructor (propName) {
    super({
      [propName]: {
        type: String,
        length: {min: 1},
      },
    });
  }
}
