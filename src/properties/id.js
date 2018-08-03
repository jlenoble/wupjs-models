import {Property} from '../property';
import {IdValidator} from './validators';

const name = 'id';
const validator = new IdValidator(name);

export class Id extends Property {
  constructor (item) {
    super(item, {name, validator, setOnce: true});
  }
}
