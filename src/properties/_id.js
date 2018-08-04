import {Property} from '../property';
import {_IdValidator as validator} from './validators';

const name = '_id';

export class _Id extends Property {
  constructor (item, {context} = {}) {
    super(item, {name, context, validator, setOnce: true});
  }
}
