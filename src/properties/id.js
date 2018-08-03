import {Property} from '../property';
import {NumberValidator} from './validators';

const name = 'id';
const validator = new NumberValidator(name);

export class Id extends Property {
  constructor (item) {
    super(item, {name, validator});
  }
}
