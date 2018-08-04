import Schema from 'validate';
import {_id} from '../../schemas';

export class IdValidator extends Schema {
  constructor (propName) {
    super({
      [propName]: _id
    });
  }
}
