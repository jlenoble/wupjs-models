import Schema from 'validate';
import {title} from '../../schemas';

export class TitleValidator extends Schema {
  constructor (propName) {
    super({
      [propName]: title,
    });
  }
}
