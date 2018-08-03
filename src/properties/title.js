import {Property} from '../property';
import {TextValidator} from './validators';

const name = 'title';
const validator = new TextValidator(name);

export class Title extends Property {
  constructor (item) {
    super(item, {name, validator});
  }
}
