import {Property} from '../property';
import {IdValidator} from './validators';

const name = 'id';
const validator = new IdValidator(name);

export class Id extends Property {
  constructor (item, {context} = {}) {
    super(item, {name, context, validator, setOnce: true});
  }
}
