import Schema from 'validate';
import {title} from '../../schemas';

export class TextValidator extends Schema {
  constructor (propName) {
    super({
      [propName]: title,
    });
  }
}
