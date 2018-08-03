import {Item} from './item';
import {Id, Title} from './properties';

export class Model extends Item {
  constructor (item) {
    super();

    const id = new Id(item);
    const title = new Title(item);

    Object.defineProperties(this, {
      [id.name]: {
        get () {
          return id.value;
        },
        set (i) {
          id.value = i;
        },
        enumerable: true,
      },

      [title.name]: {
        get () {
          return title.value;
        },
        set (t) {
          title.value = t;
        },
        enumerable: true,
      },
    });
  }
}
