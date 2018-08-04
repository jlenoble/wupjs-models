import Schema from 'validate';
import {_id} from '../../schemas';

export class _IdValidator extends Schema {
  constructor (propName) {
    super({
      [propName]: _id
    });
  }
}
