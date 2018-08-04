import {Property} from '../property';
import {_IdValidator} from './validators';

const name = '_id';
const validator = new _IdValidator(name);

export class _Id extends Property {
  constructor (item, {context} = {}) {
    super(item, {name, context, validator, setOnce: true});
  }
}
