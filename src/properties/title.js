import {Property} from '../property';
import {title as validator} from './validators';

const name = 'title';

export class Title extends Property {
  constructor (item, {context} = {}) {
    super(item, {name, context, validator});
  }
}
