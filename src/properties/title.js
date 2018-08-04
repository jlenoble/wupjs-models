import {Property} from '../property';
import {TitleValidator} from './validators';

const name = 'title';
const validator = new TitleValidator(name);

export class Title extends Property {
  constructor (item, {context} = {}) {
    super(item, {name, context, validator});
  }
}
